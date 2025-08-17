import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { keywordResearchService } from "@/services/keyword-research.service";
import {
  KeywordResearchState,
  KeywordAnalysisParams,
  KeywordAnalysisResponse,
  KeywordVariationsResponse,
  KeywordMagicParams,
  KeywordMagicResponse,
  TopicResearchResponse,
  TopicIdeaParams,
  TopicIdeaResponse,
  TrendingTopicsResponse,
  QuestionBasedContentResponse,
  AIContentIdeaParams,
  AIContentIdeaResponse,
  RelatedTopicsResponse,
  KeywordDifficultyParams,
  KeywordDifficultyResponse,
  LongTailKeywordParams,
  LongTailKeywordResponse,
  QuestionKeywordParams,
  QuestionKeywordResponse,
  SeasonalTrendsParams,
  SeasonalTrendsResponse,
  PublicKeywordParams,
  PublicKeywordSuggestion,
  AITestConnection,
  SerpAnalysisResponse,
  TopPagesParams,
  TopPagesResponse,
  KeywordMagicFilters,
} from "@/types/keyword-research.type";

// ====================================================================
// INITIAL STATE
// ====================================================================

const initialLoadingState = {
  keywordAnalysis: false,
  keywordVariations: false,
  keywordMagic: false,
  topicResearch: false,
  contentIdeas: false,
  trendingTopics: false,
  questionBasedContent: false,
  aiContentIdeas: false,
  relatedTopics: false,
  keywordDifficulty: false,
  longTailKeywords: false,
  questionKeywords: false,
  seasonalTrends: false,
  serpAnalysis: false,
  topPages: false,
};

const initialState: KeywordResearchState = {
  // Data
  keywordAnalysis: null,
  keywordVariations: null,
  keywordMagic: null,
  topicResearch: null,
  contentIdeas: null,
  trendingTopics: null,
  questionBasedContent: null,
  aiContentIdeas: null,
  relatedTopics: null,
  keywordDifficulty: null,
  longTailKeywords: null,
  questionKeywords: null,
  seasonalTrends: null,
  serpAnalysis: null,
  topPages: null,
  publicKeywordSuggestions: null,

  // Loading states
  loading: initialLoadingState,

  // Error states
  error: null,

  // Current filters and params
  currentParams: {},

  // UI states
  selectedKeywords: [],
  favoriteKeywords: [],
};

// ====================================================================
// ASYNC THUNKS - KEYWORD RESEARCH
// ====================================================================

export const fetchKeywordAnalysis = createAsyncThunk(
  "keywordResearch/fetchKeywordAnalysis",
  async (params: KeywordAnalysisParams, { rejectWithValue }) => {
    try {
      const response = await keywordResearchService.getKeywordAnalysis(params);
      return response;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch keyword analysis"
      );
    }
  }
);

export const fetchKeywordVariations = createAsyncThunk(
  "keywordResearch/fetchKeywordVariations",
  async (domain: string, { rejectWithValue }) => {
    try {
      const response = await keywordResearchService.getKeywordVariations(
        domain
      );
      return response;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch keyword variations"
      );
    }
  }
);

export const fetchKeywordMagicTool = createAsyncThunk(
  "keywordResearch/fetchKeywordMagicTool",
  async (params: KeywordMagicParams, { rejectWithValue }) => {
    try {
      const response = await keywordResearchService.getKeywordMagicTool(params);
      return response;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message ||
          "Failed to fetch keyword magic tool data"
      );
    }
  }
);

export const fetchTopicResearch = createAsyncThunk(
  "keywordResearch/fetchTopicResearch",
  async (
    { keyword, country }: { keyword: string; country?: string },
    { rejectWithValue }
  ) => {
    try {
      const response = await keywordResearchService.getTopicResearch(
        keyword,
        country
      );
      return response;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch topic research"
      );
    }
  }
);

// ====================================================================
// ASYNC THUNKS - CONTENT IDEAS
// ====================================================================

export const fetchTopicIdeas = createAsyncThunk(
  "keywordResearch/fetchTopicIdeas",
  async (params: TopicIdeaParams, { rejectWithValue }) => {
    try {
      const response = await keywordResearchService.getTopicIdeas(params);
      return response;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch topic ideas"
      );
    }
  }
);

export const fetchTrendingTopics = createAsyncThunk(
  "keywordResearch/fetchTrendingTopics",
  async (
    {
      category,
      country,
      limit,
    }: { category?: string; country?: string; limit?: number },
    { rejectWithValue }
  ) => {
    try {
      const response = await keywordResearchService.getTrendingTopics(
        category,
        country,
        limit
      );
      return response;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch trending topics"
      );
    }
  }
);

