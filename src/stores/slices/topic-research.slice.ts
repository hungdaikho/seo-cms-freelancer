import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { topicResearchService } from "@/services/topic-research.service";
import {
    TopicResearchState,
    TopicResearchRequest,
    TopicResearchResponse,
    RelatedTopicsResponse,
    RelatedTopicsParams,
    TopicQuestionsResponse,
    TopicQuestionsParams,
    BatchAnalysisRequest,
    BatchAnalysisResponse,
    TrendingTopicsParams,
    TrendingTopicsResponse,
    APIStatus,
    KeywordDemo,
} from "@/types/topic-research.type";

// Initial state
const initialState: TopicResearchState = {
    // Topic Ideas
    topicIdeas: [],
    topicResearchLoading: false,
    topicResearchError: null,

    // Related Topics
    relatedTopics: [],
    relatedTopicsLoading: false,
    relatedTopicsError: null,

    // Questions
    questions: [],
    questionsLoading: false,
    questionsError: null,

    // Batch Analysis
    batchResults: null,
    batchAnalysisLoading: false,
    batchAnalysisError: null,

    // Trending Topics
    trendingTopics: [],
    trendingTopicsLoading: false,
    trendingTopicsError: null,

    // API Status
    apiStatus: null,
    apiStatusLoading: false,
    apiStatusError: null,

    // Keyword Demo
    keywordDemo: null,
    keywordDemoLoading: false,
    keywordDemoError: null,

    // Current search parameters
    currentSeedKeyword: "",
    currentCountry: "US",
    currentIndustry: "",

    // Metrics
    metrics: {
        avgVolume: 0,
        avgDifficulty: 0,
        avgOpportunity: 0,
        totalQuestions: 0,
    },
};

// Async Thunks

/**
 * Generate topic ideas
 */
export const generateTopicIdeas = createAsyncThunk(
    "topicResearch/generateTopicIdeas",
    async (params: TopicResearchRequest, { rejectWithValue }) => {
        try {
            const response = await topicResearchService.generateTopicIdeas(params);
            return response;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || error.message || "Failed to generate topic ideas");
        }
    }
);

/**
 * Get related topics
 */
export const getRelatedTopics = createAsyncThunk(
    "topicResearch/getRelatedTopics",
    async ({ topic, params }: { topic: string; params?: RelatedTopicsParams }, { rejectWithValue }) => {
        try {
            const response = await topicResearchService.getRelatedTopics(topic, params);
            return response;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || error.message || "Failed to get related topics");
        }
    }
);

/**
 * Get topic questions
 */
export const getTopicQuestions = createAsyncThunk(
    "topicResearch/getTopicQuestions",
    async ({ topic, params }: { topic: string; params?: TopicQuestionsParams }, { rejectWithValue }) => {
        try {
            const response = await topicResearchService.getTopicQuestions(topic, params);
            return response;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || error.message || "Failed to get topic questions");
        }
    }
);

/**
 * Batch analysis of multiple topics
 */
export const batchAnalysis = createAsyncThunk(
    "topicResearch/batchAnalysis",
    async (params: BatchAnalysisRequest, { rejectWithValue }) => {
        try {
            const response = await topicResearchService.batchAnalysis(params);
            return response;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || error.message || "Failed to perform batch analysis");
        }
    }
);

/**
 * Get trending topics
 */
export const getTrendingTopics = createAsyncThunk(
    "topicResearch/getTrendingTopics",
    async (params: TrendingTopicsParams | undefined, { rejectWithValue }) => {
        try {
            const response = await topicResearchService.getTrendingTopics(params);
            return response;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || error.message || "Failed to get trending topics");
        }
    }
);

/**
 * Get API status
 */
export const getAPIStatus = createAsyncThunk(
    "topicResearch/getAPIStatus",
    async (_, { rejectWithValue }) => {
        try {
            const response = await topicResearchService.getAPIStatus();
            return response;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || error.message || "Failed to get API status");
        }
    }
);

/**
 * Get keyword demo
 */
export const getKeywordDemo = createAsyncThunk(
    "topicResearch/getKeywordDemo",
    async ({ keyword, country }: { keyword: string; country?: string }, { rejectWithValue }) => {
        try {
            const response = await topicResearchService.getKeywordDemo(keyword, country);
            return response;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || error.message || "Failed to get keyword demo");
        }
    }
);

/**
 * Comprehensive topic research (combines multiple endpoints)
 */
export const researchTopic = createAsyncThunk(
    "topicResearch/researchTopic",
    async (
        {
            seedKeyword,
            country = "US",
            industry,
            contentType,
        }: {
            seedKeyword: string;
            country?: string;
            industry?: string;
            contentType?: string;
        },
        { rejectWithValue }
    ) => {
        try {
            const response = await topicResearchService.researchTopic(seedKeyword, country, industry, contentType);
            return response;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || error.message || "Failed to research topic");
        }
    }
);

/**
 * Get content opportunities
 */
