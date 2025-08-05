import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { keywordGapService, KeywordGapRequest, KeywordGapResponse, CompetitorDiscoveryResponse, CompetitorAnalysisResponse, KeywordData, CompetitorDomain } from "@/services/keyword-gap.service";

// Async Thunks
export const analyzeKeywordGaps = createAsyncThunk(
    "keywordGap/analyzeKeywordGaps",
    async (request: KeywordGapRequest, { rejectWithValue }) => {
        try {
            const response = await keywordGapService.analyzeKeywordGaps(request);
            return response;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || "Failed to analyze keyword gaps");
        }
    }
);

export const discoverCompetitors = createAsyncThunk(
    "keywordGap/discoverCompetitors",
    async (
        { domain, country = "US", limit = 20 }: { domain: string; country?: string; limit?: number },
        { rejectWithValue }
    ) => {
        try {
            const response = await keywordGapService.discoverCompetitors(domain, country, limit);
            return response;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || "Failed to discover competitors");
        }
    }
);

export const analyzeCompetitor = createAsyncThunk(
    "keywordGap/analyzeCompetitor",
    async (
        request: { competitorDomain: string; yourDomain: string; industry: string },
        { rejectWithValue }
    ) => {
        try {
            const response = await keywordGapService.analyzeCompetitor(request);
            return response;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || "Failed to analyze competitor");
        }
    }
);

// Types
export interface KeywordGapFilters {
    difficulty: [number, number];
    volume: [number, number];
    intent: string;
    opportunity: string;
    minCompetitorStrength?: number;
}

export interface KeywordGapState {
    // Analysis data
    analysisResult: KeywordGapResponse | null;
    keywordOpportunities: KeywordData[];
    competitorDiscovery: CompetitorDiscoveryResponse | null;
    competitorAnalysis: CompetitorAnalysisResponse | null;

    // UI state
    selectedCompetitors: string[];
    filters: KeywordGapFilters;
    activeTab: string;

    // Loading states
    isAnalyzing: boolean;
    isDiscoveringCompetitors: boolean;
    isAnalyzingCompetitor: boolean;

    // Error states
    analysisError: string | null;
    discoveryError: string | null;
    competitorError: string | null;

    // Meta data
    lastAnalysisDate: string | null;
    totalOpportunities: number;
    potentialTraffic: number;
}

const initialState: KeywordGapState = {
    // Analysis data
    analysisResult: null,
    keywordOpportunities: [],
    competitorDiscovery: null,
    competitorAnalysis: null,

    // UI state
    selectedCompetitors: [],
    filters: {
        difficulty: [0, 100],
        volume: [0, 100000],
        intent: "all",
        opportunity: "all",
    },
    activeTab: "gaps",

    // Loading states
    isAnalyzing: false,
    isDiscoveringCompetitors: false,
    isAnalyzingCompetitor: false,

    // Error states
    analysisError: null,
    discoveryError: null,
    competitorError: null,

    // Meta data
    lastAnalysisDate: null,
    totalOpportunities: 0,
    potentialTraffic: 0,
};

