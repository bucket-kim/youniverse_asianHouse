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
    // this.setBackground();
    this.test();
  }

  test() {
    const geo = new THREE.BoxBufferGeometry(100, 100, 100);
    const texture = new THREE.CubeTextureLoader().load([
      "textures/nightTextureMap/px.jpg",
      "textures/nightTextureMap/nx.jpg",
      "textures/nightTextureMap/py.jpg",
      "textures/nightTextureMap/ny.jpg",
      "textures/nightTextureMap/pz.jpg",
      "textures/nightTextureMap/nz.jpg",
    ]);

    // texture.encoding = THREE.LinearEncoding;

    const mat = new THREE.ShaderMaterial({
      side: THREE.BackSide,
      uniforms: {
        cubemap: {
          value: texture,
        },
      },
      vertexShader: `
      varying vec3 vWorldPosition;

      void main() {
        vec4 worldPosition = modelMatrix * vec4(position, 1.0);
        vWorldPosition = vec3(-worldPosition.z, worldPosition.y, -worldPosition.x);
      
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
      `,
      fragmentShader: `
      uniform samplerCube cubemap;
      varying vec3 vWorldPosition;
      
      void main(){
        vec3 normalizedVWorldPosition = normalize(vWorldPosition);
        vec3 outcolor = textureCube(cubemap, normalizedVWorldPosition).rgb;
      
        gl_FragColor = vec4(outcolor, 1.0);
      }
      `,
    });

    const mesh = new THREE.Mesh(geo, mat);
    this.scene.add(mesh);
  }

  setEnvironment() {
    this.environment = {};
    this.environment.nightTexture = this.resources.items.nightCubeMap;
    this.environment.dayTexture = this.resources.items.dayCubeMap;

    this.scene.rotation.y = Math.PI * 0.6;

    this.scene.background = this.environment.nightTexture;
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
      side: THREE.BackSide,
      depthWrite: false,
    });

    this.model = {};
    this.model.sphere = new THREE.SphereGeometry(20, 32, 16);
    // this.model.cube = new THREE.BoxBufferGeometry(100, 100, 100);

    this.model.mesh = new THREE.Mesh(
      this.model.sphere,
      this.environmentMap.material
    );

    // let temp;
    // for (let i = 0; i < this.model.cube.index.array.length; i += 3) {
    //   temp = this.model.cube.index.array[i];
    //   this.model.cube.index.array[i] = this.model.cube.index.array[i + 2];
    //   this.model.cube.index.array[i + 2] = temp;
    // }

    this.model.mesh.rotation.y = Math.PI * -1.05;
    this.model.mesh.position.y = 2.5;

    console.log(this.environmentMap.dayTexture);

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
