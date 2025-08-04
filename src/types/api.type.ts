// API Response Types
export interface ApiResponse<T> {
    data: T;
    total?: number;
    page?: number;
    limit?: number;
    totalPages?: number;
}

// Authentication Types
export interface LoginRequest {
    email: string;
    password: string;
}

export interface RegisterRequest {
    email: string;
    password: string;
    name: string;
    website?: string;
}

export interface User {
    id: string;
    email: string;
    name: string;
    role: string;
    phone?: string;
    timezone?: string;
    avatarUrl?: string;
    emailVerified?: boolean;
    lastLoginAt?: string;
    createdAt?: string;
    subscription?: Subscription;
}

export interface AuthResponse {
    user: User;
    accessToken: string;
}

// Subscription Types
export interface Plan {
    id: string;
    name: string;
    slug: string;
    description: string;
    price: number;
    yearlyPrice: number;
    currency: string;
    features: string[];
    limits: PlanLimits;
}

export interface PlanLimits {
    projects: number;
    keywords_tracking: number;
    audits_monthly: number;
    competitors_tracking: number;
}

export interface Subscription {
    id: string;
    status: 'trial' | 'active' | 'inactive' | 'cancelled';
    plan: {
        name: string;
        price?: number;
        limits?: PlanLimits;
    };
    expiresAt?: string;
}

export interface CreateSubscriptionRequest {
    planId: string;
    billingCycle: 'monthly' | 'yearly';
    paymentMethodId: string;
}

export interface UpdateSubscriptionRequest {
    planId?: string;
    billingCycle?: 'monthly' | 'yearly';
}

// Usage Types
export interface UsageStats {
    type: string;
    current: number;
    limit: number;
    percentage: number;
    resetDate?: string;
}

// Notification Types
export interface Notification {
    id: string;
    type: string;
    title: string;
    message: string;
    isRead: boolean;
    createdAt: string;
}

// Project Types
export interface Project {
    id: string;
    name: string;
    domain: string;
    isActive: boolean;
    createdAt: string;
    updatedAt?: string;
    settings?: {
        location?: string;
        language?: string;
        // Tracking Settings
        enableKeywordTracking?: boolean;
        trackingFrequency?: 'daily' | 'weekly' | 'monthly';
        enableEmailNotifications?: boolean;
        enableSlackNotifications?: boolean;
        // SEO Settings
        targetSearchEngine?: 'google' | 'bing' | 'yahoo';
        deviceType?: 'desktop' | 'mobile' | 'both';
        maxCrawlDepth?: number;
        // API Integrations
        googleAnalyticsId?: string;
        googleSearchConsoleUrl?: string;
        slackWebhookUrl?: string;
    };
}

export interface CreateProjectRequest {
    name: string;
    domain: string;
    settings?: {
        location?: string;
        language?: string;
        enableKeywordTracking?: boolean;
        trackingFrequency?: 'daily' | 'weekly' | 'monthly';
        enableEmailNotifications?: boolean;
        enableSlackNotifications?: boolean;
        targetSearchEngine?: 'google' | 'bing' | 'yahoo';
        deviceType?: 'desktop' | 'mobile' | 'both';
        maxCrawlDepth?: number;
        googleAnalyticsId?: string;
        googleSearchConsoleUrl?: string;
        slackWebhookUrl?: string;
    };
}

export interface UpdateProjectRequest {
    name?: string;
    domain?: string;
    settings?: {
        location?: string;
        language?: string;
        enableKeywordTracking?: boolean;
        trackingFrequency?: 'daily' | 'weekly' | 'monthly';
        enableEmailNotifications?: boolean;
        enableSlackNotifications?: boolean;
        targetSearchEngine?: 'google' | 'bing' | 'yahoo';
        deviceType?: 'desktop' | 'mobile' | 'both';
        maxCrawlDepth?: number;
        googleAnalyticsId?: string;
        googleSearchConsoleUrl?: string;
        slackWebhookUrl?: string;
    };
}

export interface ProjectStats {
    totalKeywords: number;
    trackingKeywords: number;
    averageRanking: number;
    improvingKeywords: number;
    decliningKeywords: number;
    topKeywords: Array<{
        keyword: string;
        position: number;
        change: number;
    }>;
}

