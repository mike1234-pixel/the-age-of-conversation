import { PerspectiveCamera } from "three"
import { rendererDimensions } from "../constants/renderer"

export const setupCamera = (): PerspectiveCamera => {
  const camera: PerspectiveCamera = new PerspectiveCamera(
    75,
    rendererDimensions.width / rendererDimensions.height,
    0.1,
    1000
  )
  camera.position.set(0, 2, 5)

  return camera
}
