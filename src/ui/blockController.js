// ui/blockController.js
// Block ownership control UI component

import { BLOCK_OWNERSHIP } from '../config/settings.js';
import { updateBlockOwnership } from '../building/buildingManager.js';

// Reference to the block controller container
let controllerContainer;

/**
 * Create the block ownership controller UI
 * @returns {HTMLElement} The created block controller
 */
export function createBlockController() {
  // Create container for the block controller
  controllerContainer = document.createElement('div');
  controllerContainer.style.position = 'fixed';
  controllerContainer.style.bottom = '10px';
  controllerContainer.style.right = '10px';
  controllerContainer.style.backgroundColor = 'rgba(0, 0, 0, 0.7)';
  controllerContainer.style.color = 'white';
  controllerContainer.style.padding = '10px';
  controllerContainer.style.borderRadius = '5px';
  controllerContainer.style.fontFamily = 'sans-serif';
  controllerContainer.style.zIndex = '1000';

  // Add header
  const header = document.createElement('h3');
  header.textContent = 'Block Ownership';
  header.style.margin = '0 0 10px 0';
  header.style.fontSize = '14px';
  controllerContainer.appendChild(header);

  // Create toggle switches for each block
  Object.keys(BLOCK_OWNERSHIP).forEach(blockKey => {
    const blockNumber = blockKey.split('_')[1]; // Extract block number

    // Create row container
    const row = document.createElement('div');
    row.style.display = 'flex';
    row.style.justifyContent = 'space-between';
    row.style.alignItems = 'center';
    row.style.marginBottom = '8px';

    // Create label
    const label = document.createElement('label');
    label.textContent = `Block ${blockNumber}`;
    label.style.marginRight = '10px';
    row.appendChild(label);

    // Create toggle container and make it clickable
    const toggleContainer = document.createElement('div');
    toggleContainer.style.position = 'relative';
    toggleContainer.style.width = '40px';
    toggleContainer.style.height = '20px';
    toggleContainer.style.cursor = 'pointer';

    // Create the actual checkbox (invisible but functional)
    const input = document.createElement('input');
    input.type = 'checkbox';
    input.checked = BLOCK_OWNERSHIP[blockKey];
    input.id = `block-toggle-${blockKey}`;

    // Make input cover full toggle area for better clickability
    input.style.position = 'absolute';
    input.style.opacity = '0';
    input.style.width = '100%';
    input.style.height = '100%';
    input.style.margin = '0';
    input.style.zIndex = '2';
    input.style.cursor = 'pointer';

    // Create the visible slider
    const slider = document.createElement('span');
    slider.style.position = 'absolute';
    slider.style.cursor = 'pointer';
    slider.style.top = '0';
    slider.style.left = '0';
    slider.style.right = '0';
    slider.style.bottom = '0';
    slider.style.backgroundColor = BLOCK_OWNERSHIP[blockKey] ? '#4CAF50' : '#ccc';
    slider.style.transition = '.4s';
    slider.style.borderRadius = '34px';
    slider.style.zIndex = '1';

    // Create the knob
    const knob = document.createElement('span');
    knob.style.position = 'absolute';
    knob.style.content = '""';
    knob.style.height = '16px';
    knob.style.width = '16px';
    knob.style.left = BLOCK_OWNERSHIP[blockKey] ? '22px' : '2px';
    knob.style.bottom = '2px';
    knob.style.backgroundColor = 'white';
    knob.style.transition = '.4s';
    knob.style.borderRadius = '50%';

    // Assemble the toggle
    slider.appendChild(knob);
    toggleContainer.appendChild(input);
    toggleContainer.appendChild(slider);
    row.appendChild(toggleContainer);

    // Add event listener to the toggle container for better clickability
    toggleContainer.addEventListener('click', (event) => {
      // This ensures clicking anywhere on the toggle works
      // Toggle the checked state
      input.checked = !input.checked;
      const isOwned = input.checked;

      // Log the interaction
      console.log(`Toggle changed for ${blockKey} to ${isOwned}`);

      // Update visuals
      slider.style.backgroundColor = isOwned ? '#4CAF50' : '#ccc';
      knob.style.left = isOwned ? '22px' : '2px';

      // Update ownership and rebuild materials
      updateBlockOwnership(blockKey, isOwned);

      // Prevent event from reaching the checkbox directly
      event.stopPropagation();
    });

    // Also keep the original change handler on the input for keyboard accessibility
    input.addEventListener('change', (event) => {
      const isOwned = event.target.checked;

      // Log the interaction
      console.log(`Input changed for ${blockKey} to ${isOwned}`);

      // Update visuals
      slider.style.backgroundColor = isOwned ? '#4CAF50' : '#ccc';
      knob.style.left = isOwned ? '22px' : '2px';

      // Update ownership and rebuild materials
      updateBlockOwnership(blockKey, isOwned);
    });

      // Add click handler to the toggle container
      toggleContainer.addEventListener('click', () => {
          // Toggle the checkbox state
          input.checked = !input.checked;

          // Update visuals manually
          const isOwned = input.checked;
          slider.style.backgroundColor = isOwned ? '#4CAF50' : '#ccc';
          knob.style.left = isOwned ? '22px' : '2px';

          // Update the ownership
          updateBlockOwnership(blockKey, isOwned);
      });

    controllerContainer.appendChild(row);
  });

  // Add "Toggle All" button
  const toggleAllRow = document.createElement('div');
  toggleAllRow.style.marginTop = '15px';
  toggleAllRow.style.textAlign = 'center';

  const toggleAllButton = document.createElement('button');
  toggleAllButton.textContent = 'Toggle All Blocks';
  toggleAllButton.style.padding = '6px 12px';
  toggleAllButton.style.backgroundColor = '#3f4f5f';
  toggleAllButton.style.border = 'none';
  toggleAllButton.style.borderRadius = '4px';
  toggleAllButton.style.color = 'white';
  toggleAllButton.style.cursor = 'pointer';

  // Add hover effect
  toggleAllButton.addEventListener('mouseover', () => {
    toggleAllButton.style.backgroundColor = '#566a82';
  });

  toggleAllButton.addEventListener('mouseout', () => {
    toggleAllButton.style.backgroundColor = '#3f4f5f';
  });

  // Add toggle all functionality
  toggleAllButton.addEventListener('click', () => {
    // Check if all blocks are currently owned
    const allOwned = Object.values(BLOCK_OWNERSHIP).every(owned => owned === true);

    // Toggle all blocks to the opposite state
    Object.keys(BLOCK_OWNERSHIP).forEach(blockKey => {
      const newState = !allOwned;
      updateBlockOwnership(blockKey, newState);

      // Update the toggle visuals
      const input = document.getElementById(`block-toggle-${blockKey}`);
      if (input) {
        input.checked = newState;

        // Find and update the slider and knob
        const slider = input.nextElementSibling;
        if (slider) {
          slider.style.backgroundColor = newState ? '#4CAF50' : '#ccc';

          const knob = slider.firstElementChild;
          if (knob) {
            knob.style.left = newState ? '22px' : '2px';
          }
        }
      }
    });
  });

  toggleAllRow.appendChild(toggleAllButton);
  controllerContainer.appendChild(toggleAllRow);

  // Add ID for easier querying
  controllerContainer.id = 'block-controller';

  document.body.appendChild(controllerContainer);

  return controllerContainer;
}

/**
 * Initialize the block controller
 */
export function initBlockController() {
  createBlockController();
}

/**
 * Get the block controller element
 * @returns {HTMLElement} The block controller container
 */
export function getBlockController() {
  return controllerContainer;
}

