"use client";

import React, { useState, useEffect } from "react";
import {
  Card,
  Button,
  Form,
  Input,
  message,
  Row,
  Col,
  Typography,
  Space,
  Divider,
} from "antd";
import {
  SettingOutlined,
  LockOutlined,
  MailOutlined,
  EyeInvisibleOutlined,
  EyeTwoTone,
} from "@ant-design/icons";
import AdminLayout from "@/components/layout/AdminLayout";
import { adminService, User } from "@/services/admin.service";

const { Title, Text } = Typography;

interface PasswordFormData {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

interface EmailFormData {
  email: string;
  password: string;
}

const AdminSettings = () => {
  const [passwordForm] = Form.useForm<PasswordFormData>();
  const [emailForm] = Form.useForm<EmailFormData>();
  const [passwordLoading, setPasswordLoading] = useState(false);
  const [emailLoading, setEmailLoading] = useState(false);
  const [adminProfile, setAdminProfile] = useState<User | null>(null);
  const [profileLoading, setProfileLoading] = useState(true);

  useEffect(() => {
    loadAdminProfile();
  }, []);

  const loadAdminProfile = async () => {
    try {
      setProfileLoading(true);
      const profile = await adminService.getAdminProfile();
      setAdminProfile(profile);
      emailForm.setFieldsValue({ email: profile.email });
    } catch (error) {
      message.error("Failed to load admin profile");
    } finally {
      setProfileLoading(false);
    }
  };

  const handlePasswordChange = async (values: PasswordFormData) => {
    try {
      setPasswordLoading(true);
      await adminService.updateAdminPassword({
        currentPassword: values.currentPassword,
        newPassword: values.newPassword,
      });
      message.success("Password updated successfully!");
      passwordForm.resetFields();
    } catch (error: any) {
      message.error(error.message || "Failed to update password");
    } finally {
      setPasswordLoading(false);
    }
  };

  const handleEmailChange = async (values: EmailFormData) => {
    try {
      setEmailLoading(true);
      await adminService.updateAdminEmail({
        email: values.email,
        password: values.password,
      });
      message.success("Email updated successfully!");
      setAdminProfile((prev) =>
        prev ? { ...prev, email: values.email } : null
      );
      emailForm.setFieldsValue({ password: "" });
    } catch (error: any) {
      message.error(error.message || "Failed to update email");
    } finally {
      setEmailLoading(false);
    }
  };

  return (
    <AdminLayout>
      <div>
        <Title level={2}>
          <SettingOutlined /> Admin Account Settings
        </Title>

        <Text type="secondary" style={{ marginBottom: 24, display: "block" }}>
          Manage your admin account security settings
        </Text>

        {profileLoading ? (
          <Card loading={true} style={{ marginBottom: 24 }} />
        ) : (
          <>
            {/* Current Admin Info */}
            <Card
              title={
                <Space>
                  <SettingOutlined />
                  <span>Current Account Information</span>
                </Space>
              }
              style={{ marginBottom: 24 }}
            >
              <Row gutter={[16, 16]}>
                <Col xs={24} sm={12}>
                  <Text strong>Email: </Text>
                  <Text>{adminProfile?.email}</Text>
                </Col>
                <Col xs={24} sm={12}>
                  <Text strong>Role: </Text>
                  <Text type="success">
                    {adminProfile?.role?.replace("_", " ").toUpperCase()}
                  </Text>
                </Col>
              </Row>
            </Card>

            <Row gutter={[24, 24]}>
              {/* Change Password */}
              <Col xs={24} lg={12}>
                <Card
                  title={
                    <Space>
                      <LockOutlined />
                      <span>Change Password</span>
                    </Space>
                  }
                >
                  <Form
                    form={passwordForm}
                    layout="vertical"
                    onFinish={handlePasswordChange}
                  >
                    <Form.Item
                      label="Current Password"
                      name="currentPassword"
                      rules={[
                        {
                          required: true,
                          message: "Please enter current password",
                        },
                      ]}
                    >
                      <Input.Password
                        prefix={<LockOutlined />}
                        placeholder="Enter current password"
                        iconRender={(visible) =>
                          visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                        }
                      />
                    </Form.Item>

                    <Form.Item
                      label="New Password"
                      name="newPassword"
                      rules={[
                        {
                          required: true,
                          message: "Please enter new password",
                        },
                        {
                          min: 6,
                          message: "Password must be at least 6 characters",
                        },
                        {
                          pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
                          message:
                            "Password must contain uppercase, lowercase and number",
                        },
                      ]}
                    >
                      <Input.Password
                        prefix={<LockOutlined />}
                        placeholder="Enter new password"
                        iconRender={(visible) =>
                          visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                        }
                      />
                    </Form.Item>

                    <Form.Item
                      label="Confirm New Password"
                      name="confirmPassword"
                      dependencies={["newPassword"]}
                      rules={[
                        {
                          required: true,
                          message: "Please confirm new password",
                        },
                        ({ getFieldValue }) => ({
                          validator(_, value) {
                            if (
                              !value ||
                              getFieldValue("newPassword") === value
                            ) {
                              return Promise.resolve();
                            }
                            return Promise.reject(
                              new Error("Passwords do not match")
                            );
                          },
                        }),
                      ]}
                    >
                      <Input.Password
                        prefix={<LockOutlined />}
                        placeholder="Confirm new password"
                        iconRender={(visible) =>
                          visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                        }
                      />
                    </Form.Item>

                    <Form.Item>
                      <Button
                        type="primary"
                        htmlType="submit"
                        loading={passwordLoading}
                        icon={<LockOutlined />}
                        block
                      >
                        Update Password
                      </Button>
                    </Form.Item>
                  </Form>
                </Card>
              </Col>

              {/* Change Email */}
              <Col xs={24} lg={12}>
                <Card
                  title={
                    <Space>
                      <MailOutlined />
                      <span>Change Email</span>
                    </Space>
                  }
                >
                  <Form
                    form={emailForm}
                    layout="vertical"
                    onFinish={handleEmailChange}
                  >
                    <Form.Item
                      label="New Email Address"
                      name="email"
                      rules={[
                        {
                          required: true,
                          message: "Please enter email address",
                        },
                        { type: "email", message: "Please enter valid email" },
                      ]}
                    >
                      <Input
                        prefix={<MailOutlined />}
                        placeholder="Enter new email address"
                      />
                    </Form.Item>

                    <Form.Item
                      label="Current Password"
                      name="password"
                      rules={[
                        {
                          required: true,
                          message: "Please enter current password to confirm",
                        },
                      ]}
                    >
                      <Input.Password
                        prefix={<LockOutlined />}
                        placeholder="Enter password to confirm"
                        iconRender={(visible) =>
                          visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                        }
                      />
                    </Form.Item>

                    <Form.Item>
                      <Button
                        type="primary"
                        htmlType="submit"
                        loading={emailLoading}
                        icon={<MailOutlined />}
                        block
                      >
                        Update Email
                      </Button>
                    </Form.Item>
                  </Form>
                </Card>
              </Col>
            </Row>
          </>
        )}

        <Divider />

        <Card title="Security Recommendations" type="inner">
          <ul>
            <li>Use a strong password with at least 8 characters</li>
            <li>
              Include uppercase, lowercase letters, numbers and special
              characters
            </li>
            <li>Don't reuse passwords from other accounts</li>
            <li>Change your password regularly</li>
            <li>Keep your email address updated for account recovery</li>
          </ul>
        </Card>
      </div>
    </AdminLayout>
  );
};

export default AdminSettings;
