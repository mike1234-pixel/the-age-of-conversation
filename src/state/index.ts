import type { PlatformMesh } from "../entities/platform"

export interface State {
  plumPuddingCount: number
  platforms: PlatformMesh[]
}

export const STATE: State = {
  plumPuddingCount: 0,
  // TODO: is platforms really state? is there somewhere more appropriate we can put this?
  platforms: [],
}
