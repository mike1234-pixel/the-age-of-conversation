import { Scene, TextureLoader } from "three"

export const setupScene = (): Scene => {
  const scene: Scene = new Scene()

  const loader = new TextureLoader()
  loader.load("/assets/sprites/sky.png", function (texture) {
    scene.background = texture
  })

  return scene
}
