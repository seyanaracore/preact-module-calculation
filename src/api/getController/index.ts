import modules from '../../../db/json/filtered/modules.json'
import { ControllerItem } from '@/types'
import getControllerForMonochrome from '@/api/getController/monochromeController'
import { ModuleTypeId } from '@/api/enums'
import getControllerForFullColor from '@/api/getController/fullColorController'

type GetControllerParams = {
  moduleId: number | string
  modulesInWidth: number
  modulesInHeight: number
}

async function getController({ moduleId, modulesInWidth, modulesInHeight }: GetControllerParams) {
  const targetModuleId = +moduleId
  const module = modules.find((module) => module.id === targetModuleId)
  let targetController: ControllerItem | undefined

  if (!module) throw new Error(`Target module not found, id ${moduleId}`)

  const controllerGetterPayload = { module, modulesInHeight, modulesInWidth }
  const moduleTypeId = module['parent-id']

  if (moduleTypeId === ModuleTypeId.monochrome) {
    targetController = getControllerForMonochrome(controllerGetterPayload)
  } else if ([ModuleTypeId.interior, ModuleTypeId.outdoor].includes(moduleTypeId)) {
    targetController = getControllerForFullColor(controllerGetterPayload)
  }

  if (!targetController) throw new Error(`Target controller not found. Module id: ${moduleId}`)

  return targetController
}

export default getController
