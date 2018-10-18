/**
 * Specifies a circle which moves randomly.
 *
 * @author "Your Name"
 * @this {RandomCircle}
 */
class RandomCircle extends Circle {
  /**
   * Constructor for RandomCircle.
   *
   * @constructor
   * @param {Number} radius The radius of the random circle being constructed
   * @param {Integer} segements The number of segments composing the circle
   * @param {Number} centerX The x-position of the circle being constructed
   * @param {Number} centerY The y-position of the circle being constructed
   * @returns {RandomCircle} RandomCircle object created
   */
  constructor(radius, segments, centerX, centerY, color) {
      super(radius, segments, centerX, centerY, color)
      this.direction = Math.random() * Math.PI * 2
      this.deltaX = 0
      this.deltaY = 0
      this.lastTime = Date.now()
      this.centerX = centerX
      this.centerY = centerY
      this.radius = radius / 500

    // Recomendations: You're going to need a few variables to keep track of
    // information relevant to your animation. For example, a circle is going
    // to need a variable to keep track of the direction the circle is moving.
  }

  /**
   * Updates random circle's animation. Changes modelMatrix into a translation
   * matrix translating into a random direction.
   */
  updateAnimation() {
      var newX = this.deltaX + Math.cos(this.direction) / 1000 * (Date.now() - this.lastTime)
      var newY = this.deltaY + Math.sin(this.direction) / 1000 * (Date.now() - this.lastTime)
      /* It is too slow
      for (var i = 0; this.vertices[i]; ++i) {
          var vertice = this.vertices[i].points
          var v4 = new Vector4 ([vertice[0], vertice[1], 1, 1])
          var v = (t.multiplyVector4 (v4)).elements

          if (v[0] > 1 || v[0] < -1) {
              v[0] /= Math.abs (v[0])
              this.direction = Math.PI - this.direction
              break
          }
          else if (v[1] > 1 || v[1] < -1) {
              v[1] /= Math.abs (v[1])
              this.direction = - this.direction
              break
          }
      }
      */
      var xx = this.centerX + newX
      var yy = this.centerY + newY
      if (xx + this.radius > 1 || xx - this.radius < -1) {
          newX = xx / Math.abs(xx) * (1 - this.radius) - this.centerX
          this.direction = Math.PI - this.direction
      }
      else if (yy + this.radius > 1 || yy - this.radius < -1) {
          newY = yy / Math.abs(yy) * (1 - this.radius) - this.centerY
          this.direction = - this.direction
      }
      this.deltaX = newX
      this.deltaY = newY
      this.modelMatrix = new Matrix4().setTranslate (newX, newY, 0)
      this.lastTime = Date.now()

    // Recomendations: Refer to README.txt for more detalied recommendations
    //
    // Keep in mind that no rendering should be done here. updateAnimation()'s
    // purpose is to update the geometry's modelMatrix and any other variables
    // related to animation. It should be the case that after I call
    // updateAnimation() I should be able to call render() elsewhere and have my
    // geometry complete a frame of animation.
  }

}
