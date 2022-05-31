var VSHADER_SOURCE = null
var FSHADER_SOURCE = null

function main() {
    var canvas = document.getElementById('webgl')
    var gl = getWebGLContext(canvas)
    if (!gl) {
        console.log('Failed to get canvas')
        return
    }

    //async retrieve shader files
    loadShaderFile(gl, 'Point2.vert', gl.VERTEX_SHADER, onLoadShader)
    loadShaderFile(gl, 'Point.frag', gl.FRAGMENT_SHADER, onLoadShader)
}

function start(gl) {
    //Shader initialization
    if (!initShaders(gl, VSHADER_SOURCE, FSHADER_SOURCE)) {
        console.log('Failed to initialize shader')
        return
    }
    //Retrieve a_Position and a_PointSize attributes (pointer?)
    var a_Position = gl.getAttribLocation(gl.program, 'a_Position');
    var a_PointSize = gl.getAttribLocation(gl.program, 'a_PointSize')
    if(a_Position < 0 ||
        a_PointSize < 0) {
        console.log('Failed to get the storage location of a_Position')
        return
    }

    //Pass vertex position to attribute
    gl.vertexAttrib3f(a_Position, 0.5, 0.0, 0.0)

    //Pass float size to attribute
    gl.vertexAttrib1f(a_PointSize, 20.0)

    gl.clearColor(0.0, 0.0, 0.0, 1.0)
    gl.clear(gl.COLOR_BUFFER_BIT)

    gl.drawArrays(gl.POINTS, 0, 1)
}

function onLoadShader(gl, fileString, type) {
    if (type == gl.VERTEX_SHADER) {
        VSHADER_SOURCE = fileString
    }

    if (type == gl.FRAGMENT_SHADER) {
        FSHADER_SOURCE = fileString
    }

    if (VSHADER_SOURCE && FSHADER_SOURCE) {
        start(gl)
    }
}