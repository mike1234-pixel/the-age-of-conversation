import type { Vector3 } from "three"
import { playerPhysics } from "../constants/playerPhysics"
import { platforms } from "../constants/environment"

export const checkCollision = (position: Vector3): boolean => {
  for (const platform of platforms) {
    const px = platform.position.x
    const py = platform.position.y + 0.5
    const pz = platform.position.z
    const hw = platform.geometry.parameters.width / 2
    const hd = platform.geometry.parameters.depth / 2

    const insideX = position.x >= px - hw && position.x <= px + hw
    const insideZ = position.z >= pz - hd && position.z <= pz + hd

    // Only consider collision if falling onto the platform
    if (
      insideX &&
      insideZ &&
      playerPhysics.yVelocity <= 0 &&
      position.y - playerPhysics.height >= py
    ) {
      return true
    }
  }

  return false
}
