export interface CalendarItem {
    id: string;
    title: string;
    type: 'blog_post' | 'social_media' | 'email' | 'landing_page' | 'video' | 'infographic';
    status: 'planned' | 'in_progress' | 'review' | 'published' | 'archived';
    priority: 'low' | 'medium' | 'high';
    publishDate: string;
    targetKeywords: string[];
    estimatedWordCount?: number;
    actualWordCount?: number;
    brief?: string;
    notes?: string;
    tags: string[];
    seoScore?: number;
    readabilityScore?: number;
    projectId: string;
    userId: string;
    user?: {
        id: string;
        name: string;
        email: string;
    };
    createdAt: string;
    updatedAt: string;
}

export interface CreateCalendarItemRequest {
    title: string;
    type: 'blog_post' | 'social_media' | 'email' | 'landing_page' | 'video' | 'infographic';
    status: 'planned' | 'in_progress' | 'review' | 'published' | 'archived';
    priority: 'low' | 'medium' | 'high';
    publishDate: string;
    targetKeywords: string[];
    estimatedWordCount?: number;
    brief?: string;
    notes?: string;
    tags: string[];
}

export interface UpdateCalendarItemRequest extends Partial<CreateCalendarItemRequest> {
    id: string;
}

export interface BulkUpdateItem {
    id: string;
    status?: 'planned' | 'in_progress' | 'review' | 'published' | 'archived';
    priority?: 'low' | 'medium' | 'high';
    publishDate?: string;
}

export interface BulkUpdateRequest {
    items: BulkUpdateItem[];
}

export interface CalendarFilters {
    startDate?: string;
    endDate?: string;
    status?: 'planned' | 'in_progress' | 'review' | 'published' | 'archived';
    type?: 'blog_post' | 'social_media' | 'email' | 'landing_page' | 'video' | 'infographic';
    author?: string;
}

export interface CalendarMetrics {
    planned: number;
    in_progress: number;
    review: number;
    published: number;
    overdue: number;
}

export interface CalendarResponse {
    items: CalendarItem[];
    metrics: CalendarMetrics;
}

// Content Ideas
export interface ContentIdea {
    title: string;
    description: string;
    contentType: string;
    targetKeywords: string[];
    difficulty: 'easy' | 'medium' | 'hard';
    estimatedTraffic: number;
}

export interface ContentIdeaRequest {
    topic: string;
    audience: string;
    format: string;
    count: number;
}

export interface ContentIdeaResponse {
    requestId: string;
    result: {
        ideas: ContentIdea[];
        contentPillars: string[];
        seasonalTopics: {
            topic: string;
            season: string;
            opportunity: string;
        }[];
    };
}

// Topic Research
export interface TopicIdea {
    keyword: string;
    searchVolume: number;
    difficulty: number;
    opportunity: number;
    relatedTopics: string[];
}

export interface TopicResearchRequest {
    seedKeyword: string;
    country: string;
    limit: number;
    contentType: string;
}

export interface TopicResearchResponse {
    topicIdeas: TopicIdea[];
    trendingTopics: string[];
}

export interface TopicQuestion {
    question: string;
    searchVolume: number;
    difficulty: 'low' | 'medium' | 'high';
    contentType: string;
}

export interface TopicQuestionsResponse {
    questions: TopicQuestion[];
}

export interface BatchTopicAnalysisRequest {
    topics: string[];
    country: string;
    includeQuestions: boolean;
}

// Content Performance
export interface ContentPerformanceOverview {
    totalViews: number;
    totalEngagement: number;
    averageTimeOnPage: number;
    bounceRate: number;
    conversionRate: number;
}

export interface TopPerformingContent {
    contentId: string;
    title: string;
    views: number;
    engagement: number;
    conversionRate: number;
    socialShares: number;
}

export interface ContentTrend {
    date: string;
    views: number;
    engagement: number;
}

export interface ContentPerformanceResponse {
    overview: ContentPerformanceOverview;
    topPerforming: TopPerformingContent[];
    trends: ContentTrend[];
}

export interface ContentPerformanceFilters {
    period?: '7d' | '30d' | '90d' | 'custom';
    startDate?: string;
    endDate?: string;
    contentIds?: string[];
    groupBy?: 'day' | 'week' | 'month';
}

// Content Categories
export interface ContentCategory {
    id: string;
    name: string;
    slug: string;
    description: string;
    color: string;
    parentId?: string;
    projectId: string;
    createdAt: string;
    updatedAt: string;
}

export interface CreateCategoryRequest {
    name: string;
    slug: string;
    description: string;
    color: string;
    parentId?: string;
}

export interface UpdateCategoryRequest extends Partial<CreateCategoryRequest> {
    id: string;
}

// AI Content
export interface ContentOptimizationRequest {
    content: string;
    targetKeyword: string;
    goals: ('improve_seo' | 'increase_readability' | 'add_keywords')[];
}

export interface ContentRewriteRequest {
    content: string;
    tone: 'professional' | 'casual' | 'formal' | 'friendly';
    style: 'conversational' | 'technical' | 'marketing';
    length: 'shorter' | 'longer' | 'same';
}

export interface GenerateContentFromTemplateRequest {
    templateId: string;
    variables: Record<string, string>;
    targetKeyword: string;
    additionalKeywords: string[];
}
