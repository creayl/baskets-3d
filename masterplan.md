# 3D Basket Weaving Simulator - Master Plan

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

### Phase 1: Foundation Setup (Day 1)
**Goal:** Get basic 3D scene running with camera controls

**Tasks:**
1. Initialize Vite project
2. Install Three.js and dependencies
3. Create basic scene with camera and renderer
4. Add OrbitControls for mouse interaction
5. Test rendering with a simple test geometry (cube/sphere)

**Completion Criteria:**
- Scene renders in browser
- Mouse drag rotates view
- Mouse wheel zooms
- No console errors

**Key Files:**
- `src/main.js`
- `src/core/Scene.js`
- `src/core/Camera.js`
- `src/core/Renderer.js`

---

### Phase 2: Custom Curve Implementation (Day 2)
**Goal:** Implement sinusoidal curve mathematics for weaving patterns

**Tasks:**
1. Create `WeavingCurve` class extending `THREE.Curve`
2. Implement sinusoidal `getPoint(t)` method
3. Test curve with basic TubeGeometry visualization
4. Add parameters: amplitude, frequency, length, phase offset
5. Create first thread using TubeGeometry + WeavingCurve

**Mathematical Foundation:**
```javascript
// Sinusoidal curve for weaving pattern
getPoint(t, optionalTarget = new THREE.Vector3()) {
  // t ranges from 0 to 1 along the curve
  // Map to cylindrical coordinates for basket shape
  const angle = t * Math.PI * 2 * this.windings;  // Spirals around basket
  const radius = this.basketRadius;
  const height = t * this.basketHeight;
  
  // Sinusoidal over/under pattern
  const radialOffset = this.amplitude * Math.sin(angle * this.frequency + this.phase);
  
  const x = (radius + radialOffset) * Math.cos(angle);
  const y = height;
  const z = (radius + radialOffset) * Math.sin(angle);
  
  return optionalTarget.set(x, y, z);
}
```

**Completion Criteria:**
- Single thread renders as smooth curve
- Thread follows sinusoidal pattern
- Parameters adjustable in code
- Curve is mathematically correct

**Key Files:**
- `src/weaving/WeavingCurve.js`
- `src/weaving/Thread.js`

---

### Phase 3: Three-Thread Weaving Pattern (Day 3)
**Goal:** Implement three interwoven threads with offset patterns

**Tasks:**
1. Create three WeavingCurve instances with phase offsets (0°, 120°, 240°)
2. Adjust frequency to create over/under weaving appearance
3. Position threads to simulate vertical struts (löcher/gaps between struts)
4. Implement vertical progression (y+1 after 360° rotation)
5. Add basic brown material to threads

**Weaving Pattern Logic:**
```javascript
// Three threads with 120° phase offset for even distribution
const threads = [];
const phaseOffsets = [0, 2*Math.PI/3, 4*Math.PI/3];

for (let i = 0; i < 3; i++) {
  const curve = new WeavingCurve({
    amplitude: 0.5,
    frequency: verticalStrutsCount,  // Creates over/under for each strut
    phase: phaseOffsets[i],
    basketRadius: 5,
    basketHeight: 10,
    windings: 5  // Number of times thread wraps around basket
  });
  
  const geometry = new THREE.TubeGeometry(
    curve,
    512,  // Path segments (high for smooth curves)
    threadThickness,
    8,    // Radial segments
    false // Not closed
  );
  
  threads.push(new Thread(geometry, material));
}
```

**Completion Criteria:**
- Three threads visible and interwoven
- Visual over/under pattern recognizable
- Threads positioned at correct offsets
- No z-fighting or intersection artifacts

**Key Files:**
- `src/weaving/BasketWeaver.js`
- `src/weaving/patterns/ThreeThreadPattern.js`

---

### Phase 4: Materials & Lighting (Day 4)
**Goal:** Add realistic wood appearance and proper lighting

**Tasks:**
1. Add basic lighting (HemisphereLight + DirectionalLight)
2. Implement MeshStandardMaterial for threads
3. Load wood texture (optional but "nice to have")
4. Configure material properties (roughness, metalness)
5. Test different wood colors/textures

**Lighting Setup:**
```javascript
// Soft ambient light from sky
const hemisphereLight = new THREE.HemisphereLight(
  0xffffff,  // Sky color
  0x444444,  // Ground color
  0.6
);

// Main directional light (sunlight)
const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
directionalLight.position.set(5, 10, 7);
```

**Material Options:**
```javascript
// Simple colored material (no texture)
const material = new THREE.MeshStandardMaterial({
  color: 0x8B4513,  // Saddle brown
  roughness: 0.8,
  metalness: 0.1
});

// With wood texture
const textureLoader = new THREE.TextureLoader();
const woodTexture = textureLoader.load('/textures/wood.jpg');
const material = new THREE.MeshStandardMaterial({
  map: woodTexture,
  roughness: 0.9,
  metalness: 0.0
});
```

**Completion Criteria:**
- Scene is well-lit and visible
- Materials look like wood (color or texture)
- No overly dark or blown-out areas
- Shadows not required (as per requirements)

