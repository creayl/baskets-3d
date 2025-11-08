# 3D Basket Weaving Simulator - Master Plan

🤖 **OPTIMIZED FOR CLAUDE CODE / TERMINAL AI CODING**

## TL;DR - Quick Reference

**Tech Stack:** Three.js + Vite + lil-gui  
**Deployment:** Cloudflare Pages (free)  
**Timeline:** 3-5 days to MVP, 2-3 weeks polished

**Core Files You'll Create:**
- `src/main.js` - Scene setup + animation loop
- `src/weaving/WeavingCurve.js` - Sinusoidal curve mathematics
- `index.html` - Canvas container

**Key Commands:**
```bash
npm create vite@latest basket-weaving-sim -- --template vanilla
cd basket-weaving-sim && npm install three lil-gui
npm run dev  # http://localhost:5173
```

**For Claude Code in Terminal:**
```
"Execute Phase [N] from masterplan.md"
# Follow 10 phases sequentially with clear checkpoints
```

---

## Project Overview

**Goal:** Build an interactive web-based 3D basket weaving simulator that visualizes traditional weaving patterns using three wooden threads following sinusoidal over/under patterns.

**Core Features:**
- Real-time 3D visualization of basket weaving
- Three wooden threads with sinusoidal over/under weaving pattern
- Interactive mouse controls (drag to rotate, zoom)
- Real-time parameter adjustment (thread thickness)
- Extensible architecture for additional weaving techniques
- Cross-platform web deployment

**Target Timeline:** 2-3 weeks to polished MVP

---

## Claude Code Usage Instructions

Each phase has:
1. **Terminal Commands** - Copy-paste ready
2. **File Creation Tasks** - Explicit paths and content
3. **Verification Steps** - How to confirm success
4. **Checkpoint** - Terminal-visible success indicator

**Workflow:**
```bash
# Start Claude Code in project directory
claude-code

# Give phase-by-phase instructions like:
# "Execute Phase 1: Foundation Setup. Create all files and run verification."
```

---

## Technical Stack

### Core Technologies
- **3D Framework:** Three.js (r161+)
- **Build Tool:** Vite
- **Language:** JavaScript (ES6+)
- **UI Controls:** lil-gui
- **Camera Controls:** OrbitControls
- **Hosting:** Cloudflare Pages (free tier)

### Why This Stack?
- **Fastest prototype path** (2-3 days to working demo)
- **Excellent parametric curve support** (TubeGeometry + Custom Curves)
- **Massive community** (extensive examples for mathematical visualizations)
- **Zero hosting costs** (static deployment)
- **AI-friendly** (well-documented, consistent API, abundant training data)

---

## Project Structure

```
basket-weaving-sim/
├── public/
│   └── textures/
│       └── wood.jpg
├── src/
│   ├── main.js                    # Entry point, scene setup
│   ├── core/
│   │   ├── Scene.js               # Scene manager
│   │   ├── Camera.js              # Camera setup
│   │   ├── Renderer.js            # WebGL renderer
│   │   └── Lights.js              # Lighting configuration
│   ├── weaving/
│   │   ├── WeavingCurve.js        # Custom curve class for sinusoidal patterns
│   │   ├── Thread.js              # Single thread representation
│   │   ├── BasketWeaver.js        # Main weaving logic & geometry generation
│   │   └── patterns/
│   │       ├── ThreeThreadPattern.js   # Initial 3-thread technique
│   │       └── PatternBase.js          # Base class for extensibility
│   ├── controls/
│   │   ├── OrbitControlsSetup.js  # Mouse interaction
│   │   └── ParameterGUI.js        # lil-gui parameter controls
│   ├── utils/
│   │   ├── MaterialManager.js     # Material & texture management
│   │   └── GeometryHelpers.js     # Geometry utilities
│   └── config/
│       └── constants.js           # Configuration constants
├── index.html
├── package.json
├── vite.config.js
└── README.md
```

---

## Development Phases

### Phase 1: Foundation Setup
**Goal:** Basic 3D scene with rotating cube

**Terminal Commands:**
```bash
# Create project directory
mkdir basket-weaving-sim
cd basket-weaving-sim

# Initialize npm and Vite
npm create vite@latest . -- --template vanilla
npm install

# Install Three.js dependencies
npm install three lil-gui

# Install dev tools (optional but useful)
npm install -D vite
```

**File Creation Tasks:**

**Task 1.1: Create index.html**
```bash
# Location: ./index.html
```
Content: Minimal HTML with canvas container (see Code Examples section)

**Task 1.2: Create src/main.js**
```bash
# Location: ./src/main.js
```
Content: Scene, camera, renderer setup + rotating cube test

**Task 1.3: Update package.json scripts**
```bash
# Ensure these scripts exist:
# "dev": "vite"
# "build": "vite build"
# "preview": "vite preview"
```

**Verification Steps:**
```bash
# Start dev server
npm run dev

# Should output:
# VITE v5.x.x  ready in xxx ms
# ➜  Local:   http://localhost:5173/
# ➜  press h to show help
```

