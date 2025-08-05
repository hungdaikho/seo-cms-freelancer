import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { contentPlanningService } from '@/services/content-planning.service';
import {
    CalendarItem,
    CreateCalendarItemRequest,
    UpdateCalendarItemRequest,
    BulkUpdateRequest,
    CalendarFilters,
    CalendarMetrics,
    ContentIdeaRequest,
    ContentIdeaResponse,
    TopicResearchRequest,
    TopicResearchResponse,
    TopicQuestionsResponse,
    BatchTopicAnalysisRequest,
    ContentPerformanceResponse,
    ContentPerformanceFilters,
    ContentCategory,
    CreateCategoryRequest,
    UpdateCategoryRequest,
    ContentOptimizationRequest,
    ContentRewriteRequest,
    GenerateContentFromTemplateRequest
} from '@/types/content-planning.type';

// Async Thunks for Calendar Management
export const fetchCalendarItems = createAsyncThunk(
    'contentPlanning/fetchCalendarItems',
    async ({ projectId, filters }: { projectId: string; filters?: CalendarFilters }, { rejectWithValue }) => {
        try {
            return await contentPlanningService.getCalendarItems(projectId, filters);
        } catch (error: any) {
            return rejectWithValue(error.response?.data || error.message);
        }
    }
);

export const createCalendarItem = createAsyncThunk(
    'contentPlanning/createCalendarItem',
    async ({ projectId, data }: { projectId: string; data: CreateCalendarItemRequest }, { rejectWithValue }) => {
        try {
            return await contentPlanningService.createCalendarItem(projectId, data);
        } catch (error: any) {
            return rejectWithValue(error.response?.data || error.message);
        }
    }
);

export const updateCalendarItem = createAsyncThunk(
    'contentPlanning/updateCalendarItem',
    async ({ projectId, itemId, data }: { projectId: string; itemId: string; data: UpdateCalendarItemRequest }, { rejectWithValue }) => {
        try {
            return await contentPlanningService.updateCalendarItem(projectId, itemId, data);
        } catch (error: any) {
            return rejectWithValue(error.response?.data || error.message);
        }
    }
);

export const bulkUpdateCalendarItems = createAsyncThunk(
    'contentPlanning/bulkUpdateCalendarItems',
    async ({ projectId, data }: { projectId: string; data: BulkUpdateRequest }, { rejectWithValue }) => {
        try {
            await contentPlanningService.bulkUpdateCalendarItems(projectId, data);
            return data.items;
        } catch (error: any) {
            return rejectWithValue(error.response?.data || error.message);
        }
    }
);

export const deleteCalendarItem = createAsyncThunk(
    'contentPlanning/deleteCalendarItem',
    async ({ projectId, itemId }: { projectId: string; itemId: string }, { rejectWithValue }) => {
        try {
            await contentPlanningService.deleteCalendarItem(projectId, itemId);
            return itemId;
        } catch (error: any) {
            return rejectWithValue(error.response?.data || error.message);
        }
    }
);

// Async Thunks for AI Content Planning
export const generateContentIdeas = createAsyncThunk(
    'contentPlanning/generateContentIdeas',
    async (data: ContentIdeaRequest, { rejectWithValue }) => {
        try {
            return await contentPlanningService.generateContentIdeas(data);
        } catch (error: any) {
            return rejectWithValue(error.response?.data || error.message);
        }
    }
);

export const optimizeContent = createAsyncThunk(
    'contentPlanning/optimizeContent',
    async (data: ContentOptimizationRequest, { rejectWithValue }) => {
        try {
            return await contentPlanningService.optimizeContent(data);
        } catch (error: any) {
            return rejectWithValue(error.response?.data || error.message);
        }
    }
);

export const rewriteContent = createAsyncThunk(
    'contentPlanning/rewriteContent',
    async ({ projectId, data }: { projectId: string; data: ContentRewriteRequest }, { rejectWithValue }) => {
        try {
            return await contentPlanningService.rewriteContent(projectId, data);
        } catch (error: any) {
            return rejectWithValue(error.response?.data || error.message);
        }
    }
);

