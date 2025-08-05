// Topic Research Types
export interface TopicResearchRequest {
    seedKeyword: string;
    country: string;
    industry?: string;
    contentType?: string;
    limit?: number;
}

export interface TopicIdea {
    topic: string;
    volume: number;
    difficulty: number;
    opportunity: number;
    questions: number;
    relatedKeywords: string[];
    contentGap: number;
    seasonality: 'high' | 'medium' | 'low';
    competitiveness: number;
}

export interface TopicResearchResponse {
    seedKeyword: string;
    country: string;
    industry?: string;
    contentType?: string;
    topicIdeas: TopicIdea[];
    total: number;
    metrics: {
        avgVolume: number;
        avgDifficulty: number;
        avgOpportunity: number;
        totalQuestions: number;
    };
}

export interface RelatedTopic {
    topic: string;
    relevance: number;
    volume: number;
    difficulty: number;
    trending: boolean;
    topKeywords: string[];
    contentOpportunities: number;
}

export interface RelatedTopicsResponse {
    baseTopic: string;
    country: string;
    relatedTopics: RelatedTopic[];
    total: number;
    clusters: {
        name: string;
        topics: string[];
        volume: number;
    }[];
}

export interface TopicQuestion {
    question: string;
    volume: number;
    difficulty: number;
    intent: 'informational' | 'commercial' | 'transactional' | 'navigational';
    relatedKeywords: string[];
    competitiveness: number;
    answerLength: 'short' | 'medium' | 'long';
}

export interface TopicQuestionsResponse {
    topic: string;
    country: string;
    questions: TopicQuestion[];
    total: number;
    questionTypes: {
        what: number;
        how: number;
        why: number;
        when: number;
        where: number;
        who: number;
    };
}

export interface BatchAnalysisRequest {
    topics: string[];
    country: string;
    includeQuestions?: boolean;
}

export interface BatchAnalysisResponse {
    batchResults: {
        topic: string;
        relatedTopics: RelatedTopic[];
        clusters: {
            name: string;
            topics: string[];
            volume: number;
        }[];
        topQuestions?: TopicQuestion[];
    }[];
    totalTopics: number;
    country: string;
    timestamp: string;
}

export interface TrendingTopic {
    topic: string;
    volume: number;
    growth: number;
}

export interface TrendingTopicsResponse {
    trendingTopics: TrendingTopic[];
    category?: string;
    country: string;
    lastUpdated: string;
}

export interface APIStatus {
    apis: {
        googleSearch: boolean;
        youtube: boolean;
        googleTrends: boolean;
    };
    hasRealData: boolean;
    message: string;
    recommendations: {
        freeOptions: string[];
        benefits: string[];
    };
    timestamp: string;
}

export interface KeywordDemo {
    keyword: string;
    country: string;
    overview: {
        searchVolume: number;
        competition: number;
        interest: number;
        videoCount: number;
    };
    relatedKeywords: string[];
    suggestions: string[];
    risingTopics: string[];
    topVideos: string[];
    questions: string[];
    contentOpportunities: {
        blogPosts: string[];
        videos: string[];
        socialMedia: string[];
    };
    dataSource: string;
    generatedAt: string;
}

// Request parameter types
export interface RelatedTopicsParams {
    limit?: number;
    country?: string;
}

export interface TopicQuestionsParams {
    limit?: number;
    country?: string;
}

export interface TrendingTopicsParams {
    category?: string;
    country?: string;
    limit?: number;
}

// State interface for Redux
export interface TopicResearchState {
    // Topic Ideas
    topicIdeas: TopicIdea[];
    topicResearchLoading: boolean;
    topicResearchError: string | null;

    // Related Topics
    relatedTopics: RelatedTopic[];
    relatedTopicsLoading: boolean;
    relatedTopicsError: string | null;

    // Questions
    questions: TopicQuestion[];
    questionsLoading: boolean;
    questionsError: string | null;

    // Batch Analysis
    batchResults: BatchAnalysisResponse | null;
    batchAnalysisLoading: boolean;
    batchAnalysisError: string | null;

    // Trending Topics
    trendingTopics: TrendingTopic[];
    trendingTopicsLoading: boolean;
    trendingTopicsError: string | null;

    // API Status
    apiStatus: APIStatus | null;
    apiStatusLoading: boolean;
    apiStatusError: string | null;

    // Keyword Demo
    keywordDemo: KeywordDemo | null;
    keywordDemoLoading: boolean;
    keywordDemoError: string | null;

    // Current search parameters
    currentSeedKeyword: string;
    currentCountry: string;
    currentIndustry: string;

    // Metrics
    metrics: {
        avgVolume: number;
        avgDifficulty: number;
        avgOpportunity: number;
        totalQuestions: number;
    };
}
