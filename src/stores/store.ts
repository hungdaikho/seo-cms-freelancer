import { configureStore } from '@reduxjs/toolkit';
import apiEventMiddleware from './middleware/apiEventMiddleware';
import authSlice from './slices/auth.slice';
import modalSlice from './slices/modal.slice';
const store = configureStore({
  reducer: {
    auth: authSlice,
    modal: modalSlice
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiEventMiddleware),
  // middleware mặc định đã hỗ trợ thunk, có thể custom thêm nếu cần
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store; 