import getLedsAmount from '@/helpers/getLedsAmount'
import getModuleSizesFields from '@/helpers/getModuleSizesFields'
import fakeBackend, { type BasePayload, type GetByIdPayload } from '@/api/fakeBackend'
import type {
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

const apiClient = fakeBackend

export type GetControllerPayload = BasePayload & {
  moduleId: number | string
  modulesInWidth: number
  modulesInHeight: number
}

const api = {
  getModulesList(payload: BasePayload): Promise<ModulesListItem[]> {
    return apiClient.getModulesList(payload)
  },

  /** Получить информацию по модулю */
  async getModuleInfo(payload: GetByIdPayload): Promise<ModuleItem> {
    const res = await apiClient.getModuleInfo(payload)
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

  getProfile(payload: BasePayload): Promise<ProfileItem> {
    return apiClient.getProfile(payload)
  },

  getCorner(payload: BasePayload): Promise<CornerItem> {
    return apiClient.getCorner(payload)
  },

  getGalvanization(payload: BasePayload): Promise<GalvanizationItem> {
    return apiClient.getGalvanization(payload)
  },

  getReceivingCard(payload: BasePayload): Promise<ReceivingItem> {
    return apiClient.getReceivingCard(payload)
  },

  getMagnet(payload: BasePayload): Promise<MagnetItem> {
    return apiClient.getMagnet(payload)
  },

  getCabinet(payload: GetByIdPayload): Promise<CabinetItem> {
    return apiClient.getCabinet(payload)
  },

  async getModuleTypes(payload: BasePayload): Promise<ModuleTypeItemById> {
    const res = await apiClient.getModuleTypes(payload)

    return Object.fromEntries(
      res.map((moduleTypeItem) => [moduleTypeItem.id, moduleTypeItem])
    ) as ModuleTypeItemById
  },

  getController(payload: GetControllerPayload): Promise<ControllerItem> {
    return apiClient.getController(payload)
  },

  getPowerUnit(payload: GetByIdPayload): Promise<PowerUnitItem> {
    return apiClient.getPowerUnit(payload)
  },
}

export default api
