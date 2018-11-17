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
varying vec2   v_texCoord;
varying vec3   v_normal;
varying vec3   v_ambientColor;
varying float  v_ambientIntensity;
varying vec3   v_diffuseColor;
varying vec3   v_diffuseNormal;
varying float  v_diffuseIntensity;

attribute vec2 a_texCoord;
attribute vec4 position;
attribute vec3 a_normal;
uniform mat4   transMatrix;
uniform mat4   u_viewMatrix;
uniform mat4   u_projMatrix;
uniform vec3   u_ambientColor;
uniform float  u_ambientIntensity;
uniform vec3   u_diffuseColor;
uniform vec3   u_diffuseNormal;
uniform float  u_diffuseIntensity;
void main() {
   gl_Position = u_projMatrix * u_viewMatrix * transMatrix * position;
   v_texCoord = a_texCoord;
   v_normal = a_normal;
   v_ambientColor = u_ambientColor;
   v_ambientIntensity = u_ambientIntensity;
   v_diffuseColor = u_diffuseColor;
   v_diffuseNormal = normalize((transMatrix * vec4(u_diffuseNormal, 0.0)).xyz);
   v_diffuseIntensity = u_diffuseIntensity;
}`

var FSHADER_TEXTURE =`
uniform sampler2D u_sampler;
precision mediump float;
varying vec2   v_texCoord;
varying vec3   v_normal;
varying vec3   v_ambientColor;
varying float  v_ambientIntensity;
varying vec3   v_diffuseColor;
varying vec3   v_diffuseNormal;
varying float  v_diffuseIntensity;
void main() {
   vec4 color = texture2D(u_sampler, v_texCoord);
   gl_FragColor = color * vec4(
      v_ambientColor * v_ambientIntensity
      + v_diffuseColor * max(0.0, dot(v_diffuseNormal, v_normal)) * v_diffuseIntensity
      , 1.0) ;
}`
