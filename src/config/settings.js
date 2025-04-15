/*//////////////////////////////////////////////////////////////
                        CONFIGURATION SETTINGS
//////////////////////////////////////////////////////////////*/

/**
 * @title Global Configuration Settings
 * @author ATrnd
 * @notice Contains all configurable parameters for the 3D building visualization
 * @dev Centralized configuration to simplify adjustments and customization
 */

/*//////////////////////////////////////////////////////////////
                        BUILDING CONFIGURATION
//////////////////////////////////////////////////////////////*/

/**
 * @notice Building structural configuration
 * @dev Defines the fundamental structure of the visualized building
 * @param totalFloors Total number of floors to render in the building
 * @param floorsPerBlock Number of consecutive floors that form an ownership block
 */
export const BUILDING_CONFIG = {
  totalFloors: 12,        // Total number of floors in the building
  floorsPerBlock: 3,      // Number of floors per ownership block
};

/*//////////////////////////////////////////////////////////////
                        OWNERSHIP CONFIGURATION
//////////////////////////////////////////////////////////////*/

/**
 * @notice Block ownership configuration
 * @dev Maps block identifiers to ownership state
 *      true = owned (normal materials), false = unowned (wireframe)
 *      Simulates NFT ownership flags that would be retrieved from blockchain
 */
export const BLOCK_OWNERSHIP = {
  block_1: true,
  block_2: true,
  block_3: true,
  block_4: true
};

/*//////////////////////////////////////////////////////////////
                        MATERIAL CONFIGURATION
//////////////////////////////////////////////////////////////*/

/**
 * @notice Material settings for different visualization states
 * @dev Defines appearance properties for owned vs unowned block states
 * @param unowned Properties for unowned blocks (wireframe appearance)
 */
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

/*//////////////////////////////////////////////////////////////
                        CAMERA CONFIGURATION
//////////////////////////////////////////////////////////////*/

/**
 * @notice Camera settings for scene visualization
 * @dev Controls the perspective and initial position of the camera
 * @param fov Field of view in degrees
 * @param near Near clipping plane distance
 * @param far Far clipping plane distance
 * @param position Initial camera position coordinates
 * @param target Point the camera looks at (orbit center)
 */
export const CAMERA_SETTINGS = {
  fov: 75,
  near: 0.1,
  far: 1000,
  position: { x: -8.94, y: 8.00, z: 8.41 },
  target: { x: 1.58, y: 5.75, z: 0.80 }
};

/*//////////////////////////////////////////////////////////////
                        CONTROLS CONFIGURATION
//////////////////////////////////////////////////////////////*/

/**
 * @notice User control settings
 * @dev Configures behavior of OrbitControls for user interaction
 * @param enableDamping Whether to use inertia when moving the camera
 * @param dampingFactor Inertia factor (lower = more inertia)
 * @param screenSpacePanning Whether to pan parallel to the screen
 * @param minDistance Minimum zoom distance
 * @param maxDistance Maximum zoom distance
 * @param maxPolarAngle Maximum angle for orbital movement (prevents going below model)
 */
export const CONTROLS_SETTINGS = {
  enableDamping: true,
  dampingFactor: 0.05,
  screenSpacePanning: true,
  minDistance: 1,
  maxDistance: 50,
  maxPolarAngle: Math.PI
};

/*//////////////////////////////////////////////////////////////
                        ANIMATION CONFIGURATION
//////////////////////////////////////////////////////////////*/

/**
 * @notice Auto-rotation settings
 * @dev Controls automatic camera movement around the model
 * @param enabled Whether auto-rotation is active on initialization
 * @param speed Rotation speed in degrees per frame
 */
export const AUTOROTATION = {
  enabled: true,
  speed: 0.3 // Degrees per frame
};

/*//////////////////////////////////////////////////////////////
                        PERFORMANCE CONFIGURATION
//////////////////////////////////////////////////////////////*/

/**
 * @notice Performance monitoring settings
 * @dev Configures behavior and positioning of performance indicators
 * @param stats Settings for the FPS counter
 * @param triangleCounter Settings for polygon count display
 */
export const PERFORMANCE = {
  stats: {
    displayMode: 0, // 0: fps, 1: ms, 2: mb, 3+: custom
    position: { top: '10px', left: '10px' }
  },
  triangleCounter: {
    position: { bottom: '10px', left: '10px' }
  }
};
