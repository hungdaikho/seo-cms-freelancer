import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/stores/store";
import {
  fetchDashboardStats,
  fetchUsers,
  fetchUserById,
  updateUser,
  deleteUser,
  activateUser,
  deactivateUser,
  fetchSubscriptionPlans,
  createSubscriptionPlan,
  updateSubscriptionPlan,
  deleteSubscriptionPlan,
  fetchExpiringUsers,
  fetchSubscriptionStats,
  setUserDetailModalVisible,
  setEditUserModalVisible,
  setCreatePlanModalVisible,
  setUsersFilters,
  clearSelectedUser,
  clearErrors,
} from "@/stores/slices/admin-dashboard.slice";
import {
  selectDashboardStats,
  selectDashboardStatsLoading,
  selectDashboardStatsError,
  selectUsers,
  selectUsersPagination,
  selectUsersLoading,
  selectUsersError,
  selectUsersFilters,
  selectSelectedUser,
  selectSelectedUserLoading,
  selectSelectedUserError,
  selectSubscriptionPlans,
  selectSubscriptionPlansLoading,
  selectSubscriptionPlansError,
  selectExpiringUsers,
  selectExpiringUsersLoading,
  selectExpiringUsersError,
  selectSubscriptionStats,
  selectUserDetailModalVisible,
  selectEditUserModalVisible,
  selectCreatePlanModalVisible,
} from "@/stores/selectors/admin-dashboard.selector";
import {
  AdminUsersListParams,
  AdminUpdateUserData,
  AdminCreatePlanData,
} from "@/types/admin.type";

export const useAdminDashboard = () => {
  const dispatch = useDispatch<AppDispatch>();

  // Dashboard stats
  const dashboardStats = useSelector(selectDashboardStats);
  const dashboardStatsLoading = useSelector(selectDashboardStatsLoading);
  const dashboardStatsError = useSelector(selectDashboardStatsError);

  // Users
  const users = useSelector(selectUsers);
  const usersPagination = useSelector(selectUsersPagination);
  const usersLoading = useSelector(selectUsersLoading);
  const usersError = useSelector(selectUsersError);
  const usersFilters = useSelector(selectUsersFilters);

  // Selected user
  const selectedUser = useSelector(selectSelectedUser);
  const selectedUserLoading = useSelector(selectSelectedUserLoading);
  const selectedUserError = useSelector(selectSelectedUserError);

  // Subscription plans
  const subscriptionPlans = useSelector(selectSubscriptionPlans);
  const subscriptionPlansLoading = useSelector(selectSubscriptionPlansLoading);
  const subscriptionPlansError = useSelector(selectSubscriptionPlansError);

  // Expiring users
  const expiringUsers = useSelector(selectExpiringUsers);
  const expiringUsersLoading = useSelector(selectExpiringUsersLoading);
  const expiringUsersError = useSelector(selectExpiringUsersError);
  const subscriptionStats = useSelector(selectSubscriptionStats);

  // UI states
  const userDetailModalVisible = useSelector(selectUserDetailModalVisible);
  const editUserModalVisible = useSelector(selectEditUserModalVisible);
  const createPlanModalVisible = useSelector(selectCreatePlanModalVisible);

  // Actions
  const loadDashboardStats = () => dispatch(fetchDashboardStats());
  const loadUsers = (params?: AdminUsersListParams) =>
    dispatch(fetchUsers(params || { page: 1, limit: 10 }));
  const loadUserById = (userId: string) => dispatch(fetchUserById(userId));
  const editUser = (userId: string, data: AdminUpdateUserData) =>
    dispatch(updateUser({ userId, data }));
  const removeUser = (userId: string) => dispatch(deleteUser(userId));
  const activateUserById = (userId: string) => dispatch(activateUser(userId));
  const deactivateUserById = (userId: string) =>
    dispatch(deactivateUser(userId));

  const loadSubscriptionPlans = () => dispatch(fetchSubscriptionPlans());
  const createPlan = (data: AdminCreatePlanData) =>
    dispatch(createSubscriptionPlan(data));
  const updatePlan = (planId: string, data: Partial<AdminCreatePlanData>) =>
    dispatch(updateSubscriptionPlan({ planId, data }));
  const removePlan = (planId: string) =>
    dispatch(deleteSubscriptionPlan(planId));

  const loadExpiringUsers = (days: number = 30) =>
    dispatch(fetchExpiringUsers(days));
  const loadSubscriptionStats = () => dispatch(fetchSubscriptionStats());

  // UI actions
  const showUserDetailModal = (visible: boolean) =>
    dispatch(setUserDetailModalVisible(visible));
  const showEditUserModal = (visible: boolean) =>
    dispatch(setEditUserModalVisible(visible));
  const showCreatePlanModal = (visible: boolean) =>
    dispatch(setCreatePlanModalVisible(visible));
  const updateUsersFilters = (filters: AdminUsersListParams) =>
    dispatch(setUsersFilters(filters));
  const clearUser = () => dispatch(clearSelectedUser());
  const clearAllErrors = () => dispatch(clearErrors());

  return {
    // Data
    dashboardStats,
    dashboardStatsLoading,
    dashboardStatsError,
    users,
    usersPagination,
    usersLoading,
    usersError,
    usersFilters,
    selectedUser,
    selectedUserLoading,
    selectedUserError,
    subscriptionPlans,
    subscriptionPlansLoading,
    subscriptionPlansError,
    expiringUsers,
    expiringUsersLoading,
    expiringUsersError,
    subscriptionStats,
    userDetailModalVisible,
    editUserModalVisible,
    createPlanModalVisible,

    // Actions
    loadDashboardStats,
    loadUsers,
    loadUserById,
    editUser,
    removeUser,
    activateUserById,
    deactivateUserById,
    loadSubscriptionPlans,
    createPlan,
    updatePlan,
    removePlan,
    loadExpiringUsers,
    loadSubscriptionStats,
    showUserDetailModal,
    showEditUserModal,
    showCreatePlanModal,
    updateUsersFilters,
    clearUser,
    clearAllErrors,
  };
};
