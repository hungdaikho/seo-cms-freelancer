"use client";

import React, { useState, useEffect } from "react";
import { message, Form, Modal, App } from "antd";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '@/stores/store';
import { 
  fetchProjectsWithStats, 
  fetchProjects,
  createProject,
  deleteProject,
  updateProject,
  fetchProjectDetails,
  setFilters,
  clearErrors,
  selectProjectsWithStats,
  selectProjectsLoading,
  selectProjectsError,
  selectProjectsFilters,
  selectProjectsPagination,
} from '@/stores/slices/projects.slice';
import { CreateProjectRequest, UpdateProjectRequest } from '@/services/project.service';

// Components
import {
  SearchHeader,
  HeroSection,
  ProjectTabs,
  StatsCards,
  ProjectsTable,
  ProjectModals
} from './components';

// Custom Hook
import { useProjectSearch } from './hooks';

type Props = {};

const Page = (props: Props) => {
  const dispatch = useDispatch<AppDispatch>();
  const projectsWithStats = useSelector(selectProjectsWithStats);
  const loading = useSelector(selectProjectsLoading);
  const error = useSelector(selectProjectsError);
  const filters = useSelector(selectProjectsFilters);
  const pagination = useSelector(selectProjectsPagination);

  // Use custom search hook
  const {
    searchValue,
    setSearchValue,
    debouncedSearchValue,
    selectedCountry,
    setSelectedCountry,
    filteredProjects,
    clearSearch,
    isFiltered
  } = useProjectSearch(projectsWithStats);

  // Modal states
  const [isCreateModalVisible, setIsCreateModalVisible] = useState(false);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [isViewModalVisible, setIsViewModalVisible] = useState(false);
  const [selectedProject, setSelectedProject] = useState<any>(null);
  
  // Forms
  const [form] = Form.useForm();
  const [editForm] = Form.useForm();
  const [modal, contextHolder] = Modal.useModal();

  // Load projects on component mount
  useEffect(() => {
    dispatch(fetchProjectsWithStats());
  }, [dispatch]);

  // Handle errors and success messages
  useEffect(() => {
    if (error.fetchProjectsWithStats) {
      message.error(error.fetchProjectsWithStats);
    }
    if (error.createProject) {
      message.error(error.createProject);
    }
    if (error.updateProject) {
      message.error(error.updateProject);
    }
    if (error.deleteProject) {
      message.error(error.deleteProject);
    }
    if (error.fetchProjectDetails) {
      message.error(error.fetchProjectDetails);
    }
  }, [error]);

  // Handle search
  const handleSearch = (value: string) => {
    setSearchValue(value);
  };

  // Handle advanced search (when clicking search button)
  const handleAdvancedSearch = () => {
    if (debouncedSearchValue) {
      dispatch(setFilters({ 
        search: debouncedSearchValue
      }));
      
      dispatch(fetchProjects({ 
        search: debouncedSearchValue, 
        page: 1, 
        limit: pagination.limit,
        sortBy: filters.sortBy,
        sortOrder: filters.sortOrder 
      }));
    }
  };

  // Handle country change
  const handleCountryChange = (value: string) => {
    setSelectedCountry(value);
  };

  // Clear search and filters
  const handleClearSearch = () => {
    clearSearch();
    dispatch(setFilters({ search: "" }));
  };

  // Handle refresh
  const handleRefresh = () => {
    dispatch(clearErrors());
    dispatch(fetchProjectsWithStats());
  };

  // Handle create project
  const handleCreateProject = async (values: any) => {
    const projectData: CreateProjectRequest = {
      name: values.name,
      domain: values.domain,
      settings: {
        country: values.country || selectedCountry,
        language: values.language || 'en',
        trackingEnabled: true
      }
    };

    try {
      await dispatch(createProject(projectData)).unwrap();
      message.success('Project created successfully!');
      setIsCreateModalVisible(false);
      form.resetFields();
      dispatch(fetchProjectsWithStats());
    } catch (error) {
      // Error is handled in useEffect
    }
  };

  // Handle view project
  const handleViewProject = async (project: any) => {
    setSelectedProject(project);
    setIsViewModalVisible(true);
    try {
      await dispatch(fetchProjectDetails(project.id)).unwrap();
    } catch (error) {
      console.error('Failed to fetch project details:', error);
    }
  };

  // Handle edit project
  const handleEditProject = (project: any) => {
    setSelectedProject(project);
    editForm.setFieldsValue({
      name: project.name,
      domain: project.domain,
      country: project.settings?.country || 'US',
      language: project.settings?.language || 'en',
      trackingEnabled: project.settings?.trackingEnabled || false,
    });
    setIsEditModalVisible(true);
  };

  // Handle update project
  const handleUpdateProject = async (values: any) => {
    if (!selectedProject) return;

    const updateData: UpdateProjectRequest = {
      name: values.name,
      settings: {
        country: values.country,
        language: values.language,
        trackingEnabled: values.trackingEnabled,
      }
    };

    try {
      await dispatch(updateProject({ 
        id: selectedProject.id, 
        data: updateData 
      })).unwrap();
      message.success('Project updated successfully!');
      setIsEditModalVisible(false);
      editForm.resetFields();
      setSelectedProject(null);
      dispatch(fetchProjectsWithStats());
    } catch (error) {
      // Error is handled in useEffect
    }
  };

  // Handle delete project
  const handleDeleteProject = (projectId: string, projectName: string) => {
    console.log('Delete project clicked:', { projectId, projectName });
    
    modal.confirm({
      title: 'Delete Project',
      icon: <ExclamationCircleOutlined style={{ color: '#ff4d4f' }} />,
      content: (
        <div>
          <p>Are you sure you want to delete "<strong>{projectName}</strong>"?</p>
          <p style={{ color: '#ff4d4f', marginBottom: 0 }}>
            This action cannot be undone and will permanently remove all project data including keywords, audits, and statistics.
          </p>
        </div>
      ),
      okText: 'Yes, Delete Project',
      okType: 'danger',
      cancelText: 'Cancel',
      okButtonProps: {
        loading: loading.deleteProject,
      },
      onOk: async () => {
        try {
          console.log('Deleting project:', projectId);
          await dispatch(deleteProject(projectId)).unwrap();
          message.success(`Project "${projectName}" deleted successfully!`);
          dispatch(fetchProjectsWithStats());
        } catch (error) {
          console.error('Delete failed:', error);
        }
      },
    });
  };

  // Get current projects for display
  const currentProjects = isFiltered ? filteredProjects : projectsWithStats;

  // Modal handlers
  const handleCloseCreateModal = () => {
    setIsCreateModalVisible(false);
    form.resetFields();
  };

  const handleCloseViewModal = () => {
    setIsViewModalVisible(false);
    setSelectedProject(null);
  };

  const handleEditFromView = () => {
    setIsViewModalVisible(false);
    handleEditProject(selectedProject);
  };

  const handleCloseEditModal = () => {
    setIsEditModalVisible(false);
    setSelectedProject(null);
    editForm.resetFields();
  };

  // Render projects section
  const renderProjectsSection = () => (
    <div style={{ padding: "24px" }}>
      <ProjectTabs
        projects={currentProjects}
        totalProjects={projectsWithStats.length}
        isFiltered={isFiltered}
        loading={loading.fetchProjectsWithStats}
        onRefresh={handleRefresh}
        onCreateProject={() => setIsCreateModalVisible(true)}
        createLoading={loading.createProject}
      />

      <StatsCards
        projects={currentProjects}
        isFiltered={isFiltered}
      />

      <div
        style={{
          background: "white",
          borderRadius: "8px",
          border: "1px solid #f0f0f0",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            padding: "16px 24px",
            background: "#fafafa",
            borderBottom: "1px solid #f0f0f0",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <span style={{ fontWeight: "bold" }}>Projects Overview</span>
        </div>

        <ProjectsTable
          projects={currentProjects}
          loading={loading.fetchProjectsWithStats}
          onViewProject={handleViewProject}
          onEditProject={handleEditProject}
          onDeleteProject={handleDeleteProject}
          deleteLoading={loading.deleteProject}
        />
      </div>
    </div>
  );

  // Main dashboard content
  const renderMainDashboard = () => (
    <div style={{ background: "#f5f5f5", minHeight: "100vh" }}>
      <SearchHeader
        searchValue={searchValue}
        selectedCountry={selectedCountry}
        filteredCount={currentProjects.length}
        totalCount={projectsWithStats.length}
        loading={loading.fetchProjects}
        onSearch={handleSearch}
        onCountryChange={handleCountryChange}
        onAdvancedSearch={handleAdvancedSearch}
        onClearSearch={handleClearSearch}
        onRefresh={handleRefresh}
      />
      <HeroSection />
      {renderProjectsSection()}
    </div>
  );

  return (
    <App>
      <div
        style={{
          padding: "0",
          minHeight: "100vh",
          background: "#f5f5f5",
        }}
      >
        {contextHolder}
        {renderMainDashboard()}
        
        <ProjectModals
          // Create Modal
          isCreateModalVisible={isCreateModalVisible}
          createForm={form}
          createLoading={loading.createProject}
          selectedCountry={selectedCountry}
          onCreateProject={handleCreateProject}
          onCloseCreateModal={handleCloseCreateModal}
          
          // View Modal
          isViewModalVisible={isViewModalVisible}
          selectedProject={selectedProject}
          viewLoading={loading.fetchProjectDetails}
          onCloseViewModal={handleCloseViewModal}
          onEditFromView={handleEditFromView}
          
          // Edit Modal
          isEditModalVisible={isEditModalVisible}
          editForm={editForm}
          updateLoading={loading.updateProject}
          onUpdateProject={handleUpdateProject}
          onCloseEditModal={handleCloseEditModal}
        />
      </div>
    </App>
  );
};

export default Page;
