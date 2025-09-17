import type { PerspectiveCamera, WebGLRenderer } from "three"
import { PointerLockControls } from "three/examples/jsm/Addons.js"

export const setupControls = (
  camera: PerspectiveCamera,
  renderer: WebGLRenderer
): void => {
  const controls = new PointerLockControls(camera, renderer.domElement)

  // Click to enable mouse movement
  document.addEventListener("click", () => {
    controls.lock()
  })
}
