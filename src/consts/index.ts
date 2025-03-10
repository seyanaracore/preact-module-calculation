import { ModuleImplementationType } from '@/enums'
import { ModuleTypeId } from '@/api/enums'

export const ModuleLabelUnit: Record<ModuleImplementationType, string> = {
  [ModuleImplementationType.Cabinet640x640]: 'каб',
  [ModuleImplementationType.Cabinet640x480]: 'каб',
  [ModuleImplementationType.Monolithic]: 'мод',
}

export const cabinetImplementationsList = [
  ModuleImplementationType.Cabinet640x640,
  ModuleImplementationType.Cabinet640x480,
]

export const implementationList = [
  {
    title: 'Монолитный',
    code: ModuleImplementationType.Monolithic,
  },
  {
    title: 'Кабинет 640/640',
    id: 2883,
    code: ModuleImplementationType.Cabinet640x640,
  },
  {
    title: 'Кабинет 640/480',
    id: 2759,
    code: ModuleImplementationType.Cabinet640x480,
  },
]

/** Типы полноцветных модулей */
export const fullColorModulesTypesList = [ModuleTypeId.outdoor, ModuleTypeId.interior]
export const dataTableBaseConfig = {
  searching: false,
  search: false,
  paging: false,
  ordering: false,
  info: false,
}

export const excelExportCalcTitle = 'LED EXPRESS. Калькулятор комплектующих'
