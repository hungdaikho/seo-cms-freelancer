import { RootState } from '../store';

// Project selectors
export const selectProjects = (state: RootState) => state.project.projects;
export const selectCurrentProject = (state: RootState) => state.project.currentProject;
export const selectProjectStats = (state: RootState) => state.project.projectStats;
export const selectProjectLoading = (state: RootState) => state.project.loading;
export const selectProjectError = (state: RootState) => state.project.error;
export const selectProjectPagination = (state: RootState) => state.project.pagination;

// Project derived selectors
export const selectActiveProjects = (state: RootState) =>
    state.project.projects.filter(project => project.isActive);

export const selectProjectById = (projectId: string) => (state: RootState) =>
    state.project.projects.find(project => project.id === projectId);

export const selectProjectsByDomain = (domain: string) => (state: RootState) =>
    state.project.projects.filter(project =>
        project.domain.toLowerCase().includes(domain.toLowerCase())
    );
