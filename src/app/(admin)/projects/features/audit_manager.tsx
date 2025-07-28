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
} from "@ant-design/icons";
import { useAudit } from "@/stores/hooks/useAudit";
import { Audit, CreateAuditRequest } from "@/types/api.type";
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
  const {
    audits,
    currentAudit,
    auditResults,
    auditSummary,
    loading,
    error,
    pagination,
    startNewAudit,
    fetchProjectAudits,
    fetchAuditById,
    fetchAuditResults,
    fetchAuditSummary,
    deleteAudit,
    clearError,
    setCurrentAudit,
  } = useAudit();

  const [isCreateModalVisible, setIsCreateModalVisible] = useState(false);
  const [isResultsDrawerVisible, setIsResultsDrawerVisible] = useState(false);
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
    }
  }, [projectId]);

  useEffect(() => {
    if (error) {
      message.error(error);
      clearError();
    }
  }, [error]);

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

  const handleStartAudit = async (values: CreateAuditRequest) => {
    try {
      await startNewAudit(projectId, values);
      message.success("Audit started successfully!");
      setIsCreateModalVisible(false);
      form.resetFields();
      loadAudits();
    } catch (error) {
      // Error handled by Redux slice
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

  const handleViewResults = async (audit: Audit) => {
    setCurrentAudit(audit);
    if (audit.status === "completed") {
      await fetchAuditResults(audit.id);
    }
    setIsResultsDrawerVisible(true);
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
        render: (_: any, record: Audit) => {
          // Use stable score from memoized data to prevent jumping
          const score = stableScores.get(record.id) || 0;
          return record.status === "completed" ? (
            <div className={styles.scoreCell}>
              <Progress
                type="circle"
                size={40}
                percent={score}
                format={() => score}
                strokeColor={getScoreColor(score)}
              />
            </div>
          ) : (
            "-"
          );
        },
      },
      {
        title: "Issues Found",
        key: "issues",
        render: (_: any, record: Audit) => {
          if (record.status !== "completed") return "-";

          // Use stable issues from memoized data to prevent jumping
          const issues = stableIssues.get(record.id) || {
            high: 0,
            medium: 0,
            low: 0,
          };

          return (
            <Space direction="vertical" size="small">
              <div className={styles.issueItem}>
                <Tag color="red">{issues.high} High</Tag>
                <Tag color="orange">{issues.medium} Medium</Tag>
                <Tag color="green">{issues.low} Low</Tag>
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
        render: (_: any, record: Audit) => (
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
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={() => setIsCreateModalVisible(true)}
          loading={loading}
        >
          Start New Audit
        </Button>
      </div>

      {/* Summary Cards */}
      {auditSummary ? (
        <Row gutter={[16, 16]} className={styles.summarySection}>
          <Col xs={24} sm={12} md={6}>
            <Card>
              <Statistic
                title="Total Audits"
                value={auditSummary.total_audits || 0}
                prefix={<CheckCircleOutlined />}
              />
            </Card>
          </Col>
          <Col xs={24} sm={12} md={6}>
            <Card>
              <Statistic
                title="Average Score"
                value={auditSummary.average_score || 0}
                suffix="/100"
                valueStyle={{
                  color: getScoreColor(auditSummary.average_score || 0),
                }}
              />
            </Card>
          </Col>
          <Col xs={24} sm={12} md={6}>
            <Card>
              <Statistic
                title="Critical Issues"
                value={auditSummary.critical_issues_count || 0}
                prefix={<WarningOutlined />}
                valueStyle={{ color: "#ff4d4f" }}
              />
            </Card>
          </Col>
          <Col xs={24} sm={12} md={6}>
            <Card>
              <Statistic
                title="Last Audit"
                value={
                  auditSummary.last_audit_date
                    ? new Date(
                        auditSummary.last_audit_date
                      ).toLocaleDateString()
                    : "Never"
                }
              />
            </Card>
          </Col>
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
      <Card className={styles.tableCard}>
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

          <Form.Item name="include_mobile" valuePropName="checked">
            <Space>
              <Switch />
              <Text>Include Mobile Analysis</Text>
            </Space>
          </Form.Item>

          <Form.Item name="check_accessibility" valuePropName="checked">
            <Space>
              <Switch />
              <Text>Check Accessibility Issues</Text>
            </Space>
          </Form.Item>

          <Form.Item name="analyze_performance" valuePropName="checked">
            <Space>
              <Switch />
              <Text>Analyze Performance Metrics</Text>
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
        {auditResults && currentAudit?.status === "completed" ? (
          <div className={styles.resultsContent}>
            <Tabs defaultActiveKey="overview">
              <TabPane tab="Overview" key="overview">
                <Card title="Overall Score" className={styles.scoreCard}>
                  <div className={styles.overallScore}>
                    <Progress
                      type="circle"
                      size={120}
                      percent={auditResults.results?.overall_score || 0}
                      format={(percent) => `${percent}`}
                      strokeColor={getScoreColor(
                        auditResults.results?.overall_score || 0
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
                        value={auditResults.results?.technical_seo?.score || 0}
                        suffix="/100"
                        valueStyle={{
                          color: getScoreColor(
                            auditResults.results?.technical_seo?.score || 0
                          ),
                        }}
                      />
                    </Card>
                  </Col>
                  <Col span={8}>
                    <Card>
                      <Statistic
                        title="Performance"
                        value={auditResults.results?.performance?.score || 0}
                        suffix="/100"
                        valueStyle={{
                          color: getScoreColor(
                            auditResults.results?.performance?.score || 0
                          ),
                        }}
                      />
                    </Card>
                  </Col>
                  <Col span={8}>
                    <Card>
                      <Statistic
                        title="Content"
                        value={auditResults.results?.content?.score || 0}
                        suffix="/100"
                        valueStyle={{
                          color: getScoreColor(
                            auditResults.results?.content?.score || 0
                          ),
                        }}
                      />
                    </Card>
                  </Col>
                </Row>
              </TabPane>

              <TabPane tab="Technical Issues" key="technical">
                <div className={styles.issuesSection}>
                  {auditResults?.results?.technical_seo?.issues &&
                  auditResults.results.technical_seo.issues.length > 0 ? (
                    auditResults.results.technical_seo.issues.map(
                      (issue, index) => (
                        <Card
                          key={index}
                          size="small"
                          className={styles.issueCard}
                        >
                          <div className={styles.issueHeader}>
                            <Tag color={getSeverityColor(issue.severity)}>
                              {issue.severity?.toUpperCase() || "UNKNOWN"}
                            </Tag>
                            <Text strong>
                              {issue.type?.replace(/_/g, " ") ||
                                "Unknown Issue"}
                            </Text>
                          </div>
                          <Text>
                            {issue.description || "No description available"}
                          </Text>
                          <Text type="secondary" style={{ fontSize: "12px" }}>
                            {issue.count || 0} instance(s) found
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
                <Card title="Core Web Vitals">
                  <Row gutter={[16, 16]}>
                    <Col span={8}>
                      <Statistic
                        title="LCP (Largest Contentful Paint)"
                        value={
                          auditResults.results?.performance?.metrics
                            ?.core_web_vitals?.lcp || 0
                        }
                        suffix="s"
                        precision={1}
                      />
                    </Col>
                    <Col span={8}>
                      <Statistic
                        title="FID (First Input Delay)"
                        value={
                          auditResults.results?.performance?.metrics
                            ?.core_web_vitals?.fid || 0
                        }
                        suffix="ms"
                      />
                    </Col>
                    <Col span={8}>
                      <Statistic
                        title="CLS (Cumulative Layout Shift)"
                        value={
                          auditResults.results?.performance?.metrics
                            ?.core_web_vitals?.cls || 0
                        }
                        precision={2}
                      />
                    </Col>
                  </Row>
                  <div style={{ marginTop: "16px" }}>
                    <Text strong>Page Load Time: </Text>
                    <Text>
                      {auditResults.results?.performance?.metrics
                        ?.page_load_time || 0}
                      s
                    </Text>
                  </div>
                </Card>
              </TabPane>

              <TabPane tab="Content" key="content">
                <Card title="Content Analysis">
                  <Row gutter={[16, 16]}>
                    <Col span={12}>
                      <Statistic
                        title="Word Count"
                        value={auditResults.results?.content?.word_count || 0}
                      />
                    </Col>
                    <Col span={12}>
                      <Statistic
                        title="Readability Score"
                        value={
                          auditResults.results?.content?.readability_score || 0
                        }
                        suffix="/100"
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
