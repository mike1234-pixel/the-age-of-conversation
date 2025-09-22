export const directionalKeys = {
  W: "w",
  A: "a",
  S: "s",
  D: "d",
  ArrowUp: "arrowup",
  ArrowDown: "arrowdown",
  ArrowLeft: "arrowleft",
  ArrowRight: "arrowright",
} as const

export type DirectionalKey =
  (typeof directionalKeys)[keyof typeof directionalKeys]
