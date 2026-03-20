/**
 * Initialization Module
 * @description Initialize Stitch SDK with configuration
 * Subpath: @umituz/react-native-google-stitch-sdk/init
 */

import { stitchService } from '../infrastructure/services';
import type { StitchServiceConfig } from '../infrastructure/services';

/**
 * Initialize the Stitch SDK
 * @param config - Configuration object
 */
export function initializeStitchSDK(config: StitchServiceConfig): void {
  stitchService.initialize(config);
}

/**
 * Check if SDK is initialized
 */
export function isStitchSDKInitialized(): boolean {
  return stitchService.isInitialized();
}
