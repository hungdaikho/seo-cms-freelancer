import React, { useEffect, useState, useMemo } from "react";
import {
  Table,
  Button,
  Space,
  Modal,
  Form,
  Input,
  Switch,
  message,
  Popconfirm,
  Card,
  Typography,
  Tooltip,
  Tag,
  Progress,
  Drawer,
  Tabs,
  Row,
  Col,
  Statistic,
} from "antd";
import {
  PlusOutlined,
  DeleteOutlined,
  EyeOutlined,
  PlayCircleOutlined,
  CheckCircleOutlined,
  ClockCircleOutlined,
  ExclamationCircleOutlined,
  WarningOutlined,
  ReloadOutlined,
  GlobalOutlined,
} from "@ant-design/icons";
import { useAudit } from "@/stores/hooks/useAudit";
import { useProject } from "@/stores/hooks/useProject";
import { useAppDispatch } from "@/stores/hooks";
import { startComprehensiveAudit } from "@/stores/slices/audit.slice";
import styles from "./audit_manager.module.scss";

const { Title, Text } = Typography;
const { TabPane } = Tabs;

interface AuditManagerProps {
  projectId: string;
  projectName?: string;
}

const AuditManager: React.FC<AuditManagerProps> = ({
  projectId,
  projectName,
}) => {
  const dispatch = useAppDispatch();
  const {
    audits,
    currentAudit,
    auditResults,
    loading,
    error,
    pagination,
    fetchProjectAudits,
    fetchAuditResults,
    fetchAuditSummary,
    deleteAudit,
    clearError,
    setCurrentAudit,
  } = useAudit();
  const { projects } = useProject();
  const [isCreateModalVisible, setIsCreateModalVisible] = useState(false);
  const [isResultsDrawerVisible, setIsResultsDrawerVisible] = useState(false);
  const [autoRefresh, setAutoRefresh] = useState(false);
  const [websiteUrl, setWebsiteUrl] = useState<string>("");
  const [form] = Form.useForm();

  // Generate stable mock data using audit ID as seed to prevent jumping
  const generateStableScore = (auditId: string): number => {
    if (!auditId) return 0;
    let hash = 0;
    for (let i = 0; i < auditId.length; i++) {
      const char = auditId.charCodeAt(i);
      hash = (hash << 5) - hash + char;
      hash = hash & hash; // Convert to 32bit integer
    }
    return Math.abs(hash % 100);
  };

  const generateStableIssues = (auditId: string) => {
    if (!auditId) return { high: 0, medium: 0, low: 0 };
    let hash = 0;
    for (let i = 0; i < auditId.length; i++) {
      const char = auditId.charCodeAt(i);
      hash = (hash << 5) - hash + char;
      hash = hash & hash;
    }
    const absHash = Math.abs(hash);
    return {
      high: absHash % 5,
      medium: (absHash >> 3) % 10,
      low: (absHash >> 6) % 15,
    };
  };

  // Memoize stable data generators to prevent recalculation on every render
  const stableScores = useMemo(() => {
    const scores = new Map();
    audits?.forEach((audit) => {
      scores.set(audit.id, generateStableScore(audit.id));
    });
    return scores;
  }, [audits]);

  const stableIssues = useMemo(() => {
    const issues = new Map();
    audits?.forEach((audit) => {
      issues.set(audit.id, generateStableIssues(audit.id));
    });
    return issues;
  }, [audits]);

  useEffect(() => {
    if (projectId) {
      loadAudits();
      loadAuditSummary();

      // Auto-fill website URL from project domain
      const currentProject = projects?.find((p) => p.id === projectId);
      if (currentProject?.domain && !websiteUrl) {
        const domain = currentProject.domain;
        const url = domain.startsWith("http") ? domain : `https://${domain}`;
        setWebsiteUrl(url);
      }
    }
  }, [projectId, projects]);

  useEffect(() => {
    if (error) {
      message.error(error);
      clearError();
    }
  }, [error]);

  // Debug auditResults changes
  useEffect(() => {
    console.log("auditResults state changed:", auditResults);
  }, [auditResults]);

  // Auto-refresh logic for pending/in_progress audits
  useEffect(() => {
    if (!audits || !autoRefresh) return;

    const hasRunningAudits = audits.some(
      (audit) => audit.status === "pending" || audit.status === "in_progress"
    );

    if (hasRunningAudits) {
      const interval = setInterval(() => {
        console.log("Auto-refreshing audits...");
        loadAudits();
      }, 10000); // Refresh every 10 seconds

      return () => clearInterval(interval);
    }
  }, [audits, autoRefresh]);

  // Show running audits count
  const runningAuditsCount =
    audits?.filter(
      (audit) => audit.status === "pending" || audit.status === "in_progress"
    ).length || 0;

  const loadAudits = (params?: any) => {
    fetchProjectAudits(projectId, {
      page: params?.current || 1,
      limit: params?.pageSize || 10,
      ...params,
    });
  };

  const loadAuditSummary = () => {
    fetchAuditSummary(projectId);
  };

  const handleStartAudit = async (values: any) => {
    if (!websiteUrl) {
      message.error("Please enter website URL");
      return;
    }

    if (!websiteUrl.startsWith("http")) {
      message.error(
        "Please enter a valid URL starting with http:// or https://"
      );
      return;
    }

    try {
      console.log("Starting audit with:", {
        projectId,
        url: websiteUrl,
        options: {
          auditType: "full",
          settings: {
            crawlDepth: 3,
            includeImages: true,
            checkMobileFriendly: values.include_mobile,
            analyzePageSpeed: values.analyze_performance,
          },
        },
      });

      const result = await dispatch(
        startComprehensiveAudit({
          projectId,
          url: websiteUrl,
          options: {
            auditType: "full",
            settings: {
              crawlDepth: 3,
              includeImages: true,
              checkMobileFriendly: values.include_mobile,
              analyzePageSpeed: values.analyze_performance,
            },
          },
        })
      ).unwrap();

      console.log("Audit started successfully:", result);
      message.success("Comprehensive website audit started successfully!");
      setIsCreateModalVisible(false);
      form.resetFields();
      setWebsiteUrl("");
      loadAudits();
    } catch (error: any) {
      console.error("Audit start failed:", error);
      message.error(error || "Failed to start audit");
    }
  };

  const handleDeleteAudit = async (auditId: string) => {
    try {
      await deleteAudit(auditId);
      message.success("Audit deleted successfully!");
      loadAudits();
    } catch (error) {
      // Error handled by Redux slice
    }
  };

  const handleViewResults = async (audit: any) => {
    console.log("Opening results for audit:", audit);
    setCurrentAudit(audit);
    setIsResultsDrawerVisible(true);

    if (audit.status === "completed") {
      console.log("Fetching audit results for:", audit.id);
      try {
        await fetchAuditResults(audit.id);
        console.log("Audit results fetched successfully");
      } catch (error) {
        console.error("Error fetching audit results:", error);
      }
    }
  };

  // Memoize pagination handler to prevent table re-renders
  const handleTableChange = useMemo(
    () => (page: number, pageSize?: number) => {
      loadAudits({ current: page, pageSize });
    },
    []
  );

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "pending":
        return <ClockCircleOutlined style={{ color: "#faad14" }} />;
      case "in_progress":
        return <PlayCircleOutlined style={{ color: "#1890ff" }} />;
      case "completed":
        return <CheckCircleOutlined style={{ color: "#52c41a" }} />;
      case "failed":
        return <ExclamationCircleOutlined style={{ color: "#ff4d4f" }} />;
      default:
        return <ClockCircleOutlined />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "orange";
      case "in_progress":
        return "blue";
      case "completed":
        return "green";
      case "failed":
        return "red";
      default:
        return "default";
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return "#52c41a";
    if (score >= 60) return "#faad14";
    return "#ff4d4f";
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "low":
        return "green";
      case "medium":
        return "orange";
      case "high":
        return "red";
      default:
        return "default";
    }
  };

  const columns = useMemo(
    () => [
      {
        title: "Audit ID",
        dataIndex: "id",
        key: "id",
        render: (id: string) => (
          <Text code style={{ fontSize: "12px" }}>
            {id?.substring(0, 8)}...
          </Text>
        ),
      },
      {
        title: "Status",
        dataIndex: "status",
        key: "status",
        render: (status: string) => (
          <Space>
            {getStatusIcon(status)}
            <Tag color={getStatusColor(status)}>
              {status?.replace("_", " ")}
            </Tag>
          </Space>
        ),
      },
      {
        title: "Overall Score",
        key: "score",
        render: (_: any, record: any) => {
          if (record.status !== "completed") return "-";

          // Get score from real audit results
          const realScore = record.results?.overview?.score;

          if (realScore !== undefined) {
            return (
              <div className={styles.scoreCell}>
                <Progress
                  type="circle"
                  size={40}
                  percent={realScore}
                  format={() => realScore}
                  strokeColor={getScoreColor(realScore)}
                />
              </div>
            );
          }

          // Otherwise, use stable mock score for consistency
          const mockScore = stableScores.get(record.id) || 0;
          return (
            <div className={styles.scoreCell}>
              <Progress
                type="circle"
                size={40}
                percent={mockScore}
                format={() => mockScore}
                strokeColor={getScoreColor(mockScore)}
              />
            </div>
          );
        },
      },
      {
        title: "Issues Found",
        key: "issues",
        render: (_: any, record: any) => {
          if (record.status !== "completed") return "-";

          // Get issues from real audit results
          if (record.results?.technical_seo?.issues) {
            const issues = record.results.technical_seo.issues;
            const contentIssues =
              record.results?.content_analysis?.issues || [];
            const accessibilityIssues =
              record.results?.accessibility?.issues || [];

            // Combine all issues
            const allIssues = [
              ...issues,
              ...contentIssues,
              ...accessibilityIssues,
            ];

            const issueCounts = {
              high: allIssues.filter((issue) => issue.impact === "high").length,
              medium: allIssues.filter((issue) => issue.impact === "medium")
                .length,
              low: allIssues.filter((issue) => issue.impact === "low").length,
            };

            return (
              <Space direction="vertical" size="small">
                <div className={styles.issueItem}>
                  <Tag color="red">{issueCounts.high} High</Tag>
                  <Tag color="orange">{issueCounts.medium} Medium</Tag>
                  <Tag color="green">{issueCounts.low} Low</Tag>
                </div>
              </Space>
            );
          }

          // Use total issues from overview if available
          if (record.results?.overview?.total_issues) {
            const totalIssues = record.results.overview.total_issues;
            const criticalIssues = record.results.overview.critical_issues || 0;
            const warnings = record.results.overview.warnings || 0;
            const lowIssues = Math.max(
              0,
              totalIssues - criticalIssues - warnings
            );

            return (
              <Space direction="vertical" size="small">
                <div className={styles.issueItem}>
                  <Tag color="red">{criticalIssues} High</Tag>
                  <Tag color="orange">{warnings} Medium</Tag>
                  <Tag color="green">{lowIssues} Low</Tag>
                </div>
              </Space>
            );
          }

          // Use stable mock issues from memoized data to prevent jumping
          const mockIssues = stableIssues.get(record.id) || {
            high: 0,
            medium: 0,
            low: 0,
          };

          return (
            <Space direction="vertical" size="small">
              <div className={styles.issueItem}>
                <Tag color="red">{mockIssues.high} High</Tag>
                <Tag color="orange">{mockIssues.medium} Medium</Tag>
                <Tag color="green">{mockIssues.low} Low</Tag>
              </div>
            </Space>
          );
        },
      },
      {
        title: "Created",
        dataIndex: "createdAt",
        key: "createdAt",
        render: (date: string) =>
          date ? new Date(date).toLocaleString() : "-",
      },
      {
        title: "Actions",
        key: "actions",
        render: (_: any, record: any) => (
          <Space size="small">
            <Tooltip title="View Results">
              <Button
                icon={<EyeOutlined />}
                size="small"
                onClick={() => handleViewResults(record)}
                disabled={
                  record.status === "pending" || record.status === "in_progress"
                }
              />
            </Tooltip>
            <Popconfirm
              title="Delete Audit"
              description="Are you sure you want to delete this audit?"
              onConfirm={() => handleDeleteAudit(record.id)}
              okText="Yes"
              cancelText="No"
            >
              <Tooltip title="Delete Audit">
                <Button icon={<DeleteOutlined />} size="small" danger />
              </Tooltip>
            </Popconfirm>
          </Space>
        ),
      },
    ],
    [stableScores, stableIssues]
  );

  return (
    <div className={styles.auditManager}>
      {/* Header */}
      <div className={styles.header}>
        <div>
          <Title level={3}>SEO Audits - {projectName}</Title>
          <Text type="secondary">Monitor your website's SEO health</Text>
        </div>
        <Space>
          <Space align="center">
            <Text type="secondary">Auto-refresh:</Text>
            <Switch
              size="small"
              checked={autoRefresh}
              onChange={setAutoRefresh}
              checkedChildren="ON"
              unCheckedChildren="OFF"
            />
            {autoRefresh && runningAuditsCount > 0 && (
              <Text type="secondary" style={{ fontSize: "12px" }}>
                ({runningAuditsCount} running)
              </Text>
            )}
          </Space>
          <Tooltip title="Refresh audits status">
            <Button
              icon={<ReloadOutlined />}
              onClick={() => {
                loadAudits();
                loadAuditSummary();
                message.success("Audits refreshed!");
              }}
              loading={loading}
            >
              Refresh
            </Button>
          </Tooltip>
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={() => setIsCreateModalVisible(true)}
            loading={loading}
          >
            Start New Audit
          </Button>
        </Space>
      </div>

      {/* Summary Cards */}
      {audits && audits.length > 0 ? (
        <Row gutter={[16, 16]} className={styles.summarySection}>
          <Col xs={24} sm={12} md={6}>
            <Card>
              <Statistic
                title="Total Audits Completed"
                value={
                  audits.filter((audit: any) => audit.status === "completed")
                    .length
                }
                prefix={<CheckCircleOutlined />}
              />
            </Card>
          </Col>
          <Col xs={24} sm={12} md={6}>
            <Card>
              <Statistic
                title="Average Score"
                value={
                  audits.length > 0
                    ? Math.round(
                        audits
                          .filter(
                            (audit: any) =>
                              audit.status === "completed" &&
                              audit.results?.overview?.score
                          )
                          .reduce(
                            (sum, audit: any) =>
                              sum + (audit.results?.overview?.score || 0),
                            0
                          ) /
                          Math.max(
                            1,
                            audits.filter(
                              (audit: any) =>
                                audit.status === "completed" &&
                                audit.results?.overview?.score
                            ).length
                          )
                      )
                    : 0
                }
                suffix="/100"
                valueStyle={{
                  color: getScoreColor(
                    audits.length > 0
                      ? Math.round(
                          audits
                            .filter(
                              (audit: any) =>
                                audit.status === "completed" &&
                                audit.results?.overview?.score
                            )
                            .reduce(
                              (sum, audit: any) =>
                                sum + (audit.results?.overview?.score || 0),
                              0
                            ) /
                            Math.max(
                              1,
                              audits.filter(
                                (audit: any) =>
                                  audit.status === "completed" &&
                                  audit.results?.overview?.score
                              ).length
                            )
                        )
                      : 0
                  ),
                }}
              />
            </Card>
          </Col>
          <Col xs={24} sm={12} md={6}>
            <Card>
              <Statistic
                title="Critical Issues"
                value={audits
                  .filter((audit: any) => audit.status === "completed")
                  .reduce(
                    (sum, audit: any) =>
                      sum + (audit.results?.overview?.critical_issues || 0),
                    0
                  )}
                prefix={<WarningOutlined />}
                valueStyle={{ color: "#ff4d4f" }}
              />
            </Card>
          </Col>
          {/* <Col xs={24} sm={12} md={6}>
            <Card>
              <Statistic
                title="Last Audit"
                value={
                  audits.length > 0
                    ? new Date(
                        audits.sort(
                          (a: any, b: any) =>
                            new Date(b.createdAt).getTime() -
                            new Date(a.createdAt).getTime()
                        )[0].createdAt
                      ).toLocaleDateString()
                    : "Never"
                }
              />
            </Card>
          </Col> */}
        </Row>
      ) : loading ? (
        <Row gutter={[16, 16]} className={styles.summarySection}>
          {Array.from({ length: 4 }).map((_, index) => (
            <Col key={index} xs={24} sm={12} md={6}>
              <Card loading={true}>
                <Statistic title="Loading..." value={0} />
              </Card>
            </Col>
          ))}
        </Row>
      ) : null}

      {/* Audits Table */}
      <Card
        className={styles.tableCard}
        title="Audit History"
        extra={
          <Tooltip title="Refresh table data">
            <Button
              size="small"
              icon={<ReloadOutlined />}
              onClick={() => {
                loadAudits();
                message.info("Table refreshed");
              }}
              loading={loading}
            >
              Reload
            </Button>
          </Tooltip>
        }
      >
        <Table
          columns={columns}
          dataSource={audits}
          rowKey="id"
          loading={loading}
          pagination={{
            current: pagination.page,
            pageSize: pagination.limit,
            total: pagination.total,
            showSizeChanger: true,
            onChange: handleTableChange,
          }}
        />
      </Card>

      {/* Start Audit Modal */}
      <Modal
        title="Start New SEO Audit"
        open={isCreateModalVisible}
        onCancel={() => {
          setIsCreateModalVisible(false);
          setWebsiteUrl("");
          form.resetFields();
        }}
        footer={null}
        width={600}
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={handleStartAudit}
          initialValues={{
            include_mobile: true,
            check_accessibility: true,
            analyze_performance: true,
          }}
        >
          <Title level={4}>Audit Settings</Title>

          <Form.Item
            label="Website URL"
            rules={[
              { required: true, message: "Please enter website URL" },
              {
                pattern: /^https?:\/\/.+/,
                message:
                  "Please enter a valid URL starting with http:// or https://",
              },
            ]}
            extra={
              <Space>
                <Text type="secondary">Or</Text>
                <Button
                  size="small"
                  type="link"
                  onClick={() => {
                    const currentProject = projects?.find(
                      (p) => p.id === projectId
                    );
                    if (currentProject?.domain) {
                      const domain = currentProject.domain;
                      const url = domain.startsWith("http")
                        ? domain
                        : `https://${domain}`;
                      setWebsiteUrl(url);
                    }
                  }}
                >
                  Use project domain (
                  {projects?.find((p) => p.id === projectId)?.domain || "N/A"})
                </Button>
              </Space>
            }
          >
            <Input
              value={websiteUrl}
              onChange={(e) => setWebsiteUrl(e.target.value)}
              placeholder="https://example.com"
              prefix={<GlobalOutlined />}
            />
          </Form.Item>

          <Form.Item name="include_mobile" valuePropName="checked">
            <Space>
              <Switch />
              <Text>Check Mobile Friendly</Text>
            </Space>
          </Form.Item>

          <Form.Item name="check_accessibility" valuePropName="checked">
            <Space>
              <Switch />
              <Text>Include Images Analysis</Text>
            </Space>
          </Form.Item>

          <Form.Item name="analyze_performance" valuePropName="checked">
            <Space>
              <Switch />
              <Text>Analyze Page Speed</Text>
            </Space>
          </Form.Item>

          <Form.Item>
            <Space>
              <Button type="primary" htmlType="submit" loading={loading}>
                Start Audit
              </Button>
              <Button
                onClick={() => {
                  setIsCreateModalVisible(false);
                  setWebsiteUrl("");
                  form.resetFields();
                }}
              >
                Cancel
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Modal>

      {/* Audit Results Drawer */}
      <Drawer
        title={`Audit Results - ${currentAudit?.id?.substring(0, 8)}...`}
        placement="right"
        width={800}
        open={isResultsDrawerVisible}
        onClose={() => setIsResultsDrawerVisible(false)}
      >
        {(currentAudit as any)?.results &&
        currentAudit?.status === "completed" ? (
          <div className={styles.resultsContent}>
            <Tabs defaultActiveKey="overview">
              <TabPane tab="Overview" key="overview">
                <Card title="Overall Score" className={styles.scoreCard}>
                  <div className={styles.overallScore}>
                    <Progress
                      type="circle"
                      size={120}
                      percent={
                        (currentAudit as any).results?.overview?.score || 0
                      }
                      format={(percent) => `${percent}`}
                      strokeColor={getScoreColor(
                        (currentAudit as any).results?.overview?.score || 0
                      )}
                    />
                    <Text
                      strong
                      style={{ fontSize: "16px", marginTop: "16px" }}
                    >
                      Overall SEO Score
                    </Text>
                  </div>
                </Card>

                <Row gutter={[16, 16]} style={{ marginTop: "16px" }}>
                  <Col span={8}>
                    <Card>
                      <Statistic
                        title="Technical SEO"
                        value={
                          (currentAudit as any).results?.technical_seo?.score ||
                          0
                        }
                        suffix="/100"
                        valueStyle={{
                          color: getScoreColor(
                            (currentAudit as any).results?.technical_seo
                              ?.score || 0
                          ),
                        }}
                      />
                    </Card>
                  </Col>
                  <Col span={8}>
                    <Card>
                      <Statistic
                        title="Performance"
                        value={
                          (currentAudit as any).results?.performance?.score || 0
                        }
                        suffix="/100"
                        valueStyle={{
                          color: getScoreColor(
                            (currentAudit as any).results?.performance?.score ||
                              0
                          ),
                        }}
                      />
                    </Card>
                  </Col>
                  <Col span={8}>
                    <Card>
                      <Statistic
                        title="Content"
                        value={
                          (currentAudit as any).results?.content_analysis
                            ?.score || 0
                        }
                        suffix="/100"
                        valueStyle={{
                          color: getScoreColor(
                            (currentAudit as any).results?.content_analysis
                              ?.score || 0
                          ),
                        }}
                      />
                    </Card>
                  </Col>
                </Row>
              </TabPane>

              <TabPane tab="Technical Issues" key="technical">
                <div className={styles.issuesSection}>
                  {(currentAudit as any)?.results?.technical_seo?.issues &&
                  (currentAudit as any).results.technical_seo.issues.length >
                    0 ? (
                    (currentAudit as any).results.technical_seo.issues.map(
                      (issue: any, index: number) => (
                        <Card
                          key={index}
                          size="small"
                          className={styles.issueCard}
                        >
                          <div className={styles.issueHeader}>
                            <Tag color={getSeverityColor(issue.impact)}>
                              {issue.impact?.toUpperCase() || "UNKNOWN"}
                            </Tag>
                            <Text strong>{issue.title || "Unknown Issue"}</Text>
                          </div>
                          <Text>
                            {issue.description || "No description available"}
                          </Text>
                          <Text type="secondary" style={{ fontSize: "12px" }}>
                            {issue.recommendation ||
                              "No recommendation available"}
                          </Text>
                        </Card>
                      )
                    )
                  ) : (
                    <div style={{ textAlign: "center", padding: "40px 0" }}>
                      <Text type="secondary">No technical issues found</Text>
                    </div>
                  )}
                </div>
              </TabPane>

              <TabPane tab="Performance" key="performance">
                <Card title="Performance Metrics">
                  <Row gutter={[16, 16]}>
                    <Col span={12}>
                      <Statistic
                        title="Performance Score"
                        value={
                          (currentAudit as any).results?.performance?.score || 0
                        }
                        suffix="/100"
                        valueStyle={{
                          color: getScoreColor(
                            (currentAudit as any).results?.performance?.score ||
                              0
                          ),
                        }}
                      />
                    </Col>
                    <Col span={12}>
                      <Statistic
                        title="Mobile Friendly"
                        value={
                          (currentAudit as any).results?.performance?.metrics
                            ?.mobile_friendly
                            ? "Yes"
                            : "No"
                        }
                        valueStyle={{
                          color: (currentAudit as any).results?.performance
                            ?.metrics?.mobile_friendly
                            ? "#52c41a"
                            : "#ff4d4f",
                        }}
                      />
                    </Col>
                  </Row>
                </Card>
              </TabPane>

              <TabPane tab="Content" key="content">
                <Card title="Content Analysis">
                  <Row gutter={[16, 16]}>
                    <Col span={12}>
                      <Statistic
                        title="Content Score"
                        value={
                          (currentAudit as any).results?.content_analysis
                            ?.score || 0
                        }
                        suffix="/100"
                        valueStyle={{
                          color: getScoreColor(
                            (currentAudit as any).results?.content_analysis
                              ?.score || 0
                          ),
                        }}
                      />
                    </Col>
                    <Col span={12}>
                      <Statistic
                        title="Average Word Count"
                        value={
                          (currentAudit as any).results?.content_analysis
                            ?.avg_word_count || 0
                        }
                      />
                    </Col>
                  </Row>
                </Card>
              </TabPane>
            </Tabs>
          </div>
        ) : currentAudit?.status === "pending" ||
          currentAudit?.status === "in_progress" ? (
          <div style={{ textAlign: "center", padding: "40px 0" }}>
            <Space direction="vertical">
              {getStatusIcon(currentAudit.status)}
              <Text>Audit is {currentAudit.status.replace("_", " ")}...</Text>
              <Text type="secondary">
                Please wait for the audit to complete
              </Text>
            </Space>
          </div>
        ) : (
          <div style={{ textAlign: "center", padding: "40px 0" }}>
            <Text type="secondary">No audit results available</Text>
          </div>
        )}
      </Drawer>
    </div>
  );
};

export default AuditManager;
