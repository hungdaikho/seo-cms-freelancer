"use client";

import React, { useState, useEffect } from "react";
import {
  Card,
  Table,
  Button,
  Select,
  Input,
  Statistic,
  Row,
  Col,
  Tag,
  Progress,
  Tabs,
  Space,
  Dropdown,
  Modal,
  Slider,
  Checkbox,
  Tooltip,
  Alert,
} from "antd";
import {
  SearchOutlined,
  StarOutlined,
  StarFilled,
  ArrowUpOutlined,
  ArrowDownOutlined,
  QuestionCircleOutlined,
  ExportOutlined,
  PlusOutlined,
  FilterOutlined,
  DownloadOutlined,
  MoreOutlined,
  BulbOutlined,
} from "@ant-design/icons";
import { useSelector } from "react-redux";
import { RootState } from "@/stores/store";
import styles from "./keyword_magic_tool.module.scss";

const { Option } = Select;
const { Search } = Input;

interface KeywordData {
  id: string;
  keyword: string;
  searchVolume: number;
  keywordDifficulty: number;
  cpc: number;
  competitiveDensity: number;
  intent: "Informational" | "Commercial" | "Navigational" | "Transactional";
  trend: number[];
  results: number;
  serp: {
    features: string[];
    position?: number;
  };
  relatedKeywords: string[];
  questions: string[];
  isFavorite: boolean;
  volumeTrend: "up" | "down" | "stable";
}

interface KeywordCluster {
  name: string;
  keywords: KeywordData[];
  totalVolume: number;
  avgDifficulty: number;
}

