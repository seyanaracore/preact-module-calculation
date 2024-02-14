import db from '../../db.json'

const fakeBackend = {
  getControllerBySize({ width, height }: { width: number; height: number }) {
    const controllers = db.controllers
    let targetController = null

    if (width <= 587 && height === 48)
      targetController = controllers.find((controller) => controller.id === 1)
    else if (width <= 587 && height <= 64)
      targetController = controllers.find((controller) => controller.id === 3)
    else if (width <= 512 && height <= 128)
      targetController = controllers.find((controller) => controller.id === 2)
    else if (width <= 512 && height <= 256)
      targetController = controllers.find((controller) => controller.id === 2)

    if (!targetController) throw new Error('Target controller not found')

    return targetController
  },
}

export default fakeBackend
