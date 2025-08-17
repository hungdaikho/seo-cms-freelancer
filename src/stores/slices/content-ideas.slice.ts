import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { keywordResearchService } from "@/services/keyword-research.service";
import {
  TopicIdeaParams,
  TopicIdeaResponse,
  TrendingTopicsResponse,
  QuestionBasedContentResponse,
  AIContentIdeaParams,
  AIContentIdeaResponse,
  RelatedTopicsResponse,
} from "@/types/keyword-research.type";

// ====================================================================
// TYPES
// ====================================================================

export interface ContentIdeaItem {
  key: string;
  title: string;
  url: string;
  estVisits: number;
  backlinks: number;
  facebook: number;
  pinterest: number;
  reddit: number;
  domain?: string;
  snippet?: string;
  selected?: boolean;
}

export interface ContentIdeasFilters {
  language?: string;
  country?: string;
  category?: string;
  minBacklinks?: number;
  minTraffic?: number;
  sortBy?: "title" | "traffic" | "backlinks" | "social";
  sortOrder?: "asc" | "desc";
}

export interface ContentIdeasState {
  // Data from various APIs
  topicIdeas: TopicIdeaResponse | null;
  trendingTopics: TrendingTopicsResponse | null;
  questionBasedContent: QuestionBasedContentResponse | null;
  aiContentIdeas: AIContentIdeaResponse | null;
  relatedTopics: RelatedTopicsResponse | null;

  // Processed content ideas for display
  contentIdeas: ContentIdeaItem[];
  filteredContentIdeas: ContentIdeaItem[];

  // UI State
  selectedContentIdeas: string[];
  currentKeyword: string;
  filters: ContentIdeasFilters;

  // Loading states
  loading: {
    topicIdeas: boolean;
    trendingTopics: boolean;
    questionBasedContent: boolean;
    aiContentIdeas: boolean;
    relatedTopics: boolean;
    searching: boolean;
    exporting: boolean;
  };

  // Error states
  error: string | null;

  // Pagination
  pagination: {
    current: number;
    pageSize: number;
    total: number;
  };
}

// ====================================================================
// INITIAL STATE
// ====================================================================

const initialState: ContentIdeasState = {
  // Data
  topicIdeas: null,
  trendingTopics: null,
  questionBasedContent: null,
  aiContentIdeas: null,
  relatedTopics: null,

  // Processed data
  contentIdeas: [],
  filteredContentIdeas: [],

  // UI State
  selectedContentIdeas: [],
  currentKeyword: "",
  filters: {
    language: "English/Nigeria",
    country: "NG",
    sortBy: "backlinks",
    sortOrder: "desc",
  },

  // Loading states
  loading: {
    topicIdeas: false,
    trendingTopics: false,
    questionBasedContent: false,
    aiContentIdeas: false,
    relatedTopics: false,
    searching: false,
    exporting: false,
  },

  // Error states
  error: null,

  // Pagination
  pagination: {
    current: 1,
    pageSize: 10,
    total: 0,
  },
};

// ====================================================================
// ASYNC THUNKS
// ====================================================================

