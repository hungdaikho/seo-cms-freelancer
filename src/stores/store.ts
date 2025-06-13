import { configureStore } from '@reduxjs/toolkit';
import userReducer from './slices/userSlice';
import apiStatusMiddleware from './middleware/apiStatusMiddleware';

export const store = configureStore({
  reducer: {
    user: userReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiStatusMiddleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
