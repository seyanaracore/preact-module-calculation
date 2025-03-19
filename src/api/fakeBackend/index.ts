import getController from './getController'
import profiles from '../../../db/json/profiles.json'
import corners from '../../../db/json/corners.json'
import powerUnits from '../../../db/json/powerUnits.json'
import galvanization from '../../../db/json/galvanization.json'
import modules from '../../../db/json/modules.json'
import controllers from '../../../db/json/controllers.json'
import receivingCards from '../../../db/json/receivingCards.json'
import cabinets from '../../../db/json/cabinets.json'
import magnets from '../../../db/json/magnets.json'
import moduleTypes from '../../../db/json/modules-types.json'
import { ModuleManufacturer } from '@/api/enums'
import { DBItemWithLink, ModulesListItem } from './types'
import DBItem from './types/dbItem'
import getPrice from '@/api/fakeBackend/getPrice'

type ReturnData = DBItemWithLink

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
  getProfile: async <T = ReturnData>() => {
    const profile = db.profiles[0]
    const price = await getPrice(profile.id)

    return {
      ...profile,
      price,
    } as T
  },
  getGalvanization: async <T = ReturnData>() => {
    const galvanization = db.galvanization[0]
    const price = await getPrice(galvanization.id)

    return {
      ...galvanization,
      price,
    } as T
  },
  getMagnet: async <T = ReturnData>() => {
    const magnet = db.magnets[0]
    const price = await getPrice(magnet.id)

    return {
      ...magnet,
      price,
    } as T
  },
  getCorner: async <T = ReturnData>() => {
    const corners = db.corners[0]
    const price = await getPrice(corners.id)

    return {
      ...corners,
      price,
    } as T
  },
  getCabinet: async <T = ReturnData>(id: number | string) => {
    const cabinet = db.cabinets.find((cabinet) => cabinet.id === +id)
    const price = await getPrice(id)

    return {
      ...cabinet,
      price,
    } as T
  },
  getModulesList: async <T = ModulesListItem>() =>
    db.modules.map((module) => ({
      name: module.name,
      id: module.id,
      'parent-id': module['parent-id'],
    })) as T[],
  getModuleTypes: async <T = DBItem[]>() => db.moduleTypes,

  async getModuleInfo<T = ReturnData>(id: number | string) {
    const modules = db.modules
    const targetModuleId = +id
    const module = modules.find((module) => module.id === targetModuleId)

    if (!module) throw new Error('Module not found')

    const price = await getPrice(targetModuleId)

    return {
      ...module,
      price,
    } as T
  },

  getReceivingCard: async <T = ReturnData>() => {
    const receivingCard = db.receivingCards[0]
    const price = await getPrice(receivingCard.id)

    return {
      ...receivingCard,
      price,
    } as T
  },

  async getPowerUnit<T extends ReturnData>(moduleId: number | string) {
    const targetModuleId = +moduleId
    const targetModule = db.modules.find((moduleItem) => moduleItem.id === targetModuleId)

    if (!targetModule) throw new Error('Module not found')

    let powerUnit: DBItem | undefined

    if (targetModule.proizvoditel === ModuleManufacturer.QIANG_LI) {
      powerUnit = db.powerUnits.find((powerUnit) => powerUnit.id === 2908)
    } else {
      powerUnit = db.powerUnits.find((powerUnit) => powerUnit.id === 2841)
    }

    if (!powerUnit) throw new Error('PowerUnit not found')

    const price = await getPrice(powerUnit.id)

    return {
      ...powerUnit,
      price,
    } as T
  },

  getController,
}

export default fakeBackend
