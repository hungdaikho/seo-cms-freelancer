"use client";
import React, { useState } from "react";
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
} from "antd";
import SimpleLineChart from "./SimpleLineChart";
import {
  KeywordData,
  RankingStats,
  SerpAnalysisData,
  RankingData,
} from "@/types/rank-tracking.type";

const { Title, Text } = Typography;
const { Option } = Select;

interface RankTrackingDashboardProps {
  projectName: string;
  onEditProject: () => void;
}

const RankTrackingDashboard: React.FC<RankTrackingDashboardProps> = ({
  projectName,
  onEditProject,
}) => {
  const [selectedPeriod, setSelectedPeriod] = useState("Last 30 days");
  const [selectedLocation, setSelectedLocation] = useState("Nigeria");

  // Mock data
  const rankingStats: RankingStats = {
    keywordsUp: 0,
    keywordsDown: 0,
    keywordsUnchanged: 0,
    averagePosition: 12.94,
  };

  const keywordData: KeywordData[] = [
    {
      id: "1",
      keyword: "Designer",
      position: 12,
      change: -12,
      volume: 3244,
      difficulty: 31,
      url: "https://www.facebook.com/login",
    },
    {
      id: "2",
      keyword: "Designs",
      position: 9,
      change: -12,
      volume: 1200,
      difficulty: 31,
      url: "https://www.facebook.com/login",
    },
    {
      id: "3",
      keyword: "Design",
      position: 34,
      change: -12,
      volume: 335,
      difficulty: 31,
      url: "https://www.facebook.com/login",
    },
    {
      id: "4",
      keyword: "Designing",
      position: 24,
      change: -12,
      volume: 2357,
      difficulty: 31,
      url: "https://www.facebook.com/login",
    },
  ];

  const serpAnalysisData: SerpAnalysisData[] = [
    {
      id: "1",
      url: "http://wordpress.com/",
      page: 44,
      backlinks: "20K",
      searchTraffic: "135.93K",
      keywords: 900,
    },
    {
      id: "2",
      url: "http://wordpress.org/",
      page: 44,
      backlinks: "20K",
      searchTraffic: "135.93K",
      keywords: 900,
    },
    {
      id: "3",
      url: "http://wpbeginners.org/",
      page: 44,
      backlinks: "20K",
      searchTraffic: "135.93K",
      keywords: 900,
    },
    {
      id: "4",
      url: "http://wordpress.com/",
      page: 44,
      backlinks: "20K",
      searchTraffic: "135.93K",
      keywords: 900,
    },
    {
      id: "5",
      url: "http://wordpress.org/",
      page: 44,
      backlinks: "20K",
      searchTraffic: "135.93K",
      keywords: 900,
    },
    {
      id: "6",
      url: "http://wpbeginners.org/",
      page: 44,
      backlinks: "20K",
      searchTraffic: "135.93K",
      keywords: 900,
    },
  ];

  const lineChartData: RankingData[] = [
    { date: "2022-08-01", position: 15 },
    { date: "2022-08-05", position: 14 },
    { date: "2022-08-10", position: 13 },
    { date: "2022-08-15", position: 12.94 },
    { date: "2022-08-20", position: 13 },
  ];

  const keywordColumns = [
    {
      title: "Position",
      dataIndex: "position",
      key: "position",
      width: 80,
      sorter: (a: KeywordData, b: KeywordData) => a.position - b.position,
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
        <span style={{ color: change < 0 ? "#ff4d4f" : "#52c41a" }}>
          {change > 0 ? "+" : ""}
          {change}
        </span>
      ),
    },
    {
      title: "Vol",
      dataIndex: "volume",
      key: "volume",
      width: 80,
    },
    {
      title: "SD",
      dataIndex: "difficulty",
      key: "difficulty",
      width: 60,
    },
    {
      title: "URL",
      dataIndex: "url",
      key: "url",
      render: (url: string) => (
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          style={{ color: "#1890ff" }}
        >
          {url}
        </a>
      ),
    },
  ];

  const serpColumns = [
    {
      title: "",
      dataIndex: "id",
      key: "id",
      width: 40,
      render: (id: string) => <Text>{id}.</Text>,
    },
    {
      title: "URL",
      dataIndex: "url",
      key: "url",
      render: (url: string) => (
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          style={{ color: "#1890ff" }}
        >
          {url}
        </a>
      ),
    },
    {
      title: "Page",
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
          <Text>Aug 19, 2022</Text>
        </div>
      </div>

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
          onChange={setSelectedPeriod}
        >
          <Option value="Last 30 days">Last 30 days</Option>
          <Option value="Last 7 days">Last 7 days</Option>
          <Option value="Last 90 days">Last 90 days</Option>
        </Select>
        <Select
          value={selectedLocation}
          style={{ width: 120 }}
          onChange={setSelectedLocation}
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
          <Card title="Average Position" style={{ marginBottom: "24px" }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                marginBottom: "16px",
              }}
            >
              <Text
                style={{
                  fontSize: "32px",
                  fontWeight: "bold",
                  marginRight: "8px",
                }}
              >
                32.9
              </Text>
              <Text style={{ fontSize: "24px", fontWeight: "bold" }}>
                → 12.94
              </Text>
              <Tag color="green" style={{ marginLeft: "8px" }}>
                ↗️
              </Tag>
            </div>
            <SimpleLineChart data={lineChartData} height={200} />
          </Card>

          {/* Tracked Keywords Table */}
          <Card title="Tracked Keywords">
            <Table
              columns={keywordColumns}
              dataSource={keywordData}
              pagination={false}
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
              <Card>
                <div style={{ textAlign: "center" }}>
                  <Text type="secondary">Keywords Up</Text>
                  <div style={{ fontSize: "24px", fontWeight: "bold" }}>
                    {rankingStats?.keywordsUp} ↗️
                  </div>
                </div>
              </Card>
            </Col>
            <Col span={24}>
              <Card>
                <div style={{ textAlign: "center" }}>
                  <Text type="secondary">Keywords down</Text>
                  <div style={{ fontSize: "24px", fontWeight: "bold" }}>
                    {rankingStats?.keywordsDown} ↘️
                  </div>
                </div>
              </Card>
            </Col>
            <Col span={24}>
              <Card>
                <div style={{ textAlign: "center" }}>
                  <Text type="secondary">Keywords unchanged</Text>
                  <div style={{ fontSize: "24px", fontWeight: "bold" }}>
                    {rankingStats.keywordsUnchanged} ↗️
                  </div>
                </div>
              </Card>
            </Col>
          </Row>

          {/* Ranking Tracking Pie Chart */}
          <Card title="Ranking Tracking" style={{ marginBottom: "24px" }}>
            <div style={{ textAlign: "center" }}>
              <Progress
                type="circle"
                percent={100}
                strokeColor="#6b7bf7"
                format={() => "4"}
                width={120}
              />
              <div style={{ marginTop: "16px" }}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    fontSize: "12px",
                  }}
                >
                  <span style={{ color: "#6b7bf7" }}>■ Not ranking</span>
                  <span>4</span>
                </div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    fontSize: "12px",
                  }}
                >
                  <span style={{ color: "#ffa940" }}>■ Top 100</span>
                  <span>0</span>
                </div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    fontSize: "12px",
                  }}
                >
                  <span style={{ color: "#52c41a" }}>■ Top 10</span>
                  <span>0</span>
                </div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    fontSize: "12px",
                  }}
                >
                  <span style={{ color: "#ff4d4f" }}>■ Top 3</span>
                  <span>0</span>
                </div>
              </div>
            </div>
          </Card>
        </Col>
      </Row>

      {/* SERP Analysis */}
      <Card
        title="SERP Analysis"
        extra={<Button type="link">View all</Button>}
        style={{ marginTop: "24px" }}
      >
        <Table
          columns={serpColumns}
          dataSource={serpAnalysisData}
          pagination={false}
          size="small"
          rowKey="id"
        />
      </Card>
    </div>
  );
};

export default RankTrackingDashboard;
