import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { userManagerService } from '@/services/user-manager.service';
import {
    User,
    UpdateProfileRequest,
    ChangePasswordRequest,
    SessionInfo,
    ExportDataRequest,
    ExportDataResponse,
    DeactivateAccountRequest,
    DeleteAccountRequest,
    SubscriptionUsage
} from '@/types/user-manager.type';

interface UserManagerState {
    profile: User | null;
    usage: {
        subscription: {
            planType: string;
            status: string;
            usage: SubscriptionUsage;
            resetDate: string;
        };
    } | null;
    sessions: SessionInfo[];
    exportData: ExportDataResponse | null;
    loading: {
        profile: boolean;
        usage: boolean;
        sessions: boolean;
        changePassword: boolean;
        exportData: boolean;
        deactivate: boolean;
        delete: boolean;
    };
    error: string | null;
}

const initialState: UserManagerState = {
    profile: null,
    usage: null,
    sessions: [],
    exportData: null,
    loading: {
        profile: false,
        usage: false,
        sessions: false,
        changePassword: false,
        exportData: false,
        deactivate: false,
        delete: false,
    },
    error: null,
};

// Async Thunks
export const getUserProfile = createAsyncThunk(
    'userManager/getUserProfile',
    async (_, { rejectWithValue }) => {
        try {
            const response = await userManagerService.getUserProfile();
            return response;
        } catch (error: any) {
            return rejectWithValue(error.message || 'Failed to get user profile');
        }
    }
);

export const updateProfile = createAsyncThunk(
    'userManager/updateProfile',
    async (data: UpdateProfileRequest, { rejectWithValue }) => {
        try {
            const response = await userManagerService.updateProfile(data);
            return response;
        } catch (error: any) {
            return rejectWithValue(error.message || 'Failed to update profile');
        }
    }
);

export const getUsage = createAsyncThunk(
    'userManager/getUsage',
    async (_, { rejectWithValue }) => {
        try {
            const response = await userManagerService.getUsage();
            return response;
        } catch (error: any) {
            console.warn('Failed to get usage data:', error);
            // Return null on error so UI can handle gracefully
            return null;
        }
    }
);

export const changePassword = createAsyncThunk(
    'userManager/changePassword',
    async (data: ChangePasswordRequest, { rejectWithValue }) => {
        try {
            await userManagerService.changePassword(data);
            return 'Password changed successfully';
        } catch (error: any) {
            return rejectWithValue(error.message || 'Failed to change password');
        }
    }
);

export const getSessions = createAsyncThunk(
    'userManager/getSessions',
    async (_, { rejectWithValue }) => {
        try {
            const response = await userManagerService.getSessions();
            // Ensure response is always an array
            return Array.isArray(response) ? response : [];
        } catch (error: any) {
            console.warn('Failed to get sessions:', error);
            // Return empty array on error instead of rejecting
            return [];
        }
    }
);

export const revokeSession = createAsyncThunk(
    'userManager/revokeSession',
    async (sessionId: string, { rejectWithValue, dispatch }) => {
        try {
            await userManagerService.revokeSession(sessionId);
            // Refresh sessions list
            dispatch(getSessions());
            return sessionId;
        } catch (error: any) {
            return rejectWithValue(error.message || 'Failed to revoke session');
        }
    }
);

export const revokeAllOtherSessions = createAsyncThunk(
    'userManager/revokeAllOtherSessions',
    async (_, { rejectWithValue, dispatch }) => {
        try {
            const response = await userManagerService.revokeAllOtherSessions();
            // Refresh sessions list
            dispatch(getSessions());
            return response.revokedSessions || 0;
        } catch (error: any) {
            return rejectWithValue(error.message || 'Failed to revoke sessions');
        }
    }
);

export const exportUserData = createAsyncThunk(
    'userManager/exportUserData',
    async (data: ExportDataRequest, { rejectWithValue }) => {
        try {
            const response = await userManagerService.exportData(data);
            return response;
        } catch (error: any) {
            return rejectWithValue(error.message || 'Failed to export data');
        }
    }
);

