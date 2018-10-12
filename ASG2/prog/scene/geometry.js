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
  constructor () {
      this.vertices = []; // Vertex objects. Each vertex has x-y-z.
      this.color = [];  // The color of your geometric object
  }
  /**
   * Renders this Geometry within your webGL scene.
   */
  render () {
      sendAttributeBufferToGLSL (this.vertices, this.vertices.length, "position")
      sendUniformVec4ToGLSL (this.color, "color")

      var shape
      if (this instanceof Circle) {
          shape = "circle"
      }
      else if (this instanceof Triangle) {
          shape = "triangle"
      }
      else if (this instanceof Square) {
          shape = "square"
      }

      tellGLSLToDrawCurrentBuffer (shape, this.vertices.length)

    // Recommendations: sendUniformVec4ToGLSL(), tellGLSLToDrawCurrentBuffer(),
    // and sendAttributeBufferToGLSL() are going to be useful here.
  }
}