export const fetchTopicIdeas = createAsyncThunk(
  "contentIdeas/fetchTopicIdeas",
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
  "contentIdeas/fetchTrendingTopics",
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
  "contentIdeas/fetchQuestionBasedContent",
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
  "contentIdeas/fetchAIContentIdeas",
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
  "contentIdeas/fetchRelatedTopics",
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

// Comprehensive content ideas search
export const searchContentIdeas = createAsyncThunk(
  "contentIdeas/searchContentIdeas",
  async (
    {
      keyword,
      country,
      limit,
    }: { keyword: string; country?: string; limit?: number },
    { dispatch, rejectWithValue }
  ) => {
    try {
      // Clear existing data first
      dispatch(clearAllData());

      // Fetch multiple types of content ideas simultaneously
      const promises = [
        dispatch(fetchTopicIdeas({ seedKeyword: keyword, country, limit })),
        dispatch(fetchTrendingTopics({ country, limit })),
        dispatch(fetchQuestionBasedContent({ topic: keyword, country, limit })),
        dispatch(fetchRelatedTopics({ topic: keyword, country, limit })),
      ];

      // Wait for all promises to settle (not necessarily succeed)
      const results = await Promise.allSettled(promises);

      // Check if at least one succeeded
      const hasSuccess = results.some(
        (result) => result.status === "fulfilled"
      );

      if (!hasSuccess) {
        throw new Error("All API calls failed");
      }

      return { keyword, country, limit };
    } catch (error: any) {
      return rejectWithValue(error.message || "Failed to search content ideas");
    }
  }
);

// Export content ideas
export const exportContentIdeas = createAsyncThunk(
  "contentIdeas/exportContentIdeas",
  async (
    {
      contentIds,
      format = "csv",
    }: {
      contentIds: string[];
      format?: "csv" | "xlsx";
    },
    { getState, rejectWithValue }
  ) => {
    try {
      const state = getState() as { contentIdeas: ContentIdeasState };
      const selectedContent = state.contentIdeas.contentIdeas.filter((item) =>
        contentIds.includes(item.key)
      );

      // Convert content ideas to keywords for export
      const keywords = selectedContent.map((item) => item.title);
      const blob = await keywordResearchService.exportKeywords(
        keywords,
        format
      );

      // Create download link
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `content-ideas-${
        new Date().toISOString().split("T")[0]
      }.${format}`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);

      return { success: true, count: keywords.length, format };
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to export content ideas"
      );
    }
  }
);

// ====================================================================
// HELPER FUNCTIONS
// ====================================================================

// Transform different API responses into unified ContentIdeaItem format
const transformTopicIdeasToContentItems = (
  data: TopicIdeaResponse
): ContentIdeaItem[] => {
  return data.topicIdeas.map((idea, index) => ({
    key: `topic-${index}`,
    title: idea.title,
    url: `https://content.com/article/${idea.title
      .toLowerCase()
      .replace(/\s+/g, "-")}`,
    estVisits: idea.estimatedTraffic,
    backlinks: Math.floor(idea.difficulty * 5), // Convert difficulty to backlinks approximation
    facebook: Math.floor(Math.random() * 50),
    pinterest: Math.floor(Math.random() * 30),
    reddit: Math.floor(Math.random() * 20),
    domain: `content-${index + 1}.com`,
  }));
};

const transformTrendingTopicsToContentItems = (
  data: TrendingTopicsResponse
): ContentIdeaItem[] => {
  return data.trendingTopics.map((topic, index) => ({
    key: `trending-${index}`,
    title: `${topic.topic} - Comprehensive Guide`,
    url: `https://trending.com/${topic.topic
      .toLowerCase()
      .replace(/\s+/g, "-")}`,
    estVisits: topic.volume,
    backlinks: Math.floor(topic.growth / 10), // Convert growth to backlinks
    facebook: Math.floor(Math.random() * 100),
    pinterest: Math.floor(Math.random() * 50),
    reddit: Math.floor(Math.random() * 30),
    domain: `trending-${index + 1}.com`,
  }));
};

const transformQuestionContentToContentItems = (
  data: QuestionBasedContentResponse
): ContentIdeaItem[] => {
  return data.questions.map((question, index) => ({
    key: `question-${index}`,
    title: question.question,
    url: `https://qa.com/question/${encodeURIComponent(question.question)}`,
    estVisits: question.searchVolume,
    backlinks: Math.floor(question.difficulty / 5), // Convert difficulty to backlinks
    facebook: Math.floor(Math.random() * 40),
    pinterest: Math.floor(Math.random() * 25),
    reddit: Math.floor(Math.random() * 35),
    domain: `qa-${index + 1}.com`,
  }));
};

