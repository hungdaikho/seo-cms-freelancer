import { BaseService } from './base.service';
import {
    CalendarItem,
    CreateCalendarItemRequest,
    UpdateCalendarItemRequest,
    BulkUpdateRequest,
    CalendarFilters,
    CalendarResponse,
    ContentIdeaRequest,
    ContentIdeaResponse,
    TopicResearchRequest,
    TopicResearchResponse,
    TopicQuestionsResponse,
    BatchTopicAnalysisRequest,
    ContentPerformanceResponse,
    ContentPerformanceFilters,
    ContentCategory,
    CreateCategoryRequest,
    UpdateCategoryRequest,
    ContentOptimizationRequest,
    ContentRewriteRequest,
    GenerateContentFromTemplateRequest
} from '@/types/content-planning.type';

class ContentPlanningService extends BaseService {
    constructor() {
        const config = require('@/config/server.config.json');
        super(config.HTTP_SERVER_URL);
    }

    // Calendar Management
    async getCalendarItems(projectId: string, filters?: CalendarFilters): Promise<CalendarResponse> {
        const queryParams = new URLSearchParams();
        if (filters?.startDate) queryParams.append('startDate', filters.startDate);
        if (filters?.endDate) queryParams.append('endDate', filters.endDate);
        if (filters?.status) queryParams.append('status', filters.status);
        if (filters?.type) queryParams.append('type', filters.type);
        if (filters?.author) queryParams.append('author', filters.author);

        const query = queryParams.toString() ? `?${queryParams.toString()}` : '';
        return this.get<CalendarResponse>(`/api/v1/projects/${projectId}/content/calendar/items${query}`);
    }

    async createCalendarItem(projectId: string, data: CreateCalendarItemRequest): Promise<CalendarItem> {
        return this.post<CalendarItem>(`/api/v1/projects/${projectId}/content/calendar/items`, data);
    }

    async updateCalendarItem(projectId: string, itemId: string, data: UpdateCalendarItemRequest): Promise<CalendarItem> {
        return this.put<CalendarItem>(`/api/v1/projects/${projectId}/content/calendar/items/${itemId}`, data);
    }

    async bulkUpdateCalendarItems(projectId: string, data: BulkUpdateRequest): Promise<{ message: string }> {
        return this.post<{ message: string }>(`/api/v1/projects/${projectId}/content/calendar/bulk-update`, data);
    }

    async deleteCalendarItem(projectId: string, itemId: string): Promise<{ message: string }> {
        return this.delete<{ message: string }>(`/api/v1/projects/${projectId}/content/calendar/items/${itemId}`);
    }

    // AI-Powered Content Planning
    async generateContentIdeas(data: ContentIdeaRequest): Promise<ContentIdeaResponse> {
        return this.post<ContentIdeaResponse>('/api/v1/ai/content-ideas', data);
    }

    async optimizeContent(data: ContentOptimizationRequest): Promise<{ optimizedContent: string }> {
        return this.post<{ optimizedContent: string }>('/api/v1/ai/content-optimization', data);
    }

    async rewriteContent(projectId: string, data: ContentRewriteRequest): Promise<{ rewrittenContent: string }> {
        return this.post<{ rewrittenContent: string }>(`/api/v1/projects/${projectId}/content/ai/rewrite`, data);
    }

    async generateContentFromTemplate(projectId: string, data: GenerateContentFromTemplateRequest): Promise<{ content: string }> {
        return this.post<{ content: string }>(`/api/v1/projects/${projectId}/content/ai/generate`, data);
    }

    // Topic Research & Ideas
    async generateTopicIdeas(data: TopicResearchRequest): Promise<TopicResearchResponse> {
        return this.post<TopicResearchResponse>('/api/v1/seo/topic-research/ideas', data);
    }

    async getRelatedTopics(topic: string, limit: number = 30, country: string = 'US'): Promise<TopicResearchResponse> {
        const queryParams = new URLSearchParams();
        queryParams.append('limit', limit.toString());
        queryParams.append('country', country);

        return this.get<TopicResearchResponse>(`/api/v1/seo/topic-research/related/${encodeURIComponent(topic)}?${queryParams.toString()}`);
    }

    async getTopicQuestions(topic: string): Promise<TopicQuestionsResponse> {
        return this.get<TopicQuestionsResponse>(`/api/v1/seo/topic-research/questions/${encodeURIComponent(topic)}`);
    }

    async batchTopicAnalysis(data: BatchTopicAnalysisRequest): Promise<any> {
        return this.post('/api/v1/seo/topic-research/batch-analysis', data);
    }

    // Content Performance Analytics
    async getContentPerformance(projectId: string, filters?: ContentPerformanceFilters): Promise<ContentPerformanceResponse> {
        const queryParams = new URLSearchParams();
        if (filters?.period) queryParams.append('period', filters.period);
        if (filters?.startDate) queryParams.append('startDate', filters.startDate);
        if (filters?.endDate) queryParams.append('endDate', filters.endDate);
        if (filters?.contentIds) queryParams.append('contentIds', filters.contentIds.join(','));
        if (filters?.groupBy) queryParams.append('groupBy', filters.groupBy);

        const query = queryParams.toString() ? `?${queryParams.toString()}` : '';
        return this.get<ContentPerformanceResponse>(`/api/v1/projects/${projectId}/content/analytics/performance${query}`);
    }

    async getContentROI(projectId: string): Promise<any> {
        return this.get(`/api/v1/projects/${projectId}/content/analytics/roi`);
    }

    async getCompetitiveContentAnalysis(projectId: string, keyword: string, competitors: string[]): Promise<any> {
        const queryParams = new URLSearchParams();
        queryParams.append('keyword', keyword);
        queryParams.append('competitors', competitors.join(','));

        return this.get(`/api/v1/projects/${projectId}/content/seo/competitive-analysis?${queryParams.toString()}`);
    }

    // Content Categories & Organization
    async getCategories(projectId: string): Promise<ContentCategory[]> {
        return this.get<ContentCategory[]>(`/api/v1/projects/${projectId}/content/categories`);
    }

    async createCategory(projectId: string, data: CreateCategoryRequest): Promise<ContentCategory> {
        return this.post<ContentCategory>(`/api/v1/projects/${projectId}/content/categories`, data);
    }

    async updateCategory(projectId: string, categoryId: string, data: UpdateCategoryRequest): Promise<ContentCategory> {
        return this.put<ContentCategory>(`/api/v1/projects/${projectId}/content/categories/${categoryId}`, data);
    }

    async deleteCategory(projectId: string, categoryId: string): Promise<{ message: string }> {
        return this.delete<{ message: string }>(`/api/v1/projects/${projectId}/content/categories/${categoryId}`);
    }
}

export const contentPlanningService = new ContentPlanningService();
export default contentPlanningService;
