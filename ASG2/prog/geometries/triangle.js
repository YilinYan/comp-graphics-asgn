/**
 * Specifies a Triangle. A subclass of Geometry.
 *
 * @author "Your Name Here"
 * @this {Triangle}
 */
class Triangle extends Geometry {
  /**
   * Constructor for Triangle.
   *
   * @constructor
   * @param {Number} size The size of the triangle drawn
   * @param {Number} centerX The center x-position of the triangle
   * @param {Number} centerY The center y-position of the triangle
   */
  constructor (size, centerX, centerY, color) {
      super ()
      this.color = color
      size /= 500
      for (var i = Math.PI / 2; i < Math.PI * 2; i += Math.PI * 2 / 3) {
          var x = size * Math.cos (i)
          var y = size * Math.sin (i)
          this.generateTriangleVertices (centerX + x, centerY + y)
      }

    // Recommendations: Remember that Triangle is a subclass of Geometry.
    // "super" keyword can come in handy when minimizing code reuse.
  }

  /**
   * Generates the vertices of the Triangle.
   *
   * @private
   * @param {Number} size The size of the triangle drawn
   * @param {Number} centerX The center x-position of the triangle
   * @param {Number} centerY The center y-position of the triangle
   */
  generateTriangleVertices (verticeX, verticeY) {
      this.vertices.push (verticeX, verticeY)

      if (DEBUG_SHAPE == false) return
      console.log ([verticeX, verticeY])
      gl.vertexAttrib3f (position, verticeX, verticeY, 0.0);
      gl.vertexAttrib1f (size, 10)
      gl.uniform4f (color, 1, 1, 1, 1)
      gl.drawArrays (gl.POINTS, 0, 1)

    // Recommendations: Might want to call this within your Triangle constructor.
    // Keeps your code clean :)
  }
}
