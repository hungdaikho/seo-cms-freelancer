import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import {
    Backlink,
    BacklinkAnalytics,
    BacklinkProfile,
    CreateBacklinkRequest,
    UpdateBacklinkRequest,
    BacklinksResponse,
    BacklinkQueryParams,
} from '@/types/backlink.type';
import { backlinkService } from '@/services/backlink.service';

// State interface
export interface BacklinkState {
    backlinks: Backlink[];
    backlinkProfile: BacklinkProfile | null;
    analytics: BacklinkAnalytics | null;
    selectedBacklink: Backlink | null;
    loading: boolean;
    analyticsLoading: boolean;
    profileLoading: boolean;
    error: string | null;
    pagination: {
        total: number;
        page: number;
        limit: number;
        totalPages: number;
    };
    filters: {
        searchTerm: string;
        linkType: string;
        linkStatus: string;
        startDate?: string;
        endDate?: string;
    };
}

// Initial state
const initialState: BacklinkState = {
    backlinks: [],
    backlinkProfile: null,
    analytics: null,
    selectedBacklink: null,
    loading: false,
    analyticsLoading: false,
    profileLoading: false,
    error: null,
    pagination: {
        total: 0,
        page: 1,
        limit: 50,
        totalPages: 0,
    },
    filters: {
        searchTerm: '',
        linkType: 'all',
        linkStatus: 'all',
    },
};

// Async thunks
export const fetchProjectBacklinks = createAsyncThunk(
    'backlink/fetchProjectBacklinks',
    async (
        { projectId, params }: { projectId: string; params?: BacklinkQueryParams },
        { rejectWithValue }
    ) => {
        try {
            const response = await backlinkService.getProjectBacklinks(projectId, params);
            return response;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || 'Failed to fetch backlinks');
        }
    }
);

export const fetchBacklinkAnalytics = createAsyncThunk(
    'backlink/fetchBacklinkAnalytics',
    async (
        { projectId, params }: { projectId: string; params?: BacklinkQueryParams },
        { rejectWithValue }
    ) => {
        try {
            const analytics = await backlinkService.getBacklinkAnalytics(projectId, params);
            return analytics;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || 'Failed to fetch analytics');
        }
    }
);

export const fetchBacklinkProfile = createAsyncThunk(
    'backlink/fetchBacklinkProfile',
    async (
        { projectId, params }: { projectId: string; params?: BacklinkQueryParams },
        { rejectWithValue }
    ) => {
        try {
            const profile = await backlinkService.getBacklinkProfile(projectId, params);
            return profile;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || 'Failed to fetch backlink profile');
        }
    }
);

export const addBacklink = createAsyncThunk(
    'backlink/addBacklink',
    async (
        { projectId, data }: { projectId: string; data: CreateBacklinkRequest },
        { rejectWithValue }
    ) => {
        try {
            const backlink = await backlinkService.addBacklink(projectId, data);
            return backlink;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || 'Failed to add backlink');
        }
    }
);

export const updateBacklink = createAsyncThunk(
    'backlink/updateBacklink',
    async (
        {
            projectId,
            backlinkId,
            data,
        }: {
            projectId: string;
            backlinkId: string;
            data: UpdateBacklinkRequest;
        },
        { rejectWithValue }
    ) => {
        try {
            const backlink = await backlinkService.updateBacklink(projectId, backlinkId, data);
            return backlink;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || 'Failed to update backlink');
        }
    }
);

export const deleteBacklink = createAsyncThunk(
    'backlink/deleteBacklink',
    async (
        { projectId, backlinkId }: { projectId: string; backlinkId: string },
        { rejectWithValue }
    ) => {
        try {
            await backlinkService.deleteBacklink(projectId, backlinkId);
            return backlinkId;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || 'Failed to delete backlink');
        }
    }
);

export const bulkDeleteBacklinks = createAsyncThunk(
    'backlink/bulkDeleteBacklinks',
    async (
        { projectId, backlinkIds }: { projectId: string; backlinkIds: string[] },
        { rejectWithValue }
    ) => {
        try {
            const result = await backlinkService.bulkDeleteBacklinks(projectId, backlinkIds);
            return { backlinkIds, result };
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || 'Failed to delete backlinks');
        }
    }
);

