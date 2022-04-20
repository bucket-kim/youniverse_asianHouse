export default [
  {
    name: "dayCubeMap",
    type: "cubeTexture",
    path: [
      "textures/dayTextureMap/px.jpg",
      "textures/dayTextureMap/nx.jpg",
      "textures/dayTextureMap/py.jpg",
      "textures/dayTextureMap/ny.jpg",
      "textures/dayTextureMap/pz.jpg",
      "textures/dayTextureMap/nz.jpg",
    ],
  },
  {
    name: "nightCubeMap",
    type: "cubeTexture",
    path: [
      "textures/nightTextureMap/px.jpg",
      "textures/nightTextureMap/nx.jpg",
      "textures/nightTextureMap/py.jpg",
      "textures/nightTextureMap/ny.jpg",
      "textures/nightTextureMap/pz.jpg",
      "textures/nightTextureMap/nz.jpg",
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
    name: "dayTexture",
    type: "texture",
    path: "textures/dayTextureMap/dayTexture.png",
  },
  {
    name: "nightTexture",
    type: "texture",
    path: "textures/nightTextureMap/nightTexture.jpg",
  },
  {
    name: "waterNormalTexture",
    type: "texture",
    path: "textures/water/Water_1_M_Normal.jpg",
  },
];
