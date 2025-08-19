"use client";

import React, { useState, useEffect } from "react";
import {
  Modal,
  Switch,
  Button,
  message,
  Space,
  Typography,
  Card,
  Input,
  Row,
  Col,
  Divider,
  Table,
  Popconfirm,
  Tag,
  App,
} from "antd";
import {
  ShareAltOutlined,
  CopyOutlined,
  UserOutlined,
  DeleteOutlined,
  CalendarOutlined,
} from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "@/stores/store";
import {
  toggleProjectSharing,
  fetchProjectMembers,
  removeProjectMember,
  selectProjectMembers,
  selectProjectsLoading,
  selectProjectsError,
} from "@/stores/slices/projects.slice";
import { Project, ProjectMember } from "@/services/project.service";

const { Text, Title } = Typography;

interface ProjectSharingModalProps {
  visible: boolean;
  onClose: () => void;
  project: Project | null;
  onSharingToggled?: (project: Project) => void;
}

const ProjectSharingModal: React.FC<ProjectSharingModalProps> = ({
  visible,
  onClose,
  project,
  onSharingToggled,
}) => {
  const dispatch = useDispatch<AppDispatch>();
  const projectMembers = useSelector(selectProjectMembers);
  const loading = useSelector(selectProjectsLoading);
  const error = useSelector(selectProjectsError);

  const [isShared, setIsShared] = useState(false);
  const [shareCode, setShareCode] = useState("");
  const { notification } = App.useApp();
  useEffect(() => {
    if (project) {
      setIsShared(project.isShared || false);
      setShareCode(project.shareCode || "");

      if (visible && project.isShared) {
        dispatch(fetchProjectMembers(project.id));
      }
    }
  }, [project, visible, dispatch]);

  useEffect(() => {
    if (error.toggleProjectSharing) {
      notification.error({ message: error.toggleProjectSharing });
    }
    if (error.fetchProjectMembers) {
      notification.error({ message: error.fetchProjectMembers });
    }
    if (error.removeProjectMember) {
      notification.error({ message: error.removeProjectMember });
    }
  }, [error]);

  const handleToggleSharing = async (checked: boolean) => {
    if (!project) return;

    try {
      const result = await dispatch(
        toggleProjectSharing({
          id: project.id,
          data: { isShared: checked },
        })
      ).unwrap();

      setIsShared(result.isShared);
      setShareCode(result.shareCode || "");

      notification.success({ message: result.message });

      // Update the project object with new sharing info
      const updatedProject = {
        ...project,
        isShared: result.isShared,
        shareCode: result.shareCode,
      };
      onSharingToggled?.(updatedProject);

      if (checked) {
        dispatch(fetchProjectMembers(project.id));
      }
    } catch (error) {
      // Error handled in useEffect
    }
  };

  const handleCopyShareCode = () => {
    if (shareCode) {
      navigator.clipboard.writeText(shareCode);
      notification.success({ message: "Share code copied to clipboard!" });
    }
  };

  const handleRemoveMember = async (member: ProjectMember) => {
    if (!project) return;

    try {
      await dispatch(
        removeProjectMember({
          projectId: project.id,
          memberId: member.id,
        })
      ).unwrap();

      notification.success({
        message: `Removed ${member.user.name} from project`,
      });
      // Refresh members list
      dispatch(fetchProjectMembers(project.id));
    } catch (error) {
      // Error handled in useEffect
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const memberColumns = [
    {
      title: "Member",
      key: "member",
      render: (record: ProjectMember) => (
        <div>
          <div style={{ fontWeight: "bold", fontSize: "14px" }}>
            <UserOutlined style={{ marginRight: 8 }} />
            {record.user.name}
          </div>
          <div style={{ color: "#666", fontSize: "12px" }}>
            {record.user.email}
          </div>
        </div>
      ),
    },
    {
      title: "Role",
      key: "role",
      render: (record: ProjectMember) => (
        <Tag color={record.role === "moderator" ? "gold" : "blue"}>
          {record.role}
        </Tag>
      ),
    },
    {
      title: "Status",
      key: "status",
      render: (record: ProjectMember) => (
        <Tag color={record.status === "active" ? "green" : "red"}>
          {record.status}
        </Tag>
      ),
    },
    {
      title: "Joined",
      key: "joined",
      render: (record: ProjectMember) => (
        <div style={{ fontSize: "12px" }}>
          <CalendarOutlined style={{ marginRight: 4 }} />
          {formatDate(record.appliedAt)}
        </div>
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (record: ProjectMember) => (
        <Popconfirm
          title="Remove Member"
          description={`Are you sure you want to remove ${record.user.name} from this project?`}
          onConfirm={() => handleRemoveMember(record)}
          okText="Yes, Remove"
          cancelText="Cancel"
          okType="danger"
        >
          <Button
            type="text"
            danger
            icon={<DeleteOutlined />}
            loading={loading.removeProjectMember}
            size="small"
          >
            Remove
          </Button>
        </Popconfirm>
      ),
    },
  ];

  const members = project ? projectMembers[project.id] || [] : [];

  return (
    <Modal
      title={
        <Space>
          <ShareAltOutlined />
          <span>Project Sharing Settings</span>
        </Space>
      }
      open={visible}
      onCancel={onClose}
      footer={null}
      width={800}
      style={{ top: 20 }}
    >
      {project && (
        <div>
          <Card style={{ marginBottom: 16 }}>
            <Title level={4} style={{ marginBottom: 16 }}>
              {project.name}
            </Title>
            <Text
              type="secondary"
              style={{ display: "block", marginBottom: 16 }}
            >
              {project.domain}
            </Text>

            <Row gutter={[16, 16]} align="middle">
              <Col span={8}>
                <Text strong>Enable Sharing:</Text>
              </Col>
              <Col span={16}>
                <Switch
                  checked={isShared}
                  loading={loading.toggleProjectSharing}
                  onChange={handleToggleSharing}
                />
                <Text type="secondary" style={{ marginLeft: 12 }}>
                  {isShared
                    ? "Project is shared publicly"
                    : "Project is private"}
                </Text>
              </Col>
            </Row>

            {isShared && shareCode && (
              <>
                <Divider />
                <Row gutter={[16, 16]} align="middle">
                  <Col span={8}>
                    <Text strong>Share Code:</Text>
                  </Col>
                  <Col span={16}>
                    <Space.Compact style={{ width: "100%" }}>
                      <Input
                        value={shareCode}
                        readOnly
                        style={{ fontFamily: "monospace" }}
                      />
                      <Button
                        icon={<CopyOutlined />}
                        onClick={handleCopyShareCode}
                      >
                        Copy
                      </Button>
                    </Space.Compact>
                    <Text
                      type="secondary"
                      style={{ display: "block", marginTop: 8 }}
                    >
                      Share this code with others to let them apply to your
                      project
                    </Text>
                  </Col>
                </Row>
              </>
            )}
          </Card>

          {isShared && (
            <Card>
              <Title level={5} style={{ marginBottom: 16 }}>
                Project Members ({members.length})
              </Title>

              {members.length === 0 ? (
                <div
                  style={{
                    textAlign: "center",
                    padding: "20px 0",
                    color: "#999",
                  }}
                >
                  <UserOutlined style={{ fontSize: 32, marginBottom: 8 }} />
                  <div>No members have applied to this project yet</div>
                </div>
              ) : (
                <Table
                  dataSource={members}
                  columns={memberColumns}
                  rowKey="id"
                  loading={loading.fetchProjectMembers}
                  pagination={false}
                  size="small"
                />
              )}
            </Card>
          )}
        </div>
      )}
    </Modal>
  );
};

export default ProjectSharingModal;
