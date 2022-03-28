import * as THREE from "three";
import Experience from "../Experience";

export default class HouseAssets {
  constructor() {
    this.experience = new Experience();
    this.scene = this.experience.scene;
    this.resources = this.experience.resources;

    // setup
    this.mesh = this.resources.items.geometry;
    this.texture001 = this.resources.items.bakeSet001;

    this.setModel();
  }

  setModel() {
    this.model = this.mesh.scene;
    this.model.scale.set(0.65, 0.65, 0.65);
    this.scene.add(this.model);

    this.texture001.encoding = THREE.sRGBEncoding;

    // material
    this.material = new THREE.MeshBasicMaterial();

    this.model.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        // material
        child.material = new THREE.MeshBasicMaterial();
        child.material.map = this.texture001;
        child.material.map.flipY = false;
        child.material.side = THREE.DoubleSide;
      }
    });
  }
}
