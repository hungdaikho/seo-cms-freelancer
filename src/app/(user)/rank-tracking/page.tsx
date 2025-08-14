"use client";
import React, { useState } from "react";
import { message } from "antd";
import EmptyProjectState from "@/components/rank-tracking/EmptyProjectState";
import CreateProjectModal from "@/components/rank-tracking/CreateProjectModal";
import RankTrackingDashboard from "@/components/rank-tracking/RankTrackingDashboard";
import { CreateProjectData, Project } from "@/types/rank-tracking.type";

const RankTrackingPage = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [currentProject, setCurrentProject] = useState<Project | null>(null);
  const [isCreateModalVisible, setIsCreateModalVisible] = useState(false);

  const handleCreateProject = (data: CreateProjectData) => {
    const newProject: Project = {
      id: Date.now().toString(),
      name: data.name,
      websiteUrl: data.websiteUrl,
      location: data.location,
      keywords: data.keywords,
      createdAt: new Date().toISOString(),
      lastUpdated: new Date().toISOString(),
    };

    setProjects([...projects, newProject]);
    setCurrentProject(newProject);
    message.success("Project created successfully!");
  };

  const handleEditProject = () => {
    setIsCreateModalVisible(true);
  };

  if (projects.length === 0 || !currentProject) {
    return (
      <>
        <EmptyProjectState
          onCreateProject={() => setIsCreateModalVisible(true)}
        />
        <CreateProjectModal
          visible={isCreateModalVisible}
          onCancel={() => setIsCreateModalVisible(false)}
          onSubmit={handleCreateProject}
        />
      </>
    );
  }

  return (
    <>
      <RankTrackingDashboard
        projectName={currentProject.name}
        onEditProject={handleEditProject}
      />
      <CreateProjectModal
        visible={isCreateModalVisible}
        onCancel={() => setIsCreateModalVisible(false)}
        onSubmit={handleCreateProject}
      />
    </>
  );
};

export default RankTrackingPage;
