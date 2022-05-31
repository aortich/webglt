//Vertex shader program
var VSHADER_SOURCE = null

// Fragment shader program
var FSHADER_SOURCE = null

function main() {
    var canvas = document.getElementById('webgl')

    var gl = getWebGLContext(canvas)
    if (!gl) {
        console.log('Failed to get canvas')
        return
    }

    //async retrieve shader files
    loadShaderFile(gl, 'Point.vert', gl.VERTEX_SHADER, onLoadShader)
    loadShaderFile(gl, 'Point.frag', gl.FRAGMENT_SHADER, onLoadShader)
}

function start(gl) {
     //Shader initialization
     if(!initShaders(gl, VSHADER_SOURCE, FSHADER_SOURCE)) {
        console.log('Failed to initialize shader')
        return
    }

    gl.clearColor(0.0, 0.0, 0.0, 1.0)
    gl.clear(gl.COLOR_BUFFER_BIT)

    gl.drawArrays(gl.POINTS, 0, 1)
}

function onLoadShader(gl, fileString, type) {
    if(type == gl.VERTEX_SHADER){
        VSHADER_SOURCE = fileString
    }
    
    if(type == gl.FRAGMENT_SHADER) {
        FSHADER_SOURCE = fileString
    }

    if(VSHADER_SOURCE && FSHADER_SOURCE) {
        start(gl)
    }
}