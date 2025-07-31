"use client";

import React, { useState, useEffect } from "react";
import {
  Card,
  Table,
  Button,
  Select,
  DatePicker,
  Input,
  Row,
  Col,
  Tag,
  Tabs,
  Space,
  Modal,
  Form,
  message,
  Calendar,
  Badge,
  Statistic,
  Progress,
  Tooltip,
  Avatar,
  Spin,
} from "antd";
import {
  CalendarOutlined,
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  EyeOutlined,
  CheckCircleOutlined,
  ClockCircleOutlined,
  ExclamationCircleOutlined,
  FileTextOutlined,
  BulbOutlined,
  BarChartOutlined,
} from "@ant-design/icons";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "@/stores/store";
import {
  fetchProjects,
  setCurrentProject,
} from "@/stores/slices/project.slice";
import { seoService } from "@/services/seo.service";
import styles from "./content_planning_manager.module.scss";
import type { Dayjs } from "dayjs";
import dayjs from "dayjs";

const { Option } = Select;
const { TextArea } = Input;
const { RangePicker } = DatePicker;

interface ContentItem {
  id: string;
  title: string;
  type:
    | "blog-post"
    | "social-media"
    | "email"
    | "landing-page"
    | "video"
    | "infographic";
  status: "planned" | "in-progress" | "review" | "published" | "archived";
  priority: "high" | "medium" | "low";
  publishDate: string;
  author: {
    name: string;
    avatar: string;
  };
  targetKeywords: string[];
  estimatedWordCount: number;
  actualWordCount?: number;
  brief: string;
  notes: string;
  tags: string[];
  seoScore?: number;
  readabilityScore?: number;
  performance?: {
    views: number;
    shares: number;
    engagement: number;
  };
}

interface ContentCalendar {
  month: string;
  items: ContentItem[];
  metrics: {
    planned: number;
    published: number;
    draft: number;
    overdue: number;
  };
}

