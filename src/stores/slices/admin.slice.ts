import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
    adminService,
    DashboardStats,
    User,
    SubscriptionPlan,
    UserSubscription,
    UsersListParams,
    UpdateUserData,
    CreatePlanData,
    UpdateSubscriptionData
} from '@/services/admin.service';

// State interface
export interface AdminState {
    // Dashboard
    dashboardStats: DashboardStats | null;
    dashboardLoading: boolean;
    dashboardError: string | null;

    // Users
    users: User[];
    usersPagination: {
        total: number;
        page: number;
        limit: number;
        totalPages: number;
    };
    usersLoading: boolean;
    usersError: string | null;
    selectedUser: User | null;
    userDetailLoading: boolean;

    // Subscription Plans
    subscriptionPlans: SubscriptionPlan[];
    plansLoading: boolean;
    plansError: string | null;
    selectedPlan: SubscriptionPlan | null;

    // User Subscriptions
    userSubscriptions: UserSubscription[];
    subscriptionsLoading: boolean;
    subscriptionsError: string | null;

    // General loading states
    operationLoading: boolean;
    operationError: string | null;
}

const initialState: AdminState = {
    // Dashboard
    dashboardStats: null,
    dashboardLoading: false,
    dashboardError: null,

    // Users
    users: [],
    usersPagination: {
        total: 0,
        page: 1,
        limit: 10,
        totalPages: 0,
    },
    usersLoading: false,
    usersError: null,
    selectedUser: null,
    userDetailLoading: false,

    // Subscription Plans
    subscriptionPlans: [],
    plansLoading: false,
    plansError: null,
    selectedPlan: null,

    // User Subscriptions
    userSubscriptions: [],
    subscriptionsLoading: false,
    subscriptionsError: null,

    // General
    operationLoading: false,
    operationError: null,
};

// Async Thunks

// Dashboard
export const fetchDashboardStats = createAsyncThunk(
    'admin/fetchDashboardStats',
    async (_, { rejectWithValue }) => {
        try {
            const stats = await adminService.getDashboardStats();
            return stats;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || 'Failed to fetch dashboard stats');
        }
    }
);

// Users Management
export const fetchUsers = createAsyncThunk(
    'admin/fetchUsers',
    async (params: UsersListParams = {}, { rejectWithValue }) => {
        try {
            const response = await adminService.getUsers(params);
            return response;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || 'Failed to fetch users');
        }
    }
);

export const fetchUserById = createAsyncThunk(
    'admin/fetchUserById',
    async (userId: string, { rejectWithValue }) => {
        try {
            const user = await adminService.getUserById(userId);
            return user;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || 'Failed to fetch user details');
        }
    }
);

export const updateUser = createAsyncThunk(
    'admin/updateUser',
    async ({ userId, data }: { userId: string; data: UpdateUserData }, { rejectWithValue }) => {
        try {
            const user = await adminService.updateUser(userId, data);
            return user;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || 'Failed to update user');
        }
    }
);

export const deleteUser = createAsyncThunk(
    'admin/deleteUser',
    async (userId: string, { rejectWithValue }) => {
        try {
            await adminService.deleteUser(userId);
            return userId;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || 'Failed to delete user');
        }
    }
);

export const activateUser = createAsyncThunk(
    'admin/activateUser',
    async (userId: string, { rejectWithValue }) => {
        try {
            const user = await adminService.activateUser(userId);
            return user;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || 'Failed to activate user');
        }
    }
);

export const deactivateUser = createAsyncThunk(
    'admin/deactivateUser',
    async (userId: string, { rejectWithValue }) => {
        try {
            const user = await adminService.deactivateUser(userId);
            return user;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || 'Failed to deactivate user');
        }
    }
);

// Subscription Plans
export const fetchSubscriptionPlans = createAsyncThunk(
    'admin/fetchSubscriptionPlans',
    async (_, { rejectWithValue }) => {
        try {
            const plans = await adminService.getSubscriptionPlans();
            return plans;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || 'Failed to fetch subscription plans');
        }
    }
);

export const fetchSubscriptionPlanById = createAsyncThunk(
    'admin/fetchSubscriptionPlanById',
    async (planId: string, { rejectWithValue }) => {
        try {
            const plan = await adminService.getSubscriptionPlanById(planId);
            return plan;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || 'Failed to fetch plan details');
        }
    }
);

export const createSubscriptionPlan = createAsyncThunk(
    'admin/createSubscriptionPlan',
    async (data: CreatePlanData, { rejectWithValue }) => {
        try {
            const plan = await adminService.createSubscriptionPlan(data);
            return plan;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || 'Failed to create subscription plan');
        }
    }
);

export const updateSubscriptionPlan = createAsyncThunk(
    'admin/updateSubscriptionPlan',
    async ({ planId, data }: { planId: string; data: Partial<CreatePlanData> }, { rejectWithValue }) => {
        try {
            const plan = await adminService.updateSubscriptionPlan(planId, data);
            return plan;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || 'Failed to update subscription plan');
        }
    }
);

