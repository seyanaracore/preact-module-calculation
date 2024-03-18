import { ModuleImplementationType } from '@/enums'
import { ModuleTypeId } from '@/api/enums'

export const ModuleLabelUnit: Record<ModuleImplementationType, string> = {
  [ModuleImplementationType.Cabinet640x640]: 'каб',
  [ModuleImplementationType.Monolithic]: 'мод',
}

export const cabinetImplementationsList = [ModuleImplementationType.Cabinet640x640]
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
