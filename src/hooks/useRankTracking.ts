import { useDispatch, useSelector } from "react-redux";
import { useCallback } from "react";
import { AppDispatch, RootState } from "@/stores/store";
import {
  // Actions
  fetchProjectRankingsOverview,
  fetchProjectStats,
  fetchProjectKeywords,
  addKeyword,
  bulkAddKeywords,
  updateKeyword,
  deleteKeyword,
  bulkDeleteKeywords,
  fetchKeywordRankingHistory,
  addRankingRecord,
  fetchSerpAnalysis,
  bulkUpdateRankings,
  fetchTrackingSettings,
  updateProjectSettings,

  // Synchronous actions
  clearAllData,
  clearError,
  clearAllErrors,
  selectKeyword,
  deselectKeyword,
  selectAllKeywords,
  deselectAllKeywords,
  updateKeywordsFilters,
  resetKeywordsFilters,

  // Selectors
  selectRankTrackingState,
  selectProjectOverview,
  selectProjectStats,
  selectKeywords,
  selectKeywordsPagination,
  selectRankingHistory,
  selectSerpAnalysis,
  selectTrackingSettings,
  selectLoadingStates,
  selectErrorStates,
  selectSelectedKeywordIds,
  selectKeywordsFilters,
} from "@/stores/slices/rank-tracking.slice";

import {
  AddKeywordRequest,
  BulkAddKeywordsRequest,
  UpdateKeywordRequest,
  AddRankingRequest,
  BulkUpdateRankingsRequest,
  ProjectSettings,
  KeywordsListParams,
} from "@/services/rank-tracking.service";

