// core/scene.js
// Scene, camera, renderer and basic environment setup

import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { CAMERA_SETTINGS, CONTROLS_SETTINGS } from '../config/settings.js';

// Main scene components
let scene;
let camera;
let renderer;
let controls;
let container;

/**
 * Initialize the 3D scene with camera, renderer, controls and basic environment
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

/**
 * Set up standard lighting for the scene
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

/**
 * Handle window resize events
 */
function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}

/**
 * Get the scene instance
 * @returns {THREE.Scene}
 */
export function getScene() {
  return scene;
}

/**
 * Get the camera instance
 * @returns {THREE.PerspectiveCamera}
 */
export function getCamera() {
  return camera;
}

/**
 * Get the renderer instance
 * @returns {THREE.WebGLRenderer}
 */
export function getRenderer() {
  return renderer;
}

/**
 * Get the controls instance
 * @returns {OrbitControls}
 */
export function getControls() {
  return controls;
}

