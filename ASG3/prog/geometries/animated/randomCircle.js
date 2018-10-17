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

    // Recomendations: You're going to need a few variables to keep track of
    // information relevant to your animation. For example, a circle is going
    // to need a variable to keep track of the direction the circle is moving.
  }

  /**
   * Updates random circle's animation. Changes modelMatrix into a translation
   * matrix translating into a random direction.
   */
  updateAnimation() {
      var newX = this.deltaX + Math.cos(this.direction) / 100
      var newY = this.deltaY + Math.sin(this.direction) / 100
      var t = new Matrix4().setTranslate (newX, newY, 0)

      for (var i = 0; this.vertices[i]; ++i) {
          var vertice = this.vertices[i].points
          var v4 = new Vector4 ([vertice[0], vertice[1], 1, 1])
          var v = (t.multiplyVector4 (v4)).elements

          if (v[0] > 1 || v[0] < -1) {
              this.direction = Math.PI - this.direction
              break
          }
          else if (v[1] > 1 || v[1] < -1) {
              this.direction = - this.direction
              break
          }
      }
      this.deltaX = newX
      this.deltaY = newY
      this.modelMatrix = t


    // Recomendations: Refer to README.txt for more detalied recommendations
    //
    // Keep in mind that no rendering should be done here. updateAnimation()'s
    // purpose is to update the geometry's modelMatrix and any other variables
    // related to animation. It should be the case that after I call
    // updateAnimation() I should be able to call render() elsewhere and have my
    // geometry complete a frame of animation.
  }

}
