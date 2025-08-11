import React, { useState, useEffect } from "react";
import {
  Modal,
  Tabs,
  Form,
  Input,
  Button,
  Card,
  Progress,
  Table,
  Space,
  Popconfirm,
  message,
  Select,
  Row,
  Col,
  Typography,
  Alert,
  Upload,
  Avatar,
} from "antd";
import {
  UserOutlined,
  LockOutlined,
  MobileOutlined,
  DownloadOutlined,
  DeleteOutlined,
  ExclamationCircleOutlined,
  LogoutOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import { useUserManager } from "@/stores/hooks/useUserManager";
import {
  UpdateProfileRequest,
  ChangePasswordRequest,
  SessionInfo,
} from "@/types/user-manager.type";
import type { TabsProps, UploadProps } from "antd";
import styles from "./UserManagerModal.module.scss";

const { Title, Text, Paragraph } = Typography;
const { TextArea } = Input;
const { Option } = Select;

interface UserManagerModalProps {
  open: boolean;
  onCancel: () => void;
}

const UserManagerModal: React.FC<UserManagerModalProps> = ({
  open,
  onCancel,
}) => {
  const {
    profile,
    usage,
    sessions,
    exportData,
    loading,
    error,
    getUserProfile,
    updateProfile,
    getUsage,
    changePassword,
    getSessions,
    revokeSession,
    revokeAllOtherSessions,
    exportUserData,
    deactivateAccount,
    deleteAccount,
    clearError,
    clearExportData,
  } = useUserManager();

  const [profileForm] = Form.useForm();
  const [passwordForm] = Form.useForm();
  const [deactivateForm] = Form.useForm();
  const [deleteForm] = Form.useForm();

  const [activeTab, setActiveTab] = useState("profile");

  useEffect(() => {
    if (open) {
      getUserProfile();
      getUsage();
      getSessions();
      // Reset active tab to profile when modal opens
      setActiveTab("profile");
    }
  }, [open]);
  useEffect(() => {
    if (profile) {
      // Fill all profile fields except password fields
      // Explicitly exclude any password-related fields for security
      const profileData = {
        name: profile.name || "",
        email: profile.email || "",
        phone: profile.phone || "",
        timezone: profile.timezone || "",
        avatarUrl: profile.avatarUrl || "",
      };

      // Ensure no password fields are included
      const sanitizedData = Object.fromEntries(
        Object.entries(profileData).filter(
          ([key]) => !key.toLowerCase().includes("password")
        )
      );

      profileForm.setFieldsValue(sanitizedData);
    }
  }, [profile, profileForm]);

  // Reset password forms when modal opens to ensure no password fields are pre-filled
  useEffect(() => {
    if (open) {
      passwordForm.resetFields();
      deactivateForm.resetFields();
      deleteForm.resetFields();
    } else {
      // Reset all forms when modal closes
      profileForm.resetFields();
      passwordForm.resetFields();
      deactivateForm.resetFields();
      deleteForm.resetFields();
    }
  }, [open, passwordForm, deactivateForm, deleteForm, profileForm]);

  useEffect(() => {
    if (error) {
      message.error(error);
      clearError();
    }
  }, [error]);

  const handleUpdateProfile = async (values: UpdateProfileRequest) => {
    try {
      await updateProfile(values);
      message.success("Profile updated successfully");
    } catch (error) {
      // Error handled by useEffect
    }
  };

  const handleChangePassword = async (values: ChangePasswordRequest) => {
    try {
      await changePassword(values);
      message.success("Password changed successfully");
      passwordForm.resetFields();
    } catch (error) {
      // Error handled by useEffect
    }
  };

  const handleRevokeSession = async (sessionId: string) => {
    try {
      await revokeSession(sessionId);
      message.success("Session revoked successfully");
    } catch (error) {
      // Error handled by useEffect
    }
  };

  const handleRevokeAllSessions = async () => {
    try {
      await revokeAllOtherSessions();
      message.success("All other sessions revoked successfully");
    } catch (error) {
      // Error handled by useEffect
    }
  };

  const handleDeactivateAccount = async (values: {
    reason: string;
    password: string;
  }) => {
    try {
      await deactivateAccount(values);
      message.success("Account deactivated successfully");
      onCancel();
    } catch (error) {
      // Error handled by useEffect
    }
  };

  const handleDeleteAccount = async (values: {
    password: string;
    confirmation: string;
    reason?: string;
  }) => {
    try {
      await deleteAccount(values);
      message.success("Account deletion requested successfully");
      onCancel();
      // Clear auth data and redirect to login
      localStorage.removeItem("accessToken");
      window.location.reload();
    } catch (error) {
      // Error handled by useEffect
    }
  };

  const profileTabContent = (
    <Row gutter={[24, 24]}>
      <Col span={24}>
        <Card title="Personal Information" loading={loading.profile}>
          <Form
            form={profileForm}
            layout="vertical"
            onFinish={handleUpdateProfile}
          >
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item
                  name="name"
                  label="Full Name"
                  rules={[
                    { required: true, message: "Please enter your name" },
                  ]}
                >
                  <Input
                    prefix={<UserOutlined />}
                    placeholder="Enter your full name"
                  />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  name="email"
                  label="Email"
                  rules={[
                    { required: true, message: "Please enter your email" },
                    { type: "email", message: "Please enter a valid email" },
                  ]}
                >
                  <Input
                    prefix={<UserOutlined />}
                    placeholder="Enter your email"
                  />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item name="phone" label="Phone Number">
                  <Input
                    prefix={<MobileOutlined />}
                    placeholder="Enter your phone number"
                  />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item name="timezone" label="Timezone">
                  <Select placeholder="Select your timezone">
                    <Option value="UTC">UTC</Option>
                    <Option value="Asia/Ho_Chi_Minh">Asia/Ho Chi Minh</Option>
                    <Option value="America/New_York">America/New York</Option>
                    <Option value="Europe/London">Europe/London</Option>
                  </Select>
                </Form.Item>
              </Col>
            </Row>
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                loading={loading.profile}
              >
                Update Profile
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </Col>
      <Col span={24}>
        <Card title="Usage & Subscription" loading={loading.usage}>
          {profile?.subscription ? (
            <div>
              <Row gutter={[16, 16]}>
                <Col span={12}>
                  <Card size="small" title="Keywords">
                    <Progress
                      percent={
                        usage?.subscription?.usage?.keywords
                          ? Math.round(
                              (usage.subscription.usage.keywords.used /
                                usage.subscription.usage.keywords.limit) *
                                100
                            )
                          : 0
                      }
                      format={() =>
                        usage?.subscription?.usage?.keywords
                          ? `${usage.subscription.usage.keywords.used} / ${usage.subscription.usage.keywords.limit}`
                          : "0 / 0"
                      }
                    />
                  </Card>
                </Col>
                <Col span={12}>
                  <Card size="small" title="Competitors">
                    <Progress
                      percent={
                        usage?.subscription?.usage?.competitors
                          ? Math.round(
                              (usage.subscription.usage.competitors.used /
                                usage.subscription.usage.competitors.limit) *
                                100
                            )
                          : 0
                      }
                      format={() =>
                        usage?.subscription?.usage?.competitors
                          ? `${usage.subscription.usage.competitors.used} / ${usage.subscription.usage.competitors.limit}`
                          : "0 / 0"
                      }
                    />
                  </Card>
                </Col>
                <Col span={12}>
                  <Card size="small" title="Projects">
                    <Progress
                      percent={
                        usage?.subscription?.usage?.projects
                          ? Math.round(
                              (usage.subscription.usage.projects.used /
                                usage.subscription.usage.projects.limit) *
                                100
                            )
                          : 0
                      }
                      format={() =>
                        usage?.subscription?.usage?.projects
                          ? `${usage.subscription.usage.projects.used} / ${usage.subscription.usage.projects.limit}`
                          : "0 / 0"
                      }
                    />
                  </Card>
                </Col>
                <Col span={12}>
                  <Card size="small" title="Audits">
                    <Progress
                      percent={
                        usage?.subscription?.usage?.audits
                          ? Math.round(
                              (usage.subscription.usage.audits.used /
                                usage.subscription.usage.audits.limit) *
                                100
                            )
                          : 0
                      }
                      format={() =>
                        usage?.subscription?.usage?.audits
                          ? `${usage.subscription.usage.audits.used} / ${usage.subscription.usage.audits.limit}`
                          : "0 / 0"
                      }
                    />
                  </Card>
                </Col>
              </Row>
              <div style={{ marginTop: 16 }}>
                <Text>
                  Plan:{" "}
                  <strong>{profile.subscription?.planType || "No Plan"}</strong>
                </Text>
                <br />
                <Text>
                  Status:{" "}
                  <strong>{profile.subscription?.status || "Inactive"}</strong>
                </Text>
                <br />
                {usage?.subscription?.resetDate && (
                  <Text>
                    Reset Date:{" "}
                    <strong>
                      {new Date(
                        usage.subscription.resetDate
                      ).toLocaleDateString()}
                    </strong>
                  </Text>
                )}
              </div>
            </div>
          ) : (
            <Alert
              message="No Subscription"
              description="You don't have an active subscription. Contact support to get started."
              type="info"
              showIcon
            />
          )}
        </Card>
      </Col>
    </Row>
  );

  const securityTabContent = (
    <Row gutter={[24, 24]}>
      <Col span={24}>
        <Card title="Change Password">
          <Form
            form={passwordForm}
            layout="vertical"
            onFinish={handleChangePassword}
          >
            <Form.Item
              name="currentPassword"
              label="Current Password"
              rules={[
                {
                  required: true,
                  message: "Please enter your current password",
                },
              ]}
            >
              <Input.Password
                prefix={<LockOutlined />}
                placeholder="Enter current password"
              />
            </Form.Item>
            <Form.Item
              name="newPassword"
              label="New Password"
              rules={[
                { required: true, message: "Please enter new password" },
                { min: 6, message: "Password must be at least 6 characters" },
              ]}
            >
              <Input.Password
                prefix={<LockOutlined />}
                placeholder="Enter new password"
              />
            </Form.Item>
            <Form.Item
              name="confirmPassword"
              label="Confirm Password"
              dependencies={["newPassword"]}
              rules={[
                { required: true, message: "Please confirm your new password" },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue("newPassword") === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(new Error("Passwords do not match"));
                  },
                }),
              ]}
            >
              <Input.Password
                prefix={<LockOutlined />}
                placeholder="Confirm new password"
              />
            </Form.Item>
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                loading={loading.changePassword}
              >
                Change Password
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </Col>
      <Col span={24}>
        <Card
          title="Active Sessions"
          loading={loading.sessions}
          extra={
            <Button
              danger
              onClick={handleRevokeAllSessions}
              icon={<LogoutOutlined />}
            >
              Revoke All Other Sessions
            </Button>
          }
        >
          <Table
            dataSource={Array.isArray(sessions) ? sessions : []}
            columns={[
              {
                title: "Device",
                dataIndex: "deviceInfo",
                key: "deviceInfo",
              },
              {
                title: "Location",
                dataIndex: "location",
                key: "location",
              },
              {
                title: "Last Active",
                dataIndex: "lastActive",
                key: "lastActive",
                render: (date: string) => new Date(date).toLocaleString(),
              },
              {
                title: "Status",
                dataIndex: "isCurrent",
                key: "isCurrent",
                render: (isCurrent: boolean) => (
                  <span style={{ color: isCurrent ? "green" : "gray" }}>
                    {isCurrent ? "Current" : "Active"}
                  </span>
                ),
              },
              {
                title: "Action",
                key: "action",
                render: (_, record: SessionInfo) =>
                  !record.isCurrent && (
                    <Popconfirm
                      title="Are you sure to revoke this session?"
                      onConfirm={() => handleRevokeSession(record.id)}
                    >
                      <Button danger size="small" icon={<LogoutOutlined />}>
                        Revoke
                      </Button>
                    </Popconfirm>
                  ),
              },
            ]}
            pagination={false}
            rowKey="id"
          />
        </Card>
      </Col>
    </Row>
  );

  const dangerTabContent = (
    <Row gutter={[24, 24]}>
      <Col span={24}>
        <Card title="Deactivate Account" type="inner">
          <Alert
            message="Account Deactivation"
            description="Deactivating your account will temporarily disable access while preserving your data. You can reactivate within 30 days."
            type="warning"
            style={{ marginBottom: 16 }}
          />
          <Form
            form={deactivateForm}
            layout="vertical"
            onFinish={handleDeactivateAccount}
          >
            <Form.Item
              name="reason"
              label="Reason for deactivation"
              rules={[{ required: true, message: "Please provide a reason" }]}
            >
              <TextArea
                placeholder="Tell us why you're deactivating your account"
                rows={3}
              />
            </Form.Item>
            <Form.Item
              name="password"
              label="Confirm with your password"
              rules={[
                { required: true, message: "Please enter your password" },
              ]}
            >
              <Input.Password placeholder="Enter your password" />
            </Form.Item>
            <Form.Item>
              <Button
                danger
                htmlType="submit"
                loading={loading.deactivate}
                icon={<ExclamationCircleOutlined />}
              >
                Deactivate Account
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </Col>
      <Col span={24}>
        <Card title="Delete Account Permanently" type="inner">
          <Alert
            message="Permanent Account Deletion"
            description="This action cannot be undone. All your data will be permanently deleted within 30 days."
            type="error"
            style={{ marginBottom: 16 }}
          />
          <Form
            form={deleteForm}
            layout="vertical"
            onFinish={handleDeleteAccount}
          >
            <Form.Item name="reason" label="Reason for deletion (optional)">
              <TextArea
                placeholder="Tell us why you're deleting your account"
                rows={3}
              />
            </Form.Item>
            <Form.Item
              name="confirmation"
              label="Type 'DELETE' to confirm"
              rules={[
                { required: true, message: "Please type DELETE to confirm" },
                {
                  validator: (_, value) => {
                    if (value === "DELETE") {
                      return Promise.resolve();
                    }
                    return Promise.reject(
                      new Error("Please type DELETE exactly")
                    );
                  },
                },
              ]}
            >
              <Input placeholder="Type DELETE" />
            </Form.Item>
            <Form.Item
              name="password"
              label="Confirm with your password"
              rules={[
                { required: true, message: "Please enter your password" },
              ]}
            >
              <Input.Password placeholder="Enter your password" />
            </Form.Item>
            <Form.Item>
              <Button
                danger
                htmlType="submit"
                loading={loading.delete}
                icon={<DeleteOutlined />}
              >
                Delete Account Permanently
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </Col>
    </Row>
  );

  const tabItems: TabsProps["items"] = [
    {
      key: "profile",
      label: "Profile & Usage",
      children: profileTabContent,
      icon: <UserOutlined />,
    },
    {
      key: "security",
      label: "Security",
      children: securityTabContent,
      icon: <LockOutlined />,
    },
    {
      key: "danger",
      label: "Danger Zone",
      children: dangerTabContent,
      icon: <ExclamationCircleOutlined />,
    },
  ];

  return (
    <Modal
      title="Manage User Account"
      open={open}
      onCancel={onCancel}
      footer={null}
      width={800}
      destroyOnClose
    >
      <Tabs
        activeKey={activeTab}
        onChange={setActiveTab}
        items={tabItems}
        type="card"
        className={styles.userManagerTabs}
      />
    </Modal>
  );
};

export default UserManagerModal;
