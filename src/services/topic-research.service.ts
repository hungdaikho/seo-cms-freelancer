import { BaseService } from "./base.service";
// @ts-ignore
import serverConfig from "@/config/server.config.json";
import {
    TopicResearchRequest,
    TopicResearchResponse,
    RelatedTopicsResponse,
    RelatedTopicsParams,
    TopicQuestionsResponse,
    TopicQuestionsParams,
    BatchAnalysisRequest,
    BatchAnalysisResponse,
    TrendingTopicsResponse,
    TrendingTopicsParams,
    APIStatus,
    KeywordDemo,
} from "@/types/topic-research.type";

export class TopicResearchService extends BaseService {
    constructor() {
        super(serverConfig.HTTP_SERVER_URL + "/api/v1");
    }

    /**
     * Generate topic ideas based on a seed keyword using real Google data
     */
    async generateTopicIdeas(params: TopicResearchRequest): Promise<TopicResearchResponse> {
        return this.post<TopicResearchResponse>("/seo/topic-research/ideas", params);
    }

    /**
     * Find related topics for content expansion and cluster building
     */
    async getRelatedTopics(
        topic: string,
        params?: RelatedTopicsParams
    ): Promise<RelatedTopicsResponse> {
        const queryString = params ? `?${new URLSearchParams(params as any).toString()}` : "";
        return this.get<RelatedTopicsResponse>(
            `/seo/topic-research/related/${encodeURIComponent(topic)}${queryString}`
        );
    }

    /**
     * Retrieve questions related to a topic for content creation and FAQ development
     */
    async getTopicQuestions(
        topic: string,
        params?: TopicQuestionsParams
    ): Promise<TopicQuestionsResponse> {
        const queryString = params ? `?${new URLSearchParams(params as any).toString()}` : "";
        return this.get<TopicQuestionsResponse>(
            `/seo/topic-research/questions/${encodeURIComponent(topic)}${queryString}`
        );
    }

    /**
     * Analyze multiple topics simultaneously for content planning
     */
    async batchAnalysis(params: BatchAnalysisRequest): Promise<BatchAnalysisResponse> {
        return this.post<BatchAnalysisResponse>("/seo/topic-research/batch-analysis", params);
    }

    /**
     * Discover currently trending topics for timely content creation
     */
    async getTrendingTopics(params?: TrendingTopicsParams): Promise<TrendingTopicsResponse> {
        const queryString = params ? `?${new URLSearchParams(params as any).toString()}` : "";
        return this.get<TrendingTopicsResponse>(`/seo/topic-research/trending-topics${queryString}`);
    }

    /**
     * Verify the status of external API integrations and data sources
     */
    async getAPIStatus(): Promise<APIStatus> {
        return this.get<APIStatus>("/seo/topic-research/api-status");
    }

    /**
     * Get a complete keyword analysis demonstration with all available data
     */
    async getKeywordDemo(keyword: string, country?: string): Promise<KeywordDemo> {
        const queryString = country ? `?country=${country}` : "";
        return this.get<KeywordDemo>(
            `/seo/topic-research/demo/${encodeURIComponent(keyword)}${queryString}`
        );
    }

    /**
     * Research comprehensive topic data (combines multiple endpoints)
     */
    async researchTopic(
        seedKeyword: string,
        country: string = "US",
        industry?: string,
        contentType?: string
    ): Promise<{
        topicIdeas: TopicResearchResponse;
        relatedTopics: RelatedTopicsResponse;
        questions: TopicQuestionsResponse;
    }> {
        try {
            const [topicIdeas, relatedTopics, questions] = await Promise.all([
                this.generateTopicIdeas({
                    seedKeyword,
                    country,
                    industry,
                    contentType,
                    limit: 50,
                }),
                this.getRelatedTopics(seedKeyword, {
                    country,
                    limit: 30,
                }),
                this.getTopicQuestions(seedKeyword, {
                    country,
                    limit: 50,
                }),
            ]);

            return {
                topicIdeas,
                relatedTopics,
                questions,
            };
        } catch (error) {
            console.error("Error in comprehensive topic research:", error);
            throw error;
        }
    }

    /**
     * Get content opportunities for a keyword
     */
    async getContentOpportunities(
        keyword: string,
        country: string = "US"
    ): Promise<{
        demo: KeywordDemo;
        trending: TrendingTopicsResponse;
    }> {
        try {
            const [demo, trending] = await Promise.all([
                this.getKeywordDemo(keyword, country),
                this.getTrendingTopics({ country, limit: 20 }),
            ]);

            return {
                demo,
                trending,
            };
        } catch (error) {
            console.error("Error getting content opportunities:", error);
            throw error;
        }
    }

    /**
     * Analyze competitor topics
     */
    async analyzeCompetitorTopics(
        topics: string[],
        country: string = "US",
        includeQuestions: boolean = true
    ): Promise<BatchAnalysisResponse> {
        return this.batchAnalysis({
            topics,
            country,
            includeQuestions,
        });
    }

    /**
     * Get topic clusters for content planning
     */
    async getTopicClusters(
        seedKeyword: string,
        country: string = "US"
    ): Promise<{
        clusters: {
            name: string;
            topics: string[];
            volume: number;
        }[];
        relatedTopics: RelatedTopicsResponse;
    }> {
        const relatedTopics = await this.getRelatedTopics(seedKeyword, {
            country,
            limit: 50,
        });

        return {
            clusters: relatedTopics.clusters,
            relatedTopics,
        };
    }
}

// Export singleton instance
export const topicResearchService = new TopicResearchService();
