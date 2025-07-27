import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { seoService } from '@/services/seo.service';

// AI Tool Types
export interface AiTool {
    id: string;
    name: string;
    description: string;
    category: 'content' | 'seo' | 'analysis' | 'research' | 'optimization';
    icon: string;
    isActive: boolean;
    isPremium: boolean;
    usageCount: number;
    maxUsage?: number;
    features: string[];
}

export interface AiRequest {
    id: string;
    toolId: string;
    toolName: string;
    input: string;
    output?: string;
    status: 'pending' | 'processing' | 'completed' | 'failed';
    createdAt: string;
    completedAt?: string;
    tokens?: number;
    cost?: number;
    projectId?: string;
}

export interface ContentGenerationRequest {
    type: 'blog_post' | 'meta_description' | 'title_tags' | 'product_description' | 'social_post';
    prompt: string;
    keywords?: string[];
    tone?: 'professional' | 'casual' | 'friendly' | 'authoritative' | 'creative';
    length?: 'short' | 'medium' | 'long';
    language?: string;
    targetAudience?: string;
    projectId?: string;
}

export interface SeoAnalysisRequest {
    url: string;
    targetKeywords: string[];
    competitors?: string[];
    projectId?: string;
}

export interface KeywordResearchRequest {
    seedKeywords: string[];
    location?: string;
    language?: string;
    includeQuestions?: boolean;
    projectId?: string;
}

// State interface
export interface AiState {
    tools: AiTool[];
    requests: AiRequest[];
    currentRequest: AiRequest | null;
    loading: boolean;
    error: string | null;
    stats: {
        totalRequests: number;
        completedRequests: number;
        tokensUsed: number;
        monthlyCost: number;
    };
    filters: {
        category?: string;
        status?: string;
        dateRange?: {
            start: string;
            end: string;
        };
    };
    pagination: {
        total: number;
        page: number;
        limit: number;
        totalPages: number;
    };
}

// Initial state
const initialState: AiState = {
    tools: [],
    requests: [],
    currentRequest: null,
    loading: false,
    error: null,
    stats: {
        totalRequests: 0,
        completedRequests: 0,
        tokensUsed: 0,
        monthlyCost: 0,
    },
    filters: {},
    pagination: {
        total: 0,
        page: 1,
        limit: 10,
        totalPages: 0,
    },
};

// Async thunks
export const fetchAiTools = createAsyncThunk(
    'ai/fetchTools',
    async (_, { rejectWithValue }) => {
        try {
            // Return predefined AI tools available in the system
            const tools: AiTool[] = [
                {
                    id: 'content-generator',
                    name: 'Content Generator',
                    description: 'Generate high-quality content for blogs, articles, and web pages',
                    category: 'content',
                    icon: '📝',
                    isActive: true,
                    isPremium: false,
                    usageCount: 0,
                    maxUsage: 100,
                    features: ['Blog posts', 'Articles', 'Product descriptions', 'Meta descriptions'],
                },
                {
                    id: 'seo-optimizer',
                    name: 'SEO Optimizer',
                    description: 'Optimize your content for search engines with AI-powered suggestions',
                    category: 'seo',
                    icon: '🎯',
                    isActive: true,
                    isPremium: true,
                    usageCount: 0,
                    features: ['Keyword optimization', 'Title suggestions', 'Meta tags', 'Content structure'],
                },
                {
                    id: 'keyword-research',
                    name: 'Keyword Research',
                    description: 'Discover profitable keywords with AI-powered research',
                    category: 'research',
                    icon: '🔍',
                    isActive: true,
                    isPremium: false,
                    usageCount: 0,
                    maxUsage: 200,
                    features: ['Keyword suggestions', 'Search volume', 'Competition analysis', 'Long-tail keywords'],
                },
                {
                    id: 'competitor-analysis',
                    name: 'Competitor Analysis',
                    description: 'Analyze your competitors\' strategies with AI insights',
                    category: 'analysis',
                    icon: '📊',
                    isActive: true,
                    isPremium: true,
                    usageCount: 0,
                    features: ['Content gaps', 'Keyword gaps', 'Backlink analysis', 'Strategy insights'],
                },
                {
                    id: 'content-optimizer',
                    name: 'Content Optimizer',
                    description: 'Optimize existing content for better performance',
                    category: 'optimization',
                    icon: '⚡',
                    isActive: true,
                    isPremium: false,
                    usageCount: 0,
                    maxUsage: 150,
                    features: ['Readability improvement', 'SEO optimization', 'Structure analysis', 'Performance tips'],
                },
                {
                    id: 'social-media-generator',
                    name: 'Social Media Generator',
                    description: 'Create engaging social media content automatically',
                    category: 'content',
                    icon: '📱',
                    isActive: true,
                    isPremium: false,
                    usageCount: 0,
                    maxUsage: 300,
                    features: ['Post generation', 'Hashtag suggestions', 'Caption writing', 'Multi-platform'],
                },
            ];

            return tools;
        } catch (error: any) {
            return rejectWithValue(error.message || 'Failed to fetch AI tools');
        }
    }
);

