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
  Badge,
  Empty,
  Slider,
} from "antd";
import {
  SearchOutlined,
  PlusOutlined,
  TrophyOutlined,
  RiseOutlined,
  EyeOutlined,
  ThunderboltOutlined,
  BulbOutlined,
  DownloadOutlined,
  ReloadOutlined,
} from "@ant-design/icons";
import { useAppDispatch, useAppSelector } from "@/stores/hooks";
import { fetchProjects } from "@/stores/slices/project.slice";
import { useKeywordGap } from "@/stores/hooks/useKeywordGap";
import { Project } from "@/types/api.type";
import { KeywordData } from "@/services/keyword-gap.service";
import styles from "./keyword_gap_analyzer.module.scss";

const { Title, Text } = Typography;
const { Option } = Select;
const { TabPane } = Tabs;
const KeywordGapAnalyzer: React.FC = () => {
  const dispatch = useAppDispatch();
  const { projects } = useAppSelector((state) => state.project);
  const keywordGap = useKeywordGap();
  const [selectedProject, setSelectedProject] = useState<string>("");
  const [newCompetitor, setNewCompetitor] = useState("");
  const [seedKeyword, setSeedKeyword] = useState("");
  useEffect(() => {
    dispatch(fetchProjects());
  }, [dispatch]);

  useEffect(() => {
    if (projects.length > 0 && !selectedProject) {
      setSelectedProject(projects[0].id);
    }
  }, [projects, selectedProject]);

  const addCompetitor = () => {
    if (
      newCompetitor &&
      !keywordGap.selectedCompetitors.includes(newCompetitor)
    ) {
      if (keywordGap.selectedCompetitors.length >= 5) {
        message.warning("Maximum 5 competitors allowed");
        return;
      }
      keywordGap.actions.addCompetitor(newCompetitor);
      setNewCompetitor("");
    }
  };

  const removeCompetitor = (domain: string) => {
    keywordGap.actions.removeCompetitor(domain);
  };

  const startAnalysis = async () => {
    if (!keywordGap.computed.canStartAnalysis) {
      message.error("Please add at least one competitor");
      return;
    }

    if (!seedKeyword.trim()) {
      message.error("Please enter a seed keyword");
      return;
    }

    const selectedProjectData = projects.find((p) => p.id === selectedProject);
    if (!selectedProjectData) {
      message.error("Please select a valid project");
      return;
    }

    try {
      await keywordGap.actions.analyzeGaps({
        seedKeyword: seedKeyword.trim(),
        competitorDomains: keywordGap.selectedCompetitors,
        includeCompetitorKeywords: true,
        location: "US",
        language: "en",
        minVolume: 100,
        limitPerCategory: 100,
      });

      keywordGap.actions.setActiveTab("gaps");
      message.success(
        `Found ${keywordGap.totalOpportunities} keyword opportunities!`
      );
    } catch (error) {
      console.error("Analysis failed:", error);
    }
  };

  const discoverCompetitors = async () => {
    const selectedProjectData = projects.find((p) => p.id === selectedProject);
    if (!selectedProjectData?.domain) {
      message.error("Please select a project with a valid domain");
      return;
    }

    try {
      await keywordGap.actions.discoverCompetitors(
        selectedProjectData.domain,
        "US",
        10
      );
      message.success(
        "Competitors discovered! Check the Competitor Discovery tab."
      );
    } catch (error) {
      console.error("Competitor discovery failed:", error);
    }
  };

  // Update filters
  const updateFilters = (newFilters: any) => {
    keywordGap.actions.updateFilters(newFilters);
  };

  const exportKeywordGaps = () => {
    keywordGap.actions.exportKeywordGaps();
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
      render: (keyword: string, record: KeywordData) => (
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
      sorter: (a: KeywordData, b: KeywordData) =>
        a.searchVolume - b.searchVolume,
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
      sorter: (a: KeywordData, b: KeywordData) => a.difficulty - b.difficulty,
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
      sorter: (a: KeywordData, b: KeywordData) => a.cpc - b.cpc,
      render: (cpc: number) => `$${cpc.toFixed(2)}`,
    },
    {
      title: "Competitor Positions",
      key: "competitors",
      width: 200,
      render: (_: any, record: KeywordData) => (
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
      sorter: (a: KeywordData, b: KeywordData) =>
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
      render: (_: any, record: KeywordData) => (
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
      title: "Common Keywords",
      dataIndex: "commonKeywords",
      key: "commonKeywords",
      sorter: (a: any, b: any) => a.commonKeywords - b.commonKeywords,
      render: (count: number) => count?.toLocaleString() || "N/A",
    },
    {
      title: "Total Keywords",
      dataIndex: "keywords",
      key: "keywords",
      sorter: (a: any, b: any) => a.keywords - b.keywords,
      render: (count: number) => (
        <Text strong style={{ color: "#1890ff" }}>
          {count?.toLocaleString() || "N/A"}
        </Text>
      ),
    },
    {
      title: "Traffic",
      dataIndex: "traffic",
      key: "traffic",
      sorter: (a: any, b: any) => a.traffic - b.traffic,
      render: (traffic: number) => (
        <Text strong style={{ color: "#52c41a" }}>
          {traffic?.toLocaleString() || "N/A"}
        </Text>
      ),
    },
    {
      title: "Competition Level",
      dataIndex: "competitionLevel",
      key: "competitionLevel",
      sorter: (a: any, b: any) => a.competitionLevel - b.competitionLevel,
      render: (level: number) => (
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <Progress
            percent={level}
            size="small"
            strokeColor={
              level >= 70 ? "#ff4d4f" : level >= 40 ? "#faad14" : "#52c41a"
            }
            showInfo={false}
            style={{ width: 60, minWidth: 60 }}
          />
          <Text
            style={{
              color:
                level >= 70 ? "#ff4d4f" : level >= 40 ? "#faad14" : "#52c41a",
              fontSize: "12px",
            }}
          >
            {level}%
          </Text>
        </div>
      ),
    },
    {
      title: "Top Keyword",
      dataIndex: "topKeyword",
      key: "topKeyword",
      width: 150,
      render: (keyword: string) => (
        <Text ellipsis style={{ maxWidth: 120 }} title={keyword}>
          {keyword || "N/A"}
        </Text>
      ),
    },
    {
      title: "Actions",
      key: "actions",
      width: 120,
      render: (_: any, record: any) => (
        <Space>
          <Tooltip title="Add as competitor">
            <Button
              size="small"
              type="primary"
              icon={<PlusOutlined />}
              onClick={() => {
                if (!keywordGap.selectedCompetitors.includes(record.domain)) {
                  keywordGap.actions.addCompetitor(record.domain);
                  message.success(`Added ${record.domain} as competitor`);
                } else {
                  message.warning(`${record.domain} is already added`);
                }
              }}
              disabled={keywordGap.selectedCompetitors.includes(record.domain)}
            />
          </Tooltip>
          <Tooltip title="Analyze domain">
            <Button size="small" icon={<SearchOutlined />} />
          </Tooltip>
        </Space>
      ),
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
        <Row gutter={16} style={{ marginBottom: 16 }}>
          <Col span={12}>
            <Input
              placeholder="Enter seed keyword (e.g., seo tools)"
              value={seedKeyword}
              onChange={(e) => setSeedKeyword(e.target.value)}
              size="large"
            />
          </Col>
          <Col span={12}>
            <Button
              type="primary"
              icon={<ReloadOutlined />}
              onClick={discoverCompetitors}
              loading={keywordGap.isDiscoveringCompetitors}
              disabled={!selectedProject}
            >
              Discover Competitors
            </Button>
          </Col>
        </Row>

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
              loading={keywordGap.isAnalyzing}
              disabled={
                !keywordGap.computed.canStartAnalysis || !seedKeyword.trim()
              }
              size="large"
            >
              {keywordGap.isAnalyzing ? "Analyzing..." : "Start Analysis"}
            </Button>
          </Col>
        </Row>

        {keywordGap.selectedCompetitors.length > 0 && (
          <div className={styles.competitorList}>
            <Title level={5}>Selected Competitors:</Title>
            <Space wrap>
              {keywordGap.selectedCompetitors.map((competitor) => (
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

        {/* Errors */}
        {keywordGap.computed.hasErrors && (
          <Alert
            message="Analysis Error"
            description={keywordGap.analysisError || keywordGap.discoveryError}
            type="error"
            closable
            onClose={keywordGap.actions.clearErrors}
            style={{ marginTop: 16 }}
          />
        )}
      </Card>

      {/* Analysis Results */}
      {(keywordGap.computed.hasOpportunities ||
        keywordGap.competitorDiscovery) && (
        <Tabs
          activeKey={keywordGap.activeTab}
          onChange={keywordGap.actions.setActiveTab}
          className={styles.resultTabs}
        >
          <TabPane
            tab={`Keyword Gaps (${keywordGap.totalOpportunities})`}
            key="gaps"
          >
            {/* Summary Stats */}
            <Row gutter={16} className={styles.summaryStats}>
              <Col span={6}>
                <Card>
                  <Statistic
                    title="Total Opportunities"
                    value={keywordGap.totalOpportunities}
                    prefix={<BulbOutlined />}
                    valueStyle={{ color: "#1890ff" }}
                  />
                </Card>
              </Col>
              <Col span={6}>
                <Card>
                  <Statistic
                    title="Potential Traffic"
                    value={keywordGap.potentialTraffic}
                    prefix={<RiseOutlined />}
                    valueStyle={{ color: "#52c41a" }}
                  />
                </Card>
              </Col>
              <Col span={6}>
                <Card>
                  <Statistic
                    title="Easy Wins"
                    value={keywordGap.computed.easyWinCount}
                    prefix={<TrophyOutlined />}
                    valueStyle={{ color: "#52c41a" }}
                  />
                </Card>
              </Col>
              <Col span={6}>
                <Card>
                  <Statistic
                    title="Avg. Difficulty"
                    value={keywordGap.computed.averageDifficulty}
                    suffix="%"
                    prefix={<ThunderboltOutlined />}
                    valueStyle={{ color: "#faad14" }}
                  />
                </Card>
              </Col>
            </Row>

            {/* Filters */}
            <Card title="Filters" style={{ marginBottom: 16 }}>
              <Row gutter={16}>
                <Col span={6}>
                  <div>
                    <Text strong>Difficulty Range</Text>
                    <Slider
                      range
                      defaultValue={keywordGap.filters.difficulty}
                      onChange={(value) =>
                        updateFilters({ difficulty: value as [number, number] })
                      }
                      style={{ marginTop: 8 }}
                    />
                  </div>
                </Col>
                <Col span={6}>
                  <div>
                    <Text strong>Volume Range</Text>
                    <Slider
                      range
                      min={0}
                      max={100000}
                      step={1000}
                      defaultValue={keywordGap.filters.volume}
                      onChange={(value) =>
                        updateFilters({ volume: value as [number, number] })
                      }
                      style={{ marginTop: 8 }}
                    />
                  </div>
                </Col>
                <Col span={6}>
                  <div>
                    <Text strong>Intent</Text>
                    <Select
                      value={keywordGap.filters.intent}
                      onChange={(value) => updateFilters({ intent: value })}
                      style={{ width: "100%", marginTop: 8 }}
                    >
                      <Option value="all">All Intent</Option>
                      <Option value="informational">Informational</Option>
                      <Option value="commercial">Commercial</Option>
                      <Option value="transactional">Transactional</Option>
                      <Option value="navigational">Navigational</Option>
                    </Select>
                  </div>
                </Col>
                <Col span={6}>
                  <div>
                    <Text strong>Opportunity</Text>
                    <Select
                      value={keywordGap.filters.opportunity}
                      onChange={(value) =>
                        updateFilters({ opportunity: value })
                      }
                      style={{ width: "100%", marginTop: 8 }}
                    >
                      <Option value="all">All Opportunities</Option>
                      <Option value="easy-win">Easy Win</Option>
                      <Option value="quick-win">Quick Win</Option>
                      <Option value="content-gap">Content Gap</Option>
                      <Option value="long-term">Long Term</Option>
                    </Select>
                  </div>
                </Col>
              </Row>
            </Card>

            {/* Keywords Table */}
            <Card title="Keyword Opportunities">
              <Table
                columns={gapColumns}
                dataSource={keywordGap.keywordOpportunities}
                rowKey="keyword"
                pagination={{
                  pageSize: 10,
                  showTotal: (total) => `Total ${total} opportunities`,
                }}
                scroll={{ x: 1200 }}
              />
            </Card>
          </TabPane>

          <TabPane
            tab={`Competitor Discovery ${
              keywordGap.competitorDiscovery &&
              keywordGap.competitorDiscovery.data
                ? `(${keywordGap.competitorDiscovery.data.length})`
                : ""
            }`}
            key="discovery"
          >
            {keywordGap.competitorDiscovery &&
              keywordGap.competitorDiscovery.data && (
                <>
                  {/* Competitor Discovery Summary */}
                  <Row gutter={16} style={{ marginBottom: 16 }}>
                    <Col span={6}>
                      <Card>
                        <Statistic
                          title="Target Domain"
                          value={
                            (keywordGap.competitorDiscovery as any)
                              .targetDomain ||
                            keywordGap.competitorDiscovery.domain ||
                            "N/A"
                          }
                          prefix={<SearchOutlined />}
                          valueStyle={{ color: "#1890ff", fontSize: "14px" }}
                        />
                      </Card>
                    </Col>
                    <Col span={6}>
                      <Card>
                        <Statistic
                          title="Competitors Found"
                          value={
                            (keywordGap.competitorDiscovery as any).total ||
                            keywordGap.competitorDiscovery.totalCompetitors ||
                            keywordGap.competitorDiscovery.data.length
                          }
                          prefix={<TrophyOutlined />}
                          valueStyle={{ color: "#52c41a" }}
                        />
                      </Card>
                    </Col>
                    <Col span={6}>
                      <Card>
                        <Statistic
                          title="Location"
                          value={
                            (keywordGap.competitorDiscovery as any).country ||
                            "US"
                          }
                          prefix={<EyeOutlined />}
                          valueStyle={{ color: "#faad14" }}
                        />
                      </Card>
                    </Col>
                    <Col span={6}>
                      <Card>
                        <Statistic
                          title="Avg Competition"
                          value={Math.round(
                            keywordGap.competitorDiscovery.data.reduce(
                              (acc: number, competitor: any) =>
                                acc + (competitor.competitionLevel || 0),
                              0
                            ) / keywordGap.competitorDiscovery.data.length
                          )}
                          suffix="%"
                          prefix={<ThunderboltOutlined />}
                          valueStyle={{ color: "#ff4d4f" }}
                        />
                      </Card>
                    </Col>
                  </Row>

                  <Card title="Discovered Competitors">
                    <Table
                      columns={competitorColumns}
                      dataSource={keywordGap.competitorDiscovery.data}
                      rowKey="domain"
                      pagination={{
                        pageSize: 10,
                        showTotal: (total) => `Total ${total} competitors`,
                      }}
                      scroll={{ x: 1200 }}
                    />
                  </Card>
                </>
              )}

            {keywordGap.competitorDiscovery &&
              !keywordGap.competitorDiscovery.data && (
                <Card>
                  <Empty
                    description="No competitor data available"
                    image={Empty.PRESENTED_IMAGE_SIMPLE}
                  >
                    <Text type="secondary">
                      Try discovering competitors again or check if the analysis
                      completed successfully.
                    </Text>
                  </Empty>
                </Card>
              )}

            {!keywordGap.competitorDiscovery && (
              <Card>
                <Empty
                  description="No competitor discovery results yet"
                  image={Empty.PRESENTED_IMAGE_SIMPLE}
                >
                  <Text type="secondary">
                    Click "Discover Competitors" to find competitors based on
                    keyword overlap
                  </Text>
                </Empty>
              </Card>
            )}
          </TabPane>
        </Tabs>
      )}

      {/* Empty State */}
      {!keywordGap.computed.hasOpportunities &&
        !keywordGap.competitorDiscovery &&
        !keywordGap.computed.isLoading && (
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
    </div>
  );
};

export default KeywordGapAnalyzer;
