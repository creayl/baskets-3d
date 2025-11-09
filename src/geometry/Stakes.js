/**
 * Stakes.js
 * Generates vertical stakes that extend from base spokes
 *
 * Stakes are the vertical structural elements that weavers wrap around
 */

import * as THREE from 'three';
import { materialLibrary } from '../core/MaterialLibrary.js';

export class Stakes {
  /**
   * Create vertical stakes from base spoke positions
   *
   * @param {Object} config - Basket configuration
   * @param {Array<Object>} spokePositions - Array of {position, angle, index}
   * @returns {Object} { meshes: Array<THREE.Mesh>, positions: Array<Object> }
   */
  static createStakes(config, spokePositions) {
    const {
      height,
      stakeThickness,
      stakeMaterial,
      radialSegments = 8,
    } = config;

    const meshes = [];
    const stakePositions = [];

    spokePositions.forEach((spoke) => {
      // Create vertical stake extending upward from spoke end position
      const geometry = new THREE.CylinderGeometry(
        stakeThickness,
        stakeThickness,
        height,
        radialSegments
      );

      const material = materialLibrary.getMaterial(stakeMaterial || 'darkWood');
      const stakeMesh = new THREE.Mesh(geometry, material);

      // Position stake at spoke end, centered vertically
      stakeMesh.position.set(
        spoke.position.x,
        height / 2,
        spoke.position.z
      );

      meshes.push(stakeMesh);

      // Store stake position for weaver generation
      stakePositions.push({
        angle: spoke.angle,
        basePosition: spoke.position.clone(),
        topPosition: new THREE.Vector3(
          spoke.position.x,
          height,
          spoke.position.z
        ),
        index: spoke.index,
      });
    });

    return {
      meshes,
      positions: stakePositions,
    };
  }

  /**
   * Create stakes with outward curve (for bowl-shaped baskets)
   *
   * @param {Object} config - Basket configuration
   * @param {Array<Object>} spokePositions - Array of {position, angle, index}
   * @param {number} curveAmount - How much to curve outward (0-1)
   * @returns {Object} { meshes: Array<THREE.Mesh>, positions: Array<Object> }
   */
  static createCurvedStakes(config, spokePositions, curveAmount = 0.3) {
    const {
      height,
      stakeThickness,
      baseRadius,
      stakeMaterial,
      curveSegments = 32,
      radialSegments = 8,
    } = config;

    const meshes = [];
    const stakePositions = [];

    spokePositions.forEach((spoke) => {
      // Create curved path for stake
      const points = [];
      const numPoints = curveSegments;

      for (let i = 0; i <= numPoints; i++) {
        const t = i / numPoints;
        const y = t * height;

        // Quadratic curve outward
        const curveT = Math.sin(t * Math.PI / 2); // Ease out
        const radiusAtHeight = baseRadius + (curveT * curveAmount * baseRadius);

        const x = Math.cos(spoke.angle) * radiusAtHeight;
        const z = Math.sin(spoke.angle) * radiusAtHeight;

        points.push(new THREE.Vector3(x, y, z));
      }

      // Create tube geometry along curved path
      const curve = new THREE.CatmullRomCurve3(points);
      const geometry = new THREE.TubeGeometry(
        curve,
        curveSegments,
        stakeThickness,
        radialSegments,
        false
      );

      const material = materialLibrary.getMaterial(stakeMaterial || 'darkWood');
      const stakeMesh = new THREE.Mesh(geometry, material);

      meshes.push(stakeMesh);

      // Store stake position info
      const topPoint = points[points.length - 1];
      stakePositions.push({
        angle: spoke.angle,
        basePosition: spoke.position.clone(),
        topPosition: topPoint.clone(),
        index: spoke.index,
        curve: curve, // Store curve for weaver calculations
      });
    });

    return {
      meshes,
      positions: stakePositions,
    };
  }

  /**
   * Dispose of stake meshes
   */
  static dispose(meshes) {
    meshes.forEach(mesh => {
      if (mesh.geometry) mesh.geometry.dispose();
      if (mesh.material) mesh.material.dispose();
    });
  }
}
