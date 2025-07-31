import { useSelector, useDispatch } from 'react-redux';
import { AppDispatch, RootState } from '../store';
import {
    createRanking,
    fetchRankingHistory,
    fetchProjectRankingsOverview,
    bulkUpdateRankings,
    setFilters,
    setPagination,
    clearError,
    clearRankingHistory,
    clearProjectOverview,
    resetState,
    selectPositionTrackingState,
    selectProjectOverview,
    selectRankingHistory,
    selectVisibilityStats,
    selectTopKeywords,
} from '../slices/position-tracking.slice';
import {
    CreateRankingRequest,
    RankingHistoryQueryParams,
} from '@/types/api.type';

export const usePositionTracking = () => {
    const dispatch = useDispatch<AppDispatch>();

    // Selectors
    const state = useSelector(selectPositionTrackingState);
    const projectOverview = useSelector(selectProjectOverview);
    const rankingHistory = useSelector(selectRankingHistory);
    const visibilityStats = useSelector(selectVisibilityStats);
    const topKeywords = useSelector((state: RootState) => selectTopKeywords(state, 5));

    // Actions
    const actions = {
        // Data fetching
        createRanking: (keywordId: string, data: CreateRankingRequest) =>
            dispatch(createRanking({ keywordId, data })),

        fetchRankingHistory: (keywordId: string, params?: RankingHistoryQueryParams) =>
            dispatch(fetchRankingHistory({ keywordId, params })),

        fetchProjectOverview: (projectId: string) =>
            dispatch(fetchProjectRankingsOverview(projectId)),

        bulkUpdateRankings: (updates: Array<{ keywordId: string; data: CreateRankingRequest }>) =>
            dispatch(bulkUpdateRankings(updates)),

        // UI actions
        setFilters: (filters: Partial<typeof state.filters>) =>
            dispatch(setFilters(filters)),

        setPagination: (pagination: Partial<typeof state.pagination>) =>
            dispatch(setPagination(pagination)),

        clearError: () => dispatch(clearError()),
        clearRankingHistory: () => dispatch(clearRankingHistory()),
        clearProjectOverview: () => dispatch(clearProjectOverview()),
        resetState: () => dispatch(resetState()),
    };

    // Computed values
    const computed = {
        // Check if we have data
        hasOverviewData: !!projectOverview,
        hasRankingHistory: !!rankingHistory,

        // Get visibility percentage (simple calculation)
        visibilityPercentage: visibilityStats
            ? Math.round(visibilityStats.top100.percentage)
            : 0,

        // Get average position
        averagePosition: projectOverview?.summary.avgPosition || 0,

        // Get trending keywords
        improvingKeywords: projectOverview?.keywords.filter(k => k.trend === 'up') || [],
        decliningKeywords: projectOverview?.keywords.filter(k => k.trend === 'down') || [],

        // Get ranking distribution
        rankingDistribution: visibilityStats || {
            total: 0,
            top3: { count: 0, percentage: 0 },
            top10: { count: 0, percentage: 0 },
            top20: { count: 0, percentage: 0 },
            top100: { count: 0, percentage: 0 },
        },
    };

    return {
        // State
        ...state,
        projectOverview,
        rankingHistory,
        visibilityStats,
        topKeywords,

        // Actions
        ...actions,

        // Computed values
        ...computed,
    };
};

// Additional utility hooks
export const usePositionTrackingOverview = (projectId?: string) => {
    const dispatch = useDispatch<AppDispatch>();
    const overview = useSelector(selectProjectOverview);
    const loading = useSelector((state: RootState) => state.positionTracking.loading);
    const error = useSelector((state: RootState) => state.positionTracking.error);

    const fetchOverview = (id?: string) => {
        const targetId = id || projectId;
        if (targetId) {
            dispatch(fetchProjectRankingsOverview(targetId));
        }
    };

    return {
        overview,
        loading,
        error,
        fetchOverview,
    };
};

export const useKeywordRanking = (keywordId?: string) => {
    const dispatch = useDispatch<AppDispatch>();
    const rankingHistory = useSelector(selectRankingHistory);
    const loading = useSelector((state: RootState) => state.positionTracking.loading);
    const error = useSelector((state: RootState) => state.positionTracking.error);

    const fetchHistory = (id?: string, params?: RankingHistoryQueryParams) => {
        const targetId = id || keywordId;
        if (targetId) {
            dispatch(fetchRankingHistory({ keywordId: targetId, params }));
        }
    };

    const addRanking = (id: string, data: CreateRankingRequest) => {
        dispatch(createRanking({ keywordId: id, data }));
    };

    return {
        rankingHistory,
        loading,
        error,
        fetchHistory,
        addRanking,
    };
};
