import profiles from '../../../../db/json/profiles.json'
import corners from '../../../../db/json/corners.json'
import powerUnits from '../../../../db/json/powerUnits.json'
import galvanization from '../../../../db/json/galvanization.json'
import modules from '../../../../db/json/modules.json'
import controllers from '../../../../db/json/controllers.json'
import receivingCards from '../../../../db/json/receivingCards.json'
import cabinets from '../../../../db/json/cabinets.json'
import magnets from '../../../../db/json/magnets.json'
import moduleTypes from '../../../../db/json/modulesTypes.json'
import type { DataBase } from './types'

const db: DataBase = {
  modules,
  controllers,
  profiles,
  corners,
  powerUnits,
  galvanization,
  moduleTypes,
  receivingCards,
  magnets,
  cabinets,
}

export default db
