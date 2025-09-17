// TODO: CONVERT TO CLASS
import {
  BoxGeometry,
  Mesh,
  MeshBasicMaterial,
  Scene,
  TextureLoader,
  RepeatWrapping,
} from "three"

export type Platform = Mesh<BoxGeometry, MeshBasicMaterial>
export const platforms: Platform[] = []

export const createPlatform = (
  scene: Scene,
  x: number,
  y: number,
  z: number,
  width: number,
  depth: number,
  repeatX: number = 1, // how many times the texture repeats along width
  repeatZ: number = 1 // how many times the texture repeats along depth
): Platform => {
  const loader = new TextureLoader()

  const texture = loader.load("/assets/cobbles.png")
  texture.wrapS = RepeatWrapping
  texture.wrapT = RepeatWrapping
  texture.repeat.set(repeatX, repeatZ) // tile the texture

  const material = new MeshBasicMaterial({ map: texture })

  const platform = new Mesh(new BoxGeometry(width, 1, depth), material)
  platform.position.set(x, y, z)
  scene.add(platform)
  platforms.push(platform)
  return platform
}
