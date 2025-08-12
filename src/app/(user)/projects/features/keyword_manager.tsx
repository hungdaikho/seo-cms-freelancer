import React, { useEffect, useState } from "react";
import {
  Table,
  Button,
  Space,
  Modal,
  Form,
  Input,
  InputNumber,
  message,
  Popconfirm,
  Card,
  Typography,
  Tooltip,
  Tag,
  Progress,
  Select,
  Upload,
  Drawer,
} from "antd";
import {
  PlusOutlined,
  DeleteOutlined,
  EditOutlined,
  UploadOutlined,
  LineChartOutlined,
  ArrowUpOutlined,
  ArrowDownOutlined,
  MinusOutlined,
} from "@ant-design/icons";
import { useKeyword } from "@/stores/hooks/useKeyword";
import {
  Keyword,
  CreateKeywordRequest,
  UpdateKeywordRequest,
} from "@/types/api.type";
import styles from "./keyword_manager.module.scss";

const { Title, Text } = Typography;
const { Option } = Select;
const { TextArea } = Input;

interface KeywordManagerProps {
  projectId: string;
  projectName?: string;
}

const KeywordManager: React.FC<KeywordManagerProps> = ({
  projectId,
  projectName,
}) => {
  const {
    keywords,
    currentKeyword,
    rankingHistory,
    loading,
    error,
    pagination,
    addKeywordToProject,
    bulkAddKeywords,
    fetchProjectKeywords,
    updateKeyword,
    deleteKeyword,
    fetchKeywordRankingHistory,
    clearError,
    setCurrentKeyword,
  } = useKeyword();

  const [isAddModalVisible, setIsAddModalVisible] = useState(false);
  const [isBulkModalVisible, setIsBulkModalVisible] = useState(false);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [isHistoryDrawerVisible, setIsHistoryDrawerVisible] = useState(false);
  const [editingKeyword, setEditingKeyword] = useState<Keyword | null>(null);
  const [searchText, setSearchText] = useState("");
  const [sortBy, setSortBy] = useState("createdAt");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
  const [bulkKeywords, setBulkKeywords] = useState("");
  const [form] = Form.useForm();

  useEffect(() => {
    if (projectId) {
      loadKeywords();
    }
  }, [projectId]);

  useEffect(() => {
    if (error) {
      message.error(error);
      clearError();
    }
  }, [error]);

  const loadKeywords = (params?: any) => {
    fetchProjectKeywords(projectId, {
      page: params?.current || 1,
      limit: params?.pageSize || 20,
      search: searchText,
      sortBy,
      sortOrder,
      ...params,
    });
  };

  const handleAddKeyword = async (values: CreateKeywordRequest) => {
    try {
      await addKeywordToProject(projectId, values);
      message.success("Keyword added successfully!");
      setIsAddModalVisible(false);
      form.resetFields();
      loadKeywords();
    } catch (error) {
      // Error handled by Redux slice
    }
  };

  const handleBulkAdd = async () => {
    if (!bulkKeywords.trim()) {
      message.error("Please enter keywords");
      return;
    }

    const keywordLines = bulkKeywords.split("\n").filter((line) => line.trim());
    const keywordData = keywordLines.map((line) => {
      const parts = line.split(",").map((part) => part.trim());
      return {
        keyword: parts[0],
        targetUrl: parts[1] || "",
        searchVolume: parts[2] ? parseInt(parts[2]) : undefined,
        difficulty: parts[3] ? parseFloat(parts[3]) : undefined,
        cpc: parts[4] ? parseFloat(parts[4]) : undefined,
      };
    });

    try {
      await bulkAddKeywords(projectId, { keywords: keywordData });
      message.success(`${keywordData.length} keywords added successfully!`);
      setIsBulkModalVisible(false);
      setBulkKeywords("");
      loadKeywords();
    } catch (error) {
      // Error handled by Redux slice
    }
  };

  const handleEditKeyword = async (values: UpdateKeywordRequest) => {
    if (!editingKeyword) return;

    try {
      await updateKeyword(editingKeyword.id, values);
      message.success("Keyword updated successfully!");
      setIsEditModalVisible(false);
      setEditingKeyword(null);
      form.resetFields();
      loadKeywords();
    } catch (error) {
      // Error handled by Redux slice
    }
  };

  const handleDeleteKeyword = async (keywordId: string) => {
    try {
      await deleteKeyword(keywordId);
      message.success("Keyword deleted successfully!");
      loadKeywords();
    } catch (error) {
      // Error handled by Redux slice
    }
  };

  const handleViewHistory = async (keyword: Keyword) => {
    setCurrentKeyword(keyword);
    await fetchKeywordRankingHistory(keyword.id, { days: 30 });
    setIsHistoryDrawerVisible(true);
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

  const getRankingChange = (keyword: Keyword) => {
    // This would be calculated based on ranking history
    // For demo purposes, returning random value
    const change = Math.floor(Math.random() * 21) - 10; // -10 to +10
    return change;
  };

  const getRankingIcon = (change: number) => {
    if (change > 0) return <ArrowUpOutlined style={{ color: "#52c41a" }} />;
    if (change < 0) return <ArrowDownOutlined style={{ color: "#ff4d4f" }} />;
    return <MinusOutlined style={{ color: "#8c8c8c" }} />;
  };

  const getDifficultyColor = (difficulty?: number) => {
    if (!difficulty) return "default";
    if (difficulty <= 30) return "green";
    if (difficulty <= 60) return "orange";
    return "red";
  };

  const columns = [
    {
      title: "Keyword",
      dataIndex: "keyword",
      key: "keyword",
      render: (text: string, record: Keyword) => (
        <div className={styles.keywordCell}>
          <Text strong>{text}</Text>
          {record.isTracking && <Tag color="blue">Tracking</Tag>}
        </div>
      ),
    },
    {
      title: "Current Position",
      dataIndex: "currentRanking",
      key: "currentRanking",
      render: (position: number, record: Keyword) => {
        const change = getRankingChange(record);
        return (
          <div className={styles.rankingCell}>
            <Text strong>{position || "-"}</Text>
            {getRankingIcon(change)}
            <Text
              type={
                change > 0 ? "success" : change < 0 ? "danger" : "secondary"
              }
            >
              {change !== 0 && (change > 0 ? `+${change}` : change)}
            </Text>
          </div>
        );
      },
    },
    {
      title: "Search Volume",
      dataIndex: "searchVolume",
      key: "searchVolume",
      render: (volume: number) => (volume ? volume.toLocaleString() : "-"),
    },
    {
      title: "Difficulty",
      dataIndex: "difficulty",
      key: "difficulty",
      render: (difficulty: number) =>
        difficulty ? (
          <div>
            <Progress
              percent={difficulty}
              size="small"
              status={difficulty > 70 ? "exception" : "normal"}
              format={() => `${difficulty}%`}
            />
            <Tag color={getDifficultyColor(difficulty)}>
              {difficulty <= 30 ? "Easy" : difficulty <= 60 ? "Medium" : "Hard"}
            </Tag>
          </div>
        ) : (
          "-"
        ),
    },
    {
      title: "CPC",
      dataIndex: "cpc",
      key: "cpc",
      render: (cpc: number) => (cpc ? `$${cpc.toFixed(2)}` : "-"),
    },
    {
      title: "Target URL",
      dataIndex: "targetUrl",
      key: "targetUrl",
      render: (url: string) =>
        url ? (
          <Tooltip title={url}>
            <Text ellipsis style={{ maxWidth: 200 }}>
              {url}
            </Text>
          </Tooltip>
        ) : (
          "-"
        ),
    },
    {
      title: "Actions",
      key: "actions",
      render: (_: any, record: Keyword) => (
        <Space size="small">
          <Tooltip title="View Ranking History">
            <Button
              icon={<LineChartOutlined />}
              size="small"
              onClick={() => handleViewHistory(record)}
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
          <Title level={3}>Keywords - {projectName}</Title>
          <Text type="secondary">Track and manage your SEO keywords</Text>
        </div>
        <Space>
          <Button
            icon={<UploadOutlined />}
            onClick={() => setIsBulkModalVisible(true)}
          >
            Bulk Import
          </Button>
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={() => setIsAddModalVisible(true)}
          >
            Add Keyword
          </Button>
        </Space>
      </div>

      {/* Filters */}
      <div className={styles.filters}>
        <Space>
          <Input.Search
            placeholder="Search keywords..."
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            onSearch={() => loadKeywords()}
            style={{ width: 300 }}
          />
          <Select
            value={sortBy}
            onChange={(value) => {
              setSortBy(value);
              loadKeywords({ sortBy: value, sortOrder });
            }}
            style={{ width: 150 }}
          >
            <Option value="keyword">Keyword</Option>
            <Option value="currentRanking">Position</Option>
            <Option value="searchVolume">Volume</Option>
            <Option value="difficulty">Difficulty</Option>
            <Option value="createdAt">Date Added</Option>
          </Select>
          <Select
            value={sortOrder}
            onChange={(value) => {
              setSortOrder(value);
              loadKeywords({ sortBy, sortOrder: value });
            }}
            style={{ width: 120 }}
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
            onChange: (page, pageSize) =>
              loadKeywords({ current: page, pageSize }),
          }}
        />
      </Card>

      {/* Add Keyword Modal */}
      <Modal
        title="Add New Keyword"
        open={isAddModalVisible}
        onCancel={() => {
          setIsAddModalVisible(false);
          form.resetFields();
        }}
        footer={null}
        width={600}
      >
        <Form form={form} layout="vertical" onFinish={handleAddKeyword}>
          <Form.Item
            name="keyword"
            label="Keyword"
            rules={[
              { required: true, message: "Please enter keyword" },
              { min: 2, message: "Keyword must be at least 2 characters" },
            ]}
          >
            <Input placeholder="Enter keyword" />
          </Form.Item>

          <Form.Item
            name="targetUrl"
            label="Target URL"
            rules={[{ type: "url", message: "Please enter a valid URL" }]}
          >
            <Input placeholder="https://example.com/page" />
          </Form.Item>

          <Form.Item name="searchVolume" label="Search Volume">
            <InputNumber
              min={0}
              placeholder="Monthly search volume"
              style={{ width: "100%" }}
            />
          </Form.Item>

          <Form.Item name="difficulty" label="Keyword Difficulty (%)">
            <InputNumber
              min={0}
              max={100}
              placeholder="0-100"
              style={{ width: "100%" }}
            />
          </Form.Item>

          <Form.Item name="cpc" label="Cost Per Click ($)">
            <InputNumber
              min={0}
              step={0.01}
              placeholder="0.00"
              style={{ width: "100%" }}
            />
          </Form.Item>

          <Form.Item>
            <Space>
              <Button type="primary" htmlType="submit" loading={loading}>
                Add Keyword
              </Button>
              <Button
                onClick={() => {
                  setIsAddModalVisible(false);
                  form.resetFields();
                }}
              >
                Cancel
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Modal>

      {/* Bulk Import Modal */}
      <Modal
        title="Bulk Import Keywords"
        open={isBulkModalVisible}
        onCancel={() => {
          setIsBulkModalVisible(false);
          setBulkKeywords("");
        }}
        footer={null}
        width={700}
      >
        <div className={styles.bulkImport}>
          <Text>
            Enter keywords one per line. You can include additional data
            separated by commas:
          </Text>
          <Text
            type="secondary"
            style={{ fontSize: "12px", display: "block", marginTop: "8px" }}
          >
            Format: keyword, target_url, search_volume, difficulty, cpc
          </Text>
          <TextArea
            rows={10}
            value={bulkKeywords}
            onChange={(e) => setBulkKeywords(e.target.value)}
            placeholder={`seo tools, https://example.com/seo-tools, 1000, 65, 2.50
keyword research, https://example.com/keyword-research, 800, 45, 1.80
content marketing, https://example.com/content, 1200, 55, 3.20`}
            style={{ marginTop: "16px" }}
          />
          <div style={{ marginTop: "16px" }}>
            <Space>
              <Button type="primary" onClick={handleBulkAdd} loading={loading}>
                Import Keywords
              </Button>
              <Button
                onClick={() => {
                  setIsBulkModalVisible(false);
                  setBulkKeywords("");
                }}
              >
                Cancel
              </Button>
            </Space>
          </div>
        </div>
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
              { min: 2, message: "Keyword must be at least 2 characters" },
            ]}
          >
            <Input placeholder="Enter keyword" />
          </Form.Item>

          <Form.Item
            name="targetUrl"
            label="Target URL"
            rules={[{ type: "url", message: "Please enter a valid URL" }]}
          >
            <Input placeholder="https://example.com/page" />
          </Form.Item>

          <Form.Item name="searchVolume" label="Search Volume">
            <InputNumber
              min={0}
              placeholder="Monthly search volume"
              style={{ width: "100%" }}
            />
          </Form.Item>

          <Form.Item name="difficulty" label="Keyword Difficulty (%)">
            <InputNumber
              min={0}
              max={100}
              placeholder="0-100"
              style={{ width: "100%" }}
            />
          </Form.Item>

          <Form.Item name="cpc" label="Cost Per Click ($)">
            <InputNumber
              min={0}
              step={0.01}
              placeholder="0.00"
              style={{ width: "100%" }}
            />
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
        open={isHistoryDrawerVisible}
        onClose={() => setIsHistoryDrawerVisible(false)}
      >
        {rankingHistory.length > 0 ? (
          <div className={styles.historyContent}>
            {rankingHistory.map((ranking, index) => (
              <Card
                key={ranking.id}
                size="small"
                className={styles.historyCard}
              >
                <div className={styles.historyItem}>
                  <div>
                    <Text strong>Position: {ranking.position}</Text>
                    <br />
                    <Text type="secondary">
                      {new Date(ranking.date).toLocaleDateString()}
                    </Text>
                  </div>
                  <div>
                    <Text ellipsis style={{ maxWidth: 200 }}>
                      {ranking.url}
                    </Text>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        ) : (
          <div style={{ textAlign: "center", padding: "40px 0" }}>
            <Text type="secondary">No ranking history available</Text>
          </div>
        )}
      </Drawer>
    </div>
  );
};

export default KeywordManager;
