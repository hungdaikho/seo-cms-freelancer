// Domain Overview API Types based on API documentation

export interface DomainOverviewResponse {
    domain: string;
    authorityScore: number;
    organicKeywords: number;
    organicTraffic: number;
    organicCost: number;
    backlinks: number;
    referringDomains: number;
    topCountries: Array<{
        country: string;
        traffic: number;
        percentage: number;
    }>;
    trafficTrend: Array<{
        date: string;
        traffic: number;
    }>;
}

export interface TopKeywordItem {
    keyword: string;
    position: number;
    searchVolume: number;
    traffic: number;
    cpc: number;
    difficulty: number;
    trend: 'up' | 'down' | 'stable';
    url: string;
}

export interface TopKeywordsResponse {
    data: TopKeywordItem[];
    total: number;
    domain: string;
    country: string;
}

export interface CompetitorItem {
    domain: string;
    competitionLevel: number;
    commonKeywords: number;
    authorityScore: number;
    trafficGap: number;
    organicKeywords: number;
    estimatedTraffic: number;
}

export interface CompetitorsResponse {
    data: CompetitorItem[];
    total: number;
    domain: string;
    country: string;
}

export interface ContentTopicItem {
    topic: string;
    keywords: number;
    traffic: number;
    difficulty: number;
    opportunities: number;
    topKeywords: string[];
}

export interface TopicsResponse {
    data: ContentTopicItem[];
    total: number;
    domain: string;
}

export interface DomainAuthorityMetrics {
    domain: string;
    metrics: {
        mozDA: number;
        mozPA: number;
        ahrefsDR: number;
        ahrefsUR: number;
        semrushAS: number;
        majesticTF: number;
        majesticCF: number;
    };
    backlinks: {
        total: number;
        dofollow: number;
        nofollow: number;
        referringDomains: number;
        referringIPs: number;
    };
    trust: {
        trustFlow: number;
        citationFlow: number;
        spamScore: number;
    };
}

// Request parameters
export interface GetDomainOverviewParams {
    domain: string;
    includeSubdomains?: boolean;
}

export interface GetTopKeywordsParams {
    domain: string;
    limit?: number;
    country?: string;
}

export interface GetCompetitorsParams {
    domain: string;
    limit?: number;
    country?: string;
}

export interface GetTopicsParams {
    domain: string;
    limit?: number;
}

export interface GetDomainAuthorityParams {
    domain: string;
}

// Error response
export interface DomainOverviewErrorResponse {
    statusCode: number;
    message: string;
    error: string;
}
