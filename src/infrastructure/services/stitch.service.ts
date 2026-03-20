/**
 * Stitch Service
 * @description Main service implementation for Google Labs Stitch SDK wrapper
 */

import type { IStitchService } from '../../domain/interfaces';
import type {
  StitchProject,
  StitchScreen,
  DeviceType,
  ModelId,
  ScreenGenerateInput,
  ScreenEditInput,
  ScreenVariantsInput,
  ScreenOutput,
} from '../../domain/entities';
import { STITCH_ERROR_MESSAGES } from '../constants';
import { stitch, type Project as SDKProject } from '@google/stitch-sdk';

export interface StitchServiceConfig {
  apiKey?: string;
  baseUrl?: string;
}

type DeviceTypeSDK = 'MOBILE' | 'DESKTOP' | 'TABLET' | 'AGNOSTIC';
type ModelIdSDK = 'GEMINI_3_PRO' | 'GEMINI_3_FLASH';

const DEVICE_TYPES_SDK: Record<DeviceType, DeviceTypeSDK> = {
  MOBILE: 'MOBILE',
  DESKTOP: 'DESKTOP',
  TABLET: 'TABLET',
  AGNOSTIC: 'AGNOSTIC',
};

const MODEL_IDS_SDK: Record<ModelId, ModelIdSDK> = {
  GEMINI_3_PRO: 'GEMINI_3_PRO',
  GEMINI_3_FLASH: 'GEMINI_3_FLASH',
};

class StitchService implements IStitchService {
  private config: StitchServiceConfig | null = null;

  initialize(config: StitchServiceConfig): void {
    this.config = config;
    // SDK uses environment variable STITCH_API_KEY by default
  }

  isInitialized(): boolean {
    return this.config !== null;
  }

  private ensureInitialized(): void {
    if (!this.isInitialized()) {
      throw new Error(STITCH_ERROR_MESSAGES.NOT_INITIALIZED);
    }
  }

  private validateProjectId(projectId: string): void {
    if (!projectId || projectId.trim().length === 0) {
      throw new Error(STITCH_ERROR_MESSAGES.INVALID_PROJECT_ID);
    }
  }

  private validateScreenId(screenId: string): void {
    if (!screenId || screenId.trim().length === 0) {
      throw new Error('Invalid screen ID provided.');
    }
  }

  async listProjects(): Promise<StitchProject[]> {
    this.ensureInitialized();
    const projects = await stitch.projects();

    return projects.map(
      (p: { id: string; projectId: string }): StitchProject => ({
        id: p.id,
        projectId: p.projectId,
      })
    );
  }

  getProject(projectId: string): StitchProject {
    this.ensureInitialized();
    this.validateProjectId(projectId);

    const project = stitch.project(projectId);

    return {
      id: project.id,
      projectId: project.projectId,
    };
  }

  private async getSDKProject(projectId: string): Promise<SDKProject> {
    this.validateProjectId(projectId);

    const project = stitch.project(projectId);

    // Force a call to validate the project exists
    await project.screens();

    return project;
  }

  async listScreens(projectId: string): Promise<StitchScreen[]> {
    const project = await this.getSDKProject(projectId);
    const screens = await project.screens();

    return screens.map(
      (s: { id: string; screenId: string; projectId: string }): StitchScreen => ({
        id: s.id,
        screenId: s.screenId,
        projectId: s.projectId,
      })
    );
  }

  async getScreen(projectId: string, screenId: string): Promise<StitchScreen> {
    this.validateScreenId(screenId);

    const project = await this.getSDKProject(projectId);
    const screen = await project.getScreen(screenId);

    return {
      id: screen.id,
      screenId: screen.screenId,
      projectId: screen.projectId,
    };
  }

  async generateScreen(projectId: string, input: ScreenGenerateInput): Promise<StitchScreen> {
    const project = await this.getSDKProject(projectId);

    const deviceTypeSDK = input.deviceType ? DEVICE_TYPES_SDK[input.deviceType] : undefined;
    const screen = await project.generate(input.prompt, deviceTypeSDK);

    return {
      id: screen.id,
      screenId: screen.screenId,
      projectId: screen.projectId,
    };
  }

  async editScreen(
    _projectId: string,
    screenId: string,
    input: ScreenEditInput
  ): Promise<StitchScreen> {
    this.validateScreenId(screenId);

    const project = stitch.project(_projectId);
    const screen = await project.getScreen(screenId);

    const deviceTypeSDK = input.deviceType ? DEVICE_TYPES_SDK[input.deviceType] : undefined;
    const modelIdSDK = input.modelId ? MODEL_IDS_SDK[input.modelId] : undefined;
    const edited = await screen.edit(input.prompt, deviceTypeSDK, modelIdSDK);

    return {
      id: edited.id,
      screenId: edited.screenId,
      projectId: edited.projectId,
    };
  }

  async generateVariants(
    _projectId: string,
    screenId: string,
    input: ScreenVariantsInput
  ): Promise<StitchScreen[]> {
    this.validateScreenId(screenId);

    const project = stitch.project(_projectId);
    const screen = await project.getScreen(screenId);

    const deviceTypeSDK = input.deviceType ? DEVICE_TYPES_SDK[input.deviceType] : undefined;
    const modelIdSDK = input.modelId ? MODEL_IDS_SDK[input.modelId] : undefined;

    const variants = await screen.variants(input.prompt, input.options, deviceTypeSDK, modelIdSDK);

    return variants.map(
      (v: { id: string; screenId: string; projectId: string }): StitchScreen => ({
        id: v.id,
        screenId: v.screenId,
        projectId: v.projectId,
      })
    );
  }

  async getScreenHtml(_projectId: string, screenId: string): Promise<string> {
    this.validateScreenId(screenId);

    const project = stitch.project(_projectId);
    const screen = await project.getScreen(screenId);

    return await screen.getHtml();
  }

  async getScreenImage(_projectId: string, screenId: string): Promise<string> {
    this.validateScreenId(screenId);

    const project = stitch.project(_projectId);
    const screen = await project.getScreen(screenId);

    return await screen.getImage();
  }

  async getScreenOutput(projectId: string, screenId: string): Promise<ScreenOutput> {
    const [htmlUrl, imageUrl] = await Promise.all([
      this.getScreenHtml(projectId, screenId),
      this.getScreenImage(projectId, screenId),
    ]);

    return { htmlUrl, imageUrl };
  }

  async createProject(title: string): Promise<{ projectId: string }> {
    this.ensureInitialized();
    const result = await stitch.callTool<{ projectId: string }>('create_project', { title });

    return result;
  }

  async callTool<T = unknown>(name: string, args: Record<string, unknown>): Promise<T> {
    this.ensureInitialized();
    return await stitch.callTool<T>(name, args);
  }
}

export const stitchService = new StitchService();