export const fetchAiRequests = createAsyncThunk(
    'ai/fetchRequests',
    async (params: { filters?: any; pagination?: { page: number; limit: number } }, { rejectWithValue }) => {
        try {
            // TODO: Replace with actual API call when AI requests endpoint is available
            // For now, return empty data structure
            const emptyResponse = {
                data: [] as AiRequest[],
                total: 0,
                page: params.pagination?.page || 1,
                limit: params.pagination?.limit || 10,
                totalPages: 0,
            };

            return emptyResponse;
        } catch (error: any) {
            return rejectWithValue(error.message || 'Failed to fetch AI requests');
        }
    }
);

export const generateContent = createAsyncThunk(
    'ai/generateContent',
    async (request: ContentGenerationRequest, { rejectWithValue }) => {
        try {
            // Convert local types to API types
            const typeMapping: Record<string, string> = {
                'blog_post': 'blog-post',
                'meta_description': 'meta-description',
                'title_tags': 'meta-description', // Map to closest equivalent
                'product_description': 'product-description',
                'social_post': 'social-post',
            };

            const toneMapping: Record<string, string> = {
                'professional': 'professional',
                'casual': 'casual',
                'friendly': 'friendly',
                'authoritative': 'authoritative',
                'creative': 'friendly', // Map creative to friendly as fallback
            };

            // Use the actual AI content generation API from seoService
            const generatedContent = await seoService.generateContent({
                projectId: request.projectId || '',
                type: typeMapping[request.type] as any,
                topic: request.prompt, // Use prompt as topic
                targetKeywords: request.keywords || [],
                tone: toneMapping[request.tone || 'professional'] as any,
                length: request.length || 'medium',
                audience: request.targetAudience || 'general audience',
            });

            // Convert API response to AiRequest format for the request history
            const newRequest: AiRequest = {
                id: `request-${Date.now()}`,
                toolId: 'content-generator',
                toolName: 'Content Generator',
                input: request.prompt,
                output: generatedContent.content || 'Content generated successfully',
                status: 'completed',
                createdAt: new Date().toISOString(),
                completedAt: new Date().toISOString(),
                tokens: generatedContent.usageCredits || 500,
                cost: (generatedContent.usageCredits || 500) * 0.00002, // Estimate cost per token
                projectId: request.projectId,
            };

            return newRequest;
        } catch (error: any) {
            console.error('Content generation failed:', error);

            // Create a failed request record
            const failedRequest: AiRequest = {
                id: `request-${Date.now()}`,
                toolId: 'content-generator',
                toolName: 'Content Generator',
                input: request.prompt,
                status: 'failed',
                createdAt: new Date().toISOString(),
                projectId: request.projectId,
            };

            // Still return the failed request for tracking, but also reject
            return rejectWithValue(error.message || 'Failed to generate content');
        }
    }
);

export const analyzeSeо = createAsyncThunk(
    'ai/analyzeSeo',
    async (request: SeoAnalysisRequest, { rejectWithValue }) => {
        try {
            // Use the actual AI SEO analysis API from seoService
            const seoAnalysis = await seoService.aiAnalyzePage({
                url: request.url,
                targetKeywords: request.targetKeywords,
            });

            const newRequest: AiRequest = {
                id: `request-${Date.now()}`,
                toolId: 'seo-optimizer',
                toolName: 'SEO Optimizer',
                input: `Analyze SEO for ${request.url} with keywords: ${request.targetKeywords.join(', ')}`,
                output: `SEO analysis completed. Score: ${seoAnalysis.overallScore}/100. Found ${seoAnalysis.recommendations?.length || 0} recommendations.`,
                status: 'completed',
                createdAt: new Date().toISOString(),
                completedAt: new Date().toISOString(),
                tokens: 300, // Estimate for SEO analysis
                cost: 0.006, // Estimate cost
                projectId: request.projectId,
            };

            return newRequest;
        } catch (error: any) {
            console.error('SEO analysis failed:', error);
            return rejectWithValue(error.message || 'Failed to analyze SEO');
        }
    }
);