// Keyword Types
export interface Keyword {
    id: string;
    keyword: string;
    targetUrl: string;
    searchVolume?: number;
    difficulty?: number;
    cpc?: number;
    currentRanking?: number;
    isTracking: boolean;
    createdAt: string;
    latestRanking?: {
        position: number;
        url: string;
        date: string;
    };
}

export interface CreateKeywordRequest {
    keyword: string;
    targetUrl: string;
    searchVolume?: number;
    difficulty?: number;
    cpc?: number;
}

export interface BulkCreateKeywordsRequest {
    keywords: CreateKeywordRequest[];
}

export interface UpdateKeywordRequest {
    keyword?: string;
    targetUrl?: string;
    searchVolume?: number;
    difficulty?: number;
    cpc?: number;
    isTracking?: boolean;
}

export interface KeywordRanking {
    id: string;
    position: number;
    url: string;
    date: string;
    metadata?: {
        serp_features?: string[];
        search_engine?: string;
    };
}

// Position Tracking Types (from API documentation)
export interface CreateRankingRequest {
    position: number;
    url?: string;
    metadata?: {
        search_engine?: string;
        location?: string;
        device?: string;
        serp_features?: string[];
    };
}

export interface RankingRecord {
    id: string;
    keywordId: string;
    position: number;
    url?: string;
    date: string;
    metadata?: {
        search_engine?: string;
        location?: string;
        device?: string;
        serp_features?: string[];
    };
    createdAt: string;
}

export interface RankingHistoryQueryParams {
    days?: number;
    startDate?: string;
    endDate?: string;
}

export interface RankingHistoryResponse {
    keyword: {
        id: string;
        keyword: string;
        currentRanking: number;
        project: string;
    };
    rankings: RankingRecord[];
    trend: 'up' | 'down' | 'stable' | 'no-data';
    summary: {
        totalRecords: number;
        bestPosition: number;
        worstPosition: number;
        averagePosition: number;
    };
}

export interface ProjectRankingsOverview {
    project: {
        id: string;
        name: string;
        domain: string;
    };
    summary: {
        totalKeywords: number;
        trackedKeywords: number;
        rankedKeywords: number;
        avgPosition: number;
    };
    keywords: Array<{
        id: string;
        keyword: string;
        currentRanking: number;
        targetUrl: string;
        isTracking: boolean;
        searchVolume: number;
        difficulty: number;
        trend: 'up' | 'down' | 'stable' | 'no-data';
        rankingHistory: Array<{
            position: number;
            date: string;
        }>;
    }>;
}

// Audit Types
export interface Audit {
    id: string;
    projectId: string;
    status: 'pending' | 'in_progress' | 'completed' | 'failed';
    createdAt: string;
    completedAt?: string;
    settings?: {
        include_mobile?: boolean;
        check_accessibility?: boolean;
        analyze_performance?: boolean;
    };
}

export interface CreateAuditRequest {
    url?: string;
    settings?: {
        include_mobile?: boolean;
        check_accessibility?: boolean;
        analyze_performance?: boolean;
    };
}

export interface AuditResults {
    id: string;
    status: 'pending' | 'in_progress' | 'completed' | 'failed';
    results?: {
        overall_score: number;
        technical_seo: {
            score: number;
            issues: Array<{
                type: string;
                severity: 'low' | 'medium' | 'high';
                count: number;
                description: string;
            }>;
        };
        performance: {
            score: number;
            metrics: {
                page_load_time: number;
                core_web_vitals: {
                    lcp: number;
                    fid: number;
                    cls: number;
                };
            };
        };
        content: {
            score: number;
            word_count: number;
            readability_score: number;
        };
    };
    createdAt: string;
    completedAt?: string;
}

// Query Parameters
export interface PaginationParams {
    page?: number;
    limit?: number;
    search?: string;
}

export interface KeywordQueryParams extends PaginationParams {
    sortBy?: string;
    sortOrder?: 'asc' | 'desc';
}

export interface NotificationQueryParams {
    limit?: number;
}

export interface RankingHistoryParams {
    days?: number;
}

// Update Profile Request
export interface UpdateProfileRequest {
    name?: string;
    phone?: string;
    timezone?: string;
}

