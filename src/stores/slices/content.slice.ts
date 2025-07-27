import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';

// Content Types (tạm thời, sẽ mở rộng khi có API thực tế)
export interface ContentItem {
    id: string;
    title: string;
    slug: string;
    content: string;
    excerpt: string;
    status: 'draft' | 'published' | 'scheduled' | 'archived';
    type: 'post' | 'page' | 'landing-page' | 'product';
    author: {
        id: string;
        name: string;
        avatar?: string;
    };
    categories: string[];
    tags: string[];
    seoData: {
        metaTitle?: string;
        metaDescription?: string;
        focusKeyword?: string;
        seoScore?: number;
        readabilityScore?: number;
    };
    publishedAt?: string;
    createdAt: string;
    updatedAt: string;
    wordCount: number;
    readingTime: number; // in minutes
    featuredImage?: string;
    projectId?: string;
}

export interface ContentCategory {
    id: string;
    name: string;
    slug: string;
    description?: string;
    count: number;
}

export interface ContentFilters {
    status?: 'all' | 'draft' | 'published' | 'scheduled' | 'archived';
    type?: 'all' | 'post' | 'page' | 'landing-page' | 'product';
    category?: string;
    search?: string;
    author?: string;
    sortBy?: 'createdAt' | 'updatedAt' | 'publishedAt' | 'title' | 'wordCount';
    sortOrder?: 'asc' | 'desc';
}

export interface CreateContentRequest {
    title: string;
    content: string;
    excerpt?: string;
    status?: 'draft' | 'published' | 'scheduled';
    type: 'post' | 'page' | 'landing-page' | 'product';
    categories?: string[];
    tags?: string[];
    seoData?: {
        metaTitle?: string;
        metaDescription?: string;
        focusKeyword?: string;
    };
    publishedAt?: string;
    featuredImage?: string;
    projectId?: string;
}

export interface UpdateContentRequest {
    title?: string;
    content?: string;
    excerpt?: string;
    status?: 'draft' | 'published' | 'scheduled' | 'archived';
    categories?: string[];
    tags?: string[];
    seoData?: {
        metaTitle?: string;
        metaDescription?: string;
        focusKeyword?: string;
    };
    publishedAt?: string;
    featuredImage?: string;
}

// State interface
export interface ContentState {
    items: ContentItem[];
    categories: ContentCategory[];
    currentItem: ContentItem | null;
    loading: boolean;
    error: string | null;
    filters: ContentFilters;
    pagination: {
        total: number;
        page: number;
        limit: number;
        totalPages: number;
    };
    stats: {
        totalItems: number;
        published: number;
        draft: number;
        scheduled: number;
        avgSeoScore: number;
        avgReadabilityScore: number;
    };
}

// Initial state
const initialState: ContentState = {
    items: [],
    categories: [],
    currentItem: null,
    loading: false,
    error: null,
    filters: {
        status: 'all',
        type: 'all',
        sortBy: 'updatedAt',
        sortOrder: 'desc',
        search: '',
    },
    pagination: {
        total: 0,
        page: 1,
        limit: 10,
        totalPages: 0,
    },
    stats: {
        totalItems: 0,
        published: 0,
        draft: 0,
        scheduled: 0,
        avgSeoScore: 0,
        avgReadabilityScore: 0,
    },
};

