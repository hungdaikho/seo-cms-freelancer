"use client";

import React, { useState, useEffect } from "react";
import {
  Select,
  Table,
  Tabs,
  Button,
  Progress,
  Input,
  Space,
  Card,
  Statistic,
  Alert,
  Spin,
  Row,
  Col,
} from "antd";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Area,
  AreaChart,
} from "recharts";
import {
  SearchOutlined,
  DownloadOutlined,
  HeartOutlined,
  HeartFilled,
  ReloadOutlined,
} from "@ant-design/icons";
import useKeywordResearch from "@/hooks/useKeywordResearch";
import styles from "./KeywordOverview.module.scss";

const { Option } = Select;

type Props = {};

const KeywordOverviewPage = (props: Props) => {
  // State for search inputs
  const [seedKeyword, setSeedKeyword] = useState("");
  const [domain, setDomain] = useState("");
  const [country, setCountry] = useState("VN");
  const [activeTab, setActiveTab] = useState("3"); // Default to Variations tab

  // Use the keyword research hook
  const {
    // State
    loading,
    error,
    selectedKeywords,
    keywordVariations,
    keywordMagic,
    topicResearch,
    contentIdeas,
    serpAnalysis,
    questionKeywords,
    allMagicKeywords,

    // Computed data
    isAnyLoading,
    keywordAnalysisData,
    primaryKeywords,
    keywordStatsSummary,

    handleExportKeywords,
    addToFavorites,

    // State management
    clearErrorState,
    clearSelection,

    // Helpers
    isKeywordFavorite,
    isKeywordSelected,
    toggleKeywordSelection,
    toggleKeywordFavorite,

    // Compound operations
    performCompleteKeywordResearch,
  } = useKeywordResearch();
  console.log(contentIdeas);

  // Load initial data
  useEffect(() => {
    handleSearch();
  }, []);

  // ====================================================================
  // HANDLERS
  // ====================================================================

  const handleSearch = async () => {
    if (!seedKeyword.trim()) {
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

  const handleRefresh = () => {
    handleSearch();
  };

  const handleExport = async () => {
    if (selectedKeywords.length === 0) {
      // Export current visible data if no selection
      const keywordsToExport = keywordAnalysisData
        .slice(0, 10)
        .map((k) => k.keyword);
      await handleExportKeywords(keywordsToExport, "csv");
    } else {
      await handleExportKeywords(selectedKeywords, "csv");
    }
  };

  const handleSaveToFavorites = async () => {
    if (selectedKeywords.length === 0) {
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
  // DATA PROCESSING
  // ====================================================================

  // Get current keyword data (first from analysis or magic tool)
  const currentKeywordData = keywordAnalysisData?.[0] ||
    primaryKeywords?.[0] || {
      keyword: seedKeyword,
      searchVolume: topicResearch?.overview?.searchVolume || 0,
      difficulty: 0,
      cpc: 0,
      trend: "stable" as const,
    };

  // Process chart data for search volume trend
  const volumeChartData = Array.isArray(topicResearch?.overview?.interest)
    ? topicResearch.overview.interest.map((item, index) => ({
        month: item.month,
        volume:
          currentKeywordData.searchVolume +
          (Math.random() - 0.5) * 1000 * (index + 1),
      }))
    : [];

  // Process keyword variations for table
  const getKeywordTableData = () => {
    switch (activeTab) {
      case "1": // Variations
        return (
          keywordVariations?.variations?.map((item, index) => ({
            key: index,
            keyword: item.keyword,
            trend: item.trend,
            cpc: item.cpc ? `$${item.cpc}` : "-",
            pd: item.paidDifficulty || "-",
            sd: item.difficulty,
            searchVolume: item.searchVolume,
          })) || []
        );

      case "2": // Suggestions (All magic keywords)
        return (
          allMagicKeywords?.map((item, index) => ({
            key: index,
            keyword: item.keyword,
            trend: item.trend || "stable",
            cpc: (item as any).cpc ? `$${(item as any).cpc}` : "-",
            pd: "-",
            sd: item.difficulty,
            searchVolume: item.searchVolume,
          })) || []
        );

      case "3": // Related
        return (
          contentIdeas?.topicIdeas?.map((idea: any, index: number) => ({
            key: index,
            keyword: idea.topic,
            trend: "stable",
            cpc: "-",
            pd: "-",
            sd: idea.difficulty,
            searchVolume: idea.volume,
          })) || []
        );

      case "4": // Questions
        return (
          questionKeywords?.questionKeywords?.map(
            (item: any, index: number) => ({
              key: index,
              keyword: item.question,
              trend: "stable",
              cpc: "-",
              pd: "-",
              sd: item.difficulty,
              searchVolume: item.searchVolume,
            })
          ) || []
        );

      default:
        return [];
    }
  };

  // Process SERP data
  const serpTableData =
    serpAnalysis?.serpData?.map((item, index) => ({
      key: index,
      rank: item.rank,
      url: item.url,
      backlinks: item.backlinks,
      searchTraffic: item.searchTraffic,
      keywords: item.keywords,
      title: item.title,
    })) || [];
  // Table columns for related keywords
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
      render: (text: string) => (
        <a href="#" className={styles.keywordLink}>
          {text}
        </a>
      ),
    },
    {
      title: "Volume",
      dataIndex: "searchVolume",
      key: "searchVolume",
      width: 100,
      render: (volume: number) => volume?.toLocaleString() || "-",
      sorter: (a: any, b: any) => (a.searchVolume || 0) - (b.searchVolume || 0),
    },
    {
      title: "Trend",
      dataIndex: "trend",
      key: "trend",
      width: 80,
      render: (trend: string) => (
        <div className={styles.trendCell}>
          <span
            style={{
              color:
                trend === "rising"
                  ? "green"
                  : trend === "declining"
                  ? "red"
                  : "blue",
              fontSize: "12px",
            }}
          >
            {trend}
          </span>
        </div>
      ),
    },
    {
      title: "CPC",
      dataIndex: "cpc",
      key: "cpc",
      width: 80,
    },
    {
      title: "PD",
      dataIndex: "pd",
      key: "pd",
      width: 60,
    },
    {
      title: "SD",
      dataIndex: "sd",
      key: "sd",
      width: 60,
    },
  ];

  // Table columns for SERP analysis
  const serpColumns = [
    {
      title: "Rank",
      dataIndex: "rank",
      key: "rank",
      width: 80,
      render: (rank: number) => (
        <span className={styles.rankBadge}>{rank}</span>
      ),
    },
    {
      title: "URL",
      dataIndex: "url",
      key: "url",
      render: (text: string) => (
        <a
          href={text}
          className={styles.urlLink}
          target="_blank"
          rel="noopener noreferrer"
        >
          {text}
        </a>
      ),
    },
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
      render: (text: string) => text || "No title available",
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

  // Get table data based on active tab
  const currentTableData = getKeywordTableData();

  // Debug log
  console.log("contentIdeas:", contentIdeas);
  console.log("currentTableData for tab", activeTab, ":", currentTableData);
  console.log(
    "contentIdeas?.topicIdeas?.length:",
    contentIdeas?.topicIdeas?.length
  );
  if (contentIdeas?.topicIdeas) {
    console.log("First 3 topicIdeas:", contentIdeas.topicIdeas.slice(0, 3));
  }

  // Process trend data
  const keywordTrendData = topicResearch?.overview?.interest || [];

  return (
    <div className={styles.container}>
      {/* Error Alert */}
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

      {/* Header */}
      <div className={styles.header}>
        <h1 className={styles.title}>Keyword Research</h1>
        <div className={styles.languageSelector}>
          <Space>
            <Input
              placeholder="Enter keyword"
              value={seedKeyword}
              onChange={(e) => setSeedKeyword(e.target.value)}
              style={{ width: 200 }}
              prefix={<SearchOutlined />}
            />
            <Input
              placeholder="Domain (optional)"
              value={domain}
              onChange={(e) => setDomain(e.target.value)}
              style={{ width: 150 }}
            />
            <Select
              value={country}
              onChange={(value) => setCountry(value)}
              style={{ width: 120 }}
            >
              <Option value="US">🇺🇸 US</Option>
              <Option value="UK">🇬🇧 UK</Option>
              <Option value="CA">🇨🇦 CA</Option>
              <Option value="AU">🇦🇺 AU</Option>
              <Option value="VN">🇻🇳 VN</Option>
            </Select>
            <Button
              type="primary"
              onClick={handleSearch}
              loading={isAnyLoading}
              icon={<SearchOutlined />}
            >
              Search
            </Button>
            <Button
              onClick={handleRefresh}
              icon={<ReloadOutlined />}
              disabled={isAnyLoading}
            >
              Refresh
            </Button>
          </Space>
        </div>
      </div>

      {/* Statistics Summary */}
      {keywordStatsSummary && (
        <Row gutter={16} style={{ marginBottom: 24 }}>
          <Col span={6}>
            <Card>
              <Statistic
                title="Total Keywords"
                value={keywordStatsSummary.totalKeywords}
              />
            </Card>
          </Col>
          <Col span={6}>
            <Card>
              <Statistic
                title="Avg Search Volume"
                value={keywordStatsSummary.avgSearchVolume}
                formatter={(value) => value?.toLocaleString()}
              />
            </Card>
          </Col>
          <Col span={6}>
            <Card>
              <Statistic
                title="Avg Difficulty"
                value={keywordStatsSummary.avgDifficulty}
                suffix="%"
              />
            </Card>
          </Col>
          <Col span={6}>
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
            <span>Selected: {selectedKeywords.length} keywords</span>
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

      <Spin spinning={isAnyLoading}>
        {/* Keyword Info Section */}
        <div className={styles.keywordInfo}>
          <div className={styles.keywordTitle}>
            <div className={styles.keyword}>
              Searched Keyword: {seedKeyword}
            </div>
            <div className={styles.lastUpdated}>
              Last Updated
              <br />
              {new Date().toLocaleDateString()}
            </div>
          </div>

          <div className={styles.searchVolume}>
            <div className={styles.volumeLabel}>Search Volume</div>
            <div className={styles.volumeValue}>
              {currentKeywordData.searchVolume?.toLocaleString() || "0"}
              <span className={styles.badge}>
                {currentKeywordData.trend?.toUpperCase()}
              </span>
            </div>
          </div>

          {volumeChartData.length > 0 && (
            <div className={styles.chart}>
              <ResponsiveContainer width="100%" height={200}>
                <AreaChart data={volumeChartData}>
                  <XAxis
                    dataKey="month"
                    axisLine={false}
                    tickLine={false}
                    fontSize={12}
                    tick={{ fill: "#999" }}
                  />
                  <YAxis hide />
                  <Area
                    type="monotone"
                    dataKey="volume"
                    stroke="#FF914D"
                    strokeWidth={3}
                    fill="url(#volumeGradient)"
                  />
                  <defs>
                    <linearGradient
                      id="volumeGradient"
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
                      <stop offset="5%" stopColor="#FF914D" stopOpacity={0.3} />
                      <stop
                        offset="95%"
                        stopColor="#FF914D"
                        stopOpacity={0.1}
                      />
                    </linearGradient>
                  </defs>
                </AreaChart>
              </ResponsiveContainer>
            </div>
          )}
        </div>

        {/* Stats Grid */}
        <div className={styles.statsGrid}>
          <div className={styles.statCard}>
            <div className={styles.statLabel}>SEO Difficulty</div>
            <div className={styles.statValue}>
              {currentKeywordData.difficulty || 0}
            </div>
          </div>
          <div className={styles.statCard}>
            <div className={styles.statLabel}>Video Count</div>
            <div className={styles.statValue}>
              {topicResearch?.overview?.videoCount || 0}
            </div>
          </div>
          <div className={styles.statCard}>
            <div className={styles.statLabel}>Cost per Click</div>
            <div className={styles.statValue}>
              ${currentKeywordData?.cpc?.toFixed(2) || 0}
            </div>
          </div>
          <div className={styles.statCard}>
            <div className={styles.statLabel}>Competition</div>
            <div className={styles.statValue}>
              {topicResearch?.overview?.competition || "Low"}
            </div>
          </div>
        </div>

        {/* Keyword Details */}
        <div className={styles.keywordDetails}>
          <div className={styles.detailCard}>
            <div className={styles.cardTitle}>Keyword Difficulty</div>
            <div className={styles.difficultyChart}>
              <Progress
                type="circle"
                percent={currentKeywordData.difficulty || 0}
                format={() => ""}
                strokeColor="#ff4d4f"
                size={120}
              />
              <div className={styles.difficultyValue}>
                {currentKeywordData.difficulty || 0}
              </div>
            </div>
            <div className={styles.difficultyLabel}>100%</div>
            <div className={styles.difficultyLabel}>
              {(currentKeywordData.difficulty || 0) > 70
                ? "Very Hard"
                : (currentKeywordData.difficulty || 0) > 40
                ? "Medium"
                : "Easy"}
            </div>
            <div className={styles.difficultyDescription}>
              Keyword difficulty based on
              <br />
              competition analysis
            </div>
          </div>

          <div className={styles.detailCard}>
            <div className={styles.cardTitle}>Trend</div>
            <div className={styles.trendDescription}>
              Search volume of this key
              <br />
              word over time period
            </div>
            {keywordTrendData.length > 0 && (
              <div className={styles.trendChart}>
                <ResponsiveContainer width="100%" height={120}>
                  <AreaChart data={keywordTrendData}>
                    <XAxis dataKey="month" hide />
                    <YAxis hide />
                    <Area
                      type="monotone"
                      dataKey="value"
                      stroke="#4285f4"
                      strokeWidth={2}
                      fill="url(#trendGradient)"
                    />
                    <defs>
                      <linearGradient
                        id="trendGradient"
                        x1="0"
                        y1="0"
                        x2="0"
                        y2="1"
                      >
                        <stop
                          offset="5%"
                          stopColor="#4285f4"
                          stopOpacity={0.3}
                        />
                        <stop
                          offset="95%"
                          stopColor="#4285f4"
                          stopOpacity={0.1}
                        />
                      </linearGradient>
                    </defs>
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            )}
          </div>
        </div>

        {/* Keyword Ideas */}
        <div className={styles.keywordIdeas}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>Keyword Ideas</h2>
            <div className={styles.tabs}>
              <Tabs
                activeKey={activeTab}
                onChange={setActiveTab}
                size="middle"
                items={[
                  { key: "1", label: "Variations" },
                  { key: "2", label: "Suggestions" },
                  { key: "3", label: "Related" },
                  { key: "4", label: "Questions" },
                ]}
              />
            </div>
          </div>

          <div className={styles.relatedCount}>
            {activeTab === "1" &&
              `Variations (${keywordVariations?.variations?.length || 0})`}
            {activeTab === "2" &&
              `Suggestions (${allMagicKeywords?.length || 0})`}
            {activeTab === "3" &&
              `Related (${contentIdeas?.topicIdeas?.length || 0})`}
            {activeTab === "4" &&
              `Questions (${questionKeywords?.questionKeywords?.length || 0})`}
          </div>

          <div className={styles.keywordTable}>
            {/* Debug info */}
            <div
              style={{
                background: "#f0f0f0",
                padding: "10px",
                marginBottom: "10px",
                fontSize: "12px",
              }}
            >
              <strong>Debug Info:</strong>
              <br />
              Active Tab: {activeTab}
              <br />
              Data Length: {currentTableData.length}
              <br />
              ContentIdeas Available: {contentIdeas ? "Yes" : "No"}
              <br />
              TopicIdeas Length: {contentIdeas?.topicIdeas?.length || 0}
            </div>

            <Table
              columns={keywordColumns}
              dataSource={currentTableData}
              pagination={{ pageSize: 10 }}
              size="middle"
              loading={
                loading.keywordVariations ||
                loading.keywordMagic ||
                loading.topicResearch ||
                loading.contentIdeas
              }
            />
          </div>
        </div>

        {/* SERP Analysis */}
        <div className={styles.serpAnalysis}>
          <h2 className={styles.sectionTitle}>SERP Analysis</h2>

          <div className={styles.serpTable}>
            <Table
              columns={serpColumns}
              dataSource={serpTableData}
              pagination={{ pageSize: 10 }}
              size="middle"
              loading={loading.serpAnalysis}
            />
          </div>
        </div>
      </Spin>
    </div>
  );
};

export default KeywordOverviewPage;
