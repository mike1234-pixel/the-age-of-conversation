import { PLAYER_PHYSICS } from "../constants/playerPhysics"

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
    if (e.key === " " && PLAYER_PHYSICS.yVelocity === 0)
      PLAYER_PHYSICS.yVelocity = PLAYER_PHYSICS.jumpStrength
  })

  return keys
}
