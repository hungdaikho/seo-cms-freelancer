"use client";

import React, { useState, useEffect } from "react";
import {
  Modal,
  Table,
  Input,
  Button,
  message,
  Space,
  Tag,
  Typography,
  Tooltip,
  Card,
  Row,
  Col,
  Divider,
  App,
} from "antd";
import {
  SearchOutlined,
  ShareAltOutlined,
  UserOutlined,
  KeyOutlined,
  AuditOutlined,
  ReloadOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "@/stores/store";
import {
  searchSharedProjects,
  applyToProject,
  setSharedFilters,
  selectSharedProjects,
  selectSharedProjectsPagination,
  selectProjectsLoading,
  selectProjectsError,
  selectSharedFilters,
} from "@/stores/slices/projects.slice";
import { SharedProject } from "@/services/project.service";

const { Text, Title } = Typography;
const { Search } = Input;

interface SharedProjectsModalProps {
  visible: boolean;
  onClose: () => void;
  onApplySuccess?: () => void;
}

const SharedProjectsModal: React.FC<SharedProjectsModalProps> = ({
  visible,
  onClose,
  onApplySuccess,
}) => {
  const dispatch = useDispatch<AppDispatch>();
  const sharedProjects = useSelector(selectSharedProjects);
  const pagination = useSelector(selectSharedProjectsPagination);
  const loading = useSelector(selectProjectsLoading);
  const error = useSelector(selectProjectsError);
  const filters = useSelector(selectSharedFilters);
  const { notification } = App.useApp();
  const [shareCode, setShareCode] = useState("");

  useEffect(() => {
    if (visible) {
      handleSearch();
    }
  }, [visible]);

  useEffect(() => {
    if (error.applyToProject) {
      notification.error({ message: error.applyToProject });
    }
    if (error.searchSharedProjects) {
      notification.error({ message: error.searchSharedProjects });
    }
  }, [error]);

  const handleSearch = (searchValue?: string, shareCodeValue?: string) => {
    dispatch(
      searchSharedProjects({
        search: searchValue || filters.search,
        shareCode: shareCodeValue || filters.shareCode,
        page: 1,
        limit: 10,
      })
    );
  };

  const handleSearchChange = (value: string) => {
    dispatch(setSharedFilters({ search: value }));
    if (!value) {
      handleSearch("", filters.shareCode);
    }
  };

  const handleShareCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setShareCode(value);
    dispatch(setSharedFilters({ shareCode: value }));
  };

  const handleShareCodeSearch = () => {
    handleSearch(filters.search, shareCode);
  };

  const handleApplyToProject = async (project: SharedProject) => {
    try {
      await dispatch(applyToProject({ shareCode: project.shareCode })).unwrap();
      notification.success({
        message: `Successfully applied to project "${project.name}"!`,
      });
      onApplySuccess?.();
    } catch (error) {
      // Error handled in useEffect
    }
  };

  const handleRefresh = () => {
    handleSearch();
  };

  const handlePaginationChange = (page: number, pageSize?: number) => {
    dispatch(
      searchSharedProjects({
        search: filters.search,
        shareCode: filters.shareCode,
        page,
        limit: pageSize || 10,
      })
    );
  };

  const columns = [
    {
      title: "Project Info",
      key: "info",
      render: (record: SharedProject) => (
        <div>
          <div style={{ fontWeight: "bold", fontSize: "14px" }}>
            {record.name}
          </div>
          <div style={{ color: "#666", fontSize: "12px" }}>{record.domain}</div>
          {record.description && (
            <div style={{ color: "#999", fontSize: "12px", marginTop: 4 }}>
              {record.description}
            </div>
          )}
        </div>
      ),
    },
    {
      title: "Owner",
      key: "owner",
      render: (record: SharedProject) => (
        <div>
          <div style={{ fontSize: "12px" }}>
            <UserOutlined style={{ marginRight: 4 }} />
            {record.owner.name}
          </div>
          <div style={{ color: "#666", fontSize: "11px" }}>
            {record.owner.email}
          </div>
        </div>
      ),
    },
    {
      title: "Statistics",
      key: "stats",
      render: (record: SharedProject) => (
        <Space direction="vertical" size={4}>
          <Space size={12}>
            <Tooltip title="Keywords">
              <Tag icon={<KeyOutlined />} color="blue">
                {record._count.keywords}
              </Tag>
            </Tooltip>
            <Tooltip title="Audits">
              <Tag icon={<AuditOutlined />} color="green">
                {record._count.audits}
              </Tag>
            </Tooltip>
          </Space>
          <Space size={12}>
            <Tooltip title="Competitors">
              <Tag color="orange">{record._count.competitors} competitors</Tag>
            </Tooltip>
            <Tooltip title="Members">
              <Tag color="purple">{record._count.members} members</Tag>
            </Tooltip>
          </Space>
        </Space>
      ),
    },
    {
      title: "Share Code",
      key: "shareCode",
      render: (record: SharedProject) => (
        <Tag color="cyan" style={{ fontFamily: "monospace" }}>
          {record.shareCode}
        </Tag>
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (record: SharedProject) => (
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={() => handleApplyToProject(record)}
          loading={loading.applyToProject}
          size="small"
        >
          Apply
        </Button>
      ),
    },
  ];

  return (
    <Modal
      title={
        <Space>
          <ShareAltOutlined />
          <span>Discover Shared Projects</span>
        </Space>
      }
      open={visible}
      onCancel={onClose}
      footer={null}
      width={1000}
      style={{ top: 20 }}
    >
      <div style={{ marginBottom: 16 }}>
        <Row gutter={[16, 16]}>
          <Col span={12}>
            <Search
              placeholder="Search projects by name, domain, or description"
              value={filters.search}
              onChange={(e) => handleSearchChange(e.target.value)}
              onSearch={(value) => handleSearch(value, filters.shareCode)}
              enterButton
              allowClear
            />
          </Col>
          <Col span={8}>
            <Input
              placeholder="Enter share code"
              value={shareCode}
              onChange={handleShareCodeChange}
              style={{ fontFamily: "monospace" }}
            />
          </Col>
          <Col span={4}>
            <Space>
              <Button
                type="primary"
                icon={<SearchOutlined />}
                onClick={handleShareCodeSearch}
                loading={loading.searchSharedProjects}
              >
                Search
              </Button>
              <Button
                icon={<ReloadOutlined />}
                onClick={handleRefresh}
                loading={loading.searchSharedProjects}
              />
            </Space>
          </Col>
        </Row>
      </div>

      <Divider style={{ margin: "16px 0" }} />

      {sharedProjects.length === 0 && !loading.searchSharedProjects ? (
        <Card style={{ textAlign: "center", padding: "40px 20px" }}>
          <ShareAltOutlined style={{ fontSize: 48, color: "#ccc" }} />
          <Title level={4} style={{ color: "#999", marginTop: 16 }}>
            No shared projects found
          </Title>
          <Text type="secondary">
            Try adjusting your search criteria or browse all available projects
          </Text>
        </Card>
      ) : (
        <Table
          dataSource={sharedProjects}
          columns={columns}
          rowKey="id"
          loading={loading.searchSharedProjects}
          pagination={{
            current: pagination.page,
            total: pagination.total,
            pageSize: pagination.limit,
            showSizeChanger: true,
            showQuickJumper: true,
            showTotal: (total, range) =>
              `${range[0]}-${range[1]} of ${total} projects`,
            onChange: handlePaginationChange,
            onShowSizeChange: handlePaginationChange,
          }}
          scroll={{ x: 800 }}
          size="small"
        />
      )}
    </Modal>
  );
};

export default SharedProjectsModal;
