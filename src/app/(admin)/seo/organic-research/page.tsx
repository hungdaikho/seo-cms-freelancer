"use client";

import React, { useState, useEffect } from "react";
import {
  Card,
  Table,
  Input,
  Button,
  Select,
  Row,
  Col,
  Statistic,
  Typography,
  Tag,
  Space,
  Tooltip,
  Progress,
  Tabs,
  Form,
  message,
} from "antd";
import {
  SearchOutlined,
  ExportOutlined,
  InfoCircleOutlined,
  TrophyOutlined,
  RiseOutlined,
  FallOutlined,
} from "@ant-design/icons";
import { useSearchParams } from "next/navigation";
import { seoService } from "@/services/seo.service";
import styles from "./page.module.scss";

const { Title, Text } = Typography;
const { Option } = Select;
const { TabPane } = Tabs;

interface OrganicKeyword {
  keyword: string;
  position: number;
  previousPosition: number;
  searchVolume: number;
  trafficShare: number;
  cpc: number;
  difficulty: number;
  intent: string;
  url: string;
  features: string[];
}

interface CompetitorData {
  domain: string;
  organicKeywords: number;
  organicTraffic: number;
  avgPosition: number;
  visibility: number;
}

interface TopPage {
  url: string;
  keywords: number;
  traffic: number;
  trafficValue: number;
  topKeyword: string;
}

