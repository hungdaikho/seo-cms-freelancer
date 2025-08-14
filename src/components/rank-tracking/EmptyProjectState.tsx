"use client";
import React from "react";
import { Button, Typography } from "antd";
import { PlusOutlined } from "@ant-design/icons";

const { Title, Text } = Typography;

interface EmptyProjectStateProps {
  onCreateProject: () => void;
}

const EmptyProjectState: React.FC<EmptyProjectStateProps> = ({
  onCreateProject,
}) => {
  return (
    <div
      style={{
        padding: "60px 24px",
        textAlign: "center",
        background: "#f5f5f5",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Button
        icon={<PlusOutlined />}
        onClick={onCreateProject}
        style={{ marginBottom: "40px" }}
      >
        Add project
      </Button>

      <div
        style={{
          background: "linear-gradient(135deg, #4285f4 0%, #1a73e8 100%)",
          borderRadius: "12px",
          padding: "80px 60px",
          color: "white",
          maxWidth: "800px",
          width: "100%",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Background decoration */}
        <div
          style={{
            position: "absolute",
            top: 0,
            right: 0,
            width: "200px",
            height: "200px",
            background: "rgba(255, 255, 255, 0.1)",
            borderRadius: "50%",
            transform: "translate(50%, -50%)",
          }}
        />

        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            width: "150px",
            height: "150px",
            background: "rgba(255, 255, 255, 0.05)",
            borderRadius: "50%",
            transform: "translate(-50%, 50%)",
          }}
        />

        <div style={{ position: "relative", zIndex: 1 }}>
          <Title level={2} style={{ color: "white", marginBottom: "16px" }}>
            Create a project you can track and improve SEO traffic
          </Title>

          <Text
            style={{
              color: "rgba(255, 255, 255, 0.8)",
              fontSize: "16px",
              display: "block",
              marginBottom: "40px",
            }}
          >
            Lorem ipsum dolor sit amet
            <br />
            consectetur adipiscing
          </Text>

          <Button
            type="primary"
            size="large"
            onClick={onCreateProject}
            style={{
              background: "rgba(255, 255, 255, 0.2)",
              border: "1px solid rgba(255, 255, 255, 0.3)",
              borderRadius: "8px",
              fontWeight: 500,
              height: "48px",
              paddingLeft: "24px",
              paddingRight: "24px",
            }}
          >
            Add your first project →
          </Button>
        </div>
      </div>
    </div>
  );
};

export default EmptyProjectState;
