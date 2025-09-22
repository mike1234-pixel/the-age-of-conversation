import {
  BoxGeometry,
  Mesh,
  MeshBasicMaterial,
  Scene,
  Texture,
  RepeatWrapping,
} from "three"
import { platforms } from "../constants/environment"

export type PlatformMesh = Mesh<BoxGeometry, MeshBasicMaterial>

export interface PlatformOptions {
  /** X position of the platform */
  x: number
  /** Y position of the platform */
  y: number
  /** Z position of the platform */
  z: number
  /** Width of the platform */
  width: number
  /** Depth of the platform */
  depth: number
  /** Number of times the texture repeats along the width */
  repeatX?: number
  /** Number of times the texture repeats along the depth */
  repeatZ?: number
  /** The surface texture */
  texture: Texture
}

/**
 * Represents a static platform in the scene.
 */
export class Platform {
  public mesh: PlatformMesh
  private scene: Scene
  private x: number
  private y: number
  private z: number
  private width: number
  private depth: number
  private repeatX: number
  private repeatZ: number
  private texture: Texture

  /**
   * Creates a new Platform.
   * @param scene - Three.js Scene to add the platform to
   * @param options - Configuration options for the platform
   * @param options.x - X position
   * @param options.y - Y position
   * @param options.z - Z position
   * @param options.width - Width of the platform
   * @param options.depth - Depth of the platform
   * @param options.repeatX - (Optional) Number of times the texture repeats along width, default 1
   * @param options.repeatZ - (Optional) Number of times the texture repeats along depth, default 1
   * @param options.texture - The texture of the surface
   */
  constructor(scene: Scene, options: PlatformOptions) {
    this.scene = scene
    this.x = options.x
    this.y = options.y
    this.z = options.z
    this.width = options.width
    this.depth = options.depth
    this.repeatX = options.repeatX ?? 1
    this.repeatZ = options.repeatZ ?? 1
    this.texture = options.texture

    this.texture.wrapS = RepeatWrapping
    this.texture.wrapT = RepeatWrapping
    this.texture.repeat.set(this.repeatX, this.repeatZ)

    this.mesh = this.createMesh()
    this.scene.add(this.mesh)
    platforms.push(this.mesh)
  }

  /**
   * Creates the Three.js mesh for the platform.
   * @returns The mesh representing the platform
   */
  private createMesh(): PlatformMesh {
    const material = new MeshBasicMaterial({ map: this.texture })
    const platformMesh = new Mesh(
      new BoxGeometry(this.width, 1, this.depth),
      material
    )
    platformMesh.position.set(this.x, this.y, this.z)

    return platformMesh
  }
}
