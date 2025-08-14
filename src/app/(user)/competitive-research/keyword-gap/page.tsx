"use client";
import React, { useState } from "react";
import {
  Button,
  Card,
  Col,
  Row,
  Select,
  Tabs,
  Table,
  Space,
  Badge,
  Typography,
  Input,
  DatePicker,
  Progress,
  Tag,
} from "antd";
import {
  SearchOutlined,
  DownloadOutlined,
  PlusOutlined,
  FilterOutlined,
} from "@ant-design/icons";
import styles from "./KeywordGap.module.scss";

const { Option } = Select;
const { TabPane } = Tabs;
const { Title, Text } = Typography;

type Props = {};

const KeyWordGap = (props: Props) => {
  const [selectedDatabase, setSelectedDatabase] = useState("All DB");
  const [selectedDevice, setSelectedDevice] = useState("Desktop");
  const [selectedDate, setSelectedDate] = useState("12 September 2022");
  const [selectedCurrency, setSelectedCurrency] = useState("NGN");

  // Sample data for the table
  const keywordData = [
    {
      key: "1",
      keyword: "Designer",
      intent: "N",
      webflow: 12,
      wix: 22,
      volume: 2000,
      kd: 70,
      cpusd: 0,
      result: "12M",
    },
    {
      key: "2",
      keyword: "Designer",
      intent: "I",
      webflow: 20,
      wix: 20,
      volume: 1220,
      kd: 100,
      cpusd: 0,
      result: "12M",
    },
    {
      key: "3",
      keyword: "Designer",
      intent: "I T",
      webflow: 55,
      wix: 55,
      volume: 12550,
      kd: 80,
      cpusd: 0,
      result: "20M",
    },
    {
      key: "4",
      keyword: "Designer",
      intent: "I",
      webflow: 70,
      wix: 70,
      volume: 1200,
      kd: 70,
      cpusd: 0,
      result: "20M",
    },
    {
      key: "5",
      keyword: "Designer",
      intent: "N",
      webflow: 68,
      wix: 68,
      volume: 612000,
      kd: 24,
      cpusd: 0,
      result: "23M",
    },
    {
      key: "6",
      keyword: "Designer",
      intent: "C",
      webflow: 24,
      wix: 24,
      volume: 2412560,
      kd: 90,
      cpusd: 0,
      result: "1M",
    },
    {
      key: "7",
      keyword: "Designer",
      intent: "T",
      webflow: 12,
      wix: 12,
      volume: 122999,
      kd: 77,
      cpusd: 0,
      result: "34M",
    },
    {
      key: "8",
      keyword: "Designer",
      intent: "C",
      webflow: 14,
      wix: 14,
      volume: 26440,
      kd: 100,
      cpusd: 0,
      result: "21M",
    },
  ];

  const topOpportunities = [
    { keyword: "Etsy", volume: "16,600.00" },
    { keyword: "a", volume: "2,600.00" },
    { keyword: "a", volume: "600.00" },
  ];

  const columns = [
    {
      title: "Keyword",
      dataIndex: "keyword",
      key: "keyword",
      render: (text: string) => (
        <Button type="link" style={{ padding: 0, color: "#1890ff" }}>
          {text}
        </Button>
      ),
    },
    {
      title: "Intent",
      dataIndex: "intent",
      key: "intent",
      render: (intent: string) => {
        let color = "#52c41a";
        if (intent === "I") color = "#722ed1";
        if (intent === "N") color = "#1890ff";
        if (intent === "C") color = "#faad14";
        if (intent === "T") color = "#13c2c2";
        return (
          <Tag color={color} style={{ minWidth: "20px", textAlign: "center" }}>
            {intent}
          </Tag>
        );
      },
    },
    {
      title: "Webflow.com",
      dataIndex: "webflow",
      key: "webflow",
    },
    {
      title: "Wix.com",
      dataIndex: "wix",
      key: "wix",
    },
    {
      title: "Volume",
      dataIndex: "volume",
      key: "volume",
      render: (volume: number) => volume.toLocaleString(),
    },
    {
      title: "KD%",
      dataIndex: "kd",
      key: "kd",
      render: (kd: number) => `${kd} ▲`,
    },
    {
      title: "CPC(USD)",
      dataIndex: "cpusd",
      key: "cpusd",
    },
    {
      title: "Result",
      dataIndex: "result",
      key: "result",
    },
  ];

  const VennChart = () => (
    <div className={styles.vennContainer}>
      <svg width="300" height="200">
        <circle
          cx="120"
          cy="100"
          r="70"
          fill="#95d5b2"
          fillOpacity="0.6"
          stroke="#52c41a"
          strokeWidth="2"
        />
        <circle
          cx="180"
          cy="100"
          r="70"
          fill="#a8dadc"
          fillOpacity="0.6"
          stroke="#1890ff"
          strokeWidth="2"
        />
        <text x="80" y="105" textAnchor="middle" fontSize="12" fill="#000">
          Webflow.com
        </text>
        <text x="220" y="105" textAnchor="middle" fontSize="12" fill="#000">
          Wix.com
        </text>
      </svg>
    </div>
  );

  return (
    <div className={styles.keywordGap}>
      <div style={{ padding: "24px" }}>
        {/* Header */}
        <Row
          align="middle"
          justify="space-between"
          style={{ marginBottom: "24px" }}
        >
          <Col>
            <Title level={2} style={{ margin: 0 }}>
              Keyword Gap
            </Title>
          </Col>
          <Col>
            <Button type="primary" icon={<DownloadOutlined />}>
              Export to PDF
            </Button>
          </Col>
        </Row>

        {/* Filters */}
        <div className={styles.filterSection}>
          <Row gutter={[16, 16]}>
            <Col span={6}>
              <Space direction="vertical" style={{ width: "100%" }}>
                <Text>Database:</Text>
                <Select
                  value={selectedDatabase}
                  onChange={setSelectedDatabase}
                  style={{ width: "100%" }}
                >
                  <Option value="All DB">🌍 All DB</Option>
                  <Option value="US">🇺🇸 US</Option>
                  <Option value="UK">🇬🇧 UK</Option>
                </Select>
              </Space>
            </Col>
            <Col span={6}>
              <Space direction="vertical" style={{ width: "100%" }}>
                <Text>Device:</Text>
                <Select
                  value={selectedDevice}
                  onChange={setSelectedDevice}
                  style={{ width: "100%" }}
                >
                  <Option value="Desktop">🖥️ Desktop</Option>
                  <Option value="Mobile">📱 Mobile</Option>
                </Select>
              </Space>
            </Col>
            <Col span={6}>
              <Space direction="vertical" style={{ width: "100%" }}>
                <Text>Date:</Text>
                <Select
                  value={selectedDate}
                  onChange={setSelectedDate}
                  style={{ width: "100%" }}
                >
                  <Option value="12 September 2022">12 September 2022</Option>
                </Select>
              </Space>
            </Col>
            <Col span={6}>
              <Space direction="vertical" style={{ width: "100%" }}>
                <Text>Currency:</Text>
                <Select
                  value={selectedCurrency}
                  onChange={setSelectedCurrency}
                  style={{ width: "100%" }}
                >
                  <Option value="NGN">NGN</Option>
                  <Option value="USD">USD</Option>
                </Select>
              </Space>
            </Col>
          </Row>
        </div>

        {/* Domain Selection */}
        <Card style={{ marginBottom: "24px" }}>
          <Tabs defaultActiveKey="1">
            <TabPane tab="Organic Keywords" key="1">
              <Row gutter={[16, 16]}>
                <Col span={8}>
                  <Space direction="vertical" style={{ width: "100%" }}>
                    <Text>Root Domain ∨</Text>
                    <Input placeholder="Enter domain" />
                  </Space>
                </Col>
                <Col span={8}>
                  <Space direction="vertical" style={{ width: "100%" }}>
                    <Text>Root Domain ∨</Text>
                    <Input placeholder="Enter domain" />
                  </Space>
                </Col>
                <Col span={8}>
                  <Text style={{ color: "#1890ff", cursor: "pointer" }}>
                    ← Add up to 3 competitors
                  </Text>
                </Col>
              </Row>
              <Row style={{ marginTop: "16px" }}>
                <Col>
                  <Space>
                    <Button type="primary">Compare</Button>
                    <Button>Cancel</Button>
                  </Space>
                </Col>
              </Row>
            </TabPane>
            <TabPane tab="Paid Keywords" key="2">
              <div>Paid Keywords content</div>
            </TabPane>
            <TabPane tab="PLA Keywords" key="3">
              <div>PLA Keywords content</div>
            </TabPane>
          </Tabs>
          <Text style={{ color: "#666" }}>
            Select keyword type for each domain
          </Text>
        </Card>

        {/* Main Content */}
        <Row gutter={[24, 24]}>
          {/* Left Column - Venn Diagram */}
          <Col span={12}>
            <Card>
              <Title level={4}>Keyword Overlap</Title>
              <VennChart />
              <div style={{ marginTop: "16px" }}>
                <Space>
                  <Badge color="#52c41a" text="Webflow.com" />
                  <Badge color="#1890ff" text="Wix.com" />
                </Space>
              </div>
            </Card>
          </Col>

          {/* Right Column - Top Opportunities */}
          <Col span={12}>
            <Card>
              <Row justify="space-between" align="middle">
                <Title level={4}>Top Opportunities</Title>
                <Space>
                  <Text style={{ fontSize: "12px", color: "#666" }}>
                    Missing | Weak
                  </Text>
                </Space>
              </Row>
              <div style={{ marginBottom: "16px" }}>
                {topOpportunities.map((item, index) => (
                  <div key={index} className={styles.opportunityItem}>
                    <Row justify="space-between">
                      <Text style={{ color: "#1890ff" }}>
                        {item.keyword} &gt;&gt;
                      </Text>
                      <Text>{item.volume}</Text>
                    </Row>
                  </div>
                ))}
              </div>
              <Button type="primary">View details</Button>
            </Card>
          </Col>
        </Row>

        {/* Keyword Details Table */}
        <Card style={{ marginTop: "24px" }}>
          <Row
            justify="space-between"
            align="middle"
            style={{ marginBottom: "16px" }}
          >
            <Col>
              <Title level={4}>All keyword details for: webflow.com ∨</Title>
            </Col>
            <Col>
              <Space>
                <Input
                  placeholder="Filter by keyword"
                  prefix={<SearchOutlined />}
                  style={{ width: "200px" }}
                />
                <Button icon={<DownloadOutlined />}>EXPORT</Button>
              </Space>
            </Col>
          </Row>

          {/* Filter Tags */}
          <div className={styles.statsBadge}>
            <Row
              style={{
                marginBottom: "16px",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Col>
                <Space wrap>
                  <Tag color="orange">Shared 36,805</Tag>
                  <Tag>Missing 6,606</Tag>
                  <Tag>Weak 16,805</Tag>
                  <Tag>Strong 12,805</Tag>
                  <Tag>Untapped 3,605</Tag>
                  <Tag>Unique 134,805</Tag>
                  <Tag>All 636,805</Tag>
                </Space>
              </Col>
              <Col>
                <Col>
                  <Button type="primary" icon={<PlusOutlined />}>
                    Add to keyword list
                  </Button>
                </Col>
              </Col>
            </Row>
          </div>
          {/* Table */}
          <Table
            columns={columns}
            dataSource={keywordData}
            pagination={{
              showSizeChanger: true,
              showQuickJumper: true,
              showTotal: (total, range) =>
                `${range[0]}-${range[1]} of ${total} items`,
            }}
            scroll={{ x: 800 }}
          />
        </Card>
      </div>
    </div>
  );
};

export default KeyWordGap;
