import type { PerspectiveCamera } from "three"
import { PLAYER_PHYSICS } from "../constants/playerPhysics"
import type { Platform } from "../entities/platform"

export const applyGravity = (
  camera: PerspectiveCamera,
  platforms: Platform[]
) => {
  PLAYER_PHYSICS.yVelocity += PLAYER_PHYSICS.gravity
  camera.position.y += PLAYER_PHYSICS.yVelocity

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
      camera.position.y <= py + PLAYER_PHYSICS.height &&
      camera.position.y >= py
    ) {
      camera.position.y = py + PLAYER_PHYSICS.height
      PLAYER_PHYSICS.yVelocity = 0
    }
  }
}
