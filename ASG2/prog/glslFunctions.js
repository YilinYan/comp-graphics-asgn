/**
 * Sends data to an attribute variable using a buffer.
 *
 * @private
 * @param {Float32Array} data Data being sent to attribute variable
 * @param {Number} dataCount The amount of data to pass per vertex
 * @param {String} attribName The name of the attribute variable
 */

function sendAttributeBufferToGLSL(data, dataCount, attribName) {
    data = new Float32Array (data)  //have to be Float32Array !

    var vertexBuffer = gl.createBuffer()
    gl.bindBuffer (gl.ARRAY_BUFFER, vertexBuffer)
    gl.bufferData (gl.ARRAY_BUFFER, data, gl.STATIC_DRAW)  // specified STREAM_DRAW ?

    var a_Position = gl.getAttribLocation(gl.program, attribName)
    gl.vertexAttribPointer (a_Position, 2, gl.FLOAT, false, 0, 0)
    gl.enableVertexAttribArray (a_Position)
/*
    var t = gl.getBufferParameter(gl.ARRAY_BUFFER, gl.BUFFER_SIZE)
    console.log (t)
    console.log (data)
*/
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
function tellGLSLToDrawCurrentBuffer(shape, pointCount) {
    //
    if (shape == "circle") {
        gl.drawArrays (gl.TRIANGLE_FAN, 0, pointCount/2)
    }
    else if (shape == "triangle") {
        gl.drawArrays (gl.TRIANGLE_STRIP, 0, pointCount/2)
    }
    else if (shape == "square") {
        gl.drawArrays (gl.TRIANGLE_STRIP, 0, pointCount/2)
    }

  // Recommendations: Should only be one line of code.
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
    uniform = gl.getUniformLocation(gl.program, uniformName);
    if(val.length == 2) gl.uniform4f(uniform, val[0], val[1])
    else if(val.length == 3) gl.uniform4f(uniform, val[0], val[1], val[2])
    else if(val.length == 4) gl.uniform4f(uniform, val[0], val[1], val[2], val[3])
}
