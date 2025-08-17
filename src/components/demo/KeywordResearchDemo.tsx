/**
 * DEMO COMPONENT - Shows how to use the Keyword Research system
 *
 * This component demonstrates the complete usage of:
 * - useKeywordResearch hook
 * - All keyword research features
 * - Error handling
 * - Loading states
 * - Data visualization
 */

import React, { useState, useEffect } from "react";
import {
  Card,
  Button,
  Input,
  Select,
  Table,
  Tabs,
  Spin,
  Alert,
  Space,
  Typography,
  Row,
  Col,
  Statistic,
} from "antd";
import {
  SearchOutlined,
  DownloadOutlined,
  HeartOutlined,
  HeartFilled,
} from "@ant-design/icons";
import useKeywordResearch from "@/hooks/useKeywordResearch";

const { Title, Text } = Typography;
const { TabPane } = Tabs;
const { Option } = Select;

const KeywordResearchDemo: React.FC = () => {
  const [seedKeyword, setSeedKeyword] = useState("");
  const [domain, setDomain] = useState("");
  const [country, setCountry] = useState("US");

  const {
    // State
    loading,
    error,
    selectedKeywords,
    favoriteKeywords,

    // Data
    keywordAnalysis,
    keywordMagic,
    contentIdeas,
    trendingTopics,
    topicResearch,

    // Computed data
    isAnyLoading,
    keywordAnalysisData,
    topPerformingKeywords,
    highVolumeKeywords,
    keywordMagicSummary,
    primaryKeywords,
    allMagicKeywords,
    contentIdeasData,
    keywordStatsSummary,

    // Actions
    getKeywordAnalysis,
    getKeywordMagicTool,
    getTopicIdeas,
    getTrendingTopics,
    getTopicResearch,
    handleExportKeywords,
    addToFavorites,

    // State management
    clearErrorState,
    selectKeyword,
    unselectKeyword,
    clearSelection,

    // Helpers
    isKeywordFavorite,
    isKeywordSelected,
    toggleKeywordSelection,
    toggleKeywordFavorite,

    // Compound operations
    performCompleteKeywordResearch,
    performContentIdeaResearch,
  } = useKeywordResearch();

  // ====================================================================
  // HANDLERS
  // ====================================================================

  const handleSearch = async () => {
    if (!seedKeyword.trim()) {
      alert("Please enter a seed keyword");
      return;
    }

    try {
      await performCompleteKeywordResearch(
        seedKeyword,
        domain || undefined,
        country
      );
    } catch (error) {
      console.error("Search failed:", error);
    }
  };

  const handleContentIdeaSearch = async () => {
    if (!seedKeyword.trim()) {
      alert("Please enter a topic");
      return;
    }

    try {
      await performContentIdeaResearch(seedKeyword, country);
    } catch (error) {
      console.error("Content idea search failed:", error);
    }
  };

  const handleExport = async () => {
    if (selectedKeywords.length === 0) {
      alert("Please select keywords to export");
      return;
    }

    try {
      await handleExportKeywords(selectedKeywords, "csv");
    } catch (error) {
      console.error("Export failed:", error);
    }
  };

  const handleSaveToFavorites = async () => {
    if (selectedKeywords.length === 0) {
      alert("Please select keywords to save");
      return;
    }

    try {
      await addToFavorites(selectedKeywords);
      clearSelection();
    } catch (error) {
      console.error("Save to favorites failed:", error);
    }
  };

  // ====================================================================
  // TABLE COLUMNS
  // ====================================================================

  const keywordColumns = [
    {
      title: "Select",
      key: "select",
      width: 60,
      render: (_: any, record: any) => (
        <input
          type="checkbox"
          checked={isKeywordSelected(record.keyword)}
          onChange={() => toggleKeywordSelection(record.keyword)}
        />
      ),
    },
    {
      title: "Keyword",
      dataIndex: "keyword",
      key: "keyword",
      render: (text: string) => <Text strong>{text}</Text>,
    },
    {
      title: "Search Volume",
      dataIndex: "searchVolume",
      key: "searchVolume",
      render: (volume: number) => volume.toLocaleString(),
      sorter: (a: any, b: any) => a.searchVolume - b.searchVolume,
    },
    {
      title: "Difficulty",
      dataIndex: "difficulty",
      key: "difficulty",
      render: (difficulty: number) => (
        <span
          style={{
            color:
              difficulty > 70 ? "red" : difficulty > 40 ? "orange" : "green",
          }}
        >
          {difficulty}
        </span>
      ),
      sorter: (a: any, b: any) => a.difficulty - b.difficulty,
    },
    {
      title: "CPC",
      dataIndex: "cpc",
      key: "cpc",
      render: (cpc: number) => (cpc ? `$${cpc.toFixed(2)}` : "-"),
    },
    {
      title: "Intent",
      dataIndex: "intent",
      key: "intent",
    },
    {
      title: "Trend",
      dataIndex: "trend",
      key: "trend",
      render: (trend: string) => (
        <span
          style={{
            color:
              trend === "rising"
                ? "green"
                : trend === "declining"
                ? "red"
                : "blue",
          }}
        >
          {trend}
        </span>
      ),
    },
    {
      title: "Favorite",
      key: "favorite",
      width: 80,
      render: (_: any, record: any) => (
        <Button
          type="text"
          icon={
            isKeywordFavorite(record.keyword) ? (
              <HeartFilled />
            ) : (
              <HeartOutlined />
            )
          }
          onClick={() => toggleKeywordFavorite(record.keyword)}
          style={{ color: isKeywordFavorite(record.keyword) ? "red" : "gray" }}
        />
      ),
    },
  ];

  const contentIdeasColumns = [
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
      render: (text: string) => <Text strong>{text}</Text>,
    },
    {
      title: "Volume",
      dataIndex: "volume",
      key: "volume",
      render: (volume: number) => volume.toLocaleString(),
      sorter: (a: any, b: any) => a.volume - b.volume,
    },
    {
      title: "Difficulty",
      dataIndex: "difficulty",
      key: "difficulty",
      sorter: (a: any, b: any) => a.difficulty - b.difficulty,
    },
    {
      title: "Opportunity",
      dataIndex: "opportunity",
      key: "opportunity",
      render: (opportunity: number) => `${opportunity}%`,
      sorter: (a: any, b: any) => a.opportunity - b.opportunity,
    },
    {
      title: "Content Type",
      dataIndex: "contentType",
      key: "contentType",
    },
    {
      title: "Est. Traffic",
      dataIndex: "estimatedTraffic",
      key: "estimatedTraffic",
      render: (traffic: number) => traffic.toLocaleString(),
    },
  ];

  // ====================================================================
  // RENDER
  // ====================================================================

  return (
    <div style={{ padding: 24 }}>
      <Title level={2}>Keyword Research Demo</Title>

      {error && (
        <Alert
          message="Error"
          description={error}
          type="error"
          closable
          onClose={clearErrorState}
          style={{ marginBottom: 16 }}
        />
      )}

      {/* Search Form */}
      <Card title="Search Configuration" style={{ marginBottom: 24 }}>
        <Row gutter={16}>
          <Col span={8}>
            <Input
              placeholder="Enter seed keyword"
              value={seedKeyword}
              onChange={(e) => setSeedKeyword(e.target.value)}
              prefix={<SearchOutlined />}
            />
          </Col>
          <Col span={6}>
            <Input
              placeholder="Domain (optional)"
              value={domain}
              onChange={(e) => setDomain(e.target.value)}
            />
          </Col>
          <Col span={4}>
            <Select
              value={country}
              onChange={(value) => setCountry(value)}
              style={{ width: "100%" }}
            >
              <Option value="US">United States</Option>
              <Option value="UK">United Kingdom</Option>
              <Option value="CA">Canada</Option>
              <Option value="AU">Australia</Option>
              <Option value="VN">Vietnam</Option>
            </Select>
          </Col>
          <Col span={6}>
            <Space>
              <Button
                type="primary"
                onClick={handleSearch}
                loading={isAnyLoading}
                icon={<SearchOutlined />}
              >
                Complete Research
              </Button>
              <Button
                onClick={handleContentIdeaSearch}
                loading={loading.contentIdeas || loading.trendingTopics}
              >
                Content Ideas
              </Button>
            </Space>
          </Col>
        </Row>
      </Card>

      {/* Statistics Summary */}
      {keywordStatsSummary && (
        <Row gutter={16} style={{ marginBottom: 24 }}>
          <Col span={4}>
            <Card>
              <Statistic
                title="Total Keywords"
                value={keywordStatsSummary.totalKeywords}
              />
            </Card>
          </Col>
          <Col span={4}>
            <Card>
              <Statistic
                title="Content Ideas"
                value={keywordStatsSummary.totalContentIdeas}
              />
            </Card>
          </Col>
          <Col span={4}>
            <Card>
              <Statistic
                title="Avg Search Volume"
                value={keywordStatsSummary.avgSearchVolume}
                formatter={(value) => value?.toLocaleString()}
              />
            </Card>
          </Col>
          <Col span={4}>
            <Card>
              <Statistic
                title="Avg Difficulty"
                value={keywordStatsSummary.avgDifficulty}
                suffix="%"
              />
            </Card>
          </Col>
          <Col span={4}>
            <Card>
              <Statistic
                title="Top Rankings"
                value={keywordStatsSummary.topRankingKeywords}
              />
            </Card>
          </Col>
          <Col span={4}>
            <Card>
              <Statistic
                title="High Volume"
                value={keywordStatsSummary.highVolumeKeywords}
              />
            </Card>
          </Col>
        </Row>
      )}

      {/* Action Buttons */}
      {selectedKeywords.length > 0 && (
        <Card style={{ marginBottom: 24 }}>
          <Space>
            <Text>Selected: {selectedKeywords.length} keywords</Text>
            <Button onClick={handleExport} icon={<DownloadOutlined />}>
              Export CSV
            </Button>
            <Button onClick={handleSaveToFavorites} icon={<HeartOutlined />}>
              Save to Favorites
            </Button>
            <Button onClick={clearSelection}>Clear Selection</Button>
          </Space>
        </Card>
      )}

      {/* Data Tabs */}
      <Card>
        <Tabs defaultActiveKey="1">
          {/* Keyword Analysis */}
          <TabPane tab="Keyword Analysis" key="1">
            <Spin spinning={loading.keywordAnalysis}>
              {keywordAnalysisData.length > 0 ? (
                <Table
                  columns={keywordColumns}
                  dataSource={keywordAnalysisData}
                  rowKey="keyword"
                  pagination={{ pageSize: 20 }}
                  scroll={{ x: 800 }}
                />
              ) : (
                <div style={{ textAlign: "center", padding: 40 }}>
                  <Text type="secondary">
                    No keyword analysis data available
                  </Text>
                </div>
              )}
            </Spin>
          </TabPane>

          {/* Keyword Magic Tool */}
          <TabPane tab="Keyword Magic" key="2">
            <Spin spinning={loading.keywordMagic}>
              {keywordMagicSummary && (
                <Row gutter={16} style={{ marginBottom: 16 }}>
                  <Col span={6}>
                    <Statistic
                      title="Avg Search Volume"
                      value={keywordMagicSummary.avgSearchVolume}
                      formatter={(value) => value?.toLocaleString()}
                    />
                  </Col>
                  <Col span={6}>
                    <Statistic
                      title="Avg Difficulty"
                      value={keywordMagicSummary.avgDifficulty}
                    />
                  </Col>
                  <Col span={6}>
                    <Statistic
                      title="Total Traffic"
                      value={keywordMagicSummary.totalEstimatedTraffic}
                      formatter={(value) => value?.toLocaleString()}
                    />
                  </Col>
                  <Col span={6}>
                    <Statistic
                      title="Top Intent"
                      value={keywordMagicSummary.topIntent}
                    />
                  </Col>
                </Row>
              )}

              {allMagicKeywords.length > 0 ? (
                <Table
                  columns={[
                    ...keywordColumns,
                    {
                      title: "Type",
                      dataIndex: "type",
                      key: "type",
                      filters: [
                        { text: "Primary", value: "primary" },
                        { text: "Long Tail", value: "longTail" },
                        { text: "Question", value: "question" },
                      ],
                      onFilter: (value: any, record: any) =>
                        record.type === value,
                    },
                  ]}
                  dataSource={allMagicKeywords}
                  rowKey="keyword"
                  pagination={{ pageSize: 20 }}
                  scroll={{ x: 900 }}
                />
              ) : (
                <div style={{ textAlign: "center", padding: 40 }}>
                  <Text type="secondary">No keyword magic data available</Text>
                </div>
              )}
            </Spin>
          </TabPane>

          {/* Content Ideas */}
          <TabPane tab="Content Ideas" key="3">
            <Spin spinning={loading.contentIdeas}>
              {contentIdeasData.length > 0 ? (
                <Table
                  columns={contentIdeasColumns}
                  dataSource={contentIdeasData}
                  rowKey="title"
                  pagination={{ pageSize: 15 }}
                  scroll={{ x: 800 }}
                />
              ) : (
                <div style={{ textAlign: "center", padding: 40 }}>
                  <Text type="secondary">No content ideas available</Text>
                </div>
              )}
            </Spin>
          </TabPane>

          {/* Trending Topics */}
          <TabPane tab="Trending Topics" key="4">
            <Spin spinning={loading.trendingTopics}>
              {trendingTopics?.trendingTopics &&
              trendingTopics.trendingTopics.length > 0 ? (
                <Table
                  columns={[
                    {
                      title: "Topic",
                      dataIndex: "topic",
                      key: "topic",
                      render: (text: string) => <Text strong>{text}</Text>,
                    },
                    {
                      title: "Volume",
                      dataIndex: "volume",
                      key: "volume",
                      render: (volume: number) => volume.toLocaleString(),
                      sorter: (a: any, b: any) => a.volume - b.volume,
                    },
                    {
                      title: "Growth",
                      dataIndex: "growth",
                      key: "growth",
                      render: (growth: number) => (
                        <span
                          style={{ color: growth > 20 ? "green" : "orange" }}
                        >
                          +{growth}%
                        </span>
                      ),
                      sorter: (a: any, b: any) => a.growth - b.growth,
                    },
                    {
                      title: "Category",
                      dataIndex: "category",
                      key: "category",
                    },
                  ]}
                  dataSource={trendingTopics.trendingTopics}
                  rowKey="topic"
                  pagination={{ pageSize: 15 }}
                />
              ) : (
                <div style={{ textAlign: "center", padding: 40 }}>
                  <Text type="secondary">No trending topics available</Text>
                </div>
              )}
            </Spin>
          </TabPane>

          {/* Topic Research */}
          <TabPane tab="Topic Research" key="5">
            <Spin spinning={loading.topicResearch}>
              {topicResearch && (
                <Row gutter={16}>
                  <Col span={12}>
                    <Card title="Overview" size="small">
                      <Statistic
                        title="Search Volume"
                        value={topicResearch.overview.searchVolume}
                        formatter={(value) => value?.toLocaleString()}
                      />
                      <Statistic
                        title="Competition"
                        value={topicResearch.overview.competition}
                      />
                      <Statistic
                        title="Video Count"
                        value={topicResearch.overview.videoCount}
                        formatter={(value) => value?.toLocaleString()}
                      />
                    </Card>
                  </Col>
                  <Col span={12}>
                    <Card title="Related Keywords" size="small">
                      {topicResearch.relatedKeywords.map((keyword, index) => (
                        <Button
                          key={index}
                          size="small"
                          style={{ margin: 4 }}
                          onClick={() => setSeedKeyword(keyword)}
                        >
                          {keyword}
                        </Button>
                      ))}
                    </Card>
                  </Col>
                </Row>
              )}
            </Spin>
          </TabPane>
        </Tabs>
      </Card>
    </div>
  );
};

export default KeywordResearchDemo;
