import { Middleware, AnyAction } from '@reduxjs/toolkit';

// Middleware để log trạng thái API (pending, fulfilled, rejected)
const apiStatusMiddleware: Middleware = (store) => (next) => (action) => {
  const act = action as AnyAction;
  if (act.type.endsWith('/pending')) {
    console.log('API Loading:', act.type);
  }
  if (act.type.endsWith('/fulfilled')) {
    console.log('API Success:', act.type);
  }
  if (act.type.endsWith('/rejected')) {
    console.log('API Error:', act.type, act.error);
  }
  return next(action);
};

export default apiStatusMiddleware; 