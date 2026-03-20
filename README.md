# @umituz/react-native-google-stitch-sdk

React Native wrapper for Google Labs Stitch SDK with TypeScript support.

## Installation

```sh
npm install @umituz/react-native-google-stitch-sdk
```

## Quick Start

```typescript
// Initialize the SDK
import { initializeStitchSDK } from '@umituz/react-native-google-stitch-sdk/init';

initializeStitchSDK({
  apiKey: 'your-api-key',
  baseUrl: 'https://api.example.com',
});

// Use the hook in your component
import { useStitch } from '@umituz/react-native-google-stitch-sdk/core';

function MyComponent() {
  const { readProject, writeProject, isLoading, error } = useStitch();

  const handleRead = async () => {
    const project = await readProject('project-id');
    console.log(project);
  };

  return (
    // Your JSX
  );
}
```

## Available Subpaths

### `/core`
Core SDK functionality - services, hooks, and types.

```typescript
import { useStitch, stitchService } from '@umituz/react-native-google-stitch-sdk/core';
import type { StitchProject } from '@umituz/react-native-google-stitch-sdk/core';
```

### `/init`
Initialization utilities.

```typescript
import { initializeStitchSDK, isStitchSDKInitialized } from '@umituz/react-native-google-stitch-sdk/init';
```

## API Reference

### `useStitch` Hook

```typescript
const {
  isLoading,
  error,
  readProject,
  writeProject,
  updateProject,
  deleteProject,
  listProjects,
} = useStitch({ apiKey: 'your-key', autoInitialize: true });
```

### Direct Service Usage

```typescript
import { stitchService } from '@umituz/react-native-google-stitch-sdk/core';

stitchService.initialize({ apiKey: 'your-key' });
const project = await stitchService.readProject('project-id');
```

## License

MIT

---

**@umituz** - React Native packages

