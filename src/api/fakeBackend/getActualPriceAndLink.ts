import { baseUrl } from '@/api/consts'
import UPage from '@/api/fakeBackend/types/upage'
import apiClient from '@/api/apiClient'

const getActualPriceAndLink = async (id: number | string) => {
  const res = await apiClient.get<UPage>(`${baseUrl}upage/${id}.json`)

  return {
    price: res.page.properties.group['1'].property['1'].value.value,
    link: `https://ledexpress.ru${res.page.link}`,
  }
}

export default getActualPriceAndLink
