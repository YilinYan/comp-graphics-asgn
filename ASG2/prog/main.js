/**
 * Function called when the webpage loads.
 */

var canvas, gl, position, size, color, scene
var DEBUG_SHAPE = false
function main() {
    canvas = document.getElementsByTagName("canvas")[0]
	canvas.width = 500
	canvas.height = 500

	if (!(gl = getWebGLContext(canvas))) {
		console.log("Fail to get WebGL context.")
		return
	}
	if (!initShaders(gl, VSHADER, FSHADER)) {
		console.log('Fail to init shaders.')
	}

    position = gl.getAttribLocation(gl.program, 'position');
	if(position < 0) {
		console.log('Fail to get position attribute.')
		return;
	}
/*
	size = gl.getAttribLocation(gl.program, 'size');
	if(size < 0) {
		console.log('Fail to get size attribute.')
		return;
	}
*/
	color = gl.getUniformLocation(gl.program, 'color');
	if(color < 0) {
		console.log('Fail to get color attribute.')
		return;
	}

    scene = new Scene ()
    initEventHandelers()

}
