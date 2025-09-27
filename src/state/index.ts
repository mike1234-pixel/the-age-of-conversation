export interface State {
  plumPuddingCount: number
  gameLoopRunning: boolean
  introductorySpeechComplete: boolean
}

export const state: State = {
  plumPuddingCount: 0,
  gameLoopRunning: false,
  introductorySpeechComplete: false,
}
