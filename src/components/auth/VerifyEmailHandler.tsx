"use client";
import React, { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { message, Spin, Button, Result } from "antd";
import {
  CheckCircleOutlined,
  CloseCircleOutlined,
  MailOutlined,
} from "@ant-design/icons";
import { useTranslation } from "react-i18next";
import { authService } from "@/services/auth.service";

const VerifyEmailHandler: React.FC = () => {
  const { t } = useTranslation();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState(true);
  const [verified, setVerified] = useState<boolean | null>(null);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [resendLoading, setResendLoading] = useState(false);

  useEffect(() => {
    const token = searchParams.get("token");

    if (token) {
      verifyEmail(token);
    } else {
      setLoading(false);
      setVerified(false);
      setErrorMessage(
        t("invalid_verification_link") ||
          "Invalid or missing verification token. Please check your email for the correct link."
      );
    }
  }, [searchParams, t]);

  const verifyEmail = async (token: string) => {
    try {
      setLoading(true);
      const response = await authService.verifyEmail(token);

      setVerified(true);
      message.success(
        response.message ||
          t("email_verified_success") ||
          "Email has been verified successfully! You can now sign in to your account."
      );
    } catch (error: any) {
      setVerified(false);
      const errorMsg =
        error.response?.data?.message ||
        t("email_verification_error") ||
        "Failed to verify email. The link may be expired or invalid.";
      setErrorMessage(errorMsg);
      message.error(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  const handleResendVerification = async () => {
    try {
      setResendLoading(true);
      const response = await authService.resendEmailVerification();
      message.success(
        response.message ||
          t("verification_email_resent") ||
          "Verification email has been sent. Please check your inbox."
      );
    } catch (error: any) {
      message.error(
        error.response?.data?.message ||
          t("resend_verification_error") ||
          "Failed to resend verification email. Please try again later."
      );
    } finally {
      setResendLoading(false);
    }
  };

  const handleGoToLogin = () => {
    router.push("/");
  };

  if (loading) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "100vh",
          flexDirection: "column",
          gap: "16px",
        }}
      >
        <Spin size="large" />
        <p>{t("verifying_email") || "Verifying your email address..."}</p>
      </div>
    );
  }

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        padding: "20px",
      }}
    >
      <div style={{ maxWidth: "500px", width: "100%" }}>
        {verified === true ? (
          <Result
            icon={<CheckCircleOutlined style={{ color: "#52c41a" }} />}
            status="success"
            title={t("email_verified") || "Email Verified Successfully!"}
            subTitle={
              t("email_verified_message") ||
              "Your email address has been verified. You can now sign in to your account and access all features."
            }
            extra={[
              <Button
                type="primary"
                key="login"
                onClick={handleGoToLogin}
                size="large"
              >
                {t("go_to_login") || "Go to Login"}
              </Button>,
            ]}
          />
        ) : (
          <Result
            icon={<CloseCircleOutlined style={{ color: "#ff4d4f" }} />}
            status="error"
            title={
              t("email_verification_failed") || "Email Verification Failed"
            }
            subTitle={errorMessage}
            extra={[
              <Button
                type="primary"
                key="retry"
                onClick={handleResendVerification}
                loading={resendLoading}
                icon={<MailOutlined />}
                size="large"
              >
                {t("resend_verification") || "Resend Verification Email"}
              </Button>,
              <Button key="home" onClick={handleGoToLogin} size="large">
                {t("back_to_home") || "Back to Home"}
              </Button>,
            ]}
          />
        )}
      </div>
    </div>
  );
};

export default VerifyEmailHandler;
