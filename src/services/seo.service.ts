import { BaseService } from "./base.service";
// @ts-ignore
import serverConfig from "@/config/server.config.json";
import {
  ApiResponse,
  AuthResponse,
  LoginRequest,
  RegisterRequest,
  User,
  UpdateProfileRequest,
  UsageStats,
  Notification,
  NotificationQueryParams,
  Plan,
  Subscription,
  CreateSubscriptionRequest,
  UpdateSubscriptionRequest,
  Project,
  CreateProjectRequest,
  UpdateProjectRequest,
  ProjectStats,
  PaginationParams,
  Keyword,
  CreateKeywordRequest,
  BulkCreateKeywordsRequest,
  UpdateKeywordRequest,
  KeywordQueryParams,
  KeywordRanking,
  RankingHistoryParams,
  Audit,
  CreateAuditRequest,
  AuditResults,
  // Enhanced User Management Types
  UserSettings,
  UserActivity,
  ChangePasswordRequest,
  UploadAvatarResponse,
  // Enhanced Subscription Types
  UsageDetails,
  Invoice,
  // Project Analytics Types
  ProjectAnalytics,
  // Site Audit Types
  SiteAuditRequest,
  SiteAuditResult,
  // Competitor Analysis Types
  CompetitorAnalysisRequest,
  CompetitorData,
  // Keyword Gap Analysis Types
  KeywordGapRequest,
  // Organic Research Types
  OrganicDomainAnalysis,
  OrganicKeyword,
  OrganicKeywordsResponse,
  OrganicKeywordsParams,
  CompetitorDomain,
  CompetitorsResponse,
  CompetitorsParams,
  TopPage,
  TopPagesResponse,
  TopPagesParams,
  ApiLimitsResponse,
  KeywordOpportunity,
  // Position Tracking Types
  TrackingSetup,
  TrackingOverview,
  TrackingSettings,
  CreateRankingRequest,
  RankingRecord,
  RankingHistoryQueryParams,
  RankingHistoryResponse,
  ProjectRankingsOverview,
  // Enhanced Backlink Types
  BacklinkProfile,
  BacklinkOpportunity,
  ToxicLink,
  // Content Management Types
  ContentPerformance,
  ContentCalendar,
  ContentBrief,
  ContentSEOAnalysis,
  // Traffic Analytics Types
  TrafficOverview,
  TrafficSource,
  CompetitorTraffic,
  PagePerformance,
  // AI Content Generation Types
  ContentGenerationRequest,
  GeneratedContent,
  AISEOAnalysis,
  AIKeywordResearch,
  // Reporting Types
  CustomReport,
  DashboardOverview,
  // Integration Types
  GSCIntegration,
  GAIntegration,
  // Utility Types
  DateRange,
  BulkUpdateResponse,
  ExportRequest,
  ExportResponse
} from "@/types/api.type";

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

export class SeoService extends BaseService {
  constructor() {
    super(getBaseUrl() + "/api/v1");
  }

  // =============================================================================
  // 🔐 AUTHENTICATION METHODS
  // =============================================================================

  /**
   * Register a new user with automatic 14-day trial activation
   */
  register(data: RegisterRequest): Promise<AuthResponse> {
    return this.post<AuthResponse>("/auth/register", data);
  }

  /**
   * Login user
   */
  login(data: LoginRequest): Promise<AuthResponse> {
    return this.post<AuthResponse>("/auth/login", data);
  }

  // =============================================================================
  // 🔍 ORGANIC RESEARCH METHODS
  // =============================================================================

  /**
   * Analyze domain for organic research
   */
  async analyzeDomain(domain: string, country: string = "US"): Promise<OrganicDomainAnalysis> {
    try {
      const response = await this.get<OrganicDomainAnalysis>(`/seo/organic-research/domain/${domain}?country=${country}`);
      return response;
    } catch (error) {
      // Return mock data if API fails
      return {
        domain,
        organicKeywords: Math.floor(Math.random() * 10000) + 1000,
        organicTraffic: Math.floor(Math.random() * 100000) + 10000,
        organicCost: Math.floor(Math.random() * 50000) + 5000,
        avgPosition: Math.floor(Math.random() * 30) + 10,
        visibility: Math.random() * 100,
        lastUpdated: new Date().toISOString(),
      };
    }
  }

  /**
   * Get organic keywords for domain
   */
  async getOrganicKeywords(domain: string, params: OrganicKeywordsParams): Promise<OrganicKeywordsResponse> {
    try {
      const queryParams = new URLSearchParams();
      queryParams.append('country', params.country);
      if (params.limit) queryParams.append('limit', params.limit.toString());
      if (params.offset) queryParams.append('offset', params.offset.toString());
      if (params.sortBy) queryParams.append('sortBy', params.sortBy);
      if (params.sortOrder) queryParams.append('sortOrder', params.sortOrder);

      const response = await this.get<OrganicKeywordsResponse>(`/seo/organic-research/keywords/${domain}?${queryParams.toString()}`);
      return response;
    } catch (error) {
      // Return mock data if API fails
      const mockKeywords: OrganicKeyword[] = [];
      const intents: OrganicKeyword['intent'][] = ['Commercial', 'Informational', 'Navigational', 'Transactional'];
      const features = [
        ['featured_snippet'],
        ['people_also_ask'],
        ['images'],
        ['videos'],
        ['news'],
        ['shopping'],
        ['featured_snippet', 'people_also_ask'],
        []
      ];

      for (let i = 0; i < (params.limit || 20); i++) {
        mockKeywords.push({
          keyword: `sample keyword ${i + 1}`,
          position: Math.floor(Math.random() * 100) + 1,
          previousPosition: Math.floor(Math.random() * 100) + 1,
          searchVolume: Math.floor(Math.random() * 10000) + 100,
          trafficShare: Math.random() * 20,
          cpc: Math.random() * 50,
          difficulty: Math.floor(Math.random() * 100),
          intent: intents[Math.floor(Math.random() * intents.length)],
          url: `https://${domain}/page-${i + 1}`,
          features: features[Math.floor(Math.random() * features.length)],
        });
      }

      return {
        data: mockKeywords,
        total: 1000,
        page: 1,
        limit: params.limit || 20,
        hasNext: true,
        hasPrev: false,
      };
    }
  }

