"use client";

import React, { memo } from "react";
import { Typography, Button } from "antd";
import {
  PlusOutlined,
  ReloadOutlined,
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
}

const ProjectTabs = memo(({
  projects,
  totalProjects,
  isFiltered,
  loading,
  onRefresh,
  onCreateProject,
  createLoading,
}: ProjectTabsProps) => {
  const activeProjects = projects.filter(p => p.isActive).length;

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
            style={{
              color: "#f5222d",
              fontWeight: "bold",
              borderBottom: "2px solid #f5222d",
              paddingBottom: "8px",
            }}
          >
            All ({isFiltered ? `${projects.length}/${totalProjects}` : totalProjects})
          </Text>
          <Text style={{ color: "#999" }}>
            Active ({activeProjects})
          </Text>
          <Text style={{ color: "#999" }}>Shared (0)</Text>
        </div>
      </div>
      <div style={{ display: "flex", gap: "12px" }}>
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
      </div>
    </div>
  );
});

ProjectTabs.displayName = 'ProjectTabs';

export default ProjectTabs;
