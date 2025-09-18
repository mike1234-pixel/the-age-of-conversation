import {
  Scene,
  Mesh,
  BoxGeometry,
  MeshBasicMaterial,
  TextureLoader,
} from "three"

/**
 * Options for creating a single house
 */
export interface HouseOptions {
  /** Scene to add the house to */
  scene: Scene
  /** X position of the house */
  x: number
  /** Y position of the house */
  y: number
  /** Z position of the house */
  z: number
  /** Width of the house (default 6) */
  width?: number
  /** Height of the house (default 11) */
  height?: number
  /** Depth of the house (default 6) */
  depth?: number
}

/**
 * Represents a single house in the scene.
 */
export class House {
  public mesh: Mesh
  private width: number
  private height: number
  private depth: number
  private scene: Scene
  private x: number
  private y: number
  private z: number

  /**
   * Creates a new House.
   * @param options - Configuration object for the house
   */
  constructor(options: HouseOptions) {
    this.scene = options.scene
    this.x = options.x
    this.y = options.y
    this.z = options.z
    this.width = options.width ?? 6
    this.height = options.height ?? 11
    this.depth = options.depth ?? 6

    this.mesh = this.createMesh()
    this.scene.add(this.mesh)
  }

  /** Internal method to create the Three.js mesh */
  private createMesh(): Mesh {
    const loader = new TextureLoader()
    const textureMaterial = new MeshBasicMaterial({
      map: loader.load("/assets/sprites/house.png"),
    })

    const topMaterial = new MeshBasicMaterial({ color: 0x4b2e1e }) // dark brown

    // Order: right, left, top, bottom, front, back
    const materials = [
      textureMaterial, // right
      textureMaterial, // left
      topMaterial, // top
      textureMaterial, // bottom
      textureMaterial, // front
      textureMaterial, // back
    ]

    const houseMesh = new Mesh(
      new BoxGeometry(this.width, this.height, this.depth),
      materials
    )

    houseMesh.position.set(this.x, this.y + this.height / 2, this.z)
    return houseMesh
  }
}

/**
 * Options for creating a row of houses
 */
export interface HouseRowOptions {
  /** Scene to add houses to */
  scene: Scene
  /** Starting X position */
  startX: number
  /** Starting Z position */
  startZ: number
  /** Number of houses in the row */
  numHouses: number
  /** Spacing between houses */
  spacing: number
  /** Side of the street ("left" or "right") */
  side: "left" | "right"
}

/**
 * Represents a row of houses in the scene.
 */
export class HouseRow {
  private scene: Scene
  private startX: number
  private startZ: number
  private numHouses: number
  private spacing: number
  private side: "left" | "right"

  /**
   * Creates a row of houses.
   * @param options - Configuration object for the row
   */
  constructor(options: HouseRowOptions) {
    this.scene = options.scene
    this.startX = options.startX
    this.startZ = options.startZ
    this.numHouses = options.numHouses
    this.spacing = options.spacing
    this.side = options.side

    this.createRow()
  }

  /** Internal method to create all houses in the row */
  private createRow() {
    const offsetX = this.side === "left" ? -1 : 1
    for (let i = 0; i < this.numHouses; i++) {
      const zPos = this.startZ + i * this.spacing
      new House({
        scene: this.scene,
        x: this.startX + offsetX,
        y: 0,
        z: zPos,
      })
    }
  }
}
