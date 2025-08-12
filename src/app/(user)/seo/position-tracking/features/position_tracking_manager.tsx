"use client";

import React, { useState, useEffect } from "react";
import {
  Card,
  Table,
  Button,
  Select,
  DatePicker,
  Statistic,
  Row,
  Col,
  Tag,
  Progress,
  Tooltip,
  Tabs,
  Input,
  Space,
  Dropdown,
  Modal,
  Alert,
  Spin,
  Empty,
  Typography,
  message,
} from "antd";
import {
  ArrowUpOutlined,
  ArrowDownOutlined,
  PlusOutlined,
  SettingOutlined,
  ExportOutlined,
  SearchOutlined,
  MoreOutlined,
  LineChartOutlined,
  EyeOutlined,
  InfoCircleOutlined,
  ReloadOutlined,
} from "@ant-design/icons";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "@/stores/store";
import {
  fetchProjects,
  setCurrentProject,
} from "@/stores/slices/project.slice";
import {
  usePositionTracking,
  useKeywordRanking,
} from "@/stores/hooks/usePositionTracking";
import { CreateRankingRequest } from "@/types/api.type";
import styles from "./position_tracking_manager.module.scss";

const { Option } = Select;
const { RangePicker } = DatePicker;
const { Search } = Input;
const { Title, Text } = Typography;

interface AddRankingModalProps {
  visible: boolean;
  onCancel: () => void;
  onSubmit: (keywordId: string, data: CreateRankingRequest) => void;
  loading?: boolean;
}

const AddRankingModal: React.FC<AddRankingModalProps> = ({
  visible,
  onCancel,
  onSubmit,
  loading,
}) => {
  const [position, setPosition] = useState<number>(1);
  const [url, setUrl] = useState<string>("");
  const [selectedKeywordId, setSelectedKeywordId] = useState<string>("");
  const { projectOverview } = usePositionTracking();

  const handleSubmit = () => {
    if (!selectedKeywordId) {
      message.error("Please select a keyword");
      return;
    }

    onSubmit(selectedKeywordId, {
      position,
      url: url || undefined,
      metadata: {
        search_engine: "google",
        location: "Vietnam",
        device: "desktop",
      },
    });

    // Reset form
    setPosition(1);
    setUrl("");
    setSelectedKeywordId("");
  };

  return (
    <Modal
      title="Add New Ranking Record"
      open={visible}
      onCancel={onCancel}
      onOk={handleSubmit}
      confirmLoading={loading}
      okText="Add Ranking"
    >
      <Space direction="vertical" style={{ width: "100%" }}>
        <div>
          <label>Select Keyword:</label>
          <Select
            style={{ width: "100%", marginTop: 8 }}
            placeholder="Choose a keyword"
            value={selectedKeywordId}
            onChange={setSelectedKeywordId}
          >
            {projectOverview?.keywords.map((keyword) => (
              <Option key={keyword.id} value={keyword.id}>
                {keyword.keyword} (Current:{" "}
                {keyword.currentRanking || "Not ranked"})
              </Option>
            ))}
          </Select>
        </div>

        <div>
          <label>Position:</label>
          <Input
            type="number"
            min={1}
            max={200}
            value={position}
            onChange={(e) => setPosition(parseInt(e.target.value) || 1)}
            style={{ marginTop: 8 }}
            placeholder="Enter position (1-200)"
          />
        </div>

        <div>
          <label>Target URL (Optional):</label>
          <Input
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            style={{ marginTop: 8 }}
            placeholder="https://example.com/page"
          />
        </div>
      </Space>
    </Modal>
  );
};

