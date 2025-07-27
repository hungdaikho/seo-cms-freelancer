import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';

// Traffic Analytics Types (tạm thời, sẽ mở rộng sau khi có API thực tế)
export interface TrafficData {
    id: string;
    projectId: string;
    date: string;
    pageViews: number;
    uniqueVisitors: number;
    bounceRate: number;
    avgSessionDuration: number;
    organicTraffic: number;
    paidTraffic: number;
    socialTraffic: number;
    referralTraffic: number;
    directTraffic: number;
}

export interface TrafficSource {
    source: string;
    visits: number;
    percentage: number;
    trend: 'up' | 'down' | 'stable';
    change: number;
}

export interface TopPage {
    url: string;
    pageTitle: string;
    pageViews: number;
    uniquePageViews: number;
    avgTimeOnPage: number;
    bounceRate: number;
}

export interface TrafficFilters {
    dateRange: {
        start: string;
        end: string;
    };
    projectId?: string;
    source?: string;
}

// State interface
export interface TrafficState {
    trafficData: TrafficData[];
    trafficSources: TrafficSource[];
    topPages: TopPage[];
    currentData: TrafficData | null;
    loading: boolean;
    error: string | null;
    filters: TrafficFilters;
    totalStats: {
        totalPageViews: number;
        totalUniqueVisitors: number;
        avgBounceRate: number;
        avgSessionDuration: number;
    };
}

// Initial state
const initialState: TrafficState = {
    trafficData: [],
    trafficSources: [],
    topPages: [],
    currentData: null,
    loading: false,
    error: null,
    filters: {
        dateRange: {
            start: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // 30 days ago
            end: new Date().toISOString().split('T')[0], // today
        },
    },
    totalStats: {
        totalPageViews: 0,
        totalUniqueVisitors: 0,
        avgBounceRate: 0,
        avgSessionDuration: 0,
    },
};

