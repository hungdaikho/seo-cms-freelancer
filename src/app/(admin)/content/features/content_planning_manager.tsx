"use client";

import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Card,
  Row,
  Col,
  Tabs,
  Button,
  Table,
  Tag,
  Space,
  Dropdown,
  Modal,
  Form,
  Input,
  Select,
  DatePicker,
  InputNumber,
  message,
  Spin,
  Statistic,
  List,
  Typography,
  Empty,
  Checkbox,
} from "antd";
import {
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  CalendarOutlined,
  BarChartOutlined,
  BulbOutlined,
  SearchOutlined,
  MoreOutlined,
  EyeOutlined,
  ClockCircleOutlined,
  CheckCircleOutlined,
  ExclamationCircleOutlined,
  SwapOutlined,
} from "@ant-design/icons";
import type { RootState, AppDispatch } from "@/stores/store";
import {
  fetchCalendarItems,
  createCalendarItem,
  updateCalendarItem,
  deleteCalendarItem,
  bulkUpdateCalendarItems,
  generateContentIdeas,
  generateTopicIdeas,
  getTopicQuestions,
  fetchContentPerformance,
  fetchCategories,
  setCalendarFilters,
  setSelectedCalendarItem,
  clearError,
  clearContentIdeas,
  clearTopicResearch,
} from "@/stores/slices/content-planning.slice";
import {
  CalendarItem,
  CreateCalendarItemRequest,
  ContentIdeaRequest,
  TopicResearchRequest,
  CalendarFilters,
  BulkUpdateItem,
} from "@/types/content-planning.type";
import { Project } from "@/types/api.type";
import { useProject } from "@/stores/hooks/useProject";
import dayjs from "dayjs";

const { TabPane } = Tabs;
const { Option } = Select;
const { TextArea } = Input;
const { Title, Text, Paragraph } = Typography;
const { RangePicker } = DatePicker;

interface ContentPlanningManagerProps {}