// =============================================================================
// 🔧 ENHANCED USER MANAGEMENT TYPES
// =============================================================================

export interface UserSettings {
    timezone: string;
    emailNotifications: boolean;
    pushNotifications: boolean;
    reportFrequency: "daily" | "weekly" | "monthly";
}

export interface UserActivity {
    id: string;
    action: string;
    resource: string;
    resourceId?: string;
    metadata?: Record<string, any>;
    timestamp: string;
    ipAddress?: string;
    userAgent?: string;
}

export interface ChangePasswordRequest {
    currentPassword: string;
    newPassword: string;
    confirmPassword: string;
}

export interface UploadAvatarResponse {
    avatarUrl: string;
    thumbnailUrl?: string;
}

// =============================================================================
// 🔧 ENHANCED SUBSCRIPTION TYPES
// =============================================================================

export interface UsageDetails {
    usageType: string;
    currentUsage: number;
    limitValue: number;
    resetDate: string;
    percentageUsed: number;
}

export interface Invoice {
    id: string;
    subscriptionId: string;
    amount: number;
    currency: string;
    status: 'pending' | 'paid' | 'failed' | 'refunded';
    billingPeriodStart: string;
    billingPeriodEnd: string;
    createdAt: string;
    paidAt?: string;
    downloadUrl?: string;
}

// =============================================================================
// 🔧 PROJECT ANALYTICS TYPES
// =============================================================================

export interface ProjectAnalytics {
    keywordStats: {
        total: number;
        tracking: number;
        ranked: number;
        avgPosition: number;
    };
    rankingTrends: RankingTrend[];
    competitorComparison: CompetitorComparison[];
    auditSummary: AuditSummary;
}

export interface RankingTrend {
    date: string;
    avgPosition: number;
    totalKeywords: number;
    improvedKeywords: number;
    declinedKeywords: number;
}

export interface CompetitorComparison {
    competitor: string;
    sharedKeywords: number;
    betterRankings: number;
    worseRankings: number;
    avgPositionDiff: number;
}

export interface AuditSummary {
    lastAuditDate: string;
    overallScore: number;
    criticalIssues: number;
    warnings: number;
    recommendations: number;
}

// =============================================================================
// 🔧 SITE AUDIT TYPES
// =============================================================================

export interface SiteAuditRequest {
    projectId: string;
    auditType: "full" | "technical" | "content" | "performance";
    settings: {
        crawlDepth: number;
        includeImages: boolean;
        checkMobileFriendly: boolean;
        analyzePageSpeed: boolean;
    };
}

export interface SiteAuditResult {
    auditId: string;
    overview: {
        totalPages: number;
        errors: number;
        warnings: number;
        notices: number;
        overallScore: number;
    };
    issues: SiteIssue[];
    recommendations: Recommendation[];
    performance: PerformanceMetrics;
}

// =============================================================================
// 🚀 REAL AUDIT SYSTEM TYPES (NEW IMPLEMENTATION)
// =============================================================================

