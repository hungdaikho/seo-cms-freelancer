"use client";

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Table,
  Button,
  Input,
  Tag,
  Dropdown,
  Space,
  Card,
  Row,
  Col,
  Pagination,
  Modal,
  message,
  Spin,
  Select,
} from "antd";
import {
  SearchOutlined,
  MoreOutlined,
  UserOutlined,
  EyeOutlined,
  EditOutlined,
  DeleteOutlined,
  CheckCircleOutlined,
  StopOutlined,
  DownOutlined,
  ExclamationCircleOutlined,
  TeamOutlined,
  UserAddOutlined,
  UserDeleteOutlined,
  ClockCircleOutlined,
  RiseOutlined,
} from "@ant-design/icons";
import { RootState, AppDispatch } from "@/stores/store.new";
import {
  fetchDashboardStats,
  fetchUsers,
  fetchSubscriptionPlans,
  fetchExpiringUsers,
  fetchSubscriptionStats,
  deleteUser,
  activateUser,
  deactivateUser,
  updateUser,
  setUserDetailModalVisible,
  setEditUserModalVisible,
  setUsersFilters,
  fetchUserById,
} from "@/stores/slices/admin-dashboard.slice";
import { AdminUser, AdminUpdateUserData } from "@/types/admin.type";
import UserDetailModal from "@/components/admin/UserDetailModal";
import EditUserModal from "@/components/admin/EditUserModal";
import styles from "./page.module.scss";

const { Search } = Input;
const { Option } = Select;
const { confirm } = Modal;

