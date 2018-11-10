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

var VSHADER_TEXTURE =`
varying vec2 v_texCoord;
attribute vec2 a_texCoord;
attribute vec4 position;
uniform mat4 transMatrix;
uniform mat4 u_viewMatrix;
uniform mat4 u_projMatrix;
void main() {
   gl_Position = u_projMatrix * u_viewMatrix * transMatrix * position;
   v_texCoord = a_texCoord;
}`

var FSHADER_TEXTURE =`
uniform sampler2D u_sampler;
precision mediump float;
varying vec2 v_texCoord;
void main() {
   gl_FragColor = texture2D(u_sampler, v_texCoord);
}`
