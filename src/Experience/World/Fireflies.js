import * as THREE from "three";
import Experience from "../Experience";
import firefliesVertexshader from "../shaders/fireflies/vertex.glsl";
import firefliesFragmentshader from "../shaders/fireflies/fragment.glsl";

export default class Fireflies {
  constructor() {
    this.experience = new Experience();
    this.scene = this.experience.scene;
    this.resources = this.experience.resources;
    this.time = this.experience.time;
    this.debug = this.experience.debug;

    // setup debug
    if (this.debug) {
      this.debugFolder = this.debug.addFolder({
        title: "Fireflies",
        expanded: true,
      });
    }

    // setup

    this.setModel();
  }

  setModel() {
    // firefly geometry

    this.firefliesGeometry = null;
    this.firefliesMaterial = null;
    this.fireflies = null;

    this.firefliesCount = {};
    this.firefliesCount.value = 50;

    this.firefliesSpeed = {};
    this.firefliesSpeed.value = 1;

    const generate = () => {
      if (this.fireflies !== null) {
        this.firefliesGeometry.dispose();
        this.firefliesMaterial.dispose();
        this.scene.remove(this.fireflies);
      }

      this.firefliesGeometry = new THREE.BufferGeometry();
      this.positionArray = new Float32Array(this.firefliesCount.value * 3);
      this.scaleArrary = new Float32Array(this.firefliesCount.value);

      for (let i = 0; i < this.firefliesCount.value; i++) {
        this.positionArray[i * 3 + 0] = (Math.random() - 0.5) * 8;
        this.positionArray[i * 3 + 1] = Math.random() * 4;
        this.positionArray[i * 3 + 2] = (Math.random() - 0.55) * 8;

        this.scaleArrary[i] = Math.random();
      }

      this.firefliesGeometry.setAttribute(
        "position",
        new THREE.BufferAttribute(this.positionArray, 3)
      );
      this.firefliesGeometry.setAttribute(
        "aScale",
        new THREE.BufferAttribute(this.scaleArrary, 1)
      );

      // material
      this.firefliesMaterial = new THREE.ShaderMaterial({
        uniforms: {
          uPixelRatio: { value: Math.min(window.devicePixelRatio, 2) },
          uSize: { value: 200 },
          uTime: { value: 0 },
        },
        vertexShader: firefliesVertexshader,
        fragmentShader: firefliesFragmentshader,
        transparent: true,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      });

      this.fireflies = new THREE.Points(
        this.firefliesGeometry,
        this.firefliesMaterial
      );

      this.scene.add(this.fireflies);
    };

    generate();

    // debug generator
    if (this.debug) {
      this.debugFolder.addInput(
        this.firefliesMaterial.uniforms.uSize,
        "value",
        {
          label: "Size",
          max: 500,
          min: 0,
          step: 1.0,
        }
      );
      this.debugFolder
        .addInput(this.firefliesCount, "value", {
          label: "counts",
          max: 500,
          min: 0,
          step: 1.0,
        })
        .on("change", generate);
      this.debugFolder.addInput(this.firefliesSpeed, "value", {
        label: "speed",
        min: 0.1,
        max: 6,
        step: 0.01,
      });
      this.debugFolder.addInput(this.fireflies.scale, "x", {
        label: "fireflies x",
        min: 0.01,
        max: 3,
        step: 0.01,
      });
      this.debugFolder.addInput(this.fireflies.scale, "y", {
        label: "fireflies y",
        min: 0.01,
        max: 3,
        step: 0.01,
      });
      this.debugFolder.addInput(this.fireflies.scale, "z", {
        label: "fireflies z",
        min: 0.01,
        max: 3,
        step: 0.01,
      });
    }
  }

  update() {
    this.firefliesMaterial.uniforms.uTime.value =
      this.time.elapsed * 0.00025 * this.firefliesSpeed.value;
  }
}
