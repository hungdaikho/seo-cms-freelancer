import { BaseService } from "./base.service";
// @ts-ignore
import serverConfig from "@/config/server.config.json";
import {
  DomainBacklinkMetrics,
  AuthorityMetrics,
  ProjectBacklink,
  BacklinkAnalytics,
  BacklinkGapAnalysis,
  BacklinkTimelineData,
  GetDomainOverviewRequest,
  GetProjectBacklinksRequest,
  GetBacklinkAnalyticsRequest,
  BacklinkGapCompareRequest,
  GetLinkProspectsRequest,
  AddBacklinkRequest,
  UpdateBacklinkRequest,
  PaginatedBacklinkResponse,
  LinkProspect,
} from "@/types/backlink-research.type";

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

export class BacklinkResearchService extends BaseService {
  constructor() {
    super(getBaseUrl() + "/api/v1");
  }

  // =============================================================================
  // 📊 1. DOMAIN BACKLINK OVERVIEW APIs
  // =============================================================================

  /**
   * Get Domain Overview with Backlink Metrics
   */
  async getDomainOverview(
    params: GetDomainOverviewRequest
  ): Promise<DomainBacklinkMetrics> {
    const { domain, includeSubdomains = false } = params;
    return this.get(
      `/seo/domain-overview/${domain}?includeSubdomains=${includeSubdomains}`
    );
  }

  /**
   * Get Domain Authority Metrics
   */
  async getDomainAuthority(domain: string): Promise<AuthorityMetrics> {
    return this.get(`/seo/domain-overview/authority/${domain}`);
  }

  // =============================================================================
  // 🔗 2. PROJECT BACKLINK MANAGEMENT APIs
  // =============================================================================

  /**
   * Add Backlink to Project
   */
  async addBacklinkToProject(
    params: AddBacklinkRequest
  ): Promise<ProjectBacklink> {
    const { projectId, ...backlinkData } = params;
    return this.post(`/projects/${projectId}/backlinks`, backlinkData);
  }

  /**
   * Get Project Backlinks
   */
  async getProjectBacklinks(
    params: GetProjectBacklinksRequest
  ): Promise<PaginatedBacklinkResponse<ProjectBacklink>> {
    const { projectId, page, limit, status, linkType } = params;
    const queryParams = new URLSearchParams();
    if (page) queryParams.append("page", page.toString());
    if (limit) queryParams.append("limit", limit.toString());
    if (status) queryParams.append("status", status);
    if (linkType) queryParams.append("linkType", linkType);

    const queryString = queryParams.toString();
    const url = `/projects/${projectId}/backlinks${
      queryString ? "?" + queryString : ""
    }`;
    return this.get(url);
  }

  /**
   * Get Backlink Analytics
   */
  async getBacklinkAnalytics(
    params: GetBacklinkAnalyticsRequest
  ): Promise<BacklinkAnalytics> {
    const { projectId, days, startDate, endDate } = params;
    const queryParams = new URLSearchParams();
    if (days) queryParams.append("days", days.toString());
    if (startDate) queryParams.append("startDate", startDate);
    if (endDate) queryParams.append("endDate", endDate);

    const queryString = queryParams.toString();
    const url = `/projects/${projectId}/backlinks/analytics${
      queryString ? "?" + queryString : ""
    }`;
    return this.get(url);
  }

  /**
   * Get Backlink Details
   */
  async getBacklinkDetails(
    projectId: string,
    backlinkId: string
  ): Promise<ProjectBacklink> {
    return this.get(`/projects/${projectId}/backlinks/${backlinkId}`);
  }

  /**
   * Update Backlink
   */
  async updateBacklink(
    params: UpdateBacklinkRequest
  ): Promise<ProjectBacklink> {
    const { projectId, backlinkId, ...updateData } = params;
    return this.put(
      `/projects/${projectId}/backlinks/${backlinkId}`,
      updateData
    );
  }

  /**
   * Delete Backlink
   */
  async deleteBacklink(
    projectId: string,
    backlinkId: string
  ): Promise<{ message: string; deletedId: string }> {
    return this.delete(`/projects/${projectId}/backlinks/${backlinkId}`);
  }

