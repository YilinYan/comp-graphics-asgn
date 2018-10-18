
/**
 * Responsible for initializing buttons, sliders, radio buttons, etc. present
 * within your HTML document.
 */

var geometry_segment = 16
var geometry_size = 102
var geometry_color = [.5, .5, .5, 1]
var shape = "triangle"
var button_clear, slider_r, slider_g, slider_b, slider_s, slider_seg
var shape_c, shape_s, shape_t, shape_cube, choose_file
var file_str = ""

function initEventHandelers() {
    canvas.onmousedown = click
    canvas.onmousemove = click

    button_clear = document.getElementsByTagName("button")[0]
    button_clear.onmousedown = function() { scene.clearGeometry() }

    slider_r = document.getElementById("slider-r")
    slider_r.onchange = changePointColor

    slider_g = document.getElementById("slider-g")
    slider_g.onchange = changePointColor

    slider_b = document.getElementById("slider-b")
    slider_b.onchange = changePointColor

    slider_s = document.getElementById("slider-s")
    slider_s.onchange = function() { geometry_size = slider_s.value }

    slider_seg = document.getElementById("slider-seg")
    slider_seg.onchange = function() { geometry_segment = slider_seg.value }

    shape_c = document.getElementById("shape-c")
    shape_c.onmousedown = function() { shape = "circle" }

    shape_s = document.getElementById("shape-s")
    shape_s.onmousedown = function() { shape = "square" }

    shape_t = document.getElementById("shape-t")
    shape_t.onmousedown = function() { shape = "triangle" }

    shape_cube = document.getElementById("shape-cube")
    shape_cube.onmousedown = function() { shape = "cube" }

    shape_obj = document.getElementById("shape-obj")
    shape_obj.onmousedown = function() { shape = "object" }

    choose_file = document.getElementById("choose-file")
    choose_file.onchange = function() {
        var reader = new FileReader()
        reader.onload = function (e) {
            file_str = e.target.result
        }
        reader.readAsBinaryString(choose_file.files[0])
    }
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
        geometry = new RandomCircle (geometry_size, geometry_segment, x, y, geometry_color)
    }
    else if (shape == "triangle") {
        geometry = new FluctuatingTriangle (geometry_size, x, y, geometry_color)
    }
    else if (shape == "square") {
        geometry = new SpinningSquare (geometry_size, x, y, geometry_color)
    }
    else if (shape == "cube") {
        geometry = new TiltedCube (geometry_size, x, y, geometry_color)
    }
    else if (shape == "object" && file_str != "") {
        geometry = new LoadedOBJ (file_str)
        geometry.color = geometry_color
        geometry.centerX = x
        geometry.centerY = y
        geometry.modelMatrix.translate (x, y, 0).scale(geometry_size/250, geometry_size/250, geometry_size/250)
        // 下次写的时候 vertex.points 用vector3
        // size 和 centerXY 都用matrix实现
        // load文件的时候要注意同步异步
    }
    else {
        return
    }
    scene.addGeometry (geometry)
    scene.render ()
    sendTextToHTML([x, y], "position-show")
}

/**
 * Changes the color of the points drawn on HTML canvas.
 *
 * @param {float} color Color value from 0.0 to 1.0.
 */
 function changePointColor () {
     geometry_color = [slider_r.value, slider_g.value, slider_b.value, 1.0]
 }