// Async thunks (tạm thời mock data, sẽ thay bằng API thực tế)
export const fetchTrafficData = createAsyncThunk(
    'traffic/fetchTrafficData',
    async (params: { projectId: string; filters?: TrafficFilters }, { rejectWithValue }) => {
        try {
            // Mock data - sẽ thay bằng API call thực tế
            await new Promise(resolve => setTimeout(resolve, 1000));

            const mockData: TrafficData[] = Array.from({ length: 30 }, (_, i) => ({
                id: `traffic-${i}`,
                projectId: params.projectId,
                date: new Date(Date.now() - (30 - i) * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
                pageViews: Math.floor(Math.random() * 1000) + 500,
                uniqueVisitors: Math.floor(Math.random() * 800) + 300,
                bounceRate: Math.random() * 0.4 + 0.3, // 30-70%
                avgSessionDuration: Math.random() * 300 + 120, // 2-7 minutes
                organicTraffic: Math.floor(Math.random() * 400) + 200,
                paidTraffic: Math.floor(Math.random() * 200) + 50,
                socialTraffic: Math.floor(Math.random() * 150) + 30,
                referralTraffic: Math.floor(Math.random() * 100) + 20,
                directTraffic: Math.floor(Math.random() * 200) + 100,
            }));

            return mockData;
        } catch (error: any) {
            return rejectWithValue(error.message || 'Failed to fetch traffic data');
        }
    }
);

export const fetchTrafficSources = createAsyncThunk(
    'traffic/fetchTrafficSources',
    async (params: { projectId: string; filters?: TrafficFilters }, { rejectWithValue }) => {
        try {
            // Mock data
            await new Promise(resolve => setTimeout(resolve, 500));

            const mockSources: TrafficSource[] = [
                { source: 'Organic Search', visits: 4500, percentage: 45, trend: 'up', change: 12 },
                { source: 'Direct', visits: 2800, percentage: 28, trend: 'stable', change: 0 },
                { source: 'Social Media', visits: 1200, percentage: 12, trend: 'up', change: 8 },
                { source: 'Paid Search', visits: 900, percentage: 9, trend: 'down', change: -5 },
                { source: 'Referral', visits: 600, percentage: 6, trend: 'up', change: 3 },
            ];

            return mockSources;
        } catch (error: any) {
            return rejectWithValue(error.message || 'Failed to fetch traffic sources');
        }
    }
);

export const fetchTopPages = createAsyncThunk(
    'traffic/fetchTopPages',
    async (params: { projectId: string; filters?: TrafficFilters }, { rejectWithValue }) => {
        try {
            // Mock data
            await new Promise(resolve => setTimeout(resolve, 500));

            const mockPages: TopPage[] = [
                {
                    url: '/blog/seo-tips',
                    pageTitle: '10 Essential SEO Tips for 2025',
                    pageViews: 1500,
                    uniquePageViews: 1200,
                    avgTimeOnPage: 240,
                    bounceRate: 0.35,
                },
                {
                    url: '/tools/keyword-research',
                    pageTitle: 'Free Keyword Research Tool',
                    pageViews: 1200,
                    uniquePageViews: 950,
                    avgTimeOnPage: 180,
                    bounceRate: 0.45,
                },
                {
                    url: '/pricing',
                    pageTitle: 'Pricing Plans',
                    pageViews: 800,
                    uniquePageViews: 720,
                    avgTimeOnPage: 120,
                    bounceRate: 0.25,
                },
                {
                    url: '/about',
                    pageTitle: 'About Us',
                    pageViews: 600,
                    uniquePageViews: 580,
                    avgTimeOnPage: 90,
                    bounceRate: 0.60,
                },
                {
                    url: '/contact',
                    pageTitle: 'Contact Us',
                    pageViews: 400,
                    uniquePageViews: 380,
                    avgTimeOnPage: 60,
                    bounceRate: 0.70,
                },
            ];

            return mockPages;
        } catch (error: any) {
            return rejectWithValue(error.message || 'Failed to fetch top pages');
        }
    }
);

// Slice
const trafficSlice = createSlice({
    name: 'traffic',
    initialState,
    reducers: {
        setFilters: (state, action: PayloadAction<Partial<TrafficFilters>>) => {
            state.filters = { ...state.filters, ...action.payload };
        },
        clearError: (state) => {
            state.error = null;
        },
        resetTrafficState: (state) => {
            return initialState;
        },
    },
    extraReducers: (builder) => {
        // Fetch traffic data
        builder
            .addCase(fetchTrafficData.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchTrafficData.fulfilled, (state, action) => {
                state.loading = false;
                state.trafficData = action.payload;

                // Calculate total stats
                const totalPageViews = action.payload.reduce((sum, item) => sum + item.pageViews, 0);
                const totalUniqueVisitors = action.payload.reduce((sum, item) => sum + item.uniqueVisitors, 0);
                const avgBounceRate = action.payload.reduce((sum, item) => sum + item.bounceRate, 0) / action.payload.length;
                const avgSessionDuration = action.payload.reduce((sum, item) => sum + item.avgSessionDuration, 0) / action.payload.length;

                state.totalStats = {
                    totalPageViews,
                    totalUniqueVisitors,
                    avgBounceRate,
                    avgSessionDuration,
                };
            })
            .addCase(fetchTrafficData.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });

        // Fetch traffic sources
        builder
            .addCase(fetchTrafficSources.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchTrafficSources.fulfilled, (state, action) => {
                state.loading = false;
                state.trafficSources = action.payload;
            })
            .addCase(fetchTrafficSources.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });

        // Fetch top pages
        builder
            .addCase(fetchTopPages.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchTopPages.fulfilled, (state, action) => {
                state.loading = false;
                state.topPages = action.payload;
            })
            .addCase(fetchTopPages.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
    },
});

export const {
    setFilters,
    clearError,
    resetTrafficState,
} = trafficSlice.actions;

export default trafficSlice.reducer;
