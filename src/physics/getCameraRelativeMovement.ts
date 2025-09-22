import { Vector3, type Camera } from "three"
import { directionalKeys, type DirectionalKey } from "../constants/keys"

// Temporary vector for reuse
const direction = new Vector3()
const right = new Vector3()

export const getCameraRelativeMovement = (
  keys: Partial<Record<DirectionalKey, boolean>>,
  speed: number,
  camera: Camera
): Vector3 => {
  const move = new Vector3()

  // Get forward direction (ignores y for horizontal movement)
  camera.getWorldDirection(direction)
  direction.y = 0
  direction.normalize()

  // Get right vector
  right.crossVectors(direction, camera.up).normalize()

  // WASD / Arrow movement
  if (keys[directionalKeys.W] || keys[directionalKeys.ArrowUp])
    move.add(direction.clone().multiplyScalar(speed))
  if (keys[directionalKeys.S] || keys[directionalKeys.ArrowDown])
    move.add(direction.clone().multiplyScalar(-speed))
  if (keys[directionalKeys.A] || keys[directionalKeys.ArrowLeft])
    move.add(right.clone().multiplyScalar(-speed))
  if (keys[directionalKeys.D] || keys[directionalKeys.ArrowRight])
    move.add(right.clone().multiplyScalar(speed))

  return move
}
