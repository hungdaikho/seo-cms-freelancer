"use client";
import React, { useState, useEffect } from "react";
import {
  Button,
  Card,
  Col,
  Row,
  Select,
  Table,
  Space,
  Typography,
  Input,
  Tag,
  Collapse,
  Spin,
  Progress,
  Statistic,
  App,
  Modal,
  Form,
  Checkbox,
  Dropdown,
  Menu,
  notification,
} from "antd";
import {
  DownloadOutlined,
  SearchOutlined,
  LinkOutlined,
  TrophyOutlined,
  BarChartOutlined,
  PlusOutlined,
  MailOutlined,
  ExportOutlined,
  FileExcelOutlined,
  SendOutlined,
} from "@ant-design/icons";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Legend,
  AreaChart,
  Area,
} from "recharts";
import { useAppDispatch, useAppSelector } from "@/stores/hooks";
import {
  compareBacklinkProfiles,
  getLinkBuildingProspects,
  setFilters,
  addCompetitor,
  removeCompetitor,
  clearBacklinkGapAnalysis,
} from "@/stores/slices/competitive.slice";
import styles from "./BacklinkGap.module.scss";

const { Title, Text } = Typography;
const { Option } = Select;

type Props = {};

const BacklinkGapPage = (props: Props) => {
  const { message } = App.useApp();
  const dispatch = useAppDispatch();
  const {
    backlinkGapAnalysis,
    linkBuildingProspects,
    loading,
    error,
    filters,
  } = useAppSelector((state) => state.competitive);

  const [targetDomain, setTargetDomain] = useState("");
  const [newCompetitor, setNewCompetitor] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [authorityFilter, setAuthorityFilter] = useState(30);
  const [selectedProspects, setSelectedProspects] = useState<string[]>([]);
  const [outreachModalVisible, setOutreachModalVisible] = useState(false);
  const [exportModalVisible, setExportModalVisible] = useState(false);
  const [outreachForm] = Form.useForm();
  const [exportOptions, setExportOptions] = useState({
    format: "csv",
    includeSelected: false,
    includeFilters: true,
    includeStats: true,
  });

  useEffect(() => {
    // Clear previous data when component mounts
    dispatch(clearBacklinkGapAnalysis());
  }, [dispatch]);

  const handleAddCompetitor = () => {
    if (
      newCompetitor.trim() &&
      !filters.competitors.includes(newCompetitor.trim())
    ) {
      dispatch(addCompetitor(newCompetitor.trim()));
      setNewCompetitor("");
    }
  };

  const handleRemoveCompetitor = (competitor: string) => {
    dispatch(removeCompetitor(competitor));
  };

  const handleAnalyze = async () => {
    if (!targetDomain || filters.competitors.length === 0) {
      message.error("Please enter target domain and at least one competitor");
      return;
    }

    try {
      // Compare backlink profiles
      await dispatch(
        compareBacklinkProfiles({
          targetDomain,
          competitors: filters.competitors,
          filters: {
            minAuthorityScore: authorityFilter,
          },
        })
      ).unwrap();

      // Get link building prospects
      await dispatch(
        getLinkBuildingProspects({
          domain: targetDomain,
          limit: 100,
          minAuthorityScore: authorityFilter,
        })
      ).unwrap();

      message.success("Backlink gap analysis completed successfully!");
    } catch (error: any) {
      message.error(error.message || "Failed to analyze backlink gap");
    }
  };

  const handleClearAll = () => {
    setTargetDomain("");
    setNewCompetitor("");
    dispatch(
      setFilters({
        domain: "",
        competitors: [],
      })
    );
    dispatch(clearBacklinkGapAnalysis());
  };

  const handleExportData = (customOptions?: typeof exportOptions) => {
    const options = customOptions || exportOptions;
    const dataToExport =
      options.includeSelected && selectedProspects.length > 0
        ? (linkBuildingProspects?.prospects || []).filter((prospect) =>
            selectedProspects.includes(prospect.domain)
          )
        : filteredProspects || [];

    if (!dataToExport.length) {
      message.warning("No data to export");
      return;
    }

    const csvData = dataToExport.map((prospect) => ({
      Domain: prospect.domain,
      "Authority Score": prospect.authorityScore,
      "Monthly Visits": prospect.monthlyVisits,
      "Competitor Links": (prospect.competitorLinks || []).join("; "),
      "Link Type": prospect.linkType,
      Category: prospect.category,
      Opportunity: prospect.opportunity,
      "Target Domain": targetDomain,
      "Analysis Date": new Date().toLocaleDateString(),
    }));

    let csvContent = "";

    // Add header with analysis info if requested
    if (options.includeStats) {
      csvContent += `Backlink Gap Analysis Report\n`;
      csvContent += `Target Domain:,${targetDomain}\n`;
      csvContent += `Competitors:,"${filters.competitors.join(", ")}"\n`;
      csvContent += `Analysis Date:,${new Date().toLocaleDateString()}\n`;
      csvContent += `Total Prospects:,${
        linkBuildingProspects?.summary?.totalProspects || 0
      }\n`;
      csvContent += `Selected Prospects:,${selectedProspects.length}\n\n`;
    }

    // Add data
    csvContent += [
      Object.keys(csvData[0]).join(","),
      ...csvData.map((row) =>
        Object.values(row)
          .map((val) =>
            typeof val === "string" && val.includes(",") ? `"${val}"` : val
          )
          .join(",")
      ),
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;

    const filename = options.includeSelected
      ? `backlink-prospects-selected-${targetDomain}-${
          new Date().toISOString().split("T")[0]
        }.csv`
      : `backlink-prospects-all-${targetDomain}-${
          new Date().toISOString().split("T")[0]
        }.csv`;

    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);

    message.success(`Exported ${dataToExport.length} prospects successfully!`);
    setExportModalVisible(false);
  };

  const handleQuickExport = () => {
    handleExportData();
  };

  const handleStartOutreach = () => {
    if (selectedProspects.length === 0) {
      message.warning("Please select at least one prospect for outreach");
      return;
    }
    setOutreachModalVisible(true);
  };

  const handleOutreachSubmit = async (values: any) => {
    try {
      const selectedProspectData = (
        linkBuildingProspects?.prospects || []
      ).filter((prospect) => selectedProspects.includes(prospect.domain));

      const outreachData = {
        prospects: selectedProspectData,
        campaign: {
          name: values.campaignName,
          subject: values.emailSubject,
          template: values.emailTemplate,
          followUpDays: values.followUpDays,
          priority: values.priority,
        },
        targetDomain,
        createdAt: new Date().toISOString(),
      };

      // Here you would typically send this data to your backend
      console.log("Outreach Campaign Data:", outreachData);

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      notification.success({
        message: "Outreach Campaign Created",
        description: `Successfully created outreach campaign for ${selectedProspects.length} prospects`,
        duration: 4,
      });

      setOutreachModalVisible(false);
      outreachForm.resetFields();

      // Optionally clear selections
      setSelectedProspects([]);
    } catch (error) {
      message.error("Failed to create outreach campaign");
      console.error("Outreach error:", error);
    }
  };

  const exportMenuItems = [
    {
      key: "quick",
      label: "Quick Export (Current View)",
      icon: <ExportOutlined />,
      onClick: handleQuickExport,
    },
    {
      key: "selected",
      label: `Export Selected (${selectedProspects.length})`,
      icon: <FileExcelOutlined />,
      disabled: selectedProspects.length === 0,
      onClick: () => {
        handleExportData({
          ...exportOptions,
          includeSelected: true,
        });
      },
    },
    {
      key: "advanced",
      label: "Advanced Export Options",
      icon: <DownloadOutlined />,
      onClick: () => setExportModalVisible(true),
    },
  ];

  // Transform authority trend data for chart
  const authorityTrendData =
    backlinkGapAnalysis?.authorityTrend?.map((item) => ({
      date: new Date(item.date).toLocaleDateString("en-US", {
        month: "short",
        year: "numeric",
      }),
      [targetDomain]: item.targetDomain,
      ...(item.competitor1 && { [filters.competitors[0]]: item.competitor1 }),
      ...(item.competitor2 && { [filters.competitors[1]]: item.competitor2 }),
    })) || [];

  // Transform referring domains trend data for chart
  const referringDomainsTrendData =
    backlinkGapAnalysis?.referringDomainsTrend?.map((item) => ({
      date: new Date(item.date).toLocaleDateString("en-US", {
        month: "short",
        year: "numeric",
      }),
      [targetDomain]: item.targetDomain,
      ...(item.competitor1 && { [filters.competitors[0]]: item.competitor1 }),
      ...(item.competitor2 && { [filters.competitors[1]]: item.competitor2 }),
    })) || [];

  // Filter prospects based on selected filter
  const filteredProspects =
    linkBuildingProspects?.prospects?.filter((prospect) => {
      switch (selectedFilter) {
        case "high":
          return prospect.opportunity === "high";
        case "medium":
          return prospect.opportunity === "medium";
        case "low":
          return prospect.opportunity === "low";
        case "unique":
          return (prospect.competitorLinks || []).length === 1;
        case "shared":
          return (prospect.competitorLinks || []).length > 1;
        default:
          return true;
      }
    }) || [];

  const prospectsColumns = [
    {
      title: "Domain",
      dataIndex: "domain",
      key: "domain",
      render: (domain: string, record: any) => (
        <div>
          <Button
            type="link"
            style={{ padding: 0, color: "#1890ff" }}
            icon={<LinkOutlined />}
            onClick={() => window.open(`https://${domain}`, "_blank")}
          >
            {domain}
          </Button>
          <div style={{ fontSize: "12px", color: "#666", marginTop: "2px" }}>
            {record.category}
          </div>
        </div>
      ),
    },
    {
      title: "Authority Score",
      dataIndex: "authorityScore",
      key: "authorityScore",
      render: (score: number) => (
        <Space>
          <Text strong>{score}</Text>
          <Progress
            percent={score}
            size="small"
            showInfo={false}
            strokeColor={
              score >= 70 ? "#52c41a" : score >= 40 ? "#faad14" : "#ff4d4f"
            }
          />
        </Space>
      ),
      sorter: (a: any, b: any) => a.authorityScore - b.authorityScore,
    },
    {
      title: "Monthly Visits",
      dataIndex: "monthlyVisits",
      key: "monthlyVisits",
      render: (visits: number) => (
        <Text>
          {visits >= 1000000
            ? `${(visits / 1000000).toFixed(1)}M`
            : visits >= 1000
            ? `${(visits / 1000).toFixed(1)}K`
            : visits}
        </Text>
      ),
      sorter: (a: any, b: any) => a.monthlyVisits - b.monthlyVisits,
    },
    {
      title: "Competitor Links",
      dataIndex: "competitorLinks",
      key: "competitorLinks",
      render: (links: string[] = [], record: any) => (
        <Space direction="vertical" size="small">
          {(links || []).map((competitor, index) => (
            <Tag key={index} color="blue" style={{ fontSize: "11px" }}>
              {competitor}
            </Tag>
          ))}
        </Space>
      ),
    },
    {
      title: "Link Type",
      dataIndex: "linkType",
      key: "linkType",
      render: (type: string) => (
        <Tag color={type === "dofollow" ? "green" : "orange"}>{type}</Tag>
      ),
    },
    {
      title: "Opportunity",
      dataIndex: "opportunity",
      key: "opportunity",
      render: (opportunity: string) => {
        const color =
          opportunity === "high"
            ? "red"
            : opportunity === "medium"
            ? "orange"
            : "blue";
        return <Tag color={color}>{opportunity?.toUpperCase()}</Tag>;
      },
      filters: [
        { text: "High", value: "high" },
        { text: "Medium", value: "medium" },
        { text: "Low", value: "low" },
      ],
      onFilter: (value: any, record: any) => record.opportunity === value,
    },
    {
      title: "Action",
      key: "action",
      render: (_: any, record: any) => (
        <Space>
          <Button
            size="small"
            type={
              selectedProspects.includes(record.domain) ? "default" : "primary"
            }
            onClick={() => {
              setSelectedProspects((prev) =>
                prev.includes(record.domain)
                  ? prev.filter((d) => d !== record.domain)
                  : [...prev, record.domain]
              );
            }}
          >
            {selectedProspects.includes(record.domain) ? "Deselect" : "Select"}
          </Button>
          <Button
            size="small"
            icon={<LinkOutlined />}
            onClick={() => window.open(`https://${record.domain}`, "_blank")}
            title="Visit Website"
          />
          <Button
            size="small"
            icon={<MailOutlined />}
            onClick={() => {
              if (!selectedProspects.includes(record.domain)) {
                setSelectedProspects((prev) => [...prev, record.domain]);
              }
              setOutreachModalVisible(true);
            }}
            title="Quick Outreach"
          />
        </Space>
      ),
    },
  ];

  return (
    <div className={styles.backlinkGap}>
      <div style={{ padding: "24px" }}>
        {/* Header */}
        <Row
          align="middle"
          justify="space-between"
          style={{ marginBottom: "24px" }}
        >
          <Col>
            <Title level={2} style={{ margin: 0 }}>
              <LinkOutlined style={{ marginRight: 8 }} />
              Backlink Gap Analysis
            </Title>
            <Text type="secondary">
              Discover link building opportunities by comparing backlink
              profiles
            </Text>
          </Col>
        </Row>

        {/* Domain Selection */}
        <Card
          className={styles.domainInputSection}
          style={{ marginBottom: "24px" }}
          title={
            <Space>
              <SearchOutlined />
              <span>Domain Analysis Setup</span>
            </Space>
          }
        >
          <Row gutter={[16, 16]}>
            <Col span={8}>
              <Space direction="vertical" style={{ width: "100%" }}>
                <Text strong>Target Domain</Text>
                <Input
                  placeholder="Enter your domain (e.g., example.com)"
                  value={targetDomain}
                  onChange={(e) => setTargetDomain(e.target.value)}
                  size="large"
                />
              </Space>
            </Col>
            <Col span={8}>
              <Space direction="vertical" style={{ width: "100%" }}>
                <Text strong>Add Competitor</Text>
                <Space.Compact style={{ width: "100%" }}>
                  <Input
                    placeholder="Enter competitor domain"
                    value={newCompetitor}
                    onChange={(e) => setNewCompetitor(e.target.value)}
                    onPressEnter={handleAddCompetitor}
                    size="large"
                    style={{ width: "calc(100% - 40px)" }}
                  />
                  <Button
                    icon={<PlusOutlined />}
                    onClick={handleAddCompetitor}
                    size="large"
                    type="primary"
                  />
                </Space.Compact>
              </Space>
            </Col>
            <Col span={8}>
              <Space direction="vertical" style={{ width: "100%" }}>
                <Text strong>Min Authority Score</Text>
                <Select
                  value={authorityFilter}
                  onChange={setAuthorityFilter}
                  style={{ width: "100%" }}
                  size="large"
                >
                  <Option value={10}>10+</Option>
                  <Option value={20}>20+</Option>
                  <Option value={30}>30+</Option>
                  <Option value={40}>40+</Option>
                  <Option value={50}>50+</Option>
                  <Option value={60}>60+</Option>
                  <Option value={70}>70+</Option>
                </Select>
              </Space>
            </Col>
          </Row>

          {/* Selected Competitors */}
          {filters.competitors.length > 0 && (
            <Row style={{ marginTop: "16px" }}>
              <Col span={24}>
                <Text strong>Selected Competitors:</Text>
                <div style={{ marginTop: "8px" }}>
                  <Space wrap>
                    {filters.competitors.map((competitor, index) => (
                      <Tag
                        key={index}
                        closable
                        onClose={() => handleRemoveCompetitor(competitor)}
                        color="blue"
                      >
                        {competitor}
                      </Tag>
                    ))}
                  </Space>
                </div>
              </Col>
            </Row>
          )}

          <Row style={{ marginTop: "16px" }}>
            <Col>
              <Space>
                <Button
                  type="primary"
                  size="large"
                  icon={<SearchOutlined />}
                  onClick={handleAnalyze}
                  loading={loading.backlinkGap || loading.linkProspects}
                >
                  Analyze Backlink Gap
                </Button>
                <Button size="large" onClick={handleClearAll}>
                  Clear All
                </Button>
              </Space>
            </Col>
          </Row>
        </Card>

        {/* Overview Stats */}
        {backlinkGapAnalysis?.overview?.metrics && (
          <Row gutter={[16, 16]} style={{ marginBottom: "24px" }}>
            <Col span={6}>
              <Card>
                <Statistic
                  title="Target Domain Backlinks"
                  value={
                    backlinkGapAnalysis.overview.metrics.totalBacklinks || 0
                  }
                  prefix={<LinkOutlined />}
                  formatter={(value) => {
                    const numValue = Number(value);
                    return numValue >= 1000000
                      ? `${(numValue / 1000000).toFixed(1)}M`
                      : numValue >= 1000
                      ? `${(numValue / 1000).toFixed(1)}K`
                      : numValue;
                  }}
                />
              </Card>
            </Col>
            <Col span={6}>
              <Card>
                <Statistic
                  title="Referring Domains"
                  value={
                    backlinkGapAnalysis.overview.metrics.referringDomains || 0
                  }
                  prefix={<BarChartOutlined />}
                  formatter={(value) => {
                    const numValue = Number(value);
                    return numValue >= 1000000
                      ? `${(numValue / 1000000).toFixed(1)}M`
                      : numValue >= 1000
                      ? `${(numValue / 1000).toFixed(1)}K`
                      : numValue;
                  }}
                />
              </Card>
            </Col>
            <Col span={6}>
              <Card>
                <Statistic
                  title="Authority Score"
                  value={
                    backlinkGapAnalysis.overview.metrics.authorityScore || 0
                  }
                  prefix={<TrophyOutlined />}
                  suffix="/100"
                />
              </Card>
            </Col>
            <Col span={6}>
              <Card>
                <Statistic
                  title="Missing Opportunities"
                  value={
                    backlinkGapAnalysis.overview.gaps?.missingOpportunities || 0
                  }
                  valueStyle={{ color: "#ff4d4f" }}
                />
              </Card>
            </Col>
          </Row>
        )}

        {/* Charts Section */}
        {backlinkGapAnalysis && (
          <Collapse
            defaultActiveKey={["1"]}
            style={{ marginBottom: "24px" }}
            items={[
              {
                key: "1",
                label: "Trend Analysis",
                children: (
                  <Row gutter={[24, 24]}>
                    {/* Authority Score Chart */}
                    <Col span={12}>
                      <Card>
                        <Title level={4}>Authority Score Trend</Title>
                        <Text style={{ fontSize: "12px", color: "#666" }}>
                          {targetDomain} vs Competitors - Last 12 months
                        </Text>
                        <div
                          style={{ height: "300px", marginTop: "16px" }}
                          className={styles.chartContainer}
                        >
                          <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={authorityTrendData}>
                              <CartesianGrid strokeDasharray="3 3" />
                              <XAxis dataKey="date" />
                              <YAxis />
                              <Area
                                type="monotone"
                                dataKey={targetDomain}
                                stroke="#1890ff"
                                fill="#1890ff"
                                fillOpacity={0.3}
                                name={targetDomain}
                              />
                              {filters.competitors.map((competitor, index) => (
                                <Area
                                  key={competitor}
                                  type="monotone"
                                  dataKey={competitor}
                                  stroke={index === 0 ? "#52c41a" : "#fa8c16"}
                                  fill={index === 0 ? "#52c41a" : "#fa8c16"}
                                  fillOpacity={0.3}
                                  name={competitor}
                                />
                              ))}
                              <Legend />
                            </AreaChart>
                          </ResponsiveContainer>
                        </div>
                      </Card>
                    </Col>

                    {/* Referring Domains Chart */}
                    <Col span={12}>
                      <Card>
                        <Title level={4}>Referring Domains Trend</Title>
                        <Text style={{ fontSize: "12px", color: "#666" }}>
                          {targetDomain} vs Competitors - Last 12 months
                        </Text>
                        <div
                          style={{ height: "300px", marginTop: "16px" }}
                          className={styles.chartContainer}
                        >
                          <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={referringDomainsTrendData}>
                              <CartesianGrid strokeDasharray="3 3" />
                              <XAxis dataKey="date" />
                              <YAxis />
                              <Line
                                type="monotone"
                                dataKey={targetDomain}
                                stroke="#1890ff"
                                strokeWidth={2}
                                name={targetDomain}
                              />
                              {filters.competitors.map((competitor, index) => (
                                <Line
                                  key={competitor}
                                  type="monotone"
                                  dataKey={competitor}
                                  stroke={index === 0 ? "#52c41a" : "#fa8c16"}
                                  strokeWidth={2}
                                  name={competitor}
                                />
                              ))}
                              <Legend />
                            </LineChart>
                          </ResponsiveContainer>
                        </div>
                      </Card>
                    </Col>
                  </Row>
                ),
              },
            ]}
          />
        )}

        {/* Prospects Table */}
        {linkBuildingProspects && (
          <Card>
            <Row
              justify="space-between"
              align="middle"
              style={{ marginBottom: "16px" }}
            >
              <Col>
                <div className={styles.prospectsHeader}>
                  <Title level={4}>
                    Link Building Prospects for:{" "}
                    <Text code>{targetDomain}</Text>
                  </Title>
                  <Space direction="vertical" size={0}>
                    <Text type="secondary">
                      {linkBuildingProspects?.prospects?.length || 0} prospects
                      found
                    </Text>
                    {selectedProspects.length > 0 && (
                      <Text style={{ color: "#1890ff", fontWeight: 500 }}>
                        🎯 {selectedProspects.length} prospects ready for
                        outreach
                      </Text>
                    )}
                  </Space>
                </div>
              </Col>
              <Col>
                <Space>
                  <Dropdown
                    menu={{ items: exportMenuItems }}
                    trigger={["click"]}
                    placement="bottomLeft"
                  >
                    <Button icon={<DownloadOutlined />}>
                      Export CSV <DownloadOutlined />
                    </Button>
                  </Dropdown>
                  <Button
                    type="primary"
                    icon={<SendOutlined />}
                    disabled={selectedProspects.length === 0}
                    onClick={handleStartOutreach}
                  >
                    Start Outreach ({selectedProspects.length})
                  </Button>
                </Space>
              </Col>
            </Row>

            {/* Summary Stats */}
            {linkBuildingProspects?.summary && (
              <Row gutter={[16, 16]} style={{ marginBottom: "16px" }}>
                <Col span={6}>
                  <Card size="small">
                    <Statistic
                      title="Total Prospects"
                      value={linkBuildingProspects.summary.totalProspects || 0}
                    />
                  </Card>
                </Col>
                <Col span={6}>
                  <Card size="small">
                    <Statistic
                      title="High Priority"
                      value={linkBuildingProspects.summary.highPriority || 0}
                      valueStyle={{ color: "#ff4d4f" }}
                    />
                  </Card>
                </Col>
                <Col span={6}>
                  <Card size="small">
                    <Statistic
                      title="Medium Priority"
                      value={linkBuildingProspects.summary.mediumPriority || 0}
                      valueStyle={{ color: "#faad14" }}
                    />
                  </Card>
                </Col>
                <Col span={6}>
                  <Card size="small">
                    <Statistic
                      title="Low Priority"
                      value={linkBuildingProspects.summary.lowPriority || 0}
                      valueStyle={{ color: "#52c41a" }}
                    />
                  </Card>
                </Col>
              </Row>
            )}

            {/* Filter Tags */}
            <div className={styles.filterTags}>
              <Row style={{ marginBottom: "16px" }} justify="space-between">
                <Col>
                  <Space wrap>
                    <Tag
                      color={selectedFilter === "all" ? "blue" : "default"}
                      style={{ cursor: "pointer" }}
                      onClick={() => setSelectedFilter("all")}
                    >
                      All
                    </Tag>
                    <Tag
                      color={selectedFilter === "high" ? "red" : "default"}
                      style={{ cursor: "pointer" }}
                      onClick={() => setSelectedFilter("high")}
                    >
                      High Priority
                    </Tag>
                    <Tag
                      color={selectedFilter === "medium" ? "orange" : "default"}
                      style={{ cursor: "pointer" }}
                      onClick={() => setSelectedFilter("medium")}
                    >
                      Medium Priority
                    </Tag>
                    <Tag
                      color={selectedFilter === "low" ? "green" : "default"}
                      style={{ cursor: "pointer" }}
                      onClick={() => setSelectedFilter("low")}
                    >
                      Low Priority
                    </Tag>
                    <Tag
                      color={selectedFilter === "unique" ? "purple" : "default"}
                      style={{ cursor: "pointer" }}
                      onClick={() => setSelectedFilter("unique")}
                    >
                      Unique
                    </Tag>
                    <Tag
                      color={selectedFilter === "shared" ? "cyan" : "default"}
                      style={{ cursor: "pointer" }}
                      onClick={() => setSelectedFilter("shared")}
                    >
                      Shared
                    </Tag>
                  </Space>
                </Col>
                <Col>
                  {selectedProspects.length > 0 && (
                    <Space>
                      <Text type="secondary">
                        {selectedProspects.length} selected
                      </Text>
                      <Button
                        size="small"
                        onClick={() => setSelectedProspects([])}
                      >
                        Clear Selection
                      </Button>
                      <Button
                        size="small"
                        type="primary"
                        onClick={() => {
                          const allVisible = (filteredProspects || []).map(
                            (p) => p.domain
                          );
                          setSelectedProspects(allVisible);
                        }}
                      >
                        Select All Visible
                      </Button>
                    </Space>
                  )}
                </Col>
              </Row>
            </div>

            {/* Table */}
            <Table
              columns={prospectsColumns}
              dataSource={(filteredProspects || []).map((prospect, index) => ({
                ...prospect,
                key: index,
              }))}
              loading={loading.linkProspects}
              pagination={{
                showSizeChanger: true,
                showQuickJumper: true,
                showTotal: (total, range) =>
                  `${range[0]}-${range[1]} of ${total} prospects`,
                pageSize: 20,
              }}
              scroll={{ x: 1200 }}
              rowSelection={{
                selectedRowKeys: selectedProspects,
                onChange: (selectedRowKeys) => {
                  setSelectedProspects(selectedRowKeys as string[]);
                  if (selectedRowKeys.length > 0) {
                    message.success(
                      `${selectedRowKeys.length} prospects selected for outreach`,
                      2
                    );
                  }
                },
                getCheckboxProps: (record) => ({
                  name: record.domain,
                }),
                selections: [
                  {
                    key: "all-high",
                    text: "Select High Priority",
                    onSelect: () => {
                      const highPriorityDomains = (filteredProspects || [])
                        .filter((p) => p.opportunity === "high")
                        .map((p) => p.domain);
                      setSelectedProspects((prev) => [
                        ...new Set([...prev, ...highPriorityDomains]),
                      ]);
                      message.success(
                        `Selected ${highPriorityDomains.length} high priority prospects`
                      );
                    },
                  },
                  {
                    key: "all-unique",
                    text: "Select Unique Opportunities",
                    onSelect: () => {
                      const uniqueDomains = (filteredProspects || [])
                        .filter((p) => (p.competitorLinks || []).length === 1)
                        .map((p) => p.domain);
                      setSelectedProspects((prev) => [
                        ...new Set([...prev, ...uniqueDomains]),
                      ]);
                      message.success(
                        `Selected ${uniqueDomains.length} unique opportunities`
                      );
                    },
                  },
                ],
              }}
            />
          </Card>
        )}

        {/* Loading State */}
        {(loading.backlinkGap || loading.linkProspects) && (
          <Card style={{ textAlign: "center", padding: "40px" }}>
            <Spin size="large" />
            <div style={{ marginTop: "16px" }}>
              <Text>Analyzing backlink gaps and finding prospects...</Text>
            </div>
          </Card>
        )}

        {/* Error State */}
        {(error.backlinkGap || error.linkProspects) && (
          <Card style={{ textAlign: "center", padding: "40px" }}>
            <Text type="danger">
              {error.backlinkGap || error.linkProspects}
            </Text>
            <div style={{ marginTop: "16px" }}>
              <Button onClick={handleAnalyze}>Try Again</Button>
            </div>
          </Card>
        )}

        {/* Empty State */}
        {!backlinkGapAnalysis &&
          !linkBuildingProspects &&
          !loading.backlinkGap &&
          !loading.linkProspects && (
            <Card style={{ textAlign: "center", padding: "60px" }}>
              <LinkOutlined
                style={{
                  fontSize: "48px",
                  color: "#d9d9d9",
                  marginBottom: "16px",
                }}
              />
              <Title level={3} type="secondary">
                No Analysis Yet
              </Title>
              <Text type="secondary">
                Enter your target domain and competitors above to start
                analyzing backlink gaps
              </Text>
            </Card>
          )}
      </div>

      {/* Export Options Modal */}
      <Modal
        title="Advanced Export Options"
        open={exportModalVisible}
        onCancel={() => setExportModalVisible(false)}
        footer={[
          <Button key="cancel" onClick={() => setExportModalVisible(false)}>
            Cancel
          </Button>,
          <Button
            key="export"
            type="primary"
            icon={<ExportOutlined />}
            onClick={() => handleExportData()}
          >
            Export CSV
          </Button>,
        ]}
        width={600}
      >
        <Form layout="vertical">
          <Form.Item label="Export Options">
            <Checkbox
              checked={exportOptions.includeSelected}
              onChange={(e) =>
                setExportOptions((prev) => ({
                  ...prev,
                  includeSelected: e.target.checked,
                }))
              }
              disabled={selectedProspects.length === 0}
            >
              Export only selected prospects ({selectedProspects.length})
            </Checkbox>
            <br />
            <Checkbox
              checked={exportOptions.includeStats}
              onChange={(e) =>
                setExportOptions((prev) => ({
                  ...prev,
                  includeStats: e.target.checked,
                }))
              }
            >
              Include analysis summary and statistics
            </Checkbox>
            <br />
            <Checkbox
              checked={exportOptions.includeFilters}
              onChange={(e) =>
                setExportOptions((prev) => ({
                  ...prev,
                  includeFilters: e.target.checked,
                }))
              }
            >
              Include filter information in export
            </Checkbox>
          </Form.Item>

          <Form.Item label="Export Preview">
            <div
              style={{
                background: "#f5f5f5",
                padding: "12px",
                borderRadius: "6px",
                fontFamily: "monospace",
                fontSize: "12px",
              }}
            >
              <strong>File name:</strong>{" "}
              {exportOptions.includeSelected
                ? `backlink-prospects-selected-${targetDomain || "domain"}-${
                    new Date().toISOString().split("T")[0]
                  }.csv`
                : `backlink-prospects-all-${targetDomain || "domain"}-${
                    new Date().toISOString().split("T")[0]
                  }.csv`}
              <br />
              <strong>Records to export:</strong>{" "}
              {exportOptions.includeSelected && selectedProspects.length > 0
                ? selectedProspects.length
                : (filteredProspects || []).length}
              <br />
              <strong>Includes:</strong>{" "}
              {[
                exportOptions.includeStats && "Analysis Summary",
                exportOptions.includeFilters && "Filter Info",
                "Prospect Data",
              ]
                .filter(Boolean)
                .join(", ")}
            </div>
          </Form.Item>
        </Form>
      </Modal>

      {/* Start Outreach Modal */}
      <Modal
        title={
          <Space>
            <MailOutlined />
            Create Outreach Campaign
          </Space>
        }
        open={outreachModalVisible}
        onCancel={() => {
          setOutreachModalVisible(false);
          outreachForm.resetFields();
        }}
        footer={null}
        width={800}
      >
        <Form
          form={outreachForm}
          layout="vertical"
          onFinish={handleOutreachSubmit}
          initialValues={{
            priority: "medium",
            followUpDays: 7,
            emailSubject: `Partnership Opportunity - ${targetDomain}`,
            emailTemplate: `Hi [Name],

I hope this email finds you well. I came across [Domain] and was impressed by your content in the [Category] space.

I'm reaching out from ${targetDomain} because I believe there might be a mutually beneficial partnership opportunity between our sites.

Would you be interested in exploring a potential collaboration?

Best regards,
[Your Name]`,
          }}
        >
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="campaignName"
                label="Campaign Name"
                rules={[
                  { required: true, message: "Please enter campaign name" },
                ]}
              >
                <Input placeholder="e.g., Q1 2024 Backlink Outreach" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="priority"
                label="Priority"
                rules={[{ required: true }]}
              >
                <Select>
                  <Select.Option value="high">High Priority</Select.Option>
                  <Select.Option value="medium">Medium Priority</Select.Option>
                  <Select.Option value="low">Low Priority</Select.Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>

          <Form.Item
            name="emailSubject"
            label="Email Subject"
            rules={[{ required: true, message: "Please enter email subject" }]}
          >
            <Input placeholder="Partnership Opportunity - Your Domain" />
          </Form.Item>

          <Form.Item
            name="emailTemplate"
            label="Email Template"
            rules={[{ required: true, message: "Please enter email template" }]}
          >
            <Input.TextArea
              rows={8}
              placeholder="Your outreach email template..."
            />
          </Form.Item>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="followUpDays"
                label="Follow-up After (Days)"
                rules={[{ required: true }]}
              >
                <Select>
                  <Select.Option value={3}>3 days</Select.Option>
                  <Select.Option value={7}>7 days</Select.Option>
                  <Select.Option value={14}>14 days</Select.Option>
                  <Select.Option value={30}>30 days</Select.Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="Selected Prospects">
                <div
                  style={{
                    background: "#f0f2f5",
                    padding: "8px 12px",
                    borderRadius: "6px",
                    fontSize: "14px",
                  }}
                >
                  <strong>{selectedProspects.length}</strong> prospects selected
                  for outreach
                </div>
              </Form.Item>
            </Col>
          </Row>

          <div
            style={{
              background: "#e6f7ff",
              border: "1px solid #91d5ff",
              borderRadius: "6px",
              padding: "12px",
              marginBottom: "16px",
            }}
          >
            <strong>💡 Pro Tips:</strong>
            <ul style={{ margin: "8px 0", paddingLeft: "20px" }}>
              <li>
                Personalize your emails using [Name] and [Domain] placeholders
              </li>
              <li>
                Research each prospect before sending to increase response rates
              </li>
              <li>Keep initial emails concise and value-focused</li>
              <li>
                Follow up politely if you don't hear back within your specified
                timeframe
              </li>
            </ul>
          </div>

          <Form.Item style={{ marginBottom: 0, textAlign: "right" }}>
            <Space>
              <Button
                onClick={() => {
                  setOutreachModalVisible(false);
                  outreachForm.resetFields();
                }}
              >
                Cancel
              </Button>
              <Button type="primary" htmlType="submit" icon={<SendOutlined />}>
                Create Campaign
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};
export default BacklinkGapPage;
