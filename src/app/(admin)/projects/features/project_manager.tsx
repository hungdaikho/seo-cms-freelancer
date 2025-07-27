import React, { useEffect, useState } from "react";
import {
  Table,
  Button,
  Space,
  Modal,
  Form,
  Input,
  Select,
  message,
  Popconfirm,
  Card,
  Typography,
  Tooltip,
  Badge,
  Tag,
  Drawer,
} from "antd";
import {
  PlusOutlined,
  SettingOutlined,
  DeleteOutlined,
  EyeOutlined,
  EditOutlined,
  ShareAltOutlined,
  LinkOutlined,
} from "@ant-design/icons";
import { useProject } from "@/stores/hooks/useProject";
import {
  Project,
  CreateProjectRequest,
  UpdateProjectRequest,
} from "@/types/api.type";
import styles from "./project_manager.module.scss";

const { Title, Text } = Typography;
const { Option } = Select;

interface ProjectManagerProps {
  onProjectSelect?: (project: Project) => void;
}

const ProjectManager: React.FC<ProjectManagerProps> = ({ onProjectSelect }) => {
  const {
    projects,
    currentProject,
    projectStats,
    loading,
    error,
    pagination,
    createProject,
    fetchProjects,
    fetchProjectById,
    updateProject,
    deleteProject,
    fetchProjectStats,
    clearError,
    setCurrentProject,
  } = useProject();

  const [isCreateModalVisible, setIsCreateModalVisible] = useState(false);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [isStatsDrawerVisible, setIsStatsDrawerVisible] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [searchText, setSearchText] = useState("");
  const [form] = Form.useForm();

  useEffect(() => {
    loadProjects();
  }, []);

  useEffect(() => {
    if (error) {
      message.error(error);
      clearError();
    }
  }, [error]);

  const loadProjects = (params?: any) => {
    fetchProjects({
      page: params?.current || 1,
      limit: params?.pageSize || 10,
      search: searchText,
      ...params,
    });
  };

  const handleCreateProject = async (values: any) => {
    try {
      const projectData: CreateProjectRequest = {
        name: values.name,
        domain: values.domain,
        settings: {
          location: values.location,
          language: values.language,
        },
      };
      await createProject(projectData);
      message.success("Project created successfully!");
      setIsCreateModalVisible(false);
      form.resetFields();
      loadProjects();
    } catch (error) {
      // Error handled by Redux slice
    }
  };

  const handleEditProject = async (values: any) => {
    if (!editingProject) return;

    try {
      const projectData: UpdateProjectRequest = {
        name: values.name,
        domain: values.domain,
        settings: {
          location: values.location,
          language: values.language,
        },
      };
      await updateProject(editingProject.id, projectData);
      message.success("Project updated successfully!");
      setIsEditModalVisible(false);
      setEditingProject(null);
      form.resetFields();
      loadProjects();
    } catch (error) {
      // Error handled by Redux slice
    }
  };

  const handleDeleteProject = async (projectId: string) => {
    try {
      await deleteProject(projectId);
      message.success("Project deleted successfully!");
      loadProjects();
    } catch (error) {
      // Error handled by Redux slice
    }
  };

  const handleViewStats = async (project: Project) => {
    console.log(project);

    setCurrentProject(project);
    await fetchProjectStats(project.id);
    setIsStatsDrawerVisible(true);
  };

  const openEditModal = (project: Project) => {
    setEditingProject(project);
    form.setFieldsValue({
      name: project.name,
      domain: project.domain,
      location: project.settings?.location,
      language: project.settings?.language,
    });
    setIsEditModalVisible(true);
  };

  const columns = [
    {
      title: "Project Name",
      dataIndex: "name",
      key: "name",
      render: (text: string, record: Project) => (
        <div className={styles.projectCell}>
          <div className={styles.projectInfo}>
            <Title
              level={5}
              className={styles.projectName}
              style={{ cursor: onProjectSelect ? "pointer" : "default" }}
              onClick={() => onProjectSelect?.(record)}
            >
              {text}
            </Title>
            <div className={styles.domainInfo}>
              <LinkOutlined className={styles.linkIcon} />
              <Text type="secondary">{record.domain}</Text>
            </div>
          </div>
        </div>
      ),
    },
    {
      title: "Status",
      dataIndex: "isActive",
      key: "isActive",
      render: (isActive: boolean) => (
        <Tag color={isActive ? "green" : "red"}>
          {isActive ? "Active" : "Inactive"}
        </Tag>
      ),
    },
    {
      title: "Location",
      dataIndex: ["settings", "location"],
      key: "location",
      render: (location: string) => location || "-",
    },
    {
      title: "Language",
      dataIndex: ["settings", "language"],
      key: "language",
      render: (language: string) => language || "-",
    },
    {
      title: "Created",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (date: string) => new Date(date).toLocaleDateString(),
    },
    {
      title: "Actions",
      key: "actions",
      render: (_: any, record: Project) => (
        <Space size="small">
          <Tooltip title="View Statistics">
            <Button
              icon={<EyeOutlined />}
              size="small"
              onClick={() => handleViewStats(record)}
            />
          </Tooltip>
          <Tooltip title="Edit Project">
            <Button
              icon={<EditOutlined />}
              size="small"
              onClick={() => openEditModal(record)}
            />
          </Tooltip>
          <Tooltip title="Settings">
            <Button icon={<SettingOutlined />} size="small" />
          </Tooltip>
          <Popconfirm
            title="Delete Project"
            description="Are you sure you want to delete this project?"
            onConfirm={() => handleDeleteProject(record.id)}
            okText="Yes"
            cancelText="No"
          >
            <Tooltip title="Delete Project">
              <Button icon={<DeleteOutlined />} size="small" danger />
            </Tooltip>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <div className={styles.projectManager}>
      {/* Header */}
      <div className={styles.header}>
        <div>
          <Title level={2}>SEO Projects</Title>
          <Text type="secondary">
            Manage your SEO projects and track performance
          </Text>
        </div>
        <Space>
          <Button icon={<ShareAltOutlined />} className={styles.shareBtn}>
            Share
          </Button>
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={() => setIsCreateModalVisible(true)}
            className={styles.createBtn}
          >
            Create SEO Project
          </Button>
        </Space>
      </div>

      {/* Search Bar */}
      <div className={styles.searchSection}>
        <Input.Search
          placeholder="Search projects..."
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          onSearch={() => loadProjects()}
          style={{ width: 300 }}
        />
      </div>

      {/* Projects Table */}
      <Card>
        <Table
          columns={columns}
          dataSource={projects}
          rowKey="id"
          loading={loading}
          pagination={{
            current: pagination.page,
            pageSize: pagination.limit,
            total: pagination.total,
            showSizeChanger: true,
            showQuickJumper: true,
            onChange: (page, pageSize) =>
              loadProjects({ current: page, pageSize }),
          }}
        />
      </Card>

      {/* Create Project Modal */}
      <Modal
        title="Create New SEO Project"
        open={isCreateModalVisible}
        onCancel={() => {
          setIsCreateModalVisible(false);
          form.resetFields();
        }}
        footer={null}
        width={600}
      >
        <Form form={form} layout="vertical" onFinish={handleCreateProject}>
          <Form.Item
            name="name"
            label="Project Name"
            rules={[
              { required: true, message: "Please enter project name" },
              { min: 3, message: "Project name must be at least 3 characters" },
            ]}
          >
            <Input placeholder="Enter project name" />
          </Form.Item>

          <Form.Item
            name="domain"
            label="Domain"
            rules={[
              { required: true, message: "Please enter domain" },
              {
                pattern:
                  /^[a-zA-Z0-9][a-zA-Z0-9-]{1,61}[a-zA-Z0-9]\.[a-zA-Z]{2,}$/,
                message: "Please enter a valid domain",
              },
            ]}
          >
            <Input placeholder="example.com" />
          </Form.Item>

          <Form.Item name="location" label="Target Location">
            <Select placeholder="Select target location">
              <Option value="United States">United States</Option>
              <Option value="United Kingdom">United Kingdom</Option>
              <Option value="Canada">Canada</Option>
              <Option value="Australia">Australia</Option>
              <Option value="Germany">Germany</Option>
              <Option value="France">France</Option>
              <Option value="Vietnam">Vietnam</Option>
            </Select>
          </Form.Item>

          <Form.Item name="language" label="Target Language">
            <Select placeholder="Select target language">
              <Option value="en">English</Option>
              <Option value="es">Spanish</Option>
              <Option value="fr">French</Option>
              <Option value="de">German</Option>
              <Option value="vi">Vietnamese</Option>
            </Select>
          </Form.Item>

          <Form.Item>
            <Space>
              <Button type="primary" htmlType="submit" loading={loading}>
                Create Project
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

      {/* Edit Project Modal */}
      <Modal
        title="Edit Project"
        open={isEditModalVisible}
        onCancel={() => {
          setIsEditModalVisible(false);
          setEditingProject(null);
          form.resetFields();
        }}
        footer={null}
        width={600}
      >
        <Form form={form} layout="vertical" onFinish={handleEditProject}>
          <Form.Item
            name="name"
            label="Project Name"
            rules={[
              { required: true, message: "Please enter project name" },
              { min: 3, message: "Project name must be at least 3 characters" },
            ]}
          >
            <Input placeholder="Enter project name" />
          </Form.Item>

          <Form.Item
            name="domain"
            label="Domain"
            rules={[
              { required: true, message: "Please enter domain" },
              {
                pattern:
                  /^[a-zA-Z0-9][a-zA-Z0-9-]{1,61}[a-zA-Z0-9]\.[a-zA-Z]{2,}$/,
                message: "Please enter a valid domain",
              },
            ]}
          >
            <Input placeholder="example.com" />
          </Form.Item>

          <Form.Item name="location" label="Target Location">
            <Select placeholder="Select target location">
              <Option value="United States">United States</Option>
              <Option value="United Kingdom">United Kingdom</Option>
              <Option value="Canada">Canada</Option>
              <Option value="Australia">Australia</Option>
              <Option value="Germany">Germany</Option>
              <Option value="France">France</Option>
              <Option value="Vietnam">Vietnam</Option>
            </Select>
          </Form.Item>

          <Form.Item name="language" label="Target Language">
            <Select placeholder="Select target language">
              <Option value="en">English</Option>
              <Option value="es">Spanish</Option>
              <Option value="fr">French</Option>
              <Option value="de">German</Option>
              <Option value="vi">Vietnamese</Option>
            </Select>
          </Form.Item>

          <Form.Item>
            <Space>
              <Button type="primary" htmlType="submit" loading={loading}>
                Update Project
              </Button>
              <Button
                onClick={() => {
                  setIsEditModalVisible(false);
                  setEditingProject(null);
                  form.resetFields();
                }}
              >
                Cancel
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Modal>

      {/* Project Stats Drawer */}
      <Drawer
        title={`${currentProject?.name} - Statistics`}
        placement="right"
        width={600}
        open={isStatsDrawerVisible}
        onClose={() => setIsStatsDrawerVisible(false)}
      >
        {projectStats && (
          <div className={styles.statsContent}>
            <Card title="Keywords Overview" className={styles.statsCard}>
              <div className={styles.statItem}>
                <Text strong>Total Keywords:</Text>
                <Badge
                  count={projectStats.totalKeywords || 0}
                  showZero
                  color="blue"
                />
              </div>
              <div className={styles.statItem}>
                <Text strong>Tracking Keywords:</Text>
                <Badge
                  count={projectStats.trackingKeywords || 0}
                  showZero
                  color="green"
                />
              </div>
              <div className={styles.statItem}>
                <Text strong>Average Ranking:</Text>
                <Text>{projectStats.averageRanking?.toFixed(1) || "N/A"}</Text>
              </div>
            </Card>

            <Card title="Performance" className={styles.statsCard}>
              <div className={styles.statItem}>
                <Text strong>Improving Keywords:</Text>
                <Badge
                  count={projectStats.improvingKeywords || 0}
                  showZero
                  color="green"
                />
              </div>
              <div className={styles.statItem}>
                <Text strong>Declining Keywords:</Text>
                <Badge
                  count={projectStats.decliningKeywords || 0}
                  showZero
                  color="red"
                />
              </div>
            </Card>

            <Card title="Top Keywords" className={styles.statsCard}>
              {projectStats.topKeywords?.length > 0 ? (
                projectStats.topKeywords.map((keyword, index) => (
                  <div key={index} className={styles.keywordItem}>
                    <Text>{keyword.keyword}</Text>
                    <div>
                      <Text strong>Position: {keyword.position}</Text>
                      <Text
                        type={
                          keyword.change > 0
                            ? "success"
                            : keyword.change < 0
                            ? "danger"
                            : "secondary"
                        }
                      >
                        {keyword.change > 0
                          ? `+${keyword.change}`
                          : keyword.change}
                      </Text>
                    </div>
                  </div>
                ))
              ) : (
                <Text type="secondary">No keywords data available</Text>
              )}
            </Card>
          </div>
        )}
      </Drawer>
    </div>
  );
};

export default ProjectManager;
