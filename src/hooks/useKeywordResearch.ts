import { useDispatch, useSelector } from "react-redux";
import { useCallback, useEffect } from "react";
import { AppDispatch, RootState } from "@/stores/store";
import {
  // Actions
  fetchKeywordAnalysis,
  fetchKeywordVariations,
  fetchKeywordMagicTool,
  fetchTopicResearch,
  fetchTopicIdeas,
  fetchTrendingTopics,
  fetchQuestionBasedContent,
  fetchAIContentIdeas,
  fetchRelatedTopics,
  fetchKeywordDifficulty,
  fetchLongTailKeywords,
  fetchQuestionKeywords,
  fetchSeasonalTrends,
  fetchSerpAnalysis,
  fetchTopPages,
  fetchPublicKeywordSuggestions,
  testAIConnection,
  exportKeywords,
  saveToFavorites,
  fetchFavoriteKeywords,
  removeFromFavorites,
  bulkAnalyzeKeywords,
  // Action creators
  clearAllData,
  clearError,
  setCurrentParams,
  setSelectedKeywords,
  addSelectedKeyword,
  removeSelectedKeyword,
  clearSelectedKeywords,
  addToLocalFavorites,
  removeFromLocalFavorites,
  clearKeywordAnalysis,
  clearKeywordMagic,
  clearContentIdeas,
  resetLoadingStates,
} from "@/stores/slices/keyword-research.slice";
import { keywordResearchSelectors } from "@/stores/selectors/keyword-research.selectors";
import {
  KeywordAnalysisParams,
  KeywordMagicParams,
  TopicIdeaParams,
  AIContentIdeaParams,
  KeywordDifficultyParams,
  LongTailKeywordParams,
  QuestionKeywordParams,
  SeasonalTrendsParams,
  PublicKeywordParams,
  TopPagesParams,
  KeywordMagicFilters,
} from "@/types/keyword-research.type";

