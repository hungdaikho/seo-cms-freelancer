import { useDispatch, useSelector } from "react-redux";
import { useCallback, useMemo } from "react";
import { AppDispatch, RootState } from "../store";
import {
  searchContentIdeas,
  fetchTopicIdeas,
  fetchTrendingTopics,
  fetchQuestionBasedContent,
  fetchAIContentIdeas,
  fetchRelatedTopics,
  exportContentIdeas,
  setCurrentKeyword,
  setFilters,
  setSelectedContentIdeas,
  toggleContentIdeaSelection,
  selectAllContentIdeas,
  clearSelectedContentIdeas,
  setPagination,
  clearAllData,
  clearError,
  ContentIdeasFilters,
} from "../slices/content-ideas.slice";
import {
  selectContentIdeas,
  selectAllContentIdeas as selectAllContentIdeasSelector,
  selectSelectedContentIdeas,
  selectCurrentKeyword,
  selectContentIdeasFilters,
  selectContentIdeasLoading,
  selectIsAnyContentIdeasLoading,
  selectIsExporting,
  selectContentIdeasError,
  selectContentIdeasStats,
  selectSelectedContentIdeaItems,
  selectContentIdeasByType,
  selectPaginatedContentIdeas,
  selectContentIdeasPagination,
  selectHasNextPage,
  selectHasPrevPage,
  selectIsFiltered,
  selectActiveFiltersCount,
  selectTopicIdeas,
  selectTrendingTopics,
  selectQuestionBasedContent,
  selectAIContentIdeas,
  selectRelatedTopics,
} from "../selectors/content-ideas.selectors";
import {
  TopicIdeaParams,
  AIContentIdeaParams,
} from "@/types/keyword-research.type";

// ====================================================================
// MAIN HOOK
// ====================================================================

