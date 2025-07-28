import { useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from '../store';
import {
    fetchCompetitorRankings,
    fetchTechnicalAudit,
    fetchAIRecommendations,
} from '../slices/copilot_ai.slice';
import { useCallback } from 'react';

export const useCopilotAI = () => {
    const dispatch = useDispatch<AppDispatch>();
    const {
        competitorRankings,
        technicalAudit,
        aiRecommendations,
        loading,
        error,
    } = useSelector((state: RootState) => state.copilotAI);

    const getCompetitorRankings = useCallback(
        (projectId: string) =>
            dispatch(fetchCompetitorRankings({ projectId })),
        [dispatch]
    );

    const getTechnicalAudit = useCallback(
        (projectId: string) =>
            dispatch(fetchTechnicalAudit({ projectId })),
        [dispatch]
    );

    const getAIRecommendations = useCallback(
        (projectId: string) =>
            dispatch(fetchAIRecommendations({ projectId })),
        [dispatch]
    );

    return {
        competitorRankings,
        technicalAudit,
        aiRecommendations,
        loading,
        error,
        getCompetitorRankings,
        getTechnicalAudit,
        getAIRecommendations,
    };
};