**Visual Checkpoint:**
- Open http://localhost:5173/
- **MUST SEE:** Rotating cube in center of screen
- **MUST WORK:** Mouse drag rotates view
- **MUST WORK:** Mouse wheel zooms in/out
- **MUST NOT:** Console errors (check F12 DevTools)

**Terminal Verification:**
```bash
# Check if files exist
ls -la index.html src/main.js

# Check dependencies installed
npm list three lil-gui

# Should show:
# basket-weaving-sim@0.0.0
# ├── lil-gui@0.19.x
# └── three@0.161.x
```

**CHECKPOINT:** Cube rotates smoothly, no errors = Phase 1 Complete ✅

---

### Phase 2: Custom Weaving Curve
**Goal:** Replace cube with single sinusoidal thread

**File Creation Tasks:**

**Task 2.1: Create WeavingCurve.js**
```bash
# Location: ./src/weaving/WeavingCurve.js
mkdir -p src/weaving
```
Content: Custom THREE.Curve class with sinusoidal getPoint() method (see Code Examples)

**Task 2.2: Update main.js**
```bash
# Location: ./src/main.js
```
Changes:
- Remove cube geometry
- Import WeavingCurve
- Create TubeGeometry using WeavingCurve
- Add brown material (color: 0x8B4513)

**Code Structure (for Claude Code):**
```javascript
// In main.js after scene setup:
import { WeavingCurve } from './weaving/WeavingCurve.js';

// Remove old cube code

// Create single thread
const curve = new WeavingCurve({
  amplitude: 0.5,
  frequency: 12,
  phase: 0,
  basketRadius: 5,
  basketHeight: 10,
  windings: 5
});

const geometry = new THREE.TubeGeometry(curve, 512, 0.12, 8, false);
const material = new THREE.MeshStandardMaterial({
  color: 0x8B4513,
  roughness: 0.8,
  metalness: 0.1
});
const thread = new THREE.Mesh(geometry, material);
scene.add(thread);
```

**Verification Steps:**
```bash
# Dev server should auto-reload
# Check terminal for errors
```

**Visual Checkpoint:**
- **MUST SEE:** Single brown thread spiraling upward
- **MUST SEE:** Thread has smooth sinusoidal wave pattern
- **MUST WORK:** Mouse controls still functional
- **MUST NOT:** Any jagged/blocky appearance
- **MUST NOT:** Console errors

**Terminal Test:**
```bash
# Check file was created
ls -la src/weaving/WeavingCurve.js

# Should output file details
```

**CHECKPOINT:** Smooth brown spiral thread visible = Phase 2 Complete ✅

---

### Phase 3: Three-Thread Weaving Pattern
**Goal:** Add two more threads with 120° phase offsets

**Task 3.1: Update main.js - Add two more threads**
```bash
# Location: ./src/main.js
```

Changes:
- Convert single thread to array of 3 threads
- Create loop with phase offsets: [0, 2π/3, 4π/3]
- Each thread gets same parameters except phase

**Code Structure:**
```javascript
// Replace single thread code with:
const threads = [];
const phaseOffsets = [0, Math.PI * 2 / 3, Math.PI * 4 / 3];

phaseOffsets.forEach(phase => {
  const curve = new WeavingCurve({
    amplitude: 0.5,
    frequency: 12,
    phase: phase,  // Different for each thread
    basketRadius: 5,
    basketHeight: 10,
    windings: 5
  });
  
  const geometry = new THREE.TubeGeometry(curve, 512, 0.12, 8, false);
  const material = new THREE.MeshStandardMaterial({
    color: 0x8B4513,
    roughness: 0.8,
    metalness: 0.1
  });
  
  const mesh = new THREE.Mesh(geometry, material);
  scene.add(mesh);
  threads.push(mesh);
});
```

**Verification Steps:**
```bash
# Dev server auto-reloads
# No terminal errors expected
```

**Visual Checkpoint:**
- **MUST SEE:** Three distinct brown threads
- **MUST SEE:** Threads evenly spaced (120° apart)
- **MUST SEE:** Over/under weaving pattern visible
- **MUST SEE:** Threads spiral together from bottom to top
- **MUST NOT:** Threads overlapping incorrectly
- **MUST NOT:** Z-fighting (flickering where threads meet)

**Debug Tips:**
- If threads overlap: increase `amplitude` to 0.6
- If pattern unclear: adjust `frequency` between 8-16
- If z-fighting: slight variation in phase (±0.01)

**CHECKPOINT:** Three interwoven threads visible = Phase 3 Complete ✅

---

### Phase 4: Lighting Setup
**Goal:** Add proper lighting to make threads visible

**Task 4.1: Add lights to main.js**
```bash
# Location: ./src/main.js
```

Changes:
- Add HemisphereLight (ambient from sky/ground)
- Add DirectionalLight (main sunlight)
- Position directional light above and to side

**Code to Add (after scene creation, before threads):**
```javascript
// Lighting
const ambientLight = new THREE.HemisphereLight(
  0xffffff,  // Sky color
  0x444444,  // Ground color
  0.6        // Intensity
);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
directionalLight.position.set(5, 10, 7);
scene.add(directionalLight);
```

