/*//////////////////////////////////////////////////////////////
                    BUILDING MANAGER
//////////////////////////////////////////////////////////////*/

/**
 * @title Building Manager
 * @author ATrnd
 * @notice Manages the construction and visualization of 3D building components
 * @dev Controls the creation, positioning, and material application of building elements
 *      based on ownership status
 */

import * as THREE from 'three';
import { BUILDING_CONFIG, BLOCK_OWNERSHIP } from '../config/settings.js';
import { applyMaterials, createUnownedMaterial } from '../materials/materialManager.js';
import { getScene } from '../core/scene.js';

/*//////////////////////////////////////////////////////////////
                        STATE VARIABLES
//////////////////////////////////////////////////////////////*/

/**
 * @notice Reference to the current building
 * @dev THREE.Group containing all block groups and floors
 */
let building;

/**
 * @notice Reference to the original model
 * @dev Stored to create consistent floor clones
 */
let originalModel;

/**
 * @notice Reference to the bounding box helper
 * @dev Visual aid that shows the building's boundaries
 */
let boxHelper;

/*//////////////////////////////////////////////////////////////
                     BUILDING CONSTRUCTION
//////////////////////////////////////////////////////////////*/

/**
 * @notice Create block groups for organizing the building
 * @dev Creates a hierarchical structure of THREE.Groups with named blocks
 * @returns {Object} Map of block groups indexed by block_id
 */
function createBlockGroups() {
  // Create a group to hold the entire building
  building = new THREE.Group();

  // Create groups for each block
  const blockGroups = {
    block_1: new THREE.Group(),
    block_2: new THREE.Group(),
    block_3: new THREE.Group(),
    block_4: new THREE.Group()
  };

  // Add all block groups to the building
  for (const blockKey in blockGroups) {
    // Set the name property to match the block key
    blockGroups[blockKey].name = blockKey;
    building.add(blockGroups[blockKey]);
  }

  return blockGroups;
}

/**
 * @notice Create and position a floor
 * @dev Clones the original model and positions it based on floor index
 * @param {THREE.Object3D} model - The model to use for this floor
 * @param {number} floorIndex - The floor number (0-based)
 * @param {THREE.Vector3} center - The center point of the model
 * @param {number} modelHeight - The height of a single floor
 * @returns {THREE.Object3D} The created floor
 */
function createFloor(model, floorIndex, center, modelHeight) {
  // Clone the model for this floor
  const floor = model.clone();

  // Center each floor horizontally, but stack vertically
  floor.position.x = -center.x;
  floor.position.z = -center.z;
  floor.position.y = -center.y + (floorIndex * modelHeight);

  return floor;
}

/**
 * @notice Construct the building from the loaded model
 * @dev Creates the full building structure with organized blocks and floors
 * @param {THREE.Object3D} model - The loaded base model
 * @returns {THREE.Object3D} The constructed building
 */
export function constructBuilding(model) {
  // Store the original model
  originalModel = model.clone();

  // Create block groups
  const blockGroups = createBlockGroups();

  // Calculate model dimensions for stacking
  const boundingBox = new THREE.Box3().setFromObject(originalModel);
  const center = boundingBox.getCenter(new THREE.Vector3());
  const size = boundingBox.getSize(new THREE.Vector3());
  const modelHeight = size.y;

  console.log('Model height for stacking:', modelHeight);

  // Build each floor and organize by block
  for (let floorIndex = 0; floorIndex < BUILDING_CONFIG.totalFloors; floorIndex++) {
    // Create floor positioned correctly in the stack
    const floor = createFloor(originalModel, floorIndex, center, modelHeight);

    // Determine which block this floor belongs to
    const blockIndex = Math.floor(floorIndex / BUILDING_CONFIG.floorsPerBlock);
    const blockKey = `block_${blockIndex + 1}`;

    // Apply material based on ownership
    const isOwned = BLOCK_OWNERSHIP[blockKey];
    applyMaterials(floor, isOwned);

    // Add to the appropriate block group
    if (blockGroups[blockKey]) {
      blockGroups[blockKey].add(floor);
      console.log(`Added floor ${floorIndex} to ${blockKey} with ${isOwned ? 'owned' : 'unowned'} material`);
    }
  }

  return building;
}

/*//////////////////////////////////////////////////////////////
                        SCENE MANAGEMENT
//////////////////////////////////////////////////////////////*/

/**
 * @notice Add the building to the scene with bounding box helper
 * @dev Adds both the building group and a visual bounding box to the scene
 */
export function addBuildingToScene() {
  const scene = getScene();
  if (building && scene) {
    scene.add(building);

    // Add bounding box helper
    boxHelper = new THREE.BoxHelper(building, 0xffff00);
    scene.add(boxHelper);
  }
}

/**
 * @notice Remove the building from the scene including bounding box helper
 * @dev Cleans up all building-related objects from the scene
 */
export function removeBuildingFromScene() {
  const scene = getScene();
  if (building && scene) {
    scene.remove(building);

    // Remove box helper if it exists
    if (boxHelper) {
      scene.remove(boxHelper);
    }
  }
}

/*//////////////////////////////////////////////////////////////
                        ACCESSOR FUNCTIONS
//////////////////////////////////////////////////////////////*/

/**
 * @notice Get the current building
 * @dev Provides access to the main building group
 * @returns {THREE.Group} The building group
 */
export function getBuilding() {
  return building;
}

/**
 * @notice Get the original model
 * @dev Provides access to the original model for cloning or reference
 * @returns {THREE.Object3D} The original model
 */
export function getOriginalModel() {
  return originalModel;
}

/*//////////////////////////////////////////////////////////////
                    OWNERSHIP MANAGEMENT
//////////////////////////////////////////////////////////////*/

/**
 * @notice Update the ownership status of a block
 * @dev Changes material properties of all meshes in a block based on ownership
 * @param {string} blockKey - The block key (e.g., 'block_1')
 * @param {boolean} isOwned - The new ownership status
 */
export function updateBlockOwnership(blockKey, isOwned) {
  // Update the configuration
  BLOCK_OWNERSHIP[blockKey] = isOwned;

  // Update the materials of the affected block
  if (building) {
    // Find the block group by name
    const blockGroup = building.children.find(child => child.name === blockKey);

    if (blockGroup) {
      console.log(`Updating ${blockKey} ownership to ${isOwned ? 'owned' : 'unowned'}`);

      blockGroup.traverse(child => {
        if (child.isMesh) {
          if (isOwned) {
            // If we're switching to owned and we saved the original material, restore it
            if (child.userData.originalMaterial) {
              child.material = child.userData.originalMaterial;
              console.log("Restored original material for now owned mesh:", child.name);
            }
          } else {
            // If we're switching to unowned, save current material and apply wireframe
            if (!child.userData.originalMaterial) {
              // Store original material before replacing it
              if (Array.isArray(child.material)) {
                child.userData.originalMaterial = child.material.map(mat => mat.clone());
              } else {
                child.userData.originalMaterial = child.material.clone();
              }
            }

            // Apply wireframe material
            const wireMaterial = createUnownedMaterial();
            child.material = wireMaterial;
            console.log("Applied wireframe material to unowned mesh:", child.name);
          }
        }
      });
    } else {
      console.warn(`Block group '${blockKey}' not found in building. Available children:`,
        building.children.map(child => child.name).join(', '));
    }
  } else {
    console.warn('Building not created yet, ownership will be applied when it is constructed');
  }
}
