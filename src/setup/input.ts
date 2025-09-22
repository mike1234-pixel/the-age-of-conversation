import { playerPhysics } from "../constants/playerPhysics"

export const setupInput = (): Record<string, boolean> => {
  const keys: Record<string, boolean> = {}

  // Directional Movement
  window.addEventListener(
    "keydown",
    (e: KeyboardEvent) => (keys[e.key.toLowerCase()] = true)
  )

  window.addEventListener(
    "keyup",
    (e: KeyboardEvent) => (keys[e.key.toLowerCase()] = false)
  )

  // Jump
  window.addEventListener("keydown", (e: KeyboardEvent) => {
    if (e.key === " " && playerPhysics.yVelocity === 0)
      playerPhysics.yVelocity = playerPhysics.jumpStrength
  })

  return keys
}
