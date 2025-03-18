import { BASE_URL } from '@/api/consts'
import UPage from '@/api/fakeBackend/types/upage'
import apiClient from '@/api/apiClient'

const getActualPriceAndLink = async (id: number | string) => {
  const res = await apiClient.get<UPage>(`${BASE_URL}upage/${id}.json`)

  return {
    price: res.page.properties.group['1'].property['1'].value.value,
    link: `https://ledexpress.ru${res.page.link}`,
  }
}

export default getActualPriceAndLink
