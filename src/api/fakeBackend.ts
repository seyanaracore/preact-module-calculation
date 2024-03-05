import getController from '@/api/getController'
import profiles from '../../db/json/filtered/profiles.json'
import corners from '../../db/json/filtered/corners.json'
import powerUnits from '../../db/json/filtered/powerUnits.json'
import galvanization from '../../db/json/filtered/galvanization.json'
import modules from '../../db/json/filtered/modules.json'
import controllers from '../../db/json/filtered/controllers.json'
import moduleTypes from '../../db/json/modules-types.json'
import { DBItem } from '@/types/dbItem'

const db = {
  modules,
  controllers,
  profiles,
  corners,
  powerUnits,
  galvanization,
  moduleTypes,
}

const fakeBackend = {
  getPowerUnits: async <T = DBItem[]>() => db.powerUnits as T,
  getProfiles: async <T = DBItem[]>() => db.profiles as T,
  getGalvanizations: async <T = DBItem[]>() => db.galvanization as T,
  getCorners: async <T = DBItem[]>() => db.corners as T,
  getModulesList: async <T = DBItem[]>() =>
    db.modules.map((module) => ({
      name: module.name,
      id: module.id,
      'parent-id': module['parent-id'],
    })) as Array<Pick<DBItem, 'name' | 'id' | 'parent-id'>>,
  getModuleTypes: async <T = DBItem[]>() => db.moduleTypes,

  async getModuleInfo<T = DBItem>(id: number | string) {
    const modules = db.modules
    const targetModuleId = +id
    const module = modules.find((module) => module.id === targetModuleId)

    if (!module) throw new Error('Module not found')

    return module as T
  },

  getController,
}

export default fakeBackend
