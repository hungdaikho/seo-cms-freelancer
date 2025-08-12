"use client";

import React, { useEffect, useState } from "react";
import {
  Card,
  Button,
  Table,
  Space,
  Input,
  Select,
  Tag,
  Dropdown,
  Modal,
  message,
  Typography,
  Row,
  Col,
  Statistic,
  Spin,
  Empty,
  Tooltip,
  Upload,
} from "antd";
import {
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  CopyOutlined,
  DownloadOutlined,
  UploadOutlined,
  SearchOutlined,
  FilterOutlined,
  EyeOutlined,
  RobotOutlined,
  FileTextOutlined,
  MailOutlined,
  GlobalOutlined,
  ShareAltOutlined,
} from "@ant-design/icons";
import { useAppDispatch, useAppSelector } from "@/stores/hooks";
import {
  fetchTemplates,
  deleteTemplate,
  setFilters,
  clearFilters,
  setSelectedTemplate,
  exportTemplate,
  importTemplate,
} from "@/stores/slices/content-template.slice";
import {
  ContentTemplate,
  TemplateVariable,
} from "@/types/content-template.type";
import CreateTemplateModal from "./CreateTemplateModal";
import EditTemplateModal from "./EditTemplateModal";
import PreviewTemplateModal from "./PreviewTemplateModal";
import TemplateDetailsModal from "./TemplateDetailsModal";
import styles from "./ContentTemplateManager.module.scss";

const { Title, Text, Paragraph } = Typography;
const { Search } = Input;
const { Option } = Select;

interface ContentTemplateManagerProps {
  projectId: string;
}

