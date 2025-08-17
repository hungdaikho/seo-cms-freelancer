import { useDispatch, useSelector } from "react-redux";
import { useCallback } from "react";
import { AppDispatch, RootState } from "@/stores/store";
import {
  fetchProjects,
  fetchProjectDetails,
  fetchProjectStats,
  createProject,
  updateProject,
  deleteProject,
  clearCurrentProject,
  clearErrors,
} from "@/stores/slices/projects.slice";
import {
  CreateProjectRequest,
  UpdateProjectRequest,
  ProjectsListParams,
} from "@/services/project.service";

export const useProjects = () => {
  const dispatch = useDispatch<AppDispatch>();
  const projectsState = useSelector((state: RootState) => state.projects);

  // =============================================================================
  // 🔧 ACTIONS
  // =============================================================================

  const handleFetchProjects = useCallback(
    (params?: ProjectsListParams) => {
      return dispatch(fetchProjects(params));
    },
    [dispatch]
  );

  const handleFetchProjectDetails = useCallback(
    (projectId: string) => {
      return dispatch(fetchProjectDetails(projectId));
    },
    [dispatch]
  );

  const handleFetchProjectStats = useCallback(
    (projectId: string) => {
      return dispatch(fetchProjectStats(projectId));
    },
    [dispatch]
  );

  const handleCreateProject = useCallback(
    (data: CreateProjectRequest) => {
      return dispatch(createProject(data));
    },
    [dispatch]
  );

  const handleUpdateProject = useCallback(
    (id: string, data: UpdateProjectRequest) => {
      return dispatch(updateProject({ id, data }));
    },
    [dispatch]
  );

  const handleDeleteProject = useCallback(
    (projectId: string) => {
      return dispatch(deleteProject(projectId));
    },
    [dispatch]
  );

  const handleClearCurrentProject = useCallback(() => {
    dispatch(clearCurrentProject());
  }, [dispatch]);

  const handleClearErrors = useCallback(() => {
    dispatch(clearErrors());
  }, [dispatch]);

  // =============================================================================
  // 🔧 COMPUTED VALUES
  // =============================================================================

  const isAnyLoading = Object.values(projectsState.loading).some(
    (loading) => loading
  );

  const hasError = Object.values(projectsState.error).some(
    (error) => error !== null
  );

  const currentProject = projectsState.currentProject;

  const totalProjects = projectsState.projects.length;

  return {
    // State
    ...projectsState,

    // Computed values
    isAnyLoading,
    hasError,
    currentProject,
    totalProjects,

    // Actions
    fetchProjects: handleFetchProjects,
    fetchProjectDetails: handleFetchProjectDetails,
    fetchProjectStats: handleFetchProjectStats,
    createProject: handleCreateProject,
    updateProject: handleUpdateProject,
    deleteProject: handleDeleteProject,
    clearCurrentProject: handleClearCurrentProject,
    clearErrors: handleClearErrors,
  };
};

export default useProjects;
