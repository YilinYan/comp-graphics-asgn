/**
 * Responsible for animating the Scene.
 */
function tick() {
  scene.updateAnimation()
  scene.render()
  requestAnimationFrame(tick)
  // Recomendations: You're going to want to call this at the end of your main()
  // in main.js. requestAnimationFrame() needs to be used here (read the book).
}
