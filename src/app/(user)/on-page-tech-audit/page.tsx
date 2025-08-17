"use client";

import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  Card,
  Button,
  Progress,
  Table,
  Tag,
  Space,
  Typography,
  Row,
  Col,
  List,
  Divider,
  Alert,
  Spin,
  Empty,
  message,
  Select,
  Modal,
  Form,
  Input,
} from "antd";
import {
  CheckCircleOutlined,
  ExclamationCircleOutlined,
  CloseCircleOutlined,
  MailOutlined,
  DownloadOutlined,
  BulbOutlined,
  SearchOutlined,
  BarChartOutlined,
  LinkOutlined,
  GlobalOutlined,
  SafetyCertificateOutlined,
  MobileOutlined,
  DesktopOutlined,
  ReloadOutlined,
  PlayCircleOutlined,
  PlusOutlined,
  TrophyOutlined,
  RocketOutlined,
  EyeOutlined,
  FileTextOutlined,
  DashboardOutlined,
  ThunderboltOutlined,
  UserOutlined,
  EditOutlined,
} from "@ant-design/icons";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import useAudit from "@/hooks/useAudit";
import useProjects from "@/hooks/useProjects";
import styles from "./on-page-audit.module.scss";

const { Title, Text, Paragraph } = Typography;
const { Option } = Select;

