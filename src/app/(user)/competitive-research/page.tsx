"use client";
import React, { useState } from "react";
import {
  Button,
  Input,
  Select,
  Tabs,
  Table,
  Progress,
  Card,
  Row,
  Col,
  Statistic,
  Space,
  Tag,
  message,
  Alert,
  Tooltip,
} from "antd";
import {
  PlusOutlined,
  ArrowRightOutlined,
  SearchOutlined,
  CaretUpOutlined,
  CaretDownOutlined,
  MinusOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import {
  AreaChart,
  Area,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as RechartsTooltip,
  ResponsiveContainer,
} from "recharts";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/stores/store";
import {
  fetchDomainOverview,
  fetchDomainTopKeywords,
  fetchDomainCompetitors,
  fetchDomainAuthority,
  setFilters,
  removeCompetitor,
} from "@/stores/slices/competitive.slice";
import CreateProjectModal from "@/components/rank-tracking/CreateProjectModal";
import { getSortedCountries } from "@/utils/countries";
import styles from "./DomainOverview.module.scss";
import dayjs from "dayjs";
import { useRouter } from "next/navigation";

type Props = {};

const CompetitiveResearchPage = (props: Props) => {
  const dispatch = useDispatch<AppDispatch>();
  const {
    domainOverview,
    domainTopKeywords,
    domainCompetitors,
    keywordGapAnalysis,
    loading,
    error,
    filters,
  } = useSelector((state: RootState) => state.competitive);

  const [selectedTab, setSelectedTab] = useState("topPages");
  const [isCreateProjectModalVisible, setIsCreateProjectModalVisible] =
    useState(false);
  const router = useRouter();

  // Get sorted countries
  const sortedCountries = getSortedCountries();
  // Handle domain search
  const handleDomainSearch = async () => {
    if (!filters.domain) {
      message.error("Please enter a domain to search");
      return;
    }

    try {
      await Promise.all([
        dispatch(fetchDomainOverview({ domain: filters.domain })),
        dispatch(
          fetchDomainTopKeywords({
            domain: filters.domain,
            country: filters.country,
            limit: 20,
          })
        ),
        dispatch(
          fetchDomainCompetitors({
            domain: filters.domain,
            country: filters.country,
            limit: 10,
          })
        ),
        dispatch(fetchDomainAuthority(filters.domain)),
      ]);
      message.success("Domain analysis completed successfully!");
    } catch (error) {
      message.error("Failed to analyze domain");
    }
  };

  // Remove competitor
  const handleRemoveCompetitor = (competitor: string) => {
    dispatch(removeCompetitor(competitor));
    message.success("Competitor removed successfully!");
  };

  // Handle create project
  const handleCreateProject = () => {
    setIsCreateProjectModalVisible(true);
  };

  // Handle create project success
  const handleCreateProjectSuccess = () => {
    setIsCreateProjectModalVisible(false);
    router.push("/dashboard");
  };

  // Handle create project cancel
  const handleCreateProjectCancel = () => {
    setIsCreateProjectModalVisible(false);
  };

  // Format numbers
  const formatNumber = (num: number): string => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + "M";
    }
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + "K";
    }
    return num.toString();
  };

  // Format currency
  const formatCurrency = (num: number): string => {
    return "$" + formatNumber(num);
  };

  // Get trend icon
  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case "up":
        return <CaretUpOutlined style={{ color: "#52c41a" }} />;
      case "down":
        return <CaretDownOutlined style={{ color: "#ff4d4f" }} />;
      default:
        return <MinusOutlined style={{ color: "#d9d9d9" }} />;
    }
  };

  // Top pages columns
  const topPagesColumns = [
    {
      title: "Page",
      dataIndex: "page",
      key: "page",
      render: (text: string) => (
        <Tooltip title={text}>
          <a href="#" className={styles.pageUrl}>
            {text.length > 50 ? text.substring(0, 50) + "..." : text}
          </a>
        </Tooltip>
      ),
    },
    {
      title: "Traffic Share",
      dataIndex: "trafficShare",
      key: "trafficShare",
      render: (value: number) => `${value.toFixed(2)}%`,
    },
    {
      title: "Unique Pageviews",
      dataIndex: "uniquePageviews",
      key: "uniquePageviews",
      render: (value: number) => formatNumber(value),
    },
    {
      title: "Unique Visitors",
      dataIndex: "uniqueVisitors",
      key: "uniqueVisitors",
      render: (value: number) => formatNumber(value),
    },
  ];

  // Keywords columns
  const keywordsColumns = [
    {
      title: "Keyword",
      dataIndex: "keyword",
      key: "keyword",
      render: (text: string) => (
        <span className={styles.keywordName}>{text}</span>
      ),
    },
    {
      title: "Position",
      dataIndex: "position",
      key: "position",
      render: (value: number) => (
        <Tag color={value <= 3 ? "green" : value <= 10 ? "orange" : "red"}>
          {value}
        </Tag>
      ),
    },
    {
      title: "Search Volume",
      dataIndex: "searchVolume",
      key: "searchVolume",
      render: (value: number) => formatNumber(value),
    },
    {
      title: "Traffic",
      dataIndex: "traffic",
      key: "traffic",
      render: (value: number) => formatNumber(value),
    },
    {
      title: "CPC",
      dataIndex: "cpc",
      key: "cpc",
      render: (value: number) => formatCurrency(value),
    },
    {
      title: "Difficulty",
      dataIndex: "difficulty",
      key: "difficulty",
      render: (value: number) => (
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <Progress
            percent={value}
            size="small"
            showInfo={false}
            strokeColor={
              value <= 30 ? "#52c41a" : value <= 70 ? "#faad14" : "#ff4d4f"
            }
          />
          <span>{value}</span>
        </div>
      ),
    },
    {
      title: "Trend",
      dataIndex: "trend",
      key: "trend",
      render: (trend: string) => getTrendIcon(trend),
    },
  ];

  // Competitors columns
  const competitorsColumns = [
    {
      title: "Domain",
      dataIndex: "domain",
      key: "domain",
      render: (text: string) => <strong>{text}</strong>,
    },
    {
      title: "Authority Score",
      dataIndex: "authorityScore",
      key: "authorityScore",
      render: (value: number) => (
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <Progress
            percent={value}
            size="small"
            showInfo={false}
            strokeColor={
              value >= 80 ? "#52c41a" : value >= 50 ? "#faad14" : "#ff4d4f"
            }
          />
          <span>{value}</span>
        </div>
      ),
    },
    {
      title: "Organic Keywords",
      dataIndex: "organicKeywords",
      key: "organicKeywords",
      render: (value: number) => formatNumber(value),
    },
    {
      title: "Estimated Traffic",
      dataIndex: "estimatedTraffic",
      key: "estimatedTraffic",
      render: (value: number) => formatNumber(value),
    },
    {
      title: "Common Keywords",
      dataIndex: "commonKeywords",
      key: "commonKeywords",
      render: (value: number) => formatNumber(value),
    },
    {
      title: "Action",
      key: "action",
      render: (_: any, record: any) => (
        <Button
          type="text"
          danger
          icon={<DeleteOutlined />}
          onClick={() => handleRemoveCompetitor(record.domain)}
          size="small"
        >
          Remove
        </Button>
      ),
    },
  ];

  // Tab items
  const tabItems = [
    {
      key: "topPages",
      label: "Top Pages",
      children: (
        <Table
          columns={topPagesColumns}
          dataSource={domainOverview?.topPages || []}
          pagination={{ pageSize: 10 }}
          loading={loading.domainOverview}
          rowKey="page"
        />
      ),
    },
    {
      key: "competitors",
      label: "Competitors",
      children: (
        <Table
          columns={competitorsColumns}
          dataSource={domainCompetitors?.data || []}
          pagination={{ pageSize: 10 }}
          loading={loading.domainCompetitors}
          rowKey="domain"
        />
      ),
    },
  ];

  // Chart data
  const trafficTrendData =
    domainOverview?.trafficTrend?.map((item) => ({
      date: dayjs(item.date).format("MMM DD"),
      visits: item.visits,
      uniqueVisitors: item.uniqueVisitors,
      newVisitors: item.newVisitors,
    })) || [];

  const deviceData = domainOverview
    ? [
        {
          name: "Desktop",
          value: Math.round(domainOverview.organicTraffic * 0.7),
          color: "#32cd32",
        },
        {
          name: "Mobile",
          value: Math.round(domainOverview.organicTraffic * 0.3),
          color: "#ff6b47",
        },
      ]
    : [];

  return (
    <div className={styles.domainOverview}>
      {/* Header */}
      <div className={styles.header}>
        <Button
          type="primary"
          icon={<PlusOutlined />}
          size="large"
          onClick={handleCreateProject}
        >
          Create Project
        </Button>
        <Button
          icon={<ArrowRightOutlined />}
          size="large"
          onClick={() => router.push("/dashboard")}
        >
          See projects
        </Button>
      </div>

      {/* Domain Search Section */}
      <Card className={styles.searchSection}>
        <h2 className={styles.sectionTitle}>Competitive Research</h2>
        <p className={styles.sectionDescription}>
          Analyze your domain against competitors to discover opportunities and
          gaps
        </p>

        <div className={styles.dateSelector}>
          <span>Country:</span>
          <Select
            value={filters.country}
            onChange={(value) => dispatch(setFilters({ country: value }))}
            style={{ marginLeft: 8, width: 200 }}
            placeholder="Select a country"
            showSearch
            optionFilterProp="label"
            filterOption={(input, option) =>
              ((option?.label as string) ?? "")
                .toLowerCase()
                .includes(input.toLowerCase())
            }
            options={sortedCountries.map((country) => ({
              value: country.code,
              label: `${country.flag} ${country.name}`,
            }))}
          />
        </div>

        <Space.Compact style={{ width: "100%", marginTop: 16 }}>
          <Input
            placeholder="Enter domain (e.g., example.com)"
            value={filters.domain}
            onChange={(e) => dispatch(setFilters({ domain: e.target.value }))}
            style={{ flex: 1 }}
            onPressEnter={handleDomainSearch}
          />
          <Button
            type="primary"
            icon={<SearchOutlined />}
            onClick={handleDomainSearch}
            loading={loading.domainOverview}
          >
            Analyze
          </Button>
        </Space.Compact>
      </Card>

      {/* Error Display */}
      {Object.values(error).some((err) => err) && (
        <Alert
          message="Error"
          description={Object.values(error).find((err) => err)}
          type="error"
          closable
          style={{ marginBottom: 24 }}
        />
      )}

      {/* Domain Overview Stats */}
      {domainOverview && (
        <Row gutter={[24, 24]} style={{ marginBottom: 24 }}>
          <Col span={6}>
            <Card size="small">
              <Statistic
                title="Authority Score"
                value={domainOverview.authorityScore}
                valueStyle={{ color: "#1890ff" }}
              />
            </Card>
          </Col>
          <Col span={6}>
            <Card size="small">
              <Statistic
                title="Organic Keywords"
                value={formatNumber(domainOverview.organicKeywords)}
                valueStyle={{ color: "#52c41a" }}
              />
            </Card>
          </Col>
          <Col span={6}>
            <Card size="small">
              <Statistic
                title="Organic Traffic"
                value={formatNumber(domainOverview.organicTraffic)}
                valueStyle={{ color: "#722ed1" }}
              />
            </Card>
          </Col>
          <Col span={6}>
            <Card size="small">
              <Statistic
                title="Backlinks"
                value={formatNumber(domainOverview.backlinks)}
                valueStyle={{ color: "#fa8c16" }}
              />
            </Card>
          </Col>
        </Row>
      )}

      {/* Traffic Trend Chart */}
      {trafficTrendData.length > 0 && (
        <Card title="Traffic Trend" style={{ marginBottom: 24 }}>
          <div style={{ height: 300 }}>
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={trafficTrendData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <RechartsTooltip />
                <Area
                  type="monotone"
                  dataKey="visits"
                  stackId="1"
                  stroke="#1890ff"
                  fill="#1890ff"
                  fillOpacity={0.3}
                />
                <Area
                  type="monotone"
                  dataKey="uniqueVisitors"
                  stackId="1"
                  stroke="#52c41a"
                  fill="#52c41a"
                  fillOpacity={0.3}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Card>
      )}

      {/* Content Grid */}
      <Row gutter={[24, 24]} style={{ marginBottom: 24 }}>
        {/* Keywords Section */}
        <Col span={16}>
          <Card
            title="Top Keywords"
            extra={
              <Button type="link" icon={<ArrowRightOutlined />}>
                View All Keywords
              </Button>
            }
          >
            <Table
              columns={keywordsColumns}
              dataSource={domainTopKeywords?.data || []}
              pagination={{ pageSize: 5, showSizeChanger: false }}
              loading={loading.domainTopKeywords}
              rowKey="keyword"
            />
          </Card>
        </Col>

        {/* Traffic Distribution */}
        <Col span={8}>
          <Card title="Traffic Distribution">
            {deviceData.length > 0 ? (
              <div style={{ height: 200 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={deviceData}
                      cx="50%"
                      cy="50%"
                      innerRadius={40}
                      outerRadius={80}
                      dataKey="value"
                      label={({
                        name,
                        percent,
                      }: {
                        name: string;
                        percent?: number;
                      }) =>
                        `${name}: ${percent ? (percent * 100).toFixed(0) : 0}%`
                      }
                    >
                      {deviceData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <RechartsTooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            ) : (
              <div
                style={{
                  height: 200,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <span style={{ color: "#999" }}>No data available</span>
              </div>
            )}
          </Card>
        </Col>
      </Row>

      {/* Gap Analysis Results */}
      {keywordGapAnalysis && (
        <Card title="Keyword Gap Analysis" style={{ marginBottom: 24 }}>
          <Row gutter={[16, 16]}>
            <Col span={4}>
              <Statistic
                title="Shared Keywords"
                value={formatNumber(
                  keywordGapAnalysis.overview.comparison.shared
                )}
                valueStyle={{ color: "#52c41a" }}
              />
            </Col>
            <Col span={4}>
              <Statistic
                title="Missing Keywords"
                value={formatNumber(
                  keywordGapAnalysis.overview.comparison.missing
                )}
                valueStyle={{ color: "#ff4d4f" }}
              />
            </Col>
            <Col span={4}>
              <Statistic
                title="Weak Keywords"
                value={formatNumber(
                  keywordGapAnalysis.overview.comparison.weak
                )}
                valueStyle={{ color: "#faad14" }}
              />
            </Col>
            <Col span={4}>
              <Statistic
                title="Strong Keywords"
                value={formatNumber(
                  keywordGapAnalysis.overview.comparison.strong
                )}
                valueStyle={{ color: "#1890ff" }}
              />
            </Col>
            <Col span={4}>
              <Statistic
                title="Untapped Keywords"
                value={formatNumber(
                  keywordGapAnalysis.overview.comparison.untapped
                )}
                valueStyle={{ color: "#722ed1" }}
              />
            </Col>
            <Col span={4}>
              <Statistic
                title="Unique Keywords"
                value={formatNumber(
                  keywordGapAnalysis.overview.comparison.unique
                )}
                valueStyle={{ color: "#13c2c2" }}
              />
            </Col>
          </Row>
        </Card>
      )}

      {/* Top Pages and Competitors Tabs */}
      <Card style={{ marginBottom: 24 }}>
        <Tabs
          activeKey={selectedTab}
          onChange={setSelectedTab}
          items={tabItems}
        />
      </Card>

      {/* Create Project Modal */}
      <CreateProjectModal
        visible={isCreateProjectModalVisible}
        onCancel={handleCreateProjectCancel}
        onSuccess={handleCreateProjectSuccess}
      />
    </div>
  );
};

export default CompetitiveResearchPage;
