import React, { useEffect } from "react";
import {
  Card,
  Progress,
  Row,
  Col,
  Typography,
  Tooltip,
  Space,
  Tag,
} from "antd";
import { InfoCircleOutlined, ReloadOutlined } from "@ant-design/icons";
import { useApiLimits } from "@/stores/hooks/useOrganicResearch";
import styles from "./api-limits-widget.module.scss";

const { Text, Title } = Typography;

interface ApiLimitsWidgetProps {
  showHeader?: boolean;
  size?: "small" | "default";
}

const ApiLimitsWidget: React.FC<ApiLimitsWidgetProps> = ({
  showHeader = true,
  size = "default",
}) => {
  const { apiLimits, loading, error, fetchApiLimits } = useApiLimits();

  useEffect(() => {
    fetchApiLimits();
  }, []);

  const getProgressColor = (remaining: number, total: number): string => {
    const percentage = (remaining / total) * 100;
    if (percentage >= 70) return "#52c41a"; // Green
    if (percentage >= 30) return "#faad14"; // Orange
    return "#ff4d4f"; // Red
  };

  const formatResetDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getStatusTag = (remaining: number, total: number) => {
    const percentage = (remaining / total) * 100;
    if (percentage >= 70) {
      return <Tag color="green">Healthy</Tag>;
    } else if (percentage >= 30) {
      return <Tag color="orange">Warning</Tag>;
    } else {
      return <Tag color="red">Critical</Tag>;
    }
  };

  if (error) {
    return (
      <Card
        title={showHeader ? "API Limits" : undefined}
        size={size}
        className={styles.apiLimitsWidget}
      >
        <div className={styles.errorState}>
          <Text type="danger">Failed to load API limits</Text>
        </div>
      </Card>
    );
  }

  return (
    <Card
      title={
        showHeader ? (
          <Space>
            <span>API Limits</span>
            <Tooltip title="Third-party API quota usage">
              <InfoCircleOutlined />
            </Tooltip>
          </Space>
        ) : undefined
      }
      extra={
        showHeader ? (
          <Tooltip title="Refresh limits">
            <ReloadOutlined
              onClick={fetchApiLimits}
              style={{ cursor: "pointer" }}
              spin={loading}
            />
          </Tooltip>
        ) : undefined
      }
      size={size}
      className={styles.apiLimitsWidget}
      loading={loading}
    >
      {apiLimits ? (
        <Row gutter={[16, 16]}>
          {/* SEMrush */}
          <Col span={24}>
            <div className={styles.apiProvider}>
              <div className={styles.providerHeader}>
                <div className={styles.providerInfo}>
                  <Title level={5} style={{ margin: 0, color: "#1677ff" }}>
                    SEMrush
                  </Title>
                  {getStatusTag(
                    apiLimits.semrush.remaining,
                    apiLimits.semrush.total
                  )}
                </div>
                <Text className={styles.quotaText}>
                  {apiLimits.semrush.remaining}/{apiLimits.semrush.total}
                </Text>
              </div>
              <Progress
                percent={Math.round(
                  (apiLimits.semrush.remaining / apiLimits.semrush.total) * 100
                )}
                strokeColor={getProgressColor(
                  apiLimits.semrush.remaining,
                  apiLimits.semrush.total
                )}
                size="small"
                showInfo={false}
              />
              <Text type="secondary" style={{ fontSize: "11px" }}>
                Resets: {formatResetDate(apiLimits.semrush.resetDate)}
              </Text>
            </div>
          </Col>

          {/* Ahrefs */}
          <Col span={24}>
            <div className={styles.apiProvider}>
              <div className={styles.providerHeader}>
                <div className={styles.providerInfo}>
                  <Title level={5} style={{ margin: 0, color: "#ff6b35" }}>
                    Ahrefs
                  </Title>
                  {getStatusTag(
                    apiLimits.ahrefs.remaining,
                    apiLimits.ahrefs.total
                  )}
                </div>
                <Text className={styles.quotaText}>
                  {apiLimits.ahrefs.remaining}/{apiLimits.ahrefs.total}
                </Text>
              </div>
              <Progress
                percent={Math.round(
                  (apiLimits.ahrefs.remaining / apiLimits.ahrefs.total) * 100
                )}
                strokeColor={getProgressColor(
                  apiLimits.ahrefs.remaining,
                  apiLimits.ahrefs.total
                )}
                size="small"
                showInfo={false}
              />
              <Text type="secondary" style={{ fontSize: "11px" }}>
                Resets: {formatResetDate(apiLimits.ahrefs.resetDate)}
              </Text>
            </div>
          </Col>

          {/* Moz */}
          <Col span={24}>
            <div className={styles.apiProvider}>
              <div className={styles.providerHeader}>
                <div className={styles.providerInfo}>
                  <Title level={5} style={{ margin: 0, color: "#00a650" }}>
                    Moz
                  </Title>
                  {getStatusTag(apiLimits.moz.remaining, apiLimits.moz.total)}
                </div>
                <Text className={styles.quotaText}>
                  {apiLimits.moz.remaining}/{apiLimits.moz.total}
                </Text>
              </div>
              <Progress
                percent={Math.round(
                  (apiLimits.moz.remaining / apiLimits.moz.total) * 100
                )}
                strokeColor={getProgressColor(
                  apiLimits.moz.remaining,
                  apiLimits.moz.total
                )}
                size="small"
                showInfo={false}
              />
              <Text type="secondary" style={{ fontSize: "11px" }}>
                Resets: {formatResetDate(apiLimits.moz.resetDate)}
              </Text>
            </div>
          </Col>
        </Row>
      ) : (
        <div className={styles.noData}>
          <Text type="secondary">No API limit data available</Text>
        </div>
      )}
    </Card>
  );
};

export default ApiLimitsWidget;
