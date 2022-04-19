varying vec2 vUv;
uniform sampler2D uNormalTexture ;
uniform vec3 uWaterColor ;
uniform float uTime;

void main()
{
    vec2 uv = vUv;
    uv.x = fract(uv.x + uTime * 0.03);
    uv.y = fract(uv.y + uTime * 0.07);
    vec4 texture = texture2D(uNormalTexture, uv);
    vec3 color = texture.r * uWaterColor * 1.0;
    gl_FragColor = vec4(color, color.b);
}