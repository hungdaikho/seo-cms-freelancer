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
  Tabs,
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
  TrophyOutlined,
  LinkOutlined,
} from "@ant-design/icons";
import { useAppDispatch, useAppSelector } from "@/stores/hooks";
import { fetchProjects } from "@/stores/slices/project.slice";
import { Project } from "@/types/api.type";
import styles from "./traffic_analytics_manager.module.scss";

const { Title, Text } = Typography;
const { RangePicker } = DatePicker;
const { Option } = Select;
const { TabPane } = Tabs;

// Mock data - will be replaced with real API
interface TrafficData {
  date: string;
  sessions: number;
  users: number;
  pageviews: number;
  bounceRate: number;
  avgSessionDuration: number;
}

interface TopPage {
  url: string;
  pageviews: number;
  uniquePageviews: number;
  avgTimeOnPage: number;
  exitRate: number;
  seoScore: number;
}

interface TrafficSource {
  source: string;
  medium: string;
  sessions: number;
  users: number;
  newUsers: number;
  bounceRate: number;
  conversions: number;
}

interface CompetitorTraffic {
  domain: string;
  estimatedVisits: number;
  marketShare: number;
  growth: number;
  topKeywords: string[];
}

const mockTrafficData: TrafficData[] = Array.from({ length: 30 }, (_, i) => ({
  date: new Date(Date.now() - (29 - i) * 24 * 60 * 60 * 1000)
    .toISOString()
    .split("T")[0],
  sessions: Math.floor(Math.random() * 5000) + 2000,
  users: Math.floor(Math.random() * 4000) + 1500,
  pageviews: Math.floor(Math.random() * 10000) + 3000,
  bounceRate: Math.random() * 20 + 40,
  avgSessionDuration: Math.random() * 200 + 120,
}));

const mockTopPages: TopPage[] = [
  {
    url: "/blog/seo-best-practices",
    pageviews: 12547,
    uniquePageviews: 9834,
    avgTimeOnPage: 245,
    exitRate: 32.5,
    seoScore: 87,
  },
  {
    url: "/products/seo-tool",
    pageviews: 8934,
    uniquePageviews: 7245,
    avgTimeOnPage: 189,
    exitRate: 45.2,
    seoScore: 92,
  },
  {
    url: "/pricing",
    pageviews: 7823,
    uniquePageviews: 6547,
    avgTimeOnPage: 156,
    exitRate: 38.7,
    seoScore: 78,
  },
];

const mockTrafficSources: TrafficSource[] = [
  {
    source: "google",
    medium: "organic",
    sessions: 15847,
    users: 12456,
    newUsers: 8934,
    bounceRate: 42.3,
    conversions: 234,
  },
  {
    source: "direct",
    medium: "(none)",
    sessions: 8934,
    users: 7234,
    newUsers: 2134,
    bounceRate: 35.7,
    conversions: 156,
  },
  {
    source: "facebook",
    medium: "social",
    sessions: 3456,
    users: 2987,
    newUsers: 2456,
    bounceRate: 56.8,
    conversions: 45,
  },
];

const mockCompetitors: CompetitorTraffic[] = [
  {
    domain: "competitor1.com",
    estimatedVisits: 2500000,
    marketShare: 35.2,
    growth: 12.5,
    topKeywords: ["seo tools", "keyword research", "backlink analysis"],
  },
  {
    domain: "competitor2.com",
    estimatedVisits: 1800000,
    marketShare: 25.6,
    growth: -5.2,
    topKeywords: ["content marketing", "seo audit", "rank tracking"],
  },
];

