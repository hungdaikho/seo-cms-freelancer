import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import {
  competitiveService,
  DomainOverview,
  TopKeyword,
  KeywordGapAnalysis,
  BacklinkGapAnalysis,
  CompetitiveAnalysis,
  CompetitorMetrics,
  AuthorityMetrics,
} from "@/services/competitive.service";

// Async thunks
export const fetchDomainOverview = createAsyncThunk(
  "competitive/fetchDomainOverview",
  async ({
    domain,
    includeSubdomains,
  }: {
    domain: string;
    includeSubdomains?: boolean;
  }) => {
    return await competitiveService.getDomainOverview(
      domain,
      includeSubdomains
    );
  }
);

export const fetchDomainTopKeywords = createAsyncThunk(
  "competitive/fetchDomainTopKeywords",
  async ({
    domain,
    limit = 100,
    country = "US",
  }: {
    domain: string;
    limit?: number;
    country?: string;
  }) => {
    return await competitiveService.getDomainTopKeywords(
      domain,
      limit,
      country
    );
  }
);

export const fetchDomainCompetitors = createAsyncThunk(
  "competitive/fetchDomainCompetitors",
  async ({
    domain,
    limit = 50,
    country = "US",
  }: {
    domain: string;
    limit?: number;
    country?: string;
  }) => {
    return await competitiveService.getDomainCompetitors(
      domain,
      limit,
      country
    );
  }
);

export const fetchDomainAuthority = createAsyncThunk(
  "competitive/fetchDomainAuthority",
  async (domain: string) => {
    return await competitiveService.getDomainAuthority(domain);
  }
);

export const compareKeywordGaps = createAsyncThunk(
  "competitive/compareKeywordGaps",
  async (data: {
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
  }) => {
    return await competitiveService.compareKeywordGaps(data);
  }
);

export const getKeywordOverlap = createAsyncThunk(
  "competitive/getKeywordOverlap",
  async ({
    domains,
    country = "US",
  }: {
    domains: string[];
    country?: string;
  }) => {
    return await competitiveService.getKeywordOverlap(domains, country);
  }
);

export const compareBacklinkProfiles = createAsyncThunk(
  "competitive/compareBacklinkProfiles",
  async (data: {
    targetDomain: string;
    competitors: string[];
    filters?: {
      minAuthorityScore?: number;
      linkType?: string;
      language?: string;
    };
  }) => {
    return await competitiveService.compareBacklinkProfiles(data);
  }
);

export const getLinkBuildingProspects = createAsyncThunk(
  "competitive/getLinkBuildingProspects",
  async ({
    domain,
    limit = 100,
    minAuthorityScore = 30,
    linkType,
    language,
  }: {
    domain: string;
    limit?: number;
    minAuthorityScore?: number;
    linkType?: string;
    language?: string;
  }) => {
    return await competitiveService.getLinkBuildingProspects(domain, {
      limit,
      minAuthorityScore,
      linkType,
      language,
    });
  }
);

export const getCompetitiveOverview = createAsyncThunk(
  "competitive/getCompetitiveOverview",
  async ({
    projectId,
    timeframe = "30d",
  }: {
    projectId: string;
    timeframe?: string;
  }) => {
    return await competitiveService.getCompetitiveOverview(
      projectId,
      timeframe
    );
  }
);

export const getMarketShareAnalysis = createAsyncThunk(
  "competitive/getMarketShareAnalysis",
  async ({
    domains,
    keywords,
    country = "US",
  }: {
    domains: string[];
    keywords?: string[];
    country?: string;
  }) => {
    return await competitiveService.getMarketShareAnalysis(
      domains,
      keywords,
      country
    );
  }
);

// State interface
interface CompetitiveState {
  // Domain Overview
  domainOverview: DomainOverview | null;
  domainTopKeywords: {
    data: TopKeyword[];
    total: number;
    domain: string;
    country: string;
  } | null;
  domainCompetitors: {
    data: CompetitorMetrics[];
    total: number;
    domain: string;
    country: string;
  } | null;
  domainAuthority:
    | (AuthorityMetrics & {
        domain: string;
        backlinks: number;
        referringDomains: number;
        lastUpdated: string;
      })
    | null;

  // Keyword Gap Analysis
  keywordGapAnalysis: KeywordGapAnalysis | null;
  keywordOverlap: {
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
  } | null;

  // Backlink Gap Analysis
  backlinkGapAnalysis: BacklinkGapAnalysis | null;
  linkBuildingProspects: {
    prospects: Array<{
      domain: string;
      authorityScore: number;
      monthlyVisits: number;
      competitorLinks: string[];
      targetPresent: boolean;
      linkType: string;
      category: string;
      opportunity: string;
    }>;
    summary: {
      totalProspects: number;
      highPriority: number;
      mediumPriority: number;
      lowPriority: number;
    };
  } | null;

