/**
 * Specifies a vertex.
 *
 * @author "Your Name Here"
 * @this {Vertex}
 */
/*
class Vertex {
  constructor() {
    this.points = []; // May want to use a vector3 instead
    this.color = [];
    this.uv = [];
    this.normal = new Vector3();
  }
}
*/
class Vertex {
  constructor(centerX, centerY, centerZ = 0) {
    this.pos = new Vector3([centerX, centerY, centerZ]);
    this.color = [];
    this.uv = [];
    this.normal = new Vector3();
  }
}