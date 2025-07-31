import { useAppDispatch, useAppSelector } from './';
import {
    fetchDomainOverview,
    fetchTopKeywords,
    fetchCompetitors,
    fetchTopics,
    fetchDomainAuthority,
    setSelectedDomain,
    setSelectedCountry,
    addMonitoredDomain,
    removeMonitoredDomain,
    clearDomainData,
} from '../slices/domain.slice';
import {
    selectDomainOverview,
    selectDomainOverviewLoading,
    selectDomainOverviewError,
    selectTopKeywords,
    selectTopKeywordsLoading,
    selectTopKeywordsError,
    selectCompetitors,
    selectCompetitorsLoading,
    selectCompetitorsError,
    selectTopics,
    selectTopicsLoading,
    selectTopicsError,
    selectDomainAuthority,
    selectDomainAuthorityLoading,
    selectDomainAuthorityError,
    selectSelectedDomain,
    selectSelectedCountry,
    selectMonitoredDomains,
    selectIsAnyLoading,
    selectHasAnyError,
    selectAllErrors,
} from '../selectors/domain.selectors';
import {
    GetDomainOverviewParams,
    GetTopKeywordsParams,
    GetCompetitorsParams,
    GetTopicsParams
} from '../../services/domain.service';
import { useCallback } from 'react';

export const useDomain = () => {
    const dispatch = useAppDispatch();

    // Selectors
    const overview = useAppSelector(selectDomainOverview);
    const overviewLoading = useAppSelector(selectDomainOverviewLoading);
    const overviewError = useAppSelector(selectDomainOverviewError);

    const topKeywords = useAppSelector(selectTopKeywords);
    const topKeywordsLoading = useAppSelector(selectTopKeywordsLoading);
    const topKeywordsError = useAppSelector(selectTopKeywordsError);

    const competitors = useAppSelector(selectCompetitors);
    const competitorsLoading = useAppSelector(selectCompetitorsLoading);
    const competitorsError = useAppSelector(selectCompetitorsError);

    const topics = useAppSelector(selectTopics);
    const topicsLoading = useAppSelector(selectTopicsLoading);
    const topicsError = useAppSelector(selectTopicsError);

    const authority = useAppSelector(selectDomainAuthority);
    const authorityLoading = useAppSelector(selectDomainAuthorityLoading);
    const authorityError = useAppSelector(selectDomainAuthorityError);

    const selectedDomain = useAppSelector(selectSelectedDomain);
    const selectedCountry = useAppSelector(selectSelectedCountry);
    const monitoredDomains = useAppSelector(selectMonitoredDomains);

    const isAnyLoading = useAppSelector(selectIsAnyLoading);
    const hasAnyError = useAppSelector(selectHasAnyError);
    const allErrors = useAppSelector(selectAllErrors);

    // Action creators
    const getDomainOverview = useCallback(
        (params: GetDomainOverviewParams) => {
            return dispatch(fetchDomainOverview(params));
        },
        [dispatch]
    );

    const getTopKeywords = useCallback(
        (params: GetTopKeywordsParams) => {
            return dispatch(fetchTopKeywords(params));
        },
        [dispatch]
    );

    const getCompetitors = useCallback(
        (params: GetCompetitorsParams) => {
            return dispatch(fetchCompetitors(params));
        },
        [dispatch]
    );

    const getTopics = useCallback(
        (params: GetTopicsParams) => {
            return dispatch(fetchTopics(params));
        },
        [dispatch]
    );

    const getDomainAuthority = useCallback(
        (domain: string) => {
            return dispatch(fetchDomainAuthority(domain));
        },
        [dispatch]
    );

    const setDomain = useCallback(
        (domain: string) => {
            dispatch(setSelectedDomain(domain));
        },
        [dispatch]
    );

    const setCountry = useCallback(
        (country: string) => {
            dispatch(setSelectedCountry(country));
        },
        [dispatch]
    );

    const addDomain = useCallback(
        (domain: string) => {
            dispatch(addMonitoredDomain(domain));
        },
        [dispatch]
    );

    const removeDomain = useCallback(
        (domain: string) => {
            dispatch(removeMonitoredDomain(domain));
        },
        [dispatch]
    );

    const clearData = useCallback(() => {
        dispatch(clearDomainData());
    }, [dispatch]);

    // Utility functions
    const analyzeDomain = useCallback(
        async (domain: string, country: string = 'US', includeSubdomains: boolean = false) => {
            const params = { domain, country, includeSubdomains };

            // Parallel fetch all domain data
            const promises = [
                dispatch(fetchDomainOverview({ domain, includeSubdomains })),
                dispatch(fetchTopKeywords({ domain, country, limit: 100 })),
                dispatch(fetchCompetitors({ domain, country, limit: 50 })),
                dispatch(fetchTopics({ domain, limit: 50 })),
                dispatch(fetchDomainAuthority(domain)),
            ];

            try {
                await Promise.all(promises);
            } catch (error) {
                console.error('Error analyzing domain:', error);
            }
        },
        [dispatch]
    );

    return {
        // Data
        overview,
        topKeywords,
        competitors,
        topics,
        authority,

        // Loading states
        overviewLoading,
        topKeywordsLoading,
        competitorsLoading,
        topicsLoading,
        authorityLoading,
        isAnyLoading,

        // Error states
        overviewError,
        topKeywordsError,
        competitorsError,
        topicsError,
        authorityError,
        hasAnyError,
        allErrors,

        // UI state
        selectedDomain,
        selectedCountry,
        monitoredDomains,

        // Actions
        getDomainOverview,
        getTopKeywords,
        getCompetitors,
        getTopics,
        getDomainAuthority,
        setDomain,
        setCountry,
        addDomain,
        removeDomain,
        clearData,
        analyzeDomain,
    };
};
