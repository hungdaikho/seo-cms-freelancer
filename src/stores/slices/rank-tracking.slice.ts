import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import {
  rankTrackingService,
  ProjectRankingOverview,
  KeywordRankingData,
  ProjectStats,
  SerpAnalysisData,
  RankingHistoryResponse,
  AddKeywordRequest,
  BulkAddKeywordsRequest,
  UpdateKeywordRequest,
  AddRankingRequest,
  BulkUpdateRankingsRequest,
  ProjectSettings,
  KeywordsListParams,
  KeywordsListResponse,
} from "@/services/rank-tracking.service";

// State interfaces
interface RankTrackingState {
  // Project Overview
  projectOverview: ProjectRankingOverview | null;
  projectStats: ProjectStats | null;

  // Keywords Management
  keywords: KeywordRankingData[];
  keywordsTotal: number;
  keywordsPage: number;
  keywordsLimit: number;
  keywordsTotalPages: number;

  // Rankings History
  rankingHistory: { [keywordId: string]: RankingHistoryResponse };

  // SERP Analysis
  serpAnalysis: SerpAnalysisData | null;

  // Settings
  trackingSettings:
    | (ProjectSettings & { timezone: string; lastUpdated: string })
    | null;

  // UI State
  loading: {
    overview: boolean;
    stats: boolean;
    keywords: boolean;
    addKeyword: boolean;
    updateKeyword: boolean;
    deleteKeyword: boolean;
    rankingHistory: boolean;
    serpAnalysis: boolean;
    bulkOperations: boolean;
    settings: boolean;
  };

  error: {
    overview: string | null;
    stats: string | null;
    keywords: string | null;
    addKeyword: string | null;
    updateKeyword: string | null;
    deleteKeyword: string | null;
    rankingHistory: string | null;
    serpAnalysis: string | null;
    bulkOperations: string | null;
    settings: string | null;
  };

  // Selected items for bulk operations
  selectedKeywordIds: string[];

  // Filters and sorting
  keywordsFilters: KeywordsListParams;
}

const initialState: RankTrackingState = {
  projectOverview: null,
  projectStats: null,
  keywords: [],
  keywordsTotal: 0,
  keywordsPage: 1,
  keywordsLimit: 20,
  keywordsTotalPages: 0,
  rankingHistory: {},
  serpAnalysis: null,
  trackingSettings: null,
  loading: {
    overview: false,
    stats: false,
    keywords: false,
    addKeyword: false,
    updateKeyword: false,
    deleteKeyword: false,
    rankingHistory: false,
    serpAnalysis: false,
    bulkOperations: false,
    settings: false,
  },
  error: {
    overview: null,
    stats: null,
    keywords: null,
    addKeyword: null,
    updateKeyword: null,
    deleteKeyword: null,
    rankingHistory: null,
    serpAnalysis: null,
    bulkOperations: null,
    settings: null,
  },
  selectedKeywordIds: [],
  keywordsFilters: {
    page: 1,
    limit: 20,
    sortBy: "currentRanking",
    sortOrder: "asc",
  },
};

// Async thunks for project overview
export const fetchProjectRankingsOverview = createAsyncThunk(
  "rankTracking/fetchProjectRankingsOverview",
  async (projectId: string, { rejectWithValue }) => {
    try {
      const response = await rankTrackingService.getProjectRankingsOverview(
        projectId
      );
      return response;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message ||
          "Failed to fetch project rankings overview"
      );
    }
  }
);

export const fetchProjectStats = createAsyncThunk(
  "rankTracking/fetchProjectStats",
  async (projectId: string, { rejectWithValue }) => {
    try {
      const response = await rankTrackingService.getProjectStats(projectId);
      return response;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch project stats"
      );
    }
  }
);

// Async thunks for keywords management
export const fetchProjectKeywords = createAsyncThunk(
  "rankTracking/fetchProjectKeywords",
  async (
    { projectId, params }: { projectId: string; params?: KeywordsListParams },
    { rejectWithValue }
  ) => {
    try {
      const response = await rankTrackingService.getProjectKeywords(
        projectId,
        params
      );
      return response;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch keywords"
      );
    }
  }
);

