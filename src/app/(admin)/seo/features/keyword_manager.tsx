"use client";

import React, { useEffect, useState } from "react";
import {
  Table,
  Card,
  Button,
  Input,
  Space,
  Tag,
  Tooltip,
  Modal,
  Form,
  Select,
  InputNumber,
  message,
  Popconfirm,
  Badge,
  Row,
  Col,
  Progress,
  Typography,
  Drawer,
} from "antd";
import {
  PlusOutlined,
  UploadOutlined,
  EditOutlined,
  DeleteOutlined,
  RiseOutlined,
  FallOutlined,
  LineChartOutlined,
  DownloadOutlined,
} from "@ant-design/icons";
import { useAppDispatch, useAppSelector } from "@/stores/hooks";
import {
  fetchProjectKeywords,
  addKeywordToProject,
  bulkAddKeywords,
  updateKeyword,
  deleteKeyword,
  fetchKeywordRankingHistory,
  setFilters,
  setPagination,
  setCurrentKeyword,
} from "@/stores/slices/seo.slice";
import { Keyword } from "@/types/api.type";
import styles from "./keyword_manager.module.scss";

const { Title, Text } = Typography;
const { Option } = Select;
const { TextArea } = Input;

interface KeywordManagerProps {
  projectId: string;
}

const KeywordManager: React.FC<KeywordManagerProps> = ({ projectId }) => {
  const dispatch = useAppDispatch();
  const {
    keywords,
    loading,
    error,
    pagination,
    filters,
    currentKeyword,
    keywordRankings,
  } = useAppSelector((state) => state.seo);

  const [form] = Form.useForm();
  const [bulkForm] = Form.useForm();
  const [isCreateModalVisible, setIsCreateModalVisible] = useState(false);
  const [isBulkModalVisible, setIsBulkModalVisible] = useState(false);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [isRankingDrawerVisible, setIsRankingDrawerVisible] = useState(false);
  const [editingKeyword, setEditingKeyword] = useState<Keyword | null>(null);
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    loadKeywords();
  }, [projectId, pagination.page, pagination.limit, filters]);

  useEffect(() => {
    if (error) {
      message.error(error);
    }
  }, [error]);

  const loadKeywords = () => {
    dispatch(
      fetchProjectKeywords({
        projectId,
        params: {
          page: pagination.page,
          limit: pagination.limit,
          search: filters.search,
          sortBy: filters.sortBy,
          sortOrder: filters.sortOrder,
        },
      })
    );
  };

  const handleCreateKeyword = async (values: any) => {
    try {
      await dispatch(addKeywordToProject({ projectId, data: values })).unwrap();
      setIsCreateModalVisible(false);
      form.resetFields();
      message.success("Keyword added successfully");
    } catch (error) {
      // Error is handled by the slice
    }
  };

  const handleBulkAddKeywords = async (values: any) => {
    try {
      const keywords = values.keywords
        .split("\n")
        .filter((k: string) => k.trim())
        .map((keyword: string) => ({
          keyword: keyword.trim(),
          targetUrl: values.targetUrl || "",
          searchVolume: values.searchVolume || undefined,
          difficulty: values.difficulty || undefined,
          cpc: values.cpc || undefined,
        }));

      await dispatch(
        bulkAddKeywords({ projectId, data: { keywords } })
      ).unwrap();
      setIsBulkModalVisible(false);
      bulkForm.resetFields();
      message.success(`${keywords.length} keywords added successfully`);
    } catch (error) {
      // Error is handled by the slice
    }
  };

  const handleEditKeyword = async (values: any) => {
    if (!editingKeyword) return;

    try {
      await dispatch(
        updateKeyword({ keywordId: editingKeyword.id, data: values })
      ).unwrap();
      setIsEditModalVisible(false);
      setEditingKeyword(null);
      form.resetFields();
      message.success("Keyword updated successfully");
    } catch (error) {
      // Error is handled by the slice
    }
  };

  const handleDeleteKeyword = async (keywordId: string) => {
    try {
      await dispatch(deleteKeyword(keywordId)).unwrap();
      message.success("Keyword deleted successfully");
    } catch (error) {
      // Error is handled by the slice
    }
  };

  const handleViewRankingHistory = async (keyword: Keyword) => {
    dispatch(setCurrentKeyword(keyword));
    await dispatch(
      fetchKeywordRankingHistory({
        keywordId: keyword.id,
        params: { days: 30 },
      })
    );
    setIsRankingDrawerVisible(true);
  };

  const openEditModal = (keyword: Keyword) => {
    setEditingKeyword(keyword);
    form.setFieldsValue({
      keyword: keyword.keyword,
      targetUrl: keyword.targetUrl,
      searchVolume: keyword.searchVolume,
      difficulty: keyword.difficulty,
      cpc: keyword.cpc,
      isTracking: keyword.isTracking,
    });
    setIsEditModalVisible(true);
  };

  const handleSearch = (value: string) => {
    setSearchText(value);
    dispatch(setFilters({ search: value }));
    dispatch(setPagination({ page: 1 }));
  };

  const handleSortChange = (sortBy: string, sortOrder: "asc" | "desc") => {
    dispatch(setFilters({ sortBy, sortOrder }));
  };

  const getRankingTrend = (keyword: Keyword) => {
    if (!keyword.latestRanking || !keyword.currentRanking) return null;
    const change = keyword.currentRanking - keyword.latestRanking.position;
    if (change > 0) return { trend: "down", change };
    if (change < 0) return { trend: "up", change: Math.abs(change) };
    return { trend: "stable", change: 0 };
  };

  const getDifficultyColor = (difficulty?: number) => {
    if (!difficulty) return "default";
    if (difficulty < 30) return "green";
    if (difficulty < 60) return "orange";
    return "red";
  };

  const columns = [
    {
      title: "Keyword",
      dataIndex: "keyword",
      key: "keyword",
      width: 200,
      sorter: true,
      render: (text: string, record: Keyword) => (
        <div className={styles.keywordCell}>
          <Text strong>{text}</Text>
          <div className={styles.keywordMeta}>
            <Tag color={record.isTracking ? "green" : "default"}>
              {record.isTracking ? "Tracking" : "Not Tracking"}
            </Tag>
          </div>
        </div>
      ),
    },
    {
      title: "Position",
      dataIndex: "currentRanking",
      key: "currentRanking",
      width: 120,
      sorter: true,
      render: (position: number, record: Keyword) => {
        const trend = getRankingTrend(record);
        return (
          <div className={styles.positionCell}>
            <Text
              strong
              className={
                position <= 10 ? styles.topPosition : styles.normalPosition
              }
            >
              {position || "N/A"}
            </Text>
            {trend && trend.trend !== "stable" && (
              <div className={styles.trendIndicator}>
                {trend.trend === "up" ? (
                  <RiseOutlined style={{ color: "#52c41a" }} />
                ) : (
                  <FallOutlined style={{ color: "#ff4d4f" }} />
                )}
                <Text type={trend.trend === "up" ? "success" : "danger"}>
                  {trend.change}
                </Text>
              </div>
            )}
          </div>
        );
      },
    },
    {
      title: "Search Volume",
      dataIndex: "searchVolume",
      key: "searchVolume",
      width: 120,
      sorter: true,
      render: (volume: number) => (
        <Text>{volume ? volume.toLocaleString() : "N/A"}</Text>
      ),
    },
    {
      title: "Difficulty",
      dataIndex: "difficulty",
      key: "difficulty",
      width: 120,
      sorter: true,
      render: (difficulty: number) => (
        <div className={styles.difficultyCell}>
          {difficulty ? (
            <>
              <Progress
                percent={difficulty}
                size="small"
                strokeColor={getDifficultyColor(difficulty)}
                showInfo={false}
                style={{ width: 60 }}
              />
              <Text>{difficulty}%</Text>
            </>
          ) : (
            <Text>N/A</Text>
          )}
        </div>
      ),
    },
    {
      title: "CPC",
      dataIndex: "cpc",
      key: "cpc",
      width: 100,
      sorter: true,
      render: (cpc: number) => (
        <Text>{cpc ? `$${cpc.toFixed(2)}` : "N/A"}</Text>
      ),
    },
    {
      title: "Target URL",
      dataIndex: "targetUrl",
      key: "targetUrl",
      width: 200,
      ellipsis: true,
      render: (url: string) => (
        <Tooltip title={url}>
          <Text type="secondary">{url}</Text>
        </Tooltip>
      ),
    },
    {
      title: "Actions",
      key: "actions",
      width: 150,
      render: (_: any, record: Keyword) => (
        <Space size="small">
          <Tooltip title="View Ranking History">
            <Button
              icon={<LineChartOutlined />}
              size="small"
              onClick={() => handleViewRankingHistory(record)}
            />
          </Tooltip>
          <Tooltip title="Edit Keyword">
            <Button
              icon={<EditOutlined />}
              size="small"
              onClick={() => openEditModal(record)}
            />
          </Tooltip>
          <Popconfirm
            title="Delete Keyword"
            description="Are you sure you want to delete this keyword?"
            onConfirm={() => handleDeleteKeyword(record.id)}
            okText="Yes"
            cancelText="No"
          >
            <Tooltip title="Delete Keyword">
              <Button icon={<DeleteOutlined />} size="small" danger />
            </Tooltip>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <div className={styles.keywordManager}>
      {/* Header */}
      <div className={styles.header}>
        <div>
          <Title level={3}>Keyword Management</Title>
          <Text type="secondary">Track and manage your SEO keywords</Text>
        </div>
        <Space>
          <Button
            icon={<DownloadOutlined />}
            onClick={() => message.info("Export feature coming soon")}
          >
            Export
          </Button>
          <Button
            icon={<UploadOutlined />}
            onClick={() => setIsBulkModalVisible(true)}
          >
            Bulk Add
          </Button>
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={() => setIsCreateModalVisible(true)}
          >
            Add Keyword
          </Button>
        </Space>
      </div>

      {/* Summary Cards */}
      <Row gutter={16} className={styles.summaryCards}>
        <Col span={6}>
          <Card>
            <div className={styles.statCard}>
              <div className={styles.statNumber}>
                <Badge
                  count={keywords.length}
                  overflowCount={999}
                  color="blue"
                />
              </div>
              <Text type="secondary">Total Keywords</Text>
            </div>
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <div className={styles.statCard}>
              <div className={styles.statNumber}>
                <Badge
                  count={keywords.filter((k) => k.isTracking).length}
                  overflowCount={999}
                  color="green"
                />
              </div>
              <Text type="secondary">Tracking</Text>
            </div>
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <div className={styles.statCard}>
              <div className={styles.statNumber}>
                <Badge
                  count={
                    keywords.filter(
                      (k) => k.currentRanking && k.currentRanking <= 10
                    ).length
                  }
                  overflowCount={999}
                  color="gold"
                />
              </div>
              <Text type="secondary">Top 10</Text>
            </div>
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <div className={styles.statCard}>
              <div className={styles.statNumber}>
                <Text strong>
                  {keywords.length > 0
                    ? (
                        keywords.reduce(
                          (acc, k) => acc + (k.currentRanking || 0),
                          0
                        ) / keywords.filter((k) => k.currentRanking).length || 0
                      ).toFixed(1)
                    : "N/A"}
                </Text>
              </div>
              <Text type="secondary">Avg. Position</Text>
            </div>
          </Card>
        </Col>
      </Row>

      {/* Search and Filters */}
      <div className={styles.searchSection}>
        <Input.Search
          placeholder="Search keywords..."
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          onSearch={handleSearch}
          style={{ width: 300 }}
        />
        <Space>
          <Select
            placeholder="Sort by"
            style={{ width: 150 }}
            value={filters.sortBy}
            onChange={(value) =>
              handleSortChange(value, filters.sortOrder || "desc")
            }
          >
            <Option value="keyword">Keyword</Option>
            <Option value="currentRanking">Position</Option>
            <Option value="searchVolume">Search Volume</Option>
            <Option value="difficulty">Difficulty</Option>
            <Option value="createdAt">Created Date</Option>
          </Select>
          <Select
            placeholder="Order"
            style={{ width: 120 }}
            value={filters.sortOrder}
            onChange={(value) =>
              handleSortChange(filters.sortBy || "createdAt", value)
            }
          >
            <Option value="asc">Ascending</Option>
            <Option value="desc">Descending</Option>
          </Select>
        </Space>
      </div>

      {/* Keywords Table */}
      <Card>
        <Table
          columns={columns}
          dataSource={keywords}
          rowKey="id"
          loading={loading}
          pagination={{
            current: pagination.page,
            pageSize: pagination.limit,
            total: pagination.total,
            showSizeChanger: true,
            showQuickJumper: true,
            showTotal: (total, range) =>
              `${range[0]}-${range[1]} of ${total} keywords`,
            onChange: (page, pageSize) =>
              dispatch(setPagination({ page, limit: pageSize })),
          }}
          scroll={{ x: 1200 }}
        />
      </Card>

      {/* Create Keyword Modal */}
      <Modal
        title="Add New Keyword"
        open={isCreateModalVisible}
        onCancel={() => {
          setIsCreateModalVisible(false);
          form.resetFields();
        }}
        footer={null}
        width={600}
      >
        <Form form={form} layout="vertical" onFinish={handleCreateKeyword}>
          <Form.Item
            name="keyword"
            label="Keyword"
            rules={[
              { required: true, message: "Please enter keyword" },
              { min: 1, max: 255, message: "Keyword must be 1-255 characters" },
            ]}
          >
            <Input placeholder="Enter keyword" />
          </Form.Item>

          <Form.Item
            name="targetUrl"
            label="Target URL"
            rules={[
              { required: true, message: "Please enter target URL" },
              { type: "url", message: "Please enter a valid URL" },
            ]}
          >
            <Input placeholder="https://example.com/page" />
          </Form.Item>

          <Row gutter={16}>
            <Col span={8}>
              <Form.Item name="searchVolume" label="Search Volume">
                <InputNumber
                  placeholder="1000"
                  min={0}
                  style={{ width: "100%" }}
                />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item name="difficulty" label="Difficulty (%)">
                <InputNumber
                  placeholder="65"
                  min={0}
                  max={100}
                  style={{ width: "100%" }}
                />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item name="cpc" label="CPC ($)">
                <InputNumber
                  placeholder="2.50"
                  min={0}
                  step={0.01}
                  style={{ width: "100%" }}
                />
              </Form.Item>
            </Col>
          </Row>

          <Form.Item>
            <Space>
              <Button type="primary" htmlType="submit" loading={loading}>
                Add Keyword
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

      {/* Bulk Add Keywords Modal */}
      <Modal
        title="Bulk Add Keywords"
        open={isBulkModalVisible}
        onCancel={() => {
          setIsBulkModalVisible(false);
          bulkForm.resetFields();
        }}
        footer={null}
        width={700}
      >
        <Form
          form={bulkForm}
          layout="vertical"
          onFinish={handleBulkAddKeywords}
        >
          <Form.Item
            name="keywords"
            label="Keywords (one per line)"
            rules={[{ required: true, message: "Please enter keywords" }]}
          >
            <TextArea
              rows={8}
              placeholder={`seo tools
keyword research
content optimization
link building`}
            />
          </Form.Item>

          <Form.Item name="targetUrl" label="Default Target URL (optional)">
            <Input placeholder="https://example.com/page" />
          </Form.Item>

          <Row gutter={16}>
            <Col span={8}>
              <Form.Item name="searchVolume" label="Default Search Volume">
                <InputNumber
                  placeholder="1000"
                  min={0}
                  style={{ width: "100%" }}
                />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item name="difficulty" label="Default Difficulty (%)">
                <InputNumber
                  placeholder="65"
                  min={0}
                  max={100}
                  style={{ width: "100%" }}
                />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item name="cpc" label="Default CPC ($)">
                <InputNumber
                  placeholder="2.50"
                  min={0}
                  step={0.01}
                  style={{ width: "100%" }}
                />
              </Form.Item>
            </Col>
          </Row>

          <Form.Item>
            <Space>
              <Button type="primary" htmlType="submit" loading={loading}>
                Add Keywords
              </Button>
              <Button
                onClick={() => {
                  setIsBulkModalVisible(false);
                  bulkForm.resetFields();
                }}
              >
                Cancel
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Modal>

      {/* Edit Keyword Modal */}
      <Modal
        title="Edit Keyword"
        open={isEditModalVisible}
        onCancel={() => {
          setIsEditModalVisible(false);
          setEditingKeyword(null);
          form.resetFields();
        }}
        footer={null}
        width={600}
      >
        <Form form={form} layout="vertical" onFinish={handleEditKeyword}>
          <Form.Item
            name="keyword"
            label="Keyword"
            rules={[
              { required: true, message: "Please enter keyword" },
              { min: 1, max: 255, message: "Keyword must be 1-255 characters" },
            ]}
          >
            <Input placeholder="Enter keyword" />
          </Form.Item>

          <Form.Item
            name="targetUrl"
            label="Target URL"
            rules={[
              { required: true, message: "Please enter target URL" },
              { type: "url", message: "Please enter a valid URL" },
            ]}
          >
            <Input placeholder="https://example.com/page" />
          </Form.Item>

          <Row gutter={16}>
            <Col span={8}>
              <Form.Item name="searchVolume" label="Search Volume">
                <InputNumber
                  placeholder="1000"
                  min={0}
                  style={{ width: "100%" }}
                />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item name="difficulty" label="Difficulty (%)">
                <InputNumber
                  placeholder="65"
                  min={0}
                  max={100}
                  style={{ width: "100%" }}
                />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item name="cpc" label="CPC ($)">
                <InputNumber
                  placeholder="2.50"
                  min={0}
                  step={0.01}
                  style={{ width: "100%" }}
                />
              </Form.Item>
            </Col>
          </Row>

          <Form.Item
            name="isTracking"
            label="Tracking Status"
            valuePropName="checked"
          >
            <Select>
              <Option value={true}>Enable Tracking</Option>
              <Option value={false}>Disable Tracking</Option>
            </Select>
          </Form.Item>

          <Form.Item>
            <Space>
              <Button type="primary" htmlType="submit" loading={loading}>
                Update Keyword
              </Button>
              <Button
                onClick={() => {
                  setIsEditModalVisible(false);
                  setEditingKeyword(null);
                  form.resetFields();
                }}
              >
                Cancel
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Modal>

      {/* Ranking History Drawer */}
      <Drawer
        title={`${currentKeyword?.keyword} - Ranking History`}
        placement="right"
        width={600}
        open={isRankingDrawerVisible}
        onClose={() => setIsRankingDrawerVisible(false)}
      >
        {currentKeyword && keywordRankings.length > 0 ? (
          <div className={styles.rankingHistory}>
            <div className={styles.keywordInfo}>
              <Title level={4}>{currentKeyword.keyword}</Title>
              <Text type="secondary">{currentKeyword.targetUrl}</Text>
            </div>

            <div className={styles.currentStats}>
              <Row gutter={16}>
                <Col span={8}>
                  <div className={styles.statItem}>
                    <Text type="secondary">Current Position</Text>
                    <Title level={3}>
                      {currentKeyword.currentRanking || "N/A"}
                    </Title>
                  </div>
                </Col>
                <Col span={8}>
                  <div className={styles.statItem}>
                    <Text type="secondary">Search Volume</Text>
                    <Title level={3}>
                      {currentKeyword.searchVolume?.toLocaleString() || "N/A"}
                    </Title>
                  </div>
                </Col>
                <Col span={8}>
                  <div className={styles.statItem}>
                    <Text type="secondary">Difficulty</Text>
                    <Title level={3}>
                      {currentKeyword.difficulty
                        ? `${currentKeyword.difficulty}%`
                        : "N/A"}
                    </Title>
                  </div>
                </Col>
              </Row>
            </div>

            <div className={styles.historyList}>
              <Title level={5}>Ranking History (Last 30 days)</Title>
              {keywordRankings.map((ranking, index) => (
                <div key={ranking.id} className={styles.historyItem}>
                  <div className={styles.historyDate}>
                    <Text>{new Date(ranking.date).toLocaleDateString()}</Text>
                  </div>
                  <div className={styles.historyPosition}>
                    <Badge
                      count={ranking.position}
                      color={
                        ranking.position <= 10
                          ? "green"
                          : ranking.position <= 20
                          ? "orange"
                          : "red"
                      }
                    />
                  </div>
                  <div className={styles.historyUrl}>
                    <Text type="secondary" ellipsis>
                      {ranking.url}
                    </Text>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className={styles.noData}>
            <Text type="secondary">No ranking history available</Text>
          </div>
        )}
      </Drawer>
    </div>
  );
};

export default KeywordManager;
