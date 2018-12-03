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

class ColoredCube extends TiltedCube {

  constructor(size, center, color, rotation = 0) {
    super(size, color)
    
    this.size = size
    this.modelMatrix.translate(center[0], center[1], center[2])
    this.modelMatrix.rotate(rotation, 0, 1, 0)
    this.modelMatrix.scale(size, size, size)
    this.ks = Math.random() + 1
    this.kd = Math.random() + 1
    this.spower = Math.random() * 32 + 5

    this.generateUVCoordinates()
    this.points = this.getPoints()
    this.uvs = this.getUvs()
    this.normals = this.getNormals()
  }

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

  render() {
    sendUniformFloatToGLSL(this.kd, "u_diffuseIntensity");
    sendUniformFloatToGLSL(this.ks, "u_specularIntensity");
    sendUniformFloatToGLSL(this.spower, "u_spower");
    sendUniformVec4ToGLSL (this.color, "u_color")
    sendUniformMatToGLSL (this.modelMatrix.elements, "transMatrix")
    tellGLSLToDrawCurrentBuffer (this.vertices.length)
  }

}
