/** "" */
type EmptyField = string
type OptionalIntField = number | EmptyField

export type DBItem = {
  id: number
  name: string
  'parent-id': number
  link: string
  kolichestvo_svetodiodov_sht: string
  razmer_mm: OptionalIntField
  proizvoditel: string
  razmer_mm_shirina_vysota: OptionalIntField
  vyhodnaya_mownost_vt: OptionalIntField
  price: number
}

export type ModuleType = {
  name: string
  /** 2256 | 2257 | 2258 */
  id: number
}

export type DataBase = {
  modules: DBItem[]
  controllers: DBItem[]
  profiles: DBItem[]
  corners: DBItem[]
  powerUnits: DBItem[]
  galvanization: DBItem[]
  moduleTypes: ModuleType[]
  receivingCards: DBItem[]
  magnets: DBItem[]
  cabinets: DBItem[]
}
