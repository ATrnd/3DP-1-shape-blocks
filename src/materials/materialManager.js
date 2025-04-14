// materials/materialManager.js
// Material creation and management

import * as THREE from 'three';
import { MATERIALS } from '../config/settings.js';

// Create a cache for materials to avoid duplicates
const materialCache = new Map();

/**
 * Create unowned material for wireframe display
 * @returns {THREE.Material} Wireframe material for unowned parts
 */
export function createUnownedMaterial() {
  const settings = MATERIALS.unowned;

  // Create the material if not already in cache
  if (!materialCache.has('unowned')) {
    const material = new THREE.MeshStandardMaterial({
      color: settings.color,
      roughness: settings.roughness,
      metalness: settings.metalness,
      wireframe: settings.wireframe,
      transparent: settings.transparent,
      opacity: settings.opacity,
      side: settings.side === 'double' ? THREE.DoubleSide : THREE.FrontSide
    });

    materialCache.set('unowned', material);
  }

  // Return a clone to avoid shared state issues
  return materialCache.get('unowned').clone();
}

/**
 * Apply materials to a mesh based on ownership
 * @param {THREE.Object3D} object - The object to apply materials to
 * @param {boolean} isOwned - Whether this part is owned
 * @returns {THREE.Object3D} The object with applied materials
 */
export function applyMaterials(object, isOwned) {
  object.traverse(child => {
    if (child.isMesh) {
      // Always clone the material to ensure no shared references
      if (Array.isArray(child.material)) {
        // Handle multi-material objects
        child.material = child.material.map(mat => mat.clone());
      } else {
        child.material = child.material.clone();
      }

      // Apply appropriate material based on ownership
      if (!isOwned) {
        // Store original material for potential later use
        child.userData.originalMaterial = child.material;

        // Apply wireframe material
        const wireMaterial = createUnownedMaterial();
        child.material = wireMaterial;

        console.log("Applied wireframe material to unowned mesh:", child.name);
      } else {
        console.log("Keeping original material for owned mesh:", child.name);
      }

      // Enable shadows in either case
      child.castShadow = true;
      child.receiveShadow = true;
    }
  });

  return object;
}

/**
 * Clear the material cache to free memory
 */
export function clearMaterialCache() {
  materialCache.clear();
}

