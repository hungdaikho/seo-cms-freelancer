"use client";

import React, { useState, useEffect } from "react";
import {
  Card,
  Input,
  Select,
  Button,
  Table,
  Typography,
  Row,
  Col,
  Statistic,
  Tag,
  Space,
  Form,
  message,
  Progress,
  Tooltip,
  Alert,
} from "antd";
import {
  SearchOutlined,
  ExportOutlined,
  InfoCircleOutlined,
  BookOutlined,
  TrophyOutlined,
  LineChartOutlined,
  ReloadOutlined,
} from "@ant-design/icons";
import { useSearchParams } from "next/navigation";
import { useTopicResearch } from "@/stores/hooks/useTopicResearch";
import { getSortedCountries } from "@/utils/countries";
import styles from "./page.module.scss";
import countrySelectStyles from "./country-select.module.scss";

const { Title, Text } = Typography;
const { Option } = Select;

const TopicResearchPage: React.FC = () => {
  const searchParams = useSearchParams();
  const projectId = searchParams.get("projectId");

  // Redux state and actions
  const {
    // Data
    topicIdeas,
    relatedTopics,
    questions,
    apiStatus,
    keywordDemo,
    summaryStats,
    opportunityAnalysis,

    // Loading states
    isLoading,
    topicResearchLoading,
    relatedTopicsLoading,
    questionsLoading,
    apiStatusLoading,

    // Error states
    hasError,
    topicResearchError,
    relatedTopicsError,
    questionsError,

    // Actions
    researchTopic,
    getAPIStatus,
    clearData,
    clearErrors,
    setCurrentSearchParams,
  } = useTopicResearch();

  // Local state
  const [searchTopic, setSearchTopic] = useState("");
  const [selectedCountry, setSelectedCountry] = useState("US");
  const [selectedIndustry, setSelectedIndustry] = useState("general");
  const [domain, setDomain] = useState("");

  // Get sorted countries list
  const sortedCountries = getSortedCountries();

  // Research topic function
  const handleResearchTopic = async (keyword: string) => {
    if (!keyword.trim()) {
      message.warning("Please enter a keyword or topic");
      return;
    }

    clearErrors();

    try {
      await researchTopic(keyword, selectedCountry, selectedIndustry, "blog");
      setCurrentSearchParams({
        seedKeyword: keyword,
        country: selectedCountry,
        industry: selectedIndustry,
      });
      message.success(`Topic research completed for "${keyword}"`);
    } catch (error) {
      console.error("Error researching topic:", error);
      message.error("Failed to research topic. Please try again.");
    }
  };

  // Load API status on component mount
  useEffect(() => {
    getAPIStatus();
  }, [getAPIStatus]);

  // Auto-load data when project is selected
  useEffect(() => {
    if (projectId && searchParams.get("topic")) {
      const topic = searchParams.get("topic");
      if (topic) {
        setSearchTopic(topic);
        handleResearchTopic(topic);
      }
    }
  }, [projectId]);

  const handleSearch = () => {
    handleResearchTopic(searchTopic);
  };

  const handleClearData = () => {
    clearData();
    setSearchTopic("");
    setDomain("");
    message.info("Data cleared successfully");
  };

  const getDifficultyColor = (difficulty: number) => {
    if (difficulty >= 70) return "#ff4d4f";
    if (difficulty >= 50) return "#faad14";
    return "#52c41a";
  };

  const getTrendIcon = (trending: boolean | undefined) => {
    if (trending === true) return "📈";
    if (trending === false) return "📉";
    return "➡️";
  };

  // Table columns for topic ideas
  const topicColumns = [
    {
      title: "Topic",
      dataIndex: "topic",
      key: "topic",
      width: 250,
      render: (text: string) => <strong>{text}</strong>,
    },
    {
      title: "Difficulty",
      dataIndex: "difficulty",
      key: "difficulty",
      width: 120,
      render: (difficulty: number) => (
        <Progress
          percent={difficulty}
          size="small"
          strokeColor={getDifficultyColor(difficulty)}
          showInfo={false}
        />
      ),
    },
    {
      title: "Volume",
      dataIndex: "volume",
      key: "volume",
      width: 100,
      render: (volume: number) => volume.toLocaleString(),
    },
    {
      title: "Opportunity",
      dataIndex: "opportunity",
      key: "opportunity",
      width: 120,
      render: (opportunity: number) => (
        <Progress
          percent={opportunity}
          size="small"
          strokeColor="#52c41a"
          showInfo={false}
        />
      ),
    },
    {
      title: "Questions",
      dataIndex: "questions",
      key: "questions",
      width: 100,
    },
    {
      title: "Related Keywords",
      dataIndex: "relatedKeywords",
      key: "relatedKeywords",
      render: (keywords: string[]) => (
        <Tooltip title={keywords?.join("; ") || ""}>
          <Tag color="blue">{keywords?.length || 0} keywords</Tag>
        </Tooltip>
      ),
    },
    {
      title: "Seasonality",
      dataIndex: "seasonality",
      key: "seasonality",
      render: (seasonality: string) => {
        const color =
          seasonality === "high"
            ? "red"
            : seasonality === "medium"
            ? "orange"
            : "green";
        return <Tag color={color}>{seasonality}</Tag>;
      },
    },
  ];

  // Table columns for related topics
  const relatedTopicsColumns = [
    {
      title: "Related Topic",
      dataIndex: "topic",
      key: "topic",
      render: (text: string) => <strong>{text}</strong>,
    },
    {
      title: "Relevance",
      dataIndex: "relevance",
      key: "relevance",
      render: (relevance: number) => `${relevance}%`,
    },
    {
      title: "Search Volume",
      dataIndex: "volume",
      key: "volume",
      render: (volume: number) => volume.toLocaleString(),
    },
    {
      title: "Trending",
      dataIndex: "trending",
      key: "trending",
      render: (trending: boolean) => getTrendIcon(trending),
    },
    {
      title: "Difficulty",
      dataIndex: "difficulty",
      key: "difficulty",
      render: (difficulty: number) => (
        <Progress
          percent={difficulty}
          size="small"
          strokeColor={getDifficultyColor(difficulty)}
          showInfo={false}
        />
      ),
    },
    {
      title: "Content Opportunities",
      dataIndex: "contentOpportunities",
      key: "contentOpportunities",
      render: (opportunities: number) => (
        <Tag color="green">{opportunities} ideas</Tag>
      ),
    },
  ];

  // Table columns for questions
  const questionColumns = [
    {
      title: "Question",
      dataIndex: "question",
      key: "question",
      width: 400,
      render: (text: string) => <strong>{text}</strong>,
    },
    {
      title: "Volume",
      dataIndex: "volume",
      key: "volume",
      render: (volume: number) => volume.toLocaleString(),
    },
    {
      title: "Intent",
      dataIndex: "intent",
      key: "intent",
      render: (intent: string) => {
        const color =
          {
            informational: "blue",
            commercial: "orange",
            transactional: "green",
            navigational: "purple",
          }[intent] || "default";
        return <Tag color={color}>{intent}</Tag>;
      },
    },
    {
      title: "Difficulty",
      dataIndex: "difficulty",
      key: "difficulty",
      render: (difficulty: number) => (
        <Progress
          percent={difficulty}
          size="small"
          strokeColor={getDifficultyColor(difficulty)}
          showInfo={false}
        />
      ),
    },
    {
      title: "Answer Length",
      dataIndex: "answerLength",
      key: "answerLength",
      render: (length: string) => {
        const color =
          length === "long" ? "red" : length === "medium" ? "orange" : "green";
        return <Tag color={color}>{length}</Tag>;
      },
    },
  ];

  return (
    <div className={styles.topicResearchPage}>
      {/* Header */}
      <div className={styles.header}>
        <Title level={2}>Topic Research</Title>
        <Text type="secondary">
          Win your readers' hearts and minds with a topic finder that helps you
          generate ideas for engaging content
        </Text>
      </div>

      {/* API Status Alert */}
      {apiStatus && (
        <Alert
          message={apiStatus.message}
          type={apiStatus.hasRealData ? "success" : "warning"}
          showIcon
          style={{ marginBottom: 24 }}
          action={
            <Button
              size="small"
              icon={<ReloadOutlined />}
              onClick={() => getAPIStatus()}
              loading={apiStatusLoading}
            >
              Refresh Status
            </Button>
          }
        />
      )}

      {/* Search Section */}
      <Card className={styles.searchCard}>
        <Form layout="inline" onFinish={handleSearch}>
          <Form.Item>
            <Input
              value={searchTopic}
              onChange={(e) => setSearchTopic(e.target.value)}
              placeholder="Enter topic (e.g., SEO, Digital Marketing)"
              style={{ width: 300 }}
              prefix={<SearchOutlined />}
              onPressEnter={handleSearch}
            />
          </Form.Item>
          <Form.Item>
            <Input
              value={domain}
              onChange={(e) => setDomain(e.target.value)}
              placeholder="Enter domain (optional)"
              style={{ width: 200 }}
            />
          </Form.Item>
          <Form.Item>
            <Select
              value={selectedCountry}
              onChange={setSelectedCountry}
              style={{ width: 220 }}
              className={countrySelectStyles.countrySelect}
              showSearch
              placeholder="Select country"
              filterOption={(input, option) =>
                (option?.children as unknown as string)
                  .toLowerCase()
                  .includes(input.toLowerCase())
              }
              optionLabelProp="label"
            >
              {sortedCountries.map((country) => (
                <Option
                  key={country.code}
                  value={country.code}
                  label={`${country.flag} ${country.name}`}
                >
                  <span className={countrySelectStyles.countryFlag}>
                    {country.flag}
                  </span>
                  {country.name}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item>
            <Select
              value={selectedIndustry}
              onChange={setSelectedIndustry}
              style={{ width: 180 }}
            >
              <Option value="general">General</Option>
              <Option value="technology">Technology</Option>
              <Option value="marketing">Marketing</Option>
              <Option value="ecommerce">E-commerce</Option>
              <Option value="healthcare">Healthcare</Option>
              <Option value="finance">Finance</Option>
              <Option value="education">Education</Option>
              <Option value="travel">Travel</Option>
              <Option value="food">Food & Beverage</Option>
              <Option value="automotive">Automotive</Option>
            </Select>
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              icon={<SearchOutlined />}
              onClick={handleSearch}
              loading={isLoading}
            >
              Get Content Ideas
            </Button>
          </Form.Item>
          <Form.Item>
            <Button
              icon={<ExportOutlined />}
              disabled={!summaryStats.totalTopicIdeas}
            >
              Export
            </Button>
          </Form.Item>
          <Form.Item>
            <Button
              icon={<ReloadOutlined />}
              onClick={handleClearData}
              disabled={!summaryStats.totalTopicIdeas}
            >
              Clear
            </Button>
          </Form.Item>
        </Form>
      </Card>

      {/* Error Display */}
      {hasError && (
        <Alert
          message="Error occurred while fetching data"
          description={
            topicResearchError || relatedTopicsError || questionsError
          }
          type="error"
          showIcon
          closable
          style={{ marginBottom: 24 }}
        />
      )}

      {/* Overview Stats */}
      <Row gutter={[24, 24]} className={styles.statsRow}>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Topic Ideas"
              value={summaryStats.totalTopicIdeas}
              prefix={<BookOutlined />}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Related Topics"
              value={summaryStats.totalRelatedTopics}
              prefix={<TrophyOutlined />}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Questions"
              value={summaryStats.totalQuestions}
              prefix={<InfoCircleOutlined />}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Avg. Opportunity"
              value={summaryStats.avgOpportunity}
              suffix="%"
              prefix={<LineChartOutlined />}
            />
          </Card>
        </Col>
      </Row>

      {/* High Opportunity Topics Alert */}
      {opportunityAnalysis.highOpportunityLowDifficulty.length > 0 && (
        <Alert
          message="High Opportunity Topics Found!"
          description={`Found ${opportunityAnalysis.highOpportunityLowDifficulty.length} topics with high opportunity and low difficulty.`}
          type="success"
          showIcon
          style={{ marginBottom: 24 }}
        />
      )}

      {/* Topic Ideas Table */}
      <Card className={styles.contentCard} title="Topic Ideas">
        <Table
          dataSource={topicIdeas}
          columns={topicColumns}
          loading={topicResearchLoading}
          rowKey="topic"
          pagination={{
            pageSize: 10,
            showTotal: (total) => `${total} topic ideas`,
            showSizeChanger: true,
            showQuickJumper: true,
          }}
          scroll={{ x: 1000 }}
        />
      </Card>

      {/* Related Topics Table */}
      <Card className={styles.contentCard} title="Related Topics">
        <Table
          dataSource={relatedTopics}
          columns={relatedTopicsColumns}
          loading={relatedTopicsLoading}
          rowKey="topic"
          pagination={{
            pageSize: 10,
            showTotal: (total) => `${total} related topics`,
            showSizeChanger: true,
          }}
        />
      </Card>

      {/* Questions Table */}
      <Card className={styles.contentCard} title="People Also Ask">
        <Table
          dataSource={questions}
          columns={questionColumns}
          loading={questionsLoading}
          rowKey="question"
          pagination={{
            pageSize: 10,
            showTotal: (total) => `${total} questions`,
            showSizeChanger: true,
          }}
          scroll={{ x: 800 }}
        />
      </Card>

      {/* Keyword Demo Card */}
      {keywordDemo && (
        <Card className={styles.contentCard} title="Keyword Insights">
          <Row gutter={[16, 16]}>
            <Col xs={24} md={12}>
              <Statistic
                title="Search Volume"
                value={keywordDemo.overview.searchVolume}
                suffix="/ month"
              />
            </Col>
            <Col xs={24} md={12}>
              <Statistic
                title="Competition"
                value={keywordDemo.overview.competition}
                suffix="/ 100"
              />
            </Col>
            <Col xs={24} md={12}>
              <Statistic
                title="Interest Level"
                value={keywordDemo.overview.interest}
                suffix="/ 100"
              />
            </Col>
            <Col xs={24} md={12}>
              <Statistic
                title="Video Count"
                value={keywordDemo.overview.videoCount}
              />
            </Col>
          </Row>

          {keywordDemo.risingTopics.length > 0 && (
            <div style={{ marginTop: 24 }}>
              <Title level={5}>Rising Topics</Title>
              <Space wrap>
                {keywordDemo.risingTopics.map((topic, index) => (
                  <Tag key={index} color="volcano">
                    {topic}
                  </Tag>
                ))}
              </Space>
            </div>
          )}
        </Card>
      )}
    </div>
  );
};

export default TopicResearchPage;
