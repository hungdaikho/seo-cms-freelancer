import { configureStore } from "@reduxjs/toolkit";
import apiEventMiddleware from "./middleware/apiEventMiddleware";
import authSlice from "./slices/auth.slice";
import modalSlice from "./slices/modal.slice";
import projectsSlice from "./slices/projects.slice";
import rankTrackingSlice from "./slices/rank-tracking.slice";
import competitiveSlice from "./slices/competitive.slice";
import keywordResearchSlice from "./slices/keyword-research.slice";
import contentIdeasSlice from "./slices/content-ideas.slice";
import backlinkResearchSlice from "./slices/backlik-research.slice";
import auditSlice from "./slices/audit.slice";
import adminDashboardSlice from "./slices/admin-dashboard.slice";
import cmsSlice from "./slices/cms.slice";

const store = configureStore({
  reducer: {
    auth: authSlice,
    modal: modalSlice,
    projects: projectsSlice,
    rankTracking: rankTrackingSlice,
    competitive: competitiveSlice,
    keywordResearch: keywordResearchSlice,
    contentIdeas: contentIdeasSlice,
    backlinkResearch: backlinkResearchSlice,
    audit: auditSlice,
    adminDashboard: adminDashboardSlice,
    cms: cmsSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiEventMiddleware),
  // middleware mặc định đã hỗ trợ thunk, có thể custom thêm nếu cần
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
