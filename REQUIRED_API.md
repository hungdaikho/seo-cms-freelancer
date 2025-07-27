# Required API Endpoints for SEO Module

## Current Status

All SEO module components are currently using hardcoded mock data. This document outlines all required API endpoints to make the SEO module fully dynamic with real server data.

## 🔍 ORGANIC RESEARCH APIs

### 1. Domain Analysis

```typescript
// GET /api/v1/seo/organic-research/domain/{domain}
interface OrganicDomainAnalysisRequest {
  domain: string;
  country: string; // US, UK, etc.
  database?: string;
}

interface OrganicDomainResponse {
  domain: string;
  organicKeywords: number;
  organicTraffic: number;
  organicCost: number;
  avgPosition: number;
  visibility: number;
  lastUpdated: string;
}
```

### 2. Organic Keywords

```typescript
// GET /api/v1/seo/organic-research/keywords/{domain}
interface OrganicKeywordsRequest {
  domain: string;
  country: string;
  limit?: number;
  offset?: number;
  sortBy?: "position" | "traffic" | "volume";
  sortOrder?: "asc" | "desc";
}

interface OrganicKeyword {
  keyword: string;
  position: number;
  previousPosition: number;
  searchVolume: number;
  trafficShare: number;
  cpc: number;
  difficulty: number;
  intent: string;
  url: string;
  features: string[];
}
```

### 3. Competitor Discovery

```typescript
// GET /api/v1/seo/organic-research/competitors/{domain}
interface CompetitorDiscoveryRequest {
  domain: string;
  country: string;
  limit?: number;
}

interface CompetitorData {
  domain: string;
  competitionLevel: number;
  commonKeywords: number;
  keywords: number;
  traffic: number;
  trafficValue: number;
  topKeyword: string;
}
```

### 4. Top Pages Analysis

```typescript
// GET /api/v1/seo/organic-research/top-pages/{domain}
interface TopPagesRequest {
  domain: string;
  country: string;
  limit?: number;
  sortBy?: "traffic" | "keywords" | "value";
}

interface TopPage {
  url: string;
  traffic: number;
  keywords: number;
  trafficValue: number;
  avgPosition: number;
  topKeywords: string[];
}
```

## 🏆 DOMAIN OVERVIEW APIs

### 1. Domain Authority Metrics

```typescript
// GET /api/v1/seo/domain-overview/{domain}
interface DomainOverviewRequest {
  domain: string;
  includeSubdomains?: boolean;
}

interface DomainOverviewResponse {
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
```

### 2. Top Keywords for Domain

```typescript
// GET /api/v1/seo/domain-overview/top-keywords/{domain}
interface TopKeyword {
  keyword: string;
  position: number;
  searchVolume: number;
  traffic: number;
  cpc: number;
  difficulty: number;
  trend: "up" | "down" | "stable";
}
```

### 3. Domain Competitors

```typescript
// GET /api/v1/seo/domain-overview/competitors/{domain}
interface Competitor {
  domain: string;
  competitionLevel: number;
  commonKeywords: number;
  authorityScore: number;
  trafficGap: number;
}
```

### 4. Content Topics

```typescript
// GET /api/v1/seo/domain-overview/topics/{domain}
interface Topic {
  topic: string;
  keywords: number;
  traffic: number;
  difficulty: number;
  opportunities: number;
}
```

## 📝 TOPIC RESEARCH APIs

### 1. Topic Ideas Generation

```typescript
// POST /api/v1/seo/topic-research/ideas
interface TopicResearchRequest {
  seedKeyword: string;
  country: string;
  industry?: string;
  contentType?: "blog" | "product" | "service";
}

interface TopicIdea {
  topic: string;
  volume: number;
  difficulty: number;
  opportunity: number;
  questions: number;
  relatedKeywords: string[];
}
```

### 2. Related Topics

