
/**
 * Responsible for initializing buttons, sliders, radio buttons, etc. present
 * within your HTML document.
 */

var points = []
var colors = []
var sizes = []
var rgb = [0.5, 0.5, 0.5, 1.0]
var s = 15.5
var drag = false
function initEventHandelers() {
    canvas.onmousedown = click
    canvas.onmousemove = move
    canvas.onmouseup = up
    button_clear.onmousedown = clearCanvas
    slider_r.onchange = changePointColor
    slider_g.onchange = changePointColor
    slider_b.onchange = changePointColor
    slider_s.onchange = changePointSize
}

/**
 * Function called upon mouse click or mouse drag. Computes position of cursor,
 * pushes cursor position as GLSL coordinates, and draws.
 *
 * @param {Object} ev The event object containing the mouse's canvas position
 */

 function up(ev) {
     drag = false
 }

 function move(ev) {
     if(drag == false) return
     pushpoint(ev)
     render()
 }

function click(ev) {
    drag = true
    pushpoint(ev)
    render()
}

function pushpoint(ev) {
    var x = ev.clientX
    var y = ev.clientY
    var rect = ev.target.getBoundingClientRect()
    x = ((x - rect.left) - canvas.width/2)/(canvas.width/2)
    y = (canvas.height/2 - (y - rect.top))/(canvas.height/2)
    points.push([x, y])
    colors.push(rgb)
    sizes.push(s)

    sendTextToHTML([x, y], "position-show")
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
        var s = sizes[i]
        gl.vertexAttrib3f(position, p[0], p[1], 0.0)
        gl.vertexAttrib1f(size, s)
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
function changePointSize() {
    s = slider_s.value
//    console.log(s)
}

/**
 * Changes the color of the points drawn on HTML canvas.
 *
 * @param {float} color Color value from 0.0 to 1.0.
 */
function changePointColor() {
    rgb = [slider_r.value, slider_g.value, slider_b.value, 1.0]
//    console.log(rgb)
}
