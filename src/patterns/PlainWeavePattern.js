/**
 * PlainWeavePattern.js
 * Implements classic Over-1, Under-1 wicker weaving pattern
 *
 * This is the most basic and common basket weaving technique where
 * horizontal weavers alternate going over and under each vertical stake
 */

import * as THREE from 'three';
import { BasePattern } from './BasePattern.js';

export class PlainWeavePattern extends BasePattern {
  constructor(config) {
    super(config);
  }

  /**
   * Generate horizontal weavers in plain weave pattern
   *
   * @param {Array<Object>} stakePositions - Array of stake info {angle, basePosition, index}
   * @param {number} baseRadius - Basket radius
   * @param {number} height - Basket height
   * @returns {Array<THREE.Mesh>} Array of weaver meshes
   */
  generateWeavers(stakePositions, baseRadius, height) {
    const {
      weaverThickness,
      weaverSpacing,
      weaverMaterial,
    } = this.config;

    const meshes = [];
    const numStakes = stakePositions.length;

    // Calculate number of horizontal rows
    const numRows = Math.floor(height / weaverSpacing);

    for (let row = 0; row < numRows; row++) {
      const y = row * weaverSpacing + weaverSpacing / 2;

      // Create continuous weaver that wraps around entire basket
      const weaver = this.createWeaverRow(
        stakePositions,
        baseRadius,
        y,
        row,
        weaverThickness
      );

      if (weaver) {
        meshes.push(weaver);
      }
    }

    this.weaverMeshes = meshes;
    return meshes;
  }

  /**
   * Create a single row of weaving
   * @private
   */
  createWeaverRow(stakePositions, baseRadius, y, rowIndex, weaverThickness) {
    const numStakes = stakePositions.length;
    const points = [];

    // Number of segments per stake interval (for smooth curves)
    const segmentsPerStake = 10;
    const totalSegments = numStakes * segmentsPerStake;

    for (let i = 0; i <= totalSegments; i++) {
      const t = i / totalSegments;
      const angle = t * Math.PI * 2;

      // Determine which stake we're at
      const stakeIndex = Math.floor(t * numStakes) % numStakes;
      const nextStakeIndex = (stakeIndex + 1) % numStakes;

      // Plain weave pattern: alternate based on stake index + row index
      const isOver = this.calculateOverUnder(stakeIndex, rowIndex, 'over1under1');

      // Calculate position within current stake interval
      const stakeT = (t * numStakes) % 1;

      // Smooth transition between over and under positions
      const currentOffset = this.calculateRadialOffset(isOver, weaverThickness);

      // Check if we're transitioning to next stake
      const nextIsOver = this.calculateOverUnder(nextStakeIndex, rowIndex, 'over1under1');
      const nextOffset = this.calculateRadialOffset(nextIsOver, weaverThickness);

      // Interpolate offset for smooth transitions
      let radialOffset = currentOffset;

      // Smooth transition in the middle third of each stake interval
      if (stakeT > 0.6 && stakeT < 1.0) {
        const transitionT = (stakeT - 0.6) / 0.4;
        radialOffset = this.smoothTransition(transitionT, currentOffset, nextOffset);
      }

      // Calculate final position
      const r = baseRadius + radialOffset;
      const x = Math.cos(angle) * r;
      const z = Math.sin(angle) * r;

      // Slight vertical variation for realism (weaver undulates)
      const verticalWave = isOver ? weaverThickness * 0.3 : -weaverThickness * 0.3;

      points.push(new THREE.Vector3(x, y + verticalWave, z));
    }

    // Create tube geometry from points
    const geometry = this.createTubeFromPoints(points, weaverThickness, true);
    const material = this.getMaterial(weaverMaterial);

    // Alternate weaver colors slightly for visual interest
    if (rowIndex % 2 === 1) {
      material.color.multiplyScalar(0.95); // Slightly darker
    }

    const mesh = new THREE.Mesh(geometry, material);
    return mesh;
  }

  /**
   * Get pattern-specific parameters
   */
  getParameters() {
    return {
      weaverSpacing: {
        min: 0.2,
        max: 0.8,
        step: 0.05,
        default: 0.4,
        label: 'Weaver Spacing',
      },
      weaverThickness: {
        min: 0.05,
        max: 0.2,
        step: 0.01,
        default: 0.1,
        label: 'Weaver Thickness',
      },
    };
  }
}
