import { Vector3, type Camera } from "three"
import { KEYS } from "../constants/keys"

// Temporary vector for reuse
const direction = new Vector3()
const right = new Vector3()

export const getCameraRelativeMovement = (
  keys: any,
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
  if (keys[KEYS.W] || keys[KEYS.ArrowUp])
    move.add(direction.clone().multiplyScalar(speed))
  if (keys[KEYS.S] || keys[KEYS.ArrowDown])
    move.add(direction.clone().multiplyScalar(-speed))
  if (keys[KEYS.A] || keys[KEYS.ArrowLeft])
    move.add(right.clone().multiplyScalar(-speed))
  if (keys[KEYS.D] || keys[KEYS.ArrowRight])
    move.add(right.clone().multiplyScalar(speed))

  return move
}
