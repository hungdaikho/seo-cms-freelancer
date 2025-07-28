"use client";

import React, { useEffect, useState } from "react";
import {
  Card,
  Row,
  Col,
  Button,
  Typography,
  Space,
  Tag,
  Modal,
  Form,
  Input,
  Select,
  Table,
  Statistic,
  Progress,
  Tooltip,
  Badge,
  Tabs,
  message,
  Spin,
} from "antd";
import {
  RobotOutlined,
  BulbOutlined,
  SearchOutlined,
  FileTextOutlined,
  BarChartOutlined,
  ThunderboltOutlined,
  PlusOutlined,
  HistoryOutlined,
  DollarOutlined,
  ClockCircleOutlined,
} from "@ant-design/icons";
import { useAppDispatch, useAppSelector } from "@/stores/hooks";
import { fetchProjects } from "@/stores/slices/project.slice";
import {
  fetchAiTools,
  fetchAiRequests,
  generateContent,
  analyzeSeо,
  researchKeywords,
  setFilters,
  setPagination,
  AiTool,
  AiRequest,
  ContentGenerationRequest,
  SeoAnalysisRequest,
  KeywordResearchRequest,
} from "@/stores/slices/ai.slice";
import { Project } from "@/types/api.type";
import styles from "./ai_tools_manager.module.scss";

const { Title, Text, Paragraph } = Typography;
const { Option } = Select;
const { TextArea } = Input;
const { TabPane } = Tabs;

