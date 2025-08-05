import { BaseService } from "./base.service";
import {
    OnPageSEOAnalysisRequest,
    OnPageSEOAudit,
    OnPageSEOResults,
    OnPageSEOListResponse,
} from "@/types/on-page-seo.type";

export class OnPageSEOService extends BaseService {
    constructor() {
        const config = require('@/config/server.config.json');
        super(config.HTTP_SERVER_URL);
    }

    // Bắt đầu phân tích một trang web
    async startAnalysis(
        projectId: string,
        request: OnPageSEOAnalysisRequest
    ): Promise<OnPageSEOAudit> {
        return this.post<OnPageSEOAudit>(
            `/api/v1/projects/${projectId}/audits/comprehensive`,
            request
        );
    }

    // Kiểm tra trạng thái phân tích
    async getAuditStatus(auditId: string): Promise<OnPageSEOAudit> {
        return this.get<OnPageSEOAudit>(`/api/v1/audits/${auditId}/status`);
    }

    // Lấy kết quả phân tích
    async getAuditResults(auditId: string): Promise<OnPageSEOResults> {
        return this.get<OnPageSEOResults>(`/api/v1/audits/${auditId}/results`);
    }

    // Lấy danh sách audits của project
    async getProjectAudits(
        projectId: string,
        params?: {
            page?: number;
            limit?: number;
            sortBy?: string;
            sortOrder?: 'asc' | 'desc';
        }
    ): Promise<OnPageSEOListResponse> {
        const queryParams = new URLSearchParams();
        if (params?.page) queryParams.append('page', params.page.toString());
        if (params?.limit) queryParams.append('limit', params.limit.toString());
        if (params?.sortBy) queryParams.append('sortBy', params.sortBy);
        if (params?.sortOrder) queryParams.append('sortOrder', params.sortOrder);

        const url = `/api/v1/projects/${projectId}/audits${queryParams.toString() ? `?${queryParams.toString()}` : ''
            }`;

        return this.get<OnPageSEOListResponse>(url);
    }

    // Xóa audit
    async deleteAudit(auditId: string): Promise<{ success: boolean; message: string }> {
        return this.delete<{ success: boolean; message: string }>(`/api/v1/audits/${auditId}`);
    }

    // Polling để chờ hoàn thành phân tích
    async waitForCompletion(
        auditId: string,
        pollInterval: number = 5000,
        maxAttempts: number = 60
    ): Promise<OnPageSEOResults> {
        let attempts = 0;

        return new Promise((resolve, reject) => {
            const poll = async () => {
                try {
                    attempts++;
                    const status = await this.getAuditStatus(auditId);

                    if (status.status === 'completed') {
                        const results = await this.getAuditResults(auditId);
                        resolve(results);
                    } else if (status.status === 'failed') {
                        reject(new Error('Audit failed'));
                    } else if (attempts >= maxAttempts) {
                        reject(new Error('Audit timeout'));
                    } else {
                        setTimeout(poll, pollInterval);
                    }
                } catch (error) {
                    reject(error);
                }
            };

            poll();
        });
    }
}

export const onPageSEOService = new OnPageSEOService();