export const fetchQuestionBasedContent = createAsyncThunk(
  "keywordResearch/fetchQuestionBasedContent",
  async (
    {
      topic,
      limit,
      country,
    }: { topic: string; limit?: number; country?: string },
    { rejectWithValue }
  ) => {
    try {
      const response = await keywordResearchService.getQuestionBasedContent(
        topic,
        limit,
        country
      );
      return response;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message ||
          "Failed to fetch question-based content"
      );
    }
  }
);

export const fetchAIContentIdeas = createAsyncThunk(
  "keywordResearch/fetchAIContentIdeas",
  async (params: AIContentIdeaParams, { rejectWithValue }) => {
    try {
      const response = await keywordResearchService.getAIContentIdeas(params);
      return response;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch AI content ideas"
      );
    }
  }
);

export const fetchRelatedTopics = createAsyncThunk(
  "keywordResearch/fetchRelatedTopics",
  async (
    {
      topic,
      limit,
      country,
    }: { topic: string; limit?: number; country?: string },
    { rejectWithValue }
  ) => {
    try {
      const response = await keywordResearchService.getRelatedTopics(
        topic,
        limit,
        country
      );
      return response;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch related topics"
      );
    }
  }
);

// ====================================================================
// ASYNC THUNKS - KEYWORD DIFFICULTY
// ====================================================================

export const fetchKeywordDifficulty = createAsyncThunk(
  "keywordResearch/fetchKeywordDifficulty",
  async (params: KeywordDifficultyParams, { rejectWithValue }) => {
    try {
      const response = await keywordResearchService.analyzeKeywordDifficulty(
        params
      );
      return response;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to analyze keyword difficulty"
      );
    }
  }
);

// ====================================================================
// ASYNC THUNKS - AI-POWERED TOOLS
// ====================================================================

export const fetchLongTailKeywords = createAsyncThunk(
  "keywordResearch/fetchLongTailKeywords",
  async (params: LongTailKeywordParams, { rejectWithValue }) => {
    try {
      const response = await keywordResearchService.getLongTailKeywords(params);
      return response;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch long-tail keywords"
      );
    }
  }
);

export const fetchQuestionKeywords = createAsyncThunk(
  "keywordResearch/fetchQuestionKeywords",
  async (params: QuestionKeywordParams, { rejectWithValue }) => {
    try {
      const response = await keywordResearchService.getQuestionKeywords(params);
      return response;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch question keywords"
      );
    }
  }
);

export const fetchSeasonalTrends = createAsyncThunk(
  "keywordResearch/fetchSeasonalTrends",
  async (params: SeasonalTrendsParams, { rejectWithValue }) => {
    try {
      const response = await keywordResearchService.getSeasonalTrends(params);
      return response;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch seasonal trends"
      );
    }
  }
);

// ====================================================================
// ASYNC THUNKS - PUBLIC APIs
// ====================================================================

export const fetchPublicKeywordSuggestions = createAsyncThunk(
  "keywordResearch/fetchPublicKeywordSuggestions",
  async (params: PublicKeywordParams, { rejectWithValue }) => {
    try {
      const response = await keywordResearchService.getPublicKeywordSuggestions(
        params
      );
      return response;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message ||
          "Failed to fetch public keyword suggestions"
      );
    }
  }
);

export const testAIConnection = createAsyncThunk(
  "keywordResearch/testAIConnection",
  async (_, { rejectWithValue }) => {
    try {
      const response = await keywordResearchService.testAIConnection();
      return response;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to test AI connection"
      );
    }
  }
);

// ====================================================================
// ASYNC THUNKS - SERP ANALYSIS
// ====================================================================

export const fetchSerpAnalysis = createAsyncThunk(
  "keywordResearch/fetchSerpAnalysis",
  async (projectId: string, { rejectWithValue }) => {
    try {
      const response = await keywordResearchService.getSerpAnalysis(projectId);
      return response;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch SERP analysis"
      );
    }
  }
);

export const fetchTopPages = createAsyncThunk(
  "keywordResearch/fetchTopPages",
  async (params: TopPagesParams, { rejectWithValue }) => {
    try {
      const response = await keywordResearchService.getTopPages(params);
      return response;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch top pages"
      );
    }
  }
);

// ====================================================================
// ASYNC THUNKS - UTILITY FUNCTIONS
// ====================================================================

