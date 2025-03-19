import { ControllerItem } from '@/types'
import { ModuleTypeId } from '@/api/enums'
import modules from '../../../../db/json/modules.json'
import getControllerForMonochrome from './monochromeController'
import getControllerForFullColor from './fullColorController'
import DBItem from '@/api/fakeBackend/types/dbItem'
import getPrice from '@/api/fakeBackend/getPrice'
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

  const price = await getPrice(targetController.id)

  return { ...targetController, price } as T
}

export default getController
