import { useSelector, useDispatch } from 'react-redux';
import { AppDispatch } from '../store';
import {
    selectAuthState,
    selectUser,
    selectAccessToken,
    selectIsAuthenticated,
    selectIsLoading,
    selectAuthError,
    selectUserEmail,
    selectUserName,
    selectUserRole,
    selectUserSubscription,
    selectIsUserVerified
} from '../selectors/auth.selectors';
import {
    registerAccount,
    loginAccount,
    logoutAccount,
    checkAuthToken,
    clearError,
    updateUserProfile
} from '../slices/auth.slice';
import { LoginRequest, RegisterRequest } from '@/types/api.type';

export const useAuth = () => {
    const dispatch = useDispatch<AppDispatch>();

    // Selectors
    const authState = useSelector(selectAuthState);
    const user = useSelector(selectUser);
    const accessToken = useSelector(selectAccessToken);
    const isAuthenticated = useSelector(selectIsAuthenticated);
    const isLoading = useSelector(selectIsLoading);
    const error = useSelector(selectAuthError);
    const userEmail = useSelector(selectUserEmail);
    const userName = useSelector(selectUserName);
    const userRole = useSelector(selectUserRole);
    const userSubscription = useSelector(selectUserSubscription);
    const isUserVerified = useSelector(selectIsUserVerified);

    // Actions
    const register = (data: RegisterRequest) => {
        return dispatch(registerAccount(data));
    };

    const login = (data: LoginRequest) => {
        return dispatch(loginAccount(data));
    };

    const logout = () => {
        return dispatch(logoutAccount());
    };

    const checkAuth = () => {
        return dispatch(checkAuthToken());
    };

    const clearAuthError = () => {
        dispatch(clearError());
    };

    const updateProfile = (data: Partial<typeof user>) => {
        dispatch(updateUserProfile(data));
    };

    return {
        // State
        authState,
        user,
        accessToken,
        isAuthenticated,
        isLoading,
        error,
        userEmail,
        userName,
        userRole,
        userSubscription,
        isUserVerified,

        // Actions
        register,
        login,
        logout,
        checkAuth,
        clearAuthError,
        updateProfile,
    };
};
