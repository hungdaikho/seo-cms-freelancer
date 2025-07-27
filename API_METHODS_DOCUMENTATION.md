# SEO Service API Methods Documentation

## 📋 Tổng quan

File này ghi lại tất cả các API methods đã được implement trong `SeoService` class dựa trên API Requirements.

## 🔐 Authentication Methods

### Basic Auth

- `register(data: RegisterRequest): Promise<AuthResponse>`
- `login(data: LoginRequest): Promise<AuthResponse>`

## 👤 User Management Methods

### Basic User Operations

- `getUserProfile(): Promise<User>`
- `updateUserProfile(data: UpdateProfileRequest): Promise<User>`
- `getUserUsage(): Promise<UsageStats[]>`
- `getUserNotifications(params?: NotificationQueryParams): Promise<Notification[]>`

### Enhanced User Operations ✅ **NEW**

- `getUserSettings(): Promise<UserSettings>`
- `updateUserSettings(data: Partial<UserSettings>): Promise<UserSettings>`
- `getUserActivity(params?: PaginationParams): Promise<ApiResponse<UserActivity[]>>`
- `changePassword(data: ChangePasswordRequest): Promise<void>`
- `uploadAvatar(file: File): Promise<UploadAvatarResponse>`

## 💳 Subscription Methods

### Basic Subscription Operations

- `getSubscriptionPlans(): Promise<Plan[]>`
- `getCurrentSubscription(): Promise<Subscription>`
- `createSubscription(data: CreateSubscriptionRequest): Promise<Subscription>`
- `updateSubscription(data: UpdateSubscriptionRequest): Promise<Subscription>`
- `cancelSubscription(): Promise<void>`

### Enhanced Subscription Operations ✅ **NEW**

- `getUsageDetails(usageType: string): Promise<UsageDetails>`
- `resetUsage(usageType: string): Promise<void>`
- `getInvoices(params?: PaginationParams): Promise<ApiResponse<Invoice[]>>`
- `downloadInvoice(invoiceId: string): Promise<Blob>`

## 📊 Project Management Methods

### Basic Project Operations

- `createProject(data: CreateProjectRequest): Promise<Project>`
- `getProjects(params?: PaginationParams): Promise<ApiResponse<Project[]>>`
- `getProjectById(projectId: string): Promise<Project>`
- `updateProject(projectId: string, data: UpdateProjectRequest): Promise<Project>`
- `deleteProject(projectId: string): Promise<void>`
- `getProjectStats(projectId: string): Promise<ProjectStats>`

### Enhanced Project Analytics ✅ **NEW**

- `getProjectAnalytics(projectId: string, params?: { period?: string }): Promise<ProjectAnalytics>`
- `getProjectKeywordAnalytics(projectId: string, params?: { period?: string }): Promise<any>`
- `getProjectRankingAnalytics(projectId: string, params?: { period?: string }): Promise<any>`
- `getProjectCompetitorAnalytics(projectId: string, params?: { period?: string }): Promise<any>`

## 🔍 Keyword Management Methods

### Basic Keyword Operations

- `addKeywordToProject(projectId: string, data: CreateKeywordRequest): Promise<Keyword>`
- `bulkAddKeywords(projectId: string, data: BulkCreateKeywordsRequest): Promise<Keyword[]>`
- `getProjectKeywords(projectId: string, params?: KeywordQueryParams): Promise<ApiResponse<Keyword[]>>`
- `updateKeyword(keywordId: string, data: UpdateKeywordRequest): Promise<Keyword>`
- `deleteKeyword(keywordId: string): Promise<void>`
- `getKeywordRankingHistory(keywordId: string, params?: RankingHistoryParams): Promise<KeywordRanking[]>`

### Enhanced Keyword Operations ✅ **NEW**

- `performKeywordGapAnalysis(projectId: string, data: KeywordGapRequest): Promise<KeywordOpportunity[]>`
- `getKeywordOpportunities(projectId: string, params?: PaginationParams): Promise<ApiResponse<KeywordOpportunity[]>>`

## 🔍 SEO Audit Methods

### Basic Audit Operations

- `startNewAudit(projectId: string, data?: CreateAuditRequest): Promise<Audit>`
- `getProjectAudits(projectId: string, params?: PaginationParams): Promise<ApiResponse<Audit[]>>`
- `getAuditById(auditId: string): Promise<Audit>`
- `getAuditResults(auditId: string): Promise<AuditResults>`
- `getAuditSummary(projectId: string): Promise<any>`
- `deleteAudit(auditId: string): Promise<void>`

### Enhanced Site Audit Operations ✅ **NEW**

- `startSiteAudit(projectId: string, data: SiteAuditRequest): Promise<SiteAuditResult>`
- `getSiteAudit(projectId: string, auditId: string): Promise<SiteAuditResult>`
- `getSiteAuditIssues(projectId: string, auditId: string, params?: PaginationParams): Promise<ApiResponse<any[]>>`
- `resolveAuditIssue(projectId: string, auditId: string, issueId: string): Promise<void>`

