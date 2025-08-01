import { useState, useCallback } from 'react';
import { seoService } from '@/services/seo.service';
import { message } from 'antd';

interface KeywordMagicOptions {
    country?: string;
    searchEngine?: string;
    limit?: number;
}

export const useKeywordMagic = () => {
    const [suggestions, setSuggestions] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const searchKeywords = useCallback(async (
        query: string,
        options: KeywordMagicOptions = {}
    ) => {
        if (!query.trim()) {
            message.warning('Please enter a keyword');
            return;
        }

        setLoading(true);
        setError(null);

        try {
            // Try AI keyword suggestions first
            const aiSuggestions = await seoService.aiKeywordSuggestions({
                seedKeyword: query,
                location: options.country || 'US'
            });

            setSuggestions(aiSuggestions || []);

            return aiSuggestions;
        } catch (err: any) {
            const errorMessage = err.message || 'Failed to get keyword suggestions';
            setError(errorMessage);
            message.error(errorMessage);
            return [];
        } finally {
            setLoading(false);
        }
    }, []);

    const researchKeywords = useCallback(async (
        data: any
    ) => {
        setLoading(true);
        setError(null);

        try {
            const results = await seoService.researchKeywords(data);
            return results;
        } catch (err: any) {
            const errorMessage = err.message || 'Failed to research keywords';
            setError(errorMessage);
            message.error(errorMessage);
            return [];
        } finally {
            setLoading(false);
        }
    }, []);

    const getRelatedTopics = useCallback(async (
        topic: string,
        params?: any
    ) => {
        setLoading(true);
        setError(null);

        try {
            const topics = await seoService.getRelatedTopics(topic, params);
            return topics;
        } catch (err: any) {
            const errorMessage = err.message || 'Failed to get related topics';
            setError(errorMessage);
            message.error(errorMessage);
            return [];
        } finally {
            setLoading(false);
        }
    }, []);

    const getTopicQuestions = useCallback(async (
        topic: string,
        params?: any
    ) => {
        setLoading(true);
        setError(null);

        try {
            const questions = await seoService.getTopicQuestions(topic, params);
            return questions;
        } catch (err: any) {
            const errorMessage = err.message || 'Failed to get topic questions';
            setError(errorMessage);
            message.error(errorMessage);
            return [];
        } finally {
            setLoading(false);
        }
    }, []);

    const clearSuggestions = useCallback(() => {
        setSuggestions([]);
        setError(null);
    }, []);

    const clearError = useCallback(() => {
        setError(null);
    }, []);

    return {
        suggestions,
        loading,
        error,
        searchKeywords,
        researchKeywords,
        getRelatedTopics,
        getTopicQuestions,
        clearSuggestions,
        clearError,
    };
};
