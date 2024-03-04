export type ModuleItem = {
  name: string
  width: number
  height: number
  ledsInWidth: number
  ledsInHeight: number
  consumption: number
  id: number
  sku: string
  price: number
  amount: number
}

export type ModulesListItem = Pick<ModuleItem, 'id' | 'name'>

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

export type CornerItem = {
  name: string
  price: number
  id: number
}

export type PowerUnitItem = {
  name: string
  price: number
  outputPower: number
  voltage: number
  amperage: number
  id: number
}
