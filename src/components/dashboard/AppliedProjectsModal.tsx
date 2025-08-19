"use client";

import React, { useEffect } from "react";
import {
  Modal,
  Table,
  Button,
  message,
  Space,
  Tag,
  Typography,
  Tooltip,
  Card,
  Popconfirm,
  App,
} from "antd";
import {
  ShareAltOutlined,
  UserOutlined,
  KeyOutlined,
  AuditOutlined,
  LogoutOutlined,
  CalendarOutlined,
} from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "@/stores/store";
import {
  fetchAppliedProjects,
  leaveAppliedProject,
  selectAppliedProjects,
  selectAppliedProjectsPagination,
  selectProjectsLoading,
  selectProjectsError,
} from "@/stores/slices/projects.slice";
import { ProjectMembership } from "@/services/project.service";

const { Text, Title } = Typography;

interface AppliedProjectsModalProps {
  visible: boolean;
  onClose: () => void;
  onLeaveSuccess?: () => void;
}

const AppliedProjectsModal: React.FC<AppliedProjectsModalProps> = ({
  visible,
  onClose,
  onLeaveSuccess,
}) => {
  const dispatch = useDispatch<AppDispatch>();
  const appliedProjects = useSelector(selectAppliedProjects);
  const pagination = useSelector(selectAppliedProjectsPagination);
  const loading = useSelector(selectProjectsLoading);
  const error = useSelector(selectProjectsError);
  const { notification } = App.useApp();
  useEffect(() => {
    if (visible) {
      dispatch(fetchAppliedProjects({ page: 1, limit: 10 }));
    }
  }, [visible, dispatch]);

  useEffect(() => {
    if (error.fetchAppliedProjects) {
      notification.error({ message: error.fetchAppliedProjects });
    }
    if (error.leaveAppliedProject) {
      notification.error({ message: error.leaveAppliedProject });
    }
  }, [error]);

  const handleLeaveProject = async (membership: ProjectMembership) => {
    try {
      await dispatch(leaveAppliedProject(membership.projectId)).unwrap();
      notification.success({
        message: `Successfully left project "${membership.project.name}"`,
      });
      onLeaveSuccess?.();
      // Refresh the list
      dispatch(
        fetchAppliedProjects({ page: pagination.page, limit: pagination.limit })
      );
    } catch (error) {
      // Error handled in useEffect
    }
  };

  const handlePaginationChange = (page: number, pageSize?: number) => {
    dispatch(
      fetchAppliedProjects({
        page,
        limit: pageSize || 10,
      })
    );
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const columns = [
    {
      title: "Project Info",
      key: "info",
      render: (record: ProjectMembership) => (
        <div>
          <div style={{ fontWeight: "bold", fontSize: "14px" }}>
            {record.project.name}
          </div>
          <div style={{ color: "#666", fontSize: "12px" }}>
            {record.project.domain}
          </div>
          {record.project.description && (
            <div style={{ color: "#999", fontSize: "12px", marginTop: 4 }}>
              {record.project.description}
            </div>
          )}
        </div>
      ),
    },
    {
      title: "Owner",
      key: "owner",
      render: (record: ProjectMembership) => (
        <div>
          <div style={{ fontSize: "12px" }}>
            <UserOutlined style={{ marginRight: 4 }} />
            {record.project.owner.name}
          </div>
          <div style={{ color: "#666", fontSize: "11px" }}>
            {record.project.owner.email}
          </div>
        </div>
      ),
    },
    {
      title: "Statistics",
      key: "stats",
      render: (record: ProjectMembership) => (
        <Space direction="vertical" size={4}>
          <Space size={12}>
            <Tooltip title="Keywords">
              <Tag icon={<KeyOutlined />} color="blue">
                {record.project._count.keywords}
              </Tag>
            </Tooltip>
            <Tooltip title="Audits">
              <Tag icon={<AuditOutlined />} color="green">
                {record.project._count.audits}
              </Tag>
            </Tooltip>
          </Space>
          <Space size={12}>
            <Tooltip title="Competitors">
              <Tag color="orange">
                {record.project._count.competitors} competitors
              </Tag>
            </Tooltip>
            <Tooltip title="Members">
              <Tag color="purple">{record.project._count.members} members</Tag>
            </Tooltip>
          </Space>
        </Space>
      ),
    },
    {
      title: "My Role",
      key: "role",
      render: (record: ProjectMembership) => (
        <div>
          <Tag color={record.role === "moderator" ? "gold" : "blue"}>
            {record.role}
          </Tag>
          <div style={{ fontSize: "11px", color: "#666", marginTop: 4 }}>
            <CalendarOutlined style={{ marginRight: 4 }} />
            Joined {formatDate(record.appliedAt)}
          </div>
        </div>
      ),
    },
    {
      title: "Status",
      key: "status",
      render: (record: ProjectMembership) => (
        <Tag color={record.status === "active" ? "green" : "red"}>
          {record.status}
        </Tag>
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (record: ProjectMembership) => (
        <Popconfirm
          title="Leave Project"
          description={`Are you sure you want to leave "${record.project.name}"?`}
          onConfirm={() => handleLeaveProject(record)}
          okText="Yes, Leave"
          cancelText="Cancel"
          okType="danger"
        >
          <Button
            type="text"
            danger
            icon={<LogoutOutlined />}
            loading={loading.leaveAppliedProject}
            size="small"
          >
            Leave
          </Button>
        </Popconfirm>
      ),
    },
  ];

  return (
    <Modal
      title={
        <Space>
          <ShareAltOutlined />
          <span>My Applied Projects</span>
        </Space>
      }
      open={visible}
      onCancel={onClose}
      footer={null}
      width={1000}
      style={{ top: 20 }}
    >
      {appliedProjects.length === 0 && !loading.fetchAppliedProjects ? (
        <Card style={{ textAlign: "center", padding: "40px 20px" }}>
          <ShareAltOutlined style={{ fontSize: 48, color: "#ccc" }} />
          <Title level={4} style={{ color: "#999", marginTop: 16 }}>
            No applied projects
          </Title>
          <Text type="secondary">
            You haven't applied to any shared projects yet. Browse and apply to
            discover new opportunities!
          </Text>
        </Card>
      ) : (
        <Table
          dataSource={appliedProjects}
          columns={columns}
          rowKey="id"
          loading={loading.fetchAppliedProjects}
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

export default AppliedProjectsModal;
