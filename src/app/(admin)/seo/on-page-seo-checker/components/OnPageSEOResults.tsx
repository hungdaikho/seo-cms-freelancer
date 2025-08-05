import React, { useState } from "react";
import {
  Card,
  Typography,
  Row,
  Col,
  Progress,
  Tag,
  Space,
  Collapse,
  List,
  Alert,
  Button,
  Tooltip,
  Statistic,
  Divider,
} from "antd";
import {
  CheckCircleOutlined,
  ExclamationCircleOutlined,
  InfoCircleOutlined,
  TrophyOutlined,
  FileTextOutlined,
  PictureOutlined,
  ThunderboltOutlined,
  ShareAltOutlined,
  BulbOutlined,
  LinkOutlined,
  ClockCircleOutlined,
} from "@ant-design/icons";
import {
  OnPageSEOResults as Results,
  OnPageSEOIssue,
} from "@/types/on-page-seo.type";

const { Title, Text, Paragraph } = Typography;
const { Panel } = Collapse;

interface OnPageSEOResultsProps {
  results: Results;
}

const OnPageSEOResults: React.FC<OnPageSEOResultsProps> = ({ results }) => {
  const [activeKey, setActiveKey] = useState<string[]>(["overview"]);

  // Get overall score color
  const getScoreColor = (score: number) => {
    if (score >= 90) return "#52c41a";
    if (score >= 80) return "#1890ff";
    if (score >= 70) return "#faad14";
    if (score >= 60) return "#fa8c16";
    return "#f5222d";
  };

  // Get score status
  const getScoreStatus = (score: number) => {
    if (score >= 90) return "Excellent";
    if (score >= 80) return "Good";
    if (score >= 70) return "Fair";
    if (score >= 60) return "Poor";
    return "Critical";
  };

  // Get issue icon
  const getIssueIcon = (type: string) => {
    switch (type) {
      case "error":
        return <ExclamationCircleOutlined style={{ color: "#f5222d" }} />;
      case "warning":
        return <ExclamationCircleOutlined style={{ color: "#faad14" }} />;
      case "info":
        return <InfoCircleOutlined style={{ color: "#1890ff" }} />;
      default:
        return <InfoCircleOutlined />;
    }
  };

  // Get priority color
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "red";
      case "medium":
        return "orange";
      case "low":
        return "blue";
      default:
        return "default";
    }
  };

  // Format date
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString();
  };

  return (
    <div>
      {/* Overall Score Card */}
      <Card
        title={
          <Space>
            <TrophyOutlined />
            Overall SEO Score
          </Space>
        }
        style={{ marginBottom: "16px" }}
      >
        <Row gutter={[24, 16]} align="middle">
          <Col xs={24} sm={12} md={8}>
            <div style={{ textAlign: "center" }}>
              <Progress
                type="circle"
                percent={results.overall_score}
                strokeColor={getScoreColor(results.overall_score)}
                size={120}
                format={(percent) => (
                  <div>
                    <div style={{ fontSize: "24px", fontWeight: "bold" }}>
                      {percent}
                    </div>
                    <div style={{ fontSize: "12px", color: "#8c8c8c" }}>
                      {getScoreStatus(percent || 0)}
                    </div>
                  </div>
                )}
              />
            </div>
          </Col>
          <Col xs={24} sm={12} md={16}>
            <Space direction="vertical" style={{ width: "100%" }}>
              <div>
                <Text strong>Analyzed URL:</Text>
                <br />
                <Text code>{results.analysis_url}</Text>
              </div>
              <div>
                <Text strong>Analysis Date:</Text>
                <br />
                <Text>{formatDate(results.createdAt)}</Text>
              </div>
              {results.completedAt && (
                <div>
                  <Text strong>Completed:</Text>
                  <br />
                  <Text>{formatDate(results.completedAt)}</Text>
                </div>
              )}
            </Space>
          </Col>
        </Row>
      </Card>

      {/* Category Scores */}
      <Row gutter={[16, 16]} style={{ marginBottom: "24px" }}>
        <Col xs={24} sm={12} lg={6}>
          <Card size="small">
            <Statistic
              title="Technical SEO"
              value={results.results.technical_seo.score}
              suffix="/ 100"
              valueStyle={{
                color: getScoreColor(results.results.technical_seo.score),
              }}
              prefix={<FileTextOutlined />}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card size="small">
            <Statistic
              title="Content Analysis"
              value={results.results.content_analysis.score}
              suffix="/ 100"
              valueStyle={{
                color: getScoreColor(results.results.content_analysis.score),
              }}
              prefix={<FileTextOutlined />}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card size="small">
            <Statistic
              title="Performance"
              value={results.results.performance.score}
              suffix="/ 100"
              valueStyle={{
                color: getScoreColor(results.results.performance.score),
              }}
              prefix={<ThunderboltOutlined />}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card size="small">
            <Statistic
              title="Social Media"
              value={results.results.social_media.score}
              suffix="/ 100"
              valueStyle={{
                color: getScoreColor(results.results.social_media.score),
              }}
              prefix={<ShareAltOutlined />}
            />
          </Card>
        </Col>
      </Row>

      {/* Detailed Results */}
      <Collapse activeKey={activeKey} onChange={setActiveKey} ghost>
        {/* Recommendations */}
        <Panel
          header={
            <Space>
              <BulbOutlined />
              <span>Recommendations ({results.recommendations.length})</span>
            </Space>
          }
          key="recommendations"
        >
          <List
            dataSource={results.recommendations}
            renderItem={(item: OnPageSEOIssue) => (
              <List.Item>
                <Card size="small" style={{ width: "100%" }}>
                  <Row gutter={[16, 8]} align="middle">
                    <Col flex="auto">
                      <Space direction="vertical" style={{ width: "100%" }}>
                        <Space>
                          {getIssueIcon(item.type || "info")}
                          <Text strong>{item.title}</Text>
                          <Tag
                            color={getPriorityColor(item.priority || "medium")}
                          >
                            {item.priority?.toUpperCase()}
                          </Tag>
                        </Space>
                        <Text>{item.description}</Text>
                        {item.recommendation && (
                          <Alert
                            message={item.recommendation}
                            type="info"
                            showIcon
                            style={{ marginTop: "8px" }}
                          />
                        )}
                      </Space>
                    </Col>
                    <Col>
                      <Space
                        direction="vertical"
                        style={{ textAlign: "center" }}
                      >
                        {item.impact && (
                          <Tag
                            color={getPriorityColor(item.impact.toLowerCase())}
                          >
                            Impact: {item.impact}
                          </Tag>
                        )}
                        {item.effort && <Tag>Effort: {item.effort}</Tag>}
                      </Space>
                    </Col>
                  </Row>
                </Card>
              </List.Item>
            )}
          />
        </Panel>

        {/* Technical SEO */}
        <Panel
          header={
            <Space>
              <FileTextOutlined />
              <span>Technical SEO</span>
              <Progress
                percent={results.results.technical_seo.score}
                size="small"
                style={{ width: "100px" }}
                strokeColor={getScoreColor(results.results.technical_seo.score)}
              />
            </Space>
          }
          key="technical"
        >
          <Row gutter={[16, 16]}>
            <Col xs={24} lg={12}>
              <Card title="Metrics" size="small">
                <Space direction="vertical" style={{ width: "100%" }}>
                  <div>
                    <Text strong>Title Length:</Text>
                    <Text style={{ float: "right" }}>
                      {results.results.technical_seo.metrics.title_length} chars
                    </Text>
                  </div>
                  <div>
                    <Text strong>Meta Description:</Text>
                    <Text style={{ float: "right" }}>
                      {
                        results.results.technical_seo.metrics
                          .meta_description_length
                      }{" "}
                      chars
                    </Text>
                  </div>
                  <div>
                    <Text strong>H1 Tags:</Text>
                    <Text style={{ float: "right" }}>
                      {results.results.technical_seo.metrics.h1_count}
                    </Text>
                  </div>
                  <div>
                    <Text strong>H2 Tags:</Text>
                    <Text style={{ float: "right" }}>
                      {results.results.technical_seo.metrics.h2_count}
                    </Text>
                  </div>
                  <div>
                    <Text strong>Schema Markup:</Text>
                    <Text style={{ float: "right" }}>
                      {
                        results.results.technical_seo.metrics
                          .schema_markup_count
                      }
                    </Text>
                  </div>
                </Space>
              </Card>
            </Col>
            <Col xs={24} lg={12}>
              <Card title="Issues" size="small">
                <List
                  dataSource={results.results.technical_seo.issues}
                  renderItem={(issue) => (
                    <List.Item>
                      <Space>
                        {getIssueIcon(issue.type)}
                        <Text>{issue.title || issue.recommendation}</Text>
                      </Space>
                    </List.Item>
                  )}
                />
              </Card>
            </Col>
          </Row>
        </Panel>

        {/* Content Analysis */}
        <Panel
          header={
            <Space>
              <FileTextOutlined />
              <span>Content Analysis</span>
              <Progress
                percent={results.results.content_analysis.score}
                size="small"
                style={{ width: "100px" }}
                strokeColor={getScoreColor(
                  results.results.content_analysis.score
                )}
              />
            </Space>
          }
          key="content"
        >
          <Row gutter={[16, 16]}>
            <Col xs={24} lg={12}>
              <Card title="Content Metrics" size="small">
                <Space direction="vertical" style={{ width: "100%" }}>
                  <div>
                    <Text strong>Word Count:</Text>
                    <Text style={{ float: "right" }}>
                      {results.results.content_analysis.metrics.word_count}
                    </Text>
                  </div>
                  <div>
                    <Text strong>Readability Score:</Text>
                    <Text style={{ float: "right" }}>
                      {
                        results.results.content_analysis.metrics
                          .readability_score
                      }
                    </Text>
                  </div>
                  <div>
                    <Text strong>Keyword Density:</Text>
                    <Text style={{ float: "right" }}>
                      {results.results.content_analysis.metrics.keyword_density}
                      %
                    </Text>
                  </div>
                  <div>
                    <Text strong>Internal Links:</Text>
                    <Text style={{ float: "right" }}>
                      {results.results.content_analysis.metrics.internal_links}
                    </Text>
                  </div>
                  <div>
                    <Text strong>External Links:</Text>
                    <Text style={{ float: "right" }}>
                      {results.results.content_analysis.metrics.external_links}
                    </Text>
                  </div>
                </Space>
              </Card>
            </Col>
            <Col xs={24} lg={12}>
              <Card title="Content Issues" size="small">
                <List
                  dataSource={results.results.content_analysis.issues}
                  renderItem={(issue) => (
                    <List.Item>
                      <Space>
                        {getIssueIcon(issue.type)}
                        <Text>{issue.title || issue.recommendation}</Text>
                      </Space>
                    </List.Item>
                  )}
                />
              </Card>
            </Col>
          </Row>
        </Panel>

        {/* Performance */}
        <Panel
          header={
            <Space>
              <ThunderboltOutlined />
              <span>Performance</span>
              <Progress
                percent={results.results.performance.score}
                size="small"
                style={{ width: "100px" }}
                strokeColor={getScoreColor(results.results.performance.score)}
              />
            </Space>
          }
          key="performance"
        >
          <Row gutter={[16, 16]}>
            <Col xs={24} lg={12}>
              <Card title="Performance Metrics" size="small">
                <Space direction="vertical" style={{ width: "100%" }}>
                  <div>
                    <Text strong>Page Load Time:</Text>
                    <Text style={{ float: "right" }}>
                      {results.results.performance.metrics.page_load_time}s
                    </Text>
                  </div>
                  <div>
                    <Text strong>LCP (Largest Contentful Paint):</Text>
                    <Text style={{ float: "right" }}>
                      {results.results.performance.metrics.core_web_vitals.lcp}s
                    </Text>
                  </div>
                  <div>
                    <Text strong>CLS (Cumulative Layout Shift):</Text>
                    <Text style={{ float: "right" }}>
                      {results.results.performance.metrics.core_web_vitals.cls}
                    </Text>
                  </div>
                  <div>
                    <Text strong>Mobile Friendly:</Text>
                    <Text style={{ float: "right" }}>
                      <Tag
                        color={
                          results.results.performance.metrics.mobile_friendly
                            ? "green"
                            : "red"
                        }
                      >
                        {results.results.performance.metrics.mobile_friendly
                          ? "Yes"
                          : "No"}
                      </Tag>
                    </Text>
                  </div>
                </Space>
              </Card>
            </Col>
            <Col xs={24} lg={12}>
              <Card title="Performance Issues" size="small">
                <List
                  dataSource={results.results.performance.issues}
                  renderItem={(issue) => (
                    <List.Item>
                      <Space>
                        {getIssueIcon(issue.type)}
                        <Text>{issue.title || issue.recommendation}</Text>
                      </Space>
                    </List.Item>
                  )}
                />
              </Card>
            </Col>
          </Row>
        </Panel>

        {/* Social Media */}
        <Panel
          header={
            <Space>
              <ShareAltOutlined />
              <span>Social Media Optimization</span>
              <Progress
                percent={results.results.social_media.score}
                size="small"
                style={{ width: "100px" }}
                strokeColor={getScoreColor(results.results.social_media.score)}
              />
            </Space>
          }
          key="social"
        >
          <Row gutter={[16, 16]}>
            <Col xs={24} lg={12}>
              <Card title="Social Media Tags" size="small">
                <Space direction="vertical" style={{ width: "100%" }}>
                  <div>
                    <Text strong>OG Title:</Text>
                    <br />
                    <Text code>
                      {results.results.social_media.metrics.og_title}
                    </Text>
                  </div>
                  <div>
                    <Text strong>OG Description:</Text>
                    <br />
                    <Text code>
                      {results.results.social_media.metrics.og_description}
                    </Text>
                  </div>
                  <div>
                    <Text strong>OG Image:</Text>
                    <br />
                    <Text code>
                      {results.results.social_media.metrics.og_image}
                    </Text>
                  </div>
                  <div>
                    <Text strong>Twitter Card:</Text>
                    <br />
                    <Text code>
                      {results.results.social_media.metrics.twitter_card}
                    </Text>
                  </div>
                </Space>
              </Card>
            </Col>
            <Col xs={24} lg={12}>
              <Card title="Social Media Issues" size="small">
                <List
                  dataSource={results.results.social_media.issues}
                  renderItem={(issue) => (
                    <List.Item>
                      <Space>
                        {getIssueIcon(issue.type)}
                        <Text>{issue.title || issue.recommendation}</Text>
                      </Space>
                    </List.Item>
                  )}
                />
              </Card>
            </Col>
          </Row>
        </Panel>
      </Collapse>
    </div>
  );
};

export default OnPageSEOResults;
