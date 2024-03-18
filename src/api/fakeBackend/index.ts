import getController from './getController'
import profiles from '../../../db/json/filtered/profiles.json'
import corners from '../../../db/json/filtered/corners.json'
import powerUnits from '../../../db/json/filtered/powerUnits.json'
import galvanization from '../../../db/json/filtered/galvanization.json'
import modules from '../../../db/json/filtered/modules.json'
import controllers from '../../../db/json/filtered/controllers.json'
import receivingCards from '../../../db/json/filtered/receivingCards.json'
import cabinets from '../../../db/json/filtered/cabinets.json'
import magnets from '../../../db/json/filtered/magnets.json'
import moduleTypes from '../../../db/json/modules-types.json'
import { ModuleManufacturer } from '@/api/enums'
import { baseUrl } from '@/api/consts'
import { DBItemWithLink, ModulesListItem } from './types'
import UPage from './types/upage'
import DBItem from './types/dbItem'
import getActualPriceAndLink from '@/api/fakeBackend/getActualPriceAndLink'

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
    const { price, link } = await getActualPriceAndLink(profile.id)

    return {
      ...profile,
      price,
      link,
    } as T
  },
  getGalvanization: async <T = ReturnData>() => {
    const galvanization = db.galvanization[0]
    const { price, link } = await getActualPriceAndLink(galvanization.id)

    return {
      ...galvanization,
      price,
      link,
    } as T
  },
  getMagnet: async <T = ReturnData>() => {
    const magnet = db.magnets[0]
    const { price, link } = await getActualPriceAndLink(magnet.id)

    return {
      ...magnet,
      price,
      link,
    } as T
  },
  getCorner: async <T = ReturnData>() => {
    const corners = db.corners[0]
    const { price, link } = await getActualPriceAndLink(corners.id)

    return {
      ...corners,
      price,
      link,
    } as T
  },
  getCabinet: async <T = ReturnData>() => {
    const cabinets = db.cabinets[0]
    const { price, link } = await getActualPriceAndLink(cabinets.id)

    return {
      ...cabinets,
      price,
      link,
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

    const { price, link } = await getActualPriceAndLink(targetModuleId)

    return {
      ...module,
      link,
      price,
    } as T
  },

  getReceivingCard: async <T = ReturnData>() => {
    const receivingCard = db.receivingCards[0]
    const { price, link } = await getActualPriceAndLink(receivingCard.id)

    return {
      ...receivingCard,
      price,
      link,
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

    const { price, link } = await getActualPriceAndLink(powerUnit.id)

    return {
      ...powerUnit,
      price,
      link,
    } as T
  },

  getController,
}

export default fakeBackend
