import * as THREE from "three";
import Sizes from "./Utils/Sizes.js";
import Time from "./Utils/Time.js";
import Camera from "./Camera.js";

let instance = null;

export default class Experience {
  constructor(canvas) {
    if (instance) {
      return instance;
    }

    instance = this;

    // global access
    window.experience = this;

    // setup
    this.sizes = new Sizes();
    this.time = new Time();
    this.scene = new THREE.Scene();
    this.camera = new Camera();

    // options
    this.canvas = canvas;

    // resize event
    this.sizes.on("resize", () => {
      this.resize();
    });

    // time event
    this.time.on("tick", () => {
      this.update();
    });
  }

  resize() {
    this.camera.resize();
  }

  update() {}
}
