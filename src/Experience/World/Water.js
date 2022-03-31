import * as THREE from "three";
import Experience from "../Experience";
import { Water } from "three/examples/jsm/objects/Water2.js";

export default class HouseAssets {
  constructor() {
    this.experience = new Experience();
    this.scene = this.experience.scene;
    this.resources = this.experience.resources;

    // setup
    this.geometry = this.resources.items.water;
    this.texture = this.resources.items.bakeSet001;

    this.setModel();
  }

  setModel() {
    this.waterGeo = new THREE.PlaneGeometry(1.85, 1.85);
    this.waterGeometry = this.geometry.scene;
    this.box = new THREE.Box3().setFromObject(this.waterGeometry);
    this.center = this.box.getCenter(new THREE.Vector3());
    this.waterGeometry.position.set(
      this.center.x,
      this.center.y,
      this.center.z
    );
    this.water = new Water(this.waterGeo, {
      color: "#ffffff",
      textureHeight: 1024,
      textureWidth: 1024,
      flowDirection: new THREE.Vector2(1, 1),
      scale: 2,
    });

    this.water.position.y = 0.185;
    // this.water.scale.set(0.65, 0.65, 0.65);
    this.water.position.x = 2.25;
    this.water.position.z = 1.5;
    this.water.rotation.x = Math.PI * -0.5;

    this.scene.add(this.water);
  }
}