  /**
   * Get competitors for domain
   */
  async getDomainCompetitors(domain: string, params: CompetitorsParams): Promise<CompetitorsResponse> {
    try {
      const queryParams = new URLSearchParams();
      queryParams.append('country', params.country);
      if (params.limit) queryParams.append('limit', params.limit.toString());

      const response = await this.get<CompetitorsResponse>(`/seo/organic-research/competitors/${domain}?${queryParams.toString()}`);
      return response;
    } catch (error) {
      // Return mock data if API fails
      const mockCompetitors: CompetitorDomain[] = [];

      for (let i = 0; i < (params.limit || 10); i++) {
        mockCompetitors.push({
          domain: `competitor${i + 1}.com`,
          competitionLevel: Math.floor(Math.random() * 100),
          commonKeywords: Math.floor(Math.random() * 1000) + 100,
          keywords: Math.floor(Math.random() * 10000) + 1000,
          traffic: Math.floor(Math.random() * 500000) + 10000,
          trafficValue: Math.floor(Math.random() * 100000) + 5000,
          topKeyword: `top keyword ${i + 1}`,
        });
      }

      return {
        data: mockCompetitors,
        total: params.limit || 10,
        targetDomain: domain,
        country: params.country,
      };
    }
  }

  /**
   * Get top pages for domain
   */
  async getDomainTopPages(domain: string, params: TopPagesParams): Promise<TopPagesResponse> {
    try {
      const queryParams = new URLSearchParams();
      queryParams.append('country', params.country);
      if (params.limit) queryParams.append('limit', params.limit.toString());
      if (params.sortBy) queryParams.append('sortBy', params.sortBy);

      const response = await this.get<TopPagesResponse>(`/seo/organic-research/top-pages/${domain}?${queryParams.toString()}`);
      return response;
    } catch (error) {
      // Return mock data if API fails
      const mockPages: TopPage[] = [];

      for (let i = 0; i < (params.limit || 20); i++) {
        mockPages.push({
          url: `https://${domain}/page-${i + 1}`,
          traffic: Math.floor(Math.random() * 10000) + 500,
          keywords: Math.floor(Math.random() * 200) + 10,
          trafficValue: Math.floor(Math.random() * 5000) + 200,
          avgPosition: Math.floor(Math.random() * 50) + 1,
          topKeywords: [
            `keyword ${i + 1}`,
            `keyword ${i + 2}`,
            `keyword ${i + 3}`
          ],
        });
      }

      return {
        data: mockPages,
        total: params.limit || 20,
        domain,
        country: params.country,
      };
    }
  }

  /**
   * Get comprehensive domain overview
   */
  getDomainOverview(domain: string, params?: any): Promise<any> {
    const queryString = params ? `?${new URLSearchParams(params).toString()}` : '';
    return this.get<any>(`/seo/domain-overview/${domain}${queryString}`);
  }

  /**
   * Get top keywords for domain
   */
  getDomainTopKeywords(domain: string, params?: any): Promise<any[]> {
    const queryString = params ? `?${new URLSearchParams(params).toString()}` : '';
    return this.get<any[]>(`/seo/domain-overview/top-keywords/${domain}${queryString}`);
  }

  /**
   * Generate topic ideas
   */
  generateTopicIdeas(data: any): Promise<any[]> {
    return this.post<any[]>("/seo/topic-research/ideas", data);
  }

  /**
   * Get related topics
   */
  getRelatedTopics(topic: string, params?: any): Promise<any[]> {
    const queryString = params ? `?${new URLSearchParams(params).toString()}` : '';
    return this.get<any[]>(`/seo/topic-research/related/${topic}${queryString}`);
  }

  /**
   * Get topic questions
   */
  getTopicQuestions(topic: string, params?: any): Promise<any[]> {
    const queryString = params ? `?${new URLSearchParams(params).toString()}` : '';
    return this.get<any[]>(`/seo/topic-research/questions/${topic}${queryString}`);
  }

  /**
   * Research keywords using magic tool
   */
  researchKeywords(data: any): Promise<any[]> {
    return this.post<any[]>("/seo/keyword-magic/research", data);
  }

  /**
   * Get position tracking overview
   */
  getPositionTrackingOverview(projectId: string): Promise<any> {
    return this.get<any>(`/projects/${projectId}/position-tracking/overview`);
  }

  // =============================================================================
  // 👤 USER METHODS
  // =============================================================================

  /**
   * Get user profile
   */
  getUserProfile(): Promise<User> {
    return this.get<User>("/users/profile");
  }

  /**
   * Update user profile
   */
  updateUserProfile(data: UpdateProfileRequest): Promise<User> {
    return this.patch<User>("/users/profile", data);
  }

  /**
   * Get usage statistics
   */
  getUserUsage(): Promise<UsageStats[]> {
    return this.get<UsageStats[]>("/users/usage");
  }

