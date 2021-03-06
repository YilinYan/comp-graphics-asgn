// Basic Vertex Shader that receives position and size for each vertex (point).
var VSHADER =`
attribute vec4 position;
uniform mat4 transMatrix;
void main() {
   gl_Position = transMatrix * position;
}`

// Basic Fragment Shader that receives a single one color (point).
var FSHADER =`
precision mediump float;
uniform vec4 color;
void main() {
   gl_FragColor = color;
}`
