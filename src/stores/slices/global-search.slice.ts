import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { seoService } from '@/services/seo.service';

// Types
export interface SearchResult {
    id: string;
    type: 'keyword' | 'domain' | 'project' | 'task';
    title: string;
    description?: string;
    url?: string;
    metadata?: any;
}

export interface GlobalSearchState {
    query: string;
    results: SearchResult[];
    recentSearches: string[];
    loading: boolean;
    error: string | null;
    isOpen: boolean;
}

const initialState: GlobalSearchState = {
    query: '',
    results: [],
    recentSearches: [],
    loading: false,
    error: null,
    isOpen: false,
};

// Async thunks
export const performGlobalSearch = createAsyncThunk(
    'globalSearch/performSearch',
    async (query: string, { rejectWithValue }) => {
        try {
            if (!query.trim()) {
                return [];
            }

            const results: SearchResult[] = [];

            // Search keywords
            try {
                const keywordSuggestions = await seoService.aiKeywordSuggestions({
                    seedKeyword: query,
                    location: 'US'
                });

                if (keywordSuggestions) {
                    const keywordResults = keywordSuggestions.slice(0, 3).map((suggestion: any) => ({
                        id: `keyword-${suggestion.keyword || suggestion.text}`,
                        type: 'keyword' as const,
                        title: suggestion.keyword || suggestion.text,
                        description: `Search Volume: ${suggestion.volume || 'N/A'}`,
                        url: `/seo/keyword-magic-tool?keyword=${encodeURIComponent(suggestion.keyword || suggestion.text)}`,
                        metadata: suggestion
                    }));
                    results.push(...keywordResults);
                }
            } catch (error) {
                console.warn('Keyword search failed:', error);
            }

            // Search domains (if query looks like a domain)
            if (query.includes('.') && !query.includes(' ')) {
                results.push({
                    id: `domain-${query}`,
                    type: 'domain',
                    title: query,
                    description: 'Analyze domain performance',
                    url: `/seo/domain-overview?domain=${encodeURIComponent(query)}`,
                    metadata: { domain: query }
                });
            }

            // Add quick actions
            const quickActions = [
                {
                    id: `action-keyword-research-${query}`,
                    type: 'task' as const,
                    title: `Research keywords for "${query}"`,
                    description: 'Open Keyword Magic Tool',
                    url: `/seo/keyword-magic-tool?keyword=${encodeURIComponent(query)}`,
                },
                {
                    id: `action-topic-research-${query}`,
                    type: 'task' as const,
                    title: `Find topics about "${query}"`,
                    description: 'Open Topic Research',
                    url: `/seo/topic-research?topic=${encodeURIComponent(query)}`,
                }
            ];

            results.push(...quickActions);

            return results;
        } catch (error: any) {
            return rejectWithValue(error.message || 'Search failed');
        }
    }
);

// Slice
const globalSearchSlice = createSlice({
    name: 'globalSearch',
    initialState,
    reducers: {
        setQuery: (state, action: PayloadAction<string>) => {
            state.query = action.payload;
        },
        setIsOpen: (state, action: PayloadAction<boolean>) => {
            state.isOpen = action.payload;
        },
        loadRecentSearches: (state) => {
            if (typeof window !== 'undefined' && window.localStorage) {
                try {
                    const stored = localStorage.getItem('recentSearches');
                    if (stored) {
                        state.recentSearches = JSON.parse(stored).slice(0, 5);
                    }
                } catch (error) {
                    console.warn('Failed to load recent searches:', error);
                    state.recentSearches = [];
                }
            }
        },
        addRecentSearch: (state, action: PayloadAction<string>) => {
            const query = action.payload.trim();
            if (query && !state.recentSearches.includes(query)) {
                state.recentSearches.unshift(query);
                state.recentSearches = state.recentSearches.slice(0, 5);

                // Only save to localStorage if available (client-side)
                if (typeof window !== 'undefined' && window.localStorage) {
                    try {
                        localStorage.setItem('recentSearches', JSON.stringify(state.recentSearches));
                    } catch (error) {
                        console.warn('Failed to save recent searches:', error);
                    }
                }
            }
        },
        clearResults: (state) => {
            state.results = [];
            state.query = '';
        },
        clearError: (state) => {
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(performGlobalSearch.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(performGlobalSearch.fulfilled, (state, action) => {
                state.loading = false;
                state.results = action.payload;
            })
            .addCase(performGlobalSearch.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
    },
});

export const {
    setQuery,
    setIsOpen,
    loadRecentSearches,
    addRecentSearch,
    clearResults,
    clearError,
} = globalSearchSlice.actions;

export default globalSearchSlice.reducer;