const ContentPlanningManager: React.FC<ContentPlanningManagerProps> = () => {
  const dispatch = useDispatch<AppDispatch>();

  // Project management
  const { projects, currentProject, setCurrentProject, fetchProjects } =
    useProject();
  const [selectedProject, setSelectedProject] = useState<string>("");

  const {
    calendarItems,
    calendarMetrics,
    calendarFilters,
    contentIdeas,
    topicIdeas,
    topicQuestions,
    performance,
    categories,
    loading,
    error,
    selectedCalendarItem,
  } = useSelector((state: RootState) => state.contentPlanning);

  const [activeTab, setActiveTab] = useState("calendar");
  const [modalVisible, setModalVisible] = useState(false);
  const [modalType, setModalType] = useState<
    "create" | "edit" | "ideas" | "topic-research"
  >("create");
  const [form] = Form.useForm();
  const [ideaForm] = Form.useForm();
  const [topicForm] = Form.useForm();
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);

  // Load projects on mount
  useEffect(() => {
    console.log("🔄 Content Planning: Loading projects...", projects.length);
    if (projects.length === 0) {
      console.log("� Fetching projects...");
      fetchProjects();
    }
  }, [projects.length, fetchProjects]);

  // Auto-select first project if available and no current project
  useEffect(() => {
    console.log("📋 Content Planning - Project Selection Debug:", {
      selectedProject,
      projectsLength: projects.length,
      firstProjectId: projects[0]?.id,
      currentProject: currentProject?.id,
    });

    // Use currentProject from Redux if available
    if (!selectedProject && currentProject?.id) {
      console.log("✅ Using current project from Redux:", currentProject.id);
      setSelectedProject(currentProject.id);
    } else if (!selectedProject && !currentProject && projects.length > 0) {
      console.log("✅ Auto-selecting first project:", projects[0].id);
      setSelectedProject(projects[0].id);
      setCurrentProject(projects[0]);
    }
  }, [projects, selectedProject, currentProject, setCurrentProject]);

  useEffect(() => {
    console.log(
      "🚀 Content Planning - API Calls with projectId:",
      selectedProject
    );
    if (
      selectedProject &&
      selectedProject.trim() !== "" &&
      selectedProject !== "undefined" &&
      selectedProject !== "null"
    ) {
      console.log("📤 Making API calls for project:", selectedProject);
      console.log("🔍 Project validation:", {
        length: selectedProject.length,
        type: typeof selectedProject,
        value: selectedProject,
      });
      dispatch(fetchCalendarItems({ projectId: selectedProject }));
      dispatch(fetchCategories(selectedProject));
      dispatch(fetchContentPerformance({ projectId: selectedProject }));
    } else {
      console.log("⏸️ Skipping API calls - invalid project:", {
        selectedProject,
        type: typeof selectedProject,
        length: selectedProject?.length,
      });
    }
  }, [dispatch, selectedProject]);

  useEffect(() => {
    if (error) {
      message.error(error);
      dispatch(clearError());
    }
  }, [error, dispatch]);

  // Calendar Operations
  const handleCreateItem = async (values: any) => {
    console.log("📝 Creating calendar item with projectId:", selectedProject);
    console.log("📝 Full form values:", values);

    if (!selectedProject) {
      console.error("❌ No project selected!");
      message.error("Please select a project first");
      return;
    }

    if (selectedProject === "undefined" || selectedProject === "null") {
      console.error("❌ Invalid project ID:", selectedProject);
      message.error("Invalid project selected");
      return;
    }

    try {
      const data: CreateCalendarItemRequest = {
        ...values,
        publishDate: values.publishDate?.toISOString(),
        targetKeywords:
          values.targetKeywords?.split(",").map((k: string) => k.trim()) || [],
        tags: values.tags?.split(",").map((t: string) => t.trim()) || [],
      };

      console.log("📤 API Call - createCalendarItem:", {
        projectId: selectedProject,
        data,
        projectIdType: typeof selectedProject,
        projectIdLength: selectedProject.length,
      });

      const result = await dispatch(
        createCalendarItem({ projectId: selectedProject, data })
      ).unwrap();

      console.log("✅ Calendar item created successfully:", result);
      message.success("Calendar item created successfully");
      setModalVisible(false);
      form.resetFields();
    } catch (error) {
      console.error("❌ Failed to create calendar item:", error);
      message.error("Failed to create calendar item");
    }
  };

  const handleEditItem = async (values: any) => {
    if (!selectedCalendarItem || !selectedProject) return;

    try {
      const data = {
        ...values,
        publishDate: values.publishDate?.toISOString(),
        targetKeywords:
          values.targetKeywords?.split(",").map((k: string) => k.trim()) || [],
        tags: values.tags?.split(",").map((t: string) => t.trim()) || [],
      };

      await dispatch(
        updateCalendarItem({
          projectId: selectedProject,
          itemId: selectedCalendarItem.id,
          data,
        })
      ).unwrap();
      message.success("Calendar item updated successfully");
      setModalVisible(false);
      form.resetFields();
    } catch (error) {
      message.error("Failed to update calendar item");
    }
  };

  const handleDeleteItem = (itemId: string) => {
    if (!selectedProject) return;

    Modal.confirm({
      title: "Are you sure you want to delete this item?",
      content: "This action cannot be undone.",
      onOk: async () => {
        try {
          await dispatch(
            deleteCalendarItem({ projectId: selectedProject, itemId })
          ).unwrap();
          message.success("Calendar item deleted successfully");
        } catch (error) {
          message.error("Failed to delete calendar item");
        }
      },
    });
  };

  const handleBulkStatusUpdate = async (
    status: "planned" | "in_progress" | "review" | "published" | "archived"
  ) => {
    if (selectedRowKeys.length === 0) {
      message.warning("Please select items to update");
      return;
    }

    if (!selectedProject) {
      message.error("Please select a project first");
      return;
    }

    try {
      const items: BulkUpdateItem[] = selectedRowKeys.map((id) => ({
        id: id.toString(),
        status,
      }));
      await dispatch(
        bulkUpdateCalendarItems({ projectId: selectedProject, data: { items } })
      ).unwrap();
      message.success(`Updated ${selectedRowKeys.length} items to ${status}`);
      setSelectedRowKeys([]);
    } catch (error) {
      message.error("Failed to update items");
    }
  };

  // Content Ideas Operations
  const handleGenerateIdeas = async (values: any) => {
    try {
      const data: ContentIdeaRequest = values;
      await dispatch(generateContentIdeas(data)).unwrap();
      message.success("Content ideas generated successfully");
    } catch (error) {
      message.error("Failed to generate content ideas");
    }
  };

  // Topic Research Operations
  const handleTopicResearch = async (values: any) => {
    try {
      const data: TopicResearchRequest = values;
      await dispatch(generateTopicIdeas(data)).unwrap();
      if (values.includeQuestions) {
        await dispatch(getTopicQuestions(values.seedKeyword)).unwrap();
      }
      message.success("Topic research completed successfully");
    } catch (error) {
      message.error("Failed to complete topic research");
    }
  };

  // Filter Operations
  const handleFilterChange = (filters: Partial<CalendarFilters>) => {
    if (!selectedProject) return;

    const newFilters = { ...calendarFilters, ...filters };
    dispatch(setCalendarFilters(newFilters));
    dispatch(
      fetchCalendarItems({ projectId: selectedProject, filters: newFilters })
    );
  };

  // Project Operations
  const handleProjectChange = (projectId: string) => {
    console.log("🔄 Changing project from", selectedProject, "to", projectId);
    setSelectedProject(projectId);
    const project = projects.find((p) => p.id === projectId);
    if (project) {
      console.log("✅ Found project:", project.name, project.id);
      setCurrentProject(project);
    } else {
      console.error("❌ Project not found with ID:", projectId);
    }
  };

  // Modal Operations
  const openCreateModal = () => {
    setModalType("create");
    setModalVisible(true);
    form.resetFields();
  };

  const openEditModal = (item: CalendarItem) => {
    setModalType("edit");
    setSelectedCalendarItem(item);
    setModalVisible(true);
    form.setFieldsValue({
      ...item,
      publishDate: dayjs(item.publishDate),
      targetKeywords: item.targetKeywords.join(", "),
      tags: item.tags.join(", "),
    });
  };

  const openIdeasModal = () => {
    setModalType("ideas");
    setModalVisible(true);
    ideaForm.resetFields();
  };

  const openTopicResearchModal = () => {
    setModalType("topic-research");
    setModalVisible(true);
    topicForm.resetFields();
  };

  // Table Columns
  const calendarColumns = [
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
      width: 250,
      render: (text: string, record: CalendarItem) => (
        <div>
          <Text strong>{text}</Text>
          <br />
          <Text type="secondary" style={{ fontSize: 12 }}>
            {record.type.replace("_", " ")}
          </Text>
        </div>
      ),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      width: 120,
      render: (status: string) => {
        const colorMap = {
          planned: "blue",
          in_progress: "orange",
          review: "purple",
          published: "green",
          archived: "gray",
        };
        return (
          <Tag color={colorMap[status as keyof typeof colorMap]}>
            {status.replace("_", " ")}
          </Tag>
        );
      },
    },
    {
      title: "Priority",
      dataIndex: "priority",
      key: "priority",
      width: 100,
      render: (priority: string) => {
        const colorMap = { low: "green", medium: "orange", high: "red" };
        return (
          <Tag color={colorMap[priority as keyof typeof colorMap]}>
            {priority}
          </Tag>
        );
      },
    },
    {
      title: "Publish Date",
      dataIndex: "publishDate",
      key: "publishDate",
      width: 120,
      render: (date: string) => dayjs(date).format("MMM DD, YYYY"),
    },
    {
      title: "Keywords",
      dataIndex: "targetKeywords",
      key: "targetKeywords",
      width: 200,
      render: (keywords: string[]) => (
        <div>
          {keywords.slice(0, 2).map((keyword) => (
            <Tag key={keyword}>{keyword}</Tag>
          ))}
          {keywords.length > 2 && <Tag>+{keywords.length - 2} more</Tag>}
        </div>
      ),
    },
    {
      title: "Word Count",
      dataIndex: "estimatedWordCount",
      key: "estimatedWordCount",
      width: 100,
      render: (count: number, record: CalendarItem) => (
        <div>
          <Text>{count || "-"}</Text>
          {record.actualWordCount && (
            <>
              <br />
              <Text type="secondary" style={{ fontSize: 12 }}>
                Actual: {record.actualWordCount}
              </Text>
            </>
          )}
        </div>
      ),
    },
    {
      title: "Actions",
      key: "actions",
      width: 100,
      render: (_: any, record: CalendarItem) => (
        <Space>
          <Button
            type="text"
            icon={<EyeOutlined />}
            size="small"
            onClick={() => dispatch(setSelectedCalendarItem(record))}
          />
          <Button
            type="text"
            icon={<EditOutlined />}
            size="small"
            onClick={() => openEditModal(record)}
          />
          <Button
            type="text"
            icon={<DeleteOutlined />}
            size="small"
            danger
            onClick={() => handleDeleteItem(record.id)}
          />
        </Space>
      ),
    },
  ];

  // Row Selection
  const rowSelection = {
    selectedRowKeys,
    onChange: (selectedRowKeys: React.Key[]) => {
      setSelectedRowKeys(selectedRowKeys);
    },
  };

  // Render Project Selector
  const renderProjectSelector = () => (
    <div
      style={{
        marginBottom: 16,
        padding: "0 16px",
        background: "#fafafa",
        borderRadius: 8,
      }}
    >
      <Space
        align="center"
        style={{
          width: "100%",
          justifyContent: "space-between",
          padding: "12px 0",
        }}
      >
        <Typography.Text strong>
          <SwapOutlined style={{ marginRight: 8 }} />
          Current Project:
        </Typography.Text>
        <Select
          value={selectedProject}
          onChange={handleProjectChange}
          placeholder="Select a project"
          style={{ minWidth: 250 }}
          size="small"
          loading={projects.length === 0}
          disabled={projects.length === 0}
        >
          {projects.map((project: Project) => (
            <Option key={project.id} value={project.id}>
              {project.name} ({project.domain})
            </Option>
          ))}
        </Select>
      </Space>
    </div>
  );

  // Show empty state if no project selected
  if (!selectedProject) {
    return (
      <div style={{ padding: "24px" }}>
        {renderProjectSelector()}

        {/* Debug Info in Development */}
        {process.env.NODE_ENV === "development" && (
          <Card
            title="🐛 Debug Information"
            style={{ marginBottom: 16, border: "2px solid #ff4d4f" }}
            size="small"
          >
            <pre style={{ fontSize: 12, background: "#f5f5f5", padding: 8 }}>
              {JSON.stringify(
                {
                  selectedProject,
                  currentProject: currentProject?.id,
                  projectsCount: projects.length,
                  projectsLoaded: projects.length > 0,
                  firstProject: projects[0]?.id,
                },
                null,
                2
              )}
            </pre>
          </Card>
        )}

        <div style={{ textAlign: "center", padding: "60px 0" }}>
          <Empty
            description="Please select a project to manage content planning"
            image={Empty.PRESENTED_IMAGE_SIMPLE}
          >
            <Typography.Text type="secondary">
              Choose a project from the dropdown above to get started
            </Typography.Text>
          </Empty>
        </div>
      </div>
    );
  }

  return (
    <div style={{ padding: "24px" }}>
      {renderProjectSelector()}

      {/* Debug Info in Development */}
      {process.env.NODE_ENV === "development" && (
        <Card
          title="🐛 Debug Information"
          style={{ marginBottom: 16, border: "2px solid #52c41a" }}
          size="small"
        >
          <pre style={{ fontSize: 12, background: "#f5f5f5", padding: 8 }}>
            {JSON.stringify(
              {
                selectedProject,
                selectedProjectType: typeof selectedProject,
                selectedProjectLength: selectedProject.length,
                currentProject: currentProject?.id,
                projectsCount: projects.length,
                apiCallsWillBeMadeWith: selectedProject,
              },
              null,
              2
            )}
          </pre>
        </Card>
      )}

      <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
        <Col span={24}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Title level={2}>Content Planning</Title>
            <Space>
              <Button
                type="primary"
                icon={<BulbOutlined />}
                onClick={openIdeasModal}
                disabled={!selectedProject}
              >
                Generate Ideas
              </Button>
              <Button
                icon={<SearchOutlined />}
                onClick={openTopicResearchModal}
                disabled={!selectedProject}
              >
                Topic Research
              </Button>
              <Button
                type="primary"
                icon={<PlusOutlined />}
                onClick={openCreateModal}
                disabled={!selectedProject}
              >
                Add Content
              </Button>
            </Space>
          </div>
        </Col>
      </Row>

      {/* Metrics Cards */}
      {calendarMetrics && (
        <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
          <Col span={5}>
            <Card>
              <Statistic
                title="Planned"
                value={calendarMetrics.planned}
                prefix={<ClockCircleOutlined style={{ color: "#1890ff" }} />}
              />
            </Card>
          </Col>
          <Col span={5}>
            <Card>
              <Statistic
                title="In Progress"
                value={calendarMetrics.in_progress}
                prefix={
                  <ExclamationCircleOutlined style={{ color: "#fa8c16" }} />
                }
              />
            </Card>
          </Col>
          <Col span={5}>
            <Card>
              <Statistic
                title="In Review"
                value={calendarMetrics.review}
                prefix={<EyeOutlined style={{ color: "#722ed1" }} />}
              />
            </Card>
          </Col>
          <Col span={5}>
            <Card>
              <Statistic
                title="Published"
                value={calendarMetrics.published}
                prefix={<CheckCircleOutlined style={{ color: "#52c41a" }} />}
              />
            </Card>
          </Col>
          <Col span={4}>
            <Card>
              <Statistic
                title="Overdue"
                value={calendarMetrics.overdue}
                prefix={
                  <ExclamationCircleOutlined style={{ color: "#ff4d4f" }} />
                }
              />
            </Card>
          </Col>
        </Row>
      )}

      <Card>
        <Tabs activeKey={activeTab} onChange={setActiveTab}>
          <TabPane tab="Calendar" key="calendar" icon={<CalendarOutlined />}>
            <div style={{ marginBottom: 16 }}>
              <Row gutter={[16, 16]}>
                <Col span={6}>
                  <Select
                    placeholder="Filter by status"
                    allowClear
                    style={{ width: "100%" }}
                    onChange={(status) => handleFilterChange({ status })}
                  >
                    <Option value="planned">Planned</Option>
                    <Option value="in_progress">In Progress</Option>
                    <Option value="review">Review</Option>
                    <Option value="published">Published</Option>
                    <Option value="archived">Archived</Option>
                  </Select>
                </Col>
                <Col span={6}>
                  <Select
                    placeholder="Filter by type"
                    allowClear
                    style={{ width: "100%" }}
                    onChange={(type) => handleFilterChange({ type })}
                  >
                    <Option value="blog_post">Blog Post</Option>
                    <Option value="social_media">Social Media</Option>
                    <Option value="email">Email</Option>
                    <Option value="landing_page">Landing Page</Option>
                    <Option value="video">Video</Option>
                    <Option value="infographic">Infographic</Option>
                  </Select>
                </Col>
                <Col span={8}>
                  <RangePicker
                    style={{ width: "100%" }}
                    onChange={(dates) => {
                      if (dates) {
                        handleFilterChange({
                          startDate: dates[0]?.toISOString(),
                          endDate: dates[1]?.toISOString(),
                        });
                      } else {
                        handleFilterChange({
                          startDate: undefined,
                          endDate: undefined,
                        });
                      }
                    }}
                  />
                </Col>
                <Col span={4}>
                  {selectedRowKeys.length > 0 && (
                    <Dropdown
                      menu={{
                        items: [
                          {
                            key: "planned",
                            label: "Set to Planned",
                            onClick: () => handleBulkStatusUpdate("planned"),
                          },
                          {
                            key: "in_progress",
                            label: "Set to In Progress",
                            onClick: () =>
                              handleBulkStatusUpdate("in_progress"),
                          },
                          {
                            key: "review",
                            label: "Set to Review",
                            onClick: () => handleBulkStatusUpdate("review"),
                          },
                          {
                            key: "published",
                            label: "Set to Published",
                            onClick: () => handleBulkStatusUpdate("published"),
                          },
                        ],
                      }}
                    >
                      <Button>
                        Bulk Actions ({selectedRowKeys.length}) <MoreOutlined />
                      </Button>
                    </Dropdown>
                  )}
                </Col>
              </Row>
            </div>

            <Table
              rowSelection={rowSelection}
              columns={calendarColumns}
              dataSource={calendarItems}
              rowKey="id"
              loading={loading.calendarItems}
              pagination={{
                pageSize: 10,
                showSizeChanger: true,
                showQuickJumper: true,
                showTotal: (total, range) =>
                  `${range[0]}-${range[1]} of ${total} items`,
              }}
            />
          </TabPane>

          <TabPane
            tab="Performance"
            key="performance"
            icon={<BarChartOutlined />}
          >
            {performance ? (
              <Row gutter={[16, 16]}>
                <Col span={24}>
                  <Card title="Performance Overview">
                    <Row gutter={[16, 16]}>
                      <Col span={6}>
                        <Statistic
                          title="Total Views"
                          value={performance.overview?.totalViews}
                          precision={0}
                        />
                      </Col>
                      <Col span={6}>
                        <Statistic
                          title="Total Engagement"
                          value={performance.overview?.totalEngagement}
                          precision={0}
                        />
                      </Col>
                      <Col span={6}>
                        <Statistic
                          title="Avg. Time on Page"
                          value={performance.overview?.averageTimeOnPage}
                          suffix="s"
                          precision={0}
                        />
                      </Col>
                      <Col span={6}>
                        <Statistic
                          title="Conversion Rate"
                          value={performance.overview?.conversionRate * 100}
                          suffix="%"
                          precision={2}
                        />
                      </Col>
                    </Row>
                  </Card>
                </Col>
                <Col span={24}>
                  <Card title="Top Performing Content">
                    <List
                      dataSource={performance.topPerforming}
                      renderItem={(item) => (
                        <List.Item
                          actions={[
                            <Text key="views">{item.views} views</Text>,
                            <Text key="engagement">
                              {item.engagement} engagements
                            </Text>,
                            <Text key="conversion">
                              {(item.conversionRate * 100).toFixed(2)}% CVR
                            </Text>,
                          ]}
                        >
                          <List.Item.Meta
                            title={item.title}
                            description={`Content ID: ${item.contentId}`}
                          />
                        </List.Item>
                      )}
                    />
                  </Card>
                </Col>
              </Row>
            ) : (
              <div style={{ textAlign: "center", padding: "48px" }}>
                <Spin spinning={loading.performance}>
                  <Empty description="No performance data available" />
                </Spin>
              </div>
            )}
          </TabPane>

          <TabPane
            tab="Ideas & Research"
            key="research"
            icon={<BulbOutlined />}
          >
            <Row gutter={[16, 16]}>
              {contentIdeas && (
                <Col span={12}>
                  <Card
                    title="Content Ideas"
                    extra={
                      <Button
                        size="small"
                        onClick={() => dispatch(clearContentIdeas())}
                      >
                        Clear
                      </Button>
                    }
                  >
                    <List
                      dataSource={contentIdeas.ideas}
                      renderItem={(idea: any) => (
                        <List.Item
                          actions={[
                            <Tag
                              key="difficulty"
                              color={
                                idea.difficulty === "easy"
                                  ? "green"
                                  : idea.difficulty === "medium"
                                  ? "orange"
                                  : "red"
                              }
                            >
                              {idea.difficulty}
                            </Tag>,
                            <Text key="traffic">
                              {idea.estimatedTraffic} traffic
                            </Text>,
                          ]}
                        >
                          <List.Item.Meta
                            title={idea.title}
                            description={
                              <div>
                                <Paragraph ellipsis={{ rows: 2 }}>
                                  {idea.description}
                                </Paragraph>
                                <div>
                                  {idea.targetKeywords
                                    .slice(0, 3)
                                    .map((keyword: any) => (
                                      <Tag key={keyword}>{keyword}</Tag>
                                    ))}
                                </div>
                              </div>
                            }
                          />
                        </List.Item>
                      )}
                    />
                  </Card>
                </Col>
              )}

              {topicIdeas && (
                <Col span={12}>
                  <Card
                    title="Topic Research"
                    extra={
                      <Button
                        size="small"
                        onClick={() => dispatch(clearTopicResearch())}
                      >
                        Clear
                      </Button>
                    }
                  >
                    <List
                      dataSource={topicIdeas.topicIdeas}
                      renderItem={(topic) => (
                        <List.Item
                          actions={[
                            <Text key="volume">{topic.searchVolume} vol</Text>,
                            <Text key="difficulty">
                              Diff: {topic.difficulty}
                            </Text>,
                            <Text key="opportunity">
                              Opp: {topic.opportunity}
                            </Text>,
                          ]}
                        >
                          <List.Item.Meta
                            title={topic.keyword}
                            description={
                              <div>
                                {topic.relatedTopics
                                  .slice(0, 3)
                                  .map((related) => (
                                    <Tag key={related}>{related}</Tag>
                                  ))}
                              </div>
                            }
                          />
                        </List.Item>
                      )}
                    />
                  </Card>
                </Col>
              )}

              {topicQuestions && (
                <Col span={24}>
                  <Card title="Related Questions">
                    <List
                      dataSource={topicQuestions.questions}
                      renderItem={(question) => (
                        <List.Item
                          actions={[
                            <Tag key="type" color="blue">
                              {question.contentType}
                            </Tag>,
                            <Tag
                              key="difficulty"
                              color={
                                question.difficulty === "low"
                                  ? "green"
                                  : question.difficulty === "medium"
                                  ? "orange"
                                  : "red"
                              }
                            >
                              {question.difficulty}
                            </Tag>,
                            <Text key="volume">
                              {question.searchVolume} searches
                            </Text>,
                          ]}
                        >
                          <List.Item.Meta title={question.question} />
                        </List.Item>
                      )}
                    />
                  </Card>
                </Col>
              )}

              {!contentIdeas && !topicIdeas && !topicQuestions && (
                <Col span={24}>
                  <div style={{ textAlign: "center", padding: "48px" }}>
                    <Empty
                      description="No research data available"
                      image={Empty.PRESENTED_IMAGE_SIMPLE}
                    >
                      <Space>
                        <Button type="primary" onClick={openIdeasModal}>
                          Generate Ideas
                        </Button>
                        <Button onClick={openTopicResearchModal}>
                          Start Research
                        </Button>
                      </Space>
                    </Empty>
                  </div>
                </Col>
              )}
            </Row>
          </TabPane>
        </Tabs>
      </Card>

      {/* Create/Edit Modal */}
      <Modal
        title={
          modalType === "create" ? "Create Content Item" : "Edit Content Item"
        }
        open={modalVisible && (modalType === "create" || modalType === "edit")}
        onCancel={() => setModalVisible(false)}
        onOk={() => form.submit()}
        confirmLoading={loading.calendarItems}
        width={800}
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={modalType === "create" ? handleCreateItem : handleEditItem}
        >
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                label="Title"
                name="title"
                rules={[{ required: true, message: "Please enter title" }]}
              >
                <Input placeholder="Enter content title" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Type"
                name="type"
                rules={[{ required: true, message: "Please select type" }]}
              >
                <Select placeholder="Select content type">
                  <Option value="blog_post">Blog Post</Option>
                  <Option value="social_media">Social Media</Option>
                  <Option value="email">Email</Option>
                  <Option value="landing_page">Landing Page</Option>
                  <Option value="video">Video</Option>
                  <Option value="infographic">Infographic</Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={8}>
              <Form.Item
                label="Status"
                name="status"
                rules={[{ required: true, message: "Please select status" }]}
              >
                <Select placeholder="Select status">
                  <Option value="planned">Planned</Option>
                  <Option value="in_progress">In Progress</Option>
                  <Option value="review">Review</Option>
                  <Option value="published">Published</Option>
                  <Option value="archived">Archived</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                label="Priority"
                name="priority"
                rules={[{ required: true, message: "Please select priority" }]}
              >
                <Select placeholder="Select priority">
                  <Option value="low">Low</Option>
                  <Option value="medium">Medium</Option>
                  <Option value="high">High</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                label="Publish Date"
                name="publishDate"
                rules={[
                  { required: true, message: "Please select publish date" },
                ]}
              >
                <DatePicker style={{ width: "100%" }} />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                label="Target Keywords"
                name="targetKeywords"
                help="Separate keywords with commas"
              >
                <Input placeholder="keyword1, keyword2, keyword3" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="Estimated Word Count" name="estimatedWordCount">
                <InputNumber
                  style={{ width: "100%" }}
                  min={0}
                  placeholder="Enter word count"
                />
              </Form.Item>
            </Col>
          </Row>

          <Form.Item label="Brief" name="brief">
            <TextArea rows={3} placeholder="Content brief or description" />
          </Form.Item>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                label="Tags"
                name="tags"
                help="Separate tags with commas"
              >
                <Input placeholder="tag1, tag2, tag3" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="Notes" name="notes">
                <Input placeholder="Additional notes" />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Modal>

      {/* Content Ideas Modal */}
      <Modal
        title="Generate Content Ideas"
        open={modalVisible && modalType === "ideas"}
        onCancel={() => setModalVisible(false)}
        onOk={() => ideaForm.submit()}
        confirmLoading={loading.contentIdeas}
      >
        <Form form={ideaForm} layout="vertical" onFinish={handleGenerateIdeas}>
          <Form.Item
            label="Topic"
            name="topic"
            rules={[{ required: true, message: "Please enter topic" }]}
          >
            <Input placeholder="e.g., email marketing" />
          </Form.Item>

          <Form.Item
            label="Target Audience"
            name="audience"
            rules={[{ required: true, message: "Please enter audience" }]}
          >
            <Input placeholder="e.g., small business owners" />
          </Form.Item>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                label="Content Format"
                name="format"
                rules={[{ required: true, message: "Please select format" }]}
              >
                <Select placeholder="Select format">
                  <Option value="blog">Blog Post</Option>
                  <Option value="video">Video</Option>
                  <Option value="infographic">Infographic</Option>
                  <Option value="social">Social Media</Option>
                  <Option value="email">Email</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="Number of Ideas" name="count" initialValue={10}>
                <InputNumber min={5} max={50} style={{ width: "100%" }} />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Modal>

      {/* Topic Research Modal */}
      <Modal
        title="Topic Research"
        open={modalVisible && modalType === "topic-research"}
        onCancel={() => setModalVisible(false)}
        onOk={() => topicForm.submit()}
        confirmLoading={loading.topicResearch}
      >
        <Form form={topicForm} layout="vertical" onFinish={handleTopicResearch}>
          <Form.Item
            label="Seed Keyword"
            name="seedKeyword"
            rules={[{ required: true, message: "Please enter seed keyword" }]}
          >
            <Input placeholder="e.g., content marketing" />
          </Form.Item>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item label="Country" name="country" initialValue="US">
                <Select>
                  <Option value="US">United States</Option>
                  <Option value="UK">United Kingdom</Option>
                  <Option value="CA">Canada</Option>
                  <Option value="AU">Australia</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="Limit" name="limit" initialValue={30}>
                <InputNumber min={10} max={100} style={{ width: "100%" }} />
              </Form.Item>
            </Col>
          </Row>

          <Form.Item
            label="Content Type"
            name="contentType"
            initialValue="blog"
          >
            <Select>
              <Option value="blog">Blog</Option>
              <Option value="video">Video</Option>
              <Option value="social">Social Media</Option>
              <Option value="email">Email</Option>
            </Select>
          </Form.Item>

          <Form.Item
            name="includeQuestions"
            valuePropName="checked"
            initialValue={true}
          >
            <Checkbox>Include related questions</Checkbox>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default ContentPlanningManager;