export const deleteSubscriptionPlan = createAsyncThunk(
    'admin/deleteSubscriptionPlan',
    async (planId: string, { rejectWithValue }) => {
        try {
            await adminService.deleteSubscriptionPlan(planId);
            return planId;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || 'Failed to delete subscription plan');
        }
    }
);

// User Subscriptions
export const fetchUserSubscriptions = createAsyncThunk(
    'admin/fetchUserSubscriptions',
    async (userId: string, { rejectWithValue }) => {
        try {
            const subscriptions = await adminService.getUserSubscriptions(userId);
            return subscriptions;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || 'Failed to fetch user subscriptions');
        }
    }
);

export const updateUserSubscription = createAsyncThunk(
    'admin/updateUserSubscription',
    async ({ userId, data }: { userId: string; data: UpdateSubscriptionData }, { rejectWithValue }) => {
        try {
            const subscription = await adminService.updateUserSubscription(userId, data);
            return subscription;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || 'Failed to update user subscription');
        }
    }
);

export const cancelUserSubscription = createAsyncThunk(
    'admin/cancelUserSubscription',
    async ({ userId, subscriptionId }: { userId: string; subscriptionId: string }, { rejectWithValue }) => {
        try {
            const subscription = await adminService.cancelUserSubscription(userId, subscriptionId);
            return subscription;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || 'Failed to cancel user subscription');
        }
    }
);

// Initialization
export const initializeAdmin = createAsyncThunk(
    'admin/initializeAdmin',
    async (_, { rejectWithValue }) => {
        try {
            const result = await adminService.initializeAdmin();
            return result;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || 'Failed to initialize admin');
        }
    }
);

export const initializePlans = createAsyncThunk(
    'admin/initializePlans',
    async (_, { rejectWithValue }) => {
        try {
            const result = await adminService.initializePlans();
            return result;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || 'Failed to initialize plans');
        }
    }
);

