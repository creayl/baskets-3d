# 3D Basket Weaving Simulator - Architecture Design

## 🎯 Design Principles

1. **Pattern-based System**: Each weaving technique is a separate pattern class
2. **Clean Separation**: Geometry generation separate from scene management
3. **Extensibility**: Easy to add new techniques without touching existing code
4. **Realistic Structure**: Implements actual basket anatomy (base, stakes, weavers, rim)

---

## 📊 System Architecture

```
src/
├── main.js                          # Entry point, scene setup, GUI
├── core/
│   ├── BasketManager.js             # Main basket coordinator
│   └── MaterialLibrary.js           # Reusable materials (wood, wicker, etc.)
├── geometry/
│   ├── BasketBase.js                # Radial base/bottom generation
│   ├── Stakes.js                    # Vertical stake generation
│   └── GeometryUtils.js             # Shared geometry helpers
├── patterns/
│   ├── BasePattern.js               # Abstract base class for all patterns
│   ├── PlainWeavePattern.js         # Over-1, Under-1 (Wicker)
│   ├── TwillWeavePattern.js         # Over-2, Under-2 (future)
│   ├── TwiningPattern.js            # Dual-strand twisting (future)
│   └── CoilingPattern.js            # Spiral technique (future)
└── config/
    └── BasketConfig.js              # Default parameters & constants
```

---

## 🏗️ Core Components

### 1. BasketManager (Coordinator)
**Responsibility**: Orchestrates basket creation and manages all components

```javascript
class BasketManager {
  constructor(scene, config) {
    this.scene = scene
    this.config = config
    this.base = null
    this.stakes = null
    this.pattern = null
  }

  create() {
    this.clear()
    this.createBase()      // Radial bottom
    this.createStakes()    // Vertical structure
    this.createWeaving()   // Apply selected pattern
  }

  setPattern(patternClass) {
    this.pattern = new patternClass(this.config)
  }
}
```

### 2. BasePattern (Abstract)
**Responsibility**: Interface for all weaving techniques

```javascript
class BasePattern {
  constructor(config) {
    this.config = config
  }

  // Must be implemented by subclasses
  generateWeavers(stakes, baseRadius, height) {
    throw new Error('Must implement generateWeavers()')
  }

  // Shared helpers
  calculateStakePositions(numStakes, radius) { ... }
  createWeaverPath(points, thickness) { ... }
}
```

### 3. PlainWeavePattern
**Responsibility**: Implements classic Over-1, Under-1 weaving

```javascript
class PlainWeavePattern extends BasePattern {
  generateWeavers(stakes, baseRadius, height) {
    // Creates horizontal weavers that alternate over/under each stake
    // Returns array of THREE.Mesh objects
  }
}
```

### 4. BasketBase
**Responsibility**: Generates radial bottom structure

```javascript
class BasketBase {
  static createRadialBase(numSpokes, radius, spokeThickness) {
    // Creates star pattern from center
    // Spokes become the vertical stakes
  }

  static createWovenBase(numSpokes, radius) {
    // Future: Actual woven circular base
  }
}
```

---

## 🔄 Data Flow

```
User adjusts GUI
    ↓
BasketManager.create()
    ↓
1. BasketBase.createRadialBase() → Creates bottom spoke structure
    ↓
2. Stakes.generate() → Extends spokes vertically upward
    ↓
3. pattern.generateWeavers() → Creates horizontal weaving based on pattern type
    ↓
4. All meshes added to scene
```

---

## ⚙️ Configuration Structure

```javascript
// BasketConfig.js
export const DEFAULT_CONFIG = {
  // Dimensions
  baseRadius: 5,
  height: 10,

  // Structure
  numStakes: 24,
  stakeThickness: 0.08,

  // Pattern-specific
  weaverThickness: 0.1,
  weaverSpacing: 0.4,

  // Pattern type (string identifier)
  patternType: 'plainWeave',  // 'plainWeave', 'twill', 'twining', 'coiling'

  // Material
  stakeMaterial: 'darkWood',
  weaverMaterial: 'lightWood',
}
```

---

## 🎨 Pattern Interface

Each pattern class must implement:

```javascript
class MyPattern extends BasePattern {
  constructor(config) {
    super(config)
    // Pattern-specific initialization
  }

  generateWeavers(stakes, baseRadius, height) {
    // Returns: Array<THREE.Mesh>
    // - stakes: Reference to vertical stake positions
    // - baseRadius: Basket radius
    // - height: Basket height

    return meshes
  }

  // Optional: Pattern-specific parameters
  getParameters() {
    return {
      'parameterName': { min, max, default, step }
    }
  }
}
```

---

## 🚀 Implementation Order

### Phase 1: Foundation (Current Sprint)
1. ✅ Create directory structure
2. ✅ Implement `BasePattern` abstract class
3. ✅ Implement `BasketManager` coordinator
4. ✅ Implement `BasketBase` for radial bottom
5. ✅ Implement `Stakes` generator
6. ✅ Implement `MaterialLibrary`

### Phase 2: First Pattern
7. ✅ Implement `PlainWeavePattern`
8. ✅ Integrate with `BasketManager`
9. ✅ Update `main.js` to use new system
10. ✅ Test and refine

### Phase 3: Future Patterns
11. ⏳ Implement `TwillWeavePattern`
12. ⏳ Implement `TwiningPattern`
13. ⏳ Add pattern selector to GUI
14. ⏳ Add pattern-specific parameters

---

## 🧩 Extension Points

### Adding a New Pattern
```javascript
// 1. Create new file: src/patterns/MyNewPattern.js
import { BasePattern } from './BasePattern.js'

export class MyNewPattern extends BasePattern {
  generateWeavers(stakes, baseRadius, height) {
    // Your implementation
  }
}

// 2. Register in BasketManager
import { MyNewPattern } from './patterns/MyNewPattern.js'

const patternRegistry = {
  'plainWeave': PlainWeavePattern,
  'myNewPattern': MyNewPattern,
}

// 3. Add to GUI dropdown
gui.add(config, 'patternType', Object.keys(patternRegistry))
```

### Adding a New Base Shape
```javascript
// In BasketBase.js
static createHexagonalBase(numSpokes, radius) {
  // Implementation
}
```

---

## 🎯 Key Advantages

1. **Modularity**: Each component is independent and testable
2. **Scalability**: New patterns = new file, no existing code changes
3. **Maintainability**: Clear separation of concerns
4. **Reusability**: Shared utilities in base classes
5. **Flexibility**: Easy to swap patterns at runtime

---

## 📝 Notes

- **Memory Management**: Each pattern is responsible for disposing its own geometries
- **Performance**: Pattern generation should be optimized for real-time updates
- **Validation**: BasketManager validates config before creation
- **Error Handling**: Graceful degradation if pattern fails to generate

---

## 🔮 Future Considerations

- **Export System**: Patterns should be serializable for export/import
- **Animation**: Patterns could implement step-by-step weaving animation
- **Physics**: Future integration with cloth/rope physics for realistic sagging
- **Texture Mapping**: Patterns could define UV unwrapping strategies