**Verification Steps:**
```bash
# Check browser - threads should look more 3D
# No terminal errors expected
```

**Visual Checkpoint:**
- **MUST SEE:** Threads have visible shading (not flat color)
- **MUST SEE:** Top of threads brighter than bottom
- **MUST SEE:** Clear depth perception
- **MUST NOT:** Over-bright or too dark areas
- **SHOULD LOOK:** Like wooden threads with realistic shading

**Before/After Test:**
- Comment out lights temporarily
- Threads should look flat/dark without lights
- Uncomment lights - threads should look 3D

**CHECKPOINT:** Threads have realistic shading = Phase 4 Complete ✅

---

### Phase 5: Interactive GUI Controls
**Goal:** Add sliders to adjust thread thickness and basket parameters in real-time

**Task 5.1: Add lil-gui import and setup**
```bash
# Location: ./src/main.js
```

**Code to Add (at top):**
```javascript
import GUI from 'lil-gui';
```

**Task 5.2: Create parameters object and GUI**
```bash
# Location: ./src/main.js
# Add after imports, before scene setup
```

**Code Structure:**
```javascript
// Parameters object
const params = {
  threadThickness: 0.12,
  basketRadius: 5,
  basketHeight: 10,
  weavingFrequency: 12,
  windingCount: 5
};

// Use params in thread creation (modify existing code)
const geometry = new THREE.TubeGeometry(
  curve, 
  512, 
  params.threadThickness,  // Use param instead of hardcoded
  8, 
  false
);
```

**Task 5.3: Add GUI after thread creation**
```javascript
// Create GUI
const gui = new GUI();

gui.add(params, 'threadThickness', 0.05, 0.3, 0.01)
  .name('Thread Thickness')
  .onChange(() => recreateThreads());

gui.add(params, 'basketRadius', 3, 10, 0.5)
  .name('Basket Radius')
  .onChange(() => recreateThreads());

gui.add(params, 'basketHeight', 5, 20, 0.5)
  .name('Basket Height')
  .onChange(() => recreateThreads());

gui.add(params, 'weavingFrequency', 6, 24, 1)
  .name('Weaving Frequency')
  .onChange(() => recreateThreads());

gui.add(params, 'windingCount', 1, 10, 1)
  .name('Winding Count')
  .onChange(() => recreateThreads());
```

**Task 5.4: Create recreateThreads function**
```javascript
function recreateThreads() {
  // Remove old threads
  threads.forEach(thread => {
    thread.geometry.dispose();
    thread.material.dispose();
    scene.remove(thread);
  });
  threads.length = 0;
  
  // Create new threads with current params
  const phaseOffsets = [0, Math.PI * 2 / 3, Math.PI * 4 / 3];
  
  phaseOffsets.forEach(phase => {
    const curve = new WeavingCurve({
      amplitude: 0.5,
      frequency: params.weavingFrequency,
      phase: phase,
      basketRadius: params.basketRadius,
      basketHeight: params.basketHeight,
      windings: params.windingCount
    });
    
    const geometry = new THREE.TubeGeometry(
      curve, 
      512, 
      params.threadThickness, 
      8, 
      false
    );
    
    const material = new THREE.MeshStandardMaterial({
      color: 0x8B4513,
      roughness: 0.8,
      metalness: 0.1
    });
    
    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);
    threads.push(mesh);
  });
}
```

**Verification Steps:**
```bash
# Dev server auto-reloads
# Check for GUI panel in top-right corner
```

**Visual Checkpoint:**
- **MUST SEE:** GUI panel in top-right corner with 5 sliders
- **MUST WORK:** Thread Thickness slider changes thread diameter immediately
- **MUST WORK:** Basket Radius slider makes basket wider/narrower
- **MUST WORK:** Basket Height slider makes basket taller/shorter
- **MUST WORK:** Weaving Frequency changes over/under pattern density
- **MUST WORK:** Winding Count changes how many times threads wrap
- **MUST NOT:** Lag or freeze when adjusting sliders
- **MUST NOT:** Memory leaks (test by moving sliders 20+ times)

**Performance Test:**
```bash
# In browser console (F12):
console.log(performance.memory.usedJSHeapSize);
# Move sliders 20 times
console.log(performance.memory.usedJSHeapSize);
# Memory should not grow significantly
```

**CHECKPOINT:** All 5 sliders work smoothly = Phase 5 Complete ✅

---

### Phase 6: Basket Cylinder (Optional Enhancement)
**Goal:** Add semi-transparent basket body to visualize threads wrapping around

**Task 6.1: Add basket cylinder geometry**
```bash
# Location: ./src/main.js
# Add after threads, before animation loop
```

