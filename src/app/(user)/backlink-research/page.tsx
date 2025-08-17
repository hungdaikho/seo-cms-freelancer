"use client";

import React, { useState, useEffect, useMemo } from "react";
import {
  Card,
  Input,
  Button,
  Select,
  Table,
  Row,
  Col,
  Checkbox,
  Space,
  Typography,
  Spin,
  message,
  DatePicker,
} from "antd";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { useBacklinkResearch } from "@/hooks/useBacklinkResearch";
import styles from "./backlinks.module.scss";

const { Option } = Select;
const { Title, Text } = Typography;
const { RangePicker } = DatePicker;

// Mock project ID - replace with actual project selection logic
const MOCK_PROJECT_ID = "project-123";

// Color schemes for charts
const CHART_COLORS = {
  primary: "#4dabf7",
  secondary: "#ff6b35",
  success: "#51cf66",
  warning: "#ffd43b",
  info: "#9775fa",
  light: "#69db7c",
};

const BacklinksPage = () => {
  const [selectedDomain, setSelectedDomain] = useState("Designer.com");
  const [isSubdomain, setIsSubdomain] = useState(false);
  const [competitors, setCompetitors] = useState<string[]>([]);
  const [newCompetitor, setNewCompetitor] = useState("");

  const {
    // State
    domainOverview,
    domainAuthority,
    projectBacklinks,
    backlinkAnalytics,
    timelineData,
    currentDomain,
    includeSubdomains,
    selectedProjectId,

    // Loading states
    isLoading,

    // Error states
    getError,

    // Actions
    initializeDomainAnalysis,
    initializeProjectAnalysis,
    updateCurrentDomain,
    updateIncludeSubdomains,
    updateSelectedProjectId,
  } = useBacklinkResearch();

  // Initialize data on component mount
  useEffect(() => {
    const loadInitialData = async () => {
      try {
        // Initialize domain analysis
        await initializeDomainAnalysis(selectedDomain, isSubdomain);

        // Initialize project analysis
        await initializeProjectAnalysis(MOCK_PROJECT_ID);
      } catch (error) {
        message.error("Failed to load backlink data");
      }
    };

    loadInitialData();
  }, []);

  // Handle domain change
  const handleDomainChange = async (domain: string) => {
    setSelectedDomain(domain);
    updateCurrentDomain(domain);

    try {
      await initializeDomainAnalysis(domain, isSubdomain);
    } catch (error) {
      message.error("Failed to analyze domain");
    }
  };

  // Handle subdomain toggle
  const handleSubdomainToggle = async (checked: boolean) => {
    setIsSubdomain(checked);
    updateIncludeSubdomains(checked);

    try {
      await initializeDomainAnalysis(selectedDomain, checked);
    } catch (error) {
      message.error("Failed to update analysis");
    }
  };

  // Add competitor
  const handleAddCompetitor = () => {
    if (newCompetitor && !competitors.includes(newCompetitor)) {
      setCompetitors([...competitors, newCompetitor]);
      setNewCompetitor("");
    }
  };

  // Prepare metrics data
  const metricsData = useMemo(() => {
    if (!domainOverview) return [];

    return [
      {
        label: "Page Authority",
        value: domainOverview?.metrics?.pageAuthority,
      },
      {
        label: "Domain Authority",
        value: domainOverview?.metrics?.domainAuthority,
      },
      {
        label: "Outbound Domain",
        value: domainOverview?.metrics?.outboundDomain,
      },
      {
        label: "Monthly visits",
        value: domainOverview?.metrics?.monthlyVisits,
      },
      {
        label: "Spam Score",
        value: domainOverview?.metrics?.spamScore,
      },
    ];
  }, [domainOverview]);

  // Prepare chart data
  const referralDomainsData = useMemo(() => {
    if (!backlinkAnalytics?.trends.referralDomains) return [];

    return backlinkAnalytics.trends.referralDomains.map((item) => ({
      month: new Date(item.date).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      }),
      value: item.count,
    }));
  }, [backlinkAnalytics]);

  const backlinksData = useMemo(() => {
    if (!backlinkAnalytics?.trends.backlinks) return [];

    return backlinkAnalytics.trends.backlinks.map((item) => ({
      month: new Date(item.date).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      }),
      value: item.count,
    }));
  }, [backlinkAnalytics]);

  const authorityScoreData = useMemo(() => {
    if (!timelineData?.timeline) return [];

    return timelineData.timeline.map((item) => ({
      month: new Date(item.date).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      }),
      value: Math.round(Math.random() * 20) + 70, // Mock authority score
    }));
  }, [timelineData]);

  // Authority score distribution (mock data for now)
  const authorityScoreByDomain = [
    {
      range: "91 - 100",
      count: 27,
      percentage: "<1%",
      color: CHART_COLORS.secondary,
    },
    {
      range: "81 - 90",
      count: 4,
      percentage: "<1%",
      color: CHART_COLORS.secondary,
    },
    {
      range: "71 - 80",
      count: 200,
      percentage: "<5%",
      color: CHART_COLORS.secondary,
    },
    {
      range: "61 - 70",
      count: 233,
      percentage: "<3%",
      color: CHART_COLORS.secondary,
    },
    {
      range: "51 - 60",
      count: 453,
      percentage: "<16%",
      color: CHART_COLORS.secondary,
    },
    {
      range: "41 - 50",
      count: 1000,
      percentage: "<18%",
      color: CHART_COLORS.secondary,
    },
    {
      range: "31 - 40",
      count: 1000,
      percentage: "<14%",
      color: CHART_COLORS.secondary,
    },
    {
      range: "21 - 30",
      count: 20000,
      percentage: "<21%",
      color: CHART_COLORS.secondary,
    },
    {
      range: "11 - 20",
      count: 21000,
      percentage: "<20%",
      color: CHART_COLORS.secondary,
    },
    {
      range: "0 - 10",
      count: 27000,
      percentage: "<12%",
      color: CHART_COLORS.secondary,
    },
  ];

  // Backlink types from domain overview
  const backlinkTypes = useMemo(() => {
    if (!domainOverview?.backlinkTypes) return [];

    const total = Object.values(domainOverview.backlinkTypes).reduce(
      (sum, val) => sum + val,
      0
    );

    return Object.entries(domainOverview.backlinkTypes).map(
      ([type, count]) => ({
        type: type.charAt(0).toUpperCase() + type.slice(1),
        count,
        percentage: `${((count / total) * 100).toFixed(1)}%`,
        color: CHART_COLORS.secondary,
      })
    );
  }, [domainOverview]);

  // Link attributes (mock data for now)
  const linkAttributes = useMemo(() => {
    if (!backlinkAnalytics?.summary) return [];

    const total = backlinkAnalytics.summary.totalBacklinks;
    const followLinks = backlinkAnalytics.summary.followLinks;
    const nofollowLinks = backlinkAnalytics.summary.nofollowLinks;

    return [
      {
        type: "Follow",
        count: followLinks,
        percentage: `${((followLinks / total) * 100).toFixed(1)}%`,
        color: CHART_COLORS.primary,
      },
      {
        type: "NoFollow",
        count: nofollowLinks,
        percentage: `${((nofollowLinks / total) * 100).toFixed(1)}%`,
        color: CHART_COLORS.secondary,
      },
    ];
  }, [backlinkAnalytics]);

  // Top countries from domain overview
  const topCountries = useMemo(() => {
    return domainOverview?.topCountries || [];
  }, [domainOverview]);

  // Anchors data
  const anchorsData = useMemo(() => {
    return backlinkAnalytics?.anchors || [];
  }, [backlinkAnalytics]);

  // Top pages data
  const topPages = useMemo(() => {
    return backlinkAnalytics?.topPages || [];
  }, [backlinkAnalytics]);

  // TLD distribution
  const tldData = useMemo(() => {
    if (!domainOverview?.tldDistribution) return [];

    const colors = [
      CHART_COLORS.secondary,
      CHART_COLORS.primary,
      CHART_COLORS.warning,
      CHART_COLORS.success,
      CHART_COLORS.info,
      CHART_COLORS.light,
    ];

    return Object.entries(domainOverview.tldDistribution).map(
      ([tld, value], index) => ({
        name: `.${tld}`,
        value,
        color: colors[index % colors.length],
      })
    );
  }, [domainOverview]);

  // Loading component
  const LoadingCard = ({ height = 250 }: { height?: number }) => (
    <div className={styles.loadingContainer} style={{ height }}>
      <Spin size="large" />
    </div>
  );

  // Error component
  const ErrorCard = ({
    error,
    onRetry,
  }: {
    error: string;
    onRetry: () => void;
  }) => (
    <div className={styles.errorContainer}>
      <div className={styles.errorMessage}>{error}</div>
      <Button className={styles.retryButton} onClick={onRetry}>
        Retry
      </Button>
    </div>
  );

  return (
    <div className={styles.backlinksPage}>
      {/* Header */}
      <div className={styles.header}>
        <div className={styles.headerLeft}>
          <Text strong>Backlinks:</Text>
          <span className={styles.domainText}>{selectedDomain}</span>
          <Checkbox
            checked={isSubdomain}
            onChange={(e) => handleSubdomainToggle(e.target.checked)}
          >
            Subdomain
          </Checkbox>
          <Select defaultValue="Domain" className={styles.domainSelect}>
            <Option value="Domain">Domain</Option>
            <Option value="URL">URL</Option>
          </Select>
        </div>

        <div className={styles.headerRight}>
          <span>Language:</span>
          <Select defaultValue="EN" className={styles.languageSelect}>
            <Option value="EN">EN</Option>
            <Option value="VN">VN</Option>
          </Select>
        </div>
      </div>

      {/* Search and Compare */}
      <div className={styles.searchSection}>
        <div className={styles.searchLeft}>
          <Input
            placeholder={`Search domain: ${selectedDomain}`}
            className={styles.searchInput}
            value={newCompetitor}
            onChange={(e) => setNewCompetitor(e.target.value)}
            onPressEnter={handleAddCompetitor}
          />
          <Button
            type="text"
            className={styles.addCompetitor}
            onClick={handleAddCompetitor}
          >
            + Add competitor
          </Button>
          {competitors.length > 0 && (
            <Space wrap>
              {competitors.map((competitor, index) => (
                <span key={index} style={{ fontSize: 12, color: "#666" }}>
                  {competitor}
                </span>
              ))}
            </Space>
          )}
        </div>
        <Button type="primary" className={styles.compareBtn}>
          Compare
        </Button>
      </div>

      {/* Metrics Cards */}
      <Card className={styles.metricsCard}>
        {isLoading("domainOverview") ? (
          <LoadingCard height={120} />
        ) : getError("domainOverview") ? (
          <ErrorCard
            error={getError("domainOverview") || ""}
            onRetry={() =>
              initializeDomainAnalysis(selectedDomain, isSubdomain)
            }
          />
        ) : (
          <Row gutter={[24, 16]}>
            {metricsData.map((metric, index) => (
              <Col key={index} xs={24} sm={12} md={8} lg={4} xl={4}>
                <div className={styles.metricItem}>
                  <div className={styles.metricLabel}>{metric.label}</div>
                  <div className={styles.metricValue}>{metric.value}</div>
                </div>
              </Col>
            ))}
          </Row>
        )}
      </Card>

      {/* Charts Row 1 */}
      <Row gutter={[24, 24]} className={styles.chartsRow}>
        <Col xs={24} lg={12}>
          <Card className={styles.chartCard}>
            <div className={styles.chartHeader}>
              <Title level={4}>Referral Domains</Title>
              <Text type="secondary">1 year</Text>
              <Button size="small" type="primary">
                All time
              </Button>
            </div>
            {isLoading("backlinkAnalytics") ? (
              <LoadingCard />
            ) : (
              <ResponsiveContainer width="100%" height={250}>
                <AreaChart data={referralDomainsData}>
                  <defs>
                    <linearGradient
                      id="colorReferral"
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
                      <stop
                        offset="5%"
                        stopColor={CHART_COLORS.primary}
                        stopOpacity={0.8}
                      />
                      <stop
                        offset="95%"
                        stopColor={CHART_COLORS.primary}
                        stopOpacity={0.1}
                      />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Area
                    type="monotone"
                    dataKey="value"
                    stroke={CHART_COLORS.primary}
                    fillOpacity={1}
                    fill="url(#colorReferral)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            )}
          </Card>
        </Col>

        <Col xs={24} lg={12}>
          <Card className={styles.chartCard}>
            <div className={styles.chartHeader}>
              <Title level={4}>Backlinks</Title>
              <Text type="secondary">1 year</Text>
              <Button size="small" type="primary">
                All time
              </Button>
            </div>
            {isLoading("backlinkAnalytics") ? (
              <LoadingCard />
            ) : (
              <ResponsiveContainer width="100%" height={250}>
                <AreaChart data={backlinksData}>
                  <defs>
                    <linearGradient
                      id="colorBacklinks"
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
                      <stop
                        offset="5%"
                        stopColor={CHART_COLORS.primary}
                        stopOpacity={0.8}
                      />
                      <stop
                        offset="95%"
                        stopColor={CHART_COLORS.primary}
                        stopOpacity={0.1}
                      />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Area
                    type="monotone"
                    dataKey="value"
                    stroke={CHART_COLORS.primary}
                    fillOpacity={1}
                    fill="url(#colorBacklinks)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            )}
          </Card>
        </Col>
      </Row>

      {/* Charts Row 2 */}
      <Row gutter={[24, 24]} className={styles.chartsRow}>
        <Col xs={24} lg={12}>
          <Card className={styles.chartCard}>
            <div className={styles.chartHeader}>
              <Title level={4}>Authority score</Title>
              <Button size="small" type="primary">
                Full report
              </Button>
            </div>

            <div className={styles.authoritySection}>
              <div className={styles.scoreDisplay}>
                <div className={styles.scoreNumber}>
                  {domainOverview?.authorityScore || 80}
                </div>
                <div className={styles.scoreChart}>
                  <ResponsiveContainer width="100%" height={60}>
                    <LineChart data={authorityScoreData}>
                      <Line
                        type="monotone"
                        dataKey="value"
                        stroke={CHART_COLORS.secondary}
                        strokeWidth={2}
                        dot={false}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>

              <div className={styles.authorityBreakdown}>
                <Title level={5}>Authority score by domain</Title>
                {authorityScoreByDomain.map((item, index) => (
                  <div key={index} className={styles.authorityItem}>
                    <span className={styles.range}>{item.range}</span>
                    <div className={styles.progressBar}>
                      <div
                        className={styles.progressFill}
                        style={{ width: `${Math.random() * 100}%` }}
                      />
                    </div>
                    <span className={styles.percentage}>{item.percentage}</span>
                    <span className={styles.count}>{item.count}</span>
                  </div>
                ))}
              </div>
            </div>
          </Card>
        </Col>

        <Col xs={24} lg={12}>
          <Card className={styles.chartCard}>
            <div className={styles.chartHeader}>
              <Title level={4}>Backlink Types</Title>
              <Button size="small" type="primary">
                Full report
              </Button>
            </div>

            <div className={styles.backlinkTypesSection}>
              <div className={styles.backlinkCount}>
                <Text type="secondary">Backlinks:</Text>
                <span className={styles.countNumber}>
                  {domainOverview?.backlinks.total
                    ? (domainOverview.backlinks.total / 1000).toFixed(0) + "k"
                    : "200k"}
                </span>
              </div>

              {backlinkTypes.map((item, index) => (
                <div key={index} className={styles.backlinkTypeItem}>
                  <span className={styles.typeName}>{item.type}</span>
                  <div className={styles.progressBar}>
                    <div
                      className={styles.progressFill}
                      style={{
                        width: `${
                          (item.count /
                            backlinkTypes.reduce(
                              (sum, t) => sum + t.count,
                              0
                            )) *
                          100
                        }%`,
                      }}
                    />
                  </div>
                  <span className={styles.percentage}>{item.percentage}</span>
                  <span className={styles.count}>{item.count}</span>
                </div>
              ))}

              <div className={styles.linkAttributesSection}>
                <Title level={5}>Link Attributes</Title>
                <Button size="small" type="primary">
                  Full report
                </Button>

                {linkAttributes.map((item, index) => (
                  <div key={index} className={styles.backlinkTypeItem}>
                    <span className={styles.typeName}>{item.type}</span>
                    <div className={styles.progressBar}>
                      <div
                        className={styles.progressFill}
                        style={{
                          width: `${
                            (item.count /
                              linkAttributes.reduce(
                                (sum, t) => sum + t.count,
                                0
                              )) *
                            100
                          }%`,
                        }}
                      />
                    </div>
                    <span className={styles.percentage}>{item.percentage}</span>
                    <span className={styles.count}>{item.count}</span>
                  </div>
                ))}
              </div>
            </div>
          </Card>
        </Col>
      </Row>

      {/* Charts Row 3 */}
      <Row gutter={[24, 24]} className={styles.chartsRow}>
        <Col xs={24} lg={12}>
          <Card className={styles.chartCard}>
            <div className={styles.chartHeader}>
              <Title level={4}>New and Lost Referring Domains</Title>
              <div className={styles.legend}>
                <span className={styles.legendItem}>
                  <span
                    className={styles.legendColor}
                    style={{ backgroundColor: CHART_COLORS.primary }}
                  />
                  New
                </span>
                <span className={styles.legendItem}>
                  <span
                    className={styles.legendColor}
                    style={{ backgroundColor: CHART_COLORS.secondary }}
                  />
                  Lost
                </span>
              </div>
              <Select defaultValue="This month" size="small">
                <Option value="This month">This month</Option>
                <Option value="Last month">Last month</Option>
              </Select>
            </div>

            <div className={styles.barChartContainer}>
              {isLoading("backlinkAnalytics") ? (
                <LoadingCard />
              ) : (
                <div className={styles.horizontalBars}>
                  {backlinkAnalytics?.newAndLost.newReferringDomains
                    .slice(0, 15)
                    .map((item, i) => (
                      <div key={i} className={styles.barRow}>
                        <div
                          className={styles.barNew}
                          style={{
                            width: `${
                              (item.new /
                                Math.max(
                                  ...backlinkAnalytics.newAndLost.newReferringDomains.map(
                                    (d) => d.new
                                  )
                                )) *
                              60
                            }%`,
                          }}
                        />
                        <div
                          className={styles.barLost}
                          style={{
                            width: `${
                              (item.lost /
                                Math.max(
                                  ...backlinkAnalytics.newAndLost.newReferringDomains.map(
                                    (d) => d.lost
                                  )
                                )) *
                              40
                            }%`,
                          }}
                        />
                      </div>
                    )) ||
                    Array.from({ length: 15 }, (_, i) => (
                      <div key={i} className={styles.barRow}>
                        <div
                          className={styles.barNew}
                          style={{ width: `${Math.random() * 60 + 20}%` }}
                        />
                        <div
                          className={styles.barLost}
                          style={{ width: `${Math.random() * 40 + 10}%` }}
                        />
                      </div>
                    ))}
                </div>
              )}
            </div>
            <Button
              size="small"
              type="primary"
              className={styles.fullReportBtn}
            >
              Full report
            </Button>
          </Card>
        </Col>

        <Col xs={24} lg={12}>
          <Card className={styles.chartCard}>
            <div className={styles.chartHeader}>
              <Title level={4}>New and Lost Backlinks</Title>
              <div className={styles.legend}>
                <span className={styles.legendItem}>
                  <span
                    className={styles.legendColor}
                    style={{ backgroundColor: CHART_COLORS.primary }}
                  />
                  New
                </span>
                <span className={styles.legendItem}>
                  <span
                    className={styles.legendColor}
                    style={{ backgroundColor: CHART_COLORS.secondary }}
                  />
                  Lost
                </span>
              </div>
              <Select defaultValue="This month" size="small">
                <Option value="This month">This month</Option>
                <Option value="Last month">Last month</Option>
              </Select>
            </div>

            <div className={styles.barChartContainer}>
              {isLoading("backlinkAnalytics") ? (
                <LoadingCard />
              ) : (
                <div className={styles.horizontalBars}>
                  {backlinkAnalytics?.newAndLost.newBacklinks
                    .slice(0, 15)
                    .map((item, i) => (
                      <div key={i} className={styles.barRow}>
                        <div
                          className={styles.barNew}
                          style={{
                            width: `${
                              (item.new /
                                Math.max(
                                  ...backlinkAnalytics.newAndLost.newBacklinks.map(
                                    (d) => d.new
                                  )
                                )) *
                              60
                            }%`,
                          }}
                        />
                        <div
                          className={styles.barLost}
                          style={{
                            width: `${
                              (item.lost /
                                Math.max(
                                  ...backlinkAnalytics.newAndLost.newBacklinks.map(
                                    (d) => d.lost
                                  )
                                )) *
                              40
                            }%`,
                          }}
                        />
                      </div>
                    )) ||
                    Array.from({ length: 15 }, (_, i) => (
                      <div key={i} className={styles.barRow}>
                        <div
                          className={styles.barNew}
                          style={{ width: `${Math.random() * 60 + 20}%` }}
                        />
                        <div
                          className={styles.barLost}
                          style={{ width: `${Math.random() * 40 + 10}%` }}
                        />
                      </div>
                    ))}
                </div>
              )}
            </div>
            <Button
              size="small"
              type="primary"
              className={styles.fullReportBtn}
            >
              Full report
            </Button>
          </Card>
        </Col>
      </Row>

      {/* Bottom Section */}
      <Row gutter={[24, 24]} className={styles.bottomSection}>
        <Col xs={24} lg={8}>
          <Card className={styles.chartCard}>
            <div className={styles.chartHeader}>
              <Title level={4}>Anchors</Title>
              <Text type="secondary">1-100({anchorsData.length})</Text>
              <Button size="small" type="default">
                Export
              </Button>
            </div>

            {isLoading("backlinkAnalytics") ? (
              <LoadingCard />
            ) : (
              <Table
                dataSource={anchorsData}
                pagination={false}
                size="small"
                className={styles.dataTable}
              >
                <Table.Column
                  title="Anchor Text"
                  dataIndex="anchorText"
                  key="anchorText"
                />
                <Table.Column
                  title="Backlinks"
                  dataIndex="backlinks"
                  key="backlinks"
                />
                <Table.Column
                  title="Domains"
                  dataIndex="domains"
                  key="domains"
                />
              </Table>
            )}
          </Card>
        </Col>

        <Col xs={24} lg={8}>
          <Card className={styles.chartCard}>
            <div className={styles.chartHeader}>
              <Title level={4}>Top Countries</Title>
            </div>

            {isLoading("domainOverview") ? (
              <LoadingCard />
            ) : (
              <div className={styles.countriesList}>
                {topCountries.map((country, index) => {
                  // Map country names to flag emojis
                  const flagMap: Record<string, string> = {
                    Nigeria: "🇳🇬",
                    Ghana: "🇬🇭",
                    Brazil: "🇧🇷",
                    India: "🇮🇳",
                    "United States": "🇺🇸",
                    "United States of America": "🇺🇸",
                    Germany: "🇩🇪",
                  };

                  return (
                    <div key={index} className={styles.countryItem}>
                      <span className={styles.flag}>
                        {flagMap[country.country] || "🌍"}
                      </span>
                      <span className={styles.countryName}>
                        {country.country}
                      </span>
                      <div className={styles.countryProgress}>
                        <div
                          className={styles.progressBar}
                          style={{ width: `${country.percentage}%` }}
                        />
                      </div>
                      <span className={styles.countryPercentage}>
                        {country.percentage}%
                      </span>
                      <span className={styles.countryCount}>
                        {country.count}
                      </span>
                    </div>
                  );
                })}
              </div>
            )}
          </Card>
        </Col>

        <Col xs={24} lg={8}>
          <div className={styles.rightColumn}>
            <Card className={styles.chartCard}>
              <div className={styles.chartHeader}>
                <Title level={4}>Top Pages</Title>
                <Button size="small" type="primary">
                  Full report
                </Button>
              </div>

              {isLoading("backlinkAnalytics") ? (
                <LoadingCard />
              ) : (
                <Table
                  dataSource={topPages}
                  pagination={false}
                  size="small"
                  className={styles.dataTable}
                >
                  <Table.Column title="URL" dataIndex="url" key="url" />
                  <Table.Column
                    title="Backlinks"
                    dataIndex="backlinks"
                    key="backlinks"
                  />
                  <Table.Column
                    title="Domains"
                    dataIndex="domains"
                    key="domains"
                  />
                </Table>
              )}
            </Card>

            <Card className={styles.chartCard}>
              <div className={styles.chartHeader}>
                <Title level={4}>TLD Distribution</Title>
                <Button size="small" type="primary">
                  Full report
                </Button>
              </div>

              <div className={styles.tldSection}>
                {isLoading("domainOverview") ? (
                  <LoadingCard />
                ) : (
                  <>
                    <div className={styles.pieChartContainer}>
                      <ResponsiveContainer width="100%" height={120}>
                        <PieChart>
                          <Pie
                            data={tldData}
                            cx="50%"
                            cy="50%"
                            innerRadius={20}
                            outerRadius={50}
                            paddingAngle={5}
                            dataKey="value"
                          >
                            {tldData.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                          </Pie>
                        </PieChart>
                      </ResponsiveContainer>
                    </div>

                    <div className={styles.tldLegend}>
                      {tldData.map((item, index) => (
                        <div key={index} className={styles.tldItem}>
                          <span
                            className={styles.tldColor}
                            style={{ backgroundColor: item.color }}
                          />
                          <span className={styles.tldName}>{item.name}</span>
                          <span className={styles.tldPercentage}>
                            {item.value}%
                          </span>
                          <span className={styles.tldCount}>
                            {Math.round(
                              (item.value / 100) *
                                (domainOverview?.backlinks.total || 100000)
                            )}
                          </span>
                        </div>
                      ))}
                    </div>

                    <div className={styles.linkTypesLegend}>
                      <div className={styles.linkTypeItem}>
                        <span
                          className={styles.linkTypeColor}
                          style={{ backgroundColor: CHART_COLORS.secondary }}
                        />
                        <span>Follow links</span>
                        <span>
                          {linkAttributes.find((attr) => attr.type === "Follow")
                            ?.percentage || "98%"}
                        </span>
                      </div>
                      <div className={styles.linkTypeItem}>
                        <span
                          className={styles.linkTypeColor}
                          style={{ backgroundColor: CHART_COLORS.primary }}
                        />
                        <span>NoFollow links</span>
                        <span>
                          {linkAttributes.find(
                            (attr) => attr.type === "NoFollow"
                          )?.percentage || "2%"}
                        </span>
                      </div>
                      <Button size="small" type="primary">
                        View Details
                      </Button>
                    </div>
                  </>
                )}
              </div>
            </Card>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default BacklinksPage;
