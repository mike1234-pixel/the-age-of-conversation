import { Scene, Sprite, SpriteMaterial, TextureLoader } from "three"
import { STATE } from "../state"

/**
 * Options for creating a PlumPudding collectible
 */
export interface PlumPuddingOptions {
  /** Three.js scene to add the collectible to */
  scene: Scene
  /** Position of the collectible in 3D space */
  position: { x: number; y: number; z: number }
  /** Path to the sprite texture (default: "/assets/plum-pudding.png") */
  textureUrl?: string
}

/**
 * Represents a collectible PlumPudding in the scene.
 */
export class PlumPudding {
  sprite: Sprite
  collected: boolean

  /**
   * Creates a new PlumPudding collectible.
   * @param options - Configuration object for the PlumPudding
   * @param options.scene - Three.js scene to add the sprite to
   * @param options.position - 3D position of the collectible
   * @param options.textureUrl - Optional path to the sprite texture
   */
  constructor(options: PlumPuddingOptions) {
    const textureUrl = options.textureUrl ?? "/assets/plum-pudding.png"
    const loader = new TextureLoader()
    const texture = loader.load(textureUrl)
    const material = new SpriteMaterial({ map: texture })

    this.sprite = new Sprite(material)
    this.sprite.position.set(
      options.position.x,
      options.position.y,
      options.position.z
    )
    this.sprite.scale.set(1, 1, 1)

    options.scene.add(this.sprite)
    this.collected = false
  }

  /**
   * Checks if the player is close enough to collect this item.
   * @param playerPosition - The player's current position
   * @returns True if collected, false otherwise
   */
  checkCollection(playerPosition: { x: number; y: number; z: number }) {
    if (this.collected) return false

    const dx = this.sprite.position.x - playerPosition.x
    const dy = this.sprite.position.y - playerPosition.y
    const dz = this.sprite.position.z - playerPosition.z

    const distance = Math.sqrt(dx * dx + dz * dz)
    if (distance < 2 && Math.abs(dy) < 2) {
      this.collect()
      return true
    }
    return false
  }

  /** Handles collection logic, updates state, and removes the sprite from the scene */
  collect() {
    this.collected = true
    STATE.plumPuddingCount++

    const counterEl = document.getElementById(
      "plum-pudding-count"
    ) as HTMLSpanElement
    const puddingProgressBar = document.getElementById(
      "plum-puddings"
    ) as HTMLProgressElement

    counterEl.textContent = STATE.plumPuddingCount.toString()
    puddingProgressBar.value = STATE.plumPuddingCount

    this.sprite.parent?.remove(this.sprite)
  }
}