export const addKeyword = createAsyncThunk(
  "rankTracking/addKeyword",
  async (
    { projectId, data }: { projectId: string; data: AddKeywordRequest },
    { rejectWithValue }
  ) => {
    try {
      const response = await rankTrackingService.addKeyword(projectId, data);
      return response;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to add keyword"
      );
    }
  }
);

export const bulkAddKeywords = createAsyncThunk(
  "rankTracking/bulkAddKeywords",
  async (
    { projectId, data }: { projectId: string; data: BulkAddKeywordsRequest },
    { rejectWithValue }
  ) => {
    try {
      const response = await rankTrackingService.bulkAddKeywords(
        projectId,
        data
      );
      return response;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to bulk add keywords"
      );
    }
  }
);

export const updateKeyword = createAsyncThunk(
  "rankTracking/updateKeyword",
  async (
    { keywordId, data }: { keywordId: string; data: UpdateKeywordRequest },
    { rejectWithValue }
  ) => {
    try {
      const response = await rankTrackingService.updateKeyword(keywordId, data);
      return response;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to update keyword"
      );
    }
  }
);

export const deleteKeyword = createAsyncThunk(
  "rankTracking/deleteKeyword",
  async (keywordId: string, { rejectWithValue }) => {
    try {
      await rankTrackingService.deleteKeyword(keywordId);
      return keywordId;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to delete keyword"
      );
    }
  }
);

export const bulkDeleteKeywords = createAsyncThunk(
  "rankTracking/bulkDeleteKeywords",
  async (keywordIds: string[], { rejectWithValue }) => {
    try {
      await rankTrackingService.bulkDeleteKeywords(keywordIds);
      return keywordIds;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to bulk delete keywords"
      );
    }
  }
);

// Async thunks for ranking history
export const fetchKeywordRankingHistory = createAsyncThunk(
  "rankTracking/fetchKeywordRankingHistory",
  async (
    {
      keywordId,
      params,
    }: {
      keywordId: string;
      params?: { days?: number; startDate?: string; endDate?: string };
    },
    { rejectWithValue }
  ) => {
    try {
      const response = await rankTrackingService.getKeywordRankingHistory(
        keywordId,
        params
      );
      return { keywordId, data: response };
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch ranking history"
      );
    }
  }
);

export const addRankingRecord = createAsyncThunk(
  "rankTracking/addRankingRecord",
  async (
    { keywordId, data }: { keywordId: string; data: AddRankingRequest },
    { rejectWithValue }
  ) => {
    try {
      const response = await rankTrackingService.addRankingRecord(
        keywordId,
        data
      );
      return { keywordId, ranking: response };
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to add ranking record"
      );
    }
  }
);

// Async thunks for SERP analysis
export const fetchSerpAnalysis = createAsyncThunk(
  "rankTracking/fetchSerpAnalysis",
  async (projectId: string, { rejectWithValue }) => {
    try {
      const response = await rankTrackingService.getSerpAnalysis(projectId);
      return response;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch SERP analysis"
      );
    }
  }
);

// Async thunks for bulk operations
export const bulkUpdateRankings = createAsyncThunk(
  "rankTracking/bulkUpdateRankings",
  async (data: BulkUpdateRankingsRequest, { rejectWithValue }) => {
    try {
      await rankTrackingService.bulkUpdateRankings(data);
      return data.rankings;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to bulk update rankings"
      );
    }
  }
);

// Async thunks for settings
export const fetchTrackingSettings = createAsyncThunk(
  "rankTracking/fetchTrackingSettings",
  async (projectId: string, { rejectWithValue }) => {
    try {
      const response = await rankTrackingService.getTrackingSettings(projectId);
      return response;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch tracking settings"
      );
    }
  }
);