const PositionTrackingManager: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const selectedProject = useSelector(
    (state: RootState) => state.project.currentProject
  );
  const { projects, loading: projectsLoading } = useSelector(
    (state: RootState) => state.project
  );
  const [activeTab, setActiveTab] = useState("overview");
  const [selectedPeriod, setSelectedPeriod] = useState("7d");
  const [searchKeyword, setSearchKeyword] = useState("");
  const [showAddRankingModal, setShowAddRankingModal] = useState(false);
  const [selectedKeywordId, setSelectedKeywordId] = useState<string>("");

  // Use position tracking hooks
  const {
    projectOverview,
    loading,
    error,
    visibilityPercentage,
    rankingDistribution,
    topKeywords,
    fetchProjectOverview,
    createRanking,
    setFilters,
    clearError,
  } = usePositionTracking();

  const {
    rankingHistory,
    fetchHistory,
    loading: historyLoading,
  } = useKeywordRanking();

  // Fetch data when component mounts or project changes
  useEffect(() => {
    // Fetch projects if not already loaded
    if (projects.length === 0) {
      dispatch(fetchProjects());
    }
  }, [dispatch, projects.length]);

  useEffect(() => {
    if (selectedProject?.id) {
      fetchProjectOverview(selectedProject.id);
    }
  }, [selectedProject?.id]);

  // Handle period change
  useEffect(() => {
    setFilters({ period: selectedPeriod });
  }, [selectedPeriod]);

  // Handle project selection
  const handleProjectChange = (projectId: string) => {
    const project = projects.find((p) => p.id === projectId);
    if (project) {
      dispatch(setCurrentProject(project));
    }
  };

  // Handle add ranking
  const handleAddRanking = async (
    keywordId: string,
    data: CreateRankingRequest
  ) => {
    try {
      await createRanking(keywordId, data);
      message.success("Ranking record added successfully!");
      setShowAddRankingModal(false);
    } catch (error) {
      message.error("Failed to add ranking record");
    }
  };

  // Handle keyword history view
  const handleViewHistory = (keywordId: string) => {
    setSelectedKeywordId(keywordId);
    fetchHistory(keywordId, {
      days: parseInt(selectedPeriod.replace("d", "")),
    });
    setActiveTab("history");
  };

  // Get trend icon
  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case "up":
        return <ArrowUpOutlined style={{ color: "#52c41a" }} />;
      case "down":
        return <ArrowDownOutlined style={{ color: "#ff4d4f" }} />;
      case "stable":
        return <Tag color="orange">Stable</Tag>;
      default:
        return <Tag color="default">No Data</Tag>;
    }
  };

  // Keywords table columns
  const keywordColumns = [
    {
      title: "Keyword",
      dataIndex: "keyword",
      key: "keyword",
      filterable: true,
      render: (text: string, record: any) => (
        <div>
          <strong>{text}</strong>
          <br />
          <Text type="secondary" style={{ fontSize: "12px" }}>
            Volume: {record.searchVolume?.toLocaleString() || "N/A"}
          </Text>
        </div>
      ),
    },
    {
      title: "Current Position",
      dataIndex: "currentRanking",
      key: "currentRanking",
      width: 120,
      sorter: (a: any, b: any) => a.currentRanking - b.currentRanking,
      render: (position: number) => (
        <Tag
          color={
            position <= 3
              ? "green"
              : position <= 10
              ? "blue"
              : position <= 20
              ? "orange"
              : "red"
          }
        >
          {position || "Not ranked"}
        </Tag>
      ),
    },
    {
      title: "Trend",
      dataIndex: "trend",
      key: "trend",
      width: 80,
      render: (trend: string) => getTrendIcon(trend),
    },
    {
      title: "Search Volume",
      dataIndex: "searchVolume",
      key: "searchVolume",
      width: 120,
      sorter: (a: any, b: any) => (a.searchVolume || 0) - (b.searchVolume || 0),
      render: (volume: number) => volume?.toLocaleString() || "N/A",
    },
    {
      title: "Difficulty",
      dataIndex: "difficulty",
      key: "difficulty",
      width: 100,
      render: (difficulty: number) => (
        <Progress
          percent={difficulty}
          size="small"
          format={(percent) => `${percent}%`}
          strokeColor={
            difficulty > 70
              ? "#ff4d4f"
              : difficulty > 40
              ? "#faad14"
              : "#52c41a"
          }
        />
      ),
    },
    {
      title: "Target URL",
      dataIndex: "targetUrl",
      key: "targetUrl",
      ellipsis: true,
      render: (url: string) => (
        <a href={url} target="_blank" rel="noopener noreferrer">
          {url}
        </a>
      ),
    },
    {
      title: "Actions",
      key: "actions",
      width: 120,
      render: (record: any) => (
        <Space>
          <Button
            size="small"
            icon={<LineChartOutlined />}
            onClick={() => handleViewHistory(record.id)}
          >
            History
          </Button>
          <Dropdown
            menu={{
              items: [
                {
                  key: "update",
                  label: "Update Position",
                  icon: <PlusOutlined />,
                },
                {
                  key: "view",
                  label: "View SERP",
                  icon: <EyeOutlined />,
                },
              ],
            }}
          >
            <Button size="small" icon={<MoreOutlined />} />
          </Dropdown>
        </Space>
      ),
    },
  ];

  // Filter keywords based on search
  const filteredKeywords =
    projectOverview?.keywords.filter((keyword) =>
      keyword.keyword.toLowerCase().includes(searchKeyword.toLowerCase())
    ) || [];

  // Tab items
  const tabItems = [
    {
      key: "overview",
      label: (
        <span>
          <LineChartOutlined />
          Overview
        </span>
      ),
      children: (
        <div>
          {/* Summary Statistics */}
          <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
            <Col span={6}>
              <Card>
                <Statistic
                  title="Total Keywords"
                  value={projectOverview?.summary.totalKeywords || 0}
                  prefix={<SearchOutlined />}
                />
              </Card>
            </Col>
            <Col span={6}>
              <Card>
                <Statistic
                  title="Ranked Keywords"
                  value={projectOverview?.summary.rankedKeywords || 0}
                  prefix={<ArrowUpOutlined />}
                />
              </Card>
            </Col>
            <Col span={6}>
              <Card>
                <Statistic
                  title="Average Position"
                  value={projectOverview?.summary.avgPosition || 0}
                  precision={1}
                  prefix={<LineChartOutlined />}
                />
              </Card>
            </Col>
            <Col span={6}>
              <Card>
                <Statistic
                  title="Visibility"
                  value={visibilityPercentage}
                  suffix="%"
                  prefix={<EyeOutlined />}
                />
              </Card>
            </Col>
          </Row>

          {/* Ranking Distribution */}
          <Card title="Ranking Distribution" style={{ marginBottom: 24 }}>
            <Row gutter={16}>
              <Col span={6}>
                <div style={{ textAlign: "center" }}>
                  <Title level={2} style={{ color: "#52c41a", margin: 0 }}>
                    {rankingDistribution.top3.count}
                  </Title>
                  <Text>Top 3</Text>
                  <Progress
                    percent={rankingDistribution.top3.percentage}
                    strokeColor="#52c41a"
                    showInfo={false}
                  />
                </div>
              </Col>
              <Col span={6}>
                <div style={{ textAlign: "center" }}>
                  <Title level={2} style={{ color: "#1890ff", margin: 0 }}>
                    {rankingDistribution.top10.count}
                  </Title>
                  <Text>Top 10</Text>
                  <Progress
                    percent={rankingDistribution.top10.percentage}
                    strokeColor="#1890ff"
                    showInfo={false}
                  />
                </div>
              </Col>
              <Col span={6}>
                <div style={{ textAlign: "center" }}>
                  <Title level={2} style={{ color: "#faad14", margin: 0 }}>
                    {rankingDistribution.top20.count}
                  </Title>
                  <Text>Top 20</Text>
                  <Progress
                    percent={rankingDistribution.top20.percentage}
                    strokeColor="#faad14"
                    showInfo={false}
                  />
                </div>
              </Col>
              <Col span={6}>
                <div style={{ textAlign: "center" }}>
                  <Title level={2} style={{ color: "#722ed1", margin: 0 }}>
                    {rankingDistribution.top100.count}
                  </Title>
                  <Text>Top 100</Text>
                  <Progress
                    percent={rankingDistribution.top100.percentage}
                    strokeColor="#722ed1"
                    showInfo={false}
                  />
                </div>
              </Col>
            </Row>
          </Card>

          {/* Keywords Table */}
          <Card
            title="Keywords"
            extra={
              <Space>
                <Search
                  placeholder="Search keywords"
                  value={searchKeyword}
                  onChange={(e) => setSearchKeyword(e.target.value)}
                  style={{ width: 200 }}
                />
                <Button
                  type="primary"
                  icon={<PlusOutlined />}
                  onClick={() => setShowAddRankingModal(true)}
                >
                  Add Ranking
                </Button>
                <Button icon={<ExportOutlined />}>Export</Button>
              </Space>
            }
          >
            <Table
              dataSource={filteredKeywords}
              columns={keywordColumns}
              rowKey="id"
              loading={loading}
              pagination={{
                pageSize: 20,
                showSizeChanger: true,
                showTotal: (total, range) =>
                  `${range[0]}-${range[1]} of ${total} keywords`,
              }}
              scroll={{ x: 1200 }}
            />
          </Card>
        </div>
      ),
    },
    {
      key: "history",
      label: (
        <span>
          <LineChartOutlined />
          Ranking History
        </span>
      ),
      children: (
        <div>
          {rankingHistory ? (
            <Card title={`Ranking History: ${rankingHistory.keyword.keyword}`}>
              <Row gutter={16} style={{ marginBottom: 24 }}>
                <Col span={6}>
                  <Statistic
                    title="Current Position"
                    value={rankingHistory.keyword.currentRanking}
                    valueStyle={{
                      color:
                        rankingHistory.keyword.currentRanking <= 10
                          ? "#52c41a"
                          : "#fa8c16",
                    }}
                  />
                </Col>
                <Col span={6}>
                  <Statistic
                    title="Best Position"
                    value={rankingHistory.summary.bestPosition}
                    valueStyle={{ color: "#52c41a" }}
                  />
                </Col>
                <Col span={6}>
                  <Statistic
                    title="Worst Position"
                    value={rankingHistory.summary.worstPosition}
                    valueStyle={{ color: "#ff4d4f" }}
                  />
                </Col>
                <Col span={6}>
                  <Statistic
                    title="Average Position"
                    value={rankingHistory.summary.averagePosition}
                    precision={1}
                  />
                </Col>
              </Row>

              <div>
                <Title level={4}>Recent Rankings</Title>
                {rankingHistory.rankings.map((ranking, index) => (
                  <div
                    key={ranking.id}
                    style={{
                      padding: "12px",
                      borderBottom: "1px solid #f0f0f0",
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <div>
                      <strong>Position {ranking.position}</strong>
                      <br />
                      <Text type="secondary">
                        {new Date(ranking.date).toLocaleDateString()}
                      </Text>
                    </div>
                    <div>
                      {ranking.url && (
                        <a
                          href={ranking.url}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          View Page
                        </a>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          ) : (
            <Card>
              <Empty
                description="Select a keyword from the Overview tab to view its ranking history"
                image={Empty.PRESENTED_IMAGE_SIMPLE}
              />
            </Card>
          )}
        </div>
      ),
    },
  ];

  if (error) {
    return (
      <div className={styles.positionTrackingManager}>
        <Alert
          message="Error Loading Position Tracking Data"
          description={error}
          type="error"
          showIcon
          action={
            <Space>
              <Button size="small" onClick={clearError}>
                Dismiss
              </Button>
              <Button
                type="primary"
                size="small"
                onClick={() =>
                  selectedProject?.id &&
                  fetchProjectOverview(selectedProject.id)
                }
              >
                Retry
              </Button>
            </Space>
          }
        />
      </div>
    );
  }

  if (!selectedProject) {
    return (
      <div className={styles.positionTrackingManager}>
        <div className={styles.header}>
          <div className={styles.headerContent}>
            <Title level={2}>Position Tracking</Title>
            <Text type="secondary">
              Select a project to monitor keyword rankings
            </Text>
          </div>
        </div>

        <Card
          title="Select Project"
          style={{ maxWidth: 600, margin: "0 auto" }}
        >
          {projectsLoading ? (
            <div style={{ textAlign: "center", padding: "40px 0" }}>
              <Spin size="large" />
              <div style={{ marginTop: 16 }}>Loading projects...</div>
            </div>
          ) : projects.length === 0 ? (
            <Empty
              description="No projects found. Please create a project first."
              image={Empty.PRESENTED_IMAGE_SIMPLE}
            />
          ) : (
            <div>
              <Text style={{ display: "block", marginBottom: 16 }}>
                Choose a project to view its position tracking data:
              </Text>
              <Select
                style={{ width: "100%" }}
                placeholder="Select a project"
                size="large"
                onChange={handleProjectChange}
                loading={projectsLoading}
              >
                {projects.map((project) => (
                  <Option key={project.id} value={project.id}>
                    <div>
                      <strong>{project.name}</strong>
                      <br />
                      <Text type="secondary" style={{ fontSize: "12px" }}>
                        {project.domain}
                      </Text>
                    </div>
                  </Option>
                ))}
              </Select>
            </div>
          )}
        </Card>
      </div>
    );
  }

  return (
    <Spin spinning={loading}>
      <div className={styles.positionTrackingManager}>
        <div className={styles.header}>
          <div className={styles.headerContent}>
            <Title level={2}>Position Tracking</Title>
            <Text type="secondary">
              Monitor keyword rankings for {selectedProject.name} (
              {selectedProject.domain})
            </Text>
          </div>
          <div className={styles.headerActions}>
            <Space>
              <div style={{ minWidth: 200 }}>
                <Text style={{ fontSize: "12px", color: "#666" }}>
                  Project:
                </Text>
                <Select
                  value={selectedProject?.id}
                  onChange={handleProjectChange}
                  style={{ width: "100%" }}
                  size="small"
                  loading={projectsLoading}
                >
                  {projects.map((project) => (
                    <Option key={project.id} value={project.id}>
                      {project.name}
                    </Option>
                  ))}
                </Select>
              </div>
              <Select
                value={selectedPeriod}
                onChange={setSelectedPeriod}
                style={{ width: 120 }}
              >
                <Option value="7d">Last 7 days</Option>
                <Option value="30d">Last 30 days</Option>
                <Option value="90d">Last 90 days</Option>
              </Select>
              <Button
                icon={<ReloadOutlined />}
                onClick={() =>
                  selectedProject?.id &&
                  fetchProjectOverview(selectedProject.id)
                }
              >
                Refresh
              </Button>
              <Button icon={<SettingOutlined />}>Settings</Button>
            </Space>
          </div>
        </div>

        <Tabs
          activeKey={activeTab}
          onChange={setActiveTab}
          items={tabItems}
          size="large"
          className={styles.mainTabs}
        />

        <AddRankingModal
          visible={showAddRankingModal}
          onCancel={() => setShowAddRankingModal(false)}
          onSubmit={handleAddRanking}
          loading={loading}
        />
      </div>
    </Spin>
  );
};

export default PositionTrackingManager;
