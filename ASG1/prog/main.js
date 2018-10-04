/**
 * Function called when the webpage loads.
 */


var canvas, gl, position, size
function main() {
	canvas = document.getElementsByTagName("canvas")[0]
	var width = window.innerWidth
	canvas.width = 600
	canvas.height = 400
	canvas.setAttribute('style', "position: absolute;  \
							left:50%; margin-left: -300px; top:10%");

	gl = getWebGLContext(canvas)
	if(!gl) {
		console.log("Fail to get WebGL context.")
		return
	}
	if(!initShaders(gl, VSHADER, FSHADER)) {
		console.log('Fail to init shaders.')
	}
/*
	position = gl.getAttribLocation(gl.program, 'position');
	if(position < 0) {
		console.log('Fail to get position attribute.')
		return;
	}
	gl.vertexAttrib3f(position, 0.0, 0.0, 0.0);
*/

/*
	size = gl.getAttribLocation(gl.program, 'size');
	if(size < 0) {
		console.log('Fail to get size attribute.')
		return;
	}
	gl.vertexAttrib1f(size, 10.);
*/

//	initEventHandelers();

	gl.clearColor(0., 0., 0., 1.)
	gl.drawArrays(gl.Points, 0, 1);

	gl.clear(gl.COLOR_BUFFER_BIT)
}