  // Competitive Analysis
  competitiveOverview: CompetitiveAnalysis | null;
  marketShareAnalysis: {
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
  } | null;

  // UI State
  loading: {
    domainOverview: boolean;
    domainTopKeywords: boolean;
    domainCompetitors: boolean;
    domainAuthority: boolean;
    keywordGap: boolean;
    keywordOverlap: boolean;
    backlinkGap: boolean;
    linkProspects: boolean;
    competitiveOverview: boolean;
    marketShare: boolean;
  };
  error: {
    domainOverview: string | null;
    domainTopKeywords: string | null;
    domainCompetitors: string | null;
    domainAuthority: string | null;
    keywordGap: string | null;
    keywordOverlap: string | null;
    backlinkGap: string | null;
    linkProspects: string | null;
    competitiveOverview: string | null;
    marketShare: string | null;
  };

  // Search filters
  filters: {
    domain: string;
    competitors: string[];
    country: string;
    timeframe: string;
    database: string;
    device: string;
  };
}

const initialState: CompetitiveState = {
  domainOverview: null,
  domainTopKeywords: null,
  domainCompetitors: null,
  domainAuthority: null,
  keywordGapAnalysis: null,
  keywordOverlap: null,
  backlinkGapAnalysis: null,
  linkBuildingProspects: null,
  competitiveOverview: null,
  marketShareAnalysis: null,
  loading: {
    domainOverview: false,
    domainTopKeywords: false,
    domainCompetitors: false,
    domainAuthority: false,
    keywordGap: false,
    keywordOverlap: false,
    backlinkGap: false,
    linkProspects: false,
    competitiveOverview: false,
    marketShare: false,
  },
  error: {
    domainOverview: null,
    domainTopKeywords: null,
    domainCompetitors: null,
    domainAuthority: null,
    keywordGap: null,
    keywordOverlap: null,
    backlinkGap: null,
    linkProspects: null,
    competitiveOverview: null,
    marketShare: null,
  },
  filters: {
    domain: "",
    competitors: [],
    country: "US",
    timeframe: "30d",
    database: "all",
    device: "desktop",
  },
};

