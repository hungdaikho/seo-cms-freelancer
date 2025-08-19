import { BaseService } from "./base.service";
// @ts-ignore
import serverConfig from "@/config/server.config.json";
import {
  CmsPage,
  ContactSubmission,
  ContactSubmissionResponse,
  CmsStatistics,
  PaginatedResponse,
} from "@/types/cms.type";

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

export class CmsService extends BaseService {
  constructor() {
    super(getBaseUrl() + "/api/v1");
  }

  // Public APIs
  async getPublicPages(pageType?: string): Promise<CmsPage[]> {
    const params = pageType ? { pageType } : {};
    return this.get("/cms/pages/public", { params });
  }

  async getPublicPageBySlug(slug: string): Promise<CmsPage> {
    return this.get(`/cms/pages/public/${slug}`);
  }

  async submitContact(
    data: ContactSubmission
  ): Promise<ContactSubmissionResponse> {
    return this.post("/cms/contact", data);
  }

  // Admin APIs (require authentication)
  async getPages(status?: string, pageType?: string): Promise<CmsPage[]> {
    const params: any = {};
    if (status) params.status = status;
    if (pageType) params.pageType = pageType;
    return this.get("/cms/pages", { params });
  }

  async getPageById(id: string): Promise<CmsPage> {
    return this.get(`/cms/pages/${id}`);
  }

  async createPage(data: Partial<CmsPage>): Promise<CmsPage> {
    return this.post("/cms/pages", data);
  }

  async updatePage(id: string, data: Partial<CmsPage>): Promise<CmsPage> {
    return this.patch(`/cms/pages/${id}`, data);
  }

  async deletePage(id: string): Promise<{ message: string }> {
    return this.delete(`/cms/pages/${id}`);
  }

  async getContacts(
    page = 1,
    limit = 20,
    isRead?: boolean
  ): Promise<PaginatedResponse<ContactSubmissionResponse>> {
    const params: any = { page, limit };
    if (isRead !== undefined) params.isRead = isRead;
    return this.get("/cms/contacts", { params });
  }

  async getContactById(id: string): Promise<ContactSubmissionResponse> {
    return this.get(`/cms/contacts/${id}`);
  }

  async markContactAsRead(id: string): Promise<void> {
    return this.patch(`/cms/contacts/${id}/read`, {});
  }

  async markContactAsReplied(id: string, notes?: string): Promise<void> {
    return this.patch(`/cms/contacts/${id}/reply`, { notes });
  }

  async deleteContact(id: string): Promise<void> {
    return this.delete(`/cms/contacts/${id}`);
  }

  async getStatistics(): Promise<CmsStatistics> {
    return this.get("/cms/statistics");
  }
}

export const cmsService: CmsService = new CmsService();
