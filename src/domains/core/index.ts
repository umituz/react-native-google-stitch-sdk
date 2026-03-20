/**
 * Core Domain
 * @description Core Stitch SDK functionality
 * Subpath: @umituz/react-native-google-stitch-sdk/core
 */

// Domain entities
export type {
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
} from '../../domain/entities';

// Infrastructure services
export { stitchService } from '../../infrastructure/services';
export type { StitchServiceConfig } from '../../infrastructure/services';

// Presentation hooks
export { useStitch } from '../../presentation/hooks';
export type { UseStitchConfig, UseStitchReturn } from '../../presentation/hooks';

// Constants
export { STITCH_ERROR_MESSAGES } from '../../infrastructure/constants';
