import * as THREE from "three";

//created a scene
const scene = new THREE.Scene();

//created a camera
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
scene.add(camera);
camera.position.z = 5;

//created a geometry(object)
const cubeGeometry = new THREE.BoxGeometry(1, 1, 1);
//created a material
const cubeMaterial = new THREE.MeshBasicMaterial({ color: 0x00FF00 })
//created a Mesh
const cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
scene.add(cube)

//create a light
const light = new THREE.DirectionalLight(0xFFFFFF, 1);
scene.add(light)
light.position.y = 4;
light.position.z = 5;

//created a renderer
const renderer = new THREE.WebGLRenderer();
renderer.setSize(innerWidth, innerHeight);
//added renderer to the body
document.body.appendChild(renderer.domElement);

function animate() {
    cube.rotation.x += 0.1
    cube.rotation.y += 0.1
    // cube.rotation.z = 0.4
    renderer.render(scene, camera);
}

renderer.setAnimationLoop(animate)