export const useKeywordResearch = () => {
  const dispatch = useDispatch<AppDispatch>();

  // ====================================================================
  // SELECTORS
  // ====================================================================

  const keywordResearchState = useSelector(
    keywordResearchSelectors.selectKeywordResearchState
  );
  const loading = useSelector(
    keywordResearchSelectors.selectKeywordResearchLoading
  );
  const error = useSelector(
    keywordResearchSelectors.selectKeywordResearchError
  );
  const currentParams = useSelector(
    keywordResearchSelectors.selectCurrentParams
  );
  const selectedKeywords = useSelector(
    keywordResearchSelectors.selectSelectedKeywords
  );
  const favoriteKeywords = useSelector(
    keywordResearchSelectors.selectFavoriteKeywords
  );

  // Data selectors
  const keywordAnalysis = useSelector(
    keywordResearchSelectors.selectKeywordAnalysis
  );
  const keywordVariations = useSelector(
    keywordResearchSelectors.selectKeywordVariations
  );
  const keywordMagic = useSelector(keywordResearchSelectors.selectKeywordMagic);
  const topicResearch = useSelector(
    keywordResearchSelectors.selectTopicResearch
  );
  const contentIdeas = useSelector(keywordResearchSelectors.selectContentIdeas);
  const trendingTopics = useSelector(
    keywordResearchSelectors.selectTrendingTopics
  );
  const questionBasedContent = useSelector(
    keywordResearchSelectors.selectQuestionBasedContent
  );
  const aiContentIdeas = useSelector(
    keywordResearchSelectors.selectAIContentIdeas
  );
  const relatedTopics = useSelector(
    keywordResearchSelectors.selectRelatedTopics
  );
  const keywordDifficulty = useSelector(
    keywordResearchSelectors.selectKeywordDifficulty
  );
  const longTailKeywords = useSelector(
    keywordResearchSelectors.selectLongTailKeywords
  );
  const questionKeywords = useSelector(
    keywordResearchSelectors.selectQuestionKeywords
  );
  const seasonalTrends = useSelector(
    keywordResearchSelectors.selectSeasonalTrends
  );
  const serpAnalysis = useSelector(keywordResearchSelectors.selectSerpAnalysis);
  const topPages = useSelector(keywordResearchSelectors.selectTopPages);
  const publicKeywordSuggestions = useSelector(
    keywordResearchSelectors.selectPublicKeywordSuggestions
  );

  // Computed selectors
  const isAnyLoading = useSelector(keywordResearchSelectors.selectIsAnyLoading);
  const keywordAnalysisData = useSelector(
    keywordResearchSelectors.selectKeywordAnalysisData
  );
  const topPerformingKeywords = useSelector(
    keywordResearchSelectors.selectTopPerformingKeywords
  );
  const highVolumeKeywords = useSelector(
    keywordResearchSelectors.selectHighVolumeKeywords
  );
  const keywordMagicSummary = useSelector(
    keywordResearchSelectors.selectKeywordMagicSummary
  );
  const primaryKeywords = useSelector(
    keywordResearchSelectors.selectPrimaryKeywords
  );
  const allMagicKeywords = useSelector(
    keywordResearchSelectors.selectAllMagicKeywords
  );
  const contentIdeasData = useSelector(
    keywordResearchSelectors.selectContentIdeasData
  );
  const highOpportunityIdeas = useSelector(
    keywordResearchSelectors.selectHighOpportunityIdeas
  );
  const trendingTopicsData = useSelector(
    keywordResearchSelectors.selectTrendingTopicsData
  );
  const fastestGrowingTopics = useSelector(
    keywordResearchSelectors.selectFastestGrowingTopics
  );
  const keywordStatsSummary = useSelector(
    keywordResearchSelectors.selectKeywordStatsSummary
  );

  // ====================================================================
  // ACTION DISPATCHERS
  // ====================================================================

  // Keyword Analysis
  const getKeywordAnalysis = useCallback(
    (params: KeywordAnalysisParams) => {
      return dispatch(fetchKeywordAnalysis(params));
    },
    [dispatch]
  );

  const getKeywordVariations = useCallback(
    (domain: string) => {
      return dispatch(fetchKeywordVariations(domain));
    },
    [dispatch]
  );

  const getKeywordMagicTool = useCallback(
    (params: KeywordMagicParams) => {
      return dispatch(fetchKeywordMagicTool(params));
    },
    [dispatch]
  );

  const getTopicResearch = useCallback(
    (keyword: string, country?: string) => {
      return dispatch(fetchTopicResearch({ keyword, country }));
    },
    [dispatch]
  );

  // Content Ideas
  const getTopicIdeas = useCallback(
    (params: TopicIdeaParams) => {
      return dispatch(fetchTopicIdeas(params));
    },
    [dispatch]
  );

  const getTrendingTopics = useCallback(
    (category?: string, country?: string, limit?: number) => {
      return dispatch(fetchTrendingTopics({ category, country, limit }));
    },
    [dispatch]
  );

  const getQuestionBasedContent = useCallback(
    (topic: string, limit?: number, country?: string) => {
      return dispatch(fetchQuestionBasedContent({ topic, limit, country }));
    },
    [dispatch]
  );

  const getAIContentIdeas = useCallback(
    (params: AIContentIdeaParams) => {
      return dispatch(fetchAIContentIdeas(params));
    },
    [dispatch]
  );

  const getRelatedTopics = useCallback(
    (topic: string, limit?: number, country?: string) => {
      return dispatch(fetchRelatedTopics({ topic, limit, country }));
    },
    [dispatch]
  );

  // Keyword Difficulty
  const analyzeKeywordDifficulty = useCallback(
    (params: KeywordDifficultyParams) => {
      return dispatch(fetchKeywordDifficulty(params));
    },
    [dispatch]
  );

  // AI-Powered Tools
  const getLongTailKeywords = useCallback(
    (params: LongTailKeywordParams) => {
      return dispatch(fetchLongTailKeywords(params));
    },
    [dispatch]
  );

  const getQuestionKeywords = useCallback(
    (params: QuestionKeywordParams) => {
      return dispatch(fetchQuestionKeywords(params));
    },
    [dispatch]
  );

  const getSeasonalTrends = useCallback(
    (params: SeasonalTrendsParams) => {
      return dispatch(fetchSeasonalTrends(params));
    },
    [dispatch]
  );

  // Public APIs
  const getPublicKeywordSuggestions = useCallback(
    (params: PublicKeywordParams) => {
      return dispatch(fetchPublicKeywordSuggestions(params));
    },
    [dispatch]
  );

  const checkAIConnection = useCallback(() => {
    return dispatch(testAIConnection());
  }, [dispatch]);

  // SERP Analysis
  const getSerpAnalysis = useCallback(
    (projectId: string) => {
      return dispatch(fetchSerpAnalysis(projectId));
    },
    [dispatch]
  );

  const getTopPages = useCallback(
    (params: TopPagesParams) => {
      return dispatch(fetchTopPages(params));
    },
    [dispatch]
  );

  // Utility Functions
  const handleExportKeywords = useCallback(
    (keywords: string[], format?: "csv" | "xlsx") => {
      return dispatch(exportKeywords({ keywords, format }));
    },
    [dispatch]
  );

  const addToFavorites = useCallback(
    (keywords: string[]) => {
      return dispatch(saveToFavorites(keywords));
    },
    [dispatch]
  );

  const getFavoriteKeywords = useCallback(() => {
    return dispatch(fetchFavoriteKeywords());
  }, [dispatch]);

  const removeKeywordsFromFavorites = useCallback(
    (keywords: string[]) => {
      return dispatch(removeFromFavorites(keywords));
    },
    [dispatch]
  );

  const bulkAnalyze = useCallback(
    (keywords: string[], country?: string) => {
      return dispatch(bulkAnalyzeKeywords({ keywords, country }));
    },
    [dispatch]
  );

  // ====================================================================
  // STATE MANAGEMENT ACTIONS
  // ====================================================================

  const clearAll = useCallback(() => {
    dispatch(clearAllData());
  }, [dispatch]);

  const clearErrorState = useCallback(() => {
    dispatch(clearError());
  }, [dispatch]);

  const updateCurrentParams = useCallback(
    (params: {
      domain?: string;
      seedKeyword?: string;
      country?: string;
      filters?: KeywordMagicFilters;
    }) => {
      dispatch(setCurrentParams(params));
    },
    [dispatch]
  );

  const updateSelectedKeywords = useCallback(
    (keywords: string[]) => {
      dispatch(setSelectedKeywords(keywords));
    },
    [dispatch]
  );

  const selectKeyword = useCallback(
    (keyword: string) => {
      dispatch(addSelectedKeyword(keyword));
    },
    [dispatch]
  );

  const unselectKeyword = useCallback(
    (keyword: string) => {
      dispatch(removeSelectedKeyword(keyword));
    },
    [dispatch]
  );

  const clearSelection = useCallback(() => {
    dispatch(clearSelectedKeywords());
  }, [dispatch]);

  const addToLocalFavoritesList = useCallback(
    (keywords: string[]) => {
      dispatch(addToLocalFavorites(keywords));
    },
    [dispatch]
  );

  const removeFromLocalFavoritesList = useCallback(
    (keywords: string[]) => {
      dispatch(removeFromLocalFavorites(keywords));
    },
    [dispatch]
  );

  const clearKeywordAnalysisData = useCallback(() => {
    dispatch(clearKeywordAnalysis());
  }, [dispatch]);

  const clearKeywordMagicData = useCallback(() => {
    dispatch(clearKeywordMagic());
  }, [dispatch]);

  const clearContentIdeasData = useCallback(() => {
    dispatch(clearContentIdeas());
  }, [dispatch]);

  const resetLoading = useCallback(() => {
    dispatch(resetLoadingStates());
  }, [dispatch]);

  // ====================================================================
  // HELPER FUNCTIONS
  // ====================================================================

  const isKeywordFavorite = useCallback(
    (keyword: string) => {
      return favoriteKeywords.includes(keyword);
    },
    [favoriteKeywords]
  );

  const isKeywordSelected = useCallback(
    (keyword: string) => {
      return selectedKeywords.includes(keyword);
    },
    [selectedKeywords]
  );

  const toggleKeywordSelection = useCallback(
    (keyword: string) => {
      if (selectedKeywords.includes(keyword)) {
        unselectKeyword(keyword);
      } else {
        selectKeyword(keyword);
      }
    },
    [selectedKeywords, selectKeyword, unselectKeyword]
  );

  const toggleKeywordFavorite = useCallback(
    async (keyword: string) => {
      if (favoriteKeywords.includes(keyword)) {
        await removeKeywordsFromFavorites([keyword]);
      } else {
        await addToFavorites([keyword]);
      }
    },
    [favoriteKeywords, addToFavorites, removeKeywordsFromFavorites]
  );

  // ====================================================================
  // COMPOUND OPERATIONS
  // ====================================================================

  const performCompleteKeywordResearch = useCallback(
    async (seedKeyword: string, domain?: string, country = "US") => {
      updateCurrentParams({ seedKeyword, domain, country });

      const operations = [];

      // Core keyword research
      if (domain) {
        operations.push(getKeywordAnalysis({ domain, country, limit: 100 }));
        operations.push(getKeywordVariations(domain));
      }

      operations.push(
        getKeywordMagicTool({
          seedKeyword,
          country,
          includeLongTail: true,
          includeQuestions: true,
          includeRelated: true,
        })
      );

      operations.push(getTopicResearch(seedKeyword, country));
      operations.push(getTopicIdeas({ seedKeyword, country, limit: 30 }));
      operations.push(getRelatedTopics(seedKeyword, 20, country));

      try {
        await Promise.all(operations);
        return { success: true };
      } catch (error) {
        console.error("Complete keyword research failed:", error);
        return { success: false, error };
      }
    },
    [
      updateCurrentParams,
      getKeywordAnalysis,
      getKeywordVariations,
      getKeywordMagicTool,
      getTopicResearch,
      getTopicIdeas,
      getRelatedTopics,
    ]
  );

  const performContentIdeaResearch = useCallback(
    async (topic: string, country = "US") => {
      const operations = [
        getTopicIdeas({ seedKeyword: topic, country, limit: 30 }),
        getTrendingTopics(undefined, country, 20),
        getQuestionBasedContent(topic, 50, country),
        getAIContentIdeas({
          topic,
          audience: "general",
          format: "blog",
          count: 10,
        }),
        getRelatedTopics(topic, 30, country),
      ];

      try {
        await Promise.all(operations);
        return { success: true };
      } catch (error) {
        console.error("Content idea research failed:", error);
        return { success: false, error };
      }
    },
    [
      getTopicIdeas,
      getTrendingTopics,
      getQuestionBasedContent,
      getAIContentIdeas,
      getRelatedTopics,
    ]
  );

  const performCompetitorAnalysis = useCallback(
    async (domain: string, country = "US") => {
      const operations = [
        getKeywordAnalysis({ domain, country, limit: 200 }),
        getTopPages({ domain, country, limit: 50 }),
      ];

      try {
        await Promise.all(operations);
        return { success: true };
      } catch (error) {
        console.error("Competitor analysis failed:", error);
        return { success: false, error };
      }
    },
    [getKeywordAnalysis, getTopPages]
  );

  // ====================================================================
  // EFFECTS
  // ====================================================================

  // Load favorite keywords on mount
  useEffect(() => {
    getFavoriteKeywords();
  }, [getFavoriteKeywords]);

  // ====================================================================
  // RETURN OBJECT
  // ====================================================================

  return {
    // State
    keywordResearchState,
    loading,
    error,
    currentParams,
    selectedKeywords,
    favoriteKeywords,

    // Data
    keywordAnalysis,
    keywordVariations,
    keywordMagic,
    topicResearch,
    contentIdeas,
    trendingTopics,
    questionBasedContent,
    aiContentIdeas,
    relatedTopics,
    keywordDifficulty,
    longTailKeywords,
    questionKeywords,
    seasonalTrends,
    serpAnalysis,
    topPages,
    publicKeywordSuggestions,

    // Computed data
    isAnyLoading,
    keywordAnalysisData,
    topPerformingKeywords,
    highVolumeKeywords,
    keywordMagicSummary,
    primaryKeywords,
    allMagicKeywords,
    contentIdeasData,
    highOpportunityIdeas,
    trendingTopicsData,
    fastestGrowingTopics,
    keywordStatsSummary,

    // Actions
    getKeywordAnalysis,
    getKeywordVariations,
    getKeywordMagicTool,
    getTopicResearch,
    getTopicIdeas,
    getTrendingTopics,
    getQuestionBasedContent,
    getAIContentIdeas,
    getRelatedTopics,
    analyzeKeywordDifficulty,
    getLongTailKeywords,
    getQuestionKeywords,
    getSeasonalTrends,
    getPublicKeywordSuggestions,
    checkAIConnection,
    getSerpAnalysis,
    getTopPages,
    handleExportKeywords,
    addToFavorites,
    getFavoriteKeywords,
    removeKeywordsFromFavorites,
    bulkAnalyze,

    // State management
    clearAll,
    clearErrorState,
    updateCurrentParams,
    updateSelectedKeywords,
    selectKeyword,
    unselectKeyword,
    clearSelection,
    addToLocalFavoritesList,
    removeFromLocalFavoritesList,
    clearKeywordAnalysisData,
    clearKeywordMagicData,
    clearContentIdeasData,
    resetLoading,

    // Helpers
    isKeywordFavorite,
    isKeywordSelected,
    toggleKeywordSelection,
    toggleKeywordFavorite,

    // Compound operations
    performCompleteKeywordResearch,
    performContentIdeaResearch,
    performCompetitorAnalysis,
  };
};

export default useKeywordResearch;
