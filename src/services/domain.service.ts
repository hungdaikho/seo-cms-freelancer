import { BaseService } from './base.service';
import {
    DomainOverviewResponse,
    TopKeywordsResponse,
    CompetitorsResponse,
    TopicsResponse,
    DomainAuthorityMetrics,
    GetDomainOverviewParams,
    GetTopKeywordsParams,
    GetCompetitorsParams,
    GetTopicsParams,
    GetDomainAuthorityParams,
    DomainOverviewErrorResponse
} from '@/types/domain-overview.type';

class DomainService extends BaseService {
    private baseUrl = '/api/v1/seo/domain-overview';

    /**
     * Get domain overview data
     */
    async getDomainOverview(params: GetDomainOverviewParams): Promise<DomainOverviewResponse> {
        const { domain, includeSubdomains } = params;
        const queryParams = new URLSearchParams();

        if (includeSubdomains !== undefined) {
            queryParams.append('includeSubdomains', includeSubdomains.toString());
        }

        const url = `${this.baseUrl}/${domain}${queryParams.toString() ? `?${queryParams.toString()}` : ''}`;

        return this.get<DomainOverviewResponse>(url);
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
    async getDomainAuthority(params: GetDomainAuthorityParams): Promise<DomainAuthorityMetrics> {
        const { domain } = params;
        const url = `${this.baseUrl}/authority/${domain}`;
        return this.get<DomainAuthorityMetrics>(url);
    }
}

export const domainService = new DomainService();
