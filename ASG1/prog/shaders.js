// Basic Vertex Shader that receives position and size for each vertex (point).
var VSHADER =
'attribute vec4 position;\n' +
'attribute float size;\n' +
'void main() {\n' +
'   gl_Position = position;\n' +
'   gl_PointSize = size;\n' +
'}\n';

// Basic Fragment Shader that receives a single one color (point).
var FSHADER =
'precision mediump float;' +
'uniform vec4 color;' +
'void main() {\n' +
'   gl_FragColor = vec4(1., 0., 0., 1.);\n' +
'}\n';
