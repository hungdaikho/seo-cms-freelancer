import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "../store";
import {
  KeywordResearchState,
  KeywordAnalysisResult,
  PrimaryKeyword,
  LongTailKeyword,
  QuestionKeyword,
  TopicIdea,
  TrendingTopic,
} from "@/types/keyword-research.type";

// ====================================================================
// BASE SELECTORS
// ====================================================================

export const selectKeywordResearchState = (
  state: RootState
): KeywordResearchState => state.keywordResearch;

export const selectKeywordResearchLoading = (state: RootState) =>
  state.keywordResearch.loading;

export const selectKeywordResearchError = (state: RootState) =>
  state.keywordResearch.error;

export const selectCurrentParams = (state: RootState) =>
  state.keywordResearch.currentParams;

export const selectSelectedKeywords = (state: RootState) =>
  state.keywordResearch.selectedKeywords;

export const selectFavoriteKeywords = (state: RootState) =>
  state.keywordResearch.favoriteKeywords;

// ====================================================================
// DATA SELECTORS
// ====================================================================

export const selectKeywordAnalysis = (state: RootState) =>
  state.keywordResearch.keywordAnalysis;

export const selectKeywordVariations = (state: RootState) =>
  state.keywordResearch.keywordVariations;

export const selectKeywordMagic = (state: RootState) =>
  state.keywordResearch.keywordMagic;

export const selectTopicResearch = (state: RootState) =>
  state.keywordResearch.topicResearch;

export const selectContentIdeas = (state: RootState) =>
  state.keywordResearch.contentIdeas;

export const selectTrendingTopics = (state: RootState) =>
  state.keywordResearch.trendingTopics;

export const selectQuestionBasedContent = (state: RootState) =>
  state.keywordResearch.questionBasedContent;

export const selectAIContentIdeas = (state: RootState) =>
  state.keywordResearch.aiContentIdeas;

export const selectRelatedTopics = (state: RootState) =>
  state.keywordResearch.relatedTopics;

export const selectKeywordDifficulty = (state: RootState) =>
  state.keywordResearch.keywordDifficulty;

export const selectLongTailKeywords = (state: RootState) =>
  state.keywordResearch.longTailKeywords;

export const selectQuestionKeywords = (state: RootState) =>
  state.keywordResearch.questionKeywords;

export const selectSeasonalTrends = (state: RootState) =>
  state.keywordResearch.seasonalTrends;

export const selectSerpAnalysis = (state: RootState) =>
  state.keywordResearch.serpAnalysis;

export const selectTopPages = (state: RootState) =>
  state.keywordResearch.topPages;

export const selectPublicKeywordSuggestions = (state: RootState) =>
  state.keywordResearch.publicKeywordSuggestions;

// ====================================================================
// COMPUTED SELECTORS
// ====================================================================

// Check if any data is loading
export const selectIsAnyLoading = createSelector(
  [selectKeywordResearchLoading],
  (loading) => {
    return Object.values(loading).some((isLoading) => isLoading);
  }
);

// Get total keywords from keyword analysis
export const selectKeywordAnalysisTotal = createSelector(
  [selectKeywordAnalysis],
  (keywordAnalysis) => {
    return keywordAnalysis?.total || 0;
  }
);

// Get keyword analysis data
export const selectKeywordAnalysisData = createSelector(
  [selectKeywordAnalysis],
  (keywordAnalysis) => {
    return keywordAnalysis?.data || [];
  }
);

// Get top performing keywords from analysis
export const selectTopPerformingKeywords = createSelector(
  [selectKeywordAnalysisData],
  (keywords): KeywordAnalysisResult[] => {
    return keywords
      .filter((keyword) => keyword.position && keyword.position <= 10)
      .sort((a, b) => (a.position || 999) - (b.position || 999))
      .slice(0, 10);
  }
);

// Get keywords with high search volume
export const selectHighVolumeKeywords = createSelector(
  [selectKeywordAnalysisData],
  (keywords): KeywordAnalysisResult[] => {
    return keywords
      .filter((keyword) => keyword.searchVolume >= 1000)
      .sort((a, b) => b.searchVolume - a.searchVolume)
      .slice(0, 20);
  }
);

// Get keyword magic tool summary
export const selectKeywordMagicSummary = createSelector(
  [selectKeywordMagic],
  (keywordMagic) => {
    return keywordMagic?.summary || null;
  }
);

// Get primary keywords from magic tool
export const selectPrimaryKeywords = createSelector(
  [selectKeywordMagic],
  (keywordMagic): PrimaryKeyword[] => {
    return keywordMagic?.primaryKeywords || [];
  }
);

// Get long-tail keywords from magic tool
export const selectMagicLongTailKeywords = createSelector(
  [selectKeywordMagic],
  (keywordMagic): LongTailKeyword[] => {
    return keywordMagic?.longTailKeywords || [];
  }
);

// Get question keywords from magic tool
export const selectMagicQuestionKeywords = createSelector(
  [selectKeywordMagic],
  (keywordMagic): QuestionKeyword[] => {
    return keywordMagic?.questionKeywords || [];
  }
);