  /**
   * Get notifications
   */
  getUserNotifications(params?: NotificationQueryParams): Promise<Notification[]> {
    const queryString = params ? `?${new URLSearchParams(params as any).toString()}` : '';
    return this.get<Notification[]>(`/users/notifications${queryString}`);
  }

  // =============================================================================
  // 🔧 ENHANCED USER METHODS
  // =============================================================================

  /**
   * Get user settings
   */
  getUserSettings(): Promise<UserSettings> {
    return this.get<UserSettings>("/users/settings");
  }

  /**
   * Update user settings
   */
  updateUserSettings(data: Partial<UserSettings>): Promise<UserSettings> {
    return this.put<UserSettings>("/users/settings", data);
  }

  /**
   * Get user activity log
   */
  getUserActivity(params?: PaginationParams): Promise<ApiResponse<UserActivity[]>> {
    const queryString = params ? `?${new URLSearchParams(params as any).toString()}` : '';
    return this.get<ApiResponse<UserActivity[]>>(`/users/activity${queryString}`);
  }

  /**
   * Change user password
   */
  changePassword(data: ChangePasswordRequest): Promise<void> {
    return this.post<void>("/users/change-password", data);
  }

  /**
   * Upload user avatar
   */
  uploadAvatar(file: File): Promise<UploadAvatarResponse> {
    const formData = new FormData();
    formData.append('avatar', file);
    return this.post<UploadAvatarResponse>("/users/upload-avatar", formData);
  }

  // =============================================================================
  // 💳 SUBSCRIPTION METHODS
  // =============================================================================

  /**
   * Get available plans
   */
  getSubscriptionPlans(): Promise<Plan[]> {
    return this.get<Plan[]>("/subscriptions/plans");
  }

  /**
   * Get current subscription
   */
  getCurrentSubscription(): Promise<Subscription> {
    return this.get<Subscription>("/subscriptions/current");
  }

  /**
   * Create subscription
   */
  createSubscription(data: CreateSubscriptionRequest): Promise<Subscription> {
    return this.post<Subscription>("/subscriptions", data);
  }

  /**
   * Update subscription
   */
  updateSubscription(data: UpdateSubscriptionRequest): Promise<Subscription> {
    return this.patch<Subscription>("/subscriptions", data);
  }

  /**
   * Cancel subscription
   */
  cancelSubscription(): Promise<void> {
    return this.delete<void>("/subscriptions");
  }

  // =============================================================================
  // 🔧 ENHANCED SUBSCRIPTION METHODS
  // =============================================================================

  /**
   * Get usage details by type
   */
  getUsageDetails(usageType: string): Promise<UsageDetails> {
    return this.get<UsageDetails>(`/subscriptions/usage/${usageType}`);
  }

  /**
   * Reset usage for specific type
   */
  resetUsage(usageType: string): Promise<void> {
    return this.post<void>(`/subscriptions/usage/reset`, { usageType });
  }

  /**
   * Get subscription invoices
   */
  getInvoices(params?: PaginationParams): Promise<ApiResponse<Invoice[]>> {
    const queryString = params ? `?${new URLSearchParams(params as any).toString()}` : '';
    return this.get<ApiResponse<Invoice[]>>(`/subscriptions/invoices${queryString}`);
  }

  /**
   * Download invoice
   */
  downloadInvoice(invoiceId: string): Promise<Blob> {
    return this.get<Blob>(`/subscriptions/invoices/${invoiceId}/download`, {
      responseType: 'blob'
    });
  }

  // =============================================================================
  // 📊 PROJECT METHODS
  // =============================================================================

  /**
   * Create project
   */
  createProject(data: CreateProjectRequest): Promise<Project> {
    return this.post<Project>("/projects", data);
  }

  /**
   * Get projects with pagination and search
   */
  getProjects(params?: PaginationParams): Promise<ApiResponse<Project[]>> {
    const queryString = params ? `?${new URLSearchParams(params as any).toString()}` : '';
    return this.get<ApiResponse<Project[]>>(`/projects${queryString}`);
  }

  /**
   * Get project by ID
   */
  getProjectById(projectId: string): Promise<Project> {
    return this.get<Project>(`/projects/${projectId}`);
  }

  /**
   * Update project
   */
  updateProject(projectId: string, data: UpdateProjectRequest): Promise<Project> {
    return this.patch<Project>(`/projects/${projectId}`, data);
  }

  /**
   * Delete project
   */
  deleteProject(projectId: string): Promise<void> {
    return this.delete<void>(`/projects/${projectId}`);
  }

  /**
   * Get project statistics
   */
  getProjectStats(projectId: string): Promise<ProjectStats> {
    return this.get<ProjectStats>(`/projects/${projectId}/stats`);
  }

  // =============================================================================
  // 🔧 PROJECT ANALYTICS METHODS
  // =============================================================================

  /**
   * Get comprehensive project analytics
   */
  getProjectAnalytics(projectId: string, params?: { period?: string }): Promise<ProjectAnalytics> {
    const queryString = params ? `?${new URLSearchParams(params as any).toString()}` : '';
    return this.get<ProjectAnalytics>(`/projects/${projectId}/analytics/overview${queryString}`);
  }

  /**
   * Get keyword analytics for project
   */
  getProjectKeywordAnalytics(projectId: string, params?: { period?: string }): Promise<any> {
    const queryString = params ? `?${new URLSearchParams(params as any).toString()}` : '';
    return this.get<any>(`/projects/${projectId}/analytics/keywords${queryString}`);
  }

  /**
   * Get ranking analytics for project
   */
  getProjectRankingAnalytics(projectId: string, params?: { period?: string }): Promise<any> {
    const queryString = params ? `?${new URLSearchParams(params as any).toString()}` : '';
    return this.get<any>(`/projects/${projectId}/analytics/rankings${queryString}`);
  }