**Code to Add:**
```javascript
// Basket body cylinder
const basketGeometry = new THREE.CylinderGeometry(
  params.basketRadius,
  params.basketRadius,
  params.basketHeight,
  32,
  1,
  true  // Open-ended
);

const basketMaterial = new THREE.MeshStandardMaterial({
  color: 0xDEB887,
  side: THREE.DoubleSide,
  transparent: true,
  opacity: 0.2
});

const basketMesh = new THREE.Mesh(basketGeometry, basketMaterial);
basketMesh.position.y = params.basketHeight / 2;
scene.add(basketMesh);

// Bottom cap
const bottomGeometry = new THREE.CircleGeometry(params.basketRadius, 32);
const bottomMesh = new THREE.Mesh(bottomGeometry, basketMaterial);
bottomMesh.rotation.x = -Math.PI / 2;
bottomMesh.position.y = 0;
scene.add(bottomMesh);

// Add toggle to GUI
gui.add({ showBasket: true }, 'showBasket')
  .name('Show Basket')
  .onChange(value => {
    basketMesh.visible = value;
    bottomMesh.visible = value;
  });
```

**Visual Checkpoint:**
- **MUST SEE:** Semi-transparent cylinder around threads
- **MUST SEE:** Bottom cap closing basket
- **MUST WORK:** Toggle in GUI to show/hide basket
- **SHOULD LOOK:** Threads clearly visible through transparent basket

**CHECKPOINT:** Basket cylinder visible and toggleable = Phase 6 Complete ✅

---

### Phase 7: Polish & Optimization
**Goal:** Professional appearance and smooth performance

**Task 7.1: Add background and camera setup**
```bash
# Location: ./src/main.js
# Update scene background and camera position
```

**Code Changes:**
```javascript
// Better background
scene.background = new THREE.Color(0xf5f5f5);

// Better camera starting position
camera.position.set(15, 12, 15);
camera.lookAt(0, params.basketHeight / 2, 0);

// Update controls target
controls.target.set(0, params.basketHeight / 2, 0);
```

**Task 7.2: Add responsive canvas handling**
```javascript
// Window resize handler
window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});
```

**Task 7.3: Add stats.js for FPS monitoring (dev only)**
```bash
npm install --save-dev stats.js
```

```javascript
import Stats from 'stats.js';

const stats = new Stats();
stats.showPanel(0);  // 0: fps, 1: ms, 2: mb
document.body.appendChild(stats.dom);

// In animation loop:
function animate() {
  stats.begin();
  // ... render code ...
  stats.end();
}
```

**Terminal Test:**
```bash
# Build and check size
npm run build
ls -lh dist/assets/*.js

# Should be under 500KB gzipped
```

**Visual Checkpoint:**
- **MUST SEE:** FPS counter showing 60fps
- **MUST WORK:** Window resize maintains aspect ratio
- **MUST LOOK:** Professional, clean appearance
- **SHOULD RUN:** Smooth 60fps on desktop, 30+ on mobile

**CHECKPOINT:** 60fps and responsive = Phase 7 Complete ✅

---

### Phase 8: Code Organization (Optional but Recommended)
**Goal:** Clean up main.js into separate modules

**Task 8.1: Create organized file structure**
```bash
mkdir -p src/core src/weaving src/controls
```

**Task 8.2: Extract modules**
- `src/core/Scene.js` - Scene setup
- `src/core/Renderer.js` - Renderer config
- `src/core/Lights.js` - Lighting setup
- `src/controls/GUI.js` - Parameter controls
- `src/weaving/ThreadManager.js` - Thread creation/disposal

**Task 8.3: Refactor main.js to use modules**
```javascript
import { createScene } from './core/Scene.js';
import { createRenderer } from './core/Renderer.js';
import { setupLights } from './core/Lights.js';
import { createGUI } from './controls/GUI.js';
import { ThreadManager } from './weaving/ThreadManager.js';

const scene = createScene();
const renderer = createRenderer();
setupLights(scene);
const threadManager = new ThreadManager(scene);
const gui = createGUI(threadManager);
```

**Verification:**
```bash
# Check file structure
tree src/

# Should show organized folders
# Dev server should work identically
npm run dev
```

**CHECKPOINT:** Code organized, still works = Phase 8 Complete ✅

---

### Phase 9: Testing & Bug Fixes
**Goal:** Verify all functionality works correctly

**Terminal Test Suite:**
```bash
# Test build
npm run build
npm run preview

# Test in different browsers (manual)
# - Chrome: http://localhost:4173
# - Firefox: http://localhost:4173
# - Safari: http://localhost:4173
```

**Visual Test Checklist:**
```
□ Thread thickness: 0.05 to 0.3 - no artifacts
□ Basket radius: 3 to 10 - scales correctly
□ Basket height: 5 to 20 - proportions maintained
□ Weaving frequency: 6 to 24 - pattern clear
□ Winding count: 1 to 10 - spirals correctly
□ Mouse drag rotation - smooth
□ Mouse wheel zoom - smooth
□ Window resize - maintains aspect
□ No console errors
□ FPS > 30 on mobile
```

**Memory Leak Test:**
```javascript
// In browser console:
for(let i = 0; i < 50; i++) {
  // Move each slider through full range
  // Check stats.js memory panel
  // Should stabilize, not continuously grow
}
```

**CHECKPOINT:** All tests pass = Phase 9 Complete ✅

---

### Phase 10: Deployment
**Goal:** Deploy to Cloudflare Pages

