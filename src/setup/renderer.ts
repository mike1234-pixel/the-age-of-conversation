import { PerspectiveCamera, WebGLRenderer } from "three"
import { rendererDimensions } from "../constants/renderer"
import { state } from "../state"
import { setupAudio } from "./audio"
import { setupControls } from "./controls"

export const setupRenderer = (
  startGameCallback: () => void,
  camera: PerspectiveCamera
): WebGLRenderer => {
  const renderer: WebGLRenderer = new WebGLRenderer({
    antialias: false,
  })

  renderer.setSize(rendererDimensions.width, rendererDimensions.height)
  renderer.domElement.style.width = `${rendererDimensions.width * 2}px`
  renderer.domElement.style.height = `${rendererDimensions.height * 2}px`
  renderer.domElement.style.imageRendering = "pixelated"
  renderer.domElement.style.display = "block"
  renderer.domElement.style.margin = "0 auto"
  renderer.domElement.style.position = "relative"

  const container = document.createElement("div")
  container.style.position = "relative"
  container.style.width = renderer.domElement.style.width
  container.style.height = renderer.domElement.style.height
  container.style.margin = "0 auto"
  container.appendChild(renderer.domElement)

  const playButton = document.createElement("button")
  playButton.innerText = "▶ Play"
  playButton.style.position = "absolute"
  playButton.style.top = "50%"
  playButton.style.left = "50%"
  playButton.style.transform = "translate(-50%, -50%)"
  playButton.style.padding = "12px 24px"
  playButton.style.fontSize = "20px"
  playButton.style.borderRadius = "12px"
  playButton.style.cursor = "pointer"
  playButton.style.border = "none"
  playButton.style.background = "#222"
  playButton.style.color = "#fff"
  playButton.style.boxShadow = "0 4px 8px rgba(0,0,0,0.3)"

  container.appendChild(playButton)
  document.body.appendChild(container)

  playButton.addEventListener("click", () => {
    if (!state.gameLoopRunning) {
      state.gameLoopRunning = true
      playButton.remove()
      startGameCallback()

      setupAudio()
      setupControls(camera, renderer)
    }
  })

  return renderer
}
