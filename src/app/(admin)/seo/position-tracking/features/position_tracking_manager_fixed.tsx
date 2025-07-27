"use client";

import React, { useState, useEffect } from "react";
import {
  Card,
  Table,
  Button,
  Select,
  DatePicker,
  Statistic,
  Row,
  Col,
  Tag,
  Progress,
  Tooltip,
  Tabs,
  Input,
  Space,
  Dropdown,
  Modal,
} from "antd";
import {
  ArrowUpOutlined,
  ArrowDownOutlined,
  PlusOutlined,
  SettingOutlined,
  ExportOutlined,
  SearchOutlined,
  MoreOutlined,
} from "@ant-design/icons";
import { useSelector } from "react-redux";
import { RootState } from "@/stores/store";
import styles from "./position_tracking_manager.module.scss";

const { Option } = Select;
const { RangePicker } = DatePicker;
const { Search } = Input;

interface KeywordRanking {
  id: string;
  keyword: string;
  currentPosition: number;
  previousPosition: number;
  change: number;
  url: string;
  searchVolume: number;
  difficulty: number;
  cpc: number;
  intent: "Informational" | "Commercial" | "Navigational" | "Transactional";
  tags: string[];
  lastUpdated: string;
  serp: {
    features: string[];
    competitorRankings: Array<{
      domain: string;
      position: number;
    }>;
  };
}

interface TrackingProject {
  id: string;
  name: string;
  domain: string;
  keywords: KeywordRanking[];
  competitors: string[];
  locations: string[];
  devices: string[];
  lastUpdate: string;
  totalKeywords: number;
  averagePosition: number;
  visibility: number;
}