**Task 10.1: Prepare repository**
```bash
# Initialize git if not already
git init

# Create .gitignore
cat > .gitignore << 'EOF'
node_modules/
dist/
.DS_Store
*.log
EOF

# Initial commit
git add .
git commit -m "Initial commit: 3D basket weaving simulator"
```

**Task 10.2: Create GitHub repository**
```bash
# Create repo on GitHub, then:
git remote add origin https://github.com/YOUR_USERNAME/basket-weaving-sim.git
git branch -M main
git push -u origin main
```

**Task 10.3: Deploy to Cloudflare Pages**
1. Go to https://pages.cloudflare.com/
2. Click "Create a project"
3. Connect GitHub account
4. Select repository: `basket-weaving-sim`
5. Build settings:
   - **Build command:** `npm run build`
   - **Build output directory:** `dist`
   - **Root directory:** (leave empty)
   - **Environment variables:** None needed
6. Click "Save and Deploy"

**Verification:**
```bash
# After deployment (2-3 minutes):
# Visit provided URL: https://basket-weaving-sim.pages.dev
```

**Visual Checkpoint:**
- **MUST WORK:** Site loads at provided URL
- **MUST WORK:** All features functional
- **MUST WORK:** Mobile responsive
- **MUST NOT:** Console errors in production

**CHECKPOINT:** Site live and working = Phase 10 Complete ✅

---

## Quick Start Commands (Copy-Paste Ready)

**Complete Setup from Scratch:**
```bash
# Create and setup project
mkdir basket-weaving-sim && cd basket-weaving-sim
npm create vite@latest . -- --template vanilla
npm install
npm install three lil-gui
npm install -D stats.js

# Start development
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Deploy (after GitHub setup)
git init
git add .
git commit -m "Initial commit"
git remote add origin YOUR_REPO_URL
git push -u origin main
# Then connect to Cloudflare Pages
```

---

## Claude Code Specific Instructions

### How to Use This Plan with Claude Code

**Phase-by-Phase Execution:**
```bash
# Start Claude Code in your project directory
claude-code

# Example prompts for each phase:
```

**Phase 1:**
```
Execute Phase 1 from masterplan.md: Create Vite project, install Three.js and lil-gui, 
create basic scene with rotating cube and OrbitControls. Verify it works in browser.
```

**Phase 2:**
```
Execute Phase 2 from masterplan.md: Create WeavingCurve.js class with sinusoidal 
mathematics, replace cube with single brown thread using TubeGeometry. 
```

**Phase 3:**
```
Execute Phase 3 from masterplan.md: Modify main.js to create three threads with 
120° phase offsets. Verify interwoven pattern is visible.
```

**Phase 4:**
```
Execute Phase 4 from masterplan.md: Add HemisphereLight and DirectionalLight 
to main.js. Threads should have realistic 3D shading.
```

**Phase 5:**
```
Execute Phase 5 from masterplan.md: Integrate lil-gui with 5 parameter sliders. 
Implement recreateThreads() function with proper geometry disposal.
```

**Continue similarly for remaining phases...**

### Verification Commands for Claude Code

After each phase, Claude Code should run:

```bash
# Check files exist
ls -la src/

# Check dependencies
npm list three lil-gui

# Start dev server if not running
npm run dev

# Check for errors in terminal
# (look for "VITE v5.x.x  ready" message)
```

### Debugging with Claude Code

If something doesn't work:

```bash
# Check browser console
# Tell Claude Code: "Check browser console at http://localhost:5173, 
# there's an error: [paste error]"

# Check build
npm run build
# Tell Claude Code: "Build failed with: [paste error]"

# Memory leak check
# Tell Claude Code: "After moving sliders 20 times, memory usage increased 
# from X to Y. Check for geometry disposal issues."
```

### Common Claude Code Prompts

**Fix a visual issue:**
```
The threads look jagged/blocky. Increase tubularSegments in TubeGeometry 
to 512 or higher.
```

**Performance issue:**
```
FPS dropped to 20. Check stats.js output. Reduce tubularSegments to 256 
and radialSegments to 6.
```

**Add feature:**
```
Add a color picker to the GUI that changes thread color. Use params.threadColor 
and update material.color in recreateThreads().
```

---

## Configuration Constants

**Recommended Starting Values:**
```javascript
// src/config/constants.js

export const DEFAULT_PARAMS = {
  // Thread properties
  threadThickness: 0.12,
  threadColor: 0x8B4513,  // Saddle brown
  
  // Basket dimensions
  basketRadius: 5,
  basketHeight: 10,
  
  // Weaving pattern
  weavingFrequency: 12,  // Number of vertical struts (creates over/under pattern)
  windingCount: 5,       // Times thread wraps around basket
  amplitude: 0.5,        // How far thread deviates from basket surface
  
  // Rendering
  tubularSegments: 512,  // Curve smoothness (higher = smoother)
  radialSegments: 8,     // Thread roundness
  
  // Camera
  cameraDistance: 20,
  cameraFOV: 50,
  
  // Performance
  enableStats: true,     // Show FPS counter in dev mode
};

export const MATERIAL_PRESETS = {
  oak: { color: 0x8B4513, roughness: 0.8, metalness: 0.1 },
  birch: { color: 0xF5DEB3, roughness: 0.7, metalness: 0.0 },
  walnut: { color: 0x654321, roughness: 0.9, metalness: 0.1 },
};
```

