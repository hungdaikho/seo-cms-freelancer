import { BaseService } from "./base.service";

export interface KeywordGapRequest {
    seedKeyword: string;
    competitorDomains: string[];
    includeCompetitorKeywords: boolean;
    industry?: string;
    location?: string;
    language?: string;
    minDifficulty?: number;
    maxDifficulty?: number;
    minVolume?: number;
    limitPerCategory?: number;
}

export interface KeywordGapResponse {
    seedKeyword: string;
    totalKeywords: number;
    summary: {
        avgSearchVolume: number;
        avgDifficulty: number;
        totalEstimatedTraffic: number;
        topIntent: string;
        competitionLevel: string;
    };
    competitorAnalysis: CompetitorAnalysis[];
    primaryKeywords: KeywordData[];
    longTailKeywords: KeywordData[];
    questionKeywords: KeywordData[];
}

export interface CompetitorAnalysis {
    domain: string;
    sharedKeywords: string[];
    keywordGaps: string[];
    competitorStrength: number;
}

export interface KeywordData {
    keyword: string;
    searchVolume: number;
    difficulty: number;
    cpc: number;
    intent: "informational" | "navigational" | "commercial" | "transactional";
    opportunity: "easy-win" | "content-gap" | "quick-win" | "long-term";
    competitorRankings: Record<string, number>;
    yourRanking?: number;
    potentialTraffic: number;
}

export interface CompetitorDiscoveryRequest {
    domain: string;
    country: string;
    limit?: number;
}

export interface CompetitorDiscoveryResponse {
    domain: string;
    data: CompetitorDomain[];
    totalCompetitors: number;
    analysisDate: string;
}

export interface CompetitorDomain {
    domain: string;
    commonKeywords: number;
    competitionLevel: string;
    overlapScore: number;
    estimatedTraffic: number;
    keywordGaps: number;
    totalKeywords?: number;
    organicTraffic?: number;
    averagePosition?: number;
}

export interface CompetitorAnalysisRequest {
    competitorDomain: string;
    yourDomain: string;
    industry: string;
}

export interface CompetitorAnalysisResponse {
    strengths: string[];
    weaknesses: string[];
    opportunities: string[];
    contentGaps: string[];
    recommendations: CompetitorRecommendation[];
}

export interface CompetitorRecommendation {
    category: string;
    recommendation: string;
    priority: "Low" | "Medium" | "High";
    effort: "Low" | "Medium" | "High";
}

class KeywordGapService extends BaseService {
    constructor() {
        const config = require('@/config/server.config.json');
        super(config.HTTP_SERVER_URL + "/api/v1");
    }

    /**
     * Analyze keyword gaps using Magic Tool
     */
    async analyzeKeywordGaps(request: KeywordGapRequest): Promise<KeywordGapResponse> {
        return this.post<KeywordGapResponse>("/ai/keywords/magic-tool", request);
    }

    /**
     * Discover competitors for a domain
     */
    async discoverCompetitors(
        domain: string,
        country: string = "US",
        limit: number = 20
    ): Promise<CompetitorDiscoveryResponse> {
        return this.get<CompetitorDiscoveryResponse>(
            `/seo/organic-research/competitors/${domain}?country=${country}&limit=${limit}`
        );
    }

    /**
     * Analyze specific competitor strategy
     */
    async analyzeCompetitor(request: CompetitorAnalysisRequest): Promise<CompetitorAnalysisResponse> {
        return this.post<CompetitorAnalysisResponse>("/ai/competitor-analysis", request);
    }

    /**
     * Get keyword opportunities with filtering
     */
    getKeywordOpportunities(
        analysisResult: KeywordGapResponse,
        filters?: {
            minCompetitorStrength?: number;
            maxDifficulty?: number;
            minVolume?: number;
            intent?: string;
            opportunity?: string;
        }
    ): KeywordData[] {
        let opportunities: KeywordData[] = [];

        // Combine all keyword types
        opportunities = [
            ...analysisResult.primaryKeywords,
            ...analysisResult.longTailKeywords,
            ...analysisResult.questionKeywords,
        ];

        // Apply filters
        if (filters) {
            opportunities = opportunities.filter((keyword) => {
                if (filters.maxDifficulty && keyword.difficulty > filters.maxDifficulty) {
                    return false;
                }
                if (filters.minVolume && keyword.searchVolume < filters.minVolume) {
                    return false;
                }
                if (filters.intent && filters.intent !== "all" && keyword.intent !== filters.intent) {
                    return false;
                }
                if (filters.opportunity && filters.opportunity !== "all" && keyword.opportunity !== filters.opportunity) {
                    return false;
                }
                return true;
            });
        }

        // Sort by potential traffic descending
        return opportunities.sort((a, b) => b.potentialTraffic - a.potentialTraffic);
    }

    /**
     * Export keyword gaps to CSV format
     */
    exportKeywordGaps(keywords: KeywordData[]): string {
        const headers = [
            "Keyword",
            "Search Volume",
            "Difficulty",
            "CPC",
            "Intent",
            "Opportunity",
            "Potential Traffic",
            "Competitor Rankings",
        ];

        const csvContent = [
            headers.join(","),
            ...keywords.map((keyword) => [
                `"${keyword.keyword}"`,
                keyword.searchVolume,
                keyword.difficulty,
                keyword.cpc,
                keyword.intent,
                keyword.opportunity,
                keyword.potentialTraffic,
                `"${Object.entries(keyword.competitorRankings)
                    .map(([domain, position]) => `${domain}:${position}`)
                    .join("; ")}"`,
            ].join(",")),
        ].join("\n");

        return csvContent;
    }
}

export const keywordGapService = new KeywordGapService();
