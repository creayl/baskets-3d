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

    // Sinusoidal radial offset creates over/under weaving pattern
    // frequency determines how many times we go over/under per revolution
    const radialOffset = this.amplitude * Math.sin(angle * this.frequency);

    // Height progresses linearly from 0 to basketHeight
    // Add vertical displacement for over/under effect
    // When thread goes "out" (positive radialOffset), it rises up
    // When thread goes "in" (negative radialOffset), it dips down
    const verticalDisplacement = radialOffset * 0.15;
    const y = t * this.basketHeight + verticalDisplacement;

    // Convert to Cartesian coordinates
    const radius = this.basketRadius + radialOffset;
    const x = radius * Math.cos(angle);
    const z = radius * Math.sin(angle);

    return optionalTarget.set(x, y, z);
  }
}
