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
        this.lastTime = Date.now();

        sendUniformVec4ToGLSL([4, 2, 5], "u_lightPos");
        sendUniformMatToGLSL (camera.view.elements, "u_viewMatrix")
        sendUniformMatToGLSL (camera.proj.elements, "u_projMatrix")
        sendUniformFloatToGLSL(0.04, "u_ambientIntensity");
        sendUniformVec4ToGLSL([1.0, 1.0, 1.0], "u_ambientColor");
        sendUniformVec4ToGLSL([1.0, 1.0, 0.9], "u_diffuseColor");
        sendUniformFloatToGLSL(this.normalShading, "u_normalShading");
        sendUniformFloatToGLSL(this.toonShading, "u_toonShading");
        sendUniformVec4ToGLSL (camera.from.elements, "u_cameraPosition");

        var lastPoins = null;
        var lastNormals = null;

        this.geometries.forEach (function (geometry) {
        
            if(lastPoins != geometry.points) {
                sendAttributeBufferToGLSL (geometry.points, geometry.vertices.length, "position");
                lastPoins = geometry.points;  
            }
            if(lastNormals != geometry.normals) {
                sendAttributeBufferToGLSL (geometry.normals, geometry.vertices.length, "a_normal");
                lastNormals = geometry.normals;
            }
        
        geometry.render() });
    }
}
