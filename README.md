# 3DP-1: Shape Blocks

![shape_blocks](https://github.com/ATrnd/3DP-1-shape-blocks/blob/main/img/3DP-1-shape-blocks-0.1.jpg)

### Status: Draft

## 3DP Purpose
3DP stands for 3D Prototype within the Shape ([shape.network](https://shape.network/)) ecosystem.
This prototype follows a format inspired by [Ethereum Improvement Proposals (EIP-1)](https://eips.ethereum.org/EIPS/eip-1), adapting the standardized approach to technical documentation for 3D rendering components.
Like EIPs, this 3DP aims to document technical specifications and standards in a clear, concise format that provides 3D representations out of the box for NFT-driven dApps.

## Summary
3DP-1 defines a standardized implementation for 3D visualization of NFT ownership states.
The system renders building blocks that directly correspond to the four collectible fragments defined in [SIP-1](https://shape.network/), with clear distinction between owned and unowned components.
Owned fragments appear with full textures and materials, while unowned fragments display as wireframes, visually tracking collection progress.
When fragments are burned and fused in the underlying SIP-1 system, users can own a complete building in the 3D environment.
This technical standard implements rendering-specific functionality including model loading, material switching, ownership representation, and camera controls, enabling developers to build engaging 3D interfaces for NFT collections without reimplementing core graphics logic.

## Abstract
The Shape Blocks system implements a 3D representation mechanism designed to work with the Shape Fragments system defined in SIP-1. Each NFT fragment set is visualized as a section of a 3D building with the following properties:

- Full textured rendering for owned fragments
- Wireframe rendering for unowned fragments
- Real-time 3D rendering using Three.js
- Responsive camera controls for structure exploration
- Compatible with modern web browsers and devices

When users collect all four fragments of a set as specified in SIP-1, they can view their complete building section with full textures. The system consists of three core modules:

- Core Rendering: Manages scene, camera, renderer, and animation loop
- Building Manager: Controls construction and material application based on ownership status
- UI Components: Provides interactive controls for model selection and ownership visualization

3DP-1 focuses solely on the visual representation layer, providing a standardized way to display ownership information from the underlying SIP-1 fragment collection system.

## Motivation
The Shape Blocks system addresses several key technical and practical challenges in the NFT representation space:

**Extended NFT Utility**: Standard NFT interfaces are typically limited to 2D thumbnails with minimal interactive elements. The 3D representation approach extends functionality by enabling spatial understanding and exploration of fragment-based collections defined in SIP-1.

**Development Standardization**: Building 3D rendering systems for NFTs requires significant engineering resources and introduces potential performance challenges. This standardized implementation reduces duplicate development effort while providing a tested, optimized foundation.

**Technical Enablement**: 3D representation enables:

- Intuitive visualization of ownership status through material state changes
- Interactive exploration through camera and lighting controls
- Progressive visual revelation as users collect fragments
- Spatial comprehension of collection structure and completeness

**Implementation Efficiency**: By standardizing the rendering logic at the module level, developers can focus on application-specific features rather than reimplementing core graphics functionality.
This proposal offers a technical building block that simplifies the implementation of fragment-based NFT visualizations as defined in SIP-1, while maintaining compatibility with existing web standards and browser technologies.

## Core Components
The Shape Blocks system comprises three specialized modules that establish a complete 3D representation framework for SIP-1 fragment collections:

### Core Rendering Module

- Three.js implementation with optimized scene management
- Controls camera positioning and perspective for interactive viewing
- Manages lighting to highlight owned vs. unowned components
- Handles animation loop and performance optimization

### Building Manager Module

- Controls construction and organization of building blocks
- Maps fragment ownership from SIP-1 to visual representation
- Manages material application based on ownership state
- Maintains block hierarchy corresponding to fragment structure

### UI Components Module

- Provides model selection interface for different building styles
- Implements interactive ownership toggles for visualization testing
- Displays loading and progress indicators
- Supports real-time performance monitoring

These components form a sequential processing flow:
```
┌─────────────────┐     ┌─────────────────┐     ┌─────────────────┐
│ Core Rendering  │     │ Building        │     │ UI              │
│                 │     │ Manager         │     │ Components      │
│ Initialize 3D   │ ──▶ │ Construct       │ ──▶ │ Provide         │
│ Environment     │     │ Building Blocks │     │ User Controls   │
└─────────────────┘     └─────────────────┘     └─────────────────┘
        ▲                       │                       │
        │                       │                       │
        │                       ▼                       ▼
┌─────────────────┐     ┌─────────────────┐     ┌─────────────────┐
│ Scene & Camera  │     │ Material        │     │ Interaction     │
│ Management      │     │ Application     │     │ Handling        │
│                 │     │ (Owned/Unowned) │     │                 │
└─────────────────┘     └─────────────────┘     └─────────────────┘
```

## System Architecture

Shape Blocks (3DP-1) is designed as an independent, self-contained visualization module within the broader Shape ecosystem. This architecture follows a deliberate separation of concerns:

- **Smart Contract Layer (SIPs)**: Provides on-chain functionality and data structures
- **Visualization Layer (3DPs)**: Handles rendering and user interaction
- **Integration Layer (Experiences)**: Connects independent modules when needed

This separation enables parallel development workflows where blockchain developers can focus on contract implementations while frontend specialists can work on visualization components independently. The system deliberately avoids tight coupling between these layers, instead relying on a composition pattern through the Experiences framework.

```
┌───────────────────┐     ┌───────────────────┐
│                   │     │                   │
│  Smart Contracts  │     │  Visualizations   │
│  (SIP Modules)    │     │  (3DP Modules)    │
│                   │     │                   │
└─────────┬─────────┘     └─────────┬─────────┘
          │                         │
          │                         │
          ▼                         ▼
┌─────────────────────────────────────────────┐
│                                             │
│           Experiences Framework             │
│     (Composition and Integration Layer)     │
│                                             │
└─────────────────────────────────────────────┘
```

## Technical Considerations

The Shape Blocks system implements specific optimizations and design decisions to ensure performance, compatibility, and developer usability:

**Asset Optimization**:

- Models are created using Blender and Substance Painter with polygon counts optimized for web rendering (13k-60k triangles)
- Texture maps are minimized to essential types (baseColor, normal, occlusionRoughnessMetallic) at low resolutions
- Material system is designed for efficient GPU utilization while maintaining visual fidelity

**Performance Engineering**:

- Core rendering engine strips away non-essential operations to maximize performance across devices
- Selective rendering techniques applied to improve framerate on lower-powered hardware
- Progressive loading of assets to minimize initial load times and memory consumption

**Development Sandbox**:

- System functions as a testbed for frontend developers and 3D artists before Experience integration
- Allows rapid prototyping and performance testing without full system implementation
- ModelRegistry.js provides straightforward model registration and switching for asset evaluation

**Browser Compatibility**:

- WebGL implementation accounts for cross-browser rendering differences
- Fallback rendering approaches for devices with limited 3D capabilities
- Responsive design accommodates various display sizes and aspect ratios

This technical foundation prioritizes broad device support and developer ergonomics while maintaining the visual quality necessary for effective NFT representation. The optimization techniques employed ensure that Shape Blocks can be incorporated into larger Experiences without introducing significant performance penalties.

## Features and Controls

The Shape Blocks system provides a comprehensive set of interaction capabilities and visualization tools designed for both developers and end-users:

**User Interaction Controls**

- **Orbit**: Click and drag to orbit the camera around the 3D building model
- **Pan**: Hold Ctrl/Cmd + click and drag to pan the camera across the scene
- **Zoom**: Use mouse wheel or pinch gesture to adjust viewing distance
- **Auto-Rotation**:
    - Press 'R' key to toggle automatic rotation of the model
    - Auto-rotation automatically disables when manual controls are used

### Visualization Components

- **Performance Monitor**: Real-time frames-per-second counter in the top-left corner for performance analysis
- **Polygon Counter**: Triangle count display in the bottom-left corner showing current rendering complexity
- **Model Selector**: Interface in the top-right corner for switching between different building models with varying complexity levels
- **Block Controller**: Interactive ownership toggle panel in the bottom-right corner for visualizing owned vs. unowned fragments

## Developer Utilities

- **Material System**: Automatic switching between wireframe and textured materials based on ownership state
- **Model Registry**: Configurable model registration system for adding custom 3D assets
- **Loading Indicators**: Progress visualization during model loading with error state handling
- **Responsive Design**: Automatic adaptation to different viewport sizes with camera adjustments

These features combine to create a development environment optimized for both technical assessment and user experience testing, enabling developers to evaluate fragment visualization approaches before implementation in production Experiences.

## Quick Start

```bash
# Clone the repository
git clone git@github.com:ATrnd/3DP-1-shape-blocks.git

# Change to project directory
cd 3DP-1-shape-blocks

# Install dependencies
npm install

# Start the development server
npm run dev
```

### Configuration Options

```javascript
// Modify building structure
BUILDING_CONFIG.totalFloors = 16;        // Adjust number of floors
BUILDING_CONFIG.floorsPerBlock = 4;      // Adjust floors per ownership block

// Adjust initial ownership state
BLOCK_OWNERSHIP.block_1 = true;          // Set ownership status by block
BLOCK_OWNERSHIP.block_2 = false;

// Customize camera settings
CAMERA_SETTINGS.position = { x: -10, y: 10, z: 10 };  // Starting camera position
```

### Adding Custom Models
To add a new 3D model to the system:

1. Place GLTF files and textures in an assets directory (src/assets_custom/)
2. Register the model in modelRegistry.js:

```javascript
import customModelPath from '../assets_custom/custom_model.gltf?url';

export const MODELS = [
  // Existing models...
  {
    id: 'custom',
    name: 'Custom Model',
    path: customModelPath,
    description: 'My custom 3D model'
  }
];
```

The Shape Blocks system will automatically add the new model to the selection interface with proper loading and visualization support.

## Maintainers

- **Author:** [[ATrnd](https://github.com/ATrnd/)]
- **Contact:** [https://t.me/at_rnd]