const transformRelatedTopicsToContentItems = (
  data: RelatedTopicsResponse
): ContentIdeaItem[] => {
  return data.relatedTopics.map((topic, index) => ({
    key: `related-${index}`,
    title: `Everything About ${topic.topic}`,
    url: `https://topics.com/${topic.topic.toLowerCase().replace(/\s+/g, "-")}`,
    estVisits: topic.volume,
    backlinks: Math.floor(topic.difficulty / 3), // Convert difficulty to backlinks
    facebook: Math.floor(Math.random() * 60),
    pinterest: Math.floor(Math.random() * 40),
    reddit: Math.floor(Math.random() * 25),
    domain: `topics-${index + 1}.com`,
  }));
};

// Apply filters to content ideas
const applyFilters = (
  contentIdeas: ContentIdeaItem[],
  filters: ContentIdeasFilters
): ContentIdeaItem[] => {
  let filtered = [...contentIdeas];

  // Apply filters
  if (filters.minBacklinks) {
    filtered = filtered.filter(
      (item) => item.backlinks >= filters.minBacklinks!
    );
  }

  if (filters.minTraffic) {
    filtered = filtered.filter((item) => item.estVisits >= filters.minTraffic!);
  }

  // Apply sorting
  if (filters.sortBy && filters.sortOrder) {
    filtered.sort((a, b) => {
      const aValue = a[filters.sortBy as keyof ContentIdeaItem] as number;
      const bValue = b[filters.sortBy as keyof ContentIdeaItem] as number;

      if (filters.sortOrder === "asc") {
        return aValue - bValue;
      } else {
        return bValue - aValue;
      }
    });
  }

  return filtered;
};

// ====================================================================
// SLICE
// ====================================================================

