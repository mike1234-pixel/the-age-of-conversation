import { PLAYER_PHYSICS } from "./constants/playerPhysics"
import { Platform } from "./entities/platform"
import { setupRenderer } from "./setup/renderer"
import { setupInput } from "./setup/input"
import { setupScene } from "./setup/scene"
import { setupCamera } from "./setup/camera"
import { checkCollision } from "./physics/checkCollision"
import { STREET_WIDTH } from "./constants/street"
import { Character } from "./entities/character"
import { getCameraRelativeMovement } from "./physics/getCameraRelativeMovement"
import { setupControls } from "./setup/controls"
import { applyGravity } from "./physics/applyGravity"
import { DIALOGUE } from "./constants/dialogue"
import { PlumPudding } from "./entities/plumPudding"
import { HouseRow } from "./entities/house"
import { STATE } from "./state"
import { SpriteEntity } from "./entities/spriteEntity"
import { Vector3 } from "three"
import { setupAudio } from "./setup/audio"

// Initial Setup
const scene = setupScene()

const camera = setupCamera()

const renderer = setupRenderer()

const keys = setupInput()

setupControls(camera, renderer)

setupAudio()

// Ground
new Platform(scene, {
  x: 0,
  y: 0,
  z: 0,
  width: 20,
  depth: 400,
  repeatX: 15,
  repeatZ: 150,
  texturePath: "/assets/textures/cobbles.png",
})

// Jumpable platforms
new Platform(scene, {
  x: 3,
  y: 1.5,
  z: -2,
  width: 4,
  depth: 4,
  texturePath: "/assets/textures/wood.jpg",
})

new Platform(scene, {
  x: -4,
  y: 3,
  z: 3,
  width: 3,
  depth: 3,
  texturePath: "/assets/textures/wood.jpg",
})

new Platform(scene, {
  x: 0,
  y: 4.5,
  z: 6,
  width: 5,
  depth: 2,
  texturePath: "/assets/textures/wood.jpg",
})

// Landmarks
new Platform(scene, {
  x: -6,
  y: 1,
  z: -5,
  width: 1,
  depth: 1,
  texturePath: "/assets/textures/wood.jpg",
})

new Platform(scene, {
  x: 5,
  y: 1,
  z: 5,
  width: 2,
  depth: 1,
  texturePath: "/assets/textures/wood.jpg",
})

new HouseRow({
  scene,
  startX: -STREET_WIDTH / 2,
  startZ: -70,
  numHouses: 20,
  spacing: 8,
  side: "left",
})

new HouseRow({
  scene,
  startX: STREET_WIDTH / 2,
  startZ: -70,
  numHouses: 20,
  spacing: 8,
  side: "right",
})

// Plum Puddings

// TODO: PLUM PUDDING SHOULD EXTEND A COLLECTIBLE CLASS
const plumPuddings: PlumPudding[] = [
  new PlumPudding({ scene, position: { x: 0, y: 1, z: -15 } }),
  new PlumPudding({ scene, position: { x: 1, y: 1, z: -15 } }),
  new PlumPudding({ scene, position: { x: 2, y: 1, z: -15 } }),
  new PlumPudding({ scene, position: { x: 3, y: 1, z: -15 } }),
  new PlumPudding({ scene, position: { x: 4, y: 1, z: -15 } }),
  new PlumPudding({ scene, position: { x: 5, y: 1, z: -15 } }),
  new PlumPudding({ scene, position: { x: 6, y: 1, z: -15 } }),
  new PlumPudding({ scene, position: { x: -4, y: 4.5, z: 3 } }),
  new PlumPudding({ scene, position: { x: -6, y: 4.5, z: 3 } }),
]

// Staircase of platforms
const stairCount = 6
const stairWidth = 2
const stairDepth = 2
const stairHeight = 1.5
const startX = 7
const startY = 1
const startZ = -10

for (let i = 0; i < stairCount; i++) {
  const platform = new Platform(scene, {
    x: startX,
    y: startY + i * stairHeight,
    z: startZ + i * stairDepth,
    width: stairWidth,
    depth: stairDepth,
    texturePath: "/assets/textures/wood.jpg",
  })

  STATE.platforms.push(platform.mesh)

  // Place a plum pudding on this platform
  plumPuddings.push(
    new PlumPudding({
      scene,
      position: {
        x: startX,
        y: startY + i * stairHeight + 1, // slightly above the platform
        z: startZ + i * stairDepth,
      },
    })
  )
}

// Time Machine
new SpriteEntity({
  scene,
  texturePath: "/assets/sprites/time-machine.png",
  position: new Vector3(1, 2.3, 1),
  scale: new Vector3(3, 4, 3),
})

const historian = new Character({
  scene,
  texturePath: "/assets/sprites/historian.png",
  position: {
    x: 2,
    y: 2,
    z: 2.5,
  },
  scale: { x: 3, y: 3 },
  speech: DIALOGUE.historian,
  speechDuration: 9000,
})

const man = new Character({
  scene,
  texturePath: "/assets/sprites/man.png",
  position: { x: -4, y: 2, z: -100 },
  scale: { x: 3, y: 3 },
  speech: DIALOGUE.man,
})

const aristo = new Character({
  scene,
  texturePath: "/assets/sprites/aristo.png",
  position: { x: 0, y: 2, z: -100 },
  scale: { x: 3, y: 3 },
  speech: DIALOGUE.aristo,
})

const woman = new Character({
  scene,
  texturePath: "/assets/sprites/woman.png",
  position: { x: 2, y: 2, z: -100 },
  scale: { x: 3, y: 3 },
  speech: DIALOGUE.woman,
})

const rotundMan = new Character({
  scene,
  texturePath: "/assets/sprites/rotund-man.png",
  position: {
    x: 8,
    y: 2,
    z: 1,
  },
  scale: { x: 3, y: 3 },
  speech: DIALOGUE.rotundMan,
})

const rotundWoman = new Character({
  scene,
  texturePath: "/assets/sprites/rotund-woman.png",
  position: {
    x: -8,
    y: 2,
    z: -7,
  },
  scale: { x: 3, y: 3 },
  speech: DIALOGUE.rotundWoman,
  speechDuration: 9000,
})

// Animation loop
function animate(): void {
  requestAnimationFrame(animate)

  const playerPosition = {
    x: camera.position.x,
    y: camera.position.y,
    z: camera.position.z,
  }

  rotundMan.move(-0.01, 0, 0, playerPosition)
  rotundWoman.move(0.01, 0, 0, playerPosition)
  man.move(0, 0, 0.05, playerPosition)
  aristo.move(0, 0, 0.05, playerPosition)
  woman.move(0, 0, 0.1, playerPosition)
  historian.move(0, 0, 0, playerPosition)

  const move = getCameraRelativeMovement(keys, PLAYER_PHYSICS.speed, camera)
  const newPos = camera.position.clone().add(move)

  if (checkCollision(newPos)) {
    camera.position.x = newPos.x
    camera.position.z = newPos.z
  }

  applyGravity(camera, STATE.platforms)

  // Plum Pudding Collection
  plumPuddings.forEach((plumPudding) =>
    plumPudding.checkCollection(playerPosition)
  )

  renderer.render(scene, camera)
}

animate()