export const generateContentFromTemplate = createAsyncThunk(
    'contentPlanning/generateContentFromTemplate',
    async ({ projectId, data }: { projectId: string; data: GenerateContentFromTemplateRequest }, { rejectWithValue }) => {
        try {
            return await contentPlanningService.generateContentFromTemplate(projectId, data);
        } catch (error: any) {
            return rejectWithValue(error.response?.data || error.message);
        }
    }
);

// Async Thunks for Topic Research
export const generateTopicIdeas = createAsyncThunk(
    'contentPlanning/generateTopicIdeas',
    async (data: TopicResearchRequest, { rejectWithValue }) => {
        try {
            return await contentPlanningService.generateTopicIdeas(data);
        } catch (error: any) {
            return rejectWithValue(error.response?.data || error.message);
        }
    }
);

export const getRelatedTopics = createAsyncThunk(
    'contentPlanning/getRelatedTopics',
    async ({ topic, limit, country }: { topic: string; limit?: number; country?: string }, { rejectWithValue }) => {
        try {
            return await contentPlanningService.getRelatedTopics(topic, limit, country);
        } catch (error: any) {
            return rejectWithValue(error.response?.data || error.message);
        }
    }
);

export const getTopicQuestions = createAsyncThunk(
    'contentPlanning/getTopicQuestions',
    async (topic: string, { rejectWithValue }) => {
        try {
            return await contentPlanningService.getTopicQuestions(topic);
        } catch (error: any) {
            return rejectWithValue(error.response?.data || error.message);
        }
    }
);

export const batchTopicAnalysis = createAsyncThunk(
    'contentPlanning/batchTopicAnalysis',
    async (data: BatchTopicAnalysisRequest, { rejectWithValue }) => {
        try {
            return await contentPlanningService.batchTopicAnalysis(data);
        } catch (error: any) {
            return rejectWithValue(error.response?.data || error.message);
        }
    }
);

// Async Thunks for Content Performance
export const fetchContentPerformance = createAsyncThunk(
    'contentPlanning/fetchContentPerformance',
    async ({ projectId, filters }: { projectId: string; filters?: ContentPerformanceFilters }, { rejectWithValue }) => {
        try {
            return await contentPlanningService.getContentPerformance(projectId, filters);
        } catch (error: any) {
            return rejectWithValue(error.response?.data || error.message);
        }
    }
);

export const fetchContentROI = createAsyncThunk(
    'contentPlanning/fetchContentROI',
    async (projectId: string, { rejectWithValue }) => {
        try {
            return await contentPlanningService.getContentROI(projectId);
        } catch (error: any) {
            return rejectWithValue(error.response?.data || error.message);
        }
    }
);

export const fetchCompetitiveContentAnalysis = createAsyncThunk(
    'contentPlanning/fetchCompetitiveContentAnalysis',
    async ({ projectId, keyword, competitors }: { projectId: string; keyword: string; competitors: string[] }, { rejectWithValue }) => {
        try {
            return await contentPlanningService.getCompetitiveContentAnalysis(projectId, keyword, competitors);
        } catch (error: any) {
            return rejectWithValue(error.response?.data || error.message);
        }
    }
);

// Async Thunks for Categories
export const fetchCategories = createAsyncThunk(
    'contentPlanning/fetchCategories',
    async (projectId: string, { rejectWithValue }) => {
        try {
            return await contentPlanningService.getCategories(projectId);
        } catch (error: any) {
            return rejectWithValue(error.response?.data || error.message);
        }
    }
);

export const createCategory = createAsyncThunk(
    'contentPlanning/createCategory',
    async ({ projectId, data }: { projectId: string; data: CreateCategoryRequest }, { rejectWithValue }) => {
        try {
            return await contentPlanningService.createCategory(projectId, data);
        } catch (error: any) {
            return rejectWithValue(error.response?.data || error.message);
        }
    }
);

export const updateCategory = createAsyncThunk(
    'contentPlanning/updateCategory',
    async ({ projectId, categoryId, data }: { projectId: string; categoryId: string; data: UpdateCategoryRequest }, { rejectWithValue }) => {
        try {
            return await contentPlanningService.updateCategory(projectId, categoryId, data);
        } catch (error: any) {
            return rejectWithValue(error.response?.data || error.message);
        }
    }
);

