Welcome to CMPS 160's assignment 4!

This zip file contains the necessary starter code and structure for this
assignment.

First, lets start with some code reuse recommendations from assignment 3:
  1. Reuse eventFunctions.js. Modify it as you see fit for this assignment.
  2. Reuse glslFunctions.js. Two new functions were introduced:
      i. create2DTexture() for creating a 2-Dimmensional WebGl texture.
     ii. send2DTextureToGLSL for sending a 2-Dimmensional WebGl texture to
          your shaders.
     Some "skeleton" code can be found in prog. Simply copy that code into
     your ASG3 file and place the modified ASG3 file in ASG4's prog.
  3. Reuse htmlFunctions.js.
  4. Reuse reuse all geometry you've constructed so far.
  5. geometry.js and scene.js have some changes. Please look into them.
You might want to include old code EXACTLY where it was in Assignment 3.

Second, some code you'll probably need to rewrite:
  1. main.js and it's main().
  2. shaders.js with updated shaders.
  3. driver.html (NOTE: Might want to use your ASG3 driver.html as a reference)

Third, code that has remained the same:
  1. Most of lib.

Fourth, a new folder:
  1. external: External has some sample OBJ files and textures you can use. Might want to
	       store your OBJ files and textures here.

Last, some new .js files introduced within:
  lib
    1. updated-cuon-utils.js: cuon-utils.js has been deprecated in an effort to
       introduce you guys to using multiple shaders. initShaders() is no longer
       included and has been replaced with createShader() and useShader().
       createShader() creates a WebGL shading program you will want to store
       within your geometry. useShader() takes that program and allows you to
       use it when drawing.

  prog/geometries/animated
    1. checkerCube.js: Specifies a tiltedCube which has a checkerboard texture
       applied to it.
    2. texturedCube.js: Specifies a tiltedCube which has any power-of-two
       texture applied to it. Has different effects on each face.

These new .js files are meant to move us into getting started with textured
objects! Here are a few pointers when using textures:

What is a power-of-two texture?
  A power-of-two texture is a texture whose dimmensions are 2^n x 2^n for some
  n >= 0. These textures will always play nice with WebGL.

Can I use textures which are not power-of-two textures?
  Yes. But you must do so in a certain way. When creating the 2D Texture, you
  must pass gl.CLAMP_TO_EDGE for gl.TEXTURE_WRAP_S and gl.TEXTURE_WRAP_T
  (this means sending gl.CLAMP_TO_EDGE as wrapSParam and wrapTParam when
  calling create2DTexture()).


This should be what you need to know for this assignment. Good Luck!