```typescript
// GET /api/v1/seo/topic-research/related/{topic}
interface RelatedTopic {
  topic: string;
  relevance: number;
  volume: number;
  difficulty: number;
  trending: boolean;
}
```

### 3. Topic Questions

```typescript
// GET /api/v1/seo/topic-research/questions/{topic}
interface Question {
  question: string;
  volume: number;
  difficulty: number;
  intent: string;
  relatedKeywords: string[];
}
```

## 🔧 SITE AUDIT APIs

### 1. Comprehensive Site Audit

```typescript
// POST /api/v1/seo/site-audit/start
interface SiteAuditRequest {
  projectId: string;
  url: string;
  includeSubdomains?: boolean;
  crawlLimit?: number;
  userAgent?: string;
}

interface AuditResult {
  auditId: string;
  status: "pending" | "running" | "completed" | "failed";
  startedAt: string;
  completedAt?: string;
  pagesAnalyzed: number;
  totalPages: number;
  overallScore: number;
  issues: {
    critical: number;
    warning: number;
    notice: number;
  };
  categories: {
    technical: AuditCategory;
    content: AuditCategory;
    meta: AuditCategory;
    images: AuditCategory;
    links: AuditCategory;
  };
}

interface AuditCategory {
  score: number;
  issues: AuditIssue[];
}

interface AuditIssue {
  id: string;
  type: "critical" | "warning" | "notice";
  title: string;
  description: string;
  affectedPages: string[];
  howToFix: string;
}
```

### 2. Get Audit Results

```typescript
// GET /api/v1/seo/site-audit/{auditId}/results
// Returns detailed audit results with paginated issues
```

### 3. Mark Issue as Resolved

```typescript
// PUT /api/v1/seo/site-audit/{auditId}/issues/{issueId}/resolve
interface ResolveIssueRequest {
  resolution: string;
  notes?: string;
}
```

## 📊 POSITION TRACKING APIs

### 1. Setup Position Tracking

```typescript
// POST /api/v1/seo/position-tracking/setup
interface TrackingSetupRequest {
  projectId: string;
  keywords: string[];
  searchEngines: Array<{
    engine: "google" | "bing" | "yahoo";
    country: string;
    language?: string;
    location?: string;
  }>;
  competitors?: string[];
  trackingFrequency: "daily" | "weekly" | "monthly";
}
```

### 2. Get Tracking Overview

```typescript
// GET /api/v1/seo/position-tracking/{projectId}/overview
interface TrackingOverview {
  totalKeywords: number;
  avgPosition: number;
  visibility: number;
  estimatedTraffic: number;
  improvements: number;
  declines: number;
  shareOfVoice: number;
  competitorComparison: Array<{
    competitor: string;
    avgPosition: number;
    visibility: number;
  }>;
}
```

### 3. Get Position Data

```typescript
// GET /api/v1/seo/position-tracking/{projectId}/positions
interface PositionDataRequest {
  startDate?: string;
  endDate?: string;
  keywords?: string[];
  searchEngine?: string;
  country?: string;
}

interface PositionData {
  keyword: string;
  currentPosition: number;
  previousPosition: number;
  bestPosition: number;
  searchVolume: number;
  difficulty: number;
  url: string;
  searchEngine: string;
  country: string;
  history: Array<{
    date: string;
    position: number;
  }>;
}
```

## 🔗 KEYWORD MAGIC TOOL APIs

### 1. Keyword Research

```typescript
// POST /api/v1/seo/keyword-magic/research
interface KeywordResearchRequest {
  seedKeyword: string;
  country: string;
  language?: string;
  includeQuestions?: boolean;
  includeRelated?: boolean;
  matchType?: "broad" | "phrase" | "exact";
}

interface KeywordData {
  keyword: string;
  volume: number;
  difficulty: number;
  cpc: number;
  competition: number;
  intent: string;
  trend: Array<{
    month: string;
    volume: number;
  }>;
  features: string[];
}
```

### 2. Keyword Clustering

