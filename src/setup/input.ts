import { playerPhysics } from "../constants/playerPhysics"
import { state } from "../state"

export const setupInput = (): Record<string, boolean> => {
  const keys: Record<string, boolean> = {}

  window.addEventListener("keydown", (e: KeyboardEvent) => {
    if (state.introductorySpeechComplete) {
      keys[e.key.toLowerCase()] = true
    }
  })

  window.addEventListener("keyup", (e: KeyboardEvent) => {
    if (state.introductorySpeechComplete) {
      keys[e.key.toLowerCase()] = false
    }
  })

  // Jump
  window.addEventListener("keydown", (e: KeyboardEvent) => {
    if (
      state.introductorySpeechComplete &&
      e.key === " " &&
      playerPhysics.yVelocity === 0
    ) {
      playerPhysics.yVelocity = playerPhysics.jumpStrength
    }
  })

  return keys
}
