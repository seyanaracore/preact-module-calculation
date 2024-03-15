export default interface UPageI {
  page: Page
}

interface Page {
  id: number
  parentId: number
  link: string
  'object-id': number
  'object-guid': string
  'type-id': number
  'type-guid': string
  'alt-name': string
  'update-time': number
  name: string
  href: string
  'is-active': boolean
  basetype: Basetype
  properties: Properties
}

interface Basetype {
  id: number
  module: string
  method: string
  'hide-pages': number
  title: string
}

interface Properties {
  group: Group
}

interface Group {
  '0': N0
  '1': N12
  '2': N22
  '3': N3
  '4': N4
}

interface N0 {
  id: number
  name: string
  title: string
  tip: string
  property: Property
}

interface Property {
  '0': N02
  '1': N1
}

interface N02 {
  id: number
  'object-id': number
  name: string
  type: string
  title: string
  'is-important': string
  value: Value
}

interface Value {
  value: string
}

interface N1 {
  id: number
  'object-id': number
  name: string
  type: string
  title: string
  'is-important': string
  value: Value2
}

interface Value2 {
  value: string
}

interface N12 {
  id: number
  name: string
  title: string
  tip: string
  property: Property2
}

interface Property2 {
  '0': N03
  '1': N13
  '2': N2
}

interface N03 {
  id: number
  'object-id': number
  name: string
  type: string
  title: string
  'is-important': string
  value: Value3
  'guide-id': string
  'public-guide': number
}

interface Value3 {
  item: Item
}

interface Item {
  id: number
  guid: string
  name: string
  'type-id': number
  'type-guid': string
  'update-time': string
  ownerId: number
  locked: number
  href: string
}

interface N13 {
  id: number
  'object-id': number
  name: string
  type: string
  title: string
  'is-important': string
  value: Value4
}

interface Value4 {
  value: number
}

interface N2 {
  id: number
  'object-id': number
  name: string
  type: string
  title: string
  'is-important': string
  value: Value5
}

interface Value5 {
  value: number
}

interface N22 {
  id: number
  name: string
  title: string
  tip: string
  property: Property3
}

interface Property3 {
  '0': N04
}

interface N04 {
  id: number
  'object-id': number
  name: string
  type: string
  title: string
  'is-important': string
  value: Value6
}

interface Value6 {
  value: number
}

interface N3 {
  id: number
  name: string
  title: string
  tip: string
  property: Property4
}

interface Property4 {
  '0': N05
  '1': N14
  '2': N23
}

interface N05 {
  id: number
  'object-id': number
  name: string
  type: string
  title: string
  'is-important': string
  value: Value7
}

interface Value7 {
  path: string
  folder: string
  name: string
  ext: string
  is_broken: string
  value: string
  width: number
  height: number
  alt: string
  title: string
}

interface N14 {
  id: number
  'object-id': number
  name: string
  type: string
  title: string
  'is-important': string
  value: Value8
}

interface Value8 {
  value: string
}

interface N23 {
  id: number
  'object-id': number
  name: string
  type: string
  title: string
  'is-important': string
  value: Value9
}

interface Value9 {
  '0': N06
}

interface N06 {
  id: number
  path: string
  size: number
  ext: string
  title: string
  ord: number
  folder_hash: string
  file_hash: string
  src: string
  alt: string
  width: number
  height: number
}

interface N4 {
  id: number
  name: string
  title: string
  tip: string
  property: Property5
}

interface Property5 {
  '0': N07
  '1': N15
  '2': N24
}

interface N07 {
  id: number
  'object-id': number
  name: string
  type: string
  title: string
  'is-important': string
  value: Value10
}

interface Value10 {
  value: string
}

interface N15 {
  id: number
  'object-id': number
  name: string
  type: string
  title: string
  'is-important': string
  value: Value11
}

interface Value11 {
  value: string
}

interface N24 {
  id: number
  'object-id': number
  name: string
  type: string
  title: string
  'is-important': string
  value: Value12
}

interface Value12 {
  value: string
}
