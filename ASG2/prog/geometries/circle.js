/**
 * Specifies a Circle. A subclass of Geometry.
 *
 * @author "Your Name Here"
 * @this {Circle}
 */
class Circle extends Geometry {
  /**
   * Constructor for Circle.
   *
   * @constructor
   * @param {Number} radius The radius of the circle being constructed
   * @param {Integer} segments The number of segments composing the circle
   * @param {Number} centerX The central x-position of the circle
   * @param {Number} centerY The central y-position of the circle
   */
  constructor (radius, segments, centerX, centerY, color) {
      super ()
      this.color = color
      radius /= 500
      this.vertices.push (centerX, centerY)
      for (var i = 0; i <= segments; ++i) {
          var angle = Math.PI * 2 / segments * i
          var x = Math.cos (angle) * radius
          var y = Math.sin (angle) * radius
          this.generateCircleVertices (centerX + x, centerY + y)
      }

    // Recommendations: Remember that Circle is a subclass of Geometry.
    // "super" keyword can come in handy when minimizing code reuse.
  }

  /**
   * Generates the vertices of the Circle.
   *
   * @private
   * @param {Number} radius The radius of the circle being constructed
   * @param {Integer} segments The number of segments composing the circle
   * @param {Number} centerX The central x-position of the circle
   * @param {Number} centerY The central y-position of the circle
   */
  generateCircleVertices (verticeX, verticeY) {
      this.vertices.push (verticeX, verticeY)

      if (DEBUG_SHAPE == false) return
      console.log ([verticeX, verticeY])
      gl.vertexAttrib3f (position, verticeX, verticeY, 0.0);
      gl.vertexAttrib1f (size, 10)
      gl.uniform4f (color, 1, 1, 1, 1)
      gl.drawArrays (gl.POINTS, 0, 1)

    // Recommendations: Might want to call this within your Circle constructor.
    // Keeps your code clean :)
  }
}
