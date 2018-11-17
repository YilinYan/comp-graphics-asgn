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
          + this.vertices[0].pos.elements + "  "
          + this.vertices[1].pos.elements + "  "
          + this.vertices[2].pos.elements)
      }

      if (this.color_type == "rainbow")
        useShader(gl, shader_rainbow)
      else 
        useShader(gl, shader_normal)

      // 优化， 不要每次都计算
      var points = new Float32Array (this.vertices.length * 3)
      this.vertices.forEach((v, i) => {
        v.pos.elements.forEach((p, j) => {
          points[i * 3 + j] = p
        })
      })

      if (this.color_type == "rainbow") {
        var colors = new Float32Array (this.vertices.length * 4)
        this.vertices.forEach((v, i) => {
          v.color.forEach((c, j) => {
            colors[i * 4 + j] = c
          }) 
        })
        sendAttributeBufferToGLSL (colors, this.vertices.length, "a_color")
      }
      else {
        sendUniformVec4ToGLSL (this.color, "color")
      }

      sendAttributeBufferToGLSL (points, this.vertices.length, "position")  
      sendUniformMatToGLSL(this.modelMatrix.elements, "transMatrix")
      tellGLSLToDrawCurrentBuffer (this.vertices.length)
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