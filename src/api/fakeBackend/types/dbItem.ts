/** "" */
type EmptyField = string
type OptionalIntField = number | EmptyField

export default DBItem

type DBItem = {
  id: number
  name: string
  'parent-id': number
  kolichestvo_svetodiodov_sht: string
  razmer_mm: OptionalIntField
  proizvoditel: string
  razmer_mm_shirina_vysota: OptionalIntField
  vyhodnaya_mownost_vt: OptionalIntField
  price: number
}
