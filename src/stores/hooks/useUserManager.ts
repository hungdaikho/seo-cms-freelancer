import { useAppDispatch, useAppSelector } from './index';
import {
    getUserProfile,
    updateProfile,
    getUsage,
    changePassword,
    getSessions,
    revokeSession,
    revokeAllOtherSessions,
    exportUserData,
    deactivateAccount,
    deleteAccount,
    clearError,
    clearExportData
} from '@/stores/slices/userManagerSlice';
import {
    UpdateProfileRequest,
    ChangePasswordRequest,
    ExportDataRequest,
    DeactivateAccountRequest,
    DeleteAccountRequest
} from '@/types/user-manager.type';

export const useUserManager = () => {
    const dispatch = useAppDispatch();
    const {
        profile,
        usage,
        sessions,
        exportData,
        loading,
        error
    } = useAppSelector(state => state.userManager);

    const actions = {
        // Profile actions
        getUserProfile: () => dispatch(getUserProfile()),
        updateProfile: (data: UpdateProfileRequest) => dispatch(updateProfile(data)),

        // Usage actions
        getUsage: () => dispatch(getUsage()),

        // Password actions
        changePassword: (data: ChangePasswordRequest) => dispatch(changePassword(data)),

        // Session actions
        getSessions: () => dispatch(getSessions()),
        revokeSession: (sessionId: string) => dispatch(revokeSession(sessionId)),
        revokeAllOtherSessions: () => dispatch(revokeAllOtherSessions()),

        // Data export actions
        exportUserData: (data: ExportDataRequest) => dispatch(exportUserData(data)),
        clearExportData: () => dispatch(clearExportData()),

        // Account actions
        deactivateAccount: (data: DeactivateAccountRequest) => dispatch(deactivateAccount(data)),
        deleteAccount: (data: DeleteAccountRequest) => dispatch(deleteAccount(data)),

        // Utility actions
        clearError: () => dispatch(clearError()),
    };

    return {
        // State
        profile,
        usage,
        sessions,
        exportData,
        loading,
        error,

        // Actions
        ...actions
    };
};
