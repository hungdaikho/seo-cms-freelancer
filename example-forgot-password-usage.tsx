/**
 * Example usage of Forgot Password feature
 *
 * This example shows how to use the enhanced AuthModal with forgot password functionality.
 */

import React, { useState } from "react";
import { Button } from "antd";
import AuthModal from "@/components/ui/modal/auth_modal_new";

const ForgotPasswordExample: React.FC = () => {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [initialTab, setInitialTab] = useState<
    "login" | "signup" | "forgot-password" | "reset-password"
  >("login");

  // Example: Open modal directly to forgot password tab
  const openForgotPasswordModal = () => {
    setInitialTab("forgot-password");
    setIsAuthModalOpen(true);
  };

  // Example: Open modal for password reset with token (from email link)
  const openResetPasswordModal = (token: string) => {
    setInitialTab("reset-password");
    setIsAuthModalOpen(true);
    // Note: You would also pass the token as a prop to AuthModal
  };

  // Regular login modal
  const openLoginModal = () => {
    setInitialTab("login");
    setIsAuthModalOpen(true);
  };

  return (
    <div>
      <h2>Forgot Password Feature Example</h2>

      <div style={{ display: "flex", gap: "10px", marginBottom: "20px" }}>
        <Button onClick={openLoginModal}>Open Login Modal</Button>

        <Button onClick={openForgotPasswordModal}>Open Forgot Password</Button>

        <Button onClick={() => openResetPasswordModal("sample-reset-token")}>
          Open Reset Password (with token)
        </Button>
      </div>

      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        initialTab={initialTab}
        // resetToken="sample-reset-token" // Pass this when opening reset password modal
      />

      <div style={{ marginTop: "20px" }}>
        <h3>How to integrate with your email system:</h3>
        <ol>
          <li>
            <strong>User clicks "Forgot Password"</strong>: Modal switches to
            forgot-password tab where user enters email
          </li>
          <li>
            <strong>Email sent</strong>: Server sends email with reset link
            like: https://yourdomain.com/auth/reset-password?token=abc123
          </li>
          <li>
            <strong>User clicks email link</strong>: They're redirected to
            /auth/reset-password page which extracts token from URL and opens
            reset-password modal
          </li>
          <li>
            <strong>Password reset</strong>: User enters new password, system
            validates token and updates password
          </li>
        </ol>

        <h3>API Endpoints used:</h3>
        <ul>
          <li>
            <code>POST /api/v1/auth/forgot-password</code> - Send reset email
          </li>
          <li>
            <code>POST /api/v1/auth/reset-password</code> - Reset password with
            token
          </li>
        </ul>

        <h3>Translation keys added:</h3>
        <ul>
          <li>forgot_password_desc</li>
          <li>reset_password_desc</li>
          <li>new_password</li>
          <li>confirm_new_password</li>
          <li>send_reset_link</li>
          <li>back_to_login</li>
          <li>forgot_password_email_sent</li>
          <li>password_reset_success</li>
          <li>And more...</li>
        </ul>
      </div>
    </div>
  );
};

export default ForgotPasswordExample;
