import { Scene, Sprite, SpriteMaterial, Texture, TextureLoader } from "three"
import { state } from "../state"

const loader = new TextureLoader()
const defaultTexture = loader.load("/assets/sprites/plum-pudding.png")

/**
 * Options for creating a PlumPudding collectible
 */
export interface PlumPuddingOptions {
  /** Three.js scene to add the collectible to */
  scene: Scene
  /** Position of the collectible in 3D space */
  position: { x: number; y: number; z: number }
  /** Preloaded sprite texture (default: loads "/assets/sprites/plum-pudding.png") */
  texture?: Texture
  /** Path to the audio file played on collection (default: "/assets/sprites/collect.mp3") */
  audioUrl?: string
}

/**
 * Represents a collectible PlumPudding in the scene.
 */
export class PlumPudding {
  sprite: Sprite
  collected: boolean
  private audio: HTMLAudioElement

  /**
   * Creates a new PlumPudding collectible.
   * @param options - Configuration object for the PlumPudding
   * @param options.scene - Three.js scene to add the sprite to
   * @param options.position - 3D position of the collectible
   * @param options.texture - Optional preloaded sprite texture
   * @param options.audioUrl - Optional path to the collection sound
   */
  constructor(options: PlumPuddingOptions) {
    const texture = options.texture ?? defaultTexture

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

    // Preload audio
    const audioUrl = options.audioUrl ?? "/assets/sfx/bell.mp3"
    this.audio = new Audio(audioUrl)
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

  /** Handles collection logic, updates state, removes the sprite, and plays audio */
  collect() {
    this.collected = true
    state.plumPuddingCount++

    const counterEl = document.getElementById(
      "plum-pudding-count"
    ) as HTMLSpanElement
    const puddingProgressBar = document.getElementById(
      "plum-puddings"
    ) as HTMLProgressElement

    counterEl.textContent = state.plumPuddingCount.toString()
    puddingProgressBar.value = state.plumPuddingCount

    // Play collection sound
    this.audio.currentTime = 0
    this.audio.play()

    this.sprite.parent?.remove(this.sprite)
  }
}
