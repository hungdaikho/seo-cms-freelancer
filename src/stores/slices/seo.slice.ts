import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import {
    Keyword,
    CreateKeywordRequest,
    BulkCreateKeywordsRequest,
    UpdateKeywordRequest,
    KeywordQueryParams,
    KeywordRanking,
    RankingHistoryParams,
    ApiResponse,
    PaginationParams
} from '@/types/api.type';
import { seoService } from '@/services/seo.service';

// State interface
export interface SeoState {
    keywords: Keyword[];
    keywordRankings: KeywordRanking[];
    currentKeyword: Keyword | null;
    loading: boolean;
    error: string | null;
    pagination: {
        total: number;
        page: number;
        limit: number;
        totalPages: number;
    };
    filters: {
        sortBy?: string;
        sortOrder?: 'asc' | 'desc';
        search?: string;
    };
}

// Initial state
const initialState: SeoState = {
    keywords: [],
    keywordRankings: [],
    currentKeyword: null,
    loading: false,
    error: null,
    pagination: {
        total: 0,
        page: 1,
        limit: 20,
        totalPages: 0,
    },
    filters: {
        sortBy: 'createdAt',
        sortOrder: 'desc',
        search: '',
    },
};

// Async thunks
export const addKeywordToProject = createAsyncThunk(
    'seo/addKeywordToProject',
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
    'seo/bulkAddKeywords',
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
    'seo/fetchProjectKeywords',
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
    'seo/updateKeyword',
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
    'seo/deleteKeyword',
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
    'seo/fetchKeywordRankingHistory',
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
const seoSlice = createSlice({
    name: 'seo',
    initialState,
    reducers: {
        setFilters: (state, action: PayloadAction<Partial<SeoState['filters']>>) => {
            state.filters = { ...state.filters, ...action.payload };
        },
        setPagination: (state, action: PayloadAction<Partial<SeoState['pagination']>>) => {
            state.pagination = { ...state.pagination, ...action.payload };
        },
        setCurrentKeyword: (state, action: PayloadAction<Keyword | null>) => {
            state.currentKeyword = action.payload;
        },
        clearError: (state) => {
            state.error = null;
        },
        resetSeoState: (state) => {
            return initialState;
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
                state.pagination.total += 1;
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
                state.pagination.total += action.payload.length;
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
                state.pagination.total -= 1;
                if (state.currentKeyword?.id === action.payload) {
                    state.currentKeyword = null;
                }
            })
            .addCase(deleteKeyword.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });

        // Fetch keyword ranking history
        builder
            .addCase(fetchKeywordRankingHistory.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchKeywordRankingHistory.fulfilled, (state, action) => {
                state.loading = false;
                state.keywordRankings = action.payload;
            })
            .addCase(fetchKeywordRankingHistory.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
    },
});

export const {
    setFilters,
    setPagination,
    setCurrentKeyword,
    clearError,
    resetSeoState,
} = seoSlice.actions;

export default seoSlice.reducer;
