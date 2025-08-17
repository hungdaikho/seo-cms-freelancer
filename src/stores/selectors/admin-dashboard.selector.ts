import { RootState } from "../store";

// Dashboard stats selectors
export const selectDashboardStats = (state: RootState) =>
  state.adminDashboard.dashboardStats;
export const selectDashboardStatsLoading = (state: RootState) =>
  state.adminDashboard.dashboardStatsLoading;
export const selectDashboardStatsError = (state: RootState) =>
  state.adminDashboard.dashboardStatsError;

// Users selectors
export const selectUsers = (state: RootState) => state.adminDashboard.users;
export const selectUsersPagination = (state: RootState) =>
  state.adminDashboard.usersPagination;
export const selectUsersLoading = (state: RootState) =>
  state.adminDashboard.usersLoading;
export const selectUsersError = (state: RootState) =>
  state.adminDashboard.usersError;
export const selectUsersFilters = (state: RootState) =>
  state.adminDashboard.usersFilters;

// Selected user selectors
export const selectSelectedUser = (state: RootState) =>
  state.adminDashboard.selectedUser;
export const selectSelectedUserLoading = (state: RootState) =>
  state.adminDashboard.selectedUserLoading;
export const selectSelectedUserError = (state: RootState) =>
  state.adminDashboard.selectedUserError;

// Subscription plans selectors
export const selectSubscriptionPlans = (state: RootState) =>
  state.adminDashboard.subscriptionPlans;
export const selectSubscriptionPlansLoading = (state: RootState) =>
  state.adminDashboard.subscriptionPlansLoading;
export const selectSubscriptionPlansError = (state: RootState) =>
  state.adminDashboard.subscriptionPlansError;

// Expiring users selectors
export const selectExpiringUsers = (state: RootState) =>
  state.adminDashboard.expiringUsers;
export const selectExpiringUsersLoading = (state: RootState) =>
  state.adminDashboard.expiringUsersLoading;
export const selectExpiringUsersError = (state: RootState) =>
  state.adminDashboard.expiringUsersError;
export const selectSubscriptionStats = (state: RootState) =>
  state.adminDashboard.subscriptionStats;

// UI states selectors
export const selectUserDetailModalVisible = (state: RootState) =>
  state.adminDashboard.userDetailModalVisible;
export const selectEditUserModalVisible = (state: RootState) =>
  state.adminDashboard.editUserModalVisible;
export const selectCreatePlanModalVisible = (state: RootState) =>
  state.adminDashboard.createPlanModalVisible;
