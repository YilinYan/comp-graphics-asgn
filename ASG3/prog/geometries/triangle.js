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
  constructor(size, centerX, centerY, color) {
      super ()
      this.color = color
      this.generateTriangleVertices (size, centerX, centerY)

      if (DEBUG_FLAG_TRIANGLE == true) {
          console.log ("construct triangle: " + "    "
                        + this.color + "    "
                        + this.vertices[0].points + "  "
                        + this.vertices[1].points + "  "
                        + this.vertices[2].points);
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
    generateTriangleVertices (size, centerX, centerY) {
        size /= 500
        for (var i = Math.PI / 2; i < Math.PI * 2; i += Math.PI * 2 / 3) {
           var x = size * Math.cos (i) + centerX
           var y = size * Math.sin (i) + centerY
           this.vertices.push (new Vertex (x, y))
        }

       // Recommendations: Might want to call this within your Triangle constructor.
       // Keeps your code clean :)
   }
}
