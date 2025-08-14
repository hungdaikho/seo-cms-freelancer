"use client";
import React, { useState } from "react";
import {
  Button,
  Card,
  Col,
  Row,
  Select,
  Table,
  Space,
  Typography,
  Input,
  Tag,
  Collapse,
  Dropdown,
  Menu,
} from "antd";
import { DownloadOutlined, DownOutlined } from "@ant-design/icons";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Legend,
} from "recharts";
import styles from "./BacklinkGap.module.scss";
const { Panel } = Collapse;
const { Title, Text } = Typography;

type Props = {};

const BacklinkGapPage = (props: Props) => {
  const [selectedDomain, setSelectedDomain] = useState("webflow.com");
  // Sample data for Authority Score chart
  const authorityScoreData = [
    { month: "Jan 2021", value: 95.5 },
    { month: "Mar 2022", value: 95.3 },
    { month: "May 2022", value: 95.1 },
    { month: "Jul 2022", value: 95.0 },
    { month: "Sep 2022", value: 94.8 },
  ];

  // Sample data for Referring Domains chart
  const referringDomainsData = [
    { month: "Jan 2021", webflow: 75.5, wix: 62.8 },
    { month: "Mar 2022", webflow: 76.2, wix: 64.1 },
    { month: "May 2022", webflow: 74.8, wix: 65.3 },
    { month: "Jul 2022", webflow: 78.1, wix: 67.2 },
    { month: "Sep 2022", webflow: 82.5, wix: 69.8 },
  ];

  // Sample data for prospects table
  const prospectsData = [
    {
      key: "1",
      keyword: "topdust.com",
      category: "Business & Industrial Business Operations",
      as: 91,
      monthlyVisits: "1.3B",
      websites: "1/2",
      wix: 0,
      webflow: 1,
    },
    {
      key: "2",
      keyword: "topdust.com",
      category: "Business & Industrial Business Operations",
      as: 91,
      monthlyVisits: "8M",
      websites: "1/2",
      wix: 0,
      webflow: 3,
    },
    {
      key: "3",
      keyword: "topdust.com",
      category: "Business & Industrial Business Operations",
      as: 91,
      monthlyVisits: "120M",
      websites: "1/2",
      wix: 0,
      webflow: 5,
    },
    {
      key: "4",
      keyword: "topdust.com",
      category: "Business & Industrial Business Operations",
      as: 91,
      monthlyVisits: "222M",
      websites: "1/2",
      wix: 0,
      webflow: 2,
    },
  ];

  const prospectsColumns = [
    {
      title: "Keyword",
      dataIndex: "keyword",
      key: "keyword",
      render: (text: string, record: any) => (
        <div>
          <Button type="link" style={{ padding: 0, color: "#1890ff" }}>
            {text}
          </Button>
          <div style={{ fontSize: "12px", color: "#666", marginTop: "2px" }}>
            {record.category}
          </div>
        </div>
      ),
    },
    {
      title: "AS",
      dataIndex: "as",
      key: "as",
      render: (as: number) => (
        <span>
          {as} <DownOutlined style={{ fontSize: "10px", color: "#666" }} />
        </span>
      ),
    },
    {
      title: "Monthly visits",
      dataIndex: "monthlyVisits",
      key: "monthlyVisits",
    },
    {
      title: "Websites",
      dataIndex: "websites",
      key: "websites",
    },
    {
      title: (
        <Space>
          <span style={{ color: "#52c41a" }}>●</span>
          <span>Wix.com</span>
        </Space>
      ),
      dataIndex: "wix",
      key: "wix",
    },
    {
      title: (
        <Space>
          <span style={{ color: "#ff7875" }}>●</span>
          <span>Webflow.com</span>
        </Space>
      ),
      dataIndex: "webflow",
      key: "webflow",
    },
  ];

  const filterMenu = (
    <Menu>
      <Menu.Item key="1">Best</Menu.Item>
      <Menu.Item key="2">Weak</Menu.Item>
      <Menu.Item key="3">Strong</Menu.Item>
      <Menu.Item key="4">Untapped</Menu.Item>
      <Menu.Item key="5">Unique</Menu.Item>
      <Menu.Item key="6">All</Menu.Item>
    </Menu>
  );

  const authorityScoreMenu = (
    <Menu>
      <Menu.Item key="1">Authority Score</Menu.Item>
      <Menu.Item key="2">Domain Rating</Menu.Item>
    </Menu>
  );

  const advancedFiltersMenu = (
    <Menu>
      <Menu.Item key="1">Industry Filter</Menu.Item>
      <Menu.Item key="2">Traffic Filter</Menu.Item>
      <Menu.Item key="3">Authority Filter</Menu.Item>
    </Menu>
  );

  return (
    <div className={styles.backlinkGap}>
      <div style={{ padding: "24px" }}>
        {/* Header */}
        <Row
          align="middle"
          justify="space-between"
          style={{ marginBottom: "24px" }}
        >
          <Col>
            <Title level={2} style={{ margin: 0 }}>
              Backlink Gap
            </Title>
          </Col>
        </Row>

        {/* Domain Selection */}
        <Card
          className={styles.domainInputSection}
          style={{ marginBottom: "24px" }}
        >
          <Row gutter={[16, 16]}>
            <Col span={8}>
              <Space direction="vertical" style={{ width: "100%" }}>
                <Text>
                  Root Domain <DownOutlined />
                </Text>
                <Input placeholder="Enter domain" />
              </Space>
            </Col>
            <Col span={8}>
              <Space direction="vertical" style={{ width: "100%" }}>
                <Text>
                  Root Domain <DownOutlined />
                </Text>
                <Input placeholder="Enter domain" />
              </Space>
            </Col>
            <Col span={8}>
              <Text style={{ color: "#1890ff", cursor: "pointer" }}>
                + Add up to 3 competitors
              </Text>
            </Col>
          </Row>
          <Row style={{ marginTop: "16px" }}>
            <Col>
              <Space>
                <Button type="primary">Find prospect</Button>
                <Button>Clear all</Button>
              </Space>
            </Col>
          </Row>
        </Card>

        {/* Charts Section */}
        <Collapse defaultActiveKey={["1"]} style={{ marginBottom: "24px" }}>
          <Panel header="Charts" key="1">
            <Row gutter={[24, 24]}>
              {/* Authority Score Chart */}
              <Col span={12}>
                <Card>
                  <Title level={4}>Authority Score</Title>
                  <Text style={{ fontSize: "12px", color: "#666" }}>
                    Widget keywo Root domain - Last 12 months
                  </Text>
                  <div
                    style={{ height: "300px", marginTop: "16px" }}
                    className={styles.chartContainer}
                  >
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={authorityScoreData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" />
                        <YAxis domain={[94, 96]} />
                        <Line
                          type="monotone"
                          dataKey="value"
                          stroke="#1890ff"
                          strokeWidth={2}
                          dot={{ fill: "#1890ff", strokeWidth: 2, r: 4 }}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                  <div style={{ marginTop: "16px" }}>
                    <div className={styles.legendItem}>
                      <span
                        className={styles.legendDot}
                        style={{ backgroundColor: "#1890ff" }}
                      ></span>
                      <Text>Webflow.com</Text>
                    </div>
                  </div>
                </Card>
              </Col>

              {/* Referring Domains Chart */}
              <Col span={12}>
                <Card>
                  <Title level={4}>Referring Domains</Title>
                  <Text style={{ fontSize: "12px", color: "#666" }}>
                    Widget keywo Root domain - Last 12 months
                  </Text>
                  <div
                    style={{ height: "300px", marginTop: "16px" }}
                    className={styles.chartContainer}
                  >
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={referringDomainsData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" />
                        <YAxis domain={[60, 85]} />
                        <Line
                          type="monotone"
                          dataKey="webflow"
                          stroke="#1890ff"
                          strokeWidth={2}
                          name="Webflow.com"
                        />
                        <Line
                          type="monotone"
                          dataKey="wix"
                          stroke="#52c41a"
                          strokeWidth={2}
                          name="Wix.com"
                        />
                        <Legend />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                  <div style={{ marginTop: "16px" }}>
                    <Space size="large">
                      <div className={styles.legendItem}>
                        <span
                          className={styles.legendDot}
                          style={{ backgroundColor: "#1890ff" }}
                        ></span>
                        <Text>Webflow.com</Text>
                      </div>
                      <div className={styles.legendItem}>
                        <span
                          className={styles.legendDot}
                          style={{ backgroundColor: "#52c41a" }}
                        ></span>
                        <Text>Wix.com</Text>
                      </div>
                    </Space>
                  </div>
                </Card>
              </Col>
            </Row>
          </Panel>
        </Collapse>

        {/* Prospects Table */}
        <Card>
          <Row
            justify="space-between"
            align="middle"
            style={{ marginBottom: "16px" }}
          >
            <Col>
              <div className={styles.prospectsHeader}>
                <Title level={4}>
                  Prospects for:{" "}
                  <Text code>
                    {selectedDomain} <DownOutlined />
                  </Text>
                </Title>
              </div>
            </Col>
            <Col>
              <Button icon={<DownloadOutlined />}>
                EXPORT <DownOutlined />
              </Button>
            </Col>
          </Row>

          {/* Filter Tags */}
          <div className={styles.filterTags}>
            <Row style={{ marginBottom: "16px" }}>
              <Space wrap>
                <Tag color="orange">Best</Tag>
                <Tag>Weak</Tag>
                <Tag>Strong</Tag>
                <Tag>Untapped</Tag>
                <Tag>Unique</Tag>
                <Tag>All</Tag>
              </Space>
            </Row>
          </div>

          {/* Table Controls */}
          <Row
            justify="space-between"
            align="middle"
            style={{ marginBottom: "16px" }}
          >
            <Col>
              <Space>
                <Dropdown overlay={authorityScoreMenu} trigger={["click"]}>
                  <Button>
                    Authority Score <DownOutlined />
                  </Button>
                </Dropdown>
                <Dropdown overlay={advancedFiltersMenu} trigger={["click"]}>
                  <Button>
                    Advanced filters <DownOutlined />
                  </Button>
                </Dropdown>
              </Space>
            </Col>
            <Col>
              <Button type="primary">+ Start Outreach</Button>
            </Col>
          </Row>

          {/* Table */}
          <Table
            columns={prospectsColumns}
            dataSource={prospectsData}
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

export default BacklinkGapPage;
