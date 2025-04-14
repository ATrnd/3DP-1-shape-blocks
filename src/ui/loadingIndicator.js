// ui/loadingIndicator.js
// Loading indicator for model loading

// Reference to the loading element
let loadingElement;

/**
 * Create the loading indicator
 * @returns {HTMLElement} The created loading indicator
 */
export function createLoadingIndicator() {
  // Create loading element if it doesn't exist
  if (!loadingElement) {
    loadingElement = document.createElement('div');
    loadingElement.className = 'fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50 z-50';
    loadingElement.innerHTML = `
      <div class="p-5 rounded-lg shadow-lg text-center">
        <div class="animate-spin h-10 w-10 mx-auto mb-3 border-4 border-blue-500 border-t-transparent rounded-full"></div>
        <p id="loading-progress" class="text-white text-lg font-semibold">Loading: 0%</p>
      </div>
    `;

    // Initially hide it
    loadingElement.style.display = 'none';

    // Add to document
    document.body.appendChild(loadingElement);
  }

  return loadingElement;
}

/**
 * Show the loading indicator
 */
export function showLoadingIndicator() {
  // Create if it doesn't exist
  if (!loadingElement) {
    createLoadingIndicator();
  }

  // Reset progress
  updateLoadingProgress(0);

  // Show the indicator
  loadingElement.style.display = 'flex';
}

/**
 * Hide the loading indicator
 * @param {boolean} [isError=false] - Whether there was an error
 * @param {string} [errorMessage=''] - Error message to display
 */
export function hideLoadingIndicator(isError = false, errorMessage = '') {
  if (!loadingElement) return;

  if (isError) {
    // Show error message
    loadingElement.innerHTML = `
      <div class="p-5 rounded-lg shadow-lg text-center">
        <div class="text-red-500 mb-3">⚠️</div>
        <p class="text-white text-lg font-semibold">Error loading model</p>
        <p class="text-white text-sm">Details: ${errorMessage || 'Unknown error'}</p>
      </div>
    `;
    // Keep visible for a moment so user can see the error
    setTimeout(() => {
      loadingElement.style.display = 'none';
    }, 3000);
  } else {
    // Simply hide
    loadingElement.style.display = 'none';
  }
}

/**
 * Update the loading progress display
 * @param {number} progress - Progress percentage (0-100)
 */
export function updateLoadingProgress(progress) {
  if (!loadingElement) {
    createLoadingIndicator();
  }

  const progressElement = document.getElementById('loading-progress');
  if (progressElement) {
    progressElement.textContent = `Loading: ${progress}%`;
  }
}

/**
 * Get the loading indicator element
 * @returns {HTMLElement} The loading indicator element
 */
export function getLoadingIndicator() {
  return loadingElement;
}

