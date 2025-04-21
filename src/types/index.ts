import DataTable from 'datatables.net-dt'
import type { ModuleTypeId } from '@/api/enums'
import type { DBItem } from './DBItem'

export type { DBItem }

export type LedsCount = {
  ledsInWidth: number
  ledsInHeight: number
}

type BaseItem = {
  name: string
  id: number
  price: number
  link: string
}

export type ModuleItem = BaseItem &
  LedsCount & {
    width: number
    height: number
    consumption: number
    typeId: ModuleTypeId
  }

export type ControllerItem = BaseItem

export type ProfileItem = BaseItem

export type GalvanizationItem = BaseItem

export type ReceivingItem = BaseItem

export type MagnetItem = BaseItem

export type CabinetItem = BaseItem

export type CornerItem = BaseItem

export type PowerUnitItem = BaseItem

export type ModulesListItem = Pick<ModuleItem, 'id' | 'name'> & {
  'parent-id': ModuleTypeId
}

export type ModuleTypeItem = {
  name: string
  id: ModuleTypeId
}

export type ModuleTypeItemById = Record<ModuleTypeId, ModuleTypeItem>

export interface Table extends InstanceType<ReturnType<typeof DataTable>> {}
