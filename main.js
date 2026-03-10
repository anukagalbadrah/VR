import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { VRButton } from 'three/addons/webxr/VRButton.js';

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);
camera.position.set(5,5,5);

const renderer = new THREE.WebGLRenderer({antialias: true});
renderer.setSize(window.innerWidth, window.innerHeight);

renderer.xr.enabled = true;
document.body.appendChild(renderer.domElement);
document.body.appendChild(VRButton.createButton(renderer));

const controls = new OrbitControls(camera, renderer.domElement);

const dirLight = new THREE.DirectionalLight(0xffffff, 1);
dirLight.position.set(10,10,10);
scene.add(dirLight);

const ambLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambLight);

const loader = new GLTFLoader();
let komMouseKey1;
let router;
loader.load('lab1.glb', function(gltf){
    const model = gltf.scene;
    scene.add(model);
});

const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();

window.addEventListener('click', (event) => {

  mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
  mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

  raycaster.setFromCamera(mouse, camera);

  const intersects = raycaster.intersectObjects(scene.children, true);

  if (intersects.length > 0) {
    const clicked = intersects[0].object;
    console.log('Дарсан объект:', clicked.name);

    const name = clicked.name.toLowerCase();

    if (name.includes('kommousekey1')) {
      window.location.href = '/lab';
    }
  }

});

renderer.setAnimationLoop(function () {
  controls.update();
  renderer.render(scene, camera);
});