  /**
   * Get competitor analytics for project
   */
  getProjectCompetitorAnalytics(projectId: string, params?: { period?: string }): Promise<any> {
    const queryString = params ? `?${new URLSearchParams(params as any).toString()}` : '';
    return this.get<any>(`/projects/${projectId}/analytics/competitors${queryString}`);
  }

  // =============================================================================
  // 🔍 KEYWORD METHODS
  // =============================================================================

  /**
   * Add keyword to project
   */
  addKeywordToProject(projectId: string, data: CreateKeywordRequest): Promise<Keyword> {
    return this.post<Keyword>(`/projects/${projectId}/keywords`, data);
  }

  /**
   * Bulk add keywords to project
   */
  bulkAddKeywords(projectId: string, data: BulkCreateKeywordsRequest): Promise<Keyword[]> {
    return this.post<Keyword[]>(`/projects/${projectId}/keywords/bulk`, data);
  }

  /**
   * Get project keywords with pagination, search and sorting
   */
  getProjectKeywords(projectId: string, params?: KeywordQueryParams): Promise<ApiResponse<Keyword[]>> {
    const queryString = params ? `?${new URLSearchParams(params as any).toString()}` : '';
    return this.get<ApiResponse<Keyword[]>>(`/projects/${projectId}/keywords${queryString}`);
  }

  /**
   * Update keyword
   */
  updateKeyword(keywordId: string, data: UpdateKeywordRequest): Promise<Keyword> {
    return this.patch<Keyword>(`/keywords/${keywordId}`, data);
  }

  /**
   * Delete keyword
   */
  deleteKeyword(keywordId: string): Promise<void> {
    return this.delete<void>(`/keywords/${keywordId}`);
  }

  /**
   * Get keyword ranking history
   */
  getKeywordRankingHistory(keywordId: string, params?: RankingHistoryParams): Promise<KeywordRanking[]> {
    const queryString = params ? `?${new URLSearchParams(params as any).toString()}` : '';
    return this.get<KeywordRanking[]>(`/keywords/${keywordId}/rankings${queryString}`);
  }

  // =============================================================================
  // � POSITION TRACKING METHODS
  // =============================================================================

  /**
   * Add ranking record for keyword
   */
  createRanking(keywordId: string, data: CreateRankingRequest): Promise<RankingRecord> {
    return this.post<RankingRecord>(`/keywords/${keywordId}/rankings`, data);
  }

  /**
   * Get ranking history for keyword
   */
  getRankingHistory(keywordId: string, params?: RankingHistoryQueryParams): Promise<RankingHistoryResponse> {
    const queryString = params ? `?${new URLSearchParams(params as any).toString()}` : '';
    return this.get<RankingHistoryResponse>(`/keywords/${keywordId}/rankings${queryString}`)
      .catch(() => {
        // Mock data for demonstration
        const mockHistory: RankingHistoryResponse = {
          keyword: {
            id: keywordId,
            keyword: "thiết kế website",
            currentRanking: 3,
            project: "Demo Project"
          },
          rankings: [
            {
              id: "r1",
              keywordId,
              position: 3,
              url: "https://example.com/thiet-ke-website",
              date: new Date().toISOString(),
              metadata: {
                search_engine: "google",
                location: "Vietnam",
                device: "desktop"
              },
              createdAt: new Date().toISOString()
            },
            {
              id: "r2",
              keywordId,
              position: 5,
              url: "https://example.com/thiet-ke-website",
              date: new Date(Date.now() - 86400000).toISOString(),
              metadata: {
                search_engine: "google",
                location: "Vietnam",
                device: "desktop"
              },
              createdAt: new Date(Date.now() - 86400000).toISOString()
            }
          ],
          trend: "up",
          summary: {
            totalRecords: 30,
            bestPosition: 3,
            worstPosition: 15,
            averagePosition: 8.5
          }
        };
        return Promise.resolve(mockHistory);
      });
  }

  /**
   * Get project rankings overview
   */
  getProjectRankingsOverview(projectId: string): Promise<ProjectRankingsOverview> {
    // For demo purposes, return mock data if API is not available
    return this.get<ProjectRankingsOverview>(`/projects/${projectId}/rankings/overview`)
      .catch(() => {
        // Mock data for demonstration
        const mockOverview: ProjectRankingsOverview = {
          project: {
            id: projectId,
            name: "SEO Demo Project",
            domain: "example.com"
          },
          summary: {
            totalKeywords: 25,
            trackedKeywords: 23,
            rankedKeywords: 18,
            avgPosition: 15.6
          },
          keywords: [
            {
              id: "1",
              keyword: "thiết kế website",
              currentRanking: 3,
              targetUrl: "https://example.com/thiet-ke-website",
              isTracking: true,
              searchVolume: 1200,
              difficulty: 65,
              trend: "up",
              rankingHistory: [
                { position: 3, date: new Date().toISOString() },
                { position: 5, date: new Date(Date.now() - 86400000).toISOString() },
              ]
            },
            {
              id: "2",
              keyword: "seo marketing",
              currentRanking: 7,
              targetUrl: "https://example.com/seo-marketing",
              isTracking: true,
              searchVolume: 890,
              difficulty: 72,
              trend: "down",
              rankingHistory: [
                { position: 7, date: new Date().toISOString() },
                { position: 5, date: new Date(Date.now() - 86400000).toISOString() },
              ]
            },
            {
              id: "3",
              keyword: "digital marketing",
              currentRanking: 12,
              targetUrl: "https://example.com/digital-marketing",
              isTracking: true,
              searchVolume: 2100,
              difficulty: 78,
              trend: "stable",
              rankingHistory: [
                { position: 12, date: new Date().toISOString() },
                { position: 12, date: new Date(Date.now() - 86400000).toISOString() },
              ]
            },
            {
              id: "4",
              keyword: "web development",
              currentRanking: 19,
              targetUrl: "https://example.com/web-development",
              isTracking: true,
              searchVolume: 1500,
              difficulty: 69,
              trend: "up",
              rankingHistory: [
                { position: 19, date: new Date().toISOString() },
                { position: 23, date: new Date(Date.now() - 86400000).toISOString() },
              ]
            },
            {
              id: "5",
              keyword: "responsive design",
              currentRanking: 45,
              targetUrl: "https://example.com/responsive-design",
              isTracking: true,
              searchVolume: 650,
              difficulty: 55,
              trend: "no-data",
              rankingHistory: [
                { position: 45, date: new Date().toISOString() },
              ]
            }
          ]
        };
        return Promise.resolve(mockOverview);
      });
  }

