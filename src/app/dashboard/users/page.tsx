"use client";

import React, { useEffect, useState } from "react";
import {
  Card,
  Table,
  Button,
  Space,
  Input,
  Select,
  Tag,
  Modal,
  Form,
  message,
  Popconfirm,
  Row,
  Col,
  Statistic,
} from "antd";
import {
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  EyeOutlined,
  UserOutlined,
  SearchOutlined,
  ReloadOutlined,
} from "@ant-design/icons";
import { useAdmin } from "@/stores/hooks/useAdmin";
import AdminLayout from "@/components/layout/AdminLayout";
import type { User, UpdateUserData } from "@/services/admin.service";

const { Search } = Input;
const { Option } = Select;

const UsersManagement = () => {
  const {
    users,
    usersLoading,
    usersPagination,
    selectedUser,
    operationLoading,
    fetchUsers,
    fetchUserById,
    updateUser,
    deleteUser,
    activateUser,
    deactivateUser,
    clearSelectedUser,
  } = useAdmin();

  const [searchTerm, setSearchTerm] = useState("");
  const [roleFilter, setRoleFilter] = useState<string>("");
  const [statusFilter, setStatusFilter] = useState<boolean | undefined>(
    undefined
  );
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [viewModalVisible, setViewModalVisible] = useState(false);
  const [form] = Form.useForm();

  useEffect(() => {
    fetchUsers({ page: 1, limit: 10 });
  }, []);

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      sorter: true,
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      sorter: true,
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
        return (
          <Tag color={colors[role as keyof typeof colors]}>
            {role.replace("_", " ").toUpperCase()}
          </Tag>
        );
      },
      filters: [
        { text: "Super Admin", value: "super_admin" },
        { text: "Admin", value: "admin" },
        { text: "User", value: "user" },
      ],
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
      filters: [
        { text: "Active", value: true },
        { text: "Inactive", value: false },
      ],
    },
    {
      title: "Created At",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (date: string) => new Date(date).toLocaleDateString(),
      sorter: true,
    },
    {
      title: "Actions",
      key: "actions",
      fixed: "right" as const,
      width: 200,
      render: (_: any, record: User) => (
        <Space size="small">
          <Button
            type="link"
            icon={<EyeOutlined />}
            size="small"
            onClick={() => handleViewUser(record.id)}
          >
            View
          </Button>
          <Button
            type="link"
            icon={<EditOutlined />}
            size="small"
            onClick={() => handleEditUser(record)}
          >
            Edit
          </Button>
          {record.isActive ? (
            <Button
              type="link"
              danger
              size="small"
              onClick={() => deactivateUser(record.id)}
              loading={operationLoading}
            >
              Deactivate
            </Button>
          ) : (
            <Button
              type="link"
              size="small"
              onClick={() => activateUser(record.id)}
              loading={operationLoading}
            >
              Activate
            </Button>
          )}
          <Popconfirm
            title="Are you sure you want to delete this user?"
            onConfirm={() => handleDeleteUser(record.id)}
            okText="Yes"
            cancelText="No"
          >
            <Button
              type="link"
              danger
              icon={<DeleteOutlined />}
              size="small"
              loading={operationLoading}
            >
              Delete
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  const handleSearch = (value: string) => {
    setSearchTerm(value);
    fetchUsers({
      page: 1,
      limit: usersPagination.limit,
      search: value,
      role: roleFilter || undefined,
      isActive: statusFilter,
    });
  };

  const handleRoleFilterChange = (value: string) => {
    setRoleFilter(value);
    fetchUsers({
      page: 1,
      limit: usersPagination.limit,
      search: searchTerm || undefined,
      role: value || undefined,
      isActive: statusFilter,
    });
  };

  const handleStatusFilterChange = (value: boolean | undefined) => {
    setStatusFilter(value);
    fetchUsers({
      page: 1,
      limit: usersPagination.limit,
      search: searchTerm || undefined,
      role: roleFilter || undefined,
      isActive: value,
    });
  };

  const handleTableChange = (pagination: any, filters: any, sorter: any) => {
    fetchUsers({
      page: pagination.current,
      limit: pagination.pageSize,
      search: searchTerm || undefined,
      role: roleFilter || undefined,
      isActive: statusFilter,
    });
  };

  const handleViewUser = (userId: string) => {
    fetchUserById(userId);
    setViewModalVisible(true);
  };

  const handleEditUser = (user: User) => {
    form.setFieldsValue({
      name: user.name,
      email: user.email,
      role: user.role,
      isActive: user.isActive,
    });
    fetchUserById(user.id);
    setEditModalVisible(true);
  };

  const handleUpdateUser = async (values: UpdateUserData) => {
    if (!selectedUser) return;

    try {
      await updateUser(selectedUser.id, values);
      message.success("User updated successfully!");
      setEditModalVisible(false);
      form.resetFields();
      clearSelectedUser();
      // Refresh the users list
      fetchUsers({
        page: usersPagination.page,
        limit: usersPagination.limit,
      });
    } catch (error) {
      message.error("Failed to update user");
    }
  };

  const handleDeleteUser = async (userId: string) => {
    try {
      await deleteUser(userId);
      message.success("User deleted successfully!");
      // Refresh the users list
      fetchUsers({
        page: usersPagination.page,
        limit: usersPagination.limit,
      });
    } catch (error) {
      message.error("Failed to delete user");
    }
  };

  const handleRefresh = () => {
    fetchUsers({
      page: usersPagination.page,
      limit: usersPagination.limit,
    });
  };

  return (
    <AdminLayout>
      <div>
        {/* Summary Stats */}
        <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
          <Col xs={24} sm={8}>
            <Card>
              <Statistic
                title="Total Users"
                value={usersPagination.total}
                prefix={<UserOutlined />}
              />
            </Card>
          </Col>
          <Col xs={24} sm={8}>
            <Card>
              <Statistic
                title="Active Users"
                value={users.filter((u) => u.isActive).length}
                prefix={<UserOutlined />}
                valueStyle={{ color: "#3f8600" }}
              />
            </Card>
          </Col>
          <Col xs={24} sm={8}>
            <Card>
              <Statistic
                title="Inactive Users"
                value={users.filter((u) => !u.isActive).length}
                prefix={<UserOutlined />}
                valueStyle={{ color: "#cf1322" }}
              />
            </Card>
          </Col>
        </Row>

        {/* Users Table */}
        <Card
          title="Users Management"
          extra={
            <Space>
              <Search
                placeholder="Search users..."
                allowClear
                onSearch={handleSearch}
                style={{ width: 250 }}
              />
              <Select
                placeholder="Filter by role"
                allowClear
                style={{ width: 150 }}
                onChange={handleRoleFilterChange}
              >
                <Option value="super_admin">Super Admin</Option>
                <Option value="admin">Admin</Option>
                <Option value="user">User</Option>
              </Select>
              <Select
                placeholder="Filter by status"
                allowClear
                style={{ width: 150 }}
                onChange={handleStatusFilterChange}
              >
                <Option value={true}>Active</Option>
                <Option value={false}>Inactive</Option>
              </Select>
              <Button
                icon={<ReloadOutlined />}
                onClick={handleRefresh}
                loading={usersLoading}
              >
                Refresh
              </Button>
            </Space>
          }
        >
          <Table
            columns={columns}
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
            onChange={handleTableChange}
            scroll={{ x: 1000 }}
          />
        </Card>

        {/* View User Modal */}
        <Modal
          title="User Details"
          open={viewModalVisible}
          onCancel={() => {
            setViewModalVisible(false);
            clearSelectedUser();
          }}
          footer={[
            <Button key="close" onClick={() => setViewModalVisible(false)}>
              Close
            </Button>,
          ]}
          width={600}
        >
          {selectedUser && (
            <div>
              <Row gutter={[16, 16]}>
                <Col span={12}>
                  <strong>Name:</strong> {selectedUser.name}
                </Col>
                <Col span={12}>
                  <strong>Email:</strong> {selectedUser.email}
                </Col>
                <Col span={12}>
                  <strong>Role:</strong>{" "}
                  <Tag color="blue">{selectedUser.role}</Tag>
                </Col>
                <Col span={12}>
                  <strong>Status:</strong>
                  <Tag color={selectedUser.isActive ? "green" : "red"}>
                    {selectedUser.isActive ? "Active" : "Inactive"}
                  </Tag>
                </Col>
                <Col span={12}>
                  <strong>Created At:</strong>{" "}
                  {new Date(selectedUser.createdAt).toLocaleString()}
                </Col>
                <Col span={12}>
                  <strong>Updated At:</strong>{" "}
                  {new Date(selectedUser.updatedAt).toLocaleString()}
                </Col>
              </Row>
            </div>
          )}
        </Modal>

        {/* Edit User Modal */}
        <Modal
          title="Edit User"
          open={editModalVisible}
          onCancel={() => {
            setEditModalVisible(false);
            form.resetFields();
            clearSelectedUser();
          }}
          footer={null}
          width={600}
        >
          <Form form={form} layout="vertical" onFinish={handleUpdateUser}>
            <Form.Item
              name="name"
              label="Name"
              rules={[{ required: true, message: "Please input user name!" }]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              name="email"
              label="Email"
              rules={[
                { required: true, message: "Please input email!" },
                { type: "email", message: "Please enter a valid email!" },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              name="role"
              label="Role"
              rules={[{ required: true, message: "Please select role!" }]}
            >
              <Select>
                <Option value="user">User</Option>
                <Option value="admin">Admin</Option>
                <Option value="super_admin">Super Admin</Option>
              </Select>
            </Form.Item>

            <Form.Item
              name="isActive"
              label="Status"
              rules={[{ required: true, message: "Please select status!" }]}
            >
              <Select>
                <Option value={true}>Active</Option>
                <Option value={false}>Inactive</Option>
              </Select>
            </Form.Item>

            <Form.Item>
              <Space>
                <Button
                  type="primary"
                  htmlType="submit"
                  loading={operationLoading}
                >
                  Update User
                </Button>
                <Button
                  onClick={() => {
                    setEditModalVisible(false);
                    form.resetFields();
                    clearSelectedUser();
                  }}
                >
                  Cancel
                </Button>
              </Space>
            </Form.Item>
          </Form>
        </Modal>
      </div>
    </AdminLayout>
  );
};

export default UsersManagement;
