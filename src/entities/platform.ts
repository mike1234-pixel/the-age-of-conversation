import { BoxGeometry, Mesh, MeshBasicMaterial, Scene } from "three"

type Platform = Mesh<BoxGeometry, MeshBasicMaterial>
export const platforms: Platform[] = []

export const createPlatform = (
  scene: Scene,
  x: number, // X position in 3D space
  y: number, // Y position in 3D space
  z: number, // Z position in 3D space
  width: number, // How wide the platform is
  depth: number, // How deep the platform is
  color: number = 0x888888
): Platform => {
  const platform = new Mesh(
    new BoxGeometry(width, 1, depth),
    new MeshBasicMaterial({ color })
  )
  platform.position.set(x, y, z)
  scene.add(platform)
  platforms.push(platform)
  return platform
}
