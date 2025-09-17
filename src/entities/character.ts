import { Sprite, Scene, TextureLoader, SpriteMaterial } from "three"

interface Vector3 {
  x: number
  y: number
  z: number
}

interface Scale {
  x: number
  y: number
}

// 🔑 Global tracker for speech
let currentSpeechTimeout: number | null = null
let currentSpeaker: Character | null = null

export class Character {
  sprite: Sprite
  stopDistance: number = 4
  speaking: boolean = false
  hasSpoken: boolean = false // Track if player already triggered speech
  speech: string | string[] = "Hello sir!" // Can be a single string or sequence
  speechDuration: number

  constructor(
    scene: Scene,
    texturePath: string,
    position: Vector3 = { x: 0, y: 0, z: 0 },
    scale: Scale = { x: 4, y: 4 },
    speech: string | string[],
    speechDuration?: number
  ) {
    this.speech = speech
    this.speechDuration = speechDuration ?? 3000 // Default for one line of speech, extend duration for speech sequences
    const loader = new TextureLoader()
    const texture = loader.load(texturePath)

    this.sprite = new Sprite(new SpriteMaterial({ map: texture }))
    this.sprite.position.set(position.x, position.y, position.z)
    this.sprite.scale.set(scale.x, scale.y, 1)

    scene.add(this.sprite)
  }

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
        // Only trigger speech if it hasn't been triggered yet
        if (!this.speaking && !this.hasSpoken) {
          this.speak(this.speech)
          this.hasSpoken = true
        }
        return
      } else {
        // Reset for next approach
        this.speaking = false
        this.hasSpoken = false
      }
    }

    this.sprite.position.x += dx
    this.sprite.position.y += dy
    this.sprite.position.z += dz
  }

  setPosition(x: number, y: number, z: number): void {
    this.sprite.position.set(x, y, z)
  }

  speak(text: string | string[]) {
    const subtitleEl = document.getElementById("subtitles")
    if (!subtitleEl) return

    // If another character is speaking, stop them
    if (currentSpeechTimeout) {
      clearTimeout(currentSpeechTimeout)
      currentSpeechTimeout = null
    }
    if (currentSpeaker) {
      currentSpeaker.speaking = false
    }

    currentSpeaker = this
    this.speaking = true

    // Normalize input to array
    const lines = Array.isArray(text) ? text : [text]
    let index = 0

    const showNextLine = () => {
      if (index >= lines.length) {
        subtitleEl.textContent = ""
        this.speaking = false
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
