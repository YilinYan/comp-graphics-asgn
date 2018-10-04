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
