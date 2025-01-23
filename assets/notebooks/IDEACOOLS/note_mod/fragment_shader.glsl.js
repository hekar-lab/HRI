export default /*glsl*/`
uniform vec2 scale;
uniform vec3 colorMap[8];
uniform sampler2D tPower;
varying vec2 vUv;
void main() {
    int select = int(texture2D(tPower, vUv).r * 8.);
    
    gl_FragColor.rgba = vec4(colorMap[select], 1.0);
}`;