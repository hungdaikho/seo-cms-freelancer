import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../store';
import {
    createProject,
    fetchProjects,
    fetchProjectById,
    updateProject,
    deleteProject,
    fetchProjectStats,
    clearError,
    setCurrentProject,
    clearCurrentProject,
} from '../slices/project.slice';
import { CreateProjectRequest, UpdateProjectRequest, PaginationParams } from '@/types/api.type';

export const useProject = () => {
    const dispatch = useDispatch<AppDispatch>();
    const projectState = useSelector((state: RootState) => state.project);

    const actions = {
        // Basic CRUD operations
        createProject: (data: CreateProjectRequest) => dispatch(createProject(data)),
        fetchProjects: (params?: PaginationParams) => dispatch(fetchProjects(params)),
        fetchProjectById: (projectId: string) => dispatch(fetchProjectById(projectId)),
        updateProject: (projectId: string, data: UpdateProjectRequest) =>
            dispatch(updateProject({ projectId, data })),
        deleteProject: (projectId: string) => dispatch(deleteProject(projectId)),

        // Stats
        fetchProjectStats: (projectId: string) => dispatch(fetchProjectStats(projectId)),

        // State management
        clearError: () => dispatch(clearError()),
        setCurrentProject: (project: any) => dispatch(setCurrentProject(project)),
        clearCurrentProject: () => dispatch(clearCurrentProject()),
    };

    return {
        ...projectState,
        ...actions,
    };
};