  // =============================================================================
  // �🔍 SEO AUDIT METHODS
  // =============================================================================

  /**
   * Start new audit
   */
  startNewAudit(projectId: string, data?: CreateAuditRequest): Promise<Audit> {
    return this.post<Audit>(`/projects/${projectId}/audits`, data);
  }

  /**
   * Get project audits
   */
  getProjectAudits(projectId: string, params?: PaginationParams): Promise<ApiResponse<Audit[]>> {
    const queryString = params ? `?${new URLSearchParams(params as any).toString()}` : '';
    return this.get<ApiResponse<Audit[]>>(`/projects/${projectId}/audits${queryString}`);
  }

  /**
   * Get audit by ID
   */
  getAuditById(auditId: string): Promise<Audit> {
    return this.get<Audit>(`/audits/${auditId}`);
  }

  /**
   * Get audit results
   */
  getAuditResults(auditId: string): Promise<AuditResults> {
    return this.get<AuditResults>(`/audits/${auditId}/results`);
  }

  /**
   * Get audit summary for project
   */
  getAuditSummary(projectId: string): Promise<any> {
    return this.get<any>(`/projects/${projectId}/audits/summary`);
  }

  /**
   * Delete audit
   */
  deleteAudit(auditId: string): Promise<void> {
    return this.delete<void>(`/audits/${auditId}`);
  }

  // =============================================================================
  // 🔧 ENHANCED SEO AUDIT METHODS
  // =============================================================================

  /**
   * Start comprehensive site audit
   */
  startSiteAudit(projectId: string, data: SiteAuditRequest): Promise<SiteAuditResult> {
    return this.post<SiteAuditResult>(`/projects/${projectId}/audits/site`, data);
  }

  /**
   * Get site audit by ID
   */
  getSiteAudit(projectId: string, auditId: string): Promise<SiteAuditResult> {
    return this.get<SiteAuditResult>(`/projects/${projectId}/audits/site/${auditId}`);
  }

  /**
   * Get site audit issues
   */
  getSiteAuditIssues(projectId: string, auditId: string, params?: PaginationParams): Promise<ApiResponse<any[]>> {
    const queryString = params ? `?${new URLSearchParams(params as any).toString()}` : '';
    return this.get<ApiResponse<any[]>>(`/projects/${projectId}/audits/site/${auditId}/issues${queryString}`);
  }

  /**
   * Mark site audit issue as resolved
   */
  resolveAuditIssue(projectId: string, auditId: string, issueId: string): Promise<void> {
    return this.put<void>(`/projects/${projectId}/audits/site/${auditId}/issues/${issueId}/resolve`, {});
  }

  // =============================================================================
  // 🔧 COMPETITOR ANALYSIS METHODS
  // =============================================================================

  /**
   * Analyze competitors
   */
  analyzeCompetitors(projectId: string, data: CompetitorAnalysisRequest): Promise<CompetitorData[]> {
    return this.post<CompetitorData[]>(`/projects/${projectId}/competitors/analyze`, data);
  }

  /**
   * Get project competitors
   */
  getProjectCompetitors(projectId: string, params?: PaginationParams): Promise<ApiResponse<CompetitorData[]>> {
    const queryString = params ? `?${new URLSearchParams(params as any).toString()}` : '';
    return this.get<ApiResponse<CompetitorData[]>>(`/projects/${projectId}/competitors${queryString}`);
  }

  /**
   * Compare with competitors
   */
  compareWithCompetitors(projectId: string, data: { competitors: string[]; metrics: string[] }): Promise<any> {
    return this.post<any>(`/projects/${projectId}/competitors/compare`, data);
  }

  // =============================================================================
  // 🔧 KEYWORD GAP ANALYSIS METHODS
  // =============================================================================

  /**
   * Perform keyword gap analysis
   */
  performKeywordGapAnalysis(projectId: string, data: KeywordGapRequest): Promise<KeywordOpportunity[]> {
    return this.post<KeywordOpportunity[]>(`/projects/${projectId}/keywords/gap-analysis`, data);
  }

  /**
   * Get keyword opportunities
   */
  getKeywordOpportunities(projectId: string, params?: PaginationParams): Promise<ApiResponse<KeywordOpportunity[]>> {
    const queryString = params ? `?${new URLSearchParams(params as any).toString()}` : '';
    return this.get<ApiResponse<KeywordOpportunity[]>>(`/projects/${projectId}/keywords/opportunities${queryString}`);
  }

  // =============================================================================
  // 🔧 POSITION TRACKING METHODS
  // =============================================================================

