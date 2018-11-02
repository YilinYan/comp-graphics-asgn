/**
 * Responsible for animating the Scene.
 */
function tick() {
  scene.updateAnimation()
  scene.render()
  requestAnimationFrame(tick)
}
