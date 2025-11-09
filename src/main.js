/**
 * main.js
 * Entry point for 3D Basket Weaving Simulator
 */

import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import GUI from 'lil-gui';
import Stats from 'stats.js';
import { BasketManager } from './core/BasketManager.js';
import { DEFAULT_CONFIG, PATTERN_PARAMETERS } from './config/BasketConfig.js';

// ============================================
// SCENE SETUP
// ============================================

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
controls.target.set(0, DEFAULT_CONFIG.height / 2, 0);
controls.update();

// ============================================
// LIGHTING
// ============================================

const hemisphereLight = new THREE.HemisphereLight(
  0xffffff,  // Sky color
  0x444444,  // Ground color
  0.6        // Intensity
);
scene.add(hemisphereLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
directionalLight.position.set(5, 10, 7);
scene.add(directionalLight);

// Add ambient light for better visibility
const ambientLight = new THREE.AmbientLight(0xffffff, 0.3);
scene.add(ambientLight);

// ============================================
// BASKET CREATION
// ============================================

// Create basket configuration (clone default to avoid mutations)
const basketConfig = { ...DEFAULT_CONFIG };

// Create basket manager
const basketManager = new BasketManager(scene, basketConfig);
basketManager.create();

// ============================================
// GUI CONTROLS
// ============================================

const gui = new GUI();
gui.title('Basket Weaving Simulator');

// Basket dimensions folder
const dimensionsFolder = gui.addFolder('Dimensions');
dimensionsFolder.add(basketConfig, 'baseRadius', 3, 10, 0.5)
  .name('Basket Radius')
  .onChange(() => basketManager.updateConfig(basketConfig));

dimensionsFolder.add(basketConfig, 'height', 5, 20, 0.5)
  .name('Basket Height')
  .onChange(() => basketManager.updateConfig(basketConfig));

dimensionsFolder.open();

// Structure folder
const structureFolder = gui.addFolder('Structure');
structureFolder.add(basketConfig, 'numSpokes', 8, 32, 2)
  .name('Number of Spokes')
  .onChange(() => basketManager.updateConfig(basketConfig));

structureFolder.add(basketConfig, 'stakeThickness', 0.04, 0.15, 0.01)
  .name('Stake Thickness')
  .onChange(() => basketManager.updateConfig(basketConfig));

structureFolder.open();

// Weaving folder
const weavingFolder = gui.addFolder('Weaving');
weavingFolder.add(basketConfig, 'weaverThickness', 0.05, 0.2, 0.01)
  .name('Weaver Thickness')
  .onChange(() => basketManager.updateConfig(basketConfig));

weavingFolder.add(basketConfig, 'weaverSpacing', 0.2, 0.8, 0.05)
  .name('Weaver Spacing')
  .onChange(() => basketManager.updateConfig(basketConfig));

weavingFolder.open();

// Pattern selection folder
const patternFolder = gui.addFolder('Pattern');
const availablePatterns = basketManager.getAvailablePatterns();

// Only show pattern selector if multiple patterns are available
if (availablePatterns.length > 1) {
  const patternNames = {};
  availablePatterns.forEach(pattern => {
    patternNames[pattern] = pattern;
  });

  patternFolder.add(basketConfig, 'patternType', patternNames)
    .name('Weaving Pattern')
    .onChange((value) => basketManager.setPattern(value));
}

patternFolder.open();

// Materials folder
const materialsFolder = gui.addFolder('Materials');

const materialOptions = {
  darkWood: 'Dark Wood',
  lightWood: 'Light Wood',
  naturalWood: 'Natural Wood',
  rattan: 'Rattan',
  willow: 'Willow',
  bamboo: 'Bamboo',
};

materialsFolder.add(basketConfig, 'stakeMaterial', materialOptions)
  .name('Stake Material')
  .onChange(() => basketManager.updateConfig(basketConfig));

materialsFolder.add(basketConfig, 'weaverMaterial', materialOptions)
  .name('Weaver Material')
  .onChange(() => basketManager.updateConfig(basketConfig));

materialsFolder.add(basketConfig, 'baseMaterial', materialOptions)
  .name('Base Material')
  .onChange(() => basketManager.updateConfig(basketConfig));

// ============================================
// STATS.JS (FPS MONITORING)
// ============================================

const stats = new Stats();
stats.showPanel(0);  // 0: fps, 1: ms, 2: mb
document.body.appendChild(stats.dom);

// ============================================
// ANIMATION LOOP
// ============================================

function animate() {
  requestAnimationFrame(animate);

  stats.begin();

  controls.update();
  renderer.render(scene, camera);

  stats.end();
}
animate();

// ============================================
// WINDOW RESIZE HANDLER
// ============================================

window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

// ============================================
// CLEANUP ON PAGE UNLOAD
// ============================================

window.addEventListener('beforeunload', () => {
  basketManager.dispose();
  renderer.dispose();
});
