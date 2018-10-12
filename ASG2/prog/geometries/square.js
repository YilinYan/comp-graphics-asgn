/**
 * Specifies a Square. A subclass of Geometry.
 *
 * @author "Your Name Here"
 * @this {Square}
 */
class Square extends Geometry {
  /**
   * Constructor for Square.
   *
   * @constructor
   * @param {Number} size The size of the square drawn
   * @param {Number} centerX The center x-position of the square
   * @param {Number} centerY The center y-position of the square
   */
  constructor (size, centerX, centerY, color) {
      super ()
      this.color = color
      size /= 500
      var x = [-size, -size, size, size]
      var y = [size, -size, size, -size]
      for (var i = 0; i < 4; ++i)
        this.generateSquareVertices (centerX + x[i], centerY + y[i])

    // Recommendations: Remember that Square is a subclass of Geometry.
    // "super" keyword can come in handy when minimizing code reuse.
  }

  /**
   * Generates the vertices of the square.
   *
   * @private
   * @param {Number} size The size of the square drawn
   * @param {Number} centerX The center x-position of the square
   * @param {Number} centerY The center y-position of the square
   */
  generateSquareVertices (verticeX, verticeY) {
      this.vertices.push (verticeX, verticeY)

      if (DEBUG_SHAPE == false) return
      console.log ([verticeX, verticeY])
      gl.vertexAttrib3f (position, verticeX, verticeY, 0.0);
      gl.vertexAttrib1f (size, 10)
      gl.uniform4f (color, 1, 1, 1, 1)
      gl.drawArrays (gl.POINTS, 0, 1)

    // Recommendations: Might want to call this within your Square constructor.
    // Keeps your code clean :)
  }
}
