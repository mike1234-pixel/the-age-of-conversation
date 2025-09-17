import { PLAYER_PHYSICS } from "./constants/playerPhysics"
import { createPlatform, platforms } from "./entities/platform"
import { setupRenderer } from "./setup/renderer"
import { setupInput } from "./setup/input"
import { setupScene } from "./setup/scene"
import { setupCamera } from "./setup/camera"
import { checkCollision } from "./physics/checkCollision"
import { createHouseRow } from "./entities/house"
import { STREET_WIDTH } from "./constants/street"
import { Character } from "./entities/character"
import { getCameraRelativeMovement } from "./physics/getCameraRelativeMovement"
import { setupControls } from "./setup/controls"
import { applyGravity } from "./physics/applyGravity"
import { createTimeMachine } from "./entities/timeMachine"
import { DIALOGUE } from "./constants/dialogue"
import { PlumPudding } from "./entities/plumPudding"

// Initial Setup
const scene = setupScene()

const camera = setupCamera()

const renderer = setupRenderer()

const keys = setupInput()

setupControls(camera, renderer)

// Ground
createPlatform(scene, 0, 0, 0, 20, 400, 15, 150)

// Jumpable platforms
createPlatform(scene, 3, 1.5, -2, 4, 4)
createPlatform(scene, -4, 3, 3, 3, 3)
createPlatform(scene, 0, 4.5, 6, 5, 2)

// Landmarks
createPlatform(scene, -6, 1, -5, 1, 1)
createPlatform(scene, 5, 1, 5, 2, 1)

createHouseRow(scene, -STREET_WIDTH / 2, -70, 20, 8, "left")
createHouseRow(scene, STREET_WIDTH / 2, -70, 20, 8, "right")

// Plum Puddings
const plumPuddings: PlumPudding[] = [
  new PlumPudding(scene, { x: 0, y: 1, z: -15 }),
  new PlumPudding(scene, { x: 1, y: 1, z: -15 }),
  new PlumPudding(scene, { x: 2, y: 1, z: -15 }),
  new PlumPudding(scene, { x: 3, y: 1, z: -15 }),
  new PlumPudding(scene, { x: 4, y: 1, z: -15 }),
  new PlumPudding(scene, { x: 5, y: 1, z: -15 }),
  new PlumPudding(scene, { x: 6, y: 1, z: -15 }),
  new PlumPudding(scene, { x: -4, y: 4.5, z: 3 }),
  new PlumPudding(scene, { x: -6, y: 4.5, z: 3 }),
]

// Time Machine
createTimeMachine(scene)

// TO DO: PASS IN AN OBJECT AS A SINGLE PARAMETER
// TO MAKE IT CLEAR AT A GLANCE WHAT THESE ARGUMENTS ARE
const historian = new Character(
  scene,
  "/assets/historian.png",
  {
    x: 2,
    y: 2,
    z: 2.5,
  },
  { x: 3, y: 3 },
  DIALOGUE.historian,
  9000
)

const man = new Character(
  scene,
  "/assets/man.png",
  {
    x: -4,
    y: 2,
    z: -100,
  },
  { x: 3, y: 3 },
  DIALOGUE.man
)

const rotundMan = new Character(
  scene,
  "/assets/rotund-man.png",
  {
    x: 8,
    y: 2,
    z: 1,
  },
  { x: 3, y: 3 },
  DIALOGUE.rotundMan
)

const rotundWoman = new Character(
  scene,
  "/assets/rotund-woman.png",
  {
    x: -8,
    y: 2,
    z: -7,
  },
  { x: 3, y: 3 },
  DIALOGUE.rotundWoman,
  9000
)

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
  historian.move(0, 0, 0, playerPosition)

  const move = getCameraRelativeMovement(keys, PLAYER_PHYSICS.speed, camera)
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
