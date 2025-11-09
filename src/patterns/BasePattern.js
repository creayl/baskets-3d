/**
 * BasePattern.js
 * Abstract base class for all basket weaving patterns
 *
 * All pattern implementations must extend this class and implement
 * the generateWeavers() method
 */

import * as THREE from 'three';
import { materialLibrary } from '../core/MaterialLibrary.js';

export class BasePattern {
  /**
   * @param {Object} config - Basket configuration
   */
  constructor(config) {
    this.config = config;
    this.weaverMeshes = [];
  }

  /**
   * Generate weaver meshes for this pattern
   * Must be implemented by subclasses
   *
   * @param {Array<Object>} stakePositions - Array of {position: Vector3, angle: number}
   * @param {number} baseRadius - Basket radius
   * @param {number} height - Basket height
   * @returns {Array<THREE.Mesh>} Array of weaver meshes
   */
  generateWeavers(stakePositions, baseRadius, height) {
    throw new Error('BasePattern.generateWeavers() must be implemented by subclass');
  }

  /**
   * Clean up all weaver meshes
   */
  dispose() {
    this.weaverMeshes.forEach(mesh => {
      if (mesh.geometry) mesh.geometry.dispose();
      if (mesh.material) mesh.material.dispose();
    });
    this.weaverMeshes = [];
  }

  /**
   * Get pattern-specific parameters for GUI
   * Override in subclasses to add custom parameters
   *
   * @returns {Object} Parameter definitions
   */
  getParameters() {
    return {};
  }

  // ============================================
  // PROTECTED HELPER METHODS
  // ============================================

  /**
   * Create a tube geometry from a path of points
   * @protected
   */
  createTubeFromPoints(points, thickness, closed = false) {
    const curve = new THREE.CatmullRomCurve3(points);
    curve.closed = closed;

    const geometry = new THREE.TubeGeometry(
      curve,
      this.config.curveSegments || 64,
      thickness,
      this.config.radialSegments || 8,
      closed
    );

    return geometry;
  }

  /**
   * Create a cylinder between two points
   * @protected
   */
  createCylinderBetweenPoints(point1, point2, thickness) {
    const direction = new THREE.Vector3().subVectors(point2, point1);
    const length = direction.length();
    const midpoint = new THREE.Vector3().addVectors(point1, point2).multiplyScalar(0.5);

    const geometry = new THREE.CylinderGeometry(
      thickness,
      thickness,
      length,
      this.config.radialSegments || 8
    );

    const mesh = new THREE.Mesh(geometry);
    mesh.position.copy(midpoint);

    // Rotate to align with direction
    const axis = new THREE.Vector3(0, 1, 0);
    const quaternion = new THREE.Quaternion().setFromUnitVectors(
      axis,
      direction.normalize()
    );
    mesh.quaternion.copy(quaternion);

    return mesh;
  }

  /**
   * Calculate over/under pattern for a given stake index
   * @protected
   */
  calculateOverUnder(stakeIndex, rowIndex, pattern = 'over1under1') {
    switch (pattern) {
      case 'over1under1':
        return (stakeIndex + rowIndex) % 2 === 0;

      case 'over2under2':
        return Math.floor((stakeIndex + rowIndex) / 2) % 2 === 0;

      case 'over3under1':
        return (stakeIndex + rowIndex) % 4 !== 3;

      default:
        return (stakeIndex + rowIndex) % 2 === 0;
    }
  }

  /**
   * Get material for this pattern
   * @protected
   */
  getMaterial(materialName = null) {
    const name = materialName || this.config.weaverMaterial || 'lightWood';
    return materialLibrary.getMaterial(name);
  }

  /**
   * Calculate radial offset for over/under effect
   * @protected
   */
  calculateRadialOffset(isOver, weaverThickness) {
    const offsetMultiplier = 2.5; // How far to push out/in
    return isOver
      ? weaverThickness * offsetMultiplier
      : -weaverThickness * offsetMultiplier;
  }

  /**
   * Smooth transition between over and under positions
   * Uses cosine interpolation for smooth curves
   * @protected
   */
  smoothTransition(t, from, to) {
    const smoothT = (1 - Math.cos(t * Math.PI)) / 2;
    return from + (to - from) * smoothT;
  }

  /**
   * Find nearest stake index for a given angle
   * @protected
   */
  findNearestStakeIndex(angle, numStakes) {
    const normalizedAngle = ((angle % (Math.PI * 2)) + Math.PI * 2) % (Math.PI * 2);
    const stakeIndex = Math.round((normalizedAngle / (Math.PI * 2)) * numStakes) % numStakes;
    return stakeIndex;
  }
}
