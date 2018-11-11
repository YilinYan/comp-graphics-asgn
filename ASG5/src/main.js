var canvas, gl, position, size, color, scene, camera
var shader_normal, shader_rainbow, shader_texture
var DEBUG_FLAG = false
var DEBUG_FLAG_SQUARE = false
var DEBUG_FLAG_TRIANGLE = false
var DEBUG_FLAG_CIRCLE = false
var DEBUG_FLAG_CUBE = false
var DEBUG_VERTEX = false
var textures = [new Image(), new Image(), new Image()]
var textureObjs = []

function main() {
  canvas = document.getElementsByTagName("canvas")[0]
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  if (!(gl = getWebGLContext(canvas))) {
    console.log("Fail to get WebGL context.")
    return
  }
  shader_rainbow = createShader(gl, VSHADER_RAINBOW, FSHADER_RAINBOW)
  shader_normal  = createShader(gl, VSHADER, FSHADER)
  shader_texture = createShader(gl, VSHADER_TEXTURE, FSHADER_TEXTURE)
  gl.enable(gl.DEPTH_TEST)

  scene = new Scene()
  camera = Camera()

  loadImage("external/textures/grass.png", (e) => {textures[0] = e.target;})
  loadImage("external/textures/sand.png",  (e) => {textures[1] = e.target;})
  loadImage("external/textures/water.png", (e) => {textures[2] = e.target;})
  loadMap()
}

function loadMap() {
  var map = new Image()
  map.onload = (ev) => {
    var image = ev.target;
    var canvas = document.createElement('canvas');
    canvas.height = image.height;
    canvas.width = image.width;

    var context = canvas.getContext('2d');
    context.drawImage(image, 0, 0);
    var colorData = context.getImageData(0, 0, image.width, image.height).data;

    for(var i = 0; i < canvas.width; ++i)
      for(var j = 0; j < canvas.height; ++j) {
        var base = (i * 16 + j) * 4
        if(colorData[base + 3] > 0) {
          for(var k = 0; k < 3; ++k) {
            if(colorData[base + k] == 0) {
              var num = colorData[base + 3] / 51;
              for (var t = 0; t < num; ++ t) {
                var geometry = new MultiTextureCube (1, 0, 0, textures[k]);
                geometry.modelMatrix.translate(i, t, j);
                scene.addGeometry (geometry);
              }
              break;
            }
          }
        }
      }
      initTexture()
  }
  map.src = "external/textures/map.png"
}

function initTexture() {
  var texture = gl.createTexture()
  gl.activeTexture(gl.TEXTURE0)
  gl.bindTexture(gl.TEXTURE_2D, texture)
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR)

  /*
  for (var i = 0; i < 3; ++i) {
    textureObjs[i] = gl.createTexture()
    gl.activeTexture(gl.TEXTURE0)
    gl.bindTexture(gl.TEXTURE_2D, textureObjs[i])
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGB, gl.RGB, gl.UNSIGNED_BYTE, textures[i])
  }
  */
  tick()
}

function tick() {
  scene.render()
  window.requestAnimationFrame(tick)
}