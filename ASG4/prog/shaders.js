var VSHADER =`
attribute vec4 position;
uniform mat4 transMatrix;
void main() {
   gl_Position = transMatrix * position;
}`

var FSHADER =`
precision mediump float;
uniform vec4 color;
void main() {
   gl_FragColor = color;
}`