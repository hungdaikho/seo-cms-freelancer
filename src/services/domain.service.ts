import { BaseService } from './base.service';

export interface DomainOverview {
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

export interface TopKeyword {
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
    data: TopKeyword[];
    total: number;
    domain: string;
    country: string;
}

export interface DomainCompetitor {
    domain: string;
    competitionLevel: number;
    commonKeywords: number;
    authorityScore: number;
    trafficGap: number;
    organicKeywords: number;
    estimatedTraffic: number;
}

export interface CompetitorsResponse {
    data: DomainCompetitor[];
    total: number;
    domain: string;
    country: string;
}

export interface ContentTopic {
    topic: string;
    keywords: number;
    traffic: number;
    difficulty: number;
    opportunities: number;
    topKeywords: string[];
}

export interface TopicsResponse {
    data: ContentTopic[];
    total: number;
    domain: string;
}

export interface DomainAuthority {
    moz: number;
    ahrefs: number;
    semrush: number;
}

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

class DomainService extends BaseService {
    private baseUrl = '/api/v1/seo/domain-overview';

    /**
     * Get domain overview data
     */
    async getDomainOverview(params: GetDomainOverviewParams): Promise<DomainOverview> {
        const { domain, includeSubdomains } = params;
        const queryParams = new URLSearchParams();

        if (includeSubdomains !== undefined) {
            queryParams.append('includeSubdomains', includeSubdomains.toString());
        }

        const url = `${this.baseUrl}/${domain}${queryParams.toString() ? `?${queryParams.toString()}` : ''}`;

        return this.get<DomainOverview>(url);
    }

    /**
     * Get top keywords for domain
     */
    async getTopKeywords(params: GetTopKeywordsParams): Promise<TopKeywordsResponse> {
        const { domain, limit, country } = params;
        const queryParams = new URLSearchParams();

        if (limit !== undefined) {
            queryParams.append('limit', limit.toString());
        }
        if (country !== undefined) {
            queryParams.append('country', country);
        }

        const url = `${this.baseUrl}/top-keywords/${domain}${queryParams.toString() ? `?${queryParams.toString()}` : ''}`;

        return this.get<TopKeywordsResponse>(url);
    }

    /**
     * Get domain competitors
     */
    async getCompetitors(params: GetCompetitorsParams): Promise<CompetitorsResponse> {
        const { domain, limit, country } = params;
        const queryParams = new URLSearchParams();

        if (limit !== undefined) {
            queryParams.append('limit', limit.toString());
        }
        if (country !== undefined) {
            queryParams.append('country', country);
        }

        const url = `${this.baseUrl}/competitors/${domain}${queryParams.toString() ? `?${queryParams.toString()}` : ''}`;

        return this.get<CompetitorsResponse>(url);
    }

    /**
     * Get content topics for domain
     */
    async getTopics(params: GetTopicsParams): Promise<TopicsResponse> {
        const { domain, limit } = params;
        const queryParams = new URLSearchParams();

        if (limit !== undefined) {
            queryParams.append('limit', limit.toString());
        }

        const url = `${this.baseUrl}/topics/${domain}${queryParams.toString() ? `?${queryParams.toString()}` : ''}`;

        return this.get<TopicsResponse>(url);
    }

    /**
     * Get domain authority scores
     */
    async getDomainAuthority(domain: string): Promise<DomainAuthority> {
        const url = `${this.baseUrl}/authority/${domain}`;
        return this.get<DomainAuthority>(url);
    }
}

export const domainService = new DomainService();
