/**
 * Specifies a tilted cube which rotates.
 *
 * @author "Your Name"
 * @this {TiltedCube}
 */

class Plane extends Geometry {
  /**
   * Constructor for TiltedCube.
   *
   * @constructor
   * @returns {TiltedCube} Geometric object created
   */
  constructor(center, size, color) {
      super()
      this.color = color
      this.generateCubeVertices()
      this.points = this.getPoints()
      this.normals = this.getNormals()

      this.modelMatrix.translate(center[0], center[1], center[2])
      this.modelMatrix.scale(size, size, size)
      this.ks = 10
      this.kd = 1
      this.spower = 10
  }

  /**
   * Generates the vertices of TiltedCube. Just a regular cube.
   *
   * @private
   */

    getPoints() {
        var m_points = new Float32Array (this.vertices.length * 3)
        this.vertices.forEach((v, i) => {
            v.pos.elements.forEach((p, j) => {
                m_points[i * 3 + j] = p
            })
        })
        return m_points
    }

    getNormals() {
        var m_normals = new Float32Array (this.vertices.length * 3)
        this.vertices.forEach((v, i) => {
            v.normal.elements.forEach((norm, j) => {
                m_normals[i * 3 + j] = norm
            })
        })
        return m_normals
    }

    generateCubeVertices() {
        var x = [0, 0, 1, 1, 1, 0]
        var y = [0, 1, 1, 1, 0, 0]

        for (var i = 0; i < 6; ++i) {
            var vrt = new Vertex (x[i], 0, y[i]);
            vrt.normal = new Vector3([0, 1, 0]);
            this.vertices.push (vrt);
        }
    }

    render() {
        /*
        sendUniformFloatToGLSL(this.kd, "u_diffuseIntensity");
        sendUniformFloatToGLSL(this.ks, "u_specularIntensity");
        sendUniformFloatToGLSL(this.spower, "u_spower");
        */
        sendUniformVec4ToGLSL (this.color, "u_color")
        sendUniformMatToGLSL (this.modelMatrix.elements, "transMatrix")
        tellGLSLToDrawCurrentBuffer (this.vertices.length)
    }
    
}
