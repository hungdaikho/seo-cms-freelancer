"use client";

import React, { useEffect, useState } from "react";
import {
  Card,
  Row,
  Col,
  Statistic,
  Select,
  DatePicker,
  Typography,
  Space,
  Table,
  Progress,
  Tag,
  Button,
  Tooltip,
  Alert,
  message,
} from "antd";
import {
  ArrowUpOutlined,
  ArrowDownOutlined,
  EyeOutlined,
  UserOutlined,
  ClockCircleOutlined,
  PercentageOutlined,
  GlobalOutlined,
  ShareAltOutlined,
  SearchOutlined,
  DollarOutlined,
  SyncOutlined,
  SettingOutlined,
  ReloadOutlined,
} from "@ant-design/icons";
import { useSearchParams } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/stores/hooks";
import { fetchProjects } from "@/stores/slices/project.slice";
import {
  fetchTrafficOverview,
  fetchTrafficSources,
  fetchPagePerformance,
  fetchUserBehavior,
  fetchRealTimeAnalytics,
  syncTrafficData,
  setFilters,
  setProjectId,
  clearError,
  selectTrafficOverview,
  selectTrafficSources,
  selectPagePerformance,
  selectUserBehavior,
  selectRealTimeAnalytics,
  selectTrafficAnalyticsLoading,
  selectTrafficAnalyticsError,
  selectTrafficAnalyticsFilters,
} from "@/stores/slices/traffic-analytics.slice";
import { Project } from "@/types/api.type";
import styles from "./page.module.scss";

const { Title, Text } = Typography;
const { RangePicker } = DatePicker;
const { Option } = Select;

const TrafficPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const { projects } = useAppSelector((state) => state.project);
  const searchParams = useSearchParams();

  // New traffic analytics selectors
  const overview = useAppSelector(selectTrafficOverview);
  const trafficSources = useAppSelector(selectTrafficSources);
  const pagePerformance = useAppSelector(selectPagePerformance);
  const userBehavior = useAppSelector(selectUserBehavior);
  const realTimeData = useAppSelector(selectRealTimeAnalytics);
  const loading = useAppSelector(selectTrafficAnalyticsLoading);
  const error = useAppSelector(selectTrafficAnalyticsError);
  const filters = useAppSelector(selectTrafficAnalyticsFilters);

  const [selectedProject, setSelectedProject] = useState<string>("");

  // Tab mapping for URL parameters (for navigation features)
  const tabMapping: { [key: string]: boolean } = {
    "traffic-get-started": true,
    analytics: true,
    "traffic-journey": true,
    "market-explorer": true,
    "advertising-research": true,
    "social-media-analytics": true,
  };

  // Handle tab parameter from URL - just acknowledge it exists
  useEffect(() => {
    const tabParam = searchParams.get("tab");
    if (tabParam && tabMapping[tabParam]) {
      // Tab parameter recognized, show the analytics dashboard
      // No need to change UI since all traffic features use the same dashboard
      console.log(`Navigated to Traffic feature: ${tabParam}`);
    }
  }, [searchParams]);

  useEffect(() => {
    // Load projects on component mount
    dispatch(fetchProjects());
  }, [dispatch]);

  useEffect(() => {
    if (projects.length > 0 && !selectedProject) {
      const firstProject = projects[0].id;
      setSelectedProject(firstProject);
      dispatch(setProjectId(firstProject));
    }
  }, [projects, selectedProject, dispatch]);

  useEffect(() => {
    if (selectedProject) {
      loadTrafficData();
    }
  }, [selectedProject, filters]);

  useEffect(() => {
    // Show error message if there's an error
    if (error) {
      message.error(error);
      dispatch(clearError());
    }
  }, [error, dispatch]);

  const loadTrafficData = () => {
    if (!selectedProject) return;

    // Prepare request parameters based on filters
    const requestParams = {
      period: filters.period,
      startDate: filters.startDate,
      endDate: filters.endDate,
    };

    dispatch(
      fetchTrafficOverview({
        projectId: selectedProject,
        request: requestParams,
      })
    );
    dispatch(fetchTrafficSources({ projectId: selectedProject }));
    dispatch(
      fetchPagePerformance({
        projectId: selectedProject,
        request: { limit: 10 },
      })
    );
    dispatch(
      fetchUserBehavior({
        projectId: selectedProject,
        request: {
          includeDevices: true,
          includeGeographic: true,
        },
      })
    );
  };

  const handleProjectChange = (projectId: string) => {
    setSelectedProject(projectId);
    dispatch(setProjectId(projectId));
  };

  const handleDateRangeChange = (dates: any) => {
    if (dates && dates.length === 2) {
      dispatch(
        setFilters({
          period: "custom",
          startDate: dates[0].format("YYYY-MM-DD"),
          endDate: dates[1].format("YYYY-MM-DD"),
        })
      );
    }
  };

  const handlePeriodChange = (period: any) => {
    dispatch(setFilters({ period }));
  };

  const handleSyncData = () => {
    if (selectedProject) {
      dispatch(syncTrafficData({ projectId: selectedProject }));
      message.info("Starting data synchronization...");
    }
  };

  const handleRefreshRealTime = () => {
    if (selectedProject) {
      dispatch(fetchRealTimeAnalytics({ projectId: selectedProject }));
    }
  };

  const formatDuration = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
  };

  const formatPercentage = (value: number) => {
    // If value is already a percentage (like 45.2), just add % sign
    // If value is decimal (like 0.452), convert to percentage
    if (value <= 1) {
      return `${(value * 100).toFixed(1)}%`;
    } else {
      return `${value.toFixed(1)}%`;
    }
  };

  const getSourceIcon = (source: string) => {
    const lowerSource = source.toLowerCase();
    if (lowerSource.includes("organic") || lowerSource.includes("search")) {
      return <SearchOutlined style={{ color: "#52c41a" }} />;
    } else if (lowerSource.includes("paid") || lowerSource.includes("cpc")) {
      return <DollarOutlined style={{ color: "#fa8c16" }} />;
    } else if (lowerSource.includes("social")) {
      return <ShareAltOutlined style={{ color: "#1890ff" }} />;
    } else if (lowerSource.includes("direct")) {
      return <GlobalOutlined style={{ color: "#722ed1" }} />;
    } else {
      return <GlobalOutlined style={{ color: "#666" }} />;
    }
  };

  // Prepare data for tables
  const sourcesTableData = trafficSources?.data?.sources?.map(
    (source: any, index: any) => ({
      key: index,
      source: `${source.source} (${source.medium})`,
      visits: source.sessions,
      percentage: Math.round(
        (source.sessions / (overview?.data?.totalSessions || 1)) * 100
      ),
      trend: "stable" as const, // TODO: Calculate trend from period comparison
      change: 0, // TODO: Calculate from period comparison
    })
  ) || [
    // Mock data when no API data available
    {
      key: 1,
      source: "google (organic)",
      visits: 450,
      percentage: 45,
      trend: "up" as const,
      change: 12,
    },
    {
      key: 2,
      source: "direct (none)",
      visits: 280,
      percentage: 28,
      trend: "stable" as const,
      change: 0,
    },
    {
      key: 3,
      source: "facebook (social)",
      visits: 120,
      percentage: 12,
      trend: "up" as const,
      change: 8,
    },
    {
      key: 4,
      source: "google (cpc)",
      visits: 90,
      percentage: 9,
      trend: "down" as const,
      change: -5,
    },
    {
      key: 5,
      source: "linkedin (referral)",
      visits: 60,
      percentage: 6,
      trend: "up" as const,
      change: 3,
    },
  ];

  const pagesTableData = pagePerformance?.data?.pages?.map(
    (page: any, index: any) => ({
      key: index,
      url: page.pagePath,
      pageTitle: page.pageTitle,
      pageViews: page.pageviews,
      uniquePageViews: page.uniquePageviews,
      avgTimeOnPage: page.avgTimeOnPage,
      bounceRate: page.bounceRate / 100, // Convert to decimal
    })
  ) || [
    // Mock data when no API data available
    {
      key: 1,
      url: "/",
      pageTitle: "Home Page",
      pageViews: 850,
      uniquePageViews: 720,
      avgTimeOnPage: 124,
      bounceRate: 0.35,
    },
    {
      key: 2,
      url: "/services",
      pageTitle: "Our Services",
      pageViews: 420,
      uniquePageViews: 380,
      avgTimeOnPage: 180,
      bounceRate: 0.25,
    },
    {
      key: 3,
      url: "/about",
      pageTitle: "About Us",
      pageViews: 320,
      uniquePageViews: 290,
      avgTimeOnPage: 95,
      bounceRate: 0.45,
    },
    {
      key: 4,
      url: "/contact",
      pageTitle: "Contact Us",
      pageViews: 180,
      uniquePageViews: 165,
      avgTimeOnPage: 60,
      bounceRate: 0.6,
    },
    {
      key: 5,
      url: "/blog",
      pageTitle: "Blog",
      pageViews: 150,
      uniquePageViews: 140,
      avgTimeOnPage: 210,
      bounceRate: 0.3,
    },
  ];

  const sourcesColumns = [
    {
      title: "Source",
      dataIndex: "source",
      key: "source",
      render: (source: string) => (
        <Space>
          {getSourceIcon(source)}
          <Text strong>{source}</Text>
        </Space>
      ),
    },
    {
      title: "Visits",
      dataIndex: "visits",
      key: "visits",
      render: (visits: number) => <Text>{visits.toLocaleString()}</Text>,
    },
    {
      title: "Percentage",
      dataIndex: "percentage",
      key: "percentage",
      render: (percentage: number) => (
        <div style={{ width: 120 }}>
          <Progress percent={percentage} size="small" />
        </div>
      ),
    },
    {
      title: "Trend",
      dataIndex: "trend",
      key: "trend",
      render: (trend: string, record: any) => (
        <Space>
          {trend === "up" ? (
            <ArrowUpOutlined style={{ color: "#52c41a" }} />
          ) : trend === "down" ? (
            <ArrowDownOutlined style={{ color: "#ff4d4f" }} />
          ) : null}
          <Text
            type={
              trend === "up"
                ? "success"
                : trend === "down"
                ? "danger"
                : "secondary"
            }
          >
            {record.change > 0 ? `+${record.change}%` : `${record.change}%`}
          </Text>
        </Space>
      ),
    },
  ];

  const pagesColumns = [
    {
      title: "Page",
      dataIndex: "url",
      key: "url",
      render: (url: string, record: any) => (
        <div>
          <Text strong>{record.pageTitle}</Text>
          <br />
          <Text type="secondary" style={{ fontSize: "12px" }}>
            {url}
          </Text>
        </div>
      ),
    },
    {
      title: "Page Views",
      dataIndex: "pageViews",
      key: "pageViews",
      render: (views: number) => <Text>{views?.toLocaleString()}</Text>,
    },
    {
      title: "Unique Views",
      dataIndex: "uniquePageViews",
      key: "uniquePageViews",
      render: (views: number) => <Text>{views?.toLocaleString()}</Text>,
    },
    {
      title: "Avg. Time",
      dataIndex: "avgTimeOnPage",
      key: "avgTimeOnPage",
      render: (time: number) => <Text>{formatDuration(time)}</Text>,
    },
    {
      title: "Bounce Rate",
      dataIndex: "bounceRate",
      key: "bounceRate",
      render: (rate: number) => (
        <Tag color={rate < 0.4 ? "green" : rate < 0.6 ? "orange" : "red"}>
          {formatPercentage(rate)}
        </Tag>
      ),
    },
  ];

  return (
    <div className={styles.trafficPage}>
      {/* Header */}
      <div className={styles.header}>
        <div className={styles.titleSection}>
          <Title level={2}>Traffic Analytics</Title>
          <Text type="secondary">
            Analyze your website traffic and user behavior
          </Text>
        </div>
        <div className={styles.controls}>
          <Space size="large">
            <Select
              placeholder="Select a project"
              style={{ width: 300 }}
              value={selectedProject}
              onChange={handleProjectChange}
            >
              {projects.map((project: Project) => (
                <Option key={project.id} value={project.id}>
                  {project.name} ({project.domain})
                </Option>
              ))}
            </Select>

            <Select
              value={filters.period}
              onChange={handlePeriodChange}
              style={{ width: 120 }}
            >
              <Option value="today">Today</Option>
              <Option value="yesterday">Yesterday</Option>
              <Option value="7d">7 Days</Option>
              <Option value="30d">30 Days</Option>
              <Option value="90d">90 Days</Option>
              <Option value="12m">12 Months</Option>
              <Option value="custom">Custom</Option>
            </Select>

            {filters.period === "custom" && (
              <RangePicker
                onChange={handleDateRangeChange}
                format="YYYY-MM-DD"
              />
            )}

            <Button
              icon={<SyncOutlined />}
              onClick={handleSyncData}
              loading={loading.sync}
            >
              Sync Data
            </Button>

            <Button
              icon={<ReloadOutlined />}
              onClick={handleRefreshRealTime}
              loading={loading.realTime}
            >
              Refresh
            </Button>
          </Space>
        </div>
      </div>

      {selectedProject ? (
        <>
          {/* Show error alert if there's an error */}
          {error && (
            <Alert
              message="Error loading traffic data"
              description={error}
              type="error"
              closable
              style={{ marginBottom: 16 }}
            />
          )}

          {/* Overview Stats */}
          <Row gutter={16} className={styles.statsRow}>
            <Col span={6}>
              <Card loading={loading.overview}>
                <Statistic
                  title="Total Page Views"
                  value={overview?.data?.totalPageviews || 0}
                  prefix={<EyeOutlined />}
                  valueStyle={{ color: "#1890ff" }}
                />
                <Text type="secondary" style={{ fontSize: "12px" }}>
                  Last 30 days
                </Text>
              </Card>
            </Col>
            <Col span={6}>
              <Card loading={loading.overview}>
                <Statistic
                  title="Total Users"
                  value={overview?.data?.totalUsers || 0}
                  prefix={<UserOutlined />}
                  valueStyle={{ color: "#52c41a" }}
                />
                <Text type="secondary" style={{ fontSize: "12px" }}>
                  Unique visitors
                </Text>
              </Card>
            </Col>
            <Col span={6}>
              <Card loading={loading.overview}>
                <Statistic
                  title="Avg. Session Duration"
                  value={formatDuration(
                    overview?.data?.avgSessionDuration || 0
                  )}
                  prefix={<ClockCircleOutlined />}
                  valueStyle={{ color: "#fa8c16" }}
                />
                <Text type="secondary" style={{ fontSize: "12px" }}>
                  Time on site
                </Text>
              </Card>
            </Col>
            <Col span={6}>
              <Card loading={loading.overview}>
                <Statistic
                  title="Bounce Rate"
                  value={formatPercentage(overview?.data?.bounceRate || 0)}
                  prefix={<PercentageOutlined />}
                  valueStyle={{
                    color:
                      (overview?.data?.bounceRate || 0) < 40
                        ? "#52c41a"
                        : (overview?.data?.bounceRate || 0) < 60
                        ? "#fa8c16"
                        : "#ff4d4f",
                  }}
                />
                <Text type="secondary" style={{ fontSize: "12px" }}>
                  {(overview?.data?.bounceRate || 0) < 40
                    ? "Excellent"
                    : (overview?.data?.bounceRate || 0) < 60
                    ? "Good"
                    : "Needs improvement"}
                </Text>
              </Card>
            </Col>
          </Row>

          {/* Period Comparison */}
          {overview?.data && (
            <Row gutter={16} style={{ marginBottom: 16 }}>
              <Col span={24}>
                <Card title="Period Comparison" size="small">
                  <Row gutter={16}>
                    <Col span={6}>
                      <Statistic
                        title="Sessions Change"
                        value={
                          overview.data?.periodComparison?.sessionsChange || 0
                        }
                        precision={1}
                        valueStyle={{
                          color:
                            (overview.data?.periodComparison?.sessionsChange ||
                              0) > 0
                              ? "#52c41a"
                              : "#ff4d4f",
                        }}
                        prefix={
                          (overview.data?.periodComparison?.sessionsChange ||
                            0) > 0 ? (
                            <ArrowUpOutlined />
                          ) : (
                            <ArrowDownOutlined />
                          )
                        }
                        suffix="%"
                      />
                    </Col>
                    <Col span={6}>
                      <Statistic
                        title="Users Change"
                        value={
                          overview.data?.periodComparison?.usersChange || 0
                        }
                        precision={1}
                        valueStyle={{
                          color:
                            (overview.data?.periodComparison?.usersChange ||
                              0) > 0
                              ? "#52c41a"
                              : "#ff4d4f",
                        }}
                        prefix={
                          (overview.data?.periodComparison?.usersChange || 0) >
                          0 ? (
                            <ArrowUpOutlined />
                          ) : (
                            <ArrowDownOutlined />
                          )
                        }
                        suffix="%"
                      />
                    </Col>
                    <Col span={6}>
                      <Statistic
                        title="Pageviews Change"
                        value={
                          overview.data?.periodComparison?.pageviewsChange || 0
                        }
                        precision={1}
                        valueStyle={{
                          color:
                            (overview.data?.periodComparison?.pageviewsChange ||
                              0) > 0
                              ? "#52c41a"
                              : "#ff4d4f",
                        }}
                        prefix={
                          (overview.data?.periodComparison?.pageviewsChange ||
                            0) > 0 ? (
                            <ArrowUpOutlined />
                          ) : (
                            <ArrowDownOutlined />
                          )
                        }
                        suffix="%"
                      />
                    </Col>
                    <Col span={6}>
                      <Statistic
                        title="Bounce Rate Change"
                        value={
                          overview.data?.periodComparison?.bounceRateChange || 0
                        }
                        precision={1}
                        valueStyle={{
                          color:
                            (overview.data?.periodComparison
                              ?.bounceRateChange || 0) < 0
                              ? "#52c41a"
                              : "#ff4d4f",
                        }}
                        prefix={
                          (overview.data?.periodComparison?.bounceRateChange ||
                            0) < 0 ? (
                            <ArrowDownOutlined />
                          ) : (
                            <ArrowUpOutlined />
                          )
                        }
                        suffix="%"
                      />
                    </Col>
                  </Row>
                </Card>
              </Col>
            </Row>
          )}

          {/* Traffic Sources and Top Pages */}
          <Row gutter={16} className={styles.chartsRow}>
            <Col span={12}>
              <Card
                title="Traffic Sources"
                className={styles.chartCard}
                extra={
                  <Button type="link" size="small">
                    View Details
                  </Button>
                }
              >
                <Table
                  columns={sourcesColumns}
                  dataSource={sourcesTableData}
                  rowKey="key"
                  pagination={false}
                  loading={loading.trafficSources}
                  size="small"
                />
              </Card>
            </Col>
            <Col span={12}>
              <Card
                title="Top Pages"
                className={styles.chartCard}
                extra={
                  <Button type="link" size="small">
                    View All Pages
                  </Button>
                }
              >
                <Table
                  columns={pagesColumns}
                  dataSource={pagesTableData}
                  rowKey="key"
                  pagination={false}
                  loading={loading.pagePerformance}
                  size="small"
                />
              </Card>
            </Col>
          </Row>

          {/* Real-time Analytics */}
          {(realTimeData || true) && (
            <Row gutter={16} style={{ marginBottom: 16 }}>
              <Col span={24}>
                <Card
                  title="Real-time Analytics"
                  size="small"
                  extra={
                    <Button
                      icon={<ReloadOutlined />}
                      size="small"
                      onClick={handleRefreshRealTime}
                      loading={loading.realTime}
                    >
                      Refresh
                    </Button>
                  }
                >
                  <Row gutter={16}>
                    <Col span={8}>
                      <Statistic
                        title="Active Users"
                        value={realTimeData?.data?.activeUsers || 23}
                        prefix={<UserOutlined />}
                        valueStyle={{ color: "#52c41a" }}
                      />
                    </Col>
                    <Col span={8}>
                      <Statistic
                        title="Active Pages"
                        value={realTimeData?.data?.activePages || 12}
                        prefix={<EyeOutlined />}
                        valueStyle={{ color: "#1890ff" }}
                      />
                    </Col>
                    <Col span={8}>
                      <Text type="secondary">
                        Last updated:{" "}
                        {realTimeData?.data?.timestamp
                          ? new Date(
                              realTimeData.data.timestamp
                            ).toLocaleTimeString()
                          : new Date().toLocaleTimeString()}
                      </Text>
                    </Col>
                  </Row>
                </Card>
              </Col>
            </Row>
          )}

          {/* Traffic Chart Placeholder */}
          {/* <Row gutter={16}>
            <Col span={24}>
              <Card
                title="Traffic Overview"
                className={styles.chartCard}
                extra={
                  <Space>
                    <Select defaultValue="pageviews" size="small">
                      <Option value="pageviews">Page Views</Option>
                      <Option value="users">Users</Option>
                      <Option value="sessions">Sessions</Option>
                    </Select>
                  </Space>
                }
              >
                <div className={styles.chartPlaceholder}>
                  <Title level={4} type="secondary">
                    Traffic Chart
                  </Title>
                  <Text type="secondary">
                    Interactive traffic chart will be displayed here
                    <br />
                    Showing data for{" "}
                    {filters.period === "custom"
                      ? `${filters.startDate} to ${filters.endDate}`
                      : filters.period}
                  </Text>
                  <div style={{ marginTop: 16 }}>
                    <Button type="primary">Enable Advanced Analytics</Button>
                  </div>
                </div>
              </Card>
            </Col>
          </Row> */}
        </>
      ) : (
        <Card className={styles.noProject}>
          <div className={styles.emptyState}>
            <Title level={3}>No Project Selected</Title>
            <Text type="secondary">
              Please select a project to view traffic analytics
            </Text>
            <div style={{ marginTop: 16 }}>
              <Button type="primary" href="/projects">
                Go to Projects
              </Button>
            </div>
          </div>
        </Card>
      )}
    </div>
  );
};

export default TrafficPage;
