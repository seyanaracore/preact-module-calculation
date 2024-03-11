import { ModuleTypeId } from '@/api/enums'

export type ModuleItem = {
  name: string
  width: number
  height: number
  ledsInWidth: number
  ledsInHeight: number
  consumption: number
  typeId: ModuleTypeId
  id: number
  sku: string
  price: number
}

export type ModulesListItem = Pick<ModuleItem, 'id' | 'name'> & {
  'parent-id': ModuleTypeId
}

export type ControllerItem = {
  name: string
  id: number
  price: number
}

export type ProfileItem = {
  name: string
  price: number
  id: number
}

export type GalvanizationItem = {
  name: string
  price: number
  id: number
}

export type ModuleTypeItem = {
  name: string
  id: ModuleTypeId
}

export type ReceivingItem = {
  name: string
  price: number
  id: number
}

export type MagnetItem = {
  name: string
  price: number
  id: number
}

export type ModuleTypeItemById = Record<ModuleTypeId, ModuleTypeItem>

export type CornerItem = {
  name: string
  price: number
  id: number
}

export type PowerUnitItem = {
  name: string
  price: number
  // outputPower: number
  // voltage: number
  // amperage: number
  id: number
}
