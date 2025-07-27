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
} from "antd";
import {
  SearchOutlined,
  ExportOutlined,
  InfoCircleOutlined,
  BookOutlined,
  TrophyOutlined,
  LineChartOutlined,
} from "@ant-design/icons";
import { useSearchParams } from "next/navigation";
import { seoService } from "@/services/seo.service";
import styles from "./page.module.scss";

const { Title, Text } = Typography;
const { Option } = Select;

interface TopicIdea {
  title: string;
  difficulty: number;
  volume: number;
  trend: string;
  efficiency: number;
  cards: number;
  questions: number;
  headlines: string[];
}

interface RelatedTopic {
  topic: string;
  volume: number;
  keywords: number;
  difficulty: number;
}

interface Question {
  question: string;
  volume: number;
  difficulty: number;
  headlineIdeas: number;
}

const TopicResearchPage: React.FC = () => {
  const searchParams = useSearchParams();
  const projectId = searchParams.get("projectId");

  const [loading, setLoading] = useState(false);
  const [searchTopic, setSearchTopic] = useState("");
  const [selectedCountry, setSelectedCountry] = useState("US");
  const [selectedIndustry, setSelectedIndustry] = useState("general");
  const [domain, setDomain] = useState("");
  const [activeTab, setActiveTab] = useState("overview");
  const [topicIdeas, setTopicIdeas] = useState<TopicIdea[]>([]);
  const [relatedTopics, setRelatedTopics] = useState<RelatedTopic[]>([]);
  const [questions, setQuestions] = useState<Question[]>([]);

  // Research topic function
  const researchTopic = async (keyword: string) => {
    if (!keyword.trim()) {
      message.warning("Please enter a keyword or topic");
      return;
    }

    setLoading(true);
    try {
      // Generate topic ideas
      const topicIdeasResponse = await seoService.generateTopicIdeas({
        seedKeyword: keyword,
        country: selectedCountry,
        industry: selectedIndustry,
        contentType: "blog",
      });
      setTopicIdeas(topicIdeasResponse);

      // Get related topics
      const relatedTopicsResponse = await seoService.getRelatedTopics(keyword, {
        country: selectedCountry,
        limit: 20,
      });
      setRelatedTopics(relatedTopicsResponse);

      // Get topic questions
      const questionsResponse = await seoService.getTopicQuestions(keyword, {
        country: selectedCountry,
        limit: 50,
      });
      setQuestions(questionsResponse);

      message.success(`Topic research completed for "${keyword}"`);
    } catch (error) {
      console.error("Error researching topic:", error);
      message.error("Failed to research topic. Please try again.");
      // Reset to empty state on error
      setTopicIdeas([]);
      setRelatedTopics([]);
      setQuestions([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (projectId) {
      // Auto-load data when project is selected
      // This could be enhanced to remember last researched topic
    }
  }, [projectId]);

  const handleSearch = () => {
    researchTopic(searchTopic);
  };

  const getDifficultyColor = (difficulty: number) => {
    if (difficulty >= 70) return "#ff4d4f";
    if (difficulty >= 50) return "#faad14";
    return "#52c41a";
  };

  const getTrendIcon = (trend: string) => {
    if (trend === "up") return "📈";
    if (trend === "down") return "📉";
    return "➡️";
  };

  const topicColumns = [
    {
      title: "Topic",
      dataIndex: "title",
      key: "title",
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
      title: "Trend",
      dataIndex: "trend",
      key: "trend",
      width: 80,
      render: (trend: string) => getTrendIcon(trend),
    },
    {
      title: "Efficiency",
      dataIndex: "efficiency",
      key: "efficiency",
      width: 100,
      render: (efficiency: number) => `${efficiency}%`,
    },
    {
      title: "Cards",
      dataIndex: "cards",
      key: "cards",
      width: 80,
    },
    {
      title: "Questions",
      dataIndex: "questions",
      key: "questions",
      width: 100,
    },
    {
      title: "Headlines",
      dataIndex: "headlines",
      key: "headlines",
      render: (headlines: string[]) => (
        <Tooltip title={headlines.join("; ")}>
          <Tag color="blue">{headlines.length} ideas</Tag>
        </Tooltip>
      ),
    },
  ];

  const relatedTopicsColumns = [
    {
      title: "Related Topic",
      dataIndex: "topic",
      key: "topic",
      render: (text: string) => <strong>{text}</strong>,
    },
    {
      title: "Search Volume",
      dataIndex: "volume",
      key: "volume",
      render: (volume: number) => volume.toLocaleString(),
    },
    {
      title: "Keywords",
      dataIndex: "keywords",
      key: "keywords",
      render: (keywords: number) => keywords.toLocaleString(),
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
  ];

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
      title: "Headline Ideas",
      dataIndex: "headlineIdeas",
      key: "headlineIdeas",
      render: (ideas: number) => <Tag color="green">{ideas} ideas</Tag>,
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
              style={{ width: 150 }}
            >
              <Option value="US">🇺🇸 United States</Option>
              <Option value="UK">🇬🇧 United Kingdom</Option>
              <Option value="CA">🇨🇦 Canada</Option>
              <Option value="AU">🇦🇺 Australia</Option>
            </Select>
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              icon={<SearchOutlined />}
              onClick={handleSearch}
              loading={loading}
            >
              Get Content Ideas
            </Button>
          </Form.Item>
          <Form.Item>
            <Button icon={<ExportOutlined />}>Export</Button>
          </Form.Item>
        </Form>
      </Card>

      {/* Overview Stats */}
      <Row gutter={[24, 24]} className={styles.statsRow}>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Topic Ideas"
              value={topicIdeas.length}
              prefix={<BookOutlined />}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Related Topics"
              value={relatedTopics.length}
              prefix={<TrophyOutlined />}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Questions"
              value={questions.length}
              prefix={<InfoCircleOutlined />}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Total Headlines"
              value={topicIdeas.reduce(
                (sum, topic) => sum + topic.headlines.length,
                0
              )}
              prefix={<LineChartOutlined />}
            />
          </Card>
        </Col>
      </Row>

      {/* Topic Ideas Table */}
      <Card className={styles.contentCard} title="Topic Ideas">
        <Table
          dataSource={topicIdeas}
          columns={topicColumns}
          loading={loading}
          rowKey="title"
          pagination={{
            pageSize: 10,
            showTotal: (total) => `${total} topic ideas`,
          }}
          scroll={{ x: 1000 }}
        />
      </Card>

      {/* Related Topics Table */}
      <Card className={styles.contentCard} title="Related Topics">
        <Table
          dataSource={relatedTopics}
          columns={relatedTopicsColumns}
          loading={loading}
          rowKey="topic"
          pagination={{
            pageSize: 10,
            showTotal: (total) => `${total} related topics`,
          }}
        />
      </Card>

      {/* Questions Table */}
      <Card className={styles.contentCard} title="People Also Ask">
        <Table
          dataSource={questions}
          columns={questionColumns}
          loading={loading}
          rowKey="question"
          pagination={{
            pageSize: 10,
            showTotal: (total) => `${total} questions`,
          }}
          scroll={{ x: 800 }}
        />
      </Card>
    </div>
  );
};

export default TopicResearchPage;
