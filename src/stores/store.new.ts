import { configureStore } from '@reduxjs/toolkit';
import apiEventMiddleware from './middleware/apiEventMiddleware';
import authSlice from './slices/auth.slice';
import modalSlice from './slices/modal.slice';
import projectSlice from './slices/project.slice';
import keywordSlice from './slices/keyword.slice';
import auditSlice from './slices/audit.slice';
import seoSlice from './slices/seo.slice';
import trafficSlice from './slices/traffic.slice';
import contentSlice from './slices/content.slice';
import aiSlice from './slices/ai.slice';
import copilotAISlice from './slices/copilot_ai.slice';
import domainSlice from './slices/domain.slice';
import positionTrackingSlice from './slices/position-tracking.slice';
import organicResearchSlice from './slices/organic-research.slice';
import globalSearchSlice from './slices/global-search.slice';
import backlinkSlice from './slices/backlink.slice';
import keywordGapSlice from './slices/keyword-gap.slice';
import topicResearchSlice from './slices/topic-research.slice';

const store = configureStore({
    reducer: {
        auth: authSlice,
        modal: modalSlice,
        project: projectSlice,
        keyword: keywordSlice,
        audit: auditSlice,
        seo: seoSlice,
        traffic: trafficSlice,
        content: contentSlice,
        ai: aiSlice,
        copilotAI: copilotAISlice,
        domain: domainSlice,
        positionTracking: positionTrackingSlice,
        organicResearch: organicResearchSlice,
        globalSearch: globalSearchSlice,
        backlink: backlinkSlice,
        keywordGap: keywordGapSlice,
        topicResearch: topicResearchSlice,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiEventMiddleware),
    // middleware mặc định đã hỗ trợ thunk, có thể custom thêm nếu cần
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
