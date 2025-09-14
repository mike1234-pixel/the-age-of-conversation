import { TextureLoader, Texture, NearestFilter, Vector3 } from "three"
import { KEYS } from "./constants/keys"
import { PLAYER_PHYSICS } from "./constants/playerPhysics"
import { createPlatform, platforms } from "./entities/platform"
import { setupRenderer } from "./setup/renderer"
import { setupInput } from "./setup/input"
import { setupScene } from "./setup/scene"
import { setupCamera } from "./setup/camera"
import { checkCollision } from "./physics/collision"
import { createHouseRow } from "./entities/house"
import { STREET_WIDTH } from "./constants/street"

// initial setup
const { scene } = setupScene()

const { camera } = setupCamera()

const { renderer } = setupRenderer()

const { keys } = setupInput()

// Texture
const loader: TextureLoader = new TextureLoader()
const texture: Texture = loader.load("/textures/block.png")
texture.magFilter = NearestFilter
texture.minFilter = NearestFilter

// Ground
createPlatform(scene, 0, 0, 0, 20, 400, 0xdddddd)

// Jumpable platforms
createPlatform(scene, 3, 1.5, -2, 4, 4)
createPlatform(scene, -4, 3, 3, 3, 3)
createPlatform(scene, 0, 4.5, 6, 5, 2)

// Landmarks
createPlatform(scene, -6, 1, -5, 1, 1, 0xff0000)
createPlatform(scene, 5, 1, 5, 2, 1, 0x00ff00)

createHouseRow(scene, -STREET_WIDTH / 2, -5, 20, 3, "left")
createHouseRow(scene, STREET_WIDTH / 2, -5, 20, 3, "right")

// Animation loop
function animate(): void {
  requestAnimationFrame(animate)

  // Movement
  const move = new Vector3()
  if (keys[KEYS.W] || keys[KEYS.ArrowUp]) move.z -= PLAYER_PHYSICS.speed
  if (keys[KEYS.S] || keys[KEYS.ArrowDown]) move.z += PLAYER_PHYSICS.speed
  if (keys[KEYS.A] || keys[KEYS.ArrowLeft]) move.x -= PLAYER_PHYSICS.speed
  if (keys[KEYS.D] || keys[KEYS.ArrowRight]) move.x += PLAYER_PHYSICS.speed

  const newPos = camera.position.clone().add(move)
  if (checkCollision(newPos)) {
    camera.position.x = newPos.x
    camera.position.z = newPos.z
  }

  // Gravity
  PLAYER_PHYSICS.yVelocity += PLAYER_PHYSICS.gravity
  camera.position.y += PLAYER_PHYSICS.yVelocity

  for (const platform of platforms) {
    const px = platform.position.x
    const py = platform.position.y + 0.5
    const pz = platform.position.z
    const hw = platform.geometry.parameters.width / 2
    const hd = platform.geometry.parameters.depth / 2

    if (
      camera.position.x >= px - hw &&
      camera.position.x <= px + hw &&
      camera.position.z >= pz - hd &&
      camera.position.z <= pz + hd &&
      camera.position.y <= py + PLAYER_PHYSICS.height &&
      camera.position.y >= py
    ) {
      camera.position.y = py + PLAYER_PHYSICS.height
      PLAYER_PHYSICS.yVelocity = 0
    }
  }

  renderer.render(scene, camera)
}

animate()
