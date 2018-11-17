/**
 * Specifies a tilted cube which rotates.
 *
 * @author "Your Name"
 * @this {TiltedCube}
 */

class TiltedCube extends Geometry {
  /**
   * Constructor for TiltedCube.
   *
   * @constructor
   * @returns {TiltedCube} Geometric object created
   */
  constructor(size, centerX, centerY, color) {
      super()
      this.color = color
      this.generateCubeVertices(size, centerX, centerY)
      this.startTime = Date.now()
      this.centerX = centerX
      this.centerY = centerY

      if (DEBUG_FLAG_CUBE == true) {
          console.log ("construct cube: " + "    "
                        + this.color + "    "
                        + this.vertices[0].pos.elements)
      }
  }

  /**
   * Generates the vertices of TiltedCube. Just a regular cube.
   *
   * @private
   */
  generateCubeVertices(size, centerX, centerY) {
      size /= 2;
      var x = [0, 0, 0, 0, 1, -1]
      var y = [0, 0, 1, -1, 0, 0]
      var z = [1, -1, 0, 0, 0, 0]
      var a = [-1, -1, 1, -1, 1, 1]
      var b = [-1, 1, 1, -1, 1, -1]

      for (var i = 0; i < 6; ++i) {
          for (var j = 0; j < 6; ++j) {
              var newX, newY, newZ
              if (x[i] != 0) { newX = x[i]; newY = a[j]; newZ = b[j]; }
              else if (y[i] != 0) { newX = a[j]; newY = y[i]; newZ = b[j];}
              else { newX = a[j]; newY = b[j]; newZ = z[i];}
              newX = centerX + size * newX + size;
              newY = centerY + size * newY + size;
              newZ = size * newZ + size;
              this.vertices.push (new Vertex (newX, newY, newZ))
          }
      }
  }

  /**
   * Updates the animation of the TiltedCube. Should make it rotate.
   */
  /*
  updateAnimation() {
      var delta = (Date.now() - this.startTime) / 50.
      var t1 = new Matrix4().setTranslate (-this.centerX, -this.centerY, 0)
      var r = new Matrix4().setRotate (delta, 1, 1, 1)
      var t2 = new Matrix4().setTranslate (this.centerX, this.centerY, 0)
      this.modelMatrix = t2.multiply(r).multiply(t1)
  }
  */
}
