import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { trafficAnalyticsService } from '@/services/traffic-analytics.service';
import {
    TrafficAnalyticsState,
    TrafficOverviewRequest,
    PagePerformanceRequest,
    UserBehaviorRequest,
    GoogleAnalyticsIntegration,
} from '@/types/traffic-analytics.type';

// Initial state
const initialState: TrafficAnalyticsState = {
    overview: null,
    pagePerformance: null,
    trafficSources: null,
    userBehavior: null,
    realTime: null,
    loading: {
        overview: false,
        pagePerformance: false,
        trafficSources: false,
        userBehavior: false,
        realTime: false,
        sync: false,
    },
    error: null,
    filters: {
        period: '30d',
        projectId: undefined,
    },
    integration: null,
};

// Async Thunks

// Fetch Traffic Overview
export const fetchTrafficOverview = createAsyncThunk(
    'trafficAnalytics/fetchOverview',
    async (params: { projectId: string; request?: TrafficOverviewRequest }, { rejectWithValue }) => {
        try {
            const response = await trafficAnalyticsService.getTrafficOverview(
                params.projectId,
                params.request
            );
            return response;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || error.message || 'Failed to fetch traffic overview');
        }
    }
);

// Fetch Page Performance
export const fetchPagePerformance = createAsyncThunk(
    'trafficAnalytics/fetchPagePerformance',
    async (params: { projectId: string; request?: PagePerformanceRequest }, { rejectWithValue }) => {
        try {
            const response = await trafficAnalyticsService.getPagePerformance(
                params.projectId,
                params.request
            );
            return response;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || error.message || 'Failed to fetch page performance');
        }
    }
);

// Fetch Traffic Sources
export const fetchTrafficSources = createAsyncThunk(
    'trafficAnalytics/fetchTrafficSources',
    async (params: { projectId: string }, { rejectWithValue }) => {
        try {
            const response = await trafficAnalyticsService.getTrafficSources(params.projectId);
            return response;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || error.message || 'Failed to fetch traffic sources');
        }
    }
);

// Fetch User Behavior
export const fetchUserBehavior = createAsyncThunk(
    'trafficAnalytics/fetchUserBehavior',
    async (params: { projectId: string; request?: UserBehaviorRequest }, { rejectWithValue }) => {
        try {
            const response = await trafficAnalyticsService.getUserBehavior(
                params.projectId,
                params.request
            );
            return response;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || error.message || 'Failed to fetch user behavior');
        }
    }
);

// Fetch Real-time Analytics
export const fetchRealTimeAnalytics = createAsyncThunk(
    'trafficAnalytics/fetchRealTime',
    async (params: { projectId: string }, { rejectWithValue }) => {
        try {
            const response = await trafficAnalyticsService.getRealTimeAnalytics(params.projectId);
            return response;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || error.message || 'Failed to fetch real-time analytics');
        }
    }
);

// Sync Traffic Data
export const syncTrafficData = createAsyncThunk(
    'trafficAnalytics/syncData',
    async (params: { projectId: string }, { rejectWithValue }) => {
        try {
            const response = await trafficAnalyticsService.syncTrafficData(params.projectId);
            return response;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || error.message || 'Failed to sync traffic data');
        }
    }
);

// Setup Google Analytics Integration
export const setupGoogleAnalyticsIntegration = createAsyncThunk(
    'trafficAnalytics/setupIntegration',
    async (params: { integration: GoogleAnalyticsIntegration }, { rejectWithValue }) => {
        try {
            const response = await trafficAnalyticsService.setupGoogleAnalyticsIntegration(params.integration);
            return { response, integration: params.integration };
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || error.message || 'Failed to setup integration');
        }
    }
);

// Get Integration Status
export const getIntegrationStatus = createAsyncThunk(
    'trafficAnalytics/getIntegrationStatus',
    async (params: { projectId: string }, { rejectWithValue }) => {
        try {
            const response = await trafficAnalyticsService.getIntegrationStatus(params.projectId);
            return response;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || error.message || 'Failed to get integration status');
        }
    }
);

// Remove Integration
export const removeIntegration = createAsyncThunk(
    'trafficAnalytics/removeIntegration',
    async (params: { projectId: string }, { rejectWithValue }) => {
        try {
            const response = await trafficAnalyticsService.removeIntegration(params.projectId);
            return response;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || error.message || 'Failed to remove integration');
        }
    }
);

