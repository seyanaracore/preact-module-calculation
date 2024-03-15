import { ControllerItem } from '@/types'
import controllers from '../../../db/json/filtered/controllers.json'
import getLedsAmount from '@/helpers/getLedsAmount'
import { GetTargetControllerParams } from '@/api/getController/types'
import { BackControllerItem } from '@/api/getController/index'

const getControllerForMonochrome = ({
  module,
  modulesInHeight,
  modulesInWidth,
}: GetTargetControllerParams): BackControllerItem | undefined => {
  const { ledsInWidth, ledsInHeight } = getLedsAmount(module)
  const summaryLedsWidth = ledsInWidth * modulesInWidth
  const summaryLedsHeight = ledsInHeight * modulesInHeight

  if (summaryLedsWidth <= 1024 && summaryLedsHeight <= 48)
    return controllers.find((controller) => controller.id === 2839)
  else if (summaryLedsWidth <= 768 && summaryLedsHeight <= 64)
    return controllers.find((controller) => controller.id === 2373)
  else if (summaryLedsWidth <= 512 && summaryLedsHeight <= 128)
    return controllers.find((controller) => controller.id === 2498)
  else if (summaryLedsWidth <= 512 && summaryLedsHeight <= 256)
    return controllers.find((controller) => controller.id === 2498)
}

export default getControllerForMonochrome
