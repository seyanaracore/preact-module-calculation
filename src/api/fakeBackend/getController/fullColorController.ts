import getLedsAmount from '@/helpers/getLedsAmount'
import type { GetTargetControllerParams } from './types'
import type { DataBase, DBItem } from '../db'

const getControllerForFullColor = (
  db: DataBase,
  { module, modulesInHeight, modulesInWidth }: GetTargetControllerParams
): DBItem | undefined => {
  const { controllers } = db
  const { ledsInWidth, ledsInHeight } = getLedsAmount(module)
  const summaryLedsWidth = ledsInWidth * modulesInWidth
  const summaryLedsHeight = ledsInHeight * modulesInHeight
  const summaryResolution = summaryLedsWidth * summaryLedsHeight

  if (summaryResolution <= 204800) {
    return controllers.find((controller) => controller.id === 2347)
  }

  if (summaryResolution <= 524288) {
    return controllers.find((controller) => controller.id === 2895)
  }

  if (summaryResolution <= 655360) {
    return controllers.find((controller) => controller.id === 3236)
  }

  if (summaryResolution <= 1300000) {
    return controllers.find((controller) => controller.id === 3284)
  }

  if (summaryResolution <= 2300000) {
    return controllers.find((controller) => controller.id === 3385)
  }

  if (summaryResolution <= 2600000) {
    return controllers.find((controller) => controller.id === 2342)
  }

  if (summaryResolution <= 5200000) {
    return controllers.find((controller) => controller.id === 2501)
  }
}

export default getControllerForFullColor
