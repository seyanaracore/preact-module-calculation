import db from '../../db.json'
import getController from '@/api/getController'

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

  getController,
}

export default fakeBackend
