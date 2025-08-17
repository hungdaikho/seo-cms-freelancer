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
  console.log(currentProject);

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

      {/* Audit Scores */}
      {(auditResults?.results || currentAudit?.results) && (
        <Row gutter={[16, 16]} className={styles.auditScores}>
          {/* Technical SEO Score */}
          {auditResults?.results?.technical && (
            <Col xs={12} sm={8} md={6} lg={4}>
              <Card className={styles.auditCard}>
                <div className={styles.auditTitle}>Technical SEO</div>
                <div className={styles.auditScore}>
                  <ResponsiveContainer width={60} height={60}>
                    <PieChart>
                      <Pie
                        data={[
                          { value: auditResults.results.technical.score },
                          { value: 100 - auditResults.results.technical.score },
                        ]}
                        cx="50%"
                        cy="50%"
                        innerRadius={20}
                        outerRadius={30}
                        startAngle={90}
                        endAngle={450}
                        dataKey="value"
                      >
                        <Cell fill="#1890ff" />
                        <Cell fill="#f0f0f0" />
                      </Pie>
                    </PieChart>
                  </ResponsiveContainer>
                  <div className={styles.scoreText}>
                    {auditResults.results.technical.score}
                  </div>
                </div>
              </Card>
            </Col>
          )}

          {/* Performance Score */}
          {auditResults?.results?.performance && (
            <Col xs={12} sm={8} md={6} lg={4}>
              <Card className={styles.auditCard}>
                <div className={styles.auditTitle}>Performance</div>
                <div className={styles.auditScore}>
                  <ResponsiveContainer width={60} height={60}>
                    <PieChart>
                      <Pie
                        data={[
                          { value: auditResults.results.performance.score },
                          {
                            value: 100 - auditResults.results.performance.score,
                          },
                        ]}
                        cx="50%"
                        cy="50%"
                        innerRadius={20}
                        outerRadius={30}
                        startAngle={90}
                        endAngle={450}
                        dataKey="value"
                      >
                        <Cell fill="#52c41a" />
                        <Cell fill="#f0f0f0" />
                      </Pie>
                    </PieChart>
                  </ResponsiveContainer>
                  <div className={styles.scoreText}>
                    {auditResults.results.performance.score}
                  </div>
                </div>
              </Card>
            </Col>
          )}

          {/* Content Score */}
          {auditResults?.results?.content && (
            <Col xs={12} sm={8} md={6} lg={4}>
              <Card className={styles.auditCard}>
                <div className={styles.auditTitle}>Content</div>
                <div className={styles.auditScore}>
                  <ResponsiveContainer width={60} height={60}>
                    <PieChart>
                      <Pie
                        data={[
                          { value: auditResults.results.content.score },
                          { value: 100 - auditResults.results.content.score },
                        ]}
                        cx="50%"
                        cy="50%"
                        innerRadius={20}
                        outerRadius={30}
                        startAngle={90}
                        endAngle={450}
                        dataKey="value"
                      >
                        <Cell fill="#faad14" />
                        <Cell fill="#f0f0f0" />
                      </Pie>
                    </PieChart>
                  </ResponsiveContainer>
                  <div className={styles.scoreText}>
                    {auditResults.results.content.score}
                  </div>
                </div>
              </Card>
            </Col>
          )}

          {/* Accessibility Score */}
          {auditResults?.results?.accessibility && (
            <Col xs={12} sm={8} md={6} lg={4}>
              <Card className={styles.auditCard}>
                <div className={styles.auditTitle}>Accessibility</div>
                <div className={styles.auditScore}>
                  <ResponsiveContainer width={60} height={60}>
                    <PieChart>
                      <Pie
                        data={[
                          { value: auditResults.results.accessibility.score },
                          {
                            value:
                              100 - auditResults.results.accessibility.score,
                          },
                        ]}
                        cx="50%"
                        cy="50%"
                        innerRadius={20}
                        outerRadius={30}
                        startAngle={90}
                        endAngle={450}
                        dataKey="value"
                      >
                        <Cell fill="#722ed1" />
                        <Cell fill="#f0f0f0" />
                      </Pie>
                    </PieChart>
                  </ResponsiveContainer>
                  <div className={styles.scoreText}>
                    {auditResults.results.accessibility.score}
                  </div>
                </div>
              </Card>
            </Col>
          )}
        </Row>
      )}

      {/* SEO Issues */}
      {auditResults?.results?.technical?.issues && (
        <Card className={styles.sectionCard} title="Technical SEO Issues">
          <List
            dataSource={auditResults.results.technical.issues}
            renderItem={(issue) => (
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
                        {issue.type.replace(/_/g, " ").toUpperCase()}
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
                      {issue.pages && (
                        <div>
                          <Text type="secondary">Affected pages:</Text>
                          <ul>
                            {issue.pages.slice(0, 3).map((page, index) => (
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
      {auditResults?.results?.content?.issues && (
        <Card className={styles.sectionCard} title="Content Issues">
          <List
            dataSource={auditResults.results.content.issues}
            renderItem={(issue) => (
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
                        {issue.type.replace(/_/g, " ").toUpperCase()}
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
      {auditResults?.results?.accessibility?.issues && (
        <Card className={styles.sectionCard} title="Accessibility Issues">
          <List
            dataSource={auditResults.results.accessibility.issues}
            renderItem={(issue) => (
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
                        {issue.type.replace(/_/g, " ").toUpperCase()}
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
