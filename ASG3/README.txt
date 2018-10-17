Welcome to CMPS 160's assignment 3!

This zip file contains the necessary starter code and structure for this
assignment.

First, lets start with some code reuse recommendations from assignment 2:
  1. Reuse eventFunctions.js. Modify it as you see fit for this assignment.
  2. Reuse glslFunctions.js. One new function was introduced within this
     assignment:
      i. sendUniformMat4ToGLSL() for drawing the scene on the canvas
     Some "skeleton" code can be found in prog. Simply copy that code into
     your ASG2 file and place the modified ASG2 file in ASG3's prog.
  3. Reuse htmlFunctions.js.
  4. Reuse circle.js, triangle.js, and square.js.
  5. geometry.js and scene.js have some new methods. Please look into it.
You might want to include old code EXACTLY where it was in Assignment 2.

Second, some code you'll probably need to rewrite:
  1. main.js and it's main().
  2. shaders.js with updated shaders.
  3. driver.html (NOTE: Might want to use your ASG2 driver.html as a reference)

Third, code that has remained the same:
  1. Most of lib.

Last, some new .js files introduced within:
  lib
    1. cuon-matrix.js: Contains the matrix/vector library necessary for this
       assignment. Note that the file uses pre-ES6 objects, so the way the
       Matrix4, Vector4, etc. objects are formatted in this file is different.

  lib/obj-loading
    1. loadedOBJ.js: A subclass of geometry you will be using to load OBJ files
    2. webgl-obj-loader.js: Code necessary for reading obj files. You should
       not need to interact with it.

  prog
    1. tick.js: Responsible for gathering the frames necessary for animating
       your scene.

  prog/geometries/animated
    1. fluctuatingTriangle.js: Specifies a triangle which grows and shrinks in
       size. A subclass of Triangle.
    2. randomCircle.js: Specifies a triangle which moves randomly across the
       screen. A subclass of Circle.
    3. spinningSquare.js: Specifies a square which spins in place. A subclass of
       Square.
    4. tiltedCube.js: Specifies a tilted cube which spins.

These new .js files are meant to move us into the world of animation! This
assignment will heavily rely on matrix transformations to animate your geometry
on screen.

Now, let's clarify randomCircle.
  "What does random movement mean?"
    - What you want it to mean. There is no set criteria for "random" movement.
      Just provide us with something that visually "looks" random. However,
      your circle should stay within the boundaries of the canvas (because of
      this, the movement of your circle might not be truly random).

  "Any suggestions?"
    - Yes. Checking whether your circle is in your canvas is tricky. In order to
    check if its within the bounds of your canvas (assuming your canvas is still
    500x500) I recommend 2 things:
      1. Change your Vertex.points from an array to a Vector4 object from
        cuon-matrix.js.
      2. Apply your modelMatrix to each Vertex.points every animation frame and
        check if any x-y-z is out-of-bounds (i.e. > 1.0 or < -1.0).
    This is what I did. You may come up with a better solution (good for you!).

This should be all you need to know for assignment 3. Good luck!
