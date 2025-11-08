import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import GUI from 'lil-gui';
import Stats from 'stats.js';
import { BasketWeave } from './weaving/BasketWeave.js';

// Scene setup
const scene = new THREE.Scene();
scene.background = new THREE.Color(0xf5f5f5);

// Camera
const camera = new THREE.PerspectiveCamera(
  50,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.set(15, 12, 15);

// Renderer
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
document.getElementById('canvas-container').appendChild(renderer.domElement);

// Controls
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.05;
controls.target.set(0, 5, 0);
controls.update();

// Lighting
const hemisphereLight = new THREE.HemisphereLight(
  0xffffff,  // Sky color
  0x444444,  // Ground color
  0.6        // Intensity
);
scene.add(hemisphereLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
directionalLight.position.set(5, 10, 7);
scene.add(directionalLight);

// Parameters
const params = {
  basketRadius: 5,
  basketHeight: 10,
  numStakes: 24,
  stakeThickness: 0.08,
  weaverThickness: 0.1,
  weaverSpacing: 0.4
};

// Create basket weave
const basketWeave = new BasketWeave(scene, params);
basketWeave.create();

// GUI
const gui = new GUI();

gui.add(params, 'basketRadius', 3, 10, 0.5)
  .name('Basket Radius')
  .onChange(() => basketWeave.create());

gui.add(params, 'basketHeight', 5, 20, 0.5)
  .name('Basket Height')
  .onChange(() => basketWeave.create());

gui.add(params, 'numStakes', 12, 48, 1)
  .name('Number of Stakes')
  .onChange(() => basketWeave.create());

gui.add(params, 'stakeThickness', 0.04, 0.15, 0.01)
  .name('Stake Thickness')
  .onChange(() => basketWeave.create());

gui.add(params, 'weaverThickness', 0.05, 0.2, 0.01)
  .name('Weaver Thickness')
  .onChange(() => basketWeave.create());

gui.add(params, 'weaverSpacing', 0.2, 0.8, 0.05)
  .name('Weaver Spacing')
  .onChange(() => basketWeave.create());

// Stats.js for FPS monitoring
const stats = new Stats();
stats.showPanel(0);  // 0: fps, 1: ms, 2: mb
document.body.appendChild(stats.dom);

// Animation loop
function animate() {
  requestAnimationFrame(animate);

  stats.begin();

  controls.update();
  renderer.render(scene, camera);

  stats.end();
}
animate();

// Responsive resize
window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});
