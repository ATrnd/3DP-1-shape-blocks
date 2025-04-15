/*//////////////////////////////////////////////////////////////
                    APPLICATION ENTRY POINT
//////////////////////////////////////////////////////////////*/

/**
 * @title Shape Blocks Application
 * @author ATrnd
 * @notice Main entry point and initialization for the 3D visualization application
 * @dev Coordinates startup sequence and module initialization
 */

import './style.css';

// Import core functionality
import { initScene } from './core/scene.js';
import { startAnimation } from './core/animation.js';

// Import utilities
import { initPerformanceMonitoring } from './utils/performance.js';
import { initControls } from './utils/controls.js';

// Import UI components
import { createLoadingIndicator } from './ui/loadingIndicator.js';
import { initModelSelector } from './ui/modelSelector.js';
import { initBlockController } from './ui/blockController.js';

// Import model functionality
import { selectModel } from './models/modelManager.js';
import { DEFAULT_MODEL_INDEX } from './models/modelRegistry.js';

/*//////////////////////////////////////////////////////////////
                    APPLICATION INITIALIZATION
//////////////////////////////////////////////////////////////*/

/**
 * @notice Initialize the application
 * @dev Handles the complete startup sequence in the correct dependency order:
 *      1. Scene initialization
 *      2. Performance monitoring
 *      3. User controls
 *      4. UI components
 *      5. Initial model loading
 *      6. Animation loop start
 */
function initApp() {
  console.log('Initializing application...');

  // Get the container element
  const container = document.getElementById('app');
  if (!container) {
    console.error('Container element #app not found!');
    return;
  }

  // Initialize the 3D scene
  initScene(container);

  // Initialize performance monitoring
  initPerformanceMonitoring();

  // Initialize user controls
  initControls();

  // Create loading indicator
  createLoadingIndicator();

  // Initialize model selector UI
  initModelSelector();

  // Initialize block controller UI (formerly phase controller)
  initBlockController();

  // Load the default model
  selectModel(DEFAULT_MODEL_INDEX);

  // Start the animation loop
  startAnimation();

  console.log('Application initialized successfully!');
}

/*//////////////////////////////////////////////////////////////
                    STARTUP SEQUENCE
//////////////////////////////////////////////////////////////*/

/**
 * @notice Start the application when the DOM is ready
 * @dev Entry point for the application
 */
document.addEventListener('DOMContentLoaded', initApp);
