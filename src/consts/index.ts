import { ModuleImplementationType } from '@/enums'
import { ModuleTypeId } from '@/api/enums'

export const MODULE_LABEL_UNIT: Record<ModuleImplementationType, string> = {
  [ModuleImplementationType.Cabinet640x640]: 'каб',
  [ModuleImplementationType.Cabinet640x480]: 'каб',
  [ModuleImplementationType.Monolithic]: 'мод',
}

export const CABINET_IMPLEMENTATION_LIST = [
  ModuleImplementationType.Cabinet640x640,
  ModuleImplementationType.Cabinet640x480,
]

export const IMPLEMENTATION_LIST = [
  {
    title: 'Монолитный',
    code: ModuleImplementationType.Monolithic,
  },
  {
    title: 'Кабинет 640/640',
    id: 3406,
    code: ModuleImplementationType.Cabinet640x640,
  },
  {
    title: 'Кабинет 640/480',
    id: 3403,
    code: ModuleImplementationType.Cabinet640x480,
  },
]

/** Типы полноцветных модулей */
export const FULL_COLOR_MODULES_TYPES_LIST = [ModuleTypeId.outdoor, ModuleTypeId.interior]
export const DATA_TABLE_BASE_CONFIG = {
  searching: false,
  search: false,
  paging: false,
  ordering: false,
  info: false,
}

export const EXCEL_EXPORT_CALC_TITLE = 'LED EXPRESS. Калькулятор комплектующих'

export const isProdService = window.calculatorConfig?.prodService ?? false
