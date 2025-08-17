import { configureStore } from "@reduxjs/toolkit";
import apiEventMiddleware from "./middleware/apiEventMiddleware";
import authSlice from "./slices/auth.slice";
import modalSlice from "./slices/modal.slice";
import projectsSlice from "./slices/projects.slice";
import rankTrackingSlice from "./slices/rank-tracking.slice";
import competitiveSlice from "./slices/competitive.slice";

const store = configureStore({
  reducer: {
    auth: authSlice,
    modal: modalSlice,
    projects: projectsSlice,
    rankTracking: rankTrackingSlice,
    competitive: competitiveSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiEventMiddleware),
  // middleware mặc định đã hỗ trợ thunk, có thể custom thêm nếu cần
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
