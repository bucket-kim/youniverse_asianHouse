import * as THREE from "three";
import Experience from "../Experience";
import firefliesVertexshader from "../shaders/fireflies/vertex.glsl";
import firefliesFragmentshader from "../shaders/fireflies/fragment.glsl";

export default class Fireflies {
  constructor() {
    this.experience = new Experience();
    this.scene = this.experience.scene;
    this.resources = this.experience.resources;
    this.time = this.experience.time;

    // setup

    this.setModel();
  }

  setModel() {
    // firefly geometry
    this.firefliesGeometry = new THREE.BufferGeometry();
    this.firefliesCount = 50;
    this.positionArray = new Float32Array(this.firefliesCount * 3);
    this.scaleArrary = new Float32Array(this.firefliesCount);

    for (let i = 0; i < this.firefliesCount; i++) {
      this.positionArray[i * 3 + 0] = (Math.random() - 0.5) * 8;
      this.positionArray[i * 3 + 1] = Math.random() * 4;
      this.positionArray[i * 3 + 2] = (Math.random() - 0.55) * 8;

      this.scaleArrary[i] = Math.random();
    }

    this.firefliesGeometry.setAttribute(
      "position",
      new THREE.BufferAttribute(this.positionArray, 3)
    );
    this.firefliesGeometry.setAttribute(
      "aScale",
      new THREE.BufferAttribute(this.scaleArrary, 1)
    );

    // material
    this.firefliesMaterial = new THREE.ShaderMaterial({
      uniforms: {
        uPixelRatio: { value: Math.min(window.devicePixelRatio, 2) },
        uSize: { value: 200 },
        uTime: { value: 0 },
      },
      vertexShader: firefliesVertexshader,
      fragmentShader: firefliesFragmentshader,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    this.fireflies = new THREE.Points(
      this.firefliesGeometry,
      this.firefliesMaterial
    );

    // this.fireflies.position.set(-4.5, 0, -4.5);

    this.scene.add(this.fireflies);
  }

  update() {
    this.firefliesMaterial.uniforms.uTime.value = this.time.elapsed * 0.00025;
  }
}
