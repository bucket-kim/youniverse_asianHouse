import * as THREE from "three";
import Experience from "../Experience";
import vertexShader from "../shaders/baked/vertex.glsl";
import fragmentShader from "../shaders/baked/fragment.glsl";
import backgroundVertex from "../shaders/background/vertex.glsl";
import backgroundFragment from "../shaders/background/fragment.glsl";

export default class HouseAssets {
  constructor() {
    this.experience = new Experience();
    this.scene = this.experience.scene;
    this.resources = this.experience.resources;
    this.debug = this.experience.debug;

    if (this.debug) {
      this.debugFolder = this.debug.addFolder({
        title: "House Texture",
        expanded: true,
      });
    }

    // setup
    this.mesh = this.resources.items.geometry;
    this.texture001 = this.resources.items.bakeSet001;
    this.texture002 = this.resources.items.bakeSet002;

    this.setModel();
  }

  setModel() {
    this.model = {};
    this.model.mesh = this.mesh.scene;
    this.model.mesh.scale.set(0.65, 0.65, 0.65);

    this.model.dayTexture = this.texture001;
    // this.model.dayTexture.encoding = THREE.sRGBEncoding;
    this.model.dayTexture.flipY = false;

    this.model.nightTexture = this.texture002;
    // this.model.nightTexture.encoding = THREE.sRGBEncoding;
    this.model.nightTexture.flipY = false;

    this.model.material = new THREE.ShaderMaterial({
      uniforms: {
        uDayTexture: { value: this.model.dayTexture },
        uNightTexture: { value: this.model.nightTexture },

        uDayNightMix: { value: 1 },
      },
      vertexShader: vertexShader,
      fragmentShader: fragmentShader,
    });

    this.model.mesh.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        child.material = this.model.material;
        child.material.side = THREE.DoubleSide;
      }
    });

    this.scene.add(this.model.mesh);

    if (this.debug) {
      this.debugFolder.addInput(
        this.model.material.uniforms.uDayNightMix,
        "value",
        {
          label: "Day and Night",
          min: 0,
          max: 1,
        }
      );
    }
  }
}