```typescript
// POST /api/v1/seo/keyword-magic/cluster
interface KeywordClusterRequest {
  keywords: string[];
  groupingMethod: "semantic" | "serp" | "lexical";
}

interface KeywordCluster {
  clusterId: string;
  name: string;
  keywords: KeywordData[];
  totalVolume: number;
  avgDifficulty: number;
}
```

### 3. Keyword Filters

```typescript
// GET /api/v1/seo/keyword-magic/filters
interface KeywordFilters {
  volumeMin?: number;
  volumeMax?: number;
  difficultyMin?: number;
  difficultyMax?: number;
  cpcMin?: number;
  cpcMax?: number;
  wordCount?: number;
  includeWords?: string[];
  excludeWords?: string[];
  intent?: string[];
}
```

## 🔍 KEYWORD GAP ANALYSIS APIs

### 1. Keyword Gap Analysis

```typescript
// POST /api/v1/seo/keyword-gap/analyze
interface KeywordGapRequest {
  projectId: string;
  domain: string;
  competitors: string[];
  country: string;
  showMissing?: boolean;
  showWeak?: boolean;
  showStrong?: boolean;
  showUntapped?: boolean;
}

interface KeywordGap {
  keyword: string;
  volume: number;
  difficulty: number;
  myPosition?: number;
  competitorPositions: Array<{
    domain: string;
    position: number;
    url: string;
  }>;
  opportunity: "missing" | "weak" | "strong" | "untapped";
  potentialTraffic: number;
}
```

### 2. Competitor Domains

```typescript
// GET /api/v1/seo/keyword-gap/competitors/{domain}
interface CompetitorDomain {
  domain: string;
  commonKeywords: number;
  uniqueKeywords: number;
  avgPosition: number;
  estimatedTraffic: number;
}
```

## 🔗 BACKLINK ANALYTICS APIs

### 1. Backlink Profile Analysis

```typescript
// GET /api/v1/seo/backlinks/{projectId}/profile
interface BacklinkProfile {
  totalBacklinks: number;
  referringDomains: number;
  followLinks: number;
  nofollowLinks: number;
  domainRating: number;
  urlRating: number;
  organicTraffic: number;
  organicKeywords: number;
  newBacklinks: BacklinkData[];
  lostBacklinks: BacklinkData[];
  topReferringDomains: Array<{
    domain: string;
    domainRating: number;
    backlinks: number;
    firstSeen: string;
    lastSeen: string;
  }>;
  anchorTexts: Array<{
    anchor: string;
    backlinks: number;
    percentage: number;
  }>;
}

interface BacklinkData {
  sourceUrl: string;
  targetUrl: string;
  anchorText: string;
  domainRating: number;
  urlRating: number;
  dofollow: boolean;
  firstSeen: string;
  lastSeen: string;
  linkType: string;
}
```

### 2. Backlink Opportunities

```typescript
// GET /api/v1/seo/backlinks/{projectId}/opportunities
interface BacklinkOpportunity {
  domain: string;
  domainRating: number;
  organicTraffic: number;
  backlinksToCompetitors: number;
  contactInfo?: {
    email?: string;
    socialProfiles?: string[];
  };
  suggestedOutreach: string;
}
```

### 3. Toxic Link Detection

```typescript
// GET /api/v1/seo/backlinks/{projectId}/toxic
interface ToxicLink {
  sourceUrl: string;
  targetUrl: string;
  toxicityScore: number;
  reasons: string[];
  recommendation: "disavow" | "monitor" | "contact";
}
```

## 📈 ADDITIONAL REQUIRED APIs

### 1. SEO Content Template

