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
varying float  v_normalShading;
varying vec3   v_reflect;
varying vec3   v_view;
varying float  v_specularIntensity;
varying float  v_toonShading;

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
uniform float  u_normalShading;
uniform float  u_specularIntensity;
uniform vec3   u_cameraPosition;  
uniform float  u_toonShading;
void main() {
   gl_Position = u_projMatrix * u_viewMatrix * transMatrix * position;
   v_texCoord = a_texCoord;
   vec3 a = (transMatrix * vec4(0.0, 0.0, 0.0, 1.0)).xyz;
   vec3 b = (transMatrix * vec4(a_normal, 1.0)).xyz;
   v_normal = b - a;
   v_ambientColor = u_ambientColor;
   v_ambientIntensity = u_ambientIntensity;
   v_diffuseColor = u_diffuseColor;
   v_diffuseNormal = normalize(u_diffuseNormal);
   v_diffuseIntensity = u_diffuseIntensity;
   v_normalShading = u_normalShading;

   v_reflect = reflect(v_diffuseNormal, v_normal);
   v_view = normalize(u_cameraPosition - (transMatrix * position).xyz);

   v_specularIntensity = u_specularIntensity;
   v_toonShading = u_toonShading;
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
varying float  v_normalShading;
varying vec3   v_reflect;
varying vec3   v_view;
varying float  v_specularIntensity;
varying float  v_toonShading;
void main() {
   vec4 color = texture2D(u_sampler, v_texCoord);
   float specular = smoothstep(0.4, 1.0, max(0.0, dot(v_reflect, v_view)));

   vec3 light = v_ambientColor * v_ambientIntensity
   + v_diffuseColor * max(0.0, dot(-v_diffuseNormal, v_normal)) * v_diffuseIntensity
   + v_diffuseColor * pow(specular, 3.0) * v_specularIntensity;

   vec2 uv = floor(5.0 * v_texCoord) / 5.0;
   vec4 toonColor = texture2D(u_sampler, uv);
   float toon = v_ambientIntensity
   + max(0.0, dot(-v_diffuseNormal, v_normal)) * v_diffuseIntensity
   + pow(specular, 3.0) * v_specularIntensity;
   toon = floor(toon * 2.) / 2. + 0.2;

   color = color * vec4(light, 1.0);
   toonColor = toonColor * vec4(vec3(toon), 1.0);
   gl_FragColor = mix(mix(color, vec4(v_normal, 1.0), v_normalShading), toonColor, v_toonShading);
}`
