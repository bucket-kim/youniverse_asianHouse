import * as THREE from "three";
import Experience from "../Experience";
import backgroundVertexShader from "../shaders/background/vertex.glsl";
import backgroundFragmentShader from "../shaders/background/fragment.glsl";
import vertexShader from "../shaders/baked/vertex.glsl";
import fragmentShader from "../shaders/baked/fragment.glsl";

export default class Environment {
  constructor() {
    this.experience = new Experience();
    this.scene = this.experience.scene;
    this.resources = this.experience.resources;
    this.debug = this.experience.debug;

    if (this.debug) {
      this.debugFolder = this.debug.addFolder({
        title: "Background",
        expanded: true,
      });
    }

    // this.setEnvironment();
    this.setBackground();
  }

  setEnvironment() {
    this.environment = {};
    this.environment.nightTexture = this.resources.items.nightCubeMap;
    this.environment.dayTexture = this.resources.items.dayCubeMap;

    this.scene.rotation.y = Math.PI * 0.6;

    this.environment.updateMaterials = () => {
      this.scene.traverse((child) => {
        // console.log(child);
      });
    };

    this.scene.background = this.environment.nightTexture;

    this.environment.updateMaterials();
  }

  setBackground() {
    this.environmentMap = {};

    this.environmentMap.dayTexture = this.resources.items.dayTexture;

    this.environmentMap.nightTexture = this.resources.items.nightTexture;

    this.environmentMap.material = new THREE.ShaderMaterial({
      uniforms: {
        uDayTexture: { value: this.environmentMap.dayTexture },
        uNightTexture: { value: this.environmentMap.nightTexture },
        uDayNightMix: { value: true },
      },
      vertexShader: backgroundVertexShader,
      fragmentShader: backgroundFragmentShader,
    });

    // this.environmentMap;

    this.model = {};
    this.model.sphere = new THREE.SphereGeometry(20, 32, 16);

    this.model.mesh = new THREE.Mesh(
      this.model.sphere,
      this.environmentMap.material
    );

    let temp;
    for (let i = 0; i < this.model.sphere.index.array.length; i += 3) {
      temp = this.model.sphere.index.array[i];
      this.model.sphere.index.array[i] = this.model.sphere.index.array[i + 2];
      this.model.sphere.index.array[i + 2] = temp;
    }

    this.model.mesh.rotation.y = Math.PI * -1.05;
    this.model.mesh.position.y = 2.5;

    this.scene.add(this.model.mesh);

    if (this.debug) {
      this.debugFolder.addInput(
        this.environmentMap.material.uniforms.uDayNightMix,
        "value",
        {
          label: "Day and Night switch",
        }
      );
    }
  }
}
