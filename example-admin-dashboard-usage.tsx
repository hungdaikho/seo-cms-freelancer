// Ví dụ sử dụng hook useAdminDashboard
import React, { useEffect } from "react";
import { useAdminDashboard } from "@/hooks/useAdminDashboard";

const AdminDashboardExample: React.FC = () => {
  const {
    // Data
    dashboardStats,
    dashboardStatsLoading,
    users,
    usersLoading,
    subscriptionPlans,
    subscriptionPlansLoading,

    // Actions
    loadDashboardStats,
    loadUsers,
    loadSubscriptionPlans,
  } = useAdminDashboard();

  useEffect(() => {
    // Load dữ liệu khi component mount
    loadDashboardStats();
    loadUsers({ page: 1, limit: 10 });
    loadSubscriptionPlans();
  }, []);

  if (dashboardStatsLoading || usersLoading || subscriptionPlansLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Admin Dashboard</h1>

      {/* Dashboard Stats */}
      <div>
        <h2>Dashboard Statistics</h2>
        {dashboardStats && (
          <div>
            <p>Total Users: {dashboardStats.totalUsers}</p>
            <p>Active Users: {dashboardStats.activeUsers}</p>
            <p>Total Subscriptions: {dashboardStats.totalSubscriptions}</p>
            <p>Active Subscriptions: {dashboardStats.activeSubscriptions}</p>
            <p>Total Revenue: {dashboardStats.totalRevenue}</p>
            <p>Monthly Revenue: {dashboardStats.monthlyRevenue}</p>
          </div>
        )}
      </div>

      {/* Users */}
      <div>
        <h2>Users ({users.length})</h2>
        {users.map((user) => (
          <div key={user.id}>
            <p>
              {user.name} - {user.email} -{" "}
              {user.isActive ? "Active" : "Inactive"}
            </p>
          </div>
        ))}
      </div>

      {/* Subscription Plans */}
      <div>
        <h2>Subscription Plans ({subscriptionPlans.length})</h2>
        {subscriptionPlans.map((plan) => (
          <div key={plan.id}>
            <p>
              {plan.name} - ${plan.price}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminDashboardExample;
