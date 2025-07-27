"use client";

import React, { useEffect, useState } from "react";
import {
  Card,
  Row,
  Col,
  Button,
  Input,
  Select,
  Typography,
  Table,
  Tag,
  Space,
  Alert,
  Statistic,
  Progress,
  Tooltip,
  message,
  Tabs,
  List,
  Badge,
  Empty,
} from "antd";
import {
  SearchOutlined,
  PlusOutlined,
  TrophyOutlined,
  RiseOutlined,
  FallOutlined,
  EyeOutlined,
  ThunderboltOutlined,
  BulbOutlined,
  DeleteOutlined,
  DownloadOutlined,
} from "@ant-design/icons";
import { useAppDispatch, useAppSelector } from "@/stores/hooks";
import { fetchProjects } from "@/stores/slices/project.slice";
import { Project } from "@/types/api.type";
import styles from "./keyword_gap_analyzer.module.scss";

const { Title, Text } = Typography;
const { Option } = Select;
const { TabPane } = Tabs;

interface KeywordGap {
  keyword: string;
  searchVolume: number;
  difficulty: number;
  cpc: number;
  intent: "informational" | "navigational" | "commercial" | "transactional";
  opportunity: "easy-win" | "content-gap" | "quick-win" | "long-term";
  competitorRankings: Record<string, number>;
  yourRanking?: number;
  potentialTraffic: number;
}

interface CompetitorDomain {
  domain: string;
  totalKeywords: number;
  organicTraffic: number;
  averagePosition: number;
}

const mockKeywordGaps: KeywordGap[] = [
  {
    keyword: "seo audit tool",
    searchVolume: 8900,
    difficulty: 45,
    cpc: 12.5,
    intent: "commercial",
    opportunity: "easy-win",
    competitorRankings: {
      "competitor1.com": 3,
      "competitor2.com": 7,
      "competitor3.com": 12,
    },
    potentialTraffic: 1200,
  },
  {
    keyword: "keyword research tools",
    searchVolume: 15600,
    difficulty: 68,
    cpc: 18.3,
    intent: "commercial",
    opportunity: "content-gap",
    competitorRankings: {
      "competitor1.com": 1,
      "competitor2.com": 4,
      "competitor3.com": 8,
    },
    potentialTraffic: 2800,
  },
  {
    keyword: "how to improve seo ranking",
    searchVolume: 22400,
    difficulty: 32,
    cpc: 4.2,
    intent: "informational",
    opportunity: "quick-win",
    competitorRankings: {
      "competitor1.com": 2,
      "competitor2.com": 9,
      "competitor3.com": 15,
    },
    potentialTraffic: 3200,
  },
];

const mockCompetitors: CompetitorDomain[] = [
  {
    domain: "competitor1.com",
    totalKeywords: 15678,
    organicTraffic: 234000,
    averagePosition: 12.4,
  },
  {
    domain: "competitor2.com",
    totalKeywords: 12456,
    organicTraffic: 189000,
    averagePosition: 15.7,
  },
  {
    domain: "competitor3.com",
    totalKeywords: 9834,
    organicTraffic: 156000,
    averagePosition: 18.2,
  },
];

