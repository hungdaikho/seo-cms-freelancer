import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import {
    OnPageSEOState,
    OnPageSEOAnalysisRequest,
    OnPageSEOAudit,
    OnPageSEOResults,
    OnPageSEOListResponse,
} from '@/types/on-page-seo.type';
import { onPageSEOService } from '@/services/on-page-seo.service';

// Initial state
const initialState: OnPageSEOState = {
    audits: [],
    currentAudit: null,
    currentResults: null,
    loading: false,
    error: null,
    pagination: {
        page: 1,
        limit: 10,
        total: 0,
        totalPages: 0,
    },
};

// Async thunks
export const startOnPageSEOAnalysis = createAsyncThunk(
    'onPageSEO/startAnalysis',
    async (
        { projectId, request }: { projectId: string; request: OnPageSEOAnalysisRequest },
        { rejectWithValue }
    ) => {
        try {
            const response = await onPageSEOService.startAnalysis(projectId, request);
            return response;
        } catch (error: any) {
            return rejectWithValue(
                error.response?.data?.message || error.message || 'Failed to start analysis'
            );
        }
    }
);

export const fetchAuditStatus = createAsyncThunk(
    'onPageSEO/fetchStatus',
    async (auditId: string, { rejectWithValue }) => {
        try {
            const response = await onPageSEOService.getAuditStatus(auditId);
            return response;
        } catch (error: any) {
            return rejectWithValue(
                error.response?.data?.message || error.message || 'Failed to fetch audit status'
            );
        }
    }
);

export const fetchAuditResults = createAsyncThunk(
    'onPageSEO/fetchResults',
    async (auditId: string, { rejectWithValue }) => {
        try {
            const response = await onPageSEOService.getAuditResults(auditId);
            return response;
        } catch (error: any) {
            return rejectWithValue(
                error.response?.data?.message || error.message || 'Failed to fetch audit results'
            );
        }
    }
);

export const fetchProjectAudits = createAsyncThunk(
    'onPageSEO/fetchProjectAudits',
    async (
        {
            projectId,
            params,
        }: {
            projectId: string;
            params?: {
                page?: number;
                limit?: number;
                sortBy?: string;
                sortOrder?: 'asc' | 'desc';
            };
        },
        { rejectWithValue }
    ) => {
        try {
            const response = await onPageSEOService.getProjectAudits(projectId, params);
            return response;
        } catch (error: any) {
            return rejectWithValue(
                error.response?.data?.message || error.message || 'Failed to fetch project audits'
            );
        }
    }
);

export const deleteAudit = createAsyncThunk(
    'onPageSEO/deleteAudit',
    async (auditId: string, { rejectWithValue }) => {
        try {
            await onPageSEOService.deleteAudit(auditId);
            return auditId;
        } catch (error: any) {
            return rejectWithValue(
                error.response?.data?.message || error.message || 'Failed to delete audit'
            );
        }
    }
);

export const waitForAuditCompletion = createAsyncThunk(
    'onPageSEO/waitForCompletion',
    async (
        { auditId, pollInterval = 5000 }: { auditId: string; pollInterval?: number },
        { rejectWithValue }
    ) => {
        try {
            const response = await onPageSEOService.waitForCompletion(auditId, pollInterval);
            return response;
        } catch (error: any) {
            return rejectWithValue(
                error.response?.data?.message || error.message || 'Analysis failed or timed out'
            );
        }
    }
);

// Slice
const onPageSEOSlice = createSlice({
    name: 'onPageSEO',
    initialState,
    reducers: {
        clearError: (state) => {
            state.error = null;
        },
        clearCurrentResults: (state) => {
            state.currentResults = null;
        },
        clearCurrentAudit: (state) => {
            state.currentAudit = null;
        },
        updateAuditStatus: (state, action: PayloadAction<OnPageSEOAudit>) => {
            const updatedAudit = action.payload;
            const index = state.audits.findIndex((audit) => audit.id === updatedAudit.id);

            if (index !== -1) {
                state.audits[index] = updatedAudit;
            }

            if (state.currentAudit?.id === updatedAudit.id) {
                state.currentAudit = updatedAudit;
            }
        },
    },
    extraReducers: (builder) => {
        builder
            // Start Analysis
            .addCase(startOnPageSEOAnalysis.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(startOnPageSEOAnalysis.fulfilled, (state, action) => {
                state.loading = false;
                state.currentAudit = action.payload;
                state.audits.unshift(action.payload);
            })
            .addCase(startOnPageSEOAnalysis.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })

            // Fetch Status
            .addCase(fetchAuditStatus.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchAuditStatus.fulfilled, (state, action) => {
                state.loading = false;
                state.currentAudit = action.payload;

                // Update in audits list if exists
                const index = state.audits.findIndex((audit) => audit.id === action.payload.id);
                if (index !== -1) {
                    state.audits[index] = action.payload;
                }
            })
            .addCase(fetchAuditStatus.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })

            // Fetch Results
            .addCase(fetchAuditResults.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchAuditResults.fulfilled, (state, action) => {
                state.loading = false;
                state.currentResults = action.payload;
            })
            .addCase(fetchAuditResults.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })

            // Fetch Project Audits
            .addCase(fetchProjectAudits.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchProjectAudits.fulfilled, (state, action) => {
                state.loading = false;
                state.audits = action.payload.audits;
                state.pagination = action.payload.pagination;
            })
            .addCase(fetchProjectAudits.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })

            // Delete Audit
            .addCase(deleteAudit.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(deleteAudit.fulfilled, (state, action) => {
                state.loading = false;
                state.audits = state.audits.filter((audit) => audit.id !== action.payload);

                if (state.currentAudit?.id === action.payload) {
                    state.currentAudit = null;
                }

                if (state.currentResults?.id === action.payload) {
                    state.currentResults = null;
                }
            })
            .addCase(deleteAudit.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })

            // Wait for Completion
            .addCase(waitForAuditCompletion.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(waitForAuditCompletion.fulfilled, (state, action) => {
                state.loading = false;
                state.currentResults = action.payload;

                // Update audit status to completed
                if (state.currentAudit) {
                    state.currentAudit.status = 'completed';
                    state.currentAudit.completedAt = action.payload.completedAt;

                    const index = state.audits.findIndex((audit) => audit.id === state.currentAudit?.id);
                    if (index !== -1) {
                        state.audits[index] = state.currentAudit;
                    }
                }
            })
            .addCase(waitForAuditCompletion.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;

                // Update audit status to failed
                if (state.currentAudit) {
                    state.currentAudit.status = 'failed';

                    const index = state.audits.findIndex((audit) => audit.id === state.currentAudit?.id);
                    if (index !== -1) {
                        state.audits[index] = state.currentAudit;
                    }
                }
            });
    },
});

export const { clearError, clearCurrentResults, clearCurrentAudit, updateAuditStatus } =
    onPageSEOSlice.actions;

export default onPageSEOSlice.reducer;
