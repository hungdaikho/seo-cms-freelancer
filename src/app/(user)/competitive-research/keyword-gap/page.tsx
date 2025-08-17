"use client";
import React, { useState, useEffect } from "react";
import {
  Button,
  Card,
  Col,
  Row,
  Select,
  Tabs,
  Table,
  Space,
  Badge,
  Typography,
  Input,
  Tag,
  Spin,
  message,
  Form,
  Alert,
  Empty,
} from "antd";
import { PlusOutlined, DeleteOutlined } from "@ant-design/icons";
import { useAppDispatch, useAppSelector } from "@/stores/hooks";
import {
  compareKeywordGaps,
  getKeywordOverlap,
  setFilters,
  addCompetitor,
  removeCompetitor,
  clearKeywordGapAnalysis,
} from "@/stores/slices/competitive.slice";
import styles from "./KeywordGap.module.scss";
import { getSortedCountries } from "@/utils/countries";

const { Option } = Select;
const { TabPane } = Tabs;
const { Title, Text } = Typography;

type Props = {};

const KeyWordGap = (props: Props) => {
  const dispatch = useAppDispatch();
  const [form] = Form.useForm();

  // Redux state
  const { keywordGapAnalysis, keywordOverlap, loading, error, filters } =
    useAppSelector((state) => state.competitive);

  // Local state
  const [targetDomain, setTargetDomain] = useState("");
  const [keywordFilter, setKeywordFilter] = useState("");
  const [selectedTab, setSelectedTab] = useState("organic");

  useEffect(() => {
    return () => {
      // Clear data when component unmounts
      dispatch(clearKeywordGapAnalysis());
    };
  }, [dispatch]);

  // Handle form submission
  const handleCompare = async (values: any) => {
    if (!targetDomain.trim()) {
      message.error("Please enter a target domain");
      return;
    }

    if (filters.competitors.length === 0) {
      message.error("Please add at least one competitor");
      return;
    }

    try {
      const requestData = {
        targetDomain: targetDomain.trim(),
        competitors: filters.competitors,
        country: filters.country,
        database: filters.database,
        device: filters.device,
        filters: {
          minSearchVolume: 10,
          maxDifficulty: 100,
          keywordType: selectedTab,
        },
      };

      // Fetch keyword gap analysis
      await dispatch(compareKeywordGaps(requestData)).unwrap();

      // Fetch keyword overlap data
      await dispatch(
        getKeywordOverlap({
          domains: [targetDomain, ...filters.competitors],
          country: filters.country,
        })
      ).unwrap();

      message.success("Keyword gap analysis completed successfully!");
    } catch (error: any) {
      message.error(error.message || "Failed to analyze keyword gaps");
    }
  };

  // Handle adding competitor
  const handleAddCompetitor = (domain: string) => {
    if (domain.trim() && filters.competitors.length < 3) {
      dispatch(addCompetitor(domain.trim()));
    }
  };

  // Handle removing competitor
  const handleRemoveCompetitor = (domain: string) => {
    dispatch(removeCompetitor(domain));
  };

  // Handle filter changes
  const handleFilterChange = (field: string, value: any) => {
    dispatch(setFilters({ [field]: value }));
  };

  // Get intent color
  const getIntentColor = (intent: string) => {
    const intentMap: Record<string, string> = {
      informational: "#1890ff",
      navigational: "#52c41a",
      commercial: "#faad14",
      transactional: "#722ed1",
      N: "#1890ff",
      I: "#722ed1",
      C: "#faad14",
      T: "#13c2c2",
    };
    return intentMap[intent] || "#666";
  };

  // Render keyword details
  const renderKeywordDetails = () => {
    if (!keywordGapAnalysis?.keywordDetails) return [];

    return keywordGapAnalysis.keywordDetails
      .filter(
        (item) =>
          !keywordFilter ||
          item.keyword.toLowerCase().includes(keywordFilter.toLowerCase())
      )
      .map((item, index) => ({
        key: index.toString(),
        keyword: item.keyword,
        intent: item.intent,
        targetDomain: item.targetDomain?.position || "-",
        competitor1: item.competitor1?.position || "-",
        competitor2: item.competitor2?.position || "-",
        volume: item.targetDomain?.volume || 0,
        kd: item.kd,
        cpc: item.targetDomain?.cpc || 0,
        status: item.status,
        result: item.targetDomain?.result || "-",
      }));
  };

  // Table columns configuration
  const getColumns = () => {
    const baseColumns = [
      {
        title: "Keyword",
        dataIndex: "keyword",
        key: "keyword",
        render: (text: string) => (
          <Button type="link" style={{ padding: 0, color: "#1890ff" }}>
            {text}
          </Button>
        ),
      },
      {
        title: "Intent",
        dataIndex: "intent",
        key: "intent",
        render: (intent: string) => (
          <Tag
            color={getIntentColor(intent)}
            style={{ minWidth: "20px", textAlign: "center" }}
          >
            {intent}
          </Tag>
        ),
      },
      {
        title: targetDomain || "Target Domain",
        dataIndex: "targetDomain",
        key: "targetDomain",
        render: (position: number | string) =>
          position === "-" ? "-" : position,
      },
    ];

    // Add competitor columns dynamically
    filters.competitors.forEach((competitor, index) => {
      baseColumns.push({
        title: competitor,
        dataIndex: `competitor${index + 1}`,
        key: `competitor${index + 1}`,
        render: (position: number | string) =>
          position === "-" ? "-" : position,
      });
    });

    // Add remaining columns
    baseColumns.push(
      {
        title: "Volume",
        dataIndex: "volume",
        key: "volume",
        render: (volume: any) =>
          typeof volume === "number" ? volume.toLocaleString() : volume,
      },
      {
        title: "KD%",
        dataIndex: "kd",
        key: "kd",
        render: (kd: any) => `${kd}%`,
      },
      {
        title: "CPC(USD)",
        dataIndex: "cpc",
        key: "cpc",
        render: (cpc: any) =>
          `$${typeof cpc === "number" ? cpc.toFixed(2) : cpc}`,
      },
      {
        title: "Status",
        dataIndex: "status",
        key: "status",
        render: (status: string) => {
          const statusColors: Record<string, string> = {
            shared: "green",
            missing: "red",
            weak: "orange",
            strong: "blue",
            untapped: "purple",
            unique: "cyan",
          };
          return (
            <Tag color={statusColors[status?.toLowerCase()] || "default"}>
              {status}
            </Tag>
          );
        },
      }
    );

    return baseColumns;
  };

  // Venn Diagram Component
  const VennChart = () => {
    if (!keywordOverlap?.vennDiagram) {
      return (
        <div className={styles.vennContainer}>
          <Empty description="No overlap data available" />
        </div>
      );
    }

    const targetData = keywordOverlap.vennDiagram[targetDomain] || {
      total: 0,
      unique: 0,
      shared: 0,
    };
    const competitorData = keywordOverlap.vennDiagram[
      filters.competitors[0]
    ] || { total: 0, unique: 0, shared: 0 };
    const overlapCount =
      keywordOverlap.overview.overlap[filters.competitors[0]] || 0;

    return (
      <div
        className={`${styles.vennContainer} ${keywordOverlap ? "loaded" : ""}`}
      >
        <div className={styles.vennDiagram}>
          <svg width="360" height="240" viewBox="0 0 360 240">
            {/* Background circles with gradients */}
            <defs>
              <linearGradient
                id="targetGradient"
                x1="0%"
                y1="0%"
                x2="100%"
                y2="100%"
              >
                <stop
                  offset="0%"
                  style={{ stopColor: "#52c41a", stopOpacity: 0.8 }}
                />
                <stop
                  offset="100%"
                  style={{ stopColor: "#73d13d", stopOpacity: 0.6 }}
                />
              </linearGradient>
              <linearGradient
                id="competitorGradient"
                x1="0%"
                y1="0%"
                x2="100%"
                y2="100%"
              >
                <stop
                  offset="0%"
                  style={{ stopColor: "#1890ff", stopOpacity: 0.8 }}
                />
                <stop
                  offset="100%"
                  style={{ stopColor: "#40a9ff", stopOpacity: 0.6 }}
                />
              </linearGradient>
              <filter id="glow">
                <feGaussianBlur stdDeviation="3" result="coloredBlur" />
                <feMerge>
                  <feMergeNode in="coloredBlur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            {/* Target domain circle */}
            <circle
              cx="140"
              cy="120"
              r="80"
              fill="url(#targetGradient)"
              stroke="#52c41a"
              strokeWidth="3"
              filter="url(#glow)"
            />

            {/* Competitor domain circle */}
            <circle
              cx="220"
              cy="120"
              r="80"
              fill="url(#competitorGradient)"
              stroke="#1890ff"
              strokeWidth="3"
              filter="url(#glow)"
            />

            {/* Domain labels */}
            <text x="110" y="80" textAnchor="middle" className="domain-label">
              {targetDomain || "Target Domain"}
            </text>
            <text x="250" y="80" textAnchor="middle" className="domain-label">
              {filters.competitors[0] || "Competitor"}
            </text>

            {/* Unique keyword counts */}
            <text x="110" y="135" textAnchor="middle" className="unique-number">
              {targetData.unique.toLocaleString()}
            </text>
            <text x="250" y="135" textAnchor="middle" className="unique-number">
              {competitorData.unique.toLocaleString()}
            </text>

            {/* Overlap count in the middle */}
            <text
              x="180"
              y="125"
              textAnchor="middle"
              className="overlap-number"
            >
              {overlapCount.toLocaleString()}
            </text>
            <text x="180" y="140" textAnchor="middle" className="domain-label">
              Shared
            </text>

            {/* Total labels */}
            <text x="110" y="155" textAnchor="middle" className="domain-label">
              Total: {targetData.total.toLocaleString()}
            </text>
            <text x="250" y="155" textAnchor="middle" className="domain-label">
              Total: {competitorData.total.toLocaleString()}
            </text>
          </svg>
        </div>

        {/* Legend */}
        <div className={styles.vennLegend}>
          <div className={styles.legendItem}>
            <div
              className={styles.legendColor}
              style={{ backgroundColor: "#52c41a" }}
            />
            <span className={styles.legendText} title={targetDomain}>
              {targetDomain || "Target Domain"}
            </span>
          </div>
          <div className={styles.legendItem}>
            <div
              className={styles.legendColor}
              style={{ backgroundColor: "#1890ff" }}
            />
            <span className={styles.legendText} title={filters.competitors[0]}>
              {filters.competitors[0] || "Competitor"}
            </span>
          </div>
        </div>

        {/* Statistics */}
        <div className={styles.vennStats}>
          <div className={styles.statItem}>
            <span className={styles.statNumber}>
              {keywordOverlap.overview.totalUnique.toLocaleString()}
            </span>
            <span className={styles.statLabel}>Total Unique</span>
          </div>
          <div className={styles.statItem}>
            <span className={styles.statNumber}>
              {overlapCount.toLocaleString()}
            </span>
            <span className={styles.statLabel}>Shared</span>
          </div>
          <div className={styles.statItem}>
            <span className={styles.statNumber}>
              {(
                (overlapCount / keywordOverlap.overview.totalUnique) *
                100
              ).toFixed(1)}
              %
            </span>
            <span className={styles.statLabel}>Overlap Rate</span>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className={styles.keywordGap}>
      <div style={{ padding: "24px" }}>
        {/* Header */}
        <Row
          align="middle"
          justify="space-between"
          style={{ marginBottom: "24px" }}
        >
          <Col>
            <Title level={2} style={{ margin: 0 }}>
              Keyword Gap Analysis
            </Title>
          </Col>
        </Row>

        {/* Error Display */}
        {(error.keywordGap || error.keywordOverlap) && (
          <Alert
            message="Error"
            description={error.keywordGap || error.keywordOverlap}
            type="error"
            showIcon
            closable
            style={{ marginBottom: "24px" }}
          />
        )}

        {/* Filters */}
        <div className={styles.filterSection}>
          <Row gutter={[16, 16]}>
            <Col span={6}>
              <Space direction="vertical" style={{ width: "100%" }}>
                <Text>Country/Database:</Text>
                <Select
                  value={filters.country}
                  onChange={(value) => handleFilterChange("country", value)}
                  style={{ width: "100%" }}
                  showSearch
                  placeholder="Select country"
                  filterOption={(input, option) =>
                    (option?.children as unknown as string)
                      ?.toLowerCase()
                      ?.includes(input.toLowerCase())
                  }
                >
                  {getSortedCountries().map((country) => (
                    <Option key={country.code} value={country.code}>
                      {country.name}
                    </Option>
                  ))}
                </Select>
              </Space>
            </Col>
            <Col span={6}>
              <Space direction="vertical" style={{ width: "100%" }}>
                <Text>Device:</Text>
                <Select
                  value={filters.device}
                  onChange={(value) => handleFilterChange("device", value)}
                  style={{ width: "100%" }}
                >
                  <Option value="desktop">🖥️ Desktop</Option>
                  <Option value="mobile">📱 Mobile</Option>
                </Select>
              </Space>
            </Col>
            <Col span={6}>
              <Space direction="vertical" style={{ width: "100%" }}>
                <Text>Database:</Text>
                <Select
                  value={filters.database}
                  onChange={(value) => handleFilterChange("database", value)}
                  style={{ width: "100%" }}
                >
                  <Option value="all">All Databases</Option>
                  <Option value="google">Google</Option>
                  <Option value="bing">Bing</Option>
                </Select>
              </Space>
            </Col>
            <Col span={6}>
              <Space direction="vertical" style={{ width: "100%" }}>
                <Text>Timeframe:</Text>
                <Select
                  value={filters.timeframe}
                  onChange={(value) => handleFilterChange("timeframe", value)}
                  style={{ width: "100%" }}
                >
                  <Option value="7d">Last 7 days</Option>
                  <Option value="30d">Last 30 days</Option>
                  <Option value="90d">Last 90 days</Option>
                </Select>
              </Space>
            </Col>
          </Row>
        </div>

        {/* Domain Selection */}
        <Card style={{ marginBottom: "24px" }}>
          <Form form={form} onFinish={handleCompare}>
            <Tabs
              activeKey={selectedTab}
              onChange={setSelectedTab}
              defaultActiveKey="organic"
            >
              <TabPane tab="Organic Keywords" key="organic">
                <Row gutter={[16, 16]}>
                  <Col span={8}>
                    <Space direction="vertical" style={{ width: "100%" }}>
                      <Text>Target Domain:</Text>
                      <Input
                        placeholder="Enter your domain (e.g., example.com)"
                        value={targetDomain}
                        onChange={(e) => setTargetDomain(e.target.value)}
                      />
                    </Space>
                  </Col>
                  <Col span={16}>
                    <Space direction="vertical" style={{ width: "100%" }}>
                      <Text>Competitors (max 3):</Text>
                      <Row gutter={[8, 8]}>
                        {filters.competitors.map((competitor, index) => (
                          <Col key={index} span={8}>
                            <Input
                              value={competitor}
                              readOnly
                              suffix={
                                <Button
                                  type="text"
                                  size="small"
                                  icon={<DeleteOutlined />}
                                  onClick={() =>
                                    handleRemoveCompetitor(competitor)
                                  }
                                />
                              }
                            />
                          </Col>
                        ))}
                        {filters.competitors.length < 3 && (
                          <Col span={8}>
                            <Input
                              placeholder="Enter competitor domain"
                              onPressEnter={(e) => {
                                const target = e.target as HTMLInputElement;
                                handleAddCompetitor(target.value);
                                target.value = "";
                              }}
                            />
                          </Col>
                        )}
                      </Row>
                    </Space>
                  </Col>
                </Row>
                <Row style={{ marginTop: "16px" }}>
                  <Col>
                    <Space>
                      <Button
                        type="primary"
                        htmlType="submit"
                        loading={loading.keywordGap || loading.keywordOverlap}
                      >
                        Compare
                      </Button>
                      <Button
                        onClick={() => {
                          setTargetDomain("");
                          dispatch(setFilters({ competitors: [] }));
                          dispatch(clearKeywordGapAnalysis());
                        }}
                      >
                        Clear
                      </Button>
                    </Space>
                  </Col>
                </Row>
              </TabPane>
              <TabPane tab="Paid Keywords" key="paid">
                <div>Paid Keywords analysis will be available soon</div>
              </TabPane>
              <TabPane tab="PLA Keywords" key="pla">
                <div>PLA Keywords analysis will be available soon</div>
              </TabPane>
            </Tabs>
          </Form>
        </Card>

        {/* Loading State */}
        {(loading.keywordGap || loading.keywordOverlap) && (
          <Card style={{ textAlign: "center", marginBottom: "24px" }}>
            <Spin size="large" />
            <div style={{ marginTop: "16px" }}>
              <Text>Analyzing keyword gaps...</Text>
            </div>
          </Card>
        )}

        {/* Results */}
        {keywordGapAnalysis && (
          <>
            {/* Main Content */}
            <Row gutter={[24, 24]}>
              {/* Left Column - Venn Diagram */}
              <Col span={12}>
                <Card>
                  <Title level={4}>Keyword Overlap Analysis</Title>
                  <VennChart />
                </Card>
              </Col>

              {/* Right Column - Top Opportunities */}
              <Col span={12}>
                <Card>
                  <Row justify="space-between" align="middle">
                    <Title level={4}>Top Opportunities</Title>
                    <Space>
                      <Text style={{ fontSize: "12px", color: "#666" }}>
                        Missing | Weak Keywords
                      </Text>
                    </Space>
                  </Row>
                  <div style={{ marginBottom: "16px" }}>
                    {keywordOverlap?.topOpportunities
                      ?.slice(0, 5)
                      .map((item, index) => (
                        <div key={index} className={styles.opportunityItem}>
                          <Row justify="space-between">
                            <Text style={{ color: "#1890ff" }}>
                              {item.keyword} &gt;&gt;
                            </Text>
                            <Text>{item.volume.toLocaleString()}</Text>
                          </Row>
                        </div>
                      )) || <Empty description="No opportunities found" />}
                  </div>
                  {(keywordOverlap?.topOpportunities?.length ?? 0) > 0 && (
                    <Button type="primary">View all opportunities</Button>
                  )}
                </Card>
              </Col>
            </Row>

            {/* Keyword Details Table */}
            <Card style={{ marginTop: "24px" }}>
              <Row
                justify="space-between"
                align="middle"
                style={{ marginBottom: "16px" }}
              >
                <Col>
                  <Title level={4}>Keyword Details: {targetDomain}</Title>
                </Col>
                <Col></Col>
              </Row>

              {/* Filter Tags */}
              {keywordGapAnalysis.overview.comparison && (
                <div className={styles.statsBadge}>
                  <Row
                    style={{
                      marginBottom: "16px",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <Col>
                      <Space wrap>
                        <Tag color="orange">
                          Shared{" "}
                          {keywordGapAnalysis.overview.comparison.shared.toLocaleString()}
                        </Tag>
                        <Tag>
                          Missing{" "}
                          {keywordGapAnalysis.overview.comparison.missing.toLocaleString()}
                        </Tag>
                        <Tag>
                          Weak{" "}
                          {keywordGapAnalysis.overview.comparison.weak.toLocaleString()}
                        </Tag>
                        <Tag>
                          Strong{" "}
                          {keywordGapAnalysis.overview.comparison.strong.toLocaleString()}
                        </Tag>
                        <Tag>
                          Untapped{" "}
                          {keywordGapAnalysis.overview.comparison.untapped.toLocaleString()}
                        </Tag>
                        <Tag>
                          Unique{" "}
                          {keywordGapAnalysis.overview.comparison.unique.toLocaleString()}
                        </Tag>
                        <Tag>
                          Total{" "}
                          {keywordGapAnalysis.totalKeywords.toLocaleString()}
                        </Tag>
                      </Space>
                    </Col>
                    <Col>
                      <Button type="primary" icon={<PlusOutlined />}>
                        Add to keyword list
                      </Button>
                    </Col>
                  </Row>
                </div>
              )}

              {/* Table */}
              <Table
                columns={getColumns()}
                dataSource={renderKeywordDetails()}
                loading={loading.keywordGap}
                pagination={{
                  showSizeChanger: true,
                  showQuickJumper: true,
                  showTotal: (total, range) =>
                    `${range[0]}-${range[1]} of ${total} items`,
                  pageSize: 50,
                }}
                scroll={{ x: 800 }}
              />
            </Card>
          </>
        )}

        {/* Empty State */}
        {!keywordGapAnalysis &&
          !loading.keywordGap &&
          !loading.keywordOverlap && (
            <Card style={{ textAlign: "center", padding: "48px" }}>
              <Empty
                description={
                  <div>
                    <Text>
                      Enter your domain and competitors above to start analyzing
                      keyword gaps
                    </Text>
                  </div>
                }
              />
            </Card>
          )}
      </div>
    </div>
  );
};

export default KeyWordGap;
