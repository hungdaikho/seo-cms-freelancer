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
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiEventMiddleware),
  // middleware mặc định đã hỗ trợ thunk, có thể custom thêm nếu cần
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store; 