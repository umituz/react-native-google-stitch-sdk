/**
 * Stitch Service Interface
 * @description Contract for Stitch SDK service implementations
 */

import type { StitchProject, StitchProjectCreateInput, StitchProjectUpdateInput } from '../entities';

export interface IStitchService {
  /**
   * Read a project by ID
   */
  readProject(_projectId: string): Promise<StitchProject>;

  /**
   * Write/create a new project
   */
  writeProject(_input: StitchProjectCreateInput): Promise<StitchProject>;

  /**
   * Update an existing project
   */
  updateProject(_projectId: string, _input: StitchProjectUpdateInput): Promise<StitchProject>;

  /**
   * Delete a project
   */
  deleteProject(_projectId: string): Promise<void>;

  /**
   * List all projects
   */
  listProjects(): Promise<StitchProject[]>;
}
