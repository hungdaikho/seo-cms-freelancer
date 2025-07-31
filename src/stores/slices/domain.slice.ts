import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import {
    domainService,
    DomainOverview,
    TopKeywordsResponse,
    CompetitorsResponse,
    TopicsResponse,
    DomainAuthority,
    GetDomainOverviewParams,
    GetTopKeywordsParams,
    GetCompetitorsParams,
    GetTopicsParams
} from '../../services/domain.service';

// Async thunks
export const fetchDomainOverview = createAsyncThunk(
    'domain/fetchDomainOverview',
    async (params: GetDomainOverviewParams, { rejectWithValue }) => {
        try {
            const response = await domainService.getDomainOverview(params);
            return response;
        } catch (error: any) {
            return rejectWithValue(error.message || 'Failed to fetch domain overview');
        }
    }
);

export const fetchTopKeywords = createAsyncThunk(
    'domain/fetchTopKeywords',
    async (params: GetTopKeywordsParams, { rejectWithValue }) => {
        try {
            const response = await domainService.getTopKeywords(params);
            return response;
        } catch (error: any) {
            return rejectWithValue(error.message || 'Failed to fetch top keywords');
        }
    }
);

export const fetchCompetitors = createAsyncThunk(
    'domain/fetchCompetitors',
    async (params: GetCompetitorsParams, { rejectWithValue }) => {
        try {
            const response = await domainService.getCompetitors(params);
            return response;
        } catch (error: any) {
            return rejectWithValue(error.message || 'Failed to fetch competitors');
        }
    }
);

export const fetchTopics = createAsyncThunk(
    'domain/fetchTopics',
    async (params: GetTopicsParams, { rejectWithValue }) => {
        try {
            const response = await domainService.getTopics(params);
            return response;
        } catch (error: any) {
            return rejectWithValue(error.message || 'Failed to fetch topics');
        }
    }
);

export const fetchDomainAuthority = createAsyncThunk(
    'domain/fetchDomainAuthority',
    async (domain: string, { rejectWithValue }) => {
        try {
            const response = await domainService.getDomainAuthority(domain);
            return response;
        } catch (error: any) {
            return rejectWithValue(error.message || 'Failed to fetch domain authority');
        }
    }
);

// State interface
export interface DomainState {
    // Domain overview
    overview: DomainOverview | null;
    overviewLoading: boolean;
    overviewError: string | null;

    // Top keywords
    topKeywords: TopKeywordsResponse | null;
    topKeywordsLoading: boolean;
    topKeywordsError: string | null;

    // Competitors
    competitors: CompetitorsResponse | null;
    competitorsLoading: boolean;
    competitorsError: string | null;

    // Topics
    topics: TopicsResponse | null;
    topicsLoading: boolean;
    topicsError: string | null;

    // Domain authority
    authority: DomainAuthority | null;
    authorityLoading: boolean;
    authorityError: string | null;

    // UI state
    selectedDomain: string;
    selectedCountry: string;
    monitoredDomains: string[];
}

const initialState: DomainState = {
    overview: null,
    overviewLoading: false,
    overviewError: null,

    topKeywords: null,
    topKeywordsLoading: false,
    topKeywordsError: null,

    competitors: null,
    competitorsLoading: false,
    competitorsError: null,

    topics: null,
    topicsLoading: false,
    topicsError: null,

    authority: null,
    authorityLoading: false,
    authorityError: null,

    selectedDomain: '',
    selectedCountry: 'US',
    monitoredDomains: [],
};

const domainSlice = createSlice({
    name: 'domain',
    initialState,
    reducers: {
        setSelectedDomain: (state, action: PayloadAction<string>) => {
            state.selectedDomain = action.payload;
        },
        setSelectedCountry: (state, action: PayloadAction<string>) => {
            state.selectedCountry = action.payload;
        },
        addMonitoredDomain: (state, action: PayloadAction<string>) => {
            if (!state.monitoredDomains.includes(action.payload)) {
                state.monitoredDomains.push(action.payload);
            }
        },
        removeMonitoredDomain: (state, action: PayloadAction<string>) => {
            state.monitoredDomains = state.monitoredDomains.filter(
                domain => domain !== action.payload
            );
        },
        clearDomainData: (state) => {
            state.overview = null;
            state.topKeywords = null;
            state.competitors = null;
            state.topics = null;
            state.authority = null;
            state.overviewError = null;
            state.topKeywordsError = null;
            state.competitorsError = null;
            state.topicsError = null;
            state.authorityError = null;
        },
    },
    extraReducers: (builder) => {
        // Domain overview
        builder
            .addCase(fetchDomainOverview.pending, (state) => {
                state.overviewLoading = true;
                state.overviewError = null;
            })
            .addCase(fetchDomainOverview.fulfilled, (state, action) => {
                state.overviewLoading = false;
                state.overview = action.payload;
                state.overviewError = null;
            })
            .addCase(fetchDomainOverview.rejected, (state, action) => {
                state.overviewLoading = false;
                state.overviewError = action.payload as string;
            });

        // Top keywords
        builder
            .addCase(fetchTopKeywords.pending, (state) => {
                state.topKeywordsLoading = true;
                state.topKeywordsError = null;
            })
            .addCase(fetchTopKeywords.fulfilled, (state, action) => {
                state.topKeywordsLoading = false;
                state.topKeywords = action.payload;
                state.topKeywordsError = null;
            })
            .addCase(fetchTopKeywords.rejected, (state, action) => {
                state.topKeywordsLoading = false;
                state.topKeywordsError = action.payload as string;
            });

        // Competitors
        builder
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
            });

        // Topics
        builder
            .addCase(fetchTopics.pending, (state) => {
                state.topicsLoading = true;
                state.topicsError = null;
            })
            .addCase(fetchTopics.fulfilled, (state, action) => {
                state.topicsLoading = false;
                state.topics = action.payload;
                state.topicsError = null;
            })
            .addCase(fetchTopics.rejected, (state, action) => {
                state.topicsLoading = false;
                state.topicsError = action.payload as string;
            });

        // Domain authority
        builder
            .addCase(fetchDomainAuthority.pending, (state) => {
                state.authorityLoading = true;
                state.authorityError = null;
            })
            .addCase(fetchDomainAuthority.fulfilled, (state, action) => {
                state.authorityLoading = false;
                state.authority = action.payload;
                state.authorityError = null;
            })
            .addCase(fetchDomainAuthority.rejected, (state, action) => {
                state.authorityLoading = false;
                state.authorityError = action.payload as string;
            });
    },
});

export const {
    setSelectedDomain,
    setSelectedCountry,
    addMonitoredDomain,
    removeMonitoredDomain,
    clearDomainData,
} = domainSlice.actions;

export default domainSlice.reducer;
