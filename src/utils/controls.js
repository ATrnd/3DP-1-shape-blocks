// utils/controls.js
// User controls and interaction handling

import * as THREE from 'three';
import { AUTOROTATION } from '../config/settings.js';
import { getCamera, getControls } from '../core/scene.js';

// Auto-rotation state
let isAutoRotating = AUTOROTATION.enabled;
const autoRotateSpeed = AUTOROTATION.speed; // Degrees per frame

/**
 * Initialize all controls and event listeners
 */
export function initControls() {
  // Get the controls instance
  const controls = getControls();

  if (controls) {
    // Setup auto-rotation disable on user interaction
    controls.addEventListener('start', disableAutoRotationOnInteraction);
  }

  // Setup keyboard controls
  window.addEventListener('keydown', handleKeyPress);
}

/**
 * Handle keyboard input
 * @param {KeyboardEvent} event - Keyboard event
 */
function handleKeyPress(event) {
  // Press 'R' to toggle rotation
  if (event.key.toLowerCase() === 'r') {
    toggleAutoRotation();
  }
}

/**
 * Disable auto-rotation when user interacts with controls
 */
function disableAutoRotationOnInteraction() {
  if (isAutoRotating) {
    isAutoRotating = false;
    console.log('Auto-rotation disabled due to user interaction');
  }
}

/**
 * Toggle auto-rotation on/off
 */
export function toggleAutoRotation() {
  isAutoRotating = !isAutoRotating;
  console.log(`Auto-rotation: ${isAutoRotating ? 'enabled' : 'disabled'}`);
}

/**
 * Update the auto-rotation for the current frame
 */
export function updateAutoRotation() {
  // Only rotate if auto-rotation is enabled
  if (!isAutoRotating) return;

  const camera = getCamera();
  const controls = getControls();

  if (!camera || !controls) return;

  // Rotate the camera around the target point
  const currentPosition = new THREE.Vector3().copy(camera.position);
  const target = new THREE.Vector3().copy(controls.target);

  // Calculate the direction from target to camera
  const direction = currentPosition.sub(target);

  // Rotate direction around Y axis
  const angle = autoRotateSpeed * (Math.PI / 180); // Convert to radians
  const x = direction.x * Math.cos(angle) - direction.z * Math.sin(angle);
  const z = direction.x * Math.sin(angle) + direction.z * Math.cos(angle);
  direction.x = x;
  direction.z = z;

  // Update camera position
  camera.position.copy(direction.add(target));
  camera.lookAt(controls.target);
}

/**
 * Check if auto-rotation is currently enabled
 * @returns {boolean} Auto-rotation state
 */
export function isAutoRotationEnabled() {
  return isAutoRotating;
}

/**
 * Get the auto-rotation speed
 * @returns {number} Speed in degrees per frame
 */
export function getAutoRotationSpeed() {
  return autoRotateSpeed;
}

/**
 * Add a visual UI toggle button for rotation (optional)
 */
export function addRotationToggle() {
  const button = document.createElement('button');
  button.innerHTML = '⟳ Toggle Rotation';
  button.className = 'fixed top-4 left-4 bg-white bg-opacity-70 px-3 py-2 rounded shadow hover:bg-opacity-100';
  button.addEventListener('click', () => {
    toggleAutoRotation();
    button.innerHTML = isAutoRotating ? '⟳ Stop Rotation' : '⟳ Start Rotation';
  });
  document.body.appendChild(button);

  return button;
}

