interface PlayerPhysics {
  speed: number
  yVelocity: number
  gravity: number
  jumpStrength: number
  height: number
}

export const PLAYER_PHYSICS: PlayerPhysics = {
  speed: 0.6,
  yVelocity: 0,
  gravity: -0.02,
  jumpStrength: 0.5,
  height: 2, // camera height above ground
}
