import { RootState } from '../store';

// Auth Selectors
export const selectAuthState = (state: RootState) => state.auth;

export const selectUser = (state: RootState) => state.auth.user;

export const selectAccessToken = (state: RootState) => state.auth.accessToken;

export const selectIsAuthenticated = (state: RootState) => state.auth.isAuthenticated;

export const selectIsLoading = (state: RootState) => state.auth.isLoading;

export const selectAuthError = (state: RootState) => state.auth.error;

export const selectUserEmail = (state: RootState) => state.auth.user?.email;

export const selectUserName = (state: RootState) => state.auth.user?.name;

export const selectUserRole = (state: RootState) => state.auth.user?.role;

export const selectUserSubscription = (state: RootState) => state.auth.user?.subscription;

export const selectIsUserVerified = (state: RootState) => state.auth.user?.emailVerified;
