# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Interactive web-based 3D basket weaving simulator that visualizes traditional weaving patterns using three wooden threads following sinusoidal over/under patterns. Built with Three.js, Vite, and lil-gui.

**Current Status:** Project is in initial scaffolding phase. No code has been written yet. Follow masterplan.md phases sequentially.

## Tech Stack

- **3D Framework:** Three.js (r161+)
- **Build Tool:** Vite
- **Language:** JavaScript (ES6+)
- **UI Controls:** lil-gui
- **Camera Controls:** OrbitControls
- **Deployment Target:** Cloudflare Pages

## Common Commands

### Initial Setup (First Time Only)
```bash
npm create vite@latest . -- --template vanilla
npm install
npm install three lil-gui
npm install -D stats.js
```

### Development
```bash
npm run dev          # Start dev server at http://localhost:5173
npm run build        # Build for production
npm run preview      # Preview production build
```

## Architecture Overview

### Core Mathematical Model

The weaving effect is achieved through **phase-shifted sinusoidal curves in cylindrical coordinates**:

**WeavingCurve Class** (extends THREE.Curve):
- Parametric function: `getPoint(t)` where t ∈ [0,1]
- Cylindrical to Cartesian conversion with radial offset
- Formula: `radius = basketRadius + amplitude × sin(angle × frequency + phase)`
- Three threads with phase offsets: 0°, 120°, 240° (0, 2π/3, 4π/3 radians)

The sinusoidal radial offset creates the alternating in/out motion while threads spiral upward, producing the over/under weaving pattern.

### Key Architecture Components

**Thread Generation Pipeline:**
1. Create WeavingCurve instance with parameters
2. Generate TubeGeometry from curve
3. Apply MeshStandardMaterial (wood appearance)
4. Add mesh to scene
5. Store reference for later disposal

**Parameter System:**
- `threadThickness` (0.05-0.3): TubeGeometry radius
- `basketRadius` (3-10): Base cylinder radius
- `basketHeight` (5-20): Vertical extent
- `weavingFrequency` (6-24): Controls over/under pattern density
- `windingCount` (1-10): Number of complete wraps around basket

**Memory Management (Critical):**
When parameters change and threads are recreated:
```javascript
threads.forEach(thread => {
  thread.geometry.dispose();  // Free GPU memory
  thread.material.dispose();  // Free texture memory
  scene.remove(thread);       // Remove from scene graph
});
```
Failure to dispose causes memory leaks.

### File Structure (Target State)

```
src/
├── main.js                    # Entry point: scene, animation loop, GUI
├── weaving/
│   └── WeavingCurve.js       # Custom THREE.Curve with sinusoidal math
└── [optional refactoring into core/, controls/ modules]
index.html                     # Canvas container
vite.config.js                # Build config with base: './'
```

Start with monolithic `main.js` for rapid prototyping (Phases 1-5), refactor later (Phase 8).

## Development Workflow

### Following the Master Plan

The masterplan.md contains 10 sequential phases. Each phase has:
- Terminal commands (copy-paste ready)
- File creation tasks with explicit paths
- Visual checkpoints for verification
- Terminal verification commands

**Phase Sequence:**
1. Foundation Setup - Basic scene with rotating cube
2. Custom Weaving Curve - Single sinusoidal thread
3. Three-Thread Pattern - Add 120° phase offsets
4. Lighting Setup - HemisphereLight + DirectionalLight
5. Interactive GUI - lil-gui with parameter sliders
6. Basket Cylinder (Optional) - Semi-transparent reference
7. Polish & Optimization - Responsive canvas, stats.js
8. Code Organization (Optional) - Extract modules
9. Testing & Bug Fixes - Cross-browser, performance
10. Deployment - Cloudflare Pages

**Example Usage:**
```
"Execute Phase 2 from masterplan.md: Create WeavingCurve.js with sinusoidal
getPoint() method, replace cube with single brown thread using TubeGeometry."
```

### Verification After Each Phase

```bash
ls -la src/                    # Check files created
npm list three lil-gui         # Verify dependencies
npm run dev                    # Start dev server
```

Open http://localhost:5173 and check visual checkpoints in masterplan.md.

## Performance Guidelines

**Target:** 60 FPS desktop, 30+ FPS mobile

**Optimization Levers:**
- `tubularSegments: 512` (smoothness) - reduce to 256 if FPS drops
- `radialSegments: 8` (roundness) - reduce to 6 if needed
- Cap pixel ratio: `Math.min(window.devicePixelRatio, 2)`
- Enable OrbitControls damping: `dampingFactor: 0.05`

**Memory Leak Test:**
Move all GUI sliders 20+ times. Check console:
```javascript
console.log(performance.memory.usedJSHeapSize);
```
Memory should stabilize, not grow continuously (< 10MB increase acceptable).

## Common Issues & Solutions

**Threads appear jagged:**
- Increase `tubularSegments` in TubeGeometry (512 or 1024)

**Performance drops below 30 FPS:**
- Reduce `tubularSegments` to 256
- Reduce `radialSegments` to 6

**Threads intersecting incorrectly (z-fighting):**
- Increase `amplitude` parameter
- Verify phase offsets: `[0, Math.PI * 2 / 3, Math.PI * 4 / 3]`
- Adjust `frequency` relative to basket size

**Build fails with "THREE is not defined":**
- Use: `import * as THREE from 'three'`
- OrbitControls path: `'three/examples/jsm/controls/OrbitControls.js'`

**Deployed site shows blank page:**
- Check browser console (F12)
- Verify `vite.config.js` has `base: './'`
- Check Cloudflare Pages build logs

## Deployment Configuration

**vite.config.js:**
```javascript
export default defineConfig({
  base: './',  // CRITICAL: relative paths for deployment
  build: {
    outDir: 'dist',
    rollupOptions: {
      output: {
        manualChunks: {
          three: ['three']  // Separate Three.js into own chunk
        }
      }
    }
  }
});
```

**Cloudflare Pages:**
- Build command: `npm run build`
- Build output directory: `dist`
- Node version: 18+
- Environment variables: None

## Testing Checklist

**Visual Tests:**
- Three distinct threads visible
- Over/under weaving pattern clear
- Smooth rendering (no jagged edges)
- Wood-like material (brown, rough)
- 60 FPS on desktop

**Parameter Range Tests:**
Move each slider to min/max values, verify no artifacts or errors.

**Build Test:**
```bash
npm run build
ls -lh dist/assets/*.js  # Should be < 500KB gzipped
npm run preview          # Test production build
```