// Mock data generator
const generateMockContent = (count: number): ContentItem[] => {
    const statuses: ContentItem['status'][] = ['draft', 'published', 'scheduled', 'archived'];
    const types: ContentItem['type'][] = ['post', 'page', 'landing-page', 'product'];
    const categories = ['SEO', 'Content Marketing', 'Digital Marketing', 'Analytics', 'Tools'];
    const tags = ['seo', 'content', 'marketing', 'analytics', 'tools', 'tips', 'guide', 'tutorial'];

    return Array.from({ length: count }, (_, i) => ({
        id: `content-${i + 1}`,
        title: `Sample Content Title ${i + 1}`,
        slug: `sample-content-title-${i + 1}`,
        content: `This is the full content for item ${i + 1}. Lorem ipsum dolor sit amet, consectetur adipiscing elit...`,
        excerpt: `This is the excerpt for content item ${i + 1}...`,
        status: statuses[Math.floor(Math.random() * statuses.length)],
        type: types[Math.floor(Math.random() * types.length)],
        author: {
            id: 'author-1',
            name: 'John Doe',
            avatar: 'https://example.com/avatar.jpg',
        },
        categories: [categories[Math.floor(Math.random() * categories.length)]],
        tags: tags.slice(0, Math.floor(Math.random() * 4) + 1),
        seoData: {
            metaTitle: `SEO Title for Content ${i + 1}`,
            metaDescription: `SEO description for content ${i + 1}`,
            focusKeyword: `keyword ${i + 1}`,
            seoScore: Math.floor(Math.random() * 40) + 60, // 60-100
            readabilityScore: Math.floor(Math.random() * 30) + 70, // 70-100
        },
        publishedAt: Math.random() > 0.5 ? new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString() : undefined,
        createdAt: new Date(Date.now() - Math.random() * 60 * 24 * 60 * 60 * 1000).toISOString(),
        updatedAt: new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000).toISOString(),
        wordCount: Math.floor(Math.random() * 2000) + 500,
        readingTime: Math.floor((Math.floor(Math.random() * 2000) + 500) / 200), // ~200 words per minute
        featuredImage: Math.random() > 0.5 ? 'https://example.com/image.jpg' : undefined,
        projectId: `project-${Math.floor(Math.random() * 3) + 1}`,
    }));
};

