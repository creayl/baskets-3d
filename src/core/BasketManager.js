/**
 * BasketManager.js
 * Main coordinator for basket creation and management
 *
 * Orchestrates the creation of base, stakes, and weaving patterns
 */

import { validateConfig } from '../config/BasketConfig.js';
import { materialLibrary } from './MaterialLibrary.js';
import { BasketBase } from '../geometry/BasketBase.js';
import { Stakes } from '../geometry/Stakes.js';
import { PlainWeavePattern } from '../patterns/PlainWeavePattern.js';

/**
 * Pattern registry - maps pattern names to pattern classes
 */
const PATTERN_REGISTRY = {
  plainWeave: PlainWeavePattern,
  // Future patterns will be added here:
  // twill: TwillWeavePattern,
  // twining: TwiningPattern,
  // coiling: CoilingPattern,
};

export class BasketManager {
  /**
   * @param {THREE.Scene} scene - Three.js scene
   * @param {Object} config - Basket configuration
   */
  constructor(scene, config) {
    this.scene = scene;
    this.config = config;

    // Component storage
    this.baseMeshes = [];
    this.stakeMeshes = [];
    this.weaverMeshes = [];

    // Structural data
    this.spokePositions = null;
    this.stakePositions = null;

    // Current pattern instance
    this.pattern = null;

    // Initialize material library
    materialLibrary.initialize();
  }

  /**
   * Create complete basket
   */
  create() {
    // Validate configuration
    const validation = validateConfig(this.config);
    if (!validation.valid) {
      console.error('Invalid basket configuration:', validation.errors);
      return;
    }

    // Clear existing basket
    this.clear();

    // Create components in order
    this.createBase();
    this.createStakes();
    this.createWeaving();
  }

  /**
   * Create radial base structure
   * @private
   */
  createBase() {
    const baseResult = BasketBase.createRadialBase(this.config);

    this.baseMeshes = baseResult.meshes;
    this.spokePositions = baseResult.spokePositions;

    // Add base meshes to scene
    this.baseMeshes.forEach(mesh => this.scene.add(mesh));
  }

  /**
   * Create vertical stakes extending from base spokes
   * @private
   */
  createStakes() {
    if (!this.spokePositions) {
      console.error('Cannot create stakes: base not created');
      return;
    }

    const stakesResult = Stakes.createStakes(this.config, this.spokePositions);

    this.stakeMeshes = stakesResult.meshes;
    this.stakePositions = stakesResult.positions;

    // Add stake meshes to scene
    this.stakeMeshes.forEach(mesh => this.scene.add(mesh));
  }

  /**
   * Create weaving pattern
   * @private
   */
  createWeaving() {
    if (!this.stakePositions) {
      console.error('Cannot create weaving: stakes not created');
      return;
    }

    // Get pattern class from registry
    const PatternClass = PATTERN_REGISTRY[this.config.patternType];

    if (!PatternClass) {
      console.error(`Pattern "${this.config.patternType}" not found in registry`);
      return;
    }

    // Create pattern instance
    this.pattern = new PatternClass(this.config);

    // Generate weavers
    const weavers = this.pattern.generateWeavers(
      this.stakePositions,
      this.config.baseRadius,
      this.config.height
    );

    this.weaverMeshes = weavers;

    // Add weaver meshes to scene
    this.weaverMeshes.forEach(mesh => this.scene.add(mesh));
  }

  /**
   * Clear all basket components from scene
   */
  clear() {
    // Remove and dispose base
    this.baseMeshes.forEach(mesh => {
      this.scene.remove(mesh);
      if (mesh.geometry) mesh.geometry.dispose();
      if (mesh.material) mesh.material.dispose();
    });
    this.baseMeshes = [];

    // Remove and dispose stakes
    this.stakeMeshes.forEach(mesh => {
      this.scene.remove(mesh);
      if (mesh.geometry) mesh.geometry.dispose();
      if (mesh.material) mesh.material.dispose();
    });
    this.stakeMeshes = [];

    // Remove and dispose weavers
    this.weaverMeshes.forEach(mesh => {
      this.scene.remove(mesh);
      if (mesh.geometry) mesh.geometry.dispose();
      if (mesh.material) mesh.material.dispose();
    });
    this.weaverMeshes = [];

    // Dispose pattern
    if (this.pattern) {
      this.pattern.dispose();
      this.pattern = null;
    }

    // Clear structural data
    this.spokePositions = null;
    this.stakePositions = null;
  }

  /**
   * Update basket with new configuration
   */
  updateConfig(newConfig) {
    this.config = { ...this.config, ...newConfig };
    this.create();
  }

  /**
   * Change weaving pattern
   */
  setPattern(patternType) {
    if (!PATTERN_REGISTRY[patternType]) {
      console.error(`Pattern "${patternType}" not available`);
      return;
    }

    this.config.patternType = patternType;
    this.create();
  }

  /**
   * Get available pattern types
   */
  getAvailablePatterns() {
    return Object.keys(PATTERN_REGISTRY);
  }

  /**
   * Get current pattern parameters (for GUI)
   */
  getPatternParameters() {
    if (!this.pattern) return {};
    return this.pattern.getParameters();
  }

  /**
   * Dispose all resources
   */
  dispose() {
    this.clear();
    materialLibrary.dispose();
  }
}
