import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../store';
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
    GetDomainOverviewParams,
    GetTopKeywordsParams,
    GetCompetitorsParams,
    GetTopicsParams,
    GetDomainAuthorityParams,
} from '@/types/domain-overview.type';

export const useDomainOverview = () => {
    const dispatch = useDispatch<AppDispatch>();
    const domainState = useSelector((state: RootState) => state.domain);

    const analyzeDomain = async (
        domain: string,
        options: {
            country?: string;
            includeSubdomains?: boolean;
            keywordsLimit?: number;
            competitorsLimit?: number;
            topicsLimit?: number;
            includeAuthority?: boolean;
        } = {}
    ) => {
        const {
            country = 'US',
            includeSubdomains = false,
            keywordsLimit = 50,
            competitorsLimit = 10,
            topicsLimit = 20,
            includeAuthority = true,
        } = options;

        // Set selected domain and country
        dispatch(setSelectedDomain(domain));
        dispatch(setSelectedCountry(country));

        // Clear previous data
        dispatch(clearDomainData());

        try {
            // Fetch core data in parallel
            const corePromises = [
                dispatch(fetchDomainOverview({ domain, includeSubdomains })),
                dispatch(fetchTopKeywords({ domain, country, limit: keywordsLimit })),
                dispatch(fetchCompetitors({ domain, country, limit: competitorsLimit })),
                dispatch(fetchTopics({ domain, limit: topicsLimit })),
            ];

            await Promise.all(corePromises);

            // Fetch authority data separately if requested
            if (includeAuthority) {
                await dispatch(fetchDomainAuthority({ domain }));
            }
        } catch (error) {
            console.error('Error analyzing domain:', error);
            throw error;
        }
    };

    const getDomainOverview = async (params: GetDomainOverviewParams) => {
        return dispatch(fetchDomainOverview(params));
    };

    const getTopKeywords = async (params: GetTopKeywordsParams) => {
        return dispatch(fetchTopKeywords(params));
    };

    const getCompetitors = async (params: GetCompetitorsParams) => {
        return dispatch(fetchCompetitors(params));
    };

    const getTopics = async (params: GetTopicsParams) => {
        return dispatch(fetchTopics(params));
    };

    const getDomainAuthority = async (params: GetDomainAuthorityParams) => {
        return dispatch(fetchDomainAuthority(params));
    };

    const setDomain = (domain: string) => {
        dispatch(setSelectedDomain(domain));
    };

    const setCountry = (country: string) => {
        dispatch(setSelectedCountry(country));
    };

    const addToMonitored = (domain: string) => {
        dispatch(addMonitoredDomain(domain));
    };

    const removeFromMonitored = (domain: string) => {
        dispatch(removeMonitoredDomain(domain));
    };

    const clearData = () => {
        dispatch(clearDomainData());
    };

    return {
        // State
        ...domainState,

        // Actions
        analyzeDomain,
        getDomainOverview,
        getTopKeywords,
        getCompetitors,
        getTopics,
        getDomainAuthority,
        setDomain,
        setCountry,
        addToMonitored,
        removeFromMonitored,
        clearData,

        // Computed states
        isLoading:
            domainState.overviewLoading ||
            domainState.topKeywordsLoading ||
            domainState.competitorsLoading ||
            domainState.topicsLoading ||
            domainState.authorityLoading,

        hasError:
            !!domainState.overviewError ||
            !!domainState.topKeywordsError ||
            !!domainState.competitorsError ||
            !!domainState.topicsError ||
            !!domainState.authorityError,

        errors: [
            domainState.overviewError,
            domainState.topKeywordsError,
            domainState.competitorsError,
            domainState.topicsError,
            domainState.authorityError,
        ].filter(Boolean),

        hasData: !!(
            domainState.overview ||
            domainState.topKeywords ||
            domainState.competitors ||
            domainState.topics ||
            domainState.authority
        ),
    };
};
