import { useDispatch, useSelector } from 'react-redux';
import { useCallback } from 'react';
import { AppDispatch, RootState } from '../store';
import {
    fetchProjectBacklinks,
    fetchBacklinkAnalytics,
    fetchBacklinkProfile,
    addBacklink,
    updateBacklink,
    deleteBacklink,
    bulkDeleteBacklinks,
    fetchBacklinkDetails,
    clearError,
    setFilters,
    setPagination,
    clearSelectedBacklink,
    resetBacklinkState,
} from '../slices/backlink.slice';
import {
    selectBacklinks,
    selectBacklinkProfile,
    selectBacklinkAnalytics,
    selectSelectedBacklink,
    selectBacklinkLoading,
    selectBacklinkProfileLoading,
    selectBacklinkAnalyticsLoading,
    selectBacklinkError,
    selectBacklinkPagination,
    selectBacklinkFilters,
    selectFilteredBacklinks,
    selectNewBacklinks,
    selectLostBacklinks,
    selectTopBacklinks,
    selectToxicLinks,
    selectAllBacklinksForTable,
    selectBacklinkSummary,
    selectAnchorTextDistribution,
    selectAuthorityScoreDistribution,
    selectLinkTypeDistribution,
    selectTopReferringDomains,
    selectTopTargetUrls,
    selectAnyBacklinkLoading,
} from '../selectors/backlink.selectors';
import { CreateBacklinkRequest, UpdateBacklinkRequest, BacklinkQueryParams } from '@/types/backlink.type';