export const deleteCategory = createAsyncThunk(
    'contentPlanning/deleteCategory',
    async ({ projectId, categoryId }: { projectId: string; categoryId: string }, { rejectWithValue }) => {
        try {
            await contentPlanningService.deleteCategory(projectId, categoryId);
            return categoryId;
        } catch (error: any) {
            return rejectWithValue(error.response?.data || error.message);
        }
    }
);

// State Interface
interface ContentPlanningState {
    // Calendar
    calendarItems: CalendarItem[];
    calendarMetrics: CalendarMetrics | null;
    calendarFilters: CalendarFilters;

    // AI Content
    contentIdeas: ContentIdeaResponse | any;
    optimizedContent: string | null;
    rewrittenContent: string | null;
    generatedContent: string | null;

    // Topic Research
    topicIdeas: TopicResearchResponse | null;
    relatedTopics: TopicResearchResponse | null;
    topicQuestions: TopicQuestionsResponse | null;
    batchAnalysis: any | null;

    // Performance
    performance: ContentPerformanceResponse | null;
    roi: any | null;
    competitiveAnalysis: any | null;

    // Categories
    categories: ContentCategory[];

    // UI State
    loading: {
        calendarItems: boolean;
        contentIdeas: boolean;
        topicResearch: boolean;
        performance: boolean;
        categories: boolean;
        contentGeneration: boolean;
    };
    error: string | null;
    selectedCalendarItem: CalendarItem | null;
}

const initialState: ContentPlanningState = {
    calendarItems: [],
    calendarMetrics: null,
    calendarFilters: {},

    contentIdeas: null,
    optimizedContent: null,
    rewrittenContent: null,
    generatedContent: null,

    topicIdeas: null,
    relatedTopics: null,
    topicQuestions: null,
    batchAnalysis: null,

    performance: null,
    roi: null,
    competitiveAnalysis: null,

    categories: [],

    loading: {
        calendarItems: false,
        contentIdeas: false,
        topicResearch: false,
        performance: false,
        categories: false,
        contentGeneration: false,
    },
    error: null,
    selectedCalendarItem: null,
};

