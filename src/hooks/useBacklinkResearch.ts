import { useDispatch, useSelector } from "react-redux";
import { useCallback } from "react";
import { AppDispatch, RootState } from "@/stores/store";
import {
  fetchDomainOverview,
  fetchDomainAuthority,
  fetchProjectBacklinks,
  fetchBacklinkAnalytics,
  addBacklinkToProject,
  updateBacklink,
  deleteBacklink,
  compareBacklinkProfiles,
  fetchLinkBuildingProspects,
  fetchBacklinkTimeline,
  setCurrentDomain,
  setIncludeSubdomains,
  setSelectedProjectId,
  setFilters,
  setSelectedBacklink,
  clearDomainData,
  clearProjectData,
  clearGapAnalysisData,
  resetState,
} from "@/stores/slices/backlik-research.slice";
import {
  GetDomainOverviewRequest,
  GetProjectBacklinksRequest,
  GetBacklinkAnalyticsRequest,
  BacklinkGapCompareRequest,
  GetLinkProspectsRequest,
  AddBacklinkRequest,
  UpdateBacklinkRequest,
  ProjectBacklink,
} from "@/types/backlink-research.type";

export const useBacklinkResearch = () => {
  const dispatch = useDispatch<AppDispatch>();

  // Selectors
  const state = useSelector((state: RootState) => state.backlinkResearch);

  // Domain Overview Actions
  const getDomainOverview = useCallback(
    (params: GetDomainOverviewRequest) => {
      return dispatch(fetchDomainOverview(params));
    },
    [dispatch]
  );

  const getDomainAuthority = useCallback(
    (domain: string) => {
      return dispatch(fetchDomainAuthority(domain));
    },
    [dispatch]
  );

  // Project Backlinks Actions
  const getProjectBacklinks = useCallback(
    (params: GetProjectBacklinksRequest) => {
      return dispatch(fetchProjectBacklinks(params));
    },
    [dispatch]
  );

  const getBacklinkAnalytics = useCallback(
    (params: GetBacklinkAnalyticsRequest) => {
      return dispatch(fetchBacklinkAnalytics(params));
    },
    [dispatch]
  );

  const addBacklink = useCallback(
    (params: AddBacklinkRequest) => {
      return dispatch(addBacklinkToProject(params));
    },
    [dispatch]
  );

  const updateBacklinkData = useCallback(
    (params: UpdateBacklinkRequest) => {
      return dispatch(updateBacklink(params));
    },
    [dispatch]
  );

  const removeBacklink = useCallback(
    (projectId: string, backlinkId: string) => {
      return dispatch(deleteBacklink({ projectId, backlinkId }));
    },
    [dispatch]
  );

  // Gap Analysis Actions
  const compareProfiles = useCallback(
    (params: BacklinkGapCompareRequest) => {
      return dispatch(compareBacklinkProfiles(params));
    },
    [dispatch]
  );

  const getLinkProspects = useCallback(
    (params: GetLinkProspectsRequest) => {
      return dispatch(fetchLinkBuildingProspects(params));
    },
    [dispatch]
  );

  // Timeline Actions
  const getTimelineData = useCallback(
    (
      projectId: string,
      params?: {
        period?: "1y" | "6m" | "3m" | "1m";
        metric?: "backlinks" | "domains" | "authority";
      }
    ) => {
      return dispatch(fetchBacklinkTimeline({ projectId, params }));
    },
    [dispatch]
  );

  // UI Actions
  const updateCurrentDomain = useCallback(
    (domain: string) => {
      dispatch(setCurrentDomain(domain));
    },
    [dispatch]
  );

  const updateIncludeSubdomains = useCallback(
    (include: boolean) => {
      dispatch(setIncludeSubdomains(include));
    },
    [dispatch]
  );

  const updateSelectedProjectId = useCallback(
    (projectId: string | null) => {
      dispatch(setSelectedProjectId(projectId));
    },
    [dispatch]
  );

  const updateFilters = useCallback(
    (filters: Partial<typeof state.filters>) => {
      dispatch(setFilters(filters));
    },
    [dispatch]
  );

  const selectBacklink = useCallback(
    (backlink: ProjectBacklink | null) => {
      dispatch(setSelectedBacklink(backlink));
    },
    [dispatch]
  );

  // Clear Actions
  const clearDomain = useCallback(() => {
    dispatch(clearDomainData());
  }, [dispatch]);

  const clearProject = useCallback(() => {
    dispatch(clearProjectData());
  }, [dispatch]);

  const clearGapAnalysis = useCallback(() => {
    dispatch(clearGapAnalysisData());
  }, [dispatch]);

  const reset = useCallback(() => {
    dispatch(resetState());
  }, [dispatch]);

  // Combined actions for common workflows
  const initializeDomainAnalysis = useCallback(
    async (domain: string, includeSubdomains = false) => {
      dispatch(setCurrentDomain(domain));
      dispatch(setIncludeSubdomains(includeSubdomains));

      const overviewPromise = dispatch(
        fetchDomainOverview({ domain, includeSubdomains })
      );
      const authorityPromise = dispatch(fetchDomainAuthority(domain));

      return Promise.all([overviewPromise, authorityPromise]);
    },
    [dispatch]
  );

  const initializeProjectAnalysis = useCallback(
    async (
      projectId: string,
      filters?: Partial<GetProjectBacklinksRequest>
    ) => {
      dispatch(setSelectedProjectId(projectId));

      const backlinksParams: GetProjectBacklinksRequest = {
        projectId,
        page: 1,
        limit: 20,
        ...filters,
      };

      const analyticsParams: GetBacklinkAnalyticsRequest = {
        projectId,
        days: 30,
      };

      const backlinksPromise = dispatch(fetchProjectBacklinks(backlinksParams));
      const analyticsPromise = dispatch(
        fetchBacklinkAnalytics(analyticsParams)
      );
      const timelinePromise = dispatch(
        fetchBacklinkTimeline({ projectId, params: { period: "1y" } })
      );

      return Promise.all([backlinksPromise, analyticsPromise, timelinePromise]);
    },
    [dispatch]
  );

  const performGapAnalysis = useCallback(
    async (
      targetDomain: string,
      competitors: string[],
      filters?: BacklinkGapCompareRequest["filters"]
    ) => {
      const gapParams: BacklinkGapCompareRequest = {
        targetDomain,
        competitors,
        filters,
      };

      const prospectParams: GetLinkProspectsRequest = {
        domain: targetDomain,
        competitors: competitors.join(","),
        limit: 100,
        ...filters,
      };

      const gapPromise = dispatch(compareBacklinkProfiles(gapParams));
      const prospectsPromise = dispatch(
        fetchLinkBuildingProspects(prospectParams)
      );

      return Promise.all([gapPromise, prospectsPromise]);
    },
    [dispatch]
  );

  // Utility functions
  const isLoading = useCallback(
    (action?: keyof typeof state.loading) => {
      if (action) {
        return state.loading[action];
      }
      return Object.values(state.loading).some((loading) => loading);
    },
    [state.loading]
  );

  const getError = useCallback(
    (action?: keyof typeof state.errors) => {
      if (action) {
        return state.errors[action];
      }
      return (
        Object.values(state.errors).find((error) => error !== null) || null
      );
    },
    [state.errors]
  );

  const hasData = useCallback(() => {
    return !!(
      state.domainOverview ||
      state.projectBacklinks ||
      state.backlinkAnalytics ||
      state.gapAnalysis
    );
  }, [
    state.domainOverview,
    state.projectBacklinks,
    state.backlinkAnalytics,
    state.gapAnalysis,
  ]);

  return {
    // State
    ...state,

    // Domain Overview Actions
    getDomainOverview,
    getDomainAuthority,

    // Project Backlinks Actions
    getProjectBacklinks,
    getBacklinkAnalytics,
    addBacklink,
    updateBacklinkData,
    removeBacklink,

    // Gap Analysis Actions
    compareProfiles,
    getLinkProspects,

    // Timeline Actions
    getTimelineData,

    // UI Actions
    updateCurrentDomain,
    updateIncludeSubdomains,
    updateSelectedProjectId,
    updateFilters,
    selectBacklink,

    // Clear Actions
    clearDomain,
    clearProject,
    clearGapAnalysis,
    reset,

    // Combined Actions
    initializeDomainAnalysis,
    initializeProjectAnalysis,
    performGapAnalysis,

    // Utility Functions
    isLoading,
    getError,
    hasData,
  };
};

export default useBacklinkResearch;