// Slice
const adminSlice = createSlice({
    name: 'admin',
    initialState,
    reducers: {
        clearErrors: (state) => {
            state.dashboardError = null;
            state.usersError = null;
            state.plansError = null;
            state.subscriptionsError = null;
            state.operationError = null;
        },
        clearSelectedUser: (state) => {
            state.selectedUser = null;
        },
        clearSelectedPlan: (state) => {
            state.selectedPlan = null;
        },
        setUsersPagination: (state, action) => {
            state.usersPagination = { ...state.usersPagination, ...action.payload };
        },
    },
    extraReducers: (builder) => {
        // Dashboard Stats
        builder
            .addCase(fetchDashboardStats.pending, (state) => {
                state.dashboardLoading = true;
                state.dashboardError = null;
            })
            .addCase(fetchDashboardStats.fulfilled, (state, action) => {
                state.dashboardLoading = false;
                state.dashboardStats = action.payload;
            })
            .addCase(fetchDashboardStats.rejected, (state, action) => {
                state.dashboardLoading = false;
                state.dashboardError = action.payload as string;
            })

        // Users
        builder
            .addCase(fetchUsers.pending, (state) => {
                state.usersLoading = true;
                state.usersError = null;
            })
            .addCase(fetchUsers.fulfilled, (state, action) => {
                state.usersLoading = false;
                state.users = action.payload.users;
                state.usersPagination = {
                    total: action.payload.total,
                    page: action.payload.page,
                    limit: action.payload.limit,
                    totalPages: action.payload.totalPages,
                };
            })
            .addCase(fetchUsers.rejected, (state, action) => {
                state.usersLoading = false;
                state.usersError = action.payload as string;
            })

        builder
            .addCase(fetchUserById.pending, (state) => {
                state.userDetailLoading = true;
                state.usersError = null;
            })
            .addCase(fetchUserById.fulfilled, (state, action) => {
                state.userDetailLoading = false;
                state.selectedUser = action.payload;
            })
            .addCase(fetchUserById.rejected, (state, action) => {
                state.userDetailLoading = false;
                state.usersError = action.payload as string;
            })

        builder
            .addCase(updateUser.pending, (state) => {
                state.operationLoading = true;
                state.operationError = null;
            })
            .addCase(updateUser.fulfilled, (state, action) => {
                state.operationLoading = false;
                // Update user in users array
                const index = state.users.findIndex(user => user.id === action.payload.id);
                if (index !== -1) {
                    state.users[index] = action.payload;
                }
                // Update selected user if it's the same
                if (state.selectedUser?.id === action.payload.id) {
                    state.selectedUser = action.payload;
                }
            })
            .addCase(updateUser.rejected, (state, action) => {
                state.operationLoading = false;
                state.operationError = action.payload as string;
            })

        builder
            .addCase(deleteUser.pending, (state) => {
                state.operationLoading = true;
                state.operationError = null;
            })
            .addCase(deleteUser.fulfilled, (state, action) => {
                state.operationLoading = false;
                // Remove user from users array
                state.users = state.users.filter(user => user.id !== action.payload);
                // Clear selected user if it's the deleted one
                if (state.selectedUser?.id === action.payload) {
                    state.selectedUser = null;
                }
            })
            .addCase(deleteUser.rejected, (state, action) => {
                state.operationLoading = false;
                state.operationError = action.payload as string;
            })

        builder
            .addCase(activateUser.fulfilled, (state, action) => {
                // Update user in users array
                const index = state.users.findIndex(user => user.id === action.payload.id);
                if (index !== -1) {
                    state.users[index] = action.payload;
                }
                // Update selected user if it's the same
                if (state.selectedUser?.id === action.payload.id) {
                    state.selectedUser = action.payload;
                }
            })
            .addCase(deactivateUser.fulfilled, (state, action) => {
                // Update user in users array
                const index = state.users.findIndex(user => user.id === action.payload.id);
                if (index !== -1) {
                    state.users[index] = action.payload;
                }
                // Update selected user if it's the same
                if (state.selectedUser?.id === action.payload.id) {
                    state.selectedUser = action.payload;
                }
            })

        // Subscription Plans
        builder
            .addCase(fetchSubscriptionPlans.pending, (state) => {
                state.plansLoading = true;
                state.plansError = null;
            })
            .addCase(fetchSubscriptionPlans.fulfilled, (state, action) => {
                state.plansLoading = false;
                state.subscriptionPlans = action.payload;
            })
            .addCase(fetchSubscriptionPlans.rejected, (state, action) => {
                state.plansLoading = false;
                state.plansError = action.payload as string;
            })

        builder
            .addCase(fetchSubscriptionPlanById.fulfilled, (state, action) => {
                state.selectedPlan = action.payload;
            })

        builder
            .addCase(createSubscriptionPlan.pending, (state) => {
                state.operationLoading = true;
                state.operationError = null;
            })
            .addCase(createSubscriptionPlan.fulfilled, (state, action) => {
                state.operationLoading = false;
                state.subscriptionPlans.push(action.payload);
            })
            .addCase(createSubscriptionPlan.rejected, (state, action) => {
                state.operationLoading = false;
                state.operationError = action.payload as string;
            })

        builder
            .addCase(updateSubscriptionPlan.pending, (state) => {
                state.operationLoading = true;
                state.operationError = null;
            })
            .addCase(updateSubscriptionPlan.fulfilled, (state, action) => {
                state.operationLoading = false;
                // Update plan in plans array
                const index = state.subscriptionPlans.findIndex(plan => plan.id === action.payload.id);
                if (index !== -1) {
                    state.subscriptionPlans[index] = action.payload;
                }
                // Update selected plan if it's the same
                if (state.selectedPlan?.id === action.payload.id) {
                    state.selectedPlan = action.payload;
                }
            })
            .addCase(updateSubscriptionPlan.rejected, (state, action) => {
                state.operationLoading = false;
                state.operationError = action.payload as string;
            })

        builder
            .addCase(deleteSubscriptionPlan.pending, (state) => {
                state.operationLoading = true;
                state.operationError = null;
            })
            .addCase(deleteSubscriptionPlan.fulfilled, (state, action) => {
                state.operationLoading = false;
                // Remove plan from plans array
                state.subscriptionPlans = state.subscriptionPlans.filter(plan => plan.id !== action.payload);
                // Clear selected plan if it's the deleted one
                if (state.selectedPlan?.id === action.payload) {
                    state.selectedPlan = null;
                }
            })
            .addCase(deleteSubscriptionPlan.rejected, (state, action) => {
                state.operationLoading = false;
                state.operationError = action.payload as string;
            })

        // User Subscriptions
        builder
            .addCase(fetchUserSubscriptions.pending, (state) => {
                state.subscriptionsLoading = true;
                state.subscriptionsError = null;
            })
            .addCase(fetchUserSubscriptions.fulfilled, (state, action) => {
                state.subscriptionsLoading = false;
                state.userSubscriptions = action.payload;
            })
            .addCase(fetchUserSubscriptions.rejected, (state, action) => {
                state.subscriptionsLoading = false;
                state.subscriptionsError = action.payload as string;
            })

        builder
            .addCase(updateUserSubscription.fulfilled, (state, action) => {
                // Update subscription in subscriptions array
                const index = state.userSubscriptions.findIndex(sub => sub.id === action.payload.id);
                if (index !== -1) {
                    state.userSubscriptions[index] = action.payload;
                }
            })

        builder
            .addCase(cancelUserSubscription.fulfilled, (state, action) => {
                // Update subscription in subscriptions array
                const index = state.userSubscriptions.findIndex(sub => sub.id === action.payload.id);
                if (index !== -1) {
                    state.userSubscriptions[index] = action.payload;
                }
            });
    },
});

export const {
    clearErrors,
    clearSelectedUser,
    clearSelectedPlan,
    setUsersPagination
} = adminSlice.actions;

export default adminSlice.reducer;
