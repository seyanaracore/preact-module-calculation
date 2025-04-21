import type { DBItem } from '@/api/fakeBackend/db'

const getLedsAmount = (module: DBItem) => {
  const [ledsInWidth, ledsInHeight] = module['kolichestvo_svetodiodov_sht'].split('/')

  return {
    ledsInWidth: +ledsInWidth,
    ledsInHeight: +ledsInHeight,
  }
}

export default getLedsAmount
