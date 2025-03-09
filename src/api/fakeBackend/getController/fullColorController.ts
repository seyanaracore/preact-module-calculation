import controllers from '../../../../db/json/filtered/controllers.json'
import getLedsAmount from '@/helpers/getLedsAmount'
import { GetTargetControllerParams } from './types'
import DBItem from '@/api/fakeBackend/types/dbItem'

const getControllerForFullColor = ({
  module,
  modulesInHeight,
  modulesInWidth,
}: GetTargetControllerParams): DBItem | undefined => {
  const { ledsInWidth, ledsInHeight } = getLedsAmount(module)
  const summaryLedsWidth = ledsInWidth * modulesInWidth
  const summaryLedsHeight = ledsInHeight * modulesInHeight
  const summaryResolution = summaryLedsWidth * summaryLedsHeight

  if (summaryResolution <= 204800) {
    return controllers.find((controller) => controller.id === 3357)
  }

  if (summaryResolution <= 524288) {
    return controllers.find((controller) => controller.id === 3357)
  }

  if (summaryResolution <= 655360) {
    return controllers.find((controller) => controller.id === 3236)
  }

  if (summaryResolution <= 1300000) {
    return controllers.find((controller) => controller.id === 2812)
  }

  if (summaryResolution <= 2300000) {
    return controllers.find((controller) => controller.id === 2647)
  }

  if (summaryResolution <= 2600000) {
    return controllers.find((controller) => controller.id === 2342)
  }

  if (summaryResolution <= 5200000) {
    return controllers.find((controller) => controller.id === 2501)
  }
}

export default getControllerForFullColor
