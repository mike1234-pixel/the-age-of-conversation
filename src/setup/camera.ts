import { PerspectiveCamera } from "three"
import { RENDERER } from "../constants/renderer"

export const setupCamera = (): PerspectiveCamera => {
  const camera: PerspectiveCamera = new PerspectiveCamera(
    75,
    RENDERER.width / RENDERER.height,
    0.1,
    1000
  )
  camera.position.set(0, 2, 5)

  return camera
}
