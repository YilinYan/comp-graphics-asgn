/**
 * Specifies a geometric object.
 *
 * @author "Your Name Here"
 * @this {Geometry}
 */
class Geometry {
  /**
   * Constructor for Geometry.
   *
   * @constructor
   */
  constructor() {
    this.vertices = []; // Vertex objects. Each vertex has x-y-z.
    this.color = [];  // The color of your geometric object
    this.modelMatrix = new Matrix4().setIdentity()

 // Model matrix applied to geometric object

  }

  /**
   * Renders this Geometry within your webGL scene.
   */
  render() {
      if (DEBUG_FLAG == true) {
          console.log (this.constructor.name + "    "
          + this.color + "    "
          + this.vertices[0].points + "  "
          + this.vertices[1].points + "  "
          + this.vertices[2].points)
      }

      sendAttributeBufferToGLSL (this.vertices, this.vertices.length, "position")
      sendUniformVec4ToGLSL (this.color, "color")
      sendUniformMatToGLSL(this.modelMatrix.elements, "transMatrix")
      tellGLSLToDrawCurrentBuffer (this.vertices.length)

    // Recommendations: sendUniformVec4ToGLSL(), tellGLSLToDrawCurrentBuffer(),
    // and sendAttributeBufferToGLSL() are going to be useful here.
  }

  /**
   * Responsible for updating the geometry's modelMatrix for animation.
   * Does nothing for non-animating geometry.
   */
  updateAnimation() {
    return;

    // NOTE: This is just in place so you'll be able to call updateAnimation()
    // on geometry that don't animate. No need to change anything.
  }
}
