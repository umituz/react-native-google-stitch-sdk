/**
 * @umituz/react-native-google-stitch-sdk
 * React Native wrapper for Google Labs Stitch SDK with TypeScript support
 *
 * ⚠️ IMPORTANT: Apps should NOT use this root barrel import.
 * Use subpath imports instead for better tree-shaking:
 *
 * ❌ DON'T: import { useStitch } from '@umituz/react-native-google-stitch-sdk'
 * ✅ DO:    import { useStitch } from '@umituz/react-native-google-stitch-sdk/core'
 *
 * Available subpaths:
 * - /core: Core SDK functionality (services, hooks, types)
 * - /init: Initialization utilities
 */

// Re-export everything for backward compatibility
export * from './domains/core';
export * from './init';
