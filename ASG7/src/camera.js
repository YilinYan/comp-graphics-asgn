
var Camera = (character) => {
  var view        = new Matrix4()
  var proj        = new Matrix4()
  var from        = new Vector3()
  var to          = new Vector3()
  var up          = new Vector3()
  var speed       = 0.1 * worldSize;
  var rotateSpeed = 0.5;
  var lastMouse;
  var fov = 75;
  var ratio = canvas.width / canvas.height;
  var near = 0.01;
  var far = 30;
  var viewType = "Perspective";
  var geometry = character || null;

  setLookAt([0 * worldSize, 0 * worldSize, 0 * worldSize], 
            [0.6 * worldSize, 0.8 * worldSize, 0 * worldSize], 
            [0, 1, 0]);
  setPerspective(fov, ratio, near, far);
  init();

  function setLookAt(a, b, c){
    from.elements = a; to.elements = b; up.elements = c;

    if(geometry) {
      var A = from
      var B = to
      var rotate = B.minus(A).elements
      var step = B.minus(A).scale(0.5).add(A)

      geometry.modelMatrix
      .setTranslate(step.elements[0], step.elements[1] - 1, step.elements[2])
      .scale(geometry.size, geometry.size, geometry.size)
      .rotate(Math.atan2(rotate[0], rotate[2]) * 180 / Math.PI - 30 , 0, 1, 0)
    }

    view.setLookAt(a[0], a[1], a[2], b[0], b[1], b[2], c[0], c[1], c[2])
  }

  function setPerspective(fov, aspect, near, far){
    if(viewType == "Perspective")
      proj.setPerspective(fov, aspect, near, far)
    else
      proj.setOrtho(aspect * -2, aspect * 2, -2, 2, near, far)
  }

  function init(){
    var slider_near = document.getElementById("slider-near");
    slider_near.onchange = (ev) => { 
      near = +ev.target.value;
      setPerspective(fov, ratio, near, far);
    }

    var slider_far = document.getElementById("slider-far");
    slider_far.onchange = (ev) => {
      far = +ev.target.value; 
      setPerspective(fov, ratio, near, far);
    }

    var button_view = document.getElementById("view");
    button_view.onmousedown = (ev) => {
      if(viewType == "Perspective") {
        sendTextToHTML("Perspective", "view");
        viewType = "Orthographic";
      }
      else {
        sendTextToHTML("Orthographic", "view");
        viewType = "Perspective";
      }
      setPerspective(fov, ratio, near, far)
    }

    canvas.onwheel = (ev) => {
      fov += ev.wheelDelta / 10;
      if(fov > 100) fov = 100;
      else if(fov < 30) fov = 30;
      setPerspective(fov, ratio, near, far);
    }

    window.onresize = (ev) => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
//      gl = getWebGLContext(canvas);
      gl.viewport(0, 0, canvas.width, canvas.height);
      ratio = canvas.width / canvas.height;
      setPerspective(fov, ratio, near, far);
    }

    document.onkeydown = (ev) => {      
      var getStep = {
        'a' : (from, to) => { return to.minus(from).cross(up); }, 
        'd' : (from, to) => { return up.cross(to.minus(from)); },
        'w' : (from, to) => { return from.minus(to); },
        's' : (from, to) => { return to.minus(from); }
      }
      switch(ev.key) {
        case 'a': case 'w': case 's': case 'd':
          var step = getStep[ev.key](from, to);
          step.elements[1] = 0;
          step = step.normalize().scale(speed);

          var A = from.minus(step);
          var B = to.minus(step);
          setLookAt(A.elements, B.elements, up.elements);
          break;
        case 'n':
          scene.normalShading = 1.0;
        default:
      }
    }

    document.onkeyup = (ev) => {
      if(ev.key == 'n')
        scene.normalShading = 0.0;
    }

    canvas.onmouseenter = (ev) => {
      lastMouse = new Vector3([0, ev.clientX, ev.clientY]);
    }

    canvas.onmousemove = (ev) => {
      if(!lastMouse) {
        lastMouse = new Vector3([0, ev.clientX, ev.clientY]);
        return;
      }
      var nowMouse = new Vector3([0, ev.clientX, ev.clientY]);
      var step = nowMouse.minus(lastMouse).scale(rotateSpeed).elements;
      if(new Vector3(step).length() < 1) return;

      var axis = up.cross(to.minus(from)).normalize().elements;
      var rotate = new Matrix4().rotate(-step[1], 0, 1, 0).rotate(step[2], axis[0], axis[1], axis[2]);
      var d = rotate.multiplyVector3(to.minus(from));
      var newTo = from.add(d);
      setLookAt(from.elements, newTo.elements, up.elements);

      lastMouse = nowMouse;
    }
  }

  return {
    view, proj, setLookAt, setPerspective, from
  }
}