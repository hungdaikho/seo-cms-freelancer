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
} from "@ant-design/icons";
import { useAppDispatch, useAppSelector } from "@/stores/hooks";
import { fetchProjects } from "@/stores/slices/project.slice";
import { Project } from "@/types/api.type";
import styles from "./site_audit_manager.module.scss";

const { Title, Text, Paragraph } = Typography;
const { Option } = Select;
const { TabPane } = Tabs;

// Mock data for site audit - will be replaced with real API
interface AuditIssue {
  id: string;
  type: "error" | "warning" | "notice";
  category: "technical" | "content" | "performance" | "mobile";
  title: string;
  description: string;
  affectedPages: number;
  priority: "high" | "medium" | "low";
  fix?: string;
}

interface AuditResult {
  id: string;
  projectId: string;
  status: "running" | "completed" | "failed";
  progress: number;
  startedAt: string;
  completedAt?: string;
  overview: {
    totalPages: number;
    totalIssues: number;
    errors: number;
    warnings: number;
    notices: number;
    overallScore: number;
  };
  issues: AuditIssue[];
  performance: {
    loadTime: number;
    pageSize: number;
    requests: number;
    mobileScore: number;
    desktopScore: number;
  };
}

const mockAuditResult: AuditResult = {
  id: "audit-1",
  projectId: "1",
  status: "completed",
  progress: 100,
  startedAt: new Date(Date.now() - 3600000).toISOString(),
  completedAt: new Date().toISOString(),
  overview: {
    totalPages: 1247,
    totalIssues: 89,
    errors: 12,
    warnings: 34,
    notices: 43,
    overallScore: 78,
  },
  issues: [
    {
      id: "1",
      type: "error",
      category: "technical",
      title: "Missing Meta Descriptions",
      description:
        "Pages without meta descriptions may have poor click-through rates from search results",
      affectedPages: 23,
      priority: "high",
      fix: "Add unique meta descriptions to all pages (150-160 characters)",
    },
    {
      id: "2",
      type: "warning",
      category: "content",
      title: "Duplicate Title Tags",
      description:
        "Multiple pages with identical title tags can confuse search engines",
      affectedPages: 8,
      priority: "medium",
      fix: "Create unique title tags for each page",
    },
    {
      id: "3",
      type: "error",
      category: "performance",
      title: "Large Image Files",
      description: "Unoptimized images slow down page loading times",
      affectedPages: 45,
      priority: "high",
      fix: "Compress images and use WebP format",
    },
  ],
  performance: {
    loadTime: 3.2,
    pageSize: 2.8,
    requests: 67,
    mobileScore: 72,
    desktopScore: 89,
  },
};

