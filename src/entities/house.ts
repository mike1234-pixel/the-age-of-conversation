// TODO: CONVERT TO CLASS
import {
  Scene,
  Mesh,
  BoxGeometry,
  MeshBasicMaterial,
  TextureLoader,
} from "three"

export const createHouse = (
  scene: Scene,
  x: number,
  y: number,
  z: number,
  width = 6,
  height = 11,
  depth = 6
): Mesh => {
  const loader = new TextureLoader()
  const textureMaterial = new MeshBasicMaterial({
    map: loader.load("/assets/house.png"),
  })

  const topMaterial = new MeshBasicMaterial({ color: 0x4b2e1e }) // dark brown

  // Order: right, left, top, bottom, front, back
  const materials = [
    textureMaterial, // right
    textureMaterial, // left
    topMaterial, // top
    textureMaterial, // bottom
    textureMaterial, // front
    textureMaterial, // back
  ]

  const house = new Mesh(new BoxGeometry(width, height, depth), materials)
  house.position.set(x, y + height / 2, z) // center the house vertically
  scene.add(house)
  return house
}

export const createHouseRow = (
  scene: Scene,
  startX: number,
  startZ: number,
  numHouses: number,
  spacing: number,
  side: "left" | "right"
) => {
  const offsetX = side === "left" ? -1 : 1
  for (let i = 0; i < numHouses; i++) {
    const zPos = startZ + i * spacing
    createHouse(scene, startX + offsetX, 0, zPos)
  }
}
