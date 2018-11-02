/**
 * Function called when the webpage loads.
 */
var canvas, gl, position, size, color, scene
var shader_normal, shader_rainbow
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
   useShader(gl, shader_normal)

   scene = new Scene ()
   initEventHandelers()
   tick()
}
