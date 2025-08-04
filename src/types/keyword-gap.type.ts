// Keyword Gap Analysis Types

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
    primaryKeywords: KeywordGapItem[];
    longTailKeywords: KeywordGapItem[];
    questionKeywords: KeywordGapItem[];
}

export interface CompetitorAnalysis {
    domain: string;
    sharedKeywords: string[];
    keywordGaps: string[];
    competitorStrength: number;
}

export interface KeywordGapItem {
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
    competitors: CompetitorDomain[];
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

// Redux State Types
export interface KeywordGapFilters {
    difficulty: [number, number];
    volume: [number, number];
    intent: string;
    opportunity: string;
    minCompetitorStrength?: number;
}

export interface KeywordGapState {
    // Analysis data
    analysisResult: KeywordGapResponse | null;
    keywordOpportunities: KeywordGapItem[];
    competitorDiscovery: CompetitorDiscoveryResponse | null;
    competitorAnalysis: CompetitorAnalysisResponse | null;

    // UI state
    selectedCompetitors: string[];
    filters: KeywordGapFilters;
    activeTab: string;

    // Loading states
    isAnalyzing: boolean;
    isDiscoveringCompetitors: boolean;
    isAnalyzingCompetitor: boolean;

    // Error states
    analysisError: string | null;
    discoveryError: string | null;
    competitorError: string | null;

    // Meta data
    lastAnalysisDate: string | null;
    totalOpportunities: number;
    potentialTraffic: number;
}