**Key Files:**
- `src/core/Lights.js`
- `src/utils/MaterialManager.js`

---

### Phase 5: Interactive Parameter Controls (Day 5)
**Goal:** Real-time adjustment of weaving parameters

**Tasks:**
1. Integrate lil-gui
2. Add controls for thread thickness
3. Add controls for basket dimensions (radius, height)
4. Add controls for weaving frequency
5. Implement geometry regeneration on parameter change
6. Optimize regeneration for smooth interaction

**GUI Implementation:**
```javascript
import GUI from 'lil-gui';

const params = {
  threadThickness: 0.1,
  basketRadius: 5,
  basketHeight: 10,
  weavingFrequency: 12,
  windingCount: 5
};

const gui = new GUI();

gui.add(params, 'threadThickness', 0.05, 0.3, 0.01)
  .name('Thread Thickness')
  .onChange(value => {
    basketWeaver.updateThreadThickness(value);
  });

gui.add(params, 'basketRadius', 3, 10, 0.5)
  .name('Basket Radius')
  .onChange(value => {
    basketWeaver.regenerateBasket();
  });

// Add more controls...
```

**Performance Optimization:**
```javascript
// Dispose old geometry before creating new
updateThreadThickness(newThickness) {
  this.threads.forEach(thread => {
    thread.geometry.dispose();  // Free GPU memory
    thread.geometry = this.createThreadGeometry(newThickness);
  });
}
```

**Completion Criteria:**
- GUI visible and functional
- Parameters update in real-time
- No memory leaks (geometry properly disposed)
- UI feels responsive (no lag)

**Key Files:**
- `src/controls/ParameterGUI.js`
- `src/weaving/BasketWeaver.js` (update methods)

---

### Phase 6: Basket Base Geometry (Day 6)
**Goal:** Add cylindrical basket base for threads to wrap around

**Tasks:**
1. Create cylinder geometry for basket body
2. Position threads relative to basket surface
3. Add base platform (bottom of basket)
4. Ensure threads align correctly with basket diameter
5. Add semi-transparent basket option (see threads inside)

**Basket Geometry:**
```javascript
// Main basket body (cylinder)
const basketGeometry = new THREE.CylinderGeometry(
  params.basketRadius,      // Top radius
  params.basketRadius,      // Bottom radius (same = cylinder)
  params.basketHeight,      // Height
  32,                       // Radial segments
  1,                        // Height segments
  true                      // Open-ended
);

const basketMaterial = new THREE.MeshStandardMaterial({
  color: 0xDEB887,  // Burlywood
  side: THREE.DoubleSide,
  transparent: true,
  opacity: 0.3  // Semi-transparent to see threads
});

// Bottom cap
const bottomGeometry = new THREE.CircleGeometry(params.basketRadius, 32);
const bottomMesh = new THREE.Mesh(bottomGeometry, basketMaterial);
bottomMesh.rotation.x = -Math.PI / 2;
bottomMesh.position.y = 0;
```

**Completion Criteria:**
- Basket cylinder visible
- Threads properly positioned on basket surface
- Bottom cap present
- Option to toggle basket visibility

**Key Files:**
- `src/weaving/BasketWeaver.js`
- `src/config/constants.js`

---

### Phase 7: Polish & Optimization (Day 7-8)
**Goal:** Refine visual quality and performance

**Tasks:**
1. Add background color/gradient
2. Improve camera starting position and limits
3. Add stats.js for FPS monitoring
4. Optimize geometry (reduce segments where possible)
5. Add responsive canvas sizing
6. Test on multiple devices/browsers
7. Add loading state for textures

**Performance Monitoring:**
```javascript
import Stats from 'three/examples/jsm/libs/stats.module.js';

const stats = new Stats();
document.body.appendChild(stats.dom);

// In animation loop
function animate() {
  stats.begin();
  
  controls.update();
  renderer.render(scene, camera);
  
  stats.end();
  requestAnimationFrame(animate);
}
```

**Responsive Canvas:**
```javascript
window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});
```

**Completion Criteria:**
- Maintains 60 FPS on target hardware
- Canvas resizes properly
- Professional appearance
- No console errors or warnings

**Key Files:**
- `src/main.js`
- `src/core/Renderer.js`

---

### Phase 8: Extensibility Architecture (Day 9-10)
**Goal:** Prepare for additional weaving techniques

**Tasks:**
1. Create `PatternBase` abstract class
2. Refactor `ThreeThreadPattern` to extend base
3. Add pattern selector in GUI
4. Document pattern interface for future techniques
5. Create example second pattern (e.g., "FourThreadCross")

**Pattern Architecture:**
```javascript
// Base class for all weaving patterns
class PatternBase {
  constructor(params) {
    this.params = params;
  }
  
  // Must be implemented by subclasses
  generateThreads() {
    throw new Error('generateThreads() must be implemented');
  }
  
  // Optional: pattern-specific parameters
  getParameters() {
    return {};
  }
  
  // Optional: pattern description
  getDescription() {
    return 'Base weaving pattern';
  }
}

// Three-thread implementation
class ThreeThreadPattern extends PatternBase {
  generateThreads() {
    const threads = [];
    const phaseOffsets = [0, 2*Math.PI/3, 4*Math.PI/3];
    
    for (let i = 0; i < 3; i++) {
      // Create curve with offset
      const curve = new WeavingCurve({
        ...this.params,
        phase: phaseOffsets[i]
      });
      
      threads.push(this.createThread(curve));
    }
    
    return threads;
  }
  
  getDescription() {
    return 'Traditional three-thread over/under weave';
  }
}
```