// Async thunks
export const fetchContentItems = createAsyncThunk(
    'content/fetchItems',
    async (params: { projectId: string; filters?: ContentFilters; pagination?: { page: number; limit: number } }, { rejectWithValue }) => {
        try {
            // Mock API call
            await new Promise(resolve => setTimeout(resolve, 1000));

            const mockData = generateMockContent(50);
            let filteredData = mockData;

            // Filter by project first
            filteredData = filteredData.filter(item => item.projectId === params.projectId);

            // Apply other filters
            if (params.filters) {
                const { status, type, category, search, author } = params.filters;

                if (status && status !== 'all') {
                    filteredData = filteredData.filter(item => item.status === status);
                }

                if (type && type !== 'all') {
                    filteredData = filteredData.filter(item => item.type === type);
                }

                if (category) {
                    filteredData = filteredData.filter(item => item.categories.includes(category));
                }

                if (search) {
                    filteredData = filteredData.filter(item =>
                        item.title.toLowerCase().includes(search.toLowerCase()) ||
                        item.content.toLowerCase().includes(search.toLowerCase())
                    );
                }

                if (author) {
                    filteredData = filteredData.filter(item => item.author.id === author);
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
            return rejectWithValue(error.message || 'Failed to fetch content items');
        }
    }
);

export const fetchContentCategories = createAsyncThunk(
    'content/fetchCategories',
    async (_, { rejectWithValue }) => {
        try {
            // Mock API call
            await new Promise(resolve => setTimeout(resolve, 500));

            const mockCategories: ContentCategory[] = [
                { id: '1', name: 'SEO', slug: 'seo', description: 'Search Engine Optimization content', count: 15 },
                { id: '2', name: 'Content Marketing', slug: 'content-marketing', description: 'Content marketing strategies', count: 12 },
                { id: '3', name: 'Digital Marketing', slug: 'digital-marketing', description: 'Digital marketing tactics', count: 8 },
                { id: '4', name: 'Analytics', slug: 'analytics', description: 'Analytics and tracking', count: 6 },
                { id: '5', name: 'Tools', slug: 'tools', description: 'Marketing tools and software', count: 9 },
            ];

            return mockCategories;
        } catch (error: any) {
            return rejectWithValue(error.message || 'Failed to fetch categories');
        }
    }
);

export const createContentItem = createAsyncThunk(
    'content/createItem',
    async (data: CreateContentRequest, { rejectWithValue }) => {
        try {
            // Mock API call
            await new Promise(resolve => setTimeout(resolve, 1000));

            const newItem: ContentItem = {
                id: `content-${Date.now()}`,
                title: data.title,
                slug: data.title.toLowerCase().replace(/\s+/g, '-'),
                content: data.content,
                excerpt: data.excerpt || data.content.substring(0, 150) + '...',
                status: data.status || 'draft',
                type: data.type,
                author: {
                    id: 'current-user',
                    name: 'Current User',
                },
                categories: data.categories || [],
                tags: data.tags || [],
                seoData: {
                    ...data.seoData,
                    seoScore: Math.floor(Math.random() * 40) + 60,
                    readabilityScore: Math.floor(Math.random() * 30) + 70,
                },
                publishedAt: data.status === 'published' ? new Date().toISOString() : data.publishedAt,
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString(),
                wordCount: data.content.split(' ').length,
                readingTime: Math.ceil(data.content.split(' ').length / 200),
                featuredImage: data.featuredImage,
                projectId: data.projectId,
            };

            return newItem;
        } catch (error: any) {
            return rejectWithValue(error.message || 'Failed to create content item');
        }
    }
);

export const updateContentItem = createAsyncThunk(
    'content/updateItem',
    async ({ id, data }: { id: string; data: UpdateContentRequest }, { rejectWithValue }) => {
        try {
            // Mock API call
            await new Promise(resolve => setTimeout(resolve, 1000));

            // Return updated item (in real app, this would come from API)
            return { id, data };
        } catch (error: any) {
            return rejectWithValue(error.message || 'Failed to update content item');
        }
    }
);

export const deleteContentItem = createAsyncThunk(
    'content/deleteItem',
    async (id: string, { rejectWithValue }) => {
        try {
            // Mock API call
            await new Promise(resolve => setTimeout(resolve, 500));

            return id;
        } catch (error: any) {
            return rejectWithValue(error.message || 'Failed to delete content item');
        }
    }
);

// Slice
const contentSlice = createSlice({
    name: 'content',
    initialState,
    reducers: {
        setFilters: (state, action: PayloadAction<Partial<ContentFilters>>) => {
            state.filters = { ...state.filters, ...action.payload };
        },
        setPagination: (state, action: PayloadAction<Partial<ContentState['pagination']>>) => {
            state.pagination = { ...state.pagination, ...action.payload };
        },
        setCurrentItem: (state, action: PayloadAction<ContentItem | null>) => {
            state.currentItem = action.payload;
        },
        clearError: (state) => {
            state.error = null;
        },
        resetContentState: (state) => {
            return initialState;
        },
    },
    extraReducers: (builder) => {
        // Fetch content items
        builder
            .addCase(fetchContentItems.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchContentItems.fulfilled, (state, action) => {
                state.loading = false;
                state.items = action.payload.data;
                state.pagination = {
                    total: action.payload.total,
                    page: action.payload.page,
                    limit: action.payload.limit,
                    totalPages: action.payload.totalPages,
                };

                // Update stats
                const items = action.payload.data;
                state.stats = {
                    totalItems: action.payload.total,
                    published: items.filter(item => item.status === 'published').length,
                    draft: items.filter(item => item.status === 'draft').length,
                    scheduled: items.filter(item => item.status === 'scheduled').length,
                    avgSeoScore: items.reduce((sum, item) => sum + (item.seoData.seoScore || 0), 0) / items.length || 0,
                    avgReadabilityScore: items.reduce((sum, item) => sum + (item.seoData.readabilityScore || 0), 0) / items.length || 0,
                };
            })
            .addCase(fetchContentItems.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });

        // Fetch categories
        builder
            .addCase(fetchContentCategories.fulfilled, (state, action) => {
                state.categories = action.payload;
            });

        // Create content item
        builder
            .addCase(createContentItem.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(createContentItem.fulfilled, (state, action) => {
                state.loading = false;
                state.items.unshift(action.payload);
                state.pagination.total += 1;
            })
            .addCase(createContentItem.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });

        // Update content item
        builder
            .addCase(updateContentItem.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateContentItem.fulfilled, (state, action) => {
                state.loading = false;
                const index = state.items.findIndex(item => item.id === action.payload.id);
                if (index !== -1) {
                    state.items[index] = { ...state.items[index], ...action.payload.data, updatedAt: new Date().toISOString() };
                }
            })
            .addCase(updateContentItem.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });

        // Delete content item
        builder
            .addCase(deleteContentItem.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(deleteContentItem.fulfilled, (state, action) => {
                state.loading = false;
                state.items = state.items.filter(item => item.id !== action.payload);
                state.pagination.total -= 1;
            })
            .addCase(deleteContentItem.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
    },
});

export const {
    setFilters,
    setPagination,
    setCurrentItem,
    clearError,
    resetContentState,
} = contentSlice.actions;

export default contentSlice.reducer;
