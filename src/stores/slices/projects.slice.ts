import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import {
    projectService,
    Project,
    ProjectsListResponse,
    ProjectStats,
    CreateProjectRequest,
    UpdateProjectRequest,
    ProjectsListParams,
    SharedProject,
    SharedProjectsSearchResponse,
    SharedProjectsSearchParams,
    ProjectMembership,
    AppliedProjectsResponse,
    ApplyToProjectRequest,
    ToggleSharingRequest,
    ToggleSharingResponse,
    ProjectMember,
    ProjectMembersResponse
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

// Project Sharing Async Thunks
export const searchSharedProjects = createAsyncThunk(
    'projects/searchSharedProjects',
    async (params: SharedProjectsSearchParams | undefined, { rejectWithValue }) => {
        try {
            const response = await projectService.searchSharedProjects(params);
            return response;
        } catch (error: any) {
            return rejectWithValue(error.message || 'Failed to search shared projects');
        }
    }
);

export const applyToProject = createAsyncThunk(
    'projects/applyToProject',
    async (data: ApplyToProjectRequest, { rejectWithValue }) => {
        try {
            const response = await projectService.applyToProject(data);
            return response;
        } catch (error: any) {
            return rejectWithValue(error.message || 'Failed to apply to project');
        }
    }
);

export const fetchAppliedProjects = createAsyncThunk(
    'projects/fetchAppliedProjects',
    async (params: ProjectsListParams | undefined, { rejectWithValue }) => {
        try {
            const response = await projectService.getAppliedProjects(params);
            return response;
        } catch (error: any) {
            return rejectWithValue(error.message || 'Failed to fetch applied projects');
        }
    }
);

export const leaveAppliedProject = createAsyncThunk(
    'projects/leaveAppliedProject',
    async (projectId: string, { rejectWithValue }) => {
        try {
            const response = await projectService.leaveAppliedProject(projectId);
            return { projectId, message: response.message };
        } catch (error: any) {
            return rejectWithValue(error.message || 'Failed to leave project');
        }
    }
);

export const toggleProjectSharing = createAsyncThunk(
    'projects/toggleProjectSharing',
    async ({ id, data }: { id: string; data: ToggleSharingRequest }, { rejectWithValue }) => {
        try {
            const response = await projectService.toggleProjectSharing(id, data);
            return response;
        } catch (error: any) {
            return rejectWithValue(error.message || 'Failed to toggle project sharing');
        }
    }
);

export const fetchProjectMembers = createAsyncThunk(
    'projects/fetchProjectMembers',
    async (projectId: string, { rejectWithValue }) => {
        try {
            const response = await projectService.getProjectMembers(projectId);
            return { projectId, members: response };
        } catch (error: any) {
            return rejectWithValue(error.message || 'Failed to fetch project members');
        }
    }
);

export const removeProjectMember = createAsyncThunk(
    'projects/removeProjectMember',
    async ({ projectId, memberId }: { projectId: string; memberId: string }, { rejectWithValue }) => {
        try {
            const response = await projectService.removeProjectMember(projectId, memberId);
            return { projectId, memberId, message: response.message };
        } catch (error: any) {
            return rejectWithValue(error.message || 'Failed to remove project member');
        }
    }
);

// Types for slice state
interface ProjectsState {
    projects: Project[];
    projectsWithStats: Array<Project & { stats?: ProjectStats }>;
    currentProject: Project | null;
    projectStats: Record<string, ProjectStats>;

    // Shared Projects
    sharedProjects: SharedProject[];
    sharedProjectsPagination: {
        total: number;
        page: number;
        limit: number;
        totalPages: number;
    };

    // Applied Projects
    appliedProjects: ProjectMembership[];
    appliedProjectsPagination: {
        total: number;
        page: number;
        limit: number;
        totalPages: number;
    };

    // Project Members
    projectMembers: Record<string, ProjectMember[]>;

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
        searchSharedProjects: boolean;
        applyToProject: boolean;
        fetchAppliedProjects: boolean;
        leaveAppliedProject: boolean;
        toggleProjectSharing: boolean;
        fetchProjectMembers: boolean;
        removeProjectMember: boolean;
    };
    error: {
        fetchProjects: string | null;
        fetchProjectDetails: string | null;
        fetchProjectStats: string | null;
        createProject: string | null;
        updateProject: string | null;
        deleteProject: string | null;
        fetchProjectsWithStats: string | null;
        searchSharedProjects: string | null;
        applyToProject: string | null;
        fetchAppliedProjects: string | null;
        leaveAppliedProject: string | null;
        toggleProjectSharing: string | null;
        fetchProjectMembers: string | null;
        removeProjectMember: string | null;
    };
    filters: {
        search: string;
        sortBy: string;
        sortOrder: 'asc' | 'desc';
    };
    sharedFilters: {
        search: string;
        shareCode: string;
    };
}

