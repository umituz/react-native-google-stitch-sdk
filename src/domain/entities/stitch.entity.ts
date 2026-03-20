/**
 * Stitch Project Entity
 * @description Represents a Google Labs Stitch SDK project
 */

export interface StitchProject {
  readonly id: string;
  readonly name: string;
  readonly description?: string;
  readonly createdAt: Date;
  readonly updatedAt: Date;
}

export type StitchProjectCreateInput = Omit<StitchProject, 'id' | 'createdAt' | 'updatedAt'>;
export type StitchProjectUpdateInput = Partial<StitchProjectCreateInput>;
