import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { 
    projectService, 
    Project, 
    ProjectsListResponse, 
    ProjectStats, 
    CreateProjectRequest,
    UpdateProjectRequest,
    ProjectsListParams
} from '@/services/project.service';

// Async Thunks
export const fetchProjects = createAsyncThunk(
    'projects/fetchProjects',
    async (params: ProjectsListParams | undefined, { rejectWithValue }) => {
        try {
            const response = await projectService.getProjects(params);
            return response;
        } catch (error: any) {
            return rejectWithValue(error.message || 'Failed to fetch projects');
        }
    }
);

export const fetchProjectDetails = createAsyncThunk(
    'projects/fetchProjectDetails',
    async (projectId: string, { rejectWithValue }) => {
        try {
            const response = await projectService.getProjectDetails(projectId);
            return response;
        } catch (error: any) {
            return rejectWithValue(error.message || 'Failed to fetch project details');
        }
    }
);

export const fetchProjectStats = createAsyncThunk(
    'projects/fetchProjectStats',
    async (projectId: string, { rejectWithValue }) => {
        try {
            const response = await projectService.getProjectStats(projectId);
            return { projectId, stats: response };
        } catch (error: any) {
            return rejectWithValue(error.message || 'Failed to fetch project stats');
        }
    }
);

export const createProject = createAsyncThunk(
    'projects/createProject',
    async (data: CreateProjectRequest, { rejectWithValue }) => {
        try {
            const response = await projectService.createProject(data);
            return response;
        } catch (error: any) {
            return rejectWithValue(error.message || 'Failed to create project');
        }
    }
);

export const updateProject = createAsyncThunk(
    'projects/updateProject',
    async ({ id, data }: { id: string; data: UpdateProjectRequest }, { rejectWithValue }) => {
        try {
            const response = await projectService.updateProject(id, data);
            return response;
        } catch (error: any) {
            return rejectWithValue(error.message || 'Failed to update project');
        }
    }
);

export const deleteProject = createAsyncThunk(
    'projects/deleteProject',
    async (projectId: string, { rejectWithValue }) => {
        try {
            await projectService.deleteProject(projectId);
            return projectId;
        } catch (error: any) {
            return rejectWithValue(error.message || 'Failed to delete project');
        }
    }
);

export const fetchProjectsWithStats = createAsyncThunk(
    'projects/fetchProjectsWithStats',
    async (_, { rejectWithValue }) => {
        try {
            const response = await projectService.getProjectsWithStats();
            return response;
        } catch (error: any) {
            return rejectWithValue(error.message || 'Failed to fetch projects with stats');
        }
    }
);

// Types for slice state
interface ProjectsState {
    projects: Project[];
    projectsWithStats: Array<Project & { stats?: ProjectStats }>;
    currentProject: Project | null;
    projectStats: Record<string, ProjectStats>;
    pagination: {
        total: number;
        page: number;
        limit: number;
        totalPages: number;
    };
    loading: {
        fetchProjects: boolean;
        fetchProjectDetails: boolean;
        fetchProjectStats: boolean;
        createProject: boolean;
        updateProject: boolean;
        deleteProject: boolean;
        fetchProjectsWithStats: boolean;
    };
    error: {
        fetchProjects: string | null;
        fetchProjectDetails: string | null;
        fetchProjectStats: string | null;
        createProject: string | null;
        updateProject: string | null;
        deleteProject: string | null;
        fetchProjectsWithStats: string | null;
    };
    filters: {
        search: string;
        sortBy: string;
        sortOrder: 'asc' | 'desc';
    };
}

const initialState: ProjectsState = {
    projects: [],
    projectsWithStats: [],
    currentProject: null,
    projectStats: {},
    pagination: {
        total: 0,
        page: 1,
        limit: 10,
        totalPages: 0,
    },
    loading: {
        fetchProjects: false,
        fetchProjectDetails: false,
        fetchProjectStats: false,
        createProject: false,
        updateProject: false,
        deleteProject: false,
        fetchProjectsWithStats: false,
    },
    error: {
        fetchProjects: null,
        fetchProjectDetails: null,
        fetchProjectStats: null,
        createProject: null,
        updateProject: null,
        deleteProject: null,
        fetchProjectsWithStats: null,
    },
    filters: {
        search: '',
        sortBy: 'createdAt',
        sortOrder: 'desc',
    },
};

