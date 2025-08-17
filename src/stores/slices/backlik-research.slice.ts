import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { backlinkResearchService } from "@/services/backlink-research.service";
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

// =============================================================================
// ASYNC THUNKS
// =============================================================================

// Domain Overview
export const fetchDomainOverview = createAsyncThunk(
  "backlinkResearch/fetchDomainOverview",
  async (params: GetDomainOverviewRequest) => {
    const response = await backlinkResearchService.getDomainOverview(params);
    return response;
  }
);

export const fetchDomainAuthority = createAsyncThunk(
  "backlinkResearch/fetchDomainAuthority",
  async (domain: string) => {
    const response = await backlinkResearchService.getDomainAuthority(domain);
    return response;
  }
);

// Project Backlinks
export const fetchProjectBacklinks = createAsyncThunk(
  "backlinkResearch/fetchProjectBacklinks",
  async (params: GetProjectBacklinksRequest) => {
    const response = await backlinkResearchService.getProjectBacklinks(params);
    return response;
  }
);

export const fetchBacklinkAnalytics = createAsyncThunk(
  "backlinkResearch/fetchBacklinkAnalytics",
  async (params: GetBacklinkAnalyticsRequest) => {
    const response = await backlinkResearchService.getBacklinkAnalytics(params);
    return response;
  }
);

export const addBacklinkToProject = createAsyncThunk(
  "backlinkResearch/addBacklinkToProject",
  async (params: AddBacklinkRequest) => {
    const response = await backlinkResearchService.addBacklinkToProject(params);
    return response;
  }
);

export const updateBacklink = createAsyncThunk(
  "backlinkResearch/updateBacklink",
  async (params: UpdateBacklinkRequest) => {
    const response = await backlinkResearchService.updateBacklink(params);
    return response;
  }
);

export const deleteBacklink = createAsyncThunk(
  "backlinkResearch/deleteBacklink",
  async ({
    projectId,
    backlinkId,
  }: {
    projectId: string;
    backlinkId: string;
  }) => {
    await backlinkResearchService.deleteBacklink(projectId, backlinkId);
    return backlinkId;
  }
);

// Gap Analysis
export const compareBacklinkProfiles = createAsyncThunk(
  "backlinkResearch/compareBacklinkProfiles",
  async (params: BacklinkGapCompareRequest) => {
    const response = await backlinkResearchService.compareBacklinkProfiles(
      params
    );
    return response;
  }
);

export const fetchLinkBuildingProspects = createAsyncThunk(
  "backlinkResearch/fetchLinkBuildingProspects",
  async (params: GetLinkProspectsRequest) => {
    const response = await backlinkResearchService.getLinkBuildingProspects(
      params
    );
    return response;
  }
);

// Timeline Data
export const fetchBacklinkTimeline = createAsyncThunk(
  "backlinkResearch/fetchBacklinkTimeline",
  async ({
    projectId,
    params,
  }: {
    projectId: string;
    params?: {
      period?: "1y" | "6m" | "3m" | "1m";
      metric?: "backlinks" | "domains" | "authority";
    };
  }) => {
    const response = await backlinkResearchService.getBacklinkTimeline(
      projectId,
      params
    );
    return response;
  }
);

// =============================================================================
// STATE INTERFACE
// =============================================================================

interface BacklinkResearchState {
  // Domain Overview
  domainOverview: DomainBacklinkMetrics | null;
  domainAuthority: AuthorityMetrics | null;

  // Project Backlinks
  projectBacklinks: PaginatedBacklinkResponse<ProjectBacklink> | null;
  backlinkAnalytics: BacklinkAnalytics | null;
  selectedBacklink: ProjectBacklink | null;

  // Gap Analysis
  gapAnalysis: BacklinkGapAnalysis | null;
  linkProspects: PaginatedBacklinkResponse<LinkProspect> | null;

  // Timeline Data
  timelineData: BacklinkTimelineData | null;

  // UI State
  currentDomain: string;
  includeSubdomains: boolean;
  selectedProjectId: string | null;
  filters: {
    status?: "active" | "lost" | "broken";
    linkType?: "dofollow" | "nofollow";
    authorityRange?: [number, number];
    dateRange?: [string, string];
  };

  // Loading States
  loading: {
    domainOverview: boolean;
    domainAuthority: boolean;
    projectBacklinks: boolean;
    backlinkAnalytics: boolean;
    gapAnalysis: boolean;
    linkProspects: boolean;
    timelineData: boolean;
    addBacklink: boolean;
    updateBacklink: boolean;
    deleteBacklink: boolean;
  };

  // Error States
  errors: {
    domainOverview: string | null;
    domainAuthority: string | null;
    projectBacklinks: string | null;
    backlinkAnalytics: string | null;
    gapAnalysis: string | null;
    linkProspects: string | null;
    timelineData: string | null;
    addBacklink: string | null;
    updateBacklink: string | null;
    deleteBacklink: string | null;
  };
}

