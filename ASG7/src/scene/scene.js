/**
 * Specifies a WebGL scene.
 *
 * @author "Your Name Here"
 * @this {Scene}
 */

var lastPoins = null;
var lastNormals = null;

class Scene {
  /**
   * Constructor for Scene.
   *
   * @constructor
   */
  constructor() {
    this.geometries = []; // Geometries being drawn on canvas
    this.lastTime = Date.now();
    this.diffuseMatrix = new Matrix4();
    this.normalShading = 0.0;
    this.toonShading = 0.0;

    this.click = 0;
    this.onclick = 0;
    this.x = 0;
    this.y = 0;
    
    this.init();
  }

  init() {
      document.getElementById("toon").onmousedown = () => {
          this.toonShading = 1.0;
      }

      sendUniformVec4ToGLSL([0, 1, 0], "u_lightPos");
      sendUniformFloatToGLSL(0.6, "u_ambientIntensity");

      sendUniformFloatToGLSL(0.6, "u_diffuseIntensity");
      sendUniformFloatToGLSL(1, "u_specularIntensity");
      sendUniformFloatToGLSL(6, "u_spower");

      sendUniformVec4ToGLSL([1.0, 1.0, 1.0], "u_ambientColor");
      sendUniformVec4ToGLSL([1.0, 1.0, 0.9], "u_diffuseColor");
      sendUniformVec4ToGLSL([1.0, 1.0, 1.0, 1.0], "u_fogColor");
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
        this.click = this.onclick;
        this.onclick = 0;
        this.lastTime = Date.now();
        
//        var fb = gl.createFramebuffer();
  //      gl.bindFramebuffer(gl.FRAMEBUFFER, fb);

        sendUniformMatToGLSL (camera.view.elements, "u_viewMatrix")
        sendUniformMatToGLSL (camera.proj.elements, "u_projMatrix")

        sendUniformFloatToGLSL(this.normalShading, "u_normalShading");
        sendUniformFloatToGLSL(this.toonShading, "u_toonShading");
        sendUniformVec4ToGLSL (camera.from.elements, "u_cameraPosition");

        if(this.click) {
            this.click = 0;
            sendUniformFloatToGLSL(1, "u_click");

            const tex = gl.createTexture();
            gl.bindTexture(gl.TEXTURE_2D, tex);
            gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, canvas.width, canvas.height, 0, gl.RGBA, gl.UNSIGNED_BYTE, null);

            // Create a framebuffer and attach the texture.
            const fb = gl.createFramebuffer();
            gl.bindFramebuffer(gl.FRAMEBUFFER, fb);
            gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, tex, 0);

            // must bind again to draw on
            gl.bindTexture(gl.TEXTURE_2D, tex);

            gl.clear(gl.COLOR_BUFFER_BIT);
            this.geometries.forEach (function (geometry) {
                if(geometry instanceof ColoredCube) {
                    if(lastPoins != geometry.points) {
                        sendAttributeBufferToGLSL (geometry.points, geometry.vertices.length, "position");
                        lastPoins = geometry.points;  
                    }
                    if(lastNormals != geometry.normals) {
                        sendAttributeBufferToGLSL (geometry.normals, geometry.vertices.length, "a_normal");
                        lastNormals = geometry.normals;
                    }
                    geometry.render()
                }
            });
   
            var pixel = new Uint8Array(4);
            gl.readPixels(this.x, this.y, 1, 1, gl.RGBA, gl.UNSIGNED_BYTE, pixel);

            var spin = 1
            var orbit = 1;
            var blink = Math.round(Math.random() * 100) * Math.PI;
            this.geometries.forEach (function (geometry) {
            //    console.log(geometry.color);
                if(geometry instanceof ColoredCube) {
                    var c = geometry.color;
                    if(Math.abs(c[0] - pixel[0] / 255) < 0.01
                    && Math.abs(c[1] - pixel[1] / 255) < 0.01
                    && Math.abs(c[2] - pixel[2] / 255) < 0.01) {
                        if(!geometry.spinning) {
                            geometry.spinning = spin;
                            spin = -1;
                        }
                        else if(!geometry.orbiting)
                            geometry.orbiting = orbit / (
                                Math.abs(geometry.center[0]) +
                                Math.abs(geometry.center[2])
                            );
                        else
                            geometry.blinking = blink;
                    }
                }
            });

            sendUniformFloatToGLSL(0, "u_click");
            gl.bindFramebuffer(gl.FRAMEBUFFER, null);
        }

        this.geometries.forEach (function (geometry) {
            geometry.updateAnimation();
            if(lastPoins != geometry.points) {
                sendAttributeBufferToGLSL (geometry.points, geometry.vertices.length, "position");
                lastPoins = geometry.points;  
            }
            if(lastNormals != geometry.normals) {
                sendAttributeBufferToGLSL (geometry.normals, geometry.vertices.length, "a_normal");
                lastNormals = geometry.normals;
            }
            geometry.render() 
        });
    }
}