export const useContentIdeas = () => {
  const dispatch = useDispatch<AppDispatch>();

  // Selectors
  const contentIdeas = useSelector(selectContentIdeas);
  const allContentIdeas = useSelector(selectAllContentIdeasSelector);
  const paginatedContentIdeas = useSelector(selectPaginatedContentIdeas);
  const selectedContentIdeas = useSelector(selectSelectedContentIdeas);
  const selectedContentIdeaItems = useSelector(selectSelectedContentIdeaItems);
  const currentKeyword = useSelector(selectCurrentKeyword);
  const filters = useSelector(selectContentIdeasFilters);
  const loading = useSelector(selectContentIdeasLoading);
  const isAnyLoading = useSelector(selectIsAnyContentIdeasLoading);
  const isExporting = useSelector(selectIsExporting);
  const error = useSelector(selectContentIdeasError);
  const stats = useSelector(selectContentIdeasStats);
  const contentIdeasByType = useSelector(selectContentIdeasByType);
  const pagination = useSelector(selectContentIdeasPagination);
  const hasNextPage = useSelector(selectHasNextPage);
  const hasPrevPage = useSelector(selectHasPrevPage);
  const isFiltered = useSelector(selectIsFiltered);
  const activeFiltersCount = useSelector(selectActiveFiltersCount);

  // Raw API data
  const topicIdeas = useSelector(selectTopicIdeas);
  const trendingTopics = useSelector(selectTrendingTopics);
  const questionBasedContent = useSelector(selectQuestionBasedContent);
  const aiContentIdeas = useSelector(selectAIContentIdeas);
  const relatedTopics = useSelector(selectRelatedTopics);

  // ====================================================================
  // ACTION CREATORS
  // ====================================================================

  const searchContent = useCallback(
    (keyword: string, country?: string, limit?: number) => {
      return dispatch(searchContentIdeas({ keyword, country, limit }));
    },
    [dispatch]
  );

  const fetchTopicIdeasData = useCallback(
    (params: TopicIdeaParams) => {
      return dispatch(fetchTopicIdeas(params));
    },
    [dispatch]
  );

  const fetchTrendingTopicsData = useCallback(
    (category?: string, country?: string, limit?: number) => {
      return dispatch(fetchTrendingTopics({ category, country, limit }));
    },
    [dispatch]
  );

  const fetchQuestionBasedContentData = useCallback(
    (topic: string, limit?: number, country?: string) => {
      return dispatch(fetchQuestionBasedContent({ topic, limit, country }));
    },
    [dispatch]
  );

  const fetchAIContentIdeasData = useCallback(
    (params: AIContentIdeaParams) => {
      return dispatch(fetchAIContentIdeas(params));
    },
    [dispatch]
  );

  const fetchRelatedTopicsData = useCallback(
    (topic: string, limit?: number, country?: string) => {
      return dispatch(fetchRelatedTopics({ topic, limit, country }));
    },
    [dispatch]
  );

  const exportSelected = useCallback(
    (format: "csv" | "xlsx" = "csv") => {
      return dispatch(
        exportContentIdeas({
          contentIds: selectedContentIdeas,
          format,
        })
      );
    },
    [dispatch, selectedContentIdeas]
  );

  const exportAll = useCallback(
    (format: "csv" | "xlsx" = "csv") => {
      const allIds = contentIdeas.map((item) => item.key);
      return dispatch(
        exportContentIdeas({
          contentIds: allIds,
          format,
        })
      );
    },
    [dispatch, contentIdeas]
  );

  // ====================================================================
  // UI ACTIONS
  // ====================================================================

  const setKeyword = useCallback(
    (keyword: string) => {
      dispatch(setCurrentKeyword(keyword));
    },
    [dispatch]
  );

  const updateFilters = useCallback(
    (newFilters: Partial<ContentIdeasFilters>) => {
      dispatch(setFilters(newFilters));
    },
    [dispatch]
  );

  const setSelected = useCallback(
    (selectedIds: string[]) => {
      dispatch(setSelectedContentIdeas(selectedIds));
    },
    [dispatch]
  );

  const toggleSelection = useCallback(
    (contentId: string) => {
      dispatch(toggleContentIdeaSelection(contentId));
    },
    [dispatch]
  );

  const selectAll = useCallback(() => {
    dispatch(selectAllContentIdeas());
  }, [dispatch]);

  const clearSelected = useCallback(() => {
    dispatch(clearSelectedContentIdeas());
  }, [dispatch]);

  const updatePagination = useCallback(
    (paginationUpdate: Partial<typeof pagination>) => {
      dispatch(setPagination(paginationUpdate));
    },
    [dispatch]
  );

  const goToPage = useCallback(
    (page: number) => {
      dispatch(setPagination({ current: page }));
    },
    [dispatch]
  );

  const changePageSize = useCallback(
    (pageSize: number) => {
      dispatch(setPagination({ pageSize, current: 1 }));
    },
    [dispatch]
  );

  const clearData = useCallback(() => {
    dispatch(clearAllData());
  }, [dispatch]);

  const clearErrorState = useCallback(() => {
    dispatch(clearError());
  }, [dispatch]);

  // ====================================================================
  // COMPUTED VALUES
  // ====================================================================

  const hasSelection = useMemo(
    () => selectedContentIdeas.length > 0,
    [selectedContentIdeas.length]
  );

  const isAllSelected = useMemo(
    () =>
      selectedContentIdeas.length === contentIdeas.length &&
      contentIdeas.length > 0,
    [selectedContentIdeas.length, contentIdeas.length]
  );

  const isPartiallySelected = useMemo(
    () =>
      selectedContentIdeas.length > 0 &&
      selectedContentIdeas.length < contentIdeas.length,
    [selectedContentIdeas.length, contentIdeas.length]
  );

  const hasData = useMemo(() => contentIdeas.length > 0, [contentIdeas.length]);

  const totalPages = useMemo(
    () => Math.ceil(stats.totalItems / pagination.pageSize),
    [stats.totalItems, pagination.pageSize]
  );

  const currentPageItems = useMemo(() => {
    const start = (pagination.current - 1) * pagination.pageSize + 1;
    const end = Math.min(
      pagination.current * pagination.pageSize,
      stats.totalItems
    );
    return { start, end };
  }, [pagination.current, pagination.pageSize, stats.totalItems]);

  // ====================================================================
  // RETURN OBJECT
  // ====================================================================

  return {
    // Data
    contentIdeas,
    allContentIdeas,
    paginatedContentIdeas,
    selectedContentIdeas,
    selectedContentIdeaItems,
    currentKeyword,
    filters,
    pagination,
    stats,
    contentIdeasByType,

    // Raw API data
    topicIdeas,
    trendingTopics,
    questionBasedContent,
    aiContentIdeas,
    relatedTopics,

    // Loading states
    loading,
    isAnyLoading,
    isExporting,

    // Error state
    error,

    // Computed states
    hasSelection,
    isAllSelected,
    isPartiallySelected,
    hasData,
    hasNextPage,
    hasPrevPage,
    isFiltered,
    activeFiltersCount,
    totalPages,
    currentPageItems,

    // Actions
    searchContent,
    fetchTopicIdeasData,
    fetchTrendingTopicsData,
    fetchQuestionBasedContentData,
    fetchAIContentIdeasData,
    fetchRelatedTopicsData,
    exportSelected,
    exportAll,

    // UI Actions
    setKeyword,
    updateFilters,
    setSelected,
    toggleSelection,
    selectAll,
    clearSelected,
    updatePagination,
    goToPage,
    changePageSize,
    clearData,
    clearErrorState,
  };
};

