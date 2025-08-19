import React, { useState, useEffect } from "react";
import { Modal, Button, Input, Form, message } from "antd";
import {
  UserOutlined,
  LockOutlined,
  MailOutlined,
  EyeInvisibleOutlined,
  EyeTwoTone,
  GoogleOutlined,
  GlobalOutlined,
} from "@ant-design/icons";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/stores/store";
import {
  loginAccount,
  registerAccount,
  clearError,
} from "@/stores/slices/auth.slice";
import { LoginRequest, RegisterRequest } from "@/types/api.type";
import { authService } from "@/services/auth.service";
import styles from "./auth_modal.module.scss";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialTab?: "login" | "signup" | "forgot-password" | "reset-password";
  resetToken?: string;
}

const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  initialTab = "login",
  resetToken: initialResetToken = "",
}) => {
  const { t } = useTranslation();
  const dispatch = useDispatch<AppDispatch>();
  const { isLoading, error, isAuthenticated } = useSelector(
    (state: RootState) => state.auth
  );

  const [activeTab, setActiveTab] = useState<
    "login" | "signup" | "forgot-password" | "reset-password"
  >(initialTab);
  const [loginForm] = Form.useForm();
  const [signupForm] = Form.useForm();
  const [forgotPasswordForm] = Form.useForm();
  const [resetPasswordForm] = Form.useForm();
  const [googleLoading, setGoogleLoading] = useState(false);
  const [forgotPasswordLoading, setForgotPasswordLoading] = useState(false);
  const [resetPasswordLoading, setResetPasswordLoading] = useState(false);
  const [resetToken, setResetToken] = useState<string>(initialResetToken);

  // Clear error when modal opens/closes
  useEffect(() => {
    if (isOpen) {
      dispatch(clearError());
    }
  }, [isOpen, dispatch]);

  // Handle reset token
  useEffect(() => {
    if (initialResetToken && isOpen) {
      setResetToken(initialResetToken);
      setActiveTab("reset-password");
    }
  }, [initialResetToken, isOpen]);

  // Close modal when authentication is successful
  useEffect(() => {
    if (isAuthenticated && isOpen) {
      message.success(t("login_success") || "Login successful!");
      onClose();
      loginForm.resetFields();
      signupForm.resetFields();
    }
  }, [isAuthenticated, isOpen, onClose, loginForm, signupForm, t]);

  // Show error message
  useEffect(() => {
    if (error) {
      message.error(error);
    }
  }, [error]);

  const handleLogin = async (values: LoginRequest) => {
    try {
      await dispatch(loginAccount(values)).unwrap();
    } catch (error) {
      // Error is handled by Redux slice and useEffect above
    }
  };

  const handleSignup = async (
    values: RegisterRequest & { confirmPassword: string }
  ) => {
    try {
      // Remove confirmPassword before sending to API
      const { confirmPassword, ...signupData } = values;
      await dispatch(registerAccount(signupData)).unwrap();
    } catch (error) {
      // Error is handled by Redux slice and useEffect above
    }
  };

  const handleForgotPassword = async (values: { email: string }) => {
    try {
      setForgotPasswordLoading(true);
      const response = await authService.forgotPassword(values.email);
      message.success(
        response.message ||
          t("forgot_password_email_sent") ||
          "Password reset instructions have been sent to your email."
      );
      forgotPasswordForm.resetFields();
      setActiveTab("login"); // Redirect back to login
    } catch (error: any) {
      message.error(
        error.response?.data?.message ||
          t("forgot_password_error") ||
          "Failed to send reset email. Please try again."
      );
    } finally {
      setForgotPasswordLoading(false);
    }
  };

  const handleResetPassword = async (values: {
    newPassword: string;
    confirmPassword: string;
  }) => {
    try {
      setResetPasswordLoading(true);
      const response = await authService.resetPassword(
        resetToken,
        values.newPassword,
        values.confirmPassword
      );
      message.success(
        response.message ||
          t("password_reset_success") ||
          "Password has been reset successfully. Please login with your new password."
      );
      resetPasswordForm.resetFields();
      setActiveTab("login"); // Redirect to login
      setResetToken(""); // Clear token
    } catch (error: any) {
      message.error(
        error.response?.data?.message ||
          t("password_reset_error") ||
          "Failed to reset password. Please try again or request a new reset link."
      );
    } finally {
      setResetPasswordLoading(false);
    }
  };

  const handleSocialLogin = async (provider: string) => {
    if (provider === "Google") {
      try {
        setGoogleLoading(true);
        authService.initiateGoogleAuth();
      } catch (error) {
        setGoogleLoading(false);
        message.error("Failed to initialize Google authentication");
      }
    } else {
      message.info(
        `${t("login_with") || "Login with"} ${provider} - Coming soon!`
      );
    }
  };

  const handleModalClose = () => {
    loginForm.resetFields();
    signupForm.resetFields();
    forgotPasswordForm.resetFields();
    resetPasswordForm.resetFields();
    setGoogleLoading(false);
    setForgotPasswordLoading(false);
    setResetPasswordLoading(false);
    dispatch(clearError());
    onClose();
  };

  const handleTabChange = (
    tab: "login" | "signup" | "forgot-password" | "reset-password"
  ) => {
    setActiveTab(tab);
    loginForm.resetFields();
    signupForm.resetFields();
    forgotPasswordForm.resetFields();
    resetPasswordForm.resetFields();
    setGoogleLoading(false);
    setForgotPasswordLoading(false);
    setResetPasswordLoading(false);
    dispatch(clearError());
  };

  return (
    <Modal
      title={null}
      open={isOpen}
      onCancel={handleModalClose}
      footer={null}
      width={480}
      centered
      className={styles.authModal}
      classNames={{ content: styles.modalContent }}
      destroyOnHidden
    >
      <div className={styles.authHeader}>
        <h2>
          {activeTab === "login"
            ? t("welcome_back") || "Welcome Back"
            : activeTab === "signup"
            ? t("join_us") || "Join Us"
            : activeTab === "forgot-password"
            ? t("forgot_password") || "Forgot Password"
            : t("reset_password") || "Reset Password"}
        </h2>
        <p>
          {activeTab === "login"
            ? t("sign_in_to_continue") || "Sign in to continue to your account"
            : activeTab === "signup"
            ? t("create_your_account") || "Create your account to get started"
            : activeTab === "forgot-password"
            ? t("forgot_password_desc") ||
              "Enter your email address and we'll send you a link to reset your password"
            : t("reset_password_desc") || "Enter your new password"}
        </p>
      </div>

      <div className={styles.authBody}>
        <div className={styles.tabContainer}>
          <div className={styles.tabButtons}>
            <button
              className={`${styles.tabButton} ${
                activeTab === "login" ? styles.active : ""
              }`}
              onClick={() => handleTabChange("login")}
            >
              {t("login") || "Login"}
            </button>
            <button
              className={`${styles.tabButton} ${
                activeTab === "signup" ? styles.active : ""
              }`}
              onClick={() => handleTabChange("signup")}
            >
              {t("signup") || "Sign Up"}
            </button>
          </div>
        </div>

        <div className={styles.formContainer}>
          {activeTab === "login" ? (
            <Form
              form={loginForm}
              onFinish={handleLogin}
              layout="vertical"
              requiredMark={false}
            >
              <div className={styles.formGroup}>
                <label>{t("email") || "Email"}</label>
                <div className={styles.inputWithIcon}>
                  <MailOutlined className={styles.inputIcon} />
                  <Form.Item
                    name="email"
                    rules={[
                      {
                        required: true,
                        message:
                          t("email_required") || "Please enter your email",
                      },
                      {
                        type: "email",
                        message:
                          t("email_invalid") || "Please enter a valid email",
                      },
                    ]}
                    style={{ margin: 0 }}
                  >
                    <Input
                      placeholder={t("enter_email") || "Enter your email"}
                    />
                  </Form.Item>
                </div>
              </div>

              <div className={styles.formGroup}>
                <label>{t("password") || "Password"}</label>
                <div className={styles.inputWithIcon}>
                  <LockOutlined className={styles.inputIcon} />
                  <Form.Item
                    name="password"
                    rules={[
                      {
                        required: true,
                        message:
                          t("password_required") ||
                          "Please enter your password",
                      },
                    ]}
                    style={{ margin: 0 }}
                  >
                    <Input.Password
                      placeholder={t("enter_password") || "Enter your password"}
                      iconRender={(visible) =>
                        visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                      }
                    />
                  </Form.Item>
                </div>
              </div>

              <div className={styles.forgotPassword}>
                <a
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    handleTabChange("forgot-password");
                  }}
                >
                  {t("forgot_password") || "Forgot Password?"}
                </a>
              </div>

              <Form.Item style={{ margin: 0 }}>
                <Button
                  type="primary"
                  htmlType="submit"
                  loading={isLoading}
                  className={styles.submitButton}
                >
                  {t("login") || "Login"}
                </Button>
              </Form.Item>
            </Form>
          ) : activeTab === "forgot-password" ? (
            <Form
              form={forgotPasswordForm}
              onFinish={handleForgotPassword}
              layout="vertical"
              requiredMark={false}
            >
              <div className={styles.formGroup}>
                <label>{t("email") || "Email"}</label>
                <div className={styles.inputWithIcon}>
                  <MailOutlined className={styles.inputIcon} />
                  <Form.Item
                    name="email"
                    rules={[
                      {
                        required: true,
                        message:
                          t("email_required") || "Please enter your email",
                      },
                      {
                        type: "email",
                        message:
                          t("email_invalid") || "Please enter a valid email",
                      },
                    ]}
                    style={{ margin: 0 }}
                  >
                    <Input
                      placeholder={t("enter_email") || "Enter your email"}
                    />
                  </Form.Item>
                </div>
              </div>

              <Form.Item style={{ margin: 0 }}>
                <Button
                  type="primary"
                  htmlType="submit"
                  loading={forgotPasswordLoading}
                  className={styles.submitButton}
                >
                  {t("send_reset_link") || "Send Reset Link"}
                </Button>
              </Form.Item>
            </Form>
          ) : activeTab === "reset-password" ? (
            <Form
              form={resetPasswordForm}
              onFinish={handleResetPassword}
              layout="vertical"
              requiredMark={false}
            >
              <div className={styles.formGroup}>
                <label>{t("new_password") || "New Password"}</label>
                <div className={styles.inputWithIcon}>
                  <LockOutlined className={styles.inputIcon} />
                  <Form.Item
                    name="newPassword"
                    rules={[
                      {
                        required: true,
                        message:
                          t("password_required") ||
                          "Please enter your new password",
                      },
                      {
                        min: 6,
                        message:
                          t("password_min") ||
                          "Password must be at least 6 characters",
                      },
                    ]}
                    style={{ margin: 0 }}
                  >
                    <Input.Password
                      placeholder={
                        t("enter_new_password") || "Enter your new password"
                      }
                      iconRender={(visible) =>
                        visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                      }
                    />
                  </Form.Item>
                </div>
              </div>

              <div className={styles.formGroup}>
                <label>
                  {t("confirm_new_password") || "Confirm New Password"}
                </label>
                <div className={styles.inputWithIcon}>
                  <LockOutlined className={styles.inputIcon} />
                  <Form.Item
                    name="confirmPassword"
                    dependencies={["newPassword"]}
                    rules={[
                      {
                        required: true,
                        message:
                          t("confirm_password_required") ||
                          "Please confirm your new password",
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
                            new Error(
                              t("password_mismatch") ||
                                "Passwords do not match!"
                            )
                          );
                        },
                      }),
                    ]}
                    style={{ margin: 0 }}
                  >
                    <Input.Password
                      placeholder={
                        t("confirm_new_password") || "Confirm your new password"
                      }
                      iconRender={(visible) =>
                        visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                      }
                    />
                  </Form.Item>
                </div>
              </div>

              <Form.Item style={{ margin: 0 }}>
                <Button
                  type="primary"
                  htmlType="submit"
                  loading={resetPasswordLoading}
                  className={styles.submitButton}
                >
                  {t("reset_password") || "Reset Password"}
                </Button>
              </Form.Item>
            </Form>
          ) : (
            <Form
              form={signupForm}
              onFinish={handleSignup}
              layout="vertical"
              requiredMark={false}
            >
              <div className={styles.formGroup}>
                <label>{t("full_name") || "Full Name"}</label>
                <div className={styles.inputWithIcon}>
                  <UserOutlined className={styles.inputIcon} />
                  <Form.Item
                    name="name"
                    rules={[
                      {
                        required: true,
                        message:
                          t("name_required") || "Please enter your full name",
                      },
                    ]}
                    style={{ margin: 0 }}
                  >
                    <Input
                      placeholder={t("enter_name") || "Enter your full name"}
                    />
                  </Form.Item>
                </div>
              </div>

              <div className={styles.formGroup}>
                <label>{t("email") || "Email"}</label>
                <div className={styles.inputWithIcon}>
                  <MailOutlined className={styles.inputIcon} />
                  <Form.Item
                    name="email"
                    rules={[
                      {
                        required: true,
                        message:
                          t("email_required") || "Please enter your email",
                      },
                      {
                        type: "email",
                        message:
                          t("email_invalid") || "Please enter a valid email",
                      },
                    ]}
                    style={{ margin: 0 }}
                  >
                    <Input
                      placeholder={t("enter_email") || "Enter your email"}
                    />
                  </Form.Item>
                </div>
              </div>

              <div className={styles.formGroup}>
                <label>
                  {t("website") || "Website"}{" "}
                  <span style={{ color: "#999", fontSize: "12px" }}>
                    (Optional)
                  </span>
                </label>
                <div className={styles.inputWithIcon}>
                  <GlobalOutlined className={styles.inputIcon} />
                  <Form.Item
                    name="website"
                    rules={[
                      {
                        type: "url",
                        message:
                          t("website_invalid") ||
                          "Please enter a valid website URL",
                      },
                    ]}
                    style={{ margin: 0 }}
                  >
                    <Input
                      placeholder={
                        t("enter_website") ||
                        "Enter your website URL (optional)"
                      }
                    />
                  </Form.Item>
                </div>
              </div>

              <div className={styles.formGroup}>
                <label>{t("password") || "Password"}</label>
                <div className={styles.inputWithIcon}>
                  <LockOutlined className={styles.inputIcon} />
                  <Form.Item
                    name="password"
                    rules={[
                      {
                        required: true,
                        message:
                          t("password_required") ||
                          "Please enter your password",
                      },
                      {
                        min: 6,
                        message:
                          t("password_min") ||
                          "Password must be at least 6 characters",
                      },
                    ]}
                    style={{ margin: 0 }}
                  >
                    <Input.Password
                      placeholder={t("enter_password") || "Enter your password"}
                      iconRender={(visible) =>
                        visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                      }
                    />
                  </Form.Item>
                </div>
              </div>

              <div className={styles.formGroup}>
                <label>{t("confirm_password") || "Confirm Password"}</label>
                <div className={styles.inputWithIcon}>
                  <LockOutlined className={styles.inputIcon} />
                  <Form.Item
                    name="confirmPassword"
                    dependencies={["password"]}
                    rules={[
                      {
                        required: true,
                        message:
                          t("confirm_password_required") ||
                          "Please confirm your password",
                      },
                      ({ getFieldValue }) => ({
                        validator(_, value) {
                          if (!value || getFieldValue("password") === value) {
                            return Promise.resolve();
                          }
                          return Promise.reject(
                            new Error(
                              t("password_mismatch") ||
                                "Passwords do not match!"
                            )
                          );
                        },
                      }),
                    ]}
                    style={{ margin: 0 }}
                  >
                    <Input.Password
                      placeholder={
                        t("confirm_password") || "Confirm your password"
                      }
                      iconRender={(visible) =>
                        visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                      }
                    />
                  </Form.Item>
                </div>
              </div>

              <Form.Item style={{ margin: 0 }}>
                <Button
                  type="primary"
                  htmlType="submit"
                  loading={isLoading}
                  className={styles.submitButton}
                >
                  {t("create_account") || "Create Account"}
                </Button>
              </Form.Item>
            </Form>
          )}

          {(activeTab === "login" || activeTab === "signup") && (
            <>
              <div className={styles.divider}>
                <span>{t("or_continue_with") || "Or continue with"}</span>
              </div>

              <div className={styles.socialButtons}>
                <Button
                  className={`${styles.socialButton} ${styles.google} ${
                    googleLoading ? styles.loading : ""
                  }`}
                  onClick={() => handleSocialLogin("Google")}
                  disabled={googleLoading || isLoading}
                  loading={googleLoading}
                >
                  <GoogleOutlined />
                  {googleLoading ? "Connecting..." : "Google"}
                </Button>
              </div>
            </>
          )}

          <div className={styles.authFooter}>
            {activeTab === "login" ? (
              <>
                {t("dont_have_account") || "Don't have an account?"}{" "}
                <a
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    handleTabChange("signup");
                  }}
                >
                  {t("signup") || "Sign up"}
                </a>
              </>
            ) : activeTab === "signup" ? (
              <>
                {t("already_have_account") || "Already have an account?"}{" "}
                <a
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    handleTabChange("login");
                  }}
                >
                  {t("login") || "Login"}
                </a>
              </>
            ) : activeTab === "forgot-password" ? (
              <>
                {t("remember_password") || "Remember your password?"}{" "}
                <a
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    handleTabChange("login");
                  }}
                >
                  {t("back_to_login") || "Back to Login"}
                </a>
              </>
            ) : activeTab === "reset-password" ? (
              <>
                {t("password_reset_complete") || "Password reset complete?"}{" "}
                <a
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    handleTabChange("login");
                  }}
                >
                  {t("back_to_login") || "Back to Login"}
                </a>
              </>
            ) : null}
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default AuthModal;
