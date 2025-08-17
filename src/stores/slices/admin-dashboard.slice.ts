import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import {
  AdminUser,
  AdminUsersListParams,
  AdminUsersListResponse,
  AdminDashboardStats,
  AdminSubscriptionPlan,
  AdminUpdateUserData,
  AdminCreatePlanData,
} from "@/types/admin.type";
import { adminDashboardService } from "@/services/admin-dashboard.service";

// Define state interface
interface AdminDashboardState {
  // Dashboard stats
  dashboardStats: AdminDashboardStats | null;
  dashboardStatsLoading: boolean;
  dashboardStatsError: string | null;

  // Users management
  users: AdminUser[];
  usersPagination: {
    current: number;
    pageSize: number;
    total: number;
    totalPages: number;
  };
  usersLoading: boolean;
  usersError: string | null;
  usersFilters: AdminUsersListParams;

  // Selected user for detail view
  selectedUser: AdminUser | null;
  selectedUserLoading: boolean;
  selectedUserError: string | null;

  // Subscription plans
  subscriptionPlans: AdminSubscriptionPlan[];
  subscriptionPlansLoading: boolean;
  subscriptionPlansError: string | null;

  // Expiring subscriptions
  expiringUsers: AdminUser[];
  expiringUsersLoading: boolean;
  expiringUsersError: string | null;
  subscriptionStats: {
    expiring_today: number;
    expiring_this_month: number;
  } | null;

  // UI states
  userDetailModalVisible: boolean;
  editUserModalVisible: boolean;
  createPlanModalVisible: boolean;
}

const initialState: AdminDashboardState = {
  dashboardStats: null,
  dashboardStatsLoading: false,
  dashboardStatsError: null,

  users: [],
  usersPagination: {
    current: 1,
    pageSize: 10,
    total: 0,
    totalPages: 0,
  },
  usersLoading: false,
  usersError: null,
  usersFilters: {
    page: 1,
    limit: 10,
  },

  selectedUser: null,
  selectedUserLoading: false,
  selectedUserError: null,

  subscriptionPlans: [],
  subscriptionPlansLoading: false,
  subscriptionPlansError: null,

  expiringUsers: [],
  expiringUsersLoading: false,
  expiringUsersError: null,
  subscriptionStats: null,

  userDetailModalVisible: false,
  editUserModalVisible: false,
  createPlanModalVisible: false,
};

// Async thunks
export const fetchDashboardStats = createAsyncThunk(
  "adminDashboard/fetchDashboardStats",
  async (_, { rejectWithValue }) => {
    try {
      const response = await adminDashboardService.getDashboardStats();
      return response;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch dashboard stats"
      );
    }
  }
);

export const fetchUsers = createAsyncThunk(
  "adminDashboard/fetchUsers",
  async (params: AdminUsersListParams, { rejectWithValue }) => {
    try {
      console.log(
        "🚀 Calling adminDashboardService.getAllUsers with params:",
        params
      );
      const response = await adminDashboardService.getAllUsers(params);
      console.log("📦 Service response:", response);
      return { response, params };
    } catch (error: any) {
      console.error("❌ fetchUsers error:", error);
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch users"
      );
    }
  }
);

export const fetchUserById = createAsyncThunk(
  "adminDashboard/fetchUserById",
  async (userId: string, { rejectWithValue }) => {
    try {
      const response = await adminDashboardService.getUserById(userId);
      return response;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch user"
      );
    }
  }
);

export const updateUser = createAsyncThunk(
  "adminDashboard/updateUser",
  async (
    { userId, data }: { userId: string; data: AdminUpdateUserData },
    { rejectWithValue }
  ) => {
    try {
      const response = await adminDashboardService.updateUser(userId, data);
      return response;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to update user"
      );
    }
  }
);

export const deleteUser = createAsyncThunk(
  "adminDashboard/deleteUser",
  async (userId: string, { rejectWithValue }) => {
    try {
      await adminDashboardService.deleteUser(userId);
      return userId;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to delete user"
      );
    }
  }
);

export const activateUser = createAsyncThunk(
  "adminDashboard/activateUser",
  async (userId: string, { rejectWithValue }) => {
    try {
      const response = await adminDashboardService.activateUser(userId);
      return response;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to activate user"
      );
    }
  }
);

export const deactivateUser = createAsyncThunk(
  "adminDashboard/deactivateUser",
  async (userId: string, { rejectWithValue }) => {
    try {
      const response = await adminDashboardService.deactivateUser(userId);
      return response;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to deactivate user"
      );
    }
  }
);

