/*//////////////////////////////////////////////////////////////
                    PERFORMANCE MONITORING
//////////////////////////////////////////////////////////////*/

/**
 * @title Performance Monitoring Utilities
 * @author ATrnd
 * @notice Provides tools for monitoring and displaying performance metrics
 * @dev Implements FPS counter, triangle counter, and frame timing measurements
 */

import Stats from 'three/examples/jsm/libs/stats.module.js';
import { PERFORMANCE } from '../config/settings.js';
import { getBuilding } from '../building/buildingManager.js';

/*//////////////////////////////////////////////////////////////
                        STATE VARIABLES
//////////////////////////////////////////////////////////////*/

/**
 * @notice Stats.js instance for FPS monitoring
 * @dev Provides real-time performance monitoring via Stats.js
 */
let stats;

/**
 * @notice Current triangle count in the scene
 * @dev Tracks the number of triangles in the current building model
 */
let triangleCount = 0;

/**
 * @notice DOM element for triangle count display
 * @dev Container showing the current triangle count
 */
let triangleCountDisplay;

/*//////////////////////////////////////////////////////////////
                        FPS MONITORING
//////////////////////////////////////////////////////////////*/

/**
 * @notice Initialize the Stats.js FPS monitor
 * @dev Creates and configures the Stats.js instance for performance tracking
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

/*//////////////////////////////////////////////////////////////
                    TRIANGLE COUNT MONITORING
//////////////////////////////////////////////////////////////*/

/**
 * @notice Create the triangle count display
 * @dev Builds DOM element for showing triangle count
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
 * @notice Count the number of triangles in a 3D object
 * @dev Traverses object hierarchy to calculate total triangle count
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
 * @notice Update the triangle count display
 * @dev Recounts triangles in the current building and updates display
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

/*//////////////////////////////////////////////////////////////
                    FRAME TIMING MEASUREMENT
//////////////////////////////////////////////////////////////*/

/**
 * @notice Begin performance measurement for the current frame
 * @dev Called at the start of each frame in the animation loop
 */
export function beginPerformanceMeasurement() {
  if (stats) {
    stats.begin();
  }
}

/**
 * @notice End performance measurement for the current frame
 * @dev Called at the end of each frame in the animation loop
 */
export function endPerformanceMeasurement() {
  if (stats) {
    stats.end();
  }
}

/*//////////////////////////////////////////////////////////////
                        INITIALIZATION
//////////////////////////////////////////////////////////////*/

/**
 * @notice Initialize all performance monitoring
 * @dev Sets up both FPS and triangle count monitoring
 */
export function initPerformanceMonitoring() {
  initFPSMonitor();
  createTriangleCountDisplay();
}

/*//////////////////////////////////////////////////////////////
                        ACCESSOR FUNCTIONS
//////////////////////////////////////////////////////////////*/

/**
 * @notice Get the current stats instance
 * @dev Provides access to the Stats.js instance
 * @returns {Stats} Stats.js instance
 */
export function getStats() {
  return stats;
}

/**
 * @notice Get the current triangle count
 * @dev Returns the cached triangle count
 * @returns {number} Triangle count
 */
export function getTriangleCount() {
  return triangleCount;
}