export interface RealAuditResult {
    id: string;
    projectId?: string;
    url?: string;
    progress?: number;
    startedAt?: string;
    completedAt?: string;
    createdAt: string;
    status: "running" | "completed" | "failed";
    results: {
        overview: {
            score: number;
            total_issues: number;
            critical_issues: number;
            warnings: number;
            passed_checks: number;
            pages_analyzed: number;
            total_response_time: number;
        };
        performance: {
            score: number;
            issues: any[];
            metrics: {
                avg_page_speed: number;
                core_web_vitals: {
                    cls: number; // Cumulative Layout Shift
                    fid: number; // First Input Delay
                    lcp: number; // Largest Contentful Paint
                };
                mobile_friendly: boolean;
            };
        };
        accessibility: {
            score: number;
            issues: any[];
            wcag_compliance: "A" | "AA" | "AAA";
        };
        technical_seo: {
            score: number;
            issues: any[];
            robots_txt: {
                exists: boolean;
                issues: string[];
            };
            sitemap: {
                exists: boolean;
                url_count: number;
            };
        };
        content_analysis: {
            score: number;
            issues: Array<{
                type: "info" | "warning" | "error";
                title: string;
                impact: "low" | "medium" | "high";
                description: string;
                recommendation: string;
            }>;
            avg_word_count: number;
            duplicate_content: any[];
        };
        pages_analyzed: Array<{
            url: string;
            status_code: number;
            response_time: number;
            broken_links: any[];
            image_issues: any[];
            accessibility_issues: any[];
            seo_analysis: {
                url: string;
                score: number;
                title: string;
                meta_description: string;
                h1_tags: string[];
                h2_tags: string[];
                h3_tags: string[];
                og_image: string;
                og_title: string;
                og_description: string;
                word_count: number;
                meta_robots: string;
                images_total: number;
                twitter_card: string;
                canonical_url: string;
                hreflang_tags: number;
                meta_keywords: string;
                schema_markup: number;
                external_links: number;
                internal_links: number;
                images_without_alt: number;
                issues: Array<{
                    type: "info" | "warning" | "error";
                    title: string;
                    impact: "low" | "medium" | "high";
                    description: string;
                    recommendation: string;
                }>;
            };
            content_analysis: {
                word_count: number;
                thin_content: boolean;
                readability_score: number;
            };
            lighthouse_mobile: {
                url: string;
                metrics: {
                    speed_index: number;
                    first_input_delay: number;
                    time_to_interactive: number;
                    total_blocking_time: number;
                    first_contentful_paint: number;
                    cumulative_layout_shift: number;
                    largest_contentful_paint: number;
                };
                pwa_score: number;
                seo_score: number;
                diagnostics: Array<{
                    id: string;
                    title: string;
                    impact: string;
                    description: string;
                    score_display_mode: string;
                }>;
                opportunities: any[];
                core_web_vitals: {
                    cls_status: string;
                    fid_status: string;
                    lcp_status: string;
                };
                mobile_friendly: boolean;
                performance_score: number;
                accessibility_score: number;
                best_practices_score: number;
            };
            lighthouse_desktop: {
                url: string;
                metrics: {
                    speed_index: number;
                    first_input_delay: number;
                    time_to_interactive: number;
                    total_blocking_time: number;
                    first_contentful_paint: number;
                    cumulative_layout_shift: number;
                    largest_contentful_paint: number;
                };
                pwa_score: number;
                seo_score: number;
                diagnostics: Array<{
                    id: string;
                    title: string;
                    impact: string;
                    description: string;
                    score_display_mode: string;
                }>;
                opportunities: any[];
                core_web_vitals: {
                    cls_status: string;
                    fid_status: string;
                    lcp_status: string;
                };
                mobile_friendly: boolean;
                performance_score: number;
                accessibility_score: number;
                best_practices_score: number;
            };
        }>;
        processing_time: number;
        completed_at: string;
    };
}

export interface AuditProgress {
    id: string;
    status: "running" | "completed" | "failed";
    progress: number;
    current_step: string;
    eta_seconds?: number;
    message?: string;
}

export interface AuditSchedule {
    id: string;
    projectId: string;
    frequency: "daily" | "weekly" | "monthly";
    url: string;
    auditType: "full" | "technical" | "content" | "performance";
    notificationEmail?: string;
    nextRun: string;
    lastRun?: string;
    status: "active" | "paused";
}

// Response type for getScheduledAudits API
export interface AuditScheduleResponse {
    id: string;
    frequency: string;
    next_run: string;
    last_run?: string;
    url: string;
    audit_type: string;
    status: "active" | "paused";
}

export interface AuditComparison {
    comparison: Array<{
        audit_id: string;
        date: string;
        score: number;
        issues: number;
        improvements: string[];
        regressions: string[];
    }>;
}

export interface AuditSummaryDashboard {
    id: string;
    projectId?: string;
    status: "running" | "completed" | "failed";
    createdAt: string;
    completedAt?: string | null;
    latestAudit: {
        results: {
            overview: {
                score: number;
                total_issues: number;
                critical_issues: number;
                warnings: number;
                passed_checks: number;
                pages_analyzed: number;
                total_response_time: number;
            };
            performance: {
                score: number;
                issues: any[];
                metrics: {
                    avg_page_speed: number;
                    core_web_vitals: {
                        cls: number;
                        fid: number;
                        lcp: number;
                    };
                    mobile_friendly: boolean;
                };
            };
            accessibility: {
                score: number;
                issues: any[];
                wcag_compliance: "A" | "AA" | "AAA";
            };
            technical_seo: {
                score: number;
                issues: any[];
                robots_txt: {
                    exists: boolean;
                    issues: string[];
                };
                sitemap: {
                    exists: boolean;
                    url_count: number;
                };
            };
            content_analysis: {
                score: number;
                issues: Array<{
                    type: "info" | "warning" | "error";
                    title: string;
                    impact: "low" | "medium" | "high";
                    description: string;
                    recommendation: string;
                }>;
                avg_word_count: number;
                duplicate_content: any[];
            };
            processing_time: number;
            completed_at: string;
        };
        status: string
        createdAt: string
    }
    stats: any
}