const projectsSlice = createSlice({
    name: 'projects',
    initialState,
    reducers: {
        setFilters: (state, action: PayloadAction<Partial<ProjectsState['filters']>>) => {
            state.filters = { ...state.filters, ...action.payload };
        },
        clearCurrentProject: (state) => {
            state.currentProject = null;
        },
        clearErrors: (state) => {
            state.error = {
                fetchProjects: null,
                fetchProjectDetails: null,
                fetchProjectStats: null,
                createProject: null,
                updateProject: null,
                deleteProject: null,
                fetchProjectsWithStats: null,
            };
        },
        setPagination: (state, action: PayloadAction<Partial<ProjectsState['pagination']>>) => {
            state.pagination = { ...state.pagination, ...action.payload };
        },
    },
    extraReducers: (builder) => {
        // Fetch Projects
        builder
            .addCase(fetchProjects.pending, (state) => {
                state.loading.fetchProjects = true;
                state.error.fetchProjects = null;
            })
            .addCase(fetchProjects.fulfilled, (state, action) => {
                state.loading.fetchProjects = false;
                state.projects = action.payload.data;
                state.pagination = {
                    total: action.payload.total,
                    page: action.payload.page,
                    limit: action.payload.limit,
                    totalPages: action.payload.totalPages,
                };
            })
            .addCase(fetchProjects.rejected, (state, action) => {
                state.loading.fetchProjects = false;
                state.error.fetchProjects = action.payload as string;
            });

        // Fetch Project Details
        builder
            .addCase(fetchProjectDetails.pending, (state) => {
                state.loading.fetchProjectDetails = true;
                state.error.fetchProjectDetails = null;
            })
            .addCase(fetchProjectDetails.fulfilled, (state, action) => {
                state.loading.fetchProjectDetails = false;
                state.currentProject = action.payload;
            })
            .addCase(fetchProjectDetails.rejected, (state, action) => {
                state.loading.fetchProjectDetails = false;
                state.error.fetchProjectDetails = action.payload as string;
            });

        // Fetch Project Stats
        builder
            .addCase(fetchProjectStats.pending, (state) => {
                state.loading.fetchProjectStats = true;
                state.error.fetchProjectStats = null;
            })
            .addCase(fetchProjectStats.fulfilled, (state, action) => {
                state.loading.fetchProjectStats = false;
                state.projectStats[action.payload.projectId] = action.payload.stats;
            })
            .addCase(fetchProjectStats.rejected, (state, action) => {
                state.loading.fetchProjectStats = false;
                state.error.fetchProjectStats = action.payload as string;
            });

        // Create Project
        builder
            .addCase(createProject.pending, (state) => {
                state.loading.createProject = true;
                state.error.createProject = null;
            })
            .addCase(createProject.fulfilled, (state, action) => {
                state.loading.createProject = false;
                state.projects.unshift(action.payload);
                state.pagination.total += 1;
            })
            .addCase(createProject.rejected, (state, action) => {
                state.loading.createProject = false;
                state.error.createProject = action.payload as string;
            });

        // Update Project
        builder
            .addCase(updateProject.pending, (state) => {
                state.loading.updateProject = true;
                state.error.updateProject = null;
            })
            .addCase(updateProject.fulfilled, (state, action) => {
                state.loading.updateProject = false;
                const index = state.projects.findIndex(p => p.id === action.payload.id);
                if (index !== -1) {
                    state.projects[index] = action.payload;
                }
                if (state.currentProject?.id === action.payload.id) {
                    state.currentProject = action.payload;
                }
            })
            .addCase(updateProject.rejected, (state, action) => {
                state.loading.updateProject = false;
                state.error.updateProject = action.payload as string;
            });

        // Delete Project
        builder
            .addCase(deleteProject.pending, (state) => {
                state.loading.deleteProject = true;
                state.error.deleteProject = null;
            })
            .addCase(deleteProject.fulfilled, (state, action) => {
                state.loading.deleteProject = false;
                state.projects = state.projects.filter(p => p.id !== action.payload);
                state.projectsWithStats = state.projectsWithStats.filter(p => p.id !== action.payload);
                delete state.projectStats[action.payload];
                state.pagination.total = Math.max(0, state.pagination.total - 1);
                if (state.currentProject?.id === action.payload) {
                    state.currentProject = null;
                }
            })
            .addCase(deleteProject.rejected, (state, action) => {
                state.loading.deleteProject = false;
                state.error.deleteProject = action.payload as string;
            });

        // Fetch Projects With Stats
        builder
            .addCase(fetchProjectsWithStats.pending, (state) => {
                state.loading.fetchProjectsWithStats = true;
                state.error.fetchProjectsWithStats = null;
            })
            .addCase(fetchProjectsWithStats.fulfilled, (state, action) => {
                state.loading.fetchProjectsWithStats = false;
                state.projectsWithStats = action.payload;
                // Update individual stats cache
                action.payload.forEach(project => {
                    if (project.stats) {
                        state.projectStats[project.id] = project.stats;
                    }
                });
            })
            .addCase(fetchProjectsWithStats.rejected, (state, action) => {
                state.loading.fetchProjectsWithStats = false;
                state.error.fetchProjectsWithStats = action.payload as string;
            });
    },
});

export const { 
    setFilters, 
    clearCurrentProject, 
    clearErrors, 
    setPagination 
} = projectsSlice.actions;

export default projectsSlice.reducer;

// Selectors
export const selectProjects = (state: { projects: ProjectsState }) => state.projects.projects;
export const selectProjectsWithStats = (state: { projects: ProjectsState }) => state.projects.projectsWithStats;
export const selectCurrentProject = (state: { projects: ProjectsState }) => state.projects.currentProject;
export const selectProjectStats = (state: { projects: ProjectsState }) => state.projects.projectStats;
export const selectProjectsPagination = (state: { projects: ProjectsState }) => state.projects.pagination;
export const selectProjectsLoading = (state: { projects: ProjectsState }) => state.projects.loading;
export const selectProjectsError = (state: { projects: ProjectsState }) => state.projects.error;
export const selectProjectsFilters = (state: { projects: ProjectsState }) => state.projects.filters;