const TrafficAnalyticsManager: React.FC = () => {
  const dispatch = useAppDispatch();
  const { projects } = useAppSelector((state) => state.project);

  const [selectedProject, setSelectedProject] = useState<string>("");
  const [dateRange, setDateRange] = useState<[string, string]>([
    "2024-01-01",
    "2024-01-31",
  ]);
  const [activeTab, setActiveTab] = useState("overview");

  useEffect(() => {
    dispatch(fetchProjects());
  }, [dispatch]);

  useEffect(() => {
    if (projects.length > 0 && !selectedProject) {
      setSelectedProject(projects[0].id);
    }
  }, [projects, selectedProject]);

  const currentData = mockTrafficData[mockTrafficData.length - 1];
  const previousData = mockTrafficData[mockTrafficData.length - 2];

  const getGrowthRate = (current: number, previous: number) => {
    return (((current - previous) / previous) * 100).toFixed(1);
  };

  const getGrowthIcon = (current: number, previous: number) => {
    const growth = parseFloat(getGrowthRate(current, previous));
    return growth > 0 ? <ArrowUpOutlined /> : <ArrowDownOutlined />;
  };

  const getGrowthColor = (current: number, previous: number) => {
    const growth = parseFloat(getGrowthRate(current, previous));
    return growth > 0 ? "#52c41a" : "#ff4d4f";
  };

  const topPagesColumns = [
    {
      title: "Page URL",
      dataIndex: "url",
      key: "url",
      render: (url: string) => (
        <div className={styles.urlCell}>
          <LinkOutlined style={{ marginRight: 8, color: "#1890ff" }} />
          <Text ellipsis style={{ maxWidth: 300 }}>
            {url}
          </Text>
        </div>
      ),
    },
    {
      title: "Pageviews",
      dataIndex: "pageviews",
      key: "pageviews",
      sorter: (a: TopPage, b: TopPage) => a.pageviews - b.pageviews,
      render: (value: number) => value.toLocaleString(),
    },
    {
      title: "Unique Views",
      dataIndex: "uniquePageviews",
      key: "uniquePageviews",
      sorter: (a: TopPage, b: TopPage) => a.uniquePageviews - b.uniquePageviews,
      render: (value: number) => value.toLocaleString(),
    },
    {
      title: "Avg. Time",
      dataIndex: "avgTimeOnPage",
      key: "avgTimeOnPage",
      render: (seconds: number) => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
      },
    },
    {
      title: "Exit Rate",
      dataIndex: "exitRate",
      key: "exitRate",
      render: (rate: number) => `${rate.toFixed(1)}%`,
    },
    {
      title: "SEO Score",
      dataIndex: "seoScore",
      key: "seoScore",
      render: (score: number) => (
        <div className={styles.seoScore}>
          <Progress
            percent={score}
            size="small"
            strokeColor={
              score >= 80 ? "#52c41a" : score >= 60 ? "#faad14" : "#ff4d4f"
            }
            showInfo={false}
            style={{ width: 60 }}
          />
          <Text style={{ marginLeft: 8 }}>{score}</Text>
        </div>
      ),
    },
  ];

  const sourceColumns = [
    {
      title: "Source / Medium",
      key: "source",
      render: (_: any, record: TrafficSource) => (
        <div>
          <Text strong>{record.source}</Text>
          <br />
          <Text type="secondary">{record.medium}</Text>
        </div>
      ),
    },
    {
      title: "Sessions",
      dataIndex: "sessions",
      key: "sessions",
      sorter: (a: TrafficSource, b: TrafficSource) => a.sessions - b.sessions,
      render: (value: number) => value.toLocaleString(),
    },
    {
      title: "Users",
      dataIndex: "users",
      key: "users",
      render: (value: number) => value.toLocaleString(),
    },
    {
      title: "New Users",
      dataIndex: "newUsers",
      key: "newUsers",
      render: (value: number) => value.toLocaleString(),
    },
    {
      title: "Bounce Rate",
      dataIndex: "bounceRate",
      key: "bounceRate",
      render: (rate: number) => `${rate.toFixed(1)}%`,
    },
    {
      title: "Conversions",
      dataIndex: "conversions",
      key: "conversions",
      render: (value: number) => <Tag color="green">{value}</Tag>,
    },
  ];

  if (!selectedProject) {
    return (
      <div className={styles.noProject}>
        <Card>
          <div style={{ textAlign: "center", padding: "40px" }}>
            <Title level={3}>No Project Selected</Title>
            <Text type="secondary">
              Please select a project to view traffic analytics
            </Text>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className={styles.trafficAnalyticsManager}>
      {/* Header */}
      <div className={styles.header}>
        <div className={styles.titleSection}>
          <Title level={2}>Traffic Analytics</Title>
          <Text type="secondary">
            Comprehensive traffic analysis and competitor insights
          </Text>
        </div>
        <div className={styles.headerActions}>
          <Space>
            <Select
              placeholder="Select a project"
              style={{ width: 250 }}
              value={selectedProject}
              onChange={setSelectedProject}
            >
              {projects.map((project: Project) => (
                <Option key={project.id} value={project.id}>
                  {project.name} ({project.domain})
                </Option>
              ))}
            </Select>
            <RangePicker />
          </Space>
        </div>
      </div>

      <Tabs
        activeKey={activeTab}
        onChange={setActiveTab}
        className={styles.analyticsTabs}
      >
        <TabPane tab="Overview" key="overview">
          {/* Key Metrics */}
          <Row gutter={16} className={styles.metricsRow}>
            <Col span={6}>
              <Card>
                <Statistic
                  title="Sessions"
                  value={currentData.sessions}
                  precision={0}
                  valueStyle={{
                    color: getGrowthColor(
                      currentData.sessions,
                      previousData.sessions
                    ),
                  }}
                  prefix={<EyeOutlined />}
                  suffix={
                    <span style={{ fontSize: "14px", marginLeft: "8px" }}>
                      {getGrowthIcon(
                        currentData.sessions,
                        previousData.sessions
                      )}
                      {getGrowthRate(
                        currentData.sessions,
                        previousData.sessions
                      )}
                      %
                    </span>
                  }
                />
              </Card>
            </Col>
            <Col span={6}>
              <Card>
                <Statistic
                  title="Users"
                  value={currentData.users}
                  precision={0}
                  valueStyle={{
                    color: getGrowthColor(
                      currentData.users,
                      previousData.users
                    ),
                  }}
                  prefix={<UserOutlined />}
                  suffix={
                    <span style={{ fontSize: "14px", marginLeft: "8px" }}>
                      {getGrowthIcon(currentData.users, previousData.users)}
                      {getGrowthRate(currentData.users, previousData.users)}%
                    </span>
                  }
                />
              </Card>
            </Col>
            <Col span={6}>
              <Card>
                <Statistic
                  title="Bounce Rate"
                  value={currentData.bounceRate}
                  precision={1}
                  suffix="%"
                  valueStyle={{
                    color: getGrowthColor(
                      previousData.bounceRate,
                      currentData.bounceRate
                    ),
                  }}
                  prefix={<PercentageOutlined />}
                />
              </Card>
            </Col>
            <Col span={6}>
              <Card>
                <Statistic
                  title="Avg. Session Duration"
                  value={Math.floor(currentData.avgSessionDuration / 60)}
                  suffix="m"
                  precision={0}
                  valueStyle={{
                    color: getGrowthColor(
                      currentData.avgSessionDuration,
                      previousData.avgSessionDuration
                    ),
                  }}
                  prefix={<ClockCircleOutlined />}
                />
              </Card>
            </Col>
          </Row>

          {/* Traffic Chart - Placeholder */}
          <Card title="Traffic Trend" className={styles.chartCard}>
            <div className={styles.chartPlaceholder}>
              <Text type="secondary">
                Traffic trend chart will be implemented with real data
              </Text>
            </div>
          </Card>
        </TabPane>

        <TabPane tab="Top Pages" key="pages">
          <Card title="Top Performing Pages">
            <Table
              columns={topPagesColumns}
              dataSource={mockTopPages}
              rowKey="url"
              pagination={{ pageSize: 10 }}
            />
          </Card>
        </TabPane>

        <TabPane tab="Traffic Sources" key="sources">
          <Card title="Traffic Source Analysis">
            <Table
              columns={sourceColumns}
              dataSource={mockTrafficSources}
              rowKey="source"
              pagination={{ pageSize: 10 }}
            />
          </Card>
        </TabPane>

        <TabPane tab="Competitors" key="competitors">
          <Card title="Competitor Traffic Analysis">
            <Row gutter={16}>
              {mockCompetitors.map((competitor, index) => (
                <Col span={12} key={competitor.domain}>
                  <Card className={styles.competitorCard}>
                    <div className={styles.competitorHeader}>
                      <Title level={4}>{competitor.domain}</Title>
                      <Tag color={competitor.growth > 0 ? "green" : "red"}>
                        {competitor.growth > 0 ? "+" : ""}
                        {competitor.growth.toFixed(1)}%
                      </Tag>
                    </div>
                    <Row gutter={16}>
                      <Col span={12}>
                        <Statistic
                          title="Est. Monthly Visits"
                          value={competitor.estimatedVisits}
                          formatter={(value) =>
                            `${(Number(value) / 1000000).toFixed(1)}M`
                          }
                        />
                      </Col>
                      <Col span={12}>
                        <Statistic
                          title="Market Share"
                          value={competitor.marketShare}
                          suffix="%"
                          precision={1}
                        />
                      </Col>
                    </Row>
                    <div className={styles.topKeywords}>
                      <Text strong>Top Keywords:</Text>
                      <div className={styles.keywordTags}>
                        {competitor.topKeywords.map((keyword, i) => (
                          <Tag key={i} color="blue">
                            {keyword}
                          </Tag>
                        ))}
                      </div>
                    </div>
                  </Card>
                </Col>
              ))}
            </Row>
          </Card>
        </TabPane>
      </Tabs>
    </div>
  );
};

export default TrafficAnalyticsManager;