export const fetchSubscriptionPlans = createAsyncThunk(
  "adminDashboard/fetchSubscriptionPlans",
  async (_, { rejectWithValue }) => {
    try {
      const response = await adminDashboardService.getAllSubscriptionPlans();
      return response;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch subscription plans"
      );
    }
  }
);

export const createSubscriptionPlan = createAsyncThunk(
  "adminDashboard/createSubscriptionPlan",
  async (data: AdminCreatePlanData, { rejectWithValue }) => {
    try {
      const response = await adminDashboardService.createSubscriptionPlan(data);
      return response;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to create subscription plan"
      );
    }
  }
);

export const updateSubscriptionPlan = createAsyncThunk(
  "adminDashboard/updateSubscriptionPlan",
  async (
    { planId, data }: { planId: string; data: Partial<AdminCreatePlanData> },
    { rejectWithValue }
  ) => {
    try {
      const response = await adminDashboardService.updateSubscriptionPlan(
        planId,
        data
      );
      return response;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to update subscription plan"
      );
    }
  }
);

export const deleteSubscriptionPlan = createAsyncThunk(
  "adminDashboard/deleteSubscriptionPlan",
  async (planId: string, { rejectWithValue }) => {
    try {
      await adminDashboardService.deleteSubscriptionPlan(planId);
      return planId;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to delete subscription plan"
      );
    }
  }
);

export const fetchExpiringUsers = createAsyncThunk(
  "adminDashboard/fetchExpiringUsers",
  async (days: number = 30, { rejectWithValue }) => {
    try {
      const response = await adminDashboardService.getExpiringSubscriptions(
        days
      );
      return response;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch expiring users"
      );
    }
  }
);

export const fetchSubscriptionStats = createAsyncThunk(
  "adminDashboard/fetchSubscriptionStats",
  async (_, { rejectWithValue }) => {
    try {
      const response = await adminDashboardService.getSubscriptionStats();
      return response;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch subscription stats"
      );
    }
  }
);