**GUI Pattern Selector:**
```javascript
const patterns = {
  'Three Thread': ThreeThreadPattern,
  'Four Thread Cross': FourThreadCrossPattern  // Future
};

gui.add(params, 'pattern', Object.keys(patterns))
  .name('Weaving Pattern')
  .onChange(patternName => {
    const PatternClass = patterns[patternName];
    basketWeaver.setPattern(new PatternClass(params));
  });
```

**Completion Criteria:**
- Pattern system is extensible
- Easy to add new patterns
- Pattern switching works smoothly
- Documentation clear for future development

**Key Files:**
- `src/weaving/patterns/PatternBase.js`
- `src/weaving/patterns/ThreeThreadPattern.js`
- `src/weaving/BasketWeaver.js` (pattern management)

---

### Phase 9: Testing & Debugging (Day 11)
**Goal:** Ensure stability and correct behavior

**Tasks:**
1. Test all parameter combinations
2. Verify geometry disposal (no memory leaks)
3. Test extreme values (very thin/thick threads, small/large baskets)
4. Cross-browser testing (Chrome, Firefox, Safari)
5. Mobile responsiveness testing
6. Fix any discovered bugs

**Test Checklist:**
- [ ] Thread thickness: 0.05 to 0.3 (no visual artifacts)
- [ ] Basket radius: 3 to 10 (threads scale correctly)
- [ ] Basket height: 5 to 20 (proportions maintained)
- [ ] Weaving frequency: 6 to 24 (over/under pattern clear)
- [ ] Mouse controls smooth on all axes
- [ ] No console errors during any interaction
- [ ] FPS remains above 30 on mobile
- [ ] Canvas resizes properly on window resize
- [ ] GUI remains accessible on small screens

**Completion Criteria:**
- All tests pass
- No known bugs
- Performance acceptable on target devices

---

### Phase 10: Deployment (Day 12)
**Goal:** Deploy to production hosting

**Deployment Steps:**

1. **Build for production:**
```bash
npm run build
```

2. **Test production build locally:**
```bash
npm run preview
```

3. **Create GitHub repository:**
```bash
git init
git add .
git commit -m "Initial commit: 3D basket weaving simulator"
git remote add origin <your-repo-url>
git push -u origin main
```

4. **Deploy to Cloudflare Pages:**
   - Go to Cloudflare Pages dashboard
   - Click "Create a project"
   - Connect GitHub repository
   - Configure build settings:
     - Build command: `npm run build`
     - Build output directory: `dist`
     - Node version: 18 or higher
   - Click "Save and Deploy"

5. **Configure custom domain (optional):**
   - Add custom domain in Cloudflare Pages settings
   - Update DNS records as instructed

**Completion Criteria:**
- Site live and accessible
- All features working in production
- Custom domain configured (if desired)
- Repository has proper README

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

## Testing Checklist

### Visual Tests
- [ ] Threads render as smooth curves (no jagged edges)
- [ ] Three threads clearly visible and distinct
- [ ] Over/under weaving pattern recognizable
- [ ] Threads positioned correctly around basket perimeter
- [ ] Material looks wood-like
- [ ] Scene is well-lit
- [ ] Background color appropriate

### Interaction Tests
- [ ] Mouse drag rotates view smoothly
- [ ] Mouse wheel zooms in/out
- [ ] Right-click drag pans view
- [ ] Camera doesn't flip unexpectedly
- [ ] OrbitControls feel natural

### Parameter Tests
- [ ] Thread thickness slider updates immediately
- [ ] Basket radius slider maintains correct proportions
- [ ] Basket height slider updates correctly
- [ ] Weaving frequency creates clear over/under changes
- [ ] Winding count affects spiral density
- [ ] Extreme values don't crash app

### Performance Tests
- [ ] Maintains 60 FPS on desktop
- [ ] Maintains >30 FPS on mobile
- [ ] No memory leaks (test by adjusting parameters 50+ times)
- [ ] Stats.js shows stable frame times
- [ ] No dropped frames during interaction

### Compatibility Tests
- [ ] Chrome desktop (latest)
- [ ] Firefox desktop (latest)
- [ ] Safari desktop (latest)
- [ ] Edge desktop (latest)
- [ ] Chrome mobile (Android)
- [ ] Safari mobile (iOS)
- [ ] Tablet landscape/portrait modes

### Deployment Tests
- [ ] Production build completes without errors
- [ ] Preview build works locally
- [ ] Deployed site loads correctly
- [ ] All assets load (no 404s)
- [ ] HTTPS works correctly
- [ ] Custom domain resolves (if configured)

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

Good luck with your vibe coding! 🎉🧺