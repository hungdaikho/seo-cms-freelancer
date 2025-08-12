"use client";

import React from "react";
import { Card, Typography, Button, Space } from "antd";
import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";

const { Title, Paragraph } = Typography;

const TestRedirect = () => {
  const { user, isAuthenticated, isSuperAdmin, canAccessDashboard } = useAuth();
  const router = useRouter();

  return (
    <div style={{ padding: "20px", maxWidth: "800px", margin: "0 auto" }}>
      <Card>
        <Title level={2}>Authentication Test Page</Title>

        <Paragraph>
          This page helps test the admin redirect functionality.
        </Paragraph>

        <div style={{ marginBottom: "20px" }}>
          <Title level={4}>Current User Info:</Title>
          {isAuthenticated ? (
            <div>
              <p>
                <strong>Name:</strong> {user?.name || "N/A"}
              </p>
              <p>
                <strong>Email:</strong> {user?.email || "N/A"}
              </p>
              <p>
                <strong>Role:</strong> {user?.role || "N/A"}
              </p>
              <p>
                <strong>Is Super Admin:</strong> {isSuperAdmin ? "Yes" : "No"}
              </p>
              <p>
                <strong>Can Access Dashboard:</strong>{" "}
                {canAccessDashboard() ? "Yes" : "No"}
              </p>
            </div>
          ) : (
            <p>Not authenticated</p>
          )}
        </div>

        <Space direction="vertical" style={{ width: "100%" }}>
          <Title level={4}>Test Actions:</Title>

          <Button
            type="primary"
            onClick={() => router.push("/dashboard")}
            disabled={!canAccessDashboard()}
          >
            Go to Dashboard (Only Super Admin)
          </Button>

          <Button onClick={() => router.push("/")}>Go to Home Page</Button>

          <Button onClick={() => router.push("/auth/login")}>
            Go to Login
          </Button>
        </Space>

        <div
          style={{ marginTop: "20px", padding: "10px", background: "#f5f5f5" }}
        >
          <Title level={5}>Expected Behavior:</Title>
          <ul>
            <li>
              If you are <strong>super_admin</strong> and visit home page, you
              should be redirected to <code>/dashboard</code>
            </li>
            <li>
              If you are <strong>not super_admin</strong> and try to access{" "}
              <code>/dashboard</code>, you should be redirected to home
            </li>
            <li>
              If you are <strong>not authenticated</strong> and try to access{" "}
              <code>/dashboard</code>, you should be redirected to login
            </li>
          </ul>
        </div>
      </Card>
    </div>
  );
};

export default TestRedirect;