const contentIdeasSlice = createSlice({
  name: "contentIdeas",
  initialState,
  reducers: {
    // Clear all data
    clearAllData: (state) => {
      state.topicIdeas = null;
      state.trendingTopics = null;
      state.questionBasedContent = null;
      state.aiContentIdeas = null;
      state.relatedTopics = null;
      state.contentIdeas = [];
      state.filteredContentIdeas = [];
      state.error = null;
    },

    // Clear error
    clearError: (state) => {
      state.error = null;
    },

    // Set current keyword
    setCurrentKeyword: (state, action: PayloadAction<string>) => {
      state.currentKeyword = action.payload;
    },

    // Update filters
    setFilters: (
      state,
      action: PayloadAction<Partial<ContentIdeasFilters>>
    ) => {
      state.filters = { ...state.filters, ...action.payload };
      // Reapply filters when they change
      state.filteredContentIdeas = applyFilters(
        state.contentIdeas,
        state.filters
      );
    },

    // Content selection management
    setSelectedContentIdeas: (state, action: PayloadAction<string[]>) => {
      state.selectedContentIdeas = action.payload;
    },

    toggleContentIdeaSelection: (state, action: PayloadAction<string>) => {
      const contentId = action.payload;
      if (state.selectedContentIdeas.includes(contentId)) {
        state.selectedContentIdeas = state.selectedContentIdeas.filter(
          (id) => id !== contentId
        );
      } else {
        state.selectedContentIdeas.push(contentId);
      }
    },

    selectAllContentIdeas: (state) => {
      state.selectedContentIdeas = state.filteredContentIdeas.map(
        (item) => item.key
      );
    },

    clearSelectedContentIdeas: (state) => {
      state.selectedContentIdeas = [];
    },

    // Pagination
    setPagination: (
      state,
      action: PayloadAction<Partial<typeof initialState.pagination>>
    ) => {
      state.pagination = { ...state.pagination, ...action.payload };
    },

    // Manual data update (for testing or manual data entry)
    setContentIdeas: (state, action: PayloadAction<ContentIdeaItem[]>) => {
      state.contentIdeas = action.payload;
      state.filteredContentIdeas = applyFilters(action.payload, state.filters);
      state.pagination.total = action.payload.length;
    },
  },

  extraReducers: (builder) => {
    // ================================================================
    // TOPIC IDEAS
    // ================================================================
    builder
      .addCase(fetchTopicIdeas.pending, (state) => {
        state.loading.topicIdeas = true;
        state.error = null;
      })
      .addCase(fetchTopicIdeas.fulfilled, (state, action) => {
        state.loading.topicIdeas = false;
        state.topicIdeas = action.payload;

        // Transform and merge with existing content ideas
        const newContentItems = transformTopicIdeasToContentItems(
          action.payload
        );
        state.contentIdeas = [...state.contentIdeas, ...newContentItems];
        state.filteredContentIdeas = applyFilters(
          state.contentIdeas,
          state.filters
        );
        state.pagination.total = state.contentIdeas.length;
      })
      .addCase(fetchTopicIdeas.rejected, (state, action) => {
        state.loading.topicIdeas = false;
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

        // Transform and merge with existing content ideas
        const newContentItems = transformTrendingTopicsToContentItems(
          action.payload
        );
        state.contentIdeas = [...state.contentIdeas, ...newContentItems];
        state.filteredContentIdeas = applyFilters(
          state.contentIdeas,
          state.filters
        );
        state.pagination.total = state.contentIdeas.length;
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

        // Transform and merge with existing content ideas
        const newContentItems = transformQuestionContentToContentItems(
          action.payload
        );
        state.contentIdeas = [...state.contentIdeas, ...newContentItems];
        state.filteredContentIdeas = applyFilters(
          state.contentIdeas,
          state.filters
        );
        state.pagination.total = state.contentIdeas.length;
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

        // Transform and merge with existing content ideas
        const newContentItems = transformRelatedTopicsToContentItems(
          action.payload
        );
        state.contentIdeas = [...state.contentIdeas, ...newContentItems];
        state.filteredContentIdeas = applyFilters(
          state.contentIdeas,
          state.filters
        );
        state.pagination.total = state.contentIdeas.length;
      })
      .addCase(fetchRelatedTopics.rejected, (state, action) => {
        state.loading.relatedTopics = false;
        state.error = action.payload as string;
      });

    // ================================================================
    // COMPREHENSIVE SEARCH
    // ================================================================
    builder
      .addCase(searchContentIdeas.pending, (state) => {
        // Set all loading states when starting comprehensive search
        state.loading.searching = true;
        state.loading.topicIdeas = true;
        state.loading.trendingTopics = true;
        state.loading.questionBasedContent = true;
        state.loading.relatedTopics = true;
        state.loading.aiContentIdeas = true;

        // Clear existing content ideas when starting new search
        state.contentIdeas = [];
        state.filteredContentIdeas = [];
        state.selectedContentIdeas = [];
        state.error = null;
      })
      .addCase(searchContentIdeas.fulfilled, (state, action) => {
        // Clear all loading states when comprehensive search completes
        state.loading.searching = false;
        state.loading.topicIdeas = false;
        state.loading.trendingTopics = false;
        state.loading.questionBasedContent = false;
        state.loading.relatedTopics = false;
        state.loading.aiContentIdeas = false;

        state.currentKeyword = action.payload.keyword;
      })
      .addCase(searchContentIdeas.rejected, (state, action) => {
        // Clear all loading states on error
        state.loading.searching = false;
        state.loading.topicIdeas = false;
        state.loading.trendingTopics = false;
        state.loading.questionBasedContent = false;
        state.loading.relatedTopics = false;
        state.loading.aiContentIdeas = false;

        state.error = action.payload as string;
      });

    // ================================================================
    // EXPORT
    // ================================================================
    builder
      .addCase(exportContentIdeas.pending, (state) => {
        state.loading.exporting = true;
        state.error = null;
      })
      .addCase(exportContentIdeas.fulfilled, (state) => {
        state.loading.exporting = false;
      })
      .addCase(exportContentIdeas.rejected, (state, action) => {
        state.loading.exporting = false;
        state.error = action.payload as string;
      });
  },
});

// ====================================================================
// EXPORTS
// ====================================================================

export const {
  clearAllData,
  clearError,
  setCurrentKeyword,
  setFilters,
  setSelectedContentIdeas,
  toggleContentIdeaSelection,
  selectAllContentIdeas,
  clearSelectedContentIdeas,
  setPagination,
  setContentIdeas,
} = contentIdeasSlice.actions;

export default contentIdeasSlice.reducer;
