/*//////////////////////////////////////////////////////////////
                        ANIMATION LOOP
//////////////////////////////////////////////////////////////*/

/**
 * @title Animation Loop Manager
 * @author ATrnd
 * @notice Manages the main rendering and animation loop
 * @dev Controls frame timing, performance monitoring, and scene updates
 */

import { getRenderer, getScene, getCamera, getControls } from './scene.js';
import { beginPerformanceMeasurement, endPerformanceMeasurement } from '../utils/performance.js';
import { updateAutoRotation } from '../utils/controls.js';

/*//////////////////////////////////////////////////////////////
                        STATE VARIABLES
//////////////////////////////////////////////////////////////*/

/**
 * @notice Flag indicating if animation is currently running
 * @dev Used to prevent multiple animation loops from starting
 */
let isAnimating = false;

/**
 * @notice ID returned by requestAnimationFrame
 * @dev Used to cancel animation when needed
 */
let animationFrameId = null;

/*//////////////////////////////////////////////////////////////
                    ANIMATION CORE FUNCTIONS
//////////////////////////////////////////////////////////////*/

/**
 * @notice Main animation loop
 * @dev Executed once per frame, handles updates and rendering
 *      Order of operations:
 *      1. Request next frame
 *      2. Begin performance measurement
 *      3. Update scene elements (rotation, controls)
 *      4. Render the scene
 *      5. End performance measurement
 */
function animate() {
  // Request next frame first to ensure smoother animation
  animationFrameId = requestAnimationFrame(animate);

  // Begin performance measurement
  beginPerformanceMeasurement();

  // Update auto-rotation if enabled
  updateAutoRotation();

  // Update controls
  const controls = getControls();
  if (controls) {
    controls.update();
  }

  // Render the scene
  const renderer = getRenderer();
  const scene = getScene();
  const camera = getCamera();

  if (renderer && scene && camera) {
    renderer.render(scene, camera);
  }

  // End performance measurement
  endPerformanceMeasurement();
}

/*//////////////////////////////////////////////////////////////
                    ANIMATION CONTROL FUNCTIONS
//////////////////////////////////////////////////////////////*/

/**
 * @notice Start the animation loop
 * @dev Prevents multiple animation loops by checking if one is already running
 */
export function startAnimation() {
  if (!isAnimating) {
    isAnimating = true;
    animate();
  }
}

/**
 * @notice Stop the animation loop
 * @dev Cancels the animation frame request and updates state
 */
export function stopAnimation() {
  if (isAnimating && animationFrameId !== null) {
    cancelAnimationFrame(animationFrameId);
    animationFrameId = null;
    isAnimating = false;
  }
}

/**
 * @notice Check if animation is currently running
 * @dev Used to determine animation state for UI and other components
 * @returns {boolean} Animation state
 */
export function isAnimationRunning() {
  return isAnimating;
}
