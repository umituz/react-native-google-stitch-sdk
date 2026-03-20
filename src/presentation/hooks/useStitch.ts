/**
 * useStitch Hook
 * @description React hook for Stitch SDK operations
 */

import { useCallback, useEffect, useState } from 'react';
import type { StitchProject, StitchProjectCreateInput, StitchProjectUpdateInput } from '../../domain/entities';
import { stitchService } from '../../infrastructure/services';

export interface UseStitchConfig {
  apiKey?: string;
  baseUrl?: string;
  autoInitialize?: boolean;
}

export interface UseStitchReturn {
  isLoading: boolean;
  error: Error | null;
  readProject: (_projectId: string) => Promise<StitchProject>;
  writeProject: (_input: StitchProjectCreateInput) => Promise<StitchProject>;
  updateProject: (_projectId: string, _input: StitchProjectUpdateInput) => Promise<StitchProject>;
  deleteProject: (_projectId: string) => Promise<void>;
  listProjects: () => Promise<StitchProject[]>;
}

export function useStitch(config?: UseStitchConfig): UseStitchReturn {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (config?.autoInitialize && config.apiKey) {
      stitchService.initialize({ apiKey: config.apiKey, baseUrl: config.baseUrl });
    }
  }, [config]);

  const readProject = useCallback(async (projectId: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const project = await stitchService.readProject(projectId);
      return project;
    } catch (err) {
      const error = err instanceof Error ? err : new Error('Failed to read project');
      setError(error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const writeProject = useCallback(async (input: StitchProjectCreateInput) => {
    setIsLoading(true);
    setError(null);
    try {
      const project = await stitchService.writeProject(input);
      return project;
    } catch (err) {
      const error = err instanceof Error ? err : new Error('Failed to write project');
      setError(error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const updateProject = useCallback(async (projectId: string, input: StitchProjectUpdateInput) => {
    setIsLoading(true);
    setError(null);
    try {
      const project = await stitchService.updateProject(projectId, input);
      return project;
    } catch (err) {
      const error = err instanceof Error ? err : new Error('Failed to update project');
      setError(error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const deleteProject = useCallback(async (projectId: string) => {
    setIsLoading(true);
    setError(null);
    try {
      await stitchService.deleteProject(projectId);
    } catch (err) {
      const error = err instanceof Error ? err : new Error('Failed to delete project');
      setError(error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const listProjects = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const projects = await stitchService.listProjects();
      return projects;
    } catch (err) {
      const error = err instanceof Error ? err : new Error('Failed to list projects');
      setError(error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, []);

  return {
    isLoading,
    error,
    readProject,
    writeProject,
    updateProject,
    deleteProject,
    listProjects,
  };
}
