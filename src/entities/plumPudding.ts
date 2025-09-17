import { Scene, Sprite, SpriteMaterial, TextureLoader } from "three"
import { STATE } from "../state"

export class PlumPudding {
  sprite: Sprite
  collected: boolean

  constructor(
    scene: Scene,
    position: { x: number; y: number; z: number },
    textureUrl: string = "/assets/plum-pudding.png" // path to your sprite texture
  ) {
    const loader = new TextureLoader()
    const texture = loader.load(textureUrl)
    const material = new SpriteMaterial({ map: texture })
    this.sprite = new Sprite(material)
    this.sprite.position.set(position.x, position.y, position.z)
    this.sprite.scale.set(1, 1, 1) // size of the sprite

    scene.add(this.sprite)
    this.collected = false
  }

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
    puddingProgressBar.value = 5

    this.sprite.parent?.remove(this.sprite)
  }
}
