// index.js
// Main entry point for the application

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

/**
 * Initialize the application
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

// Start the application when the DOM is ready
document.addEventListener('DOMContentLoaded', initApp);

