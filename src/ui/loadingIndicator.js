/*//////////////////////////////////////////////////////////////
                    LOADING INDICATOR
//////////////////////////////////////////////////////////////*/

/**
 * @title Loading Indicator
 * @author ATrnd
 * @notice UI component for displaying loading state during model loading
 * @dev Manages the creation, display, and progress updates for the loading overlay
 */

/*//////////////////////////////////////////////////////////////
                    STATE VARIABLES
//////////////////////////////////////////////////////////////*/

/**
 * @notice Reference to the loading element
 * @dev DOM element containing the loading indicator UI
 */
let loadingElement;

/*//////////////////////////////////////////////////////////////
                    UI CREATION
//////////////////////////////////////////////////////////////*/

/**
 * @notice Create the loading indicator
 * @dev Lazily initializes the loading indicator DOM element
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

/*//////////////////////////////////////////////////////////////
                    VISIBILITY MANAGEMENT
//////////////////////////////////////////////////////////////*/

/**
 * @notice Show the loading indicator
 * @dev Creates the indicator if needed and makes it visible
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
 * @notice Hide the loading indicator
 * @dev Either hides immediately or shows error state before hiding
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

/*//////////////////////////////////////////////////////////////
                    PROGRESS TRACKING
//////////////////////////////////////////////////////////////*/

/**
 * @notice Update the loading progress display
 * @dev Updates the progress percentage text in the loading indicator
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

/*//////////////////////////////////////////////////////////////
                    ACCESSOR FUNCTIONS
//////////////////////////////////////////////////////////////*/

/**
 * @notice Get the loading indicator element
 * @dev Provides access to the loading indicator DOM element
 * @returns {HTMLElement} The loading indicator element
 */
export function getLoadingIndicator() {
  return loadingElement;
}
