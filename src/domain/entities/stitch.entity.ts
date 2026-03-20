/**
 * Stitch Entities
 * @description Domain entities matching Google Labs Stitch SDK structure
 */

/**
 * Device types for screen generation
 */
export type DeviceType = 'MOBILE' | 'DESKTOP' | 'TABLET' | 'AGNOSTIC';

/**
 * Model IDs for generation
 */
export type ModelId = 'GEMINI_3_PRO' | 'GEMINI_3_FLASH';

/**
 * Creative range for variants
 */
export type CreativeRange = 'REFINE' | 'EXPLORE' | 'REIMAGINE';

/**
 * Variant aspects
 */
export type VariantAspect = 'LAYOUT' | 'COLOR_SCHEME' | 'IMAGES' | 'TEXT_FONT' | 'TEXT_CONTENT';

/**
 * Represents a Stitch project containing screens
 */
export interface StitchProject {
  readonly id: string;
  readonly projectId: string;
}

/**
 * Represents a generated UI screen
 */
export interface StitchScreen {
  readonly id: string;
  readonly screenId: string;
  readonly projectId: string;
}

/**
 * Options for generating variants
 */
export interface VariantOptions {
  readonly variantCount?: number;
  readonly creativeRange?: CreativeRange;
  readonly aspects?: VariantAspect[];
}

/**
 * Input for screen generation
 */
export interface ScreenGenerateInput {
  readonly prompt: string;
  readonly deviceType?: DeviceType;
}

/**
 * Input for screen editing
 */
export interface ScreenEditInput {
  readonly prompt: string;
  readonly deviceType?: DeviceType;
  readonly modelId?: ModelId;
}

/**
 * Input for variant generation
 */
export interface ScreenVariantsInput {
  readonly prompt: string;
  readonly options?: VariantOptions;
  readonly deviceType?: DeviceType;
  readonly modelId?: ModelId;
}

/**
 * Screen output with URLs
 */
export interface ScreenOutput {
  readonly htmlUrl: string;
  readonly imageUrl: string;
}
