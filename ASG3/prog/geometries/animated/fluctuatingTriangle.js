/**
 * Specifies a triangle which fluctuates in size (grows and shrinks).
 *
 * @author "Your Name"
 * @this {FluctuatingTriangle}
 */
class FluctuatingTriangle extends Triangle {
  /**
   * Constructor for FluctuatingTriangle.
   *
   * @constructor
   * @param {Number} size The size of the triangle drawn
   * @param {Number} centerX The center x-position of the triangle
   * @param {Number} centerY The center y-position of the triangle
   */
  constructor(size, centerX, centerY, color) {
      super (size, centerX, centerY, color)
      this.centerX = centerX
      this.centerY = centerY
      this.startTime = Date.now()

    // Recomendations: You're going to need a few variables to keep track of
    // information relevant to your animation. For example, to what amount your
    // triangle is currently scaled at.
  }

  /**
   * Updates the animation for FluctuatingTriangle. Grows and shrinks the
   * triangle in size.
   */
  updateAnimation() {
      var delta = (Date.now() - this.startTime) / 1000.
      var newSize = 0.5 * Math.sin(delta) + 1
      var t1 = new Matrix4().setTranslate (-this.centerX, -this.centerY, 0)
      var t = new Matrix4().setScale (newSize, newSize, 1)
      var t2 = new Matrix4().setTranslate (this.centerX, this.centerY, 0)
      this.modelMatrix = t2.multiply(t).multiply(t1)

    // Recomendations: How much the triangle grows an shrinks is up to you.
    // Might want to shrink it to x.50 at it's smallest point and x1.50 at it's
    // largest point.
    //
    // Keep in mind that no rendering should be done here. updateAnimation()'s
    // purpose is to update the geometry's modelMatrix and any other variables
    // related to animation. It should be the case that after I call
    // updateAnimation() I should be able to call render() elsewhere and have my
    // geometry complete a frame of animation.
  }
}