// ====================================================================
// SPECIFIC HOOKS
// ====================================================================

export const useContentIdeasSearch = () => {
  const dispatch = useDispatch<AppDispatch>();
  const currentKeyword = useSelector(selectCurrentKeyword);
  const filters = useSelector(selectContentIdeasFilters);
  const isLoading = useSelector(selectIsAnyContentIdeasLoading);
  const error = useSelector(selectContentIdeasError);

  const search = useCallback(
    async (keyword: string, options?: { country?: string; limit?: number }) => {
      const { country = filters.country, limit = 50 } = options || {};

      try {
        await dispatch(
          searchContentIdeas({
            keyword,
            country,
            limit,
          })
        ).unwrap();
        return { success: true };
      } catch (error: any) {
        return { success: false, error: error.message };
      }
    },
    [dispatch, filters.country]
  );

  return {
    search,
    currentKeyword,
    isLoading,
    error,
  };
};

export const useContentIdeasFilters = () => {
  const dispatch = useDispatch<AppDispatch>();
  const filters = useSelector(selectContentIdeasFilters);
  const isFiltered = useSelector(selectIsFiltered);
  const activeFiltersCount = useSelector(selectActiveFiltersCount);

  const updateFilter = useCallback(
    (key: keyof ContentIdeasFilters, value: any) => {
      dispatch(setFilters({ [key]: value }));
    },
    [dispatch]
  );

  const resetFilters = useCallback(() => {
    dispatch(
      setFilters({
        language: "English/Nigeria",
        country: "NG",
        sortBy: "backlinks",
        sortOrder: "desc",
        minBacklinks: undefined,
        minTraffic: undefined,
        category: undefined,
      })
    );
  }, [dispatch]);

  return {
    filters,
    isFiltered,
    activeFiltersCount,
    updateFilter,
    resetFilters,
  };
};

export const useContentIdeasSelection = () => {
  const dispatch = useDispatch<AppDispatch>();
  const selectedIds = useSelector(selectSelectedContentIdeas);
  const selectedItems = useSelector(selectSelectedContentIdeaItems);
  const allContentIdeas = useSelector(selectAllContentIdeasSelector);

  const hasSelection = selectedIds.length > 0;
  const isAllSelected =
    selectedIds.length === allContentIdeas.length && allContentIdeas.length > 0;
  const isPartiallySelected =
    selectedIds.length > 0 && selectedIds.length < allContentIdeas.length;

  const select = useCallback(
    (contentId: string) => {
      dispatch(toggleContentIdeaSelection(contentId));
    },
    [dispatch]
  );

  const selectMultiple = useCallback(
    (contentIds: string[]) => {
      dispatch(setSelectedContentIdeas(contentIds));
    },
    [dispatch]
  );

  const selectAll = useCallback(() => {
    dispatch(selectAllContentIdeas());
  }, [dispatch]);

  const clearSelection = useCallback(() => {
    dispatch(clearSelectedContentIdeas());
  }, [dispatch]);

  return {
    selectedIds,
    selectedItems,
    hasSelection,
    isAllSelected,
    isPartiallySelected,
    select,
    selectMultiple,
    selectAll,
    clearSelection,
  };
};