const ContentTemplateManager: React.FC<ContentTemplateManagerProps> = ({
  projectId,
}) => {
  const dispatch = useAppDispatch();
  const { templates, loading, creating, updating, deleting, error, filters } =
    useAppSelector((state) => state.contentTemplate);

  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showPreviewModal, setShowPreviewModal] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [selectedTemplate, setSelectedTemplateLocal] =
    useState<ContentTemplate | null>(null);

  useEffect(() => {
    if (projectId) {
      dispatch(fetchTemplates(projectId));
    }
  }, [dispatch, projectId]);

  useEffect(() => {
    if (error) {
      message.error(error);
    }
  }, [error]);

  // Template type icons
  const getTemplateTypeIcon = (type: string) => {
    switch (type) {
      case "blog-post":
        return <FileTextOutlined />;
      case "landing-page":
        return <GlobalOutlined />;
      case "email":
        return <MailOutlined />;
      case "social-media":
        return <ShareAltOutlined />;
      default:
        return <FileTextOutlined />;
    }
  };

  // Template type colors
  const getTemplateTypeColor = (type: string) => {
    switch (type) {
      case "blog-post":
        return "blue";
      case "landing-page":
        return "green";
      case "email":
        return "orange";
      case "social-media":
        return "purple";
      default:
        return "default";
    }
  };

  // Handle template actions
  const handleEdit = (template: ContentTemplate) => {
    setSelectedTemplateLocal(template);
    dispatch(setSelectedTemplate(template));
    setShowEditModal(true);
  };

  const handlePreview = (template: ContentTemplate) => {
    setSelectedTemplateLocal(template);
    dispatch(setSelectedTemplate(template));
    setShowPreviewModal(true);
  };

  const handleViewDetails = (template: ContentTemplate) => {
    setSelectedTemplateLocal(template);
    dispatch(setSelectedTemplate(template));
    setShowDetailsModal(true);
  };

  const handleDelete = (template: ContentTemplate) => {
    Modal.confirm({
      title: "Delete Template",
      content: `Are you sure you want to delete "${template.name}"? This action cannot be undone.`,
      okText: "Delete",
      okType: "danger",
      cancelText: "Cancel",
      onOk: () => {
        dispatch(deleteTemplate({ projectId, templateId: template.id }));
      },
    });
  };

  const handleDuplicate = (template: ContentTemplate) => {
    const duplicatedTemplate = {
      ...template,
      name: `${template.name} (Copy)`,
    };
    // Remove id to create new template
    const { id, ...templateWithoutId } = duplicatedTemplate;
    setSelectedTemplateLocal(templateWithoutId as ContentTemplate);
    dispatch(setSelectedTemplate(templateWithoutId as ContentTemplate));
    setShowCreateModal(true);
  };

  const handleExport = (template: ContentTemplate) => {
    dispatch(exportTemplate({ projectId, templateId: template.id }));
  };

  const handleImport = (info: any) => {
    const { file } = info;
    if (file.status === "done") {
      dispatch(importTemplate({ projectId, file: file.originFileObj }));
      message.success("Template imported successfully");
    } else if (file.status === "error") {
      message.error("Failed to import template");
    }
  };

  // Filter templates
  const filteredTemplates = templates.filter((template) => {
    const matchesSearch =
      !filters.search ||
      template.name.toLowerCase().includes(filters.search.toLowerCase()) ||
      template.seoGuidelines.some((guideline) =>
        guideline.toLowerCase().includes(filters.search!.toLowerCase())
      );

    const matchesType = !filters.type || template.type === filters.type;

    return matchesSearch && matchesType;
  });

  // Table columns
  const columns = [
    {
      title: "Template Name",
      dataIndex: "name",
      key: "name",
      render: (text: string, record: ContentTemplate) => (
        <div className={styles.templateName}>
          <div className={styles.nameWithIcon}>
            {getTemplateTypeIcon(record.type)}
            <span className={styles.name}>{text}</span>
          </div>
          <div className={styles.metadata}>
            {record.variables.length} variables • {record.seoGuidelines.length}{" "}
            SEO guidelines
          </div>
        </div>
      ),
    },
    {
      title: "Type",
      dataIndex: "type",
      key: "type",
      render: (type: string) => (
        <Tag color={getTemplateTypeColor(type)}>
          {type.replace("-", " ").toUpperCase()}
        </Tag>
      ),
    },
    {
      title: "Word Count",
      key: "wordCount",
      render: (record: ContentTemplate) => (
        <Text type="secondary">
          {record.wordCountRange.min} - {record.wordCountRange.max} words
        </Text>
      ),
    },
    {
      title: "Variables",
      key: "variables",
      render: (record: ContentTemplate) => (
        <div className={styles.variables}>
          {record.variables.slice(0, 3).map((variable: TemplateVariable) => (
            <Tag key={variable.name}>{variable.name}</Tag>
          ))}
          {record.variables.length > 3 && (
            <Tag>+{record.variables.length - 3} more</Tag>
          )}
        </div>
      ),
    },
    {
      title: "Created",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (date: string) => (
        <Text type="secondary">{new Date(date).toLocaleDateString()}</Text>
      ),
    },
    {
      title: "Actions",
      key: "actions",
      render: (record: ContentTemplate) => (
        <Space size="small">
          <Tooltip title="View Details">
            <Button
              size="small"
              icon={<EyeOutlined />}
              onClick={() => handleViewDetails(record)}
            />
          </Tooltip>
          <Tooltip title="Preview">
            <Button
              size="small"
              icon={<SearchOutlined />}
              onClick={() => handlePreview(record)}
            />
          </Tooltip>
          <Dropdown
            menu={{
              items: [
                {
                  key: "edit",
                  label: "Edit",
                  icon: <EditOutlined />,
                  onClick: () => handleEdit(record),
                },
                {
                  key: "duplicate",
                  label: "Duplicate",
                  icon: <CopyOutlined />,
                  onClick: () => handleDuplicate(record),
                },
                {
                  key: "export",
                  label: "Export",
                  icon: <DownloadOutlined />,
                  onClick: () => handleExport(record),
                },
                {
                  type: "divider",
                },
                {
                  key: "delete",
                  label: "Delete",
                  icon: <DeleteOutlined />,
                  danger: true,
                  onClick: () => handleDelete(record),
                },
              ],
            }}
            trigger={["click"]}
          >
            <Button size="small" type="text">
              •••
            </Button>
          </Dropdown>
        </Space>
      ),
    },
  ];

  // Statistics
  const stats = {
    total: templates.length,
    blogPosts: templates.filter((t) => t.type === "blog-post").length,
    landingPages: templates.filter((t) => t.type === "landing-page").length,
    emails: templates.filter((t) => t.type === "email").length,
    socialMedia: templates.filter((t) => t.type === "social-media").length,
  };

  return (
    <div className={styles.contentTemplateManager}>
      {/* Header */}
      <div className={styles.header}>
        <div className={styles.titleSection}>
          <Title level={3}>Content Templates</Title>
          <Paragraph type="secondary">
            Create and manage SEO-optimized content templates for consistent
            content creation
          </Paragraph>
        </div>
        <Space>
          <Upload
            accept=".json"
            showUploadList={false}
            onChange={handleImport}
            beforeUpload={() => false}
          >
            <Button icon={<UploadOutlined />}>Import Template</Button>
          </Upload>
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={() => setShowCreateModal(true)}
            loading={creating}
          >
            Create Template
          </Button>
        </Space>
      </div>

      {/* Statistics */}
      <Row gutter={16} className={styles.stats}>
        <Col span={6}>
          <Card>
            <Statistic
              title="Total Templates"
              value={stats.total}
              prefix={<FileTextOutlined />}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="Blog Posts"
              value={stats.blogPosts}
              prefix={<FileTextOutlined />}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="Landing Pages"
              value={stats.landingPages}
              prefix={<GlobalOutlined />}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="Email Templates"
              value={stats.emails}
              prefix={<MailOutlined />}
            />
          </Card>
        </Col>
      </Row>

      {/* Filters */}
      <Card className={styles.filters}>
        <Row gutter={16} align="middle">
          <Col flex="auto">
            <Search
              placeholder="Search templates..."
              allowClear
              value={filters.search}
              onChange={(e) => dispatch(setFilters({ search: e.target.value }))}
              style={{ maxWidth: 400 }}
            />
          </Col>
          <Col>
            <Select
              placeholder="Filter by type"
              allowClear
              value={filters.type}
              onChange={(value) => dispatch(setFilters({ type: value }))}
              style={{ width: 200 }}
            >
              <Option value="blog-post">Blog Post</Option>
              <Option value="landing-page">Landing Page</Option>
              <Option value="email">Email</Option>
              <Option value="social-media">Social Media</Option>
            </Select>
          </Col>
          <Col>
            <Button
              icon={<FilterOutlined />}
              onClick={() => dispatch(clearFilters())}
            >
              Clear Filters
            </Button>
          </Col>
        </Row>
      </Card>

      {/* Templates Table */}
      <Card className={styles.templatesTable}>
        <Spin spinning={loading}>
          {filteredTemplates.length > 0 ? (
            <Table
              columns={columns}
              dataSource={filteredTemplates}
              rowKey="id"
              pagination={{
                pageSize: 10,
                showSizeChanger: true,
                showQuickJumper: true,
                showTotal: (total, range) =>
                  `${range[0]}-${range[1]} of ${total} templates`,
              }}
            />
          ) : (
            <Empty
              description="No templates found"
              image={Empty.PRESENTED_IMAGE_SIMPLE}
            >
              <Button
                type="primary"
                icon={<PlusOutlined />}
                onClick={() => setShowCreateModal(true)}
              >
                Create Your First Template
              </Button>
            </Empty>
          )}
        </Spin>
      </Card>

      {/* Modals */}
      <CreateTemplateModal
        visible={showCreateModal}
        onCancel={() => {
          setShowCreateModal(false);
          setSelectedTemplateLocal(null);
          dispatch(setSelectedTemplate(null));
        }}
        projectId={projectId}
        initialData={selectedTemplate}
      />

      <EditTemplateModal
        visible={showEditModal}
        onCancel={() => {
          setShowEditModal(false);
          setSelectedTemplateLocal(null);
          dispatch(setSelectedTemplate(null));
        }}
        projectId={projectId}
        template={selectedTemplate}
      />

      <PreviewTemplateModal
        visible={showPreviewModal}
        onCancel={() => {
          setShowPreviewModal(false);
          setSelectedTemplateLocal(null);
          dispatch(setSelectedTemplate(null));
        }}
        projectId={projectId}
        template={selectedTemplate}
      />

      <TemplateDetailsModal
        visible={showDetailsModal}
        onCancel={() => {
          setShowDetailsModal(false);
          setSelectedTemplateLocal(null);
          dispatch(setSelectedTemplate(null));
        }}
        template={selectedTemplate}
      />
    </div>
  );
};

export default ContentTemplateManager;
