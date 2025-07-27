import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import {
    Audit,
    CreateAuditRequest,
    AuditResults,
    PaginationParams,
    ApiResponse
} from '@/types/api.type';
import { seoService } from '@/services/seo.service';

// State interface
export interface AuditState {
    audits: Audit[];
    currentAudit: Audit | null;
    auditResults: AuditResults | null;
    auditSummary: any | null;
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
const initialState: AuditState = {
    audits: [],
    currentAudit: null,
    auditResults: null,
    auditSummary: null,
    loading: false,
    error: null,
    pagination: {
        total: 0,
        page: 1,
        limit: 10,
        totalPages: 0,
    },
};

// Async thunks
export const startNewAudit = createAsyncThunk(
    'audit/startNew',
    async ({ projectId, data }: { projectId: string; data?: CreateAuditRequest }, { rejectWithValue }) => {
        try {
            const audit = await seoService.startNewAudit(projectId, data);
            return audit;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || 'Failed to start audit');
        }
    }
);

export const fetchProjectAudits = createAsyncThunk(
    'audit/fetchProjectAudits',
    async ({ projectId, params }: { projectId: string; params?: PaginationParams }, { rejectWithValue }) => {
        try {
            const response = await seoService.getProjectAudits(projectId, params);
            return response;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || 'Failed to fetch audits');
        }
    }
);

export const fetchAuditById = createAsyncThunk(
    'audit/fetchById',
    async (auditId: string, { rejectWithValue }) => {
        try {
            const audit = await seoService.getAuditById(auditId);
            return audit;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || 'Failed to fetch audit');
        }
    }
);

export const fetchAuditResults = createAsyncThunk(
    'audit/fetchResults',
    async (auditId: string, { rejectWithValue }) => {
        try {
            const results = await seoService.getAuditResults(auditId);
            return results;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || 'Failed to fetch audit results');
        }
    }
);

export const fetchAuditSummary = createAsyncThunk(
    'audit/fetchSummary',
    async (projectId: string, { rejectWithValue }) => {
        try {
            const summary = await seoService.getAuditSummary(projectId);
            return summary;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || 'Failed to fetch audit summary');
        }
    }
);

export const deleteAudit = createAsyncThunk(
    'audit/delete',
    async (auditId: string, { rejectWithValue }) => {
        try {
            await seoService.deleteAudit(auditId);
            return auditId;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || 'Failed to delete audit');
        }
    }
);

// Slice
const auditSlice = createSlice({
    name: 'audit',
    initialState,
    reducers: {
        clearError: (state) => {
            state.error = null;
        },
        setCurrentAudit: (state, action: PayloadAction<Audit | null>) => {
            state.currentAudit = action.payload;
        },
        clearCurrentAudit: (state) => {
            state.currentAudit = null;
            state.auditResults = null;
        },
        clearAudits: (state) => {
            state.audits = [];
            state.pagination = initialState.pagination;
        },
    },
    extraReducers: (builder) => {
        // Start new audit
        builder
            .addCase(startNewAudit.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(startNewAudit.fulfilled, (state, action) => {
                state.loading = false;
                state.audits.unshift(action.payload);
                state.currentAudit = action.payload;
            })
            .addCase(startNewAudit.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });

        // Fetch project audits
        builder
            .addCase(fetchProjectAudits.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchProjectAudits.fulfilled, (state, action) => {
                state.loading = false;
                state.audits = action.payload.data;
                state.pagination = {
                    total: action.payload.total || 0,
                    page: action.payload.page || 1,
                    limit: action.payload.limit || 10,
                    totalPages: action.payload.totalPages || 0,
                };
            })
            .addCase(fetchProjectAudits.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });

        // Fetch audit by ID
        builder
            .addCase(fetchAuditById.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchAuditById.fulfilled, (state, action) => {
                state.loading = false;
                state.currentAudit = action.payload;
            })
            .addCase(fetchAuditById.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });

        // Fetch audit results
        builder
            .addCase(fetchAuditResults.pending, (state) => {
                state.error = null;
            })
            .addCase(fetchAuditResults.fulfilled, (state, action) => {
                state.auditResults = action.payload;
            })
            .addCase(fetchAuditResults.rejected, (state, action) => {
                state.error = action.payload as string;
            });

        // Fetch audit summary
        builder
            .addCase(fetchAuditSummary.pending, (state) => {
                state.error = null;
            })
            .addCase(fetchAuditSummary.fulfilled, (state, action) => {
                state.auditSummary = action.payload;
            })
            .addCase(fetchAuditSummary.rejected, (state, action) => {
                state.error = action.payload as string;
            });

        // Delete audit
        builder
            .addCase(deleteAudit.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(deleteAudit.fulfilled, (state, action) => {
                state.loading = false;
                state.audits = state.audits.filter(a => a.id !== action.payload);
                if (state.currentAudit?.id === action.payload) {
                    state.currentAudit = null;
                    state.auditResults = null;
                }
            })
            .addCase(deleteAudit.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
    },
});

export const { clearError, setCurrentAudit, clearCurrentAudit, clearAudits } = auditSlice.actions;
export default auditSlice.reducer;