const OnPageAuditPage = () => {
  const [activeTab, setActiveTab] = useState("suggestions");
  const [selectedProjectId, setSelectedProjectId] = useState<
    string | undefined
  >(undefined);
  const [isCreateModalVisible, setIsCreateModalVisible] = useState(false);
  const [createProjectForm] = Form.useForm();
  const router = useRouter();

  // Get project ID from URL or use current project
  const {
    projects,
    currentProject,
    fetchProjects,
    fetchProjectDetails,
    createProject,
    loading: projectsLoading,
  } = useProjects();
  const projectId = selectedProjectId || currentProject?.id;

  const {
    currentAudit,
    auditResults,
    auditSummary,
    isLoading,
    isCreating,
    error,
    createQuickAudit,
    fetchLatestAudit,
    fetchAuditResults,
    fetchAuditSummary,
    startAuditPolling,
    clearError,
  } = useAudit();

  // Load audit data on component mount
  useEffect(() => {
    fetchProjects();
  }, []);

  useEffect(() => {
    if (projectId) {
      loadAuditData();
    }
  }, [projectId]);

  const loadAuditData = async () => {
    if (!projectId) return;

    try {
      // Fetch latest audit and summary
      await Promise.all([
        fetchLatestAudit(projectId),
        fetchAuditSummary(projectId),
      ]);
    } catch (error) {
      console.error("Failed to load audit data:", error);
    }
  };

  const handleProjectChange = (newProjectId: string) => {
    setSelectedProjectId(newProjectId);
    // Optionally fetch project details if needed
    if (newProjectId) {
      fetchProjectDetails(newProjectId);
    }
  };

  // Handle creating new project
  const handleCreateProject = async (values: any) => {
    try {
      const projectData = {
        name: values.name,
        domain: values.domain,
        settings: {
          country: values.country || "US",
          language: values.language || "en",
          trackingEnabled: true,
        },
      };

      const result = await createProject(projectData);

      if (result.meta.requestStatus === "fulfilled") {
        message.success("Project created successfully!");
        setIsCreateModalVisible(false);
        createProjectForm.resetFields();

        // Select the newly created project
        const newProject = result.payload as any;
        setSelectedProjectId(newProject.id);

        // Refresh projects list
        fetchProjects();
      }
    } catch (error) {
      message.error("Failed to create project");
    }
  };

  const handleCreateModalCancel = () => {
    setIsCreateModalVisible(false);
    createProjectForm.resetFields();
  };

  // Handle creating new audit
  const handleCreateAudit = async () => {
    if (!projectId || !currentProject?.domain) {
      message.error("Please select a project first");
      return;
    }

    try {
      const result = await createQuickAudit(
        projectId,
        `https://${currentProject.domain}`
      );

      if (result.meta.requestStatus === "fulfilled") {
        const payload = result.payload as any;
        const auditId = payload.id;
        message.success("Audit started successfully!");

        // Start polling for audit progress
        startAuditPolling(auditId);
      }
    } catch (error) {
      message.error("Failed to start audit");
    }
  };

  // Handle refreshing audit results
  const handleRefresh = () => {
    if (currentAudit?.id) {
      fetchAuditResults(currentAudit.id);
    }
    loadAuditData();
  };
  // Show loading state
  if (isLoading && !currentAudit) {
    return (
      <div className={styles.onPageAudit}>
        <div style={{ textAlign: "center", padding: "50px" }}>
          <Spin size="large" />
          <div style={{ marginTop: 16 }}>Loading audit data...</div>
        </div>
      </div>
    );
  }
  // Show no audit state
  if (!currentAudit && !isLoading) {
    return (
      <div className={styles.onPageAudit}>
        {/* Header */}
        <div className={styles.header}>
          <div className={styles.headerCenter}>
            <Select
              value={selectedProjectId || currentProject?.id}
              onChange={handleProjectChange}
              placeholder="Select a project"
              style={{ width: 300 }}
              loading={projectsLoading.fetchProjects}
              dropdownRender={(menu) => (
                <>
                  {menu}
                  <Divider style={{ margin: "8px 0" }} />
                  <Button
                    type="text"
                    icon={<PlusOutlined />}
                    onClick={() => setIsCreateModalVisible(true)}
                    style={{ width: "100%" }}
                  >
                    Create New Project
                  </Button>
                </>
              )}
            >
              {projects?.map((project) => (
                <Option key={project.id} value={project.id}>
                  {project.name} - {project.domain}
                </Option>
              ))}
            </Select>
          </div>

          <div className={styles.headerRight}>
            <Button
              icon={<ReloadOutlined />}
              onClick={handleRefresh}
              loading={isLoading}
            >
              Refresh
            </Button>
            {/* <Button icon={<MailOutlined />} type="text">
              Email
            </Button>
            <Button icon={<DownloadOutlined />} type="primary">
              Download
            </Button> */}
          </div>
        </div>
        <Card>
          <Empty
            description="No audit found for this project"
            image={Empty.PRESENTED_IMAGE_SIMPLE}
          >
            <Button
              type="primary"
              icon={<PlayCircleOutlined />}
              onClick={handleCreateAudit}
              loading={isCreating}
            >
              Start New Audit
            </Button>
          </Empty>
        </Card>
      </div>
    );
  }

  // Get audit score from results
  const getAuditScore = () => {
    if (auditResults?.results?.overview?.score) {
      return auditResults.results.overview.score;
    }
    if (currentAudit?.results?.overview?.score) {
      return currentAudit.results.overview.score;
    }
    return 0;
  };

  const auditScore = getAuditScore();
  const isCompleted = currentAudit?.status === "completed";
  const isRunning =
    currentAudit?.status === "running" || currentAudit?.status === "pending";
  const progress = currentAudit?.results?.progress || 0;

  return (
    <div className={styles.onPageAudit}>
      {/* Error Alert */}
      {error && (
        <Alert
          message="Error"
          description={error}
          type="error"
          closable
          onClose={clearError}
          style={{ marginBottom: 16 }}
        />
      )}
      {/* Header */}
      <div className={styles.header}>
        <div className={styles.headerLeft}>
          <Button
            type={activeTab === "suggestions" ? "primary" : "default"}
            onClick={() => setActiveTab("suggestions")}
          >
            Suggestions
          </Button>
        </div>

        <div className={styles.headerCenter}>
          <Select
            value={selectedProjectId || currentProject?.id}
            onChange={handleProjectChange}
            placeholder="Select a project"
            style={{ width: 300 }}
            loading={projectsLoading.fetchProjects}
            dropdownRender={(menu) => (
              <>
                {menu}
                <Divider style={{ margin: "8px 0" }} />
                <Button
                  type="text"
                  icon={<PlusOutlined />}
                  onClick={() => setIsCreateModalVisible(true)}
                  style={{ width: "100%" }}
                >
                  Create New Project
                </Button>
              </>
            )}
          >
            {projects?.map((project) => (
              <Option key={project.id} value={project.id}>
                {project.name} - {project.domain}
              </Option>
            ))}
          </Select>
        </div>

        <div className={styles.headerRight}>
          <Button
            icon={<ReloadOutlined />}
            onClick={handleRefresh}
            loading={isLoading}
          >
            Refresh
          </Button>
          <Button icon={<MailOutlined />} type="text">
            Email
          </Button>
          <Button icon={<DownloadOutlined />} type="primary">
            Download
          </Button>
        </div>
      </div>
      {/* Main Report Card */}
      <Card className={styles.reportCard}>
        <Row gutter={[24, 24]}>
          <Col xs={24} lg={16}>
            <div className={styles.reportInfo}>
              <Text type="secondary">Report for</Text>
              <Title level={2} className={styles.domainTitle}>
                {currentProject?.domain || "Website"}
              </Title>
              <Paragraph className={styles.reportDescription}>
                {isRunning
                  ? "Audit is currently running..."
                  : isCompleted
                  ? "Complete SEO audit analysis including technical SEO, performance, and content optimization recommendations"
                  : "Audit analysis results"}
              </Paragraph>

              {/* Progress bar for running audits */}
              {isRunning && (
                <div style={{ marginTop: 16 }}>
                  <Progress
                    percent={progress}
                    status="active"
                    strokeColor={{
                      "0%": "#108ee9",
                      "100%": "#87d068",
                    }}
                  />
                  <Text type="secondary">
                    Analyzing your website... {progress}%
                  </Text>
                </div>
              )}
            </div>
          </Col>

          <Col xs={24} lg={8}>
            <div className={styles.scoreSection}>
              <div className={styles.mainScore}>
                <div className={styles.scoreCircle}>
                  <ResponsiveContainer width={120} height={120}>
                    <PieChart>
                      <Pie
                        data={[
                          { value: auditScore },
                          { value: 100 - auditScore },
                        ]}
                        cx="50%"
                        cy="50%"
                        innerRadius={35}
                        outerRadius={50}
                        startAngle={90}
                        endAngle={450}
                        dataKey="value"
                      >
                        <Cell
                          fill={
                            auditScore >= 80
                              ? "#52c41a"
                              : auditScore >= 60
                              ? "#faad14"
                              : "#ff6b35"
                          }
                        />
                        <Cell fill="#f0f0f0" />
                      </Pie>
                    </PieChart>
                  </ResponsiveContainer>
                  <div className={styles.scoreNumber}>{auditScore}</div>
                </div>
                <Text type="secondary">Overall Score</Text>
              </div>
            </div>
          </Col>
        </Row>
      </Card>
      {/* Detailed Audit Information */}
      {(auditResults || currentAudit) && (
        <Card className={styles.sectionCard} title="Audit Information">
          <Row gutter={[24, 24]}>
            <Col xs={24} md={12}>
              <div className={styles.auditInfo}>
                <Title level={4}>Audit Details</Title>
                <div className={styles.infoItem}>
                  <Text strong>Audit ID: </Text>
                  <Text code>{currentAudit?.id || auditResults?.id}</Text>
                </div>
                <div className={styles.infoItem}>
                  <Text strong>Status: </Text>
                  <Tag
                    color={
                      (currentAudit?.status || auditResults?.status) ===
                      "completed"
                        ? "green"
                        : (currentAudit?.status || auditResults?.status) ===
                          "running"
                        ? "blue"
                        : "orange"
                    }
                  >
                    {(
                      currentAudit?.status || auditResults?.status
                    )?.toUpperCase()}
                  </Tag>
                </div>
                <div className={styles.infoItem}>
                  <Text strong>Created At: </Text>
                  <Text>
                    {new Date(
                      currentAudit?.createdAt || auditResults?.createdAt || ""
                    ).toLocaleString()}
                  </Text>
                </div>
                {(currentAudit?.completedAt || auditResults?.completedAt) && (
                  <div className={styles.infoItem}>
                    <Text strong>Completed At: </Text>
                    <Text>
                      {new Date(
                        currentAudit?.completedAt ||
                          auditResults?.completedAt ||
                          ""
                      ).toLocaleString()}
                    </Text>
                  </div>
                )}
                {currentAudit?.message && (
                  <div className={styles.infoItem}>
                    <Text strong>Message: </Text>
                    <Text>{currentAudit.message}</Text>
                  </div>
                )}
              </div>
            </Col>
            <Col xs={24} md={12}>
              <div className={styles.auditOverview}>
                <Title level={4}>Overview</Title>
                {(auditResults?.results?.overview ||
                  currentAudit?.results?.overview) && (
                  <div>
                    <div className={styles.infoItem}>
                      <Text strong>Total Issues: </Text>
                      <Text>
                        {(auditResults?.results?.overview as any)
                          ?.total_issues ||
                          (currentAudit?.results?.overview as any)
                            ?.total_issues ||
                          auditResults?.results?.overview?.total_issues ||
                          currentAudit?.results?.overview?.total_issues ||
                          0}
                      </Text>
                    </div>
                    <div className={styles.infoItem}>
                      <Text strong>Critical Issues: </Text>
                      <Text type="danger">
                        {(auditResults?.results?.overview as any)
                          ?.critical_issues ||
                          (currentAudit?.results?.overview as any)
                            ?.critical_issues ||
                          0}
                      </Text>
                    </div>
                    <div className={styles.infoItem}>
                      <Text strong>Warnings: </Text>
                      <Text type="warning">
                        {(auditResults?.results?.overview as any)?.warnings ||
                          (currentAudit?.results?.overview as any)?.warnings ||
                          0}
                      </Text>
                    </div>
                    <div className={styles.infoItem}>
                      <Text strong>Passed Checks: </Text>
                      <Text type="success">
                        {(auditResults?.results?.overview as any)
                          ?.passed_checks ||
                          (currentAudit?.results?.overview as any)
                            ?.passed_checks ||
                          0}
                      </Text>
                    </div>
                    <div className={styles.infoItem}>
                      <Text strong>Pages Analyzed: </Text>
                      <Text>
                        {auditResults?.results?.overview?.pages_analyzed ||
                          currentAudit?.results?.overview?.pages_analyzed ||
                          0}
                      </Text>
                    </div>
                    {((auditResults?.results as any)?.processing_time ||
                      (auditResults?.results as any)?.completed_at) && (
                      <div className={styles.infoItem}>
                        <Text strong>Processing Time: </Text>
                        <Text>
                          {(auditResults?.results as any)?.processing_time ||
                            "N/A"}
                        </Text>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </Col>
          </Row>
        </Card>
      )}
      {/* Beautiful Audit Details */}
      {(auditResults || currentAudit) && (
        <Card className={styles.sectionCard} title="Audit Details">
          <Row gutter={[24, 24]}>
            {/* Technical SEO Details */}
            {((auditResults?.results as any)?.technical_seo ||
              (currentAudit?.results as any)?.technical_seo) && (
              <Col xs={24} md={12} lg={8}>
                <Card
                  size="small"
                  title="🔧 Technical SEO"
                  bordered={false}
                  className={styles.detailCard}
                >
                  <div className={styles.scoreDisplay}>
                    <div className={styles.bigScore}>
                      {(auditResults?.results as any)?.technical_seo?.score ||
                        (currentAudit?.results as any)?.technical_seo?.score ||
                        0}
                    </div>
                    <Text type="secondary">Score</Text>
                  </div>

                  <Divider style={{ margin: "16px 0" }} />

                  <div className={styles.detailList}>
                    <div className={styles.detailItem}>
                      <Text strong>Sitemap: </Text>
                      <Tag
                        color={
                          (auditResults?.results as any)?.technical_seo?.sitemap
                            ?.exists ||
                          (currentAudit?.results as any)?.technical_seo?.sitemap
                            ?.exists
                            ? "green"
                            : "red"
                        }
                      >
                        {(auditResults?.results as any)?.technical_seo?.sitemap
                          ?.exists ||
                        (currentAudit?.results as any)?.technical_seo?.sitemap
                          ?.exists
                          ? "Found"
                          : "Not Found"}
                      </Tag>
                    </div>
                    {((auditResults?.results as any)?.technical_seo?.sitemap
                      ?.url_count ||
                      (currentAudit?.results as any)?.technical_seo?.sitemap
                        ?.url_count) && (
                      <div className={styles.detailItem}>
                        <Text strong>URLs in Sitemap: </Text>
                        <Text>
                          {(auditResults?.results as any)?.technical_seo
                            ?.sitemap?.url_count ||
                            (currentAudit?.results as any)?.technical_seo
                              ?.sitemap?.url_count}
                        </Text>
                      </div>
                    )}
                    <div className={styles.detailItem}>
                      <Text strong>Robots.txt: </Text>
                      <Tag
                        color={
                          (auditResults?.results as any)?.technical_seo
                            ?.robots_txt?.exists ||
                          (currentAudit?.results as any)?.technical_seo
                            ?.robots_txt?.exists
                            ? "green"
                            : "red"
                        }
                      >
                        {(auditResults?.results as any)?.technical_seo
                          ?.robots_txt?.exists ||
                        (currentAudit?.results as any)?.technical_seo
                          ?.robots_txt?.exists
                          ? "Found"
                          : "Not Found"}
                      </Tag>
                    </div>
                  </div>
                </Card>
              </Col>
            )}

            {/* Performance Details */}
            {((auditResults?.results as any)?.performance ||
              (currentAudit?.results as any)?.performance) && (
              <Col xs={24} md={12} lg={8}>
                <Card
                  size="small"
                  title="⚡ Performance"
                  bordered={false}
                  className={styles.detailCard}
                >
                  <div className={styles.scoreDisplay}>
                    <div className={styles.bigScore}>
                      {(auditResults?.results as any)?.performance?.score ||
                        (currentAudit?.results as any)?.performance?.score ||
                        0}
                    </div>
                    <Text type="secondary">Score</Text>
                  </div>

                  <Divider style={{ margin: "16px 0" }} />

                  <div className={styles.detailList}>
                    <div className={styles.detailItem}>
                      <Text strong>Avg Page Speed: </Text>
                      <Text>
                        {(auditResults?.results as any)?.performance?.metrics
                          ?.avg_page_speed ||
                          (currentAudit?.results as any)?.performance?.metrics
                            ?.avg_page_speed ||
                          0}
                      </Text>
                    </div>
                    <div className={styles.detailItem}>
                      <Text strong>Mobile Friendly: </Text>
                      <Tag
                        color={
                          (auditResults?.results as any)?.performance?.metrics
                            ?.mobile_friendly ||
                          (currentAudit?.results as any)?.performance?.metrics
                            ?.mobile_friendly
                            ? "green"
                            : "red"
                        }
                      >
                        {(auditResults?.results as any)?.performance?.metrics
                          ?.mobile_friendly ||
                        (currentAudit?.results as any)?.performance?.metrics
                          ?.mobile_friendly
                          ? "Yes"
                          : "No"}
                      </Tag>
                    </div>
                    <div className={styles.vitalSection}>
                      <Text
                        strong
                        style={{ display: "block", marginBottom: 8 }}
                      >
                        Core Web Vitals:
                      </Text>
                      <div className={styles.vitalItem}>
                        <Text>LCP: </Text>
                        <Tag color="blue">
                          {(auditResults?.results as any)?.performance?.metrics
                            ?.core_web_vitals?.lcp ||
                            (currentAudit?.results as any)?.performance?.metrics
                              ?.core_web_vitals?.lcp ||
                            0}
                          ms
                        </Tag>
                      </div>
                      <div className={styles.vitalItem}>
                        <Text>FID: </Text>
                        <Tag color="blue">
                          {(auditResults?.results as any)?.performance?.metrics
                            ?.core_web_vitals?.fid ||
                            (currentAudit?.results as any)?.performance?.metrics
                              ?.core_web_vitals?.fid ||
                            0}
                          ms
                        </Tag>
                      </div>
                      <div className={styles.vitalItem}>
                        <Text>CLS: </Text>
                        <Tag color="blue">
                          {(auditResults?.results as any)?.performance?.metrics
                            ?.core_web_vitals?.cls ||
                            (currentAudit?.results as any)?.performance?.metrics
                              ?.core_web_vitals?.cls ||
                            0}
                        </Tag>
                      </div>
                    </div>
                  </div>
                </Card>
              </Col>
            )}

            {/* Accessibility Details */}
            {((auditResults?.results as any)?.accessibility ||
              (currentAudit?.results as any)?.accessibility) && (
              <Col xs={24} md={12} lg={8}>
                <Card
                  size="small"
                  title="♿ Accessibility"
                  bordered={false}
                  className={styles.detailCard}
                >
                  <div className={styles.scoreDisplay}>
                    <div className={styles.bigScore}>
                      {(auditResults?.results as any)?.accessibility?.score ||
                        (currentAudit?.results as any)?.accessibility?.score ||
                        0}
                    </div>
                    <Text type="secondary">Score</Text>
                  </div>

                  <Divider style={{ margin: "16px 0" }} />

                  <div className={styles.detailList}>
                    <div className={styles.detailItem}>
                      <Text strong>WCAG Compliance: </Text>
                      <Tag
                        color={
                          ((auditResults?.results as any)?.accessibility
                            ?.wcag_compliance ||
                            (currentAudit?.results as any)?.accessibility
                              ?.wcag_compliance) === "Non-compliant"
                            ? "red"
                            : "green"
                        }
                      >
                        {(auditResults?.results as any)?.accessibility
                          ?.wcag_compliance ||
                          (currentAudit?.results as any)?.accessibility
                            ?.wcag_compliance ||
                          "Unknown"}
                      </Tag>
                    </div>
                    <div className={styles.detailItem}>
                      <Text strong>Issues Found: </Text>
                      <Text>
                        {
                          (
                            (auditResults?.results as any)?.accessibility
                              ?.issues ||
                            (currentAudit?.results as any)?.accessibility
                              ?.issues ||
                            []
                          ).length
                        }
                      </Text>
                    </div>
                  </div>
                </Card>
              </Col>
            )}

            {/* Content Analysis Details */}
            {((auditResults?.results as any)?.content_analysis ||
              (currentAudit?.results as any)?.content_analysis) && (
              <Col xs={24} md={12} lg={8}>
                <Card
                  size="small"
                  title="📝 Content Analysis"
                  bordered={false}
                  className={styles.detailCard}
                >
                  <div className={styles.scoreDisplay}>
                    <div className={styles.bigScore}>
                      {(auditResults?.results as any)?.content_analysis
                        ?.score ||
                        (currentAudit?.results as any)?.content_analysis
                          ?.score ||
                        0}
                    </div>
                    <Text type="secondary">Score</Text>
                  </div>

                  <Divider style={{ margin: "16px 0" }} />

                  <div className={styles.detailList}>
                    <div className={styles.detailItem}>
                      <Text strong>Avg Word Count: </Text>
                      <Text>
                        {(auditResults?.results as any)?.content_analysis
                          ?.avg_word_count ||
                          (currentAudit?.results as any)?.content_analysis
                            ?.avg_word_count ||
                          0}
                      </Text>
                    </div>
                    <div className={styles.detailItem}>
                      <Text strong>Duplicate Content: </Text>
                      <Text>
                        {
                          (
                            (auditResults?.results as any)?.content_analysis
                              ?.duplicate_content ||
                            (currentAudit?.results as any)?.content_analysis
                              ?.duplicate_content ||
                            []
                          ).length
                        }{" "}
                        found
                      </Text>
                    </div>
                    <div className={styles.detailItem}>
                      <Text strong>Content Issues: </Text>
                      <Text>
                        {
                          (
                            (auditResults?.results as any)?.content_analysis
                              ?.issues ||
                            (currentAudit?.results as any)?.content_analysis
                              ?.issues ||
                            []
                          ).length
                        }
                      </Text>
                    </div>
                  </div>
                </Card>
              </Col>
            )}

            {/* Processing Information */}
            <Col xs={24} md={12} lg={8}>
              <Card
                size="small"
                title="⏱️ Processing Info"
                bordered={false}
                className={styles.detailCard}
              >
                <div className={styles.detailList}>
                  <div className={styles.detailItem}>
                    <Text strong>Processing Time: </Text>
                    <Tag color="purple">
                      {Math.round(
                        ((auditResults?.results as any)?.processing_time ||
                          (currentAudit?.results as any)?.processing_time ||
                          0) / 1000
                      )}
                      s
                    </Tag>
                  </div>
                  <div className={styles.detailItem}>
                    <Text strong>Completed At: </Text>
                    <Text>
                      {(auditResults?.results as any)?.completed_at ||
                      (currentAudit?.results as any)?.completed_at
                        ? new Date(
                            (auditResults?.results as any)?.completed_at ||
                              (currentAudit?.results as any)?.completed_at
                          ).toLocaleString()
                        : "N/A"}
                    </Text>
                  </div>
                  <div className={styles.detailItem}>
                    <Text strong>Created At: </Text>
                    <Text>
                      {auditResults?.createdAt || currentAudit?.createdAt
                        ? new Date(
                            auditResults?.createdAt ||
                              currentAudit?.createdAt ||
                              ""
                          ).toLocaleString()
                        : "N/A"}
                    </Text>
                  </div>
                </div>
              </Card>
            </Col>
          </Row>
        </Card>
      )}{" "}
      {/* Pages Analyzed */}
      {auditResults &&
        (auditResults?.results as any)?.pages_analyzed &&
        Array.isArray((auditResults.results as any).pages_analyzed) && (
          <Card className={styles.sectionCard} title="Pages Analyzed">
            <List
              dataSource={(auditResults.results as any).pages_analyzed.slice(
                0,
                10
              )}
              renderItem={(page: any, index: number) => (
                <List.Item>
                  <List.Item.Meta
                    avatar={<Text strong>{index + 1}</Text>}
                    title={
                      <div>
                        <Text strong>{page.url}</Text>
                        <Tag
                          color={page.status_code === 200 ? "green" : "red"}
                          style={{ marginLeft: 8 }}
                        >
                          {page.status_code}
                        </Tag>
                      </div>
                    }
                    description={
                      <div>
                        <Text>Response Time: {page.response_time}ms</Text>
                        {page.seo_analysis && (
                          <div style={{ marginTop: 8 }}>
                            <Text>SEO Score: </Text>
                            <Tag
                              color={
                                page.seo_analysis.score >= 80
                                  ? "green"
                                  : page.seo_analysis.score >= 60
                                  ? "orange"
                                  : "red"
                              }
                            >
                              {page.seo_analysis.score}
                            </Tag>
                            <div style={{ marginTop: 4 }}>
                              <Text type="secondary">
                                Title: {page.seo_analysis.title || "N/A"} |
                                Words: {page.seo_analysis.word_count || 0} |
                                Images: {page.seo_analysis.images_total || 0}
                              </Text>
                            </div>
                          </div>
                        )}
                      </div>
                    }
                  />
                </List.Item>
              )}
            />
            {auditResults &&
              (auditResults.results as any).pages_analyzed.length > 10 && (
                <div style={{ textAlign: "center", marginTop: 16 }}>
                  <Text type="secondary">
                    Showing 10 of{" "}
                    {auditResults &&
                      (auditResults.results as any).pages_analyzed.length}{" "}
                    pages
                  </Text>
                </div>
              )}
          </Card>
        )}
      {/* Core Web Vitals Details */}
      {auditResults &&
        (auditResults?.results as any)?.pages_analyzed &&
        Array.isArray((auditResults.results as any).pages_analyzed) && (
          <Card className={styles.sectionCard} title="Core Web Vitals Analysis">
            <Row gutter={[24, 24]}>
              {auditResults &&
                (auditResults.results as any).pages_analyzed.slice(0, 3).map(
                  (page: any, index: number) =>
                    page.lighthouse_mobile && (
                      <Col xs={24} lg={8} key={index}>
                        <Card
                          size="small"
                          title={`Page ${index + 1}`}
                          bordered={false}
                        >
                          <div style={{ marginBottom: 16 }}>
                            <Text strong>URL: </Text>
                            <Text code style={{ fontSize: 12 }}>
                              {page.url}
                            </Text>
                          </div>

                          <div className={styles.vitalMetrics}>
                            <div className={styles.metric}>
                              <Text strong>LCP: </Text>
                              <Tag
                                color={
                                  page.lighthouse_mobile.core_web_vitals
                                    .lcp_status === "GOOD"
                                    ? "green"
                                    : "red"
                                }
                              >
                                {
                                  page.lighthouse_mobile.metrics
                                    .largest_contentful_paint
                                }
                                s
                              </Tag>
                            </div>

                            <div className={styles.metric}>
                              <Text strong>FID: </Text>
                              <Tag
                                color={
                                  page.lighthouse_mobile.core_web_vitals
                                    .fid_status === "GOOD"
                                    ? "green"
                                    : "red"
                                }
                              >
                                {
                                  page.lighthouse_mobile.metrics
                                    .first_input_delay
                                }
                                ms
                              </Tag>
                            </div>

                            <div className={styles.metric}>
                              <Text strong>CLS: </Text>
                              <Tag
                                color={
                                  page.lighthouse_mobile.core_web_vitals
                                    .cls_status === "GOOD"
                                    ? "green"
                                    : "red"
                                }
                              >
                                {
                                  page.lighthouse_mobile.metrics
                                    .cumulative_layout_shift
                                }
                              </Tag>
                            </div>
                          </div>

                          <Divider style={{ margin: "16px 0" }} />

                          <div className={styles.scoreSummary}>
                            <Row gutter={16}>
                              <Col span={12}>
                                <div style={{ textAlign: "center" }}>
                                  <Text strong style={{ display: "block" }}>
                                    Performance
                                  </Text>
                                  <Text
                                    style={{ fontSize: 20, color: "#1890ff" }}
                                  >
                                    {page.lighthouse_mobile.performance_score}
                                  </Text>
                                </div>
                              </Col>
                              <Col span={12}>
                                <div style={{ textAlign: "center" }}>
                                  <Text strong style={{ display: "block" }}>
                                    SEO
                                  </Text>
                                  <Text
                                    style={{ fontSize: 20, color: "#52c41a" }}
                                  >
                                    {page.lighthouse_mobile.seo_score}
                                  </Text>
                                </div>
                              </Col>
                            </Row>
                          </div>
                        </Card>
                      </Col>
                    )
                )}
            </Row>
          </Card>
        )}
      {/* Enhanced Audit Scores */}
      {(auditResults?.results || currentAudit?.results) && (
        <Card className={styles.sectionCard} title="📊 Audit Scores Overview">
          <Row gutter={[24, 24]} className={styles.auditScores}>
            {/* Technical SEO Score */}
            {((auditResults?.results as any)?.technical_seo ||
              (currentAudit?.results as any)?.technical_seo) && (
              <Col xs={12} sm={8} md={6} lg={4}>
                <Card className={styles.modernAuditCard} bordered={false}>
                  <div className={styles.cardHeader}>
                    <div className={styles.cardIcon}>🔧</div>
                    <div className={styles.auditTitle}>Technical SEO</div>
                  </div>
                  <div className={styles.modernScoreDisplay}>
                    <div className={styles.scoreNumber}>
                      {(auditResults?.results as any)?.technical_seo?.score ||
                        (currentAudit?.results as any)?.technical_seo?.score ||
                        0}
                    </div>
                    <Progress
                      percent={
                        (auditResults?.results as any)?.technical_seo?.score ||
                        (currentAudit?.results as any)?.technical_seo?.score ||
                        0
                      }
                      strokeColor="#1890ff"
                      showInfo={false}
                      strokeWidth={8}
                    />
                  </div>
                </Card>
              </Col>
            )}

            {/* Performance Score */}
            {((auditResults?.results as any)?.performance ||
              (currentAudit?.results as any)?.performance) && (
              <Col xs={12} sm={8} md={6} lg={4}>
                <Card className={styles.modernAuditCard} bordered={false}>
                  <div className={styles.cardHeader}>
                    <div className={styles.cardIcon}>⚡</div>
                    <div className={styles.auditTitle}>Performance</div>
                  </div>
                  <div className={styles.modernScoreDisplay}>
                    <div className={styles.scoreNumber}>
                      {(auditResults?.results as any)?.performance?.score ||
                        (currentAudit?.results as any)?.performance?.score ||
                        0}
                    </div>
                    <Progress
                      percent={
                        (auditResults?.results as any)?.performance?.score ||
                        (currentAudit?.results as any)?.performance?.score ||
                        0
                      }
                      strokeColor="#52c41a"
                      showInfo={false}
                      strokeWidth={8}
                    />
                  </div>
                </Card>
              </Col>
            )}

            {/* Content Score */}
            {((auditResults?.results as any)?.content_analysis ||
              (currentAudit?.results as any)?.content_analysis) && (
              <Col xs={12} sm={8} md={6} lg={4}>
                <Card className={styles.modernAuditCard} bordered={false}>
                  <div className={styles.cardHeader}>
                    <div className={styles.cardIcon}>📝</div>
                    <div className={styles.auditTitle}>Content</div>
                  </div>
                  <div className={styles.modernScoreDisplay}>
                    <div className={styles.scoreNumber}>
                      {(auditResults?.results as any)?.content_analysis
                        ?.score ||
                        (currentAudit?.results as any)?.content_analysis
                          ?.score ||
                        0}
                    </div>
                    <Progress
                      percent={
                        (auditResults?.results as any)?.content_analysis
                          ?.score ||
                        (currentAudit?.results as any)?.content_analysis
                          ?.score ||
                        0
                      }
                      strokeColor="#faad14"
                      showInfo={false}
                      strokeWidth={8}
                    />
                  </div>
                </Card>
              </Col>
            )}

            {/* Accessibility Score */}
            {((auditResults?.results as any)?.accessibility ||
              (currentAudit?.results as any)?.accessibility) && (
              <Col xs={12} sm={8} md={6} lg={4}>
                <Card className={styles.modernAuditCard} bordered={false}>
                  <div className={styles.cardHeader}>
                    <div className={styles.cardIcon}>♿</div>
                    <div className={styles.auditTitle}>Accessibility</div>
                  </div>
                  <div className={styles.modernScoreDisplay}>
                    <div className={styles.scoreNumber}>
                      {(auditResults?.results as any)?.accessibility?.score ||
                        (currentAudit?.results as any)?.accessibility?.score ||
                        0}
                    </div>
                    <Progress
                      percent={
                        (auditResults?.results as any)?.accessibility?.score ||
                        (currentAudit?.results as any)?.accessibility?.score ||
                        0
                      }
                      strokeColor="#722ed1"
                      showInfo={false}
                      strokeWidth={8}
                    />
                  </div>
                </Card>
              </Col>
            )}

            {/* Overall Summary */}
            <Col xs={24} sm={16} md={12} lg={8}>
              <Card className={styles.summaryCard} bordered={false}>
                <div className={styles.cardHeader}>
                  <div className={styles.cardIcon}>📈</div>
                  <div className={styles.auditTitle}>Summary</div>
                </div>
                <div className={styles.summaryContent}>
                  <div className={styles.summaryItem}>
                    <Text strong>Overall Score: </Text>
                    <Tag color="blue" className={styles.bigTag}>
                      {auditResults?.results?.overview?.score ||
                        currentAudit?.results?.overview?.score ||
                        0}
                    </Tag>
                  </div>
                  <div className={styles.summaryItem}>
                    <Text strong>Total Issues: </Text>
                    <Tag color="orange">
                      {(auditResults?.results?.overview as any)?.total_issues ||
                        (currentAudit?.results?.overview as any)
                          ?.total_issues ||
                        0}
                    </Tag>
                  </div>
                  <div className={styles.summaryItem}>
                    <Text strong>Passed Checks: </Text>
                    <Tag color="green">
                      {(auditResults?.results?.overview as any)
                        ?.passed_checks ||
                        (currentAudit?.results?.overview as any)
                          ?.passed_checks ||
                        0}
                    </Tag>
                  </div>
                </div>
              </Card>
            </Col>
          </Row>
        </Card>
      )}
      {/* SEO Issues */}
      {auditResults?.results?.technical &&
        (auditResults.results.technical as any)?.issues && (
          <Card className={styles.sectionCard} title="Technical SEO Issues">
            <List
              dataSource={
                (auditResults.results.technical as any).issues as any[]
              }
              renderItem={(issue: any) => (
                <List.Item>
                  <List.Item.Meta
                    avatar={
                      <div className={styles.issueIcon}>
                        {issue.severity === "error" ? (
                          <CloseCircleOutlined style={{ color: "#ff4d4f" }} />
                        ) : (
                          <ExclamationCircleOutlined
                            style={{ color: "#faad14" }}
                          />
                        )}
                      </div>
                    }
                    title={
                      <div>
                        <Text strong>
                          {issue.type?.replace(/_/g, " ").toUpperCase() ||
                            "Issue"}
                        </Text>
                        <Tag
                          color={issue.severity === "error" ? "red" : "orange"}
                          style={{ marginLeft: 8 }}
                        >
                          {issue.severity}
                        </Tag>
                      </div>
                    }
                    description={
                      <div>
                        <Paragraph>{issue.message}</Paragraph>
                        {issue.pages && Array.isArray(issue.pages) && (
                          <div>
                            <Text type="secondary">Affected pages:</Text>
                            <ul>
                              {issue.pages
                                .slice(0, 3)
                                .map((page: any, index: number) => (
                                  <li key={index}>
                                    <Text code>{page}</Text>
                                  </li>
                                ))}
                              {issue.pages.length > 3 && (
                                <li>
                                  <Text type="secondary">
                                    ...and {issue.pages.length - 3} more
                                  </Text>
                                </li>
                              )}
                            </ul>
                          </div>
                        )}
                      </div>
                    }
                  />
                </List.Item>
              )}
            />
          </Card>
        )}
      {/* Performance Issues */}
      {auditResults?.results?.performance && (
        <Card className={styles.sectionCard} title="Performance Analysis">
          <Row gutter={[24, 24]}>
            <Col xs={24} md={12}>
              <div className={styles.performanceMetrics}>
                <Title level={4}>Core Web Vitals</Title>
                {auditResults.results.performance.metrics && (
                  <div>
                    <div className={styles.metric}>
                      <Text>First Contentful Paint: </Text>
                      <Text strong>
                        {
                          auditResults.results.performance.metrics
                            .first_contentful_paint
                        }
                      </Text>
                    </div>
                    <div className={styles.metric}>
                      <Text>Largest Contentful Paint: </Text>
                      <Text strong>
                        {
                          auditResults.results.performance.metrics
                            .largest_contentful_paint
                        }
                      </Text>
                    </div>
                    <div className={styles.metric}>
                      <Text>Cumulative Layout Shift: </Text>
                      <Text strong>
                        {
                          auditResults.results.performance.metrics
                            .cumulative_layout_shift
                        }
                      </Text>
                    </div>
                  </div>
                )}
              </div>
            </Col>
            <Col xs={24} md={12}>
              <div className={styles.performanceScore}>
                <Title level={4}>Performance Score</Title>
                <div className={styles.scoreDisplay}>
                  <Progress
                    type="circle"
                    percent={auditResults.results.performance.score}
                    format={(percent) => `${percent}`}
                    strokeColor={
                      auditResults.results.performance.score >= 80
                        ? "#52c41a"
                        : auditResults.results.performance.score >= 60
                        ? "#faad14"
                        : "#ff4d4f"
                    }
                  />
                </div>
              </div>
            </Col>
          </Row>
        </Card>
      )}
      {/* Content Issues */}
      {auditResults?.results?.content &&
        (auditResults.results.content as any)?.issues && (
          <Card className={styles.sectionCard} title="Content Issues">
            <List
              dataSource={(auditResults.results.content as any).issues as any[]}
              renderItem={(issue: any) => (
                <List.Item>
                  <List.Item.Meta
                    avatar={
                      <div className={styles.issueIcon}>
                        {issue.severity === "error" ? (
                          <CloseCircleOutlined style={{ color: "#ff4d4f" }} />
                        ) : (
                          <ExclamationCircleOutlined
                            style={{ color: "#faad14" }}
                          />
                        )}
                      </div>
                    }
                    title={
                      <div>
                        <Text strong>
                          {issue.type?.replace(/_/g, " ").toUpperCase() ||
                            "Content Issue"}
                        </Text>
                        <Tag
                          color={issue.severity === "error" ? "red" : "orange"}
                          style={{ marginLeft: 8 }}
                        >
                          {issue.severity}
                        </Tag>
                      </div>
                    }
                    description={issue.message}
                  />
                </List.Item>
              )}
            />
          </Card>
        )}
      {/* Accessibility Issues */}
      {auditResults?.results?.accessibility &&
        (auditResults.results.accessibility as any)?.issues && (
          <Card className={styles.sectionCard} title="Accessibility Issues">
            <List
              dataSource={
                (auditResults.results.accessibility as any).issues as any[]
              }
              renderItem={(issue: any) => (
                <List.Item>
                  <List.Item.Meta
                    avatar={
                      <div className={styles.issueIcon}>
                        {issue.severity === "error" ? (
                          <CloseCircleOutlined style={{ color: "#ff4d4f" }} />
                        ) : (
                          <ExclamationCircleOutlined
                            style={{ color: "#faad14" }}
                          />
                        )}
                      </div>
                    }
                    title={
                      <div>
                        <Text strong>
                          {issue.type?.replace(/_/g, " ").toUpperCase() ||
                            "Accessibility Issue"}
                        </Text>
                        <Tag
                          color={issue.severity === "error" ? "red" : "orange"}
                          style={{ marginLeft: 8 }}
                        >
                          {issue.severity}
                        </Tag>
                      </div>
                    }
                    description={issue.message}
                  />
                </List.Item>
              )}
            />
          </Card>
        )}
      {/* Audit Summary Stats */}
      {auditSummary && (
        <Card className={styles.sectionCard} title="Audit Statistics">
          <Row gutter={[16, 16]}>
            <Col xs={12} sm={6}>
              <div className={styles.statItem}>
                <div className={styles.statNumber}>
                  {auditSummary.stats.completed}
                </div>
                <div className={styles.statLabel}>Completed</div>
              </div>
            </Col>
            <Col xs={12} sm={6}>
              <div className={styles.statItem}>
                <div className={styles.statNumber}>
                  {auditSummary.stats.running}
                </div>
                <div className={styles.statLabel}>Running</div>
              </div>
            </Col>
            <Col xs={12} sm={6}>
              <div className={styles.statItem}>
                <div className={styles.statNumber}>
                  {auditSummary.stats.pending}
                </div>
                <div className={styles.statLabel}>Pending</div>
              </div>
            </Col>
            <Col xs={12} sm={6}>
              <div className={styles.statItem}>
                <div className={styles.statNumber}>
                  {auditSummary.stats.failed}
                </div>
                <div className={styles.statLabel}>Failed</div>
              </div>
            </Col>
          </Row>
        </Card>
      )}
      {/* Create New Audit Button */}
      {isCompleted && (
        <Card>
          <div style={{ textAlign: "center", padding: "20px" }}>
            <Button
              type="primary"
              size="large"
              icon={<PlayCircleOutlined />}
              onClick={handleCreateAudit}
              loading={isCreating}
            >
              Run New Audit
            </Button>
          </div>
        </Card>
      )}
      {/* Create Project Modal */}
      <Modal
        title="Create New Project"
        open={isCreateModalVisible}
        onCancel={handleCreateModalCancel}
        footer={null}
        width={600}
      >
        <Form
          form={createProjectForm}
          layout="vertical"
          onFinish={handleCreateProject}
        >
          <Form.Item
            name="name"
            label="Project Name"
            rules={[
              { required: true, message: "Please enter project name" },
              { min: 2, message: "Project name must be at least 2 characters" },
            ]}
          >
            <Input placeholder="Enter project name" />
          </Form.Item>

          <Form.Item
            name="domain"
            label="Domain"
            rules={[
              { required: true, message: "Please enter domain" },
              {
                pattern:
                  /^[a-zA-Z0-9][a-zA-Z0-9-]{1,61}[a-zA-Z0-9]\.[a-zA-Z]{2,}$/,
                message: "Please enter a valid domain (e.g., example.com)",
              },
            ]}
          >
            <Input placeholder="example.com" />
          </Form.Item>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item name="country" label="Country" initialValue="US">
                <Select placeholder="Select country">
                  <Option value="US">United States</Option>
                  <Option value="VN">Vietnam</Option>
                  <Option value="GB">United Kingdom</Option>
                  <Option value="CA">Canada</Option>
                  <Option value="AU">Australia</Option>
                  <Option value="DE">Germany</Option>
                  <Option value="FR">France</Option>
                  <Option value="JP">Japan</Option>
                  <Option value="KR">South Korea</Option>
                  <Option value="CN">China</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="language" label="Language" initialValue="en">
                <Select placeholder="Select language">
                  <Option value="en">English</Option>
                  <Option value="vi">Vietnamese</Option>
                  <Option value="es">Spanish</Option>
                  <Option value="fr">French</Option>
                  <Option value="de">German</Option>
                  <Option value="ja">Japanese</Option>
                  <Option value="ko">Korean</Option>
                  <Option value="zh">Chinese</Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>

          <Form.Item style={{ marginBottom: 0, textAlign: "right" }}>
            <Space>
              <Button onClick={handleCreateModalCancel}>Cancel</Button>
              <Button
                type="primary"
                htmlType="submit"
                loading={projectsLoading.createProject}
              >
                Create Project
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default OnPageAuditPage;