## 🏢 Competitor Analysis Methods ✅ **NEW**

- `analyzeCompetitors(projectId: string, data: CompetitorAnalysisRequest): Promise<CompetitorData[]>`
- `getProjectCompetitors(projectId: string, params?: PaginationParams): Promise<ApiResponse<CompetitorData[]>>`
- `compareWithCompetitors(projectId: string, data: { competitors: string[]; metrics: string[] }): Promise<any>`

## 📈 Position Tracking Methods ✅ **NEW**

- `setupPositionTracking(projectId: string, data: TrackingSetup): Promise<void>`
- `getTrackingOverview(projectId: string): Promise<TrackingOverview>`
- `getTrackingRankings(projectId: string, params?: { period?: string; keywords?: string[] }): Promise<any>`
- `updateTrackingSettings(projectId: string, data: Partial<TrackingSettings>): Promise<TrackingSettings>`

## 🔗 Backlink Management Methods ✅ **NEW**

- `getBacklinkProfile(projectId: string): Promise<BacklinkProfile>`
- `analyzeBacklinks(projectId: string): Promise<BacklinkProfile>`
- `getBacklinkOpportunities(projectId: string, params?: PaginationParams): Promise<ApiResponse<BacklinkOpportunity[]>>`
- `disavowLinks(projectId: string, data: { linkIds: string[]; reason?: string }): Promise<void>`

## 📝 Content Management Methods ✅ **NEW**

### Content Performance

- `getContentPerformance(projectId: string, params?: PaginationParams): Promise<ApiResponse<ContentPerformance[]>>`
- `getContentAnalytics(projectId: string, contentId: string): Promise<ContentPerformance>`
- `optimizeContent(projectId: string, data: { contentId: string; optimization: string[] }): Promise<ContentSEOAnalysis>`

### Content Planning

- `getContentCalendar(projectId: string, params?: { month?: string; year?: string }): Promise<ContentCalendar>`
- `scheduleContent(projectId: string, data: any): Promise<any>`
- `getContentIdeas(projectId: string, params?: { keywords?: string[]; topics?: string[] }): Promise<any[]>`
- `generateContentBrief(projectId: string, data: { topic: string; keywords: string[] }): Promise<ContentBrief>`

### Content Optimization

- `analyzeContentSEO(projectId: string, contentId: string): Promise<ContentSEOAnalysis>`
- `checkContentReadability(projectId: string, contentId: string): Promise<any>`
- `getContentSuggestions(projectId: string): Promise<any[]>`

## 📊 Traffic Analytics Methods ✅ **NEW**

### Traffic Overview

- `getTrafficOverview(projectId: string, params?: { period?: string }): Promise<TrafficOverview>`
- `getTrafficSources(projectId: string, params?: { period?: string }): Promise<TrafficSource[]>`
- `getTrafficKeywords(projectId: string, params?: PaginationParams): Promise<ApiResponse<any[]>>`
- `getTrafficDemographics(projectId: string, params?: { period?: string }): Promise<any>`

### Page Performance

- `getPagePerformance(projectId: string, params?: PaginationParams): Promise<ApiResponse<PagePerformance[]>>`
- `getPageInsights(projectId: string, pageId: string): Promise<PagePerformance>`
- `runSpeedTest(projectId: string, data: { url: string; device?: string }): Promise<any>`

### Competitor Traffic

- `getCompetitorTraffic(projectId: string): Promise<CompetitorTraffic[]>`
- `compareTraffic(projectId: string, data: { competitors: string[]; metrics: string[] }): Promise<any>`
- `getMarketShare(projectId: string): Promise<any>`

## 🤖 AI Content Generation Methods ✅ **NEW**

### Content Generation

- `generateContent(data: ContentGenerationRequest): Promise<GeneratedContent>`
- `rewriteContent(data: { content: string; style?: string; tone?: string }): Promise<GeneratedContent>`
- `expandContent(data: { content: string; targetLength: number }): Promise<GeneratedContent>`
- `generateMeta(data: { content: string; targetKeywords?: string[] }): Promise<{ title: string; description: string; }>`

### AI SEO Analysis

- `aiAnalyzePage(data: { url: string; targetKeywords?: string[] }): Promise<AISEOAnalysis>`
- `aiKeywordSuggestions(data: { seedKeyword: string; industry?: string; location?: string }): Promise<any[]>`
- `aiContentGap(data: { competitors: string[]; topic: string }): Promise<any>`
- `aiOptimizeContent(data: { content: string; targetKeywords: string[] }): Promise<any>`

### AI Keyword Research

- `aiKeywordResearch(data: { seedKeyword: string; industry: string; location?: string; language: string }): Promise<AIKeywordResearch>`
- `aiKeywordCluster(data: { keywords: string[] }): Promise<any>`
- `aiKeywordIntentAnalysis(data: { keywords: string[] }): Promise<any>`

