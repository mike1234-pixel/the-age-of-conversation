import { playerPhysics } from "./constants/playerPhysics"
import { Platform } from "./entities/platform"
import { setupRenderer } from "./setup/renderer"
import { setupInput } from "./setup/input"
import { setupScene } from "./setup/scene"
import { setupCamera } from "./setup/camera"
import { checkCollision } from "./physics/checkCollision"
import { platforms, streetWidth } from "./constants/environment"
import { Character } from "./entities/character"
import { getCameraRelativeMovement } from "./physics/getCameraRelativeMovement"
import { setupControls } from "./setup/controls"
import { applyGravity } from "./physics/applyGravity"
import { dialogue } from "./constants/dialogue"
import { PlumPudding } from "./entities/plumPudding"
import { HouseRow } from "./entities/house"
import { SpriteEntity } from "./entities/spriteEntity"
import { TextureLoader, Vector3 } from "three"
import { setupAudio } from "./setup/audio"

// Initial Setup
const scene = setupScene()

const camera = setupCamera()

const renderer = setupRenderer()

const keys = setupInput()

setupControls(camera, renderer)

setupAudio()

// Textures (preload textures for better performance)
const loader = new TextureLoader()
const cobblesTexture = loader.load("/assets/textures/cobbles.png")
const woodTexture = loader.load("/assets/textures/wood.jpg")
const historianTexture = loader.load("/assets/sprites/historian.png")
const manTexture = loader.load("/assets/sprites/man.png")
const womanTexture = loader.load("/assets/sprites/woman.png")
const aristoTexture = loader.load("/assets/sprites/aristo.png")
const rotundManTexture = loader.load("/assets/sprites/rotund-man.png")
const rotundWomanTexture = loader.load("/assets/sprites/rotund-woman.png")
const timeMachineTexture = loader.load("/assets/sprites/time-machine.png")

// Ground
new Platform(scene, {
  x: 0,
  y: 0,
  z: 0,
  width: 20,
  depth: 400,
  repeatX: 15,
  repeatZ: 150,
  texture: cobblesTexture,
})

// Jumpable platforms
new Platform(scene, {
  x: 3,
  y: 1.5,
  z: -2,
  width: 4,
  depth: 4,
  texture: woodTexture,
})

new Platform(scene, {
  x: -4,
  y: 3,
  z: 3,
  width: 3,
  depth: 3,
  texture: woodTexture,
})

new Platform(scene, {
  x: 0,
  y: 4.5,
  z: 6,
  width: 5,
  depth: 2,
  texture: woodTexture,
})

// Landmarks
new Platform(scene, {
  x: -6,
  y: 1,
  z: -5,
  width: 1,
  depth: 1,
  texture: woodTexture,
})

new Platform(scene, {
  x: 5,
  y: 1,
  z: 5,
  width: 2,
  depth: 1,
  texture: woodTexture,
})

new HouseRow({
  scene,
  startX: -streetWidth / 2,
  startZ: -70,
  numHouses: 20,
  spacing: 8,
  side: "left",
})

new HouseRow({
  scene,
  startX: streetWidth / 2,
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
    texture: woodTexture,
  })

  platforms.push(platform.mesh)

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
  texture: timeMachineTexture,
  position: new Vector3(1, 2.3, 1),
  scale: new Vector3(3, 4, 3),
})

const historian = new Character({
  scene,
  texture: historianTexture,
  position: {
    x: 2,
    y: 2,
    z: 2.5,
  },
  scale: { x: 3, y: 3 },
  speech: dialogue.historian,
  speechDuration: 9000,
})

const man = new Character({
  scene,
  texture: manTexture,
  position: { x: -4, y: 2, z: -100 },
  scale: { x: 3, y: 3 },
  speech: dialogue.man,
})

const aristo = new Character({
  scene,
  texture: aristoTexture,
  position: { x: 0, y: 2, z: -100 },
  scale: { x: 3, y: 3 },
  speech: dialogue.aristo,
})

const woman = new Character({
  scene,
  texture: womanTexture,
  position: { x: 2, y: 2, z: -100 },
  scale: { x: 3, y: 3 },
  speech: dialogue.woman,
})

const rotundMan = new Character({
  scene,
  texture: rotundManTexture,
  position: {
    x: 8,
    y: 2,
    z: 1,
  },
  scale: { x: 3, y: 3 },
  speech: dialogue.rotundMan,
})

const rotundWoman = new Character({
  scene,
  texture: rotundWomanTexture,
  position: {
    x: -8,
    y: 2,
    z: -7,
  },
  scale: { x: 3, y: 3 },
  speech: dialogue.rotundWoman,
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

  const move = getCameraRelativeMovement(keys, playerPhysics.speed, camera)
  const newPos = camera.position.clone().add(move)

  if (checkCollision(newPos)) {
    camera.position.x = newPos.x
    camera.position.z = newPos.z
  }

  applyGravity(camera, platforms)

  // Plum Pudding Collection
  plumPuddings.forEach((plumPudding) =>
    plumPudding.checkCollection(playerPosition)
  )

  renderer.render(scene, camera)
}

animate()
