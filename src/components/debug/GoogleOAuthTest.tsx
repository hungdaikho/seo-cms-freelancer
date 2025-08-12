"use client";

import React from "react";
import { Button, Card, Typography } from "antd";
import { GoogleOutlined } from "@ant-design/icons";

const { Title, Paragraph } = Typography;

const GoogleOAuthTest: React.FC = () => {
  const handleTestGoogleAuth = () => {
    // Direct redirect to backend Google OAuth endpoint
    const googleAuthUrl = "http://localhost:3001/auth/google";
    window.location.href = googleAuthUrl;
  };

  return (
    <div style={{ padding: "24px", maxWidth: "600px", margin: "0 auto" }}>
      <Card>
        <Title level={3}>Google OAuth Test</Title>
        <Paragraph>
          Click the button below to test Google OAuth authentication flow.
        </Paragraph>
        <Paragraph>
          <strong>Current URL:</strong> {window.location.href}
        </Paragraph>
        <Paragraph>
          <strong>Expected flow:</strong>
          <ol>
            <li>Click button → Redirect to Google OAuth</li>
            <li>User authenticates with Google</li>
            <li>
              Google redirects to backend:{" "}
              <code>http://localhost:3001/auth/google/callback</code>
            </li>
            <li>
              Backend processes and redirects to:{" "}
              <code>http://localhost:6868/auth/google/success?token=...</code>
            </li>
            <li>Frontend handles token and redirects to home</li>
          </ol>
        </Paragraph>

        <Button
          type="primary"
          icon={<GoogleOutlined />}
          size="large"
          onClick={handleTestGoogleAuth}
        >
          Test Google OAuth
        </Button>
      </Card>
    </div>
  );
};

export default GoogleOAuthTest;
