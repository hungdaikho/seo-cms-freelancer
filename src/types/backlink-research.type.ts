// =============================================================================
// 🔗 BACKLINK RESEARCH TYPES
// =============================================================================

export interface DomainBacklinkMetrics {
  domain: string;
  metrics: {
    pageAuthority: string;
    domainAuthority: string;
    outboundDomain: string;
    monthlyVisits: string;
    spamScore: string;
  };
  authorityScore: number;
  backlinks: {
    total: number;
    totalDomains: number;
    newBacklinks: number;
    lostBacklinks: number;
  };
  backlinkTypes: {
    text: number;
    image: number;
    form?: number;
    frame?: number;
  };
  topCountries: CountryMetric[];
  tldDistribution: Record<string, number>;
  lastUpdated: string;
}

export interface CountryMetric {
  country: string;
  percentage: number;
  count: number;
}

export interface AuthorityMetrics {
  domain: string;
  authorityMetrics: {
    domainRating: number;
    ahrefsRating: number;
    mozScore: number;
    semrushScore: number;
  };
  backlinksMetrics: {
    totalBacklinks: number;
    referringDomains: number;
    followLinks: number;
    nofollowLinks: number;
  };
  qualityScore: string;
  lastUpdated: string;
}

export interface ProjectBacklink {
  id: string;
  sourceUrl: string;
  sourceDomain: string;
  targetUrl: string;
  anchorText: string;
  linkType: "dofollow" | "nofollow" | "sponsored" | "ugc";
  authorityScore: number;
  status: "active" | "lost" | "broken" | "redirected";
  discoveredAt: string;
  lastChecked: string;
  additionalInfo?: {
    pageTitle: string;
    contextText: string;
    position: string;
    isSponsored: boolean;
  };
}

export interface BacklinkAnalytics {
  summary: BacklinkSummary;
  trends: BacklinkTrends;
  newAndLost: NewAndLostData;
  anchors: AnchorData[];
  topDomains: TopDomain[];
  topPages: TopPage[];
}

export interface BacklinkSummary {
  totalBacklinks: number;
  totalDomains: number;
  activeLinks: number;
  followLinks: number;
  nofollowLinks: number;
  averageAuthorityScore: number;
  newBacklinksCount: number;
  lostBacklinksCount: number;
}

export interface BacklinkTrends {
  referralDomains: TrendDataPoint[];
  backlinks: TrendDataPoint[];
}

export interface TrendDataPoint {
  date: string;
  count: number;
}

export interface NewAndLostData {
  newReferringDomains: NewAndLostDataPoint[];
  newBacklinks: NewAndLostDataPoint[];
}

export interface NewAndLostDataPoint {
  date: string;
  new: number;
  lost: number;
}

export interface AnchorData {
  anchorText: string;
  backlinks: number;
  domains: number;
}

export interface TopDomain {
  domain: string;
  backlinks: number;
  authorityScore: number;
}

export interface TopPage {
  url: string;
  backlinks: number;
  domains: number;
}

export interface BacklinkGapAnalysis {
  overview: {
    targetDomain: string;
    metrics: DomainMetrics;
    competitors: CompetitorMetrics[];
    gaps: GapMetrics;
  };
  prospects: LinkProspect[];
  authorityTrend: TrendData[];
  referringDomainsTrend: TrendData[];
}

export interface DomainMetrics {
  totalBacklinks: number;
  referringDomains: number;
  authorityScore: number;
  organicTraffic: number;
}

export interface CompetitorMetrics {
  domain: string;
  backlinks: number;
  referringDomains: number;
  authorityScore: number;
  organicTraffic: number;
}

export interface GapMetrics {
  missingOpportunities: number;
  uniqueOpportunities: number;
  sharedSources: number;
}

export interface LinkProspect {
  domain: string;
  authorityScore: number;
  monthlyVisits: number;
  competitorLinks: string[];
  targetPresent: boolean;
  linkType: string;
  category: string;
  contactInfo?: {
    email: string;
    socialMedia: string[];
  };
  lastActivity: string;
  opportunity: "Best" | "High" | "Medium" | "Low";
}

export interface TrendData {
  date: string;
  targetDomain: number;
  competitor1?: number;
  competitor2?: number;
}

export interface BacklinkTimelineData {
  timeline: TimelineDataPoint[];
  summary: {
    totalPeriod: string;
    growth: {
      backlinks: string;
      domains: string;
    };
  };
}

export interface TimelineDataPoint {
  date: string;
  backlinks: number;
  referringDomains: number;
  newBacklinks: number;
  lostBacklinks: number;
}

// Authority Score Distribution
export interface AuthorityScoreDistribution {
  range: string;
  count: number;
  percentage: string;
  color: string;
}

// Link Attribute Types
export interface LinkAttributeData {
  type: "Follow" | "NoFollow" | "Sponsored" | "UGC";
  count: number;
  percentage: string;
  color: string;
}

// Backlink Type Data
export interface BacklinkTypeData {
  type: "Text" | "Image" | "Form" | "Frame";
  count: number;
  percentage: string;
  color: string;
}

// TLD Distribution
export interface TldDistribution {
  name: string;
  value: number;
  color: string;
}

// Request/Response Types
export interface GetDomainOverviewRequest {
  domain: string;
  includeSubdomains?: boolean;
}

export interface GetProjectBacklinksRequest {
  projectId: string;
  page?: number;
  limit?: number;
  status?: "active" | "lost" | "broken";
  linkType?: "dofollow" | "nofollow";
}

export interface GetBacklinkAnalyticsRequest {
  projectId: string;
  days?: number;
  startDate?: string;
  endDate?: string;
}

export interface BacklinkGapCompareRequest {
  targetDomain: string;
  competitors: string[];
  filters?: {
    minAuthorityScore?: number;
    linkType?: "dofollow" | "nofollow" | "all";
    language?: string;
    minReferringDomains?: number;
  };
}

export interface GetLinkProspectsRequest {
  domain: string;
  competitors?: string;
  minAuthorityScore?: number;
  limit?: number;
  linkType?: "dofollow" | "nofollow" | "all";
  language?: string;
}

export interface AddBacklinkRequest {
  projectId: string;
  sourceUrl: string;
  sourceDomain: string;
  targetUrl: string;
  anchorText: string;
  linkType: "dofollow" | "nofollow" | "sponsored" | "ugc";
  authorityScore: number;
  status: "active" | "lost" | "broken" | "redirected";
}

export interface UpdateBacklinkRequest {
  projectId: string;
  backlinkId: string;
  anchorText?: string;
  linkType?: "dofollow" | "nofollow" | "sponsored" | "ugc";
  status?: "active" | "lost" | "broken" | "redirected";
  notes?: string;
}

// Pagination
export interface BacklinkPagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  hasNext: boolean;
  hasPrev: boolean;
}

export interface PaginatedBacklinkResponse<T> {
  data: T[];
  pagination: BacklinkPagination;
}

// Chart Data Types for UI Components
export interface ChartDataPoint {
  date: string;
  value: number;
  month?: string;
}

export interface BarChartData {
  name: string;
  new: number;
  lost: number;
}

export interface PieChartData {
  name: string;
  value: number;
  color: string;
}
