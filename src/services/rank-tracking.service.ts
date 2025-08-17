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

// Types for rank tracking
export interface ProjectRankingOverview {
  project: {
    id: string;
    name: string;
    domain: string;
    location: string;
    lastUpdated: string;
  };
  summary: {
    totalKeywords: number;
    trackedKeywords: number;
    rankedKeywords: number;
    avgPosition: number;
    previousAvgPosition: number;
  };
  performance: {
    keywordsUp: number;
    keywordsDown: number;
    keywordsUnchanged: number;
    positionChange: number;
    trend: "up" | "down" | "stable";
  };
  rankingDistribution: {
    notRanking: number;
    top100: number;
    top10: number;
    top3: number;
  };
  keywords: KeywordRankingData[];
  chartData: ChartDataPoint[];
}

export interface KeywordRankingData {
  id: string;
  keyword: string;
  position: number;
  change: number;
  searchVolume: number;
  difficulty: number;
  url: string;
  trend: "up" | "down" | "stable" | "no-data";
  currentRanking?: number;
  previousRanking?: number;
  targetUrl?: string;
  isTracking?: boolean;
  createdAt?: string;
}

export interface ChartDataPoint {
  date: string;
  position: number;
}

export interface AddKeywordRequest {
  keyword: string;
  targetUrl: string;
  searchVolume?: number;
  difficulty?: number;
  cpc?: number;
}

export interface BulkAddKeywordsRequest {
  keywords: {
    keyword: string;
    targetUrl: string;
  }[];
}

export interface UpdateKeywordRequest {
  targetUrl?: string;
  isTracking?: boolean;
}

export interface AddRankingRequest {
  position: number;
  url: string;
  metadata?: {
    searchEngine?: string;
    location?: string;
    device?: string;
  };
}

export interface RankingHistoryResponse {
  keyword: {
    id: string;
    keyword: string;
    currentRanking: number;
    project: string;
  };
  rankings: RankingRecord[];
  trend: "up" | "down" | "stable";
  summary: {
    totalRecords: number;
    bestPosition: number;
    worstPosition: number;
    averagePosition: number;
  };
}

export interface RankingRecord {
  id: string;
  keywordId?: string;
  position: number;
  url: string;
  date: string;
  metadata?: any;
}

export interface ProjectStats {
  totalKeywords: number;
  averageRanking: number;
  rankingDistribution: {
    top3: number;
    top10: number;
    top50: number;
    beyond50: number;
    notRanked: number;
  };
  improvedKeywords: number;
  declinedKeywords: number;
  stableKeywords: number;
  topKeywords: {
    id: string;
    keyword: string;
    currentRanking: number;
  }[];
  recentChanges: number;
  lastUpdate: string;
}

export interface SerpAnalysisData {
  serpData: {
    rank: number;
    url: string;
    page: number;
    backlinks: string;
    searchTraffic: string;
    keywords: number;
  }[];
  total: number;
  domain: string;
}

export interface BulkUpdateRankingsRequest {
  rankings: {
    keywordId: string;
    position: number;
    url: string;
  }[];
}

export interface ProjectSettings {
  trackingFrequency: string;
  searchEngine: string;
  location: string;
  device: string;
  language: string;
}

export interface KeywordsListParams {
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
}

export interface KeywordsListResponse {
  data: KeywordRankingData[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export class RankTrackingService extends BaseService {
  constructor() {
    super(getBaseUrl() + "/api/v1");
  }

  // Project Rankings Overview
  async getProjectRankingsOverview(
    projectId: string
  ): Promise<ProjectRankingOverview> {
    return this.get(`/projects/${projectId}/rankings/overview`);
  }

  async getProjectStats(projectId: string): Promise<ProjectStats> {
    return this.get(`/projects/${projectId}/stats`);
  }

  // Keyword Management
  async addKeyword(
    projectId: string,
    data: AddKeywordRequest
  ): Promise<KeywordRankingData> {
    return this.post(`/projects/${projectId}/keywords`, data);
  }

  async bulkAddKeywords(
    projectId: string,
    data: BulkAddKeywordsRequest
  ): Promise<any> {
    return this.post(`/projects/${projectId}/keywords/bulk`, data);
  }

  async getProjectKeywords(
    projectId: string,
    params?: KeywordsListParams
  ): Promise<KeywordsListResponse> {
    const queryParams = new URLSearchParams();
    if (params?.page) queryParams.append("page", params.page.toString());
    if (params?.limit) queryParams.append("limit", params.limit.toString());
    if (params?.sortBy) queryParams.append("sortBy", params.sortBy);
    if (params?.sortOrder) queryParams.append("sortOrder", params.sortOrder);

    const queryString = queryParams.toString();
    const url = `/projects/${projectId}/keywords${
      queryString ? `?${queryString}` : ""
    }`;
    return this.get(url);
  }

  async updateKeyword(
    keywordId: string,
    data: UpdateKeywordRequest
  ): Promise<KeywordRankingData> {
    return this.patch(`/keywords/${keywordId}`, data);
  }

  async deleteKeyword(keywordId: string): Promise<void> {
    return this.delete(`/keywords/${keywordId}`);
  }

  async bulkDeleteKeywords(keywordIds: string[]): Promise<void> {
    return this.post("/keywords/bulk", { keywordIds });
  }

  // Ranking History
  async addRankingRecord(
    keywordId: string,
    data: AddRankingRequest
  ): Promise<RankingRecord> {
    return this.post(`/keywords/${keywordId}/rankings`, data);
  }

  async getKeywordRankingHistory(
    keywordId: string,
    params?: { days?: number; startDate?: string; endDate?: string }
  ): Promise<RankingHistoryResponse> {
    const queryParams = new URLSearchParams();
    if (params?.days) queryParams.append("days", params.days.toString());
    if (params?.startDate) queryParams.append("startDate", params.startDate);
    if (params?.endDate) queryParams.append("endDate", params.endDate);

    const queryString = queryParams.toString();
    const url = `/keywords/${keywordId}/rankings${
      queryString ? `?${queryString}` : ""
    }`;
    return this.get(url);
  }

  async getKeywordRankings(
    keywordId: string,
    days: number = 30
  ): Promise<RankingRecord[]> {
    return this.get(`/keywords/${keywordId}/rankings?days=${days}`);
  }

  // SERP Analysis
  async getSerpAnalysis(projectId: string): Promise<SerpAnalysisData> {
    return this.get(`/projects/${projectId}/serp-analysis`);
  }

  // Bulk Operations
  async bulkUpdateRankings(data: BulkUpdateRankingsRequest): Promise<void> {
    return this.post("/rankings/bulk-update", data);
  }

  // Project Settings
  async updateProjectSettings(
    projectId: string,
    settings: Partial<ProjectSettings>
  ): Promise<ProjectSettings> {
    return this.patch(`/projects/${projectId}/settings`, { settings });
  }

  async getTrackingSettings(
    projectId: string
  ): Promise<ProjectSettings & { timezone: string; lastUpdated: string }> {
    return this.get(`/projects/${projectId}/tracking-settings`);
  }

  // Advanced Features
  async getCompetitorRankings(projectId: string): Promise<any> {
    return this.get(`/projects/${projectId}/competitor-rankings`);
  }

  async getRankingForecast(keywordId: string, days: number = 30): Promise<any> {
    return this.get(`/keywords/${keywordId}/forecast?days=${days}`);
  }
}

export const rankTrackingService: RankTrackingService =
  new RankTrackingService();