export const getContentOpportunities = createAsyncThunk(
    "topicResearch/getContentOpportunities",
    async ({ keyword, country = "US" }: { keyword: string; country?: string }, { rejectWithValue }) => {
        try {
            const response = await topicResearchService.getContentOpportunities(keyword, country);
            return response;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || error.message || "Failed to get content opportunities");
        }
    }
);

/**
 * Analyze competitor topics
 */
export const analyzeCompetitorTopics = createAsyncThunk(
    "topicResearch/analyzeCompetitorTopics",
    async (
        {
            topics,
            country = "US",
            includeQuestions = true,
        }: {
            topics: string[];
            country?: string;
            includeQuestions?: boolean;
        },
        { rejectWithValue }
    ) => {
        try {
            const response = await topicResearchService.analyzeCompetitorTopics(topics, country, includeQuestions);
            return response;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || error.message || "Failed to analyze competitor topics");
        }
    }
);

/**
 * Get topic clusters
 */
export const getTopicClusters = createAsyncThunk(
    "topicResearch/getTopicClusters",
    async ({ seedKeyword, country = "US" }: { seedKeyword: string; country?: string }, { rejectWithValue }) => {
        try {
            const response = await topicResearchService.getTopicClusters(seedKeyword, country);
            return response;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || error.message || "Failed to get topic clusters");
        }
    }
);

