import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '@/stores/store';
import {
    analyzeDomain,
    fetchOrganicKeywords,
    fetchCompetitors,
    fetchTopPages,
    fetchApiLimits,
    clearError,
    clearKeywordsError,
    clearCompetitorsError,
    clearTopPagesError,
    setCurrentCountry,
    clearAllData,
} from '@/stores/slices/organic-research.slice';
import {
    OrganicKeywordsParams,
    CompetitorsParams,
    TopPagesParams,
} from '@/types/api.type';

// Main hook for organic research
export const useOrganicResearch = () => {
    const dispatch = useDispatch<AppDispatch>();
    const state = useSelector((state: RootState) => state.organicResearch);

    const performDomainAnalysis = async (domain: string, country: string = 'US') => {
        return dispatch(analyzeDomain({ domain, country }));
    };

    const getOrganicKeywords = async (domain: string, params: OrganicKeywordsParams) => {
        return dispatch(fetchOrganicKeywords({ domain, params }));
    };

    const getCompetitors = async (domain: string, params: CompetitorsParams) => {
        return dispatch(fetchCompetitors({ domain, params }));
    };

    const getTopPages = async (domain: string, params: TopPagesParams) => {
        return dispatch(fetchTopPages({ domain, params }));
    };

    const getApiLimits = async () => {
        return dispatch(fetchApiLimits());
    };

    const clearErrors = () => {
        dispatch(clearError());
    };

    const setCountry = (country: string) => {
        dispatch(setCurrentCountry(country));
    };

    const clearData = () => {
        dispatch(clearAllData());
    };

    return {
        // State
        ...state,

        // Actions
        performDomainAnalysis,
        getOrganicKeywords,
        getCompetitors,
        getTopPages,
        getApiLimits,
        clearErrors,
        clearKeywordsError: () => dispatch(clearKeywordsError()),
        clearCompetitorsError: () => dispatch(clearCompetitorsError()),
        clearTopPagesError: () => dispatch(clearTopPagesError()),
        setCountry,
        clearData,
    };
};

// Hook specifically for domain analysis
export const useDomainAnalysis = () => {
    const dispatch = useDispatch<AppDispatch>();
    const {
        domainAnalysis,
        loading,
        error,
        currentDomain,
        currentCountry,
    } = useSelector((state: RootState) => state.organicResearch);

    const analyzeDomainData = async (domain: string, country: string = 'US') => {
        return dispatch(analyzeDomain({ domain, country }));
    };

    const clearAnalysisError = () => {
        dispatch(clearError());
    };

    return {
        domainAnalysis,
        loading,
        error,
        currentDomain,
        currentCountry,
        analyzeDomain: analyzeDomainData,
        clearError: clearAnalysisError,
    };
};

// Hook specifically for organic keywords
export const useOrganicKeywords = () => {
    const dispatch = useDispatch<AppDispatch>();
    const {
        organicKeywords,
        keywordsLoading: loading,
        keywordsError: error,
    } = useSelector((state: RootState) => state.organicResearch);

    const fetchKeywords = async (domain: string, params: OrganicKeywordsParams) => {
        return dispatch(fetchOrganicKeywords({ domain, params }));
    };

    const clearKeywordError = () => {
        dispatch(clearKeywordsError());
    };

    return {
        organicKeywords,
        loading,
        error,
        fetchKeywords,
        clearError: clearKeywordError,
    };
};

// Hook specifically for competitors
export const useCompetitors = () => {
    const dispatch = useDispatch<AppDispatch>();
    const {
        competitors,
        competitorsLoading: loading,
        competitorsError: error,
    } = useSelector((state: RootState) => state.organicResearch);

    const fetchCompetitorsData = async (domain: string, params: CompetitorsParams) => {
        return dispatch(fetchCompetitors({ domain, params }));
    };

    const clearCompetitorError = () => {
        dispatch(clearCompetitorsError());
    };

    return {
        competitors,
        loading,
        error,
        fetchCompetitors: fetchCompetitorsData,
        clearError: clearCompetitorError,
    };
};

// Hook specifically for top pages
export const useTopPages = () => {
    const dispatch = useDispatch<AppDispatch>();
    const {
        topPages,
        topPagesLoading: loading,
        topPagesError: error,
    } = useSelector((state: RootState) => state.organicResearch);

    const fetchTopPagesData = async (domain: string, params: TopPagesParams) => {
        return dispatch(fetchTopPages({ domain, params }));
    };

    const clearTopPageError = () => {
        dispatch(clearTopPagesError());
    };

    return {
        topPages,
        loading,
        error,
        fetchTopPages: fetchTopPagesData,
        clearError: clearTopPageError,
    };
};

// Hook for API limits
export const useApiLimits = () => {
    const dispatch = useDispatch<AppDispatch>();
    const {
        apiLimits,
        loading,
        error,
    } = useSelector((state: RootState) => state.organicResearch);

    const fetchLimits = async () => {
        return dispatch(fetchApiLimits());
    };

    return {
        apiLimits,
        loading,
        error,
        fetchApiLimits: fetchLimits,
    };
};
