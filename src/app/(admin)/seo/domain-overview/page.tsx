"use client";

import React, { useState, useEffect } from "react";
import {
  Card,
  Row,
  Col,
  Statistic,
  Typography,
  Input,
  Button,
  Select,
  Form,
  message,
  Progress,
  Tag,
  Table,
  Space,
  Tooltip,
  Divider,
} from "antd";
import {
  SearchOutlined,
  TrophyOutlined,
  LineChartOutlined,
  GlobalOutlined,
  InfoCircleOutlined,
  RiseOutlined,
  FallOutlined,
  ExportOutlined,
} from "@ant-design/icons";
import { useSearchParams } from "next/navigation";
import { seoService } from "@/services/seo.service";
import styles from "./page.module.scss";

const { Title, Text } = Typography;
const { Option } = Select;

interface DomainMetrics {
  authorityScore: number;
  organicKeywords: number;
  organicTraffic: number;
  organicCost: number;
  backlinks: number;
  referringDomains: number;
  avgPosition: number;
  visibility: number;
}

interface TopKeyword {
  keyword: string;
  position: number;
  searchVolume: number;
  trafficShare: number;
  difficulty: number;
  cpc: number;
}

interface Competitor {
  domain: string;
  authorityScore: number;
  organicKeywords: number;
  commonKeywords: number;
  competitionLevel: string;
}

interface Topic {
  topic: string;
  keywords: number;
  traffic: number;
  volume: number;
}

