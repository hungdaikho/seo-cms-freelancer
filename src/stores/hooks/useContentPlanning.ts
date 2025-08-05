import { useSelector, useDispatch } from 'react-redux';
import { useCallback, useEffect } from 'react';
import { message } from 'antd';
import type { RootState, AppDispatch } from '@/stores/store';
import {
    fetchCalendarItems,
    createCalendarItem,
    updateCalendarItem,
    deleteCalendarItem,
    bulkUpdateCalendarItems,
    generateContentIdeas,
    generateTopicIdeas,
    getTopicQuestions,
    fetchContentPerformance,
    fetchCategories,
    setCalendarFilters,
    clearError
} from '@/stores/slices/content-planning.slice';
import {
    CreateCalendarItemRequest,
    UpdateCalendarItemRequest,
    BulkUpdateRequest,
    ContentIdeaRequest,
    TopicResearchRequest,
    CalendarFilters,
    ContentPerformanceFilters
} from '@/types/content-planning.type';

interface UseContentPlanningProps {
    projectId: string;
}

export const useContentPlanning = ({ projectId }: UseContentPlanningProps) => {
    const dispatch = useDispatch<AppDispatch>();

    const contentPlanningState = useSelector((state: RootState) => state.contentPlanning);

    // Error handling
    useEffect(() => {
        if (contentPlanningState.error) {
            message.error(contentPlanningState.error);
            dispatch(clearError());
        }
    }, [contentPlanningState.error, dispatch]);

    // Calendar operations
    const loadCalendarItems = useCallback((filters?: CalendarFilters) => {
        return dispatch(fetchCalendarItems({ projectId, filters }));
    }, [dispatch, projectId]);

    const createNewCalendarItem = useCallback((data: CreateCalendarItemRequest) => {
        return dispatch(createCalendarItem({ projectId, data }));
    }, [dispatch, projectId]);

    const updateExistingCalendarItem = useCallback((itemId: string, data: UpdateCalendarItemRequest) => {
        return dispatch(updateCalendarItem({ projectId, itemId, data }));
    }, [dispatch, projectId]);

    const removeCalendarItem = useCallback((itemId: string) => {
        return dispatch(deleteCalendarItem({ projectId, itemId }));
    }, [dispatch, projectId]);

    const bulkUpdateItems = useCallback((data: BulkUpdateRequest) => {
        return dispatch(bulkUpdateCalendarItems({ projectId, data }));
    }, [dispatch, projectId]);

    // Content ideas operations
    const generateIdeas = useCallback((data: ContentIdeaRequest) => {
        return dispatch(generateContentIdeas(data));
    }, [dispatch]);

    // Topic research operations
    const generateTopics = useCallback((data: TopicResearchRequest) => {
        return dispatch(generateTopicIdeas(data));
    }, [dispatch]);

    const getQuestions = useCallback((topic: string) => {
        return dispatch(getTopicQuestions(topic));
    }, [dispatch]);

    // Performance operations
    const loadPerformance = useCallback((filters?: ContentPerformanceFilters) => {
        return dispatch(fetchContentPerformance({ projectId, filters }));
    }, [dispatch, projectId]);

    // Categories operations
    const loadCategories = useCallback(() => {
        return dispatch(fetchCategories(projectId));
    }, [dispatch, projectId]);

    // Filter operations
    const updateFilters = useCallback((filters: CalendarFilters) => {
        dispatch(setCalendarFilters(filters));
        return loadCalendarItems(filters);
    }, [dispatch, loadCalendarItems]);

    // Initialize data
    const initializeData = useCallback(() => {
        loadCalendarItems();
        loadCategories();
        loadPerformance();
    }, [loadCalendarItems, loadCategories, loadPerformance]);

    return {
        // State
        ...contentPlanningState,

        // Actions
        loadCalendarItems,
        createNewCalendarItem,
        updateExistingCalendarItem,
        removeCalendarItem,
        bulkUpdateItems,
        generateIdeas,
        generateTopics,
        getQuestions,
        loadPerformance,
        loadCategories,
        updateFilters,
        initializeData,
    };
};

export default useContentPlanning;
