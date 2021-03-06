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
    this.lastTime = Date.now();
    this.diffuseMatrix = new Matrix4();
    this.normalShading = 0.0;
    this.toonShading = 0.0;
    this.init();
  }

  init() {
      document.getElementById("toon").onmousedown = () => {
          this.toonShading = 1.0;
      }
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
        var delta = (Date.now() - this.lastTime) / 100.
        this.diffuseMatrix.rotate (delta, 1, 0, -1);
        var diffuse = this.diffuseMatrix.multiplyVector3(new Vector3([1.0, 0.0, 1.0]));
//        var diffuse = this.diffuseMatrix.multiplyVector3(new Vector3([-1.0, 0.0, 0.0]));
        this.lastTime = Date.now();

        sendUniformMatToGLSL (camera.view.elements, "u_viewMatrix")
        sendUniformMatToGLSL (camera.proj.elements, "u_projMatrix")
        sendUniformFloatToGLSL(0.2, "u_ambientIntensity");
        sendUniformVec4ToGLSL([0.9, 0.9, 1.0], "u_ambientColor");
        sendUniformFloatToGLSL(0.7, "u_diffuseIntensity");
        sendUniformVec4ToGLSL([1.0, 1.0, 0.95], "u_diffuseColor");
        sendUniformVec4ToGLSL(diffuse.elements, "u_diffuseNormal");
        sendUniformFloatToGLSL(this.normalShading, "u_normalShading");
        sendUniformFloatToGLSL(this.toonShading, "u_toonShading");
        sendUniformFloatToGLSL(0.6, "u_specularIntensity");
        sendUniformVec4ToGLSL (camera.from.elements, "u_cameraPosition");

        var lastImage = null;
        var lastPoins = null;
        var lastUvs = null;
        var lastNormals = null;

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
            if(lastNormals != geometry.normals) {
                sendAttributeBufferToGLSL (geometry.normals, geometry.vertices.length, "a_normal");
                lastNormals = geometry.normals;
            }
        
        geometry.render() });
    }
}