// =============================================================================
// INITIAL STATE
// =============================================================================

const initialState: BacklinkResearchState = {
  // Domain Overview
  domainOverview: null,
  domainAuthority: null,

  // Project Backlinks
  projectBacklinks: null,
  backlinkAnalytics: null,
  selectedBacklink: null,

  // Gap Analysis
  gapAnalysis: null,
  linkProspects: null,

  // Timeline Data
  timelineData: null,

  // UI State
  currentDomain: "",
  includeSubdomains: false,
  selectedProjectId: null,
  filters: {},

  // Loading States
  loading: {
    domainOverview: false,
    domainAuthority: false,
    projectBacklinks: false,
    backlinkAnalytics: false,
    gapAnalysis: false,
    linkProspects: false,
    timelineData: false,
    addBacklink: false,
    updateBacklink: false,
    deleteBacklink: false,
  },

  // Error States
  errors: {
    domainOverview: null,
    domainAuthority: null,
    projectBacklinks: null,
    backlinkAnalytics: null,
    gapAnalysis: null,
    linkProspects: null,
    timelineData: null,
    addBacklink: null,
    updateBacklink: null,
    deleteBacklink: null,
  },
};

// =============================================================================
// SLICE
// =============================================================================

const backlinkResearchSlice = createSlice({
  name: "backlinkResearch",
  initialState,
  reducers: {
    // UI Actions
    setCurrentDomain: (state, action: PayloadAction<string>) => {
      state.currentDomain = action.payload;
    },

    setIncludeSubdomains: (state, action: PayloadAction<boolean>) => {
      state.includeSubdomains = action.payload;
    },

    setSelectedProjectId: (state, action: PayloadAction<string | null>) => {
      state.selectedProjectId = action.payload;
    },

    setFilters: (
      state,
      action: PayloadAction<Partial<BacklinkResearchState["filters"]>>
    ) => {
      state.filters = { ...state.filters, ...action.payload };
    },

    setSelectedBacklink: (
      state,
      action: PayloadAction<ProjectBacklink | null>
    ) => {
      state.selectedBacklink = action.payload;
    },

    // Clear Actions
    clearDomainData: (state) => {
      state.domainOverview = null;
      state.domainAuthority = null;
      state.errors.domainOverview = null;
      state.errors.domainAuthority = null;
    },

    clearProjectData: (state) => {
      state.projectBacklinks = null;
      state.backlinkAnalytics = null;
      state.timelineData = null;
      state.selectedBacklink = null;
      state.errors.projectBacklinks = null;
      state.errors.backlinkAnalytics = null;
      state.errors.timelineData = null;
    },

    clearGapAnalysisData: (state) => {
      state.gapAnalysis = null;
      state.linkProspects = null;
      state.errors.gapAnalysis = null;
      state.errors.linkProspects = null;
    },

    // Reset
    resetState: () => initialState,
  },

  extraReducers: (builder) => {
    // Domain Overview
    builder
      .addCase(fetchDomainOverview.pending, (state) => {
        state.loading.domainOverview = true;
        state.errors.domainOverview = null;
      })
      .addCase(fetchDomainOverview.fulfilled, (state, action) => {
        state.loading.domainOverview = false;
        state.domainOverview = action.payload;
      })
      .addCase(fetchDomainOverview.rejected, (state, action) => {
        state.loading.domainOverview = false;
        state.errors.domainOverview =
          action.error.message || "Failed to fetch domain overview";
      });

    // Domain Authority
    builder
      .addCase(fetchDomainAuthority.pending, (state) => {
        state.loading.domainAuthority = true;
        state.errors.domainAuthority = null;
      })
      .addCase(fetchDomainAuthority.fulfilled, (state, action) => {
        state.loading.domainAuthority = false;
        state.domainAuthority = action.payload;
      })
      .addCase(fetchDomainAuthority.rejected, (state, action) => {
        state.loading.domainAuthority = false;
        state.errors.domainAuthority =
          action.error.message || "Failed to fetch domain authority";
      });

    // Project Backlinks
    builder
      .addCase(fetchProjectBacklinks.pending, (state) => {
        state.loading.projectBacklinks = true;
        state.errors.projectBacklinks = null;
      })
      .addCase(fetchProjectBacklinks.fulfilled, (state, action) => {
        state.loading.projectBacklinks = false;
        state.projectBacklinks = action.payload;
      })
      .addCase(fetchProjectBacklinks.rejected, (state, action) => {
        state.loading.projectBacklinks = false;
        state.errors.projectBacklinks =
          action.error.message || "Failed to fetch project backlinks";
      });

    // Backlink Analytics
    builder
      .addCase(fetchBacklinkAnalytics.pending, (state) => {
        state.loading.backlinkAnalytics = true;
        state.errors.backlinkAnalytics = null;
      })
      .addCase(fetchBacklinkAnalytics.fulfilled, (state, action) => {
        state.loading.backlinkAnalytics = false;
        state.backlinkAnalytics = action.payload;
      })
      .addCase(fetchBacklinkAnalytics.rejected, (state, action) => {
        state.loading.backlinkAnalytics = false;
        state.errors.backlinkAnalytics =
          action.error.message || "Failed to fetch backlink analytics";
      });

    // Add Backlink
    builder
      .addCase(addBacklinkToProject.pending, (state) => {
        state.loading.addBacklink = true;
        state.errors.addBacklink = null;
      })
      .addCase(addBacklinkToProject.fulfilled, (state, action) => {
        state.loading.addBacklink = false;
        if (state.projectBacklinks) {
          state.projectBacklinks.data.unshift(action.payload);
          state.projectBacklinks.pagination.total += 1;
        }
      })
      .addCase(addBacklinkToProject.rejected, (state, action) => {
        state.loading.addBacklink = false;
        state.errors.addBacklink =
          action.error.message || "Failed to add backlink";
      });

    // Update Backlink
    builder
      .addCase(updateBacklink.pending, (state) => {
        state.loading.updateBacklink = true;
        state.errors.updateBacklink = null;
      })
      .addCase(updateBacklink.fulfilled, (state, action) => {
        state.loading.updateBacklink = false;
        if (state.projectBacklinks) {
          const index = state.projectBacklinks.data.findIndex(
            (b) => b.id === action.payload.id
          );
          if (index !== -1) {
            state.projectBacklinks.data[index] = action.payload;
          }
        }
        if (state.selectedBacklink?.id === action.payload.id) {
          state.selectedBacklink = action.payload;
        }
      })
      .addCase(updateBacklink.rejected, (state, action) => {
        state.loading.updateBacklink = false;
        state.errors.updateBacklink =
          action.error.message || "Failed to update backlink";
      });

    // Delete Backlink
    builder
      .addCase(deleteBacklink.pending, (state) => {
        state.loading.deleteBacklink = true;
        state.errors.deleteBacklink = null;
      })
      .addCase(deleteBacklink.fulfilled, (state, action) => {
        state.loading.deleteBacklink = false;
        if (state.projectBacklinks) {
          state.projectBacklinks.data = state.projectBacklinks.data.filter(
            (b) => b.id !== action.payload
          );
          state.projectBacklinks.pagination.total -= 1;
        }
        if (state.selectedBacklink?.id === action.payload) {
          state.selectedBacklink = null;
        }
      })
      .addCase(deleteBacklink.rejected, (state, action) => {
        state.loading.deleteBacklink = false;
        state.errors.deleteBacklink =
          action.error.message || "Failed to delete backlink";
      });

    // Gap Analysis
    builder
      .addCase(compareBacklinkProfiles.pending, (state) => {
        state.loading.gapAnalysis = true;
        state.errors.gapAnalysis = null;
      })
      .addCase(compareBacklinkProfiles.fulfilled, (state, action) => {
        state.loading.gapAnalysis = false;
        state.gapAnalysis = action.payload;
      })
      .addCase(compareBacklinkProfiles.rejected, (state, action) => {
        state.loading.gapAnalysis = false;
        state.errors.gapAnalysis =
          action.error.message || "Failed to compare backlink profiles";
      });

    // Link Prospects
    builder
      .addCase(fetchLinkBuildingProspects.pending, (state) => {
        state.loading.linkProspects = true;
        state.errors.linkProspects = null;
      })
      .addCase(fetchLinkBuildingProspects.fulfilled, (state, action) => {
        state.loading.linkProspects = false;
        state.linkProspects = action.payload;
      })
      .addCase(fetchLinkBuildingProspects.rejected, (state, action) => {
        state.loading.linkProspects = false;
        state.errors.linkProspects =
          action.error.message || "Failed to fetch link prospects";
      });

    // Timeline Data
    builder
      .addCase(fetchBacklinkTimeline.pending, (state) => {
        state.loading.timelineData = true;
        state.errors.timelineData = null;
      })
      .addCase(fetchBacklinkTimeline.fulfilled, (state, action) => {
        state.loading.timelineData = false;
        state.timelineData = action.payload;
      })
      .addCase(fetchBacklinkTimeline.rejected, (state, action) => {
        state.loading.timelineData = false;
        state.errors.timelineData =
          action.error.message || "Failed to fetch timeline data";
      });
  },
});

// =============================================================================
// EXPORTS
// =============================================================================

export const {
  setCurrentDomain,
  setIncludeSubdomains,
  setSelectedProjectId,
  setFilters,
  setSelectedBacklink,
  clearDomainData,
  clearProjectData,
  clearGapAnalysisData,
  resetState,
} = backlinkResearchSlice.actions;

export default backlinkResearchSlice.reducer;
