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
  initialTab?: "login" | "signup";
}

const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  initialTab = "login",
}) => {
  const { t } = useTranslation();
  const dispatch = useDispatch<AppDispatch>();
  const { isLoading, error, isAuthenticated } = useSelector(
    (state: RootState) => state.auth
  );

  const [activeTab, setActiveTab] = useState<"login" | "signup">(initialTab);
  const [loginForm] = Form.useForm();
  const [signupForm] = Form.useForm();
  const [googleLoading, setGoogleLoading] = useState(false);

  // Clear error when modal opens/closes
  useEffect(() => {
    if (isOpen) {
      dispatch(clearError());
    }
  }, [isOpen, dispatch]);

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
    setGoogleLoading(false);
    dispatch(clearError());
    onClose();
  };

  const handleTabChange = (tab: "login" | "signup") => {
    setActiveTab(tab);
    loginForm.resetFields();
    signupForm.resetFields();
    setGoogleLoading(false);
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
            : t("join_us") || "Join Us"}
        </h2>
        <p>
          {activeTab === "login"
            ? t("sign_in_to_continue") || "Sign in to continue to your account"
            : t("create_your_account") || "Create your account to get started"}
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
                <a href="#" onClick={(e) => e.preventDefault()}>
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
            ) : (
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
            )}
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default AuthModal;