export interface SiteIssue {
    id: string;
    type: string;
    severity: 'low' | 'medium' | 'high' | 'critical';
    title: string;
    description: string;
    affectedUrls: string[];
    howToFix: string;
    impact: string;
}

export interface Recommendation {
    id: string;
    category: string;
    title: string;
    description: string;
    priority: 'low' | 'medium' | 'high';
    effort: 'low' | 'medium' | 'high';
    impact: 'low' | 'medium' | 'high';
    implementation: string;
}

export interface PerformanceMetrics {
    pagespeed: {
        desktop: number;
        mobile: number;
    };
    coreWebVitals: {
        lcp: number;
        fid: number;
        cls: number;
    };
    loadTime: number;
    totalPageSize: number;
    requests: number;
}

// =============================================================================
// 🔧 COMPETITOR ANALYSIS TYPES
// =============================================================================

export interface CompetitorAnalysisRequest {
    competitors: string[];
    metrics: ("keywords" | "backlinks" | "content" | "traffic")[];
    location?: string;
}

export interface CompetitorData {
    domain: string;
    organicKeywords: number;
    organicTraffic: number;
    paidKeywords: number;
    backlinks: number;
    domainAuthority: number;
    topKeywords: CompetitorKeyword[];
    gapKeywords: GapKeyword[];
}

export interface CompetitorKeyword {
    keyword: string;
    position: number;
    searchVolume: number;
    difficulty: number;
    cpc: number;
    url: string;
}

export interface GapKeyword {
    keyword: string;
    competitorPosition: number;
    ourPosition?: number;
    searchVolume: number;
    difficulty: number;
    opportunity: string;
}

// =============================================================================
// 🔧 KEYWORD GAP ANALYSIS TYPES
// =============================================================================

export interface KeywordGapRequest {
    competitors: string[];
    filterBy: {
        difficulty?: [number, number];
        volume?: [number, number];
        intent?: ("informational" | "navigational" | "commercial" | "transactional")[];
    };
}

export interface KeywordOpportunity {
    keyword: string;
    difficulty: number;
    volume: number;
    intent: string;
    competitorRankings: Record<string, number>;
    opportunity: "easy-win" | "content-gap" | "quick-win" | "long-term";
}

// =============================================================================
// 🔧 POSITION TRACKING TYPES
// =============================================================================

export interface TrackingSetup {
    keywords: string[];
    competitors: string[];
    searchEngines: ("google" | "bing" | "yahoo")[];
    locations: string[];
    devices: ("desktop" | "mobile" | "tablet")[];
    frequency: "daily" | "weekly" | "monthly";
}

export interface TrackingOverview {
    totalKeywords: number;
    averagePosition: number;
    visibility: number;
    rankingDistribution: {
        top3: number;
        top10: number;
        top20: number;
        beyond20: number;
    };
    trends: {
        improved: number;
        declined: number;
        unchanged: number;
    };
}

export interface TrackingSettings {
    frequency: "daily" | "weekly" | "monthly";
    searchEngines: string[];
    locations: string[];
    devices: string[];
    emailAlerts: boolean;
    rankingThreshold: number;
}

// =============================================================================
// 🔧 ENHANCED BACKLINK TYPES
// =============================================================================

export interface BacklinkProfile {
    totalBacklinks: number;
    referringDomains: number;
    domainAuthority: number;
    trustFlow: number;
    backlinks: Backlink[];
    toxicLinks: ToxicLink[];
    opportunities: BacklinkOpportunity[];
}

