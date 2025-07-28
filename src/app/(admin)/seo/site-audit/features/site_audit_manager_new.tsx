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
  Progress,
  Tag,
  Table,
  Space,
  Alert,
  Statistic,
  Spin,
  message,
  Tabs,
  List,
  Badge,
  Tooltip,
  Modal,
  Form,
  Switch,
  Slider,
} from "antd";
import {
  SearchOutlined,
  BugOutlined,
  ExclamationCircleOutlined,
  InfoCircleOutlined,
  CheckCircleOutlined,
  DownloadOutlined,
  ReloadOutlined,
  GlobalOutlined,
  MobileOutlined,
  ThunderboltOutlined,
  FileImageOutlined,
  PlayCircleOutlined,
  PauseCircleOutlined,
  DeleteOutlined,
  EyeOutlined,
  BarChartOutlined,
} from "@ant-design/icons";
import { useAppDispatch, useAppSelector } from "@/stores/hooks";
import { fetchProjects } from "@/stores/slices/project.slice";
import {
  startComprehensiveAudit,
  fetchAuditProgress,
  fetchRealAuditResults,
  fetchProjectAuditHistory,
  fetchAuditSummaryDashboard,
  cancelAudit,
  deleteRealAudit,
  exportAuditResults,
} from "@/stores/slices/audit.slice";
import { Project } from "@/types/api.type";
import { RealAuditResult } from "@/services/audit.service";
import styles from "./site_audit_manager.module.scss";

const { Title, Text, Paragraph } = Typography;
const { Option } = Select;
const { TabPane } = Tabs;

