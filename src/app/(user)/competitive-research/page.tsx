"use client";
import React, { useState } from "react";
import {
  Button,
  Input,
  Select,
  DatePicker,
  Tabs,
  Table,
  Progress,
  Card,
  Row,
  Col,
  Statistic,
  Space,
  Tag,
} from "antd";
import {
  PlusOutlined,
  ArrowRightOutlined,
  SearchOutlined,
  RiseOutlined,
  FallOutlined,
} from "@ant-design/icons";
import {
  LineChart,
  Line,
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
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import styles from "./DomainOverview.module.scss";

type Props = {};

const CompetitiveResearchPage = (props: Props) => {
  const [selectedTab, setSelectedTab] = useState("Top pages");
  const [searchDomain, setSearchDomain] = useState("");
  const [competitorSearch, setCompetitorSearch] = useState("");

  // Sample data for charts
  const backlinksData = [
    { month: "May 2022", value: 20 },
    { month: "Jun 2022", value: 35 },
    { month: "Jul 2022", value: 60 },
    { month: "Aug 2022", value: 85 },
    { month: "Sep 2022", value: 100 },
    { month: "Oct 2022", value: 120 },
  ];

  const trafficData = [
    { month: "Jan", desktop: 70, mobile: 30, all: 100 },
    { month: "Feb", desktop: 65, mobile: 35, all: 105 },
    { month: "Mar", desktop: 68, mobile: 38, all: 110 },
    { month: "Apr", desktop: 72, mobile: 42, all: 115 },
    { month: "May", desktop: 75, mobile: 45, all: 120 },
    { month: "Jun", desktop: 78, mobile: 48, all: 125 },
    { month: "Jul", desktop: 80, mobile: 50, all: 130 },
    { month: "Aug", desktop: 82, mobile: 52, all: 135 },
    { month: "Sep", desktop: 85, mobile: 55, all: 140 },
    { month: "Oct", desktop: 88, mobile: 58, all: 145 },
    { month: "Nov", desktop: 90, mobile: 60, all: 150 },
    { month: "Dec", desktop: 92, mobile: 62, all: 155 },
  ];

  const seoScoreData = [
    { month: "May 2022", score: 20 },
    { month: "Jun 2022", score: 25 },
    { month: "Jul 2022", score: 35 },
    { month: "Aug 2022", score: 45 },
    { month: "Sep 2022", score: 60 },
    { month: "Oct 2022", score: 80 },
  ];

  const deviceData = [
    { name: "Desktop", value: 70, color: "#32cd32" },
    { name: "Mobile", value: 30, color: "#ff6b47" },
  ];

  const rankingData = [
    { name: "Not ranking", value: 75, color: "#ff6b47" },
    { name: "Ranking", value: 25, color: "#e1e5e9" },
  ];

  const keywordTrendData = [
    { day: 1, value: 10 },
    { day: 2, value: 15 },
    { day: 3, value: 12 },
    { day: 4, value: 18 },
    { day: 5, value: 25 },
    { day: 6, value: 22 },
    { day: 7, value: 30 },
  ];

  const topPagesColumns = [
    {
      title: "Page",
      dataIndex: "page",
      key: "page",
      render: (text: string) => (
        <a href="#" className={styles.pageUrl}>
          {text}
        </a>
      ),
    },
    {
      title: "Traffic share",
      dataIndex: "share",
      key: "share",
    },
    {
      title: "Unique Pageviews",
      dataIndex: "pageviews",
      key: "pageviews",
    },
    {
      title: "Unique Visitors",
      dataIndex: "visitors",
      key: "visitors",
    },
  ];

  const topPagesData = [
    {
      key: "1",
      page: "/studio/blog/a-hands-on-guide-to-",
      share: "67.05%",
      pageviews: "285K",
      visitors: "19K",
    },
    {
      key: "2",
      page: "Design.com",
      share: "5.9%",
      pageviews: "28.7K",
      visitors: "28.7K",
    },
    {
      key: "3",
      page: "/studio/blog/a",
      share: "1.65%",
      pageviews: "8.5K",
      visitors: "8.5K",
    },
    {
      key: "4",
      page: "app.uxpin.com",
      share: "0.35%",
      pageviews: "6.5K",
      visitors: "6.5K",
    },
  ];

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
      title: "Trend",
      dataIndex: "trend",
      key: "trend",
      render: () => (
        <div style={{ width: 60, height: 20 }}>
          <ResponsiveContainer>
            <LineChart data={keywordTrendData}>
              <Line
                type="monotone"
                dataKey="value"
                stroke="#32cd32"
                strokeWidth={2}
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      ),
    },
    {
      title: "CPC",
      dataIndex: "cpc",
      key: "cpc",
    },
    {
      title: "SERP DP",
      dataIndex: "serp",
      key: "serp",
    },
    {
      title: "SD",
      dataIndex: "sd",
      key: "sd",
    },
  ];

  const keywordsData = [
    { key: "1", keyword: "Designer", cpc: "$46", serp: "31", sd: "54" },
    { key: "2", keyword: "Designs", cpc: "$46", serp: "31", sd: "54" },
    { key: "3", keyword: "Design", cpc: "$46", serp: "31", sd: "54" },
    { key: "4", keyword: "Designing", cpc: "$46", serp: "31", sd: "54" },
  ];

  const tabItems = [
    {
      key: "topPages",
      label: "Top pages",
      children: (
        <Table
          columns={topPagesColumns}
          dataSource={topPagesData}
          pagination={false}
        />
      ),
    },
    {
      key: "topSubfolders",
      label: "Top Subfolders",
      children: (
        <Table
          columns={topPagesColumns}
          dataSource={topPagesData}
          pagination={false}
        />
      ),
    },
    {
      key: "topSubdomains",
      label: "Top Subdomains",
      children: (
        <Table
          columns={topPagesColumns}
          dataSource={topPagesData}
          pagination={false}
        />
      ),
    },
  ];

  return (
    <div className={styles.domainOverview}>
      {/* Header */}
      <div className={styles.header}>
        <Button type="primary" icon={<PlusOutlined />} size="large">
          Create Project
        </Button>
        <Button icon={<ArrowRightOutlined />} size="large">
          See projects
        </Button>
      </div>

      {/* Domain Search Section */}
      <Card className={styles.searchSection}>
        <h2 className={styles.sectionTitle}>Domain Overview</h2>
        <p className={styles.sectionDescription}>
          Lorem ipsum dolor sit amet, consectetur adipiscing
        </p>

        <div className={styles.dateSelector}>
          <span>Date:</span>
          <DatePicker
            placeholder="12 September 2022"
            style={{ marginLeft: 8 }}
          />
        </div>

        <Space.Compact style={{ width: "100%", marginTop: 16 }}>
          <Input
            placeholder="Domain"
            value={searchDomain}
            onChange={(e) => setSearchDomain(e.target.value)}
            style={{ flex: 1 }}
          />
          <Select
            defaultValue="nig"
            style={{ width: 120 }}
            options={[
              { value: "nig", label: "🇳🇬 Nig" },
              { value: "usa", label: "🇺🇸 USA" },
              { value: "uk", label: "🇬🇧 UK" },
            ]}
          />
          <Button type="primary" icon={<SearchOutlined />}>
            Search
          </Button>
        </Space.Compact>
      </Card>

      {/* Content Grid */}
      <Row gutter={[24, 24]} style={{ marginBottom: 24 }}>
        {/* Backlinks Section */}
        <Col span={12}>
          <Card
            title="Backlinks"
            extra={
              <Button type="link" icon={<ArrowRightOutlined />}>
                View Backlinks
              </Button>
            }
          >
            <div style={{ height: 200, marginBottom: 16 }}>
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={backlinksData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Area
                    type="monotone"
                    dataKey="value"
                    stroke="#ff6b47"
                    fill="#ffcccc"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>

            <p style={{ marginBottom: 16, fontSize: 14, color: "#666" }}>
              Evaluate the link profile of a site or page URL
              <br />
              Lorem ipsum dolor sit amet, consectetur adipiscing
            </p>
            <Space.Compact style={{ width: "100%" }}>
              <Input placeholder="Project or domain name" />
              <Button type="primary">Search</Button>
            </Space.Compact>
          </Card>
        </Col>

        {/* Keyword Research Section */}
        <Col span={12}>
          <Card
            title="Keyword Research"
            extra={
              <Button type="link" icon={<ArrowRightOutlined />}>
                View Backlinks
              </Button>
            }
          >
            <Row gutter={16}>
              <Col span={12}>
                <p style={{ fontSize: 14, color: "#666", lineHeight: 1.5 }}>
                  Lorem ipsum dolor sit amet, consectetur adipiscing Lorem ipsum
                  dolor sit amet, consectetur adipiscing
                </p>
              </Col>

              <Col span={12}>
                <h4 style={{ marginBottom: 12 }}>Ranking Tracking</h4>
                <Space
                  direction="vertical"
                  size="small"
                  style={{ width: "100%" }}
                >
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <Tag color="error">Not ranking</Tag>
                    <span>1</span>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <Tag color="warning">Top 100</Tag>
                    <span>0</span>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <Tag color="success">Top 50</Tag>
                    <span>0</span>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <Tag color="processing">Top 5</Tag>
                    <span>0</span>
                  </div>
                </Space>

                <div
                  style={{
                    marginTop: 16,
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  <ResponsiveContainer width={120} height={120}>
                    <PieChart>
                      <Pie
                        data={rankingData}
                        cx="50%"
                        cy="50%"
                        innerRadius={30}
                        outerRadius={60}
                        dataKey="value"
                      >
                        {rankingData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </Col>
            </Row>

            <div style={{ marginTop: 16 }}>
              {[1, 2, 3, 4].map((item) => (
                <Row
                  key={item}
                  justify="space-between"
                  align="middle"
                  style={{
                    padding: "8px 0",
                    borderBottom: "1px solid #f0f0f0",
                  }}
                >
                  <Col span={12}>
                    <div style={{ width: 60, height: 20 }}>
                      <ResponsiveContainer>
                        <LineChart data={keywordTrendData}>
                          <Line
                            type="monotone"
                            dataKey="value"
                            stroke="#4169e1"
                            strokeWidth={2}
                            dot={false}
                          />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>
                  </Col>
                  <Col span={4}>$46</Col>
                  <Col span={4}>31</Col>
                  <Col span={4}>54</Col>
                </Row>
              ))}
            </div>
          </Card>
        </Col>
      </Row>

      {/* SEO Score Section */}
      <Card style={{ marginBottom: 24 }}>
        <Row gutter={24}>
          <Col span={12}>
            <h3 style={{ marginBottom: 16 }}>ON-page SEO Score</h3>
            <p
              style={{
                fontSize: 14,
                color: "#666",
                lineHeight: 1.5,
                marginBottom: 16,
              }}
            >
              Lorem ipsum dolor sit amet, consectetur adipiscing Lorem ipsum
              dolor sit amet, consectetur adipiscing
            </p>
            <Button type="primary" icon={<ArrowRightOutlined />}>
              Develop SEO Score
            </Button>
          </Col>

          <Col span={12}>
            <div style={{ height: 200 }}>
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={seoScoreData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Area
                    type="monotone"
                    dataKey="score"
                    stroke="#ff6b47"
                    fill="#ffcccc"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </Col>
        </Row>
      </Card>

      {/* Organic Traffic Section */}
      <Card style={{ marginBottom: 24 }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 24,
          }}
        >
          <h3>
            Organic Traffic{" "}
            <span
              style={{ fontSize: "16px", fontWeight: "normal", color: "#666" }}
            >
              81,346/month
            </span>
          </h3>
          <Space>
            <Input
              placeholder="Designer.com"
              value={competitorSearch}
              onChange={(e) => setCompetitorSearch(e.target.value)}
            />
            <Button icon={<PlusOutlined />}>Add competitor</Button>
            <Button type="primary">Compare</Button>
          </Space>
        </div>

        <Row gutter={24}>
          <Col span={16}>
            <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
              <Col span={12}>
                <Card size="small">
                  <Statistic
                    title="Visits"
                    value={333}
                    suffix="K"
                    valueStyle={{ color: "#333" }}
                  />
                  <div style={{ marginTop: 8 }}>
                    <RiseOutlined style={{ color: "#52c41a" }} />
                    <span style={{ color: "#52c41a", marginLeft: 4 }}>
                      +89%
                    </span>
                  </div>
                </Card>
              </Col>

              <Col span={12}>
                <Card size="small">
                  <Statistic
                    title="Unique Visitors"
                    value={33}
                    suffix="K"
                    valueStyle={{ color: "#333" }}
                  />
                  <div style={{ marginTop: 8 }}>
                    <RiseOutlined style={{ color: "#52c41a" }} />
                    <span style={{ color: "#52c41a", marginLeft: 4 }}>
                      +89%
                    </span>
                  </div>
                </Card>
              </Col>
            </Row>

            <div style={{ height: 250, marginBottom: 24 }}>
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={trafficData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Line
                    type="monotone"
                    dataKey="desktop"
                    stroke="#32cd32"
                    strokeWidth={2}
                  />
                  <Line
                    type="monotone"
                    dataKey="mobile"
                    stroke="#ff6b47"
                    strokeWidth={2}
                  />
                  <Line
                    type="monotone"
                    dataKey="all"
                    stroke="#4169e1"
                    strokeWidth={2}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>

            <div>
              <h4 style={{ marginBottom: 16 }}>Traffic Share</h4>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  marginBottom: 16,
                }}
              >
                <ResponsiveContainer width={120} height={120}>
                  <PieChart>
                    <Pie
                      data={deviceData}
                      cx="50%"
                      cy="50%"
                      innerRadius={30}
                      outerRadius={60}
                      dataKey="value"
                    >
                      {deviceData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div
                style={{ display: "flex", justifyContent: "center", gap: 16 }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
                  <div
                    style={{
                      width: 8,
                      height: 8,
                      borderRadius: "50%",
                      backgroundColor: "#ff6b47",
                    }}
                  ></div>
                  <span style={{ fontSize: 12 }}>Mobile 30%</span>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
                  <div
                    style={{
                      width: 8,
                      height: 8,
                      borderRadius: "50%",
                      backgroundColor: "#32cd32",
                    }}
                  ></div>
                  <span style={{ fontSize: 12 }}>Desktop 70%</span>
                </div>
              </div>
            </div>
          </Col>

          <Col span={8}>
            <Space direction="vertical" size="middle" style={{ width: "100%" }}>
              <Card size="small">
                <Statistic
                  title="Total"
                  value="1.2K"
                  valueStyle={{ fontSize: 20 }}
                />
              </Card>

              <Card size="small">
                <Statistic
                  title="New Visitors"
                  value="552.5k"
                  valueStyle={{ fontSize: 20 }}
                />
                <div style={{ marginTop: 4 }}>
                  <RiseOutlined style={{ color: "#52c41a" }} />
                  <span style={{ color: "#52c41a", marginLeft: 4 }}>+89%</span>
                </div>
              </Card>

              <Card size="small">
                <Statistic
                  title="Avg Visit Duration"
                  value="641K"
                  valueStyle={{ fontSize: 20 }}
                />
                <div style={{ marginTop: 4 }}>
                  <FallOutlined style={{ color: "#ff4d4f" }} />
                  <span style={{ color: "#ff4d4f", marginLeft: 4 }}>-4.8%</span>
                </div>
              </Card>

              <Card size="small">
                <Statistic
                  title="Authority Score"
                  value="61"
                  valueStyle={{ fontSize: 20 }}
                />
                <div style={{ marginTop: 4 }}>
                  <FallOutlined style={{ color: "#ff4d4f" }} />
                  <span style={{ color: "#ff4d4f", marginLeft: 4 }}>-4.8%</span>
                </div>
              </Card>

              <Card size="small">
                <Statistic
                  title="Paid Traffic"
                  value="621K"
                  valueStyle={{ fontSize: 20 }}
                />
                <div style={{ marginTop: 4 }}>
                  <RiseOutlined style={{ color: "#52c41a" }} />
                  <span style={{ color: "#52c41a", marginLeft: 4 }}>+89%</span>
                </div>
              </Card>
            </Space>
          </Col>
        </Row>
      </Card>

      {/* Top Pages Section */}
      <Card style={{ marginBottom: 24 }}>
        <Tabs defaultActiveKey="topPages" items={tabItems} />
      </Card>

      {/* Keywords Section */}
      <Card className={styles.keywordsSection}>
        <h3 className={styles.keywordsHeader}>Keywords</h3>

        <Table
          columns={keywordsColumns}
          dataSource={keywordsData}
          pagination={false}
          style={{ backgroundColor: "white" }}
        />

        <div style={{ textAlign: "center", marginTop: 16 }}>
          <Button type="primary" icon={<ArrowRightOutlined />}>
            View all keyword
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default CompetitiveResearchPage;
