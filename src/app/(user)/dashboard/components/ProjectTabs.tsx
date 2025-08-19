"use client";

import React, { memo } from "react";
import { Typography, Button, Space } from "antd";
import {
  PlusOutlined,
  ReloadOutlined,
  ShareAltOutlined,
  TeamOutlined,
} from "@ant-design/icons";

const { Title, Text } = Typography;

interface ProjectTabsProps {
  projects: any[];
  totalProjects: number;
  isFiltered: boolean;
  loading: boolean;
  onRefresh: () => void;
  onCreateProject: () => void;
  createLoading: boolean;
  onDiscoverSharedProjects?: () => void;
  onViewAppliedProjects?: () => void;
  activeFilter?: "all" | "owner" | "shared";
  onFilterChange?: (filter: "all" | "owner" | "shared") => void;
}

const ProjectTabs = memo(
  ({
    projects,
    totalProjects,
    isFiltered,
    loading,
    onRefresh,
    onCreateProject,
    createLoading,
    onDiscoverSharedProjects,
    onViewAppliedProjects,
    activeFilter = "all",
    onFilterChange,
  }: ProjectTabsProps) => {
    const ownerProjects = projects.filter(
      (p) => p.relationshipType !== "member"
    ).length;
    const sharedProjects = projects.filter(
      (p) => p.isShared || p.relationshipType === "member"
    ).length;

    const handleTabClick = (filter: "all" | "owner" | "shared") => {
      onFilterChange?.(filter);
    };

    const getTabStyle = (tabType: "all" | "owner" | "shared") => ({
      color: activeFilter === tabType ? "#f5222d" : "#999",
      fontWeight: activeFilter === tabType ? "bold" : "normal",
      borderBottom: activeFilter === tabType ? "2px solid #f5222d" : "none",
      paddingBottom: "8px",
      cursor: "pointer",
      transition: "all 0.3s ease",
    });

    return (
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "24px",
        }}
      >
        <div>
          <Title level={3} style={{ margin: 0, color: "#1890ff" }}>
            My Projects
          </Title>
          <div style={{ display: "flex", gap: "24px", marginTop: "16px" }}>
            <Text
              style={getTabStyle("all")}
              onClick={() => handleTabClick("all")}
            >
              All
            </Text>
            <Text
              style={getTabStyle("owner")}
              onClick={() => handleTabClick("owner")}
            >
              Owner
            </Text>
            <Text
              style={getTabStyle("shared")}
              onClick={() => handleTabClick("shared")}
            >
              Shared
            </Text>
          </div>
        </div>
        <Space size={12}>
          <Button
            icon={<ShareAltOutlined />}
            style={{ borderRadius: "6px" }}
            onClick={onDiscoverSharedProjects}
          >
            Discover Projects
          </Button>
          <Button
            icon={<TeamOutlined />}
            style={{ borderRadius: "6px" }}
            onClick={onViewAppliedProjects}
          >
            My Applied
          </Button>
          <Button
            icon={<ReloadOutlined />}
            style={{ borderRadius: "6px" }}
            onClick={onRefresh}
            loading={loading}
          >
            Refresh
          </Button>
          <Button
            type="primary"
            icon={<PlusOutlined />}
            style={{ borderRadius: "6px" }}
            onClick={onCreateProject}
            loading={createLoading}
          >
            Create Project
          </Button>
        </Space>
      </div>
    );
  }
);

ProjectTabs.displayName = "ProjectTabs";

export default ProjectTabs;
