
/**
 * Responsible for initializing buttons, sliders, radio buttons, etc. present
 * within your HTML document.
 */
function initEventHandelers() {
  canvas.onmousedown = click, render
}

/**
 * Function called upon mouse click or mouse drag. Computes position of cursor,
 * pushes cursor position as GLSL coordinates, and draws.
 *
 * @param {Object} ev The event object containing the mouse's canvas position
 */

 var points = []
function click(ev) {
  var x = ev.offsetX;
  var y = ev.offsetX;
  points.push(x)
  points.push(y)
  gl.clear(gl.COLOR_BUFFER_BIT)

  var len = points.length;
  for(var i = 0; i < len; i += 2) {
      gl.vertexAttrib3f(position, points[i], points[i+1], 0.0);
      gl.vertexAttrib1f(size, 10.);
      gl.drawArrays(gl.POINTS, 0, 1);
  }
}

/**
 * Renders the scene on the HTML canvas.
 */
function render() {
  //
  // YOUR CODE HERE
  //
}

/**
 * Clears the HTML canvas.
 */
function clearCanvas() {
  //
  // YOUR CODE HERE
  //
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