export const useRankTracking = () => {
  const dispatch = useDispatch<AppDispatch>();

  // Selectors
  const state = useSelector(selectRankTrackingState);
  const projectOverview = useSelector(selectProjectOverview);
  const projectStats = useSelector(selectProjectStats);
  const keywords = useSelector(selectKeywords);
  const keywordsPagination = useSelector(selectKeywordsPagination);
  const rankingHistory = useSelector(selectRankingHistory);
  const serpAnalysis = useSelector(selectSerpAnalysis);
  const trackingSettings = useSelector(selectTrackingSettings);
  const loading = useSelector(selectLoadingStates);
  const errors = useSelector(selectErrorStates);
  const selectedKeywordIds = useSelector(selectSelectedKeywordIds);
  const keywordsFilters = useSelector(selectKeywordsFilters);

  // Actions
  const actions = {
    // Async actions - Project Overview
    fetchProjectRankingsOverview: useCallback(
      (projectId: string) => {
        return dispatch(fetchProjectRankingsOverview(projectId));
      },
      [dispatch]
    ),

    fetchProjectStats: useCallback(
      (projectId: string) => {
        return dispatch(fetchProjectStats(projectId));
      },
      [dispatch]
    ),

    // Async actions - Keywords Management
    fetchProjectKeywords: useCallback(
      (projectId: string, params?: KeywordsListParams) => {
        return dispatch(fetchProjectKeywords({ projectId, params }));
      },
      [dispatch]
    ),

    addKeyword: useCallback(
      (projectId: string, data: AddKeywordRequest) => {
        return dispatch(addKeyword({ projectId, data }));
      },
      [dispatch]
    ),

    bulkAddKeywords: useCallback(
      (projectId: string, data: BulkAddKeywordsRequest) => {
        return dispatch(bulkAddKeywords({ projectId, data }));
      },
      [dispatch]
    ),

    updateKeyword: useCallback(
      (keywordId: string, data: UpdateKeywordRequest) => {
        return dispatch(updateKeyword({ keywordId, data }));
      },
      [dispatch]
    ),

    deleteKeyword: useCallback(
      (keywordId: string) => {
        return dispatch(deleteKeyword(keywordId));
      },
      [dispatch]
    ),

    bulkDeleteKeywords: useCallback(
      (keywordIds: string[]) => {
        return dispatch(bulkDeleteKeywords(keywordIds));
      },
      [dispatch]
    ),

    // Async actions - Ranking History
    fetchKeywordRankingHistory: useCallback(
      (
        keywordId: string,
        params?: { days?: number; startDate?: string; endDate?: string }
      ) => {
        return dispatch(fetchKeywordRankingHistory({ keywordId, params }));
      },
      [dispatch]
    ),

    addRankingRecord: useCallback(
      (keywordId: string, data: AddRankingRequest) => {
        return dispatch(addRankingRecord({ keywordId, data }));
      },
      [dispatch]
    ),

    // Async actions - SERP Analysis
    fetchSerpAnalysis: useCallback(
      (projectId: string) => {
        return dispatch(fetchSerpAnalysis(projectId));
      },
      [dispatch]
    ),

    // Async actions - Bulk Operations
    bulkUpdateRankings: useCallback(
      (data: BulkUpdateRankingsRequest) => {
        return dispatch(bulkUpdateRankings(data));
      },
      [dispatch]
    ),

    // Async actions - Settings
    fetchTrackingSettings: useCallback(
      (projectId: string) => {
        return dispatch(fetchTrackingSettings(projectId));
      },
      [dispatch]
    ),

    updateProjectSettings: useCallback(
      (projectId: string, settings: Partial<ProjectSettings>) => {
        return dispatch(updateProjectSettings({ projectId, settings }));
      },
      [dispatch]
    ),

    // Synchronous actions
    clearAllData: useCallback(() => {
      dispatch(clearAllData());
    }, [dispatch]),

    clearError: useCallback(
      (errorKey: keyof typeof errors) => {
        dispatch(clearError(errorKey));
      },
      [dispatch]
    ),

    clearAllErrors: useCallback(() => {
      dispatch(clearAllErrors());
    }, [dispatch]),

    selectKeyword: useCallback(
      (keywordId: string) => {
        dispatch(selectKeyword(keywordId));
      },
      [dispatch]
    ),

    deselectKeyword: useCallback(
      (keywordId: string) => {
        dispatch(deselectKeyword(keywordId));
      },
      [dispatch]
    ),

    selectAllKeywords: useCallback(() => {
      dispatch(selectAllKeywords());
    }, [dispatch]),

    deselectAllKeywords: useCallback(() => {
      dispatch(deselectAllKeywords());
    }, [dispatch]),

    updateKeywordsFilters: useCallback(
      (filters: Partial<KeywordsListParams>) => {
        dispatch(updateKeywordsFilters(filters));
      },
      [dispatch]
    ),

    resetKeywordsFilters: useCallback(() => {
      dispatch(resetKeywordsFilters());
    }, [dispatch]),
  };

  // Utility functions
  const utils = {
    // Check if any data is loading
    isLoading: Object.values(loading).some(Boolean),

    // Check if specific operation is loading
    isLoadingOperation: (operation: keyof typeof loading) => loading[operation],

    // Check if any errors exist
    hasErrors: Object.values(errors).some(Boolean),

    // Get all active errors
    getActiveErrors: () =>
      Object.entries(errors)
        .filter(([, error]) => error)
        .map(([key, error]) => ({ key, error })),

    // Check if keyword is selected
    isKeywordSelected: (keywordId: string) =>
      selectedKeywordIds.includes(keywordId),

    // Get selected keywords count
    getSelectedKeywordsCount: () => selectedKeywordIds.length,

    // Check if all keywords are selected
    areAllKeywordsSelected: () =>
      keywords.length > 0 && selectedKeywordIds.length === keywords.length,

    // Get keyword by ID
    getKeywordById: (keywordId: string) =>
      keywords.find((k) => k.id === keywordId),

    // Get ranking history for keyword
    getRankingHistoryForKeyword: (keywordId: string) =>
      rankingHistory[keywordId],

    // Calculate trend based on position change
    calculateTrend: (change: number) => {
      if (change > 0) return "up";
      if (change < 0) return "down";
      return "stable";
    },

    // Format position display
    formatPosition: (position: number) => {
      if (!position || position === 0) return "Not ranked";
      return position.toString();
    },

    // Get position color
    getPositionColor: (position: number) => {
      if (!position || position === 0) return "#666";
      if (position <= 3) return "#52c41a";
      if (position <= 10) return "#1890ff";
      if (position <= 50) return "#faad14";
      return "#ff4d4f";
    },

    // Get trend icon
    getTrendIcon: (trend: string) => {
      const icons = {
        up: "↗️",
        down: "↘️",
        stable: "→",
        "no-data": "-",
      };
      return icons[trend as keyof typeof icons] || "-";
    },

    // Get trend color
    getTrendColor: (trend: string) => {
      const colors = {
        up: "#52c41a",
        down: "#ff4d4f",
        stable: "#1890ff",
        "no-data": "#666",
      };
      return colors[trend as keyof typeof colors] || "#666";
    },
  };

  return {
    // State
    state,
    projectOverview,
    projectStats,
    keywords,
    keywordsPagination,
    rankingHistory,
    serpAnalysis,
    trackingSettings,
    loading,
    errors,
    selectedKeywordIds,
    keywordsFilters,

    // Actions
    actions,

    // Utilities
    utils,
  };
};

export default useRankTracking;
