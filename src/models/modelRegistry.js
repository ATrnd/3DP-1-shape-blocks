/*//////////////////////////////////////////////////////////////
                        MODEL REGISTRY
//////////////////////////////////////////////////////////////*/

/**
 * @title Model Registry
 * @author ATrnd
 * @notice Registry of available 3D models with metadata
 * @dev Central configuration for model paths, identifiers, and descriptions
 */

// Import model paths
import model1Path from '../assets_1/model_01_sub_0.gltf?url';
import model2Path from '../assets_2/model_02_sub_0.gltf?url';
import model3Path from '../assets_3/model_03_sub_0.gltf?url';

/*//////////////////////////////////////////////////////////////
                        MODEL DEFINITIONS
//////////////////////////////////////////////////////////////*/

/**
 * @notice Registry of all available models
 * @dev Array of model objects containing metadata and file paths
 *      Each model requires:
 *      - id: Unique identifier string
 *      - name: Display name for UI
 *      - path: File path to the GLTF model
 *      - description: Optional description of the model
 */
export const MODELS = [
  {
    id: 'model1',
    name: 'Model 1 (Basic)',
    path: model1Path,
    description: 'Basic experimental model with various materials'
  },
  {
    id: 'model2',
    name: 'Model 2 (Medium)',
    path: model2Path,
    description: 'Medium complexity model with detailed textures'
  },
  {
    id: 'model3',
    name: 'Model 3 (Complex)',
    path: model3Path,
    description: 'Complex model with high-detail textures and geometry'
  }
];

/*//////////////////////////////////////////////////////////////
                        DEFAULT CONFIGURATION
//////////////////////////////////////////////////////////////*/

/**
 * @notice Default model index for initial loading
 * @dev Determines which model is loaded when the application starts
 *      Value must be a valid index in the MODELS array (0-based)
 */
export const DEFAULT_MODEL_INDEX = 2; // Start with Model 3 (index 2)
