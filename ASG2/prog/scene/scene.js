/**
 * Specifies a WebGL scene.
 *
 * @author "Your Name Here"
 * @this {Scene}
 */
class Scene {
  /**
   * Constructor for Scene.
   *
   * @constructor
   */
  constructor () {
    this.geometries = []; // Geometries being drawn on canvas
    gl.clearColor (0., 0., 0., 1.)
    gl.clear (gl.COLOR_BUFFER_BIT)

    // Recommendations: Setting the canvas's clear color and clearing the canvas
    // here is a good idea.
  }

  /**
   * Adds the given geometry to the the scene.
   *
   * @param {Geometry} geometry Geometry being added to scene
   */
  addGeometry (geometry) {
      this.geometries.push (geometry)
  }

  /**
   * Clears all the geometry within the scene.
   */
  clearGeometry () {
      this.geometries = []
      gl.clear (gl.COLOR_BUFFER_BIT)
    // Recommendations: It would be best to call this.render() at the end of
    // this call.
  }

  /**
   * Renders all the Geometry within the scene.
   */
  render () {
/*
      for (var i in this.geometries) {  //need to index
          var geometry = this.geometries[i]
          console.log (geometry)
          geometry.render ()
      }
*/
      this.geometries.forEach (function(geometry, index) {
          geometry.render ()});

    // Recommendations: No calls to any of your GLSL functions should be made
    // here. Your Geometry objects in this.geometries should render themselves
    // through their own .render() methods.
  }
}
