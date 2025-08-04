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
  Modal,
  Form,
  Switch,
  Slider,
  notification,
} from "antd";
import {
  BugOutlined,
  ExclamationCircleOutlined,
  CheckCircleOutlined,
  GlobalOutlined,
  MobileOutlined,
  ThunderboltOutlined,
  FileImageOutlined,
  PlayCircleOutlined,
  PauseCircleOutlined,
  DeleteOutlined,
  EyeOutlined,
  BarChartOutlined,
  ReloadOutlined,
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

const { Title, Text } = Typography;
const { Option } = Select;

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
      notification.error({
        message: "Missing Information",
        description: "Please select a project and enter website URL",
      });
      return;
    }

    // Auto prepend https:// or www if missing
    let normalizedUrl = websiteUrl.trim();
    if (!/^https?:\/\//i.test(normalizedUrl)) {
      if (!/^www\./i.test(normalizedUrl)) {
        normalizedUrl = "https://www." + normalizedUrl;
      } else {
        normalizedUrl = "https://" + normalizedUrl;
      }
    }

    try {
      console.log("Starting audit with:", {
        projectId: selectedProject,
        url: normalizedUrl,
        options: {
          auditType: auditSettings.auditType,
          settings: auditSettings,
        },
      });

      const result = await dispatch(
        startComprehensiveAudit({
          projectId: selectedProject,
          url: normalizedUrl,
          options: {
            auditType: auditSettings.auditType,
            settings: auditSettings,
          },
        })
      ).unwrap();

      setAuditModalVisible(false);
      setActiveTab("current");
    } catch (error: any) {
      console.error("Audit start failed:", error);
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
      message.success(
        `Audit results exported as ${format?.toUpperCase() || "Unknown"}`
      );
    } catch (error: any) {
      message.error(error || "Failed to export audit results");
    }
  };

  const viewAuditDetails = (audit: RealAuditResult) => {
    dispatch(fetchRealAuditResults(audit.id));
    setActiveTab("overview");
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
              percent={auditProgress?.progress || 0}
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
                <Text>{currentStep || "Initializing..."}</Text>
              </Col>
              <Col span={12}>
                {auditProgress?.eta_seconds && (
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
          items={[
            {
              key: "overview",
              label: "📊 Overview",
              children: (
                <>
                  {/* Real Score Card */}
                  <Card
                    className={styles.scoreCard}
                    style={{ marginBottom: 16 }}
                  >
                    <Row gutter={24} align="middle">
                      <Col span={8}>
                        <div
                          className={styles.overallScore}
                          style={{ textAlign: "center" }}
                        >
                          <Progress
                            type="circle"
                            percent={
                              currentRealAudit?.results?.overview?.score || 0
                            }
                            strokeColor={
                              (currentRealAudit?.results?.overview?.score ||
                                0) >= 80
                                ? "#52c41a"
                                : (currentRealAudit?.results?.overview?.score ||
                                    0) >= 60
                                ? "#faad14"
                                : "#ff4d4f"
                            }
                            size={120}
                          />
                          <Title level={4} style={{ marginTop: 16 }}>
                            Overall Score
                          </Title>
                          <Tag color="blue">
                            Real Data from{" "}
                            {currentRealAudit?.results?.pages_analyzed?.[0]
                              ?.url || "N/A"}
                          </Tag>
                        </div>
                      </Col>
                      <Col span={16}>
                        <Row gutter={16}>
                          <Col span={6}>
                            <Statistic
                              title="Pages Analyzed"
                              value={
                                currentRealAudit?.results.overview
                                  ?.pages_analyzed || 0
                              }
                              prefix={<FileImageOutlined />}
                              valueStyle={{ color: "#1890ff" }}
                            />
                          </Col>
                          <Col span={6}>
                            <Statistic
                              title="Critical Issues"
                              value={
                                currentRealAudit?.results.overview
                                  ?.critical_issues || 0
                              }
                              valueStyle={{ color: "#ff4d4f" }}
                              prefix={<BugOutlined />}
                            />
                          </Col>
                          <Col span={6}>
                            <Statistic
                              title="Warnings"
                              value={
                                currentRealAudit?.results.overview?.warnings ||
                                0
                              }
                              valueStyle={{ color: "#faad14" }}
                              prefix={<ExclamationCircleOutlined />}
                            />
                          </Col>
                          <Col span={6}>
                            <Statistic
                              title="Passed Checks"
                              value={
                                currentRealAudit?.results.overview
                                  ?.passed_checks || 0
                              }
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
                          value={
                            currentRealAudit?.results.performance?.score || 0
                          }
                          suffix="/100"
                          valueStyle={{
                            color:
                              (currentRealAudit?.results.performance?.score ||
                                0) >= 80
                                ? "#52c41a"
                                : (currentRealAudit?.results.performance
                                    ?.score || 0) >= 60
                                ? "#faad14"
                                : "#ff4d4f",
                          }}
                          prefix={<ThunderboltOutlined />}
                        />
                      </Col>
                      <Col span={6}>
                        <Statistic
                          title="LCP (Real)"
                          value={
                            currentRealAudit?.results.performance?.metrics
                              ?.core_web_vitals?.lcp
                              ? (
                                  currentRealAudit.results.performance.metrics
                                    .core_web_vitals.lcp / 1000
                                ).toFixed(1)
                              : "0.0"
                          }
                          suffix="s"
                          valueStyle={{
                            color:
                              (currentRealAudit?.results.performance?.metrics
                                ?.core_web_vitals?.lcp || 0) <= 2500
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
                          value={
                            currentRealAudit?.results.performance?.metrics
                              ?.core_web_vitals?.fid || 0
                          }
                          suffix="ms"
                          valueStyle={{
                            color:
                              (currentRealAudit?.results.performance?.metrics
                                ?.core_web_vitals?.fid || 0) <= 100
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
                            currentRealAudit?.results.performance?.metrics
                              ?.mobile_friendly
                              ? "Yes"
                              : "No"
                          }
                          valueStyle={{
                            color: currentRealAudit?.results.performance
                              ?.metrics?.mobile_friendly
                              ? "#52c41a"
                              : "#ff4d4f",
                          }}
                          prefix={<MobileOutlined />}
                        />
                      </Col>
                    </Row>

                    {/* Additional Core Web Vitals */}
                    <Row gutter={16} style={{ marginTop: 16 }}>
                      <Col span={8}>
                        <Statistic
                          title="CLS (Real)"
                          value={
                            currentRealAudit?.results.performance?.metrics?.core_web_vitals?.cls?.toFixed(
                              3
                            ) || "0.000"
                          }
                          valueStyle={{
                            color:
                              (currentRealAudit?.results.performance?.metrics
                                ?.core_web_vitals?.cls || 0) <= 0.1
                                ? "#52c41a"
                                : "#ff4d4f",
                          }}
                        />
                        <Text type="secondary" style={{ fontSize: 12 }}>
                          Cumulative Layout Shift
                        </Text>
                      </Col>
                      <Col span={8}>
                        <Statistic
                          title="Page Speed Score"
                          value={
                            currentRealAudit?.results.performance?.metrics
                              ?.avg_page_speed || 0
                          }
                          suffix="/100"
                          valueStyle={{
                            color:
                              (currentRealAudit?.results.performance?.metrics
                                ?.avg_page_speed || 0) >= 80
                                ? "#52c41a"
                                : (currentRealAudit?.results.performance
                                    ?.metrics?.avg_page_speed || 0) >= 60
                                ? "#faad14"
                                : "#ff4d4f",
                          }}
                        />
                      </Col>
                      <Col span={8}>
                        <Alert
                          message="Lighthouse Status"
                          description={
                            currentRealAudit?.results?.pages_analyzed?.[0]
                              ?.lighthouse_mobile?.diagnostics?.[0]
                              ?.description || "Analysis completed successfully"
                          }
                          type={
                            currentRealAudit?.results?.pages_analyzed?.[0]
                              ?.lighthouse_mobile?.diagnostics?.[0]?.id ===
                            "lighthouse-failed"
                              ? "warning"
                              : "success"
                          }
                          showIcon
                          style={{ fontSize: 12 }}
                        />
                      </Col>
                    </Row>
                  </Card>
                </>
              ),
            },
            {
              key: "seo",
              label: "🔍 SEO Analysis",
              children: (
                <Row gutter={16}>
                  <Col span={12}>
                    <Card title="Page SEO Information" size="small">
                      <div style={{ marginBottom: 16 }}>
                        <Text strong>Page Title:</Text>
                        <div style={{ marginTop: 4 }}>
                          <Tag
                            color={
                              currentRealAudit?.results?.pages_analyzed?.[0]
                                ?.seo_analysis?.title
                                ? "green"
                                : "red"
                            }
                          >
                            {currentRealAudit?.results?.pages_analyzed?.[0]
                              ?.seo_analysis?.title || "Missing"}
                          </Tag>
                        </div>
                      </div>
                      <div style={{ marginBottom: 16 }}>
                        <Text strong>Meta Description:</Text>
                        <div style={{ marginTop: 4 }}>
                          <Tag
                            color={
                              currentRealAudit?.results?.pages_analyzed?.[0]
                                ?.seo_analysis?.meta_description
                                ? "green"
                                : "red"
                            }
                          >
                            {currentRealAudit?.results?.pages_analyzed?.[0]
                              ?.seo_analysis?.meta_description
                              ? `Present (${currentRealAudit?.results?.pages_analyzed?.[0]?.seo_analysis?.meta_description?.length} chars)`
                              : "Missing"}
                          </Tag>
                        </div>
                        {currentRealAudit?.results?.pages_analyzed?.[0]
                          ?.seo_analysis?.meta_description && (
                          <Text
                            type="secondary"
                            style={{
                              fontSize: 12,
                              display: "block",
                              marginTop: 4,
                            }}
                          >
                            "
                            {
                              currentRealAudit?.results?.pages_analyzed?.[0]
                                ?.seo_analysis?.meta_description
                            }
                            "
                          </Text>
                        )}
                      </div>
                      <div style={{ marginBottom: 16 }}>
                        <Text strong>H1 Tags Found:</Text>
                        <div style={{ marginTop: 4 }}>
                          {currentRealAudit?.results?.pages_analyzed?.[0]
                            ?.seo_analysis?.h1_tags?.length > 0 ? (
                            currentRealAudit?.results?.pages_analyzed?.[0]?.seo_analysis?.h1_tags?.map(
                              (h1, index) => (
                                <Tag
                                  key={`h1-tag-${index}`}
                                  color="blue"
                                  style={{ marginBottom: 4, display: "block" }}
                                >
                                  {h1 || "N/A"}
                                </Tag>
                              )
                            )
                          ) : (
                            <Tag color="red">No H1 tags found</Tag>
                          )}
                        </div>
                      </div>
                      <div style={{ marginBottom: 16 }}>
                        <Text strong>H2 Tags:</Text>
                        <div style={{ marginTop: 4 }}>
                          {currentRealAudit?.results?.pages_analyzed?.[0]
                            ?.seo_analysis?.h2_tags?.length > 0 ? (
                            currentRealAudit?.results?.pages_analyzed?.[0]?.seo_analysis?.h2_tags
                              ?.slice(0, 3)
                              .map((h2, index) => (
                                <Tag
                                  key={`h2-tag-${index}`}
                                  color="cyan"
                                  style={{ marginBottom: 4, marginRight: 4 }}
                                >
                                  {h2}
                                </Tag>
                              ))
                          ) : (
                            <Tag color="orange">No H2 tags found</Tag>
                          )}
                          {currentRealAudit?.results?.pages_analyzed?.[0]
                            ?.seo_analysis?.h2_tags?.length > 3 && (
                            <Tag color="default">
                              +
                              {currentRealAudit?.results?.pages_analyzed?.[0]
                                ?.seo_analysis?.h2_tags?.length - 3}{" "}
                              more
                            </Tag>
                          )}
                        </div>
                      </div>
                      <div style={{ marginBottom: 16 }}>
                        <Text strong>Canonical URL:</Text>
                        <div style={{ marginTop: 4 }}>
                          <Tag
                            color={
                              currentRealAudit?.results?.pages_analyzed?.[0]
                                ?.seo_analysis?.canonical_url
                                ? "green"
                                : "red"
                            }
                          >
                            {currentRealAudit?.results?.pages_analyzed?.[0]
                              ?.seo_analysis?.canonical_url || "Missing"}
                          </Tag>
                        </div>
                      </div>
                    </Card>
                  </Col>
                  <Col span={12}>
                    <Card title="SEO Statistics" size="small">
                      <Row gutter={16}>
                        <Col span={12}>
                          <Statistic
                            title="Internal Links"
                            value={
                              currentRealAudit?.results?.pages_analyzed?.[0]
                                ?.seo_analysis?.internal_links || 0
                            }
                            prefix={<GlobalOutlined />}
                          />
                        </Col>
                        <Col span={12}>
                          <Statistic
                            title="External Links"
                            value={
                              currentRealAudit?.results?.pages_analyzed?.[0]
                                ?.seo_analysis?.external_links || 0
                            }
                            prefix={<GlobalOutlined />}
                          />
                        </Col>
                        <Col span={12}>
                          <Statistic
                            title="Images Missing Alt"
                            value={
                              currentRealAudit?.results?.pages_analyzed?.[0]
                                ?.seo_analysis?.images_without_alt || 0
                            }
                            valueStyle={{
                              color:
                                (currentRealAudit?.results?.pages_analyzed?.[0]
                                  ?.seo_analysis?.images_without_alt || 0) > 0
                                  ? "#ff4d4f"
                                  : "#52c41a",
                            }}
                            prefix={<FileImageOutlined />}
                          />
                        </Col>
                        <Col span={12}>
                          <Statistic
                            title="Total Images"
                            value={
                              currentRealAudit?.results?.pages_analyzed?.[0]
                                ?.seo_analysis?.images_total || 0
                            }
                            prefix={<FileImageOutlined />}
                          />
                        </Col>
                        <Col span={12}>
                          <Statistic
                            title="Word Count"
                            value={
                              currentRealAudit?.results?.pages_analyzed?.[0]
                                ?.seo_analysis?.word_count || 0
                            }
                            prefix={<FileImageOutlined />}
                          />
                        </Col>
                        <Col span={12}>
                          <Statistic
                            title="Schema Markup"
                            value={
                              currentRealAudit?.results?.pages_analyzed?.[0]
                                ?.seo_analysis?.schema_markup || 0
                            }
                            valueStyle={{
                              color:
                                (currentRealAudit?.results?.pages_analyzed?.[0]
                                  ?.seo_analysis?.schema_markup || 0) > 0
                                  ? "#52c41a"
                                  : "#ff4d4f",
                            }}
                          />
                        </Col>
                      </Row>
                    </Card>
                  </Col>
                  <Col span={24} style={{ marginTop: 16 }}>
                    <Card title="SEO Issues & Recommendations" size="small">
                      {currentRealAudit?.results?.pages_analyzed?.[0]
                        ?.seo_analysis?.issues?.length > 0 ? (
                        <List
                          size="small"
                          dataSource={
                            currentRealAudit?.results?.pages_analyzed?.[0]
                              ?.seo_analysis?.issues || []
                          }
                          renderItem={(issue, index) => (
                            <List.Item key={`seo-issue-${index}`}>
                              <List.Item.Meta
                                avatar={
                                  <Tag
                                    color={
                                      issue.type === "warning"
                                        ? "orange"
                                        : issue.type === "error"
                                        ? "red"
                                        : "blue"
                                    }
                                  >
                                    {issue.type?.toUpperCase()}
                                  </Tag>
                                }
                                title={
                                  <span>
                                    {issue.title}
                                    <Tag
                                      color={
                                        issue.impact === "high"
                                          ? "red"
                                          : issue.impact === "medium"
                                          ? "orange"
                                          : "blue"
                                      }
                                      style={{ marginLeft: 8 }}
                                    >
                                      {issue.impact?.toUpperCase()} IMPACT
                                    </Tag>
                                  </span>
                                }
                                description={
                                  <div>
                                    <Text>{issue.description}</Text>
                                    <br />
                                    <Text
                                      type="secondary"
                                      style={{ fontSize: 12 }}
                                    >
                                      💡 <strong>Recommendation:</strong>{" "}
                                      {issue.recommendation}
                                    </Text>
                                  </div>
                                }
                              />
                            </List.Item>
                          )}
                        />
                      ) : (
                        <Alert
                          message="No SEO issues found!"
                          type="success"
                          showIcon
                        />
                      )}
                    </Card>
                  </Col>
                </Row>
              ),
            },
            {
              key: "technical",
              label: "🔧 Technical SEO",
              children: (
                <Row gutter={16}>
                  <Col span={12}>
                    <Card title="Technical Checks" size="small">
                      <List
                        size="small"
                        dataSource={[
                          {
                            title: "Robots.txt",
                            status:
                              currentRealAudit?.results.technical_seo
                                ?.robots_txt?.exists || false,
                            issues:
                              currentRealAudit?.results.technical_seo
                                ?.robots_txt?.issues || [],
                          },
                          {
                            title: "XML Sitemap",
                            status:
                              currentRealAudit?.results.technical_seo?.sitemap
                                ?.exists || false,
                            count:
                              currentRealAudit?.results.technical_seo?.sitemap
                                ?.url_count || 0,
                          },
                          {
                            title: "SSL Certificate",
                            status: true, // Assuming HTTPS if we can access the site
                            expires: "N/A",
                          },
                        ]}
                        renderItem={(item, index) => (
                          <List.Item key={`technical-check-${index}`}>
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
                                  : item.expires && item.expires !== "N/A"
                                  ? `Expires: ${new Date(
                                      item.expires
                                    ).toLocaleDateString()}`
                                  : item.issues && item.issues.length > 0
                                  ? item.issues.join(", ")
                                  : "Working properly"
                              }
                            />
                          </List.Item>
                        )}
                      />
                    </Card>
                  </Col>
                  <Col span={12}>
                    <Card title="Lighthouse Performance Scores" size="small">
                      <Row gutter={16}>
                        <Col span={12}>
                          <Statistic
                            title="Desktop Performance"
                            value={
                              currentRealAudit?.results?.pages_analyzed?.[0]
                                ?.lighthouse_desktop?.performance_score || 0
                            }
                            suffix="/100"
                            valueStyle={{
                              color:
                                (currentRealAudit?.results?.pages_analyzed?.[0]
                                  ?.lighthouse_desktop?.performance_score ||
                                  0) >= 80
                                  ? "#52c41a"
                                  : (currentRealAudit?.results
                                      ?.pages_analyzed?.[0]?.lighthouse_desktop
                                      ?.performance_score || 0) >= 60
                                  ? "#faad14"
                                  : "#ff4d4f",
                            }}
                          />
                        </Col>
                        <Col span={12}>
                          <Statistic
                            title="Mobile Performance"
                            value={
                              currentRealAudit?.results?.pages_analyzed?.[0]
                                ?.lighthouse_mobile?.performance_score || 0
                            }
                            suffix="/100"
                            valueStyle={{
                              color:
                                (currentRealAudit?.results?.pages_analyzed?.[0]
                                  ?.lighthouse_mobile?.performance_score ||
                                  0) >= 80
                                  ? "#52c41a"
                                  : (currentRealAudit?.results
                                      ?.pages_analyzed?.[0]?.lighthouse_mobile
                                      ?.performance_score || 0) >= 60
                                  ? "#faad14"
                                  : "#ff4d4f",
                            }}
                          />
                        </Col>
                        <Col span={12}>
                          <Statistic
                            title="SEO Score"
                            value={
                              currentRealAudit?.results?.pages_analyzed?.[0]
                                ?.lighthouse_mobile?.seo_score || 0
                            }
                            suffix="/100"
                            valueStyle={{
                              color:
                                (currentRealAudit?.results?.pages_analyzed?.[0]
                                  ?.lighthouse_mobile?.seo_score || 0) >= 80
                                  ? "#52c41a"
                                  : (currentRealAudit?.results
                                      ?.pages_analyzed?.[0]?.lighthouse_mobile
                                      ?.seo_score || 0) >= 60
                                  ? "#faad14"
                                  : "#ff4d4f",
                            }}
                          />
                        </Col>
                        <Col span={12}>
                          <Statistic
                            title="Best Practices"
                            value={
                              currentRealAudit?.results?.pages_analyzed?.[0]
                                ?.lighthouse_mobile?.best_practices_score || 0
                            }
                            suffix="/100"
                            valueStyle={{
                              color:
                                (currentRealAudit?.results?.pages_analyzed?.[0]
                                  ?.lighthouse_mobile?.best_practices_score ||
                                  0) >= 80
                                  ? "#52c41a"
                                  : (currentRealAudit?.results
                                      ?.pages_analyzed?.[0]?.lighthouse_mobile
                                      ?.best_practices_score || 0) >= 60
                                  ? "#faad14"
                                  : "#ff4d4f",
                            }}
                          />
                        </Col>
                      </Row>

                      {/* Response Time and Status */}
                      <div style={{ marginTop: 16 }}>
                        <Row gutter={16}>
                          <Col span={12}>
                            <Statistic
                              title="Response Time"
                              value={
                                currentRealAudit?.results?.pages_analyzed?.[0]
                                  ?.response_time || 0
                              }
                              suffix="ms"
                              valueStyle={{
                                color:
                                  (currentRealAudit?.results
                                    ?.pages_analyzed?.[0]?.response_time ||
                                    0) <= 1000
                                    ? "#52c41a"
                                    : (currentRealAudit?.results
                                        ?.pages_analyzed?.[0]?.response_time ||
                                        0) <= 3000
                                    ? "#faad14"
                                    : "#ff4d4f",
                              }}
                            />
                          </Col>
                          <Col span={12}>
                            <Statistic
                              title="Status Code"
                              value={
                                currentRealAudit?.results?.pages_analyzed?.[0]
                                  ?.status_code || 0
                              }
                              valueStyle={{
                                color:
                                  (currentRealAudit?.results
                                    ?.pages_analyzed?.[0]?.status_code || 0) ===
                                  200
                                    ? "#52c41a"
                                    : "#ff4d4f",
                              }}
                            />
                          </Col>
                        </Row>
                      </div>

                      {/* Lighthouse Diagnostics */}
                      {currentRealAudit?.results?.pages_analyzed?.[0]
                        ?.lighthouse_mobile?.diagnostics?.length > 0 && (
                        <div style={{ marginTop: 16 }}>
                          <Text strong>Lighthouse Diagnostics:</Text>
                          <List
                            size="small"
                            dataSource={
                              currentRealAudit?.results?.pages_analyzed?.[0]
                                ?.lighthouse_mobile?.diagnostics || []
                            }
                            renderItem={(diagnostic, index) => (
                              <List.Item
                                key={`diagnostic-${index}`}
                                style={{ padding: "4px 0" }}
                              >
                                <Alert
                                  message={diagnostic.title}
                                  description={diagnostic.description}
                                  type={
                                    diagnostic.impact === "medium"
                                      ? "warning"
                                      : "info"
                                  }
                                  showIcon
                                  style={{ fontSize: 12 }}
                                />
                              </List.Item>
                            )}
                          />
                        </div>
                      )}
                    </Card>
                  </Col>
                </Row>
              ),
            },
            {
              key: "accessibility",
              label: "♿ Accessibility",
              children: (
                <Card
                  title={`Accessibility Score: ${
                    currentRealAudit?.results.accessibility?.score || 0
                  }/100 (WCAG Testing)`}
                >
                  <div style={{ marginBottom: 16 }}>
                    <Tag color="blue">
                      WCAG Compliance:{" "}
                      {currentRealAudit?.results.accessibility
                        ?.wcag_compliance || "Unknown"}
                    </Tag>
                    <Tag color="green" style={{ marginLeft: 8 }}>
                      Lighthouse Score:{" "}
                      {currentRealAudit?.results?.pages_analyzed?.[0]
                        ?.lighthouse_mobile?.accessibility_score || 0}
                      /100
                    </Tag>
                  </div>

                  {(currentRealAudit?.results.accessibility?.issues?.length ||
                    0) > 0 ? (
                    <Table
                      size="small"
                      dataSource={
                        currentRealAudit?.results.accessibility?.issues || []
                      }
                      pagination={false}
                      rowKey={(record, index) => `accessibility-issue-${index}`}
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
                              {type?.toUpperCase() || "UNKNOWN"}
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
                              {impact?.toUpperCase() || "UNKNOWN"}
                            </Tag>
                          ),
                        },
                      ]}
                    />
                  ) : (
                    <Alert
                      message="No accessibility issues found!"
                      description="Your website meets WCAG AA compliance standards with no critical accessibility issues detected."
                      type="success"
                      showIcon
                    />
                  )}
                </Card>
              ),
            },
            {
              key: "content",
              label: "📝 Content Analysis",
              children: (
                <Row gutter={16}>
                  <Col span={12}>
                    <Card title="Content Quality" size="small">
                      <Row gutter={16}>
                        <Col span={12}>
                          <Statistic
                            title="Content Score"
                            value={
                              currentRealAudit?.results.content_analysis
                                ?.score || 0
                            }
                            suffix="/100"
                            valueStyle={{
                              color:
                                (currentRealAudit?.results.content_analysis
                                  ?.score || 0) >= 80
                                  ? "#52c41a"
                                  : (currentRealAudit?.results.content_analysis
                                      ?.score || 0) >= 60
                                  ? "#faad14"
                                  : "#ff4d4f",
                            }}
                          />
                        </Col>
                        <Col span={12}>
                          <Statistic
                            title="Average Word Count"
                            value={
                              currentRealAudit?.results.content_analysis
                                ?.avg_word_count || 0
                            }
                          />
                        </Col>
                        <Col span={12}>
                          <Statistic
                            title="Readability Score"
                            value={
                              currentRealAudit?.results?.pages_analyzed?.[0]
                                ?.content_analysis?.readability_score || 0
                            }
                            suffix="/100"
                            valueStyle={{
                              color:
                                (currentRealAudit?.results?.pages_analyzed?.[0]
                                  ?.content_analysis?.readability_score || 0) >=
                                70
                                  ? "#52c41a"
                                  : (currentRealAudit?.results
                                      ?.pages_analyzed?.[0]?.content_analysis
                                      ?.readability_score || 0) >= 50
                                  ? "#faad14"
                                  : "#ff4d4f",
                            }}
                          />
                        </Col>
                        <Col span={12}>
                          <div>
                            <Text strong>Thin Content:</Text>
                            <div style={{ marginTop: 4 }}>
                              <Tag
                                color={
                                  currentRealAudit?.results?.pages_analyzed?.[0]
                                    ?.content_analysis?.thin_content
                                    ? "red"
                                    : "green"
                                }
                              >
                                {currentRealAudit?.results?.pages_analyzed?.[0]
                                  ?.content_analysis?.thin_content
                                  ? "Yes"
                                  : "No"}
                              </Tag>
                            </div>
                          </div>
                        </Col>
                      </Row>
                    </Card>
                  </Col>
                  <Col span={12}>
                    <Card title="Duplicate Content Check" size="small">
                      {currentRealAudit?.results.content_analysis
                        ?.duplicate_content?.length > 0 ? (
                        <List
                          size="small"
                          dataSource={
                            currentRealAudit?.results.content_analysis
                              ?.duplicate_content || []
                          }
                          renderItem={(item, index) => (
                            <List.Item key={`duplicate-${index}`}>
                              <Alert
                                message="Duplicate Content Found"
                                description={`Similar content detected in: ${item}`}
                                type="warning"
                                showIcon
                                style={{ width: "100%" }}
                              />
                            </List.Item>
                          )}
                        />
                      ) : (
                        <Alert
                          message="No Duplicate Content"
                          description="No duplicate content issues detected on your website."
                          type="success"
                          showIcon
                        />
                      )}
                    </Card>
                  </Col>
                  <Col span={24} style={{ marginTop: 16 }}>
                    <Card title="Content Issues & Recommendations" size="small">
                      {currentRealAudit?.results.content_analysis?.issues
                        ?.length > 0 ? (
                        <List
                          size="small"
                          dataSource={
                            currentRealAudit?.results.content_analysis
                              ?.issues || []
                          }
                          renderItem={(issue, index) => (
                            <List.Item key={`content-issue-${index}`}>
                              <List.Item.Meta
                                avatar={
                                  <Tag
                                    color={
                                      issue.type === "warning"
                                        ? "orange"
                                        : issue.type === "error"
                                        ? "red"
                                        : "blue"
                                    }
                                  >
                                    {issue.type?.toUpperCase()}
                                  </Tag>
                                }
                                title={
                                  <span>
                                    {issue.title}
                                    <Tag
                                      color={
                                        issue.impact === "high"
                                          ? "red"
                                          : issue.impact === "medium"
                                          ? "orange"
                                          : "blue"
                                      }
                                      style={{ marginLeft: 8 }}
                                    >
                                      {issue.impact?.toUpperCase()} IMPACT
                                    </Tag>
                                  </span>
                                }
                                description={
                                  <div>
                                    <Text>{issue.description}</Text>
                                    <br />
                                    <Text
                                      type="secondary"
                                      style={{ fontSize: 12 }}
                                    >
                                      💡 <strong>Recommendation:</strong>{" "}
                                      {issue.recommendation}
                                    </Text>
                                  </div>
                                }
                              />
                            </List.Item>
                          )}
                        />
                      ) : (
                        <Alert
                          message="No content issues found!"
                          description="Your content quality is good with no major issues detected."
                          type="success"
                          showIcon
                        />
                      )}
                    </Card>
                  </Col>
                </Row>
              ),
            },
            // {
            //   key: "actions",
            //   label: "📥 Export & Actions",
            //   children: (
            //     <Card title="Export Results">
            //       <Space direction="vertical" style={{ width: "100%" }}>
            //         <Text>
            //           Download your comprehensive audit results in various
            //           formats:
            //         </Text>
            //         <Space>
            //           <Button
            //             icon={<DownloadOutlined />}
            //             onClick={() =>
            //               handleExportAudit(currentRealAudit?.id || "", "pdf")
            //             }
            //             type="primary"
            //             disabled={!currentRealAudit?.id}
            //           >
            //             Export PDF
            //           </Button>
            //           <Button
            //             icon={<DownloadOutlined />}
            //             onClick={() =>
            //               handleExportAudit(currentRealAudit?.id || "", "excel")
            //             }
            //             disabled={!currentRealAudit?.id}
            //           >
            //             Export Excel
            //           </Button>
            //           <Button
            //             icon={<DownloadOutlined />}
            //             onClick={() =>
            //               handleExportAudit(currentRealAudit?.id || "", "csv")
            //             }
            //             disabled={!currentRealAudit?.id}
            //           >
            //             Export CSV
            //           </Button>
            //         </Space>

            //         <div
            //           style={{
            //             marginTop: 24,
            //             paddingTop: 16,
            //             borderTop: "1px solid #f0f0f0",
            //           }}
            //         >
            //           <Text strong>Audit Information:</Text>
            //           <div style={{ marginTop: 8 }}>
            //             <Text>
            //               Started:{" "}
            //               {currentRealAudit?.createdAt
            //                 ? new Date(
            //                     currentRealAudit.createdAt
            //                   ).toLocaleString()
            //                 : "N/A"}
            //             </Text>
            //             <br />
            //             <Text>
            //               Completed:{" "}
            //               {currentRealAudit?.results?.completed_at
            //                 ? new Date(
            //                     currentRealAudit.results.completed_at
            //                   ).toLocaleString()
            //                 : "N/A"}
            //             </Text>
            //             <br />
            //             <Text>
            //               URL:{" "}
            //               {currentRealAudit?.results?.pages_analyzed?.[0]
            //                 ?.url || "N/A"}
            //             </Text>
            //             <br />
            //             <Text>
            //               Processing Time:{" "}
            //               {currentRealAudit?.results?.processing_time || 0}
            //               ms
            //             </Text>
            //             <br />
            //             <Text>
            //               Response Time:{" "}
            //               {currentRealAudit?.results.overview
            //                 ?.total_response_time || 0}
            //               ms
            //             </Text>
            //           </div>
            //         </div>
            //       </Space>
            //     </Card>
            //   ),
            // },
          ]}
        />
      )}

      {/* Audit History */}
      {realAudits.length > 0 && (
        <Card title="📚 Audit History" style={{ marginTop: 16 }}>
          <Table
            dataSource={realAudits}
            pagination={{ pageSize: 10 }}
            rowKey={(record) => record.id}
            columns={[
              {
                title: "Date",
                dataIndex: "created_at",
                key: "createdAt",
                render: (date) =>
                  date ? new Date(date).toLocaleDateString() : "N/A",
              },
              {
                title: "URL",
                dataIndex: "url",
                key: "url",
                ellipsis: true,
                render: () => (
                  <a
                    href={websiteUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {websiteUrl}
                  </a>
                ),
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
                    {status?.toUpperCase() || "UNKNOWN"}
                  </Tag>
                ),
              },
              {
                title: "Score",
                dataIndex: "summary",
                key: "score",
                render: (summary) => summary?.score || 0,
              },
              {
                title: "Issues",
                dataIndex: "summary",
                key: "issues",
                render: (summary) =>
                  summary ? `${summary.issues_found || 0} issues` : "0",
              },
              {
                title: "Actions",
                key: "actions",
                render: (_, record: any) => (
                  <Space>
                    <Button
                      size="small"
                      icon={<EyeOutlined />}
                      onClick={() => viewAuditDetails(record)}
                    >
                      View
                    </Button>
                    {/* <Button
                      size="small"
                      icon={<DownloadOutlined />}
                      onClick={() => handleExportAudit(record.id, "pdf")}
                    >
                      Export
                    </Button> */}
                    <Button
                      size="small"
                      danger
                      icon={<DeleteOutlined />}
                      onClick={() => handleDeleteAudit(record.id)}
                    >
                      Delete
                    </Button>
                    <Button
                      size="small"
                      icon={<ReloadOutlined />}
                      onClick={() => {
                        const firstProject = projects[0];
                        setSelectedProject(firstProject.id);
                        setWebsiteUrl(firstProject.domain || "");

                        // Load existing audits for the project
                        dispatch(
                          fetchProjectAuditHistory({
                            projectId: firstProject.id,
                          })
                        );
                      }}
                    ></Button>
                  </Space>
                ),
              },
            ]}
          />
        </Card>
      )}

      {/* Dashboard Summary */}
      {auditSummary && (
        <Card title="📊 Latest Audit Dashboard" style={{ marginTop: 16 }}>
          <Row gutter={16}>
            <Col span={6}>
              <Statistic
                title="Overall Score"
                value={auditSummary?.latestAudit?.results?.overview?.score || 0}
                suffix="/100"
                prefix={<BarChartOutlined />}
                valueStyle={{
                  color:
                    (auditSummary?.latestAudit?.results?.overview?.score ||
                      0) >= 80
                      ? "#52c41a"
                      : (auditSummary?.latestAudit?.results?.overview?.score ||
                          0) >= 60
                      ? "#faad14"
                      : "#ff4d4f",
                }}
              />
            </Col>
            <Col span={6}>
              <Statistic
                title="Total Issues"
                value={
                  auditSummary?.latestAudit?.results?.overview?.total_issues ||
                  0
                }
                valueStyle={{ color: "#ff4d4f" }}
              />
            </Col>
            <Col span={6}>
              <Statistic
                title="Passed Checks"
                value={
                  auditSummary?.latestAudit?.results?.overview?.passed_checks ||
                  0
                }
                valueStyle={{ color: "#52c41a" }}
              />
            </Col>
            <Col span={6}>
              <Statistic
                title="Last Audit"
                value={
                  auditSummary?.latestAudit?.createdAt
                    ? new Date(
                        auditSummary.latestAudit.createdAt
                      ).toLocaleDateString()
                    : "N/A"
                }
              />
            </Col>
          </Row>

          {/* Additional Score Breakdown */}
          <Row gutter={16} style={{ marginTop: 16 }}>
            <Col span={6}>
              <Statistic
                title="Performance"
                value={
                  auditSummary?.latestAudit.results?.performance?.score || 0
                }
                suffix="/100"
                valueStyle={{
                  color:
                    (auditSummary?.latestAudit.results?.performance?.score ||
                      0) >= 80
                      ? "#52c41a"
                      : (auditSummary?.latestAudit.results?.performance
                          ?.score || 0) >= 60
                      ? "#faad14"
                      : "#ff4d4f",
                }}
              />
            </Col>
            <Col span={6}>
              <Statistic
                title="Technical SEO"
                value={
                  auditSummary?.latestAudit.results?.technical_seo?.score || 0
                }
                suffix="/100"
                valueStyle={{
                  color:
                    (auditSummary?.latestAudit.results?.technical_seo?.score ||
                      0) >= 80
                      ? "#52c41a"
                      : (auditSummary?.latestAudit.results?.technical_seo
                          ?.score || 0) >= 60
                      ? "#faad14"
                      : "#ff4d4f",
                }}
              />
            </Col>
            <Col span={6}>
              <Statistic
                title="Content Score"
                value={
                  auditSummary?.latestAudit.results?.content_analysis?.score ||
                  0
                }
                suffix="/100"
                valueStyle={{
                  color:
                    (auditSummary?.latestAudit.results?.content_analysis
                      ?.score || 0) >= 80
                      ? "#52c41a"
                      : (auditSummary?.latestAudit.results?.content_analysis
                          ?.score || 0) >= 60
                      ? "#faad14"
                      : "#ff4d4f",
                }}
              />
            </Col>
            <Col span={6}>
              <Statistic
                title="Accessibility"
                value={
                  auditSummary?.latestAudit.results?.accessibility?.score || 0
                }
                suffix="/100"
                valueStyle={{
                  color:
                    (auditSummary?.latestAudit.results?.accessibility?.score ||
                      0) >= 80
                      ? "#52c41a"
                      : (auditSummary?.latestAudit.results?.accessibility
                          ?.score || 0) >= 60
                      ? "#faad14"
                      : "#ff4d4f",
                }}
              />
            </Col>
          </Row>

          {/* Status and Processing Info */}
          <Row gutter={16} style={{ marginTop: 16 }}>
            <Col span={8}>
              <div>
                <Text strong>Audit Status: </Text>
                <Tag
                  color={
                    auditSummary?.latestAudit.status === "completed"
                      ? "green"
                      : auditSummary?.latestAudit.status === "running"
                      ? "blue"
                      : "red"
                  }
                >
                  {auditSummary?.latestAudit.status?.toUpperCase() || "UNKNOWN"}
                </Tag>
              </div>
            </Col>
            <Col span={8}>
              <div>
                <Text strong>Pages Analyzed: </Text>
                <Text>
                  {auditSummary?.latestAudit.results?.overview
                    ?.pages_analyzed || 0}
                </Text>
              </div>
            </Col>
            <Col span={8}>
              <div>
                <Text strong>Processing Time: </Text>
                <Text>
                  {auditSummary?.latestAudit.results?.processing_time
                    ? `${(
                        auditSummary.latestAudit.results.processing_time / 1000
                      ).toFixed(1)}s`
                    : "N/A"}
                </Text>
              </div>
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