const initialState: ProjectsState = {
    projects: [],
    projectsWithStats: [],
    currentProject: null,
    projectStats: {},

    // Shared Projects
    sharedProjects: [],
    sharedProjectsPagination: {
        total: 0,
        page: 1,
        limit: 10,
        totalPages: 0,
    },

    // Applied Projects
    appliedProjects: [],
    appliedProjectsPagination: {
        total: 0,
        page: 1,
        limit: 10,
        totalPages: 0,
    },

    // Project Members
    projectMembers: {},

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
        searchSharedProjects: false,
        applyToProject: false,
        fetchAppliedProjects: false,
        leaveAppliedProject: false,
        toggleProjectSharing: false,
        fetchProjectMembers: false,
        removeProjectMember: false,
    },
    error: {
        fetchProjects: null,
        fetchProjectDetails: null,
        fetchProjectStats: null,
        createProject: null,
        updateProject: null,
        deleteProject: null,
        fetchProjectsWithStats: null,
        searchSharedProjects: null,
        applyToProject: null,
        fetchAppliedProjects: null,
        leaveAppliedProject: null,
        toggleProjectSharing: null,
        fetchProjectMembers: null,
        removeProjectMember: null,
    },
    filters: {
        search: '',
        sortBy: 'createdAt',
        sortOrder: 'desc',
    },
    sharedFilters: {
        search: '',
        shareCode: '',
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
                searchSharedProjects: null,
                applyToProject: null,
                fetchAppliedProjects: null,
                leaveAppliedProject: null,
                toggleProjectSharing: null,
                fetchProjectMembers: null,
                removeProjectMember: null,
            };
        },
        setPagination: (state, action: PayloadAction<Partial<ProjectsState['pagination']>>) => {
            state.pagination = { ...state.pagination, ...action.payload };
        },
        setSharedFilters: (state, action: PayloadAction<Partial<ProjectsState['sharedFilters']>>) => {
            state.sharedFilters = { ...state.sharedFilters, ...action.payload };
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

        // Search Shared Projects
        builder
            .addCase(searchSharedProjects.pending, (state) => {
                state.loading.searchSharedProjects = true;
                state.error.searchSharedProjects = null;
            })
            .addCase(searchSharedProjects.fulfilled, (state, action) => {
                state.loading.searchSharedProjects = false;
                state.sharedProjects = action.payload.data;
                state.sharedProjectsPagination = {
                    total: action.payload.total,
                    page: action.payload.page,
                    limit: action.payload.limit,
                    totalPages: action.payload.totalPages,
                };
            })
            .addCase(searchSharedProjects.rejected, (state, action) => {
                state.loading.searchSharedProjects = false;
                state.error.searchSharedProjects = action.payload as string;
            });

        // Apply to Project
        builder
            .addCase(applyToProject.pending, (state) => {
                state.loading.applyToProject = true;
                state.error.applyToProject = null;
            })
            .addCase(applyToProject.fulfilled, (state, action) => {
                state.loading.applyToProject = false;
                state.appliedProjects.unshift(action.payload.membership);
                state.appliedProjectsPagination.total += 1;
            })
            .addCase(applyToProject.rejected, (state, action) => {
                state.loading.applyToProject = false;
                state.error.applyToProject = action.payload as string;
            });

        // Fetch Applied Projects
        builder
            .addCase(fetchAppliedProjects.pending, (state) => {
                state.loading.fetchAppliedProjects = true;
                state.error.fetchAppliedProjects = null;
            })
            .addCase(fetchAppliedProjects.fulfilled, (state, action) => {
                state.loading.fetchAppliedProjects = false;
                state.appliedProjects = action.payload.data;
                state.appliedProjectsPagination = {
                    total: action.payload.total,
                    page: action.payload.page,
                    limit: action.payload.limit,
                    totalPages: action.payload.totalPages,
                };
            })
            .addCase(fetchAppliedProjects.rejected, (state, action) => {
                state.loading.fetchAppliedProjects = false;
                state.error.fetchAppliedProjects = action.payload as string;
            });

        // Leave Applied Project
        builder
            .addCase(leaveAppliedProject.pending, (state) => {
                state.loading.leaveAppliedProject = true;
                state.error.leaveAppliedProject = null;
            })
            .addCase(leaveAppliedProject.fulfilled, (state, action) => {
                state.loading.leaveAppliedProject = false;
                state.appliedProjects = state.appliedProjects.filter(
                    p => p.projectId !== action.payload.projectId
                );
                state.appliedProjectsPagination.total = Math.max(0, state.appliedProjectsPagination.total - 1);
            })
            .addCase(leaveAppliedProject.rejected, (state, action) => {
                state.loading.leaveAppliedProject = false;
                state.error.leaveAppliedProject = action.payload as string;
            });

        // Toggle Project Sharing
        builder
            .addCase(toggleProjectSharing.pending, (state) => {
                state.loading.toggleProjectSharing = true;
                state.error.toggleProjectSharing = null;
            })
            .addCase(toggleProjectSharing.fulfilled, (state, action) => {
                state.loading.toggleProjectSharing = false;
                // Update project in projects array
                const projectIndex = state.projects.findIndex(p => p.id === action.payload.id);
                if (projectIndex !== -1) {
                    state.projects[projectIndex] = {
                        ...state.projects[projectIndex],
                        isShared: action.payload.isShared,
                        shareCode: action.payload.shareCode
                    };
                }
                // Update current project if it's the same
                if (state.currentProject?.id === action.payload.id) {
                    state.currentProject = {
                        ...state.currentProject,
                        isShared: action.payload.isShared,
                        shareCode: action.payload.shareCode
                    };
                }
            })
            .addCase(toggleProjectSharing.rejected, (state, action) => {
                state.loading.toggleProjectSharing = false;
                state.error.toggleProjectSharing = action.payload as string;
            });

        // Fetch Project Members
        builder
            .addCase(fetchProjectMembers.pending, (state) => {
                state.loading.fetchProjectMembers = true;
                state.error.fetchProjectMembers = null;
            })
            .addCase(fetchProjectMembers.fulfilled, (state, action) => {
                state.loading.fetchProjectMembers = false;
                state.projectMembers[action.payload.projectId] = action.payload.members.data;
            })
            .addCase(fetchProjectMembers.rejected, (state, action) => {
                state.loading.fetchProjectMembers = false;
                state.error.fetchProjectMembers = action.payload as string;
            });

        // Remove Project Member
        builder
            .addCase(removeProjectMember.pending, (state) => {
                state.loading.removeProjectMember = true;
                state.error.removeProjectMember = null;
            })
            .addCase(removeProjectMember.fulfilled, (state, action) => {
                state.loading.removeProjectMember = false;
                const projectMembers = state.projectMembers[action.payload.projectId];
                if (projectMembers) {
                    state.projectMembers[action.payload.projectId] = projectMembers.filter(
                        member => member.id !== action.payload.memberId
                    );
                }
            })
            .addCase(removeProjectMember.rejected, (state, action) => {
                state.loading.removeProjectMember = false;
                state.error.removeProjectMember = action.payload as string;
            });
    },
});

export const {
    setFilters,
    clearCurrentProject,
    clearErrors,
    setPagination,
    setSharedFilters
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

// Shared Projects Selectors
export const selectSharedProjects = (state: { projects: ProjectsState }) => state.projects.sharedProjects;
export const selectSharedProjectsPagination = (state: { projects: ProjectsState }) => state.projects.sharedProjectsPagination;
export const selectSharedFilters = (state: { projects: ProjectsState }) => state.projects.sharedFilters;

// Applied Projects Selectors
export const selectAppliedProjects = (state: { projects: ProjectsState }) => state.projects.appliedProjects;
export const selectAppliedProjectsPagination = (state: { projects: ProjectsState }) => state.projects.appliedProjectsPagination;

// Project Members Selectors
export const selectProjectMembers = (state: { projects: ProjectsState }) => state.projects.projectMembers;