  // =============================================================================
  // 🎯 3. BACKLINK GAP ANALYSIS APIs
  // =============================================================================

  /**
   * Compare Backlink Profiles
   */
  async compareBacklinkProfiles(
    params: BacklinkGapCompareRequest
  ): Promise<BacklinkGapAnalysis> {
    return this.post("/seo/backlink-gap/compare", params);
  }

  /**
   * Get Link Building Prospects
   */
  async getLinkBuildingProspects(
    params: GetLinkProspectsRequest
  ): Promise<PaginatedBacklinkResponse<LinkProspect>> {
    const {
      domain,
      competitors,
      minAuthorityScore,
      limit,
      linkType,
      language,
    } = params;
    const queryParams = new URLSearchParams();
    if (competitors) queryParams.append("competitors", competitors);
    if (minAuthorityScore)
      queryParams.append("minAuthorityScore", minAuthorityScore.toString());
    if (limit) queryParams.append("limit", limit.toString());
    if (linkType) queryParams.append("linkType", linkType);
    if (language) queryParams.append("language", language);

    const queryString = queryParams.toString();
    const url = `/seo/backlink-gap/prospects/${domain}${
      queryString ? "?" + queryString : ""
    }`;
    return this.get(url);
  }

  // =============================================================================
  // 📈 4. BACKLINK ANALYTICS CHARTS DATA
  // =============================================================================

  /**
   * Get Backlink Timeline Data
   */
  async getBacklinkTimeline(
    projectId: string,
    params?: {
      period?: "1y" | "6m" | "3m" | "1m";
      metric?: "backlinks" | "domains" | "authority";
    }
  ): Promise<BacklinkTimelineData> {
    const queryParams = new URLSearchParams();
    if (params?.period) queryParams.append("period", params.period);
    if (params?.metric) queryParams.append("metric", params.metric);

    const queryString = queryParams.toString();
    const url = `/projects/${projectId}/backlinks/timeline${
      queryString ? "?" + queryString : ""
    }`;
    return this.get(url);
  }

  // =============================================================================
  // 🛠️ UTILITY METHODS
  // =============================================================================

  /**
   * Validate domain format
   */
  private validateDomain(domain: string): boolean {
    const domainRegex =
      /^(?:[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?$/i;
    return domainRegex.test(domain);
  }

  /**
   * Clean domain (remove protocol)
   */
  private cleanDomain(domain: string): string {
    return domain.replace(/^https?:\/\//, "").replace(/\/$/, "");
  }

  /**
   * Batch delete backlinks
   */
  async batchDeleteBacklinks(
    projectId: string,
    backlinkIds: string[]
  ): Promise<{ deletedCount: number }> {
    return this.post(`/projects/${projectId}/backlinks/batch-delete`, {
      backlinkIds,
    });
  }

  /**
   * Export backlinks
   */
  async exportBacklinks(
    projectId: string,
    format: "csv" | "xlsx" = "csv",
    filters?: Partial<GetProjectBacklinksRequest>
  ): Promise<Blob> {
    const queryParams = new URLSearchParams();
    queryParams.append("format", format);
    if (filters?.page) queryParams.append("page", filters.page.toString());
    if (filters?.limit) queryParams.append("limit", filters.limit.toString());
    if (filters?.status) queryParams.append("status", filters.status);
    if (filters?.linkType) queryParams.append("linkType", filters.linkType);

    const queryString = queryParams.toString();
    const url = `/projects/${projectId}/backlinks/export${
      queryString ? "?" + queryString : ""
    }`;

    const config = {
      responseType: "blob" as const,
    };

    const response = await this.axiosInstance.get(url, config);
    return response.data;
  }

  /**
   * Import backlinks
   */
  async importBacklinks(
    projectId: string,
    file: File
  ): Promise<{ imported: number; errors: string[] }> {
    const formData = new FormData();
    formData.append("file", file);
    return this.post(`/projects/${projectId}/backlinks/import`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  }
}

export const backlinkResearchService: BacklinkResearchService =
  new BacklinkResearchService();
