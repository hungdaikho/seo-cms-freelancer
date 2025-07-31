import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import {
    CreateRankingRequest,
    RankingRecord,
    RankingHistoryQueryParams,
    RankingHistoryResponse,
    ProjectRankingsOverview,
    PaginationParams
} from '@/types/api.type';
import { seoService } from '@/services/seo.service';

// State interface
export interface PositionTrackingState {
    // Rankings data
    rankings: RankingRecord[];
    currentRankingHistory: RankingHistoryResponse | null;
    projectOverview: ProjectRankingsOverview | null;

    // UI State
    loading: boolean;
    error: string | null;

    // Filters and settings
    filters: {
        period: string;
        searchEngine: string;
        location: string;
        device: string;
    };

    // Pagination for keywords list
    pagination: {
        total: number;
        page: number;
        limit: number;
        totalPages: number;
    };
}

// Initial state
const initialState: PositionTrackingState = {
    rankings: [],
    currentRankingHistory: null,
    projectOverview: null,
    loading: false,
    error: null,
    filters: {
        period: '7d',
        searchEngine: 'google',
        location: 'Vietnam',
        device: 'desktop',
    },
    pagination: {
        total: 0,
        page: 1,
        limit: 20,
        totalPages: 0,
    },
};

// =============================================================================
// 🔄 ASYNC THUNKS
// =============================================================================

/**
 * Create a new ranking record for a keyword
 */
export const createRanking = createAsyncThunk(
    'positionTracking/createRanking',
    async ({ keywordId, data }: { keywordId: string; data: CreateRankingRequest }, { rejectWithValue }) => {
        try {
            const ranking = await seoService.createRanking(keywordId, data);
            return { keywordId, ranking };
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || 'Failed to create ranking record');
        }
    }
);

/**
 * Fetch ranking history for a keyword
 */
export const fetchRankingHistory = createAsyncThunk(
    'positionTracking/fetchRankingHistory',
    async ({ keywordId, params }: { keywordId: string; params?: RankingHistoryQueryParams }, { rejectWithValue }) => {
        try {
            const response = await seoService.getRankingHistory(keywordId, params);
            return response;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || 'Failed to fetch ranking history');
        }
    }
);

/**
 * Fetch project rankings overview
 */
export const fetchProjectRankingsOverview = createAsyncThunk(
    'positionTracking/fetchProjectOverview',
    async (projectId: string, { rejectWithValue }) => {
        try {
            const overview = await seoService.getProjectRankingsOverview(projectId);
            return overview;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || 'Failed to fetch project rankings overview');
        }
    }
);

/**
 * Bulk update rankings (for multiple keywords)
 */
export const bulkUpdateRankings = createAsyncThunk(
    'positionTracking/bulkUpdateRankings',
    async (updates: Array<{ keywordId: string; data: CreateRankingRequest }>, { rejectWithValue }) => {
        try {
            const promises = updates.map(({ keywordId, data }) =>
                seoService.createRanking(keywordId, data)
            );
            const results = await Promise.all(promises);
            return results.map((ranking, index) => ({
                keywordId: updates[index].keywordId,
                ranking
            }));
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || 'Failed to bulk update rankings');
        }
    }
);

// =============================================================================
// 🔄 SLICE
// =============================================================================

