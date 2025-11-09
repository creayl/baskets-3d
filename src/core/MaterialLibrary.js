/**
 * MaterialLibrary.js
 * Centralized material definitions for basket components
 */

import * as THREE from 'three';

/**
 * Material presets for different wood types and basket materials
 */
const MATERIAL_PRESETS = {
  darkWood: {
    color: 0x5C4033,      // Dark brown
    roughness: 0.85,
    metalness: 0.05,
  },

  lightWood: {
    color: 0xD2B48C,      // Tan/light brown
    roughness: 0.8,
    metalness: 0.05,
  },

  naturalWood: {
    color: 0x8B7355,      // Medium brown
    roughness: 0.82,
    metalness: 0.05,
  },

  rattan: {
    color: 0xC19A6B,      // Camel/rattan color
    roughness: 0.75,
    metalness: 0.1,
  },

  willow: {
    color: 0xA0826D,      // Grayish brown
    roughness: 0.9,
    metalness: 0.0,
  },

  bamboo: {
    color: 0xE3DAC9,      // Light bamboo
    roughness: 0.7,
    metalness: 0.15,
  },
};

/**
 * MaterialLibrary
 * Singleton class for managing and reusing materials
 */
class MaterialLibrary {
  constructor() {
    this.materials = new Map();
    this.initialized = false;
  }

  /**
   * Initialize all materials
   */
  initialize() {
    if (this.initialized) return;

    // Create materials from presets
    for (const [name, preset] of Object.entries(MATERIAL_PRESETS)) {
      const material = new THREE.MeshStandardMaterial({
        color: preset.color,
        roughness: preset.roughness,
        metalness: preset.metalness,
      });

      this.materials.set(name, material);
    }

    this.initialized = true;
  }

  /**
   * Get a material by name
   * @param {string} name - Material name from MATERIAL_PRESETS
   * @returns {THREE.MeshStandardMaterial}
   */
  getMaterial(name) {
    if (!this.initialized) {
      this.initialize();
    }

    const material = this.materials.get(name);

    if (!material) {
      console.warn(`Material "${name}" not found, using naturalWood as fallback`);
      return this.materials.get('naturalWood');
    }

    return material;
  }

  /**
   * Create a custom material (not stored in library)
   * @param {Object} params - Material parameters
   * @returns {THREE.MeshStandardMaterial}
   */
  createCustomMaterial(params) {
    return new THREE.MeshStandardMaterial({
      color: params.color || 0x8B7355,
      roughness: params.roughness || 0.8,
      metalness: params.metalness || 0.05,
      ...params,
    });
  }

  /**
   * Dispose all materials (cleanup)
   */
  dispose() {
    for (const material of this.materials.values()) {
      material.dispose();
    }
    this.materials.clear();
    this.initialized = false;
  }

  /**
   * Get all available material names
   * @returns {string[]}
   */
  getAvailableMaterials() {
    return Array.from(this.materials.keys());
  }
}

// Export singleton instance
export const materialLibrary = new MaterialLibrary();

// Export presets for reference
export { MATERIAL_PRESETS };
