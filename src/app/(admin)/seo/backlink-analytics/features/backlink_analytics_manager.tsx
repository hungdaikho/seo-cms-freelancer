"use client";

import React, { useState, useEffect } from "react";
import {
  Card,
  Table,
  Button,
  Select,
  Statistic,
  Row,
  Col,
  Tag,
  Progress,
  Tabs,
  Input,
  Space,
  Dropdown,
  Modal,
  Alert,
  List,
  Avatar,
  Tooltip,
} from "antd";
import {
  LinkOutlined,
  ArrowUpOutlined,
  ArrowDownOutlined,
  SearchOutlined,
  ExportOutlined,
  WarningOutlined,
  CheckCircleOutlined,
  InfoCircleOutlined,
  MoreOutlined,
  GlobalOutlined,
} from "@ant-design/icons";
import { useSelector } from "react-redux";
import { RootState } from "@/stores/store";
import styles from "./backlink_analytics_manager.module.scss";

const { Option } = Select;
const { Search } = Input;

interface Backlink {
  id: string;
  sourceUrl: string;
  sourceDomain: string;
  targetUrl: string;
  anchorText: string;
  linkType: "follow" | "nofollow";
  linkStatus: "active" | "lost" | "new";
  domainAuthority: number;
  pageAuthority: number;
  trustFlow: number;
  citationFlow: number;
  firstSeen: string;
  lastSeen: string;
  linkPosition: "content" | "sidebar" | "footer" | "navigation";
  isSponsored: boolean;
  isUGC: boolean;
  category: string;
}

interface BacklinkProfile {
  totalBacklinks: number;
  referringDomains: number;
  domainAuthority: number;
  trustFlow: number;
  newBacklinks: Backlink[];
  lostBacklinks: Backlink[];
  topBacklinks: Backlink[];
  toxicLinks: Backlink[];
  linkTypes: {
    follow: number;
    nofollow: number;
  };
  anchorTextDistribution: Array<{
    text: string;
    count: number;
    percentage: number;
  }>;
}