```typescript
// POST /api/v1/seo/content-template/generate
interface ContentTemplateRequest {
  targetKeyword: string;
  relatedKeywords: string[];
  contentType: "blog" | "product" | "landing" | "category";
  audience: string;
  language: string;
  country: string;
}

interface ContentTemplate {
  title: string;
  metaDescription: string;
  headings: Array<{
    level: number;
    text: string;
    keywords: string[];
  }>;
  sections: Array<{
    heading: string;
    content: string;
    keywordDensity: number;
    recommendations: string[];
  }>;
  keywordRecommendations: {
    primary: string[];
    secondary: string[];
    longtail: string[];
  };
  competitorAnalysis: Array<{
    url: string;
    title: string;
    wordCount: number;
    headingStructure: string[];
  }>;
}
```

### 2. On-Page SEO Checker

```typescript
// POST /api/v1/seo/on-page/analyze
interface OnPageAnalysisRequest {
  url: string;
  targetKeyword: string;
  content?: string; // If analyzing content before publishing
}

interface OnPageAnalysis {
  overallScore: number;
  titleTag: {
    score: number;
    current: string;
    recommendations: string[];
  };
  metaDescription: {
    score: number;
    current: string;
    recommendations: string[];
  };
  headings: {
    score: number;
    structure: Array<{
      level: number;
      text: string;
      hasKeyword: boolean;
    }>;
    recommendations: string[];
  };
  content: {
    score: number;
    wordCount: number;
    keywordDensity: number;
    readabilityScore: number;
    recommendations: string[];
  };
  images: {
    score: number;
    totalImages: number;
    missingAlt: number;
    recommendations: string[];
  };
  internalLinks: {
    score: number;
    totalLinks: number;
    recommendations: string[];
  };
  pageSpeed: {
    score: number;
    loadTime: number;
    recommendations: string[];
  };
}
```

## 🔄 INTEGRATION APIS

### 1. Google Search Console Integration

```typescript
// POST /api/v1/integrations/gsc/connect
interface GSCConnectionRequest {
  projectId: string;
  siteUrl: string;
  authCode: string;
}

// GET /api/v1/integrations/gsc/{projectId}/data
interface GSCDataRequest {
  startDate: string;
  endDate: string;
  dimensions?: string[];
  metrics?: string[];
}
```

### 2. Google Analytics Integration

```typescript
// POST /api/v1/integrations/ga/connect
interface GAConnectionRequest {
  projectId: string;
  propertyId: string;
  authCode: string;
}

// GET /api/v1/integrations/ga/{projectId}/data
interface GADataRequest {
  startDate: string;
  endDate: string;
  metrics: string[];
  dimensions?: string[];
}
```

## 📊 REPORTING APIS

### 1. Custom Reports

```typescript
// POST /api/v1/seo/reports/custom
interface CustomReportRequest {
  projectId: string;
  name: string;
  widgets: Array<{
    type: string;
    config: any;
    position: { x: number; y: number; w: number; h: number };
  }>;
  schedule?: {
    frequency: "daily" | "weekly" | "monthly";
    email: string[];
  };
}

// GET /api/v1/seo/reports/{reportId}/export
interface ReportExportRequest {
  format: "pdf" | "excel" | "csv";
  dateRange: {
    startDate: string;
    endDate: string;
  };
}
```

## 🚀 PRIORITY IMPLEMENTATION ORDER

### Phase 1 (Critical - Core Functionality)

1. Project Keywords Management (Already partially implemented)
2. Position Tracking APIs
3. Site Audit APIs
4. Basic Domain Overview APIs

### Phase 2 (Important - Competitive Analysis)

1. Organic Research APIs
2. Keyword Gap Analysis APIs
3. Competitor Discovery APIs
4. Backlink Profile APIs

### Phase 3 (Enhanced - Content & Research)

1. Topic Research APIs
2. Keyword Magic Tool APIs
3. Content Template APIs
4. On-Page SEO Checker APIs

### Phase 4 (Advanced - Integrations & Reporting)

1. Google Search Console Integration
2. Google Analytics Integration
3. Custom Reporting APIs
4. Export & Scheduling APIs

## 📝 NOTES

