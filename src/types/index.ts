import { ModuleTypeId } from '@/api/enums'
import { Store } from '@/context'
import useCartState from '@/hooks/useCartState'
import DataTable from 'datatables.net-dt'

export type ModuleItem = {
  name: string
  width: number
  height: number
  ledsInWidth: number
  ledsInHeight: number
  consumption: number
  typeId: ModuleTypeId
  id: number
  price: number
  link: string
}

export type ModulesListItem = Pick<ModuleItem, 'id' | 'name'> & {
  'parent-id': ModuleTypeId
}

export type ControllerItem = {
  name: string
  id: number
  price: number
  link: string
}

export type ProfileItem = {
  name: string
  price: number
  link: string
  id: number
}

export type GalvanizationItem = {
  name: string
  price: number
  link: string
  id: number
}

export type ModuleTypeItem = {
  name: string
  id: ModuleTypeId
}

export type ReceivingItem = {
  name: string
  price: number
  link: string
  id: number
}

export type MagnetItem = {
  name: string
  price: number
  link: string
  id: number
}

export type CabinetItem = {
  name: string
  price: number
  link: string
  id: number
}

export type ModuleTypeItemById = Record<ModuleTypeId, ModuleTypeItem>

export type CornerItem = {
  name: string
  price: number
  id: number
  link: string
}

export type PowerUnitItem = {
  name: string
  price: number
  // outputPower: number
  // voltage: number
  // amperage: number
  id: number
  link: string
}

export interface Table extends InstanceType<ReturnType<typeof DataTable>> {}
export type CalculatorItem = {
  store: Store
  cartState: ReturnType<typeof useCartState>
  el: HTMLElement
  table: Table | null
}

export type IScreenCalculator = {
  list: CalculatorItem[]
  getCalculator(domEl: HTMLElement): CalculatorItem | undefined
}