// Create slice
const topicResearchSlice = createSlice({
    name: "topicResearch",
    initialState,
    reducers: {
        // Clear all data
        clearTopicResearchData: (state) => {
            state.topicIdeas = [];
            state.relatedTopics = [];
            state.questions = [];
            state.batchResults = null;
            state.keywordDemo = null;
            state.metrics = initialState.metrics;
        },

        // Clear errors
        clearTopicResearchErrors: (state) => {
            state.topicResearchError = null;
            state.relatedTopicsError = null;
            state.questionsError = null;
            state.batchAnalysisError = null;
            state.trendingTopicsError = null;
            state.apiStatusError = null;
            state.keywordDemoError = null;
        },

        // Set current search parameters
        setCurrentSearchParams: (state, action: PayloadAction<{
            seedKeyword?: string;
            country?: string;
            industry?: string;
        }>) => {
            if (action.payload.seedKeyword !== undefined) {
                state.currentSeedKeyword = action.payload.seedKeyword;
            }
            if (action.payload.country !== undefined) {
                state.currentCountry = action.payload.country;
            }
            if (action.payload.industry !== undefined) {
                state.currentIndustry = action.payload.industry;
            }
        },

        // Update metrics
        updateMetrics: (state, action: PayloadAction<Partial<TopicResearchState["metrics"]>>) => {
            state.metrics = { ...state.metrics, ...action.payload };
        },
    },
    extraReducers: (builder) => {
        // Generate Topic Ideas
        builder
            .addCase(generateTopicIdeas.pending, (state) => {
                state.topicResearchLoading = true;
                state.topicResearchError = null;
            })
            .addCase(generateTopicIdeas.fulfilled, (state, action: PayloadAction<TopicResearchResponse>) => {
                state.topicResearchLoading = false;
                state.topicIdeas = action.payload.topicIdeas;
                state.metrics = action.payload.metrics;
                state.currentSeedKeyword = action.payload.seedKeyword;
                state.currentCountry = action.payload.country;
                if (action.payload.industry) {
                    state.currentIndustry = action.payload.industry;
                }
            })
            .addCase(generateTopicIdeas.rejected, (state, action) => {
                state.topicResearchLoading = false;
                state.topicResearchError = action.payload as string;
            });

        // Get Related Topics
        builder
            .addCase(getRelatedTopics.pending, (state) => {
                state.relatedTopicsLoading = true;
                state.relatedTopicsError = null;
            })
            .addCase(getRelatedTopics.fulfilled, (state, action: PayloadAction<RelatedTopicsResponse>) => {
                state.relatedTopicsLoading = false;
                state.relatedTopics = action.payload.relatedTopics;
            })
            .addCase(getRelatedTopics.rejected, (state, action) => {
                state.relatedTopicsLoading = false;
                state.relatedTopicsError = action.payload as string;
            });

        // Get Topic Questions
        builder
            .addCase(getTopicQuestions.pending, (state) => {
                state.questionsLoading = true;
                state.questionsError = null;
            })
            .addCase(getTopicQuestions.fulfilled, (state, action: PayloadAction<TopicQuestionsResponse>) => {
                state.questionsLoading = false;
                state.questions = action.payload.questions;
            })
            .addCase(getTopicQuestions.rejected, (state, action) => {
                state.questionsLoading = false;
                state.questionsError = action.payload as string;
            });

        // Batch Analysis
        builder
            .addCase(batchAnalysis.pending, (state) => {
                state.batchAnalysisLoading = true;
                state.batchAnalysisError = null;
            })
            .addCase(batchAnalysis.fulfilled, (state, action: PayloadAction<BatchAnalysisResponse>) => {
                state.batchAnalysisLoading = false;
                state.batchResults = action.payload;
            })
            .addCase(batchAnalysis.rejected, (state, action) => {
                state.batchAnalysisLoading = false;
                state.batchAnalysisError = action.payload as string;
            });

        // Get Trending Topics
        builder
            .addCase(getTrendingTopics.pending, (state) => {
                state.trendingTopicsLoading = true;
                state.trendingTopicsError = null;
            })
            .addCase(getTrendingTopics.fulfilled, (state, action: PayloadAction<TrendingTopicsResponse>) => {
                state.trendingTopicsLoading = false;
                state.trendingTopics = action.payload.trendingTopics;
            })
            .addCase(getTrendingTopics.rejected, (state, action) => {
                state.trendingTopicsError = action.payload as string;
                state.trendingTopicsLoading = false;
            });

        // Get API Status
        builder
            .addCase(getAPIStatus.pending, (state) => {
                state.apiStatusLoading = true;
                state.apiStatusError = null;
            })
            .addCase(getAPIStatus.fulfilled, (state, action: PayloadAction<APIStatus>) => {
                state.apiStatusLoading = false;
                state.apiStatus = action.payload;
            })
            .addCase(getAPIStatus.rejected, (state, action) => {
                state.apiStatusLoading = false;
                state.apiStatusError = action.payload as string;
            });

        // Get Keyword Demo
        builder
            .addCase(getKeywordDemo.pending, (state) => {
                state.keywordDemoLoading = true;
                state.keywordDemoError = null;
            })
            .addCase(getKeywordDemo.fulfilled, (state, action: PayloadAction<KeywordDemo>) => {
                state.keywordDemoLoading = false;
                state.keywordDemo = action.payload;
            })
            .addCase(getKeywordDemo.rejected, (state, action) => {
                state.keywordDemoLoading = false;
                state.keywordDemoError = action.payload as string;
            });

        // Research Topic (comprehensive)
        builder
            .addCase(researchTopic.pending, (state) => {
                state.topicResearchLoading = true;
                state.relatedTopicsLoading = true;
                state.questionsLoading = true;
                state.topicResearchError = null;
                state.relatedTopicsError = null;
                state.questionsError = null;
            })
            .addCase(researchTopic.fulfilled, (state, action) => {
                state.topicResearchLoading = false;
                state.relatedTopicsLoading = false;
                state.questionsLoading = false;

                // Update data from comprehensive research
                state.topicIdeas = action.payload.topicIdeas.topicIdeas;
                state.metrics = action.payload.topicIdeas.metrics;
                state.relatedTopics = action.payload.relatedTopics.relatedTopics;
                state.questions = action.payload.questions.questions;

                // Update current search params
                state.currentSeedKeyword = action.payload.topicIdeas.seedKeyword;
                state.currentCountry = action.payload.topicIdeas.country;
                if (action.payload.topicIdeas.industry) {
                    state.currentIndustry = action.payload.topicIdeas.industry;
                }
            })
            .addCase(researchTopic.rejected, (state, action) => {
                state.topicResearchLoading = false;
                state.relatedTopicsLoading = false;
                state.questionsLoading = false;
                const errorMessage = action.payload as string;
                state.topicResearchError = errorMessage;
                state.relatedTopicsError = errorMessage;
                state.questionsError = errorMessage;
            });

        // Get Content Opportunities
        builder
            .addCase(getContentOpportunities.pending, (state) => {
                state.keywordDemoLoading = true;
                state.trendingTopicsLoading = true;
            })
            .addCase(getContentOpportunities.fulfilled, (state, action) => {
                state.keywordDemoLoading = false;
                state.trendingTopicsLoading = false;
                state.keywordDemo = action.payload.demo;
                state.trendingTopics = action.payload.trending.trendingTopics;
            })
            .addCase(getContentOpportunities.rejected, (state, action) => {
                state.keywordDemoLoading = false;
                state.trendingTopicsLoading = false;
                state.keywordDemoError = action.payload as string;
                state.trendingTopicsError = action.payload as string;
            });

        // Analyze Competitor Topics
        builder
            .addCase(analyzeCompetitorTopics.pending, (state) => {
                state.batchAnalysisLoading = true;
                state.batchAnalysisError = null;
            })
            .addCase(analyzeCompetitorTopics.fulfilled, (state, action: PayloadAction<BatchAnalysisResponse>) => {
                state.batchAnalysisLoading = false;
                state.batchResults = action.payload;
            })
            .addCase(analyzeCompetitorTopics.rejected, (state, action) => {
                state.batchAnalysisLoading = false;
                state.batchAnalysisError = action.payload as string;
            });

        // Get Topic Clusters
        builder
            .addCase(getTopicClusters.pending, (state) => {
                state.relatedTopicsLoading = true;
                state.relatedTopicsError = null;
            })
            .addCase(getTopicClusters.fulfilled, (state, action) => {
                state.relatedTopicsLoading = false;
                state.relatedTopics = action.payload.relatedTopics.relatedTopics;
            })
            .addCase(getTopicClusters.rejected, (state, action) => {
                state.relatedTopicsLoading = false;
                state.relatedTopicsError = action.payload as string;
            });
    },
});

// Export actions
export const {
    clearTopicResearchData,
    clearTopicResearchErrors,
    setCurrentSearchParams,
    updateMetrics,
} = topicResearchSlice.actions;

// Export reducer
export default topicResearchSlice.reducer;