export interface Backlink {
    id: string;
    sourceUrl: string;
    targetUrl: string;
    sourceDomain: string;
    anchorText: string;
    linkType: 'follow' | 'nofollow';
    domainAuthority: number;
    pageAuthority: number;
    trustFlow: number;
    citationFlow: number;
    firstSeen: string;
    lastSeen: string;
    status: 'active' | 'lost' | 'broken';
}

export interface ToxicLink {
    id: string;
    sourceUrl: string;
    sourceDomain: string;
    toxicityScore: number;
    reasons: string[];
    recommendation: 'disavow' | 'contact' | 'monitor';
}

export interface BacklinkOpportunity {
    domain: string;
    domainAuthority: number;
    relevanceScore: number;
    contactEmail?: string;
    reason: string;
    estimatedValue: number;
}

// =============================================================================
// 🔧 CONTENT MANAGEMENT TYPES
// =============================================================================

export interface ContentPerformance {
    contentId: string;
    title: string;
    url: string;
    organicTraffic: number;
    averagePosition: number;
    clickThroughRate: number;
    impressions: number;
    engagementMetrics: {
        timeOnPage: number;
        bounceRate: number;
        socialShares: number;
    };
    seoScore: number;
    recommendations: ContentRecommendation[];
}

export interface ContentRecommendation {
    type: string;
    title: string;
    description: string;
    priority: 'low' | 'medium' | 'high';
    impact: string;
    implementation: string;
}

export interface ContentCalendar {
    month: string;
    items: ContentCalendarItem[];
    metrics: {
        planned: number;
        published: number;
        draft: number;
        overdue: number;
    };
}

export interface ContentCalendarItem {
    id: string;
    title: string;
    type: string;
    status: 'planned' | 'draft' | 'review' | 'published';
    publishDate: string;
    targetKeywords: string[];
    author: string;
    category: string;
}

export interface ContentBrief {
    title: string;
    targetKeywords: string[];
    contentType: string;
    wordCount: number;
    outline: string[];
    references: string[];
    seoGuidelines: string[];
}

export interface ContentSEOAnalysis {
    contentId: string;
    seoScore: number;
    titleOptimization: ScoreItem;
    metaDescription: ScoreItem;
    headingStructure: ScoreItem;
    keywordDensity: ScoreItem;
    internalLinking: ScoreItem;
    imageOptimization: ScoreItem;
    suggestions: string[];
}

export interface ScoreItem {
    score: number;
    status: 'good' | 'warning' | 'error';
    message: string;
    recommendations?: string[];
}

// =============================================================================
// 🔧 TRAFFIC ANALYTICS TYPES
// =============================================================================

export interface TrafficOverview {
    period: DateRange;
    totalSessions: number;
    totalUsers: number;
    organicSessions: number;
    avgSessionDuration: number;
    bounceRate: number;
    conversions: number;
    trends: TrafficTrend[];
}

export interface TrafficTrend {
    date: string;
    sessions: number;
    users: number;
    organicSessions: number;
    conversions: number;
}

export interface TrafficSource {
    source: string;
    medium: string;
    sessions: number;
    users: number;
    newUsers: number;
    bounceRate: number;
    avgSessionDuration: number;
    conversions: number;
}

export interface CompetitorTraffic {
    domain: string;
    estimatedMonthlyVisits: number;
    trafficShare: number;
    topPages: CompetitorPage[];
    trafficSources: TrafficSourceBreakdown;
    audienceOverlap: number;
}

export interface CompetitorPage {
    url: string;
    trafficShare: number;
    estimatedVisits: number;
    topKeywords: string[];
}

export interface TrafficSourceBreakdown {
    organic: number;
    direct: number;
    referral: number;
    social: number;
    paid: number;
    email: number;
}

export interface PagePerformance {
    url: string;
    pageViews: number;
    uniquePageViews: number;
    avgTimeOnPage: number;
    exitRate: number;
    conversions: number;
    loadSpeed: {
        desktop: number;
        mobile: number;
    };
    coreWebVitals: CoreWebVitals;
}

export interface CoreWebVitals {
    lcp: number; // Largest Contentful Paint
    fid: number; // First Input Delay
    cls: number; // Cumulative Layout Shift
}

// =============================================================================
// 🔧 AI CONTENT GENERATION TYPES
// =============================================================================

