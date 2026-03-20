---
name: setup-react-native-google-stitch-sdk
description: Sets up React Native wrapper for Google Labs Stitch SDK - AI-powered UI screen generation from text prompts. Triggers on: Setup Stitch SDK, Google Stitch, UI generation, screen generation, AI screens, useStitch, generateScreen, @umituz/react-native-google-stitch-sdk.
---

# Setup React Native Google Stitch SDK

Comprehensive setup for `@umituz/react-native-google-stitch-sdk` - React Native wrapper for Google Labs Stitch SDK with AI-powered UI screen generation.

## Overview

This package provides a React Native wrapper for Google Labs Stitch SDK:
- Generate UI screens from text prompts using AI
- Get HTML and screenshot URLs for generated screens
- Edit screens with natural language
- Generate design variants
- Project and screen management
- Full TypeScript support

## Quick Start

Just say: **"Setup Google Stitch SDK in my app"** and this skill will handle everything.

**Features Included:**
- AI-powered screen generation from text
- HTML export for generated screens
- Screenshot/image URLs
- Screen editing and variants
- Project management
- MCP tool access

## When to Use

Invoke this skill when you need to:
- Add AI UI screen generation to your app
- Generate screens from text prompts
- Integrate Google Labs Stitch SDK
- Export HTML from AI-generated screens
- Create design variations

## Step 1: Analyze the Project

### Check package.json

```bash
cat package.json | grep "@umituz/react-native-google-stitch-sdk"
npm list @umituz/react-native-google-stitch-sdk
```

### Detect Project Type

```bash
cat app.json | grep -q "expo" && echo "Expo" || echo "Bare RN"
```

## Step 2: Install Package

### Install Core Package

```bash
npm install @umituz/react-native-google-stitch-sdk@latest
```

### Verify Installation

```bash
npm list @umituz/react-native-google-stitch-sdk
```

## Step 3: Environment Setup

### CRITICAL: Environment Variables Required

The underlying `@google/stitch-sdk` requires `process.env.STITCH_API_KEY`. You MUST set up environment variable support in your React Native app.

#### For Expo Apps

**Option 1: react-native-dotenv (Recommended)**

```bash
npm install --save-dev react-native-dotenv
```

Update `babel.config.js`:
```javascript
module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    ['module:react-native-dotenv', {
      moduleName: '@env',
      path: '.env',
    }]
  ]
};
```

Create `.env` file in project root:
```env
STITCH_API_KEY=your-actual-api-key-here
```

**Option 2: Expo Constants**

```bash
npx expo install expo-constants
```

Use `Constants.expoConfig.extra` in app.json:
```json
{
  "expo": {
    "extra": {
      "stitchApiKey": "your-actual-api-key-here"
    }
  }
}
```

#### For Bare React Native

**Option 1: react-native-dotenv (Recommended)**

```bash
npm install --save-dev react-native-dotenv
```

Update `metro.config.js`:
```javascript
const { getDefaultConfig } = require('expo/metro-config');

const config = getDefaultConfig(__dirname);

module.exports = config;
```

Update `babel.config.js`:
```javascript
module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    ['module:react-native-dotenv', {
      moduleName: '@env',
      path: '.env',
    }]
  ]
};
```

Create `.env` file:
```env
STITCH_API_KEY=your-actual-api-key-here
```

**Option 2: Manual Polyfill**

Create `global.polyfills.js`:
```javascript
if (typeof process === 'undefined') {
  global.process = require('process');
}

// Set environment variables
process.env.STITCH_API_KEY = 'your-actual-api-key-here';
```

Import in `index.js` or `App.tsx`:
```javascript
import './global.polyfills';
```

### Get API Key

1. Go to https://github.com/google-labs-code/stitch-sdk
2. Follow authentication instructions
3. Get your `STITCH_API_KEY`

## Step 4: Basic Usage

### Using the Hook

