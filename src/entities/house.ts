import { Scene, Mesh, BoxGeometry, MeshBasicMaterial } from "three"

export function createHouse(
  scene: Scene,
  x: number,
  y: number,
  z: number,
  width = 4,
  height = 8,
  depth = 2,
  color = 0x8b4513 // brown
): Mesh {
  const house = new Mesh(
    new BoxGeometry(width, height, depth),
    new MeshBasicMaterial({ color })
  )
  house.position.set(x, y + height / 2, z) // center the house vertically
  scene.add(house)
  return house
}

export function createHouseRow(
  scene: Scene,
  startX: number,
  startZ: number,
  numHouses: number,
  spacing: number,
  side: "left" | "right"
) {
  const offsetX = side === "left" ? -1 : 1
  for (let i = 0; i < numHouses; i++) {
    const zPos = startZ + i * spacing
    createHouse(scene, startX + offsetX, 0, zPos)
  }
}