export const exportKeywords = createAsyncThunk(
  "keywordResearch/exportKeywords",
  async (
    { keywords, format }: { keywords: string[]; format?: "csv" | "xlsx" },
    { rejectWithValue }
  ) => {
    try {
      const response = await keywordResearchService.exportKeywords(
        keywords,
        format
      );
      return response;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to export keywords"
      );
    }
  }
);

export const saveToFavorites = createAsyncThunk(
  "keywordResearch/saveToFavorites",
  async (keywords: string[], { rejectWithValue }) => {
    try {
      const response = await keywordResearchService.saveToFavorites(keywords);
      return { keywords, response };
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to save to favorites"
      );
    }
  }
);

export const fetchFavoriteKeywords = createAsyncThunk(
  "keywordResearch/fetchFavoriteKeywords",
  async (_, { rejectWithValue }) => {
    try {
      const response = await keywordResearchService.getFavoriteKeywords();
      return response.keywords;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch favorite keywords"
      );
    }
  }
);

export const removeFromFavorites = createAsyncThunk(
  "keywordResearch/removeFromFavorites",
  async (keywords: string[], { rejectWithValue }) => {
    try {
      const response = await keywordResearchService.removeFromFavorites(
        keywords
      );
      return { keywords, response };
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to remove from favorites"
      );
    }
  }
);

export const bulkAnalyzeKeywords = createAsyncThunk(
  "keywordResearch/bulkAnalyzeKeywords",
  async (
    { keywords, country }: { keywords: string[]; country?: string },
    { rejectWithValue }
  ) => {
    try {
      const response = await keywordResearchService.bulkAnalyzeKeywords(
        keywords,
        country
      );
      return response;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to bulk analyze keywords"
      );
    }
  }
);

// ====================================================================
// SLICE
// ====================================================================

