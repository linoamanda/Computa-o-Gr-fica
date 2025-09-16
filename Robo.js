// Vertex shader source code
const vertexShaderSource3 = `
    attribute vec4 a_position;
    attribute vec4 a_color;
    varying vec4 v_color;
    void main() {
        gl_Position = a_position;
        v_color = a_color;
    }
`;

// Fragment shader source code
const fragmentShaderSource3 = `
    precision mediump float;
    varying vec4 v_color;
    void main() {
        gl_FragColor = v_color;
    }
`;

function createShader3(gl, type, source) {
    const shader = gl.createShader(type);
    gl.shaderSource(shader, source);
    gl.compileShader(shader);

    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        console.error('Error compiling shader:', gl.getShaderInfoLog(shader));
        gl.deleteShader(shader);
        return null;
    }

    return shader;
}

function createProgram3(gl, vertexShader, fragmentShader) {
    const program = gl.createProgram();
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);

    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
        console.error('Error linking program:', gl.getProgramInfoLog(program));
        gl.deleteProgram(program);
        return null;
    }

    return program;
}

function squareVerticesRobo(){
    return new Float32Array([
        // Cabeça
        -0.1,  0.6,
         0.1,  0.6,
        -0.1,  0.4,
         0.1,  0.4,
         0.1,  0.6,
        -0.1,  0.4,

        // Corpo
        -0.3,  0.3,
        -0.3, -0.5,
         0.3, -0.5,
        -0.3,  0.3,
         0.3, -0.5,
         0.3,  0.3,

        // Braço esquerdo 
        -0.55,  0.25,   
        -0.45,  0.25,   
        -0.65, -0.15, 

        -0.45,  0.25,   
        -0.65, -0.15,   
        -0.55, -0.15,    

        // Braço direito 
        0.45,  0.25,   
        0.55,  0.25,   
        0.65, -0.15,   

        0.45,  0.25,   
        0.65, -0.15,   
        0.55, -0.15,   
        // Perna esquerda 
        -0.20, -0.55,
        -0.10, -0.55,
        -0.20, -0.95,
        -0.10, -0.55,
        -0.20, -0.95,
        -0.10, -0.95,

        // Perna direita 
         0.10, -0.55,
         0.20, -0.55,
         0.10, -0.95,
         0.20, -0.55,
         0.10, -0.95,
         0.20, -0.95
    ]);
}


function squareColors3(){
    let color = [Math.random(), Math.random(), Math.random()];
    let colorValues = [];
    for(let i=0;i<36;i++){
        colorValues.push(color[0], color[1], color[2]); // Push individual RGB values
    }
    return new Float32Array(colorValues);
}

function main3() {
    const canvas = document.getElementById('glCanvas1');// em qual canva ele fica
    const gl = canvas.getContext('webgl');

    if (!gl) {
        console.error('WebGL not supported');
        return;
    }

    const vertexShader = createShader3(gl, gl.VERTEX_SHADER, vertexShaderSource3);
    const fragmentShader = createShader3(gl, gl.FRAGMENT_SHADER, fragmentShaderSource3);
    
    const program = createProgram3(gl, vertexShader, fragmentShader);
    gl.useProgram(program);

    const positionLocation = gl.getAttribLocation(program, 'a_position');
    const colorLocation = gl.getAttribLocation(program, 'a_color');

    const VertexBuffer = gl.createBuffer();
    const ColorBuffer = gl.createBuffer();
    
    let vertices = [];
    let colors = [];

    gl.clearColor(0.0, 0.0, 0.0, 1.0); // Black background
    gl.clear(gl.COLOR_BUFFER_BIT);

    gl.enableVertexAttribArray(positionLocation);
    vertices = squareVerticesRobo();
    gl.bindBuffer(gl.ARRAY_BUFFER, VertexBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);
    gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);

    gl.enableVertexAttribArray(colorLocation);
    colors = squareColors3();
    gl.bindBuffer(gl.ARRAY_BUFFER, ColorBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, colors, gl.STATIC_DRAW);
    gl.vertexAttribPointer(colorLocation, 3, gl.FLOAT, false, 0, 0);

    gl.drawArrays(gl.TRIANGLES, 0, 36);
}

// Start the application when the page loads
window.addEventListener('load', main3);
