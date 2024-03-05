import { ControllerItem } from '@/types'
import controllers from '../../../db/json/filtered/controllers.json'
import getLedsAmount from '@/helpers/getLedsAmount'
import { GetTargetControllerParams } from '@/api/getController/types'

const getControllerForFullColor = ({
  module,
  modulesInHeight,
  modulesInWidth,
}: GetTargetControllerParams): ControllerItem | undefined => {
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
    return controllers.find((controller) => controller.id === 2812)
  }

  if (summaryResolution <= 2300000) {
    return controllers.find((controller) => controller.id === 2647)
  }

  if (summaryResolution <= 2600000) {
    return controllers.find((controller) => controller.id === 2342)
  }
}

export default getControllerForFullColor
