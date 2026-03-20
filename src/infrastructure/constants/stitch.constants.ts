/**
 * Stitch Constants
 * @description Configuration constants for Stitch SDK
 */

export const STITCH_DEFAULT_CONFIG = {
  API_TIMEOUT: 30000,
  MAX_RETRIES: 3,
} as const;

export const STITCH_ERROR_MESSAGES = {
  NOT_INITIALIZED: 'StitchService not initialized. Call initialize() first.',
  INVALID_PROJECT_ID: 'Invalid project ID provided.',
  NETWORK_ERROR: 'Network error occurred while communicating with Stitch SDK.',
} as const;