const contentPlanningSlice = createSlice({
    name: 'contentPlanning',
    initialState,
    reducers: {
        setCalendarFilters: (state, action: PayloadAction<CalendarFilters>) => {
            state.calendarFilters = action.payload;
        },
        setSelectedCalendarItem: (state, action: PayloadAction<CalendarItem | null>) => {
            state.selectedCalendarItem = action.payload;
        },
        clearError: (state) => {
            state.error = null;
        },
        clearContentIdeas: (state) => {
            state.contentIdeas = null;
        },
        clearTopicResearch: (state) => {
            state.topicIdeas = null;
            state.relatedTopics = null;
            state.topicQuestions = null;
        },
    },
    extraReducers: (builder) => {
        // Calendar Items
        builder
            .addCase(fetchCalendarItems.pending, (state) => {
                state.loading.calendarItems = true;
                state.error = null;
            })
            .addCase(fetchCalendarItems.fulfilled, (state, action) => {
                state.loading.calendarItems = false;
                state.calendarItems = action.payload.items;
                state.calendarMetrics = action.payload.metrics;
            })
            .addCase(fetchCalendarItems.rejected, (state, action) => {
                state.loading.calendarItems = false;
                state.error = action.payload as string;
            })

            .addCase(createCalendarItem.pending, (state) => {
                state.loading.calendarItems = true;
            })
            .addCase(createCalendarItem.fulfilled, (state, action) => {
                state.loading.calendarItems = false;
                state.calendarItems.unshift(action.payload);
            })
            .addCase(createCalendarItem.rejected, (state, action) => {
                state.loading.calendarItems = false;
                state.error = action.payload as string;
            })

            .addCase(updateCalendarItem.fulfilled, (state, action) => {
                const index = state.calendarItems.findIndex(item => item.id === action.payload.id);
                if (index !== -1) {
                    state.calendarItems[index] = action.payload;
                }
            })

            .addCase(deleteCalendarItem.fulfilled, (state, action) => {
                state.calendarItems = state.calendarItems.filter(item => item.id !== action.payload);
            })

            .addCase(bulkUpdateCalendarItems.fulfilled, (state, action) => {
                action.payload.forEach(updateItem => {
                    const index = state.calendarItems.findIndex(item => item.id === updateItem.id);
                    if (index !== -1) {
                        state.calendarItems[index] = { ...state.calendarItems[index], ...updateItem };
                    }
                });
            })

        // Content Ideas
        builder
            .addCase(generateContentIdeas.pending, (state) => {
                state.loading.contentIdeas = true;
                state.error = null;
            })
            .addCase(generateContentIdeas.fulfilled, (state, action) => {
                state.loading.contentIdeas = false;
                state.contentIdeas = action.payload;
            })
            .addCase(generateContentIdeas.rejected, (state, action) => {
                state.loading.contentIdeas = false;
                state.error = action.payload as string;
            })

        // Content Generation
        builder
            .addCase(optimizeContent.pending, (state) => {
                state.loading.contentGeneration = true;
            })
            .addCase(optimizeContent.fulfilled, (state, action) => {
                state.loading.contentGeneration = false;
                state.optimizedContent = action.payload.optimizedContent;
            })
            .addCase(optimizeContent.rejected, (state, action) => {
                state.loading.contentGeneration = false;
                state.error = action.payload as string;
            })

            .addCase(rewriteContent.fulfilled, (state, action) => {
                state.rewrittenContent = action.payload.rewrittenContent;
            })

            .addCase(generateContentFromTemplate.fulfilled, (state, action) => {
                state.generatedContent = action.payload.content;
            })

        // Topic Research
        builder
            .addCase(generateTopicIdeas.pending, (state) => {
                state.loading.topicResearch = true;
                state.error = null;
            })
            .addCase(generateTopicIdeas.fulfilled, (state, action) => {
                state.loading.topicResearch = false;
                state.topicIdeas = action.payload;
            })
            .addCase(generateTopicIdeas.rejected, (state, action) => {
                state.loading.topicResearch = false;
                state.error = action.payload as string;
            })

            .addCase(getRelatedTopics.fulfilled, (state, action) => {
                state.relatedTopics = action.payload;
            })

            .addCase(getTopicQuestions.fulfilled, (state, action) => {
                state.topicQuestions = action.payload;
            })

            .addCase(batchTopicAnalysis.fulfilled, (state, action) => {
                state.batchAnalysis = action.payload;
            })

        // Performance Analytics
        builder
            .addCase(fetchContentPerformance.pending, (state) => {
                state.loading.performance = true;
                state.error = null;
            })
            .addCase(fetchContentPerformance.fulfilled, (state, action) => {
                state.loading.performance = false;
                state.performance = action.payload;
            })
            .addCase(fetchContentPerformance.rejected, (state, action) => {
                state.loading.performance = false;
                state.error = action.payload as string;
            })

            .addCase(fetchContentROI.fulfilled, (state, action) => {
                state.roi = action.payload;
            })

            .addCase(fetchCompetitiveContentAnalysis.fulfilled, (state, action) => {
                state.competitiveAnalysis = action.payload;
            })

        // Categories
        builder
            .addCase(fetchCategories.pending, (state) => {
                state.loading.categories = true;
                state.error = null;
            })
            .addCase(fetchCategories.fulfilled, (state, action) => {
                state.loading.categories = false;
                state.categories = action.payload;
            })
            .addCase(fetchCategories.rejected, (state, action) => {
                state.loading.categories = false;
                state.error = action.payload as string;
            })

            .addCase(createCategory.fulfilled, (state, action) => {
                state.categories.push(action.payload);
            })

            .addCase(updateCategory.fulfilled, (state, action) => {
                const index = state.categories.findIndex(cat => cat.id === action.payload.id);
                if (index !== -1) {
                    state.categories[index] = action.payload;
                }
            })

            .addCase(deleteCategory.fulfilled, (state, action) => {
                state.categories = state.categories.filter(cat => cat.id !== action.payload);
            });
    },
});

export const {
    setCalendarFilters,
    setSelectedCalendarItem,
    clearError,
    clearContentIdeas,
    clearTopicResearch,
} = contentPlanningSlice.actions;

export default contentPlanningSlice.reducer;
