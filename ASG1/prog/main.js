/**
 * Function called when the webpage loads.
 */


var canvas, gl
var position, size, color
var button_clear
var slider_r, slider_g, slider_b, slider_s;
function main() {
	canvas = document.getElementsByTagName("canvas")[0]
	var width = window.innerWidth
	canvas.width = 500
	canvas.height = 500
	button_clear = document.getElementsByTagName("button")[0]
	slider_r = document.getElementById("slider-r")
	slider_g = document.getElementById("slider-g")
	slider_b = document.getElementById("slider-b")
	slider_s = document.getElementById("slider-s")

	gl = getWebGLContext(canvas)
	if(!gl) {
		console.log("Fail to get WebGL context.")
		return
	}
	if(!initShaders(gl, VSHADER, FSHADER)) {
		console.log('Fail to init shaders.')
	}

	position = gl.getAttribLocation(gl.program, 'position');
	if(position < 0) {
		console.log('Fail to get position attribute.')
		return;
	}
	gl.vertexAttrib3f(position, 0.0, 0.0, 0.0);


	size = gl.getAttribLocation(gl.program, 'size');
	if(size < 0) {
		console.log('Fail to get size attribute.')
		return;
	}
	gl.vertexAttrib1f(size, 10.);

	color = gl.getUniformLocation(gl.program, 'color');
	if(color < 0) {
		console.log('Fail to get color attribute.')
		return;
	}
	/*
	gl.fragAttrib3f(color, 10.);
*/
	initEventHandelers();

	gl.clearColor(0., 0., 0., 1.)
	gl.clear(gl.COLOR_BUFFER_BIT)
	render()
}
