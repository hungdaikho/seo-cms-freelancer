import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { auditService } from "@/services/audit.service";
import {
  AuditState,
  CreateAuditPayload,
  CreateComprehensiveAuditPayload,
  FetchAuditsPayload,
  FetchAuditPayload,
  DeleteAuditPayload,
} from "@/types/audit.type";
import {
  AuditAPIResponse,
  AuditResultsResponse,
  AuditSummaryResponse,
  AuditHistoryResponse,
} from "@/types/api.type";

// =============================================================================
// 🔧 INITIAL STATE
// =============================================================================

const initialState: AuditState = {
  audits: [],
  currentAudit: null,
  auditResults: null,
  auditSummary: null,
  auditHistory: null,
  isLoading: false,
  isCreating: false,
  isFetching: false,
  isDeleting: false,
  pagination: {
    currentPage: 1,
    totalPages: 1,
    total: 0,
    limit: 10,
  },
  error: null,
  pollingAudits: [],
};

// =============================================================================
// 🔧 ASYNC THUNKS
// =============================================================================

/**
 * Tạo audit mới
 */
export const createAudit = createAsyncThunk<
  AuditAPIResponse,
  CreateAuditPayload
>("audit/createAudit", async (payload, { rejectWithValue }) => {
  try {
    const { projectId, auditType, settings } = payload;
    const response = await auditService.createAudit(projectId, {
      audit_type: auditType,
      pages: settings?.pages,
      max_depth: settings?.maxDepth,
      include_mobile: settings?.includeMobile,
      check_accessibility: settings?.checkAccessibility,
      analyze_performance: settings?.analyzePerformance,
      check_seo: settings?.checkSeo,
      check_content: settings?.checkContent,
      check_technical: settings?.checkTechnical,
      validate_html: settings?.validateHtml,
      check_links: settings?.checkLinks,
      check_images: settings?.checkImages,
      check_meta: settings?.checkMeta,
      settings: settings as any,
    });
    return response;
  } catch (error: any) {
    return rejectWithValue(
      error.response?.data?.message || "Failed to create audit"
    );
  }
});

/**
 * Tạo comprehensive audit
 */
export const createComprehensiveAudit = createAsyncThunk<
  AuditAPIResponse,
  CreateComprehensiveAuditPayload
>("audit/createComprehensiveAudit", async (payload, { rejectWithValue }) => {
  try {
    const response = await auditService.createComprehensiveAudit(
      payload.projectId,
      {
        url: payload.url,
        options: payload.options,
      }
    );
    return response;
  } catch (error: any) {
    return rejectWithValue(
      error.response?.data?.message || "Failed to create comprehensive audit"
    );
  }
});

/**
 * Tạo quick audit
 */
export const createQuickAudit = createAsyncThunk<
  AuditAPIResponse,
  { projectId: string; url: string }
>("audit/createQuickAudit", async (payload, { rejectWithValue }) => {
  try {
    const response = await auditService.createQuickAudit(
      payload.projectId,
      payload.url
    );
    return response;
  } catch (error: any) {
    return rejectWithValue(
      error.response?.data?.message || "Failed to create quick audit"
    );
  }
});

/**
 * Lấy danh sách audits
 */
export const fetchAudits = createAsyncThunk<any, FetchAuditsPayload>(
  "audit/fetchAudits",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await auditService.getProjectAudits(payload.projectId, {
        page: payload.page,
        limit: payload.limit,
        sortBy: payload.sortBy,
        sortOrder: payload.sortOrder,
      });
      return response;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch audits"
      );
    }
  }
);

/**
 * Lấy audit theo ID
 */
export const fetchAudit = createAsyncThunk<AuditAPIResponse, FetchAuditPayload>(
  "audit/fetchAudit",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await auditService.getAudit(payload.auditId);
      return response;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch audit"
      );
    }
  }
);

/**
 * Lấy kết quả audit
 */
export const fetchAuditResults = createAsyncThunk<AuditAPIResponse, string>(
  "audit/fetchAuditResults",
  async (auditId, { rejectWithValue }) => {
    try {
      const response = await auditService.getAuditResults(auditId);
      return response;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch audit results"
      );
    }
  }
);

/**
 * Lấy trạng thái audit
 */
export const fetchAuditStatus = createAsyncThunk<any, string>(
  "audit/fetchAuditStatus",
  async (auditId, { rejectWithValue }) => {
    try {
      const response = await auditService.getAuditStatus(auditId);
      return { auditId, status: response };
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch audit status"
      );
    }
  }
);

/**
 * Lấy tóm tắt audits
 */
export const fetchAuditSummary = createAsyncThunk<AuditSummaryResponse, string>(
  "audit/fetchAuditSummary",
  async (projectId, { rejectWithValue }) => {
    try {
      const response = await auditService.getProjectAuditSummary(projectId);
      return response;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch audit summary"
      );
    }
  }
);

