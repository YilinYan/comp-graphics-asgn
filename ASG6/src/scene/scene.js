/**
 * Specifies a WebGL scene.
 *
 * @author "Your Name Here"
 * @this {Scene}
 */
class Scene {
  /**
   * Constructor for Scene.
   *
   * @constructor
   */
  constructor() {
    this.geometries = []; // Geometries being drawn on canvas
    gl.clearColor (0., 0., 0., 1.)
    gl.clear (gl.COLOR_BUFFER_BIT)
  }

  /**
   * Adds the given geometry to the the scene.
   *
   * @param {Geometry} geometry Geometry being added to scene
   */
  addGeometry(geometry) {
      this.geometries.push (geometry)
  }

  /**
   * Clears all the geometry within the scene.
   */
  clearGeometry() {
      this.geometries = []
      gl.clear (gl.COLOR_BUFFER_BIT)
  }

  /**
   * Updates the animation for each geometry in geometries.
   */
  updateAnimation() {
      this.geometries.forEach (function (geometry) {
          geometry.updateAnimation() });
  }

  /**
   * Renders all the Geometry within the scene.
   */
    render() {
        sendUniformMatToGLSL (camera.view.elements, "u_viewMatrix")
        sendUniformMatToGLSL (camera.proj.elements, "u_projMatrix")
        var lastImage = null;
        var lastPoins = null;
        var lastUvs = null;

        this.geometries.forEach (function (geometry) {
        
            if(lastImage != geometry.image) {
                lastImage = geometry.image;
                gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, 1)
                gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGB, gl.RGB, gl.UNSIGNED_BYTE, lastImage);
//                sendUniformImageToGLSL ("u_sampler");
            } 
            if(lastPoins != geometry.points) {
                sendAttributeBufferToGLSL (geometry.points, geometry.vertices.length, "position");
                lastPoins = geometry.points;  
            }
            if(lastUvs != geometry.uvs) {
                sendAttributeBufferToGLSL (geometry.uvs, geometry.vertices.length, "a_texCoord");
                lastUvs = geometry.uvs;
            }
        
        geometry.render() });
    }
}
