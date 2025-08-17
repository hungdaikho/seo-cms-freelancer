import { BaseService } from "./base.service";
// @ts-ignore
import serverConfig from "@/config/server.config.json";
import {
  KeywordAnalysisParams,
  KeywordAnalysisResponse,
  KeywordVariationsResponse,
  KeywordMagicParams,
  KeywordMagicResponse,
  TopicResearchResponse,
  TopicIdeaParams,
  TopicIdeaResponse,
  TrendingTopicsResponse,
  QuestionBasedContentResponse,
  AIContentIdeaParams,
  AIContentIdeaResponse,
  RelatedTopicsResponse,
  KeywordDifficultyParams,
  KeywordDifficultyResponse,
  LongTailKeywordParams,
  LongTailKeywordResponse,
  QuestionKeywordParams,
  QuestionKeywordResponse,
  SeasonalTrendsParams,
  SeasonalTrendsResponse,
  PublicKeywordParams,
  PublicKeywordSuggestion,
  AITestConnection,
  SerpAnalysisResponse,
  TopPagesParams,
  TopPagesResponse,
} from "@/types/keyword-research.type";

function getBaseUrl() {
  if (typeof window !== "undefined") {
    // Chạy trên trình duyệt
    return window.location.protocol === "https:"
      ? serverConfig.HTTPS_SERVER_URL
      : serverConfig.HTTP_SERVER_URL;
  } else {
    // Chạy trên server (Node.js)
    // Ưu tiên HTTPS nếu có, hoặc fallback về HTTP
    return process.env.PROTOCOL === "https"
      ? serverConfig.HTTPS_SERVER_URL
      : serverConfig.HTTP_SERVER_URL;
  }
}

export class KeywordResearchService extends BaseService {
  constructor() {
    super(getBaseUrl() + "/api/v1");
  }

  // ====================================================================
  // KEYWORD RESEARCH APIs
  // ====================================================================

  /**
   * Get keyword analysis for a domain
   */
  async getKeywordAnalysis(
    params: KeywordAnalysisParams
  ): Promise<KeywordAnalysisResponse> {
    const { domain, ...queryParams } = params;
    const queryString = new URLSearchParams(
      Object.entries(queryParams).reduce((acc, [key, value]) => {
        if (value !== undefined) {
          acc[key] = String(value);
        }
        return acc;
      }, {} as Record<string, string>)
    ).toString();

    return this.get(`/seo/organic-research/keywords/${domain}?${queryString}`);
  }

  /**
   * Generate keyword variations
   */
  async getKeywordVariations(
    domain: string
  ): Promise<KeywordVariationsResponse> {
    return this.get(`/seo/organic-research/keywords/${domain}/variations`);
  }

  /**
   * Keyword Magic Tool - AI-powered keyword ideas
   */
  async getKeywordMagicTool(
    params: KeywordMagicParams
  ): Promise<KeywordMagicResponse> {
    return this.post("/ai/keywords/magic-tool", params);
  }

  /**
   * Get search volume and trends for a keyword
   */
  async getTopicResearch(
    keyword: string,
    country?: string
  ): Promise<TopicResearchResponse> {
    const queryString = country ? `?country=${country}` : "";
    return this.get(`/seo/topic-research/demo/${keyword}${queryString}`);
  }

  // ====================================================================
  // CONTENT IDEAS APIs
  // ====================================================================

  /**
   * Generate topic ideas
   */
  async getTopicIdeas(params: TopicIdeaParams): Promise<TopicIdeaResponse> {
    return this.post("/seo/topic-research/ideas", params);
  }

  /**
   * Get trending topics
   */
  async getTrendingTopics(
    category?: string,
    country?: string,
    limit?: number
  ): Promise<TrendingTopicsResponse> {
    const queryParams = new URLSearchParams();
    if (category) queryParams.append("category", category);
    if (country) queryParams.append("country", country);
    if (limit) queryParams.append("limit", String(limit));

    const queryString = queryParams.toString();
    return this.get(
      `/seo/topic-research/trending-topics${
        queryString ? `?${queryString}` : ""
      }`
    );
  }

  /**
   * Get question-based content ideas
   */
  async getQuestionBasedContent(
    topic: string,
    limit?: number,
    country?: string
  ): Promise<QuestionBasedContentResponse> {
    const queryParams = new URLSearchParams();
    if (limit) queryParams.append("limit", String(limit));
    if (country) queryParams.append("country", country);

    const queryString = queryParams.toString();
    return this.get(
      `/seo/topic-research/questions/${topic}${
        queryString ? `?${queryString}` : ""
      }`
    );
  }

  /**
   * AI-powered content ideas
   */
  async getAIContentIdeas(
    params: AIContentIdeaParams
  ): Promise<AIContentIdeaResponse> {
    return this.post("/ai/content-ideas", params);
  }

