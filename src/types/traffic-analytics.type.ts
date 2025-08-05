// Traffic Analytics Types based on TRAFFIC_ANALYTICS_API.md

export interface TrafficOverviewRequest {
    period?: 'today' | 'yesterday' | '7d' | '30d' | '90d' | '12m' | 'custom';
    startDate?: string; // YYYY-MM-DD
    endDate?: string; // YYYY-MM-DD
    metrics?: string[];
    dimensions?: string[];
}

export interface TrafficOverviewResponse {
    totalSessions: number;
    totalUsers: number;
    totalPageviews: number;
    avgBounceRate: number;
    avgSessionDuration: number;
    newUsersPercentage: number;
    returningUsersPercentage: number;
    trends: TrafficTrend[];
    periodComparison: {
        sessionsChange: number;
        usersChange: number;
        pageviewsChange: number;
        bounceRateChange: number;
    };
}

export interface TrafficTrend {
    date: string;
    sessions: number;
    users: number;
    pageviews: number;
    bounceRate: number;
    avgSessionDuration: number;
    newUsers: number;
    returningUsers: number;
}

export interface PagePerformanceRequest {
    period?: 'today' | 'yesterday' | '7d' | '30d' | '90d' | '12m' | 'custom';
    pagePath?: string;
    sortBy?: 'pageviews' | 'sessions' | 'bounceRate';
    sortOrder?: 'asc' | 'desc';
    limit?: number;
}

export interface PagePerformanceResponse {
    pages: PagePerformanceData[];
    totalPages: number;
    totalPageviews: number;
    avgTimeOnPage: number;
    avgBounceRate: number;
}

export interface PagePerformanceData {
    pagePath: string;
    pageTitle: string;
    sessions: number;
    pageviews: number;
    uniquePageviews: number;
    avgTimeOnPage: number;
    bounceRate: number;
    exitRate: number;
    entrances: number;
}

export interface TrafficSourcesResponse {
    sources: TrafficSourceData[];
    organicPercentage: number;
    directPercentage: number;
    referralPercentage: number;
    socialPercentage: number;
    paidPercentage: number;
}

export interface TrafficSourceData {
    source: string;
    medium: string;
    sessions: number;
    users: number;
    newUsers: number;
    bounceRate: number;
    avgSessionDuration: number;
    conversions: number;
    conversionRate: number;
}

export interface UserBehaviorRequest {
    includeDevices?: boolean;
    includeGeographic?: boolean;
    includeBrowsers?: boolean;
}

export interface UserBehaviorResponse {
    devices: DeviceData[];
    geographic: GeographicData[];
    summary: {
        mobilePercentage: number;
        desktopPercentage: number;
        tabletPercentage: number;
        topCountry: string;
        topCountryPercentage: number;
    };
}

export interface DeviceData {
    deviceCategory: string;
    sessions: number;
    users: number;
    bounceRate: number;
    avgSessionDuration: number;
    percentage: number;
}

export interface GeographicData {
    country: string;
    countryCode: string;
    sessions: number;
    users: number;
    bounceRate: number;
    avgSessionDuration: number;
    percentage: number;
}

export interface RealTimeResponse {
    activeUsers: number;
    activePages: number;
    topPages: {
        pagePath: string;
        activeUsers: number;
    }[];
    topSources: any[];
    topCountries: any[];
    timestamp: string;
}

export interface SyncResponse {
    message: string;
    recordsSynced: number;
}

// Integration types
export interface GoogleAnalyticsIntegration {
    projectId: string;
    propertyId: string;
    credentials: {
        type: string;
        project_id: string;
        private_key_id: string;
        private_key: string;
        client_email: string;
        client_id: string;
        auth_uri: string;
        token_uri: string;
    };
}

// Local Redux state types
export interface TrafficAnalyticsState {
    overview: TrafficOverviewResponse | null;
    pagePerformance: PagePerformanceResponse | null;
    trafficSources: TrafficSourcesResponse | null;
    userBehavior: UserBehaviorResponse | null;
    realTime: RealTimeResponse | null;
    loading: {
        overview: boolean;
        pagePerformance: boolean;
        trafficSources: boolean;
        userBehavior: boolean;
        realTime: boolean;
        sync: boolean;
    };
    error: string | null;
    filters: {
        period: 'today' | 'yesterday' | '7d' | '30d' | '90d' | '12m' | 'custom';
        startDate?: string;
        endDate?: string;
        projectId?: string;
    };
    integration: GoogleAnalyticsIntegration | null;
}
