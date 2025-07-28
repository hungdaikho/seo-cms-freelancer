import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { aiService, AIRequestType } from '@/services/ai.service';

// Async thunks for AI Copilot features using AI module API
export const fetchCompetitorRankings = createAsyncThunk(
    'copilotAI/fetchCompetitorRankings',
    async ({ projectId }: { projectId: string }, thunkAPI) => {
        try {
            // Use AI competitor analysis API
            const response = await aiService.processRequest({
                type: AIRequestType.COMPETITOR_ANALYSIS,
                parameters: {
                    competitorDomain: 'competitor.com', // Required field
                    yourDomain: 'vanhungtran.com', // Required field
                    industry: 'technology' // Optional field
                },
                projectId
            });
            return response.result;
        } catch (error: any) {
            return thunkAPI.rejectWithValue(error.message || 'Failed to fetch competitor rankings');
        }
    }
);

export const fetchTechnicalAudit = createAsyncThunk(
    'copilotAI/fetchTechnicalAudit',
    async ({ projectId }: { projectId: string }, thunkAPI) => {
        try {
            // Use AI SEO audit API
            const response = await aiService.processRequest({
                type: AIRequestType.SEO_AUDIT,
                parameters: {
                    url: 'https://vanhungtran.com', // Required field
                    targetKeywords: ['seo', 'digital marketing'] // Optional field
                },
                projectId
            });
            return response.result;
        } catch (error: any) {
            return thunkAPI.rejectWithValue(error.message || 'Failed to fetch technical audit');
        }
    }
);

export const fetchAIRecommendations = createAsyncThunk(
    'copilotAI/fetchAIRecommendations',
    async ({ projectId }: { projectId: string }, thunkAPI) => {
        try {
            // Get AI-generated content optimization suggestions
            const response = await aiService.processRequest({
                type: AIRequestType.CONTENT_OPTIMIZATION_SUGGESTIONS,
                parameters: {
                    content: 'Bài viết về digital marketing cho doanh nghiệp nhỏ', // Required field
                    targetKeywords: ['digital marketing', 'doanh nghiệp nhỏ', 'marketing online'], // Required field
                    targetAudience: 'chủ doanh nghiệp nhỏ', // Required field
                    currentUrl: '' // Optional field
                },
                projectId
            });
            return response.result;
        } catch (error: any) {
            return thunkAPI.rejectWithValue(error.message || 'Failed to fetch AI recommendations');
        }
    }
);

interface CopilotAIState {
    competitorRankings: any;
    technicalAudit: any;
    aiRecommendations: any;
    loading: boolean;
    error: string | null;
}

const initialState: CopilotAIState = {
    competitorRankings: null,
    technicalAudit: null,
    aiRecommendations: null,
    loading: false,
    error: null,
};

const copilotAISlice = createSlice({
    name: 'copilotAI',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            // Competitor Rankings
            .addCase(fetchCompetitorRankings.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchCompetitorRankings.fulfilled, (state, action) => {
                state.loading = false;
                state.competitorRankings = action.payload;
            })
            .addCase(fetchCompetitorRankings.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
            // Technical Audit
            .addCase(fetchTechnicalAudit.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchTechnicalAudit.fulfilled, (state, action) => {
                state.loading = false;
                state.technicalAudit = action.payload;
            })
            .addCase(fetchTechnicalAudit.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
            // AI Recommendations
            .addCase(fetchAIRecommendations.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchAIRecommendations.fulfilled, (state, action) => {
                state.loading = false;
                state.aiRecommendations = action.payload;
            })
            .addCase(fetchAIRecommendations.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
    },
});

export default copilotAISlice.reducer;
