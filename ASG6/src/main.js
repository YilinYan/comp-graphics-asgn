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
var worldSize = 1
var cat_geometry, teapot_geometry
var mapData = []
var mapHeight = []

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
  useShader(gl, shader_texture)

  scene = new Scene()
  camera = Camera()

  loadImage("external/textures/grass.png",    (e) => {textures[0] = e.target;})
  loadImage("external/textures/sand.png",     (e) => {textures[1] = e.target;})
  loadImage("external/textures/water.png",    (e) => {textures[2] = e.target;})
  
  loadImage("external/textures/cat_diff.jpg", (e) => {
    textures[3] = e.target;
    loadServerFile("external/OBJ/cat.obj", function(data) {
      cat_geometry = new LoadedOBJ (data);
      cat_geometry.image = textures[3];
//      cat_geometry.modelMatrix.setScale(0.5, 0.5, 0.5);
//      geometry.modelMatrix.translate(7, 1.5, 7);
      scene.addGeometry(cat_geometry);
    })
  })
  loadImage("external/textures/TeapotTex.png", (e) => {
    textures[4] = e.target;
    loadServerFile("external/OBJ/teapot.obj", function(data) {
      teapot_geometry = new LoadedOBJ (data);
      teapot_geometry.image = textures[4];
      teapot_geometry.modelMatrix.translate(9, 3, 9);
      teapot_geometry.lastTime = Date.now();
      teapot_geometry.updateAnimation = () => {
        var delta = (Date.now() - teapot_geometry.lastTime) / 50.
        teapot_geometry.modelMatrix.rotate (delta, 0, 1, 0)
        teapot_geometry.lastTime = Date.now()
      }
      scene.addGeometry(teapot_geometry);
      loadMap()
    })
  })
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
        mapData[i * 16 + j] = 0;
        var base = (i * 16 + j) * 4

        if(colorData[base + 3] > 0) {
          for(var k = 0; k < 3; ++k) {
            if(colorData[base + k] == 0) {
              mapData[i * 16 + j] = k;
              var num = colorData[base + 3] / 51;
              mapHeight[i * 16 + j] = num;
              break;
            }
          }
        }
      }
    
    for(var i = 0; i < canvas.width; ++i)
      for(var j = 0; j < canvas.height; ++j)
        for(var t = 0; t < mapHeight[i * 16 + j]; ++t) {
          var k = mapData[i * 16 + j];
          var geometry = new MultiTextureCube (1 * worldSize, 0, 0, textures[k]);
          geometry.modelMatrix.translate(i * worldSize, t * worldSize, j * worldSize);
          scene.addGeometry (geometry);
        }

    initTexture()
  }
  map.src = "external/textures/map2.png"
}

function initTexture() {
  var texture = gl.createTexture()
  gl.activeTexture(gl.TEXTURE0)
  gl.bindTexture(gl.TEXTURE_2D, texture)
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR)
//  gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGB, gl.RGB, gl.UNSIGNED_BYTE, textures[1])
  tick()
}

function tick() {
  scene.updateAnimation()
  scene.render()
  window.requestAnimationFrame(tick)
}