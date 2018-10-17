/**
 * Specifies a tilted cube which rotates.
 *
 * @author "Your Name"
 * @this {TiltedCube}
 */
class TiltedCube extends Geometry {
  /**
   * Constructor for TiltedCube.
   *
   * @constructor
   * @returns {TiltedCube} Geometric object created
   */
  constructor(size, centerX, centerY, color) {
      super()
      this.color = color

      if (DEBUG_FLAG_CUBE == true) {
          console.log ("construct cube: " + "    "
                        + this.color + "    "
                        + this.vertices[0].points + "  "
                        + this.vertices[1].points + "  "
                        + this.vertices[2].points + "  "
                        + this.vertices[3].points + "  "
                        + this.vertices[4].points + "  "
                        + this.vertices[5].points + "  "
                        + this.vertices[6].points + "  "
                        + this.vertices[7].points)
      }

    // Recommendations: Might want to tilt your cube at 30 degrees relative to
    // the z-axis here. Pretty good tilt that lets us see that it's a cube.
  }

  /**
   * Generates the vertices of TiltedCube. Just a regular cube.
   *
   * @private
   */
  generateCubeVertices(size, centerX, centerY) {
      size /= 500
      var x = [0, 0, 1, -1, 0, 0, 1, -1]
      var y = [-1, 1, 0, 0, -1, 1, 0, 0]
      var z = [-1, -1, -1, -1, 1, 1, 1, 1]

      for (var i = 0; i < 8; ++i) {
          var newX = x[i] * size + centerX
          var newY = y[i] * size + centerY
          var newZ = z[i] * size
          var vertex = new Vertex (newX, newY)
          vertex.points.push(newZ)
          this.vertices.push (vertex)
      }

    // Recommendations: Might want to generate your cube vertices so that their
    // x-y-z values are combinations of 1.0 and -1.0. Allows you to scale the
    // the cube to your liking better.
  }

  /**
   * Updates the animation of the TiltedCube. Should make it rotate.
   */
  updateAnimation() {
    //
    // YOUR CODE HERE
    //

    // Recommendations: Do not simply apply a rotation matrix. Doing so will
    // cause your cube to spin in a circle around the axis you've chosen.
    //
    // Keep in mind that no rendering should be done here. updateAnimation()'s
    // purpose is to update the geometry's modelMatrix and any other variables
    // related to animation. It should be the case that after I call
    // updateAnimation() I should be able to call render() elsewhere and have my
    // geometry complete a frame of animation.
  }
}
