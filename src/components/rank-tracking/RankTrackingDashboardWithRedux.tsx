"use client";
import React, { useEffect, useState } from "react";
import {
  Card,
  Select,
  Table,
  Progress,
  Button,
  Typography,
  Row,
  Col,
  Space,
  Tag,
  Spin,
  Alert,
  Statistic,
  Tooltip,
} from "antd";
import { useDispatch, useSelector } from "react-redux";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as RechartsTooltip,
  ResponsiveContainer,
} from "recharts";
import { AppDispatch, RootState } from "@/stores/store";
import {
  fetchProjectRankingsOverview,
  fetchProjectStats,
  fetchProjectKeywords,
  fetchSerpAnalysis,
  fetchTrackingSettings,
  selectProjectOverview,
  selectProjectStats,
  selectKeywords,
  selectKeywordsPagination,
  selectSerpAnalysis,
  selectTrackingSettings,
  selectLoadingStates,
  selectErrorStates,
  updateKeywordsFilters,
  clearError,
} from "@/stores/slices/rank-tracking.slice";

const { Title, Text } = Typography;
const { Option } = Select;

interface RankTrackingDashboardWithReduxProps {
  projectId: string;
  projectName: string;
  onEditProject: () => void;
}

const RankTrackingDashboardWithRedux: React.FC<
  RankTrackingDashboardWithReduxProps