const KeywordMagicTool: React.FC = () => {
  const selectedProject = useSelector(
    (state: RootState) => state.project.currentProject
  );
  const [keywords, setKeywords] = useState<KeywordData[]>([]);
  const [clusters, setClusters] = useState<KeywordCluster[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("all-keywords");
  const [filters, setFilters] = useState({
    volumeRange: [100, 100000] as [number, number],
    difficultyRange: [0, 100] as [number, number],
    intent: [] as string[],
    serpFeatures: [] as string[],
  });
  const [favorites, setFavorites] = useState<string[]>([]);
  const [showExportModal, setShowExportModal] = useState(false);
  const [selectedKeywords, setSelectedKeywords] = useState<string[]>([]);

  // Mock data for keyword research
  const mockKeywords: KeywordData[] = [
    {
      id: "1",
      keyword: "seo tools",
      searchVolume: 22000,
      keywordDifficulty: 68,
      cpc: 4.25,
      competitiveDensity: 0.87,
      intent: "Commercial",
      trend: [15000, 18000, 20000, 22000, 24000, 22000],
      results: 125000000,
      serp: {
        features: ["Featured Snippet", "People Also Ask", "Shopping Results"],
        position: 3,
      },
      relatedKeywords: ["best seo tools", "free seo tools", "seo software"],
      questions: ["What are the best seo tools?", "How to use seo tools?"],
      isFavorite: false,
      volumeTrend: "up",
    },
    {
      id: "2",
      keyword: "keyword research",
      searchVolume: 14500,
      keywordDifficulty: 72,
      cpc: 3.8,
      competitiveDensity: 0.65,
      intent: "Informational",
      trend: [12000, 13000, 14000, 14500, 15000, 14500],
      results: 89000000,
      serp: {
        features: ["Video Results", "Related Searches"],
      },
      relatedKeywords: ["keyword research tool", "how to do keyword research"],
      questions: ["How to do keyword research?", "What is keyword research?"],
      isFavorite: true,
      volumeTrend: "stable",
    },
    {
      id: "3",
      keyword: "backlink checker",
      searchVolume: 8900,
      keywordDifficulty: 58,
      cpc: 5.1,
      competitiveDensity: 0.54,
      intent: "Commercial",
      trend: [7000, 7500, 8000, 8500, 9000, 8900],
      results: 45000000,
      serp: {
        features: ["Reviews", "Knowledge Panel"],
      },
      relatedKeywords: ["free backlink checker", "backlink analysis tool"],
      questions: [
        "How to check backlinks?",
        "What is a good backlink checker?",
      ],
      isFavorite: false,
      volumeTrend: "up",
    },
    {
      id: "4",
      keyword: "rank tracker",
      searchVolume: 6700,
      keywordDifficulty: 45,
      cpc: 4.65,
      competitiveDensity: 0.42,
      intent: "Commercial",
      trend: [6000, 6200, 6500, 6700, 6800, 6700],
      results: 32000000,
      serp: {
        features: ["Local Pack"],
      },
      relatedKeywords: ["google rank tracker", "keyword rank tracker"],
      questions: [
        "How to track keyword rankings?",
        "Best rank tracking tools?",
      ],
      isFavorite: false,
      volumeTrend: "stable",
    },
  ];

  const mockClusters: KeywordCluster[] = [
    {
      name: "SEO Tools",
      keywords: mockKeywords.filter(
        (k) => k.keyword.includes("seo") || k.keyword.includes("tools")
      ),
      totalVolume: 30900,
      avgDifficulty: 63,
    },
    {
      name: "Keyword Research",
      keywords: mockKeywords.filter((k) => k.keyword.includes("keyword")),
      totalVolume: 21200,
      avgDifficulty: 58,
    },
    {
      name: "Link Analysis",
      keywords: mockKeywords.filter((k) => k.keyword.includes("backlink")),
      totalVolume: 8900,
      avgDifficulty: 58,
    },
  ];

  useEffect(() => {
    if (selectedProject) {
      setLoading(true);
      // Simulate API call
      setTimeout(() => {
        setKeywords(mockKeywords);
        setClusters(mockClusters);
        setLoading(false);
      }, 1000);
    }
  }, [selectedProject]);

  const handleSearch = (value: string) => {
    if (!value.trim()) return;
    setLoading(true);
    // Simulate API search
    setTimeout(() => {
      setKeywords(mockKeywords);
      setLoading(false);
    }, 1000);
  };

  const toggleFavorite = (keywordId: string) => {
    setFavorites((prev) =>
      prev.includes(keywordId)
        ? prev.filter((id) => id !== keywordId)
        : [...prev, keywordId]
    );

    setKeywords((prev) =>
      prev.map((k) =>
        k.id === keywordId ? { ...k, isFavorite: !k.isFavorite } : k
      )
    );
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

  const getDifficultyColor = (difficulty: number) => {
    if (difficulty >= 70) return "#ff4d4f";
    if (difficulty >= 40) return "#faad14";
    return "#52c41a";
  };

  const getVolumeColor = (volume: number) => {
    if (volume >= 10000) return "#52c41a";
    if (volume >= 1000) return "#1890ff";
    return "#faad14";
  };

  const filteredKeywords = keywords.filter((keyword) => {
    const matchesVolume =
      keyword.searchVolume >= filters.volumeRange[0] &&
      keyword.searchVolume <= filters.volumeRange[1];
    const matchesDifficulty =
      keyword.keywordDifficulty >= filters.difficultyRange[0] &&
      keyword.keywordDifficulty <= filters.difficultyRange[1];
    const matchesIntent =
      filters.intent.length === 0 || filters.intent.includes(keyword.intent);

    return matchesVolume && matchesDifficulty && matchesIntent;
  });

  const keywordColumns = [
    {
      title: "",
      key: "favorite",
      width: 40,
      render: (record: KeywordData) => (
        <Button
          type="text"
          icon={
            record.isFavorite ? (
              <StarFilled style={{ color: "#faad14" }} />
            ) : (
              <StarOutlined />
            )
          }
          onClick={() => toggleFavorite(record.id)}
          size="small"
        />
      ),
    },
    {
      title: "Keyword",
      dataIndex: "keyword",
      key: "keyword",
      sorter: (a: KeywordData, b: KeywordData) =>
        a.keyword.localeCompare(b.keyword),
      render: (text: string, record: KeywordData) => (
        <div className={styles.keywordCell}>
          <div className={styles.keywordText}>{text}</div>
          <div className={styles.keywordMeta}>
            {record.serp.position && (
              <Tag color="blue">#{record.serp.position}</Tag>
            )}
            {record.serp.features.length > 0 && (
              <Tooltip title={record.serp.features.join(", ")}>
                <Tag color="purple">SERP</Tag>
              </Tooltip>
            )}
          </div>
        </div>
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
      onFilter: (value: any, record: KeywordData) => record.intent === value,
      render: (intent: string) => (
        <Tag color={getIntentColor(intent)}>{intent}</Tag>
      ),
    },
    {
      title: (
        <span>
          Volume{" "}
          <Tooltip title="Average monthly search volume">
            <QuestionCircleOutlined />
          </Tooltip>
        </span>
      ),
      dataIndex: "searchVolume",
      key: "volume",
      sorter: (a: KeywordData, b: KeywordData) =>
        a.searchVolume - b.searchVolume,
      render: (volume: number, record: KeywordData) => (
        <div className={styles.volumeCell}>
          <span style={{ color: getVolumeColor(volume), fontWeight: 600 }}>
            {volume.toLocaleString()}
          </span>
          {record.volumeTrend === "up" && (
            <ArrowUpOutlined style={{ color: "#52c41a", marginLeft: 4 }} />
          )}
          {record.volumeTrend === "down" && (
            <ArrowDownOutlined style={{ color: "#ff4d4f", marginLeft: 4 }} />
          )}
        </div>
      ),
    },
    {
      title: (
        <span>
          KD{" "}
          <Tooltip title="Keyword Difficulty - How hard it is to rank for this keyword">
            <QuestionCircleOutlined />
          </Tooltip>
        </span>
      ),
      dataIndex: "keywordDifficulty",
      key: "difficulty",
      sorter: (a: KeywordData, b: KeywordData) =>
        a.keywordDifficulty - b.keywordDifficulty,
      render: (difficulty: number) => (
        <div className={styles.difficultyCell}>
          <span
            style={{ color: getDifficultyColor(difficulty), fontWeight: 600 }}
          >
            {difficulty}%
          </span>
          <Progress
            percent={difficulty}
            size="small"
            strokeColor={getDifficultyColor(difficulty)}
            showInfo={false}
            style={{ width: 60, marginLeft: 8 }}
          />
        </div>
      ),
    },
    {
      title: (
        <span>
          CPC{" "}
          <Tooltip title="Cost Per Click in Google Ads">
            <QuestionCircleOutlined />
          </Tooltip>
        </span>
      ),
      dataIndex: "cpc",
      key: "cpc",
      sorter: (a: KeywordData, b: KeywordData) => a.cpc - b.cpc,
      render: (cpc: number) => `$${cpc.toFixed(2)}`,
    },
    {
      title: (
        <span>
          Com.{" "}
          <Tooltip title="Competitive Density in Google Ads">
            <QuestionCircleOutlined />
          </Tooltip>
        </span>
      ),
      dataIndex: "competitiveDensity",
      key: "competitive",
      sorter: (a: KeywordData, b: KeywordData) =>
        a.competitiveDensity - b.competitiveDensity,
      render: (density: number) => (
        <Progress
          percent={density * 100}
          size="small"
          strokeColor={
            density > 0.7 ? "#ff4d4f" : density > 0.4 ? "#faad14" : "#52c41a"
          }
          showInfo={false}
        />
      ),
    },
    {
      title: "Results",
      dataIndex: "results",
      key: "results",
      sorter: (a: KeywordData, b: KeywordData) => a.results - b.results,
      render: (results: number) => results.toLocaleString(),
    },
    {
      title: "Actions",
      key: "actions",
      render: (record: KeywordData) => (
        <Dropdown
          menu={{
            items: [
              { key: "1", label: "View SERP", icon: <SearchOutlined /> },
              { key: "2", label: "Add to List", icon: <PlusOutlined /> },
              { key: "3", label: "Export Data", icon: <ExportOutlined /> },
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
      value: filteredKeywords.length,
      prefix: <SearchOutlined />,
      suffix: "keywords",
    },
    {
      title: "Total Volume",
      value: filteredKeywords.reduce((sum, k) => sum + k.searchVolume, 0),
      prefix: <ArrowUpOutlined />,
      formatter: (value: any) => value.toLocaleString(),
      valueStyle: { color: "#1890ff" },
    },
    {
      title: "Avg. Difficulty",
      value:
        filteredKeywords.length > 0
          ? filteredKeywords.reduce((sum, k) => sum + k.keywordDifficulty, 0) /
            filteredKeywords.length
          : 0,
      precision: 1,
      suffix: "%",
      valueStyle: { color: "#faad14" },
    },
    {
      title: "Commercial Intent",
      value: filteredKeywords.filter((k) => k.intent === "Commercial").length,
      suffix: `of ${filteredKeywords.length}`,
      prefix: <BulbOutlined />,
      valueStyle: { color: "#52c41a" },
    },
  ];

  const tabItems = [
    {
      key: "all-keywords",
      label: `All Keywords (${filteredKeywords.length})`,
      children: (
        <div className={styles.keywordsTab}>
          <Table
            columns={keywordColumns}
            dataSource={filteredKeywords}
            rowKey="id"
            loading={loading}
            rowSelection={{
              selectedRowKeys: selectedKeywords,
              onChange: (keys) => setSelectedKeywords(keys as string[]),
            }}
            pagination={{
              pageSize: 100,
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
      key: "clusters",
      label: `Clusters (${clusters.length})`,
      children: (
        <div className={styles.clustersTab}>
          <Row gutter={[16, 16]}>
            {clusters.map((cluster, index) => (
              <Col xs={24} md={12} lg={8} key={index}>
                <Card
                  title={cluster.name}
                  extra={
                    <Tag color="blue">{cluster.keywords.length} keywords</Tag>
                  }
                  hoverable
                >
                  <Statistic
                    title="Total Volume"
                    value={cluster.totalVolume}
                    formatter={(value) => value.toLocaleString()}
                    prefix={<ArrowUpOutlined />}
                  />
                  <Statistic
                    title="Avg. Difficulty"
                    value={cluster.avgDifficulty}
                    suffix="%"
                    precision={1}
                    style={{ marginTop: 16 }}
                  />
                  <Button
                    type="primary"
                    block
                    style={{ marginTop: 16 }}
                    onClick={() => setActiveTab("all-keywords")}
                  >
                    View Keywords
                  </Button>
                </Card>
              </Col>
            ))}
          </Row>
        </div>
      ),
    },
    {
      key: "questions",
      label: "Questions",
      children: (
        <div className={styles.questionsTab}>
          <Alert
            message="People Also Ask"
            description="Questions people are asking related to your keywords"
            type="info"
            showIcon
            style={{ marginBottom: 16 }}
          />
          <div className={styles.questionsList}>
            {keywords
              .flatMap((k) => k.questions)
              .map((question, index) => (
                <Card key={index} size="small" style={{ marginBottom: 8 }}>
                  <div className={styles.questionItem}>
                    <QuestionCircleOutlined
                      style={{ marginRight: 8, color: "#1890ff" }}
                    />
                    {question}
                    <Button size="small" type="link">
                      Create Content
                    </Button>
                  </div>
                </Card>
              ))}
          </div>
        </div>
      ),
    },
    {
      key: "favorites",
      label: `Favorites (${favorites.length})`,
      children: (
        <div className={styles.favoritesTab}>
          <Table
            columns={keywordColumns}
            dataSource={keywords.filter((k) => k.isFavorite)}
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
            <SearchOutlined style={{ fontSize: "48px", color: "#d9d9d9" }} />
            <h3>No Project Selected</h3>
            <p>Please select a project to start keyword research.</p>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className={styles.keywordMagicTool}>
      <div className={styles.header}>
        <div className={styles.headerContent}>
          <h1>Keyword Magic Tool</h1>
          <p>Discover millions of keywords and build your content strategy</p>
        </div>
      </div>

      <Card className={styles.searchSection}>
        <div className={styles.searchRow}>
          <div className={styles.searchInput}>
            <Search
              placeholder="Enter a keyword (e.g., seo tools, digital marketing)"
              size="large"
              onSearch={handleSearch}
              enterButton={
                <Button type="primary" size="large" icon={<SearchOutlined />}>
                  Analyze
                </Button>
              }
            />
          </div>
          <div className={styles.searchOptions}>
            <Select defaultValue="US" style={{ width: 120 }}>
              <Option value="US">🇺🇸 US</Option>
              <Option value="UK">🇬🇧 UK</Option>
              <Option value="CA">🇨🇦 Canada</Option>
            </Select>
            <Select defaultValue="google" style={{ width: 120 }}>
              <Option value="google">Google</Option>
              <Option value="bing">Bing</Option>
              <Option value="youtube">YouTube</Option>
            </Select>
          </div>
        </div>
      </Card>

      {keywords.length > 0 && (
        <>
          <Row gutter={[16, 16]} className={styles.statsRow}>
            {overviewStats.map((stat, index) => (
              <Col xs={24} sm={12} lg={6} key={index}>
                <Card>
                  <Statistic {...stat} />
                </Card>
              </Col>
            ))}
          </Row>

          <Card className={styles.filtersSection}>
            <div className={styles.filtersTitle}>
              <FilterOutlined style={{ marginRight: 8 }} />
              Filters
            </div>
            <Row gutter={[16, 16]}>
              <Col xs={24} md={8}>
                <div className={styles.filterGroup}>
                  <label>Search Volume</label>
                  <Slider
                    range
                    min={0}
                    max={100000}
                    step={100}
                    value={filters.volumeRange}
                    onChange={(value) =>
                      setFilters((prev) => ({
                        ...prev,
                        volumeRange: value as [number, number],
                      }))
                    }
                    tooltip={{ formatter: (value) => value?.toLocaleString() }}
                  />
                  <div className={styles.filterValues}>
                    {filters.volumeRange[0].toLocaleString()} -{" "}
                    {filters.volumeRange[1].toLocaleString()}
                  </div>
                </div>
              </Col>
              <Col xs={24} md={8}>
                <div className={styles.filterGroup}>
                  <label>Keyword Difficulty</label>
                  <Slider
                    range
                    min={0}
                    max={100}
                    value={filters.difficultyRange}
                    onChange={(value) =>
                      setFilters((prev) => ({
                        ...prev,
                        difficultyRange: value as [number, number],
                      }))
                    }
                    tooltip={{ formatter: (value) => `${value}%` }}
                  />
                  <div className={styles.filterValues}>
                    {filters.difficultyRange[0]}% - {filters.difficultyRange[1]}
                    %
                  </div>
                </div>
              </Col>
              <Col xs={24} md={8}>
                <div className={styles.filterGroup}>
                  <label>Search Intent</label>
                  <Checkbox.Group
                    value={filters.intent}
                    onChange={(value) =>
                      setFilters((prev) => ({
                        ...prev,
                        intent: value as string[],
                      }))
                    }
                  >
                    <Space direction="vertical" size={4}>
                      <Checkbox value="Commercial">Commercial</Checkbox>
                      <Checkbox value="Informational">Informational</Checkbox>
                      <Checkbox value="Navigational">Navigational</Checkbox>
                      <Checkbox value="Transactional">Transactional</Checkbox>
                    </Space>
                  </Checkbox.Group>
                </div>
              </Col>
            </Row>
          </Card>

          <div className={styles.actionsBar}>
            <Space>
              <Button
                type="primary"
                icon={<ExportOutlined />}
                onClick={() => setShowExportModal(true)}
                disabled={selectedKeywords.length === 0}
              >
                Export Selected ({selectedKeywords.length})
              </Button>
              <Button icon={<PlusOutlined />}>Add to Keyword List</Button>
              <Button icon={<DownloadOutlined />}>Download Report</Button>
            </Space>
          </div>

          <Tabs
            activeKey={activeTab}
            onChange={setActiveTab}
            items={tabItems}
            size="large"
            className={styles.mainTabs}
          />
        </>
      )}

      <Modal
        title="Export Keywords"
        open={showExportModal}
        onCancel={() => setShowExportModal(false)}
        footer={[
          <Button key="cancel" onClick={() => setShowExportModal(false)}>
            Cancel
          </Button>,
          <Button key="submit" type="primary">
            Export to CSV
          </Button>,
        ]}
      >
        <p>
          Export {selectedKeywords.length} selected keywords with all metrics.
        </p>
      </Modal>
    </div>
  );
};

export default KeywordMagicTool;
