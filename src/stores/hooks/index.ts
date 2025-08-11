import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from '../store';

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

// Export custom hooks
export { useDomain } from './useDomain';
export { useDomainOverview } from './useDomainOverview';
export { usePositionTracking, usePositionTrackingOverview, useKeywordRanking } from './usePositionTracking';
export {
    useOrganicResearch,
    useDomainAnalysis,
    useOrganicKeywords,
    useCompetitors,
    useTopPages,
    useApiLimits
} from './useOrganicResearch';
export { useGlobalSearch } from './useGlobalSearch';
export { useUserManager } from './useUserManager';
export { useKeywordGap } from './useKeywordGap';
export { useBacklink } from './useBacklink';
export { useTopicResearch } from './useTopicResearch';