const AiToolsManager: React.FC = () => {
  const dispatch = useAppDispatch();
  const { projects } = useAppSelector((state) => state.project);
  const { tools, requests, loading, error, stats, filters, pagination } =
    useAppSelector((state) => state.ai);

  const [form] = Form.useForm();
  const [isContentModalVisible, setIsContentModalVisible] = useState(false);
  const [isSeoModalVisible, setIsSeoModalVisible] = useState(false);
  const [isKeywordModalVisible, setIsKeywordModalVisible] = useState(false);
  const [selectedTool, setSelectedTool] = useState<AiTool | null>(null);
  const [activeTab, setActiveTab] = useState("tools");
  const [selectedProject, setSelectedProject] = useState<string>("");

  useEffect(() => {
    // Load projects on component mount
    dispatch(fetchProjects());
  }, [dispatch]);

  useEffect(() => {
    if (projects.length > 0 && !selectedProject) {
      setSelectedProject(projects[0].id);
    }
  }, [projects, selectedProject]);

  useEffect(() => {
    if (selectedProject) {
      dispatch(fetchAiTools());
      if (activeTab === "history") {
        loadRequests();
      }
    }
  }, [selectedProject, activeTab]);

  useEffect(() => {
    if (activeTab === "history") {
      loadRequests();
    }
  }, [filters, pagination.page, pagination.limit]);

  useEffect(() => {
    if (error) {
      message.error(error);
    }
  }, [error]);

  const loadRequests = () => {
    dispatch(
      fetchAiRequests({
        filters,
        pagination: {
          page: pagination.page,
          limit: pagination.limit,
        },
      })
    );
  };

  const handleGenerateContent = async (values: any) => {
    if (!selectedProject) {
      message.error("Please select a project first");
      return;
    }

    try {
      const request: ContentGenerationRequest = {
        type: values.type,
        prompt: values.prompt,
        keywords: values.keywords?.split(",").map((k: string) => k.trim()),
        tone: values.tone,
        length: values.length,
        language: values.language || "en",
        targetAudience: values.targetAudience,
        projectId: selectedProject,
      };

      await dispatch(generateContent(request)).unwrap();
      setIsContentModalVisible(false);
      form.resetFields();
      message.success(
        "Content generation started! Check the history tab for results."
      );
      setActiveTab("history");
    } catch (error) {
      // Error handled by slice
    }
  };

  const handleAnalyzeSeo = async (values: any) => {
    if (!selectedProject) {
      message.error("Please select a project first");
      return;
    }

    try {
      const request: SeoAnalysisRequest = {
        url: values.url,
        targetKeywords: values.keywords.split(",").map((k: string) => k.trim()),
        competitors: values.competitors
          ?.split(",")
          .map((c: string) => c.trim()),
        projectId: selectedProject,
      };

      await dispatch(analyzeSeо(request)).unwrap();
      setIsSeoModalVisible(false);
      form.resetFields();
      message.success(
        "SEO analysis started! Check the history tab for results."
      );
      setActiveTab("history");
    } catch (error) {
      // Error handled by slice
    }
  };

  const handleResearchKeywords = async (values: any) => {
    if (!selectedProject) {
      message.error("Please select a project first");
      return;
    }

    try {
      const request: KeywordResearchRequest = {
        seedKeywords: values.seedKeywords
          .split(",")
          .map((k: string) => k.trim()),
        location: values.location,
        language: values.language || "en",
        includeQuestions: values.includeQuestions,
        projectId: selectedProject,
      };

      await dispatch(researchKeywords(request)).unwrap();
      setIsKeywordModalVisible(false);
      form.resetFields();
      message.success(
        "Keyword research started! Check the history tab for results."
      );
      setActiveTab("history");
    } catch (error) {
      // Error handled by slice
    }
  };

  const openToolModal = (tool: AiTool) => {
    setSelectedTool(tool);

    switch (tool.id) {
      case "content-generator":
        setIsContentModalVisible(true);
        break;
      case "seo-optimizer":
        setIsSeoModalVisible(true);
        break;
      case "keyword-research":
        setIsKeywordModalVisible(true);
        break;
      default:
        message.info("This tool is coming soon!");
    }
  };

  const getToolIcon = (category: AiTool["category"]) => {
    switch (category) {
      case "content":
        return <FileTextOutlined />;
      case "seo":
        return <SearchOutlined />;
      case "analysis":
        return <BarChartOutlined />;
      case "research":
        return <BulbOutlined />;
      case "optimization":
        return <ThunderboltOutlined />;
      default:
        return <RobotOutlined />;
    }
  };

  const getStatusColor = (status: AiRequest["status"]) => {
    switch (status) {
      case "completed":
        return "green";
      case "processing":
        return "blue";
      case "pending":
        return "orange";
      case "failed":
        return "red";
      default:
        return "default";
    }
  };

  const requestColumns = [
    {
      title: "Tool",
      dataIndex: "toolName",
      key: "toolName",
      width: 150,
      render: (name: string) => <Text strong>{name}</Text>,
    },
    {
      title: "Input",
      dataIndex: "input",
      key: "input",
      width: 300,
      render: (input: string) => (
        <Text ellipsis style={{ maxWidth: 280 }}>
          {input}
        </Text>
      ),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      width: 120,
      render: (status: AiRequest["status"]) => (
        <Tag color={getStatusColor(status)}>
          {status.charAt(0) + status.slice(1)}
        </Tag>
      ),
    },
    {
      title: "Tokens",
      dataIndex: "tokens",
      key: "tokens",
      width: 100,
      render: (tokens: number) => (tokens ? tokens.toLocaleString() : "-"),
    },
    {
      title: "Cost",
      dataIndex: "cost",
      key: "cost",
      width: 100,
      render: (cost: number) => (cost ? `$${cost.toFixed(3)}` : "-"),
    },
    {
      title: "Created",
      dataIndex: "createdAt",
      key: "createdAt",
      width: 120,
      render: (date: string) => new Date(date).toLocaleDateString(),
    },
    {
      title: "Actions",
      key: "actions",
      width: 100,
      render: (_: any, record: AiRequest) => (
        <Button
          size="small"
          disabled={record.status !== "completed"}
          onClick={() => message.info("Output preview coming soon!")}
        >
          View
        </Button>
      ),
    },
  ];

  return (
    <div className={styles.aiToolsManager}>
      {/* Header */}
      <div className={styles.header}>
        <div className={styles.titleSection}>
          <Title level={2}>AI Tools</Title>
          <Text type="secondary">
            Leverage AI to enhance your SEO and content strategy
          </Text>
        </div>
        <div className={styles.headerActions}>
          <Select
            placeholder="Select a project"
            style={{ width: 250 }}
            value={selectedProject}
            onChange={setSelectedProject}
            disabled={projects.length === 0}
          >
            {projects.map((project) => (
              <Option key={project.id} value={project.id}>
                {project.name} ({project.domain})
              </Option>
            ))}
          </Select>
        </div>
      </div>

      <Tabs
        activeKey={activeTab}
        onChange={setActiveTab}
        className={styles.mainTabs}
      >
        <TabPane
          tab={
            <span>
              <RobotOutlined />
              AI Tools
            </span>
          }
          key="tools"
        >
          {/* Stats Overview */}
          <Row gutter={16} className={styles.statsRow}>
            <Col span={6}>
              <Card>
                <Statistic
                  title="Total Requests"
                  value={stats.totalRequests}
                  prefix={<RobotOutlined />}
                  valueStyle={{ color: "#1890ff" }}
                />
              </Card>
            </Col>
            <Col span={6}>
              <Card>
                <Statistic
                  title="Completed"
                  value={stats.completedRequests}
                  valueStyle={{ color: "#52c41a" }}
                />
              </Card>
            </Col>
            <Col span={6}>
              <Card>
                <Statistic
                  title="Tokens Used"
                  value={stats.tokensUsed}
                  valueStyle={{ color: "#fa8c16" }}
                />
              </Card>
            </Col>
            <Col span={6}>
              <Card>
                <Statistic
                  title="Monthly Cost"
                  value={stats.monthlyCost}
                  prefix={<DollarOutlined />}
                  precision={2}
                  valueStyle={{ color: "#722ed1" }}
                />
              </Card>
            </Col>
          </Row>

          {/* AI Tools Grid */}
          <Row gutter={16} className={styles.toolsGrid}>
            {tools.map((tool) => (
              <Col key={tool.id} span={8}>
                <Card
                  className={styles.toolCard}
                  hoverable
                  actions={[
                    <Button
                      type="primary"
                      icon={<PlusOutlined />}
                      onClick={() => openToolModal(tool)}
                      disabled={!tool.isActive}
                    >
                      Use Tool
                    </Button>,
                  ]}
                >
                  <div className={styles.toolHeader}>
                    <div className={styles.toolIcon}>
                      {getToolIcon(tool.category)}
                    </div>
                    <div className={styles.toolMeta}>
                      <div className={styles.toolTitle}>
                        <Text strong>{tool.name}</Text>
                        {tool.isPremium && <Tag color="gold">Premium</Tag>}
                      </div>
                      <Tag>{tool.category}</Tag>
                    </div>
                  </div>

                  <Paragraph className={styles.toolDescription}>
                    {tool.description}
                  </Paragraph>

                  {tool.maxUsage && (
                    <div className={styles.usageProgress}>
                      <Text type="secondary" style={{ fontSize: "12px" }}>
                        Usage: {tool.usageCount}/{tool.maxUsage}
                      </Text>
                      <Progress
                        percent={(tool.usageCount / tool.maxUsage) * 100}
                        size="small"
                        showInfo={false}
                      />
                    </div>
                  )}

                  <div className={styles.toolFeatures}>
                    {tool.features.slice(0, 3).map((feature, index) => (
                      <Text
                        key={index}
                        type="secondary"
                        style={{ fontSize: "12px" }}
                      >
                        • {feature}
                      </Text>
                    ))}
                    {tool.features.length > 3 && (
                      <Text type="secondary" style={{ fontSize: "12px" }}>
                        +{tool.features.length - 3} more
                      </Text>
                    )}
                  </div>
                </Card>
              </Col>
            ))}
          </Row>
        </TabPane>

        <TabPane
          tab={
            <span>
              <HistoryOutlined />
              Request History
            </span>
          }
          key="history"
        >
          {/* Filters */}
          <Card className={styles.filtersCard}>
            <Row gutter={16} align="middle">
              <Col span={6}>
                <Select
                  placeholder="Filter by status"
                  style={{ width: "100%" }}
                  value={filters.status}
                  onChange={(value) => dispatch(setFilters({ status: value }))}
                  allowClear
                >
                  <Option value="all">All Status</Option>
                  <Option value="completed">Completed</Option>
                  <Option value="processing">Processing</Option>
                  <Option value="pending">Pending</Option>
                  <Option value="failed">Failed</Option>
                </Select>
              </Col>
            </Row>
          </Card>

          {/* Requests Table */}
          <Card>
            <Table
              columns={requestColumns}
              dataSource={requests}
              rowKey="id"
              loading={loading}
              pagination={{
                current: pagination.page,
                pageSize: pagination.limit,
                total: pagination.total,
                showSizeChanger: true,
                showQuickJumper: true,
                showTotal: (total, range) =>
                  `${range[0]}-${range[1]} of ${total} requests`,
                onChange: (page, pageSize) =>
                  dispatch(setPagination({ page, limit: pageSize })),
              }}
            />
          </Card>
        </TabPane>
      </Tabs>

      {/* Content Generation Modal */}
      <Modal
        title="Generate Content with AI"
        open={isContentModalVisible}
        onCancel={() => {
          setIsContentModalVisible(false);
          form.resetFields();
        }}
        footer={null}
        width={700}
      >
        <Form form={form} layout="vertical" onFinish={handleGenerateContent}>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="type"
                label="Content Type"
                rules={[
                  { required: true, message: "Please select content type" },
                ]}
              >
                <Select placeholder="Select content type">
                  <Option value="blog_post">Blog Post</Option>
                  <Option value="meta_description">Meta Description</Option>
                  <Option value="title_tags">Title Tags</Option>
                  <Option value="product_description">
                    Product Description
                  </Option>
                  <Option value="social_post">Social Media Post</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="tone" label="Tone" initialValue="professional">
                <Select>
                  <Option value="professional">Professional</Option>
                  <Option value="casual">Casual</Option>
                  <Option value="friendly">Friendly</Option>
                  <Option value="authoritative">Authoritative</Option>
                  <Option value="creative">Creative</Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>

          <Form.Item
            name="prompt"
            label="Content Prompt"
            rules={[{ required: true, message: "Please enter your prompt" }]}
          >
            <TextArea
              rows={4}
              placeholder="Describe what content you want to generate..."
            />
          </Form.Item>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="keywords"
                label="Target Keywords (comma separated)"
              >
                <Input placeholder="seo, content marketing, digital marketing" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="length"
                label="Content Length"
                initialValue="medium"
              >
                <Select>
                  <Option value="short">Short (100-300 words)</Option>
                  <Option value="medium">Medium (300-800 words)</Option>
                  <Option value="long">Long (800+ words)</Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>

          <Form.Item name="targetAudience" label="Target Audience">
            <Input placeholder="e.g., Small business owners, Marketing professionals" />
          </Form.Item>

          <Form.Item>
            <Space>
              <Button type="primary" htmlType="submit" loading={loading}>
                Generate Content
              </Button>
              <Button
                onClick={() => {
                  setIsContentModalVisible(false);
                  form.resetFields();
                }}
              >
                Cancel
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Modal>

      {/* SEO Analysis Modal */}
      <Modal
        title="AI SEO Analysis"
        open={isSeoModalVisible}
        onCancel={() => {
          setIsSeoModalVisible(false);
          form.resetFields();
        }}
        footer={null}
        width={600}
      >
        <Form form={form} layout="vertical" onFinish={handleAnalyzeSeo}>
          <Form.Item
            name="url"
            label="Website URL"
            rules={[
              { required: true, message: "Please enter URL" },
              { type: "url", message: "Please enter a valid URL" },
            ]}
          >
            <Input placeholder="https://example.com" />
          </Form.Item>

          <Form.Item
            name="keywords"
            label="Target Keywords (comma separated)"
            rules={[
              { required: true, message: "Please enter target keywords" },
            ]}
          >
            <Input placeholder="seo tools, keyword research, content optimization" />
          </Form.Item>

          <Form.Item
            name="competitors"
            label="Competitor URLs (comma separated, optional)"
          >
            <Input placeholder="https://competitor1.com, https://competitor2.com" />
          </Form.Item>

          <Form.Item>
            <Space>
              <Button type="primary" htmlType="submit" loading={loading}>
                Start Analysis
              </Button>
              <Button
                onClick={() => {
                  setIsSeoModalVisible(false);
                  form.resetFields();
                }}
              >
                Cancel
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Modal>

      {/* Keyword Research Modal */}
      <Modal
        title="AI Keyword Research"
        open={isKeywordModalVisible}
        onCancel={() => {
          setIsKeywordModalVisible(false);
          form.resetFields();
        }}
        footer={null}
        width={600}
      >
        <Form form={form} layout="vertical" onFinish={handleResearchKeywords}>
          <Form.Item
            name="seedKeywords"
            label="Seed Keywords (comma separated)"
            rules={[{ required: true, message: "Please enter seed keywords" }]}
          >
            <Input placeholder="digital marketing, seo tools, content strategy" />
          </Form.Item>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item name="location" label="Target Location">
                <Select placeholder="Select location">
                  <Option value="us">United States</Option>
                  <Option value="uk">United Kingdom</Option>
                  <Option value="ca">Canada</Option>
                  <Option value="au">Australia</Option>
                  <Option value="de">Germany</Option>
                  <Option value="fr">France</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="language" label="Language" initialValue="en">
                <Select>
                  <Option value="en">English</Option>
                  <Option value="es">Spanish</Option>
                  <Option value="fr">French</Option>
                  <Option value="de">German</Option>
                  <Option value="it">Italian</Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>

          <Form.Item>
            <Space>
              <Button type="primary" htmlType="submit" loading={loading}>
                Start Research
              </Button>
              <Button
                onClick={() => {
                  setIsKeywordModalVisible(false);
                  form.resetFields();
                }}
              >
                Cancel
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default AiToolsManager;
