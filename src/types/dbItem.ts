/** "" */
type EmptyField = string
type OptionalIntField = number | EmptyField

export type DBItem = {
  id: number
  name: string
  'type-id': number
  'is-active': number
  'template-id': number
  'parent-id': number
  'alt-name': string
  title: string
  h1: string
  show_submenu: string
  index_source: string
  index_state: string
  index_date: string
  index_choose: string
  index_level: string
  descr: string
  text_under_catalog: string
  photo: string
  tax_rate_id: string
  price: number
  old_price: number
  common_quantity: number
  description: string
  '1c_catalog_id': string
  '1c_product_id': string
  artikul: string
  photos: string
  text_above_catalog: string
  tip: string
  raznovidnost: string
  upravlenie: string
  vyhodnaya_mownost_vt: OptionalIntField
  napryazhenie_v: OptionalIntField
  kolichestvo_svetodiodov_sht: string
  shag_pikselya_mm: OptionalIntField
  gercovka_hz: OptionalIntField
  yarkost_nits: OptionalIntField
  razmer_mm: OptionalIntField
  proizvoditel: string
  best_offers: string
  svetovoj_potok_lm: string
  cvet: string
  temperatura_k: string
  'isklyuchit_iz_publikacii_na_veb-vitrine_mag1c': string
  interfejs: string
  razmer_mm_shirina_vysota: OptionalIntField
  brend: string
  new: OptionalIntField
  sila_toka_a: string
  shirina_mm: OptionalIntField
  kratnost_reza_sm: string
}
