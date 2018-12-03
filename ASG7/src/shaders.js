var VSHADER_PHONG =`
precision mediump float;
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
varying vec4   v_color;
varying float  v_spower;
varying vec3   v_lightPos;
varying vec3   v_position;
varying vec3   v_cameraPosition;

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
uniform vec4   u_color;
uniform float  u_spower;
uniform vec3   u_lightPos;
void main() {
   gl_Position = u_projMatrix * u_viewMatrix * transMatrix * position;
   vec3 a = (transMatrix * vec4(0.0, 0.0, 0.0, 1.0)).xyz;
   vec3 b = (transMatrix * vec4(a_normal, 1.0)).xyz;
   v_normal = normalize(b - a);
   v_position = (transMatrix * position).xyz;
   v_cameraPosition = u_cameraPosition;

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
   v_color = u_color;
   v_spower = u_spower;
   v_lightPos = u_lightPos;
}`

var FSHADER_PHONG =`
precision mediump float;
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
varying vec4   v_color;
varying float  v_spower;
varying vec3   v_lightPos;
varying vec3   v_position;
varying vec3   v_cameraPosition;
void main() {
   vec4 color = v_color;

   vec3 reflect_v = reflect(v_position - v_lightPos, v_normal);
   vec3 view_v = v_cameraPosition - v_position;
  
   float specular = max(0.0, dot(normalize(reflect_v), normalize(view_v)))
                     * step(0.0, dot(v_lightPos - v_position, v_normal));
   vec3 light = //v_ambientColor * v_ambientIntensity
   + v_diffuseColor * pow(specular, v_spower) * v_specularIntensity;
   
/*
   float specular = smoothstep(0.4, 1.0, max(0.0, dot(v_reflect, v_view)));
   float specular = max(0.0, dot(v_reflect, v_view));
   vec3 light = v_ambientColor * v_ambientIntensity
   + v_diffuseColor * max(0.0, dot(-v_diffuseNormal, v_normal)) * v_diffuseIntensity
   + v_diffuseColor * pow(specular, v_spower) * v_specularIntensity;
*/
   vec4 toonColor = v_color;
   float toon = v_ambientIntensity
   + max(0.0, dot(-v_diffuseNormal, v_normal)) * v_diffuseIntensity
   + pow(specular, v_spower) * v_specularIntensity;
   toon = floor(toon * 2.) / 2. + 0.2;

   color = color * vec4(light, 1.0);
   toonColor = toonColor * vec4(vec3(toon), 1.0);
   gl_FragColor = mix(mix(color, vec4(v_normal, 1.0), v_normalShading), toonColor, v_toonShading);
}`
