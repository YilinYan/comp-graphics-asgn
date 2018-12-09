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
  gl.clearColor(1, 1, 1, 1);
  gl.enable(gl.DEPTH_TEST)
  gl.enable (gl.BLEND)
  gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA)
  useShader(gl, shader_phong)

//  var geometry = new ColoredCube(0.5, [i*2, -2, j*2],
//    [Math.random(), Math.random(), Math.random(), 1])
  scene = new Scene()
  camera = Camera(null)  
//  scene.addGeometry(geometry)

  canvas.onclick = (ev) => { 
    scene.onclick = 1;
    var x = ev.clientX, y = ev.clientY;
    var rect = ev.target.getBoundingClientRect();
   // if (rect.left <= x && x < rect.right && rect.top <= y && y < rect.bottom) {
    // Check if it is on object
    scene.x = x - rect.left;
    scene.y = rect.bottom - y;
  };
  
  for(var i = -10; i < 10; ++i)
    for(var j = -10; j < 10; ++j) {
      var distance =  (Math.abs(i) * Math.abs(j) / 100) * 0.1 + 0.07;
      var rand = Math.random();
      if(rand > distance) continue;

      var color = rand_color()
      var rotation = Math.random() * 30
      var size = Math.random() * (Math.abs(i) + Math.abs(j)) / 10
      var height = Math.random() * Math.round(size * 5) + size;

      var geometry1 = new ColoredCube(size , [i, height - size/2, j],
        color, rotation)
      var geometry2 = new ColoredCube(size , [i, -height - size/2, j],
        [color[0], color[1], color[2], 1], rotation)
      geometry2.ks = geometry1.ks
      geometry2.kd = geometry1.kd
      geometry2.spower = geometry1.spower
      scene.addGeometry(geometry1)
      scene.addGeometry(geometry2)
    }
    scene.addGeometry(new Plane([-20, 0, -20], 40, [0.1, 0.1, 0.1, 0.8]))
   
  tick()
}

function rand_color() {
  var a = Math.random() * 0.5 + 0.15;
  var b = Math.random() * 0.5 + 0.1;
  var c = Math.random() * 0.5 + 0.2;
  return [a, b, c, 1]
}

function tick() {
  scene.updateAnimation()
  scene.render()
  window.requestAnimationFrame(tick)
}