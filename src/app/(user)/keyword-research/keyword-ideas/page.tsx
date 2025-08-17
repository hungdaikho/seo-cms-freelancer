"use client";

import React, { useState, useEffect } from "react";
import { Input, Select, Button, Table, Tag, Checkbox, Spin, Alert } from "antd";
import { SearchOutlined, ReloadOutlined } from "@ant-design/icons";
import useKeywordResearch from "@/hooks/useKeywordResearch";
import styles from "./KeywordIdeas.module.scss";
import { getSortedCountries } from "@/utils/countries";

const { Option } = Select;

type Props = {};

const KeywordIdeasPage = (props: Props) => {
  const [searchKeyword, setSearchKeyword] = useState("Designer");
  const [selectedCountry, setSelectedCountry] = useState("VN");
  const [activeFilters, setActiveFilters] = useState<string[]>([]);

  // Use the keyword research hook
  const {
    loading,
    error,
    contentIdeas,
    selectedKeywords,
    isAnyLoading,
    clearErrorState,
    getTopicIdeas,
    toggleKeywordSelection,
    isKeywordSelected,
    handleExportKeywords,
  } = useKeywordResearch();

  // Load initial data
  useEffect(() => {
    handleSearch();
  }, []);

  // Handle search
  const handleSearch = async () => {
    if (!searchKeyword.trim()) {
      return;
    }

    try {
      await getTopicIdeas({
        seedKeyword: searchKeyword,
        country: selectedCountry,
        limit: 50,
      });
    } catch (error) {
      console.error("Search failed:", error);
    }
  };

  // Process keyword ideas data
  const keywordIdeasData =
    contentIdeas?.topicIdeas?.map((idea: any, index: number) => ({
      key: index,
      keyword: idea.topic,
      seoDifficulty: idea.difficulty || 0,
      competitiveness: idea.competitiveness || 0,
      opportunity: idea.opportunity || 0,
      contentGap: idea.contentGap || 0,
      seasonality: idea.seasonality || "low",
      questions: idea.questions || 0,
      type: "Topic Ideas",
      searchVolume: idea.volume || 0,
    })) || [];

  // Debug log để kiểm tra dữ liệu
  console.log("Content Ideas:", contentIdeas);
  console.log("Topic Ideas Data:", keywordIdeasData);
  if (contentIdeas?.topicIdeas && contentIdeas.topicIdeas.length > 0) {
    console.log("Sample topic idea:", contentIdeas.topicIdeas[0]);
  }

  // Filter options
  const filterOptions = [
    { key: "volume", label: "Volume", icon: "📊" },
    { key: "seo_difficulty", label: "SEO Difficulty", icon: "⚡" },
    { key: "opportunity", label: "Opportunity", icon: "🎯" },
    { key: "competitiveness", label: "Competitiveness", icon: "🏆" },
    { key: "seasonality", label: "Seasonality", icon: "📅" },
  ];

  const handleFilterToggle = (filterKey: string) => {
    setActiveFilters((prev) =>
      prev.includes(filterKey)
        ? prev.filter((key) => key !== filterKey)
        : [...prev, filterKey]
    );
  };

  // Table columns
  const columns = [
    {
      title: "",
      dataIndex: "checkbox",
      key: "checkbox",
      width: 40,
      className: styles.checkboxCell,
      render: (_: any, record: any) => (
        <Checkbox
          checked={isKeywordSelected(record.keyword)}
          onChange={() => toggleKeywordSelection(record.keyword)}
        />
      ),
    },
    {
      title: "Keyword",
      dataIndex: "keyword",
      key: "keyword",
      render: (text: string, record: any) => (
        <div className={styles.keywordCell}>
          <a href="#" className={styles.keywordLink}>
            {text}
          </a>
          <div className={styles.keywordType}>{record.type}</div>
        </div>
      ),
    },
    {
      title: "Volume",
      dataIndex: "searchVolume",
      key: "searchVolume",
      width: 120,
      className: styles.volumeCell,
      render: (volume: number) => volume?.toLocaleString() || "-",
      sorter: (a: any, b: any) => (a.searchVolume || 0) - (b.searchVolume || 0),
    },
    {
      title: "SEO Difficulty",
      dataIndex: "seoDifficulty",
      key: "seoDifficulty",
      width: 120,
      className: styles.difficultyCell,
      render: (difficulty: number) => (
        <div className={styles.difficultyWrapper}>
          <span className={styles.difficultyScore}>{difficulty}</span>
          <div className={styles.difficultyBar}>
            <div
              className={styles.difficultyFill}
              style={{
                width: `${difficulty}%`,
                backgroundColor:
                  difficulty > 70
                    ? "#ff4d4f"
                    : difficulty > 40
                    ? "#faad14"
                    : "#52c41a",
              }}
            />
          </div>
        </div>
      ),
      sorter: (a: any, b: any) =>
        (a.seoDifficulty || 0) - (b.seoDifficulty || 0),
    },
    {
      title: "Opportunity",
      dataIndex: "opportunity",
      key: "opportunity",
      width: 100,
      className: styles.opportunityCell,
      render: (opportunity: number) => (
        <div className={styles.opportunityWrapper}>
          <span
            style={{
              color:
                opportunity > 70
                  ? "#52c41a"
                  : opportunity > 40
                  ? "#faad14"
                  : "#ff4d4f",
              fontWeight: 600,
            }}
          >
            {opportunity}
          </span>
        </div>
      ),
      sorter: (a: any, b: any) => (a.opportunity || 0) - (b.opportunity || 0),
    },
    {
      title: "Competitiveness",
      dataIndex: "competitiveness",
      key: "competitiveness",
      width: 120,
      className: styles.competitivenessCell,
      render: (competitiveness: number) => (
        <div className={styles.competitivenessWrapper}>
          <span
            style={{
              color:
                competitiveness > 70
                  ? "#ff4d4f"
                  : competitiveness > 40
                  ? "#faad14"
                  : "#52c41a",
            }}
          >
            {competitiveness}
          </span>
        </div>
      ),
      sorter: (a: any, b: any) =>
        (a.competitiveness || 0) - (b.competitiveness || 0),
    },
    {
      title: "Seasonality",
      dataIndex: "seasonality",
      key: "seasonality",
      width: 100,
      className: styles.seasonalityCell,
      render: (seasonality: string) => (
        <Tag
          color={
            seasonality === "high"
              ? "red"
              : seasonality === "medium"
              ? "orange"
              : "green"
          }
        >
          {seasonality.toUpperCase()}
        </Tag>
      ),
    },
  ];

  const handleRefresh = () => {
    handleSearch();
  };

  const handleExport = async () => {
    if (selectedKeywords.length === 0) {
      // Export current visible data if no selection
      const keywordsToExport = keywordIdeasData
        .slice(0, 10)
        .map((k) => k.keyword);
      await handleExportKeywords(keywordsToExport, "csv");
    } else {
      await handleExportKeywords(selectedKeywords, "csv");
    }
  };

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
        <h1 className={styles.title}>Keyword Ideas: {searchKeyword}</h1>
        <p className={styles.description}>
          Discover topic ideas and keyword suggestions for your content strategy
        </p>

        <div className={styles.searchSection}>
          <div className={styles.searchInput}>
            <Input
              placeholder="Enter keyword"
              value={searchKeyword}
              onChange={(e) => setSearchKeyword(e.target.value)}
              prefix={<SearchOutlined />}
            />
          </div>

          <div className={styles.controls}>
            <div className={styles.countrySelect}>
              <Select
                value={selectedCountry}
                onChange={setSelectedCountry}
                showSearch
                filterOption={(input, option: any) =>
                  option?.children.toLowerCase().includes(input.toLowerCase())
                }
              >
                {getSortedCountries().map((country) => (
                  <Option key={country.code} value={country.code}>
                    {country.name}
                  </Option>
                ))}
              </Select>
            </div>

            <div className={styles.searchButton}>
              <Button
                type="primary"
                icon={<SearchOutlined />}
                onClick={handleSearch}
                loading={isAnyLoading}
              >
                Search
              </Button>
            </div>

            <div className={styles.refreshButton}>
              <Button
                icon={<ReloadOutlined />}
                onClick={handleRefresh}
                disabled={isAnyLoading}
              >
                Refresh
              </Button>
            </div>
          </div>
        </div>
      </div>

      <Spin spinning={isAnyLoading}>
        {/* Keyword Ideas Section */}
        <div className={styles.keywordIdeas}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>Topic Ideas</h2>
            <div className={styles.exportButton}>
              <Button onClick={handleExport}>EXPORT</Button>
            </div>
          </div>

          <div className={styles.tabCount}>
            Topic Ideas ({keywordIdeasData.length})
          </div>

          {/* Filter Section */}
          <div className={styles.filterSection}>
            {filterOptions.map((filter) => (
              <div key={filter.key} className={styles.filterTag}>
                <Tag
                  className={activeFilters.includes(filter.key) ? "active" : ""}
                  onClick={() => handleFilterToggle(filter.key)}
                >
                  {filter.icon} {filter.label} {filter.key === "cpc" && "(USD)"}
                </Tag>
              </div>
            ))}
          </div>

          {/* Keyword Table */}
          <div className={styles.keywordTable}>
            <Table
              columns={columns}
              dataSource={keywordIdeasData}
              pagination={{
                pageSize: 10,
                showSizeChanger: false,
                showQuickJumper: false,
                showTotal: (total, range) =>
                  `${range[0]}-${range[1]} of ${total} items`,
              }}
              size="middle"
              loading={loading.contentIdeas}
            />
          </div>
        </div>
      </Spin>
    </div>
  );
};

export default KeywordIdeasPage;
