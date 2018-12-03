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
  constructor(size, color) {
      super()
      this.color = color
      this.generateCubeVertices(1)

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
  generateCubeVertices(size) {
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
              newX = size * newX + size;
              newY = size * newY + size;
              newZ = size * newZ + size;
              var vrt = new Vertex (newX, newY, newZ);
              vrt.normal = new Vector3([x[i], y[i], z[i]]);
              this.vertices.push (vrt);
          }  
      }
  }
}
