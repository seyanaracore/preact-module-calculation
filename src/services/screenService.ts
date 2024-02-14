import api from '../api'
import fakeBackend from '../fakeBackend'
import { ModuleItem, ControllerItem } from '@/types'

const baseUrl = 'http://localhost:3001'

const screenService = {
  async getModulesList() {
    const res = await api.get(`${baseUrl}/modules`).json<ModuleItem[]>()

    return res.map(({ name, id }) => ({ name, id }))
  },

  /**
   * Получить информацию по модулю
   */
  getModuleInfo(moduleId: number | string) {
    return api.get(`/modules?id=${moduleId}`).json<ModuleItem>()
  },

  async getControllerBySize(params: { width: number; height: number }): Promise<ControllerItem> {
    return fakeBackend.getControllerBySize(params)
  },
}

export default screenService
