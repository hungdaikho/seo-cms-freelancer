"use client";

import React, { useState, useEffect } from "react";
import { Tabs, Empty, Button, Select, Space, Typography } from "antd";
import {
  ProjectOutlined,
  SearchOutlined,
  FileSearchOutlined,
  ToolOutlined,
  RobotOutlined,
  GlobalOutlined,
  DashboardOutlined,
  SwapOutlined,
} from "@ant-design/icons";
import ProjectManager from "./features/project_manager";
import ProjectDashboard from "./features/project_dashboard";
import KeywordManager from "./features/keyword_manager";
import AuditManager from "./features/audit_manager";
import ListTool from "./features/list_tool";
import CopilotAI from "./features/copilot_ai";
import Domain from "./features/domain";
import FooterProject from "./features/footer";
import { useProject } from "@/stores/hooks/useProject";

type Props = {};

const Page = (props: Props) => {
  const { currentProject, projects, setCurrentProject } = useProject();
  const [activeTab, setActiveTab] = useState("projects");

  // Auto-select first project if available and no current project
  useEffect(() => {
    if (!currentProject && projects.length > 0) {
      setCurrentProject(projects[0]);
      setActiveTab("dashboard");
    }
  }, [projects, currentProject, setCurrentProject]);

  const handleProjectSelect = (project: any) => {
    setCurrentProject(project);
    setActiveTab("dashboard");
  };

  const handleProjectChange = (projectId: string) => {
    const selectedProject = projects.find((p) => p.id === projectId);
    if (selectedProject) {
      setCurrentProject(selectedProject);
    }
  };

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
          value={currentProject?.id}
          onChange={handleProjectChange}
          placeholder="Select a project"
          style={{ minWidth: 200 }}
          size="small"
        >
          {projects.map((project) => (
            <Select.Option key={project.id} value={project.id}>
              {project.name} ({project.domain})
            </Select.Option>
          ))}
        </Select>
      </Space>
    </div>
  );

  const renderEmptyState = () => (
    <div style={{ padding: "60px 0", textAlign: "center" }}>
      <Empty
        description="Please select a project first"
        image={Empty.PRESENTED_IMAGE_SIMPLE}
      >
        <Button type="primary" onClick={() => setActiveTab("projects")}>
          Go to Projects
        </Button>
      </Empty>
    </div>
  );

  const tabItems = [
    {
      key: "projects",
      label: (
        <span>
          <ProjectOutlined />
          Projects
        </span>
      ),
      children: (
        <>
          <ListTool />
          <CopilotAI />
          <ProjectManager onProjectSelect={handleProjectSelect} />
          {/* <Domain />
          <FooterProject /> */}
        </>
      ),
    },
    {
      key: "dashboard",
      label: (
        <span>
          <DashboardOutlined />
          Dashboard
        </span>
      ),
      disabled: !currentProject,
      children: currentProject ? (
        <>
          {renderProjectSelector()}
          <ProjectDashboard
            projectId={currentProject.id}
            projectName={currentProject.name}
          />
        </>
      ) : (
        renderEmptyState()
      ),
    },
    {
      key: "keywords",
      label: (
        <span>
          <SearchOutlined />
          Keywords
        </span>
      ),
      disabled: !currentProject,
      children: currentProject ? (
        <>
          {renderProjectSelector()}
          <KeywordManager
            projectId={currentProject.id}
            projectName={currentProject.name}
          />
        </>
      ) : (
        renderEmptyState()
      ),
    },
    {
      key: "audits",
      label: (
        <span>
          <FileSearchOutlined />
          SEO Audits
        </span>
      ),
      disabled: !currentProject,
      children: currentProject ? (
        <>
          {renderProjectSelector()}
          <AuditManager
            projectId={currentProject.id}
            projectName={currentProject.name}
          />
        </>
      ) : (
        renderEmptyState()
      ),
    },
    {
      key: "tools",
      label: (
        <span>
          <ToolOutlined />
          Tools
        </span>
      ),
      children: <ListTool />,
    },
    {
      key: "ai",
      label: (
        <span>
          <RobotOutlined />
          AI Assistant
        </span>
      ),
      children: <CopilotAI />,
    },
    {
      key: "domain",
      label: (
        <span>
          <GlobalOutlined />
          Domain Analysis
        </span>
      ),
      children: <Domain />,
    },
  ];

  return (
    <div style={{ padding: "0", minHeight: "100vh", background: "#f5f5f5" }}>
      <Tabs
        activeKey={activeTab}
        onChange={setActiveTab}
        type="card"
        style={{ margin: "0", background: "white" }}
        items={tabItems}
      />
    </div>
  );
};

export default Page;