const DomainOverviewPage: React.FC = () => {
  const searchParams = useSearchParams();
  const projectId = searchParams.get("projectId");

  const [loading, setLoading] = useState(false);
  const [searchDomain, setSearchDomain] = useState("");
  const [selectedCountry, setSelectedCountry] = useState("US");
  const [domainMetrics, setDomainMetrics] = useState<DomainMetrics>({
    authorityScore: 0,
    organicKeywords: 0,
    organicTraffic: 0,
    organicCost: 0,
    backlinks: 0,
    referringDomains: 0,
    avgPosition: 0,
    visibility: 0,
  });

  const [topKeywords, setTopKeywords] = useState<TopKeyword[]>([]);
  const [competitors, setCompetitors] = useState<Competitor[] | any>([]);
  const [topics, setTopics] = useState<Topic[]>([]);

  // Analyze domain function
  const analyzeDomain = async (domain: string) => {
    if (!domain.trim()) {
      message.warning("Please enter a valid domain");
      return;
    }

    setLoading(true);
    try {
      // Get domain overview
      const overviewResponse = await seoService.getDomainOverview(domain, {
        country: selectedCountry,
        includeSubdomains: false,
      });
      setDomainMetrics(overviewResponse);

      // Get top keywords
      const keywordsResponse = await seoService.getDomainTopKeywords(domain, {
        country: selectedCountry,
        limit: 50,
      });
      setTopKeywords(keywordsResponse);

      // Get competitors
      const competitorsResponse = await seoService.getDomainCompetitors(
        domain,
        {
          country: selectedCountry,
          limit: 10,
        }
      );
      setCompetitors(competitorsResponse);

      message.success(`Domain analysis completed for ${domain}`);
    } catch (error) {
      console.error("Error analyzing domain:", error);
      message.error("Failed to analyze domain. Please try again.");
      // Reset to empty state on error
      setDomainMetrics({
        authorityScore: 0,
        organicKeywords: 0,
        organicTraffic: 0,
        organicCost: 0,
        backlinks: 0,
        referringDomains: 0,
        avgPosition: 0,
        visibility: 0,
      });
      setTopKeywords([]);
      setCompetitors([]);
      setTopics([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (projectId) {
      // Auto-load data when project is selected
      // This could be enhanced to remember last analyzed domain
    }
  }, [projectId]);

  const handleSearch = () => {
    analyzeDomain(searchDomain);
  };

  const getAuthorityScoreColor = (score: number) => {
    if (score >= 80) return "#52c41a";
    if (score >= 60) return "#faad14";
    if (score >= 40) return "#fa8c16";
    return "#ff4d4f";
  };

  const getCompetitionColor = (level: string) => {
    const colors = {
      High: "red",
      Medium: "orange",
      Low: "green",
    };
    return colors[level as keyof typeof colors] || "default";
  };

  const keywordColumns = [
    {
      title: "Keyword",
      dataIndex: "keyword",
      key: "keyword",
      render: (text: string) => <strong>{text}</strong>,
    },
    {
      title: "Position",
      dataIndex: "position",
      key: "position",
      render: (position: number) => (
        <span
          style={{
            fontWeight: "bold",
            color: position <= 10 ? "#52c41a" : "#faad14",
          }}
        >
          {position}
        </span>
      ),
    },
    {
      title: "Search Volume",
      dataIndex: "searchVolume",
      key: "searchVolume",
      render: (volume: number) => volume.toLocaleString(),
    },
    {
      title: "Traffic %",
      dataIndex: "trafficShare",
      key: "trafficShare",
      render: (share: number) => `${share}%`,
    },
    {
      title: "Difficulty",
      dataIndex: "difficulty",
      key: "difficulty",
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
          showInfo={false}
        />
      ),
    },
    {
      title: "CPC",
      dataIndex: "cpc",
      key: "cpc",
      render: (cpc: number) => `$${cpc.toFixed(2)}`,
    },
  ];

  const competitorColumns = [
    {
      title: "Domain",
      dataIndex: "domain",
      key: "domain",
      render: (domain: string) => <strong>{domain}</strong>,
    },
    {
      title: "Authority Score",
      dataIndex: "authorityScore",
      key: "authorityScore",
      render: (score: number) => (
        <span
          style={{ color: getAuthorityScoreColor(score), fontWeight: "bold" }}
        >
          {score}
        </span>
      ),
    },
    {
      title: "Organic Keywords",
      dataIndex: "organicKeywords",
      key: "organicKeywords",
      render: (keywords: number) => keywords.toLocaleString(),
    },
    {
      title: "Common Keywords",
      dataIndex: "commonKeywords",
      key: "commonKeywords",
      render: (keywords: number) => keywords.toLocaleString(),
    },
    {
      title: "Competition Level",
      dataIndex: "competitionLevel",
      key: "competitionLevel",
      render: (level: string) => (
        <Tag color={getCompetitionColor(level)}>{level}</Tag>
      ),
    },
  ];

  const topicColumns = [
    {
      title: "Topic",
      dataIndex: "topic",
      key: "topic",
      render: (text: string) => <strong>{text}</strong>,
    },
    {
      title: "Keywords",
      dataIndex: "keywords",
      key: "keywords",
      render: (keywords: number) => keywords.toLocaleString(),
    },
    {
      title: "Traffic",
      dataIndex: "traffic",
      key: "traffic",
      render: (traffic: number) => traffic.toLocaleString(),
    },
    {
      title: "Search Volume",
      dataIndex: "volume",
      key: "volume",
      render: (volume: number) => volume.toLocaleString(),
    },
  ];

  return (
    <div className={styles.domainOverviewPage}>
      {/* Header */}
      <div className={styles.header}>
        <Title level={2}>Domain Overview</Title>
        <Text type="secondary">
          Get a complete picture of any domain's online performance
        </Text>
      </div>

      {/* Search Section */}
      <Card className={styles.searchCard}>
        <Form layout="inline" onFinish={handleSearch}>
          <Form.Item>
            <Input
              value={searchDomain}
              onChange={(e) => setSearchDomain(e.target.value)}
              placeholder="Enter domain (e.g., example.com)"
              style={{ width: 300 }}
              prefix={<SearchOutlined />}
            />
          </Form.Item>
          <Form.Item>
            <Select
              value={selectedCountry}
              onChange={setSelectedCountry}
              style={{ width: 150 }}
            >
              <Option value="US">United States</Option>
              <Option value="UK">United Kingdom</Option>
              <Option value="CA">Canada</Option>
              <Option value="AU">Australia</Option>
            </Select>
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              icon={<SearchOutlined />}
              onClick={handleSearch}
              loading={loading}
            >
              Analyze
            </Button>
          </Form.Item>
          <Form.Item>
            <Button icon={<ExportOutlined />}>Export</Button>
          </Form.Item>
        </Form>
      </Card>

      {/* Domain Metrics Overview */}
      <Row gutter={[24, 24]} className={styles.metricsRow}>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title={
                <Space>
                  Authority Score
                  <Tooltip title="Authority Score is a metric that measures the overall quality and SEO power of a domain">
                    <InfoCircleOutlined />
                  </Tooltip>
                </Space>
              }
              value={domainMetrics.authorityScore}
              suffix="/100"
              valueStyle={{
                color: getAuthorityScoreColor(domainMetrics.authorityScore),
              }}
              prefix={<TrophyOutlined />}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Organic Keywords"
              value={domainMetrics.organicKeywords}
              formatter={(value) => value?.toLocaleString()}
              prefix={<SearchOutlined />}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Organic Traffic"
              value={domainMetrics.organicTraffic}
              formatter={(value) => value?.toLocaleString()}
              prefix={<LineChartOutlined />}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Traffic Cost"
              value={domainMetrics.organicCost}
              formatter={(value) => `$${value?.toLocaleString()}`}
              prefix="$"
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Backlinks"
              value={domainMetrics.backlinks}
              formatter={(value) => value?.toLocaleString()}
              prefix={<GlobalOutlined />}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Referring Domains"
              value={domainMetrics.referringDomains}
              formatter={(value) => value?.toLocaleString()}
              prefix={<GlobalOutlined />}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Avg Position"
              value={domainMetrics.avgPosition}
              precision={1}
              prefix={<InfoCircleOutlined />}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Visibility"
              value={domainMetrics.visibility}
              suffix="%"
              prefix={<TrophyOutlined />}
            />
          </Card>
        </Col>
      </Row>

      {/* Top Keywords Section */}
      <Card className={styles.contentCard} title="Top Organic Keywords">
        <Table
          dataSource={topKeywords}
          columns={keywordColumns}
          loading={loading}
          rowKey="keyword"
          pagination={{
            pageSize: 10,
            showTotal: (total) => `Top ${total} keywords`,
          }}
        />
      </Card>

      {/* Main Competitors Section */}
      <Card className={styles.contentCard} title="Main Organic Competitors">
        <Table
          dataSource={competitors}
          columns={competitorColumns}
          loading={loading}
          rowKey="domain"
          pagination={{
            pageSize: 10,
            showTotal: (total) => `Top ${total} competitors`,
          }}
        />
      </Card>

      {/* Top Topics Section */}
      <Card className={styles.contentCard} title="Top Organic Topics">
        <Table
          dataSource={topics}
          columns={topicColumns}
          loading={loading}
          rowKey="topic"
          pagination={{
            pageSize: 10,
            showTotal: (total) => `Top ${total} topics`,
          }}
        />
      </Card>
    </div>
  );
};

export default DomainOverviewPage;