```typescript
import { useStitch } from '@umituz/react-native-google-stitch-sdk/core';

function MyScreen() {
  const {
    isLoading,
    error,
    generateScreen,
    getScreenOutput,
    editScreen,
    generateVariants,
  } = useStitch({
    apiKey: process.env.STITCH_API_KEY,
    autoInitialize: true,
  });

  const handleGenerate = async () => {
    try {
      const screen = await generateScreen('project-id', {
        prompt: 'A modern login page with email and password fields',
        deviceType: 'MOBILE',
      });

      const { htmlUrl, imageUrl } = await getScreenOutput('project-id', screen.screenId);
      console.log('HTML URL:', htmlUrl);
      console.log('Screenshot URL:', imageUrl);
    } catch (err) {
      console.error('Generation failed:', err);
    }
  };

  return (
    <View>
      <Button
        title="Generate Screen"
        onPress={handleGenerate}
        disabled={isLoading}
      />
      {error && <Text>Error: {error.message}</Text>}
    </View>
  );
}
```

### Using Service Directly

```typescript
import { stitchService } from '@umituz/react-native-google-stitch-sdk/core';
import { initializeStitchSDK } from '@umituz/react-native-google-stitch-sdk/init';

// Initialize
initializeStitchSDK({
  apiKey: process.env.STITCH_API_KEY,
});

// Generate screen
const screen = await stitchService.generateScreen('project-id', {
  prompt: 'A dashboard with charts',
  deviceType: 'DESKTOP',
});

// Get HTML
const htmlUrl = await stitchService.getScreenHtml('project-id', screen.screenId);
```

## Step 5: Generate Screens

### Basic Screen Generation

```typescript
const { generateScreen } = useStitch();

const screen = await generateScreen('project-id', {
  prompt: 'A shopping cart screen with product list',
  deviceType: 'MOBILE',
});
```

### Device Types

Available device types:
- `'MOBILE'` - Mobile phone layout
- `'DESKTOP'` - Desktop layout
- `'TABLET'` - Tablet layout
- `'AGNOSTIC'` - Responsive layout

```typescript
const screen = await generateScreen('project-id', {
  prompt: 'A profile page',
  deviceType: 'TABLET',
});
```

## Step 6: Get Screen Output

### Get HTML URL

```typescript
const htmlUrl = await getScreenHtml('project-id', screen.screenId);
// Returns: https://stitch.googleapis.com/...
```

### Get Screenshot URL

```typescript
const imageUrl = await getScreenImage('project-id', screen.screenId);
// Returns: https://stitch.googleapis.com/...
```

### Get Both URLs

```typescript
const { htmlUrl, imageUrl } = await getScreenOutput('project-id', screen.screenId);
```

### Display in React Native

```typescript
import { WebView } from 'react-native-webview';
import { Image } from 'react-native';

function GeneratedScreen({ screen }) {
  const { htmlUrl, imageUrl } = useScreenOutput(screen);

  return (
    <>
      {/* Show screenshot */}
      <Image source={{ uri: imageUrl }} style={{ width: '100%', height: 300 }} />

      {/* Show HTML in WebView */}
      <WebView source={{ uri: htmlUrl }} />
    </>
  );
}
```

## Step 7: Edit Screens

### Edit with Text Prompt

```typescript
const editedScreen = await editScreen('project-id', screen.screenId, {
  prompt: 'Make the background dark and add a sidebar',
  deviceType: 'MOBILE',
});
```

### Edit with Model Selection

```typescript
const editedScreen = await editScreen('project-id', screen.screenId, {
  prompt: 'Use larger fonts and brighter colors',
  deviceType: 'MOBILE',
  modelId: 'GEMINI_3_PRO', // or 'GEMINI_3_FLASH'
});
```

## Step 8: Generate Variants

### Basic Variants

