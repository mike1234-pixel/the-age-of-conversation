import { SpriteMaterial, Sprite, Scene, Vector3, Texture } from "three"

/**
 * Options for creating a SpriteEntity
 */
export interface SpriteEntityOptions {
  /** Three.js scene to add the sprite to */
  scene: Scene
  /** The sprite texture */
  texture: Texture
  /** Initial position of the sprite (default {0,0,0}) */
  position?: Vector3
  /** Scale of the sprite (default {1,1,1}) */
  scale?: Vector3
}

/**
 * Represents a static, non-interactive sprite in the scene.
 */
export class SpriteEntity {
  public sprite: Sprite | null = null
  private scene: Scene
  private texture: Texture
  private position: Vector3
  private scale: Vector3

  /**
   * Creates a new SpriteEntity.
   * @param options - Configuration object for the sprite
   * @param options.scene - Three.js scene to add the sprite to
   * @param options.texture - The sprite texture
   * @param options.position - Optional position in 3D space (default {0,0,0})
   * @param options.scale - Optional scale (default {1,1,1})
   */
  constructor(options: SpriteEntityOptions) {
    this.scene = options.scene
    this.texture = options.texture
    this.position = options.position ?? new Vector3(0, 0, 0)
    this.scale = options.scale ?? new Vector3(1, 1, 1)

    this.loadSprite()
  }

  /** Internal method to load the sprite texture and add it to the scene */
  private loadSprite() {
    const material = new SpriteMaterial({
      map: this.texture,
      transparent: true,
    })
    const sprite = new Sprite(material)

    sprite.position.copy(this.position)
    sprite.scale.copy(this.scale)

    this.sprite = sprite
    this.scene.add(sprite)
  }
}
