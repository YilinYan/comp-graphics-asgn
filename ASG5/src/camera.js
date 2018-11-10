
var Camera = () => {
  var view = new Matrix4();
  var proj = new Matrix4();

  function setLookAt(from, to, up){
    view.setLookAt(from[0], from[1], from[2], to[0], to[1], to[2], up[0], up[1], up[2])
  }

  function setPerspective(fov, aspect, near, far){
    proj.setPerspective(fov, aspect, near, far)
  }

  return {
    view, proj, setLookAt, setPerspective
  }
}