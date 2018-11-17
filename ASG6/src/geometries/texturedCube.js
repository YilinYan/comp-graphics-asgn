/**
 * A cube with a single textured applied in multiple different ways. A subclass
 * of TiltedCube.
 *
 * @author "Your Name Here"
 * @this {MultiTextureCube}
 */

var m_points = null;
var m_uvs = null;
var m_normals = null;

class MultiTextureCube extends TiltedCube {
  /**
   * Constructor for MultiTextureCube
   *
   * @constructor
   * @param {String} texturePath The filepath/URL of the image used as a texture
   */

  constructor(size, centerX, centerY, image) {
    super (size, centerX, centerY, [1, 1, 1, 1])
    this.image = image
    this.generateUVCoordinates()
    this.points = this.getPoints()
    this.uvs = this.getUvs()
    this.normals = this.getNormals()
  }

  /**
   * Generates the texture coordinates of CheckerCube.
   *
   * @private
   */
  generateUVCoordinates() {
    var UV = [[0, 0], [0, 1], [1, 1], [0, 0], [1, 1], [1, 0]]

    this.vertices.forEach((v, i) => {
      v.uv = UV[i % 6]
    })
  }

  getPoints() {
    if(m_points) return m_points;
    m_points = new Float32Array (this.vertices.length * 3)
    this.vertices.forEach((v, i) => {
      v.pos.elements.forEach((p, j) => {
        m_points[i * 3 + j] = p
      })
    })
    return m_points
  }

  getUvs() {
    if(m_uvs) return m_uvs;
    m_uvs = new Float32Array (this.vertices.length * 2)
    this.vertices.forEach((v, i) => {
      v.uv.forEach((uv, j) => {
        m_uvs[i * 2 + j] = uv
      })
    })
    return m_uvs
  }

  getNormals() {
    if(m_normals) return m_normals;
    m_normals = new Float32Array (this.vertices.length * 3)
    this.vertices.forEach((v, i) => {
      v.normal.elements.forEach((norm, j) => {
        m_normals[i * 3 + j] = norm
      })
    })
    return m_normals
  }

  /**
   * Renders MultiTextureCube.
   */
  render() {
 //   gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, 1)
//    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGB, gl.RGB, gl.UNSIGNED_BYTE, this.image)
/*
    gl.activeTexture(gl.TEXTURE0)
    gl.bindTexture(gl.TEXTURE_2D, this.image)
*/
//    sendUniformImageToGLSL ("u_sampler") 
    sendUniformMatToGLSL (this.modelMatrix.elements, "transMatrix")
//    sendAttributeBufferToGLSL (this.points, this.vertices.length, "position")  
//    sendAttributeBufferToGLSL (this.uvs, this.vertices.length, "a_texCoord")
//    sendAttributeBufferToGLSL (this.normals, this.vertices.length, "a_normal")

    tellGLSLToDrawCurrentBuffer (this.vertices.length)
  }

}
