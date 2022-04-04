export default [
  {
    name: "dayCubeMap",
    type: "cubeTexture",
    path: [
      "textures/dayTextureMap/px.png",
      "textures/dayTextureMap/nx.png",
      "textures/dayTextureMap/py.png",
      "textures/dayTextureMap/ny.png",
      "textures/dayTextureMap/pz.png",
      "textures/dayTextureMap/nz.png",
    ],
  },
  {
    name: "geometry",
    type: "gltfModel",
    path: "models/geometry.glb",
  },
  {
    name: "water",
    type: "gltfModel",
    path: "models/water.glb",
  },
  {
    name: "bakeSet001",
    type: "texture",
    path: "textures/modelTexture/dayTexture.jpg",
  },
  {
    name: "bakeSet002",
    type: "texture",
    path: "textures/modelTexture/nightTexture.jpg",
  },
  {
    name: "alphaMap",
    type: "texture",
    path: "textures/modelTexture/opacity.jpg",
  },
];
