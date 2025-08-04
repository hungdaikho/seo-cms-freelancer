import { useAppSelector, useAppDispatch } from "@/stores/hooks";
import {
    analyzeKeywordGaps,
    discoverCompetitors,
    analyzeCompetitor,
    addCompetitor,
    removeCompetitor,
    clearCompetitors,
    updateFilters,
    setActiveTab,
    clearAnalysisData,
    clearCompetitorDiscovery,
    clearErrors,
    KeywordGapFilters
} from "@/stores/slices/keyword-gap.slice";
import { KeywordGapRequest, KeywordData } from "@/services/keyword-gap.service";
import { keywordGapService } from "@/services/keyword-gap.service";

export const useKeywordGap = () => {
    const dispatch = useAppDispatch();
    const keywordGapState = useAppSelector((state) => state.keywordGap);

    const actions = {
        // Analysis actions
        analyzeGaps: (request: KeywordGapRequest) => {
            return dispatch(analyzeKeywordGaps(request));
        },

        discoverCompetitors: (domain: string, country: string = "US", limit: number = 20) => {
            return dispatch(discoverCompetitors({ domain, country, limit }));
        },

        analyzeCompetitor: (competitorDomain: string, yourDomain: string, industry: string) => {
            return dispatch(analyzeCompetitor({ competitorDomain, yourDomain, industry }));
        },

        // Competitor management
        addCompetitor: (competitor: string) => {
            dispatch(addCompetitor(competitor));
        },

        removeCompetitor: (competitor: string) => {
            dispatch(removeCompetitor(competitor));
        },

        clearCompetitors: () => {
            dispatch(clearCompetitors());
        },

        // Filters
        updateFilters: (filters: Partial<KeywordGapFilters>) => {
            dispatch(updateFilters(filters));
        },

        // UI state
        setActiveTab: (tab: string) => {
            dispatch(setActiveTab(tab));
        },

        // Data management
        clearAnalysisData: () => {
            dispatch(clearAnalysisData());
        },

        clearCompetitorDiscovery: () => {
            dispatch(clearCompetitorDiscovery());
        },

        clearErrors: () => {
            dispatch(clearErrors());
        },

        // Export functionality
        exportKeywordGaps: () => {
            if (keywordGapState.keywordOpportunities.length > 0) {
                const csvContent = keywordGapService.exportKeywordGaps(keywordGapState.keywordOpportunities);

                // Create and download CSV file
                const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
                const link = document.createElement('a');
                const url = URL.createObjectURL(blob);
                link.setAttribute('href', url);
                link.setAttribute('download', `keyword-gaps-${new Date().toISOString().split('T')[0]}.csv`);
                link.style.visibility = 'hidden';
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
            }
        },
    };

    const computed = {
        // Summary statistics
        easyWinCount: keywordGapState.keywordOpportunities.filter(
            (gap: KeywordData) => gap.opportunity === "easy-win"
        ).length,

        quickWinCount: keywordGapState.keywordOpportunities.filter(
            (gap: KeywordData) => gap.opportunity === "quick-win"
        ).length,

        contentGapCount: keywordGapState.keywordOpportunities.filter(
            (gap: KeywordData) => gap.opportunity === "content-gap"
        ).length,

        averageDifficulty: keywordGapState.keywordOpportunities.length > 0
            ? Math.round(
                keywordGapState.keywordOpportunities.reduce(
                    (sum: number, gap: KeywordData) => sum + gap.difficulty,
                    0
                ) / keywordGapState.keywordOpportunities.length
            )
            : 0,

        averageVolume: keywordGapState.keywordOpportunities.length > 0
            ? Math.round(
                keywordGapState.keywordOpportunities.reduce(
                    (sum: number, gap: KeywordData) => sum + gap.searchVolume,
                    0
                ) / keywordGapState.keywordOpportunities.length
            )
            : 0,

        // Filter validation
        canStartAnalysis: keywordGapState.selectedCompetitors.length > 0,

        // Loading states
        isLoading: keywordGapState.isAnalyzing ||
            keywordGapState.isDiscoveringCompetitors ||
            keywordGapState.isAnalyzingCompetitor,

        hasErrors: !!(keywordGapState.analysisError ||
            keywordGapState.discoveryError ||
            keywordGapState.competitorError),

        // Data availability
        hasAnalysisData: !!keywordGapState.analysisResult,
        hasCompetitorData: !!keywordGapState.competitorDiscovery,
        hasOpportunities: keywordGapState.keywordOpportunities.length > 0,
    };

    return {
        ...keywordGapState,
        actions,
        computed,
    };
};
