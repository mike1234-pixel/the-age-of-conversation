import { WebGLRenderer } from "three"
import { RENDERER } from "../constants/renderer"

export const setupRenderer = (): { renderer: WebGLRenderer } => {
  const renderer: WebGLRenderer = new WebGLRenderer({
    antialias: false,
  })
  renderer.setSize(RENDERER.width, RENDERER.height)
  renderer.domElement.style.width = `${RENDERER.width * 2}px` // scale up
  renderer.domElement.style.height = `${RENDERER.height * 2}px`
  renderer.domElement.style.imageRendering = "pixelated"
  renderer.domElement.style.display = "block"
  renderer.domElement.style.margin = "0 auto"
  document.body.appendChild(renderer.domElement)

  return { renderer }
}