1. All APIs should follow RESTful conventions
2. Implement proper authentication and authorization
3. Add rate limiting for resource-intensive operations
4. Include comprehensive error handling and validation
5. Provide detailed API documentation with examples
6. Implement caching for frequently accessed data
7. Add webhook support for real-time updates
8. Include audit trails for all data modifications

## � TRAFFIC ANALYTICS APIs

### 1. Traffic Overview

```typescript
// GET /api/v1/traffic/overview/{projectId}
interface TrafficOverviewRequest {
  projectId: string;
  period: string; // "2024-01-01_2024-01-31"
}

interface TrafficOverview {
  period: DateRange;
  totalSessions: number;
  totalUsers: number;
  organicSessions: number;
  avgSessionDuration: number;
  bounceRate: number;
  conversions: number;
  trends: TrafficTrend[];
}

interface TrafficTrend {
  date: string;
  sessions: number;
  users: number;
  organicSessions: number;
  conversions: number;
}
```

### 2. Traffic Sources

```typescript
// GET /api/v1/traffic/sources/{projectId}
interface TrafficSourcesRequest {
  projectId: string;
  period: string;
}

interface TrafficSource {
  source: string;
  medium: string;
  sessions: number;
  users: number;
  newUsers: number;
  bounceRate: number;
  avgSessionDuration: number;
  conversions: number;
}
```

### 3. Page Performance

```typescript
// GET /api/v1/traffic/pages/{projectId}
interface PagePerformanceRequest {
  projectId: string;
  limit?: number;
  sortBy?: "pageViews" | "uniquePageViews" | "avgTimeOnPage";
  sortOrder?: "asc" | "desc";
}

interface PagePerformance {
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

interface CoreWebVitals {
  lcp: number; // Largest Contentful Paint
  fid: number; // First Input Delay
  cls: number; // Cumulative Layout Shift
}
```

### 4. Competitor Traffic Analysis

```typescript
// GET /api/v1/traffic/competitors/{projectId}
interface CompetitorTrafficRequest {
  projectId: string;
  limit?: number;
}

interface CompetitorTraffic {
  domain: string;
  estimatedMonthlyVisits: number;
  trafficShare: number;
  topPages: CompetitorPage[];
  trafficSources: TrafficSourceBreakdown;
  audienceOverlap: number;
}

interface CompetitorPage {
  url: string;
  trafficShare: number;
  estimatedVisits: number;
  topKeywords: string[];
}

interface TrafficSourceBreakdown {
  organic: number;
  direct: number;
  referral: number;
  social: number;
  paid: number;
  email: number;
}
```

### 5. Real-time Analytics

```typescript
// GET /api/v1/traffic/realtime/{projectId}
interface RealtimeAnalyticsRequest {
  projectId: string;
}

interface RealtimeAnalytics {
  activeUsers: number;
  pageviewsPerMinute: number;
  topActivePages: Array<{
    url: string;
    activeUsers: number;
  }>;
  topTrafficSources: Array<{
    source: string;
    activeUsers: number;
  }>;
  conversionsToday: number;
}
```

## 🎯 IMPLEMENTATION PRIORITY

### ✅ COMPLETED (Traffic Module)

1. **Traffic Overview API** - Integrated with traffic analytics dashboard
2. **Traffic Sources API** - Real-time traffic source analysis
3. **Page Performance API** - Top pages performance tracking
4. **Competitor Traffic API** - Competitive traffic analysis

### 🔧 IN PROGRESS

1. Real-time analytics integration
2. Advanced traffic segmentation
3. Conversion tracking enhancement

### 📋 TODO

1. Geographic traffic analysis
2. Device and browser analytics
3. Custom event tracking
4. Traffic forecasting algorithms

## 💾 FINAL IMPLEMENTATION NOTES

1. API key authentication for third-party integrations
2. Data encryption for sensitive information
3. User permission validation for project access
4. Rate limiting to prevent abuse
5. Input validation and sanitization
6. CORS configuration for frontend access