const OrganicResearchPage: React.FC = () => {
  const searchParams = useSearchParams();
  const projectId = searchParams.get("projectId");

  const [loading, setLoading] = useState(false);
  const [searchDomain, setSearchDomain] = useState("");
  const [selectedCountry, setSelectedCountry] = useState("US");
  const [activeTab, setActiveTab] = useState("keywords");
  const [keywordData, setKeywordData] = useState<OrganicKeyword[]>([]);
  const [competitorData, setCompetitorData] = useState<CompetitorData[]>([]);
  const [topPages, setTopPages] = useState<TopPage[]>([]);
  const [domainOverview, setDomainOverview] = useState({
    organicKeywords: 0,
    organicTraffic: 0,
    organicCost: 0,
    avgPosition: 0,
    visibility: 0,
  });

  // Fetch domain analysis from API
  const analyzeDomain = async (domain: string) => {
    if (!domain.trim()) {
      message.warning("Please enter a valid domain");
      return;
    }

    setLoading(true);
    try {
      // Domain overview API call
      const overviewResponse = await seoService.analyzeDomain(
        domain,
        selectedCountry
      );
      setDomainOverview(overviewResponse);

      // Organic keywords API call
      const keywordsResponse = await seoService.getOrganicKeywords(domain, {
        country: selectedCountry,
        limit: 100,
        sortBy: "traffic",
        sortOrder: "desc",
      });
      setKeywordData(keywordsResponse);

      // Competitors API call
      const competitorsResponse = await seoService.getDomainCompetitors(
        domain,
        {
          country: selectedCountry,
          limit: 20,
        }
      );
      setCompetitorData(competitorsResponse);

      // Top pages API call
      const topPagesResponse = await seoService.getDomainTopPages(domain, {
        country: selectedCountry,
        limit: 50,
        sortBy: "traffic",
      });
      setTopPages(topPagesResponse);

      message.success(`Analysis completed for ${domain}`);
    } catch (error) {
      console.error("Error analyzing domain:", error);
      message.error("Failed to analyze domain. Please try again.");
      // Keep empty arrays if API fails
      setKeywordData([]);
      setCompetitorData([]);
      setTopPages([]);
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

  const getPositionChange = (current: number, previous: number) => {
    const change = previous - current; // Positive = improved position
    return {
      value: Math.abs(change),
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

  const keywordColumns = [
    {
      title: "Keyword",
      dataIndex: "keyword",
      key: "keyword",
      width: 200,
      render: (text: string) => <strong>{text}</strong>,
    },
    {
      title: "Position",
      dataIndex: "position",
      key: "position",
      width: 80,
      render: (position: number, record: OrganicKeyword) => {
        const change = getPositionChange(position, record.previousPosition);
        return (
          <Space>
            <span style={{ fontWeight: "bold" }}>{position}</span>
            {change.isPositive && (
              <RiseOutlined style={{ color: "#52c41a", fontSize: "12px" }} />
            )}
            {change.isNegative && (
              <FallOutlined style={{ color: "#ff4d4f", fontSize: "12px" }} />
            )}
          </Space>
        );
      },
    },
    {
      title: "Search Volume",
      dataIndex: "searchVolume",
      key: "searchVolume",
      width: 120,
      render: (volume: number) => volume.toLocaleString(),
    },
    {
      title: "Traffic %",
      dataIndex: "trafficShare",
      key: "trafficShare",
      width: 100,
      render: (share: number) => `${share}%`,
    },
    {
      title: "CPC",
      dataIndex: "cpc",
      key: "cpc",
      width: 80,
      render: (cpc: number) => `$${cpc.toFixed(2)}`,
    },
    {
      title: "Difficulty",
      dataIndex: "difficulty",
      key: "difficulty",
      width: 100,
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
      title: "Intent",
      dataIndex: "intent",
      key: "intent",
      width: 120,
      render: (intent: string) => (
        <Tag color={getIntentColor(intent)}>{intent}</Tag>
      ),
    },
    {
      title: "SERP Features",
      dataIndex: "features",
      key: "features",
      width: 150,
      render: (features: string[]) => (
        <Space>
          {features.map((feature, index) => (
            <Tag key={index}>{feature}</Tag>
          ))}
        </Space>
      ),
    },
    {
      title: "URL",
      dataIndex: "url",
      key: "url",
      width: 200,
      render: (url: string) => (
        <Text copyable={{ text: url }} style={{ fontSize: "12px" }}>
          {url.length > 30 ? `${url.substring(0, 30)}...` : url}
        </Text>
      ),
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
      title: "Organic Keywords",
      dataIndex: "organicKeywords",
      key: "organicKeywords",
      render: (keywords: number) => keywords.toLocaleString(),
    },
    {
      title: "Organic Traffic",
      dataIndex: "organicTraffic",
      key: "organicTraffic",
      render: (traffic: number) => traffic.toLocaleString(),
    },
    {
      title: "Avg Position",
      dataIndex: "avgPosition",
      key: "avgPosition",
      render: (position: number) => position.toFixed(1),
    },
    {
      title: "Visibility %",
      dataIndex: "visibility",
      key: "visibility",
      render: (visibility: number) => `${visibility}%`,
    },
  ];

  const topPagesColumns = [
    {
      title: "URL",
      dataIndex: "url",
      key: "url",
      width: 300,
      render: (url: string) => (
        <Text copyable={{ text: url }}>
          {url.length > 50 ? `${url.substring(0, 50)}...` : url}
        </Text>
      ),
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
      title: "Traffic Value",
      dataIndex: "trafficValue",
      key: "trafficValue",
      render: (value: number) => `$${value.toLocaleString()}`,
    },
    {
      title: "Top Keyword",
      dataIndex: "topKeyword",
      key: "topKeyword",
      render: (keyword: string) => <Tag color="blue">{keyword}</Tag>,
    },
  ];

  return (
    <div className={styles.organicResearchPage}>
      {/* Header */}
      <div className={styles.header}>
        <Title level={2}>Organic Research</Title>
        <Text type="secondary">
          Discover your competitors' most valuable keywords and pages
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

      {/* Overview Stats */}
      <Row gutter={[24, 24]} className={styles.statsRow}>
        <Col xs={24} sm={12} lg={8} xl={4}>
          <Card>
            <Statistic
              title="Organic Keywords"
              value={domainOverview.organicKeywords}
              formatter={(value) => value?.toLocaleString()}
              prefix={<SearchOutlined />}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={8} xl={4}>
          <Card>
            <Statistic
              title="Organic Traffic"
              value={domainOverview.organicTraffic}
              formatter={(value) => value?.toLocaleString()}
              prefix={<TrophyOutlined />}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={8} xl={4}>
          <Card>
            <Statistic
              title="Traffic Cost"
              value={domainOverview.organicCost}
              formatter={(value) => `$${value?.toLocaleString()}`}
              prefix="$"
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={8} xl={4}>
          <Card>
            <Statistic
              title="Avg Position"
              value={domainOverview.avgPosition}
              precision={1}
              prefix={<InfoCircleOutlined />}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={8} xl={4}>
          <Card>
            <Statistic
              title="Visibility"
              value={domainOverview.visibility}
              suffix="%"
              prefix={<TrophyOutlined />}
            />
          </Card>
        </Col>
      </Row>

      {/* Main Content Tabs */}
      <Card className={styles.mainContent}>
        <Tabs activeKey={activeTab} onChange={setActiveTab}>
          <TabPane tab="Organic Keywords" key="keywords">
            <Table
              dataSource={keywordData}
              columns={keywordColumns}
              loading={loading}
              rowKey="keyword"
              pagination={{
                pageSize: 20,
                showSizeChanger: true,
                showQuickJumper: true,
                showTotal: (total) => `Total ${total} keywords`,
              }}
              scroll={{ x: 1200 }}
            />
          </TabPane>

          <TabPane tab="Competitors" key="competitors">
            <Table
              dataSource={competitorData}
              columns={competitorColumns}
              loading={loading}
              rowKey="domain"
              pagination={{
                pageSize: 10,
                showTotal: (total) => `Total ${total} competitors`,
              }}
            />
          </TabPane>

          <TabPane tab="Top Pages" key="pages">
            <Table
              dataSource={topPages}
              columns={topPagesColumns}
              loading={loading}
              rowKey="url"
              pagination={{
                pageSize: 20,
                showTotal: (total) => `Total ${total} pages`,
              }}
            />
          </TabPane>
        </Tabs>
      </Card>
    </div>
  );
};

export default OrganicResearchPage;
