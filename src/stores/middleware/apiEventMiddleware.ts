import { Middleware, AnyAction } from '@reduxjs/toolkit';

// Middleware để log các sự kiện của createAsyncThunk
const apiEventMiddleware: Middleware = store => next => action => {
  const typedAction = action as AnyAction;
  // Kiểm tra action có phải là action của createAsyncThunk không
  if (typedAction.type.endsWith('/pending')) {
  }
  if (typedAction.type.endsWith('/fulfilled')) {
  }
  if (typedAction.type.endsWith('/rejected')) {
  }
  return next(action);
};

export default apiEventMiddleware; 