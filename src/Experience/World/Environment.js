import * as THREE from "three";
import Experience from "../Experience";

export default class Environment {
  constructor() {
    this.experience = new Experience();
    this.scene = this.experience.scene;
    this.resources = this.experience.resources;

    // this.setAmbientLight();
    this.setEnvironmentMap();
  }

  setAmbientLight() {
    this.ambientLight = new THREE.AmbientLight(0xcccccc, 0.4);
    this.scene.add(this.ambientLight);
  }

  setEnvironmentMap() {
    this.environmentMap = {};
    this.environmentMap.intensity = 0.4;
    this.environmentMap.texture = this.resources.items.nightCubeMap;
    // this.environmentMap.texture.encoding = THREE.sRGBEncoding;
    this.scene.background = this.environmentMap.texture;

    this.environmentMap.updateMaterials = () => {
      this.scene.traverse((child) => {
        if (
          child instanceof THREE.Mesh &&
          child.material instanceof THREE.MeshStandardMaterial
        ) {
          child.castShadow = true;
          child.material.envMap = this.environmentMap.texture;
          child.material.envMapIntensity = this.environmentMap.intensity;
          child.material.needsUpdate = true;
        }
      });
    };
    // this.environmentMap.updateMaterials();

    this.scene.environment = this.environmentMap.texture;
  }
}