> = ({ projectId, projectName, onEditProject }) => {
  const dispatch = useDispatch<AppDispatch>();

  // Redux state
  const projectOverview = useSelector(selectProjectOverview);
  const projectStats = useSelector(selectProjectStats);
  const keywords = useSelector(selectKeywords);
  const keywordsPagination = useSelector(selectKeywordsPagination);
  const serpAnalysis = useSelector(selectSerpAnalysis);
  const trackingSettings = useSelector(selectTrackingSettings);
  const loading = useSelector(selectLoadingStates);
  const errors = useSelector(selectErrorStates);

  // Local state
  const [selectedPeriod, setSelectedPeriod] = useState("Last 30 days");
  const [selectedLocation, setSelectedLocation] = useState("Nigeria");

  // Load data on component mount
  useEffect(() => {
    if (projectId) {
      dispatch(fetchProjectRankingsOverview(projectId));
      dispatch(fetchProjectStats(projectId));
      dispatch(fetchProjectKeywords({ projectId }));
      dispatch(fetchSerpAnalysis(projectId));
      dispatch(fetchTrackingSettings(projectId));
    }
  }, [dispatch, projectId]);

  // Handle period change
  const handlePeriodChange = (period: string) => {
    setSelectedPeriod(period);
    // Refetch data with new period if needed
    if (projectId) {
      dispatch(fetchProjectRankingsOverview(projectId));
    }
  };

  // Handle location change
  const handleLocationChange = (location: string) => {
    setSelectedLocation(location);
    // Update tracking settings if needed
  };

  // Handle keyword sorting
  const handleTableChange = (pagination: any, filters: any, sorter: any) => {
    const { field, order } = sorter;
    if (field && order) {
      dispatch(
        updateKeywordsFilters({
          sortBy: field,
          sortOrder: order === "ascend" ? "asc" : "desc",
          page: 1,
        })
      );

      // Refetch with new sorting
      dispatch(
        fetchProjectKeywords({
          projectId,
          params: {
            sortBy: field,
            sortOrder: order === "ascend" ? "asc" : "desc",
            page: 1,
            limit: keywordsPagination.limit,
          },
        })
      );
    }
  };

  // Table columns for keywords
  const keywordColumns = [
    {
      title: "Position",
      dataIndex: "position",
      key: "position",
      width: 80,
      sorter: true,
      render: (position: number) => (
        <Text
          strong={position <= 10}
          style={{
            color:
              position <= 3
                ? "#52c41a"
                : position <= 10
                ? "#1890ff"
                : undefined,
          }}
        >
          {position}
        </Text>
      ),
    },
    {
      title: "Keyword",
      dataIndex: "keyword",
      key: "keyword",
      sorter: true,
    },
    {
      title: "Change",
      dataIndex: "change",
      key: "change",
      width: 80,
      sorter: true,
      render: (change: number) => (
        <Text
          style={{
            color: change > 0 ? "#52c41a" : change < 0 ? "#ff4d4f" : "#666",
          }}
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
      sorter: true,
      render: (volume: number) => volume?.toLocaleString() || "-",
    },
    {
      title: "Difficulty",
      dataIndex: "difficulty",
      key: "difficulty",
      width: 80,
      sorter: true,
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
    {
      title: "URL",
      dataIndex: "url",
      key: "url",
      render: (url: string) => (
        <Tooltip title={url}>
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: "#1890ff" }}
          >
            {url?.length > 50 ? `${url.substring(0, 50)}...` : url}
          </a>
        </Tooltip>
      ),
    },
    {
      title: "Trend",
      dataIndex: "trend",
      key: "trend",
      width: 80,
      render: (trend: string) => {
        const trendIcons = {
          up: "↗️",
          down: "↘️",
          stable: "→",
          "no-data": "-",
        };
        const trendColors = {
          up: "#52c41a",
          down: "#ff4d4f",
          stable: "#1890ff",
          "no-data": "#666",
        };
        return (
          <span
            style={{ color: trendColors[trend as keyof typeof trendColors] }}
          >
            {trendIcons[trend as keyof typeof trendIcons]}
          </span>
        );
      },
    },
  ];

  // SERP Analysis columns
  const serpColumns = [
    {
      title: "Rank",
      dataIndex: "rank",
      key: "rank",
      width: 60,
    },
    {
      title: "URL",
      dataIndex: "url",
      key: "url",
      render: (url: string) => (
        <Tooltip title={url}>
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: "#1890ff" }}
          >
            {url?.length > 40 ? `${url.substring(0, 40)}...` : url}
          </a>
        </Tooltip>
      ),
    },
    {
      title: "Pages",
      dataIndex: "page",
      key: "page",
      width: 80,
    },
    {
      title: "Backlinks",
      dataIndex: "backlinks",
      key: "backlinks",
      width: 100,
    },
    {
      title: "Search Traffic",
      dataIndex: "searchTraffic",
      key: "searchTraffic",
      width: 120,
    },
    {
      title: "Keywords",
      dataIndex: "keywords",
      key: "keywords",
      width: 100,
    },
  ];

  // Error handling
  const renderError = (errorKey: keyof typeof errors) => {
    if (errors[errorKey]) {
      return (
        <Alert
          message="Error"
          description={errors[errorKey]}
          type="error"
          closable
          onClose={() => dispatch(clearError(errorKey))}
          style={{ marginBottom: 16 }}
        />
      );
    }
    return null;
  };

  if (loading.overview && !projectOverview) {
    return (
      <div style={{ padding: "24px", textAlign: "center" }}>
        <Spin size="large" />
        <div style={{ marginTop: 16 }}>Loading rank tracking dashboard...</div>
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
        <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
          <Title level={3} style={{ margin: 0 }}>
            Rank Tracking
          </Title>
          <Space>
            <Select
              value={projectName}
              style={{ width: 200 }}
              onChange={onEditProject}
            >
              <Option value={projectName}>{projectName}</Option>
            </Select>
            <Button type="primary" onClick={onEditProject}>
              + Edit project
            </Button>
          </Space>
        </div>
        <div>
          <Text type="secondary">Last Updated</Text>
          <br />
          <Text>
            {projectOverview?.project?.lastUpdated
              ? new Date(
                  projectOverview.project.lastUpdated
                ).toLocaleDateString()
              : trackingSettings?.lastUpdated
              ? new Date(trackingSettings.lastUpdated).toLocaleDateString()
              : "N/A"}
          </Text>
        </div>
      </div>

      {/* Errors */}
      {renderError("overview")}
      {renderError("stats")}
      {renderError("keywords")}

      {/* Filters */}
      <div
        style={{
          marginBottom: "24px",
          display: "flex",
          gap: "16px",
          alignItems: "center",
        }}
      >
        <Text>Showing rankings for:</Text>
        <Select
          value={selectedPeriod}
          style={{ width: 150 }}
          onChange={handlePeriodChange}
        >
          <Option value="Last 7 days">Last 7 days</Option>
          <Option value="Last 30 days">Last 30 days</Option>
          <Option value="Last 90 days">Last 90 days</Option>
        </Select>
        <Select
          value={trackingSettings?.location || selectedLocation}
          style={{ width: 120 }}
          onChange={handleLocationChange}
        >
          <Option value="Nigeria">Nigeria 🇳🇬</Option>
          <Option value="US">US 🇺🇸</Option>
          <Option value="UK">UK 🇬🇧</Option>
        </Select>
      </div>

      <Row gutter={[24, 24]}>
        {/* Left Column */}
        <Col span={16}>
          {/* Average Position Chart */}
          <Card
            title="Average Position"
            style={{ marginBottom: "24px" }}
            loading={loading.overview}
          >
            {projectOverview && (
              <>
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
                    valueStyle={{ fontSize: "32px", fontWeight: "bold" }}
                    suffix={
                      <Space>
                        <Text style={{ fontSize: "16px" }}>
                          → {projectOverview.summary.previousAvgPosition}
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
                          {projectOverview?.performance?.trend === "up"
                            ? "↗️"
                            : projectOverview?.performance?.trend === "down"
                            ? "↘️"
                            : "→"}
                        </Tag>
                      </Space>
                    }
                  />
                </div>

                {/* Chart */}
                <ResponsiveContainer width="100%" height={200}>
                  <LineChart data={projectOverview.chartData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis domain={["dataMin - 5", "dataMax + 5"]} />
                    <RechartsTooltip />
                    <Line
                      type="monotone"
                      dataKey="position"
                      stroke="#1890ff"
                      strokeWidth={2}
                      dot={{ r: 4 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </>
            )}
          </Card>

          {/* Tracked Keywords Table */}
          <Card
            title={`Tracked Keywords (${keywordsPagination.total})`}
            loading={loading.keywords}
          >
            <Table
              columns={keywordColumns}
              dataSource={keywords}
              pagination={{
                current: keywordsPagination.page,
                pageSize: keywordsPagination.limit,
                total: keywordsPagination.total,
                showSizeChanger: true,
                showQuickJumper: true,
                onChange: (page, pageSize) => {
                  dispatch(updateKeywordsFilters({ page, limit: pageSize }));
                  dispatch(
                    fetchProjectKeywords({
                      projectId,
                      params: { page, limit: pageSize },
                    })
                  );
                },
              }}
              onChange={handleTableChange}
              size="small"
              rowKey="id"
            />
          </Card>
        </Col>

        {/* Right Column */}
        <Col span={8}>
          {/* Stats Cards */}
          <Row gutter={[16, 16]} style={{ marginBottom: "24px" }}>
            <Col span={24}>
              <Card loading={loading.overview}>
                <Statistic
                  title="Keywords Up"
                  value={projectOverview?.performance?.keywordsUp || 0}
                  valueStyle={{ color: "#52c41a" }}
                  suffix="↗️"
                />
              </Card>
            </Col>
            <Col span={24}>
              <Card loading={loading.overview}>
                <Statistic
                  title="Keywords Down"
                  value={projectOverview?.performance?.keywordsDown || 0}
                  valueStyle={{ color: "#ff4d4f" }}
                  suffix="↘️"
                />
              </Card>
            </Col>
            <Col span={24}>
              <Card loading={loading.overview}>
                <Statistic
                  title="Keywords Unchanged"
                  value={projectOverview?.performance?.keywordsUnchanged || 0}
                  valueStyle={{ color: "#1890ff" }}
                  suffix="→"
                />
              </Card>
            </Col>
          </Row>

          {/* Ranking Distribution */}
          <Card
            title="Ranking Distribution"
            style={{ marginBottom: "24px" }}
            loading={loading.overview}
          >
            {projectOverview && (
              <div style={{ textAlign: "center" }}>
                <Progress
                  type="circle"
                  percent={100}
                  strokeColor="#6b7bf7"
                  format={() =>
                    projectOverview.summary.totalKeywords.toString()
                  }
                  width={120}
                />
                <div style={{ marginTop: "16px" }}>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      fontSize: "12px",
                      marginBottom: "4px",
                    }}
                  >
                    <span style={{ color: "#6b7bf7" }}>■ Not ranking</span>
                    <span>
                      {projectOverview.rankingDistribution?.notRanking}
                    </span>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      fontSize: "12px",
                      marginBottom: "4px",
                    }}
                  >
                    <span style={{ color: "#ffa940" }}>■ Top 100</span>
                    <span>{projectOverview.rankingDistribution?.top100}</span>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      fontSize: "12px",
                      marginBottom: "4px",
                    }}
                  >
                    <span style={{ color: "#52c41a" }}>■ Top 10</span>
                    <span>{projectOverview.rankingDistribution?.top10}</span>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      fontSize: "12px",
                    }}
                  >
                    <span style={{ color: "#ff4d4f" }}>■ Top 3</span>
                    <span>{projectOverview.rankingDistribution?.top3}</span>
                  </div>
                </div>
              </div>
            )}
          </Card>
        </Col>
      </Row>

      {/* SERP Analysis */}
      <Card
        title="SERP Analysis"
        extra={<Button type="link">View all</Button>}
        style={{ marginTop: "24px" }}
        loading={loading.serpAnalysis}
      >
        {renderError("serpAnalysis")}
        <Table
          columns={serpColumns}
          dataSource={serpAnalysis?.serpData || []}
          pagination={false}
          size="small"
          rowKey={(record, index) => `${record.url}-${index}`}
        />
      </Card>
    </div>
  );
};

export default RankTrackingDashboardWithRedux;
