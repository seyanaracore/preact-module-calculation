import { DBItem } from '@/types/dbItem'

const getModuleSizesFields = (module: DBItem) => {
  const targetField = module['razmer_mm'] ? module['razmer_mm'] : module['razmer_mm_shirina_vysota']

  if (!targetField || typeof targetField !== 'string') throw new Error('Не указана ширина/высота')

  const [width, height] = targetField.split('/')

  return { width: +width, height: +height }
}

export default getModuleSizesFields