// Get all keywords from magic tool combined
export const selectAllMagicKeywords = createSelector(
  [
    selectPrimaryKeywords,
    selectMagicLongTailKeywords,
    selectMagicQuestionKeywords,
  ],
  (primary, longTail, questions) => {
    const allKeywords = [
      ...primary.map((k) => ({ ...k, type: "primary" as const })),
      ...longTail.map((k) => ({ ...k, type: "longTail" as const })),
      ...questions.map((k) => ({
        keyword: k.question,
        searchVolume: k.searchVolume,
        difficulty: k.difficulty,
        intent: k.intent,
        trend: "stable" as const,
        type: "question" as const,
      })),
    ];
    return allKeywords;
  }
);

// Get content ideas data
export const selectContentIdeasData = createSelector(
  [selectContentIdeas],
  (contentIdeas): TopicIdea[] => {
    return contentIdeas?.topicIdeas || [];
  }
);

// Get content ideas metrics
export const selectContentIdeasMetrics = createSelector(
  [selectContentIdeas],
  (contentIdeas) => {
    return contentIdeas?.metrics || null;
  }
);

// Get high opportunity content ideas
export const selectHighOpportunityIdeas = createSelector(
  [selectContentIdeasData],
  (ideas): TopicIdea[] => {
    return ideas
      .filter((idea) => idea.opportunity >= 70)
      .sort((a, b) => b.opportunity - a.opportunity)
      .slice(0, 10);
  }
);

// Get trending topics data
export const selectTrendingTopicsData = createSelector(
  [selectTrendingTopics],
  (trendingTopics): TrendingTopic[] => {
    return trendingTopics?.trendingTopics || [];
  }
);

// Get fastest growing topics
export const selectFastestGrowingTopics = createSelector(
  [selectTrendingTopicsData],
  (topics): TrendingTopic[] => {
    return topics.sort((a, b) => b.growth - a.growth).slice(0, 5);
  }
);

// Get questions from question-based content
export const selectQuestionsData = createSelector(
  [selectQuestionBasedContent],
  (questionContent) => {
    return questionContent?.questions || [];
  }
);

// Get high-value questions (high volume, low difficulty)
export const selectHighValueQuestions = createSelector(
  [selectQuestionsData],
  (questions) => {
    return questions
      .filter((q) => q.searchVolume >= 500 && q.difficulty <= 60)
      .sort((a, b) => b.searchVolume - a.searchVolume)
      .slice(0, 10);
  }
);

// Get related topics data
export const selectRelatedTopicsData = createSelector(
  [selectRelatedTopics],
  (relatedTopics) => {
    return relatedTopics?.relatedTopics || [];
  }
);

// Get topic clusters
export const selectTopicClusters = createSelector(
  [selectRelatedTopics],
  (relatedTopics) => {
    return relatedTopics?.clusters || [];
  }
);

// Get high relevance related topics
export const selectHighRelevanceTopics = createSelector(
  [selectRelatedTopicsData],
  (topics) => {
    return topics
      .filter((topic) => topic.relevance >= 80)
      .sort((a, b) => b.relevance - a.relevance)
      .slice(0, 10);
  }
);

// Get keyword difficulty results
export const selectKeywordDifficultyResults = createSelector(
  [selectKeywordDifficulty],
  (keywordDifficulty) => {
    return keywordDifficulty?.results || [];
  }
);

// Get easy keywords (low difficulty, high volume)
export const selectEasyKeywords = createSelector(
  [selectKeywordDifficultyResults],
  (results) => {
    return results
      .filter(
        (result) => result.difficulty <= 40 && result.searchVolume >= 1000
      )
      .sort((a, b) => a.difficulty - b.difficulty);
  }
);

// Get long-tail keywords data
export const selectLongTailKeywordsData = createSelector(
  [selectLongTailKeywords],
  (longTail) => {
    return longTail?.longTailKeywords || [];
  }
);

// Get high opportunity long-tail keywords
export const selectHighOpportunityLongTail = createSelector(
  [selectLongTailKeywordsData],
  (keywords) => {
    return keywords
      .filter((keyword) => keyword.opportunity >= 70)
      .sort((a, b) => b.opportunity - a.opportunity)
      .slice(0, 15);
  }
);

// Get question keywords data
export const selectQuestionKeywordsData = createSelector(
  [selectQuestionKeywords],
  (questionKeywords) => {
    return questionKeywords?.questionKeywords || [];
  }
);

// Get question keywords by type
export const selectQuestionKeywordsByType = createSelector(
  [selectQuestionKeywordsData],
  (questions) => {
    const grouped = questions.reduce((acc, question) => {
      const type = question.questionType;
      if (!acc[type]) acc[type] = [];
      acc[type].push(question);
      return acc;
    }, {} as Record<string, QuestionKeyword[]>);

    return grouped;
  }
);

// Get seasonal trends data
export const selectSeasonalTrendsData = createSelector(
  [selectSeasonalTrends],
  (seasonalTrends) => {
    return seasonalTrends?.keywords || [];
  }
);

