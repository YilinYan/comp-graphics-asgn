/**
 * A cube with a single textured applied in multiple different ways. A subclass
 * of TiltedCube.
 *
 * @author "Your Name Here"
 * @this {MultiTextureCube}
 */

var m_points = null;
var m_uvs = null;
var m_normals = null;

class ColoredCube extends TiltedCube {

  constructor(size, center, color, rotation = 0) {
    super(size, color)
    this.size = size
    this.realColor = color;
    this.startTime = Date.now();
    this.offset = Math.random() * 10000;
    this.blink = -1;
  
    this.modelMatrix.translate(center[0], center[1], center[2])
    this.modelMatrix.scale(size, size, size)
    this.modelMatrix.rotate(rotation, 0, 1, 0)

    this.ks = Math.random() + 1
    this.kd = Math.random() + 1
    this.spower = Math.random() * 32 + 5
    this.center = center;

    this.generateUVCoordinates()
    this.points = this.getPoints()
    this.uvs = this.getUvs()
    this.normals = this.getNormals()
/*
    this.kbink = [
      Math.sqrt(Math.sqrt(Math.sqrt(this.realColor[0])) - this.realColor[0]),
      Math.sqrt(Math.sqrt(Math.sqrt(this.realColor[1])) - this.realColor[1]),
      Math.sqrt(Math.sqrt(Math.sqrt(this.realColor[2])) - this.realColor[2])]
*/
    this.kbink = [1, 1, 1]
    if(this.color[0] <= this.color[1] && this.color[0] <= this.color[2])
      this.kbink[0] = 0;
    else if(this.color[1] <= this.color[0] && this.color[1] <= this.color[2])
      this.kbink[1] = 0;

    this.length = this.vertices.length;
    }

  generateUVCoordinates() {
    var UV = [[0, 0], [0, 1], [1, 1], [0, 0], [1, 1], [1, 0]]

    this.vertices.forEach((v, i) => {
      v.uv = UV[i % 6]
    })
  }

  getPoints() {
    if(m_points) return m_points;
    m_points = new Float32Array (this.vertices.length * 3)
    this.vertices.forEach((v, i) => {
      v.pos.elements.forEach((p, j) => {
        m_points[i * 3 + j] = p
      })
    })
    return m_points
  }

  getUvs() {
    if(m_uvs) return m_uvs;
    m_uvs = new Float32Array (this.vertices.length * 2)
    this.vertices.forEach((v, i) => {
      v.uv.forEach((uv, j) => {
        m_uvs[i * 2 + j] = uv
      })
    })
    return m_uvs
  }

  getNormals() {
    if(m_normals) return m_normals;
    m_normals = new Float32Array (this.vertices.length * 3)
    this.vertices.forEach((v, i) => {
      v.normal.elements.forEach((norm, j) => {
        m_normals[i * 3 + j] = norm
      })
    })
    return m_normals
  }

  render() {
  //  sendUniformFloatToGLSL(this.kd, "u_diffuseIntensity");
  //  sendUniformFloatToGLSL(this.ks, "u_specularIntensity");
  //  sendUniformFloatToGLSL(this.spower, "u_spower");
    sendUniformVec4ToGLSL (this.color, "u_color")
    sendUniformMatToGLSL (this.modelMatrix.elements, "transMatrix")
    gl.drawArrays (gl.TRIANGLES, 0, this.length)
  }

  updateAnimation() {
    if(this.orbiting)
    this.modelMatrix = new Matrix4().setRotate(this.orbiting, 0, 1, 0)
    .concat(this.modelMatrix);

    if(this.spinning)
      this.modelMatrix.rotate(1, this.spinning, this.spinning, this.spinning);

    if(this.blinking > 0) {
      /*
      var k = Math.sin(this.blinking) * 0.5 + 0.5;
      console.log(this.realColor, k);
      this.color = [this.realColor[0] + k * this.kbink[0],
                    this.realColor[1] + k * this.kbink[1],
                    this.realColor[2] + k * this.kbink[2], 1]
      this.blinking -= 0.04;
      */
      var k = Math.sin(this.blinking) + 2;
      this.color = [this.realColor[0] * (this.kbink[0] ? k : 1),
                    this.realColor[1] * (this.kbink[1] ? k : 1),
                    this.realColor[2] * (this.kbink[2] ? k : 1), 1]
      this.blinking -= 0.04;
    }
    /*
    var time = Date.now() + this.offset;
    var k = Math.sin((time - this.startTime) / 1000);
    if(k < 0) { this.blink = -1; return; }
    if(this.blink == -1) {
      this.blink = Math.random();
    }
  //  if(this.blink > 0.8) { this.color = this.realColor; return; }

    k = k;
    k = Math.sqrt(k);
    k = (Math.sqrt(k)) + 1;
    this.color = [this.realColor[0] * k, this.realColor[1] * k, this.realColor[2] * k, this.realColor[3]];
  */
  }
}
