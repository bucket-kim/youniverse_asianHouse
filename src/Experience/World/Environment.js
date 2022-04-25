import * as THREE from "three";
import Experience from "../Experience";
import backgroundVertexShader from "../shaders/background/vertex.glsl";
import backgroundFragmentShader from "../shaders/background/fragment.glsl";

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
    this.environment.nightTexture = new THREE.CubeTextureLoader().load([
      "textures/nightTextureMap/px.jpg",
      "textures/nightTextureMap/nx.jpg",
      "textures/nightTextureMap/py.jpg",
      "textures/nightTextureMap/ny.jpg",
      "textures/nightTextureMap/pz.jpg",
      "textures/nightTextureMap/nz.jpg",
    ]);

    this.environment.nightTexture.encoding = THREE.sRGBEncoding;

    this.environment.dayTexture = this.resources.items.dayCubeMap;

    this.scene.rotation.y = Math.PI * 0.6;

    this.scene.background = this.environment.nightTexture;
  }

  setBackground() {
    this.environmentMap = {};

    // this.environmentMap.dayTexture = this.resources.items.dayTexture;
    this.environmentMap.dayTexture = new THREE.CubeTextureLoader().load([
      "textures/dayTextureMap/px.jpg",
      "textures/dayTextureMap/nx.jpg",
      "textures/dayTextureMap/py.jpg",
      "textures/dayTextureMap/ny.jpg",
      "textures/dayTextureMap/pz.jpg",
      "textures/dayTextureMap/nz.jpg",
    ]);

    // this.environmentMap.nightTexture = this.resources.items.nightTexture;

    this.environmentMap.nightTexture = new THREE.CubeTextureLoader().load([
      "textures/nightTextureMap/px.jpg",
      "textures/nightTextureMap/nx.jpg",
      "textures/nightTextureMap/py.jpg",
      "textures/nightTextureMap/ny.jpg",
      "textures/nightTextureMap/pz.jpg",
      "textures/nightTextureMap/nz.jpg",
    ]);

    this.environmentMap.material = new THREE.ShaderMaterial({
      uniforms: {
        uDayTexture: { value: this.environmentMap.dayTexture },
        uNightTexture: { value: this.environmentMap.nightTexture },
        uDayNightMix: { value: true },
      },
      vertexShader: backgroundVertexShader,
      fragmentShader: backgroundFragmentShader,
      side: THREE.BackSide,
      depthWrite: false,
    });

    this.model = {};
    // this.model.sphere = new THREE.SphereGeometry(40, 32, 16);
    this.model.cube = new THREE.BoxGeometry(100, 100, 100);

    this.model.mesh = new THREE.Mesh(
      this.model.cube,
      this.environmentMap.material
    );

    // let temp;
    // for (let i = 0; i < this.model.cube.index.array.length; i += 3) {
    //   temp = this.model.cube.index.array[i];
    //   this.model.cube.index.array[i] = this.model.cube.index.array[i + 2];
    //   this.model.cube.index.array[i + 2] = temp;
    // }

    this.model.mesh.rotation.y = Math.PI * 1.1;
    this.model.mesh.position.y = 5;

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
