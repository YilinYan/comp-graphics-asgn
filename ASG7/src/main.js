var canvas, gl, position, size, color, scene, camera
var shader_phong
var DEBUG_FLAG = false
var DEBUG_FLAG_SQUARE = false
var DEBUG_FLAG_TRIANGLE = false
var DEBUG_FLAG_CIRCLE = false
var DEBUG_FLAG_CUBE = false
var DEBUG_VERTEX = false
var worldSize = 1

function main() {
  canvas = document.getElementsByTagName("canvas")[0]
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  if (!(gl = getWebGLContext(canvas))) {
    console.log("Fail to get WebGL context.")
    return
  }

  shader_phong = createShader(gl, VSHADER_PHONG, FSHADER_PHONG)
  gl.enable(gl.DEPTH_TEST)
  useShader(gl, shader_phong)

  var geometry = new ColoredCube(0.5, [i*2, -1, j*2],
    [Math.random(), Math.random(), Math.random(), 1])
  scene = new Scene()
  camera = Camera(geometry)
  scene.addGeometry(geometry)

  for(var i = -2; i < 5; ++i)
    for(var j = -2; j < 5; ++j) {
      scene.addGeometry(new ColoredCube(0.5, [i, -1, j],
        [Math.random(), Math.random(), Math.random(), 1],
        Math.random() * 30))
    }

  tick()
}

function tick() {
  scene.updateAnimation()
  scene.render()
  window.requestAnimationFrame(tick)
}