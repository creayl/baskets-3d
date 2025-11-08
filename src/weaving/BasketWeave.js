import * as THREE from 'three';

export class BasketWeave {
  constructor(scene, params) {
    this.scene = scene;
    this.params = params;
    this.stakes = [];
    this.weavers = [];
  }

  create() {
    this.clear();
    this.createVerticalStakes();
    this.createHorizontalWeavers();
  }

  clear() {
    // Remove old stakes
    this.stakes.forEach(stake => {
      stake.geometry.dispose();
      stake.material.dispose();
      this.scene.remove(stake);
    });
    this.stakes = [];

    // Remove old weavers
    this.weavers.forEach(weaver => {
      weaver.geometry.dispose();
      weaver.material.dispose();
      this.scene.remove(weaver);
    });
    this.weavers = [];
  }

  createVerticalStakes() {
    const numStakes = this.params.numStakes;
    const radius = this.params.basketRadius;
    const height = this.params.basketHeight;
    const stakeThickness = this.params.stakeThickness;

    for (let i = 0; i < numStakes; i++) {
      const angle = (i / numStakes) * Math.PI * 2;
      const x = Math.cos(angle) * radius;
      const z = Math.sin(angle) * radius;

      const geometry = new THREE.CylinderGeometry(
        stakeThickness,
        stakeThickness,
        height,
        8
      );
      const material = new THREE.MeshStandardMaterial({
        color: 0x8B4513,  // Dark brown
        roughness: 0.8,
        metalness: 0.1
      });

      const stake = new THREE.Mesh(geometry, material);
      stake.position.set(x, height / 2, z);
      this.scene.add(stake);
      this.stakes.push(stake);
    }
  }

  createHorizontalWeavers() {
    const numStakes = this.params.numStakes;
    const radius = this.params.basketRadius;
    const height = this.params.basketHeight;
    const weaverThickness = this.params.weaverThickness;
    const weaverSpacing = this.params.weaverSpacing;

    const numRows = Math.floor(height / weaverSpacing);

    for (let row = 0; row < numRows; row++) {
      const y = row * weaverSpacing + weaverSpacing / 2;
      const startOffset = row % 2;  // Alternate starting pattern for checkerboard

      // Create path for this weaver going over/under stakes
      const points = [];
      const segments = numStakes * 20;  // Smooth curve

      for (let i = 0; i <= segments; i++) {
        const t = i / segments;
        const angle = t * Math.PI * 2;

        // Determine which stake we're at
        const stakeIndex = Math.floor(t * numStakes);
        const isOver = (stakeIndex + startOffset) % 2 === 0;

        // Radial offset for over/under effect
        const overUnderOffset = isOver ? weaverThickness * 2 : -weaverThickness * 2;

        const r = radius + overUnderOffset;
        const x = Math.cos(angle) * r;
        const z = Math.sin(angle) * r;

        points.push(new THREE.Vector3(x, y, z));
      }

      // Create tube geometry from points
      const curve = new THREE.CatmullRomCurve3(points);
      curve.closed = true;

      const geometry = new THREE.TubeGeometry(
        curve,
        segments,
        weaverThickness,
        8,
        true  // closed
      );

      const material = new THREE.MeshStandardMaterial({
        color: row % 2 === 0 ? 0xD2691E : 0xCD853F,  // Alternate colors
        roughness: 0.8,
        metalness: 0.1
      });

      const weaver = new THREE.Mesh(geometry, material);
      this.scene.add(weaver);
      this.weavers.push(weaver);
    }
  }
}
