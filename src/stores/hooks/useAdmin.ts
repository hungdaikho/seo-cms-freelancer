import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '@/stores/store';
import {
    fetchDashboardStats,
    fetchUsers,
    fetchUserById,
    updateUser,
    deleteUser,
    activateUser,
    deactivateUser,
    fetchSubscriptionPlans,
    fetchSubscriptionPlanById,
    createSubscriptionPlan,
    updateSubscriptionPlan,
    deleteSubscriptionPlan,
    fetchUserSubscriptions,
    updateUserSubscription,
    cancelUserSubscription,
    initializeAdmin,
    initializePlans,
    clearErrors,
    clearSelectedUser,
    clearSelectedPlan,
    setUsersPagination,
} from '@/stores/slices/admin.slice';

export const useAdmin = () => {
    const dispatch = useDispatch<AppDispatch>();

    // Selectors
    const admin = useSelector((state: RootState) => state.admin);

    // Actions
    const actions = {
        // Dashboard
        fetchDashboardStats: () => dispatch(fetchDashboardStats()),

        // Users
        fetchUsers: (params = {}) => dispatch(fetchUsers(params)),
        fetchUserById: (userId: string) => dispatch(fetchUserById(userId)),
        updateUser: (userId: string, data: any) => dispatch(updateUser({ userId, data })),
        deleteUser: (userId: string) => dispatch(deleteUser(userId)),
        activateUser: (userId: string) => dispatch(activateUser(userId)),
        deactivateUser: (userId: string) => dispatch(deactivateUser(userId)),

        // Subscription Plans
        fetchSubscriptionPlans: () => dispatch(fetchSubscriptionPlans()),
        fetchSubscriptionPlanById: (planId: string) => dispatch(fetchSubscriptionPlanById(planId)),
        createSubscriptionPlan: (data: any) => dispatch(createSubscriptionPlan(data)),
        updateSubscriptionPlan: (planId: string, data: any) => dispatch(updateSubscriptionPlan({ planId, data })),
        deleteSubscriptionPlan: (planId: string) => dispatch(deleteSubscriptionPlan(planId)),

        // User Subscriptions
        fetchUserSubscriptions: (userId: string) => dispatch(fetchUserSubscriptions(userId)),
        updateUserSubscription: (userId: string, data: any) => dispatch(updateUserSubscription({ userId, data })),
        cancelUserSubscription: (userId: string, subscriptionId: string) =>
            dispatch(cancelUserSubscription({ userId, subscriptionId })),

        // Initialization
        initializeAdmin: () => dispatch(initializeAdmin()),
        initializePlans: () => dispatch(initializePlans()),

        // Utils
        clearErrors: () => dispatch(clearErrors()),
        clearSelectedUser: () => dispatch(clearSelectedUser()),
        clearSelectedPlan: () => dispatch(clearSelectedPlan()),
        setUsersPagination: (pagination: any) => dispatch(setUsersPagination(pagination)),
    };

    return {
        ...admin,
        ...actions,
    };
};
