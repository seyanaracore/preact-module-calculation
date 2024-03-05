import requiredIds from './db/json/required_ids.json' assert { type: 'json' }

import modules from './db/json/modules.json' assert { type: 'json' }
import controllers from './db/json/controllers.json' assert { type: 'json' }
import profiles from './db/json/profiles.json' assert { type: 'json' }
import corners from './db/json/corners.json' assert { type: 'json' }
import powerUnits from './db/json/power-units.json' assert { type: 'json' }
import galvanization from './db/json/galvanization.json' assert { type: 'json' }

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
}

Object.entries(filerMap).forEach(([fieldName, data]) => {
  fs.writeFile(
    path.join(filteredPath, `${fieldName}.json`),
    JSON.stringify(data.filter(filterBy(fieldName))),
    (err) => {
      if (err) {
        return console.log(err)
      }
    }
  )
})
