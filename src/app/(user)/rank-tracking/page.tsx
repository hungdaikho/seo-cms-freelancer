/**
 * Rank Tracking Page - Integrated with Redux Store
 *
 * Features:
 * - Fetches real project data from Redux store
 * - Handles loading and error states
 * - Auto-refreshes after creating new projects
 * - Project selector when multiple projects exist
 * - Empty state when no projects
 */
"use client";
import React, { useState, useEffect } from "react";
import { message, Spin, Select, Space, Typography } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "@/stores/store";
import {
  fetchProjectsWithStats,
  selectProjectsWithStats,
  selectProjectsLoading,
  selectProjectsError,
} from "@/stores/slices/projects.slice";
import EmptyProjectState from "@/components/rank-tracking/EmptyProjectState";
import CreateProjectModal from "@/components/rank-tracking/CreateProjectModal";
import SimpleRankTrackingDashboard from "@/components/rank-tracking/SimpleRankTrackingDashboard";
import { Project } from "@/services/project.service";

const { Title } = Typography;

const RankTrackingPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const projects = useSelector(selectProjectsWithStats);
  const loading = useSelector(selectProjectsLoading);
  const error = useSelector(selectProjectsError);

  const [currentProject, setCurrentProject] = useState<Project | null>(null);
  const [isCreateModalVisible, setIsCreateModalVisible] = useState(false);

  // Load projects on component mount
  useEffect(() => {
    dispatch(fetchProjectsWithStats());
  }, [dispatch]);

  // Set current project when projects are loaded
  useEffect(() => {
    if (projects.length > 0 && !currentProject) {
      setCurrentProject(projects[0]);
    }
  }, [projects, currentProject]);

  // Handle errors
  useEffect(() => {
    if (error.fetchProjectsWithStats) {
      message.error(error.fetchProjectsWithStats);
    }
  }, [error.fetchProjectsWithStats]);

  const handleEditProject = () => {
    setIsCreateModalVisible(true);
  };

  const handleProjectCreated = () => {
    // Refresh projects list after creating new project
    dispatch(fetchProjectsWithStats());
  };

  const handleProjectChange = (project: Project) => {
    setCurrentProject(project);
  };

  // Show loading state
  if (loading.fetchProjectsWithStats) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "60vh",
          flexDirection: "column",
        }}
      >
        <Spin size="large" />
        <div style={{ marginTop: 16, color: "#666" }}>Loading projects...</div>
      </div>
    );
  }

  // Show empty state if no projects
  if (projects.length === 0) {
    return (
      <>
        <EmptyProjectState
          onCreateProject={() => setIsCreateModalVisible(true)}
        />
        <CreateProjectModal
          visible={isCreateModalVisible}
          onCancel={() => setIsCreateModalVisible(false)}
          onSuccess={handleProjectCreated}
        />
      </>
    );
  }

  // Show dashboard if project is available
  if (currentProject) {
    return (
      <div>
        {/* Project Selector */}
        {projects.length > 1 && (
          <div
            style={{
              padding: "20px 24px",
              borderBottom: "1px solid #f0f0f0",
              backgroundColor: "#fff",
            }}
          >
            <Space align="center">
              <Title level={5} style={{ margin: 0 }}>
                Current Project:
              </Title>
              <Select
                value={currentProject.id}
                onChange={(projectId) => {
                  const selectedProject = projects.find(
                    (p) => p.id === projectId
                  );
                  if (selectedProject) {
                    handleProjectChange(selectedProject);
                  }
                }}
                style={{ minWidth: 200 }}
                placeholder="Select a project"
              >
                {projects.map((project) => (
                  <Select.Option key={project.id} value={project.id}>
                    {project.name}
                  </Select.Option>
                ))}
              </Select>
              <span style={{ color: "#666", fontSize: "14px" }}>
                ({projects.length} project{projects.length > 1 ? "s" : ""}{" "}
                total)
              </span>
            </Space>
          </div>
        )}

        {/* Dashboard */}
        <SimpleRankTrackingDashboard
          projectId={currentProject.id}
          projectName={currentProject.name}
        />

        {/* Create Modal */}
        <CreateProjectModal
          visible={isCreateModalVisible}
          onCancel={() => setIsCreateModalVisible(false)}
          onSuccess={handleProjectCreated}
        />
      </div>
    );
  }

  // Fallback - should not reach here normally
  return (
    <>
      <EmptyProjectState
        onCreateProject={() => setIsCreateModalVisible(true)}
      />
      <CreateProjectModal
        visible={isCreateModalVisible}
        onCancel={() => setIsCreateModalVisible(false)}
        onSuccess={handleProjectCreated}
      />
    </>
  );
};

export default RankTrackingPage;
