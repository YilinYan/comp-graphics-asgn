// Basic Vertex Shader that receives position and size for each vertex (point).
var VSHADER =
'attribute vec4 position;\n' +
'attribute float size;\n' +
'void main() {\n' +
' gl_Position = vec4(0., 0., 0., 1.);\n' +
' gl_PointSize = 10.;\n' +
'}\n';

// Basic Fragment Shader that receives a single one color (point).
var FSHADER =
  'void main() {\n' +
    'gl_FragColor = vec4(1., 0., 0., 1.);\n' +
  '}\n';
