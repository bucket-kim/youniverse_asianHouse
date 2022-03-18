import * as THREE from "three";
import Experience from "../Experience";
import Environment from "./Environment";
import HouseAssets from "./HouseAssets";
import Island from "./Island.js";
import Landscape from "./Landscape.js";

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
      this.island = new Island();
      this.landscape = new Landscape();
    });

    this.environment = new Environment();
  }
}
