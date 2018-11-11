
var Camera = () => {
  var view        = new Matrix4()
  var proj        = new Matrix4()
  var from        = new Vector3()
  var to          = new Vector3()
  var up          = new Vector3()
  var speed       = 0.1;
  var rotateSpeed = 0.3;
  var lastMouse;
  var fov = 75;
  var ratio = canvas.width / canvas.height;
  /*
  var lastTime;
  var lastTime = { 'a': 0, 'w': 0, 's': 0, 'd': 0 };
  var flag = {'a': false, 'w': false, 's': false, 'd': false};
*/
  setLookAt([8, 2, 8], [9, 3, 8], [0, 1, 0]);
  setPerspective(75, ratio, 0.01, 100);
  init();

  function setLookAt(a, b, c){
    from = new Vector3(a); to = new Vector3(b); up = new Vector3(c);
    view.setLookAt(a[0], a[1], a[2], b[0], b[1], b[2], c[0], c[1], c[2])
  }

  function setPerspective(fov, aspect, near, far){
    proj.setPerspective(fov, aspect, near, far)
  }

  function setMove(){
    var getStep = {
      'a' : (from, to, t) => { return to.minus(from).cross(up).normalize().scale(speed * t); }, 
      'd' : (from, to, t) => { return up.cross(to.minus(from)).normalize().scale(speed * t); },
      'w' : (from, to, t) => { return from.minus(to).normalize().scale(speed * t); },
      's' : (from, to, t) => { return to.minus(from).normalize().scale(speed * t); }
    }
    if(flag['a']) {
      var step = getStep['a'](from, to, Date.now() - lastTime);
      //      lastTime[ev.key] = Date.now();
      step.elements[1] = 0;
      step = step.normalize().scale(speed * 10);
      from = from.minus(step);
      to = to.minus(step);
      setLookAt(from.elements, to.elements, up.elements);
    }
    lastTime = Date.now();
  }

  function setFlag(){
    flag['a'] = flag['d'] = flag['w'] = flag['s'] = false;
  }

  function init(){
    canvas.onwheel = (ev) => {
      fov += ev.wheelDelta / 10;
      if(fov > 100) fov = 100;
      else if(fov < 30) fov = 30;
      setPerspective(fov, ratio, 0.01, 100);
    }

    window.onresize = (ev) => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
//      gl = getWebGLContext(canvas);
      gl.viewport(0, 0, canvas.width, canvas.height);
      ratio = canvas.width / canvas.height;
      setPerspective(fov, ratio, 0.01, 100);
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

          from = from.minus(step);
          to = to.minus(step);
          setLookAt(from.elements, to.elements, up.elements);
        default:
      }
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
      to = from.add(d);
      setLookAt(from.elements, to.elements, up.elements);

      lastMouse = nowMouse;
    }
  }

  return {
    view, proj, setLookAt, setPerspective
  }
}