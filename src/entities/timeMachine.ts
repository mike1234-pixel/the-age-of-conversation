import { TextureLoader, SpriteMaterial, Sprite, Scene } from "three"

export function createTimeMachine(scene: Scene) {
  const loader = new TextureLoader()

  loader.load("/assets/time-machine.png", (texture) => {
    const material = new SpriteMaterial({ map: texture, transparent: true })
    const sprite = new Sprite(material)

    sprite.scale.set(3, 4, 3)
    sprite.position.set(1, 2.3, 1)

    scene.add(sprite)
  })
}
