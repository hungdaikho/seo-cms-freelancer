import { BaseService } from "./base.service";
// @ts-ignore
import serverConfig from "@/config/server.config.json";

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

// Types for Competitive Research
export interface DomainOverview {
  domain: string;
  authorityScore: number;
  organicKeywords: number;
  organicTraffic: number;
  organicCost: number;
  paidKeywords: number;
  paidTraffic: number;
  backlinks: number;
  referringDomains: number;
  topCountries: CountryTraffic[];
  trafficTrend: TrafficTrend[];
  topPages: TopPage[];
  seoScore: number;
  avgVisitDuration: number;
  authority: AuthorityMetrics;
}

export interface CountryTraffic {
  country: string;
  traffic: number;
  percentage: number;
}

export interface TrafficTrend {
  date: string;
  visits: number;
  uniqueVisitors: number;
  newVisitors: number;
}

export interface TopPage {
  page: string;
  trafficShare: number;
  uniquePageviews: number;
  uniqueVisitors: number;
}

export interface AuthorityMetrics {
  domainRating: number;
  ahrefsRating: number;
  mozScore: number;
}

export interface TopKeyword {
  keyword: string;
  position: number;
  searchVolume: number;
  traffic: number;
  cpc: number;
  difficulty: number;
  trend: string;
  url: string;
  intent: string;
  serp: number;
}

export interface KeywordGapAnalysis {
  overview: {
    targetDomain: string;
    competitors: string[];
    comparison: GapComparison;
  };
  keywordDetails: KeywordComparisonDetail[];
  opportunities: OpportunityCategory[];
  totalKeywords: number;
  exportUrl: string;
}

export interface GapComparison {
  shared: number;
  missing: number;
  weak: number;
  strong: number;
  untapped: number;
  unique: number;
}

export interface KeywordComparisonDetail {
  keyword: string;
  intent: string;
  targetDomain: CompetitorKeywordData;
  competitor1?: CompetitorKeywordData;
  competitor2?: CompetitorKeywordData;
  kd: number;
  status: string;
}

export interface CompetitorKeywordData {
  position: number;
  traffic: number;
  volume: number;
  cpc: number;
  result: string;
}

export interface OpportunityCategory {
  category: string;
  keywords: number;
  estimatedTraffic: number;
}

export interface BacklinkGapAnalysis {
  overview: BacklinkOverview;
  prospects: LinkProspect[];
  authorityTrend: TrendData[];
  referringDomainsTrend: TrendData[];
}

export interface BacklinkOverview {
  targetDomain: string;
  metrics: DomainMetrics;
  competitors: CompetitorMetrics[];
  gaps: BacklinkGaps;
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

export interface BacklinkGaps {
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
  opportunity: string;
}

export interface TrendData {
  date: string;
  targetDomain: number;
  competitor1?: number;
  competitor2?: number;
}

export interface CompetitiveAnalysis {
  project: {
    domain: string;
    competitors: CompetitorInfo[];
  };
  rankings: RankingComparison;
  keywordGaps: {
    missing: number;
    weak: number;
    opportunities: number;
  };
  backlinkGaps: {
    missingDomains: number;
    prospects: number;
    highPriority: number;
  };
}

export interface CompetitorInfo {
  domain: string;
  name: string;
  isActive: boolean;
}

export interface RankingComparison {
  myProject: ProjectRanking;
  competitors: CompetitorRanking[];
}

export interface ProjectRanking {
  averagePosition: number;
  totalKeywords: number;
  visibility: number;
  trend: string;
}

export interface CompetitorRanking {
  domain: string;
  averagePosition: number;
  totalKeywords: number;
  visibility: number;
  trend: string;
}

export class CompetitiveService extends BaseService {
  constructor() {
    super(getBaseUrl() + "/api/v1");
  }

  // Domain Overview APIs
  async getDomainOverview(
    domain: string,
    includeSubdomains?: boolean
  ): Promise<DomainOverview> {
    const params = new URLSearchParams();
    if (includeSubdomains) params.append("includeSubdomains", "true");

    return this.get(
      `/seo/domain-overview/${domain}${
        params.toString() ? "?" + params.toString() : ""
      }`
    );
  }

  async getDomainTopKeywords(
    domain: string,
    limit: number = 100,
    country: string = "US"
  ): Promise<{
    data: TopKeyword[];
    total: number;
    domain: string;
    country: string;
  }> {
    const params = new URLSearchParams({
      limit: limit.toString(),
      country,
    });

    return this.get(
      `/seo/domain-overview/top-keywords/${domain}?${params.toString()}`
    );
  }

