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
import { useSelector } from "react-redux";
import { RootState } from "@/stores/store";
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
  const selectedProject = useSelector(
    (state: RootState) => state.project.currentProject
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

  // Mock data for content planning
  const mockContentData: ContentCalendar = {
    month: dayjs().format("YYYY-MM"),
    metrics: {
      planned: 12,
      published: 8,
      draft: 4,
      overdue: 2,
    },
    items: [
      {
        id: "1",
        title: "Ultimate Guide to SEO in 2025",
        type: "blog-post",
        status: "in-progress",
        priority: "high",
        publishDate: dayjs().add(2, "days").format("YYYY-MM-DD"),
        author: {
          name: "John Smith",
          avatar: "/avatar1.jpg",
        },
        targetKeywords: [
          "seo guide 2025",
          "search engine optimization",
          "seo tips",
        ],
        estimatedWordCount: 3000,
        actualWordCount: 2100,
        brief:
          "Comprehensive guide covering all SEO fundamentals and advanced techniques for 2025",
        notes: "Include case studies and real examples",
        tags: ["SEO", "Guide", "Tutorial"],
        seoScore: 85,
        readabilityScore: 78,
      },
      {
        id: "2",
        title: "5 Content Marketing Trends to Watch",
        type: "blog-post",
        status: "planned",
        priority: "medium",
        publishDate: dayjs().add(5, "days").format("YYYY-MM-DD"),
        author: {
          name: "Sarah Johnson",
          avatar: "/avatar2.jpg",
        },
        targetKeywords: ["content marketing trends", "digital marketing 2025"],
        estimatedWordCount: 1500,
        brief:
          "Explore emerging trends in content marketing for the coming year",
        notes: "Research competitor strategies",
        tags: ["Content Marketing", "Trends", "Strategy"],
      },
      {
        id: "3",
        title: "How to Optimize Your Website Speed",
        type: "blog-post",
        status: "published",
        priority: "high",
        publishDate: dayjs().subtract(3, "days").format("YYYY-MM-DD"),
        author: {
          name: "Mike Wilson",
          avatar: "/avatar3.jpg",
        },
        targetKeywords: [
          "website speed optimization",
          "page speed",
          "site performance",
        ],
        estimatedWordCount: 2000,
        actualWordCount: 2200,
        brief: "Technical guide on improving website loading times",
        notes: "Include tool recommendations",
        tags: ["Technical SEO", "Performance", "Tutorial"],
        seoScore: 92,
        readabilityScore: 82,
        performance: {
          views: 1250,
          shares: 48,
          engagement: 15.2,
        },
      },
      {
        id: "4",
        title: "Social Media ROI Calculator",
        type: "landing-page",
        status: "review",
        priority: "medium",
        publishDate: dayjs().add(1, "day").format("YYYY-MM-DD"),
        author: {
          name: "Emily Chen",
          avatar: "/avatar4.jpg",
        },
        targetKeywords: ["social media roi", "social media calculator"],
        estimatedWordCount: 800,
        actualWordCount: 750,
        brief:
          "Interactive tool for calculating social media return on investment",
        notes: "Coordinate with development team",
        tags: ["Social Media", "Tool", "ROI"],
        seoScore: 76,
      },
    ],
  };

  useEffect(() => {
    if (selectedProject) {
      setLoading(true);
      // Simulate API call
      setTimeout(() => {
        setContentData(mockContentData);
        setLoading(false);
      }, 1000);
    }
  }, [selectedProject]);

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
    try {
      // Simulate API call
      const newItem: ContentItem = {
        id: editingItem?.id || Date.now().toString(),
        ...values,
        publishDate: values.publishDate.format("YYYY-MM-DD"),
        targetKeywords: values.targetKeywords
          .split(",")
          .map((k: string) => k.trim()),
        author: editingItem?.author || {
          name: "Current User",
          avatar: "/avatar.jpg",
        },
        tags: values.tags || [],
      };

      if (editingItem) {
        // Update existing item
        message.success("Content updated successfully");
      } else {
        // Add new item
        message.success("Content created successfully");
      }

      setShowAddModal(false);
      form.resetFields();
    } catch (error) {
      message.error("Failed to save content");
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

  if (!selectedProject) {
    return (
      <div className={styles.noProject}>
        <Card>
          <div style={{ textAlign: "center", padding: "40px 0" }}>
            <CalendarOutlined style={{ fontSize: "48px", color: "#d9d9d9" }} />
            <h3>No Project Selected</h3>
            <p>Please select a project to view content planning.</p>
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
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={handleAddContent}
          >
            Add Content
          </Button>
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