export const deactivateAccount = createAsyncThunk(
    'userManager/deactivateAccount',
    async (data: DeactivateAccountRequest, { rejectWithValue }) => {
        try {
            const response = await userManagerService.deactivateAccount(data);
            return response;
        } catch (error: any) {
            return rejectWithValue(error.message || 'Failed to deactivate account');
        }
    }
);

export const deleteAccount = createAsyncThunk(
    'userManager/deleteAccount',
    async (data: DeleteAccountRequest, { rejectWithValue }) => {
        try {
            const response = await userManagerService.deleteAccount(data);
            return response;
        } catch (error: any) {
            return rejectWithValue(error.message || 'Failed to delete account');
        }
    }
);

const userManagerSlice = createSlice({
    name: 'userManager',
    initialState,
    reducers: {
        clearError: (state) => {
            state.error = null;
        },
        clearExportData: (state) => {
            state.exportData = null;
        },
    },
    extraReducers: (builder) => {
        // Get User Profile
        builder
            .addCase(getUserProfile.pending, (state) => {
                state.loading.profile = true;
                state.error = null;
            })
            .addCase(getUserProfile.fulfilled, (state, action) => {
                state.loading.profile = false;
                state.profile = action.payload;
            })
            .addCase(getUserProfile.rejected, (state, action) => {
                state.loading.profile = false;
                state.error = action.payload as string;
            });

        // Update Profile
        builder
            .addCase(updateProfile.pending, (state) => {
                state.loading.profile = true;
                state.error = null;
            })
            .addCase(updateProfile.fulfilled, (state, action) => {
                state.loading.profile = false;
                state.profile = action.payload;
            })
            .addCase(updateProfile.rejected, (state, action) => {
                state.loading.profile = false;
                state.error = action.payload as string;
            });

        // Get Usage
        builder
            .addCase(getUsage.pending, (state) => {
                state.loading.usage = true;
                state.error = null;
            })
            .addCase(getUsage.fulfilled, (state, action) => {
                state.loading.usage = false;
                state.usage = action.payload;
            })
            .addCase(getUsage.rejected, (state, action) => {
                state.loading.usage = false;
                state.error = action.payload as string;
            });

        // Change Password
        builder
            .addCase(changePassword.pending, (state) => {
                state.loading.changePassword = true;
                state.error = null;
            })
            .addCase(changePassword.fulfilled, (state) => {
                state.loading.changePassword = false;
            })
            .addCase(changePassword.rejected, (state, action) => {
                state.loading.changePassword = false;
                state.error = action.payload as string;
            });

        // Get Sessions
        builder
            .addCase(getSessions.pending, (state) => {
                state.loading.sessions = true;
                state.error = null;
            })
            .addCase(getSessions.fulfilled, (state, action) => {
                state.loading.sessions = false;
                state.sessions = action.payload;
            })
            .addCase(getSessions.rejected, (state, action) => {
                state.loading.sessions = false;
                state.error = action.payload as string;
            });

        // Export Data
        builder
            .addCase(exportUserData.pending, (state) => {
                state.loading.exportData = true;
                state.error = null;
            })
            .addCase(exportUserData.fulfilled, (state, action) => {
                state.loading.exportData = false;
                state.exportData = action.payload;
            })
            .addCase(exportUserData.rejected, (state, action) => {
                state.loading.exportData = false;
                state.error = action.payload as string;
            });

        // Deactivate Account
        builder
            .addCase(deactivateAccount.pending, (state) => {
                state.loading.deactivate = true;
                state.error = null;
            })
            .addCase(deactivateAccount.fulfilled, (state) => {
                state.loading.deactivate = false;
            })
            .addCase(deactivateAccount.rejected, (state, action) => {
                state.loading.deactivate = false;
                state.error = action.payload as string;
            });

        // Delete Account
        builder
            .addCase(deleteAccount.pending, (state) => {
                state.loading.delete = true;
                state.error = null;
            })
            .addCase(deleteAccount.fulfilled, (state) => {
                state.loading.delete = false;
            })
            .addCase(deleteAccount.rejected, (state, action) => {
                state.loading.delete = false;
                state.error = action.payload as string;
            });
    },
});

export const { clearError, clearExportData } = userManagerSlice.actions;
export default userManagerSlice.reducer;
