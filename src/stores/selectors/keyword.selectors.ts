import { RootState } from '../store';

// Keyword selectors
export const selectKeywords = (state: RootState) => state.keyword.keywords;
export const selectCurrentKeyword = (state: RootState) => state.keyword.currentKeyword;
export const selectRankingHistory = (state: RootState) => state.keyword.rankingHistory;
export const selectKeywordLoading = (state: RootState) => state.keyword.loading;
export const selectKeywordError = (state: RootState) => state.keyword.error;
export const selectKeywordPagination = (state: RootState) => state.keyword.pagination;

// Keyword derived selectors
export const selectTrackingKeywords = (state: RootState) =>
    state.keyword.keywords.filter(keyword => keyword.isTracking);

export const selectKeywordsByDifficulty = (minDifficulty: number, maxDifficulty: number) => (state: RootState) =>
    state.keyword.keywords.filter(keyword =>
        keyword.difficulty && keyword.difficulty >= minDifficulty && keyword.difficulty <= maxDifficulty
    );

export const selectTopRankingKeywords = (topN: number = 10) => (state: RootState) =>
    state.keyword.keywords
        .filter(keyword => keyword.currentRanking)
        .sort((a, b) => (a.currentRanking || 0) - (b.currentRanking || 0))
        .slice(0, topN);

export const selectKeywordsBySearchVolume = (minVolume: number) => (state: RootState) =>
    state.keyword.keywords.filter(keyword =>
        keyword.searchVolume && keyword.searchVolume >= minVolume
    );