export const fetchBacklinkDetails = createAsyncThunk(
    'backlink/fetchBacklinkDetails',
    async (
        { projectId, backlinkId }: { projectId: string; backlinkId: string },
        { rejectWithValue }
    ) => {
        try {
            const backlink = await backlinkService.getBacklinkDetails(projectId, backlinkId);
            return backlink;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || 'Failed to fetch backlink details');
        }
    }
);

// Slice
const backlinkSlice = createSlice({
    name: 'backlink',
    initialState,
    reducers: {
        clearError: (state) => {
            state.error = null;
        },
        setFilters: (state, action: PayloadAction<Partial<BacklinkState['filters']>>) => {
            state.filters = { ...state.filters, ...action.payload };
        },
        setPagination: (state, action: PayloadAction<Partial<BacklinkState['pagination']>>) => {
            state.pagination = { ...state.pagination, ...action.payload };
        },
        clearSelectedBacklink: (state) => {
            state.selectedBacklink = null;
        },
        resetBacklinkState: (state) => {
            return initialState;
        },
    },
    extraReducers: (builder) => {
        // Fetch project backlinks
        builder
            .addCase(fetchProjectBacklinks.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchProjectBacklinks.fulfilled, (state, action) => {
                state.loading = false;
                state.backlinks = action.payload.data;
                state.pagination = action.payload.pagination;
            })
            .addCase(fetchProjectBacklinks.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });

        // Fetch backlink analytics
        builder
            .addCase(fetchBacklinkAnalytics.pending, (state) => {
                state.analyticsLoading = true;
                state.error = null;
            })
            .addCase(fetchBacklinkAnalytics.fulfilled, (state, action) => {
                state.analyticsLoading = false;
                state.analytics = action.payload;
            })
            .addCase(fetchBacklinkAnalytics.rejected, (state, action) => {
                state.analyticsLoading = false;
                state.error = action.payload as string;
            });

        // Fetch backlink profile
        builder
            .addCase(fetchBacklinkProfile.pending, (state) => {
                state.profileLoading = true;
                state.error = null;
            })
            .addCase(fetchBacklinkProfile.fulfilled, (state, action) => {
                state.profileLoading = false;
                state.backlinkProfile = action.payload;
            })
            .addCase(fetchBacklinkProfile.rejected, (state, action) => {
                state.profileLoading = false;
                state.error = action.payload as string;
            });

        // Add backlink
        builder
            .addCase(addBacklink.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(addBacklink.fulfilled, (state, action) => {
                state.loading = false;
                state.backlinks.unshift(action.payload);
                state.pagination.total += 1;
            })
            .addCase(addBacklink.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });

        // Update backlink
        builder
            .addCase(updateBacklink.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateBacklink.fulfilled, (state, action) => {
                state.loading = false;
                const index = state.backlinks.findIndex(b => b.id === action.payload.id);
                if (index !== -1) {
                    state.backlinks[index] = action.payload;
                }
                if (state.selectedBacklink?.id === action.payload.id) {
                    state.selectedBacklink = action.payload;
                }
            })
            .addCase(updateBacklink.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });

        // Delete backlink
        builder
            .addCase(deleteBacklink.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(deleteBacklink.fulfilled, (state, action) => {
                state.loading = false;
                state.backlinks = state.backlinks.filter(b => b.id !== action.payload);
                state.pagination.total -= 1;
                if (state.selectedBacklink?.id === action.payload) {
                    state.selectedBacklink = null;
                }
            })
            .addCase(deleteBacklink.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });

        // Bulk delete backlinks
        builder
            .addCase(bulkDeleteBacklinks.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(bulkDeleteBacklinks.fulfilled, (state, action) => {
                state.loading = false;
                const { backlinkIds } = action.payload;
                state.backlinks = state.backlinks.filter(b => !backlinkIds.includes(b.id));
                state.pagination.total -= backlinkIds.length;
            })
            .addCase(bulkDeleteBacklinks.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });

        // Fetch backlink details
        builder
            .addCase(fetchBacklinkDetails.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchBacklinkDetails.fulfilled, (state, action) => {
                state.loading = false;
                state.selectedBacklink = action.payload;
            })
            .addCase(fetchBacklinkDetails.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
    },
});

export const {
    clearError,
    setFilters,
    setPagination,
    clearSelectedBacklink,
    resetBacklinkState,
} = backlinkSlice.actions;

export default backlinkSlice.reducer;