const keywordGapSlice = createSlice({
    name: "keywordGap",
    initialState,
    reducers: {
        // Competitor management
        addCompetitor: (state, action: PayloadAction<string>) => {
            const competitor = action.payload;
            if (!state.selectedCompetitors.includes(competitor) && state.selectedCompetitors.length < 5) {
                state.selectedCompetitors.push(competitor);
            }
        },

        removeCompetitor: (state, action: PayloadAction<string>) => {
            state.selectedCompetitors = state.selectedCompetitors.filter(
                (competitor) => competitor !== action.payload
            );
        },

        clearCompetitors: (state) => {
            state.selectedCompetitors = [];
        },

        // Filters
        updateFilters: (state, action: PayloadAction<Partial<KeywordGapFilters>>) => {
            state.filters = { ...state.filters, ...action.payload };
            // Re-apply filters to keyword opportunities
            if (state.analysisResult) {
                try {
                    state.keywordOpportunities = keywordGapService.getKeywordOpportunities(
                        state.analysisResult,
                        state.filters
                    );
                    // Update meta data
                    state.totalOpportunities = state.keywordOpportunities.length;
                    state.potentialTraffic = state.keywordOpportunities.reduce(
                        (sum, keyword) => sum + (keyword.potentialTraffic || 0),
                        0
                    );
                } catch (error) {
                    // If filtering fails, keep existing data
                    console.warn('Failed to apply filters to keyword opportunities:', error);
                }
            }
        },

        // UI state
        setActiveTab: (state, action: PayloadAction<string>) => {
            state.activeTab = action.payload;
        },

        // Clear data
        clearAnalysisData: (state) => {
            state.analysisResult = null;
            state.keywordOpportunities = [];
            state.competitorAnalysis = null;
            state.analysisError = null;
            state.totalOpportunities = 0;
            state.potentialTraffic = 0;
            state.lastAnalysisDate = null;
        },

        clearCompetitorDiscovery: (state) => {
            state.competitorDiscovery = null;
            state.discoveryError = null;
        },

        // Error handling
        clearErrors: (state) => {
            state.analysisError = null;
            state.discoveryError = null;
            state.competitorError = null;
        },
    },
    extraReducers: (builder) => {
        // Analyze Keyword Gaps
        builder
            .addCase(analyzeKeywordGaps.pending, (state) => {
                state.isAnalyzing = true;
                state.analysisError = null;
            })
            .addCase(analyzeKeywordGaps.fulfilled, (state, action) => {
                state.isAnalyzing = false;
                // Extract the result from the nested payload structure
                const payload = action.payload as any;
                const analysisData = payload?.result || payload;
                state.analysisResult = analysisData;

                // Process keyword opportunities with current filters
                // Only process if we have valid analysis data
                if (analysisData && typeof analysisData === 'object') {
                    try {
                        state.keywordOpportunities = keywordGapService.getKeywordOpportunities(
                            analysisData,
                            state.filters
                        );
                        // Update meta data
                        state.totalOpportunities = state.keywordOpportunities.length;
                        state.potentialTraffic = state.keywordOpportunities.reduce(
                            (sum, keyword) => sum + (keyword.potentialTraffic || 0),
                            0
                        );
                    } catch (error) {
                        // If getKeywordOpportunities fails, set empty arrays
                        state.keywordOpportunities = [];
                        state.totalOpportunities = 0;
                        state.potentialTraffic = 0;
                    }
                } else {
                    state.keywordOpportunities = [];
                    state.totalOpportunities = 0;
                    state.potentialTraffic = 0;
                }
                state.lastAnalysisDate = new Date().toISOString();
            })
            .addCase(analyzeKeywordGaps.rejected, (state, action) => {
                state.isAnalyzing = false;
                state.analysisError = action.payload as string;
            });

        // Discover Competitors
        builder
            .addCase(discoverCompetitors.pending, (state) => {
                state.isDiscoveringCompetitors = true;
                state.discoveryError = null;
            })
            .addCase(discoverCompetitors.fulfilled, (state, action) => {
                state.isDiscoveringCompetitors = false;
                state.competitorDiscovery = action.payload;
            })
            .addCase(discoverCompetitors.rejected, (state, action) => {
                state.isDiscoveringCompetitors = false;
                state.discoveryError = action.payload as string;
            });

        // Analyze Competitor
        builder
            .addCase(analyzeCompetitor.pending, (state) => {
                state.isAnalyzingCompetitor = true;
                state.competitorError = null;
            })
            .addCase(analyzeCompetitor.fulfilled, (state, action) => {
                state.isAnalyzingCompetitor = false;
                state.competitorAnalysis = action.payload;
            })
            .addCase(analyzeCompetitor.rejected, (state, action) => {
                state.isAnalyzingCompetitor = false;
                state.competitorError = action.payload as string;
            });
    },
});

export const {
    addCompetitor,
    removeCompetitor,
    clearCompetitors,
    updateFilters,
    setActiveTab,
    clearAnalysisData,
    clearCompetitorDiscovery,
    clearErrors,
} = keywordGapSlice.actions;

export default keywordGapSlice.reducer;
