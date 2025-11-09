/**
 * BasketConfig.js
 * Central configuration for basket weaving parameters
 */

export const DEFAULT_CONFIG = {
  // Basket dimensions
  baseRadius: 5,
  height: 10,

  // Base structure
  numSpokes: 16,           // Number of radial spokes in base (becomes number of stakes)
  spokeThickness: 0.06,    // Thickness of base spokes
  baseWeaverThickness: 0.05, // Thickness of initial base weaver

  // Vertical stakes (extend from base spokes)
  stakeThickness: 0.08,    // Thickness of vertical stakes

  // Horizontal weavers
  weaverThickness: 0.1,    // Thickness of horizontal weaving strands
  weaverSpacing: 0.4,      // Vertical spacing between weaver rows

  // Pattern type
  patternType: 'plainWeave', // 'plainWeave', 'twill', 'twining', 'coiling'

  // Materials
  stakeMaterial: 'darkWood',
  weaverMaterial: 'lightWood',
  baseMaterial: 'naturalWood',

  // Rendering quality
  curveSegments: 64,       // Smoothness of curved weavers
  radialSegments: 8,       // Roundness of cylindrical elements
};

/**
 * Pattern-specific parameter definitions
 * Used to generate GUI controls dynamically
 */
export const PATTERN_PARAMETERS = {
  plainWeave: {
    weaverSpacing: {
      min: 0.2,
      max: 0.8,
      step: 0.05,
      default: 0.4,
      label: 'Weaver Spacing',
    },
  },

  twill: {
    weaverSpacing: {
      min: 0.2,
      max: 0.8,
      step: 0.05,
      default: 0.4,
      label: 'Weaver Spacing',
    },
    twillStep: {
      min: 2,
      max: 4,
      step: 1,
      default: 2,
      label: 'Twill Step (Over-N)',
    },
  },

  twining: {
    numStrands: {
      min: 2,
      max: 3,
      step: 1,
      default: 2,
      label: 'Number of Strands',
    },
    twistTightness: {
      min: 0.5,
      max: 2.0,
      step: 0.1,
      default: 1.0,
      label: 'Twist Tightness',
    },
  },
};

/**
 * Validation rules for configuration
 */
export function validateConfig(config) {
  const errors = [];

  if (config.baseRadius <= 0) {
    errors.push('baseRadius must be positive');
  }

  if (config.height <= 0) {
    errors.push('height must be positive');
  }

  if (config.numSpokes < 8) {
    errors.push('numSpokes must be at least 8 for structural integrity');
  }

  if (config.numSpokes % 2 !== 0) {
    errors.push('numSpokes should be even for proper weaving pattern');
  }

  if (config.weaverSpacing <= 0) {
    errors.push('weaverSpacing must be positive');
  }

  return {
    valid: errors.length === 0,
    errors,
  };
}

/**
 * Create a deep copy of config object
 */
export function cloneConfig(config) {
  return JSON.parse(JSON.stringify(config));
}
