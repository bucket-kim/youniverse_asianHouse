import * as THREE from "three";
import Experience from "../Experience";

export default class HouseAssets {
  constructor() {
    this.experience = new Experience();
    this.scene = this.experience.scene;
    this.resources = this.experience.resources;

    // setup
    this.geometry = this.resources.items.island;
    this.texture = this.resources.items.islandTexture;

    this.setModel();
  }

  setModel() {
    this.model = this.geometry.scene;
    this.model.scale.set(0.75, 0.75, 0.75);
    this.scene.add(this.model);

    this.model.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        child.castShadow = true;
      }
      if (child.material instanceof THREE.MeshStandardMaterial) {
        child.material.map = this.texture;
        child.material.map.flipY = false;
      }
    });
  }
}
