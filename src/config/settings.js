// config/settings.js
// Global configuration settings

// Building configuration
export const BUILDING_CONFIG = {
  totalFloors: 12,        // Total number of floors in the building
  floorsPerBlock: 3,      // Number of floors per ownership block
};

// Block ownership configuration (simulate NFT ownership flags)
export const BLOCK_OWNERSHIP = {
  block_1: true,
  block_2: true,
  block_3: true,
  block_4: true
};

// Material settings
export const MATERIALS = {
  unowned: {
    color: 0xdddddd,      // Light gray color base
    roughness: 0.7,
    metalness: 0.1,
    wireframe: true,      // Wireframe to indicate unowned
    transparent: true,    // Allow transparency
    opacity: 0.5,         // More transparent for better contrast
    side: 'double'        // Render both sides to ensure visibility
  }
};

// Camera settings
export const CAMERA_SETTINGS = {
  fov: 75,
  near: 0.1,
  far: 1000,
  position: { x: -8.94, y: 8.00, z: 8.41 },
  target: { x: 1.58, y: 5.75, z: 0.80 }
};

// Controls settings
export const CONTROLS_SETTINGS = {
  enableDamping: true,
  dampingFactor: 0.05,
  screenSpacePanning: true,
  minDistance: 1,
  maxDistance: 50,
  maxPolarAngle: Math.PI
};

// Autorotation settings
export const AUTOROTATION = {
  enabled: true,
  speed: 0.3 // Degrees per frame
};

// Performance settings
export const PERFORMANCE = {
  stats: {
    displayMode: 0, // 0: fps, 1: ms, 2: mb, 3+: custom
    position: { top: '10px', left: '10px' }
  },
  triangleCounter: {
    position: { bottom: '10px', left: '10px' }
  }
};

