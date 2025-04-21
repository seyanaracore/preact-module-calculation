import { pick } from 'lodash-es'
import path from 'path'
import fs from 'fs'
import chalk from 'chalk'

import requiredIds from './required_ids.json'
import jsonCatalog from './json-from-csv_catalog.json'
import catalogLinks from './catalog-links.json'
import rawCatalogForProdService from './raw-catalog-for-prod-service.json'
import { ModuleItem } from '../src/types'

const JSON_TARGET_PATH = path.resolve('db/json')
const collator = new Intl.Collator('ru', { numeric: true, sensitivity: 'base' })
const idLinkMap = Object.fromEntries(catalogLinks.map(({ id, link }) => [id, link]))
let targetModules: ModuleItem[]

const errors = {
  links: {
    items: [] as number[],
    handler() {
      if (!this.items.length) {
        return false
      }

      console.error(
        chalk.red(`Не найдены ссылки для ${this.items.length} товаров: ${this.items.join(', ')}`)
      )

      return true
    },
  },
  catalog: {
    items: [] as number[],
    handler() {
      if (!this.items.length) {
        return false
      }

      console.error(
        chalk.red(`Не найдены данные для ${this.items.length} товаров: ${this.items.join(', ')}`)
      )
      return true
    },
  },
  prodServiceCatalog: {
    items: [] as number[],
    handler() {
      if (!this.items.length) {
        return false
      }

      console.error(
        chalk.red(
          `ProdService. Не найдены данные для ${this.items.length} товаров: ${this.items.join(', ')}`
        )
      )
      return true
    },
  },
}

function validateCatalog() {
  const catalogIds = jsonCatalog.map(({ id }) => id)

  Object.values(requiredIds).forEach((ids) => {
    ids.forEach((id) => {
      if (!catalogIds.includes(id)) {
        errors.catalog.items.push(id)
      }
    })
  })

  checkOnErrors()
}

function checkOnErrors() {
  let hasErrors = false

  Object.values(errors).forEach((error) => {
    hasErrors = error.handler()
  })

  if (hasErrors) {
    process.exit(1)
  }
}

function extractModuleNumber(str: string) {
  // Регулярное выражение ищет любую латинскую букву, за которой следует число с опциональной дробной частью.
  const regex = /[A-Za-z](\d+(?:[.,]\d+)?)/
  const match = str.match(regex)

  if (match && match[1]) {
    // Заменяем запятую на точку для корректного парсинга как float.
    return parseFloat(match[1].replace(',', '.'))
  }

  // Если не найдено, вернём 0.
  return 0
}

function getDataFilterByRequiredIds(field: keyof typeof requiredIds) {
  return (data: { id: number }) => requiredIds[field].includes(data.id)
}

function uniqByKeepLast<T>(list: Array<T>, key: (i: T) => T[keyof T]) {
  return [...new Map(list.map((x) => [key(x), x])).values()]
}

function createProdServiceModulesForProdService() {
  const modulesMap = Map.groupBy(targetModules, ({ id }) => id)

  const prodServiceCatalog = rawCatalogForProdService.map((moduleItem) => {
    const data = modulesMap.get(moduleItem.id)

    if (!data) {
      errors.prodServiceCatalog.items.push(moduleItem.id)
    }

    return {
      ...data,
      name: moduleItem.name,
    }
  })

  fs.writeFile(
    path.join(JSON_TARGET_PATH, `prod-service-modules.json`),
    JSON.stringify(prodServiceCatalog),
    (err) => {
      if (err) {
        return console.log(err)
      }
    }
  )
}

function run() {
  Object.keys(requiredIds).forEach((fieldName) => {
    const filterByRequiredIds = getDataFilterByRequiredIds(fieldName)
    const onlyRequiredData = jsonCatalog.filter(filterByRequiredIds)
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

    const dataWithLinks = uniqueRequiredData.map((item) => {
      const link = idLinkMap[item.id]

      if (!link) {
        errors.links.items.push(item.id)
      }

      return {
        ...item,
        link,
      }
    })

    const handledData = dataWithLinks.map((dbItem) => {
      return pick(dbItem, [
        'id',
        'name',
        'parent-id',
        'link',
        'kolichestvo_svetodiodov_sht',
        'razmer_mm',
        'razmer_mm_shirina_vysota',
        'proizvoditel',
        'vyhodnaya_mownost_vt',
        'price',
      ])
    })

    if (fieldName === 'modules') {
      targetModules = structuredClone(handledData) as unknown as ModuleItem[]
    }

    fs.writeFile(
      path.join(JSON_TARGET_PATH, `${fieldName}.json`),
      JSON.stringify(handledData),
      (err) => {
        if (err) {
          return console.log(err)
        }
      }
    )
  })

  createProdServiceModulesForProdService()
}

validateCatalog()

run()
checkOnErrors()

console.log(chalk.green('Done!'))
