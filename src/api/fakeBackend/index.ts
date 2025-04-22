import getController, { type GetControllerParams } from './getController'
import { BaseDb, ProdServiceDb } from './db'
import { ModuleManufacturer } from '@/api/enums'
import getPrice from '@/api/fakeBackend/getPrice'
import type { ModulesListItem, ModuleType, DBItem } from './types'

type BaseReturnData = DBItem

async function getDb({ prodService }: { prodService: boolean }) {
  return prodService ? ProdServiceDb : BaseDb
}

export type BasePayload = {
  prodService: boolean
}

export type GetByIdPayload = BasePayload & {
  id: number | string
}

const fakeBackend = {
  getProfile: async <T = BaseReturnData>({ prodService }: BasePayload) => {
    const db = await getDb({ prodService })
    const profile = db.profiles[0]
    const price = await getPrice(profile.id)

    return {
      ...profile,
      price,
    } as T
  },
  getGalvanization: async <T = BaseReturnData>({ prodService }: BasePayload) => {
    const db = await getDb({ prodService })
    const galvanization = db.galvanization[0]
    const price = await getPrice(galvanization.id)

    return {
      ...galvanization,
      price,
    } as T
  },
  getMagnet: async <T = BaseReturnData>({ prodService }: BasePayload) => {
    const db = await getDb({ prodService })
    const magnet = db.magnets[0]
    const price = await getPrice(magnet.id)

    return {
      ...magnet,
      price,
    } as T
  },
  getCorner: async <T = BaseReturnData>({ prodService }: BasePayload) => {
    const db = await getDb({ prodService })
    const corners = db.corners[0]
    const price = await getPrice(corners.id)

    return {
      ...corners,
      price,
    } as T
  },
  getCabinet: async <T = BaseReturnData>({ prodService, id }: GetByIdPayload) => {
    const db = await getDb({ prodService })
    const cabinet = db.cabinets.find((cabinet) => cabinet.id === +id)
    const price = await getPrice(id)

    return {
      ...cabinet,
      price,
    } as T
  },
  getModulesList: async <T = ModulesListItem>({ prodService }: BasePayload) => {
    const db = await getDb({ prodService })

    return db.modules.map((module) => ({
      name: module.name,
      id: module.id,
      'parent-id': module['parent-id'],
    })) as T[]
  },
  getModuleTypes: async <T = ModuleType[]>({ prodService }: BasePayload) => {
    const db = await getDb({ prodService })

    return db.moduleTypes as T
  },

  async getModuleInfo<T = BaseReturnData>({ id, prodService }: GetByIdPayload) {
    const db = await getDb({ prodService })
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

  getReceivingCard: async <T = BaseReturnData>({ prodService }: BasePayload) => {
    const db = await getDb({ prodService })
    const receivingCard = db.receivingCards[0]
    const price = await getPrice(receivingCard.id)

    return {
      ...receivingCard,
      price,
    } as T
  },

  async getPowerUnit<T extends BaseReturnData>({ id, prodService }: GetByIdPayload) {
    const db = await getDb({ prodService })
    const targetModuleId = +id
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

  async getController({ prodService, ...payload }: Omit<GetControllerParams, 'db'> & BasePayload) {
    const db = await getDb({ prodService })

    return getController({ db, ...payload })
  },
}

export default fakeBackend
