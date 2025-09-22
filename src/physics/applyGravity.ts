import type { PerspectiveCamera } from "three"
import { playerPhysics } from "../constants/playerPhysics"
import type { PlatformMesh } from "../entities/platform"

export const applyGravity = (
  camera: PerspectiveCamera,
  platforms: PlatformMesh[]
) => {
  playerPhysics.yVelocity += playerPhysics.gravity
  camera.position.y += playerPhysics.yVelocity

  for (const platform of platforms) {
    const px = platform.position.x
    const py = platform.position.y + 0.5
    const pz = platform.position.z
    const hw = platform.geometry.parameters.width / 2
    const hd = platform.geometry.parameters.depth / 2

    if (
      camera.position.x >= px - hw &&
      camera.position.x <= px + hw &&
      camera.position.z >= pz - hd &&
      camera.position.z <= pz + hd &&
      camera.position.y <= py + playerPhysics.height &&
      camera.position.y >= py
    ) {
      camera.position.y = py + playerPhysics.height
      playerPhysics.yVelocity = 0
    }
  }
}
