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
  constructor(size, centerX, centerY, color) {
    super()
    this.color = color
    this.generateSquareVertices(size, centerX, centerY)

    if (DEBUG_FLAG_SQUARE == true) {
        console.log ("construct square: " + "    "
                      + this.color + "    "
                      + this.vertices[0].points + "  "
                      + this.vertices[1].points + "  "
                      + this.vertices[2].points + "  "
                      + this.vertices[3].points + "  "
                      + this.vertices[4].points + "  "
                      + this.vertices[5].points)
    }

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
  generateSquareVertices(size, centerX, centerY) {
      size /= 500
      var x = [-1, -1, 1, -1, 1, 1]
      var y = [-1, 1, 1, -1, 1, -1]
      for (var i = 0; i < 6; ++i) {
          var a = centerX + x[i] * size
          var b = centerY + y[i] * size
          this.vertices.push (new Vertex(a, b))
      }

    // Recommendations: Might want to call this within your Square constructor.
    // Keeps your code clean :)
  }
}
