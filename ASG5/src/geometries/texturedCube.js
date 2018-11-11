/**
 * A cube with a single textured applied in multiple different ways. A subclass
 * of TiltedCube.
 *
 * @author "Your Name Here"
 * @this {MultiTextureCube}
 */
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

  /**
   * Renders MultiTextureCube.
   */
  render() {
    useShader(gl, shader_texture)
    
 //   gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, 1)
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGB, gl.RGB, gl.UNSIGNED_BYTE, this.image)

/*
    gl.activeTexture(gl.TEXTURE0)
    gl.bindTexture(gl.TEXTURE_2D, this.image)
*/
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
    sendUniformMatToGLSL (camera.view.elements, "u_viewMatrix")
    sendUniformMatToGLSL (camera.proj.elements, "u_projMatrix")
    sendAttributeBufferToGLSL (points, this.vertices.length, "position")  
    sendAttributeBufferToGLSL (uvs, this.vertices.length, "a_texCoord")  
    tellGLSLToDrawCurrentBuffer (this.vertices.length)
  }

}