---

## Code Examples

### Minimal Working Example (MWE)

**index.html:**
```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>3D Basket Weaving Simulator</title>
  <style>
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }
    
    body {
      overflow: hidden;
      font-family: Arial, sans-serif;
    }
    
    #canvas-container {
      width: 100vw;
      height: 100vh;
    }
  </style>
</head>
<body>
  <div id="canvas-container"></div>
  <script type="module" src="/src/main.js"></script>
</body>
</html>
```

**src/main.js (Minimal):**
```javascript
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import GUI from 'lil-gui';
import { WeavingCurve } from './weaving/WeavingCurve.js';

// Scene setup
const scene = new THREE.Scene();
scene.background = new THREE.Color(0xf0f0f0);

// Camera
const camera = new THREE.PerspectiveCamera(
  50,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.set(15, 10, 15);

// Renderer
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
document.getElementById('canvas-container').appendChild(renderer.domElement);

// Controls
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.05;

// Lighting
const ambientLight = new THREE.HemisphereLight(0xffffff, 0x444444, 0.6);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
directionalLight.position.set(5, 10, 7);
scene.add(directionalLight);

// Parameters
const params = {
  threadThickness: 0.12,
  basketRadius: 5,
  basketHeight: 10,
  weavingFrequency: 12,
  windingCount: 5
};

// Create threads
let threads = [];

function createThreads() {
  // Remove old threads
  threads.forEach(thread => {
    thread.geometry.dispose();
    thread.material.dispose();
    scene.remove(thread);
  });
  threads = [];
  
  // Create three threads with 120° phase offset
  const phaseOffsets = [0, Math.PI * 2 / 3, Math.PI * 4 / 3];
  
  phaseOffsets.forEach(phase => {
    const curve = new WeavingCurve({
      amplitude: 0.5,
      frequency: params.weavingFrequency,
      phase: phase,
      basketRadius: params.basketRadius,
      basketHeight: params.basketHeight,
      windings: params.windingCount
    });
    
    const geometry = new THREE.TubeGeometry(
      curve,
      512,
      params.threadThickness,
      8,
      false
    );
    
    const material = new THREE.MeshStandardMaterial({
      color: 0x8B4513,
      roughness: 0.8,
      metalness: 0.1
    });
    
    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);
    threads.push(mesh);
  });
}

createThreads();

// GUI
const gui = new GUI();

gui.add(params, 'threadThickness', 0.05, 0.3, 0.01)
  .name('Thread Thickness')
  .onChange(createThreads);

gui.add(params, 'basketRadius', 3, 10, 0.5)
  .name('Basket Radius')
  .onChange(createThreads);

gui.add(params, 'basketHeight', 5, 20, 0.5)
  .name('Basket Height')
  .onChange(createThreads);

gui.add(params, 'weavingFrequency', 6, 24, 1)
  .name('Weaving Frequency')
  .onChange(createThreads);

gui.add(params, 'windingCount', 1, 10, 1)
  .name('Winding Count')
  .onChange(createThreads);

// Animation loop
function animate() {
  requestAnimationFrame(animate);
  controls.update();
  renderer.render(scene, camera);
}
animate();

// Responsive resize
window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});
```

**src/weaving/WeavingCurve.js:**
```javascript
import * as THREE from 'three';

export class WeavingCurve extends THREE.Curve {
  constructor(options = {}) {
    super();
    
    this.amplitude = options.amplitude || 0.5;
    this.frequency = options.frequency || 12;
    this.phase = options.phase || 0;
    this.basketRadius = options.basketRadius || 5;
    this.basketHeight = options.basketHeight || 10;
    this.windings = options.windings || 5;
  }
  
  getPoint(t, optionalTarget = new THREE.Vector3()) {
    // t ranges from 0 to 1 along the curve
    
    // Angle wraps around basket multiple times
    const angle = t * Math.PI * 2 * this.windings + this.phase;
    
    // Height progresses linearly from 0 to basketHeight
    const y = t * this.basketHeight;
    
    // Sinusoidal radial offset creates over/under weaving pattern
    // frequency determines how many times we go over/under per revolution
    const radialOffset = this.amplitude * Math.sin(angle * this.frequency);
    
    // Convert to Cartesian coordinates
    const radius = this.basketRadius + radialOffset;
    const x = radius * Math.cos(angle);
    const z = radius * Math.sin(angle);
    
    return optionalTarget.set(x, y, z);
  }
}
```

---

## Testing Checklist (Terminal Edition)

### Quick Visual Tests
```bash
# Start dev server
npm run dev

# Open http://localhost:5173 and verify:
```