const SiteAuditManager: React.FC = () => {
  const dispatch = useAppDispatch();
  const { projects } = useAppSelector((state) => state.project);
  const {
    realAudits,
    currentRealAudit,
    auditProgress,
    auditSummary,
    loading,
    isRunningAudit,
    currentStep,
    error,
  } = useAppSelector((state) => state.audit);

  const [selectedProject, setSelectedProject] = useState<string>("");
  const [websiteUrl, setWebsiteUrl] = useState<string>("");
  const [activeTab, setActiveTab] = useState("overview");
  const [auditModalVisible, setAuditModalVisible] = useState(false);
  const [auditSettings, setAuditSettings] = useState({
    auditType: "full" as "full" | "technical" | "content" | "performance",
    crawlDepth: 3,
    includeImages: true,
    checkMobileFriendly: true,
    analyzePageSpeed: true,
  });

  // Auto-refresh progress when audit is running
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isRunningAudit && currentRealAudit?.id) {
      interval = setInterval(() => {
        dispatch(fetchAuditProgress(currentRealAudit.id));
      }, 3000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isRunningAudit, currentRealAudit?.id, dispatch]);

  useEffect(() => {
    dispatch(fetchProjects());
  }, [dispatch]);

  useEffect(() => {
    if (projects.length > 0 && !selectedProject) {
      const firstProject = projects[0];
      setSelectedProject(firstProject.id);
      setWebsiteUrl(firstProject.domain || "");

      // Load existing audits for the project
      dispatch(fetchProjectAuditHistory({ projectId: firstProject.id }));
      dispatch(fetchAuditSummaryDashboard(firstProject.id));
    }
  }, [projects, selectedProject, dispatch]);

  const handleProjectChange = (projectId: string) => {
    setSelectedProject(projectId);
    const project = projects.find((p) => p.id === projectId);
    if (project) {
      setWebsiteUrl(project.domain || "");
      dispatch(fetchProjectAuditHistory({ projectId }));
      dispatch(fetchAuditSummaryDashboard(projectId));
    }
  };

  const startNewAudit = async () => {
    if (!selectedProject || !websiteUrl) {
      message.error("Please select a project and enter website URL");
      return;
    }

    if (!websiteUrl.startsWith("http")) {
      message.error(
        "Please enter a valid URL starting with http:// or https://"
      );
      return;
    }

    try {
      await dispatch(
        startComprehensiveAudit({
          projectId: selectedProject,
          url: websiteUrl,
          options: {
            auditType: auditSettings.auditType,
            settings: auditSettings,
          },
        })
      ).unwrap();

      message.success("Comprehensive website audit started successfully!");
      setAuditModalVisible(false);
      setActiveTab("current");
    } catch (error: any) {
      message.error(error || "Failed to start audit");
    }
  };

  const handleCancelAudit = async () => {
    if (!currentRealAudit?.id) return;

    try {
      await dispatch(cancelAudit(currentRealAudit.id)).unwrap();
      message.success("Audit cancelled successfully");
    } catch (error: any) {
      message.error(error || "Failed to cancel audit");
    }
  };

  const handleDeleteAudit = async (auditId: string) => {
    try {
      await dispatch(deleteRealAudit(auditId)).unwrap();
      message.success("Audit deleted successfully");
    } catch (error: any) {
      message.error(error || "Failed to delete audit");
    }
  };

  const handleExportAudit = async (
    auditId: string,
    format: "pdf" | "excel" | "csv"
  ) => {
    try {
      await dispatch(exportAuditResults({ auditId, format })).unwrap();
      message.success(`Audit results exported as ${format}`);
    } catch (error: any) {
      message.error(error || "Failed to export audit results");
    }
  };

  const viewAuditDetails = (audit: RealAuditResult) => {
    dispatch(fetchRealAuditResults(audit.id));
    setActiveTab("current");
  };

  if (loading && !isRunningAudit) {
    return (
      <div className={styles.loadingContainer}>
        <Spin size="large" />
        <Text style={{ marginTop: 16 }}>Loading audit data...</Text>
      </div>
    );
  }

  if (!selectedProject && projects.length === 0) {
    return (
      <div className={styles.noProject}>
        <Card>
          <div className={styles.emptyState}>
            <GlobalOutlined style={{ fontSize: 48, color: "#1890ff" }} />
            <Title level={3}>No Projects Found</Title>
            <Text type="secondary">
              Create a project first to start auditing websites
            </Text>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className={styles.siteAuditManager}>
      {/* Header */}
      <div className={styles.header}>
        <div className={styles.titleSection}>
          <Title level={2}>Real Website Audit System</Title>
          <Text type="secondary">
            Comprehensive SEO audit powered by real tools (Lighthouse,
            Puppeteer, Cheerio)
          </Text>
        </div>
        <div className={styles.headerActions}>
          <Input
            placeholder="Enter website URL (e.g., https://example.com)"
            style={{ width: 300, marginRight: 16 }}
            value={websiteUrl}
            onChange={(e) => setWebsiteUrl(e.target.value)}
            prefix={<GlobalOutlined />}
          />
          <Select
            placeholder="Select a project"
            style={{ width: 250, marginRight: 16 }}
            value={selectedProject}
            onChange={handleProjectChange}
          >
            {projects.map((project: Project) => (
              <Option key={project.id} value={project.id}>
                {project.name} ({project.domain})
              </Option>
            ))}
          </Select>
          <Button
            type="primary"
            icon={<PlayCircleOutlined />}
            onClick={() => setAuditModalVisible(true)}
            disabled={!selectedProject || !websiteUrl}
            size="large"
          >
            Start Real Audit
          </Button>
        </div>
      </div>

      {/* Error Alert */}
      {error && (
        <Alert
          message="Audit Error"
          description={error}
          type="error"
          closable
          style={{ marginBottom: 16 }}
        />
      )}

      {/* Audit Progress */}
      {isRunningAudit && auditProgress && (
        <Card className={styles.progressCard}>
          <div className={styles.progressContent}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: 16,
              }}
            >
              <Title level={4}>🚀 Real Website Audit in Progress...</Title>
              <Button
                danger
                icon={<PauseCircleOutlined />}
                onClick={handleCancelAudit}
              >
                Cancel Audit
              </Button>
            </div>
            <Progress
              percent={auditProgress.progress}
              status="active"
              strokeColor={{
                "0%": "#108ee9",
                "100%": "#87d068",
              }}
              style={{ marginBottom: 16 }}
            />
            <Row gutter={16}>
              <Col span={12}>
                <Text strong>Current Step: </Text>
                <Text>{currentStep}</Text>
              </Col>
              <Col span={12}>
                {auditProgress.eta_seconds && (
                  <div>
                    <Text strong>ETA: </Text>
                    <Text type="secondary">
                      {Math.round(auditProgress.eta_seconds / 60)} minutes
                    </Text>
                  </div>
                )}
              </Col>
            </Row>
            <Alert
              message="Using Real Audit Tools"
              description="Google Lighthouse • Puppeteer Browser Automation • Cheerio HTML Parser • WCAG Accessibility Testing"
              type="info"
              showIcon
              style={{ marginTop: 16 }}
            />
          </div>
        </Card>
      )}

      {/* Audit Results */}
      {currentRealAudit && currentRealAudit.status === "completed" && (
        <Tabs
          activeKey={activeTab}
          onChange={setActiveTab}
          className={styles.auditTabs}
          size="large"
        >
          <TabPane tab="📊 Overview" key="overview">
            {/* Real Score Card */}
            <Card className={styles.scoreCard} style={{ marginBottom: 16 }}>
              <Row gutter={24} align="middle">
                <Col span={8}>
                  <div
                    className={styles.overallScore}
                    style={{ textAlign: "center" }}
                  >
                    <Progress
                      type="circle"
                      percent={currentRealAudit.overview.score}
                      strokeColor={
                        currentRealAudit.overview.score >= 80
                          ? "#52c41a"
                          : currentRealAudit.overview.score >= 60
                          ? "#faad14"
                          : "#ff4d4f"
                      }
                      size={120}
                    />
                    <Title level={4} style={{ marginTop: 16 }}>
                      Overall Score
                    </Title>
                    <Tag color="blue">
                      Real Data from {currentRealAudit.url}
                    </Tag>
                  </div>
                </Col>
                <Col span={16}>
                  <Row gutter={16}>
                    <Col span={6}>
                      <Statistic
                        title="Pages Analyzed"
                        value={currentRealAudit.overview.pages_analyzed}
                        prefix={<FileImageOutlined />}
                        valueStyle={{ color: "#1890ff" }}
                      />
                    </Col>
                    <Col span={6}>
                      <Statistic
                        title="Critical Issues"
                        value={currentRealAudit.overview.critical_issues}
                        valueStyle={{ color: "#ff4d4f" }}
                        prefix={<BugOutlined />}
                      />
                    </Col>
                    <Col span={6}>
                      <Statistic
                        title="Warnings"
                        value={currentRealAudit.overview.warnings}
                        valueStyle={{ color: "#faad14" }}
                        prefix={<ExclamationCircleOutlined />}
                      />
                    </Col>
                    <Col span={6}>
                      <Statistic
                        title="Passed Checks"
                        value={currentRealAudit.overview.passed_checks}
                        valueStyle={{ color: "#52c41a" }}
                        prefix={<CheckCircleOutlined />}
                      />
                    </Col>
                  </Row>
                </Col>
              </Row>
            </Card>

            {/* Performance Metrics (Real Data from Lighthouse) */}
            <Card
              title="⚡ Real Performance Analysis (Google Lighthouse)"
              className={styles.performanceCard}
            >
              <Row gutter={16}>
                <Col span={6}>
                  <Statistic
                    title="Performance Score"
                    value={currentRealAudit.performance.score}
                    suffix="/100"
                    valueStyle={{
                      color:
                        currentRealAudit.performance.score >= 80
                          ? "#52c41a"
                          : "#faad14",
                    }}
                    prefix={<ThunderboltOutlined />}
                  />
                </Col>
                <Col span={6}>
                  <Statistic
                    title="LCP (Real)"
                    value={currentRealAudit.performance.metrics.lcp.toFixed(1)}
                    suffix="s"
                    valueStyle={{
                      color:
                        currentRealAudit.performance.metrics.lcp <= 2.5
                          ? "#52c41a"
                          : "#ff4d4f",
                    }}
                  />
                  <Text type="secondary" style={{ fontSize: 12 }}>
                    Largest Contentful Paint
                  </Text>
                </Col>
                <Col span={6}>
                  <Statistic
                    title="FID (Real)"
                    value={currentRealAudit.performance.metrics.fid}
                    suffix="ms"
                    valueStyle={{
                      color:
                        currentRealAudit.performance.metrics.fid <= 100
                          ? "#52c41a"
                          : "#ff4d4f",
                    }}
                  />
                  <Text type="secondary" style={{ fontSize: 12 }}>
                    First Input Delay
                  </Text>
                </Col>
                <Col span={6}>
                  <Statistic
                    title="Mobile Friendly"
                    value={
                      currentRealAudit.performance.mobile_friendly
                        ? "Yes"
                        : "No"
                    }
                    valueStyle={{
                      color: currentRealAudit.performance.mobile_friendly
                        ? "#52c41a"
                        : "#ff4d4f",
                    }}
                    prefix={<MobileOutlined />}
                  />
                </Col>
              </Row>
            </Card>
          </TabPane>

          <TabPane tab="🔍 SEO Analysis" key="seo">
            <Card title="Real SEO Analysis Results (Cheerio Parser)">
              <Row gutter={16}>
                <Col span={12}>
                  <div style={{ marginBottom: 16 }}>
                    <Text strong>Page Title:</Text>
                    <div style={{ marginTop: 4 }}>
                      <Tag
                        color={
                          currentRealAudit.seo_analysis.title ? "green" : "red"
                        }
                      >
                        {currentRealAudit.seo_analysis.title || "Missing"}
                      </Tag>
                    </div>
                  </div>
                  <div style={{ marginBottom: 16 }}>
                    <Text strong>Meta Description:</Text>
                    <div style={{ marginTop: 4 }}>
                      <Tag
                        color={
                          currentRealAudit.seo_analysis.meta_description
                            ? "green"
                            : "red"
                        }
                      >
                        {currentRealAudit.seo_analysis.meta_description
                          ? "Present"
                          : "Missing"}
                      </Tag>
                    </div>
                  </div>
                  <div style={{ marginBottom: 16 }}>
                    <Text strong>H1 Tags Found:</Text>
                    <div style={{ marginTop: 4 }}>
                      {currentRealAudit.seo_analysis.h1_tags.map(
                        (h1, index) => (
                          <Tag
                            key={index}
                            color="blue"
                            style={{ marginBottom: 4 }}
                          >
                            {h1}
                          </Tag>
                        )
                      )}
                    </div>
                  </div>
                </Col>
                <Col span={12}>
                  <Row gutter={16}>
                    <Col span={12}>
                      <Statistic
                        title="Internal Links"
                        value={currentRealAudit.seo_analysis.internal_links}
                        prefix={<GlobalOutlined />}
                      />
                    </Col>
                    <Col span={12}>
                      <Statistic
                        title="External Links"
                        value={currentRealAudit.seo_analysis.external_links}
                        prefix={<GlobalOutlined />}
                      />
                    </Col>
                    <Col span={12}>
                      <Statistic
                        title="Images Missing Alt"
                        value={currentRealAudit.seo_analysis.images_without_alt}
                        valueStyle={{
                          color:
                            currentRealAudit.seo_analysis.images_without_alt > 0
                              ? "#ff4d4f"
                              : "#52c41a",
                        }}
                        prefix={<FileImageOutlined />}
                      />
                    </Col>
                    <Col span={12}>
                      <Statistic
                        title="Word Count"
                        value={currentRealAudit.seo_analysis.word_count}
                        prefix={<FileImageOutlined />}
                      />
                    </Col>
                  </Row>
                </Col>
              </Row>
            </Card>
          </TabPane>

          <TabPane tab="🔧 Technical SEO" key="technical">
            <Row gutter={16}>
              <Col span={12}>
                <Card title="Technical Checks" size="small">
                  <List
                    size="small"
                    dataSource={[
                      {
                        title: "Robots.txt",
                        status:
                          currentRealAudit.technical_seo.robots_txt.exists,
                        issues:
                          currentRealAudit.technical_seo.robots_txt.issues,
                      },
                      {
                        title: "XML Sitemap",
                        status: currentRealAudit.technical_seo.sitemap.exists,
                        count:
                          currentRealAudit.technical_seo.sitemap.urls_count,
                      },
                      {
                        title: "SSL Certificate",
                        status:
                          currentRealAudit.technical_seo.ssl_certificate.valid,
                        expires:
                          currentRealAudit.technical_seo.ssl_certificate
                            .expires_at,
                      },
                    ]}
                    renderItem={(item) => (
                      <List.Item>
                        <List.Item.Meta
                          title={
                            <span>
                              {item.title}{" "}
                              <Tag color={item.status ? "green" : "red"}>
                                {item.status ? "✓" : "✗"}
                              </Tag>
                            </span>
                          }
                          description={
                            item.count
                              ? `${item.count} URLs found`
                              : item.expires
                              ? `Expires: ${new Date(
                                  item.expires
                                ).toLocaleDateString()}`
                              : item.issues && item.issues.length > 0
                              ? item.issues.join(", ")
                              : null
                          }
                        />
                      </List.Item>
                    )}
                  />
                </Card>
              </Col>
              <Col span={12}>
                <Card title="Page Speed Scores" size="small">
                  <Row gutter={16}>
                    <Col span={12}>
                      <Statistic
                        title="Desktop Score"
                        value={
                          currentRealAudit.technical_seo.page_speed
                            .desktop_score
                        }
                        suffix="/100"
                        valueStyle={{
                          color:
                            currentRealAudit.technical_seo.page_speed
                              .desktop_score >= 80
                              ? "#52c41a"
                              : "#faad14",
                        }}
                      />
                    </Col>
                    <Col span={12}>
                      <Statistic
                        title="Mobile Score"
                        value={
                          currentRealAudit.technical_seo.page_speed.mobile_score
                        }
                        suffix="/100"
                        valueStyle={{
                          color:
                            currentRealAudit.technical_seo.page_speed
                              .mobile_score >= 80
                              ? "#52c41a"
                              : "#faad14",
                        }}
                      />
                    </Col>
                  </Row>
                  {currentRealAudit.technical_seo.page_speed.suggestions
                    .length > 0 && (
                    <div style={{ marginTop: 16 }}>
                      <Text strong>Suggestions:</Text>
                      <List
                        size="small"
                        dataSource={
                          currentRealAudit.technical_seo.page_speed.suggestions
                        }
                        renderItem={(suggestion) => (
                          <List.Item style={{ padding: "4px 0" }}>
                            <Text type="secondary">• {suggestion}</Text>
                          </List.Item>
                        )}
                      />
                    </div>
                  )}
                </Card>
              </Col>
            </Row>
          </TabPane>

          <TabPane tab="♿ Accessibility" key="accessibility">
            <Card
              title={`Accessibility Score: ${currentRealAudit.accessibility.score}/100 (WCAG Testing)`}
            >
              <div style={{ marginBottom: 16 }}>
                <Tag color="blue">
                  WCAG Compliance:{" "}
                  {currentRealAudit.accessibility.wcag_compliance}
                </Tag>
              </div>

              {currentRealAudit.accessibility.issues.length > 0 ? (
                <Table
                  size="small"
                  dataSource={currentRealAudit.accessibility.issues}
                  pagination={false}
                  columns={[
                    {
                      title: "Type",
                      dataIndex: "type",
                      key: "type",
                      render: (type) => (
                        <Tag
                          color={
                            type === "error"
                              ? "red"
                              : type === "warning"
                              ? "orange"
                              : "blue"
                          }
                        >
                          {type}
                        </Tag>
                      ),
                    },
                    {
                      title: "Message",
                      dataIndex: "message",
                      key: "message",
                    },
                    {
                      title: "Impact",
                      dataIndex: "impact",
                      key: "impact",
                      render: (impact) => (
                        <Tag
                          color={
                            impact === "critical"
                              ? "red"
                              : impact === "high"
                              ? "orange"
                              : "blue"
                          }
                        >
                          {impact}
                        </Tag>
                      ),
                    },
                  ]}
                />
              ) : (
                <Alert
                  message="No accessibility issues found!"
                  type="success"
                  showIcon
                />
              )}
            </Card>
          </TabPane>

          <TabPane tab="📥 Export & Actions" key="actions">
            <Card title="Export Results">
              <Space direction="vertical" style={{ width: "100%" }}>
                <Text>
                  Download your comprehensive audit results in various formats:
                </Text>
                <Space>
                  <Button
                    icon={<DownloadOutlined />}
                    onClick={() =>
                      handleExportAudit(currentRealAudit.id, "pdf")
                    }
                    type="primary"
                  >
                    Export PDF
                  </Button>
                  <Button
                    icon={<DownloadOutlined />}
                    onClick={() =>
                      handleExportAudit(currentRealAudit.id, "excel")
                    }
                  >
                    Export Excel
                  </Button>
                  <Button
                    icon={<DownloadOutlined />}
                    onClick={() =>
                      handleExportAudit(currentRealAudit.id, "csv")
                    }
                  >
                    Export CSV
                  </Button>
                </Space>

                <div
                  style={{
                    marginTop: 24,
                    paddingTop: 16,
                    borderTop: "1px solid #f0f0f0",
                  }}
                >
                  <Text strong>Audit Information:</Text>
                  <div style={{ marginTop: 8 }}>
                    <Text>
                      Started:{" "}
                      {new Date(currentRealAudit.startedAt).toLocaleString()}
                    </Text>
                    <br />
                    <Text>
                      Completed:{" "}
                      {currentRealAudit.completedAt
                        ? new Date(
                            currentRealAudit.completedAt
                          ).toLocaleString()
                        : "N/A"}
                    </Text>
                    <br />
                    <Text>URL: {currentRealAudit.url}</Text>
                    <br />
                    <Text>
                      Response Time:{" "}
                      {currentRealAudit.overview.total_response_time}ms
                    </Text>
                  </div>
                </div>
              </Space>
            </Card>
          </TabPane>
        </Tabs>
      )}

      {/* Audit History */}
      {realAudits.length > 0 && (
        <Card title="📚 Audit History" style={{ marginTop: 16 }}>
          <Table
            dataSource={realAudits}
            pagination={{ pageSize: 10 }}
            columns={[
              {
                title: "Date",
                dataIndex: "startedAt",
                key: "startedAt",
                render: (date) => new Date(date).toLocaleDateString(),
              },
              {
                title: "URL",
                dataIndex: "url",
                key: "url",
                ellipsis: true,
              },
              {
                title: "Status",
                dataIndex: "status",
                key: "status",
                render: (status) => (
                  <Tag
                    color={
                      status === "completed"
                        ? "green"
                        : status === "running"
                        ? "blue"
                        : "red"
                    }
                  >
                    {status}
                  </Tag>
                ),
              },
              {
                title: "Score",
                dataIndex: "overview",
                key: "score",
                render: (overview) => overview.score,
              },
              {
                title: "Issues",
                dataIndex: "overview",
                key: "issues",
                render: (overview) =>
                  `${overview.critical_issues + overview.warnings}`,
              },
              {
                title: "Actions",
                key: "actions",
                render: (_, record) => (
                  <Space>
                    <Button
                      size="small"
                      icon={<EyeOutlined />}
                      onClick={() => viewAuditDetails(record)}
                    >
                      View
                    </Button>
                    <Button
                      size="small"
                      icon={<DownloadOutlined />}
                      onClick={() => handleExportAudit(record.id, "pdf")}
                    >
                      Export
                    </Button>
                    <Button
                      size="small"
                      danger
                      icon={<DeleteOutlined />}
                      onClick={() => handleDeleteAudit(record.id)}
                    >
                      Delete
                    </Button>
                  </Space>
                ),
              },
            ]}
          />
        </Card>
      )}

      {/* Dashboard Summary */}
      {auditSummary && (
        <Card title="📊 Audit Summary Dashboard" style={{ marginTop: 16 }}>
          <Row gutter={16}>
            <Col span={6}>
              <Statistic
                title="Total Audits"
                value={auditSummary.total_audits}
                prefix={<BarChartOutlined />}
              />
            </Col>
            <Col span={6}>
              <Statistic
                title="Average Score"
                value={auditSummary.average_score}
                suffix="/100"
                valueStyle={{
                  color:
                    auditSummary.average_score >= 80 ? "#52c41a" : "#faad14",
                }}
              />
            </Col>
            <Col span={6}>
              <Statistic
                title="Critical Issues"
                value={auditSummary.critical_issues_count}
                valueStyle={{ color: "#ff4d4f" }}
              />
            </Col>
            <Col span={6}>
              <Statistic
                title="Last Audit"
                value={
                  auditSummary.last_audit_date
                    ? new Date(
                        auditSummary.last_audit_date
                      ).toLocaleDateString()
                    : "N/A"
                }
              />
            </Col>
          </Row>
        </Card>
      )}

      {/* Audit Configuration Modal */}
      <Modal
        title="🚀 Configure Real Website Audit"
        open={auditModalVisible}
        onOk={startNewAudit}
        onCancel={() => setAuditModalVisible(false)}
        width={600}
        confirmLoading={loading}
        okText="Start Real Audit"
        cancelText="Cancel"
      >
        <Form layout="vertical">
          <Form.Item label="Website URL">
            <Input
              value={websiteUrl}
              onChange={(e) => setWebsiteUrl(e.target.value)}
              placeholder="https://example.com"
              prefix={<GlobalOutlined />}
            />
          </Form.Item>

          <Form.Item label="Audit Type">
            <Select
              value={auditSettings.auditType}
              onChange={(value) =>
                setAuditSettings((prev) => ({ ...prev, auditType: value }))
              }
            >
              <Option value="full">Full Audit (Recommended)</Option>
              <Option value="technical">Technical SEO Only</Option>
              <Option value="content">Content Analysis Only</Option>
              <Option value="performance">Performance Only</Option>
            </Select>
          </Form.Item>

          <Form.Item label={`Crawl Depth: ${auditSettings.crawlDepth} pages`}>
            <Slider
              min={1}
              max={10}
              value={auditSettings.crawlDepth}
              onChange={(value) =>
                setAuditSettings((prev) => ({ ...prev, crawlDepth: value }))
              }
              marks={{
                1: "1",
                3: "3",
                5: "5",
                10: "10+",
              }}
            />
          </Form.Item>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item>
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <Text>Include Images Analysis</Text>
                  <Switch
                    checked={auditSettings.includeImages}
                    onChange={(checked) =>
                      setAuditSettings((prev) => ({
                        ...prev,
                        includeImages: checked,
                      }))
                    }
                  />
                </div>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item>
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <Text>Mobile-Friendly Test</Text>
                  <Switch
                    checked={auditSettings.checkMobileFriendly}
                    onChange={(checked) =>
                      setAuditSettings((prev) => ({
                        ...prev,
                        checkMobileFriendly: checked,
                      }))
                    }
                  />
                </div>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item>
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <Text>Page Speed Analysis</Text>
                  <Switch
                    checked={auditSettings.analyzePageSpeed}
                    onChange={(checked) =>
                      setAuditSettings((prev) => ({
                        ...prev,
                        analyzePageSpeed: checked,
                      }))
                    }
                  />
                </div>
              </Form.Item>
            </Col>
          </Row>

          <Alert
            message="🔥 Real Audit Powered by:"
            description="Google Lighthouse for performance • Puppeteer for browser automation • Cheerio for SEO analysis • WCAG for accessibility testing"
            type="info"
            showIcon
            style={{ marginTop: 16 }}
          />
        </Form>
      </Modal>
    </div>
  );
};

export default SiteAuditManager;