const competitiveSlice = createSlice({
  name: "competitive",
  initialState,
  reducers: {
    setFilters: (
      state,
      action: PayloadAction<Partial<CompetitiveState["filters"]>>
    ) => {
      state.filters = { ...state.filters, ...action.payload };
    },
    clearDomainOverview: (state) => {
      state.domainOverview = null;
      state.error.domainOverview = null;
    },
    clearKeywordGapAnalysis: (state) => {
      state.keywordGapAnalysis = null;
      state.error.keywordGap = null;
    },
    clearBacklinkGapAnalysis: (state) => {
      state.backlinkGapAnalysis = null;
      state.error.backlinkGap = null;
    },
    clearCompetitiveOverview: (state) => {
      state.competitiveOverview = null;
      state.error.competitiveOverview = null;
    },
    addCompetitor: (state, action: PayloadAction<string>) => {
      if (!state.filters.competitors.includes(action.payload)) {
        state.filters.competitors.push(action.payload);
      }
    },
    removeCompetitor: (state, action: PayloadAction<string>) => {
      state.filters.competitors = state.filters.competitors.filter(
        (competitor) => competitor !== action.payload
      );
    },
  },
  extraReducers: (builder) => {
    // Domain Overview
    builder
      .addCase(fetchDomainOverview.pending, (state) => {
        state.loading.domainOverview = true;
        state.error.domainOverview = null;
      })
      .addCase(fetchDomainOverview.fulfilled, (state, action) => {
        state.loading.domainOverview = false;
        state.domainOverview = action.payload;
      })
      .addCase(fetchDomainOverview.rejected, (state, action) => {
        state.loading.domainOverview = false;
        state.error.domainOverview =
          action.error.message || "Failed to fetch domain overview";
      });

    // Domain Top Keywords
    builder
      .addCase(fetchDomainTopKeywords.pending, (state) => {
        state.loading.domainTopKeywords = true;
        state.error.domainTopKeywords = null;
      })
      .addCase(fetchDomainTopKeywords.fulfilled, (state, action) => {
        state.loading.domainTopKeywords = false;
        state.domainTopKeywords = action.payload;
      })
      .addCase(fetchDomainTopKeywords.rejected, (state, action) => {
        state.loading.domainTopKeywords = false;
        state.error.domainTopKeywords =
          action.error.message || "Failed to fetch domain top keywords";
      });

    // Domain Competitors
    builder
      .addCase(fetchDomainCompetitors.pending, (state) => {
        state.loading.domainCompetitors = true;
        state.error.domainCompetitors = null;
      })
      .addCase(fetchDomainCompetitors.fulfilled, (state, action) => {
        state.loading.domainCompetitors = false;
        state.domainCompetitors = action.payload;
      })
      .addCase(fetchDomainCompetitors.rejected, (state, action) => {
        state.loading.domainCompetitors = false;
        state.error.domainCompetitors =
          action.error.message || "Failed to fetch domain competitors";
      });

    // Domain Authority
    builder
      .addCase(fetchDomainAuthority.pending, (state) => {
        state.loading.domainAuthority = true;
        state.error.domainAuthority = null;
      })
      .addCase(fetchDomainAuthority.fulfilled, (state, action) => {
        state.loading.domainAuthority = false;
        state.domainAuthority = action.payload;
      })
      .addCase(fetchDomainAuthority.rejected, (state, action) => {
        state.loading.domainAuthority = false;
        state.error.domainAuthority =
          action.error.message || "Failed to fetch domain authority";
      });

    // Keyword Gap Analysis
    builder
      .addCase(compareKeywordGaps.pending, (state) => {
        state.loading.keywordGap = true;
        state.error.keywordGap = null;
      })
      .addCase(compareKeywordGaps.fulfilled, (state, action) => {
        state.loading.keywordGap = false;
        state.keywordGapAnalysis = action.payload;
      })
      .addCase(compareKeywordGaps.rejected, (state, action) => {
        state.loading.keywordGap = false;
        state.error.keywordGap =
          action.error.message || "Failed to compare keyword gaps";
      });

    // Keyword Overlap
    builder
      .addCase(getKeywordOverlap.pending, (state) => {
        state.loading.keywordOverlap = true;
        state.error.keywordOverlap = null;
      })
      .addCase(getKeywordOverlap.fulfilled, (state, action) => {
        state.loading.keywordOverlap = false;
        state.keywordOverlap = action.payload;
      })
      .addCase(getKeywordOverlap.rejected, (state, action) => {
        state.loading.keywordOverlap = false;
        state.error.keywordOverlap =
          action.error.message || "Failed to get keyword overlap";
      });

    // Backlink Gap Analysis
    builder
      .addCase(compareBacklinkProfiles.pending, (state) => {
        state.loading.backlinkGap = true;
        state.error.backlinkGap = null;
      })
      .addCase(compareBacklinkProfiles.fulfilled, (state, action) => {
        state.loading.backlinkGap = false;
        state.backlinkGapAnalysis = action.payload;
      })
      .addCase(compareBacklinkProfiles.rejected, (state, action) => {
        state.loading.backlinkGap = false;
        state.error.backlinkGap =
          action.error.message || "Failed to compare backlink profiles";
      });

    // Link Building Prospects
    builder
      .addCase(getLinkBuildingProspects.pending, (state) => {
        state.loading.linkProspects = true;
        state.error.linkProspects = null;
      })
      .addCase(getLinkBuildingProspects.fulfilled, (state, action) => {
        state.loading.linkProspects = false;
        state.linkBuildingProspects = action.payload;
      })
      .addCase(getLinkBuildingProspects.rejected, (state, action) => {
        state.loading.linkProspects = false;
        state.error.linkProspects =
          action.error.message || "Failed to get link building prospects";
      });

    // Competitive Overview
    builder
      .addCase(getCompetitiveOverview.pending, (state) => {
        state.loading.competitiveOverview = true;
        state.error.competitiveOverview = null;
      })
      .addCase(getCompetitiveOverview.fulfilled, (state, action) => {
        state.loading.competitiveOverview = false;
        state.competitiveOverview = action.payload;
      })
      .addCase(getCompetitiveOverview.rejected, (state, action) => {
        state.loading.competitiveOverview = false;
        state.error.competitiveOverview =
          action.error.message || "Failed to get competitive overview";
      });

    // Market Share Analysis
    builder
      .addCase(getMarketShareAnalysis.pending, (state) => {
        state.loading.marketShare = true;
        state.error.marketShare = null;
      })
      .addCase(getMarketShareAnalysis.fulfilled, (state, action) => {
        state.loading.marketShare = false;
        state.marketShareAnalysis = action.payload;
      })
      .addCase(getMarketShareAnalysis.rejected, (state, action) => {
        state.loading.marketShare = false;
        state.error.marketShare =
          action.error.message || "Failed to get market share analysis";
      });
  },
});

export const {
  setFilters,
  clearDomainOverview,
  clearKeywordGapAnalysis,
  clearBacklinkGapAnalysis,
  clearCompetitiveOverview,
  addCompetitor,
  removeCompetitor,
} = competitiveSlice.actions;

export default competitiveSlice.reducer;