export const useBacklink = () => {
    const dispatch = useDispatch<AppDispatch>();

    // Selectors
    const backlinks = useSelector(selectBacklinks);
    const backlinkProfile = useSelector(selectBacklinkProfile);
    const analytics = useSelector(selectBacklinkAnalytics);
    const selectedBacklink = useSelector(selectSelectedBacklink);
    const loading = useSelector(selectBacklinkLoading);
    const profileLoading = useSelector(selectBacklinkProfileLoading);
    const analyticsLoading = useSelector(selectBacklinkAnalyticsLoading);
    const anyLoading = useSelector(selectAnyBacklinkLoading);
    const error = useSelector(selectBacklinkError);
    const pagination = useSelector(selectBacklinkPagination);
    const filters = useSelector(selectBacklinkFilters);
    const filteredBacklinks = useSelector(selectFilteredBacklinks);

    // Derived data selectors
    const newBacklinks = useSelector(selectNewBacklinks);
    const lostBacklinks = useSelector(selectLostBacklinks);
    const topBacklinks = useSelector(selectTopBacklinks);
    const toxicLinks = useSelector(selectToxicLinks);
    const allBacklinksForTable = useSelector(selectAllBacklinksForTable);
    const backlinkSummary = useSelector(selectBacklinkSummary);
    const anchorTextDistribution = useSelector(selectAnchorTextDistribution);
    const authorityScoreDistribution = useSelector(selectAuthorityScoreDistribution);
    const linkTypeDistribution = useSelector(selectLinkTypeDistribution);
    const topReferringDomains = useSelector(selectTopReferringDomains);
    const topTargetUrls = useSelector(selectTopTargetUrls);

    // Actions
    const fetchBacklinks = useCallback(
        (projectId: string, params?: BacklinkQueryParams) => {
            return dispatch(fetchProjectBacklinks({ projectId, params }));
        },
        [dispatch]
    );

    const fetchAnalytics = useCallback(
        (projectId: string, params?: BacklinkQueryParams) => {
            return dispatch(fetchBacklinkAnalytics({ projectId, params }));
        },
        [dispatch]
    );

    const fetchProfile = useCallback(
        (projectId: string, params?: BacklinkQueryParams) => {
            return dispatch(fetchBacklinkProfile({ projectId, params }));
        },
        [dispatch]
    );

    const createBacklink = useCallback(
        (projectId: string, data: CreateBacklinkRequest) => {
            return dispatch(addBacklink({ projectId, data }));
        },
        [dispatch]
    );

    const editBacklink = useCallback(
        (projectId: string, backlinkId: string, data: UpdateBacklinkRequest) => {
            return dispatch(updateBacklink({ projectId, backlinkId, data }));
        },
        [dispatch]
    );

    const removeBacklink = useCallback(
        (projectId: string, backlinkId: string) => {
            return dispatch(deleteBacklink({ projectId, backlinkId }));
        },
        [dispatch]
    );

    const removeBacklinks = useCallback(
        (projectId: string, backlinkIds: string[]) => {
            return dispatch(bulkDeleteBacklinks({ projectId, backlinkIds }));
        },
        [dispatch]
    );

    const fetchBacklinkDetail = useCallback(
        (projectId: string, backlinkId: string) => {
            return dispatch(fetchBacklinkDetails({ projectId, backlinkId }));
        },
        [dispatch]
    );

    const updateFilters = useCallback(
        (newFilters: Partial<typeof filters>) => {
            dispatch(setFilters(newFilters));
        },
        [dispatch]
    );

    const updatePagination = useCallback(
        (newPagination: Partial<typeof pagination>) => {
            dispatch(setPagination(newPagination));
        },
        [dispatch]
    );

    const clearBacklinkError = useCallback(() => {
        dispatch(clearError());
    }, [dispatch]);

    const clearSelectedBacklinkData = useCallback(() => {
        dispatch(clearSelectedBacklink());
    }, [dispatch]);

    const resetState = useCallback(() => {
        dispatch(resetBacklinkState());
    }, [dispatch]);

    // Combined actions for easier use
    const initializeBacklinkData = useCallback(
        async (projectId: string, params?: BacklinkQueryParams) => {
            const promises = [
                dispatch(fetchBacklinkProfile({ projectId, params })),
                dispatch(fetchProjectBacklinks({ projectId, params })),
            ];

            try {
                await Promise.all(promises);
            } catch (error) {
                console.error('Error initializing backlink data:', error);
            }
        },
        [dispatch]
    );

    const refreshBacklinkData = useCallback(
        async (projectId: string, params?: BacklinkQueryParams) => {
            return initializeBacklinkData(projectId, params);
        },
        [initializeBacklinkData]
    );

    // Utility functions
    const getStatusColor = useCallback((status: string) => {
        const colors = {
            active: 'green',
            new: 'blue',
            lost: 'red',
        };
        return colors[status as keyof typeof colors] || 'default';
    }, []);

    const getAuthorityColor = useCallback((score: number) => {
        if (score >= 70) return '#52c41a';
        if (score >= 40) return '#faad14';
        return '#ff4d4f';
    }, []);

    const getLinkTypeColor = useCallback((linkType: string) => {
        const colors = {
            follow: '#52c41a',
            nofollow: '#faad14',
            sponsored: '#722ed1',
            ugc: '#13c2c2',
        };
        return colors[linkType as keyof typeof colors] || '#d9d9d9';
    }, []);

    return {
        // Data
        backlinks,
        backlinkProfile,
        analytics,
        selectedBacklink,
        filteredBacklinks,
        newBacklinks,
        lostBacklinks,
        topBacklinks,
        toxicLinks,
        allBacklinksForTable,
        backlinkSummary,
        anchorTextDistribution,
        authorityScoreDistribution,
        linkTypeDistribution,
        topReferringDomains,
        topTargetUrls,

        // Loading states
        loading,
        profileLoading,
        analyticsLoading,
        anyLoading,

        // Error state
        error,

        // UI state
        pagination,
        filters,

        // Actions
        fetchBacklinks,
        fetchAnalytics,
        fetchProfile,
        createBacklink,
        editBacklink,
        removeBacklink,
        removeBacklinks,
        fetchBacklinkDetail,
        updateFilters,
        updatePagination,
        clearBacklinkError,
        clearSelectedBacklinkData,
        resetState,
        initializeBacklinkData,
        refreshBacklinkData,

        // Utility functions
        getStatusColor,
        getAuthorityColor,
        getLinkTypeColor,
    };
};
