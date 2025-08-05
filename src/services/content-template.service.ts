import { BaseService } from './base.service';
import {
    ContentTemplate,
    CreateContentTemplateRequest,
    UpdateContentTemplateRequest,
    AITemplate,
    CreateAITemplateRequest,
    GenerateContentRequest
} from '@/types/content-template.type';

class ContentTemplateService extends BaseService {
    constructor() {
        const config = require('@/config/server.config.json');
        super(config.HTTP_SERVER_URL + '/api/v1/');
    }

    // Template CRUD Operations
    async getTemplates(projectId: string): Promise<ContentTemplate[]> {
        return this.get<ContentTemplate[]>(`/api/v1/projects/${projectId}/content/templates`);
    }

    async getTemplateById(projectId: string, templateId: string): Promise<ContentTemplate> {
        return this.get<ContentTemplate>(`/api/v1/projects/${projectId}/content/templates/${templateId}`);
    }

    async createTemplate(projectId: string, data: CreateContentTemplateRequest): Promise<ContentTemplate> {
        return this.post<ContentTemplate>(`/api/v1/projects/${projectId}/content/templates`, data);
    }

    async updateTemplate(projectId: string, templateId: string, data: UpdateContentTemplateRequest): Promise<ContentTemplate> {
        return this.put<ContentTemplate>(`/api/v1/projects/${projectId}/content/templates/${templateId}`, data);
    }

    async deleteTemplate(projectId: string, templateId: string): Promise<{ message: string }> {
        return this.delete<{ message: string }>(`/api/v1/projects/${projectId}/content/templates/${templateId}`);
    }

    // AI Template Operations
    async getAITemplates(params?: {
        projectId?: string;
        toolId?: string;
        isShared?: boolean;
    }): Promise<AITemplate[]> {
        const queryParams = new URLSearchParams();
        if (params?.projectId) queryParams.append('projectId', params.projectId);
        if (params?.toolId) queryParams.append('toolId', params.toolId);
        if (params?.isShared !== undefined) queryParams.append('isShared', params.isShared.toString());

        const query = queryParams.toString() ? `?${queryParams.toString()}` : '';
        return this.get<AITemplate[]>(`/ai/templates${query}`);
    }

    async createAITemplate(projectId: string, data: CreateAITemplateRequest): Promise<AITemplate> {
        return this.post<AITemplate>(`/ai/templates?projectId=${projectId}`, data);
    }

    async updateAITemplate(templateId: string, data: Partial<CreateAITemplateRequest>): Promise<AITemplate> {
        return this.put<AITemplate>(`/ai/templates/${templateId}`, data);
    }

    async deleteAITemplate(templateId: string): Promise<{ message: string }> {
        return this.delete<{ message: string }>(`/ai/templates/${templateId}`);
    }

    // Content Generation
    async generateContent(projectId: string, data: GenerateContentRequest): Promise<{ content: string }> {
        return this.post<{ content: string }>(`/api/v1/projects/${projectId}/content/ai/generate`, data);
    }

    // Template Export/Import
    async exportTemplate(projectId: string, templateId: string): Promise<Blob> {
        const response = await this.axiosInstance.get(
            `/api/v1/projects/${projectId}/content/templates/${templateId}/export`,
            { responseType: 'blob' }
        );
        return response.data;
    }

    async importTemplate(projectId: string, file: File): Promise<ContentTemplate> {
        const formData = new FormData();
        formData.append('template', file);

        return this.post<ContentTemplate>(
            `/api/v1/projects/${projectId}/content/templates/import`,
            formData,
            {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            }
        );
    }

    // Template Preview
    async previewTemplate(
        projectId: string,
        templateId: string,
        variables: Record<string, string>
    ): Promise<{ preview: string }> {
        return this.post<{ preview: string }>(
            `/api/v1/projects/${projectId}/content/templates/${templateId}/preview`,
            { variables }
        );
    }

    // Template Analytics
    async getTemplateUsageStats(projectId: string, templateId: string): Promise<{
        usageCount: number;
        lastUsed: string;
        popularVariables: Array<{ name: string; usageCount: number }>;
    }> {
        return this.get(`/api/v1/projects/${projectId}/content/templates/${templateId}/stats`);
    }
}

export const contentTemplateService = new ContentTemplateService();
export default contentTemplateService;
