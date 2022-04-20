import * as THREE from "three";
import Experience from "../Experience";
import Environment from "./Environment";
import HouseAssets from "./HouseAssets";
import Water from "./Water.js";
import Fireflies from "./Fireflies.js";

export default class World {
  constructor() {
    this.experience = new Experience();
    this.scene = this.experience.scene;
    this.resources = this.experience.resources;

    const Mesh = new THREE.Mesh(
      new THREE.BoxGeometry(1, 1, 1),
      new THREE.MeshStandardMaterial()
    );
    // this.scene.add(Mesh);

    // wait for resources
    this.resources.on("ready", () => {
      // setup
      this.environment = new Environment();
      this.houseAssets = new HouseAssets();
      this.water = new Water();
      this.fireflies = new Fireflies();
    });

    this.environment = new Environment();
  }

  update() {
    if (this.fireflies) {
      this.fireflies.update();
    }
    if (this.water) {
      this.water.update();
    }
  }
}
