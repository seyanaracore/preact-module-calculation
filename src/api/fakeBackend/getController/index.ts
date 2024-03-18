import { ControllerItem } from '@/types'
import { ModuleTypeId } from '@/api/enums'
import modules from '../../../../db/json/filtered/modules.json'
import getControllerForMonochrome from './monochromeController'
import getControllerForFullColor from './fullColorController'
import DBItem from '@/api/fakeBackend/types/dbItem'
import getActualPriceAndLink from '@/api/fakeBackend/getActualPriceAndLink'
import { DBItemWithLink } from '@/api/fakeBackend/types'

type GetControllerParams = {
  moduleId: number | string
  modulesInWidth: number
  modulesInHeight: number
}

async function getController<T extends DBItemWithLink>({
  moduleId,
  modulesInWidth,
  modulesInHeight,
}: GetControllerParams) {
  const targetModuleId = +moduleId
  const module = modules.find((module) => module.id === targetModuleId)
  let targetController: DBItem | undefined

  if (!module) throw new Error(`Target module not found, id ${moduleId}`)

  const controllerGetterPayload = { module, modulesInHeight, modulesInWidth }
  const moduleTypeId = module['parent-id']

  if (moduleTypeId === ModuleTypeId.monochrome) {
    targetController = getControllerForMonochrome(controllerGetterPayload)
  } else if ([ModuleTypeId.interior, ModuleTypeId.outdoor].includes(moduleTypeId)) {
    targetController = getControllerForFullColor(controllerGetterPayload)
  }

  if (!targetController) throw new Error(`Target controller not found. Module id: ${moduleId}`)

  const { price, link } = await getActualPriceAndLink(targetController.id)

  return { ...targetController, price, link } as T
}

export default getController
