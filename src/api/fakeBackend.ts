import getController from '@/api/getController'
import profiles from '../../db/json/filtered/profiles.json'
import corners from '../../db/json/filtered/corners.json'
import powerUnits from '../../db/json/filtered/powerUnits.json'
import galvanization from '../../db/json/filtered/galvanization.json'
import modules from '../../db/json/filtered/modules.json'
import controllers from '../../db/json/filtered/controllers.json'
import receivingCards from '../../db/json/filtered/receivingCards.json'
import cabinets from '../../db/json/filtered/cabinets.json'
import magnets from '../../db/json/filtered/magnets.json'
import moduleTypes from '../../db/json/modules-types.json'
import { DBItem } from '@/types/dbItem'
import { PowerUnitItem } from '@/types'
import { ModuleManufacturer } from '@/api/enums'

type BackPowerUnit = Omit<PowerUnitItem, 'link'>

const db = {
  modules,
  controllers,
  profiles,
  corners,
  powerUnits,
  galvanization,
  moduleTypes,
  receivingCards,
  magnets,
  cabinets,
}

const fakeBackend = {
  getPowerUnits: async <T = DBItem[]>() => db.powerUnits as T,
  getProfiles: async <T = DBItem[]>() => db.profiles as T,
  getGalvanizations: async <T = DBItem[]>() => db.galvanization as T,
  getMagnets: async <T = DBItem[]>() => db.magnets as T,
  getCorners: async <T = DBItem[]>() => db.corners as T,
  getCabinets: async <T = DBItem[]>() => db.cabinets as T,
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

  getReceivingCards: <T = DBItem[]>() => db.receivingCards as T,

  async getPowerUnit(moduleId: number | string): Promise<BackPowerUnit> {
    const targetModuleId = +moduleId
    const targetModule = db.modules.find((moduleItem) => moduleItem.id === targetModuleId)

    if (!targetModule) throw new Error('Module not found')

    let powerUnit: BackPowerUnit | undefined

    if (targetModule.proizvoditel === ModuleManufacturer.QIANG_LI) {
      powerUnit = db.powerUnits.find((powerUnit) => powerUnit.id === 2908)
    } else {
      powerUnit = db.powerUnits.find((powerUnit) => powerUnit.id === 2841)
    }

    if (!powerUnit) throw new Error('PowerUnit not found')

    return powerUnit
  },

  getController,
}

export default fakeBackend
