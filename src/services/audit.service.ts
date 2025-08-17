import { BaseService } from "./base.service";
import {
  CreateAuditAPIRequest,
  CreateComprehensiveAuditRequest,
  AuditAPIResponse,
  AuditStatusResponse,
  AuditResultsResponse,
  AuditSummaryResponse,
  AuditHistoryResponse,
  AuditListResponse,
  AuditPaginationParams,
} from "@/types/api.type";
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

export class AuditService extends BaseService {
  constructor() {
    super(getBaseUrl() + "/api/v1");
  }

  // =============================================================================
  // 🔧 PROJECT AUDITS ENDPOINTS
  // =============================================================================

  /**
   * Tạo audit mới cho project
   */
  async createAudit(
    projectId: string,
    data: CreateAuditAPIRequest
  ): Promise<AuditAPIResponse> {
    return this.post<AuditAPIResponse>(`/projects/${projectId}/audits`, data);
  }

  /**
   * Tạo comprehensive audit đơn giản hóa
   */
  async createComprehensiveAudit(
    projectId: string,
    data: CreateComprehensiveAuditRequest
  ): Promise<AuditAPIResponse> {
    return this.post<AuditAPIResponse>(
      `/projects/${projectId}/audits/comprehensive`,
      data
    );
  }

  /**
   * Lấy danh sách audits của project
   */
  async getProjectAudits(
    projectId: string,
    params?: AuditPaginationParams
  ): Promise<AuditListResponse> {
    const queryParams = new URLSearchParams();

    if (params?.page) queryParams.append("page", params.page.toString());
    if (params?.limit) queryParams.append("limit", params.limit.toString());
    if (params?.sortBy) queryParams.append("sortBy", params.sortBy);
    if (params?.sortOrder) queryParams.append("sortOrder", params.sortOrder);

    const url = `/projects/${projectId}/audits${
      queryParams.toString() ? "?" + queryParams.toString() : ""
    }`;
    return this.get<AuditListResponse>(url);
  }

  /**
   * Lấy tóm tắt audits của project
   */
  async getProjectAuditSummary(
    projectId: string
  ): Promise<AuditSummaryResponse> {
    return this.get<AuditSummaryResponse>(
      `/projects/${projectId}/audits/summary`
    );
  }

  /**
   * Lấy lịch sử audits của project
   */
  async getProjectAuditHistory(
    projectId: string,
    params?: AuditPaginationParams
  ): Promise<AuditHistoryResponse> {
    const queryParams = new URLSearchParams();

    if (params?.page) queryParams.append("page", params.page.toString());
    if (params?.limit) queryParams.append("limit", params.limit.toString());
    if (params?.sortBy) queryParams.append("sortBy", params.sortBy);
    if (params?.sortOrder) queryParams.append("sortOrder", params.sortOrder);

    const url = `/projects/${projectId}/audits/history${
      queryParams.toString() ? "?" + queryParams.toString() : ""
    }`;
    return this.get<AuditHistoryResponse>(url);
  }

  // =============================================================================
  // 🔧 INDIVIDUAL AUDIT ENDPOINTS
  // =============================================================================

  /**
   * Lấy thông tin audit theo ID
   */
  async getAudit(auditId: string): Promise<AuditAPIResponse> {
    return this.get<AuditAPIResponse>(`/audits/${auditId}`);
  }

  /**
   * Lấy trạng thái và tiến độ audit
   */
  async getAuditStatus(auditId: string): Promise<AuditStatusResponse> {
    return this.get<AuditStatusResponse>(`/audits/${auditId}/status`);
  }

  /**
   * Lấy kết quả audit (chỉ khi hoàn thành)
   */
  async getAuditResults(auditId: string): Promise<AuditResultsResponse> {
    return this.get<AuditResultsResponse>(`/audits/${auditId}/results`);
  }

  /**
   * Xóa audit
   */
  async deleteAudit(auditId: string): Promise<{ message: string }> {
    return this.delete<{ message: string }>(`/audits/${auditId}`);
  }

  // =============================================================================
  // 🔧 UTILITY METHODS
  // =============================================================================

  /**
   * Poll audit status cho đến khi hoàn thành
   */
  async pollAuditUntilComplete(
    auditId: string,
    onProgress?: (progress: number) => void
  ): Promise<AuditResultsResponse> {
    return new Promise((resolve, reject) => {
      const pollInterval = setInterval(async () => {
        try {
          const status = await this.getAuditStatus(auditId);

          if (onProgress) {
            onProgress(status.progress);
          }

          if (status.status === "completed") {
            clearInterval(pollInterval);
            const results = await this.getAuditResults(auditId);
            resolve(results);
          } else if (status.status === "failed") {
            clearInterval(pollInterval);
            reject(new Error("Audit failed"));
          }
        } catch (error) {
          clearInterval(pollInterval);
          reject(error);
        }
      }, 5000); // Poll mỗi 5 giây
    });
  }

  /**
   * Tạo audit đơn giản cho quick start
   */
  async createQuickAudit(
    projectId: string,
    url: string
  ): Promise<AuditAPIResponse> {
    return this.createComprehensiveAudit(projectId, {
      url,
      options: {
        auditType: "full",
        settings: {
          crawlDepth: 2,
          includeImages: true,
          checkMobileFriendly: true,
          analyzePageSpeed: true,
        },
      },
    });
  }

  /**
   * Lấy audit mới nhất của project
   */
  async getLatestAudit(projectId: string): Promise<AuditAPIResponse | null> {
    const audits = await this.getProjectAudits(projectId, {
      page: 1,
      limit: 1,
      sortBy: "createdAt",
      sortOrder: "desc",
    });
    return audits.data.length > 0 ? audits.data[0] : null;
  }
}

export const auditService: AuditService = new AuditService();
