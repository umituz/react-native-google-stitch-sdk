/**
 * useStitch Hook
 * @description React hook for Stitch SDK operations
 */

import { useCallback, useEffect, useState } from 'react';
import type {
  StitchProject,
  StitchScreen,
  ScreenGenerateInput,
  ScreenEditInput,
  ScreenVariantsInput,
  ScreenOutput,
} from '../../domain/entities';
import { stitchService } from '../../infrastructure/services';

export interface UseStitchConfig {
  apiKey?: string;
  baseUrl?: string;
  autoInitialize?: boolean;
}

export interface UseStitchReturn {
  isLoading: boolean;
  error: Error | null;
  listProjects: () => Promise<StitchProject[]>;
  getProject: (projectId: string) => StitchProject;
  listScreens: (projectId: string) => Promise<StitchScreen[]>;
  getScreen: (projectId: string, screenId: string) => Promise<StitchScreen>;
  generateScreen: (projectId: string, input: ScreenGenerateInput) => Promise<StitchScreen>;
  editScreen: (projectId: string, screenId: string, input: ScreenEditInput) => Promise<StitchScreen>;
  generateVariants: (projectId: string, screenId: string, input: ScreenVariantsInput) => Promise<StitchScreen[]>;
  getScreenHtml: (projectId: string, screenId: string) => Promise<string>;
  getScreenImage: (projectId: string, screenId: string) => Promise<string>;
  getScreenOutput: (projectId: string, screenId: string) => Promise<ScreenOutput>;
  createProject: (title: string) => Promise<{ projectId: string }>;
  callTool: <T = unknown>(name: string, args: Record<string, unknown>) => Promise<T>;
}

export function useStitch(config?: UseStitchConfig): UseStitchReturn {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (config?.autoInitialize && config.apiKey) {
      stitchService.initialize({ apiKey: config.apiKey, baseUrl: config.baseUrl });
    }
  }, [config?.apiKey, config?.baseUrl, config?.autoInitialize]);

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

  const getProject = useCallback((projectId: string) => {
    return stitchService.getProject(projectId);
  }, []);

  const listScreens = useCallback(async (projectId: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const screens = await stitchService.listScreens(projectId);
      return screens;
    } catch (err) {
      const error = err instanceof Error ? err : new Error('Failed to list screens');
      setError(error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const getScreen = useCallback(async (projectId: string, screenId: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const screen = await stitchService.getScreen(projectId, screenId);
      return screen;
    } catch (err) {
      const error = err instanceof Error ? err : new Error('Failed to get screen');
      setError(error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const generateScreen = useCallback(async (projectId: string, input: ScreenGenerateInput) => {
    setIsLoading(true);
    setError(null);
    try {
      const screen = await stitchService.generateScreen(projectId, input);
      return screen;
    } catch (err) {
      const error = err instanceof Error ? err : new Error('Failed to generate screen');
      setError(error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const editScreen = useCallback(
    async (projectId: string, screenId: string, input: ScreenEditInput) => {
      setIsLoading(true);
      setError(null);
      try {
        const screen = await stitchService.editScreen(projectId, screenId, input);
        return screen;
      } catch (err) {
        const error = err instanceof Error ? err : new Error('Failed to edit screen');
        setError(error);
        throw error;
      } finally {
        setIsLoading(false);
      }
    },
    []
  );

  const generateVariants = useCallback(
    async (projectId: string, screenId: string, input: ScreenVariantsInput) => {
      setIsLoading(true);
      setError(null);
      try {
        const variants = await stitchService.generateVariants(projectId, screenId, input);
        return variants;
      } catch (err) {
        const error = err instanceof Error ? err : new Error('Failed to generate variants');
        setError(error);
        throw error;
      } finally {
        setIsLoading(false);
      }
    },
    []
  );

  const getScreenHtml = useCallback(async (projectId: string, screenId: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const htmlUrl = await stitchService.getScreenHtml(projectId, screenId);
      return htmlUrl;
    } catch (err) {
      const error = err instanceof Error ? err : new Error('Failed to get screen HTML');
      setError(error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const getScreenImage = useCallback(async (projectId: string, screenId: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const imageUrl = await stitchService.getScreenImage(projectId, screenId);
      return imageUrl;
    } catch (err) {
      const error = err instanceof Error ? err : new Error('Failed to get screen image');
      setError(error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const getScreenOutput = useCallback(async (projectId: string, screenId: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const output = await stitchService.getScreenOutput(projectId, screenId);
      return output;
    } catch (err) {
      const error = err instanceof Error ? err : new Error('Failed to get screen output');
      setError(error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const createProject = useCallback(async (title: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const result = await stitchService.createProject(title);
      return result;
    } catch (err) {
      const error = err instanceof Error ? err : new Error('Failed to create project');
      setError(error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const callTool = useCallback(async <T = unknown>(name: string, args: Record<string, unknown>) => {
    setIsLoading(true);
    setError(null);
    try {
      const result = await stitchService.callTool<T>(name, args);
      return result;
    } catch (err) {
      const error = err instanceof Error ? err : new Error(`Failed to call tool: ${name}`);
      setError(error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, []);

  return {
    isLoading,
    error,
    listProjects,
    getProject,
    listScreens,
    getScreen,
    generateScreen,
    editScreen,
    generateVariants,
    getScreenHtml,
    getScreenImage,
    getScreenOutput,
    createProject,
    callTool,
  };
}
