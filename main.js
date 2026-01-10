import * as THREE from "three";
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

//created a scene
const scene = new THREE.Scene();

//created a camera
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
scene.add(camera);
camera.position.z = 5;

//created a geometry(object)
const cubeGeometry = new THREE.BoxGeometry(1, 1, 1);
//created a material
const cubeMaterial = new THREE.MeshBasicMaterial({ color: 0x00FF00, wireframe: true })
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
renderer.setSize(window.innerWidth, window.innerHeight);

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.autoRotate = true;
controls.autoRotateSpeed = 12.0
controls.enableZoom = true
controls.dampingFactor = 0.25

//added renderer to the body
document.body.appendChild(renderer.domElement);

//this make the responsive
window.addEventListener("resize", () => {
    renderer.setSize(window.innerWidth, window.innerHeight)
    camera.aspect = window.innerWidth / window.innerHeight; // jab jab camera ki position update hoti hai, to projection ko update karna hota hai
    camera.updateProjectionMatrix();
})

function animate() {
    // cube.rotation.x += 0.01
    // cube.rotation.y += 0.01
    // cube.rotation.z = 0.4
    renderer.render(scene, camera);
    controls.update();
}

renderer.setAnimationLoop(animate)

