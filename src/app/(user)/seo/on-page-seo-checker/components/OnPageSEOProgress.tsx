import React, { useEffect } from "react";
import { Card, Progress, Typography, Space, Tag, Spin } from "antd";
import { ClockCircleOutlined, LoadingOutlined } from "@ant-design/icons";
import { useAppDispatch } from "@/stores/hooks";
import { fetchAuditStatus } from "@/stores/slices/on-page-seo.slice";
import { OnPageSEOAudit } from "@/types/on-page-seo.type";

const { Title, Text } = Typography;

interface OnPageSEOProgressProps {
  audit: OnPageSEOAudit;
}

const OnPageSEOProgress: React.FC<OnPageSEOProgressProps> = ({ audit }) => {
  const dispatch = useAppDispatch();

  // Poll for status updates
  useEffect(() => {
    if (audit.status === "processing" || audit.status === "pending") {
      const interval = setInterval(() => {
        dispatch(fetchAuditStatus(audit.id));
      }, 3000);

      return () => clearInterval(interval);
    }
  }, [audit.id, audit.status, dispatch]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "orange";
      case "processing":
        return "blue";
      case "completed":
        return "green";
      case "failed":
        return "red";
      case "cancelled":
        return "default";
      default:
        return "default";
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "pending":
        return "Pending";
      case "processing":
        return "Processing";
      case "completed":
        return "Completed";
      case "failed":
        return "Failed";
      case "cancelled":
        return "Cancelled";
      default:
        return status;
    }
  };

  const formatTimeAgo = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

    if (diffInSeconds < 60) {
      return `${diffInSeconds} seconds ago`;
    } else if (diffInSeconds < 3600) {
      const minutes = Math.floor(diffInSeconds / 60);
      return `${minutes} minute${minutes > 1 ? "s" : ""} ago`;
    } else {
      const hours = Math.floor(diffInSeconds / 3600);
      return `${hours} hour${hours > 1 ? "s" : ""} ago`;
    }
  };

  return (
    <Card
      title={
        <Space>
          <Spin
            indicator={<LoadingOutlined style={{ fontSize: 16 }} spin />}
            spinning={audit.status === "processing"}
          />
          Analysis Progress
        </Space>
      }
    >
      <Space direction="vertical" style={{ width: "100%" }} size="large">
        <div>
          <div style={{ marginBottom: "8px" }}>
            <Space>
              <Text strong>Status:</Text>
              <Tag color={getStatusColor(audit.status)}>
                {getStatusText(audit.status)}
              </Tag>
            </Space>
          </div>

          {audit.progress !== undefined && (
            <Progress
              percent={audit.progress}
              status={audit.status === "failed" ? "exception" : "active"}
              strokeColor={{
                "0%": "#108ee9",
                "100%": "#87d068",
              }}
            />
          )}
        </div>

        <div>
          <Space direction="vertical" style={{ width: "100%" }}>
            <div>
              <ClockCircleOutlined style={{ marginRight: "8px" }} />
              <Text type="secondary">
                Started {formatTimeAgo(audit.createdAt)}
              </Text>
            </div>

            {audit.estimated_duration && (
              <div>
                <Text type="secondary">
                  Estimated duration: {audit.estimated_duration}
                </Text>
              </div>
            )}

            {audit.message && (
              <div>
                <Text>{audit.message}</Text>
              </div>
            )}
          </Space>
        </div>

        {audit.config && (
          <div>
            <Text strong style={{ display: "block", marginBottom: "8px" }}>
              Analysis Configuration:
            </Text>
            <Space wrap>
              <Tag>Type: {audit.config.auditType}</Tag>
              {audit.config.includeImages && <Tag>Images</Tag>}
              {audit.config.checkMobileFriendly && <Tag>Mobile-Friendly</Tag>}
            </Space>
          </div>
        )}

        {audit.status === "processing" && (
          <div
            style={{
              padding: "16px",
              backgroundColor: "#f6ffed",
              border: "1px solid #b7eb8f",
              borderRadius: "6px",
            }}
          >
            <Space>
              <LoadingOutlined style={{ color: "#52c41a" }} />
              <Text style={{ color: "#389e0d" }}>
                Analysis in progress... This may take a few minutes.
              </Text>
            </Space>
          </div>
        )}
      </Space>
    </Card>
  );
};

export default OnPageSEOProgress;