export const updateProjectSettings = createAsyncThunk(
  "rankTracking/updateProjectSettings",
  async (
    {
      projectId,
      settings,
    }: { projectId: string; settings: Partial<ProjectSettings> },
    { rejectWithValue }
  ) => {
    try {
      const response = await rankTrackingService.updateProjectSettings(
        projectId,
        settings
      );
      return response;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to update project settings"
      );
    }
  }
);

// Create slice
const rankTrackingSlice = createSlice({
  name: "rankTracking",
  initialState,
  reducers: {
    // Clear all data
    clearAllData: (state) => {
      return { ...initialState, keywordsFilters: state.keywordsFilters };
    },

    // Clear specific errors
    clearError: (
      state,
      action: PayloadAction<keyof RankTrackingState["error"]>
    ) => {
      state.error[action.payload] = null;
    },

    // Clear all errors
    clearAllErrors: (state) => {
      Object.keys(state.error).forEach((key) => {
        state.error[key as keyof typeof state.error] = null;
      });
    },

    // Select/deselect keywords for bulk operations
    selectKeyword: (state, action: PayloadAction<string>) => {
      if (!state.selectedKeywordIds.includes(action.payload)) {
        state.selectedKeywordIds.push(action.payload);
      }
    },

    deselectKeyword: (state, action: PayloadAction<string>) => {
      state.selectedKeywordIds = state.selectedKeywordIds.filter(
        (id) => id !== action.payload
      );
    },

    selectAllKeywords: (state) => {
      state.selectedKeywordIds = state.keywords.map((keyword) => keyword.id);
    },

    deselectAllKeywords: (state) => {
      state.selectedKeywordIds = [];
    },

    // Update keywords filters
    updateKeywordsFilters: (
      state,
      action: PayloadAction<Partial<KeywordsListParams>>
    ) => {
      state.keywordsFilters = { ...state.keywordsFilters, ...action.payload };
    },

    // Reset keywords filters
    resetKeywordsFilters: (state) => {
      state.keywordsFilters = {
        page: 1,
        limit: 20,
        sortBy: "currentRanking",
        sortOrder: "asc",
      };
    },
  },
  extraReducers: (builder) => {
    // Project overview
    builder
      .addCase(fetchProjectRankingsOverview.pending, (state) => {
        state.loading.overview = true;
        state.error.overview = null;
      })
      .addCase(fetchProjectRankingsOverview.fulfilled, (state, action) => {
        state.loading.overview = false;
        state.projectOverview = action.payload;
      })
      .addCase(fetchProjectRankingsOverview.rejected, (state, action) => {
        state.loading.overview = false;
        state.error.overview = action.payload as string;
      });

    // Project stats
    builder
      .addCase(fetchProjectStats.pending, (state) => {
        state.loading.stats = true;
        state.error.stats = null;
      })
      .addCase(fetchProjectStats.fulfilled, (state, action) => {
        state.loading.stats = false;
        state.projectStats = action.payload;
      })
      .addCase(fetchProjectStats.rejected, (state, action) => {
        state.loading.stats = false;
        state.error.stats = action.payload as string;
      });

    // Keywords management
    builder
      .addCase(fetchProjectKeywords.pending, (state) => {
        state.loading.keywords = true;
        state.error.keywords = null;
      })
      .addCase(fetchProjectKeywords.fulfilled, (state, action) => {
        state.loading.keywords = false;
        state.keywords = action.payload.data;
        state.keywordsTotal = action.payload.total;
        state.keywordsPage = action.payload.page;
        state.keywordsLimit = action.payload.limit;
        state.keywordsTotalPages = action.payload.totalPages;
      })
      .addCase(fetchProjectKeywords.rejected, (state, action) => {
        state.loading.keywords = false;
        state.error.keywords = action.payload as string;
      });

    // Add keyword
    builder
      .addCase(addKeyword.pending, (state) => {
        state.loading.addKeyword = true;
        state.error.addKeyword = null;
      })
      .addCase(addKeyword.fulfilled, (state, action) => {
        state.loading.addKeyword = false;
        state.keywords.push(action.payload);
        state.keywordsTotal += 1;
      })
      .addCase(addKeyword.rejected, (state, action) => {
        state.loading.addKeyword = false;
        state.error.addKeyword = action.payload as string;
      });

    // Bulk add keywords
    builder
      .addCase(bulkAddKeywords.pending, (state) => {
        state.loading.bulkOperations = true;
        state.error.bulkOperations = null;
      })
      .addCase(bulkAddKeywords.fulfilled, (state) => {
        state.loading.bulkOperations = false;
        // Will need to refetch keywords list
      })
      .addCase(bulkAddKeywords.rejected, (state, action) => {
        state.loading.bulkOperations = false;
        state.error.bulkOperations = action.payload as string;
      });

    // Update keyword
    builder
      .addCase(updateKeyword.pending, (state) => {
        state.loading.updateKeyword = true;
        state.error.updateKeyword = null;
      })
      .addCase(updateKeyword.fulfilled, (state, action) => {
        state.loading.updateKeyword = false;
        const index = state.keywords.findIndex(
          (k) => k.id === action.payload.id
        );
        if (index !== -1) {
          state.keywords[index] = action.payload;
        }
      })
      .addCase(updateKeyword.rejected, (state, action) => {
        state.loading.updateKeyword = false;
        state.error.updateKeyword = action.payload as string;
      });

    // Delete keyword
    builder
      .addCase(deleteKeyword.pending, (state) => {
        state.loading.deleteKeyword = true;
        state.error.deleteKeyword = null;
      })
      .addCase(deleteKeyword.fulfilled, (state, action) => {
        state.loading.deleteKeyword = false;
        state.keywords = state.keywords.filter((k) => k.id !== action.payload);
        state.keywordsTotal -= 1;
        state.selectedKeywordIds = state.selectedKeywordIds.filter(
          (id) => id !== action.payload
        );
      })
      .addCase(deleteKeyword.rejected, (state, action) => {
        state.loading.deleteKeyword = false;
        state.error.deleteKeyword = action.payload as string;
      });

    // Bulk delete keywords
    builder
      .addCase(bulkDeleteKeywords.pending, (state) => {
        state.loading.bulkOperations = true;
        state.error.bulkOperations = null;
      })
      .addCase(bulkDeleteKeywords.fulfilled, (state, action) => {
        state.loading.bulkOperations = false;
        state.keywords = state.keywords.filter(
          (k) => !action.payload.includes(k.id)
        );
        state.keywordsTotal -= action.payload.length;
        state.selectedKeywordIds = [];
      })
      .addCase(bulkDeleteKeywords.rejected, (state, action) => {
        state.loading.bulkOperations = false;
        state.error.bulkOperations = action.payload as string;
      });

    // Ranking history
    builder
      .addCase(fetchKeywordRankingHistory.pending, (state) => {
        state.loading.rankingHistory = true;
        state.error.rankingHistory = null;
      })
      .addCase(fetchKeywordRankingHistory.fulfilled, (state, action) => {
        state.loading.rankingHistory = false;
        state.rankingHistory[action.payload.keywordId] = action.payload.data;
      })
      .addCase(fetchKeywordRankingHistory.rejected, (state, action) => {
        state.loading.rankingHistory = false;
        state.error.rankingHistory = action.payload as string;
      });

    // Add ranking record
    builder
      .addCase(addRankingRecord.pending, (state) => {
        state.loading.rankingHistory = true;
        state.error.rankingHistory = null;
      })
      .addCase(addRankingRecord.fulfilled, (state, action) => {
        state.loading.rankingHistory = false;
        const { keywordId, ranking } = action.payload;
        if (state.rankingHistory[keywordId]) {
          state.rankingHistory[keywordId].rankings.push(ranking);
        }
      })
      .addCase(addRankingRecord.rejected, (state, action) => {
        state.loading.rankingHistory = false;
        state.error.rankingHistory = action.payload as string;
      });

    // SERP analysis
    builder
      .addCase(fetchSerpAnalysis.pending, (state) => {
        state.loading.serpAnalysis = true;
        state.error.serpAnalysis = null;
      })
      .addCase(fetchSerpAnalysis.fulfilled, (state, action) => {
        state.loading.serpAnalysis = false;
        state.serpAnalysis = action.payload;
      })
      .addCase(fetchSerpAnalysis.rejected, (state, action) => {
        state.loading.serpAnalysis = false;
        state.error.serpAnalysis = action.payload as string;
      });

    // Bulk update rankings
    builder
      .addCase(bulkUpdateRankings.pending, (state) => {
        state.loading.bulkOperations = true;
        state.error.bulkOperations = null;
      })
      .addCase(bulkUpdateRankings.fulfilled, (state) => {
        state.loading.bulkOperations = false;
        // Will need to refetch data
      })
      .addCase(bulkUpdateRankings.rejected, (state, action) => {
        state.loading.bulkOperations = false;
        state.error.bulkOperations = action.payload as string;
      });

    // Tracking settings
    builder
      .addCase(fetchTrackingSettings.pending, (state) => {
        state.loading.settings = true;
        state.error.settings = null;
      })
      .addCase(fetchTrackingSettings.fulfilled, (state, action) => {
        state.loading.settings = false;
        state.trackingSettings = action.payload;
      })
      .addCase(fetchTrackingSettings.rejected, (state, action) => {
        state.loading.settings = false;
        state.error.settings = action.payload as string;
      });

    // Update project settings
    builder
      .addCase(updateProjectSettings.pending, (state) => {
        state.loading.settings = true;
        state.error.settings = null;
      })
      .addCase(updateProjectSettings.fulfilled, (state, action) => {
        state.loading.settings = false;
        if (state.trackingSettings) {
          state.trackingSettings = {
            ...state.trackingSettings,
            ...action.payload,
          };
        }
      })
      .addCase(updateProjectSettings.rejected, (state, action) => {
        state.loading.settings = false;
        state.error.settings = action.payload as string;
      });
  },
});

