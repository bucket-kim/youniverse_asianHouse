import * as THREE from "three";
import Experience from "./Experience";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

export default class Camera {
  constructor() {
    this.experience = new Experience();
    this.sizes = this.experience.sizes;
    this.scene = this.experience.scene;
    this.canvas = this.experience.canvas;

    this.setCamera();
    this.setControls();
  }

  setCamera() {
    this.camera = new THREE.PerspectiveCamera(
      45,
      this.sizes.width / this.sizes.height,
      0.1,
      100
    );
    this.camera.position.set(6, 4, 8);
    this.scene.add(this.camera);
  }

  setControls() {
    this.controls = new OrbitControls(this.camera, this.canvas);
    this.controls.enableDamping = true;
    this.controls.minPolarAngle = 0;
    this.controls.maxPolarAngle = Math.PI * 0.5;
    this.controls.minAzimuthAngle = 0;
    this.controls.maxAzimuthAngle = Math.PI * 0.5;
    this.controls.minDistance = 5;
    this.controls.maxDistance = 13;

    const minPan = new THREE.Vector3(-2, -2, -2);
    const max = new THREE.Vector3(2, 2, 2);
  }

  resize() {
    this.camera.aspect = this.sizes.width / this.sizes.height;
    this.camera.updateProjectionMatrix();
  }

  update() {
    this.controls.update();
  }
}
