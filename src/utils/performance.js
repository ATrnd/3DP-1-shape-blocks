// utils/performance.js
// Performance monitoring utilities

import Stats from 'three/examples/jsm/libs/stats.module.js';
import { PERFORMANCE } from '../config/settings.js';
import { getBuilding } from '../building/buildingManager.js';

// Performance monitoring variables
let stats;
let triangleCount = 0;
let triangleCountDisplay;

/**
 * Initialize the Stats.js FPS monitor
 */
export function initFPSMonitor() {
  // Create Stats.js instance
  stats = new Stats();
  stats.showPanel(PERFORMANCE.stats.displayMode); // 0: fps, 1: ms, 2: mb, 3+: custom

  // Position the stats panel
  stats.dom.style.position = 'fixed';
  stats.dom.style.top = PERFORMANCE.stats.position.top;
  stats.dom.style.left = PERFORMANCE.stats.position.left;

  // Add to document
  document.body.appendChild(stats.dom);
}

/**
 * Create the triangle count display
 */
export function createTriangleCountDisplay() {
  // Create a container for the triangle count
  triangleCountDisplay = document.createElement('div');

  // Style the container
  triangleCountDisplay.style.position = 'fixed';
  triangleCountDisplay.style.bottom = PERFORMANCE.triangleCounter.position.bottom;
  triangleCountDisplay.style.left = PERFORMANCE.triangleCounter.position.left;
  triangleCountDisplay.style.backgroundColor = 'rgba(0, 0, 0, 0.7)';
  triangleCountDisplay.style.color = 'white';
  triangleCountDisplay.style.padding = '10px';
  triangleCountDisplay.style.borderRadius = '5px';
  triangleCountDisplay.style.fontFamily = 'monospace';
  triangleCountDisplay.style.fontSize = '12px';
  triangleCountDisplay.style.zIndex = '1000';

  // Add to document
  document.body.appendChild(triangleCountDisplay);
}

/**
 * Count the number of triangles in a 3D object
 * @param {THREE.Object3D} object - The object to count triangles in
 * @returns {number} The triangle count
 */
export function countTriangles(object) {
  let count = 0;

  object.traverse(node => {
    if (node.isMesh && node.geometry) {
      // Check if the geometry has an index buffer
      if (node.geometry.index !== null) {
        count += node.geometry.index.count / 3;
      } else if (node.geometry.attributes.position) {
        // If no index buffer, count position vertices and divide by 3
        count += node.geometry.attributes.position.count / 3;
      }
    }
  });

  return Math.round(count);
}

/**
 * Update the triangle count display
 */
export function updateTriangleCount() {
  const building = getBuilding();

  if (!triangleCountDisplay) {
    createTriangleCountDisplay();
  }

  if (triangleCountDisplay && building) {
    // Count triangles in the current building model
    triangleCount = countTriangles(building);
    triangleCountDisplay.textContent = `Triangles: ${triangleCount.toLocaleString()}`;
  }
}

/**
 * Begin performance measurement for the current frame
 */
export function beginPerformanceMeasurement() {
  if (stats) {
    stats.begin();
  }
}

/**
 * End performance measurement for the current frame
 */
export function endPerformanceMeasurement() {
  if (stats) {
    stats.end();
  }
}

/**
 * Initialize all performance monitoring
 */
export function initPerformanceMonitoring() {
  initFPSMonitor();
  createTriangleCountDisplay();
}

/**
 * Get the current stats instance
 * @returns {Stats} Stats.js instance
 */
export function getStats() {
  return stats;
}

/**
 * Get the current triangle count
 * @returns {number} Triangle count
 */
export function getTriangleCount() {
  return triangleCount;
}