  /**
   * Setup position tracking
   */
  setupPositionTracking(projectId: string, data: TrackingSetup): Promise<void> {
    return this.post<void>(`/projects/${projectId}/tracking/setup`, data);
  }

  /**
   * Get position tracking overview
   */
  getTrackingOverview(projectId: string): Promise<TrackingOverview> {
    return this.get<TrackingOverview>(`/projects/${projectId}/tracking/overview`);
  }

  /**
   * Get position tracking rankings
   */
  getTrackingRankings(projectId: string, params?: { period?: string; keywords?: string[] }): Promise<any> {
    const queryString = params ? `?${new URLSearchParams(params as any).toString()}` : '';
    return this.get<any>(`/projects/${projectId}/tracking/rankings${queryString}`);
  }

  /**
   * Update tracking settings
   */
  updateTrackingSettings(projectId: string, data: Partial<TrackingSettings>): Promise<TrackingSettings> {
    return this.put<TrackingSettings>(`/projects/${projectId}/tracking/settings`, data);
  }

  // =============================================================================
  // 🔧 ENHANCED BACKLINK METHODS
  // =============================================================================

  /**
   * Get comprehensive backlink profile
   */
  getBacklinkProfile(projectId: string): Promise<BacklinkProfile> {
    return this.get<BacklinkProfile>(`/projects/${projectId}/backlinks`);
  }

  /**
   * Analyze backlinks
   */
  analyzeBacklinks(projectId: string): Promise<BacklinkProfile> {
    return this.post<BacklinkProfile>(`/projects/${projectId}/backlinks/analyze`, {});
  }

  /**
   * Get backlink opportunities
   */
  getBacklinkOpportunities(projectId: string, params?: PaginationParams): Promise<ApiResponse<BacklinkOpportunity[]>> {
    const queryString = params ? `?${new URLSearchParams(params as any).toString()}` : '';
    return this.get<ApiResponse<BacklinkOpportunity[]>>(`/projects/${projectId}/backlinks/opportunities${queryString}`);
  }

  /**
   * Disavow toxic links
   */
  disavowLinks(projectId: string, data: { linkIds: string[]; reason?: string }): Promise<void> {
    return this.post<void>(`/projects/${projectId}/backlinks/disavow`, data);
  }

  // =============================================================================
  // 📝 CONTENT MANAGEMENT METHODS
  // =============================================================================

  /**
   * Get content performance
   */
  getContentPerformance(projectId: string, params?: PaginationParams): Promise<ApiResponse<ContentPerformance[]>> {
    const queryString = params ? `?${new URLSearchParams(params as any).toString()}` : '';
    return this.get<ApiResponse<ContentPerformance[]>>(`/projects/${projectId}/content/performance${queryString}`);
  }

  /**
   * Get content analytics by ID
   */
  getContentAnalytics(projectId: string, contentId: string): Promise<ContentPerformance> {
    return this.get<ContentPerformance>(`/projects/${projectId}/content/${contentId}/analytics`);
  }

  /**
   * Optimize content
   */
  optimizeContent(projectId: string, data: { contentId: string; optimization: string[] }): Promise<ContentSEOAnalysis> {
    return this.post<ContentSEOAnalysis>(`/projects/${projectId}/content/optimize`, data);
  }

  /**
   * Get content calendar
   */
  getContentCalendar(projectId: string, params?: { month?: string; year?: string }): Promise<ContentCalendar> {
    const queryString = params ? `?${new URLSearchParams(params as any).toString()}` : '';
    return this.get<ContentCalendar>(`/projects/${projectId}/content/calendar${queryString}`);
  }

  /**
   * Schedule content
   */
  scheduleContent(projectId: string, data: any): Promise<any> {
    return this.post<any>(`/projects/${projectId}/content/schedule`, data);
  }

  /**
   * Get content ideas
   */
  getContentIdeas(projectId: string, params?: { keywords?: string[]; topics?: string[] }): Promise<any[]> {
    const queryString = params ? `?${new URLSearchParams(params as any).toString()}` : '';
    return this.get<any[]>(`/projects/${projectId}/content/ideas${queryString}`);
  }

  /**
   * Generate content brief
   */
  generateContentBrief(projectId: string, data: { topic: string; keywords: string[] }): Promise<ContentBrief> {
    return this.post<ContentBrief>(`/projects/${projectId}/content/brief/generate`, data);
  }

  /**
   * Analyze content SEO
   */
  analyzeContentSEO(projectId: string, contentId: string): Promise<ContentSEOAnalysis> {
    return this.post<ContentSEOAnalysis>(`/projects/${projectId}/content/${contentId}/analyze-seo`, {});
  }

  /**
   * Check content readability
   */
  checkContentReadability(projectId: string, contentId: string): Promise<any> {
    return this.post<any>(`/projects/${projectId}/content/${contentId}/readability`, {});
  }

  /**
   * Get content suggestions
   */
  getContentSuggestions(projectId: string): Promise<any[]> {
    return this.get<any[]>(`/projects/${projectId}/content/suggestions`);
  }

  // =============================================================================
  // 📊 TRAFFIC ANALYTICS METHODS
  // =============================================================================

  /**
   * Get traffic overview
   */
  getTrafficOverview(projectId: string, params?: { period?: string }): Promise<TrafficOverview> {
    const queryString = params ? `?${new URLSearchParams(params as any).toString()}` : '';
    return this.get<TrafficOverview>(`/projects/${projectId}/traffic/overview${queryString}`);
  }

  /**
   * Get traffic sources
   */
  getTrafficSources(projectId: string, params?: { period?: string }): Promise<TrafficSource[]> {
    const queryString = params ? `?${new URLSearchParams(params as any).toString()}` : '';
    return this.get<TrafficSource[]>(`/projects/${projectId}/traffic/sources${queryString}`);
  }