const KeywordGapAnalyzer: React.FC = () => {
  const dispatch = useAppDispatch();
  const { projects } = useAppSelector((state) => state.project);

  const [selectedProject, setSelectedProject] = useState<string>("");
  const [competitors, setCompetitors] = useState<string[]>([]);
  const [newCompetitor, setNewCompetitor] = useState("");
  const [keywordGaps, setKeywordGaps] = useState<KeywordGap[]>([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [activeTab, setActiveTab] = useState("gaps");
  const [filters, setFilters] = useState({
    difficulty: [0, 100] as [number, number],
    volume: [0, 100000] as [number, number],
    intent: "all" as string,
    opportunity: "all" as string,
  });

  useEffect(() => {
    dispatch(fetchProjects());
  }, [dispatch]);

  useEffect(() => {
    if (projects.length > 0 && !selectedProject) {
      setSelectedProject(projects[0].id);
    }
  }, [projects, selectedProject]);

  const addCompetitor = () => {
    if (newCompetitor && !competitors.includes(newCompetitor)) {
      if (competitors.length >= 5) {
        message.warning("Maximum 5 competitors allowed");
        return;
      }
      setCompetitors([...competitors, newCompetitor]);
      setNewCompetitor("");
    }
  };

  const removeCompetitor = (domain: string) => {
    setCompetitors(competitors.filter((c) => c !== domain));
  };

  const startAnalysis = async () => {
    if (competitors.length === 0) {
      message.error("Please add at least one competitor");
      return;
    }

    setIsAnalyzing(true);

    // Simulate analysis
    await new Promise((resolve) => setTimeout(resolve, 3000));

    setKeywordGaps(mockKeywordGaps);
    setIsAnalyzing(false);
    setActiveTab("gaps");
    message.success(`Found ${mockKeywordGaps.length} keyword opportunities!`);
  };

  const getOpportunityColor = (opportunity: string) => {
    switch (opportunity) {
      case "easy-win":
        return "green";
      case "quick-win":
        return "blue";
      case "content-gap":
        return "orange";
      case "long-term":
        return "purple";
      default:
        return "default";
    }
  };

  const getIntentColor = (intent: string) => {
    switch (intent) {
      case "commercial":
        return "gold";
      case "transactional":
        return "red";
      case "informational":
        return "blue";
      case "navigational":
        return "green";
      default:
        return "default";
    }
  };

  const getDifficultyColor = (difficulty: number) => {
    if (difficulty <= 30) return "#52c41a";
    if (difficulty <= 60) return "#faad14";
    return "#ff4d4f";
  };

  const gapColumns = [
    {
      title: "Keyword",
      dataIndex: "keyword",
      key: "keyword",
      width: 200,
      render: (keyword: string, record: KeywordGap) => (
        <div className={styles.keywordCell}>
          <Text strong>{keyword}</Text>
          <div className={styles.keywordMeta}>
            <Tag color={getIntentColor(record.intent)}>{record.intent}</Tag>
            <Tag color={getOpportunityColor(record.opportunity)}>
              {record.opportunity}
            </Tag>
          </div>
        </div>
      ),
    },
    {
      title: "Search Volume",
      dataIndex: "searchVolume",
      key: "searchVolume",
      width: 120,
      sorter: (a: KeywordGap, b: KeywordGap) => a.searchVolume - b.searchVolume,
      render: (volume: number) => (
        <Space direction="vertical" size={0}>
          <Text strong>{volume.toLocaleString()}</Text>
          <EyeOutlined style={{ color: "#1890ff" }} />
        </Space>
      ),
    },
    {
      title: "Difficulty",
      dataIndex: "difficulty",
      key: "difficulty",
      width: 120,
      sorter: (a: KeywordGap, b: KeywordGap) => a.difficulty - b.difficulty,
      render: (difficulty: number) => (
        <div className={styles.difficultyCell}>
          <Progress
            percent={difficulty}
            size="small"
            strokeColor={getDifficultyColor(difficulty)}
            showInfo={false}
            style={{ width: 60 }}
          />
          <Text
            style={{ marginLeft: 8, color: getDifficultyColor(difficulty) }}
          >
            {difficulty}%
          </Text>
        </div>
      ),
    },
    {
      title: "CPC",
      dataIndex: "cpc",
      key: "cpc",
      width: 100,
      sorter: (a: KeywordGap, b: KeywordGap) => a.cpc - b.cpc,
      render: (cpc: number) => `$${cpc.toFixed(2)}`,
    },
    {
      title: "Competitor Positions",
      key: "competitors",
      width: 200,
      render: (_: any, record: KeywordGap) => (
        <div className={styles.competitorPositions}>
          {Object.entries(record.competitorRankings).map(
            ([domain, position]) => (
              <div key={domain} className={styles.competitorPosition}>
                <Text type="secondary" ellipsis style={{ maxWidth: 100 }}>
                  {domain}
                </Text>
                <Badge
                  count={position}
                  color={
                    position <= 3 ? "green" : position <= 10 ? "orange" : "red"
                  }
                />
              </div>
            )
          )}
        </div>
      ),
    },
    {
      title: "Potential Traffic",
      dataIndex: "potentialTraffic",
      key: "potentialTraffic",
      width: 120,
      sorter: (a: KeywordGap, b: KeywordGap) =>
        a.potentialTraffic - b.potentialTraffic,
      render: (traffic: number) => (
        <Text strong style={{ color: "#52c41a" }}>
          +{traffic.toLocaleString()}
        </Text>
      ),
    },
    {
      title: "Actions",
      key: "actions",
      width: 120,
      render: (_: any, record: KeywordGap) => (
        <Space>
          <Tooltip title="Add to keyword list">
            <Button size="small" type="primary" icon={<PlusOutlined />} />
          </Tooltip>
          <Tooltip title="Analyze SERP">
            <Button size="small" icon={<SearchOutlined />} />
          </Tooltip>
        </Space>
      ),
    },
  ];

  const competitorColumns = [
    {
      title: "Domain",
      dataIndex: "domain",
      key: "domain",
      render: (domain: string) => <Text strong>{domain}</Text>,
    },
    {
      title: "Total Keywords",
      dataIndex: "totalKeywords",
      key: "totalKeywords",
      render: (count: number) => count.toLocaleString(),
    },
    {
      title: "Organic Traffic",
      dataIndex: "organicTraffic",
      key: "organicTraffic",
      render: (traffic: number) => `${(traffic / 1000).toFixed(0)}K`,
    },
    {
      title: "Avg. Position",
      dataIndex: "averagePosition",
      key: "averagePosition",
      render: (position: number) => position.toFixed(1),
    },
  ];

  if (!selectedProject) {
    return (
      <div className={styles.noProject}>
        <Card>
          <div style={{ textAlign: "center", padding: "40px" }}>
            <Title level={3}>No Project Selected</Title>
            <Text type="secondary">
              Please select a project to analyze keyword gaps
            </Text>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className={styles.keywordGapAnalyzer}>
      {/* Header */}
      <div className={styles.header}>
        <div className={styles.titleSection}>
          <Title level={2}>Keyword Gap Analysis</Title>
          <Text type="secondary">
            Discover keyword opportunities your competitors rank for
          </Text>
        </div>
        <div className={styles.headerActions}>
          <Select
            placeholder="Select a project"
            style={{ width: 250 }}
            value={selectedProject}
            onChange={setSelectedProject}
          >
            {projects.map((project: Project) => (
              <Option key={project.id} value={project.id}>
                {project.name} ({project.domain})
              </Option>
            ))}
          </Select>
        </div>
      </div>

      {/* Competitor Setup */}
      <Card title="Competitor Setup" className={styles.setupCard}>
        <Row gutter={16} align="middle">
          <Col span={12}>
            <Space.Compact style={{ width: "100%" }}>
              <Input
                placeholder="Enter competitor domain (e.g., competitor.com)"
                value={newCompetitor}
                onChange={(e) => setNewCompetitor(e.target.value)}
                onPressEnter={addCompetitor}
              />
              <Button
                type="primary"
                onClick={addCompetitor}
                icon={<PlusOutlined />}
              >
                Add
              </Button>
            </Space.Compact>
          </Col>
          <Col span={12}>
            <Button
              type="primary"
              icon={<SearchOutlined />}
              onClick={startAnalysis}
              loading={isAnalyzing}
              disabled={competitors.length === 0}
              size="large"
            >
              {isAnalyzing ? "Analyzing..." : "Start Analysis"}
            </Button>
          </Col>
        </Row>

        {competitors.length > 0 && (
          <div className={styles.competitorList}>
            <Title level={5}>Selected Competitors:</Title>
            <Space wrap>
              {competitors.map((competitor) => (
                <Tag
                  key={competitor}
                  closable
                  onClose={() => removeCompetitor(competitor)}
                  color="blue"
                >
                  {competitor}
                </Tag>
              ))}
            </Space>
          </div>
        )}
      </Card>

      {/* Analysis Results */}
      {keywordGaps.length > 0 && (
        <Tabs
          activeKey={activeTab}
          onChange={setActiveTab}
          className={styles.resultTabs}
        >
          <TabPane tab={`Keyword Gaps (${keywordGaps.length})`} key="gaps">
            {/* Summary Stats */}
            <Row gutter={16} className={styles.summaryStats}>
              <Col span={6}>
                <Card>
                  <Statistic
                    title="Total Opportunities"
                    value={keywordGaps.length}
                    prefix={<BulbOutlined />}
                    valueStyle={{ color: "#1890ff" }}
                  />
                </Card>
              </Col>
              <Col span={6}>
                <Card>
                  <Statistic
                    title="Potential Traffic"
                    value={keywordGaps.reduce(
                      (sum, gap) => sum + gap.potentialTraffic,
                      0
                    )}
                    prefix={<RiseOutlined />}
                    valueStyle={{ color: "#52c41a" }}
                  />
                </Card>
              </Col>
              <Col span={6}>
                <Card>
                  <Statistic
                    title="Easy Wins"
                    value={
                      keywordGaps.filter(
                        (gap) => gap.opportunity === "easy-win"
                      ).length
                    }
                    prefix={<TrophyOutlined />}
                    valueStyle={{ color: "#52c41a" }}
                  />
                </Card>
              </Col>
              <Col span={6}>
                <Card>
                  <Statistic
                    title="Avg. Difficulty"
                    value={Math.round(
                      keywordGaps.reduce(
                        (sum, gap) => sum + gap.difficulty,
                        0
                      ) / keywordGaps.length
                    )}
                    suffix="%"
                    prefix={<ThunderboltOutlined />}
                    valueStyle={{ color: "#faad14" }}
                  />
                </Card>
              </Col>
            </Row>

            {/* Keywords Table */}
            <Card
              title="Keyword Opportunities"
              extra={<Button icon={<DownloadOutlined />}>Export CSV</Button>}
            >
              <Table
                columns={gapColumns}
                dataSource={keywordGaps}
                rowKey="keyword"
                pagination={{
                  pageSize: 10,
                  showTotal: (total) => `Total ${total} opportunities`,
                }}
                scroll={{ x: 1200 }}
              />
            </Card>
          </TabPane>

          <TabPane tab="Competitor Overview" key="competitors">
            <Card title="Competitor Analysis">
              <Table
                columns={competitorColumns}
                dataSource={mockCompetitors}
                rowKey="domain"
                pagination={false}
              />
            </Card>
          </TabPane>
        </Tabs>
      )}

      {/* Empty State */}
      {keywordGaps.length === 0 && !isAnalyzing && (
        <Card className={styles.emptyState}>
          <Empty
            description="No analysis results yet"
            image={Empty.PRESENTED_IMAGE_SIMPLE}
          >
            <Text type="secondary">
              Add competitors and start analysis to discover keyword
              opportunities
            </Text>
          </Empty>
        </Card>
      )}

      {/* Loading State */}
      {isAnalyzing && (
        <Card className={styles.loadingState}>
          <div style={{ textAlign: "center", padding: "40px" }}>
            <Title level={4}>Analyzing Keyword Gaps...</Title>
            <Text type="secondary">
              Comparing your domain with {competitors.length} competitors
            </Text>
            <div style={{ marginTop: 24 }}>
              <Progress percent={75} status="active" />
            </div>
          </div>
        </Card>
      )}
    </div>
  );
};

export default KeywordGapAnalyzer;