export const researchKeywords = createAsyncThunk(
    'ai/researchKeywords',
    async (request: KeywordResearchRequest, { rejectWithValue }) => {
        try {
            // Use the actual AI keyword suggestions API from seoService
            const keywordSuggestions = await seoService.aiKeywordSuggestions({
                seedKeyword: request.seedKeywords[0], // Use first seed keyword
                location: request.location,
                // Note: API doesn't have language parameter, so we'll skip it
            });

            const newRequest: AiRequest = {
                id: `request-${Date.now()}`,
                toolId: 'keyword-research',
                toolName: 'Keyword Research',
                input: `Research keywords for: ${request.seedKeywords.join(', ')}`,
                output: `Keyword research completed with ${keywordSuggestions.length} relevant keywords found.`,
                status: 'completed',
                createdAt: new Date().toISOString(),
                completedAt: new Date().toISOString(),
                tokens: 250, // Estimate for keyword research
                cost: 0.005, // Estimate cost
                projectId: request.projectId,
            };

            return newRequest;
        } catch (error: any) {
            console.error('Keyword research failed:', error);
            return rejectWithValue(error.message || 'Failed to research keywords');
        }
    }
);

// Slice
const aiSlice = createSlice({
    name: 'ai',
    initialState,
    reducers: {
        setFilters: (state, action: PayloadAction<Partial<AiState['filters']>>) => {
            state.filters = { ...state.filters, ...action.payload };
        },
        setPagination: (state, action: PayloadAction<Partial<AiState['pagination']>>) => {
            state.pagination = { ...state.pagination, ...action.payload };
        },
        setCurrentRequest: (state, action: PayloadAction<AiRequest | null>) => {
            state.currentRequest = action.payload;
        },
        clearError: (state) => {
            state.error = null;
        },
        resetAiState: (state) => {
            return initialState;
        },
    },
    extraReducers: (builder) => {
        // Fetch AI tools
        builder
            .addCase(fetchAiTools.fulfilled, (state, action) => {
                state.tools = action.payload;
            });

        // Fetch AI requests
        builder
            .addCase(fetchAiRequests.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchAiRequests.fulfilled, (state, action) => {
                state.loading = false;
                state.requests = action.payload.data;
                state.pagination = {
                    total: action.payload.total,
                    page: action.payload.page,
                    limit: action.payload.limit,
                    totalPages: action.payload.totalPages,
                };

                // Update stats
                const completedRequests = action.payload.data.filter((r: AiRequest) => r.status === 'completed');
                state.stats = {
                    totalRequests: action.payload.total,
                    completedRequests: completedRequests.length,
                    tokensUsed: completedRequests.reduce((sum: number, r: AiRequest) => sum + (r.tokens || 0), 0),
                    monthlyCost: completedRequests.reduce((sum: number, r: AiRequest) => sum + (r.cost || 0), 0),
                };
            })
            .addCase(fetchAiRequests.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });

        // Generate content
        builder
            .addCase(generateContent.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(generateContent.fulfilled, (state, action) => {
                state.loading = false;
                state.requests.unshift(action.payload);
                state.pagination.total += 1;
            })
            .addCase(generateContent.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });

        // Analyze SEO
        builder
            .addCase(analyzeSeо.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(analyzeSeо.fulfilled, (state, action) => {
                state.loading = false;
                state.requests.unshift(action.payload);
                state.pagination.total += 1;
            })
            .addCase(analyzeSeо.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });

        // Research keywords
        builder
            .addCase(researchKeywords.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(researchKeywords.fulfilled, (state, action) => {
                state.loading = false;
                state.requests.unshift(action.payload);
                state.pagination.total += 1;
            })
            .addCase(researchKeywords.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
    },
});

export const {
    setFilters,
    setPagination,
    setCurrentRequest,
    clearError,
    resetAiState,
} = aiSlice.actions;

export default aiSlice.reducer;