const BacklinkAnalyticsManager: React.FC = () => {
  const selectedProject = useSelector(
    (state: RootState) => state.project.currentProject
  );
  const [backlinkData, setBacklinkData] = useState<BacklinkProfile | null>(
    null
  );
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("overview");
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState<string>("all");
  const [showDisavowModal, setShowDisavowModal] = useState(false);
  const [selectedBacklinks, setSelectedBacklinks] = useState<string[]>([]);

  // Mock data for backlink analytics
  const mockBacklinkData: BacklinkProfile = {
    totalBacklinks: 12845,
    referringDomains: 2156,
    domainAuthority: 68,
    trustFlow: 42,
    linkTypes: {
      follow: 8920,
      nofollow: 3925,
    },
    anchorTextDistribution: [
      { text: "seo tools", count: 245, percentage: 25.4 },
      { text: "keyword research", count: 189, percentage: 19.6 },
      { text: "example.com", count: 156, percentage: 16.2 },
      { text: "click here", count: 98, percentage: 10.2 },
      { text: "read more", count: 67, percentage: 6.9 },
    ],
    newBacklinks: [
      {
        id: "1",
        sourceUrl: "https://marketing-blog.com/seo-tools-2025",
        sourceDomain: "marketing-blog.com",
        targetUrl: "/seo-tools",
        anchorText: "best seo tools",
        linkType: "follow",
        linkStatus: "new",
        domainAuthority: 72,
        pageAuthority: 65,
        trustFlow: 48,
        citationFlow: 52,
        firstSeen: "2025-01-20",
        lastSeen: "2025-01-20",
        linkPosition: "content",
        isSponsored: false,
        isUGC: false,
        category: "Marketing",
      },
      {
        id: "2",
        sourceUrl: "https://tech-news.com/digital-marketing-trends",
        sourceDomain: "tech-news.com",
        targetUrl: "/blog/digital-marketing",
        anchorText: "digital marketing platform",
        linkType: "follow",
        linkStatus: "new",
        domainAuthority: 68,
        pageAuthority: 58,
        trustFlow: 45,
        citationFlow: 49,
        firstSeen: "2025-01-19",
        lastSeen: "2025-01-19",
        linkPosition: "content",
        isSponsored: false,
        isUGC: false,
        category: "Technology",
      },
    ],
    lostBacklinks: [
      {
        id: "3",
        sourceUrl: "https://old-blog.com/seo-review",
        sourceDomain: "old-blog.com",
        targetUrl: "/home",
        anchorText: "seo platform",
        linkType: "follow",
        linkStatus: "lost",
        domainAuthority: 45,
        pageAuthority: 38,
        trustFlow: 25,
        citationFlow: 32,
        firstSeen: "2024-12-15",
        lastSeen: "2025-01-15",
        linkPosition: "content",
        isSponsored: false,
        isUGC: false,
        category: "SEO",
      },
    ],
    topBacklinks: [
      {
        id: "4",
        sourceUrl: "https://authority-site.com/resources",
        sourceDomain: "authority-site.com",
        targetUrl: "/",
        anchorText: "example.com",
        linkType: "follow",
        linkStatus: "active",
        domainAuthority: 89,
        pageAuthority: 82,
        trustFlow: 78,
        citationFlow: 85,
        firstSeen: "2024-08-10",
        lastSeen: "2025-01-20",
        linkPosition: "content",
        isSponsored: false,
        isUGC: false,
        category: "Business",
      },
    ],
    toxicLinks: [
      {
        id: "5",
        sourceUrl: "https://spam-site.com/links",
        sourceDomain: "spam-site.com",
        targetUrl: "/",
        anchorText: "cheap viagra",
        linkType: "follow",
        linkStatus: "active",
        domainAuthority: 12,
        pageAuthority: 8,
        trustFlow: 5,
        citationFlow: 15,
        firstSeen: "2025-01-18",
        lastSeen: "2025-01-20",
        linkPosition: "footer",
        isSponsored: false,
        isUGC: false,
        category: "Spam",
      },
    ],
  };

  useEffect(() => {
    if (selectedProject) {
      setLoading(true);
      // Simulate API call
      setTimeout(() => {
        setBacklinkData(mockBacklinkData);
        setLoading(false);
      }, 1000);
    }
  }, [selectedProject]);

  const getStatusColor = (status: string) => {
    const colors = {
      active: "green",
      new: "blue",
      lost: "red",
    };
    return colors[status as keyof typeof colors] || "default";
  };

  const getAuthorityColor = (score: number) => {
    if (score >= 70) return "#52c41a";
    if (score >= 40) return "#faad14";
    return "#ff4d4f";
  };

  const backlinkColumns = [
    {
      title: "Source Domain",
      dataIndex: "sourceDomain",
      key: "sourceDomain",
      sorter: (a: Backlink, b: Backlink) =>
        a.sourceDomain.localeCompare(b.sourceDomain),
      render: (domain: string, record: Backlink) => (
        <div className={styles.domainCell}>
          <div className={styles.domainName}>
            <GlobalOutlined style={{ marginRight: 8, color: "#1890ff" }} />
            {domain}
          </div>
          <div className={styles.sourceUrl}>
            <a
              href={record.sourceUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              {record.sourceUrl}
            </a>
          </div>
        </div>
      ),
    },
    {
      title: "Anchor Text",
      dataIndex: "anchorText",
      key: "anchorText",
      sorter: (a: Backlink, b: Backlink) =>
        a.anchorText.localeCompare(b.anchorText),
      render: (text: string, record: Backlink) => (
        <div className={styles.anchorCell}>
          <span className={styles.anchorText}>{text}</span>
          <div className={styles.linkAttributes}>
            {record.linkType === "nofollow" && (
              <Tag color="orange">nofollow</Tag>
            )}
            {record.isSponsored && <Tag color="purple">sponsored</Tag>}
            {record.isUGC && <Tag color="cyan">UGC</Tag>}
          </div>
        </div>
      ),
    },
    {
      title: "DA",
      dataIndex: "domainAuthority",
      key: "domainAuthority",
      sorter: (a: Backlink, b: Backlink) =>
        a.domainAuthority - b.domainAuthority,
      render: (da: number) => (
        <div className={styles.metricCell}>
          <span style={{ color: getAuthorityColor(da), fontWeight: 600 }}>
            {da}
          </span>
        </div>
      ),
    },
    {
      title: "PA",
      dataIndex: "pageAuthority",
      key: "pageAuthority",
      sorter: (a: Backlink, b: Backlink) => a.pageAuthority - b.pageAuthority,
      render: (pa: number) => (
        <div className={styles.metricCell}>
          <span style={{ color: getAuthorityColor(pa), fontWeight: 600 }}>
            {pa}
          </span>
        </div>
      ),
    },
    {
      title: "Trust Flow",
      dataIndex: "trustFlow",
      key: "trustFlow",
      sorter: (a: Backlink, b: Backlink) => a.trustFlow - b.trustFlow,
      render: (tf: number) => (
        <div className={styles.metricCell}>
          <span style={{ color: getAuthorityColor(tf), fontWeight: 600 }}>
            {tf}
          </span>
        </div>
      ),
    },
    {
      title: "Status",
      dataIndex: "linkStatus",
      key: "linkStatus",
      filters: [
        { text: "Active", value: "active" },
        { text: "New", value: "new" },
        { text: "Lost", value: "lost" },
      ],
      onFilter: (value: any, record: Backlink) => record.linkStatus === value,
      render: (status: string) => (
        <Tag color={getStatusColor(status)}>{status.toUpperCase()}</Tag>
      ),
    },
    {
      title: "First Seen",
      dataIndex: "firstSeen",
      key: "firstSeen",
      sorter: (a: Backlink, b: Backlink) =>
        new Date(a.firstSeen).getTime() - new Date(b.firstSeen).getTime(),
      render: (date: string) => new Date(date).toLocaleDateString(),
    },
    {
      title: "Actions",
      key: "actions",
      render: (record: Backlink) => (
        <Dropdown
          menu={{
            items: [
              { key: "1", label: "View Details", icon: <InfoCircleOutlined /> },
              { key: "2", label: "Check Link", icon: <LinkOutlined /> },
              {
                key: "3",
                label: "Add to Disavow",
                icon: <WarningOutlined />,
                danger: true,
              },
            ],
          }}
          trigger={["click"]}
        >
          <Button icon={<MoreOutlined />} />
        </Dropdown>
      ),
    },
  ];

  const overviewStats = [
    {
      title: "Total Backlinks",
      value: backlinkData?.totalBacklinks || 0,
      prefix: <LinkOutlined />,
      suffix: "links",
    },
    {
      title: "Referring Domains",
      value: backlinkData?.referringDomains || 0,
      prefix: <GlobalOutlined />,
      suffix: "domains",
    },
    {
      title: "Domain Authority",
      value: backlinkData?.domainAuthority || 0,
      prefix: <ArrowUpOutlined />,
      valueStyle: {
        color: getAuthorityColor(backlinkData?.domainAuthority || 0),
      },
    },
    {
      title: "Trust Flow",
      value: backlinkData?.trustFlow || 0,
      prefix: <CheckCircleOutlined />,
      valueStyle: { color: getAuthorityColor(backlinkData?.trustFlow || 0) },
    },
  ];

  const tabItems = [
    {
      key: "overview",
      label: "Overview",
      children: (
        <div className={styles.overviewTab}>
          <Row gutter={[16, 16]} className={styles.statsRow}>
            {overviewStats.map((stat, index) => (
              <Col xs={24} sm={12} lg={6} key={index}>
                <Card>
                  <Statistic {...stat} />
                </Card>
              </Col>
            ))}
          </Row>

          <Row gutter={16}>
            <Col xs={24} lg={12}>
              <Card
                title="Link Types Distribution"
                className={styles.distributionCard}
              >
                <div className={styles.linkTypes}>
                  <div className={styles.linkTypeStat}>
                    <span className={styles.label}>Follow Links:</span>
                    <span className={styles.value}>
                      {backlinkData?.linkTypes.follow.toLocaleString()}
                    </span>
                    <Progress
                      percent={
                        ((backlinkData?.linkTypes.follow || 0) /
                          (backlinkData?.totalBacklinks || 1)) *
                        100
                      }
                      strokeColor="#52c41a"
                      showInfo={false}
                    />
                  </div>
                  <div className={styles.linkTypeStat}>
                    <span className={styles.label}>NoFollow Links:</span>
                    <span className={styles.value}>
                      {backlinkData?.linkTypes.nofollow.toLocaleString()}
                    </span>
                    <Progress
                      percent={
                        ((backlinkData?.linkTypes.nofollow || 0) /
                          (backlinkData?.totalBacklinks || 1)) *
                        100
                      }
                      strokeColor="#faad14"
                      showInfo={false}
                    />
                  </div>
                </div>
              </Card>
            </Col>

            <Col xs={24} lg={12}>
              <Card title="Top Anchor Texts" className={styles.anchorTextCard}>
                <List
                  dataSource={backlinkData?.anchorTextDistribution || []}
                  renderItem={(item) => (
                    <List.Item className={styles.anchorItem}>
                      <div className={styles.anchorItemContent}>
                        <span className={styles.anchorText}>{item.text}</span>
                        <span className={styles.anchorCount}>
                          {item.count} ({item.percentage}%)
                        </span>
                      </div>
                      <Progress
                        percent={item.percentage}
                        strokeColor="#1890ff"
                        showInfo={false}
                        size="small"
                      />
                    </List.Item>
                  )}
                />
              </Card>
            </Col>
          </Row>
        </div>
      ),
    },
    {
      key: "all-backlinks",
      label: "All Backlinks",
      children: (
        <div className={styles.backlinksTab}>
          <div className={styles.filtersSection}>
            <Row gutter={16}>
              <Col xs={24} sm={12} md={8}>
                <Search
                  placeholder="Search domains or anchor text..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  style={{ width: "100%" }}
                />
              </Col>
              <Col xs={24} sm={12} md={6}>
                <Select
                  placeholder="Filter by type"
                  value={filterType}
                  onChange={setFilterType}
                  style={{ width: "100%" }}
                >
                  <Option value="all">All Links</Option>
                  <Option value="follow">Follow Only</Option>
                  <Option value="nofollow">NoFollow Only</Option>
                  <Option value="new">New Links</Option>
                  <Option value="lost">Lost Links</Option>
                </Select>
              </Col>
              <Col xs={24} sm={24} md={10}>
                <Space>
                  <Button type="primary" icon={<ExportOutlined />}>
                    Export
                  </Button>
                  <Button
                    danger
                    icon={<WarningOutlined />}
                    onClick={() => setShowDisavowModal(true)}
                    disabled={selectedBacklinks.length === 0}
                  >
                    Disavow Selected
                  </Button>
                </Space>
              </Col>
            </Row>
          </div>

          <Table
            columns={backlinkColumns}
            dataSource={[
              ...(backlinkData?.newBacklinks || []),
              ...(backlinkData?.topBacklinks || []),
              ...(backlinkData?.lostBacklinks || []),
            ]}
            rowKey="id"
            loading={loading}
            rowSelection={{
              selectedRowKeys: selectedBacklinks,
              onChange: (keys) => setSelectedBacklinks(keys as string[]),
            }}
            pagination={{
              pageSize: 50,
              showSizeChanger: true,
              showQuickJumper: true,
              showTotal: (total) => `Total ${total} backlinks`,
            }}
            scroll={{ x: 1200 }}
          />
        </div>
      ),
    },
    {
      key: "new-backlinks",
      label: "New Backlinks",
      children: (
        <div className={styles.newBacklinksTab}>
          <Alert
            message="New Backlinks Detected"
            description={`${
              backlinkData?.newBacklinks.length || 0
            } new backlinks have been discovered in the last 30 days.`}
            type="success"
            showIcon
            style={{ marginBottom: 16 }}
          />
          <Table
            columns={backlinkColumns}
            dataSource={backlinkData?.newBacklinks || []}
            rowKey="id"
            loading={loading}
            pagination={false}
          />
        </div>
      ),
    },
    {
      key: "toxic-links",
      label: "Toxic Links",
      children: (
        <div className={styles.toxicLinksTab}>
          <Alert
            message="Toxic Links Detected"
            description="These links may harm your website's SEO performance. Consider disavowing them."
            type="warning"
            showIcon
            style={{ marginBottom: 16 }}
          />
          <Table
            columns={backlinkColumns}
            dataSource={backlinkData?.toxicLinks || []}
            rowKey="id"
            loading={loading}
            pagination={false}
          />
        </div>
      ),
    },
  ];

  if (!selectedProject) {
    return (
      <div className={styles.noProject}>
        <Card>
          <div style={{ textAlign: "center", padding: "40px 0" }}>
            <LinkOutlined style={{ fontSize: "48px", color: "#d9d9d9" }} />
            <h3>No Project Selected</h3>
            <p>Please select a project to view backlink analytics.</p>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className={styles.backlinkAnalyticsManager}>
      <div className={styles.header}>
        <div className={styles.headerContent}>
          <h1>Backlink Analytics</h1>
          <p>
            Monitor your backlink profile and discover new link opportunities
          </p>
        </div>
        <div className={styles.headerActions}>
          <Space>
            <Button icon={<SearchOutlined />}>Analyze Competitors</Button>
            <Button type="primary" icon={<ExportOutlined />}>
              Export Report
            </Button>
          </Space>
        </div>
      </div>

      <Tabs
        activeKey={activeTab}
        onChange={setActiveTab}
        items={tabItems}
        size="large"
        className={styles.mainTabs}
      />

      <Modal
        title="Disavow Backlinks"
        open={showDisavowModal}
        onCancel={() => setShowDisavowModal(false)}
        footer={[
          <Button key="cancel" onClick={() => setShowDisavowModal(false)}>
            Cancel
          </Button>,
          <Button key="submit" type="primary" danger>
            Add to Disavow File
          </Button>,
        ]}
      >
        <Alert
          message="Warning"
          description="Disavowing backlinks should be done carefully. Only disavow links that you believe are harming your site's rankings."
          type="warning"
          showIcon
          style={{ marginBottom: 16 }}
        />
        <p>You are about to disavow {selectedBacklinks.length} backlink(s).</p>
      </Modal>
    </div>
  );
};

export default BacklinkAnalyticsManager;