const positionTrackingSlice = createSlice({
    name: 'positionTracking',
    initialState,
    reducers: {
        // UI Actions
        clearError: (state) => {
            state.error = null;
        },

        // Filter Actions
        setFilters: (state, action: PayloadAction<Partial<PositionTrackingState['filters']>>) => {
            state.filters = { ...state.filters, ...action.payload };
        },

        setPagination: (state, action: PayloadAction<Partial<PositionTrackingState['pagination']>>) => {
            state.pagination = { ...state.pagination, ...action.payload };
        },

        // Data Actions
        clearRankingHistory: (state) => {
            state.currentRankingHistory = null;
        },

        clearProjectOverview: (state) => {
            state.projectOverview = null;
        },

        resetState: (state) => {
            return initialState;
        },
    },
    extraReducers: (builder) => {
        // =============================================================================
        // Create Ranking
        // =============================================================================
        builder
            .addCase(createRanking.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(createRanking.fulfilled, (state, action) => {
                state.loading = false;
                state.rankings.unshift(action.payload.ranking);

                // Update current ranking history if it's for the same keyword
                if (state.currentRankingHistory?.keyword.id === action.payload.keywordId) {
                    state.currentRankingHistory.rankings.unshift(action.payload.ranking);
                    state.currentRankingHistory.keyword.currentRanking = action.payload.ranking.position;
                }

                // Update project overview if available
                if (state.projectOverview) {
                    const keywordIndex = state.projectOverview.keywords.findIndex(
                        k => k.id === action.payload.keywordId
                    );
                    if (keywordIndex !== -1) {
                        state.projectOverview.keywords[keywordIndex].currentRanking = action.payload.ranking.position;
                        state.projectOverview.keywords[keywordIndex].rankingHistory.unshift({
                            position: action.payload.ranking.position,
                            date: action.payload.ranking.date
                        });
                    }
                }
            })
            .addCase(createRanking.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });

        // =============================================================================
        // Fetch Ranking History
        // =============================================================================
        builder
            .addCase(fetchRankingHistory.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchRankingHistory.fulfilled, (state, action) => {
                state.loading = false;
                state.currentRankingHistory = action.payload;
            })
            .addCase(fetchRankingHistory.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });

        // =============================================================================
        // Fetch Project Rankings Overview
        // =============================================================================
        builder
            .addCase(fetchProjectRankingsOverview.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchProjectRankingsOverview.fulfilled, (state, action) => {
                state.loading = false;
                state.projectOverview = action.payload;

                // Update pagination
                state.pagination = {
                    total: action.payload.keywords.length,
                    page: 1,
                    limit: 20,
                    totalPages: Math.ceil(action.payload.keywords.length / 20),
                };
            })
            .addCase(fetchProjectRankingsOverview.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });

        // =============================================================================
        // Bulk Update Rankings
        // =============================================================================
        builder
            .addCase(bulkUpdateRankings.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(bulkUpdateRankings.fulfilled, (state, action) => {
                state.loading = false;

                // Add all new rankings
                action.payload.forEach(({ ranking }) => {
                    state.rankings.unshift(ranking);
                });

                // Update project overview if available
                if (state.projectOverview) {
                    action.payload.forEach(({ keywordId, ranking }) => {
                        const keywordIndex = state.projectOverview!.keywords.findIndex(k => k.id === keywordId);
                        if (keywordIndex !== -1) {
                            state.projectOverview!.keywords[keywordIndex].currentRanking = ranking.position;
                            state.projectOverview!.keywords[keywordIndex].rankingHistory.unshift({
                                position: ranking.position,
                                date: ranking.date
                            });
                        }
                    });

                    // Recalculate average position
                    const totalPositions = state.projectOverview.keywords.reduce(
                        (sum, keyword) => sum + keyword.currentRanking, 0
                    );
                    state.projectOverview.summary.avgPosition =
                        totalPositions / state.projectOverview.keywords.length;
                }
            })
            .addCase(bulkUpdateRankings.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
    },
});

// =============================================================================
// 🔄 ACTIONS & SELECTORS EXPORT
// =============================================================================

export const {
    clearError,
    setFilters,
    setPagination,
    clearRankingHistory,
    clearProjectOverview,
    resetState,
} = positionTrackingSlice.actions;

export default positionTrackingSlice.reducer;

// =============================================================================
// 🔄 SELECTORS
// =============================================================================

export const selectPositionTrackingState = (state: { positionTracking: PositionTrackingState }) =>
    state.positionTracking;

export const selectProjectOverview = (state: { positionTracking: PositionTrackingState }) =>
    state.positionTracking.projectOverview;

export const selectRankingHistory = (state: { positionTracking: PositionTrackingState }) =>
    state.positionTracking.currentRankingHistory;

export const selectVisibilityStats = (state: { positionTracking: PositionTrackingState }) => {
    const overview = state.positionTracking.projectOverview;
    if (!overview) return null;

    const keywords = overview.keywords;
    const total = keywords.length;

    const top3 = keywords.filter(k => k.currentRanking > 0 && k.currentRanking <= 3).length;
    const top10 = keywords.filter(k => k.currentRanking > 0 && k.currentRanking <= 10).length;
    const top20 = keywords.filter(k => k.currentRanking > 0 && k.currentRanking <= 20).length;
    const top100 = keywords.filter(k => k.currentRanking > 0 && k.currentRanking <= 100).length;

    return {
        total,
        top3: { count: top3, percentage: total > 0 ? (top3 / total) * 100 : 0 },
        top10: { count: top10, percentage: total > 0 ? (top10 / total) * 100 : 0 },
        top20: { count: top20, percentage: total > 0 ? (top20 / total) * 100 : 0 },
        top100: { count: top100, percentage: total > 0 ? (top100 / total) * 100 : 0 },
    };
};

export const selectTopKeywords = (state: { positionTracking: PositionTrackingState }, limit = 5) => {
    const overview = state.positionTracking.projectOverview;
    if (!overview) return [];

    return overview.keywords
        .filter(k => k.currentRanking > 0)
        .sort((a, b) => a.currentRanking - b.currentRanking)
        .slice(0, limit);
};
