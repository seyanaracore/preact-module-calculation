import {
  ModuleItem,
  ControllerItem,
  ModulesListItem,
  ProfileItem,
  PowerUnitItem,
  GalvanizationItem,
  CornerItem,
  ModuleTypeItemById,
  ReceivingItem,
  MagnetItem,
  CabinetItem,
} from '@/types'
import getLedsAmount from '@/helpers/getLedsAmount'
import getModuleSizesFields from '@/helpers/getModuleSizesFields'
import fakeBackend from '@/api/fakeBackend'

const apiClient = fakeBackend

const api = {
  getModulesList(): Promise<ModulesListItem[]> {
    return apiClient.getModulesList()
  },

  /** Получить информацию по модулю */
  async getModuleInfo(moduleId: number | string): Promise<ModuleItem> {
    const res = await apiClient.getModuleInfo(moduleId)
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
      price: res.price,
      link: res.link,
      consumption: +res['vyhodnaya_mownost_vt'],
    }
  },

  getProfile(): Promise<ProfileItem> {
    return apiClient.getProfile()
  },

  getCorner(): Promise<CornerItem> {
    return apiClient.getCorner()
  },

  getGalvanization(): Promise<GalvanizationItem> {
    return apiClient.getGalvanization()
  },

  getReceivingCard(): Promise<ReceivingItem> {
    return apiClient.getReceivingCard()
  },

  getMagnet(): Promise<MagnetItem> {
    return apiClient.getMagnet()
  },

  getCabinet(id: number | string): Promise<CabinetItem> {
    return apiClient.getCabinet(id)
  },

  async getModuleTypes(): Promise<ModuleTypeItemById> {
    const res = await apiClient.getModuleTypes()

    return Object.fromEntries(
      res.map((moduleTypeItem) => [moduleTypeItem.id, moduleTypeItem])
    ) as ModuleTypeItemById
  },

  getController(params: {
    moduleId: number | string
    modulesInWidth: number
    modulesInHeight: number
  }): Promise<ControllerItem> {
    return apiClient.getController(params)
  },

  getPowerUnit(moduleId: number | string): Promise<PowerUnitItem> {
    return apiClient.getPowerUnit(moduleId)
  },
}

export default api