export interface ContentGenerationRequest {
    projectId: string;
    type: "blog-post" | "product-description" | "meta-description" | "social-post";
    topic: string;
    targetKeywords: string[];
    tone: "professional" | "casual" | "friendly" | "authoritative";
    length: "short" | "medium" | "long";
    audience: string;
    guidelines?: string[];
}

export interface GeneratedContent {
    requestId: string;
    content: string;
    alternatives: string[];
    seoScore: number;
    readabilityScore: number;
    suggestions: string[];
    usageCredits: number;
}

export interface AISEOAnalysis {
    url: string;
    overallScore: number;
    technicalSEO: AIScoreBreakdown;
    contentSEO: AIScoreBreakdown;
    userExperience: AIScoreBreakdown;
    recommendations: AISEORecommendation[];
    actionPlan: ActionItem[];
}

export interface AIScoreBreakdown {
    score: number;
    maxScore: number;
    factors: ScoreFactor[];
}

export interface ScoreFactor {
    name: string;
    score: number;
    maxScore: number;
    weight: number;
    description: string;
}

export interface AISEORecommendation {
    id: string;
    category: string;
    title: string;
    description: string;
    priority: 'low' | 'medium' | 'high' | 'critical';
    effort: 'low' | 'medium' | 'high';
    impact: 'low' | 'medium' | 'high';
    implementation: string;
    estimatedResults: string;
}

export interface ActionItem {
    id: string;
    title: string;
    description: string;
    category: string;
    priority: number;
    estimatedTime: string;
    difficulty: 'easy' | 'medium' | 'hard';
    resources: string[];
}

export interface AIKeywordResearch {
    seedKeyword: string;
    industry: string;
    location?: string;
    language: string;
    suggestions: KeywordSuggestion[];
    clusters: KeywordCluster[];
    trends: KeywordTrend[];
    questions: string[];
}

export interface KeywordSuggestion {
    keyword: string;
    searchVolume: number;
    difficulty: number;
    cpc: number;
    intent: string;
    seasonality: SeasonalityData;
    relatedKeywords: string[];
}

export interface KeywordCluster {
    name: string;
    keywords: string[];
    intent: string;
    difficulty: number;
    volume: number;
}

export interface KeywordTrend {
    keyword: string;
    trend: 'rising' | 'declining' | 'stable';
    changePercent: number;
    seasonality: SeasonalityData;
}

export interface SeasonalityData {
    isseasonal: boolean;
    peakMonths?: number[];
    lowMonths?: number[];
}

// =============================================================================
// 🔧 REPORTING TYPES
// =============================================================================

export interface CustomReport {
    reportId: string;
    name: string;
    type: 'ranking' | 'traffic' | 'content' | 'comprehensive';
    metrics: string[];
    filters: ReportFilters;
    schedule?: ReportSchedule;
    recipients: string[];
}

export interface ReportFilters {
    dateRange: DateRange;
    keywords?: string[];
    competitors?: string[];
    pages?: string[];
    trafficSources?: string[];
}

export interface ReportSchedule {
    frequency: 'daily' | 'weekly' | 'monthly';
    dayOfWeek?: number;
    dayOfMonth?: number;
    time: string;
    timezone: string;
    enabled: boolean;
}

export interface DashboardOverview {
    kpis: KPIMetric[];
    alerts: Alert[];
    recentActivity: UserActivity[];
    competitorUpdates: CompetitorUpdate[];
    quickActions: QuickAction[];
}

export interface KPIMetric {
    name: string;
    value: number;
    previousValue: number;
    change: number;
    changePercent: number;
    trend: 'up' | 'down' | 'stable';
    format: 'number' | 'percentage' | 'currency' | 'duration';
}

export interface Alert {
    id: string;
    type: 'ranking_change' | 'traffic_drop' | 'new_backlink' | 'competitor_activity';
    severity: 'low' | 'medium' | 'high' | 'critical';
    title: string;
    message: string;
    actionRequired: boolean;
    createdAt: string;
    acknowledged: boolean;
}

export interface CompetitorUpdate {
    competitor: string;
    type: 'ranking_change' | 'new_content' | 'backlink_gain' | 'traffic_change';
    description: string;
    impact: 'positive' | 'negative' | 'neutral';
    date: string;
}

