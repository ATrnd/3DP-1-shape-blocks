/*//////////////////////////////////////////////////////////////
                            SCENE
//////////////////////////////////////////////////////////////*/

/**
 * @title Scene Manager
 * @author ATrnd
 * @notice Manages the 3D scene, camera, renderer and environment
 * @dev Handles initialization of Three.js core components and provides
 *      accessor methods for other modules to interact with the scene
 */

import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { CAMERA_SETTINGS, CONTROLS_SETTINGS } from '../config/settings.js';

/*//////////////////////////////////////////////////////////////
                        STATE VARIABLES
//////////////////////////////////////////////////////////////*/

/**
 * @notice The main Three.js scene
 * @dev Container for all 3D objects, lights, and helpers
 */
let scene;

/**
 * @notice The camera used to view the scene
 * @dev Perspective camera with configurable properties
 */
let camera;

/**
 * @notice The WebGL renderer
 * @dev Responsible for drawing the scene to the canvas
 */
let renderer;

/**
 * @notice Orbit controls for camera manipulation
 * @dev Allows user interaction with the scene via mouse/touch
 */
let controls;

/**
 * @notice Reference to the DOM container element
 * @dev The element where the renderer canvas is appended
 */
let container;

/*//////////////////////////////////////////////////////////////
                        INITIALIZATION
//////////////////////////////////////////////////////////////*/

/**
 * @notice Initialize the 3D scene with camera, renderer, controls and basic environment
 * @dev Sets up all core Three.js components according to configuration settings
 * @param {HTMLElement} domContainer - DOM element to attach the renderer
 * @returns {Object} - Object containing scene, camera, renderer, controls
 */
export function initScene(domContainer) {
  container = domContainer || document.getElementById('app');

  // Create scene
  scene = new THREE.Scene();
  scene.background = new THREE.Color(0xffffff);

  // Create camera
  camera = new THREE.PerspectiveCamera(
    CAMERA_SETTINGS.fov,
    window.innerWidth / window.innerHeight,
    CAMERA_SETTINGS.near,
    CAMERA_SETTINGS.far
  );
  camera.position.set(
    CAMERA_SETTINGS.position.x,
    CAMERA_SETTINGS.position.y,
    CAMERA_SETTINGS.position.z
  );

  // Create renderer
  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.shadowMap.enabled = false;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  container.appendChild(renderer.domElement);

  // Add orbit controls
  controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = CONTROLS_SETTINGS.enableDamping;
  controls.dampingFactor = CONTROLS_SETTINGS.dampingFactor;
  controls.screenSpacePanning = CONTROLS_SETTINGS.screenSpacePanning;
  controls.minDistance = CONTROLS_SETTINGS.minDistance;
  controls.maxDistance = CONTROLS_SETTINGS.maxDistance;
  controls.maxPolarAngle = CONTROLS_SETTINGS.maxPolarAngle;

  // Set target from settings
  controls.target.set(
    CAMERA_SETTINGS.target.x,
    CAMERA_SETTINGS.target.y,
    CAMERA_SETTINGS.target.z
  );

  // Add grid helper
  const gridHelper = new THREE.GridHelper(10, 10);
  scene.add(gridHelper);

  // Add lighting
  setupLighting();

  // Handle window resize
  window.addEventListener('resize', onWindowResize);

  return {
    scene,
    camera,
    renderer,
    controls
  };
}

/*//////////////////////////////////////////////////////////////
                        LIGHTING SETUP
//////////////////////////////////////////////////////////////*/

/**
 * @notice Set up standard lighting for the scene
 * @dev Creates a three-point lighting setup with ambient and directional lights
 */
function setupLighting() {
  // Ambient light
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
  scene.add(ambientLight);

  // Main directional light
  const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
  directionalLight.position.set(5, 10, 7.5);
  directionalLight.castShadow = true;
  scene.add(directionalLight);

  // Fill light
  const fillLight = new THREE.DirectionalLight(0xffffff, 0.3);
  fillLight.position.set(-5, 2, -5);
  scene.add(fillLight);
}

/*//////////////////////////////////////////////////////////////
                        EVENT HANDLERS
//////////////////////////////////////////////////////////////*/

/**
 * @notice Handle window resize events
 * @dev Updates camera aspect ratio and renderer size to match window dimensions
 */
function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}

/*//////////////////////////////////////////////////////////////
                        ACCESSOR FUNCTIONS
//////////////////////////////////////////////////////////////*/

/**
 * @notice Get the scene instance
 * @dev Provides access to the main Three.js scene for other modules
 * @returns {THREE.Scene} The current scene
 */
export function getScene() {
  return scene;
}

/**
 * @notice Get the camera instance
 * @dev Provides access to the perspective camera for positioning and updates
 * @returns {THREE.PerspectiveCamera} The current camera
 */
export function getCamera() {
  return camera;
}

/**
 * @notice Get the renderer instance
 * @dev Provides access to the WebGL renderer for customization
 * @returns {THREE.WebGLRenderer} The current renderer
 */
export function getRenderer() {
  return renderer;
}

/**
 * @notice Get the controls instance
 * @dev Provides access to the OrbitControls for interaction customization
 * @returns {OrbitControls} The current controls
 */
export function getControls() {
  return controls;
}
