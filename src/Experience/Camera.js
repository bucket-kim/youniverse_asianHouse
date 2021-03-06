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
    const minPan = new THREE.Vector3(-1, -1, -1);
    const maxPan = new THREE.Vector3(1, 1, 1);
    const _v = new THREE.Vector3();

    this.controls = new OrbitControls(this.camera, this.canvas);
    this.controls.enableDamping = true;
    this.controls.minPolarAngle = 0;
    this.controls.maxPolarAngle = Math.PI * 0.5;
    this.controls.minAzimuthAngle = 0;
    this.controls.maxAzimuthAngle = Math.PI * 0.5;
    this.controls.minDistance = 5;
    this.controls.maxDistance = 13;

    this.controls.screenSpacePanning = true;
    this.controls.zoomSpeed = 0.25;
    this.controls.update();

    this.controls.addEventListener("change", () => {
      _v.copy(this.controls.target);
      this.controls.target.clamp(minPan, maxPan);

      _v.sub(this.controls.target);
      this.camera.position.sub(_v);
    });
  }

  resize() {
    this.camera.aspect = this.sizes.width / this.sizes.height;
    this.camera.updateProjectionMatrix();
  }

  update() {
    this.controls.update();
  }
}