  /**
   * Related topics discovery
   */
  async getRelatedTopics(
    topic: string,
    limit?: number,
    country?: string
  ): Promise<RelatedTopicsResponse> {
    const queryParams = new URLSearchParams();
    if (limit) queryParams.append("limit", String(limit));
    if (country) queryParams.append("country", country);

    const queryString = queryParams.toString();
    return this.get(
      `/seo/topic-research/related/${topic}${
        queryString ? `?${queryString}` : ""
      }`
    );
  }

  // ====================================================================
  // KEYWORD DIFFICULTY APIs
  // ====================================================================

  /**
   * Analyze keyword difficulty
   */
  async analyzeKeywordDifficulty(
    params: KeywordDifficultyParams
  ): Promise<KeywordDifficultyResponse> {
    return this.post("/seo/keyword-difficulty/analyze", params);
  }

  // ====================================================================
  // AI-POWERED KEYWORD TOOLS
  // ====================================================================

  /**
   * Generate long-tail keywords
   */
  async getLongTailKeywords(
    params: LongTailKeywordParams
  ): Promise<LongTailKeywordResponse> {
    return this.post("/ai/keywords/long-tail", params);
  }

  /**
   * Generate question-based keywords
   */
  async getQuestionKeywords(
    params: QuestionKeywordParams
  ): Promise<QuestionKeywordResponse> {
    return this.post("/ai/keywords/questions", params);
  }

  /**
   * Get seasonal keyword trends
   */
  async getSeasonalTrends(
    params: SeasonalTrendsParams
  ): Promise<SeasonalTrendsResponse> {
    return this.post("/ai/keywords/seasonal-trends", params);
  }

  // ====================================================================
  // PUBLIC APIs (No Authentication)
  // ====================================================================

  /**
   * Public keyword suggestions
   */
  async getPublicKeywordSuggestions(
    params: PublicKeywordParams
  ): Promise<PublicKeywordSuggestion[]> {
    return this.post("/ai/seo/keyword-suggestions", params);
  }

  /**
   * Test AI connection
   */
  async testAIConnection(): Promise<AITestConnection> {
    return this.get("/ai/test-connection");
  }

  // ====================================================================
  // SERP ANALYSIS APIs
  // ====================================================================

  /**
   * Get SERP analysis data
   */
  async getSerpAnalysis(projectId: string): Promise<SerpAnalysisResponse> {
    return this.get(`/projects/${projectId}/serp-analysis`);
  }

  /**
   * Get top pages analysis
   */
  async getTopPages(params: TopPagesParams): Promise<TopPagesResponse> {
    const { domain, ...queryParams } = params;
    const queryString = new URLSearchParams(
      Object.entries(queryParams).reduce((acc, [key, value]) => {
        if (value !== undefined) {
          acc[key] = String(value);
        }
        return acc;
      }, {} as Record<string, string>)
    ).toString();

    return this.get(`/seo/organic-research/top-pages/${domain}?${queryString}`);
  }

  // ====================================================================
  // UTILITY METHODS
  // ====================================================================

  /**
   * Export keywords to CSV
   */
  async exportKeywords(
    keywords: string[],
    format: "csv" | "xlsx" = "csv"
  ): Promise<Blob> {
    const response = await this.axiosInstance.post(
      "/export/keywords",
      {
        keywords,
        format,
      },
      {
        responseType: "blob",
      }
    );
    return response.data as Blob;
  }

  /**
   * Save keywords to favorites
   */
  async saveToFavorites(
    keywords: string[]
  ): Promise<{ success: boolean; message: string }> {
    return this.post("/user/favorites/keywords", { keywords });
  }

  /**
   * Get user's favorite keywords
   */
  async getFavoriteKeywords(): Promise<{ keywords: string[] }> {
    return this.get("/user/favorites/keywords");
  }

  /**
   * Remove keywords from favorites
   */
  async removeFromFavorites(
    keywords: string[]
  ): Promise<{ success: boolean; message: string }> {
    return this.delete("/user/favorites/keywords", {
      data: { keywords },
    });
  }

  /**
   * Get keyword history
   */
  async getKeywordHistory(keyword: string, timeframe?: string): Promise<any> {
    const queryString = timeframe ? `?timeframe=${timeframe}` : "";
    return this.get(`/keywords/${keyword}/history${queryString}`);
  }

  /**
   * Bulk keyword analysis
   */
  async bulkAnalyzeKeywords(
    keywords: string[],
    country?: string
  ): Promise<any> {
    return this.post("/keywords/bulk-analyze", {
      keywords,
      country: country || "US",
    });
  }
}

export const keywordResearchService: KeywordResearchService =
  new KeywordResearchService();
