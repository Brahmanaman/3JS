import * as THREE from "three";
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import * as lil from 'lil-gui';

//created a scene
const scene = new THREE.Scene();

//created a camera
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
scene.add(camera);
camera.position.z = 5;

let loader = new THREE.TextureLoader();
let color = loader.load("./texture/color.jpg")
let roughness = loader.load("./texture/roughness.jpg")
let normal = loader.load("./texture/normal.jpg")
let height = loader.load("./texture/height.jpg")

//created a geometry(object)
const cubeGeometry = new THREE.BoxGeometry(3, 1.8, 2);
//created a material
const cubeMaterial = new THREE.MeshStandardMaterial({ map: color, roughnessMap: roughness, normalMap: normal })

//created a Mesh
const cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
scene.add(cube)

//light
//create a light (if you are usng meshstanardmarterial use ambient light )
const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
scene.add(ambientLight);


const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
directionalLight.position.set(4, 4, 5);
scene.add(directionalLight);

const helper = new THREE.DirectionalLightHelper(directionalLight, 2)
scene.add(helper)

const pointLight = new THREE.PointLight(0xffffff, 1, 10, 2);
pointLight.position.set(0.1, -.5, -1);
scene.add(pointLight)

const pointLightHelper = new THREE.PointLightHelper(pointLight, .2)
scene.add(pointLightHelper);


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


const gui = new lil.GUI();
const materialFolder = gui.addFolder("Material");
materialFolder.add(cubeMaterial, 'roughness', 0, 1).name("roughness");
materialFolder.add(cubeMaterial, 'metalness', 0, 1).name("metalness");
materialFolder.addColor(cubeMaterial, 'color').name("color");
materialFolder.open()

const meshFolder = gui.addFolder("Mesh")
meshFolder.add(cube.scale, 'x', 0.1, 5).name('Scale X')
meshFolder.add(cube.scale, 'y', 0.1, 5).name('Scale Y')
meshFolder.add(cube.scale, 'z', 0.1, 5).name('Scale Z')
meshFolder.add(cube.position, 'x', -10, 10).name('Position X')
meshFolder.add(cube.position, 'y', -10, 10).name('Position Y')
meshFolder.add(cube.position, 'z', -10, 10).name('Position Z')
meshFolder.open()

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

