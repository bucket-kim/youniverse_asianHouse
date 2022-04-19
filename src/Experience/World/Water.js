import * as THREE from "three";
import Experience from "../Experience";
import vertexShader from "../shaders/water/vertex.glsl";
import fragmentShader from "../shaders/water/fragment.glsl";

export default class HouseAssets {
  constructor() {
    this.experience = new Experience();
    this.scene = this.experience.scene;
    this.resources = this.experience.resources;
    this.time = this.experience.time;
    this.debug = this.experience.debug;
    this.debugObj = {};

    if (this.debug) {
      this.debgFolder = this.debug.addFolder({
        title: "Water",
        expanded: false,
      });
    }

    // setup
    this.geometry = this.resources.items.water;
    this.texture = this.resources.items.bakeSet001;
    this.waterTexture = this.resources.items.waterNormalTexture;

    this.setModel();
  }

  setModel() {
    this.water = {};
    this.water.geo = this.geometry.scene;
    this.water.geo.scale.set(0.65, 0.65, 0.65);
    this.debugObj.waterColor = "#8ad7ff";

    this.water.material = new THREE.ShaderMaterial({
      uniforms: {
        uNormalTexture: {
          value: this.waterTexture,
        },
        uWaterColor: {
          value: new THREE.Color(this.debugObj.waterColor),
        },
        uTime: {
          value: 0,
        },
      },
      vertexShader: vertexShader,
      fragmentShader: fragmentShader,
      transparent: true,
    });

    this.water.geo.children[0].material = this.water.material;

    this.scene.add(this.water.geo);

    if (this.debug) {
      this.debgFolder.addInput(this.debugObj, "waterColor").on("change", () => {
        console.log(this.water.material.uniforms.uWaterColor.value);
      });
    }
  }

  update() {
    this.water.material.uniforms.uTime.value = this.time.elapsed * 0.00025;
  }
}
