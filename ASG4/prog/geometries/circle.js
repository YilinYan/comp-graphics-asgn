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
  constructor(radius, segments, centerX, centerY, color, color_type) {
    super()
    this.color_type = color_type
    this.color = color
    this.generateCircleVertices(radius, segments, centerX, centerY)

    if (DEBUG_FLAG_CIRCLE == true) {
        console.log ("construct circle: " + "    "
                      + this.color + "    "
                      + this.vertices[0].points + "  "
                      + this.vertices[1].points + "  "
                      + this.vertices[2].points + "  "
                      + this.vertices[3].points + "  "
                      + this.vertices[4].points + "  "
                      + this.vertices[5].points)
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
  generateCircleVertices(radius, segments, centerX, centerY) {
    radius /= 500
    for (var i = 0; i < segments; ++i) {
        var angle1 = Math.PI * 2 / segments * i
        var angle2 = Math.PI * 2 / segments * (i + 1)
        var x1 = Math.cos (angle1) * radius + centerX
        var y1 = Math.sin (angle1) * radius + centerY
        var x2 = Math.cos (angle2) * radius + centerX
        var y2 = Math.sin (angle2) * radius + centerY
        this.vertices.push (new Vertex (centerX, centerY))
        this.vertices.push (new Vertex (x1, y1))
        this.vertices.push (new Vertex (x2, y2))
    }
    
    if (this.color_type == "solid") return
    this.vertices.forEach((v, i) => {
      v.color = [Math.random(), Math.random(), Math.random(), 1]
    })
  }
}
