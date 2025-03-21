import controllers from '../../../../db/json/controllers.json'
import getLedsAmount from '@/helpers/getLedsAmount'
import { GetTargetControllerParams } from './types'
import DBItem from '@/api/fakeBackend/types/dbItem'

const getControllerForMonochrome = ({
  module,
  modulesInHeight,
  modulesInWidth,
}: GetTargetControllerParams): DBItem | undefined => {
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