  async getDomainCompetitors(
    domain: string,
    limit: number = 50,
    country: string = "US"
  ): Promise<{
    data: CompetitorMetrics[];
    total: number;
    domain: string;
    country: string;
  }> {
    const params = new URLSearchParams({
      limit: limit.toString(),
      country,
    });

    return this.get(
      `/seo/domain-overview/competitors/${domain}?${params.toString()}`
    );
  }

  async getDomainAuthority(domain: string): Promise<
    AuthorityMetrics & {
      domain: string;
      backlinks: number;
      referringDomains: number;
      lastUpdated: string;
    }
  > {
    return this.get(`/seo/domain-overview/authority/${domain}`);
  }

  // Keyword Gap Analysis APIs
  async compareKeywordGaps(data: {
    targetDomain: string;
    competitors: string[];
    country?: string;
    database?: string;
    device?: string;
    filters?: {
      minSearchVolume?: number;
      maxDifficulty?: number;
      keywordType?: string;
    };
  }): Promise<KeywordGapAnalysis> {
    return this.post("/seo/keyword-gap/compare", data);
  }

  async getKeywordOverlap(
    domains: string[],
    country: string = "US"
  ): Promise<{
    overview: {
      domains: string[];
      totalUnique: number;
      overlap: Record<string, number>;
    };
    vennDiagram: Record<
      string,
      { total: number; unique: number; shared: number }
    >;
    topOpportunities: Array<{
      keyword: string;
      volume: number;
      missing: string;
      competitors: Record<string, number | null>;
    }>;
  }> {
    const params = new URLSearchParams({
      domains: domains.join(","),
      country,
    });

    return this.get(`/seo/keyword-gap/overlap?${params.toString()}`);
  }

  // Backlink Gap Analysis APIs
  async compareBacklinkProfiles(data: {
    targetDomain: string;
    competitors: string[];
    filters?: {
      minAuthorityScore?: number;
      linkType?: string;
      language?: string;
    };
  }): Promise<BacklinkGapAnalysis> {
    return this.post("/seo/backlink-gap/compare", data);
  }

  async getLinkBuildingProspects(
    domain: string,
    options?: {
      limit?: number;
      minAuthorityScore?: number;
      linkType?: string;
      language?: string;
    }
  ): Promise<{
    prospects: LinkProspect[];
    summary: {
      totalProspects: number;
      highPriority: number;
      mediumPriority: number;
      lowPriority: number;
    };
  }> {
    const params = new URLSearchParams();

    if (options?.limit) {
      params.append("limit", options.limit.toString());
    }

    if (options?.minAuthorityScore) {
      params.append(
        "filters.minAuthorityScore",
        options.minAuthorityScore.toString()
      );
    }

    if (options?.linkType) {
      params.append("filters.linkType", options.linkType);
    }

    if (options?.language) {
      params.append("filters.language", options.language);
    }

    return this.get(
      `/seo/backlink-gap/prospects/${domain}${
        params.toString() ? "?" + params.toString() : ""
      }`
    );
  }

  // Competitive Analysis APIs
  async getCompetitiveOverview(
    projectId: string,
    timeframe: string = "30d"
  ): Promise<CompetitiveAnalysis> {
    const params = new URLSearchParams({ timeframe });

    return this.get(
      `/seo/competitive-analysis/${projectId}?${params.toString()}`
    );
  }

  async getMarketShareAnalysis(
    domains: string[],
    keywords?: string[],
    country: string = "US"
  ): Promise<{
    marketShare: Array<{
      domain: string;
      visibility: number;
      marketShare: number;
      organicTraffic: number;
      topKeywords: number;
    }>;
    topKeywords: Array<{
      keyword: string;
      totalVolume: number;
      marketLeader: string;
      positions: Record<string, number>;
    }>;
    insights: Array<{
      type: string;
      message: string;
      impact: string;
    }>;
  }> {
    const params = new URLSearchParams({
      domains: domains.join(","),
      country,
    });

    if (keywords && keywords.length > 0) {
      params.append("keywords", keywords.join(","));
    }

    return this.get(
      `/seo/competitive-analysis/market-share?${params.toString()}`
    );
  }
}

export const competitiveService: CompetitiveService = new CompetitiveService();
