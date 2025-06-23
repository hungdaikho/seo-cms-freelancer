import { Middleware, AnyAction } from '@reduxjs/toolkit';

// Middleware để log các sự kiện của createAsyncThunk
const apiEventMiddleware: Middleware = store => next => action => {
  const typedAction = action as AnyAction;
  // Kiểm tra action có phải là action của createAsyncThunk không
  if (typedAction.type.endsWith('/pending')) {
    console.log('API call started:', typedAction.type, typedAction.meta?.arg);
  }
  if (typedAction.type.endsWith('/fulfilled')) {
    console.log('API call success:', typedAction.type, typedAction.payload);
  }
  if (typedAction.type.endsWith('/rejected')) {
    console.log('API call failed:', typedAction.type, typedAction.error);
  }
  return next(action);
};

export default apiEventMiddleware; 