import React, { useState, useEffect } from "react";
import {
  Table,
  Card,
  Button,
  Space,
  Tag,
  Typography,
  Popconfirm,
  message,
  Modal,
  Progress,
  Tooltip,
  Input,
  Select,
  Row,
  Col,
} from "antd";
import {
  DeleteOutlined,
  EyeOutlined,
  ReloadOutlined,
  SearchOutlined,
  FilterOutlined,
} from "@ant-design/icons";
import { ColumnsType } from "antd/es/table";
import { useAppDispatch, useAppSelector } from "@/stores/hooks";
import {
  fetchProjectAudits,
  deleteAudit,
  fetchAuditResults,
} from "@/stores/slices/on-page-seo.slice";
import { OnPageSEOAudit } from "@/types/on-page-seo.type";
import OnPageSEOResults from "./OnPageSEOResults";

const { Title, Text } = Typography;
const { Search } = Input;
const { Option } = Select;

interface OnPageSEOHistoryProps {
  projectId: string;
}

const OnPageSEOHistory: React.FC<OnPageSEOHistoryProps> = ({ projectId }) => {
  const dispatch = useAppDispatch();
  const {
    audits = [],
    loading,
    pagination,
    currentResults,
  } = useAppSelector((state) => state.onPageSEO);

  const [selectedAudit, setSelectedAudit] = useState<OnPageSEOAudit | null>(
    null
  );
  const [resultsModalVisible, setResultsModalVisible] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");

  // Load audits on component mount and when filters change
  useEffect(() => {
    loadAudits();
  }, [projectId, pagination.page, pagination.limit]);

  const loadAudits = () => {
    dispatch(
      fetchProjectAudits({
        projectId,
        params: {
          page: pagination.page,
          limit: pagination.limit,
          sortBy: "createdAt",
          sortOrder: "desc",
        },
      })
    );
  };

  // Handle view results
  const handleViewResults = async (audit: OnPageSEOAudit) => {
    if (audit.status === "completed") {
      setSelectedAudit(audit);
      const resultAction = await dispatch(fetchAuditResults(audit.id));

      if (fetchAuditResults.fulfilled.match(resultAction)) {
        setResultsModalVisible(true);
      } else {
        message.error("Failed to load results");
      }
    } else {
      message.warning("Analysis is not completed yet");
    }
  };

  // Handle delete audit
  const handleDelete = async (auditId: string) => {
    const resultAction = await dispatch(deleteAudit(auditId));

    if (deleteAudit.fulfilled.match(resultAction)) {
      message.success("Audit deleted successfully");
      loadAudits(); // Reload the list
    } else {
      message.error("Failed to delete audit");
    }
  };

  // Get status color
  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "orange";
      case "processing":
        return "blue";
      case "completed":
        return "green";
      case "failed":
        return "red";
      case "cancelled":
        return "default";
      default:
        return "default";
    }
  };

  // Format date
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString();
  };

  // Filter audits based on search and status
  const filteredAudits = audits.filter((audit) => {
    const matchesSearch =
      searchText === "" ||
      audit.id.toLowerCase().includes(searchText.toLowerCase());

    const matchesStatus =
      statusFilter === "all" || audit.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  // Table columns
  const columns: ColumnsType<OnPageSEOAudit> = [
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      width: 120,
      render: (status: string, record) => (
        <Space direction="vertical" size="small">
          <Tag color={getStatusColor(status)}>
            {status.charAt(0).toUpperCase() + status.slice(1)}
          </Tag>
          {record.progress !== undefined && status === "processing" && (
            <Progress percent={record.progress} size="small" />
          )}
        </Space>
      ),
    },
    {
      title: "URL",
      dataIndex: "id",
      key: "url",
      ellipsis: true,
      render: (_, record) => (
        <Tooltip title={record.id}>
          <Text code style={{ fontSize: "12px" }}>
            {record.id.substring(0, 30)}...
          </Text>
        </Tooltip>
      ),
    },
    {
      title: "Created",
      dataIndex: "createdAt",
      key: "createdAt",
      width: 180,
      render: (date: string) => (
        <Text style={{ fontSize: "12px" }}>{formatDate(date)}</Text>
      ),
    },
    {
      title: "Completed",
      dataIndex: "completedAt",
      key: "completedAt",
      width: 180,
      render: (date: string) => (
        <Text style={{ fontSize: "12px" }}>
          {date ? formatDate(date) : "-"}
        </Text>
      ),
    },
    {
      title: "Configuration",
      dataIndex: "config",
      key: "config",
      width: 200,
      render: (config: any) => (
        <Space wrap>
          {config?.auditType && <Tag>{config.auditType}</Tag>}
          {config?.includeImages && <Tag>Images</Tag>}
          {config?.checkMobileFriendly && <Tag>Mobile</Tag>}
        </Space>
      ),
    },
    {
      title: "Actions",
      key: "actions",
      width: 150,
      render: (_, record) => (
        <Space>
          <Tooltip title="View Results">
            <Button
              type="text"
              icon={<EyeOutlined />}
              onClick={() => handleViewResults(record)}
              disabled={record.status !== "completed"}
              size="small"
            />
          </Tooltip>

          <Popconfirm
            title="Delete this audit?"
            description="This action cannot be undone"
            onConfirm={() => handleDelete(record.id)}
            okText="Delete"
            cancelText="Cancel"
            okType="danger"
          >
            <Tooltip title="Delete">
              <Button
                type="text"
                icon={<DeleteOutlined />}
                danger
                size="small"
                disabled={record.status === "processing"}
              />
            </Tooltip>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <>
      <Card
        title={
          <Space>
            <Title level={4} style={{ margin: 0 }}>
              Analysis History
            </Title>
          </Space>
        }
        extra={
          <Button
            icon={<ReloadOutlined />}
            onClick={loadAudits}
            loading={loading}
          >
            Refresh
          </Button>
        }
      >
        {/* Filters */}
        <Row gutter={[16, 16]} style={{ marginBottom: "16px" }}>
          <Col xs={24} sm={12} md={8}>
            <Search
              placeholder="Search by ID..."
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              prefix={<SearchOutlined />}
              allowClear
            />
          </Col>
          <Col xs={24} sm={12} md={8}>
            <Select
              placeholder="Filter by status"
              value={statusFilter}
              onChange={setStatusFilter}
              style={{ width: "100%" }}
              prefix={<FilterOutlined />}
            >
              <Option value="all">All Status</Option>
              <Option value="pending">Pending</Option>
              <Option value="processing">Processing</Option>
              <Option value="completed">Completed</Option>
              <Option value="failed">Failed</Option>
              <Option value="cancelled">Cancelled</Option>
            </Select>
          </Col>
        </Row>

        {/* Table */}
        <Table
          columns={columns}
          dataSource={filteredAudits}
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
            onChange: (page, pageSize) => {
              dispatch(
                fetchProjectAudits({
                  projectId,
                  params: {
                    page,
                    limit: pageSize,
                    sortBy: "createdAt",
                    sortOrder: "desc",
                  },
                })
              );
            },
          }}
          scroll={{ x: 800 }}
        />
      </Card>

      {/* Results Modal */}
      <Modal
        title={
          selectedAudit ? (
            <Space>
              <EyeOutlined />
              SEO Analysis Results
              <Text type="secondary" style={{ fontSize: "12px" }}>
                ({selectedAudit.id})
              </Text>
            </Space>
          ) : (
            "SEO Analysis Results"
          )
        }
        open={resultsModalVisible}
        onCancel={() => {
          setResultsModalVisible(false);
          setSelectedAudit(null);
        }}
        footer={null}
        width="90%"
        style={{ top: 20 }}
        bodyStyle={{ maxHeight: "80vh", overflow: "auto" }}
      >
        {currentResults && <OnPageSEOResults results={currentResults} />}
      </Modal>
    </>
  );
};

export default OnPageSEOHistory;
