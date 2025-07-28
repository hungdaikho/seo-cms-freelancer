"use client";

import React, { useEffect, useState } from "react";
import {
  Table,
  Card,
  Button,
  Input,
  Space,
  Tag,
  Select,
  Modal,
  Form,
  Typography,
  Row,
  Col,
  Statistic,
  Tooltip,
  Popconfirm,
  Badge,
  Progress,
  Dropdown,
  Menu,
  Avatar,
  message,
} from "antd";
import {
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  EyeOutlined,
  CopyOutlined,
  MoreOutlined,
  FileTextOutlined,
  CalendarOutlined,
  UserOutlined,
  SearchOutlined,
  FilterOutlined,
} from "@ant-design/icons";
import { useAppDispatch, useAppSelector } from "@/stores/hooks";
import { fetchProjects } from "@/stores/slices/project.slice";
import {
  fetchContentItems,
  fetchContentCategories,
  createContentItem,
  updateContentItem,
  deleteContentItem,
  setFilters,
  setPagination,
  setCurrentItem,
  ContentItem,
  CreateContentRequest,
  UpdateContentRequest,
} from "@/stores/slices/content.slice";
import { Project } from "@/types/api.type";
import styles from "./content_manager.module.scss";

const { Title, Text, Paragraph } = Typography;
const { Option } = Select;
const { TextArea } = Input;
const { Search } = Input;

