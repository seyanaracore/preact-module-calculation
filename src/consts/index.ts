import { ModuleImplementationType } from '@/enums'
import { ModuleTypeId } from '@/api/enums'

export const ModuleLabelUnit: Record<ModuleImplementationType, string> = {
  [ModuleImplementationType.Cabinet640x640]: 'каб',
  [ModuleImplementationType.Monolithic]: 'мод',
}

export const CabinetImplementationsList = [ModuleImplementationType.Cabinet640x640]
/** Типы полноцветных модулей */
export const FullColorModulesTypesList = [ModuleTypeId.outdoor, ModuleTypeId.interior]
export const dataTableBaseConfig = {
  searching: false,
  search: false,
  paging: false,
  ordering: false,
  info: false,
}
