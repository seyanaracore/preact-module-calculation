import fakeBackend from '../api/fakeBackend'
import {
  ModuleItem,
  ControllerItem,
  ModulesListItem,
  ProfileItem,
  PowerUnitItem,
  GalvanizationItem,
  CornerItem,
} from '@/types'

const delay = 0

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
  getModulesList() {
    return api.getModulesList<ModulesListItem[]>()
  },

  /** Получить информацию по модулю */
  getModuleInfo(moduleId: number | string) {
    return api.getModuleInfo<ModuleItem>(moduleId)
  },

  async getProfile() {
    const res = await api.getProfiles<ProfileItem[]>()

    return res[0]
  },

  async getPowerUnit() {
    const res = await api.getPowerUnits<PowerUnitItem[]>()

    return res[0]
  },

  async getCorner() {
    const res = await api.getCorners<CornerItem[]>()

    return res[0]
  },

  async getGalvanization() {
    const res = await api.getGalvanizations<GalvanizationItem[]>()

    return res[0]
  },

  async getControllerBySize(params: {
    summaryLedsWidth: number
    summaryLedsHeight: number
  }): Promise<ControllerItem> {
    return api.getControllerBySize(params)
  },
}

export default screenService