**Visual Checks:**
- [ ] **Threads render smoothly** (no jagged edges)
- [ ] **Three distinct threads** visible
- [ ] **Over/under pattern** recognizable
- [ ] **Wood-like material** appearance
- [ ] **Scene well-lit** (not too dark/bright)
- [ ] **FPS counter shows 60fps** (if stats.js enabled)

### Terminal Tests
```bash
# Test build process
npm run build
# Should complete without errors

# Check build size
ls -lh dist/assets/*.js
# Should be under 500KB

# Test preview
npm run preview
# Should start on http://localhost:4173

# Check dependencies
npm list
# Should show three, lil-gui, no errors
```

### Browser Console Tests
```javascript
// Open F12 DevTools Console:

// 1. Check for errors (should be none)
console.log("Any errors above?")

// 2. Memory leak test
console.log(performance.memory.usedJSHeapSize)
// Move ALL sliders back and forth 10 times
console.log(performance.memory.usedJSHeapSize)
// Difference should be < 10MB

// 3. Frame time test
let frameTimes = [];
for(let i = 0; i < 60; i++) {
  let start = performance.now();
  setTimeout(() => frameTimes.push(performance.now() - start), 16 * i);
}
setTimeout(() => console.log("Avg frame time:", 
  frameTimes.reduce((a,b)=>a+b)/frameTimes.length), 1000);
// Should be ~16ms (60fps)
```

### Parameter Range Tests
**Test each parameter at extremes:**

1. **Thread Thickness**
   - Min (0.05): Should be visible, very thin
   - Max (0.3): Should be visible, very thick
   - No geometry errors

2. **Basket Radius**
   - Min (3): Small basket, threads tight
   - Max (10): Large basket, threads spread
   - Proportions maintained

3. **Basket Height**
   - Min (5): Short basket
   - Max (20): Tall basket  
   - Threads spiral correctly

4. **Weaving Frequency**
   - Min (6): Few over/under cycles
   - Max (24): Many over/under cycles
   - Pattern always clear

5. **Winding Count**
   - Min (1): One wrap around basket
   - Max (10): Ten wraps around basket
   - No thread overlap errors

### Cross-Browser Tests
```bash
# Test in multiple browsers (manual):
# Chrome: ✓ Works
# Firefox: ✓ Works
# Safari: ✓ Works
# Edge: ✓ Works
# Mobile Chrome: ✓ Works
# Mobile Safari: ✓ Works
```

### Performance Benchmarks

**Desktop (Target: 60fps):**
```bash
# With stats.js visible:
# - FPS: 60 (stable)
# - MS: 16-17ms per frame
# - MB: <100MB memory
```

**Mobile (Target: 30+ fps):**
```bash
# Test on actual device or browser DevTools mobile emulation
# - FPS: >30 (acceptable)
# - No significant lag
# - Touch controls work
```

### Deployment Verification
```bash
# After deploying to Cloudflare Pages:

# 1. Check site loads
curl -I https://your-site.pages.dev
# Should return: HTTP/2 200

# 2. Check assets load
curl -I https://your-site.pages.dev/assets/index-[hash].js  
# Should return: HTTP/2 200

# 3. Check HTTPS
# Visit site in browser - should show padlock icon

# 4. Test all features work in production
# Same as visual tests above
```

**ALL CHECKS MUST PASS FOR PRODUCTION READY** ✅

---

## Deployment Configuration

**package.json:**
```json
{
  "name": "basket-weaving-sim",
  "version": "1.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview"
  },
  "dependencies": {
    "three": "^0.161.0",
    "lil-gui": "^0.19.0"
  },
  "devDependencies": {
    "vite": "^5.0.0"
  }
}
```

**vite.config.js:**
```javascript
import { defineConfig } from 'vite';

export default defineConfig({
  base: './',  // Use relative paths for assets
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: false,
    minify: 'terser',
    rollupOptions: {
      output: {
        manualChunks: {
          three: ['three']  // Separate Three.js into its own chunk
        }
      }
    }
  },
  server: {
    port: 3000,
    open: true
  }
});
```

**Cloudflare Pages Configuration:**
- **Build command:** `npm run build`
- **Build output directory:** `dist`
- **Node version:** 18 or higher
- **Environment variables:** None required

---

## Future Extensions

### Additional Weaving Patterns
1. **Four-Thread Cross Pattern**
   - Create `FourThreadCrossPattern.js`
   - Phase offsets: 0°, 90°, 180°, 270°
   - Different frequency for cross-over effect

2. **Spiral Pattern**
   - Single continuous thread
   - Increasing/decreasing radius
   - Variable pitch

3. **Hexagonal Weave**
   - Six threads
   - 60° phase offsets
   - More complex over/under pattern

### Basket Shapes
1. **Conical Baskets**
   - Linear radius change with height
   - Adjust curve formula: `radius = baseRadius + (t * radiusChange)`

2. **Amphora/Vase Shape**
   - Parametric radius function
   - Use bezier curve for profile
   - Apply rotation around Y-axis

3. **Rectangular Baskets**
   - Replace cylindrical coordinates with rectangular
   - Corner handling for thread transitions

### Advanced Features
1. **Export Options**
   - Export to STL for 3D printing
   - Export to OBJ for other 3D tools
   - Screenshot/video capture

