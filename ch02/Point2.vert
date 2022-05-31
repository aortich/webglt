attribute vec4 a_Position;
attribute float a_PointSize; //--> storage qualifier type name
void main() {
    gl_Position = a_Position;
    gl_PointSize = a_PointSize;
}