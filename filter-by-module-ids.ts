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

const filterBy = (field: keyof typeof requiredIds) => {
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
  const handledData = uniqByKeepLast(data.filter(filterBy(fieldName)), (i) => i.id).sort(
    (a, b) => requiredIds[fieldName].indexOf(a.id) - requiredIds[fieldName].indexOf(b.id)
  )

  fs.writeFile(path.join(filteredPath, `${fieldName}.json`), JSON.stringify(handledData), (err) => {
    if (err) {
      return console.log(err)
    }
  })
})
