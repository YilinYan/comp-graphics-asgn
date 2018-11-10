var canvas, gl, position, size, color, scene, camera
var shader_normal, shader_rainbow, shader_texture
var DEBUG_FLAG = false
var DEBUG_FLAG_SQUARE = false
var DEBUG_FLAG_TRIANGLE = false
var DEBUG_FLAG_CIRCLE = false
var DEBUG_FLAG_CUBE = false
var DEBUG_VERTEX = false

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
  camera = Camera()
  camera.setLookAt([1, 0, 0.5], [0, 0, 0], [0, 1, 0])
  camera.setPerspective(90, 1, 0.01, 100)
  addCube()
//  scene.render()

//  initEventHandelers()
/*
  addCube()
  tick()
*/
}

function addCube() {
  var texture = gl.createTexture()
  gl.activeTexture(gl.TEXTURE0)
  gl.bindTexture(gl.TEXTURE_2D, texture)
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
  
  var image = new Image()
  image.onload = () => {
    var geometry = new MultiTextureCube (100, 0, 0, image)
    scene.addGeometry (geometry)
    scene.render()
  }
  image.src = "external/textures/checkerboard.png"
}
