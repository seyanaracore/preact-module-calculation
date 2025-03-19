import { BASE_URL } from '@/api/consts'
import apiClient from '@/api/apiClient'

const getPrice = async (id: number | string) => {
  const res = await apiClient.get<XMLDocument>(`${BASE_URL}upage/${id}.price`)

  const data = res.evaluate('//value', res, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null)
    ?.singleNodeValue?.textContent

  if (!data) {
    throw new Error('Failed to get price')
  }

  return +data
}

export default getPrice
