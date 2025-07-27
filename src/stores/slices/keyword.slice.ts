import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import {
    Keyword,
    CreateKeywordRequest,
    BulkCreateKeywordsRequest,
    UpdateKeywordRequest,
    KeywordQueryParams,
    KeywordRanking,
    RankingHistoryParams,
    ApiResponse
} from '@/types/api.type';
import { seoService } from '@/services/seo.service';

// State interface
export interface KeywordState {
    keywords: Keyword[];
    currentKeyword: Keyword | null;
    rankingHistory: KeywordRanking[];
    loading: boolean;
    error: string | null;
    pagination: {
        total: number;
        page: number;
        limit: number;
        totalPages: number;
    };
}

// Initial state
const initialState: KeywordState = {
    keywords: [],
    currentKeyword: null,
    rankingHistory: [],
    loading: false,
    error: null,
    pagination: {
        total: 0,
        page: 1,
        limit: 20,
        totalPages: 0,
    },
};

// Async thunks
export const addKeywordToProject = createAsyncThunk(
    'keyword/addToProject',
    async ({ projectId, data }: { projectId: string; data: CreateKeywordRequest }, { rejectWithValue }) => {
        try {
            const keyword = await seoService.addKeywordToProject(projectId, data);
            return keyword;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || 'Failed to add keyword');
        }
    }
);

export const bulkAddKeywords = createAsyncThunk(
    'keyword/bulkAdd',
    async ({ projectId, data }: { projectId: string; data: BulkCreateKeywordsRequest }, { rejectWithValue }) => {
        try {
            const keywords = await seoService.bulkAddKeywords(projectId, data);
            return keywords;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || 'Failed to bulk add keywords');
        }
    }
);

export const fetchProjectKeywords = createAsyncThunk(
    'keyword/fetchProjectKeywords',
    async ({ projectId, params }: { projectId: string; params?: KeywordQueryParams }, { rejectWithValue }) => {
        try {
            const response = await seoService.getProjectKeywords(projectId, params);
            return response;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || 'Failed to fetch keywords');
        }
    }
);

export const updateKeyword = createAsyncThunk(
    'keyword/update',
    async ({ keywordId, data }: { keywordId: string; data: UpdateKeywordRequest }, { rejectWithValue }) => {
        try {
            const keyword = await seoService.updateKeyword(keywordId, data);
            return keyword;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || 'Failed to update keyword');
        }
    }
);

export const deleteKeyword = createAsyncThunk(
    'keyword/delete',
    async (keywordId: string, { rejectWithValue }) => {
        try {
            await seoService.deleteKeyword(keywordId);
            return keywordId;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || 'Failed to delete keyword');
        }
    }
);

export const fetchKeywordRankingHistory = createAsyncThunk(
    'keyword/fetchRankingHistory',
    async ({ keywordId, params }: { keywordId: string; params?: RankingHistoryParams }, { rejectWithValue }) => {
        try {
            const rankings = await seoService.getKeywordRankingHistory(keywordId, params);
            return rankings;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || 'Failed to fetch ranking history');
        }
    }
);

// Slice
const keywordSlice = createSlice({
    name: 'keyword',
    initialState,
    reducers: {
        clearError: (state) => {
            state.error = null;
        },
        setCurrentKeyword: (state, action: PayloadAction<Keyword | null>) => {
            state.currentKeyword = action.payload;
        },
        clearCurrentKeyword: (state) => {
            state.currentKeyword = null;
            state.rankingHistory = [];
        },
        clearKeywords: (state) => {
            state.keywords = [];
            state.pagination = initialState.pagination;
        },
    },
    extraReducers: (builder) => {
        // Add keyword to project
        builder
            .addCase(addKeywordToProject.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(addKeywordToProject.fulfilled, (state, action) => {
                state.loading = false;
                state.keywords.unshift(action.payload);
            })
            .addCase(addKeywordToProject.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });

        // Bulk add keywords
        builder
            .addCase(bulkAddKeywords.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(bulkAddKeywords.fulfilled, (state, action) => {
                state.loading = false;
                state.keywords = [...action.payload, ...state.keywords];
            })
            .addCase(bulkAddKeywords.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });

        // Fetch project keywords
        builder
            .addCase(fetchProjectKeywords.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchProjectKeywords.fulfilled, (state, action) => {
                state.loading = false;
                state.keywords = action.payload.data;
                state.pagination = {
                    total: action.payload.total || 0,
                    page: action.payload.page || 1,
                    limit: action.payload.limit || 20,
                    totalPages: action.payload.totalPages || 0,
                };
            })
            .addCase(fetchProjectKeywords.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });

        // Update keyword
        builder
            .addCase(updateKeyword.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateKeyword.fulfilled, (state, action) => {
                state.loading = false;
                const index = state.keywords.findIndex(k => k.id === action.payload.id);
                if (index !== -1) {
                    state.keywords[index] = action.payload;
                }
                if (state.currentKeyword?.id === action.payload.id) {
                    state.currentKeyword = action.payload;
                }
            })
            .addCase(updateKeyword.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });

        // Delete keyword
        builder
            .addCase(deleteKeyword.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(deleteKeyword.fulfilled, (state, action) => {
                state.loading = false;
                state.keywords = state.keywords.filter(k => k.id !== action.payload);
                if (state.currentKeyword?.id === action.payload) {
                    state.currentKeyword = null;
                    state.rankingHistory = [];
                }
            })
            .addCase(deleteKeyword.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });

        // Fetch keyword ranking history
        builder
            .addCase(fetchKeywordRankingHistory.pending, (state) => {
                state.error = null;
            })
            .addCase(fetchKeywordRankingHistory.fulfilled, (state, action) => {
                state.rankingHistory = action.payload;
            })
            .addCase(fetchKeywordRankingHistory.rejected, (state, action) => {
                state.error = action.payload as string;
            });
    },
});

export const { clearError, setCurrentKeyword, clearCurrentKeyword, clearKeywords } = keywordSlice.actions;
export default keywordSlice.reducer;
