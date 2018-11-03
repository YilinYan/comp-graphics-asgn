/**
 * A tilted cube that has a checkerboard texture applied to it. A subclass of
 * TiltedCube.
 *
 * @author "Your Name Here"
 * @this {CheckerCube}
 */
class CheckerCube extends TiltedCube {
  /**
   * Constructor for CheckerCube
   *
   * @constructor
   * @returns {CheckerCube}
   */
  constructor(size, centerX, centerY, image) {
    super (size, centerX, centerY, [1, 1, 1, 1])
    this.image = image
    this.generateUVCoordinates()
  }

  /**
   * Generates the texture coordinates of CheckerCube.
   *
   * @private
   */
  generateUVCoordinates() {
    var UV = [
    [0, 0], [0, 0.5], [1, 0.5], [0, 0], [1, 0.5], [1, 0],
    [0, 0], [0, 1], [1, 1], [0, 0], [1, 1], [1, 0],
    [0, 0], [0, 3], [3, 3], [0, 0], [3, 3], [3, 0],
    [0, 0], [0, 1], [2, 1], [0, 0], [2, 1], [2, 0],
    [0, 0], [0, 2], [1, 2], [0, 0], [1, 2], [1, 0],
    [0, 0], [0, 0.5], [1, 0.5], [0, 0], [1, 0.5], [1, 0] ]

    this.vertices.forEach((v, i) => {
      v.uv = UV[i]
    })
  }

  /**
   * Renders CheckerCube.
   */
  render() {
    useShader(gl, shader_texture)
    gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, 1)
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGB, gl.RGB, gl.UNSIGNED_BYTE, this.image)

    var points = new Float32Array (this.vertices.length * 3)
    this.vertices.forEach((v, i) => {
      v.pos.elements.forEach((p, j) => {
        points[i * 3 + j] = p
      })
    })
    var uvs = new Float32Array (this.vertices.length * 2)
    this.vertices.forEach((v, i) => {
      v.uv.forEach((uv, j) => {
        uvs[i * 2 + j] = uv
      })
    })

    sendUniformImageToGLSL ("u_sampler") 
    sendUniformMatToGLSL (this.modelMatrix.elements, "transMatrix")
    sendAttributeBufferToGLSL (points, this.vertices.length, "position")  
    sendAttributeBufferToGLSL (uvs, this.vertices.length, "a_texCoord")  
    tellGLSLToDrawCurrentBuffer (this.vertices.length)
  }
}
