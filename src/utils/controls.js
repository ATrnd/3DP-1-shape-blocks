/*//////////////////////////////////////////////////////////////
                        USER CONTROLS
//////////////////////////////////////////////////////////////*/

/**
 * @title User Controls Manager
 * @author ATrnd
 * @notice Manages user interactions and camera controls
 * @dev Handles auto-rotation, keyboard inputs, and orbit control interactions
 */

import * as THREE from 'three';
import { AUTOROTATION } from '../config/settings.js';
import { getCamera, getControls } from '../core/scene.js';

/*//////////////////////////////////////////////////////////////
                        STATE VARIABLES
//////////////////////////////////////////////////////////////*/

/**
 * @notice Flag indicating if auto-rotation is currently enabled
 * @dev Controls whether the camera automatically rotates around the target
 */
let isAutoRotating = AUTOROTATION.enabled;

/**
 * @notice Speed of auto-rotation in degrees per frame
 * @dev Constant value defining rotation speed
 */
const autoRotateSpeed = AUTOROTATION.speed; // Degrees per frame

/*//////////////////////////////////////////////////////////////
                        INITIALIZATION
//////////////////////////////////////////////////////////////*/

/**
 * @notice Initialize all controls and event listeners
 * @dev Sets up orbit controls interaction handlers and keyboard listeners
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

/*//////////////////////////////////////////////////////////////
                        EVENT HANDLERS
//////////////////////////////////////////////////////////////*/

/**
 * @notice Handle keyboard input
 * @dev Processes key presses for control actions
 * @param {KeyboardEvent} event - Keyboard event
 */
function handleKeyPress(event) {
  // Press 'R' to toggle rotation
  if (event.key.toLowerCase() === 'r') {
    toggleAutoRotation();
  }
}

/**
 * @notice Disable auto-rotation when user interacts with controls
 * @dev Called when user starts manipulating the orbit controls
 */
function disableAutoRotationOnInteraction() {
  if (isAutoRotating) {
    isAutoRotating = false;
    console.log('Auto-rotation disabled due to user interaction');
  }
}

/*//////////////////////////////////////////////////////////////
                    AUTO-ROTATION MANAGEMENT
//////////////////////////////////////////////////////////////*/

/**
 * @notice Toggle auto-rotation on/off
 * @dev Switches between enabled and disabled states for auto-rotation
 */
export function toggleAutoRotation() {
  isAutoRotating = !isAutoRotating;
  console.log(`Auto-rotation: ${isAutoRotating ? 'enabled' : 'disabled'}`);
}

/**
 * @notice Update the auto-rotation for the current frame
 * @dev Rotates the camera position around the target when auto-rotation is enabled
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

/*//////////////////////////////////////////////////////////////
                        ACCESSOR FUNCTIONS
//////////////////////////////////////////////////////////////*/

/**
 * @notice Check if auto-rotation is currently enabled
 * @dev Returns the current state of auto-rotation
 * @returns {boolean} Auto-rotation state
 */
export function isAutoRotationEnabled() {
  return isAutoRotating;
}

/**
 * @notice Get the auto-rotation speed
 * @dev Returns the constant rotation speed in degrees per frame
 * @returns {number} Speed in degrees per frame
 */
export function getAutoRotationSpeed() {
  return autoRotateSpeed;
}

/*//////////////////////////////////////////////////////////////
                        UI ELEMENTS
//////////////////////////////////////////////////////////////*/

/**
 * @notice Add a visual UI toggle button for rotation (optional)
 * @dev Creates and adds a button element to toggle rotation
 * @returns {HTMLElement} The created button element
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
