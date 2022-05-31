var VSHADER_SOURCE = null
var FSHADER_SOURCE = null

function main() {
    canvas = document.getElementById('webgl')
    var gl = getWebGLContext(canvas)
    if (!gl) {
        console.log('Failed to get canvas')
        return
    }

    loadShaderFile(gl, 'HelloTriangle.vert', gl.VERTEX_SHADER, onLoadShader)
    loadShaderFile(gl, 'Point.frag', gl.FRAGMENT_SHADER, onLoadShader)
}

function start(gl) {
    if (!initShaders(gl, VSHADER_SOURCE, FSHADER_SOURCE)) {
        console.log('Failed to initialize shader')
        return
    }

    //Set the positions of verrtices
    var n = initVertexBuffers(gl)
    if(n < 0) {
        console.log('Failed to set the poistions of the vertices')
        return
    }

    gl.clearColor(0.0, 0.0, 0.0, 1.0)
    gl.clear(gl.COLOR_BUFFER_BIT)

    //    gl.drawArrays(gl.LINE_LOOP, 0, n)
    //    gl.drawArrays(gl.LINE_STRIP, 0, n)
    //    gl.drawArrays(gl.LINES, 0, n)
    gl.drawArrays(gl.TRIANGLES, 0, n)
}

function initVertexBuffers(gl) {
    var vertices = new Float32Array([
        0.0, 0.5, 
        -0.5, -0.5, 
        0.5, -0.5
    ])
    var n = 3 //vertices

    //create a buffer object
    var vertexBuffer = gl.createBuffer()
    if(!vertexBuffer) {
        console.log('Failed to create the buffer object')
        return -1
    }

    //Bind the buffer to a target
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer)
    gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW)

    var a_Position = gl.getAttribLocation(gl.program, 'a_Position')

    //Assign the buffer object ot a_Poaition variable
    gl.vertexAttribPointer(a_Position, 2, gl.FLOAT, false, 0, 0)

    //Enable the assignment to a_Position variable
    gl.enableVertexAttribArray(a_Position)

    return n
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