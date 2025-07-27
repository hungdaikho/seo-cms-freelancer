import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import {
    Project,
    CreateProjectRequest,
    UpdateProjectRequest,
    ProjectStats,
    PaginationParams,
    ApiResponse
} from '@/types/api.type';
import { seoService } from '@/services/seo.service';

// State interface
export interface ProjectState {
    projects: Project[];
    currentProject: Project | null;
    projectStats: ProjectStats | null;
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
const initialState: ProjectState = {
    projects: [], // Start with mock data
    currentProject: null,
    projectStats: null,
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
export const createProject = createAsyncThunk(
    'project/create',
    async (data: CreateProjectRequest, { rejectWithValue }) => {
        try {
            const project = await seoService.createProject(data);
            return project;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || 'Failed to create project');
        }
    }
);

export const fetchProjects = createAsyncThunk(
    'project/fetchAll',
    async (params: PaginationParams | undefined, { rejectWithValue }) => {
        try {
            const response = await seoService.getProjects(params);
            return response;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || 'Failed to fetch projects');
        }
    }
);

export const fetchProjectById = createAsyncThunk(
    'project/fetchById',
    async (projectId: string, { rejectWithValue }) => {
        try {
            const project = await seoService.getProjectById(projectId);
            return project;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || 'Failed to fetch project');
        }
    }
);

export const updateProject = createAsyncThunk(
    'project/update',
    async ({ projectId, data }: { projectId: string; data: UpdateProjectRequest }, { rejectWithValue }) => {
        try {
            const project = await seoService.updateProject(projectId, data);
            return project;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || 'Failed to update project');
        }
    }
);

export const deleteProject = createAsyncThunk(
    'project/delete',
    async (projectId: string, { rejectWithValue }) => {
        try {
            await seoService.deleteProject(projectId);
            return projectId;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || 'Failed to delete project');
        }
    }
);

export const fetchProjectStats = createAsyncThunk(
    'project/fetchStats',
    async (projectId: string, { rejectWithValue }) => {
        try {
            const stats = await seoService.getProjectStats(projectId);
            return stats;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || 'Failed to fetch project stats');
        }
    }
);

// Slice
const projectSlice = createSlice({
    name: 'project',
    initialState,
    reducers: {
        clearError: (state) => {
            state.error = null;
        },
        setCurrentProject: (state, action: PayloadAction<Project | null>) => {
            state.currentProject = action.payload;
        },
        clearCurrentProject: (state) => {
            state.currentProject = null;
            state.projectStats = null;
        },
    },
    extraReducers: (builder) => {
        // Create project
        builder
            .addCase(createProject.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(createProject.fulfilled, (state, action) => {
                state.loading = false;
                state.projects.unshift(action.payload);
                state.currentProject = action.payload;
            })
            .addCase(createProject.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });

        // Fetch projects
        builder
            .addCase(fetchProjects.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchProjects.fulfilled, (state, action) => {
                state.loading = false;
                state.projects = action.payload.data;
                state.pagination = {
                    total: action.payload.total || 0,
                    page: action.payload.page || 1,
                    limit: action.payload.limit || 10,
                    totalPages: action.payload.totalPages || 0,
                };
            })
            .addCase(fetchProjects.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });

        // Fetch project by ID
        builder
            .addCase(fetchProjectById.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchProjectById.fulfilled, (state, action) => {
                state.loading = false;
                state.currentProject = action.payload;
            })
            .addCase(fetchProjectById.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });

        // Update project
        builder
            .addCase(updateProject.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateProject.fulfilled, (state, action) => {
                state.loading = false;
                const index = state.projects.findIndex(p => p.id === action.payload.id);
                if (index !== -1) {
                    state.projects[index] = action.payload;
                }
                if (state.currentProject?.id === action.payload.id) {
                    state.currentProject = action.payload;
                }
            })
            .addCase(updateProject.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });

        // Delete project
        builder
            .addCase(deleteProject.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(deleteProject.fulfilled, (state, action) => {
                state.loading = false;
                state.projects = state.projects.filter(p => p.id !== action.payload);
                if (state.currentProject?.id === action.payload) {
                    state.currentProject = null;
                    state.projectStats = null;
                }
            })
            .addCase(deleteProject.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });

        // Fetch project stats
        builder
            .addCase(fetchProjectStats.pending, (state) => {
                state.error = null;
            })
            .addCase(fetchProjectStats.fulfilled, (state, action) => {
                state.projectStats = action.payload;
            })
            .addCase(fetchProjectStats.rejected, (state, action) => {
                state.error = action.payload as string;
            });
    },
});

export const { clearError, setCurrentProject, clearCurrentProject } = projectSlice.actions;
export default projectSlice.reducer;
