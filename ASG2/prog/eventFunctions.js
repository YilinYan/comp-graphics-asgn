
/**
 * Responsible for initializing buttons, sliders, radio buttons, etc. present
 * within your HTML document.
 */

var geometry_segment = 16
var geometry_size = 40
var geometry_color = [.5, .5, .5, 1]
var shape = "circle"
var button_clear, slider_r, slider_g, slider_b, slider_s, slider_seg
var shape_c, shape_s, shape_t

function initEventHandelers() {
    canvas.onmousedown = click
    canvas.onmousemove = click

    button_clear = document.getElementsByTagName("button")[0]
    button_clear.onmousedown = clearCanvas

    slider_r = document.getElementById("slider-r")
    slider_r.onchange = changePointColor

    slider_g = document.getElementById("slider-g")
    slider_g.onchange = changePointColor

    slider_b = document.getElementById("slider-b")
    slider_b.onchange = changePointColor

    slider_s = document.getElementById("slider-s")
    slider_s.onchange = changePointSize

    slider_seg = document.getElementById("slider-seg")
    slider_seg.onchange = changeSegment

    shape_c = document.getElementById("shape-c")
    shape_c.onchange = changeShape

    shape_s = document.getElementById("shape-s")
    shape_s.onchange = changeShape

    shape_t = document.getElementById("shape-t")
    shape_t.onchange = changeShape
}

/**
 * Function called upon mouse click or mouse drag. Computes position of cursor,
 * pushes cursor position as GLSL coordinates, and draws.
 *
 * @param {Object} ev The event object containing the mouse's canvas position
 */
function click(ev) {
    if (ev.buttons == false) return

    var x = ev.clientX
    var y = ev.clientY
    var rect = ev.target.getBoundingClientRect()
    x = ((x - rect.left) - canvas.width/2)/(canvas.width/2)
    y = (canvas.height/2 - (y - rect.top))/(canvas.height/2)

    var geometry
    if (shape == "circle") {
        geometry = new Circle (geometry_size, geometry_segment, x, y, geometry_color)
    }
    else if (shape == "triangle") {
        geometry = new Triangle (geometry_size, x, y, geometry_color)
    }
    else if (shape == "square") {
        geometry = new Square (geometry_size, x, y, geometry_color)
    }
    scene.addGeometry (geometry)
    scene.render ()
    sendTextToHTML([x, y], "position-show")
}

/**
 * Renders the scene on the HTML canvas.

function render() {
  //
  // YOUR CODE HERE
  //
}
*/


/*
 * Clears the HTML canvas.
*/
function clearCanvas() {
    scene.clearGeometry ()
}


/**
 * Changes the size of the points drawn on HTML canvas.
 *
 * @param {float} size Real value representing the size of the point.
 */
function changePointSize () {
    geometry_size = slider_s.value
}

/**
 * Changes the color of the points drawn on HTML canvas.
 *
 * @param {float} color Color value from 0.0 to 1.0.
 */
function changePointColor () {
    geometry_color = [slider_r.value, slider_g.value, slider_b.value, 1.0]
}

function changeSegment () {
    geometry_segment = slider_seg.value
}

function changeShape () {
    if (shape_c.checked) {
        shape = "circle"
    }
    else if (shape_s.checked) {
        shape = "square"
    }
    else if (shape_t.checked) {
        shape = "triangle"
    }
//    console.log (shape)
}
