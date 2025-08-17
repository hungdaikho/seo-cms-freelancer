import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "../store";

// ====================================================================
// BASIC SELECTORS
// ====================================================================

const selectContentIdeasState = (state: RootState) => state.contentIdeas;

// ====================================================================
// DATA SELECTORS
// ====================================================================

export const selectContentIdeas = createSelector(
  [selectContentIdeasState],
  (contentIdeasState) => contentIdeasState.filteredContentIdeas
);

export const selectAllContentIdeas = createSelector(
  [selectContentIdeasState],
  (contentIdeasState) => contentIdeasState.contentIdeas
);

export const selectTopicIdeas = createSelector(
  [selectContentIdeasState],
  (contentIdeasState) => contentIdeasState.topicIdeas
);

export const selectTrendingTopics = createSelector(
  [selectContentIdeasState],
  (contentIdeasState) => contentIdeasState.trendingTopics
);

export const selectQuestionBasedContent = createSelector(
  [selectContentIdeasState],
  (contentIdeasState) => contentIdeasState.questionBasedContent
);

export const selectAIContentIdeas = createSelector(
  [selectContentIdeasState],
  (contentIdeasState) => contentIdeasState.aiContentIdeas
);

export const selectRelatedTopics = createSelector(
  [selectContentIdeasState],
  (contentIdeasState) => contentIdeasState.relatedTopics
);

// ====================================================================
// UI STATE SELECTORS
// ====================================================================

export const selectSelectedContentIdeas = createSelector(
  [selectContentIdeasState],
  (contentIdeasState) => contentIdeasState.selectedContentIdeas
);

export const selectCurrentKeyword = createSelector(
  [selectContentIdeasState],
  (contentIdeasState) => contentIdeasState.currentKeyword
);

export const selectContentIdeasFilters = createSelector(
  [selectContentIdeasState],
  (contentIdeasState) => contentIdeasState.filters
);

export const selectContentIdeasPagination = createSelector(
  [selectContentIdeasState],
  (contentIdeasState) => contentIdeasState.pagination
);

// ====================================================================
// LOADING STATE SELECTORS
// ====================================================================

export const selectContentIdeasLoading = createSelector(
  [selectContentIdeasState],
  (contentIdeasState) => contentIdeasState.loading
);

export const selectIsAnyContentIdeasLoading = createSelector(
  [selectContentIdeasLoading],
  (loading) =>
    loading.topicIdeas ||
    loading.trendingTopics ||
    loading.questionBasedContent ||
    loading.aiContentIdeas ||
    loading.relatedTopics ||
    loading.searching
);

export const selectIsExporting = createSelector(
  [selectContentIdeasLoading],
  (loading) => loading.exporting
);

// ====================================================================
// ERROR SELECTORS
// ====================================================================

export const selectContentIdeasError = createSelector(
  [selectContentIdeasState],
  (contentIdeasState) => contentIdeasState.error
);

// ====================================================================
// COMPUTED SELECTORS
// ====================================================================

export const selectSelectedContentIdeaItems = createSelector(
  [selectContentIdeas, selectSelectedContentIdeas],
  (contentIdeas, selectedIds) =>
    contentIdeas.filter((item) => selectedIds.includes(item.key))
);

export const selectContentIdeasStats = createSelector(
  [selectContentIdeas],
  (contentIdeas) => {
    if (!contentIdeas.length) {
      return {
        totalItems: 0,
        totalBacklinks: 0,
        totalTraffic: 0,
        avgBacklinks: 0,
        avgTraffic: 0,
      };
    }

    const totalBacklinks = contentIdeas.reduce(
      (sum, item) => sum + item.backlinks,
      0
    );
    const totalTraffic = contentIdeas.reduce(
      (sum, item) => sum + item.estVisits,
      0
    );

    return {
      totalItems: contentIdeas.length,
      totalBacklinks,
      totalTraffic,
      avgBacklinks: Math.round(totalBacklinks / contentIdeas.length),
      avgTraffic: Math.round(totalTraffic / contentIdeas.length),
    };
  }
);

export const selectContentIdeasByType = createSelector(
  [selectAllContentIdeas],
  (contentIdeas) => {
    const byType = {
      topic: 0,
      trending: 0,
      question: 0,
      related: 0,
    };

    contentIdeas.forEach((item) => {
      if (item.key.startsWith("topic-")) byType.topic++;
      else if (item.key.startsWith("trending-")) byType.trending++;
      else if (item.key.startsWith("question-")) byType.question++;
      else if (item.key.startsWith("related-")) byType.related++;
    });

    return byType;
  }
);

// ====================================================================
// PAGINATION SELECTORS
// ====================================================================

export const selectPaginatedContentIdeas = createSelector(
  [selectContentIdeas, selectContentIdeasPagination],
  (contentIdeas, pagination) => {
    const startIndex = (pagination.current - 1) * pagination.pageSize;
    const endIndex = startIndex + pagination.pageSize;
    return contentIdeas.slice(startIndex, endIndex);
  }
);

export const selectHasNextPage = createSelector(
  [selectContentIdeasPagination, selectContentIdeas],
  (pagination, contentIdeas) => {
    const totalPages = Math.ceil(contentIdeas.length / pagination.pageSize);
    return pagination.current < totalPages;
  }
);

export const selectHasPrevPage = createSelector(
  [selectContentIdeasPagination],
  (pagination) => pagination.current > 1
);

// ====================================================================
// FILTER STATUS SELECTORS
// ====================================================================

export const selectIsFiltered = createSelector(
  [selectContentIdeasFilters],
  (filters) => {
    return !!(
      filters.minBacklinks ||
      filters.minTraffic ||
      (filters.country && filters.country !== "NG") ||
      (filters.language && filters.language !== "English/Nigeria")
    );
  }
);

export const selectActiveFiltersCount = createSelector(
  [selectContentIdeasFilters],
  (filters) => {
    let count = 0;
    if (filters.minBacklinks) count++;
    if (filters.minTraffic) count++;
    if (filters.country && filters.country !== "NG") count++;
    if (filters.language && filters.language !== "English/Nigeria") count++;
    return count;
  }
);
