import db from '../../db.json'
import { ControllerItem } from '@/types'

async function getController({
  moduleId,
  modulesInWidth,
  modulesInHeight,
}: {
  moduleId: number | string
  modulesInWidth: number
  modulesInHeight: number
}) {
  const controllers = db.controllers
  const targetModule = db.modules.find((module) => module.id === +moduleId)
  let targetController: ControllerItem | undefined

  if (!targetModule) throw new Error(`Target module not found, id ${moduleId}`)

  const summaryLedsWidth = targetModule.ledsInWidth * modulesInWidth
  const summaryLedsHeight = targetModule.ledsInHeight * modulesInHeight

  if (summaryLedsWidth <= 1024 && summaryLedsHeight <= 48)
    targetController = controllers.find((controller) => controller.id === 1)
  else if (summaryLedsWidth <= 768 && summaryLedsHeight <= 64)
    targetController = controllers.find((controller) => controller.id === 3)
  else if (summaryLedsWidth <= 512 && summaryLedsHeight <= 128)
    targetController = controllers.find((controller) => controller.id === 2)
  else if (summaryLedsWidth <= 512 && summaryLedsHeight <= 256)
    targetController = controllers.find((controller) => controller.id === 2)

  if (!targetController)
    throw new Error(
      `Target controller not found. leds width: ${summaryLedsWidth}, leds height: ${summaryLedsHeight}`
    )

  return targetController
}

export default getController
