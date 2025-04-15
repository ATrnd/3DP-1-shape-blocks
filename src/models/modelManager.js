/*//////////////////////////////////////////////////////////////
                        MODEL MANAGER
//////////////////////////////////////////////////////////////*/

/**
 * @title Model Manager
 * @author ATrnd
 * @notice Manages 3D model loading, selection, and state tracking
 * @dev Provides a central interface for loading models and tracking the currently selected model
 */

import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { MODELS, DEFAULT_MODEL_INDEX } from './modelRegistry.js';
import { constructBuilding, addBuildingToScene, removeBuildingFromScene } from '../building/buildingManager.js';
import { getCamera, getControls } from '../core/scene.js';
import { updateTriangleCount } from '../utils/performance.js';
import { hideLoadingIndicator, showLoadingIndicator, updateLoadingProgress } from '../ui/loadingIndicator.js';

/*//////////////////////////////////////////////////////////////
                        STATE VARIABLES
//////////////////////////////////////////////////////////////*/

/**
 * @notice Current model index in the MODELS array
 * @dev Tracks which model is currently being displayed
 */
let currentModelIndex = DEFAULT_MODEL_INDEX;

/*//////////////////////////////////////////////////////////////
                        MODEL LOADING
//////////////////////////////////////////////////////////////*/

/**
 * @notice Load a 3D model by index
 * @dev Handles the complete model loading process including UI state and scene updates
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

/*//////////////////////////////////////////////////////////////
                        ACCESSOR FUNCTIONS
//////////////////////////////////////////////////////////////*/

/**
 * @notice Get the currently selected model index
 * @dev Provides access to the current model state
 * @returns {number} Current model index
 */
export function getCurrentModelIndex() {
  return currentModelIndex;
}

/**
 * @notice Get the list of available models
 * @dev Returns the complete model registry
 * @returns {Array} Array of model objects
 */
export function getAvailableModels() {
  return MODELS;
}

/*//////////////////////////////////////////////////////////////
                        MODEL SELECTION
//////////////////////////////////////////////////////////////*/

/**
 * @notice Select and load a model by index
 * @dev Public wrapper for loadModel with error handling
 * @param {number} modelIndex - Index of the model to load
 */
export function selectModel(modelIndex) {
  loadModel(modelIndex).catch(error => {
    console.error('Failed to load model:', error);
  });
}
