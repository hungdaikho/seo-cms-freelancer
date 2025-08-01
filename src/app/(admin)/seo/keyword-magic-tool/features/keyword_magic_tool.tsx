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
  message,
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
import { useOrganicResearch } from "@/stores/hooks/useOrganicResearch";
import { useKeyword } from "@/stores/hooks/useKeyword";
import { useKeywordMagic } from "@/stores/hooks/useKeywordMagic";
import { seoService } from "@/services/seo.service";
import { OrganicKeyword, OrganicKeywordsParams } from "@/types/api.type";
import styles from "./keyword_magic_tool.module.scss";

const { Option } = Select;
const { Search } = Input;

// Enhanced interface for keyword data that extends OrganicKeyword
interface KeywordData extends OrganicKeyword {
  id: string;
  keywordDifficulty: number; // alias for difficulty
  competitiveDensity: number;
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

interface KeywordMagicFilters {
  volumeRange: [number, number];
  difficultyRange: [number, number];
  intent: string[];
  serpFeatures: string[];
  country: string;
  searchEngine: string;
}

interface KeywordMagicToolProps {
  selectedProjectId?: string;
}

const KeywordMagicTool: React.FC<KeywordMagicToolProps> = ({
  selectedProjectId,
}) => {
  const { projects } = useSelector((state: RootState) => state.project);

  // Find the selected project from projects array
  const selectedProject = selectedProjectId
    ? projects.find((p) => p.id === selectedProjectId)
    : useSelector((state: RootState) => state.project.currentProject);

  // Use existing hooks
  const {
    organicKeywords,
    loading: organicLoading,
    error: organicError,
    getOrganicKeywords,
  } = useOrganicResearch();

  const { bulkAddKeywords } = useKeyword();

  const {
    suggestions: magicSuggestions,
    loading: magicLoading,
    searchKeywords: searchMagicKeywords,
    getRelatedTopics,
    getTopicQuestions,
  } = useKeywordMagic();

  // Component state
  const [keywords, setKeywords] = useState<KeywordData[]>([]);
  const [clusters, setClusters] = useState<KeywordCluster[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("all-keywords");
  const [filters, setFilters] = useState<KeywordMagicFilters>({
    volumeRange: [100, 100000],
    difficultyRange: [0, 100],
    intent: [],
    serpFeatures: [],
    country: "US",
    searchEngine: "google",
  });
  const [favorites, setFavorites] = useState<string[]>([]);
  const [showExportModal, setShowExportModal] = useState(false);
  const [selectedKeywords, setSelectedKeywords] = useState<string[]>([]);
  const [aiSuggestions, setAiSuggestions] = useState<any[]>([]);

  // Transform OrganicKeyword to KeywordData
  const transformOrganicKeyword = (
    organic: OrganicKeyword,
    index: number
  ): KeywordData => {
    return {
      ...organic,
      id: `keyword-${index}`,
      keywordDifficulty: organic.difficulty,
      competitiveDensity: Math.random() * 1, // Mock for now
      trend: generateMockTrend(organic.searchVolume),
      results: Math.floor(Math.random() * 100000000) + 1000000,
      serp: {
        features: organic.features,
        position: organic.position > 0 ? organic.position : undefined,
      },
      relatedKeywords: [
        `related ${organic.keyword}`,
        `${organic.keyword} tool`,
      ],
      questions: [
        `What is ${organic.keyword}?`,
        `How to use ${organic.keyword}?`,
      ],
      isFavorite: false,
      volumeTrend:
        organic.position < organic.previousPosition
          ? "up"
          : organic.position > organic.previousPosition
          ? "down"
          : "stable",
    };
  };

  // Transform AI suggestion to KeywordData
  const transformAiSuggestion = (
    aiSuggestion: any,
    index: number
  ): KeywordData => {
    return {
      id: `ai-keyword-${index}`,
      keyword: aiSuggestion.keyword,
      searchVolume: aiSuggestion.searchVolume || 0,
      difficulty: aiSuggestion.difficulty || 0,
      keywordDifficulty: aiSuggestion.difficulty || 0,
      cpc: 0, // AI suggestions typically don't have CPC data
      intent: aiSuggestion.intent || "Informational",
      position: 0,
      previousPosition: 0,
      url: "",
      trafficShare: 0,
      features: [],
      competitiveDensity: Math.random() * 1,
      trend: generateMockTrend(aiSuggestion.searchVolume || 100),
      results: Math.floor(Math.random() * 100000000) + 1000000,
      serp: {
        features: [],
        position: undefined,
      },
      relatedKeywords: [
        `related ${aiSuggestion.keyword}`,
        `${aiSuggestion.keyword} tips`,
      ],
      questions: [
        `What is ${aiSuggestion.keyword}?`,
        `How to use ${aiSuggestion.keyword}?`,
      ],
      isFavorite: false,
      volumeTrend: "stable" as const,
    };
  };

  // Generate mock trend data
  const generateMockTrend = (volume: number): number[] => {
    const trend = [];
    let current = volume;
    for (let i = 0; i < 6; i++) {
      current = current + (Math.random() - 0.5) * volume * 0.2;
      trend.push(Math.max(0, Math.floor(current)));
    }
    return trend;
  };

  // Load organic keywords when component mounts or project changes
  useEffect(() => {
    if (selectedProject && searchTerm) {
      loadKeywordsData();
    }
  }, [selectedProject, searchTerm, selectedProjectId]);

  // Handle organic research errors
  useEffect(() => {
    if (organicError) {
      message.error(`Failed to load organic data: ${organicError}`);
    }
  }, [organicError]);
  // Update keywords when organic data or AI suggestions change
  useEffect(() => {
    let allKeywords: KeywordData[] = [];
    // Add AI suggestions
    if (aiSuggestions?.length > 0) {
      const transformedAiKeywords = aiSuggestions.map(transformAiSuggestion);
      allKeywords = [...allKeywords, ...transformedAiKeywords];
    }
    setKeywords(allKeywords);
    generateClusters(allKeywords);
  }, [organicKeywords, aiSuggestions]);

  const loadKeywordsData = async () => {
    if (!searchTerm.trim()) return;

    setLoading(true);
    try {
      // Use domain from search term or selected project
      const domain = searchTerm.includes(".")
        ? searchTerm
        : selectedProject?.domain || "example.com";

      const params: OrganicKeywordsParams = {
        country: filters.country,
        limit: 100,
        sortBy: "volume",
        sortOrder: "desc",
      };

      await getOrganicKeywords(domain, params);

      // Also get AI suggestions if available
      if (searchTerm && !searchTerm.includes(".")) {
        try {
          console.log("🔍 Searching AI suggestions for:", searchTerm);
          const suggestions = await searchMagicKeywords(searchTerm, {
            country: filters.country,
            searchEngine: filters.searchEngine,
          });
          console.log("🤖 AI suggestions received:", suggestions);
          setAiSuggestions(suggestions || []);
        } catch (error) {
          console.warn("AI suggestions not available:", error);
        }
      }
    } catch (error) {
      console.error("Failed to load keywords:", error);
      message.error("Failed to load keyword data");
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (value: string) => {
    if (!value.trim()) {
      message.warning("Please enter a keyword or domain");
      return;
    }
    setSearchTerm(value);
  };

  const generateClusters = (keywordList: KeywordData[]) => {
    // Simple clustering logic based on common words
    const clusterMap = new Map<string, KeywordData[]>();

    keywordList.forEach((keyword) => {
      const words = keyword.keyword.toLowerCase().split(" ");
      let clusterKey = "other";

      // Find the most relevant cluster
      for (const word of words) {
        if (word.length > 3) {
          // Only use meaningful words
          clusterKey = word;
          break;
        }
      }

      if (!clusterMap.has(clusterKey)) {
        clusterMap.set(clusterKey, []);
      }
      clusterMap.get(clusterKey)!.push(keyword);
    });

    const newClusters: KeywordCluster[] = Array.from(clusterMap.entries())
      .filter(([, keywords]) => keywords.length > 1) // Only clusters with multiple keywords
      .map(([name, keywords]) => ({
        name: name.charAt(0).toUpperCase() + name.slice(1),
        keywords,
        totalVolume: keywords.reduce((sum, k) => sum + k.searchVolume, 0),
        avgDifficulty:
          keywords.reduce((sum, k) => sum + k.keywordDifficulty, 0) /
          keywords.length,
      }))
      .sort((a, b) => b.totalVolume - a.totalVolume);

    setClusters(newClusters);
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

  const handleAddToProject = async (keyword: KeywordData) => {
    if (!selectedProject) {
      message.error("Please select a project first");
      return;
    }

    try {
      const keywordData = {
        keyword: keyword.keyword,
        searchVolume: keyword.searchVolume,
        difficulty: keyword.keywordDifficulty,
        cpc: keyword.cpc,
        targetUrl: "", // User can set this later
      };

      await bulkAddKeywords(selectedProject.id, { keywords: [keywordData] });
      message.success(`"${keyword.keyword}" added to project`);
    } catch (error) {
      console.error("Failed to add keyword:", error);
      message.error("Failed to add keyword to project");
    }
  };

  const handleBulkAddToProject = async () => {
    if (!selectedProject) {
      message.error("Please select a project first");
      return;
    }

    if (selectedKeywords.length === 0) {
      message.error("Please select keywords to add");
      return;
    }

    try {
      const keywordsData = keywords
        .filter((k) => selectedKeywords.includes(k.id))
        .map((keyword) => ({
          keyword: keyword.keyword,
          searchVolume: keyword.searchVolume,
          difficulty: keyword.keywordDifficulty,
          cpc: keyword.cpc,
          targetUrl: "",
        }));

      await bulkAddKeywords(selectedProject.id, { keywords: keywordsData });
      message.success(`${keywordsData.length} keywords added to project`);
      setSelectedKeywords([]);
    } catch (error) {
      console.error("Failed to bulk add keywords:", error);
      message.error("Failed to add keywords to project");
    }
  };

  const handleExportKeywords = () => {
    const exportData = keywords
      .filter((k) => selectedKeywords.includes(k.id))
      .map((k) => ({
        keyword: k.keyword,
        volume: k.searchVolume,
        difficulty: k.keywordDifficulty,
        cpc: k.cpc,
        intent: k.intent,
        position: k.position,
      }));

    const csvContent = [
      ["Keyword", "Volume", "Difficulty", "CPC", "Intent", "Position"],
      ...exportData.map((k) => [
        k.keyword,
        k.volume,
        k.difficulty,
        k.cpc,
        k.intent,
        k.position || "",
      ]),
    ]
      .map((row) => row.join(","))
      .join("\n");

    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `keywords-${Date.now()}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);

    setShowExportModal(false);
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
    const matchesSerp =
      filters.serpFeatures.length === 0 ||
      filters.serpFeatures.some((feature) =>
        keyword.serp.features.includes(feature)
      );

    return matchesVolume && matchesDifficulty && matchesIntent && matchesSerp;
  });

  const handleCountryChange = (country: string) => {
    setFilters((prev) => ({ ...prev, country }));
    if (searchTerm) {
      // Reload data with new country
      loadKeywordsData();
    }
  };

  const handleSearchEngineChange = (searchEngine: string) => {
    setFilters((prev) => ({ ...prev, searchEngine }));
  };

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
            {/* Show AI badge for AI-generated keywords */}
            {record.id.startsWith("ai-keyword-") && (
              <Tag color="purple" style={{ marginRight: 4 }}>
                <BulbOutlined style={{ marginRight: 2 }} />
                AI
              </Tag>
            )}
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
              {
                key: "1",
                label: "View SERP",
                icon: <SearchOutlined />,
                onClick: () =>
                  window.open(
                    `https://www.google.com/search?q=${encodeURIComponent(
                      record.keyword
                    )}`,
                    "_blank"
                  ),
              },
              {
                key: "2",
                label: "Add to Project",
                icon: <PlusOutlined />,
                onClick: () => handleAddToProject(record),
              },
              {
                key: "3",
                label: "View Related",
                icon: <BulbOutlined />,
                onClick: () =>
                  handleSearch(record.relatedKeywords[0] || record.keyword),
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
      title: "Total Keywords",
      value: filteredKeywords.length,
      prefix: <SearchOutlined />,
      suffix: "keywords",
    },
    {
      title: "AI Suggestions",
      value: filteredKeywords.filter((k) => k.id.startsWith("ai-keyword-"))
        .length,
      prefix: <BulbOutlined />,
      suffix: "AI-generated",
      valueStyle: { color: "#722ed1" },
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
            loading={loading || organicLoading || magicLoading}
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
      key: "ai-suggestions",
      label: `AI Suggestions (${aiSuggestions.length})`,
      children: (
        <div className={styles.aiSuggestionsTab}>
          {aiSuggestions.length > 0 ? (
            <div>
              <Alert
                message="AI-Powered Keyword Suggestions"
                description="These keyword suggestions are generated using AI based on your seed keyword"
                type="success"
                showIcon
                style={{ marginBottom: 16 }}
              />
              <div className={styles.suggestionsList}>
                {aiSuggestions.map((suggestion, index) => (
                  <Card key={index} size="small" style={{ marginBottom: 12 }}>
                    <div className={styles.suggestionItem}>
                      <div style={{ flex: 1 }}>
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            marginBottom: "8px",
                          }}
                        >
                          <BulbOutlined
                            style={{ marginRight: 8, color: "#1890ff" }}
                          />
                          <span style={{ fontWeight: 600, fontSize: "14px" }}>
                            {suggestion.keyword || suggestion}
                          </span>
                          {suggestion.intent && (
                            <Tag
                              color={getIntentColor(suggestion.intent)}
                              style={{ marginLeft: "8px" }}
                            >
                              {suggestion.intent}
                            </Tag>
                          )}
                          {suggestion.category && (
                            <Tag color="blue" style={{ marginLeft: "4px" }}>
                              {suggestion.category}
                            </Tag>
                          )}
                        </div>

                        <div
                          style={{
                            display: "flex",
                            gap: "16px",
                            alignItems: "center",
                            fontSize: "12px",
                            color: "#666",
                          }}
                        >
                          {suggestion.searchVolume && (
                            <span>
                              📊 Volume:{" "}
                              <strong
                                style={{
                                  color: getVolumeColor(
                                    suggestion.searchVolume
                                  ),
                                }}
                              >
                                {suggestion.searchVolume.toLocaleString()}
                              </strong>
                            </span>
                          )}
                          {suggestion.difficulty && (
                            <span>
                              🎯 Difficulty:{" "}
                              <strong
                                style={{
                                  color: getDifficultyColor(
                                    suggestion.difficulty
                                  ),
                                }}
                              >
                                {suggestion.difficulty}%
                              </strong>
                            </span>
                          )}
                          {suggestion.relevanceScore && (
                            <span>
                              ⚡ Relevance:{" "}
                              <strong style={{ color: "#52c41a" }}>
                                {Math.round(suggestion.relevanceScore * 100)}%
                              </strong>
                            </span>
                          )}
                        </div>
                      </div>

                      <div
                        style={{
                          display: "flex",
                          gap: "8px",
                          alignItems: "center",
                        }}
                      >
                        <Button
                          size="small"
                          icon={<PlusOutlined />}
                          onClick={() => {
                            // Convert AI suggestion to KeywordData format and add to project
                            const keywordData = {
                              keyword: suggestion.keyword,
                              searchVolume: suggestion.searchVolume || 0,
                              difficulty: suggestion.difficulty || 0,
                              cpc: 0, // AI suggestions don't have CPC data
                              targetUrl: "",
                            };
                            if (selectedProject) {
                              bulkAddKeywords(selectedProject.id, {
                                keywords: [keywordData],
                              })
                                .then(() =>
                                  message.success(
                                    `"${suggestion.keyword}" added to project`
                                  )
                                )
                                .catch(() =>
                                  message.error("Failed to add keyword")
                                );
                            }
                          }}
                          disabled={!selectedProject}
                        >
                          Add
                        </Button>
                        <Button
                          size="small"
                          type="link"
                          onClick={() =>
                            handleSearch(suggestion.keyword || suggestion)
                          }
                        >
                          Research
                        </Button>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          ) : (
            <div style={{ textAlign: "center", padding: "40px 0" }}>
              <BulbOutlined style={{ fontSize: "48px", color: "#d9d9d9" }} />
              <h3>No AI Suggestions Available</h3>
              <p>Search for a keyword to get AI-powered suggestions</p>
            </div>
          )}
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
            loading={loading || organicLoading || magicLoading}
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
            <p>
              Please select a project from the dropdown above to start keyword
              research.
            </p>
            {projects.length === 0 && (
              <div style={{ marginTop: "16px" }}>
                <Button type="primary" icon={<PlusOutlined />}>
                  Create New Project
                </Button>
              </div>
            )}
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
          <p>
            Discover millions of keywords and build your content strategy
            {selectedProject && (
              <span style={{ marginLeft: "8px", color: "#1890ff" }}>
                • {selectedProject.name} ({selectedProject.domain})
              </span>
            )}
          </p>
        </div>
      </div>

      <Card className={styles.searchSection}>
        <div className={styles.searchRow}>
          <div className={styles.searchInput}>
            <Search
              placeholder="Enter a keyword or domain (e.g., seo tools, example.com)"
              size="large"
              onSearch={handleSearch}
              enterButton={
                <Button type="primary" size="large" icon={<SearchOutlined />}>
                  Analyze
                </Button>
              }
              loading={loading || organicLoading || magicLoading}
            />
          </div>
          <div className={styles.searchOptions}>
            <Select
              value={filters.country}
              style={{ width: 120 }}
              onChange={handleCountryChange}
              showSearch
              placeholder="Select country"
            >
              <Option value="US">🇺🇸 United States</Option>
              <Option value="UK">🇬🇧 United Kingdom</Option>
              <Option value="CA">🇨🇦 Canada</Option>
              <Option value="AU">🇦🇺 Australia</Option>
              <Option value="DE">🇩🇪 Germany</Option>
              <Option value="FR">🇫🇷 France</Option>
              <Option value="ES">🇪🇸 Spain</Option>
              <Option value="IT">🇮🇹 Italy</Option>
              <Option value="NL">🇳🇱 Netherlands</Option>
              <Option value="BR">🇧🇷 Brazil</Option>
              <Option value="JP">🇯🇵 Japan</Option>
              <Option value="KR">🇰🇷 South Korea</Option>
              <Option value="CN">🇨🇳 China</Option>
              <Option value="IN">🇮🇳 India</Option>
              <Option value="MX">🇲🇽 Mexico</Option>
              <Option value="AR">🇦🇷 Argentina</Option>
              <Option value="CL">🇨🇱 Chile</Option>
              <Option value="CO">🇨🇴 Colombia</Option>
              <Option value="PE">🇵🇪 Peru</Option>
              <Option value="VE">🇻🇪 Venezuela</Option>
              <Option value="RU">🇷🇺 Russia</Option>
              <Option value="PL">🇵🇱 Poland</Option>
              <Option value="CZ">🇨🇿 Czech Republic</Option>
              <Option value="SE">🇸🇪 Sweden</Option>
              <Option value="NO">🇳🇴 Norway</Option>
              <Option value="DK">🇩🇰 Denmark</Option>
              <Option value="FI">🇫🇮 Finland</Option>
              <Option value="BE">🇧🇪 Belgium</Option>
              <Option value="CH">🇨🇭 Switzerland</Option>
              <Option value="AT">🇦🇹 Austria</Option>
              <Option value="PT">🇵🇹 Portugal</Option>
              <Option value="GR">🇬🇷 Greece</Option>
              <Option value="TR">🇹🇷 Turkey</Option>
              <Option value="IL">🇮🇱 Israel</Option>
              <Option value="AE">🇦🇪 UAE</Option>
              <Option value="SA">🇸🇦 Saudi Arabia</Option>
              <Option value="EG">🇪🇬 Egypt</Option>
              <Option value="ZA">🇿🇦 South Africa</Option>
              <Option value="NG">🇳🇬 Nigeria</Option>
              <Option value="TH">🇹🇭 Thailand</Option>
              <Option value="VN">🇻🇳 Vietnam</Option>
              <Option value="SG">🇸🇬 Singapore</Option>
              <Option value="MY">🇲🇾 Malaysia</Option>
              <Option value="ID">🇮🇩 Indonesia</Option>
              <Option value="PH">🇵🇭 Philippines</Option>
              <Option value="NZ">🇳🇿 New Zealand</Option>
              <Option value="IE">🇮🇪 Ireland</Option>
              <Option value="HU">🇭🇺 Hungary</Option>
              <Option value="RO">🇷🇴 Romania</Option>
              <Option value="BG">🇧🇬 Bulgaria</Option>
              <Option value="HR">🇭🇷 Croatia</Option>
              <Option value="SI">🇸🇮 Slovenia</Option>
              <Option value="SK">🇸🇰 Slovakia</Option>
              <Option value="LT">🇱🇹 Lithuania</Option>
              <Option value="LV">🇱🇻 Latvia</Option>
              <Option value="EE">🇪🇪 Estonia</Option>
              <Option value="UA">🇺🇦 Ukraine</Option>
              <Option value="BY">🇧🇾 Belarus</Option>
              <Option value="KZ">🇰🇿 Kazakhstan</Option>
              <Option value="UZ">🇺🇿 Uzbekistan</Option>
              <Option value="BD">🇧🇩 Bangladesh</Option>
              <Option value="PK">🇵🇰 Pakistan</Option>
              <Option value="LK">🇱🇰 Sri Lanka</Option>
              <Option value="MM">🇲🇲 Myanmar</Option>
              <Option value="KH">🇰🇭 Cambodia</Option>
              <Option value="LA">🇱🇦 Laos</Option>
              <Option value="HK">🇭🇰 Hong Kong</Option>
              <Option value="TW">🇹🇼 Taiwan</Option>
              <Option value="MO">🇲🇴 Macau</Option>
            </Select>
            <Select
              value={filters.searchEngine}
              style={{ width: 120 }}
              onChange={handleSearchEngineChange}
            >
              <Option value="google">Google</Option>
              <Option value="bing">Bing</Option>
              <Option value="youtube">YouTube</Option>
            </Select>
          </div>
        </div>
        {searchTerm && (
          <div style={{ marginTop: 16 }}>
            <Alert
              message={`Analyzing "${searchTerm}" in ${filters.country}`}
              type="info"
              showIcon
              closable
            />
          </div>
        )}
      </Card>

      {keywords.length === 0 && !loading && !organicLoading && !magicLoading ? (
        <Card style={{ textAlign: "center", padding: "60px 20px" }}>
          <SearchOutlined
            style={{ fontSize: "64px", color: "#d9d9d9", marginBottom: "16px" }}
          />
          <h2>Start Your Keyword Research</h2>
          <p style={{ fontSize: "16px", color: "#666", marginBottom: "24px" }}>
            Enter a keyword or domain above to discover thousands of keyword
            opportunities
          </p>
          <div style={{ marginBottom: "20px" }}>
            <Space size="middle">
              <Button type="link" onClick={() => handleSearch("seo tools")}>
                Try "seo tools"
              </Button>
              <Button
                type="link"
                onClick={() => handleSearch("digital marketing")}
              >
                Try "digital marketing"
              </Button>
              <Button
                type="link"
                onClick={() => handleSearch("content marketing")}
              >
                Try "content marketing"
              </Button>
            </Space>
          </div>
        </Card>
      ) : (
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
              <Col xs={24} md={6}>
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
              <Col xs={24} md={6}>
                <div className={styles.filterGroup}>
                  <label>SERP Features</label>
                  <Checkbox.Group
                    value={filters.serpFeatures}
                    onChange={(value) =>
                      setFilters((prev) => ({
                        ...prev,
                        serpFeatures: value as string[],
                      }))
                    }
                  >
                    <Space direction="vertical" size={4}>
                      <Checkbox value="featured_snippet">
                        Featured Snippet
                      </Checkbox>
                      <Checkbox value="people_also_ask">
                        People Also Ask
                      </Checkbox>
                      <Checkbox value="images">Images</Checkbox>
                      <Checkbox value="videos">Videos</Checkbox>
                      <Checkbox value="shopping">Shopping</Checkbox>
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
                icon={<PlusOutlined />}
                onClick={handleBulkAddToProject}
                disabled={selectedKeywords.length === 0 || !selectedProject}
              >
                Add to Project ({selectedKeywords.length})
              </Button>
              <Button
                icon={<ExportOutlined />}
                onClick={() => setShowExportModal(true)}
                disabled={selectedKeywords.length === 0}
              >
                Export Selected ({selectedKeywords.length})
              </Button>
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

      {/* Export Modal */}
      <Modal
        title="Export Keywords"
        open={showExportModal}
        onCancel={() => setShowExportModal(false)}
        footer={[
          <Button key="cancel" onClick={() => setShowExportModal(false)}>
            Cancel
          </Button>,
          <Button key="submit" type="primary" onClick={handleExportKeywords}>
            Export to CSV
          </Button>,
        ]}
      >
        <p>
          Export {selectedKeywords.length} selected keywords with all metrics
          including:
        </p>
        <ul>
          <li>Keyword</li>
          <li>Search Volume</li>
          <li>Keyword Difficulty</li>
          <li>Cost Per Click (CPC)</li>
          <li>Search Intent</li>
          <li>Current Position</li>
          <li>SERP Features</li>
        </ul>
      </Modal>
    </div>
  );
};

export default KeywordMagicTool;