// Create slice
const adminDashboardSlice = createSlice({
  name: "adminDashboard",
  initialState,
  reducers: {
    // UI state setters
    setUserDetailModalVisible: (state, action: PayloadAction<boolean>) => {
      state.userDetailModalVisible = action.payload;
    },
    setEditUserModalVisible: (state, action: PayloadAction<boolean>) => {
      state.editUserModalVisible = action.payload;
    },
    setCreatePlanModalVisible: (state, action: PayloadAction<boolean>) => {
      state.createPlanModalVisible = action.payload;
    },

    // Filter setters
    setUsersFilters: (state, action: PayloadAction<AdminUsersListParams>) => {
      state.usersFilters = { ...state.usersFilters, ...action.payload };
    },

    // Reset selected user
    clearSelectedUser: (state) => {
      state.selectedUser = null;
      state.selectedUserError = null;
    },

    // Clear errors
    clearErrors: (state) => {
      state.dashboardStatsError = null;
      state.usersError = null;
      state.selectedUserError = null;
      state.subscriptionPlansError = null;
      state.expiringUsersError = null;
    },
  },
  extraReducers: (builder) => {
    // Dashboard stats
    builder
      .addCase(fetchDashboardStats.pending, (state) => {
        state.dashboardStatsLoading = true;
        state.dashboardStatsError = null;
      })
      .addCase(fetchDashboardStats.fulfilled, (state, action) => {
        state.dashboardStatsLoading = false;
        console.log("🔍 Dashboard stats response:", action.payload);
        state.dashboardStats = action.payload;
      })
      .addCase(fetchDashboardStats.rejected, (state, action) => {
        state.dashboardStatsLoading = false;
        state.dashboardStatsError = action.payload as string;
      });

    // Fetch users
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.usersLoading = true;
        state.usersError = null;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.usersLoading = false;
        const response = action.payload.response;

        // Debug logging
        console.log("🔍 Raw fetchUsers response:", action.payload);
        console.log("🔍 Response object:", response);
        console.log("🔍 Response.users:", response.users);
        console.log("🔍 Response type:", typeof response);

        // Handle the response structure based on actual API response:
        // {users: [...], total: 3, page: 1, limit: 10, totalPages: 1}
        state.users = response.users || [];
        state.usersPagination = {
          current: response.page || 1,
          pageSize: response.limit || 10,
          total: response.total || 0,
          totalPages: response.totalPages || 1,
        };
        state.usersFilters = action.payload.params;

        console.log("✅ Updated state.users:", state.users);
        console.log("✅ Updated state.usersPagination:", state.usersPagination);
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.usersLoading = false;
        state.usersError = action.payload as string;
      });

    // Fetch user by ID
    builder
      .addCase(fetchUserById.pending, (state) => {
        state.selectedUserLoading = true;
        state.selectedUserError = null;
      })
      .addCase(fetchUserById.fulfilled, (state, action) => {
        state.selectedUserLoading = false;
        state.selectedUser = action.payload;
      })
      .addCase(fetchUserById.rejected, (state, action) => {
        state.selectedUserLoading = false;
        state.selectedUserError = action.payload as string;
      });

    // Update user
    builder.addCase(updateUser.fulfilled, (state, action) => {
      const userIndex = state.users.findIndex(
        (user) => user.id === action.payload.id
      );
      if (userIndex !== -1) {
        state.users[userIndex] = action.payload;
      }
      if (state.selectedUser?.id === action.payload.id) {
        state.selectedUser = action.payload;
      }
    });

    // Delete user
    builder.addCase(deleteUser.fulfilled, (state, action) => {
      state.users = state.users.filter((user) => user.id !== action.payload);
      if (state.selectedUser?.id === action.payload) {
        state.selectedUser = null;
      }
    });

    // Activate/Deactivate user
    builder
      .addCase(activateUser.fulfilled, (state, action) => {
        const userIndex = state.users.findIndex(
          (user) => user.id === action.payload.id
        );
        if (userIndex !== -1) {
          state.users[userIndex] = action.payload;
        }
        if (state.selectedUser?.id === action.payload.id) {
          state.selectedUser = action.payload;
        }
      })
      .addCase(deactivateUser.fulfilled, (state, action) => {
        const userIndex = state.users.findIndex(
          (user) => user.id === action.payload.id
        );
        if (userIndex !== -1) {
          state.users[userIndex] = action.payload;
        }
        if (state.selectedUser?.id === action.payload.id) {
          state.selectedUser = action.payload;
        }
      });

    // Subscription plans
    builder
      .addCase(fetchSubscriptionPlans.pending, (state) => {
        state.subscriptionPlansLoading = true;
        state.subscriptionPlansError = null;
      })
      .addCase(fetchSubscriptionPlans.fulfilled, (state, action) => {
        state.subscriptionPlansLoading = false;
        console.log("🔍 Subscription plans response:", action.payload);
        // API trả về array các object thay vì array trực tiếp
        // Chuyển đổi từ object có keys 0,1,2,3 thành array
        if (
          typeof action.payload === "object" &&
          !Array.isArray(action.payload)
        ) {
          state.subscriptionPlans = Object.values(action.payload);
        } else {
          state.subscriptionPlans = action.payload || [];
        }
        console.log(
          "✅ Updated state.subscriptionPlans:",
          state.subscriptionPlans
        );
      })
      .addCase(fetchSubscriptionPlans.rejected, (state, action) => {
        state.subscriptionPlansLoading = false;
        state.subscriptionPlansError = action.payload as string;
      });

    // Create subscription plan
    builder.addCase(createSubscriptionPlan.fulfilled, (state, action) => {
      state.subscriptionPlans.push(action.payload);
    });

    // Update subscription plan
    builder.addCase(updateSubscriptionPlan.fulfilled, (state, action) => {
      const planIndex = state.subscriptionPlans.findIndex(
        (plan) => plan.id === action.payload.id
      );
      if (planIndex !== -1) {
        state.subscriptionPlans[planIndex] = action.payload;
      }
    });

    // Delete subscription plan
    builder.addCase(deleteSubscriptionPlan.fulfilled, (state, action) => {
      state.subscriptionPlans = state.subscriptionPlans.filter(
        (plan) => plan.id !== action.payload
      );
    });

    // Fetch expiring users
    builder
      .addCase(fetchExpiringUsers.pending, (state) => {
        state.expiringUsersLoading = true;
        state.expiringUsersError = null;
      })
      .addCase(fetchExpiringUsers.fulfilled, (state, action) => {
        state.expiringUsersLoading = false;
        state.expiringUsers = action.payload;
      })
      .addCase(fetchExpiringUsers.rejected, (state, action) => {
        state.expiringUsersLoading = false;
        state.expiringUsersError = action.payload as string;
      });

    // Fetch subscription stats
    builder.addCase(fetchSubscriptionStats.fulfilled, (state, action) => {
      state.subscriptionStats = {
        expiring_today: action.payload.expiring_today,
        expiring_this_month: action.payload.expiring_this_month,
      };
      // Also update expiring users from stats if available
      if (action.payload.expiring_users) {
        state.expiringUsers = action.payload.expiring_users;
      }
    });
  },
});

export const {
  setUserDetailModalVisible,
  setEditUserModalVisible,
  setCreatePlanModalVisible,
  setUsersFilters,
  clearSelectedUser,
  clearErrors,
} = adminDashboardSlice.actions;

export default adminDashboardSlice.reducer;
