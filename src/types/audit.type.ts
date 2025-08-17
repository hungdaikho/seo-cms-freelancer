import {
  AuditAPIResponse,
  AuditResultsResponse,
  AuditSummaryResponse,
  AuditHistoryResponse,
} from "./api.type";

export interface AuditState {
  // Current audits
  audits: AuditAPIResponse[];
  currentAudit: AuditAPIResponse | null;
  auditResults: AuditAPIResponse | null;

  // Summary and history
  auditSummary: AuditSummaryResponse | null;
  auditHistory: AuditHistoryResponse | null;

  // Loading states
  isLoading: boolean;
  isCreating: boolean;
  isFetching: boolean;
  isDeleting: boolean;

  // Pagination
  pagination: {
    currentPage: number;
    totalPages: number;
    total: number;
    limit: number;
  };

  // Error handling
  error: string | null;

  // Real-time status tracking
  pollingAudits: string[]; // Array of audit IDs being polled
}

export interface CreateAuditPayload {
  projectId: string;
  auditType: "full" | "technical" | "content" | "performance" | "accessibility";
  settings?: {
    pages?: string[];
    maxDepth?: number;
    includeMobile?: boolean;
    checkAccessibility?: boolean;
    analyzePerformance?: boolean;
    checkSeo?: boolean;
    checkContent?: boolean;
    checkTechnical?: boolean;
    validateHtml?: boolean;
    checkLinks?: boolean;
    checkImages?: boolean;
    checkMeta?: boolean;
  };
}

export interface CreateComprehensiveAuditPayload {
  projectId: string;
  url: string;
  options: {
    auditType: "full" | "technical" | "content" | "performance";
    settings?: {
      crawlDepth?: number;
      includeImages?: boolean;
      checkMobileFriendly?: boolean;
      analyzePageSpeed?: boolean;
    };
  };
}

export interface FetchAuditsPayload {
  projectId: string;
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
}

export interface FetchAuditPayload {
  auditId: string;
}

export interface DeleteAuditPayload {
  auditId: string;
}

export interface PollAuditStatusPayload {
  auditId: string;
  interval?: number; // milliseconds, default 5000
}
