"use client";
import React, { useEffect } from "react";
import {
  Card,
  Table,
  Button,
  Typography,
  Row,
  Col,
  Space,
  Tag,
  Statistic,
  Alert,
  Spin,
} from "antd";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import useRankTracking from "@/hooks/useRankTracking";

const { Title, Text } = Typography;

interface SimpleRankTrackingDashboardProps {
  projectId: string;
  projectName: string;
}

const SimpleRankTrackingDashboard: React.FC<
  SimpleRankTrackingDashboardProps
> = ({ projectId, projectName }) => {
  const {
    projectOverview,
    keywords,
    keywordsPagination,
    loading,
    errors,
    actions,
    utils,
  } = useRankTracking();

  // Load data on mount
  useEffect(() => {
    if (projectId) {
      actions.fetchProjectRankingsOverview(projectId);
      actions.fetchProjectKeywords(projectId);
    }
  }, [projectId]);

  // Keywords table columns
  const columns = [
    {
      title: "Position",
      dataIndex: "position",
      key: "position",
      width: 80,
      render: (position: number) => (
        <Text
          strong={position <= 10}
          style={{ color: utils.getPositionColor(position) }}
        >
          {utils.formatPosition(position)}
        </Text>
      ),
    },
    {
      title: "Keyword",
      dataIndex: "keyword",
      key: "keyword",
    },
    {
      title: "Change",
      dataIndex: "change",
      key: "change",
      width: 80,
      render: (change: number) => (
        <Text
          style={{ color: utils.getTrendColor(utils.calculateTrend(change)) }}
        >
          {change > 0 ? "+" : ""}
          {change}
        </Text>
      ),
    },
    {
      title: "Volume",
      dataIndex: "searchVolume",
      key: "searchVolume",
      width: 100,
      render: (volume: number) => volume?.toLocaleString() || "-",
    },
    {
      title: "Difficulty",
      dataIndex: "difficulty",
      key: "difficulty",
      width: 80,
      render: (difficulty: number) => (
        <Tag
          color={
            difficulty <= 30 ? "green" : difficulty <= 60 ? "orange" : "red"
          }
        >
          {difficulty}
        </Tag>
      ),
    },
  ];

  if (utils.isLoadingOperation("overview") && !projectOverview) {
    return (
      <div style={{ padding: "24px", textAlign: "center" }}>
        <Spin size="large" />
        <div style={{ marginTop: 16 }}>Loading rank tracking data...</div>
      </div>
    );
  }

  return (
    <div style={{ padding: "24px", background: "#f5f5f5", minHeight: "100vh" }}>
      {/* Header */}
      <div
        style={{
          marginBottom: "24px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Title level={3} style={{ margin: 0 }}>
          {projectName} - Rank Tracking
        </Title>
        <Text type="secondary">
          Last Updated:{" "}
          {projectOverview?.project?.lastUpdated
            ? new Date(projectOverview.project.lastUpdated).toLocaleDateString()
            : "N/A"}
        </Text>
      </div>

      {/* Error handling */}
      {utils.hasErrors && (
        <Alert
          message="Some errors occurred"
          description={
            <ul>
              {utils.getActiveErrors().map(({ key, error }) => (
                <li key={key}>{error}</li>
              ))}
            </ul>
          }
          type="error"
          closable
          onClose={actions.clearAllErrors}
          style={{ marginBottom: 16 }}
        />
      )}

      <Row gutter={[24, 24]}>
        {/* Left Column - Charts and Keywords */}
        <Col span={16}>
          {/* Average Position Chart */}
          {projectOverview && (
            <Card title="Average Position" style={{ marginBottom: "24px" }}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  marginBottom: "16px",
                }}
              >
                <Statistic
                  value={projectOverview.summary.avgPosition}
                  precision={1}
                  valueStyle={{ fontSize: "24px", fontWeight: "bold" }}
                  suffix={
                    <Space>
                      <Text style={{ fontSize: "14px" }}>
                        (was {projectOverview.summary.previousAvgPosition})
                      </Text>
                      <Tag
                        color={
                          projectOverview?.performance?.trend === "up"
                            ? "green"
                            : projectOverview?.performance?.trend === "down"
                            ? "red"
                            : "blue"
                        }
                      >
                        {utils.getTrendIcon(
                          projectOverview?.performance?.trend
                        )}
                      </Tag>
                    </Space>
                  }
                />
              </div>

              <ResponsiveContainer width="100%" height={200}>
                <LineChart data={projectOverview.chartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis domain={["dataMin - 5", "dataMax + 5"]} />
                  <Tooltip />
                  <Line
                    type="monotone"
                    dataKey="position"
                    stroke="#1890ff"
                    strokeWidth={2}
                    dot={{ r: 4 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </Card>
          )}

          {/* Keywords Table */}
          <Card
            title={`Keywords (${keywordsPagination.total})`}
            loading={utils.isLoadingOperation("keywords")}
            extra={
              <Button
                type="primary"
                onClick={() => {
                  // Add keyword functionality here
                  console.log("Add keyword clicked");
                }}
              >
                Add Keyword
              </Button>
            }
          >
            <Table
              columns={columns}
              dataSource={keywords}
              pagination={{
                current: keywordsPagination.page,
                pageSize: keywordsPagination.limit,
                total: keywordsPagination.total,
                showSizeChanger: true,
                onChange: (page, pageSize) => {
                  actions.fetchProjectKeywords(projectId, {
                    page,
                    limit: pageSize,
                  });
                },
              }}
              size="small"
              rowKey="id"
            />
          </Card>
        </Col>

        {/* Right Column - Stats */}
        <Col span={8}>
          {/* Performance Stats */}
          {projectOverview && (
            <Row gutter={[16, 16]} style={{ marginBottom: "24px" }}>
              <Col span={24}>
                <Card>
                  <Statistic
                    title="Keywords Up"
                    value={projectOverview.performance?.keywordsUp}
                    valueStyle={{ color: "#52c41a" }}
                    suffix="↗️"
                  />
                </Card>
              </Col>
              <Col span={24}>
                <Card>
                  <Statistic
                    title="Keywords Down"
                    value={projectOverview.performance?.keywordsDown}
                    valueStyle={{ color: "#ff4d4f" }}
                    suffix="↘️"
                  />
                </Card>
              </Col>
              <Col span={24}>
                <Card>
                  <Statistic
                    title="Keywords Unchanged"
                    value={projectOverview.performance?.keywordsUnchanged}
                    valueStyle={{ color: "#1890ff" }}
                    suffix="→"
                  />
                </Card>
              </Col>
            </Row>
          )}

          {/* Summary Card */}
          {projectOverview && (
            <Card title="Summary">
              <Space
                direction="vertical"
                size="small"
                style={{ width: "100%" }}
              >
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <Text>Total Keywords:</Text>
                  <Text strong>{projectOverview.summary?.totalKeywords}</Text>
                </div>
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <Text>Tracked Keywords:</Text>
                  <Text strong>{projectOverview.summary?.trackedKeywords}</Text>
                </div>
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <Text>Ranked Keywords:</Text>
                  <Text strong>{projectOverview.summary?.rankedKeywords}</Text>
                </div>
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <Text>Top 3:</Text>
                  <Text strong style={{ color: "#52c41a" }}>
                    {projectOverview.rankingDistribution?.top3}
                  </Text>
                </div>
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <Text>Top 10:</Text>
                  <Text strong style={{ color: "#1890ff" }}>
                    {projectOverview.rankingDistribution?.top10}
                  </Text>
                </div>
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <Text>Top 100:</Text>
                  <Text strong style={{ color: "#faad14" }}>
                    {projectOverview.rankingDistribution?.top100}
                  </Text>
                </div>
              </Space>
            </Card>
          )}
        </Col>
      </Row>

      {/* Action Buttons */}
      <div style={{ marginTop: 24, textAlign: "center" }}>
        <Space>
          <Button
            onClick={() => actions.fetchProjectRankingsOverview(projectId)}
            loading={utils.isLoadingOperation("overview")}
          >
            Refresh Overview
          </Button>
          <Button
            onClick={() => actions.fetchProjectKeywords(projectId)}
            loading={utils.isLoadingOperation("keywords")}
          >
            Refresh Keywords
          </Button>
          <Button
            onClick={() => actions.fetchSerpAnalysis(projectId)}
            loading={utils.isLoadingOperation("serpAnalysis")}
          >
            Load SERP Analysis
          </Button>
        </Space>
      </div>
    </div>
  );
};

export default SimpleRankTrackingDashboard;
