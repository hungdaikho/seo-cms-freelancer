"use client";
import React, { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import AuthModal from "@/components/ui/modal/auth_modal_new";
import { message } from "antd";
import { useTranslation } from "react-i18next";

const ResetPasswordHandler: React.FC = () => {
  const { t } = useTranslation();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [resetToken, setResetToken] = useState<string>("");

  useEffect(() => {
    const token = searchParams.get("token");

    if (token) {
      setResetToken(token);
      setIsModalOpen(true);
    } else {
      // If no token, redirect to login page or show error
      message.error(
        t("invalid_reset_link") ||
          "Invalid or missing reset token. Please request a new password reset."
      );
      router.push("/"); // Redirect to home page
    }
  }, [searchParams, router, t]);

  const handleModalClose = () => {
    setIsModalOpen(false);
    setResetToken("");
    router.push("/"); // Redirect to home page after closing modal
  };

  return (
    <AuthModal
      isOpen={isModalOpen}
      onClose={handleModalClose}
      initialTab="reset-password"
      resetToken={resetToken}
    />
  );
};

export default ResetPasswordHandler;
