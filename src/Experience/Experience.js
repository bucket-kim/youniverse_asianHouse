import * as THREE from "three";
import Sizes from "./Utils/Sizes.js";
import Time from "./Utils/Time.js";
import Camera from "./Camera.js";
import Renderer from "./Renderer.js";
import World from "./World/World.js";
import Resources from "./Utils/Resources.js";
import sources from "./sources.js";
import { Pane } from "tweakpane";

let instance = null;

export default class Experience {
  constructor(canvas) {
    if (instance) {
      return instance;
    }

    instance = this;

    // options
    this.canvas = canvas;

    // global access
    window.experience = this;

    // setup
    this.sizes = new Sizes();
    this.time = new Time();
    this.resources = new Resources(sources);
    this.scene = new THREE.Scene();
    this.camera = new Camera();
    this.renderer = new Renderer();

    // world setup
    this.world = new World();

    this.setDebug();

    // resize event
    this.sizes.on("resize", () => {
      this.resize();
    });

    // time event
    this.time.on("tick", () => {
      this.update();
    });
  }

  setDebug() {
    this.debug = new Pane();
    this.debug.containerElem_.style.width = "320px";
  }

  resize() {
    this.camera.resize();
    this.renderer.resize();
  }

  update() {
    this.camera.update();
    this.renderer.update();
    if (this.world) {
      this.world.update();
    }
  }
}
