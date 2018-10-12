Welcome to CMPS 160's assignment 2!

This zip file contains the necessary starter code and structure for this
assignment.

First, lets start with some code reuse recommendations from assignment 1:
  1. Reuse eventFunctions.js. Modify it as you see fit for this assignment.
     Incorperating Scene within eventFunctions.js is highly encouraged.
  2. Reuse glslFunctions.js. Two new functions are introduced within this
     assignment:
      i. tellGLSLToDrawCurrentBuffer() for drawing the scene on the canvas
     ii. sendAttributeBufferToGLSL() for sending an array of attribute values
         to your shaders.
     Some "skeleton" code can be found in prog. Simply copy that code into
     your ASG1 file and place the modified ASG1 file in ASG2's prog.
  3. Reuse htmlFunctions.js.
You might want to include old code EXACTLY where it was in Assignment 1.

Second, some code you'll probably need to rewrite:
  1. main.js and it's main().
  2. shaders.js with updated shaders.
  3. driver.html (NOTE: Might want to use your ASG1 driver.html as a reference)

Third, code that has remained the same:
  1. The entire lib folder.

Last, some new .js files introduced within prog:
  1. scene/scene.js: Responsible for managing your WebGL scene
  2. scene/geometry.js: Represents a geometric object within you WebGL scene
  3. scene/vertex.js: Represents a vertex within a geometric object
  4. geometries/circle.js: Represents a circle geometry.
  5. geometries/square.js: Represents a square geometry.
  6. geometries/triangle.js: Represents a triangle geometry.

These new .js files are meant to introduce you to the Scene-Geometry
programming paradigm common in most graphics libraries. So let's take a quick
look at both Scene and Geometry objects specified within scene.js and
geometry.js.

Scene:
  The Scene object's role is to manage the presence of geometry onscreen. What
  this means is:
    1. Adding geometry onto your canvas
    2. Clearing all geometry currently on your canvas

  Recommendations for this assignment:
    Setting Scene as a global variable is a good idea (considering you
    will need to interact with it within eventFunctions.js). Initializing
    it within main() is also a good idea.

Geometry:
  The Geometry object's role is to represent a geometric object onscreen.
  A geometric object (at this point) is composed of vertices containing the
  x-y-z coordinates necessary for drawing the Geometry.

  Recommendations for this Assignment:
    Object oriented programming is your friend. Limit code reuse by using the
    "super" keyword. Also remember method overloading is a thing (This is more
    relevant for future assignments, but I felt it's nice to mention).

Circle, Square, and Triangle are SUBCLASSES of Geometry. And with that, you're
free to start.

Good luck!
