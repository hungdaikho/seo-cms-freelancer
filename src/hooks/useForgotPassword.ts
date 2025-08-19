import { useState } from "react";
import { message } from "antd";
import { useTranslation } from "react-i18next";
import { authService } from "@/services/auth.service";

interface UseForgotPasswordReturn {
    isLoading: boolean;
    sendResetEmail: (email: string) => Promise<boolean>;
    resetPassword: (token: string, newPassword: string, confirmPassword: string) => Promise<boolean>;
}

export const useForgotPassword = (): UseForgotPasswordReturn => {
    const { t } = useTranslation();
    const [isLoading, setIsLoading] = useState(false);

    const sendResetEmail = async (email: string): Promise<boolean> => {
        try {
            setIsLoading(true);
            const response = await authService.forgotPassword(email);

            message.success(
                response.message ||
                t("forgot_password_email_sent") ||
                "Password reset instructions have been sent to your email."
            );

            return true;
        } catch (error: any) {
            message.error(
                error.response?.data?.message ||
                error.message ||
                t("forgot_password_error") ||
                "Failed to send reset email. Please try again."
            );
            return false;
        } finally {
            setIsLoading(false);
        }
    };

    const resetPassword = async (
        token: string,
        newPassword: string,
        confirmPassword: string
    ): Promise<boolean> => {
        try {
            setIsLoading(true);
            const response = await authService.resetPassword(token, newPassword, confirmPassword);

            message.success(
                response.message ||
                t("password_reset_success") ||
                "Password has been reset successfully. Please login with your new password."
            );

            return true;
        } catch (error: any) {
            message.error(
                error.response?.data?.message ||
                error.message ||
                t("password_reset_error") ||
                "Failed to reset password. Please try again or request a new reset link."
            );
            return false;
        } finally {
            setIsLoading(false);
        }
    };

    return {
        isLoading,
        sendResetEmail,
        resetPassword,
    };
};
