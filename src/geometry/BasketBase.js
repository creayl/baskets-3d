/**
 * BasketBase.js
 * Generates the bottom/base structure of a basket
 *
 * Creates radial spoke pattern that extends upward to become stakes
 */

import * as THREE from 'three';
import { materialLibrary } from '../core/MaterialLibrary.js';

export class BasketBase {
  /**
   * Create radial base with spokes extending from center
   *
   * This mimics real basket construction where spokes are laid out
   * in a star pattern, then woven in a circle to create the base
   *
   * @param {Object} config - Basket configuration
   * @returns {Object} { meshes: Array<THREE.Mesh>, spokePositions: Array<Object> }
   */
  static createRadialBase(config) {
    const {
      numSpokes,
      spokeThickness,
      baseRadius,
      baseMaterial,
      radialSegments = 8,
    } = config;

    const meshes = [];
    const spokePositions = [];

    // Create radial spokes from center
    for (let i = 0; i < numSpokes; i++) {
      const angle = (i / numSpokes) * Math.PI * 2;

      // Spoke extends from center to basket radius
      const startPoint = new THREE.Vector3(0, 0, 0);
      const endPoint = new THREE.Vector3(
        Math.cos(angle) * baseRadius,
        0,
        Math.sin(angle) * baseRadius
      );

      // Create spoke geometry
      const direction = new THREE.Vector3().subVectors(endPoint, startPoint);
      const length = direction.length();
      const midpoint = new THREE.Vector3()
        .addVectors(startPoint, endPoint)
        .multiplyScalar(0.5);

      const geometry = new THREE.CylinderGeometry(
        spokeThickness,
        spokeThickness,
        length,
        radialSegments
      );

      // Get material
      const material = materialLibrary.getMaterial(baseMaterial || 'naturalWood');

      const spokeMesh = new THREE.Mesh(geometry, material);
      spokeMesh.position.copy(midpoint);

      // Rotate to align with radial direction
      const axis = new THREE.Vector3(0, 1, 0);
      const quaternion = new THREE.Quaternion().setFromUnitVectors(
        axis,
        direction.normalize()
      );
      spokeMesh.quaternion.copy(quaternion);

      meshes.push(spokeMesh);

      // Store spoke end position for stake creation
      spokePositions.push({
        angle: angle,
        position: endPoint.clone(),
        index: i,
      });
    }

    // Create initial circular weaver around base (optional, for visual appeal)
    const baseWeaver = this.createBaseWeaver(config, spokePositions);
    if (baseWeaver) {
      meshes.push(baseWeaver);
    }

    return {
      meshes,
      spokePositions,
    };
  }

  /**
   * Create initial circular weaver that wraps around base spokes
   * This represents the first row of weaving that secures the spokes
   * @private
   */
  static createBaseWeaver(config, spokePositions) {
    const {
      baseRadius,
      baseWeaverThickness,
      weaverMaterial,
      curveSegments = 64,
      radialSegments = 8,
    } = config;

    const points = [];
    const numSegments = curveSegments;

    // Create circular path that weaves over/under spokes
    for (let i = 0; i <= numSegments; i++) {
      const t = i / numSegments;
      const angle = t * Math.PI * 2;

      // Find which spoke we're near
      const spokeIndex = Math.floor(t * spokePositions.length);
      const isOver = spokeIndex % 2 === 0;

      // Slight radial variation for over/under effect
      const offsetMultiplier = 1.5;
      const radialOffset = isOver
        ? baseWeaverThickness * offsetMultiplier
        : -baseWeaverThickness * offsetMultiplier;

      const innerRadius = baseRadius * 0.3; // Start weaver at 30% radius
      const r = innerRadius + radialOffset;

      const x = Math.cos(angle) * r;
      const z = Math.sin(angle) * r;
      const y = isOver ? baseWeaverThickness : -baseWeaverThickness * 0.5;

      points.push(new THREE.Vector3(x, y, z));
    }

    // Create tube from points
    const curve = new THREE.CatmullRomCurve3(points);
    curve.closed = true;

    const geometry = new THREE.TubeGeometry(
      curve,
      curveSegments,
      baseWeaverThickness,
      radialSegments,
      true
    );

    const material = materialLibrary.getMaterial(weaverMaterial || 'lightWood');
    const mesh = new THREE.Mesh(geometry, material);

    return mesh;
  }

  /**
   * Create a flat circular base (alternative to radial spokes)
   * Simpler but less realistic
   *
   * @param {Object} config - Basket configuration
   * @returns {Object} { meshes: Array<THREE.Mesh>, spokePositions: Array<Object> }
   */
  static createFlatBase(config) {
    const {
      baseRadius,
      numSpokes,
      baseMaterial,
    } = config;

    const geometry = new THREE.CircleGeometry(baseRadius, 32);
    const material = materialLibrary.getMaterial(baseMaterial || 'naturalWood');
    const mesh = new THREE.Mesh(geometry, material);
    mesh.rotation.x = -Math.PI / 2;

    // Create spoke positions around perimeter
    const spokePositions = [];
    for (let i = 0; i < numSpokes; i++) {
      const angle = (i / numSpokes) * Math.PI * 2;
      spokePositions.push({
        angle: angle,
        position: new THREE.Vector3(
          Math.cos(angle) * baseRadius,
          0,
          Math.sin(angle) * baseRadius
        ),
        index: i,
      });
    }

    return {
      meshes: [mesh],
      spokePositions,
    };
  }

  /**
   * Dispose of base meshes
   */
  static dispose(meshes) {
    meshes.forEach(mesh => {
      if (mesh.geometry) mesh.geometry.dispose();
      if (mesh.material) mesh.material.dispose();
    });
  }
}