```typescript
const variants = await generateVariants('project-id', screen.screenId, {
  prompt: 'Try different color schemes',
});

// Returns array of variant screens
variants.forEach(variant => {
  console.log('Variant:', variant.screenId);
});
```

### Advanced Variants

```typescript
const variants = await generateVariants('project-id', screen.screenId, {
  prompt: 'Create modern variations',
  options: {
    variantCount: 3,
    creativeRange: 'EXPLORE', // 'REFINE' | 'EXPLORE' | 'REIMAGINE'
    aspects: ['COLOR_SCHEME', 'LAYOUT'],
  },
  deviceType: 'MOBILE',
  modelId: 'GEMINI_3_PRO',
});
```

### Variant Aspects

Available aspects:
- `'LAYOUT'` - Layout variations
- `'COLOR_SCHEME'` - Color scheme variations
- `'IMAGES'` - Image variations
- `'TEXT_FONT'` - Font variations
- `'TEXT_CONTENT'` - Content variations

## Step 9: Project Management

### List Projects

```typescript
const { listProjects } = useStitch();

const projects = await listProjects();
projects.forEach(project => {
  console.log('Project:', project.projectId);
});
```

### Create New Project

```typescript
const { createProject } = useStitch();

const { projectId } = await createProject('My App Project');
console.log('New project ID:', projectId);
```

### List Screens in Project

```typescript
const { listScreens } = useStitch();

const screens = await listScreens('project-id');
screens.forEach(screen => {
  console.log('Screen:', screen.screenId);
});
```

## Step 10: Advanced Usage

### Direct MCP Tool Access

```typescript
const { callTool } = useStitch();

// Call any Stitch MCP tool directly
const result = await callTool('create_project', {
  title: 'Agent Project',
});

const tools = await callTool('list_tools', {});
```

### Display Generated HTML

```typescript
import { WebView } from 'react-native-webview';

function ScreenViewer({ htmlUrl }) {
  return (
    <WebView
      source={{ uri: htmlUrl }}
      style={{ flex: 1 }}
      javaScriptEnabled={true}
      domStorageEnabled={true}
    />
  );
}
```

### Download and Cache Screens

```typescript
import { FileSystem } from 'react-native-file-system';

const downloadScreen = async (htmlUrl: string) => {
  const localPath = `${FileSystem.documentDirectory}screen.html`;
  await FileSystem.downloadAsync(htmlUrl, localPath);
  return localPath;
};
```

## Step 11: Error Handling

### Handle Stitch Errors

```typescript
import { StitchError } from '@google/stitch-sdk';

const handleGenerate = async () => {
  try {
    const screen = await generateScreen('project-id', {
      prompt: 'A login page',
    });
  } catch (error) {
    if (error instanceof StitchError) {
      console.error('Error code:', error.code);
      console.error('Recoverable:', error.recoverable);

      switch (error.code) {
        case 'AUTH_FAILED':
          console.error('Check your API key');
          break;
        case 'NOT_FOUND':
          console.error('Project/screen not found');
          break;
        case 'RATE_LIMITED':
          console.error('Rate limit exceeded, wait a bit');
          break;
      }
    }
  }
};
```

### Handle Hook Errors

```typescript
const { isLoading, error } = useStitch();

if (error) {
  return (
    <View>
      <Text>Error: {error.message}</Text>
      <Button title="Retry" onPress={retry} />
    </View>
  );
}

if (isLoading) {
  return <ActivityIndicator />;
}
```

## Step 12: Best Practices

### Prompt Engineering

```typescript
// Good prompts
const goodPrompts = [
  'A modern e-commerce product detail page with large images',
  'A minimalist login form with social login buttons',
  'A dashboard with 4 stat cards and a line chart',
];

// Bad prompts
const badPrompts = [
  'a page', // Too vague
  'make it good', // Not specific
];
```

### Cache Generated Screens

