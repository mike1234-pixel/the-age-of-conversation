import { WebGLRenderer } from "three"
import { rendererDimensions } from "../constants/renderer"

export const setupRenderer = (): WebGLRenderer => {
  const renderer: WebGLRenderer = new WebGLRenderer({
    antialias: false,
  })

  renderer.setSize(rendererDimensions.width, rendererDimensions.height)
  renderer.domElement.style.width = `${rendererDimensions.width * 2}px`
  renderer.domElement.style.height = `${rendererDimensions.height * 2}px`
  renderer.domElement.style.imageRendering = "pixelated"
  renderer.domElement.style.display = "block"
  renderer.domElement.style.margin = "0 auto"

  document.body.appendChild(renderer.domElement)

  return renderer
}
