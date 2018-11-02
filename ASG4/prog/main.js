/**
 * Function called when the webpage loads.
 */
var canvas, gl, position, size, color, scene
var DEBUG_FLAG = false
var DEBUG_FLAG_SQUARE = false
var DEBUG_FLAG_TRIANGLE = false
var DEBUG_FLAG_CIRCLE = false
var DEBUG_FLAG_CUBE = false
function main() {
   canvas = document.getElementsByTagName("canvas")[0]
   canvas.width = 500
   canvas.height = 500
   if (!(gl = getWebGLContext(canvas))) {
     console.log("Fail to get WebGL context.")
     return
   }
   var shader = createShader(gl, VSHADER, FSHADER)
   if (shader == -1) {
     console.log('Fail to init shaders.')
   }
   useShader(gl, shader)

   scene = new Scene ()
   initEventHandelers()
   tick()
}