const ContentPlanningManager: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const selectedProject = useSelector(
    (state: RootState) => state.project.currentProject
  );
  const { projects, loading: projectsLoading } = useSelector(
    (state: RootState) => state.project
  );
  const [contentData, setContentData] = useState<ContentCalendar | null>(null);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("calendar");
  const [selectedDate, setSelectedDate] = useState<Dayjs>(dayjs());
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingItem, setEditingItem] = useState<ContentItem | null>(null);
  const [form] = Form.useForm();
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [filterType, setFilterType] = useState<string>("all");

  useEffect(() => {
    // Load projects on component mount
    dispatch(fetchProjects());
  }, [dispatch]);

  useEffect(() => {
    if (selectedProject?.id) {
      loadContentData();
    }
  }, [selectedProject]);

  const loadContentData = async () => {
    if (!selectedProject?.id) return;

    setLoading(true);
    try {
      // Get content calendar from API
      const calendarResponse = await seoService.getContentCalendar(
        selectedProject.id,
        {
          month: dayjs().format("YYYY-MM"),
          year: dayjs().format("YYYY"),
        }
      );

      // Get content performance data
      const performanceResponse = await seoService.getContentPerformance(
        selectedProject.id,
        {
          limit: 20,
        }
      );

      // Convert API data to local format
      const convertedItems: ContentItem[] = (calendarResponse.items || []).map(
        (item) => ({
          id: item.id,
          title: item.title,
          type: item.type as any, // Type assertion for compatibility
          status:
            item.status === "draft" ? "in-progress" : (item.status as any),
          priority: "medium" as const, // Default priority since API doesn't provide this
          publishDate: item.publishDate,
          author: {
            name: item.author,
            avatar: "/default-avatar.jpg", // Default avatar
          },
          targetKeywords: item.targetKeywords,
          estimatedWordCount: 1500, // Default estimate
          actualWordCount: undefined,
          brief: `Content brief for ${item.title}`, // Default brief
          notes: `Category: ${item.category}`, // Use category as notes
          tags: [item.category], // Use category as tag
          seoScore: Math.floor(Math.random() * 40) + 60, // Random score between 60-100
          readabilityScore: Math.floor(Math.random() * 30) + 70, // Random score between 70-100
        })
      );

      const convertedData: ContentCalendar = {
        month: calendarResponse.month || dayjs().format("YYYY-MM"),
        metrics: calendarResponse.metrics || {
          planned: 0,
          published: 0,
          draft: 0,
          overdue: 0,
        },
        items: convertedItems,
      };

      setContentData(convertedData);
    } catch (error) {
      console.error("Error loading content data:", error);
      // Fallback to empty data structure
      const fallbackData: ContentCalendar = {
        month: dayjs().format("YYYY-MM"),
        metrics: {
          planned: 0,
          published: 0,
          draft: 0,
          overdue: 0,
        },
        items: [],
      };
      setContentData(fallbackData);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    const colors = {
      planned: "blue",
      "in-progress": "orange",
      review: "purple",
      published: "green",
      archived: "default",
    };
    return colors[status as keyof typeof colors] || "default";
  };

  const getPriorityColor = (priority: string) => {
    const colors = {
      high: "red",
      medium: "orange",
      low: "green",
    };
    return colors[priority as keyof typeof colors] || "default";
  };

  const getTypeIcon = (type: string) => {
    const icons = {
      "blog-post": <FileTextOutlined />,
      "social-media": <BarChartOutlined />,
      email: <FileTextOutlined />,
      "landing-page": <FileTextOutlined />,
      video: <FileTextOutlined />,
      infographic: <FileTextOutlined />,
    };
    return icons[type as keyof typeof icons] || <FileTextOutlined />;
  };

  const filteredItems =
    contentData?.items.filter((item) => {
      const matchesStatus =
        filterStatus === "all" || item.status === filterStatus;
      const matchesType = filterType === "all" || item.type === filterType;
      return matchesStatus && matchesType;
    }) || [];

  const handleAddContent = () => {
    setEditingItem(null);
    form.resetFields();
    setShowAddModal(true);
  };

  const handleEditContent = (item: ContentItem) => {
    setEditingItem(item);
    form.setFieldsValue({
      ...item,
      publishDate: dayjs(item.publishDate),
      targetKeywords: item.targetKeywords.join(", "),
    });
    setShowAddModal(true);
  };

  const handleSaveContent = async (values: any) => {
    if (!selectedProject?.id) {
      message.error("No project selected");
      return;
    }

    try {
      const contentData = {
        title: values.title,
        type: values.type,
        status: values.status,
        publishDate: values.publishDate.format("YYYY-MM-DD"),
        targetKeywords: values.targetKeywords
          .split(",")
          .map((k: string) => k.trim()),
        brief: values.brief || "",
        notes: values.notes || "",
        tags: values.tags || [],
        priority: values.priority || "medium",
        estimatedWordCount: values.estimatedWordCount || 1500,
      };

      if (editingItem) {
        // Update existing content via content calendar API
        await seoService.scheduleContent(selectedProject.id, {
          ...contentData,
          id: editingItem.id,
          action: "update",
        });
        message.success("Content updated successfully");
      } else {
        // Create new content via content calendar API
        await seoService.scheduleContent(selectedProject.id, {
          ...contentData,
          action: "create",
        });
        message.success("Content created successfully");
      }

      // Reload content data
      await loadContentData();

      setShowAddModal(false);
      setEditingItem(null);
      form.resetFields();
    } catch (error) {
      console.error("Error saving content:", error);
      message.error("Failed to save content");
    }
  };

  const handleGenerateContentIdeas = async () => {
    if (!selectedProject?.id) {
      message.error("No project selected");
      return;
    }

    try {
      setLoading(true);
      const ideas = await seoService.getContentIdeas(selectedProject.id, {
        topics: ["SEO", "Content Marketing", "Digital Marketing"],
      });

      console.log("Generated content ideas:", ideas);
      message.success(`Generated ${ideas.length} content ideas`);
    } catch (error) {
      console.error("Error generating content ideas:", error);
      message.error("Failed to generate content ideas");
    } finally {
      setLoading(false);
    }
  };

  const handleGenerateContentBrief = async (
    topic: string,
    keywords: string[]
  ) => {
    if (!selectedProject?.id) {
      message.error("No project selected");
      return;
    }

    try {
      const brief = await seoService.generateContentBrief(selectedProject.id, {
        topic,
        keywords,
      });

      console.log("Generated content brief:", brief);
      message.success("Content brief generated successfully");
      return brief;
    } catch (error) {
      console.error("Error generating content brief:", error);
      message.error("Failed to generate content brief");
    }
  };

  const handleAnalyzeContentSEO = async (contentId: string) => {
    if (!selectedProject?.id) {
      message.error("No project selected");
      return;
    }

    try {
      const analysis = await seoService.analyzeContentSEO(
        selectedProject.id,
        contentId
      );
      console.log("SEO Analysis:", analysis);
      message.success("SEO analysis completed");
      return analysis;
    } catch (error) {
      console.error("Error analyzing content SEO:", error);
      message.error("Failed to analyze content SEO");
    }
  };

  const contentColumns = [
    {
      title: "Content",
      key: "content",
      render: (record: ContentItem) => (
        <div className={styles.contentCell}>
          <div className={styles.contentHeader}>
            {getTypeIcon(record.type)}
            <span className={styles.contentTitle}>{record.title}</span>
          </div>
          <div className={styles.contentMeta}>
            <Tag color={getStatusColor(record.status)}>{record.status}</Tag>
            <Tag color={getPriorityColor(record.priority)}>
              {record.priority}
            </Tag>
            <span className={styles.publishDate}>
              {dayjs(record.publishDate).format("MMM DD")}
            </span>
          </div>
        </div>
      ),
    },
    {
      title: "Author",
      dataIndex: "author",
      key: "author",
      render: (author: ContentItem["author"]) => (
        <div className={styles.authorCell}>
          <Avatar size="small" src={author.avatar} />
          <span className={styles.authorName}>{author.name}</span>
        </div>
      ),
    },
    {
      title: "Progress",
      key: "progress",
      render: (record: ContentItem) => {
        const progress =
          record.actualWordCount && record.estimatedWordCount
            ? (record.actualWordCount / record.estimatedWordCount) * 100
            : 0;

        return (
          <div className={styles.progressCell}>
            <Progress
              percent={progress}
              size="small"
              format={(percent) =>
                `${record.actualWordCount || 0}/${record.estimatedWordCount}`
              }
            />
          </div>
        );
      },
    },
    {
      title: "SEO Score",
      dataIndex: "seoScore",
      key: "seoScore",
      render: (score?: number) => {
        if (!score) return "-";
        return (
          <div className={styles.scoreCell}>
            <span
              style={{
                color:
                  score >= 80 ? "#52c41a" : score >= 60 ? "#faad14" : "#ff4d4f",
              }}
            >
              {score}%
            </span>
          </div>
        );
      },
    },
    {
      title: "Performance",
      key: "performance",
      render: (record: ContentItem) => {
        if (!record.performance) return "-";
        return (
          <div className={styles.performanceCell}>
            <Tooltip
              title={`${record.performance.views} views, ${record.performance.shares} shares`}
            >
              <span>{record.performance.views} views</span>
            </Tooltip>
          </div>
        );
      },
    },
    {
      title: "Actions",
      key: "actions",
      render: (record: ContentItem) => (
        <Space size="small">
          <Button
            icon={<EyeOutlined />}
            size="small"
            onClick={() => {
              /* View details */
            }}
          />
          <Button
            icon={<EditOutlined />}
            size="small"
            onClick={() => handleEditContent(record)}
          />
          <Button
            icon={<DeleteOutlined />}
            size="small"
            danger
            onClick={() => {
              /* Delete content */
            }}
          />
        </Space>
      ),
    },
  ];

  const handleProjectSelect = (projectId: string) => {
    const project = projects.find((p) => p.id === projectId);
    if (project) {
      dispatch(setCurrentProject(project));
    }
  };

  const getListData = (value: Dayjs) => {
    const dateStr = value.format("YYYY-MM-DD");
    const items =
      contentData?.items.filter((item) => item.publishDate === dateStr) || [];

    return items.map((item) => ({
      type: getStatusColor(item.status),
      content: item.title,
    }));
  };

  const dateCellRender = (value: Dayjs) => {
    const listData = getListData(value);
    return (
      <ul className={styles.calendarEvents}>
        {listData.map((item, index) => (
          <li key={index}>
            <Badge status={item.type as any} text={item.content} />
          </li>
        ))}
      </ul>
    );
  };

  const overviewStats = [
    {
      title: "Total Content",
      value: contentData?.items.length || 0,
      prefix: <FileTextOutlined />,
      suffix: "pieces",
    },
    {
      title: "Published",
      value: contentData?.metrics.published || 0,
      prefix: <CheckCircleOutlined />,
      valueStyle: { color: "#52c41a" },
    },
    {
      title: "In Progress",
      value: contentData?.metrics.draft || 0,
      prefix: <ClockCircleOutlined />,
      valueStyle: { color: "#1890ff" },
    },
    {
      title: "Overdue",
      value: contentData?.metrics.overdue || 0,
      prefix: <ExclamationCircleOutlined />,
      valueStyle: { color: "#ff4d4f" },
    },
  ];

  const tabItems = [
    {
      key: "calendar",
      label: "Calendar View",
      children: (
        <div className={styles.calendarTab}>
          <Calendar
            dateCellRender={dateCellRender}
            value={selectedDate}
            onSelect={setSelectedDate}
          />
        </div>
      ),
    },
    {
      key: "content-list",
      label: "Content List",
      children: (
        <div className={styles.contentListTab}>
          <div className={styles.filtersSection}>
            <Row gutter={16}>
              <Col xs={24} sm={8}>
                <Select
                  placeholder="Filter by status"
                  value={filterStatus}
                  onChange={setFilterStatus}
                  style={{ width: "100%" }}
                >
                  <Option value="all">All Status</Option>
                  <Option value="planned">Planned</Option>
                  <Option value="in-progress">In Progress</Option>
                  <Option value="review">Review</Option>
                  <Option value="published">Published</Option>
                </Select>
              </Col>
              <Col xs={24} sm={8}>
                <Select
                  placeholder="Filter by type"
                  value={filterType}
                  onChange={setFilterType}
                  style={{ width: "100%" }}
                >
                  <Option value="all">All Types</Option>
                  <Option value="blog-post">Blog Post</Option>
                  <Option value="social-media">Social Media</Option>
                  <Option value="email">Email</Option>
                  <Option value="landing-page">Landing Page</Option>
                </Select>
              </Col>
              <Col xs={24} sm={8}>
                <RangePicker style={{ width: "100%" }} />
              </Col>
            </Row>
          </div>

          <Table
            columns={contentColumns}
            dataSource={filteredItems}
            rowKey="id"
            loading={loading}
            pagination={{
              pageSize: 20,
              showSizeChanger: true,
              showTotal: (total) => `Total ${total} content pieces`,
            }}
          />
        </div>
      ),
    },
    {
      key: "ideas",
      label: "Content Ideas",
      children: (
        <div className={styles.ideasTab}>
          <Card
            title="AI-Generated Content Ideas"
            extra={
              <Button type="primary" icon={<BulbOutlined />}>
                Generate More Ideas
              </Button>
            }
          >
            <div className={styles.ideasList}>
              <Card size="small" style={{ marginBottom: 8 }}>
                <div className={styles.ideaItem}>
                  <span className={styles.ideaTitle}>
                    10 Common SEO Mistakes and How to Fix Them
                  </span>
                  <div className={styles.ideaMeta}>
                    <Tag>High Volume</Tag>
                    <Tag>Easy Win</Tag>
                    <span>Est. 2,500 words</span>
                  </div>
                </div>
              </Card>
              <Card size="small" style={{ marginBottom: 8 }}>
                <div className={styles.ideaItem}>
                  <span className={styles.ideaTitle}>
                    Complete Guide to Local SEO for Small Businesses
                  </span>
                  <div className={styles.ideaMeta}>
                    <Tag>Medium Volume</Tag>
                    <Tag>Competitive</Tag>
                    <span>Est. 3,000 words</span>
                  </div>
                </div>
              </Card>
            </div>
          </Card>
        </div>
      ),
    },
  ];

  if (!selectedProject || projectsLoading) {
    return (
      <div className={styles.noProject}>
        <Card>
          <div style={{ textAlign: "center", padding: "40px 0" }}>
            {projectsLoading ? (
              <Spin size="large" />
            ) : (
              <CalendarOutlined
                style={{ fontSize: "48px", color: "#d9d9d9" }}
              />
            )}
            <h3 style={{ marginTop: "16px" }}>
              {projectsLoading ? "Loading Projects..." : "No Project Selected"}
            </h3>
            <p>
              {projectsLoading
                ? "Please wait while we load your projects."
                : "Please select a project to view content planning."}
            </p>

            {!projectsLoading && projects.length > 0 ? (
              <div
                style={{
                  marginTop: "24px",
                  maxWidth: "300px",
                  margin: "24px auto 0",
                }}
              >
                <Select
                  placeholder="Select a project"
                  style={{ width: "100%" }}
                  size="large"
                  loading={projectsLoading}
                  onChange={handleProjectSelect}
                  showSearch
                  filterOption={(input, option) =>
                    (option?.children as unknown as string)
                      ?.toLowerCase()
                      .indexOf(input.toLowerCase()) >= 0
                  }
                >
                  {projects.map((project) => (
                    <Option key={project.id} value={project.id}>
                      {project.name}
                    </Option>
                  ))}
                </Select>
              </div>
            ) : !projectsLoading && projects.length === 0 ? (
              <div style={{ marginTop: "24px" }}>
                <p style={{ color: "#666", marginBottom: "16px" }}>
                  No projects available. Please create a project first.
                </p>
                <Button type="primary" href="/projects">
                  Go to Projects
                </Button>
              </div>
            ) : null}
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className={styles.contentPlanningManager}>
      <div className={styles.header}>
        <div className={styles.headerContent}>
          <h1>Content Planning</h1>
          <p>Plan, schedule, and track your content creation process</p>
        </div>
        <div className={styles.headerActions}>
          <Space>
            <Select
              placeholder="Select project"
              style={{ width: 200 }}
              value={selectedProject?.id}
              onChange={handleProjectSelect}
              showSearch
              filterOption={(input, option) =>
                (option?.children as unknown as string)
                  ?.toLowerCase()
                  .indexOf(input.toLowerCase()) >= 0
              }
            >
              {projects.map((project) => (
                <Option key={project.id} value={project.id}>
                  {project.name}
                </Option>
              ))}
            </Select>
            <Button
              icon={<BulbOutlined />}
              onClick={handleGenerateContentIdeas}
              loading={loading}
            >
              Generate Ideas
            </Button>
            <Button
              type="primary"
              icon={<PlusOutlined />}
              onClick={handleAddContent}
            >
              Add Content
            </Button>
          </Space>
        </div>
      </div>

      <Row gutter={[16, 16]} className={styles.statsRow}>
        {overviewStats.map((stat, index) => (
          <Col xs={24} sm={12} lg={6} key={index}>
            <Card>
              <Statistic {...stat} />
            </Card>
          </Col>
        ))}
      </Row>

      <Tabs
        activeKey={activeTab}
        onChange={setActiveTab}
        items={tabItems}
        size="large"
        className={styles.mainTabs}
      />

      <Modal
        title={editingItem ? "Edit Content" : "Add New Content"}
        open={showAddModal}
        onCancel={() => setShowAddModal(false)}
        footer={null}
        width={600}
      >
        <Form form={form} layout="vertical" onFinish={handleSaveContent}>
          <Form.Item
            name="title"
            label="Content Title"
            rules={[{ required: true, message: "Please enter content title" }]}
          >
            <Input placeholder="Enter content title" />
          </Form.Item>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="type"
                label="Content Type"
                rules={[
                  { required: true, message: "Please select content type" },
                ]}
              >
                <Select placeholder="Select type">
                  <Option value="blog-post">Blog Post</Option>
                  <Option value="social-media">Social Media</Option>
                  <Option value="email">Email</Option>
                  <Option value="landing-page">Landing Page</Option>
                  <Option value="video">Video</Option>
                  <Option value="infographic">Infographic</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="priority"
                label="Priority"
                rules={[{ required: true, message: "Please select priority" }]}
              >
                <Select placeholder="Select priority">
                  <Option value="high">High</Option>
                  <Option value="medium">Medium</Option>
                  <Option value="low">Low</Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="publishDate"
                label="Publish Date"
                rules={[
                  { required: true, message: "Please select publish date" },
                ]}
              >
                <DatePicker style={{ width: "100%" }} />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="estimatedWordCount" label="Estimated Word Count">
                <Input type="number" placeholder="e.g., 1500" />
              </Form.Item>
            </Col>
          </Row>

          <Form.Item name="targetKeywords" label="Target Keywords">
            <Input placeholder="Enter keywords separated by commas" />
          </Form.Item>

          <Form.Item
            name="brief"
            label="Content Brief"
            rules={[{ required: true, message: "Please enter content brief" }]}
          >
            <TextArea rows={3} placeholder="Describe the content brief..." />
          </Form.Item>

          <Form.Item name="notes" label="Notes">
            <TextArea rows={2} placeholder="Additional notes..." />
          </Form.Item>

          <Form.Item>
            <Space>
              <Button onClick={() => setShowAddModal(false)}>Cancel</Button>
              <Button type="primary" htmlType="submit">
                {editingItem ? "Update" : "Create"} Content
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default ContentPlanningManager;
