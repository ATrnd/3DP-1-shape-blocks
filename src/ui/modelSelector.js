/*//////////////////////////////////////////////////////////////
                        MODEL SELECTOR
//////////////////////////////////////////////////////////////*/

/**
 * @title Model Selector
 * @author ATrnd
 * @notice UI component for selecting different 3D models
 * @dev Creates and manages interactive model selection interface
 */

import { getAvailableModels, getCurrentModelIndex, selectModel } from '../models/modelManager.js';

/*//////////////////////////////////////////////////////////////
                        STATE VARIABLES
//////////////////////////////////////////////////////////////*/

/**
 * @notice Reference to the selector container element
 * @dev DOM element containing the model selection UI
 */
let selectorContainer;

/*//////////////////////////////////////////////////////////////
                        UI CREATION
//////////////////////////////////////////////////////////////*/

/**
 * @notice Create the model selector UI
 * @dev Builds DOM elements for the model selection interface
 * @returns {HTMLElement} The created model selector
 */
export function createModelSelector() {
  // Get available models
  const availableModels = getAvailableModels();
  const currentModelIndex = getCurrentModelIndex();

  // Create container for the model selector
  selectorContainer = document.createElement('div');
  selectorContainer.style.position = 'fixed';
  selectorContainer.style.top = '10px';
  selectorContainer.style.right = '10px';
  selectorContainer.style.backgroundColor = 'rgba(0, 0, 0, 0.7)';
  selectorContainer.style.color = 'white';
  selectorContainer.style.padding = '10px';
  selectorContainer.style.borderRadius = '5px';
  selectorContainer.style.fontFamily = 'sans-serif';
  selectorContainer.style.zIndex = '1000';

  // Add header
  const header = document.createElement('h3');
  header.textContent = 'Model Selection';
  header.style.margin = '0 0 10px 0';
  header.style.fontSize = '14px';
  selectorContainer.appendChild(header);

  // Create model buttons
  availableModels.forEach((model, index) => {
    const button = document.createElement('button');
    button.textContent = model.name;
    button.style.display = 'block';
    button.style.margin = '5px 0';
    button.style.padding = '8px 12px';
    button.style.width = '100%';
    button.style.backgroundColor = index === currentModelIndex ? '#4a5568' : '#2d3748';
    button.style.border = 'none';
    button.style.borderRadius = '4px';
    button.style.color = 'white';
    button.style.cursor = 'pointer';
    button.style.textAlign = 'left';

    // Hover effect
    button.addEventListener('mouseover', () => {
      button.style.backgroundColor = '#4a5568';
    });
    button.addEventListener('mouseout', () => {
      if (index !== getCurrentModelIndex()) {
        button.style.backgroundColor = '#2d3748';
      }
    });

    // Click event to switch models
    button.addEventListener('click', () => {
      if (index !== getCurrentModelIndex()) {
        selectModel(index);

        // Update button styles
        updateButtonStyles();
      }
    });

    selectorContainer.appendChild(button);

    // Add description if available
    if (model.description) {
      const description = document.createElement('div');
      description.textContent = model.description;
      description.style.fontSize = '12px';
      description.style.marginBottom = '10px';
      description.style.color = '#cbd5e0';
      selectorContainer.appendChild(description);
    }
  });

  // Add ID for easier querying
  selectorContainer.id = 'model-selector';

  document.body.appendChild(selectorContainer);

  return selectorContainer;
}

/*//////////////////////////////////////////////////////////////
                        UI UPDATES
//////////////////////////////////////////////////////////////*/

/**
 * @notice Update the visual state of model selector buttons
 * @dev Refreshes button styles to reflect the currently selected model
 */
export function updateButtonStyles() {
  const currentIndex = getCurrentModelIndex();

  if (selectorContainer) {
    const buttons = selectorContainer.querySelectorAll('button');
    buttons.forEach((btn, idx) => {
      btn.style.backgroundColor = idx === currentIndex ? '#4a5568' : '#2d3748';
    });
  }
}

/*//////////////////////////////////////////////////////////////
                        INITIALIZATION
//////////////////////////////////////////////////////////////*/

/**
 * @notice Initialize the model selector
 * @dev Creates and adds the selector to the DOM
 */
export function initModelSelector() {
  createModelSelector();
}

/*//////////////////////////////////////////////////////////////
                        ACCESSOR FUNCTIONS
//////////////////////////////////////////////////////////////*/

/**
 * @notice Get the model selector element
 * @dev Provides access to the selector DOM element
 * @returns {HTMLElement} The model selector container
 */
export function getModelSelector() {
  return selectorContainer;
}
