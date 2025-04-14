// core/animation.js
// Animation loop management

import { getRenderer, getScene, getCamera, getControls } from './scene.js';
import { beginPerformanceMeasurement, endPerformanceMeasurement } from '../utils/performance.js';
import { updateAutoRotation } from '../utils/controls.js';

// Animation state
let isAnimating = false;
let animationFrameId = null;

/**
 * Main animation loop
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

/**
 * Start the animation loop
 */
export function startAnimation() {
  if (!isAnimating) {
    isAnimating = true;
    animate();
  }
}

/**
 * Stop the animation loop
 */
export function stopAnimation() {
  if (isAnimating && animationFrameId !== null) {
    cancelAnimationFrame(animationFrameId);
    animationFrameId = null;
    isAnimating = false;
  }
}

/**
 * Check if animation is currently running
 * @returns {boolean} Animation state
 */
export function isAnimationRunning() {
  return isAnimating;
}

