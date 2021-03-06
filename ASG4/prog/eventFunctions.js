
var geometry_segment = 16
var geometry_size = 102
var geometry_color = [.5, .5, .5, 1]
var shape = "triangle"
var geometry_color_type = "rainbow"
var geometry_image
var button_clear, slider_r, slider_g, slider_b, slider_s, slider_seg
var shape_c, shape_s, shape_t, shape_cube, choose_file, choose_image
var color_type
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
    choose_file.onchange = () => { loadFile(choose_file.files[0], 
        (e) => {file_str = e.target.result}) }

    choose_image = document.getElementById("choose-image")
    choose_image.onchange = () => { loadImage(choose_image.files[0], 
        (e) => { geometry_image = e.target }) }

    color_type = document.getElementById("color-type")
    color_type.onmousedown = function() {
        if (geometry_color_type == "solid") {
            geometry_color_type = "rainbow"
            sendTextToHTML("Solid Color", "color-type")
        } else {
            geometry_color_type = "solid" 
            sendTextToHTML("Rainbow", "color-type")
        }
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
        geometry = new RandomCircle (geometry_size, geometry_segment, x, y, geometry_color, geometry_color_type)
    }
    else if (shape == "triangle") {
        geometry = new FluctuatingTriangle (geometry_size, x, y, geometry_color, geometry_color_type)
    }
    else if (shape == "square") {
        geometry = new SpinningSquare (geometry_size, x, y, geometry_color, geometry_color_type)
    }
    else if (shape == "cube") {
        if (geometry_image)
            geometry = new MultiTextureCube (geometry_size, x, y, geometry_image)
        else
            geometry = new TiltedCube (geometry_size, x, y, geometry_color)
    }
    else if (shape == "object" && file_str != "") {
        geometry = new LoadedOBJ (file_str)
        geometry.color = geometry_color
        geometry.image = geometry_image
        geometry.centerX = x
        geometry.centerY = y
        geometry.modelMatrix.setTranslate(x, y, 0).scale(geometry_size/250, geometry_size/250, geometry_size/250)
    }
    else {
        return
    }
    scene.addGeometry (geometry)
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
