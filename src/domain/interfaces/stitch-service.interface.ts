/**
 * Stitch Service Interface
 * @description Contract for Stitch SDK service implementations
 */

import type {
  StitchProject,
  StitchScreen,
  ScreenGenerateInput,
  ScreenEditInput,
  ScreenVariantsInput,
  ScreenOutput,
} from '../entities';

export interface IStitchService {
  /**
   * List all accessible projects
   */
  listProjects(): Promise<StitchProject[]>;

  /**
   * Get a project reference by ID (no API call)
   */
  getProject(projectId: string): StitchProject;

  /**
   * List all screens in a project
   */
  listScreens(projectId: string): Promise<StitchScreen[]>;

  /**
   * Get a specific screen by ID
   */
  getScreen(projectId: string, screenId: string): Promise<StitchScreen>;

  /**
   * Generate a screen from a text prompt
   */
  generateScreen(projectId: string, input: ScreenGenerateInput): Promise<StitchScreen>;

  /**
   * Edit a screen with a text prompt
   */
  editScreen(projectId: string, screenId: string, input: ScreenEditInput): Promise<StitchScreen>;

  /**
   * Generate design variants of a screen
   */
  generateVariants(projectId: string, screenId: string, input: ScreenVariantsInput): Promise<StitchScreen[]>;

  /**
   * Get the screen's HTML download URL
   */
  getScreenHtml(projectId: string, screenId: string): Promise<string>;

  /**
   * Get the screen's screenshot download URL
   */
  getScreenImage(projectId: string, screenId: string): Promise<string>;

  /**
   * Get both HTML and image URLs for a screen
   */
  getScreenOutput(projectId: string, screenId: string): Promise<ScreenOutput>;

  /**
   * Create a new project using MCP tool
   */
  createProject(title: string): Promise<{ projectId: string }>;

  /**
   * Call MCP tool directly
   */
  callTool<T = unknown>(name: string, args: Record<string, unknown>): Promise<T>;
}
