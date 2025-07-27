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
} from "@ant-design/icons";
import { useAppDispatch, useAppSelector } from "@/stores/hooks";
import { fetchProjects } from "@/stores/slices/project.slice";
import {
  fetchTrafficData,
  fetchTrafficSources,
  fetchTopPages,
  setFilters,
} from "@/stores/slices/traffic.slice";
import { Project } from "@/types/api.type";
import styles from "./page.module.scss";

const { Title, Text } = Typography;
const { RangePicker } = DatePicker;
const { Option } = Select;

const TrafficPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const { projects } = useAppSelector((state) => state.project);
  const {
    trafficData,
    trafficSources,
    topPages,
    totalStats,
    loading,
    error,
    filters,
  } = useAppSelector((state) => state.traffic);

  const [selectedProject, setSelectedProject] = useState<string>("");

  useEffect(() => {
    // Load projects on component mount
    dispatch(fetchProjects());
  }, [dispatch]);

  useEffect(() => {
    if (projects.length > 0 && !selectedProject) {
      setSelectedProject(projects[0].id);
    }
  }, [projects, selectedProject]);

  useEffect(() => {
    if (selectedProject) {
      loadTrafficData();
    }
  }, [selectedProject, filters]);

  const loadTrafficData = () => {
    if (!selectedProject) return;

    dispatch(fetchTrafficData({ projectId: selectedProject, filters }));
    dispatch(fetchTrafficSources({ projectId: selectedProject, filters }));
    dispatch(fetchTopPages({ projectId: selectedProject, filters }));
  };

  const handleDateRangeChange = (dates: any) => {
    if (dates && dates.length === 2) {
      dispatch(
        setFilters({
          dateRange: {
            start: dates[0].format("YYYY-MM-DD"),
            end: dates[1].format("YYYY-MM-DD"),
          },
        })
      );
    }
  };

  const formatDuration = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
  };

  const formatPercentage = (value: number) => {
    return `${(value * 100).toFixed(1)}%`;
  };

  const getSourceIcon = (source: string) => {
    switch (source.toLowerCase()) {
      case "organic search":
        return <SearchOutlined style={{ color: "#52c41a" }} />;
      case "paid search":
        return <DollarOutlined style={{ color: "#fa8c16" }} />;
      case "social media":
        return <ShareAltOutlined style={{ color: "#1890ff" }} />;
      case "direct":
        return <GlobalOutlined style={{ color: "#722ed1" }} />;
      default:
        return <GlobalOutlined style={{ color: "#666" }} />;
    }
  };

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
      render: (views: number) => <Text>{views.toLocaleString()}</Text>,
    },
    {
      title: "Unique Views",
      dataIndex: "uniquePageViews",
      key: "uniquePageViews",
      render: (views: number) => <Text>{views.toLocaleString()}</Text>,
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
              onChange={setSelectedProject}
            >
              {projects.map((project: Project) => (
                <Option key={project.id} value={project.id}>
                  {project.name} ({project.domain})
                </Option>
              ))}
            </Select>
            <RangePicker onChange={handleDateRangeChange} format="YYYY-MM-DD" />
          </Space>
        </div>
      </div>

      {selectedProject ? (
        <>
          {/* Overview Stats */}
          <Row gutter={16} className={styles.statsRow}>
            <Col span={6}>
              <Card>
                <Statistic
                  title="Total Page Views"
                  value={totalStats.totalPageViews}
                  prefix={<EyeOutlined />}
                  valueStyle={{ color: "#1890ff" }}
                />
              </Card>
            </Col>
            <Col span={6}>
              <Card>
                <Statistic
                  title="Unique Visitors"
                  value={totalStats.totalUniqueVisitors}
                  prefix={<UserOutlined />}
                  valueStyle={{ color: "#52c41a" }}
                />
              </Card>
            </Col>
            <Col span={6}>
              <Card>
                <Statistic
                  title="Avg. Session Duration"
                  value={formatDuration(totalStats.avgSessionDuration)}
                  prefix={<ClockCircleOutlined />}
                  valueStyle={{ color: "#fa8c16" }}
                />
              </Card>
            </Col>
            <Col span={6}>
              <Card>
                <Statistic
                  title="Bounce Rate"
                  value={formatPercentage(totalStats.avgBounceRate)}
                  prefix={<PercentageOutlined />}
                  valueStyle={{
                    color:
                      totalStats.avgBounceRate < 0.4
                        ? "#52c41a"
                        : totalStats.avgBounceRate < 0.6
                        ? "#fa8c16"
                        : "#ff4d4f",
                  }}
                />
              </Card>
            </Col>
          </Row>

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
                  dataSource={trafficSources}
                  rowKey="source"
                  pagination={false}
                  loading={loading}
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
                  dataSource={topPages}
                  rowKey="url"
                  pagination={false}
                  loading={loading}
                  size="small"
                />
              </Card>
            </Col>
          </Row>

          {/* Traffic Chart Placeholder */}
          <Row gutter={16}>
            <Col span={24}>
              <Card
                title="Traffic Overview"
                className={styles.chartCard}
                extra={
                  <Space>
                    <Select defaultValue="pageViews" size="small">
                      <Option value="pageViews">Page Views</Option>
                      <Option value="uniqueVisitors">Unique Visitors</Option>
                      <Option value="organicTraffic">Organic Traffic</Option>
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
                    Showing data from {filters.dateRange.start} to{" "}
                    {filters.dateRange.end}
                  </Text>
                  <div style={{ marginTop: 16 }}>
                    <Button type="primary">Enable Advanced Analytics</Button>
                  </div>
                </div>
              </Card>
            </Col>
          </Row>
        </>
      ) : (
        <Card className={styles.noProject}>
          <div className={styles.emptyState}>
            <Title level={3}>No Project Selected</Title>
            <Text type="secondary">
              Please select a project to view traffic analytics
            </Text>
            <div style={{ marginTop: 16 }}>
              <Button type="primary" href="/admin/projects">
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
