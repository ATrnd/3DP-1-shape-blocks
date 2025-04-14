// models/modelRegistry.js
// Registry of available models with metadata

// Import model paths
import model1Path from '../assets_1/model_01_sub_0.gltf?url';
import model2Path from '../assets_2/model_02_sub_0.gltf?url';
import model3Path from '../assets_3/model_03_sub_0.gltf?url';

/**
 * Registry of all available models
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

// Set the default model index
export const DEFAULT_MODEL_INDEX = 2; // Start with Model 3 (index 2)