export interface QuickAction {
    id: string;
    title: string;
    description: string;
    icon: string;
    action: string;
    priority: number;
}

// =============================================================================
// 🔧 INTEGRATION TYPES
// =============================================================================

export interface GSCIntegration {
    projectId: string;
    siteUrl: string;
    connected: boolean;
    lastSync: string;
    permissions: string[];
}

export interface GAIntegration {
    projectId: string;
    propertyId: string;
    connected: boolean;
    lastSync: string;
    ecommerceEnabled: boolean;
    ecommerceData?: EcommerceData;
}

export interface EcommerceData {
    revenue: number;
    transactions: number;
    averageOrderValue: number;
    conversionRate: number;
    topProducts: Product[];
}

export interface Product {
    name: string;
    sku: string;
    revenue: number;
    quantity: number;
    conversionRate: number;
}

// =============================================================================
// 🔧 UTILITY TYPES
// =============================================================================

export interface DateRange {
    start: string;
    end: string;
}

export interface BulkUpdateResponse {
    successCount: number;
    errorCount: number;
    errors: BulkError[];
    results: any[];
}

export interface BulkError {
    index: number;
    error: string;
    item: any;
}

export interface ExportRequest {
    dataTypes: ('keywords' | 'rankings' | 'audits' | 'backlinks' | 'content' | 'traffic')[];
    format: 'csv' | 'xlsx' | 'pdf' | 'json';
    dateRange?: DateRange;
    filters?: Record<string, any>;
}

export interface ExportResponse {
    exportId: string;
    status: 'pending' | 'processing' | 'completed' | 'failed';
    downloadUrl?: string;
    expiresAt: string;
}

// Organic Research Types
export interface OrganicDomainAnalysis {
    domain: string;
    organicKeywords: number;
    organicTraffic: number;
    organicCost: number;
    avgPosition: number;
    visibility: number;
    lastUpdated: string;
}

export interface OrganicKeyword {
    keyword: string;
    position: number;
    previousPosition: number;
    searchVolume: number;
    trafficShare: number;
    cpc: number;
    difficulty: number;
    intent: 'Commercial' | 'Informational' | 'Navigational' | 'Transactional';
    url: string;
    features: string[];
}

export interface OrganicKeywordsResponse {
    data: OrganicKeyword[];
    total: number;
    page: number;
    limit: number;
    hasNext: boolean;
    hasPrev: boolean;
}

export interface OrganicKeywordsParams {
    country: string;
    limit?: number;
    offset?: number;
    sortBy?: 'position' | 'traffic' | 'volume' | 'difficulty';
    sortOrder?: 'asc' | 'desc';
}

export interface CompetitorDomain {
    domain: string;
    competitionLevel: number;
    commonKeywords: number;
    keywords: number;
    traffic: number;
    trafficValue: number;
    topKeyword: string;
}

export interface CompetitorsResponse {
    data: CompetitorDomain[];
    total: number;
    targetDomain: string;
    country: string;
}

export interface CompetitorsParams {
    country: string;
    limit?: number;
}

export interface TopPage {
    url: string;
    traffic: number;
    keywords: number;
    trafficValue: number;
    avgPosition: number;
    topKeywords: string[];
}

export interface TopPagesResponse {
    data: TopPage[];
    total: number;
    domain: string;
    country: string;
}

export interface TopPagesParams {
    country: string;
    limit?: number;
    sortBy?: 'traffic' | 'keywords' | 'value';
}

// =============================================================================
// 🔧 BACKLINK ANALYTICS TYPES (INTEGRATION)
// =============================================================================

// Re-export backlink types from backlink.type.ts for easier imports
export type {
    Backlink as BacklinkType,
    CreateBacklinkRequest,
    UpdateBacklinkRequest,
    BacklinkAnalytics,
    BacklinkProfile as BacklinkProfileType,
    BacklinkQueryParams,
    BacklinksResponse,
} from './backlink.type';

export interface ApiLimitsResponse {
    semrush: {
        remaining: number;
        total: number;
        resetDate: string;
    };
    ahrefs: {
        remaining: number;
        total: number;
        resetDate: string;
    };
    moz: {
        remaining: number;
        total: number;
        resetDate: string;
    };
}
