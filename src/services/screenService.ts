import fakeBackend from '../api/fakeBackend'
import {
  ModuleItem,
  ControllerItem,
  ModulesListItem,
  ProfileItem,
  PowerUnitItem,
  GalvanizationItem,
  CornerItem,
  ModuleTypeItem,
  ModuleTypeItemById,
  ReceivingItem,
  MagnetItem,
  CabinetItem,
} from '@/types'
import getLedsAmount from '@/helpers/getLedsAmount'
import getModuleSizesFields from '@/helpers/getModuleSizesFields'
import { ModuleTypeId } from '@/api/enums'

// const delay = 0

// const api = Object.fromEntries(
//   Object.entries(fakeBackend).map(([k, v]) => {
//     return [
//       k,
//       (...args: any[]) =>
//         new Promise((res) => {
//           setTimeout(async () => {
//             // @ts-ignore
//             res(await v(...args))
//           }, delay)
//         }),
//     ]
//   })
// ) as unknown as typeof fakeBackend
const api = fakeBackend

const screenService = {
  getModulesList(): Promise<ModulesListItem[]> {
    return api.getModulesList()
  },

  /** Получить информацию по модулю */
  async getModuleInfo(moduleId: number | string): Promise<ModuleItem> {
    const res = await api.getModuleInfo(moduleId)
    const { ledsInHeight, ledsInWidth } = getLedsAmount(res)
    const { width, height } = getModuleSizesFields(res)

    return {
      name: res.name,
      width,
      height,
      ledsInWidth,
      ledsInHeight,
      typeId: res['parent-id'],
      id: res.id,
      sku: res.artikul.toString(),
      price: res.price,
      consumption: +res['vyhodnaya_mownost_vt'],
    }
  },

  async getProfile(): Promise<ProfileItem> {
    const res = await api.getProfiles()

    return res[0]
  },

  async getCorner(): Promise<CornerItem> {
    const res = await api.getCorners()

    return res[0]
  },

  async getGalvanization(): Promise<GalvanizationItem> {
    const res = await api.getGalvanizations()

    return res[0]
  },

  async getReceivingCard(): Promise<ReceivingItem> {
    const res = await api.getReceivingCards()

    return res[0]
  },

  async getMagnet(): Promise<MagnetItem> {
    const res = await api.getMagnets()

    return res[0]
  },

  async getCabinet(): Promise<CabinetItem> {
    const res = await api.getCabinets()

    return res[0]
  },

  async getModuleTypes(): Promise<ModuleTypeItemById> {
    const res = await api.getModuleTypes()

    return Object.fromEntries(
      res.map((moduleTypeItem) => [moduleTypeItem.id, moduleTypeItem])
    ) as ModuleTypeItemById
  },

  async getController(params: {
    moduleId: number | string
    modulesInWidth: number
    modulesInHeight: number
  }): Promise<ControllerItem> {
    return api.getController(params)
  },

  async getPowerUnit(moduleId: number | string): Promise<PowerUnitItem> {
    return api.getPowerUnit(moduleId)
  },
}

export default screenService