// Traffic Analytics Slice
const trafficAnalyticsSlice = createSlice({
    name: 'trafficAnalytics',
    initialState,
    reducers: {
        // Set filters
        setFilters: (state, action: PayloadAction<Partial<TrafficAnalyticsState['filters']>>) => {
            state.filters = { ...state.filters, ...action.payload };
        },

        // Clear error
        clearError: (state) => {
            state.error = null;
        },

        // Reset state
        resetTrafficAnalytics: () => initialState,

        // Set project ID
        setProjectId: (state, action: PayloadAction<string>) => {
            state.filters.projectId = action.payload;
        },

        // Clear real-time data (for periodic updates)
        clearRealTimeData: (state) => {
            state.realTime = null;
        },
    },
    extraReducers: (builder) => {
        // Traffic Overview
        builder
            .addCase(fetchTrafficOverview.pending, (state) => {
                state.loading.overview = true;
                state.error = null;
            })
            .addCase(fetchTrafficOverview.fulfilled, (state, action) => {
                state.loading.overview = false;
                state.overview = action.payload;
            })
            .addCase(fetchTrafficOverview.rejected, (state, action) => {
                state.loading.overview = false;
                state.error = action.payload as string;
            });

        // Page Performance
        builder
            .addCase(fetchPagePerformance.pending, (state) => {
                state.loading.pagePerformance = true;
                state.error = null;
            })
            .addCase(fetchPagePerformance.fulfilled, (state, action) => {
                state.loading.pagePerformance = false;
                state.pagePerformance = action.payload;
            })
            .addCase(fetchPagePerformance.rejected, (state, action) => {
                state.loading.pagePerformance = false;
                state.error = action.payload as string;
            });

        // Traffic Sources
        builder
            .addCase(fetchTrafficSources.pending, (state) => {
                state.loading.trafficSources = true;
                state.error = null;
            })
            .addCase(fetchTrafficSources.fulfilled, (state, action) => {
                state.loading.trafficSources = false;
                state.trafficSources = action.payload;
            })
            .addCase(fetchTrafficSources.rejected, (state, action) => {
                state.loading.trafficSources = false;
                state.error = action.payload as string;
            });

        // User Behavior
        builder
            .addCase(fetchUserBehavior.pending, (state) => {
                state.loading.userBehavior = true;
                state.error = null;
            })
            .addCase(fetchUserBehavior.fulfilled, (state, action) => {
                state.loading.userBehavior = false;
                state.userBehavior = action.payload;
            })
            .addCase(fetchUserBehavior.rejected, (state, action) => {
                state.loading.userBehavior = false;
                state.error = action.payload as string;
            });

        // Real-time Analytics
        builder
            .addCase(fetchRealTimeAnalytics.pending, (state) => {
                state.loading.realTime = true;
                state.error = null;
            })
            .addCase(fetchRealTimeAnalytics.fulfilled, (state, action) => {
                state.loading.realTime = false;
                state.realTime = action.payload;
            })
            .addCase(fetchRealTimeAnalytics.rejected, (state, action) => {
                state.loading.realTime = false;
                state.error = action.payload as string;
            });

        // Sync Data
        builder
            .addCase(syncTrafficData.pending, (state) => {
                state.loading.sync = true;
                state.error = null;
            })
            .addCase(syncTrafficData.fulfilled, (state) => {
                state.loading.sync = false;
                // Optionally trigger a refresh of data after sync
            })
            .addCase(syncTrafficData.rejected, (state, action) => {
                state.loading.sync = false;
                state.error = action.payload as string;
            });

        // Setup Integration
        builder
            .addCase(setupGoogleAnalyticsIntegration.pending, (state) => {
                state.loading.sync = true;
                state.error = null;
            })
            .addCase(setupGoogleAnalyticsIntegration.fulfilled, (state, action) => {
                state.loading.sync = false;
                state.integration = action.payload.integration;
            })
            .addCase(setupGoogleAnalyticsIntegration.rejected, (state, action) => {
                state.loading.sync = false;
                state.error = action.payload as string;
            });

        // Get Integration Status
        builder
            .addCase(getIntegrationStatus.fulfilled, (state, action) => {
                // Update integration status if needed
            });

        // Remove Integration
        builder
            .addCase(removeIntegration.fulfilled, (state) => {
                state.integration = null;
            });
    },
});

// Export actions
export const {
    setFilters,
    clearError,
    resetTrafficAnalytics,
    setProjectId,
    clearRealTimeData,
} = trafficAnalyticsSlice.actions;

// Export reducer
export default trafficAnalyticsSlice.reducer;

// Selectors
export const selectTrafficOverview = (state: { trafficAnalytics: TrafficAnalyticsState | any }) =>
    state.trafficAnalytics.overview;

export const selectPagePerformance = (state: { trafficAnalytics: TrafficAnalyticsState | any }) =>
    state.trafficAnalytics.pagePerformance;

export const selectTrafficSources = (state: { trafficAnalytics: TrafficAnalyticsState | any }) =>
    state.trafficAnalytics.trafficSources;

export const selectUserBehavior = (state: { trafficAnalytics: TrafficAnalyticsState | any }) =>
    state.trafficAnalytics.userBehavior;

export const selectRealTimeAnalytics = (state: { trafficAnalytics: TrafficAnalyticsState | any }) =>
    state.trafficAnalytics.realTime;

export const selectTrafficAnalyticsLoading = (state: { trafficAnalytics: TrafficAnalyticsState | any }) =>
    state.trafficAnalytics.loading;

export const selectTrafficAnalyticsError = (state: { trafficAnalytics: TrafficAnalyticsState | any }) =>
    state.trafficAnalytics.error;

export const selectTrafficAnalyticsFilters = (state: { trafficAnalytics: TrafficAnalyticsState | any }) =>
    state.trafficAnalytics.filters;

export const selectIntegrationStatus = (state: { trafficAnalytics: TrafficAnalyticsState | any }) =>
    state.trafficAnalytics.integration;
