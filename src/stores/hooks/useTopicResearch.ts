import { useDispatch, useSelector } from "react-redux";
import { useCallback } from "react";
import { AppDispatch, RootState } from "@/stores/store";
import {
    generateTopicIdeas,
    getRelatedTopics,
    getTopicQuestions,
    batchAnalysis,
    getTrendingTopics,
    getAPIStatus,
    getKeywordDemo,
    researchTopic,
    getContentOpportunities,
    analyzeCompetitorTopics,
    getTopicClusters,
    clearTopicResearchData,
    clearTopicResearchErrors,
    setCurrentSearchParams,
    updateMetrics,
} from "@/stores/slices/topic-research.slice";
import {
    TopicResearchRequest,
    RelatedTopicsParams,
    TopicQuestionsParams,
    BatchAnalysisRequest,
    TrendingTopicsParams,
} from "@/types/topic-research.type";

export const useTopicResearch = () => {
    const dispatch = useDispatch<AppDispatch>();

    // Selectors with null safety
    const topicResearchState = useSelector((state: RootState) => state.topicResearch);

    // Provide default values in case state is undefined
    if (!topicResearchState) {
        console.warn('topicResearch state is undefined, returning default values');
        return {
            // Default empty state
            topicIdeas: [],
            relatedTopics: [],
            questions: [],
            batchResults: null,
            trendingTopics: [],
            apiStatus: null,
            keywordDemo: null,
            currentSeedKeyword: "",
            currentCountry: "US",
            currentIndustry: "",
            metrics: {
                avgVolume: 0,
                avgDifficulty: 0,
                avgOpportunity: 0,
                totalQuestions: 0,
            },

            // Loading states
            topicResearchLoading: false,
            relatedTopicsLoading: false,
            questionsLoading: false,
            batchAnalysisLoading: false,
            trendingTopicsLoading: false,
            apiStatusLoading: false,
            keywordDemoLoading: false,
            isLoading: false,

            // Error states
            topicResearchError: null,
            relatedTopicsError: null,
            questionsError: null,
            batchAnalysisError: null,
            trendingTopicsError: null,
            apiStatusError: null,
            keywordDemoError: null,
            hasError: false,

            // Computed values
            hasData: false,
            summaryStats: {
                totalTopicIdeas: 0,
                totalRelatedTopics: 0,
                totalQuestions: 0,
                totalTrendingTopics: 0,
                totalHeadlines: 0,
                avgVolume: 0,
                avgDifficulty: 0,
                avgOpportunity: 0,
                highOpportunityTopics: 0,
                lowDifficultyTopics: 0,
            },
            opportunityAnalysis: {
                highOpportunityLowDifficulty: [],
                trendingTopicsWithGoodVolume: [],
                questionsByIntent: {},
                topKeywordClusters: [],
            },

            // Default action functions
            generateTopicIdeas: () => Promise.resolve(),
            getRelatedTopics: () => Promise.resolve(),
            getTopicQuestions: () => Promise.resolve(),
            batchAnalysis: () => Promise.resolve(),
            getTrendingTopics: () => Promise.resolve(),
            getAPIStatus: () => Promise.resolve(),
            getKeywordDemo: () => Promise.resolve(),
            researchTopic: () => Promise.resolve(),
            getContentOpportunities: () => Promise.resolve(),
            analyzeCompetitorTopics: () => Promise.resolve(),
            getTopicClusters: () => Promise.resolve(),
            clearData: () => { },
            clearErrors: () => { },
            setCurrentSearchParams: () => { },
            updateMetrics: () => { },
        };
    }

    // Destructure state for easy access
    const {
        // Topic Ideas
        topicIdeas,
        topicResearchLoading,
        topicResearchError,        // Related Topics
        relatedTopics,
        relatedTopicsLoading,
        relatedTopicsError,

        // Questions
        questions,
        questionsLoading,
        questionsError,

        // Batch Analysis
        batchResults,
        batchAnalysisLoading,
        batchAnalysisError,

        // Trending Topics
        trendingTopics,
        trendingTopicsLoading,
        trendingTopicsError,

        // API Status
        apiStatus,
        apiStatusLoading,
        apiStatusError,

        // Keyword Demo
        keywordDemo,
        keywordDemoLoading,
        keywordDemoError,

        // Current search parameters
        currentSeedKeyword,
        currentCountry,
        currentIndustry,

        // Metrics
        metrics,
    } = topicResearchState;

    // Actions
    const handleGenerateTopicIdeas = useCallback(
        (params: TopicResearchRequest) => {
            return dispatch(generateTopicIdeas(params));
        },
        [dispatch]
    );

    const handleGetRelatedTopics = useCallback(
        (topic: string, params?: RelatedTopicsParams) => {
            return dispatch(getRelatedTopics({ topic, params }));
        },
        [dispatch]
    );

    const handleGetTopicQuestions = useCallback(
        (topic: string, params?: TopicQuestionsParams) => {
            return dispatch(getTopicQuestions({ topic, params }));
        },
        [dispatch]
    );

    const handleBatchAnalysis = useCallback(
        (params: BatchAnalysisRequest) => {
            return dispatch(batchAnalysis(params));
        },
        [dispatch]
    );

    const handleGetTrendingTopics = useCallback(
        (params?: TrendingTopicsParams) => {
            return dispatch(getTrendingTopics(params));
        },
        [dispatch]
    );

    const handleGetAPIStatus = useCallback(() => {
        return dispatch(getAPIStatus());
    }, [dispatch]);

    const handleGetKeywordDemo = useCallback(
        (keyword: string, country?: string) => {
            return dispatch(getKeywordDemo({ keyword, country }));
        },
        [dispatch]
    );

    const handleResearchTopic = useCallback(
        (
            seedKeyword: string,
            country?: string,
            industry?: string,
            contentType?: string
        ) => {
            return dispatch(researchTopic({ seedKeyword, country, industry, contentType }));
        },
        [dispatch]
    );

    const handleGetContentOpportunities = useCallback(
        (keyword: string, country?: string) => {
            return dispatch(getContentOpportunities({ keyword, country }));
        },
        [dispatch]
    );

    const handleAnalyzeCompetitorTopics = useCallback(
        (topics: string[], country?: string, includeQuestions?: boolean) => {
            return dispatch(analyzeCompetitorTopics({ topics, country, includeQuestions }));
        },
        [dispatch]
    );

    const handleGetTopicClusters = useCallback(
        (seedKeyword: string, country?: string) => {
            return dispatch(getTopicClusters({ seedKeyword, country }));
        },
        [dispatch]
    );

    const handleClearData = useCallback(() => {
        dispatch(clearTopicResearchData());
    }, [dispatch]);

    const handleClearErrors = useCallback(() => {
        dispatch(clearTopicResearchErrors());
    }, [dispatch]);

    const handleSetCurrentSearchParams = useCallback(
        (params: { seedKeyword?: string; country?: string; industry?: string }) => {
            dispatch(setCurrentSearchParams(params));
        },
        [dispatch]
    );

    const handleUpdateMetrics = useCallback(
        (metrics: Partial<typeof topicResearchState.metrics>) => {
            dispatch(updateMetrics(metrics));
        },
        [dispatch]
    );

    // Computed values
    const isLoading =
        topicResearchLoading ||
        relatedTopicsLoading ||
        questionsLoading ||
        batchAnalysisLoading ||
        trendingTopicsLoading ||
        apiStatusLoading ||
        keywordDemoLoading;

    const hasError =
        topicResearchError ||
        relatedTopicsError ||
        questionsError ||
        batchAnalysisError ||
        trendingTopicsError ||
        apiStatusError ||
        keywordDemoError;

    const hasData =
        topicIdeas.length > 0 ||
        relatedTopics.length > 0 ||
        questions.length > 0 ||
        batchResults !== null ||
        trendingTopics.length > 0 ||
        apiStatus !== null ||
        keywordDemo !== null;

    // Summary statistics
    const summaryStats = {
        totalTopicIdeas: topicIdeas.length,
        totalRelatedTopics: relatedTopics.length,
        totalQuestions: questions.length,
        totalTrendingTopics: trendingTopics.length,
        totalHeadlines: topicIdeas.reduce((sum: number, topic: any) => sum + (topic.relatedKeywords?.length || 0), 0),
        avgVolume: metrics.avgVolume,
        avgDifficulty: metrics.avgDifficulty,
        avgOpportunity: metrics.avgOpportunity,
        highOpportunityTopics: topicIdeas.filter((topic: any) => topic.opportunity > 70).length,
        lowDifficultyTopics: topicIdeas.filter((topic: any) => topic.difficulty < 50).length,
    };

    // Opportunity analysis
    const opportunityAnalysis = {
        highOpportunityLowDifficulty: topicIdeas.filter(
            (topic: any) => topic.opportunity > 70 && topic.difficulty < 50
        ),
        trendingTopicsWithGoodVolume: trendingTopics.filter(
            (topic: any) => topic.volume > 1000
        ),
        questionsByIntent: questions.reduce((acc: any, question: any) => {
            acc[question.intent] = (acc[question.intent] || 0) + 1;
            return acc;
        }, {} as Record<string, number>),
        topKeywordClusters: [...relatedTopics]
            .sort((a: any, b: any) => b.volume - a.volume)
            .slice(0, 10),
    };

    return {
        // State
        topicIdeas,
        relatedTopics,
        questions,
        batchResults,
        trendingTopics,
        apiStatus,
        keywordDemo,
        currentSeedKeyword,
        currentCountry,
        currentIndustry,
        metrics,

        // Loading states
        topicResearchLoading,
        relatedTopicsLoading,
        questionsLoading,
        batchAnalysisLoading,
        trendingTopicsLoading,
        apiStatusLoading,
        keywordDemoLoading,
        isLoading,

        // Error states
        topicResearchError,
        relatedTopicsError,
        questionsError,
        batchAnalysisError,
        trendingTopicsError,
        apiStatusError,
        keywordDemoError,
        hasError,

        // Computed values
        hasData,
        summaryStats,
        opportunityAnalysis,

        // Actions
        generateTopicIdeas: handleGenerateTopicIdeas,
        getRelatedTopics: handleGetRelatedTopics,
        getTopicQuestions: handleGetTopicQuestions,
        batchAnalysis: handleBatchAnalysis,
        getTrendingTopics: handleGetTrendingTopics,
        getAPIStatus: handleGetAPIStatus,
        getKeywordDemo: handleGetKeywordDemo,
        researchTopic: handleResearchTopic,
        getContentOpportunities: handleGetContentOpportunities,
        analyzeCompetitorTopics: handleAnalyzeCompetitorTopics,
        getTopicClusters: handleGetTopicClusters,
        clearData: handleClearData,
        clearErrors: handleClearErrors,
        setCurrentSearchParams: handleSetCurrentSearchParams,
        updateMetrics: handleUpdateMetrics,
    };
};
