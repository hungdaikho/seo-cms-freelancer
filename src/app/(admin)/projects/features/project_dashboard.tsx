import React, { useEffect } from "react";
import {
  Row,
  Col,
  Card,
  Statistic,
  Typography,
  Button,
  List,
  Tag,
  Space,
} from "antd";
import {
  SearchOutlined,
  FileSearchOutlined,
  ArrowUpOutlined,
  ArrowDownOutlined,
  EyeOutlined,
} from "@ant-design/icons";
import { useProject } from "@/stores/hooks/useProject";
import { useKeyword } from "@/stores/hooks/useKeyword";
import { useAudit } from "@/stores/hooks/useAudit";
import styles from "./project_dashboard.module.scss";

const { Title, Text } = Typography;

interface ProjectDashboardProps {
  projectId: string;
  projectName: string;
}

const ProjectDashboard: React.FC<ProjectDashboardProps> = ({
  projectId,
  projectName,
}) => {
  const { projectStats, fetchProjectStats } = useProject();
  const { keywords, fetchProjectKeywords } = useKeyword();
  const { audits, auditSummary, fetchProjectAudits, fetchAuditSummary }: any =
    useAudit();

  useEffect(() => {
    if (projectId) {
      // Load project data
      fetchProjectStats(projectId);
      fetchProjectKeywords(projectId, { limit: 5 }); // Get top 5 keywords
      fetchProjectAudits(projectId, { limit: 3 }); // Get latest 3 audits
      fetchAuditSummary(projectId);
    }
  }, [projectId]);

  const getScoreColor = (score: number) => {
    if (score >= 80) return "#52c41a";
    if (score >= 60) return "#faad14";
    return "#ff4d4f";
  };

  const getChangeIcon = (change: number) => {
    if (change > 0) return <ArrowUpOutlined style={{ color: "#52c41a" }} />;
    if (change < 0) return <ArrowDownOutlined style={{ color: "#ff4d4f" }} />;
    return null;
  };

  return (
    <div className={styles.projectDashboard}>
      {/* Header */}
      <div className={styles.header}>
        <Title level={2}>{projectName} - Dashboard</Title>
        <Text type="secondary">Overview of your SEO project performance</Text>
      </div>

      {/* Stats Overview */}
      <Row gutter={[16, 16]} className={styles.statsRow}>
        <Col xs={24} sm={12} md={6}>
          <Card>
            <Statistic
              title="Total Keywords"
              value={projectStats?.totalKeywords || 0}
              prefix={<SearchOutlined />}
              valueStyle={{ color: "#1890ff" }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <Card>
            <Statistic
              title="Tracking Keywords"
              value={projectStats?.trackingKeywords || 0}
              prefix={<EyeOutlined />}
              valueStyle={{ color: "#52c41a" }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <Card>
            <Statistic
              title="Average Ranking"
              value={projectStats?.averageRanking || 0}
              precision={1}
              valueStyle={{ color: "#722ed1" }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <Card>
            <Statistic
              title="Audits Completed"
              value={auditSummary?.totalAudits || 0}
              prefix={<FileSearchOutlined />}
              valueStyle={{ color: "#eb2f96" }}
            />
          </Card>
        </Col>
      </Row>

      {/* Main Content */}
      <Row gutter={[16, 16]} className={styles.mainContent}>
        {/* Keywords Performance */}
        <Col xs={24} lg={12}>
          <Card
            title="Keyword Performance"
            extra={
              <Button type="link" size="small">
                View All
              </Button>
            }
          >
            <Row gutter={[16, 16]} className={styles.keywordStats}>
              <Col span={8}>
                <Statistic
                  title="Improving"
                  value={projectStats?.improvingKeywords || 0}
                  valueStyle={{ color: "#52c41a" }}
                  prefix={<ArrowUpOutlined />}
                />
              </Col>
              <Col span={8}>
                <Statistic
                  title="Declining"
                  value={projectStats?.decliningKeywords || 0}
                  valueStyle={{ color: "#ff4d4f" }}
                  prefix={<ArrowDownOutlined />}
                />
              </Col>
              <Col span={8}>
                <Statistic
                  title="Stable"
                  value={
                    (projectStats?.totalKeywords || 0) -
                    (projectStats?.improvingKeywords || 0) -
                    (projectStats?.decliningKeywords || 0)
                  }
                  valueStyle={{ color: "#8c8c8c" }}
                />
              </Col>
            </Row>

            {/* Top Keywords */}
            <div className={styles.topKeywords}>
              <Title level={5}>Top Keywords</Title>
              <List
                size="small"
                dataSource={projectStats?.topKeywords || []}
                renderItem={(item) => (
                  <List.Item>
                    <div className={styles.keywordItem}>
                      <Text strong>{item.keyword}</Text>
                      <Space>
                        <Text>Position: {item.position}</Text>
                        {getChangeIcon(item.change)}
                        {item.change !== 0 && (
                          <Text type={item.change > 0 ? "success" : "danger"}>
                            {item.change > 0 ? `+${item.change}` : item.change}
                          </Text>
                        )}
                      </Space>
                    </div>
                  </List.Item>
                )}
              />
            </div>
          </Card>
        </Col>

        {/* Recent Audits */}
        <Col xs={24} lg={12}>
          <Card
            title="Recent Audits"
            extra={
              <Button type="link" size="small">
                View All
              </Button>
            }
          >
            {auditSummary && (
              <div className={styles.auditSummary}>
                <Row gutter={[16, 16]}>
                  <Col span={12}>
                    <Statistic
                      title="Average Score"
                      value={auditSummary.averageScore || 0}
                      suffix="/100"
                      valueStyle={{
                        color: getScoreColor(auditSummary.averageScore || 0),
                      }}
                    />
                  </Col>
                  <Col span={12}>
                    <Statistic
                      title="Critical Issues"
                      value={auditSummary.criticalIssues || 0}
                      valueStyle={{ color: "#ff4d4f" }}
                    />
                  </Col>
                </Row>
              </div>
            )}

            <List
              size="small"
              dataSource={audits.slice(0, 3)}
              renderItem={(audit: any) => (
                <List.Item>
                  <div className={styles.auditItem}>
                    <div>
                      <Text strong>Audit #{audit.id.substring(0, 8)}</Text>
                      <br />
                      <Text type="secondary">
                        {new Date(audit.createdAt).toLocaleDateString()}
                      </Text>
                    </div>
                    <Tag
                      color={
                        audit.status === "completed"
                          ? "green"
                          : audit.status === "pending"
                          ? "orange"
                          : "blue"
                      }
                    >
                      {audit.status}
                    </Tag>
                  </div>
                </List.Item>
              )}
            />
          </Card>
        </Col>

        {/* Quick Actions */}
        {/* <Col xs={24}>
          <Card title="Quick Actions">
            <Row gutter={[16, 16]}>
              <Col xs={24} sm={8} md={6}>
                <Button
                  type="primary"
                  icon={<PlusOutlined />}
                  block
                  size="large"
                >
                  Add Keywords
                </Button>
              </Col>
              <Col xs={24} sm={8} md={6}>
                <Button icon={<FileSearchOutlined />} block size="large">
                  Start Audit
                </Button>
              </Col>
              <Col xs={24} sm={8} md={6}>
                <Button icon={<EyeOutlined />} block size="large">
                  View Reports
                </Button>
              </Col>
              <Col xs={24} sm={8} md={6}>
                <Button icon={<ProjectOutlined />} block size="large">
                  Project Settings
                </Button>
              </Col>
            </Row>
          </Card>
        </Col> */}
      </Row>
    </div>
  );
};

export default ProjectDashboard;
