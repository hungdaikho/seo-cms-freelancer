import { useDispatch, useSelector } from 'react-redux';
import { useCallback, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { AppDispatch, RootState } from '../store';
import {
    performGlobalSearch,
    setQuery,
    setIsOpen,
    loadRecentSearches,
    addRecentSearch,
    clearResults,
    clearError,
    SearchResult
} from '../slices/global-search.slice';
// Simple debounce implementation
const debounce = (func: Function, wait: number) => {
    let timeout: NodeJS.Timeout;
    const debouncedFn = function executedFunction(...args: any[]) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };

    debouncedFn.cancel = () => {
        clearTimeout(timeout);
    };

    return debouncedFn;
};

export const useGlobalSearch = () => {
    const dispatch = useDispatch<AppDispatch>();
    const router = useRouter();

    const {
        query,
        results,
        recentSearches,
        loading,
        error,
        isOpen,
    } = useSelector((state: RootState) => state.globalSearch);

    // Debounced search function
    const debouncedSearch = useCallback(
        debounce((searchQuery: string) => {
            if (searchQuery.trim()) {
                dispatch(performGlobalSearch(searchQuery));
            } else {
                dispatch(clearResults());
            }
        }, 300),
        [dispatch]
    );

    // Search function
    const search = useCallback((searchQuery: string) => {
        dispatch(setQuery(searchQuery));
        debouncedSearch(searchQuery);
    }, [dispatch, debouncedSearch]);

    // Open/close search
    const openSearch = useCallback(() => {
        dispatch(setIsOpen(true));
    }, [dispatch]);

    const closeSearch = useCallback(() => {
        dispatch(setIsOpen(false));
        dispatch(clearResults());
        dispatch(setQuery(''));
    }, [dispatch]);

    // Handle result selection
    const selectResult = useCallback((result: SearchResult) => {
        // Add to recent searches
        dispatch(addRecentSearch(query));

        // Navigate to result
        if (result.url) {
            router.push(result.url);
        }

        // Close search
        closeSearch();
    }, [dispatch, query, router, closeSearch]);

    // Handle recent search selection
    const selectRecentSearch = useCallback((searchQuery: string) => {
        search(searchQuery);
    }, [search]);

    // Clear error
    const handleClearError = useCallback(() => {
        dispatch(clearError());
    }, [dispatch]);

    // Effect to clean up debounced function
    useEffect(() => {
        return () => {
            debouncedSearch.cancel();
        };
    }, [debouncedSearch]);

    // Load recent searches on mount (client-side only)
    useEffect(() => {
        dispatch(loadRecentSearches());
    }, [dispatch]);

    return {
        // State
        query,
        results,
        recentSearches,
        loading,
        error,
        isOpen,

        // Actions
        search,
        openSearch,
        closeSearch,
        selectResult,
        selectRecentSearch,
        clearError: handleClearError,
    };
};
