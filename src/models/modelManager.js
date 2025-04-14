// models/modelManager.js
// Model loading and switching functionality

import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { MODELS, DEFAULT_MODEL_INDEX } from './modelRegistry.js';
import { constructBuilding, addBuildingToScene, removeBuildingFromScene } from '../building/buildingManager.js';
import { getCamera, getControls } from '../core/scene.js';
import { updateTriangleCount } from '../utils/performance.js';
import { hideLoadingIndicator, showLoadingIndicator, updateLoadingProgress } from '../ui/loadingIndicator.js';

// Track current model
let currentModelIndex = DEFAULT_MODEL_INDEX;

/**
 * Load a 3D model by index
 * @param {number} modelIndex - Index of the model in the MODELS array
 * @returns {Promise} Promise that resolves when model is loaded
 */
export function loadModel(modelIndex) {
  return new Promise((resolve, reject) => {
    if (modelIndex < 0 || modelIndex >= MODELS.length) {
      reject(new Error(`Invalid model index: ${modelIndex}`));
      return;
    }

    // Update current model index
    currentModelIndex = modelIndex;

    // Show loading indicator
    showLoadingIndicator();

    // Remove existing building from scene
    removeBuildingFromScene();

    // Get model path
    const modelPath = MODELS[modelIndex].path;

    // Create a new loader for this model
    const modelLoader = new GLTFLoader();

    modelLoader.load(
      modelPath,

      // Success callback
      function(gltf) {
        // Process successful load
        const building = constructBuilding(gltf.scene);
        addBuildingToScene();

        // Adjust camera
        const camera = getCamera();
        const controls = getControls();

        if (camera && controls) {
          controls.update();
        }

        // Update triangle count
        updateTriangleCount();

        // Hide loading indicator
        hideLoadingIndicator();

        resolve(building);
      },

      // Progress callback
      function(xhr) {
        const progress = (xhr.loaded / xhr.total * 100);
        updateLoadingProgress(Math.round(progress));
      },

      // Error callback
      function(error) {
        console.error('Error loading model:', error);
        hideLoadingIndicator(true, error.message);
        reject(error);
      }
    );
  });
}

/**
 * Get the currently selected model index
 * @returns {number} Current model index
 */
export function getCurrentModelIndex() {
  return currentModelIndex;
}

/**
 * Get the list of available models
 * @returns {Array} Array of model objects
 */
export function getAvailableModels() {
  return MODELS;
}

/**
 * Select and load a model by index
 * @param {number} modelIndex - Index of the model to load
 */
export function selectModel(modelIndex) {
  loadModel(modelIndex).catch(error => {
    console.error('Failed to load model:', error);
  });
}

