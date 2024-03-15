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
import ky from 'ky'
import UPageI from '@/types/upage'

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
const isBuild = !!(process.env.NODE_ENV === 'production' && process.env.lib)

const getActualPriceAndLink = async (id: number | string) => {
  let baseUrl = '/'

  if (isBuild) baseUrl = 'https://ledexpress.ru'

  const res = await ky
    .get(`${baseUrl}upage/${id}.json`, {
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
    })
    .json<UPageI>()

  return {
    price: res.page.properties.group['1'].property['1'].value.value,
    link: `https://ledexpress.ru${res.page.link}`,
  }
}

const screenService = {
  getModulesList(): Promise<ModulesListItem[]> {
    return api.getModulesList()
  },

  /** Получить информацию по модулю */
  async getModuleInfo(moduleId: number | string): Promise<ModuleItem> {
    const res = await api.getModuleInfo(moduleId)
    const { ledsInHeight, ledsInWidth } = getLedsAmount(res)
    const { width, height } = getModuleSizesFields(res)
    const { price, link } = await getActualPriceAndLink(res.id)

    return {
      name: res.name,
      width,
      height,
      ledsInWidth,
      ledsInHeight,
      typeId: res['parent-id'],
      id: res.id,
      sku: res.artikul.toString(),
      price,
      link,
      consumption: +res['vyhodnaya_mownost_vt'],
    }
  },

  async getProfile(): Promise<ProfileItem> {
    const res = await api.getProfiles()
    const item = res[0]
    const { price, link } = await getActualPriceAndLink(item.id)

    return {
      ...item,
      price,
      link,
    }
  },

  async getCorner(): Promise<CornerItem> {
    const res = await api.getCorners()
    const item = res[0]
    const { price, link } = await getActualPriceAndLink(item.id)

    return {
      ...item,
      price,
      link,
    }
  },

  async getGalvanization(): Promise<GalvanizationItem> {
    const res = await api.getGalvanizations()
    const item = res[0]
    const { price, link } = await getActualPriceAndLink(item.id)

    return {
      ...item,
      price,
      link,
    }
  },

  async getReceivingCard(): Promise<ReceivingItem> {
    const res = await api.getReceivingCards()
    const item = res[0]
    const { price, link } = await getActualPriceAndLink(item.id)

    return {
      ...item,
      price,
      link,
    }
  },

  async getMagnet(): Promise<MagnetItem> {
    const res = await api.getMagnets()
    const item = res[0]
    const { price, link } = await getActualPriceAndLink(item.id)

    return {
      ...item,
      price,
      link,
    }
  },

  async getCabinet(): Promise<CabinetItem> {
    const res = await api.getCabinets()
    const item = res[0]
    const { price, link } = await getActualPriceAndLink(item.id)

    return {
      ...item,
      price,
      link,
    }
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
    const res = await api.getController(params)
    const { price, link } = await getActualPriceAndLink(res.id)

    return {
      ...res,
      price,
      link,
    }
  },

  async getPowerUnit(moduleId: number | string): Promise<PowerUnitItem> {
    const res = await api.getPowerUnit(moduleId)
    const { price, link } = await getActualPriceAndLink(res.id)

    return {
      ...res,
      price,
      link,
    }
  },
}

export default screenService