const ContentManager: React.FC = () => {
  const dispatch = useAppDispatch();
  const { projects } = useAppSelector((state) => state.project);
  const {
    items,
    categories,
    currentItem,
    loading,
    error,
    filters,
    pagination,
    stats,
  } = useAppSelector((state) => state.content);

  const [form] = Form.useForm();
  const [isCreateModalVisible, setIsCreateModalVisible] = useState(false);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [editingItem, setEditingItem] = useState<ContentItem | null>(null);
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
      loadContentItems();
      dispatch(fetchContentCategories());
    }
  }, [selectedProject, filters, pagination.page, pagination.limit]);

  useEffect(() => {
    if (error) {
      message.error(error);
    }
  }, [error]);

  const loadContentItems = () => {
    if (!selectedProject) return;

    dispatch(
      fetchContentItems({
        projectId: selectedProject,
        filters,
        pagination: {
          page: pagination.page,
          limit: pagination.limit,
        },
      })
    );
  };

  const handleCreateContent = async (values: any) => {
    try {
      if (!selectedProject) {
        message.error("Please select a project first");
        return;
      }

      const createData: CreateContentRequest & { projectId: string } = {
        title: values.title,
        content: values.content,
        excerpt: values.excerpt,
        type: values.type,
        status: values.status || "draft",
        categories: values.categories,
        tags: values.tags?.split(",").map((tag: string) => tag.trim()) || [],
        seoData: {
          metaTitle: values.metaTitle,
          metaDescription: values.metaDescription,
          focusKeyword: values.focusKeyword,
        },
        featuredImage: values.featuredImage,
        projectId: selectedProject,
      };

      await dispatch(createContentItem(createData)).unwrap();
      setIsCreateModalVisible(false);
      form.resetFields();
      message.success("Content created successfully");
    } catch (error) {
      // Error handled by slice
    }
  };

  const handleEditContent = async (values: any) => {
    if (!editingItem || !selectedProject) return;

    try {
      const updateData: UpdateContentRequest = {
        title: values.title,
        content: values.content,
        excerpt: values.excerpt,
        status: values.status,
        categories: values.categories,
        tags: values.tags?.split(",").map((tag: string) => tag.trim()) || [],
        seoData: {
          metaTitle: values.metaTitle,
          metaDescription: values.metaDescription,
          focusKeyword: values.focusKeyword,
        },
        featuredImage: values.featuredImage,
      };

      await dispatch(
        updateContentItem({ 
          id: editingItem.id, 
          data: updateData,
          projectId: selectedProject 
        })
      ).unwrap();
      setIsEditModalVisible(false);
      setEditingItem(null);
      form.resetFields();
      message.success("Content updated successfully");
    } catch (error) {
      // Error handled by slice
    }
  };

  const handleDeleteContent = async (id: string) => {
    try {
      await dispatch(deleteContentItem(id)).unwrap();
      message.success("Content deleted successfully");
    } catch (error) {
      // Error handled by slice
    }
  };

  const openEditModal = (item: ContentItem) => {
    setEditingItem(item);
    form.setFieldsValue({
      title: item.title,
      content: item.content,
      excerpt: item.excerpt,
      type: item.type,
      status: item.status,
      categories: item.categories,
      tags: item.tags.join(", "),
      metaTitle: item.seoData.metaTitle,
      metaDescription: item.seoData.metaDescription,
      focusKeyword: item.seoData.focusKeyword,
      featuredImage: item.featuredImage,
    });
    setIsEditModalVisible(true);
  };

  const handleSearch = (value: string) => {
    dispatch(setFilters({ search: value }));
    dispatch(setPagination({ page: 1 }));
  };

  const handleFilterChange = (key: string, value: any) => {
    dispatch(setFilters({ [key]: value }));
    dispatch(setPagination({ page: 1 }));
  };

  const getStatusColor = (status: ContentItem["status"]) => {
    switch (status) {
      case "published":
        return "green";
      case "draft":
        return "orange";
      case "scheduled":
        return "blue";
      case "archived":
        return "red";
      default:
        return "default";
    }
  };

  const getTypeIcon = (type: ContentItem["type"]) => {
    switch (type) {
      case "post":
        return <FileTextOutlined />;
      case "page":
        return <FileTextOutlined />;
      case "landing-page":
        return <FileTextOutlined />;
      case "product":
        return <FileTextOutlined />;
      default:
        return <FileTextOutlined />;
    }
  };

  const getSeoScoreColor = (score: number) => {
    if (score >= 80) return "#52c41a";
    if (score >= 60) return "#fa8c16";
    return "#ff4d4f";
  };

  const getMoreActions = (record: ContentItem) => (
    <Menu>
      <Menu.Item key="view" icon={<EyeOutlined />}>
        View
      </Menu.Item>
      <Menu.Item key="duplicate" icon={<CopyOutlined />}>
        Duplicate
      </Menu.Item>
      <Menu.Item key="archive" disabled={record.status === "archived"}>
        Archive
      </Menu.Item>
    </Menu>
  );

  const columns = [
    {
      title: "Content",
      key: "content",
      width: 300,
      render: (_: any, record: ContentItem) => (
        <div className={styles.contentCell}>
          <div className={styles.contentHeader}>
            <Space>
              {getTypeIcon(record.type)}
              <Text strong className={styles.contentTitle} ellipsis>
                {record.title}
              </Text>
            </Space>
          </div>
          <Text type="secondary" className={styles.contentExcerpt}>
            {record.excerpt}
          </Text>
          <div className={styles.contentMeta}>
            <Space size="small">
              <Text type="secondary" style={{ fontSize: "12px" }}>
                {record.wordCount} words
              </Text>
              <Text type="secondary" style={{ fontSize: "12px" }}>
                {record.readingTime} min read
              </Text>
            </Space>
          </div>
        </div>
      ),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      width: 120,
      render: (status: ContentItem["status"]) => (
        <Tag color={getStatusColor(status)}>
          {status.charAt(0) + status.slice(1)}
        </Tag>
      ),
    },
    {
      title: "Type",
      dataIndex: "type",
      key: "type",
      width: 120,
      render: (type: ContentItem["type"]) => (
        <Text>{type.charAt(0) + type.slice(1)}</Text>
      ),
    },
    {
      title: "Author",
      dataIndex: "author",
      key: "author",
      width: 150,
      render: (author: ContentItem["author"]) => (
        <Space>
          <Avatar size="small" icon={<UserOutlined />} src={author.avatar} />
          <Text>{author.name}</Text>
        </Space>
      ),
    },
    {
      title: "SEO Score",
      key: "seoScore",
      width: 120,
      render: (_: any, record: ContentItem) => (
        <div className={styles.seoScore}>
          <Progress
            type="circle"
            size={40}
            percent={record.seoData.seoScore || 0}
            strokeColor={getSeoScoreColor(record.seoData.seoScore || 0)}
            format={(percent) => `${percent}`}
          />
        </div>
      ),
    },
    {
      title: "Categories",
      dataIndex: "categories",
      key: "categories",
      width: 150,
      render: (categories: string[]) => (
        <div>
          {categories.slice(0, 2).map((category) => (
            <Tag key={category}>{category}</Tag>
          ))}
          {categories.length > 2 && (
            <Text type="secondary">+{categories.length - 2}</Text>
          )}
        </div>
      ),
    },
    {
      title: "Updated",
      dataIndex: "updatedAt",
      key: "updatedAt",
      width: 120,
      render: (date: string) => (
        <Text type="secondary">{new Date(date).toLocaleDateString()}</Text>
      ),
    },
    {
      title: "Actions",
      key: "actions",
      width: 120,
      render: (_: any, record: ContentItem) => (
        <Space size="small">
          <Tooltip title="Edit">
            <Button
              icon={<EditOutlined />}
              size="small"
              onClick={() => openEditModal(record)}
            />
          </Tooltip>
          <Popconfirm
            title="Delete Content"
            description="Are you sure you want to delete this content?"
            onConfirm={() => handleDeleteContent(record.id)}
            okText="Yes"
            cancelText="No"
          >
            <Tooltip title="Delete">
              <Button icon={<DeleteOutlined />} size="small" danger />
            </Tooltip>
          </Popconfirm>
          <Dropdown overlay={getMoreActions(record)} trigger={["click"]}>
            <Button icon={<MoreOutlined />} size="small" />
          </Dropdown>
        </Space>
      ),
    },
  ];

  return (
    <div className={styles.contentManager}>
      {/* Header */}
      <div className={styles.header}>
        <div className={styles.titleSection}>
          <Title level={3}>Content Management</Title>
          <Text type="secondary">Create and manage your content library</Text>
        </div>
        <div className={styles.headerActions}>
          <Select
            placeholder="Select a project"
            style={{ width: 250, marginRight: 16 }}
            value={selectedProject}
            onChange={setSelectedProject}
            disabled={projects.length === 0}
          >
            {projects.map((project: Project) => (
              <Option key={project.id} value={project.id}>
                {project.name} ({project.domain})
              </Option>
            ))}
          </Select>
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={() => setIsCreateModalVisible(true)}
            disabled={!selectedProject}
          >
            Create Content
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <Row gutter={16} className={styles.statsRow}>
        <Col span={6}>
          <Card>
            <Statistic
              title="Total Content"
              value={stats.totalItems}
              prefix={<FileTextOutlined />}
              valueStyle={{ color: "#1890ff" }}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="Published"
              value={stats.published}
              valueStyle={{ color: "#52c41a" }}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="Draft"
              value={stats.draft}
              valueStyle={{ color: "#fa8c16" }}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="Avg. SEO Score"
              value={stats.avgSeoScore.toFixed(0)}
              suffix="/100"
              valueStyle={{
                color: getSeoScoreColor(stats.avgSeoScore),
              }}
            />
          </Card>
        </Col>
      </Row>

      {/* Filters */}
      <Card className={styles.filtersCard}>
        <Row gutter={16} align="middle">
          <Col span={8}>
            <Search
              placeholder="Search content..."
              onSearch={handleSearch}
              allowClear
            />
          </Col>
          <Col span={4}>
            <Select
              placeholder="Status"
              style={{ width: "100%" }}
              value={filters.status}
              onChange={(value) => handleFilterChange("status", value)}
            >
              <Option value="all">All Status</Option>
              <Option value="published">Published</Option>
              <Option value="draft">Draft</Option>
              <Option value="scheduled">Scheduled</Option>
              <Option value="archived">Archived</Option>
            </Select>
          </Col>
          <Col span={4}>
            <Select
              placeholder="Type"
              style={{ width: "100%" }}
              value={filters.type}
              onChange={(value) => handleFilterChange("type", value)}
            >
              <Option value="all">All Types</Option>
              <Option value="post">Post</Option>
              <Option value="page">Page</Option>
              <Option value="landing-page">Landing Page</Option>
              <Option value="product">Product</Option>
            </Select>
          </Col>
          <Col span={4}>
            <Select
              placeholder="Category"
              style={{ width: "100%" }}
              value={filters.category}
              onChange={(value) => handleFilterChange("category", value)}
              allowClear
            >
              {categories.map((category) => (
                <Option key={category.id} value={category.name}>
                  {category.name}
                </Option>
              ))}
            </Select>
          </Col>
          <Col span={4}>
            <Select
              placeholder="Sort by"
              style={{ width: "100%" }}
              value={filters.sortBy}
              onChange={(value) => handleFilterChange("sortBy", value)}
            >
              <Option value="updatedAt">Updated Date</Option>
              <Option value="createdAt">Created Date</Option>
              <Option value="publishedAt">Published Date</Option>
              <Option value="title">Title</Option>
              <Option value="wordCount">Word Count</Option>
            </Select>
          </Col>
        </Row>
      </Card>

      {/* Content Table */}
      <Card>
        <Table
          columns={columns}
          dataSource={items}
          rowKey="id"
          loading={loading}
          pagination={{
            current: pagination.page,
            pageSize: pagination.limit,
            total: pagination.total,
            showSizeChanger: true,
            showQuickJumper: true,
            showTotal: (total, range) =>
              `${range[0]}-${range[1]} of ${total} items`,
            onChange: (page, pageSize) =>
              dispatch(setPagination({ page, limit: pageSize })),
          }}
          scroll={{ x: 1400 }}
        />
      </Card>

      {/* Create Content Modal */}
      <Modal
        title="Create New Content"
        open={isCreateModalVisible}
        onCancel={() => {
          setIsCreateModalVisible(false);
          form.resetFields();
        }}
        footer={null}
        width={800}
      >
        <Form form={form} layout="vertical" onFinish={handleCreateContent}>
          <Form.Item
            name="title"
            label="Title"
            rules={[{ required: true, message: "Please enter title" }]}
          >
            <Input placeholder="Enter content title" />
          </Form.Item>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="type"
                label="Type"
                rules={[{ required: true, message: "Please select type" }]}
              >
                <Select placeholder="Select content type">
                  <Option value="post">Post</Option>
                  <Option value="page">Page</Option>
                  <Option value="landing-page">Landing Page</Option>
                  <Option value="product">Product</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="status" label="Status" initialValue="draft">
                <Select>
                  <Option value="draft">Draft</Option>
                  <Option value="published">Published</Option>
                  <Option value="scheduled">Scheduled</Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>

          <Form.Item name="excerpt" label="Excerpt">
            <TextArea rows={3} placeholder="Brief description..." />
          </Form.Item>

          <Form.Item
            name="content"
            label="Content"
            rules={[{ required: true, message: "Please enter content" }]}
          >
            <TextArea rows={8} placeholder="Write your content here..." />
          </Form.Item>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item name="categories" label="Categories">
                <Select mode="multiple" placeholder="Select categories">
                  {categories.map((category) => (
                    <Option key={category.id} value={category.name}>
                      {category.name}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="tags" label="Tags">
                <Input placeholder="Enter tags separated by commas" />
              </Form.Item>
            </Col>
          </Row>

          {/* SEO Section */}
          <Title level={5}>SEO Settings</Title>
          <Form.Item name="metaTitle" label="Meta Title">
            <Input placeholder="SEO title" />
          </Form.Item>

          <Form.Item name="metaDescription" label="Meta Description">
            <TextArea rows={2} placeholder="SEO description" />
          </Form.Item>

          <Form.Item name="focusKeyword" label="Focus Keyword">
            <Input placeholder="Primary keyword" />
          </Form.Item>

          <Form.Item>
            <Space>
              <Button type="primary" htmlType="submit" loading={loading}>
                Create Content
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

      {/* Edit Content Modal */}
      <Modal
        title="Edit Content"
        open={isEditModalVisible}
        onCancel={() => {
          setIsEditModalVisible(false);
          setEditingItem(null);
          form.resetFields();
        }}
        footer={null}
        width={800}
      >
        <Form form={form} layout="vertical" onFinish={handleEditContent}>
          <Form.Item
            name="title"
            label="Title"
            rules={[{ required: true, message: "Please enter title" }]}
          >
            <Input placeholder="Enter content title" />
          </Form.Item>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="type"
                label="Type"
                rules={[{ required: true, message: "Please select type" }]}
              >
                <Select placeholder="Select content type">
                  <Option value="post">Post</Option>
                  <Option value="page">Page</Option>
                  <Option value="landing-page">Landing Page</Option>
                  <Option value="product">Product</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="status" label="Status">
                <Select>
                  <Option value="draft">Draft</Option>
                  <Option value="published">Published</Option>
                  <Option value="scheduled">Scheduled</Option>
                  <Option value="archived">Archived</Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>

          <Form.Item name="excerpt" label="Excerpt">
            <TextArea rows={3} placeholder="Brief description..." />
          </Form.Item>

          <Form.Item
            name="content"
            label="Content"
            rules={[{ required: true, message: "Please enter content" }]}
          >
            <TextArea rows={8} placeholder="Write your content here..." />
          </Form.Item>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item name="categories" label="Categories">
                <Select mode="multiple" placeholder="Select categories">
                  {categories.map((category) => (
                    <Option key={category.id} value={category.name}>
                      {category.name}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="tags" label="Tags">
                <Input placeholder="Enter tags separated by commas" />
              </Form.Item>
            </Col>
          </Row>

          {/* SEO Section */}
          <Title level={5}>SEO Settings</Title>
          <Form.Item name="metaTitle" label="Meta Title">
            <Input placeholder="SEO title" />
          </Form.Item>

          <Form.Item name="metaDescription" label="Meta Description">
            <TextArea rows={2} placeholder="SEO description" />
          </Form.Item>

          <Form.Item name="focusKeyword" label="Focus Keyword">
            <Input placeholder="Primary keyword" />
          </Form.Item>

          <Form.Item>
            <Space>
              <Button type="primary" htmlType="submit" loading={loading}>
                Update Content
              </Button>
              <Button
                onClick={() => {
                  setIsEditModalVisible(false);
                  setEditingItem(null);
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

export default ContentManager;
