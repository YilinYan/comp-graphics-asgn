/**
 * Sends data to a uniform variable expecting a matrix value.
 *
 * @private
 * @param {Array} val Value being sent to uniform variable
 * @param {String} uniformName Name of the uniform variable recieving data
 */
 function sendUniformMatToGLSL(val, uniformName) {
     if (DEBUG_FLAG == true) {
        console.log ("sendUniformMatToGLSL: " + uniformName + "  "
                    + val)
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
    dataPre = []
    rawData.forEach (function (raw, index) {
        raw.points.forEach (function (point, index) {
            dataPre.push (point) })
        });
    data = new Float32Array (dataPre)  //have to be Float32Array !
    var num = rawData[0].points.length

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
    if (DEBUG_FLAG == true) {
        console.log ("sendUniformVec4ToGLSL: " + uniformName + "  " + val)
    }
    uniform = gl.getUniformLocation(gl.program, uniformName);
    if(val.length == 2) gl.uniform4f(uniform, val[0], val[1])
    else if(val.length == 3) gl.uniform4f(uniform, val[0], val[1], val[2])
    else if(val.length == 4) gl.uniform4f(uniform, val[0], val[1], val[2], val[3])
}
