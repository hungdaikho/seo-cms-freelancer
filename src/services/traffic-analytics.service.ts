import { BaseService } from './base.service';
import {
    TrafficOverviewRequest,
    TrafficOverviewResponse,
    PagePerformanceRequest,
    PagePerformanceResponse,
    TrafficSourcesResponse,
    UserBehaviorRequest,
    UserBehaviorResponse,
    RealTimeResponse,
    SyncResponse,
    GoogleAnalyticsIntegration,
} from '@/types/traffic-analytics.type';

export class TrafficAnalyticsService extends BaseService {
    constructor() {
        const config = require('@/config/server.config.json');
        super(config.HTTP_SERVER_URL);
    }

    // Traffic Overview
    async getTrafficOverview(
        projectId: string,
        params?: TrafficOverviewRequest
    ): Promise<TrafficOverviewResponse> {
        const queryParams = new URLSearchParams();

        if (params?.period) queryParams.append('period', params.period);
        if (params?.startDate) queryParams.append('startDate', params.startDate);
        if (params?.endDate) queryParams.append('endDate', params.endDate);
        if (params?.metrics) {
            params.metrics.forEach(metric => queryParams.append('metrics', metric));
        }
        if (params?.dimensions) {
            params.dimensions.forEach(dimension => queryParams.append('dimensions', dimension));
        }

        const url = `/api/v1/projects/${projectId}/traffic-analytics/overview${queryParams.toString() ? `?${queryParams.toString()}` : ''
            }`;

        return this.get<TrafficOverviewResponse>(url);
    }

    // Page Performance
    async getPagePerformance(
        projectId: string,
        params?: PagePerformanceRequest
    ): Promise<PagePerformanceResponse> {
        const queryParams = new URLSearchParams();

        if (params?.period) queryParams.append('period', params.period);
        if (params?.pagePath) queryParams.append('pagePath', params.pagePath);
        if (params?.sortBy) queryParams.append('sortBy', params.sortBy);
        if (params?.sortOrder) queryParams.append('sortOrder', params.sortOrder);
        if (params?.limit) queryParams.append('limit', params.limit.toString());

        const url = `/api/v1/projects/${projectId}/traffic-analytics/pages${queryParams.toString() ? `?${queryParams.toString()}` : ''
            }`;

        return this.get<PagePerformanceResponse>(url);
    }

    // Traffic Sources
    async getTrafficSources(projectId: string): Promise<TrafficSourcesResponse> {
        return this.get<TrafficSourcesResponse>(
            `/api/v1/projects/${projectId}/traffic-analytics/sources`
        );
    }

    // User Behavior
    async getUserBehavior(
        projectId: string,
        params?: UserBehaviorRequest
    ): Promise<UserBehaviorResponse> {
        const queryParams = new URLSearchParams();

        if (params?.includeDevices !== undefined) {
            queryParams.append('includeDevices', params.includeDevices.toString());
        }
        if (params?.includeGeographic !== undefined) {
            queryParams.append('includeGeographic', params.includeGeographic.toString());
        }
        if (params?.includeBrowsers !== undefined) {
            queryParams.append('includeBrowsers', params.includeBrowsers.toString());
        }

        const url = `/api/v1/projects/${projectId}/traffic-analytics/user-behavior${queryParams.toString() ? `?${queryParams.toString()}` : ''
            }`;

        return this.get<UserBehaviorResponse>(url);
    }

    // Real-time Analytics
    async getRealTimeAnalytics(projectId: string): Promise<RealTimeResponse> {
        return this.get<RealTimeResponse>(
            `/api/v1/projects/${projectId}/traffic-analytics/real-time`
        );
    }

    // Data Synchronization
    async syncTrafficData(projectId: string): Promise<SyncResponse> {
        return this.post<SyncResponse>(
            `/api/v1/projects/${projectId}/traffic-analytics/sync`
        );
    }

    // Google Analytics Integration
    async setupGoogleAnalyticsIntegration(
        integration: GoogleAnalyticsIntegration
    ): Promise<{ message: string }> {
        return this.post<{ message: string }>(
            '/api/v1/integrations/google/analytics',
            integration
        );
    }

    // Get integration status
    async getIntegrationStatus(projectId: string): Promise<{
        connected: boolean;
        propertyId?: string;
        lastSync?: string;
    }> {
        return this.get<{
            connected: boolean;
            propertyId?: string;
            lastSync?: string;
        }>(`/api/v1/projects/${projectId}/traffic-analytics/integration/status`);
    }

    // Remove integration
    async removeIntegration(projectId: string): Promise<{ message: string }> {
        return this.delete<{ message: string }>(
            `/api/v1/projects/${projectId}/traffic-analytics/integration`
        );
    }

    // Advanced: Custom metrics query
    async getCustomMetrics(
        projectId: string,
        metrics: string[],
        dimensions: string[],
        filters?: Record<string, any>
    ): Promise<any> {
        const body = {
            metrics,
            dimensions,
            filters,
        };

        return this.post<any>(
            `/api/v1/projects/${projectId}/traffic-analytics/custom`,
            body
        );
    }

    // Get available metrics and dimensions
    async getAvailableMetrics(): Promise<{
        metrics: string[];
        dimensions: string[];
    }> {
        return this.get<{
            metrics: string[];
            dimensions: string[];
        }>('/api/v1/traffic-analytics/metadata');
    }
}

export const trafficAnalyticsService = new TrafficAnalyticsService();