// Get seasonal keywords (high seasonality score)
export const selectSeasonalKeywords = createSelector(
  [selectSeasonalTrendsData],
  (keywords) => {
    return keywords
      .filter((keyword) => keyword.seasonalityScore >= 50)
      .sort((a, b) => b.seasonalityScore - a.seasonalityScore);
  }
);

// Get SERP analysis data
export const selectSerpAnalysisData = createSelector(
  [selectSerpAnalysis],
  (serpAnalysis) => {
    return serpAnalysis?.serpData || [];
  }
);

// Get top competitors from SERP
export const selectTopCompetitors = createSelector(
  [selectSerpAnalysisData],
  (serpData) => {
    return serpData
      .filter((result) => result.rank <= 5)
      .sort((a, b) => a.rank - b.rank);
  }
);

// Get top pages data
export const selectTopPagesData = createSelector(
  [selectTopPages],
  (topPages) => {
    return topPages?.data || [];
  }
);

// Get high traffic pages
export const selectHighTrafficPages = createSelector(
  [selectTopPagesData],
  (pages) => {
    return pages
      .filter((page) => page.traffic >= 1000)
      .sort((a, b) => b.traffic - a.traffic)
      .slice(0, 10);
  }
);

// Check if keyword is in favorites
export const selectIsKeywordFavorite = createSelector(
  [selectFavoriteKeywords, (state: RootState, keyword: string) => keyword],
  (favorites, keyword) => {
    return favorites.includes(keyword);
  }
);

// Check if keyword is selected
export const selectIsKeywordSelected = createSelector(
  [selectSelectedKeywords, (state: RootState, keyword: string) => keyword],
  (selected, keyword) => {
    return selected.includes(keyword);
  }
);

// Get statistics summary
export const selectKeywordStatsSummary = createSelector(
  [
    selectKeywordAnalysisData,
    selectPrimaryKeywords,
    selectMagicLongTailKeywords,
    selectContentIdeasData,
  ],
  (analysis, primary, longTail, contentIdeas) => {
    const totalKeywords = analysis.length + primary.length + longTail.length;
    const avgSearchVolume =
      totalKeywords > 0
        ? Math.round(
            [...analysis, ...primary, ...longTail].reduce(
              (sum, k) => sum + k.searchVolume,
              0
            ) / totalKeywords
          )
        : 0;
    const avgDifficulty =
      totalKeywords > 0
        ? Math.round(
            [...analysis, ...primary, ...longTail].reduce(
              (sum, k) => sum + k.difficulty,
              0
            ) / totalKeywords
          )
        : 0;

    return {
      totalKeywords,
      totalContentIdeas: contentIdeas.length,
      avgSearchVolume,
      avgDifficulty,
      topRankingKeywords: analysis.filter((k) => k.position && k.position <= 10)
        .length,
      highVolumeKeywords: [...analysis, ...primary, ...longTail].filter(
        (k) => k.searchVolume >= 1000
      ).length,
    };
  }
);

// Export all selectors as a group
export const keywordResearchSelectors = {
  // Base
  selectKeywordResearchState,
  selectKeywordResearchLoading,
  selectKeywordResearchError,
  selectCurrentParams,
  selectSelectedKeywords,
  selectFavoriteKeywords,

  // Data
  selectKeywordAnalysis,
  selectKeywordVariations,
  selectKeywordMagic,
  selectTopicResearch,
  selectContentIdeas,
  selectTrendingTopics,
  selectQuestionBasedContent,
  selectAIContentIdeas,
  selectRelatedTopics,
  selectKeywordDifficulty,
  selectLongTailKeywords,
  selectQuestionKeywords,
  selectSeasonalTrends,
  selectSerpAnalysis,
  selectTopPages,
  selectPublicKeywordSuggestions,

  // Computed
  selectIsAnyLoading,
  selectKeywordAnalysisTotal,
  selectKeywordAnalysisData,
  selectTopPerformingKeywords,
  selectHighVolumeKeywords,
  selectKeywordMagicSummary,
  selectPrimaryKeywords,
  selectMagicLongTailKeywords,
  selectMagicQuestionKeywords,
  selectAllMagicKeywords,
  selectContentIdeasData,
  selectContentIdeasMetrics,
  selectHighOpportunityIdeas,
  selectTrendingTopicsData,
  selectFastestGrowingTopics,
  selectQuestionsData,
  selectHighValueQuestions,
  selectRelatedTopicsData,
  selectTopicClusters,
  selectHighRelevanceTopics,
  selectKeywordDifficultyResults,
  selectEasyKeywords,
  selectLongTailKeywordsData,
  selectHighOpportunityLongTail,
  selectQuestionKeywordsData,
  selectQuestionKeywordsByType,
  selectSeasonalTrendsData,
  selectSeasonalKeywords,
  selectSerpAnalysisData,
  selectTopCompetitors,
  selectTopPagesData,
  selectHighTrafficPages,
  selectIsKeywordFavorite,
  selectIsKeywordSelected,
  selectKeywordStatsSummary,
};