const keywordResearchSlice = createSlice({
  name: "keywordResearch",
  initialState,
  reducers: {
    // Clear all data
    clearAllData: (state) => {
      state.keywordAnalysis = null;
      state.keywordVariations = null;
      state.keywordMagic = null;
      state.topicResearch = null;
      state.contentIdeas = null;
      state.trendingTopics = null;
      state.questionBasedContent = null;
      state.aiContentIdeas = null;
      state.relatedTopics = null;
      state.keywordDifficulty = null;
      state.longTailKeywords = null;
      state.questionKeywords = null;
      state.seasonalTrends = null;
      state.serpAnalysis = null;
      state.topPages = null;
      state.publicKeywordSuggestions = null;
      state.error = null;
    },

    // Clear error
    clearError: (state) => {
      state.error = null;
    },

    // Set current params
    setCurrentParams: (
      state,
      action: PayloadAction<{
        domain?: string;
        seedKeyword?: string;
        country?: string;
        filters?: KeywordMagicFilters;
      }>
    ) => {
      state.currentParams = { ...state.currentParams, ...action.payload };
    },

    // Update selected keywords
    setSelectedKeywords: (state, action: PayloadAction<string[]>) => {
      state.selectedKeywords = action.payload;
    },

    addSelectedKeyword: (state, action: PayloadAction<string>) => {
      if (!state.selectedKeywords.includes(action.payload)) {
        state.selectedKeywords.push(action.payload);
      }
    },

    removeSelectedKeyword: (state, action: PayloadAction<string>) => {
      state.selectedKeywords = state.selectedKeywords.filter(
        (keyword) => keyword !== action.payload
      );
    },

    clearSelectedKeywords: (state) => {
      state.selectedKeywords = [];
    },

    // Update favorite keywords (local state management)
    addToLocalFavorites: (state, action: PayloadAction<string[]>) => {
      const newKeywords = action.payload.filter(
        (keyword) => !state.favoriteKeywords.includes(keyword)
      );
      state.favoriteKeywords.push(...newKeywords);
    },

    removeFromLocalFavorites: (state, action: PayloadAction<string[]>) => {
      state.favoriteKeywords = state.favoriteKeywords.filter(
        (keyword) => !action.payload.includes(keyword)
      );
    },

    // Clear specific data
    clearKeywordAnalysis: (state) => {
      state.keywordAnalysis = null;
    },

    clearKeywordMagic: (state) => {
      state.keywordMagic = null;
    },

    clearContentIdeas: (state) => {
      state.contentIdeas = null;
    },

    // Reset loading states
    resetLoadingStates: (state) => {
      state.loading = initialLoadingState;
    },
  },

  extraReducers: (builder) => {
    // ================================================================
    // KEYWORD ANALYSIS
    // ================================================================
    builder
      .addCase(fetchKeywordAnalysis.pending, (state) => {
        state.loading.keywordAnalysis = true;
        state.error = null;
      })
      .addCase(fetchKeywordAnalysis.fulfilled, (state, action) => {
        state.loading.keywordAnalysis = false;
        state.keywordAnalysis = action.payload;
      })
      .addCase(fetchKeywordAnalysis.rejected, (state, action) => {
        state.loading.keywordAnalysis = false;
        state.error = action.payload as string;
      });

    // ================================================================
    // KEYWORD VARIATIONS
    // ================================================================
    builder
      .addCase(fetchKeywordVariations.pending, (state) => {
        state.loading.keywordVariations = true;
        state.error = null;
      })
      .addCase(fetchKeywordVariations.fulfilled, (state, action) => {
        state.loading.keywordVariations = false;
        state.keywordVariations = action.payload;
      })
      .addCase(fetchKeywordVariations.rejected, (state, action) => {
        state.loading.keywordVariations = false;
        state.error = action.payload as string;
      });

    // ================================================================
    // KEYWORD MAGIC TOOL
    // ================================================================
    builder
      .addCase(fetchKeywordMagicTool.pending, (state) => {
        state.loading.keywordMagic = true;
        state.error = null;
      })
      .addCase(fetchKeywordMagicTool.fulfilled, (state, action) => {
        state.loading.keywordMagic = false;
        state.keywordMagic = action.payload;
      })
      .addCase(fetchKeywordMagicTool.rejected, (state, action) => {
        state.loading.keywordMagic = false;
        state.error = action.payload as string;
      });

    // ================================================================
    // TOPIC RESEARCH
    // ================================================================
    builder
      .addCase(fetchTopicResearch.pending, (state) => {
        state.loading.topicResearch = true;
        state.error = null;
      })
      .addCase(fetchTopicResearch.fulfilled, (state, action) => {
        state.loading.topicResearch = false;
        state.topicResearch = action.payload;
      })
      .addCase(fetchTopicResearch.rejected, (state, action) => {
        state.loading.topicResearch = false;
        state.error = action.payload as string;
      });

    // ================================================================
    // CONTENT IDEAS
    // ================================================================
    builder
      .addCase(fetchTopicIdeas.pending, (state) => {
        state.loading.contentIdeas = true;
        state.error = null;
      })
      .addCase(fetchTopicIdeas.fulfilled, (state, action) => {
        state.loading.contentIdeas = false;
        state.contentIdeas = action.payload;
      })
      .addCase(fetchTopicIdeas.rejected, (state, action) => {
        state.loading.contentIdeas = false;
        state.error = action.payload as string;
      });

    // ================================================================
    // TRENDING TOPICS
    // ================================================================
    builder
      .addCase(fetchTrendingTopics.pending, (state) => {
        state.loading.trendingTopics = true;
        state.error = null;
      })
      .addCase(fetchTrendingTopics.fulfilled, (state, action) => {
        state.loading.trendingTopics = false;
        state.trendingTopics = action.payload;
      })
      .addCase(fetchTrendingTopics.rejected, (state, action) => {
        state.loading.trendingTopics = false;
        state.error = action.payload as string;
      });

    // ================================================================
    // QUESTION-BASED CONTENT
    // ================================================================
    builder
      .addCase(fetchQuestionBasedContent.pending, (state) => {
        state.loading.questionBasedContent = true;
        state.error = null;
      })
      .addCase(fetchQuestionBasedContent.fulfilled, (state, action) => {
        state.loading.questionBasedContent = false;
        state.questionBasedContent = action.payload;
      })
      .addCase(fetchQuestionBasedContent.rejected, (state, action) => {
        state.loading.questionBasedContent = false;
        state.error = action.payload as string;
      });

    // ================================================================
    // AI CONTENT IDEAS
    // ================================================================
    builder
      .addCase(fetchAIContentIdeas.pending, (state) => {
        state.loading.aiContentIdeas = true;
        state.error = null;
      })
      .addCase(fetchAIContentIdeas.fulfilled, (state, action) => {
        state.loading.aiContentIdeas = false;
        state.aiContentIdeas = action.payload;
      })
      .addCase(fetchAIContentIdeas.rejected, (state, action) => {
        state.loading.aiContentIdeas = false;
        state.error = action.payload as string;
      });

    // ================================================================
    // RELATED TOPICS
    // ================================================================
    builder
      .addCase(fetchRelatedTopics.pending, (state) => {
        state.loading.relatedTopics = true;
        state.error = null;
      })
      .addCase(fetchRelatedTopics.fulfilled, (state, action) => {
        state.loading.relatedTopics = false;
        state.relatedTopics = action.payload;
      })
      .addCase(fetchRelatedTopics.rejected, (state, action) => {
        state.loading.relatedTopics = false;
        state.error = action.payload as string;
      });

    // ================================================================
    // KEYWORD DIFFICULTY
    // ================================================================
    builder
      .addCase(fetchKeywordDifficulty.pending, (state) => {
        state.loading.keywordDifficulty = true;
        state.error = null;
      })
      .addCase(fetchKeywordDifficulty.fulfilled, (state, action) => {
        state.loading.keywordDifficulty = false;
        state.keywordDifficulty = action.payload;
      })
      .addCase(fetchKeywordDifficulty.rejected, (state, action) => {
        state.loading.keywordDifficulty = false;
        state.error = action.payload as string;
      });

    // ================================================================
    // LONG-TAIL KEYWORDS
    // ================================================================
    builder
      .addCase(fetchLongTailKeywords.pending, (state) => {
        state.loading.longTailKeywords = true;
        state.error = null;
      })
      .addCase(fetchLongTailKeywords.fulfilled, (state, action) => {
        state.loading.longTailKeywords = false;
        state.longTailKeywords = action.payload;
      })
      .addCase(fetchLongTailKeywords.rejected, (state, action) => {
        state.loading.longTailKeywords = false;
        state.error = action.payload as string;
      });

    // ================================================================
    // QUESTION KEYWORDS
    // ================================================================
    builder
      .addCase(fetchQuestionKeywords.pending, (state) => {
        state.loading.questionKeywords = true;
        state.error = null;
      })
      .addCase(fetchQuestionKeywords.fulfilled, (state, action) => {
        state.loading.questionKeywords = false;
        state.questionKeywords = action.payload;
      })
      .addCase(fetchQuestionKeywords.rejected, (state, action) => {
        state.loading.questionKeywords = false;
        state.error = action.payload as string;
      });

    // ================================================================
    // SEASONAL TRENDS
    // ================================================================
    builder
      .addCase(fetchSeasonalTrends.pending, (state) => {
        state.loading.seasonalTrends = true;
        state.error = null;
      })
      .addCase(fetchSeasonalTrends.fulfilled, (state, action) => {
        state.loading.seasonalTrends = false;
        state.seasonalTrends = action.payload;
      })
      .addCase(fetchSeasonalTrends.rejected, (state, action) => {
        state.loading.seasonalTrends = false;
        state.error = action.payload as string;
      });

    // ================================================================
    // SERP ANALYSIS
    // ================================================================
    builder
      .addCase(fetchSerpAnalysis.pending, (state) => {
        state.loading.serpAnalysis = true;
        state.error = null;
      })
      .addCase(fetchSerpAnalysis.fulfilled, (state, action) => {
        state.loading.serpAnalysis = false;
        state.serpAnalysis = action.payload;
      })
      .addCase(fetchSerpAnalysis.rejected, (state, action) => {
        state.loading.serpAnalysis = false;
        state.error = action.payload as string;
      });

    // ================================================================
    // TOP PAGES
    // ================================================================
    builder
      .addCase(fetchTopPages.pending, (state) => {
        state.loading.topPages = true;
        state.error = null;
      })
      .addCase(fetchTopPages.fulfilled, (state, action) => {
        state.loading.topPages = false;
        state.topPages = action.payload;
      })
      .addCase(fetchTopPages.rejected, (state, action) => {
        state.loading.topPages = false;
        state.error = action.payload as string;
      });

    // ================================================================
    // FAVORITES
    // ================================================================
    builder
      .addCase(fetchFavoriteKeywords.fulfilled, (state, action) => {
        state.favoriteKeywords = action.payload;
      })
      .addCase(saveToFavorites.fulfilled, (state, action) => {
        const newKeywords = action.payload.keywords.filter(
          (keyword) => !state.favoriteKeywords.includes(keyword)
        );
        state.favoriteKeywords.push(...newKeywords);
      })
      .addCase(removeFromFavorites.fulfilled, (state, action) => {
        state.favoriteKeywords = state.favoriteKeywords.filter(
          (keyword) => !action.payload.keywords.includes(keyword)
        );
      });
  },
});

// ====================================================================
// EXPORTS
// ====================================================================

export const {
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
} = keywordResearchSlice.actions;

export default keywordResearchSlice.reducer;