```typescript
import { useState, useCallback } from 'react';

function useScreenCache() {
  const [cache, setCache] = useState(new Map());

  const getCachedScreen = useCallback((screenId: string) => {
    return cache.get(screenId);
  }, [cache]);

  const setCachedScreen = useCallback((screenId: string, data: any) => {
    setCache(prev => new Map(prev).set(screenId, data));
  }, []);

  return { getCachedScreen, setCachedScreen };
}
```

### Loading States

```typescript
function ScreenGenerator() {
  const { isLoading, error, generateScreen, getScreenOutput } = useStitch();
  const [step, setStep] = useState('idle');

  const handleGenerate = async () => {
    setStep('generating');
    const screen = await generateScreen('project-id', { prompt: '...' });

    setStep('fetching');
    const output = await getScreenOutput('project-id', screen.screenId);

    setStep('complete');
    return output;
  };

  return (
    <View>
      {step === 'generating' && <Text>Generating screen with AI...</Text>}
      {step === 'fetching' && <Text>Fetching HTML and screenshot...</Text>}
      {isLoading && <ActivityIndicator />}
    </View>
  );
}
```

## Step 13: Verify Setup

### Test Import

```typescript
import { useStitch } from '@umituz/react-native-google-stitch-sdk/core';

// Should work without errors
console.log('Stitch SDK imported successfully');
```

### Test Environment Variable

```typescript
import '@env'; // If using react-native-dotenv

console.log('API Key:', process.env.STITCH_API_KEY?.substring(0, 10) + '...');
```

### Test Basic Generation

```typescript
const test = async () => {
  const { listProjects } = useStitch();
  const projects = await listProjects();
  console.log('Projects:', projects.length);
};
```

## Common Mistakes

| Mistake | Fix |
|---------|-----|
| **Missing process.env** | Set up react-native-dotenv or manual polyfill |
| **API key not set** | Add STITCH_API_KEY to .env file |
| **Wrong import path** | Use `/core` subpath, not root import |
| **WebView not installed** | Install react-native-webview for HTML display |
| **Device type wrong** | Use 'MOBILE', 'DESKTOP', 'TABLET', or 'AGNOSTIC' |
| **Project ID missing** | Create project first or use existing project ID |

## Troubleshooting

| Issue | Solution |
|-------|----------|
| **"process is not defined"** | Install react-native-dotenv or add polyfill |
| **"Cannot find module '@env'"** | Check babel.config.js has dotenv plugin |
| **"API key not found"** | Verify .env file has STITCH_API_KEY |
| **"Project not found"** | Use createProject() or valid project ID |
| **"Generation failed"** | Check prompt is descriptive enough |
| **WebView blank** | Use react-native-webview for HTML display |

## Summary

After setup, provide:

1. ✅ Package version installed
2. ✅ Environment variables configured
3. ✅ API key set in .env
4. ✅ Basic screen generation working
5. ✅ HTML/screenshot URLs accessible
6. ✅ Editing and variants working
7. ✅ Verification status

## TypeScript Types

All types are exported and available:

```typescript
import type {
  StitchProject,
  StitchScreen,
  DeviceType,
  ModelId,
  CreativeRange,
  VariantAspect,
  VariantOptions,
  ScreenGenerateInput,
  ScreenEditInput,
  ScreenVariantsInput,
  ScreenOutput,
} from '@umituz/react-native-google-stitch-sdk/core';
```

## Platform Support

- ✅ React Native (Bare)
- ✅ Expo (with react-native-webview for HTML display)
- ✅ iOS & Android
- ✅ TypeScript

## Related Packages

- `react-native-webview` - Display generated HTML
- `react-native-dotenv` - Environment variables
- `expo-constants` - Expo environment variables (alternative)

---

**Compatible with:** @umituz/react-native-google-stitch-sdk@latest
**Platforms:** React Native (Expo & Bare)
**Dependencies:** @google/stitch-sdk, process.env polyfill required
**Environment:** STITCH_API_KEY required