2. **Preset Library**
   - Save favorite configurations
   - Load predefined basket types
   - Share via URL parameters

3. **Material Editor**
   - Custom wood textures upload
   - Color picker for threads
   - Roughness/metalness controls

4. **Animation**
   - Animate weaving process
   - Show thread-by-thread construction
   - Playback controls (play, pause, speed)

---

## Common Issues & Solutions

### Issue: Threads appear jagged or blocky
**Solution:** Increase `tubularSegments` parameter in TubeGeometry (try 512 or 1024)

### Issue: Performance drops below 30 FPS
**Solution:** 
- Reduce `tubularSegments` to 256
- Reduce `radialSegments` to 6
- Disable stats.js in production

### Issue: Threads intersect incorrectly (z-fighting)
**Solution:** 
- Adjust amplitude to prevent threads from occupying same space
- Ensure phase offsets are correct
- Fine-tune frequency relative to basket dimensions

### Issue: Camera controls feel "flipped" or awkward
**Solution:**
- Adjust `controls.target` to center of basket
- Set camera starting position to reasonable distance
- Enable damping for smoother feel

### Issue: Build fails with "THREE is not defined"
**Solution:**
- Ensure imports use `import * as THREE from 'three'`
- Check that all Three.js extensions use proper import paths
- Verify `vite.config.js` is correctly configured

### Issue: Deployed site shows blank page
**Solution:**
- Check browser console for errors
- Verify all asset paths are relative (not absolute)
- Ensure `base: './'` in `vite.config.js`
- Check Cloudflare Pages build logs for errors

---

## Resources

### Three.js Documentation
- **Official Docs:** https://threejs.org/docs/
- **Examples:** https://threejs.org/examples/
- **Fundamentals:** https://threejsfundamentals.org/
- **Journey Course:** https://threejs-journey.com/ ($95, highly recommended)

### Parametric Curves
- **Matt DesLauriers Article:** https://mattdesl.svbtle.com/shaping-curves-with-parametric-equations
- **Three.js Curve Docs:** https://threejs.org/docs/#api/en/extras/core/Curve
- **TubeGeometry Docs:** https://threejs.org/docs/#api/en/geometries/TubeGeometry

### Development Tools
- **Vite:** https://vitejs.dev/
- **lil-gui:** https://lil-gui.georgealways.com/
- **OrbitControls:** https://threejs.org/docs/#examples/en/controls/OrbitControls

### Hosting
- **Cloudflare Pages:** https://pages.cloudflare.com/
- **Deployment Guide:** https://developers.cloudflare.com/pages/

---

## Success Criteria

### MVP (Minimum Viable Product)
- [ ] Three threads render correctly
- [ ] Interactive 3D rotation works
- [ ] Thread thickness adjustable in real-time
- [ ] Deployed and accessible via URL
- [ ] Maintains 30+ FPS on mobile

### Polished Version
- [ ] All MVP criteria met
- [ ] Wood-like materials applied
- [ ] Additional parameters controllable
- [ ] Basket base geometry visible
- [ ] Professional UI/UX
- [ ] Maintains 60 FPS on desktop
- [ ] Documented code
- [ ] README with screenshots

### Future-Ready
- [ ] All Polished criteria met
- [ ] Extensible pattern system implemented
- [ ] At least one additional pattern working
- [ ] Code well-organized and maintainable
- [ ] Ready for community contributions

---

## Contact & Support

For questions about this project or Three.js development:
- **Three.js Discourse:** https://discourse.threejs.org/
- **Three.js Discord:** https://discord.gg/threejs
- **Stack Overflow:** Tag questions with `three.js`

---

*This master plan is optimized for rapid development with AI coding assistants (Claude Code, Cursor, GitHub Copilot). Each phase has clear completion criteria and actionable tasks. Follow phases sequentially for best results.*

**Estimated Time to MVP: 3-5 days**
**Estimated Time to Polished: 2-3 weeks**
**Estimated Time to Future-Ready: 3-4 weeks**

---

## Rapid Prototyping: One-Day MVP (Advanced)

For experienced developers with Claude Code, you can achieve MVP in a single session:

**Hour 1: Foundation (Phases 1-2)**
```bash
# Setup + single thread
npm create vite@latest basket-weaving-sim -- --template vanilla
cd basket-weaving-sim
npm install three lil-gui stats.js
# Claude Code: "Create basic Three.js scene with single sinusoidal thread"
```

**Hour 2: Three Threads (Phase 3)**
```bash
# Claude Code: "Add two more threads with 120° phase offsets"
```

**Hour 3: Interaction (Phases 4-5)**
```bash
# Claude Code: "Add lighting and lil-gui with 5 parameter sliders"
```

**Hour 4: Polish & Deploy (Phases 7, 10)**
```bash
# Claude Code: "Add responsive canvas, optimize, build, and prepare for deployment"
git init && git add . && git commit -m "MVP"
# Deploy to Cloudflare Pages
```

**Result:** Working interactive 3D basket weaving simulator in ~4 hours.