/**
 * Lấy lịch sử audits
 */
export const fetchAuditHistory = createAsyncThunk<
  AuditHistoryResponse,
  FetchAuditsPayload
>("audit/fetchAuditHistory", async (payload, { rejectWithValue }) => {
  try {
    const response = await auditService.getProjectAuditHistory(
      payload.projectId,
      {
        page: payload.page,
        limit: payload.limit,
        sortBy: payload.sortBy,
        sortOrder: payload.sortOrder,
      }
    );
    return response;
  } catch (error: any) {
    return rejectWithValue(
      error.response?.data?.message || "Failed to fetch audit history"
    );
  }
});

/**
 * Xóa audit
 */
export const deleteAudit = createAsyncThunk<string, DeleteAuditPayload>(
  "audit/deleteAudit",
  async (payload, { rejectWithValue }) => {
    try {
      await auditService.deleteAudit(payload.auditId);
      return payload.auditId;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to delete audit"
      );
    }
  }
);

/**
 * Lấy audit mới nhất
 */
export const fetchLatestAudit = createAsyncThunk<
  AuditAPIResponse | null,
  string
>("audit/fetchLatestAudit", async (projectId, { rejectWithValue }) => {
  try {
    const response = await auditService.getLatestAudit(projectId);
    return response;
  } catch (error: any) {
    return rejectWithValue(
      error.response?.data?.message || "Failed to fetch latest audit"
    );
  }
});

// =============================================================================
// 🔧 SLICE
// =============================================================================