## 📋 Reporting & Analytics Methods ✅ **NEW**

### Custom Reports

- `createCustomReport(projectId: string, data: Omit<CustomReport, 'reportId'>): Promise<CustomReport>`
- `getProjectReports(projectId: string, params?: PaginationParams): Promise<ApiResponse<CustomReport[]>>`
- `exportReport(projectId: string, reportId: string, format: string = 'pdf'): Promise<Blob>`
- `scheduleReport(projectId: string, reportId: string, data: any): Promise<CustomReport>`

### Dashboard

- `getDashboardOverview(projectId: string): Promise<DashboardOverview>`
- `getDashboardAlerts(projectId: string): Promise<any[]>`
- `customizeDashboard(projectId: string, data: any): Promise<any>`

## 🔗 Integration Methods ✅ **NEW**

### Google Search Console

- `connectGSC(data: { projectId: string; siteUrl: string; authCode: string }): Promise<GSCIntegration>`
- `getGSCData(projectId: string, params?: { startDate?: string; endDate?: string }): Promise<any>`
- `syncGSCData(projectId: string): Promise<void>`

### Google Analytics

- `connectGA(data: { projectId: string; propertyId: string; authCode: string }): Promise<GAIntegration>`
- `getGAData(projectId: string, params?: { startDate?: string; endDate?: string; metrics?: string[] }): Promise<any>`
- `setGAGoals(projectId: string, data: { goals: any[] }): Promise<any>`

## 📊 Bulk Operations Methods ✅ **NEW**

- `bulkUpdateKeywords(projectId: string, data: { keywordIds: string[]; updates: any }): Promise<BulkUpdateResponse>`
- `bulkDeleteKeywords(projectId: string, data: { keywordIds: string[] }): Promise<BulkUpdateResponse>`
- `bulkImportRankings(projectId: string, data: any): Promise<BulkUpdateResponse>`
- `bulkImportBacklinks(projectId: string, data: any): Promise<BulkUpdateResponse>`

## 📤 Export/Import Methods ✅ **NEW**

- `exportProjectData(projectId: string, data: ExportRequest): Promise<ExportResponse>`
- `importProjectData(projectId: string, file: File, dataType: string): Promise<BulkUpdateResponse>`
- `downloadExport(projectId: string, exportId: string): Promise<Blob>`

## 🔧 Utility Methods ✅ **NEW**

- `getHealthStatus(): Promise<{ status: string; timestamp: string; version: string }>`
- `getApiUsage(): Promise<{ requests: number; rateLimit: number; remaining: number; resetTime: string }>`

---

## 📝 Thống kê

### Tổng số API Methods: **100+**

- **Authentication**: 2 methods
- **User Management**: 9 methods (5 basic + 4 enhanced)
- **Subscription**: 9 methods (5 basic + 4 enhanced)
- **Project Management**: 10 methods (6 basic + 4 analytics)
- **Keyword Management**: 8 methods (6 basic + 2 enhanced)
- **SEO Audit**: 10 methods (6 basic + 4 enhanced)
- **Competitor Analysis**: 3 methods ✅ **NEW**
- **Position Tracking**: 4 methods ✅ **NEW**
- **Backlink Management**: 4 methods ✅ **NEW**
- **Content Management**: 9 methods ✅ **NEW**
- **Traffic Analytics**: 9 methods ✅ **NEW**
- **AI Content Generation**: 8 methods ✅ **NEW**
- **Reporting & Analytics**: 7 methods ✅ **NEW**
- **Integrations**: 6 methods ✅ **NEW**
- **Bulk Operations**: 4 methods ✅ **NEW**
- **Export/Import**: 3 methods ✅ **NEW**
- **Utility**: 2 methods ✅ **NEW**

### 🎯 **Completion Status**:

- ✅ **API Types**: 100% completed
- ✅ **Service Methods**: 100% completed
- ✅ **Type Safety**: 100% TypeScript coverage
- ✅ **Error Handling**: Integrated with BaseService
- ✅ **Documentation**: Complete method documentation

## 🚀 Sử dụng

```typescript
import { seoService } from "@/services/seo.service";

// Example usage
const analytics = await seoService.getProjectAnalytics("project-id");
const content = await seoService.generateContent({
  projectId: "project-id",
  type: "blog-post",
  topic: "SEO Best Practices",
  targetKeywords: ["seo", "optimization"],
  tone: "professional",
  length: "medium",
  audience: "marketers",
});
```

## 🔄 Next Steps

1. **Backend Implementation**: Implement corresponding backend APIs
2. **Testing**: Add unit tests for service methods
3. **Error Handling**: Enhance error handling for specific use cases
4. **Rate Limiting**: Implement client-side rate limiting
5. **Caching**: Add response caching for performance
