import db from '../../db.json'
import { ControllerItem } from '@/types'

const fakeBackend = {
  // getControllers: async <T = unknown>() => db.controllers as T,
  getPowerUnits: async <T = unknown>() => db.powerUnits as T,
  getProfiles: async <T = unknown>() => db.profiles as T,
  getGalvanizations: async <T = unknown>() => db.galvanizations as T,
  getCorners: async <T = unknown>() => db.corners as T,
  getModulesList: async <T = unknown>() => db.modules.map(({ name, id }) => ({ name, id })) as T,

  async getModuleInfo<T = unknown>(id: number | string) {
    const modules = db.modules
    const targetModuleId = +id
    const module = modules.find((module) => module.id === targetModuleId)

    if (!module) throw new Error('Module not found')

    return module as T
  },

  async getControllerBySize<T = unknown>({
    summaryLedsWidth,
    summaryLedsHeight,
  }: {
    summaryLedsWidth: number
    summaryLedsHeight: number
  }) {
    const controllers = db.controllers
    let targetController: ControllerItem | undefined

    if (summaryLedsWidth <= 1024 && summaryLedsHeight <= 48)
      targetController = controllers.find((controller) => controller.id === 1)
    else if (summaryLedsWidth <= 768 && summaryLedsHeight <= 64)
      targetController = controllers.find((controller) => controller.id === 3)
    else if (summaryLedsWidth <= 512 && summaryLedsHeight <= 128)
      targetController = controllers.find((controller) => controller.id === 2)
    else if (summaryLedsWidth <= 512 && summaryLedsHeight <= 256)
      targetController = controllers.find((controller) => controller.id === 2)

    if (!targetController)
      throw new Error(
        `Target controller not found. leds width: ${summaryLedsWidth}, leds height: ${summaryLedsHeight}`
      )

    return targetController as T
  },
}

export default fakeBackend