const auditSlice = createSlice({
  name: "audit",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },

    clearCurrentAudit: (state) => {
      state.currentAudit = null;
      state.auditResults = null;
    },

    updateAuditProgress: (
      state,
      action: PayloadAction<{ auditId: string; progress: number }>
    ) => {
      const { auditId, progress } = action.payload;

      // Update current audit if it matches
      if (state.currentAudit?.id === auditId) {
        state.currentAudit.results.progress = progress;
      }

      // Update in audits list
      const auditIndex = state.audits.findIndex(
        (audit) => audit.id === auditId
      );
      if (auditIndex !== -1) {
        state.audits[auditIndex].results.progress = progress;
      }
    },

    startPolling: (state, action: PayloadAction<string>) => {
      const auditId = action.payload;
      if (!state.pollingAudits.includes(auditId)) {
        state.pollingAudits.push(auditId);
      }
    },

    stopPolling: (state, action: PayloadAction<string>) => {
      const auditId = action.payload;
      state.pollingAudits = state.pollingAudits.filter((id) => id !== auditId);
    },

    clearPolling: (state) => {
      state.pollingAudits = [];
    },

    updatePagination: (
      state,
      action: PayloadAction<Partial<typeof state.pagination>>
    ) => {
      state.pagination = { ...state.pagination, ...action.payload };
    },

    updateAuditData: (
      state,
      action: PayloadAction<{
        auditId: string;
        auditData: Partial<AuditAPIResponse>;
      }>
    ) => {
      const { auditId, auditData } = action.payload;

      // Update current audit if it matches
      if (state.currentAudit?.id === auditId) {
        state.currentAudit = { ...state.currentAudit, ...auditData };
      }

      // Update in audits list
      const auditIndex = state.audits.findIndex(
        (audit) => audit.id === auditId
      );
      if (auditIndex !== -1) {
        state.audits[auditIndex] = {
          ...state.audits[auditIndex],
          ...auditData,
        };
      }

      // Update audit results if it matches
      if (state.auditResults?.id === auditId) {
        state.auditResults = { ...state.auditResults, ...auditData };
      }
    },
  },
  extraReducers: (builder) => {
    builder
      // Create Audit
      .addCase(createAudit.pending, (state) => {
        state.isCreating = true;
        state.error = null;
      })
      .addCase(createAudit.fulfilled, (state, action) => {
        state.isCreating = false;
        state.audits.unshift(action.payload);
        state.currentAudit = action.payload;
        state.error = null;
      })
      .addCase(createAudit.rejected, (state, action) => {
        state.isCreating = false;
        state.error = action.payload as string;
      })

      // Create Comprehensive Audit
      .addCase(createComprehensiveAudit.pending, (state) => {
        state.isCreating = true;
        state.error = null;
      })
      .addCase(createComprehensiveAudit.fulfilled, (state, action) => {
        state.isCreating = false;
        state.audits.unshift(action.payload);
        state.currentAudit = action.payload;
        state.error = null;
      })
      .addCase(createComprehensiveAudit.rejected, (state, action) => {
        state.isCreating = false;
        state.error = action.payload as string;
      })

      // Create Quick Audit
      .addCase(createQuickAudit.pending, (state) => {
        state.isCreating = true;
        state.error = null;
      })
      .addCase(createQuickAudit.fulfilled, (state, action) => {
        state.isCreating = false;
        state.audits.unshift(action.payload);
        state.currentAudit = action.payload;
        state.error = null;
      })
      .addCase(createQuickAudit.rejected, (state, action) => {
        state.isCreating = false;
        state.error = action.payload as string;
      })

      // Fetch Audits
      .addCase(fetchAudits.pending, (state) => {
        state.isFetching = true;
        state.error = null;
      })
      .addCase(fetchAudits.fulfilled, (state, action) => {
        state.isFetching = false;
        state.audits = action.payload.data;
        state.pagination = {
          currentPage: action.payload.page,
          totalPages: action.payload.totalPages,
          total: action.payload.total,
          limit: action.payload.limit,
        };
        state.error = null;
      })
      .addCase(fetchAudits.rejected, (state, action) => {
        state.isFetching = false;
        state.error = action.payload as string;
      })

      // Fetch Audit
      .addCase(fetchAudit.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchAudit.fulfilled, (state, action) => {
        state.isLoading = false;
        state.currentAudit = action.payload;
        state.error = null;
      })
      .addCase(fetchAudit.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })

      // Fetch Audit Results
      .addCase(fetchAuditResults.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchAuditResults.fulfilled, (state, action) => {
        state.isLoading = false;
        state.auditResults = action.payload;

        // Update current audit if it matches
        if (state.currentAudit?.id === action.payload.id) {
          state.currentAudit = {
            ...state.currentAudit,
            status: action.payload.status,
            results: action.payload.results || state.currentAudit.results,
            completedAt: action.payload.completedAt,
          };
        }

        // Update in audits list
        const auditIndex = state.audits.findIndex(
          (audit) => audit.id === action.payload.id
        );
        if (auditIndex !== -1) {
          state.audits[auditIndex] = {
            ...state.audits[auditIndex],
            status: action.payload.status,
            results: action.payload.results || state.audits[auditIndex].results,
            completedAt: action.payload.completedAt,
          };
        }

        state.error = null;
      })
      .addCase(fetchAuditResults.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })

      // Fetch Audit Status
      .addCase(fetchAuditStatus.fulfilled, (state: any, action) => {
        const { auditId, status } = action.payload;

        // Update current audit
        if (state.currentAudit?.id === auditId) {
          state.currentAudit.status = status.status;
          if (status.completedAt) {
            state.currentAudit.completedAt = status.completedAt;
          }
          if (state.currentAudit && state.currentAudit.results) {
            state.currentAudit.results.progress = status.progress;
          }
        }

        // Update in audits list
        const auditIndex = state.audits.findIndex(
          (audit: any) => audit.id === auditId
        );
        if (auditIndex !== -1) {
          state.audits[auditIndex].status = status.status;
          if (status.completedAt) {
            state.audits[auditIndex].completedAt = status.completedAt;
          }
          if (state.audits[auditIndex].results) {
            state.audits[auditIndex].results.progress = status.progress;
          }
        }
      })

      // Fetch Audit Summary
      .addCase(fetchAuditSummary.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchAuditSummary.fulfilled, (state, action) => {
        state.isLoading = false;
        state.auditSummary = action.payload;
        state.error = null;
      })
      .addCase(fetchAuditSummary.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })

      // Fetch Audit History
      .addCase(fetchAuditHistory.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchAuditHistory.fulfilled, (state, action) => {
        state.isLoading = false;
        state.auditHistory = action.payload;
        state.error = null;
      })
      .addCase(fetchAuditHistory.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })

      // Delete Audit
      .addCase(deleteAudit.pending, (state) => {
        state.isDeleting = true;
        state.error = null;
      })
      .addCase(deleteAudit.fulfilled, (state, action) => {
        state.isDeleting = false;
        const auditId = action.payload;
        state.audits = state.audits.filter((audit) => audit.id !== auditId);

        if (state.currentAudit?.id === auditId) {
          state.currentAudit = null;
          state.auditResults = null;
        }

        state.error = null;
      })
      .addCase(deleteAudit.rejected, (state, action) => {
        state.isDeleting = false;
        state.error = action.payload as string;
      })

      // Fetch Latest Audit
      .addCase(fetchLatestAudit.fulfilled, (state, action) => {
        if (action.payload) {
          state.currentAudit = action.payload;
        }
      });
  },
});

export const {
  clearError,
  clearCurrentAudit,
  updateAuditProgress,
  startPolling,
  stopPolling,
  clearPolling,
  updatePagination,
  updateAuditData,
} = auditSlice.actions;

export default auditSlice.reducer;
