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

var VSHADER_RAINBOW =`
varying vec4 v_color;
attribute vec4 position;
attribute vec4 a_color;
uniform mat4 transMatrix;
void main() {
   gl_Position = transMatrix * position;
   v_color = a_color;
}`

var FSHADER_RAINBOW =`
precision mediump float;
varying vec4 v_color;
void main() {
   gl_FragColor = v_color;
}`