const SiteAuditManager: React.FC = () => {
  const dispatch = useAppDispatch();
  const { projects } = useAppSelector((state) => state.project);

  const [selectedProject, setSelectedProject] = useState<string>("");
  const [auditResult, setAuditResult] = useState<AuditResult | null>(null);
  const [isRunningAudit, setIsRunningAudit] = useState(false);
  const [activeTab, setActiveTab] = useState("overview");

  useEffect(() => {
    dispatch(fetchProjects());
  }, [dispatch]);

  useEffect(() => {
    if (projects.length > 0 && !selectedProject) {
      setSelectedProject(projects[0].id);
      // Load existing audit for first project
      setAuditResult(mockAuditResult);
    }
  }, [projects, selectedProject]);

  const startAudit = async () => {
    if (!selectedProject) {
      message.error("Please select a project first");
      return;
    }

    setIsRunningAudit(true);
    setAuditResult({
      ...mockAuditResult,
      status: "running",
      progress: 0,
      projectId: selectedProject,
    });

    // Simulate audit progress
    for (let i = 0; i <= 100; i += 10) {
      await new Promise((resolve) => setTimeout(resolve, 300));
      setAuditResult((prev) => (prev ? { ...prev, progress: i } : null));
    }

    setAuditResult((prev) =>
      prev
        ? {
            ...prev,
            status: "completed",
            completedAt: new Date().toISOString(),
          }
        : null
    );
    setIsRunningAudit(false);
    message.success("Site audit completed successfully!");
  };

  const getIssueIcon = (type: AuditIssue["type"]) => {
    switch (type) {
      case "error":
        return <BugOutlined style={{ color: "#ff4d4f" }} />;
      case "warning":
        return <ExclamationCircleOutlined style={{ color: "#faad14" }} />;
      case "notice":
        return <InfoCircleOutlined style={{ color: "#1890ff" }} />;
    }
  };

  const getIssueColor = (type: AuditIssue["type"]) => {
    switch (type) {
      case "error":
        return "red";
      case "warning":
        return "orange";
      case "notice":
        return "blue";
    }
  };

  const getCategoryIcon = (category: AuditIssue["category"]) => {
    switch (category) {
      case "technical":
        return <GlobalOutlined />;
      case "content":
        return <FileImageOutlined />;
      case "performance":
        return <ThunderboltOutlined />;
      case "mobile":
        return <MobileOutlined />;
    }
  };

  const issueColumns = [
    {
      title: "Issue",
      key: "issue",
      render: (_: any, record: AuditIssue) => (
        <div className={styles.issueCell}>
          <div className={styles.issueHeader}>
            <Space>
              {getIssueIcon(record.type)}
              <Text strong>{record.title}</Text>
              <Tag color={getIssueColor(record.type)}>{record.type}</Tag>
              <Tag icon={getCategoryIcon(record.category)}>
                {record.category}
              </Tag>
            </Space>
          </div>
          <Paragraph type="secondary" ellipsis={{ rows: 2 }}>
            {record.description}
          </Paragraph>
        </div>
      ),
    },
    {
      title: "Affected Pages",
      dataIndex: "affectedPages",
      key: "affectedPages",
      width: 120,
      render: (count: number) => (
        <Badge count={count} overflowCount={999} color="blue" />
      ),
    },
    {
      title: "Priority",
      dataIndex: "priority",
      key: "priority",
      width: 100,
      render: (priority: string) => (
        <Tag
          color={
            priority === "high"
              ? "red"
              : priority === "medium"
              ? "orange"
              : "green"
          }
        >
          {priority.toUpperCase()}
        </Tag>
      ),
    },
    {
      title: "Actions",
      key: "actions",
      width: 150,
      render: (_: any, record: AuditIssue) => (
        <Space>
          <Tooltip title={record.fix}>
            <Button size="small" type="primary">
              View Fix
            </Button>
          </Tooltip>
          <Button size="small">Details</Button>
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
              Please select a project to run site audit
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
          <Title level={2}>Site Audit</Title>
          <Text type="secondary">
            Comprehensive SEO audit to identify and fix website issues
          </Text>
        </div>
        <div className={styles.headerActions}>
          <Select
            placeholder="Select a project"
            style={{ width: 250, marginRight: 16 }}
            value={selectedProject}
            onChange={setSelectedProject}
          >
            {projects.map((project: Project) => (
              <Option key={project.id} value={project.id}>
                {project.name} ({project.domain})
              </Option>
            ))}
          </Select>
          <Button
            type="primary"
            icon={<SearchOutlined />}
            onClick={startAudit}
            loading={isRunningAudit}
            disabled={!selectedProject}
          >
            {isRunningAudit ? "Running Audit..." : "Start Audit"}
          </Button>
        </div>
      </div>

      {auditResult && (
        <>
          {/* Audit Progress */}
          {auditResult.status === "running" && (
            <Card className={styles.progressCard}>
              <div className={styles.progressContent}>
                <Title level={4}>Auditing Website...</Title>
                <Progress
                  percent={auditResult.progress}
                  status="active"
                  strokeColor={{
                    "0%": "#108ee9",
                    "100%": "#87d068",
                  }}
                />
                <Text type="secondary">
                  Analyzing pages, checking for issues, and gathering
                  performance data
                </Text>
              </div>
            </Card>
          )}

          {/* Audit Results */}
          {auditResult.status === "completed" && (
            <Tabs
              activeKey={activeTab}
              onChange={setActiveTab}
              className={styles.auditTabs}
            >
              <TabPane tab="Overview" key="overview">
                {/* Score Card */}
                <Card className={styles.scoreCard}>
                  <Row gutter={24} align="middle">
                    <Col span={8}>
                      <div className={styles.overallScore}>
                        <Progress
                          type="circle"
                          percent={auditResult.overview.overallScore}
                          strokeColor={
                            auditResult.overview.overallScore >= 80
                              ? "#52c41a"
                              : auditResult.overview.overallScore >= 60
                              ? "#faad14"
                              : "#ff4d4f"
                          }
                          size={120}
                        />
                        <Title level={4} style={{ marginTop: 16 }}>
                          Overall Score
                        </Title>
                      </div>
                    </Col>
                    <Col span={16}>
                      <Row gutter={16}>
                        <Col span={6}>
                          <Statistic
                            title="Total Pages"
                            value={auditResult.overview.totalPages}
                            prefix={<GlobalOutlined />}
                          />
                        </Col>
                        <Col span={6}>
                          <Statistic
                            title="Errors"
                            value={auditResult.overview.errors}
                            valueStyle={{ color: "#ff4d4f" }}
                            prefix={<BugOutlined />}
                          />
                        </Col>
                        <Col span={6}>
                          <Statistic
                            title="Warnings"
                            value={auditResult.overview.warnings}
                            valueStyle={{ color: "#faad14" }}
                            prefix={<ExclamationCircleOutlined />}
                          />
                        </Col>
                        <Col span={6}>
                          <Statistic
                            title="Notices"
                            value={auditResult.overview.notices}
                            valueStyle={{ color: "#1890ff" }}
                            prefix={<InfoCircleOutlined />}
                          />
                        </Col>
                      </Row>
                    </Col>
                  </Row>
                </Card>

                {/* Performance Metrics */}
                <Card
                  title="Performance Metrics"
                  className={styles.performanceCard}
                >
                  <Row gutter={16}>
                    <Col span={6}>
                      <Statistic
                        title="Load Time"
                        value={auditResult.performance.loadTime}
                        suffix="s"
                        precision={1}
                        valueStyle={{
                          color:
                            auditResult.performance.loadTime <= 3
                              ? "#52c41a"
                              : "#faad14",
                        }}
                      />
                    </Col>
                    <Col span={6}>
                      <Statistic
                        title="Page Size"
                        value={auditResult.performance.pageSize}
                        suffix="MB"
                        precision={1}
                        valueStyle={{
                          color:
                            auditResult.performance.pageSize <= 3
                              ? "#52c41a"
                              : "#faad14",
                        }}
                      />
                    </Col>
                    <Col span={6}>
                      <Statistic
                        title="Mobile Score"
                        value={auditResult.performance.mobileScore}
                        suffix="/100"
                        valueStyle={{
                          color:
                            auditResult.performance.mobileScore >= 80
                              ? "#52c41a"
                              : "#faad14",
                        }}
                      />
                    </Col>
                    <Col span={6}>
                      <Statistic
                        title="Desktop Score"
                        value={auditResult.performance.desktopScore}
                        suffix="/100"
                        valueStyle={{
                          color:
                            auditResult.performance.desktopScore >= 80
                              ? "#52c41a"
                              : "#faad14",
                        }}
                      />
                    </Col>
                  </Row>
                </Card>
              </TabPane>

              <TabPane
                tab={`Issues (${auditResult.overview.totalIssues})`}
                key="issues"
              >
                <Card>
                  <Table
                    columns={issueColumns}
                    dataSource={auditResult.issues}
                    rowKey="id"
                    pagination={{
                      pageSize: 10,
                      showTotal: (total) => `Total ${total} issues`,
                    }}
                  />
                </Card>
              </TabPane>

              <TabPane tab="Recommendations" key="recommendations">
                <Card title="Priority Actions">
                  <List
                    dataSource={auditResult.issues.filter(
                      (issue) => issue.priority === "high"
                    )}
                    renderItem={(issue) => (
                      <List.Item
                        actions={[
                          <Button type="primary" size="small">
                            Apply Fix
                          </Button>,
                        ]}
                      >
                        <List.Item.Meta
                          avatar={getIssueIcon(issue.type)}
                          title={issue.title}
                          description={issue.fix}
                        />
                        <Tag color="red">HIGH PRIORITY</Tag>
                      </List.Item>
                    )}
                  />
                </Card>
              </TabPane>

              <TabPane tab="Export" key="export">
                <Card title="Export Audit Report">
                  <Space
                    direction="vertical"
                    size="large"
                    style={{ width: "100%" }}
                  >
                    <Alert
                      message="Audit Report Ready"
                      description="Your comprehensive site audit report is ready for export"
                      type="success"
                      showIcon
                    />
                    <Row gutter={16}>
                      <Col span={8}>
                        <Button
                          type="primary"
                          icon={<DownloadOutlined />}
                          block
                          size="large"
                        >
                          Download PDF Report
                        </Button>
                      </Col>
                      <Col span={8}>
                        <Button icon={<DownloadOutlined />} block size="large">
                          Export CSV Data
                        </Button>
                      </Col>
                      <Col span={8}>
                        <Button icon={<DownloadOutlined />} block size="large">
                          Share Report Link
                        </Button>
                      </Col>
                    </Row>
                  </Space>
                </Card>
              </TabPane>
            </Tabs>
          )}
        </>
      )}
    </div>
  );
};

export default SiteAuditManager;
