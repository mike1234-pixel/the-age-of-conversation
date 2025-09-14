import { Color, Scene } from "three"

export const setupScene = (): { scene: Scene } => {
  const scene: Scene = new Scene()
  scene.background = new Color(0x87ceeb) // sky blue

  return { scene }
}
