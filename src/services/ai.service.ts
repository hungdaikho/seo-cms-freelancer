import { BaseService } from './base.service';

export enum AIRequestType {
    KEYWORD_RESEARCH = 'keyword_research',
    CONTENT_OPTIMIZATION = 'content_optimization',
    META_GENERATION = 'meta_generation',
    CONTENT_IDEAS = 'content_ideas',
    COMPETITOR_ANALYSIS = 'competitor_analysis',
    SEO_AUDIT = 'seo_audit',
    // Advanced Content Generation
    BLOG_OUTLINE = 'blog_outline',
    PRODUCT_DESCRIPTION = 'product_description',
    SOCIAL_MEDIA = 'social_media',
    CONTENT_REWRITE = 'content_rewrite',
    CONTENT_EXPANSION = 'content_expansion',
    // Advanced SEO Analysis
    COMPETITOR_CONTENT_ANALYSIS = 'competitor_content_analysis',
    CONTENT_OPTIMIZATION_SUGGESTIONS = 'content_optimization_suggestions',
    SCHEMA_MARKUP_GENERATION = 'schema_markup_generation',
    // Advanced Keyword Research
    LONG_TAIL_KEYWORDS = 'long_tail_keywords',
    QUESTION_BASED_KEYWORDS = 'question_based_keywords',
    SEASONAL_KEYWORD_TRENDS = 'seasonal_keyword_trends',
    // Analytics
    CONTENT_PERFORMANCE_PREDICTION = 'content_performance_prediction',
}
export class AiService extends BaseService {
    constructor() {
        const config = require('@/config/server.config.json');
        super(config.HTTP_SERVER_URL + '/api/v1/ai');
    }

    processRequest(data: any) {
        return this.post<{ requestId: string; result: any }>('/request', data);
    } getUserRequests(userId: string, projectId?: string) {
        const params = new URLSearchParams({ userId, ...(projectId ? { projectId } : {}) });
        return this.get<any[]>(`/requests?${params.toString()}`);
    }

    getRequestById(requestId: string, userId: string) {
        return this.get<any>(`/request/${requestId}?userId=${userId}`);
    }

    getTools(category?: string, isActive?: boolean) {
        const params = new URLSearchParams();
        if (category) params.append('category', category);
        if (isActive !== undefined) params.append('isActive', String(isActive));
        return this.get<any[]>(`/tools?${params.toString()}`);
    }

    getToolUsage(userId: string, projectId: string, toolId: string) {
        const params = new URLSearchParams({ userId, projectId, toolId });
        return this.get<any>(`/tool-usage?${params.toString()}`);
    }

    getUsageAnalytics(userId: string, projectId?: string) {
        const params = new URLSearchParams({ userId, ...(projectId ? { projectId } : {}) });
        return this.get<any>(`/usage-analytics?${params.toString()}`);
    }

    createTemplate(data: { userId: string; projectId: string; dto: any }) {
        return this.post<any>('/template', data);
    }

    getTemplates(userId: string, projectId?: string, toolId?: string, isShared?: boolean) {
        const params = new URLSearchParams({ userId });
        if (projectId) params.append('projectId', projectId);
        if (toolId) params.append('toolId', toolId);
        if (isShared !== undefined) params.append('isShared', String(isShared));
        return this.get<any[]>(`/templates?${params.toString()}`);
    }

    createWorkflow(data: { userId: string; projectId: string; dto: any }) {
        return this.post<any>('/workflow', data);
    }

    getWorkflows(userId: string, projectId?: string) {
        const params = new URLSearchParams({ userId });
        if (projectId) params.append('projectId', projectId);
        return this.get<any[]>(`/workflows?${params.toString()}`);
    }

    executeWorkflow(data: { userId: string; projectId: string; workflowId: string; initialInput: any }) {
        return this.post<any>('/workflow/execute', data);
    }

    trackToolUsage(data: { userId: string; projectId: string; dto: any }) {
        return this.post<any>('/tool-usage', data);
    }
}

export const aiService = new AiService();
