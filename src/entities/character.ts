import { Sprite, Scene, Texture, SpriteMaterial } from "three"
import { state } from "../state"

interface Vector3 {
  x: number
  y: number
  z: number
}

interface Scale {
  x: number
  y: number
}

export interface CharacterOptions {
  /** Three.js scene to add the character to */
  scene: Scene
  /** The character texture */
  texture: Texture
  /** Initial position of the character */
  position?: Vector3
  /** Scale of the character sprite */
  scale?: Scale
  /** Dialogue text or sequence of lines the character will say */
  speech?: string | string[]
  /** Duration in milliseconds for each line of speech */
  speechDuration?: number
  /** Whether character initial speech is introductory */
  speechIsIntroductory?: boolean
}

// 🔑 Global tracker for speech
let currentSpeechTimeout: number | null = null
let currentSpeaker: Character | null = null

/**
 * Represents a static or moving character in the scene that can speak.
 */
export class Character {
  sprite: Sprite
  stopDistance: number = 4
  speaking: boolean = false
  hasSpoken: boolean = false
  speech: string | string[] = "Hello sir!"
  speechDuration: number
  speechIsIntroductory: boolean = false

  /**
   * Creates a new character.
   * @param options.scene - Three.js scene to add the character to
   * @param options.texture - The sprite texture
   * @param options.position - Optional initial position (default { x:0, y:0, z:0 })
   * @param options.scale - Optional sprite scale (default { x:4, y:4 })
   * @param options.speech - Optional dialogue text or array of lines (default "Hello sir!")
   * @param options.speechDuration - Optional duration per line in ms (default 3000)
   * @param options.speechIsIntroductory - Optional whether character speech is introductory (default false)
   */
  constructor({
    scene,
    texture,
    position = { x: 0, y: 0, z: 0 },
    scale = { x: 4, y: 4 },
    speech = "Hello sir!",
    speechDuration = 8000,
    speechIsIntroductory = false,
  }: CharacterOptions) {
    this.speech = speech
    this.speechDuration = speechDuration
    this.speechIsIntroductory = speechIsIntroductory

    this.sprite = new Sprite(new SpriteMaterial({ map: texture }))
    this.sprite.position.set(position.x, position.y, position.z)
    this.sprite.scale.set(scale.x, scale.y, 1)

    scene.add(this.sprite)
  }

  /**
   * Moves the character by the given offsets. Optionally stops to trigger speech when near a player.
   * @param dx - Movement along X axis (default 0)
   * @param dy - Movement along Y axis (default 0)
   * @param dz - Movement along Z axis (default 0)
   * @param playerPosition - Optional player position to trigger speech when close
   */
  move(
    dx: number = 0,
    dy: number = 0,
    dz: number = 0,
    playerPosition?: Vector3
  ): void {
    if (playerPosition) {
      const distance = Math.sqrt(
        Math.pow(this.sprite.position.x - playerPosition.x, 2) +
          Math.pow(this.sprite.position.y - playerPosition.y, 2) +
          Math.pow(this.sprite.position.z - playerPosition.z, 2)
      )

      if (distance <= this.stopDistance) {
        if (!this.speaking && !this.hasSpoken) {
          this.speak(this.speech)
          this.hasSpoken = true
        }
        return
      } else {
        this.speaking = false
        this.hasSpoken = false
      }
    }

    this.sprite.position.x += dx
    this.sprite.position.y += dy
    this.sprite.position.z += dz
  }

  /**
   * Sets the character's position directly.
   * @param x - X coordinate
   * @param y - Y coordinate
   * @param z - Z coordinate
   */
  setPosition(x: number, y: number, z: number): void {
    this.sprite.position.set(x, y, z)
  }

  /**
   * Displays speech lines as subtitles in the DOM element with ID 'subtitles'.
   * Automatically handles timing for multiple lines and ensures only one character speaks at a time.
   * @param text - Single line or array of lines to display
   */
  speak(text: string | string[]) {
    const subtitleEl = document.getElementById("subtitles")
    if (!subtitleEl) return

    if (currentSpeechTimeout) {
      clearTimeout(currentSpeechTimeout)
      currentSpeechTimeout = null
    }
    if (currentSpeaker) {
      currentSpeaker.speaking = false
    }

    currentSpeaker = this
    this.speaking = true

    const lines = Array.isArray(text) ? text : [text]
    let index = 0

    const showNextLine = () => {
      if (index >= lines.length) {
        subtitleEl.textContent = ""
        this.speaking = false

        if (this.speechIsIntroductory && !state.introductorySpeechComplete) {
          state.introductorySpeechComplete = true
        }

        if (currentSpeaker === this) currentSpeaker = null
        currentSpeechTimeout = null
        return
      }

      subtitleEl.textContent = lines[index]
      index++

      currentSpeechTimeout = window.setTimeout(
        showNextLine,
        this.speechDuration
      )
    }

    showNextLine()
  }
}
