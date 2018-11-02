/**
 * Sends a WebGL 2D texture object (created by load2DTexture) and sends it to
 * the shaders.
 *
 * @param val The WebGL 2D texture object being passed
 * @param {Number} textureUnit The texture unit (0 - 7) where the texture will reside
 * @param {String} uniformName The name of the uniform variable where the texture's
 * textureUnit location (0 - 7) will reside
 */
function send2DTextureToGLSL(val, textureUnit, uniformName) {
  //
  // YOUR CODE HERE
  //

  // Recomendations: Within this funciton, you should:
  //    1. Gather your uniform location
  //    2. Determine the exture unit you will be using (gl.TEXTURE"N")
  //    3. Activate your texture unit using gl.activeTexture
  //    4. Bind your texture using gl.bindTexture
  //    5. Send the texture unit (textureUnit not the one you found) to your
  //       uniform location.
}

/**
 * Creates a WebGl 2D texture object.
 *
 * @param imgPath A file path/data url containing the location of the texture image
 * @param magParam texParameteri for gl.TEXTURE_MAG_FILTER. Can be gl.NEAREST,
 * gl.LINEAR, etc.
 * @param minParam texParameteri for gl.TEXTURE_MIN_FILTER. Can be gl.NEAREST,
 * gl.LINEAR, etc.
 * @param wrapSParam texParameteri for gl.TEXTURE_WRAP_S. Can be gl.REPEAT,
 * gl. MIRRORED_REPEAT, or gl.CLAMP_TO_EDGE.
 * @param wrapTParam texParameteri for gl.TEXTURE_WRAP_S. Can be gl.REPEAT,
 * gl. MIRRORED_REPEAT, or gl.CLAMP_TO_EDGE.
 * @param callback A callback function which executes with the completed texture
 * object passed as a parameter.
 */
function create2DTexture(imgPath, magParam, minParam, wrapSParam, wrapTParam, callback) {
  //
  // YOUR CODE HERE
  //

  // Recomendations: This function should see you creating an Image object,
  // setting that image object's ".onload" to an anonymous function containing
  // the rest of your code, and setting that image object's ".src" to imgPath.
  //
  // Within the anonymous function:
  //  1. create a texture object by saving the result of gl.createTexture()
  //  2. Flip your image's y-axis and bind your texture object to gl.TEXTURE_2D
  //  3. Using multiple calls to gl.texParameteri, pass magParam, minParam,
  //     wrapSParam, and wrapTParam.
  //  4. Set the texture's image to the loaded image using gl.texImage2D
  //  5. Pass your completed texture object to your callback function
  //
  // NOTE: This function should not return anything.
}

/**
 * Sends data to a uniform variable expecting a matrix value.
 *
 * @private
 * @param {Array} val Value being sent to uniform variable
 * @param {String} uniformName Name of the uniform variable recieving data
 */
function sendUniformMatToGLSL(val, uniformName) {
  if (DEBUG_FLAG == true) {
     console.log ("sendUniformMatToGLSL: " + uniformName + "  " + val)
  }
  uniform = gl.getUniformLocation(gl.program, uniformName)
  gl.uniformMatrix4fv(uniform, false, val)
// Recomendations: This is going to be very similar to sending a float/vec.
}

/**
* Sends data to an attribute variable using a buffer.
*
* @private
* @param {Float32Array} data Data being sent to attribute variable
* @param {Number} dataCount The amount of data to pass per vertex
* @param {String} attribName The name of the attribute variable
*/
function sendAttributeBufferToGLSL(rawData, dataCount, attribName) {
  var num
  dataPre = []
  // loadobj in different way
  rawData.forEach (function (raw, index) {
    var points = raw.points
    if (points instanceof Vector3) points = points.elements
    num = points.length
    points.forEach (function (point, index) {
      dataPre.push (point) })
  });

  data = new Float32Array (dataPre)  //have to be Float32Array !

  if (DEBUG_FLAG == true) {
    console.log ("sendAttributeBufferToGLSL" + "  " + attribName + "  "
                    + dataCount + "\n" + data)
  }

  var vertexBuffer = gl.createBuffer()
  gl.bindBuffer (gl.ARRAY_BUFFER, vertexBuffer)
  gl.bufferData (gl.ARRAY_BUFFER, data, gl.STATIC_DRAW)  // specified STREAM_DRAW ?

  var a_Position = gl.getAttribLocation(gl.program, attribName)
  gl.vertexAttribPointer (a_Position, num, gl.FLOAT, false, 0, 0)
  gl.enableVertexAttribArray (a_Position)

// Recommendations: This piece of code should do these three things:
// 1. Create a an attribute buffer
// 2. Bind data to that buffer
// 3. Enable the buffer for use
//
// Some modifications can be made to this function to improve performance. Ask
// a TA in lab if you're interested in these modifications.
}

/**
* Draws the current buffer loaded. Buffer was loaded by sendAttributeBufferToGLSL.
*
* @param {Integer} pointCount The amount of vertices being drawn from the buffer.
*/
function tellGLSLToDrawCurrentBuffer(pointCount) {
  if (DEBUG_FLAG == true) {
    console.log ("tellGLSLToDrawCurrentBuffer:  " + pointCount)
  }
  gl.drawArrays (gl.TRIANGLES, 0, pointCount)
}

/**
* Sends a float value to the specified uniform variable within GLSL shaders.
* Prints an error message if unsuccessful.
*
* @param {float} val The float value being passed to uniform variable
* @param {String} uniformName The name of the uniform variable
*/
function sendUniformFloatToGLSL(val, uniformName) {
  uniform = gl.getUniformLocation(gl.program, uniformName);
  gl.uniform1f(uniform, val)
}

/**
* Sends an JavaSript array (vector) to the specified uniform variable within
* GLSL shaders. Array can be of length 2-4.
*
* @param {Array} val Array (vector) being passed to uniform variable
* @param {String} uniformName The name of the uniform variable
*/
function sendUniformVec4ToGLSL(val, uniformName) {
  if (DEBUG_FLAG == true) {
    console.log ("sendUniformVec4ToGLSL: " + uniformName + "  " + val)
  }
  uniform = gl.getUniformLocation(gl.program, uniformName);
  if(val.length == 2) gl.uniform4f(uniform, val[0], val[1])
  else if(val.length == 3) gl.uniform4f(uniform, val[0], val[1], val[2])
  else if(val.length == 4) gl.uniform4f(uniform, val[0], val[1], val[2], val[3])
}