  /**
   * Get page performance
   */
  getPagePerformance(projectId: string, params?: PaginationParams): Promise<ApiResponse<PagePerformance[]>> {
    const queryString = params ? `?${new URLSearchParams(params as any).toString()}` : '';
    return this.get<ApiResponse<PagePerformance[]>>(`/projects/${projectId}/traffic/pages${queryString}`);
  }

  /**
   * Get traffic keywords
   */
  getTrafficKeywords(projectId: string, params?: PaginationParams): Promise<ApiResponse<any[]>> {
    const queryString = params ? `?${new URLSearchParams(params as any).toString()}` : '';
    return this.get<ApiResponse<any[]>>(`/projects/${projectId}/traffic/keywords${queryString}`);
  }

  /**
   * Get traffic demographics
   */
  getTrafficDemographics(projectId: string, params?: { period?: string }): Promise<any> {
    const queryString = params ? `?${new URLSearchParams(params as any).toString()}` : '';
    return this.get<any>(`/projects/${projectId}/traffic/demographics${queryString}`);
  }

  /**
   * Get competitor traffic
   */
  getCompetitorTraffic(projectId: string): Promise<CompetitorTraffic[]> {
    return this.get<CompetitorTraffic[]>(`/projects/${projectId}/traffic/competitors`);
  }

  /**
   * Compare traffic with competitors
   */
  compareTraffic(projectId: string, data: { competitors: string[]; metrics: string[] }): Promise<any> {
    return this.post<any>(`/projects/${projectId}/traffic/compare`, data);
  }

  /**
   * Get market share data
   */
  getMarketShare(projectId: string): Promise<any> {
    return this.get<any>(`/projects/${projectId}/traffic/market-share`);
  }

  /**
   * Get page insights
   */
  getPageInsights(projectId: string, pageId: string): Promise<PagePerformance> {
    return this.get<PagePerformance>(`/projects/${projectId}/pages/${pageId}/insights`);
  }

  /**
   * Run speed test
   */
  runSpeedTest(projectId: string, data: { url: string; device?: string }): Promise<any> {
    return this.post<any>(`/projects/${projectId}/pages/speed-test`, data);
  }

  // =============================================================================
  // 🤖 AI CONTENT GENERATION METHODS
  // =============================================================================

  /**
   * Generate content using AI
   */
  generateContent(data: ContentGenerationRequest): Promise<GeneratedContent> {
    return this.post<GeneratedContent>("/ai/content/generate", data);
  }

  /**
   * Rewrite content using AI
   */
  rewriteContent(data: { content: string; style?: string; tone?: string }): Promise<GeneratedContent> {
    return this.post<GeneratedContent>("/ai/content/rewrite", data);
  }

  /**
   * Expand content using AI
   */
  expandContent(data: { content: string; targetLength: number }): Promise<GeneratedContent> {
    return this.post<GeneratedContent>("/ai/content/expand", data);
  }

  /**
   * Generate meta descriptions using AI
   */
  generateMeta(data: { content: string; targetKeywords?: string[] }): Promise<{ title: string; description: string; }> {
    return this.post<{ title: string; description: string; }>("/ai/meta/generate", data);
  }

  /**
   * AI SEO page analysis
   */
  aiAnalyzePage(data: { url: string; targetKeywords?: string[] }): Promise<AISEOAnalysis> {
    return this.post<AISEOAnalysis>("/ai/seo/analyze-page", data);
  }

  /**
   * AI keyword suggestions
   */
  aiKeywordSuggestions(data: { seedKeyword: string; industry?: string; location?: string }): Promise<any[]> {
    return this.post<any[]>("/api/v1/ai/seo/keyword-suggestions", data);
  }

  /**
   * AI content gap analysis
   */
  aiContentGap(data: { competitors: string[]; topic: string }): Promise<any> {
    return this.post<any>("/ai/seo/content-gap", data);
  }

  /**
   * AI optimize content
   */
  aiOptimizeContent(data: { content: string; targetKeywords: string[] }): Promise<any> {
    return this.post<any>("/ai/seo/optimize-content", data);
  }

  /**
   * AI keyword research
   */
  aiKeywordResearch(data: { seedKeyword: string; industry: string; location?: string; language: string }): Promise<AIKeywordResearch> {
    return this.post<AIKeywordResearch>("/ai/keywords/research", data);
  }

  /**
   * AI keyword clustering
   */
  aiKeywordCluster(data: { keywords: string[] }): Promise<any> {
    return this.post<any>("/ai/keywords/cluster", data);
  }

  /**
   * AI keyword intent analysis
   */
  aiKeywordIntentAnalysis(data: { keywords: string[] }): Promise<any> {
    return this.post<any>("/ai/keywords/intent-analysis", data);
  }

  // =============================================================================
  // 📋 REPORTING & ANALYTICS METHODS
  // =============================================================================

  /**
   * Create custom report
   */
  createCustomReport(projectId: string, data: Omit<CustomReport, 'reportId'>): Promise<CustomReport> {
    return this.post<CustomReport>(`/projects/${projectId}/reports/create`, data);
  }

  /**
   * Get project reports
   */
  getProjectReports(projectId: string, params?: PaginationParams): Promise<ApiResponse<CustomReport[]>> {
    const queryString = params ? `?${new URLSearchParams(params as any).toString()}` : '';
    return this.get<ApiResponse<CustomReport[]>>(`/projects/${projectId}/reports${queryString}`);
  }

