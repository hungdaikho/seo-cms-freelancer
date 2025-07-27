import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../store';
import {
    addKeywordToProject,
    bulkAddKeywords,
    fetchProjectKeywords,
    updateKeyword,
    deleteKeyword,
    fetchKeywordRankingHistory,
    clearError,
    setCurrentKeyword,
    clearCurrentKeyword,
    clearKeywords,
} from '../slices/keyword.slice';
import {
    CreateKeywordRequest,
    BulkCreateKeywordsRequest,
    UpdateKeywordRequest,
    KeywordQueryParams,
    RankingHistoryParams
} from '@/types/api.type';

export const useKeyword = () => {
    const dispatch = useDispatch<AppDispatch>();
    const keywordState = useSelector((state: RootState) => state.keyword);

    const actions = {
        // Keyword CRUD operations
        addKeywordToProject: (projectId: string, data: CreateKeywordRequest) =>
            dispatch(addKeywordToProject({ projectId, data })),
        bulkAddKeywords: (projectId: string, data: BulkCreateKeywordsRequest) =>
            dispatch(bulkAddKeywords({ projectId, data })),
        fetchProjectKeywords: (projectId: string, params?: KeywordQueryParams) =>
            dispatch(fetchProjectKeywords({ projectId, params })),
        updateKeyword: (keywordId: string, data: UpdateKeywordRequest) =>
            dispatch(updateKeyword({ keywordId, data })),
        deleteKeyword: (keywordId: string) => dispatch(deleteKeyword(keywordId)),

        // Ranking history
        fetchKeywordRankingHistory: (keywordId: string, params?: RankingHistoryParams) =>
            dispatch(fetchKeywordRankingHistory({ keywordId, params })),

        // State management
        clearError: () => dispatch(clearError()),
        setCurrentKeyword: (keyword: any) => dispatch(setCurrentKeyword(keyword)),
        clearCurrentKeyword: () => dispatch(clearCurrentKeyword()),
        clearKeywords: () => dispatch(clearKeywords()),
    };

    return {
        ...keywordState,
        ...actions,
    };
};
