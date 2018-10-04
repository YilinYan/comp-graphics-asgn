
/**
 * Responsible for initializing buttons, sliders, radio buttons, etc. present
 * within your HTML document.
 */

var points = []
var colors = []
function initEventHandelers() {
    canvas.onmousedown = click, render
    button_clear.onmousedown = clearCanvas
}

/**
 * Function called upon mouse click or mouse drag. Computes position of cursor,
 * pushes cursor position as GLSL coordinates, and draws.
 *
 * @param {Object} ev The event object containing the mouse's canvas position
 */

function click(ev) {
    var x = ev.clientX
    var y = ev.clientY
    var rect = ev.target.getBoundingClientRect()
    x = ((x - rect.left) - canvas.width/2)/(canvas.width/2)
    y = (canvas.height/2 - (y - rect.top))/(canvas.height/2)
    points.push([x, y])

    if(x > 0. && y > 0.) {
      colors.push([0., 1., 0., 1.])
    }else{
      colors.push([0., 0., 1., 1.])
    }
    render()
}

/**
 * Renders the scene on the HTML canvas.
 */
function render() {
    gl.clear(gl.COLOR_BUFFER_BIT)
    var len = points.length;
    for(var i = 0; i < len; ++i) {
        var p = points[i]
        var c = colors[i]
        gl.vertexAttrib3f(position, p[0], p[1], 0.0)
        gl.vertexAttrib1f(size, 10.)
        gl.uniform4f(color, c[0], c[1], c[2], c[3])
        gl.drawArrays(gl.POINTS, 0, 1)
    }
}

/**
 * Clears the HTML canvas.
 */
function clearCanvas() {
    gl.clear(gl.COLOR_BUFFER_BIT)
    points = []
    colors = []
}

/**
 * Changes the size of the points drawn on HTML canvas.
 *
 * @param {float} size Real value representing the size of the point.
 */
function changePointSize(size) {
  //
  // YOUR CODE HERE
  //
}

/**
 * Changes the color of the points drawn on HTML canvas.
 *
 * @param {float} color Color value from 0.0 to 1.0.
 */
function changePointColor(color) {
  //
  // YOUR CODE HERE
  //
}