  /**
   * Export report
   */
  exportReport(projectId: string, reportId: string, format: string = 'pdf'): Promise<Blob> {
    return this.get<Blob>(`/projects/${projectId}/reports/${reportId}/export?format=${format}`, {
      responseType: 'blob'
    });
  }

  /**
   * Schedule report
   */
  scheduleReport(projectId: string, reportId: string, data: any): Promise<CustomReport> {
    return this.put<CustomReport>(`/projects/${projectId}/reports/${reportId}/schedule`, data);
  }

  /**
   * Get dashboard overview
   */
  getDashboardOverview(projectId: string): Promise<DashboardOverview> {
    return this.get<DashboardOverview>(`/projects/${projectId}/dashboard/overview`);
  }

  /**
   * Get dashboard alerts
   */
  getDashboardAlerts(projectId: string): Promise<any[]> {
    return this.get<any[]>(`/projects/${projectId}/dashboard/alerts`);
  }

  /**
   * Customize dashboard
   */
  customizeDashboard(projectId: string, data: any): Promise<any> {
    return this.post<any>(`/projects/${projectId}/dashboard/customize`, data);
  }

  // =============================================================================
  // 🔗 INTEGRATION METHODS
  // =============================================================================

  /**
   * Connect Google Search Console
   */
  connectGSC(data: { projectId: string; siteUrl: string; authCode: string }): Promise<GSCIntegration> {
    return this.post<GSCIntegration>("/integrations/gsc/connect", data);
  }

  /**
   * Get GSC data
   */
  getGSCData(projectId: string, params?: { startDate?: string; endDate?: string }): Promise<any> {
    const queryString = params ? `?${new URLSearchParams(params as any).toString()}` : '';
    return this.get<any>(`/integrations/gsc/data?projectId=${projectId}${queryString}`);
  }

  /**
   * Sync GSC data
   */
  syncGSCData(projectId: string): Promise<void> {
    return this.post<void>("/integrations/gsc/sync", { projectId });
  }

  /**
   * Connect Google Analytics
   */
  connectGA(data: { projectId: string; propertyId: string; authCode: string }): Promise<GAIntegration> {
    return this.post<GAIntegration>("/integrations/ga/connect", data);
  }

  /**
   * Get GA data
   */
  getGAData(projectId: string, params?: { startDate?: string; endDate?: string; metrics?: string[] }): Promise<any> {
    const queryString = params ? `?${new URLSearchParams(params as any).toString()}` : '';
    return this.get<any>(`/integrations/ga/data?projectId=${projectId}${queryString}`);
  }

  /**
   * Set GA goals
   */
  setGAGoals(projectId: string, data: { goals: any[] }): Promise<any> {
    return this.post<any>("/integrations/ga/goals", { projectId, ...data });
  }

  // =============================================================================
  // 📊 BULK OPERATIONS METHODS
  // =============================================================================

  /**
   * Bulk update keywords
   */
  bulkUpdateKeywords(projectId: string, data: { keywordIds: string[]; updates: any }): Promise<BulkUpdateResponse> {
    return this.post<BulkUpdateResponse>(`/projects/${projectId}/keywords/bulk-update`, data);
  }

  /**
   * Bulk delete keywords
   */
  bulkDeleteKeywords(projectId: string, data: { keywordIds: string[] }): Promise<BulkUpdateResponse> {
    return this.post<BulkUpdateResponse>(`/projects/${projectId}/keywords/bulk-delete`, data);
  }

  /**
   * Bulk import rankings
   */
  bulkImportRankings(projectId: string, data: any): Promise<BulkUpdateResponse> {
    return this.post<BulkUpdateResponse>(`/projects/${projectId}/rankings/bulk-import`, data);
  }

  /**
   * Bulk import backlinks
   */
  bulkImportBacklinks(projectId: string, data: any): Promise<BulkUpdateResponse> {
    return this.post<BulkUpdateResponse>(`/projects/${projectId}/backlinks/bulk-import`, data);
  }

  // =============================================================================
  // 📤 EXPORT/IMPORT METHODS
  // =============================================================================

  /**
   * Export project data
   */
  exportProjectData(projectId: string, data: ExportRequest): Promise<ExportResponse> {
    return this.post<ExportResponse>(`/projects/${projectId}/export`, data);
  }

  /**
   * Import project data
   */
  importProjectData(projectId: string, file: File, dataType: string): Promise<BulkUpdateResponse> {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('dataType', dataType);
    return this.post<BulkUpdateResponse>(`/projects/${projectId}/import`, formData);
  }

  /**
   * Download export
   */
  downloadExport(projectId: string, exportId: string): Promise<Blob> {
    return this.get<Blob>(`/projects/${projectId}/export/${exportId}/download`, {
      responseType: 'blob'
    });
  }

  // =============================================================================
  // 🔧 UTILITY METHODS
  // =============================================================================

  /**
   * Get API health status
   */
  getHealthStatus(): Promise<{ status: string; timestamp: string; version: string }> {
    return this.get<{ status: string; timestamp: string; version: string }>("/health");
  }

  /**
   * Get API usage statistics
   */
  getApiUsage(): Promise<{ requests: number; rateLimit: number; remaining: number; resetTime: string }> {
    return this.get<{ requests: number; rateLimit: number; remaining: number; resetTime: string }>("/usage");
  }

  /**
   * Get API limits for organic research
   */
  async getApiLimits(): Promise<ApiLimitsResponse> {
    try {
      const response = await this.get<ApiLimitsResponse>('/seo/organic-research/api-limits');
      return response;
    } catch (error) {
      // Return mock data if API fails
      return {
        semrush: 1000,
        ahrefs: 500,
        moz: 300,
      };
    }
  }
}

export const seoService: SeoService = new SeoService();