// Export actions
export const {
  clearAllData,
  clearError,
  clearAllErrors,
  selectKeyword,
  deselectKeyword,
  selectAllKeywords,
  deselectAllKeywords,
  updateKeywordsFilters,
  resetKeywordsFilters,
} = rankTrackingSlice.actions;

// Export selectors
export const selectRankTrackingState = (state: {
  rankTracking: RankTrackingState;
}) => state.rankTracking;
export const selectProjectOverview = (state: {
  rankTracking: RankTrackingState;
}) => state.rankTracking.projectOverview;
export const selectProjectStats = (state: {
  rankTracking: RankTrackingState;
}) => state.rankTracking.projectStats;
export const selectKeywords = (state: { rankTracking: RankTrackingState }) =>
  state.rankTracking.keywords;
export const selectKeywordsPagination = (state: {
  rankTracking: RankTrackingState;
}) => ({
  total: state.rankTracking.keywordsTotal,
  page: state.rankTracking.keywordsPage,
  limit: state.rankTracking.keywordsLimit,
  totalPages: state.rankTracking.keywordsTotalPages,
});
export const selectRankingHistory = (state: {
  rankTracking: RankTrackingState;
}) => state.rankTracking.rankingHistory;
export const selectSerpAnalysis = (state: {
  rankTracking: RankTrackingState;
}) => state.rankTracking.serpAnalysis;
export const selectTrackingSettings = (state: {
  rankTracking: RankTrackingState;
}) => state.rankTracking.trackingSettings;
export const selectLoadingStates = (state: {
  rankTracking: RankTrackingState;
}) => state.rankTracking.loading;
export const selectErrorStates = (state: { rankTracking: RankTrackingState }) =>
  state.rankTracking.error;
export const selectSelectedKeywordIds = (state: {
  rankTracking: RankTrackingState;
}) => state.rankTracking.selectedKeywordIds;
export const selectKeywordsFilters = (state: {
  rankTracking: RankTrackingState;
}) => state.rankTracking.keywordsFilters;

// Export reducer
export default rankTrackingSlice.reducer;