const PositionTrackingManager: React.FC = () => {
  const selectedProject = useSelector(
    (state: RootState) => state.project.currentProject
  );
  const [trackingData, setTrackingData] = useState<TrackingProject | null>(
    null
  );
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("overview");
  const [selectedPeriod, setSelectedPeriod] = useState("7d");
  const [searchKeyword, setSearchKeyword] = useState("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [showAddKeywordModal, setShowAddKeywordModal] = useState(false);

  // Mock data for position tracking
  const mockTrackingData: TrackingProject = {
    id: "1",
    name: "Main Website Tracking",
    domain: selectedProject?.domain || "example.com",
    lastUpdate: "2025-01-20T10:30:00Z",
    totalKeywords: 156,
    averagePosition: 12.4,
    visibility: 68.5,
    competitors: ["competitor1.com", "competitor2.com", "competitor3.com"],
    locations: ["United States", "United Kingdom", "Canada"],
    devices: ["Desktop", "Mobile"],
    keywords: [
      {
        id: "1",
        keyword: "seo tools",
        currentPosition: 3,
        previousPosition: 5,
        change: 2,
        url: "/seo-tools",
        searchVolume: 12000,
        difficulty: 68,
        cpc: 4.25,
        intent: "Commercial",
        tags: ["core", "high-volume"],
        lastUpdated: "2025-01-20T10:30:00Z",
        serp: {
          features: ["Featured Snippet", "People Also Ask"],
          competitorRankings: [
            { domain: "competitor1.com", position: 1 },
            { domain: "competitor2.com", position: 7 },
          ],
        },
      },
      {
        id: "2",
        keyword: "keyword research",
        currentPosition: 8,
        previousPosition: 6,
        change: -2,
        url: "/keyword-research",
        searchVolume: 8500,
        difficulty: 72,
        cpc: 3.8,
        intent: "Informational",
        tags: ["content", "medium-volume"],
        lastUpdated: "2025-01-20T10:30:00Z",
        serp: {
          features: ["Video Results", "Related Searches"],
          competitorRankings: [
            { domain: "competitor1.com", position: 2 },
            { domain: "competitor3.com", position: 12 },
          ],
        },
      },
      {
        id: "3",
        keyword: "backlink analysis",
        currentPosition: 15,
        previousPosition: 18,
        change: 3,
        url: "/backlink-analysis",
        searchVolume: 5200,
        difficulty: 65,
        cpc: 5.1,
        intent: "Commercial",
        tags: ["technical", "growing"],
        lastUpdated: "2025-01-20T10:30:00Z",
        serp: {
          features: ["Knowledge Panel"],
          competitorRankings: [
            { domain: "competitor2.com", position: 4 },
            { domain: "competitor1.com", position: 9 },
          ],
        },
      },
    ],
  };

  useEffect(() => {
    if (selectedProject) {
      setLoading(true);
      // Simulate API call
      setTimeout(() => {
        setTrackingData(mockTrackingData);
        setLoading(false);
      }, 1000);
    }
  }, [selectedProject]);

  const getPositionChange = (current: number, previous: number) => {
    const change = previous - current; // Higher position = lower number
    return {
      value: change,
      isPositive: change > 0,
      isNegative: change < 0,
    };
  };

  const getIntentColor = (intent: string) => {
    const colors = {
      Commercial: "green",
      Informational: "blue",
      Navigational: "orange",
      Transactional: "red",
    };
    return colors[intent as keyof typeof colors] || "default";
  };

  const filteredKeywords =
    trackingData?.keywords.filter((keyword) => {
      const matchesSearch = keyword.keyword
        .toLowerCase()
        .includes(searchKeyword.toLowerCase());
      const matchesTags =
        selectedTags.length === 0 ||
        selectedTags.some((tag) => keyword.tags.includes(tag));
      return matchesSearch && matchesTags;
    }) || [];

  const keywordColumns = [
    {
      title: "Keyword",
      dataIndex: "keyword",
      key: "keyword",
      sorter: (a: KeywordRanking, b: KeywordRanking) =>
        a.keyword.localeCompare(b.keyword),
      render: (text: string, record: KeywordRanking) => (
        <div>
          <div className={styles.keywordText}>{text}</div>
          <div className={styles.keywordUrl}>{record.url}</div>
        </div>
      ),
    },
    {
      title: "Position",
      dataIndex: "currentPosition",
      key: "position",
      sorter: (a: KeywordRanking, b: KeywordRanking) =>
        a.currentPosition - b.currentPosition,
      render: (position: number, record: KeywordRanking) => {
        const change = getPositionChange(
          record.currentPosition,
          record.previousPosition
        );
        return (
          <div className={styles.positionCell}>
            <span className={styles.currentPosition}>{position}</span>
            {change.value !== 0 && (
              <span
                className={`${styles.positionChange} ${
                  change.isPositive ? styles.positive : styles.negative
                }`}
              >
                {change.isPositive ? (
                  <ArrowUpOutlined />
                ) : (
                  <ArrowDownOutlined />
                )}
                {Math.abs(change.value)}
              </span>
            )}
          </div>
        );
      },
    },
    {
      title: "Search Volume",
      dataIndex: "searchVolume",
      key: "volume",
      sorter: (a: KeywordRanking, b: KeywordRanking) =>
        a.searchVolume - b.searchVolume,
      render: (volume: number) => volume.toLocaleString(),
    },
    {
      title: "Difficulty",
      dataIndex: "difficulty",
      key: "difficulty",
      sorter: (a: KeywordRanking, b: KeywordRanking) =>
        a.difficulty - b.difficulty,
      render: (difficulty: number) => (
        <Progress
          percent={difficulty}
          size="small"
          strokeColor={
            difficulty > 70
              ? "#ff4d4f"
              : difficulty > 40
              ? "#faad14"
              : "#52c41a"
          }
          showInfo={true}
          format={(percent) => `${percent}`}
        />
      ),
    },
    {
      title: "Intent",
      dataIndex: "intent",
      key: "intent",
      filters: [
        { text: "Commercial", value: "Commercial" },
        { text: "Informational", value: "Informational" },
        { text: "Navigational", value: "Navigational" },
        { text: "Transactional", value: "Transactional" },
      ],
      onFilter: (value: any, record: KeywordRanking) => record.intent === value,
      render: (intent: string) => (
        <Tag color={getIntentColor(intent)}>{intent}</Tag>
      ),
    },
    {
      title: "CPC",
      dataIndex: "cpc",
      key: "cpc",
      sorter: (a: KeywordRanking, b: KeywordRanking) => a.cpc - b.cpc,
      render: (cpc: number) => `$${cpc.toFixed(2)}`,
    },
    {
      title: "Tags",
      dataIndex: "tags",
      key: "tags",
      render: (tags: string[]) => (
        <Space size={4} wrap>
          {tags.map((tag) => (
            <Tag key={tag}>{tag}</Tag>
          ))}
        </Space>
      ),
    },
    {
      title: "Actions",
      key: "actions",
      render: (record: KeywordRanking) => (
        <Dropdown
          menu={{
            items: [
              { key: "1", label: "View SERP", icon: <SearchOutlined /> },
              { key: "2", label: "Edit Settings", icon: <SettingOutlined /> },
              { key: "3", label: "Remove", danger: true },
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
      title: "Total Keywords",
      value: trackingData?.totalKeywords || 0,
      prefix: <SearchOutlined />,
      suffix: "keywords",
    },
    {
      title: "Average Position",
      value: trackingData?.averagePosition || 0,
      precision: 1,
      prefix: <ArrowUpOutlined />,
      valueStyle: { color: "#3f8600" },
    },
    {
      title: "Visibility Score",
      value: trackingData?.visibility || 0,
      suffix: "%",
      precision: 1,
      prefix: <ArrowUpOutlined />,
      valueStyle: { color: "#1890ff" },
    },
    {
      title: "Top 10 Rankings",
      value: filteredKeywords.filter((k) => k.currentPosition <= 10).length,
      suffix: `of ${filteredKeywords.length}`,
      prefix: <ArrowUpOutlined />,
      valueStyle: { color: "#52c41a" },
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

          <Card
            title="Position Distribution"
            className={styles.distributionCard}
          >
            <Row gutter={16}>
              <Col span={6}>
                <Statistic
                  title="Top 3"
                  value={
                    filteredKeywords.filter((k) => k.currentPosition <= 3)
                      .length
                  }
                  valueStyle={{ color: "#52c41a" }}
                />
              </Col>
              <Col span={6}>
                <Statistic
                  title="Top 10"
                  value={
                    filteredKeywords.filter((k) => k.currentPosition <= 10)
                      .length
                  }
                  valueStyle={{ color: "#1890ff" }}
                />
              </Col>
              <Col span={6}>
                <Statistic
                  title="Top 20"
                  value={
                    filteredKeywords.filter((k) => k.currentPosition <= 20)
                      .length
                  }
                  valueStyle={{ color: "#faad14" }}
                />
              </Col>
              <Col span={6}>
                <Statistic
                  title="Beyond 20"
                  value={
                    filteredKeywords.filter((k) => k.currentPosition > 20)
                      .length
                  }
                  valueStyle={{ color: "#ff4d4f" }}
                />
              </Col>
            </Row>
          </Card>
        </div>
      ),
    },
    {
      key: "keywords",
      label: "Keywords",
      children: (
        <div className={styles.keywordsTab}>
          <div className={styles.filtersSection}>
            <Row gutter={16}>
              <Col xs={24} sm={12} md={8}>
                <Search
                  placeholder="Search keywords..."
                  value={searchKeyword}
                  onChange={(e) => setSearchKeyword(e.target.value)}
                  style={{ width: "100%" }}
                />
              </Col>
              <Col xs={24} sm={12} md={8}>
                <Select
                  mode="multiple"
                  placeholder="Filter by tags"
                  value={selectedTags}
                  onChange={setSelectedTags}
                  style={{ width: "100%" }}
                >
                  <Option value="core">Core</Option>
                  <Option value="high-volume">High Volume</Option>
                  <Option value="content">Content</Option>
                  <Option value="technical">Technical</Option>
                  <Option value="growing">Growing</Option>
                </Select>
              </Col>
              <Col xs={24} sm={24} md={8}>
                <Space>
                  <Button
                    type="primary"
                    icon={<PlusOutlined />}
                    onClick={() => setShowAddKeywordModal(true)}
                  >
                    Add Keywords
                  </Button>
                  <Button icon={<ExportOutlined />}>Export</Button>
                </Space>
              </Col>
            </Row>
          </div>

          <Table
            columns={keywordColumns}
            dataSource={filteredKeywords}
            rowKey="id"
            loading={loading}
            pagination={{
              pageSize: 50,
              showSizeChanger: true,
              showQuickJumper: true,
              showTotal: (total) => `Total ${total} keywords`,
            }}
            scroll={{ x: 1200 }}
          />
        </div>
      ),
    },
    {
      key: "competitors",
      label: "Competitors",
      children: (
        <div className={styles.competitorsTab}>
          <Card title="Competitor Analysis">
            <p>Competitor position tracking analysis will be displayed here.</p>
            <p>
              This feature shows how your keywords perform against competitor
              rankings.
            </p>
          </Card>
        </div>
      ),
    },
    {
      key: "reports",
      label: "Reports",
      children: (
        <div className={styles.reportsTab}>
          <Card title="Ranking Reports">
            <p>Automated ranking reports and scheduling options.</p>
            <p>
              Generate PDF reports, schedule email reports, and track historical
              performance.
            </p>
          </Card>
        </div>
      ),
    },
  ];

  if (!selectedProject) {
    return (
      <div className={styles.noProject}>
        <Card>
          <div style={{ textAlign: "center", padding: "40px 0" }}>
            <SearchOutlined style={{ fontSize: "48px", color: "#d9d9d9" }} />
            <h3>No Project Selected</h3>
            <p>Please select a project to view position tracking data.</p>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className={styles.positionTrackingManager}>
      <div className={styles.header}>
        <div className={styles.headerContent}>
          <h1>Position Tracking</h1>
          <p>Monitor your keyword rankings and track performance over time</p>
        </div>
        <div className={styles.headerActions}>
          <Space>
            <Select
              value={selectedPeriod}
              onChange={setSelectedPeriod}
              style={{ width: 120 }}
            >
              <Option value="7d">Last 7 days</Option>
              <Option value="30d">Last 30 days</Option>
              <Option value="90d">Last 90 days</Option>
            </Select>
            <Button icon={<SettingOutlined />}>Settings</Button>
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
        title="Add Keywords"
        open={showAddKeywordModal}
        onCancel={() => setShowAddKeywordModal(false)}
        footer={[
          <Button key="cancel" onClick={() => setShowAddKeywordModal(false)}>
            Cancel
          </Button>,
          <Button key="submit" type="primary">
            Add Keywords
          </Button>,
        ]}
      >
        <p>Keyword addition interface would be implemented here.</p>
        <Input.TextArea placeholder="Enter keywords (one per line)" rows={6} />
      </Modal>
    </div>
  );
};

export default PositionTrackingManager;
