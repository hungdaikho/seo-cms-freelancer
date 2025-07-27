import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';

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

// Mock data generators
const generateMockTools = (): AiTool[] => [
    {
        id: 'content-generator',
        name: 'Content Generator',
        description: 'Generate high-quality content for blogs, articles, and web pages',
        category: 'content',
        icon: '📝',
        isActive: true,
        isPremium: false,
        usageCount: 45,
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
        usageCount: 23,
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
        usageCount: 67,
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
        usageCount: 12,
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
        usageCount: 34,
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
        usageCount: 56,
        maxUsage: 300,
        features: ['Post generation', 'Hashtag suggestions', 'Caption writing', 'Multi-platform'],
    },
];

const generateMockRequests = (count: number): AiRequest[] => {
    const tools = generateMockTools();
    const statuses: AiRequest['status'][] = ['completed', 'pending', 'processing', 'failed'];

    return Array.from({ length: count }, (_, i) => {
        const tool = tools[Math.floor(Math.random() * tools.length)];
        const status = statuses[Math.floor(Math.random() * statuses.length)];
        const createdAt = new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString();

        return {
            id: `request-${i + 1}`,
            toolId: tool.id,
            toolName: tool.name,
            input: `Sample input for ${tool.name} request ${i + 1}`,
            output: status === 'completed' ? `Generated output for request ${i + 1}` : undefined,
            status,
            createdAt,
            completedAt: status === 'completed' ?
                new Date(new Date(createdAt).getTime() + Math.random() * 60 * 60 * 1000).toISOString() :
                undefined,
            tokens: status === 'completed' ? Math.floor(Math.random() * 2000) + 500 : undefined,
            cost: status === 'completed' ? Math.random() * 0.1 + 0.01 : undefined,
            projectId: `project-${Math.floor(Math.random() * 3) + 1}`,
        };
    });
};

// Async thunks
export const fetchAiTools = createAsyncThunk(
    'ai/fetchTools',
    async (_, { rejectWithValue }) => {
        try {
            await new Promise(resolve => setTimeout(resolve, 500));
            return generateMockTools();
        } catch (error: any) {
            return rejectWithValue(error.message || 'Failed to fetch AI tools');
        }
    }
);

export const fetchAiRequests = createAsyncThunk(
    'ai/fetchRequests',
    async (params: { filters?: any; pagination?: { page: number; limit: number } }, { rejectWithValue }) => {
        try {
            await new Promise(resolve => setTimeout(resolve, 1000));

            const mockData = generateMockRequests(50);
            let filteredData = mockData;

            // Apply filters
            if (params.filters) {
                const { category, status } = params.filters;

                if (status && status !== 'all') {
                    filteredData = filteredData.filter(request => request.status === status);
                }
            }

            // Apply pagination
            const page = params.pagination?.page || 1;
            const limit = params.pagination?.limit || 10;
            const total = filteredData.length;
            const totalPages = Math.ceil(total / limit);
            const startIndex = (page - 1) * limit;
            const paginatedData = filteredData.slice(startIndex, startIndex + limit);

            return {
                data: paginatedData,
                total,
                page,
                limit,
                totalPages,
            };
        } catch (error: any) {
            return rejectWithValue(error.message || 'Failed to fetch AI requests');
        }
    }
);

export const generateContent = createAsyncThunk(
    'ai/generateContent',
    async (request: ContentGenerationRequest, { rejectWithValue }) => {
        try {
            await new Promise(resolve => setTimeout(resolve, 3000)); // Simulate AI processing time

            const newRequest: AiRequest = {
                id: `request-${Date.now()}`,
                toolId: 'content-generator',
                toolName: 'Content Generator',
                input: request.prompt,
                output: `Generated ${request.type.replace('_', ' ')} content based on: ${request.prompt}`,
                status: 'completed',
                createdAt: new Date().toISOString(),
                completedAt: new Date().toISOString(),
                tokens: Math.floor(Math.random() * 2000) + 500,
                cost: Math.random() * 0.1 + 0.01,
                projectId: request.projectId,
            };

            return newRequest;
        } catch (error: any) {
            return rejectWithValue(error.message || 'Failed to generate content');
        }
    }
);

export const analyzeSeо = createAsyncThunk(
    'ai/analyzeSeo',
    async (request: SeoAnalysisRequest, { rejectWithValue }) => {
        try {
            await new Promise(resolve => setTimeout(resolve, 2000));

            const newRequest: AiRequest = {
                id: `request-${Date.now()}`,
                toolId: 'seo-optimizer',
                toolName: 'SEO Optimizer',
                input: `Analyze SEO for ${request.url} with keywords: ${request.targetKeywords.join(', ')}`,
                output: 'SEO analysis completed with recommendations for improvement',
                status: 'completed',
                createdAt: new Date().toISOString(),
                completedAt: new Date().toISOString(),
                tokens: Math.floor(Math.random() * 1500) + 300,
                cost: Math.random() * 0.08 + 0.02,
                projectId: request.projectId,
            };

            return newRequest;
        } catch (error: any) {
            return rejectWithValue(error.message || 'Failed to analyze SEO');
        }
    }
);

export const researchKeywords = createAsyncThunk(
    'ai/researchKeywords',
    async (request: KeywordResearchRequest, { rejectWithValue }) => {
        try {
            await new Promise(resolve => setTimeout(resolve, 2500));

            const newRequest: AiRequest = {
                id: `request-${Date.now()}`,
                toolId: 'keyword-research',
                toolName: 'Keyword Research',
                input: `Research keywords for: ${request.seedKeywords.join(', ')}`,
                output: 'Keyword research completed with 50+ relevant keywords and search volumes',
                status: 'completed',
                createdAt: new Date().toISOString(),
                completedAt: new Date().toISOString(),
                tokens: Math.floor(Math.random() * 1000) + 200,
                cost: Math.random() * 0.05 + 0.01,
                projectId: request.projectId,
            };

            return newRequest;
        } catch (error: any) {
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
                const completedRequests = action.payload.data.filter(r => r.status === 'completed');
                state.stats = {
                    totalRequests: action.payload.total,
                    completedRequests: completedRequests.length,
                    tokensUsed: completedRequests.reduce((sum, r) => sum + (r.tokens || 0), 0),
                    monthlyCost: completedRequests.reduce((sum, r) => sum + (r.cost || 0), 0),
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
