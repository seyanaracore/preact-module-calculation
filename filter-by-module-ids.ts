import { pick } from 'lodash-es'

import requiredIds from './db/json/required_ids.json' assert { type: 'json' }

import modules from './db/json/modules.json' assert { type: 'json' }
import controllers from './db/json/controllers.json' assert { type: 'json' }
import profiles from './db/json/profiles.json' assert { type: 'json' }
import corners from './db/json/corners.json' assert { type: 'json' }
import powerUnits from './db/json/power-units.json' assert { type: 'json' }
import galvanization from './db/json/galvanization.json' assert { type: 'json' }
import receivingCards from './db/json/receiving-cards.json' assert { type: 'json' }
import magnets from './db/json/magnets.json' assert { type: 'json' }
import cabinets from './db/json/cabinets.json' assert { type: 'json' }

import path from 'path'
import fs from 'fs'

declare global {
  interface ObjectConstructor {
    keys<T>(obj: T): Array<keyof T>

    // @ts-ignore
    entries<T, K = keyof T>(o: T | ArrayLike<T>): [K, T[K]][]
  }
}

const filteredPath = path.resolve('db/json/filtered')

function extractModuleNumber(str: string) {
  // Регулярное выражение ищет любую латинскую букву, за которой следует число с опциональной дробной частью.
  const regex = /[A-Za-z](\d+(?:[.,]\d+)?)/
  const match = str.match(regex)

  if (match && match[1]) {
    // Заменяем запятую на точку для корректного парсинга как float.
    return parseFloat(match[1].replace(',', '.'))
  }

  return 0 // Если не найдено, вернём 0.
}

const collator = new Intl.Collator('ru', { numeric: true, sensitivity: 'base' })

const getDataFilterByRequiredIds = (field: keyof typeof requiredIds) => {
  return (data: { id: number }) => requiredIds[field].includes(data.id)
}

const filerMap: Record<keyof typeof requiredIds, Array<any>> = {
  modules,
  controllers,
  profiles,
  corners,
  powerUnits,
  galvanization,
  receivingCards,
  magnets,
  cabinets,
}

const uniqByKeepLast = <T>(list: Array<T>, key: (i: T) => T[keyof T]) => {
  return [...new Map(list.map((x) => [key(x), x])).values()]
}

Object.entries(filerMap).forEach(([fieldName, data]) => {
  const filterByRequiredIds = getDataFilterByRequiredIds(fieldName)
  const onlyRequiredData = data.filter(filterByRequiredIds)
  const uniqueRequiredData = uniqByKeepLast(onlyRequiredData, (i) => i.id)

  uniqueRequiredData.sort((a, b) => collator.compare(a.name, b.name))

  if (fieldName === 'modules') {
    uniqueRequiredData.sort((a, b) => extractModuleNumber(b.name) - extractModuleNumber(a.name))

    const boe = uniqueRequiredData.find((el) => el.id === 3384)

    if (boe) {
      boe.name = boe.name.replace('BOE BTQ025 (3840)', 'BOE, P2.5 (320*160),3840 Hz, indoor')
      boe.title = boe.title.replace('BOE BTQ025 (3840)', 'BOE, P2.5 (320*160),3840 Hz, indoor')
      boe.h1 = boe.h1.replace('BOE BTQ025 (3840)', 'BOE, P2.5 (320*160),3840 Hz, indoor')
    }
  }

  const handledData = uniqueRequiredData.map((dbItem) => {
    return pick(dbItem, [
      'id',
      'name',
      'parent-id',
      'kolichestvo_svetodiodov_sht',
      'razmer_mm',
      'razmer_mm_shirina_vysota',
      'proizvoditel',
      'vyhodnaya_mownost_vt',
      'price',
    ])
  })

  fs.writeFile(path.join(filteredPath, `${fieldName}.json`), JSON.stringify(handledData), (err) => {
    if (err) {
      return console.log(err)
    }
  })
})
