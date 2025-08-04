import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import {
    OrganicDomainAnalysis,
    OrganicKeywordsResponse,
    OrganicKeywordsParams,
    CompetitorsResponse,
    CompetitorsParams,
    TopPagesResponse,
    TopPagesParams,
    ApiLimitsResponse,
} from '@/types/api.type';
import { organicResearchService } from '@/services/organic-research.service';

// State interface
export interface OrganicResearchState {
    // Domain analysis
    domainAnalysis: OrganicDomainAnalysis | null;

    // Keywords data
    organicKeywords: OrganicKeywordsResponse | null;
    keywordsLoading: boolean;
    keywordsError: string | null;

    // Competitors data
    competitors: CompetitorsResponse | null;
    competitorsLoading: boolean;
    competitorsError: string | null;

    // Top pages data
    topPages: TopPagesResponse | null;
    topPagesLoading: boolean;
    topPagesError: string | null;

    // API limits
    apiLimits: ApiLimitsResponse | null;

    // General loading and error states
    loading: boolean;
    error: string | null;

    // Current analysis parameters
    currentDomain: string | null;
    currentCountry: string;
}

// Initial state
const initialState: OrganicResearchState = {
    domainAnalysis: null,
    organicKeywords: null,
    keywordsLoading: false,
    keywordsError: null,
    competitors: null,
    competitorsLoading: false,
    competitorsError: null,
    topPages: null,
    topPagesLoading: false,
    topPagesError: null,
    apiLimits: null,
    loading: false,
    error: null,
    currentDomain: null,
    currentCountry: 'US',
};

// Async thunks
export const analyzeDomain = createAsyncThunk(
    'organicResearch/analyzeDomain',
    async ({ domain, country, database }: { domain: string; country: string; database?: string }, { rejectWithValue }) => {
        try {
            const response = await organicResearchService.analyzeDomain(domain, country, database);
            return { response, domain, country };
        } catch (error: any) {
            return rejectWithValue(error.message || 'Failed to analyze domain');
        }
    }
);

export const fetchOrganicKeywords = createAsyncThunk(
    'organicResearch/fetchOrganicKeywords',
    async ({ domain, params }: { domain: string; params: OrganicKeywordsParams }, { rejectWithValue }) => {
        try {
            const response = await organicResearchService.getOrganicKeywords(domain, params);
            return response;
        } catch (error: any) {
            return rejectWithValue(error.message || 'Failed to fetch organic keywords');
        }
    }
);

export const fetchCompetitors = createAsyncThunk(
    'organicResearch/fetchCompetitors',
    async ({ domain, params }: { domain: string; params: CompetitorsParams }, { rejectWithValue }) => {
        try {
            const response = await organicResearchService.getCompetitors(domain, params);
            return response;
        } catch (error: any) {
            return rejectWithValue(error.message || 'Failed to fetch competitors');
        }
    }
);

export const fetchTopPages = createAsyncThunk(
    'organicResearch/fetchTopPages',
    async ({ domain, params }: { domain: string; params: TopPagesParams }, { rejectWithValue }) => {
        try {
            const response = await organicResearchService.getTopPages(domain, params);
            return response;
        } catch (error: any) {
            return rejectWithValue(error.message || 'Failed to fetch top pages');
        }
    }
);

export const fetchApiLimits = createAsyncThunk(
    'organicResearch/fetchApiLimits',
    async (_, { rejectWithValue }) => {
        try {
            const response = await organicResearchService.getApiLimits();
            return response;
        } catch (error: any) {
            return rejectWithValue(error.message || 'Failed to fetch API limits');
        }
    }
);

// Slice
const organicResearchSlice = createSlice({
    name: 'organicResearch',
    initialState,
    reducers: {
        clearError: (state) => {
            state.error = null;
            state.keywordsError = null;
            state.competitorsError = null;
            state.topPagesError = null;
        },
        clearKeywordsError: (state) => {
            state.keywordsError = null;
        },
        clearCompetitorsError: (state) => {
            state.competitorsError = null;
        },
        clearTopPagesError: (state) => {
            state.topPagesError = null;
        },
        setCurrentCountry: (state, action: PayloadAction<string>) => {
            state.currentCountry = action.payload;
        },
        clearAllData: (state) => {
            state.domainAnalysis = null;
            state.organicKeywords = null;
            state.competitors = null;
            state.topPages = null;
            state.currentDomain = null;
            state.error = null;
            state.keywordsError = null;
            state.competitorsError = null;
            state.topPagesError = null;
        },
    },
    extraReducers: (builder) => {
        builder
            // Analyze Domain
            .addCase(analyzeDomain.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(analyzeDomain.fulfilled, (state, action) => {
                state.loading = false;
                state.domainAnalysis = action.payload.response;
                state.currentDomain = action.payload.domain;
                state.currentCountry = action.payload.country;
                state.error = null;
            })
            .addCase(analyzeDomain.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })

            // Fetch Organic Keywords
            .addCase(fetchOrganicKeywords.pending, (state) => {
                state.keywordsLoading = true;
                state.keywordsError = null;
            })
            .addCase(fetchOrganicKeywords.fulfilled, (state, action) => {
                state.keywordsLoading = false;
                state.organicKeywords = action.payload;
                state.keywordsError = null;
            })
            .addCase(fetchOrganicKeywords.rejected, (state, action) => {
                state.keywordsLoading = false;
                state.keywordsError = action.payload as string;
            })

            // Fetch Competitors
            .addCase(fetchCompetitors.pending, (state) => {
                state.competitorsLoading = true;
                state.competitorsError = null;
            })
            .addCase(fetchCompetitors.fulfilled, (state, action) => {
                state.competitorsLoading = false;
                state.competitors = action.payload;
                state.competitorsError = null;
            })
            .addCase(fetchCompetitors.rejected, (state, action) => {
                state.competitorsLoading = false;
                state.competitorsError = action.payload as string;
            })

            // Fetch Top Pages
            .addCase(fetchTopPages.pending, (state) => {
                state.topPagesLoading = true;
                state.topPagesError = null;
            })
            .addCase(fetchTopPages.fulfilled, (state, action) => {
                state.topPagesLoading = false;
                state.topPages = action.payload;
                state.topPagesError = null;
            })
            .addCase(fetchTopPages.rejected, (state, action) => {
                state.topPagesLoading = false;
                state.topPagesError = action.payload as string;
            })

            // Fetch API Limits
            .addCase(fetchApiLimits.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchApiLimits.fulfilled, (state, action) => {
                state.loading = false;
                state.apiLimits = action.payload;
            })
            .addCase(fetchApiLimits.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
    },
});

export const {
    clearError,
    clearKeywordsError,
    clearCompetitorsError,
    clearTopPagesError,
    setCurrentCountry,
    clearAllData,
} = organicResearchSlice.actions;

export default organicResearchSlice.reducer;
