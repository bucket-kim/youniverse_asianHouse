uniform sampler2D uDayTexture;
uniform sampler2D uNightTexture;

uniform float uDayNightMix;

varying vec2 vUv;

void main() {
  vec3 dayColor = texture2D(uDayTexture, vUv).rgb;
  vec3 nightColor = texture2D(uNightTexture, vUv).rgb;
  vec3 bakedColor = mix(dayColor, nightColor, uDayNightMix);

  gl_FragColor = vec4(bakedColor, 1.0);
}