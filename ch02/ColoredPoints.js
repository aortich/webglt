var VSHADER_SOURCE = null
var FSHADER_SOURCE = null
var g_points = [] //array for mouse presses
var canvas = null

function main() {
    canvas = document.getElementById('webgl')
    var gl = getWebGLContext(canvas)
    if (!gl) {
        console.log('Failed to get canvas')
        return
    }

    loadShaderFile(gl, 'ClickedPoint.vert', gl.VERTEX_SHADER, onLoadShader)
    loadShaderFile(gl, 'ColoredPoints.frag', gl.FRAGMENT_SHADER, onLoadShader)
}

function start(gl) {
    if (!initShaders(gl, VSHADER_SOURCE, FSHADER_SOURCE)) {
        console.log('Failed to initialize shader')
        return
    }

    var a_Position = gl.getAttribLocation(gl.program, 'a_Position');
    var u_FragColor = gl.getUniformLocation(gl.program, 'u_FragColor');
    if(a_Position < 0 || !u_FragColor) {
        console.log('Failed to get the storage location of a_Position')
        return
    }

    gl.clearColor(0.0, 0.0, 0.0, 1.0)
    gl.clear(gl.COLOR_BUFFER_BIT)

    //Register event handler
    canvas.onmousedown = function(ev) { 
        click(ev, gl, canvas, a_Position, u_FragColor)
    }
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

function click(ev, gl, canvas, a_Position, u_FragColor) {
    var x = ev.clientX;
    var y = ev.clientY;
    var rect = ev.target.getBoundingClientRect()
    
    red = (x - rect.left)/canvas.width
    blue = 1 - ((x - rect.left)/canvas.width)
    green = Math.abs(((x - rect.left) - canvas.width/2)/(canvas.width/2))

    x = ((x - rect.left) - canvas.width/2)/(canvas.width/2)
    y = (canvas.height/2 - (y - rect.top))/(canvas.height/2)
    
    g_points.push([x, y, red, green, blue])

    gl.clear(gl.COLOR_BUFFER_BIT)
    g_points.forEach(function(e) {
        gl.vertexAttrib3f(a_Position, e[0], e[1], 0.0)
        gl.uniform4f(u_FragColor, e[2], e[3], e[4], 1.0)
        gl.drawArrays(gl.POINTS, 0, 1)
    })

}