const ManageUserPage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const adminDashboardState = useSelector(
    (state: RootState) => state.adminDashboard
  );

  const {
    dashboardStats,
    dashboardStatsLoading,
    users,
    usersPagination,
    usersLoading,
    usersFilters,
    selectedUser,
    selectedUserLoading,
    userDetailModalVisible,
    editUserModalVisible,
    subscriptionPlans,
    subscriptionPlansLoading,
    expiringUsers,
    expiringUsersLoading,
    subscriptionStats,
  } = adminDashboardState || {};
  const [searchValue, setSearchValue] = useState("");
  // Define stat items with icons and colors
  const statItems = [
    {
      title: "Total Users",
      value: dashboardStats?.totalUsers || 0,
      icon: <TeamOutlined />,
      color: "#3B82F6",
      bgColor: "linear-gradient(135deg, #DBEAFE 0%, #BFDBFE 100%)",
      iconBg: "linear-gradient(135deg, #3B82F6 0%, #1D4ED8 100%)",
      trend: { value: 12, isPositive: true },
    },
    {
      title: "Active Subscribers",
      value: dashboardStats?.activeUsers || 0,
      icon: <UserAddOutlined />,
      color: "#10B981",
      bgColor: "linear-gradient(135deg, #D1FAE5 0%, #A7F3D0 100%)",
      iconBg: "linear-gradient(135deg, #10B981 0%, #059669 100%)",
      trend: { value: 8, isPositive: true },
    },
    {
      title: "Expired Subscriptions",
      value: dashboardStats?.expiredSubscriptions || 0,
      icon: <UserDeleteOutlined />,
      color: "#F59E0B",
      bgColor: "linear-gradient(135deg, #FEF3C7 0%, #FDE68A 100%)",
      iconBg: "linear-gradient(135deg, #F59E0B 0%, #D97706 100%)",
      trend: { value: 3, isPositive: false },
    },
    {
      title: "Expires This Month",
      value: subscriptionStats?.expiring_this_month || 0,
      icon: <ClockCircleOutlined />,
      color: "#EF4444",
      bgColor: "linear-gradient(135deg, #FEE2E2 0%, #FECACA 100%)",
      iconBg: "linear-gradient(135deg, #EF4444 0%, #DC2626 100%)",
      trend: { value: 15, isPositive: false },
    },
  ];
  useEffect(() => {
    dispatch(fetchDashboardStats());
    dispatch(fetchSubscriptionPlans());
    dispatch(fetchUsers(usersFilters || { page: 1, limit: 10 }));
    dispatch(fetchExpiringUsers(30)); // Fetch users expiring in 30 days
    dispatch(fetchSubscriptionStats());
  }, []);

  const handleSearch = (value: string) => {
    const filters = usersFilters || { page: 1, limit: 10 };
    dispatch(
      setUsersFilters({
        ...filters,
        search: value || undefined,
        page: 1,
      })
    );
    dispatch(
      fetchUsers({
        ...filters,
        search: value || undefined,
        page: 1,
      })
    );
  };

  const handleFilterChange = (key: string, value: any) => {
    const filters = usersFilters || { page: 1, limit: 10 };
    const newFilters = {
      ...filters,
      [key]: value,
      page: 1,
    };
    dispatch(setUsersFilters(newFilters));
    dispatch(fetchUsers(newFilters));
  };

  const handlePageChange = (page: number, pageSize?: number) => {
    const filters = usersFilters || { page: 1, limit: 10 };
    const newFilters = {
      ...filters,
      page,
      limit: pageSize || filters.limit,
    };
    dispatch(setUsersFilters(newFilters));
    dispatch(fetchUsers(newFilters));
  };

  const handleViewUser = (user: AdminUser) => {
    dispatch(fetchUserById(user.id));
    dispatch(setUserDetailModalVisible(true));
  };

  const handleEditUser = (user: AdminUser) => {
    dispatch(fetchUserById(user.id));
    dispatch(setEditUserModalVisible(true));
  };

  const handleUpdateUser = (userId: string, data: AdminUpdateUserData) => {
    dispatch(updateUser({ userId, data })).then(() => {
      message.success("User updated successfully");
      dispatch(setEditUserModalVisible(false));
      dispatch(fetchUsers(usersFilters || { page: 1, limit: 10 }));
    });
  };

  const handleDeleteUser = (userId: string) => {
    confirm({
      title: "Are you sure you want to delete this user?",
      icon: <ExclamationCircleOutlined />,
      content: "This action cannot be undone.",
      okText: "Yes, Delete",
      okType: "danger",
      cancelText: "Cancel",
      onOk() {
        dispatch(deleteUser(userId)).then(() => {
          message.success("User deleted successfully");
          dispatch(fetchUsers(usersFilters || { page: 1, limit: 10 }));
        });
      },
    });
  };

  const handleActivateUser = (userId: string) => {
    dispatch(activateUser(userId)).then(() => {
      message.success("User activated successfully");
      dispatch(fetchUsers(usersFilters || { page: 1, limit: 10 }));
    });
  };

  const handleDeactivateUser = (userId: string) => {
    dispatch(deactivateUser(userId)).then(() => {
      message.success("User deactivated successfully");
      dispatch(fetchUsers(usersFilters || { page: 1, limit: 10 }));
    });
  };

  const getUserInitials = (name: string) => {
    return name
      .split(" ")
      .map((word) => word.charAt(0))
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  const getActionItems = (user: AdminUser) => [
    {
      key: "view",
      label: (
        <div className={styles.actionItem} onClick={() => handleViewUser(user)}>
          <EyeOutlined />
          Details
        </div>
      ),
    },
    {
      key: "edit",
      label: (
        <div className={styles.actionItem} onClick={() => handleEditUser(user)}>
          <EditOutlined />
          Edit
        </div>
      ),
    },
    user.isActive
      ? {
          key: "deactivate",
          label: (
            <div
              className={styles.actionItem}
              onClick={() => handleDeactivateUser(user.id)}
            >
              <StopOutlined />
              Deactivate
            </div>
          ),
        }
      : {
          key: "activate",
          label: (
            <div
              className={styles.actionItem}
              onClick={() => handleActivateUser(user.id)}
            >
              <CheckCircleOutlined />
              Activate
            </div>
          ),
        },
    {
      key: "delete",
      label: (
        <div
          className={`${styles.actionItem} ${styles.danger}`}
          onClick={() => handleDeleteUser(user.id)}
        >
          <DeleteOutlined />
          Delete
        </div>
      ),
    },
  ];

  const columns = [
    {
      title: "USER",
      dataIndex: "user",
      key: "user",
      render: (_: any, record: AdminUser) => (
        <div className={styles.userInfo}>
          <div className={styles.userAvatar}>
            {getUserInitials(record.name)}
          </div>
          <div className={styles.userDetails}>
            <div className={styles.userName}>{record.name}</div>
            <div className={styles.userUsername}>
              @{record.email.split("@")[0]}
            </div>
          </div>
        </div>
      ),
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "PLAN",
      dataIndex: "plan",
      key: "plan",
      render: (_: any, record: AdminUser) => (
        <span>{record.subscription?.plan?.name || "Basic"}</span>
      ),
    },
    {
      title: "STATUS",
      dataIndex: "status",
      key: "status",
      render: (_: any, record: AdminUser) => (
        <Tag
          className={`${styles.statusTag} ${
            record.isActive ? styles.active : styles.inactive
          }`}
          color={record.isActive ? "success" : "warning"}
        >
          {record.isActive ? "Active" : "Inactive"}
        </Tag>
      ),
    },
    {
      title: "ACTION",
      key: "action",
      render: (_: any, record: AdminUser) => (
        <Dropdown
          menu={{ items: getActionItems(record) }}
          trigger={["click"]}
          placement="bottomRight"
        >
          <Button type="text" icon={<MoreOutlined />} />
        </Dropdown>
      ),
    },
  ];

  return (
    <div className={styles.manageUserPage}>
      <div className={styles.header}>
        <h1 className={styles.title}>Manage Users</h1>
        <div className={styles.actions}></div>
      </div>

      {/* Dashboard Stats */}
      <div className={styles.dashboardStats}>
        <Spin spinning={dashboardStatsLoading || false}>
          <Row gutter={[32, 32]} className={styles.statsGrid}>
            {statItems.map((stat, index) => (
              <Col xs={24} sm={12} md={12} lg={6} xl={6} key={index}>
                <Card className={styles.statCard}>
                  <div className={styles.statContent}>
                    <div className={styles.statHeader}>
                      <div
                        className={styles.statIcon}
                        style={{ background: stat.iconBg }}
                      >
                        {stat.icon}
                      </div>
                      <div
                        className={styles.statTrend}
                        style={{
                          background: stat.trend.isPositive
                            ? "rgba(16, 185, 129, 0.15)"
                            : "rgba(239, 68, 68, 0.15)",
                          color: stat.trend.isPositive ? "#10B981" : "#EF4444",
                          borderColor: stat.trend.isPositive
                            ? "rgba(16, 185, 129, 0.3)"
                            : "rgba(239, 68, 68, 0.3)",
                        }}
                      >
                        {stat.trend.isPositive ? (
                          <RiseOutlined />
                        ) : (
                          <RiseOutlined
                            style={{ transform: "rotate(180deg)" }}
                          />
                        )}
                        <span>{stat.trend.value}%</span>
                      </div>
                    </div>
                    <div className={styles.statBody}>
                      <div
                        className={styles.statValue}
                        style={{ color: stat.color }}
                      >
                        {stat.value.toLocaleString()}
                      </div>
                      <div className={styles.statLabel}>{stat.title}</div>
                    </div>
                  </div>
                  <div
                    className={styles.statBackground}
                    style={{ background: stat.bgColor }}
                  />
                </Card>
              </Col>
            ))}
          </Row>
        </Spin>
      </div>

      {/* Subscription Plans */}
      <div className={styles.subscriptionPlans}>
        <h2 className={styles.plansTitle}>Subscription Plans</h2>
        <Spin spinning={subscriptionPlansLoading || false}>
          <Row gutter={16}>
            {(subscriptionPlans || []).map((plan) => (
              <Col xs={24} sm={12} md={6} key={plan.id}>
                <Card className={styles.planCard}>
                  <div className={styles.planName}>{plan.name}</div>
                  <div className={styles.planPrice}>${plan.price}</div>
                  <div className={styles.planPeriod}>/ month</div>
                  <div className={styles.planUsers}>
                    {plan.subscriptionsCount || 0} Users
                  </div>
                </Card>
              </Col>
            ))}

            {/* Expiring Users Card */}
            <Col xs={24} sm={24} md={12} lg={8}>
              <Card className={styles.expiredUsers}>
                <div className={styles.expiredTitle}>
                  <div className={styles.expiredIcon}>💰</div>
                  <div className={styles.expiredContent}>
                    <div className={styles.expiredText}>
                      {subscriptionStats?.expiring_today || 0} subscriptions
                      expired today!
                    </div>
                    <div className={styles.expiredCount}>
                      {subscriptionStats?.expiring_this_month || 0}
                    </div>
                  </div>
                </div>
                <div className={styles.expiredSubtitle}>Expires in a month</div>
                <Spin spinning={expiringUsersLoading || false}>
                  <div className={styles.expiredUsersList}>
                    {(expiringUsers || []).slice(0, 6).map((user, index) => (
                      <div
                        key={user.id || index}
                        className={styles.expiredUser}
                      >
                        <div className={styles.expiredUserInfo}>
                          <div className={styles.expiredUserName}>
                            {user.name}
                          </div>
                          <div className={styles.expiredUserPlan}>
                            {user.subscription?.plan?.name || "Basic"}
                          </div>
                        </div>
                        <div className={styles.expiredUserDays}>
                          {user.subscription?.expiresAt
                            ? `${Math.ceil(
                                (new Date(
                                  user.subscription.expiresAt
                                ).getTime() -
                                  new Date().getTime()) /
                                  (1000 * 60 * 60 * 24)
                              )} days`
                            : "Unknown"}
                        </div>
                      </div>
                    ))}
                    {(!expiringUsers || expiringUsers.length === 0) &&
                      !expiringUsersLoading && (
                        <div className={styles.noExpiringUsers}>
                          No subscriptions expiring soon
                        </div>
                      )}
                  </div>
                </Spin>
                <div className={styles.viewAllBtn}>
                  <span>View all</span>
                  <DownOutlined />
                </div>
              </Card>
            </Col>
          </Row>
        </Spin>
      </div>

      {/* Users Table */}
      <div className={styles.usersSection}>
        <div className={styles.usersHeader}>
          <h2 className={styles.usersTitle}>All Users</h2>
          <div className={styles.usersActions}>
            <Search
              placeholder="Search User"
              allowClear
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              onSearch={handleSearch}
              className={styles.searchInput}
            />
            <Select
              placeholder="Status"
              allowClear
              onChange={(value) => handleFilterChange("isActive", value)}
              style={{ width: 120 }}
            >
              <Option value={true}>Active</Option>
              <Option value={false}>Inactive</Option>
            </Select>
            <Select
              placeholder="Role"
              allowClear
              onChange={(value) => handleFilterChange("role", value)}
              style={{ width: 120 }}
            >
              <Option value="user">User</Option>
              <Option value="admin">Admin</Option>
              <Option value="super_admin">Super Admin</Option>
            </Select>
          </div>
        </div>

        <Table
          columns={columns}
          dataSource={users || []}
          rowKey="id"
          loading={usersLoading || false}
          pagination={false}
          className={styles.usersTable}
          rowClassName={styles.userRow}
        />

        <div className={styles.pagination}>
          <div className={styles.paginationInfo}>
            Showing{" "}
            {((usersPagination?.current || 1) - 1) *
              (usersPagination?.pageSize || 10) +
              1}{" "}
            to{" "}
            {Math.min(
              (usersPagination?.current || 1) *
                (usersPagination?.pageSize || 10),
              usersPagination?.total || 0
            )}{" "}
            of {usersPagination?.total || 0} entries
          </div>
          <Pagination
            current={usersPagination?.current || 1}
            total={usersPagination?.total || 0}
            pageSize={usersPagination?.pageSize || 10}
            onChange={handlePageChange}
            showSizeChanger
            showQuickJumper
            pageSizeOptions={["10", "20", "50", "100"]}
          />
        </div>
      </div>

      {/* User Detail Modal */}
      <UserDetailModal
        visible={userDetailModalVisible || false}
        user={selectedUser}
        loading={selectedUserLoading || false}
        onClose={() => dispatch(setUserDetailModalVisible(false))}
        onEdit={handleEditUser}
        onDelete={handleDeleteUser}
        onActivate={handleActivateUser}
        onDeactivate={handleDeactivateUser}
      />

      {/* Edit User Modal */}
      <EditUserModal
        visible={editUserModalVisible || false}
        user={selectedUser}
        onClose={() => dispatch(setEditUserModalVisible(false))}
        onSubmit={handleUpdateUser}
      />
    </div>
  );
};

export default ManageUserPage;
