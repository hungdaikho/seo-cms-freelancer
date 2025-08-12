"use client";

import React, { useEffect } from "react";
import {
  Row,
  Col,
  Card,
  Statistic,
  Table,
  Tag,
  Button,
  Space,
  Input,
} from "antd";
import {
  UserOutlined,
  CrownOutlined,
  DollarCircleOutlined,
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  EyeOutlined,
} from "@ant-design/icons";
import { useAdmin } from "@/stores/hooks/useAdmin";
import AdminLayout from "@/components/layout/AdminLayout";

const { Search } = Input;
const AdminDashboard = () => {
  const {
    dashboardStats,
    dashboardLoading,
    users,
    usersLoading,
    usersPagination,
    subscriptionPlans,
    fetchDashboardStats,
    fetchUsers,
    fetchSubscriptionPlans,
    deleteUser,
  } = useAdmin();

  useEffect(() => {
    fetchDashboardStats();
    fetchUsers({ page: 1, limit: 10 });
    fetchSubscriptionPlans();
  }, []);

  // Columns for users table
  const userColumns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Role",
      dataIndex: "role",
      key: "role",
      render: (role: string) => {
        const colors = {
          super_admin: "red",
          admin: "orange",
          user: "blue",
        };
        return <Tag color={colors[role as keyof typeof colors]}>{role}</Tag>;
      },
    },
    {
      title: "Status",
      dataIndex: "isActive",
      key: "isActive",
      render: (isActive: boolean) => (
        <Tag color={isActive ? "green" : "red"}>
          {isActive ? "Active" : "Inactive"}
        </Tag>
      ),
    },
    {
      title: "Created At",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (date: string) => new Date(date).toLocaleDateString(),
    },
    {
      title: "Actions",
      key: "actions",
      render: (_: any, record: any) => (
        <Space size="middle">
          <Button
            type="link"
            icon={<EyeOutlined />}
            size="small"
            onClick={() => console.log("View user:", record.id)}
          >
            View
          </Button>
          <Button
            type="link"
            icon={<EditOutlined />}
            size="small"
            onClick={() => console.log("Edit user:", record.id)}
          >
            Edit
          </Button>
          <Button
            type="link"
            danger
            icon={<DeleteOutlined />}
            size="small"
            onClick={() => deleteUser(record.id)}
          >
            Delete
          </Button>
        </Space>
      ),
    },
  ];

  // Columns for subscription plans table
  const planColumns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      render: (price: number) => `$${price}/month`,
    },
    {
      title: "Yearly Price",
      dataIndex: "yearlyPrice",
      key: "yearlyPrice",
      render: (price: number) => `$${price}/year`,
    },
    {
      title: "Projects",
      dataIndex: ["features", "projects"],
      key: "projects",
    },
    {
      title: "Keywords",
      dataIndex: ["features", "keywords"],
      key: "keywords",
    },
    {
      title: "Status",
      dataIndex: "isActive",
      key: "isActive",
      render: (isActive: boolean) => (
        <Tag color={isActive ? "green" : "red"}>
          {isActive ? "Active" : "Inactive"}
        </Tag>
      ),
    },
    {
      title: "Actions",
      key: "actions",
      render: (_: any, record: any) => (
        <Space size="middle">
          <Button
            type="link"
            icon={<EditOutlined />}
            size="small"
            onClick={() => console.log("Edit plan:", record.id)}
          >
            Edit
          </Button>
          <Button
            type="link"
            danger
            icon={<DeleteOutlined />}
            size="small"
            onClick={() => console.log("Delete plan:", record.id)}
          >
            Delete
          </Button>
        </Space>
      ),
    },
  ];

  const handleUsersSearch = (value: string) => {
    fetchUsers({ page: 1, limit: 10, search: value });
  };

  const handleUsersTableChange = (pagination: any) => {
    fetchUsers({
      page: pagination.current,
      limit: pagination.pageSize,
    });
  };

  return (
    <AdminLayout>
      <div>
        {/* Dashboard Stats */}
        <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
          <Col xs={24} sm={12} lg={6}>
            <Card>
              <Statistic
                title="Total Users"
                value={dashboardStats?.totalUsers || 0}
                prefix={<UserOutlined />}
                loading={dashboardLoading}
              />
            </Card>
          </Col>
          <Col xs={24} sm={12} lg={6}>
            <Card>
              <Statistic
                title="Active Users"
                value={dashboardStats?.activeUsers || 0}
                prefix={<UserOutlined />}
                valueStyle={{ color: "#3f8600" }}
                loading={dashboardLoading}
              />
            </Card>
          </Col>
          <Col xs={24} sm={12} lg={6}>
            <Card>
              <Statistic
                title="Active Subscriptions"
                value={dashboardStats?.activeSubscriptions || 0}
                prefix={<CrownOutlined />}
                valueStyle={{ color: "#1677ff" }}
                loading={dashboardLoading}
              />
            </Card>
          </Col>
          <Col xs={24} sm={12} lg={6}>
            <Card>
              <Statistic
                title="Monthly Revenue"
                value={dashboardStats?.monthlyRevenue || 0}
                prefix={<DollarCircleOutlined />}
                precision={2}
                valueStyle={{ color: "#cf1322" }}
                loading={dashboardLoading}
              />
            </Card>
          </Col>
        </Row>

        {/* Users Management */}
        <Card
          title="Recent Users"
          extra={
            <Space>
              <Search
                placeholder="Search users..."
                allowClear
                onSearch={handleUsersSearch}
                style={{ width: 250 }}
              />
              <Button type="primary" icon={<PlusOutlined />}>
                Add User
              </Button>
            </Space>
          }
          style={{ marginBottom: 24 }}
        >
          <Table
            columns={userColumns}
            dataSource={users}
            loading={usersLoading}
            rowKey="id"
            pagination={{
              current: usersPagination.page,
              pageSize: usersPagination.limit,
              total: usersPagination.total,
              showSizeChanger: true,
              showQuickJumper: true,
              showTotal: (total, range) =>
                `${range[0]}-${range[1]} of ${total} users`,
            }}
            onChange={handleUsersTableChange}
            scroll={{ x: 800 }}
          />
        </Card>

        {/* Subscription Plans */}
        <Card
          title="Subscription Plans"
          extra={
            <Button type="primary" icon={<PlusOutlined />}>
              Add Plan
            </Button>
          }
        >
          <Table
            columns={planColumns}
            dataSource={subscriptionPlans}
            rowKey="id"
            pagination={false}
            scroll={{ x: 800 }}
          />
        </Card>
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;
