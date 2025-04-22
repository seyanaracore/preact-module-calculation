import getControllerForMonochrome from './monochromeController'
import getControllerForFullColor from './fullColorController'
import { ModuleTypeId } from '@/api/enums'
import getPrice from '@/api/fakeBackend/getPrice'
import type { DataBase, DBItem } from '../db'

export type GetControllerParams = {
  db: DataBase
  moduleId: number | string
  modulesInWidth: number
  modulesInHeight: number
}

async function getController<T extends DBItem>({
  db,
  moduleId,
  modulesInWidth,
  modulesInHeight,
}: GetControllerParams) {
  const { modules } = db
  const targetModuleId = +moduleId
  const module = modules.find((module) => module.id === targetModuleId)
  let targetController: DBItem | undefined

  if (!module) throw new Error(`Target module not found, id ${moduleId}`)

  const controllerGetterPayload = { module, modulesInHeight, modulesInWidth }
  const moduleTypeId = module['parent-id']

  if (moduleTypeId === ModuleTypeId.monochrome) {
    targetController = getControllerForMonochrome(db, controllerGetterPayload)
  } else if ([ModuleTypeId.interior, ModuleTypeId.outdoor].includes(moduleTypeId)) {
    targetController = getControllerForFullColor(db, controllerGetterPayload)
  }

  if (!targetController)
    throw new Error(`
      Необходимый контроллер не найден.
      айди модуля: ${moduleId};
      тип модуля: ${moduleTypeId};
      модулей в ширину: ${modulesInWidth};
      модулей в высоту: ${modulesInHeight};
  `)

  const price = await getPrice(targetController.id)

  return { ...targetController, price } as T
}

export default getController
