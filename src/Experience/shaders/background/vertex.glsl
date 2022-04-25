// varying vec2 vUv;

// void main() {
//   vec4 modelPosition = modelMatrix * vec4(position, 1.0);
//   vec4 viewPosition = viewMatrix * modelPosition;
//   vec4 projectionPosition = projectionMatrix * viewPosition;
//   gl_Position = projectionPosition;

//   vUv = uv;
// }

varying vec3 vWorldPosition;

void main() {
  vec4 worldPosition = modelMatrix * vec4(position, 1.0);
  vWorldPosition = vec3(-worldPosition.z, worldPosition.y, -worldPosition.x);

  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}