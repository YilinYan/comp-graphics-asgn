/**
 * Function called when the webpage loads.
 */
var canvas, gl, position, size, color, scene
var shader_normal, shader_rainbow, shader_texture
var DEBUG_FLAG = false
var DEBUG_FLAG_SQUARE = false
var DEBUG_FLAG_TRIANGLE = false
var DEBUG_FLAG_CIRCLE = false
var DEBUG_FLAG_CUBE = false
var DEBUG_VERTEX = true
function main() {
  canvas = document.getElementsByTagName("canvas")[0]
  canvas.width = 500
  canvas.height = 500
  if (!(gl = getWebGLContext(canvas))) {
    console.log("Fail to get WebGL context.")
    return
  }
  shader_rainbow = createShader(gl, VSHADER_RAINBOW, FSHADER_RAINBOW)
  shader_normal = createShader(gl, VSHADER, FSHADER)
  shader_texture = createShader(gl, VSHADER_TEXTURE, FSHADER_TEXTURE)
  gl.enable(gl.DEPTH_TEST)

  scene = new Scene()
  initEventHandelers()
  addCube()
  tick()
}

function addCube() {
  var texture = gl.createTexture()
  gl.activeTexture(gl.TEXTURE0)
  gl.bindTexture(gl.TEXTURE_2D, texture)
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
  
  var image = new Image()
  image.onload = () => {
    var geometry = new CheckerCube (100, 0, 0, image)
    scene.addGeometry (geometry)
  }
  image.src = "external/textures/flcl.jpg"
}
