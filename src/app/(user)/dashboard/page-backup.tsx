"use client";

import React, { useState, useEffect, useCallback } from "react";
import {
  Button,
  Select,
  Space,
  Typography,
  Input,
  Table,
  Spin,
  message,
  Card,
  Row,
  Col,
  Statistic,
  Tag,
  Modal,
  Form,
  Tooltip,
  Checkbox,
  App,
} from "antd";
import {
  PlusOutlined,
  DownOutlined,
  EditOutlined,
  DeleteOutlined,
  EyeOutlined,
  RiseOutlined,
  FallOutlined,
  MinusOutlined,
  SearchOutlined,
  ReloadOutlined,
  ExclamationCircleOutlined,
} from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "@/stores/store";
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
} from "@/stores/slices/projects.slice";
import {
  CreateProjectRequest,
  UpdateProjectRequest,
} from "@/services/project.service";
import { getSortedCountries, popularCountries } from "@/utils/countries";
import { getSortedLanguages, popularLanguages } from "@/utils/languages";

const { Search } = Input;
const { Title, Text } = Typography;

type Props = {};

const Page = (props: Props) => {
  const dispatch = useDispatch<AppDispatch>();
  const projectsWithStats = useSelector(selectProjectsWithStats);
  const loading = useSelector(selectProjectsLoading);
  const error = useSelector(selectProjectsError);
  const filters = useSelector(selectProjectsFilters);
  const pagination = useSelector(selectProjectsPagination);

  // Helper function to normalize text for search (handle Vietnamese characters)
  const normalizeText = useCallback((text: string) => {
    return text
      .toLowerCase()
      .trim()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, ""); // Remove diacritics
  }, []);

  const [selectedCountry, setSelectedCountry] = useState("ALL");
  const [isCreateModalVisible, setIsCreateModalVisible] = useState(false);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [isViewModalVisible, setIsViewModalVisible] = useState(false);
  const [selectedProject, setSelectedProject] = useState<any>(null);
  const [searchValue, setSearchValue] = useState("");
  const [debouncedSearchValue, setDebouncedSearchValue] = useState("");
  const [filteredProjects, setFilteredProjects] = useState<any[]>([]);
  const [form] = Form.useForm();
  const [editForm] = Form.useForm();
  const [modal, contextHolder] = Modal.useModal();

  // Debounce hook for search
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchValue(searchValue);
    }, 300); // 300ms debounce

    return () => clearTimeout(timer);
  }, [searchValue]);

  // Filter projects based on search and country
  const filterProjects = useCallback(() => {
    let filtered = [...projectsWithStats];

    console.log("🔍 Filtering projects:", {
      totalProjects: projectsWithStats.length,
      searchValue: debouncedSearchValue,
      selectedCountry,
      projectNames: projectsWithStats.map((p) => p.name),
    });

    // Filter by search term
    if (debouncedSearchValue) {
      const searchTerm = normalizeText(debouncedSearchValue);
      console.log("🔎 Normalized search term:", searchTerm);

      filtered = filtered.filter((project) => {
        const normalizedName = normalizeText(project.name);
        const normalizedDomain = normalizeText(project.domain);

        const nameMatch = normalizedName.includes(searchTerm);
        const domainMatch = normalizedDomain.includes(searchTerm);
        const countryMatch =
          project.settings?.country &&
          getSortedCountries().find((c) => c.code === project.settings.country)
            ?.name &&
          normalizeText(
            getSortedCountries().find(
              (c) => c.code === project.settings.country
            )!.name
          ).includes(searchTerm);

        const matches = nameMatch || domainMatch || countryMatch;

        console.log("🔍 Project check:", {
          projectName: project.name,
          normalizedName,
          searchTerm,
          nameMatch,
          domainMatch,
          matches,
        });

        return matches;
      });

      console.log(
        "🎯 Filtered results:",
        filtered.map((p) => p.name)
      );
    }

    // Filter by selected country
    if (selectedCountry && selectedCountry !== "ALL") {
      filtered = filtered.filter(
        (project) => project.settings?.country === selectedCountry
      );
    }

    console.log("📊 Final filtered count:", filtered.length);
    return filtered;
  }, [projectsWithStats, debouncedSearchValue, selectedCountry, normalizeText]);

  // Update filtered projects when dependencies change
  useEffect(() => {
    const newFilteredProjects = filterProjects();
    setFilteredProjects(newFilteredProjects);
    console.log("🔄 Filtered projects updated:", {
      search: debouncedSearchValue,
      country: selectedCountry,
      resultCount: newFilteredProjects.length,
      results: newFilteredProjects.map((p) => p.name),
    });
  }, [filterProjects]);

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
  const handleSearch = useCallback((value: string) => {
    // Only update local state, let debounce handle the actual filtering
    setSearchValue(value);
  }, []);

  // Handle advanced search (when clicking search button)
  const handleAdvancedSearch = useCallback(() => {
    if (debouncedSearchValue) {
      // Update Redux filters for search
      dispatch(
        setFilters({
          search: debouncedSearchValue,
        })
      );

      // Optional: Fetch from server with filters
      dispatch(
        fetchProjects({
          search: debouncedSearchValue,
          page: 1,
          limit: pagination.limit,
          sortBy: filters.sortBy,
          sortOrder: filters.sortOrder,
        })
      );
    }
  }, [
    debouncedSearchValue,
    dispatch,
    pagination.limit,
    filters.sortBy,
    filters.sortOrder,
  ]);

  // Handle country change
  const handleCountryChange = useCallback((value: string) => {
    setSelectedCountry(value);
  }, []);

  // Clear search and filters
  const handleClearSearch = useCallback(() => {
    setSearchValue("");
    setDebouncedSearchValue("");
    setSelectedCountry("ALL");
    dispatch(setFilters({ search: "" }));
  }, [dispatch]);

  // Handle create project
  const handleCreateProject = async (values: any) => {
    const projectData: CreateProjectRequest = {
      name: values.name,
      domain: values.domain,
      settings: {
        country: values.country || selectedCountry,
        language: values.language || "en",
        trackingEnabled: true,
      },
    };

    try {
      await dispatch(createProject(projectData)).unwrap();
      message.success("Project created successfully!");
      setIsCreateModalVisible(false);
      form.resetFields();
      // Refresh projects list
      dispatch(fetchProjectsWithStats());
    } catch (error) {
      // Error is handled in useEffect
    }
  };

  // Handle view project
  const handleViewProject = async (project: any) => {
    setSelectedProject(project);
    setIsViewModalVisible(true);
    // Fetch detailed project data
    try {
      await dispatch(fetchProjectDetails(project.id)).unwrap();
    } catch (error) {
      console.error("Failed to fetch project details:", error);
    }
  };

  // Handle edit project
  const handleEditProject = (project: any) => {
    setSelectedProject(project);
    editForm.setFieldsValue({
      name: project.name,
      domain: project.domain,
      country: project.settings?.country || "US",
      language: project.settings?.language || "en",
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
      },
    };

    try {
      await dispatch(
        updateProject({
          id: selectedProject.id,
          data: updateData,
        })
      ).unwrap();
      message.success("Project updated successfully!");
      setIsEditModalVisible(false);
      editForm.resetFields();
      setSelectedProject(null);
      // Refresh projects list
      dispatch(fetchProjectsWithStats());
    } catch (error) {
      // Error is handled in useEffect
    }
  };

  // Handle delete project
  const handleDeleteProject = (projectId: string, projectName: string) => {
    console.log("Delete project clicked:", { projectId, projectName });

    modal.confirm({
      title: "Delete Project",
      icon: <ExclamationCircleOutlined style={{ color: "#ff4d4f" }} />,
      content: (
        <div>
          <p>
            Are you sure you want to delete "<strong>{projectName}</strong>"?
          </p>
          <p style={{ color: "#ff4d4f", marginBottom: 0 }}>
            This action cannot be undone and will permanently remove all project
            data including keywords, audits, and statistics.
          </p>
        </div>
      ),
      okText: "Yes, Delete Project",
      okType: "danger",
      cancelText: "Cancel",
      okButtonProps: {
        loading: loading.deleteProject,
      },
      onOk: async () => {
        try {
          console.log("Deleting project:", projectId);
          await dispatch(deleteProject(projectId)).unwrap();
          message.success(`Project "${projectName}" deleted successfully!`);
          // Refresh projects list
          dispatch(fetchProjectsWithStats());
        } catch (error) {
          console.error("Delete failed:", error);
          // Error is handled in useEffect
        }
      },
    });
  };

  // Handle refresh
  const handleRefresh = () => {
    dispatch(clearErrors());
    dispatch(fetchProjectsWithStats());
  };

  // Get ranking trend icon
  const getRankingTrendIcon = (current: number, previous: number) => {
    if (current < previous)
      return <RiseOutlined style={{ color: "#52c41a" }} />;
    if (current > previous)
      return <FallOutlined style={{ color: "#f5222d" }} />;
    return <MinusOutlined style={{ color: "#faad14" }} />;
  };

  // Get status tag based on setup progress
  const getStatusTag = (project: any) => {
    const hasKeywords = project._count.keywords > 0;
    const hasAudits = project._count.audits > 0;
    const hasCompetitors = project._count.competitors > 0;

    if (hasKeywords && hasAudits && hasCompetitors) {
      return <Tag color="green">Complete</Tag>;
    } else if (hasKeywords || hasAudits) {
      return <Tag color="orange">In Progress</Tag>;
    } else {
      return <Tag color="red">Setup Required</Tag>;
    }
  };

  const columns = [
    {
      title: "Project",
      dataIndex: "name",
      key: "name",
      width: 200,
      render: (text: string, record: any) => {
        const countryInfo = getSortedCountries().find(
          (c) => c.code === record.settings?.country
        );
        const languageInfo = getSortedLanguages().find(
          (l) => l.code === record.settings?.language
        );

        return (
          <div>
            <div
              style={{ fontWeight: "bold", color: "#1890ff", marginBottom: 4 }}
            >
              {text}
            </div>
            <div style={{ fontSize: "12px", color: "#999", marginBottom: 4 }}>
              <a
                href={`https://${record.domain}`}
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: "#999", textDecoration: "none" }}
                onMouseOver={(e) =>
                  ((e.target as HTMLElement).style.color = "#1890ff")
                }
                onMouseOut={(e) =>
                  ((e.target as HTMLElement).style.color = "#999")
                }
              >
                {record.domain}
              </a>
            </div>
            <div style={{ marginBottom: 4 }}>{getStatusTag(record)}</div>
            <div style={{ fontSize: "11px", color: "#666" }}>
              {countryInfo && (
                <Space size={4}>
                  <span>{countryInfo.flag}</span>
                  <span>{countryInfo.name}</span>
                  {languageInfo && <span>• {languageInfo.nativeName}</span>}
                </Space>
              )}
            </div>
          </div>
        );
      },
    },
    {
      title: "Keywords",
      dataIndex: ["_count", "keywords"],
      key: "keywords",
      width: 100,
      render: (count: number, record: any) => (
        <div style={{ textAlign: "center" }}>
          <div
            style={{ fontSize: "18px", fontWeight: "bold", color: "#1890ff" }}
          >
            {count}
          </div>
          {record.stats && (
            <div style={{ fontSize: "12px", color: "#999" }}>
              Avg: {record.stats.averageRanking?.toFixed(1) || "N/A"}
            </div>
          )}
        </div>
      ),
    },
    {
      title: "Ranking Distribution",
      key: "rankingDistribution",
      width: 200,
      render: (text: string, record: any) => {
        if (!record.stats?.rankingDistribution) {
          return (
            <Button type="link" style={{ padding: 0, color: "#1890ff" }}>
              Set Up
            </Button>
          );
        }

        const { rankingDistribution } = record.stats;
        return (
          <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
            <Tooltip title="Top 3">
              <Tag color="green">1-3: {rankingDistribution?.top3}</Tag>
            </Tooltip>
            <Tooltip title="Top 10">
              <Tag color="blue">4-10: {rankingDistribution?.top10}</Tag>
            </Tooltip>
            <Tooltip title="Top 50">
              <Tag color="orange">11-50: {rankingDistribution?.top50}</Tag>
            </Tooltip>
            <Tooltip title="Beyond 50">
              <Tag color="red">50+: {rankingDistribution?.beyond50}</Tag>
            </Tooltip>
          </div>
        );
      },
    },
    {
      title: "Recent Changes",
      key: "recentChanges",
      width: 150,
      render: (text: string, record: any) => {
        if (!record.stats) {
          return (
            <Button type="link" style={{ padding: 0, color: "#1890ff" }}>
              Set Up
            </Button>
          );
        }

        const { improvedKeywords, declinedKeywords, stableKeywords } =
          record.stats;
        return (
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
              <RiseOutlined style={{ color: "#52c41a" }} />
              <span style={{ color: "#52c41a" }}>{improvedKeywords}</span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
              <FallOutlined style={{ color: "#f5222d" }} />
              <span style={{ color: "#f5222d" }}>{declinedKeywords}</span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
              <MinusOutlined style={{ color: "#faad14" }} />
              <span style={{ color: "#faad14" }}>{stableKeywords}</span>
            </div>
          </div>
        );
      },
    },
    {
      title: "Audits",
      dataIndex: ["_count", "audits"],
      key: "audits",
      width: 100,
      render: (count: number, record: any) => (
        <div style={{ textAlign: "center" }}>
          <div style={{ fontSize: "16px", fontWeight: "bold" }}>{count}</div>
          {record.stats?.auditSummary && (
            <div
              style={{
                fontSize: "12px",
                color:
                  record.stats.auditSummary.averageScore > 80
                    ? "#52c41a"
                    : "#f5222d",
              }}
            >
              Score: {record.stats.auditSummary.averageScore}
            </div>
          )}
        </div>
      ),
    },
    {
      title: "Competitors",
      dataIndex: ["_count", "competitors"],
      key: "competitors",
      width: 100,
      render: (count: number) => (
        <div
          style={{ textAlign: "center", fontSize: "16px", fontWeight: "bold" }}
        >
          {count}
        </div>
      ),
    },
    {
      title: "Backlinks",
      dataIndex: ["_count", "backlinks"],
      key: "backlinks",
      width: 100,
      render: (count: number) => (
        <div
          style={{ textAlign: "center", fontSize: "16px", fontWeight: "bold" }}
        >
          {count || 0}
        </div>
      ),
    },
    {
      title: "Actions",
      key: "actions",
      width: 120,
      render: (text: string, record: any) => (
        <Space size="small">
          <Tooltip title="View Details">
            <Button
              type="text"
              icon={<EyeOutlined />}
              size="small"
              onClick={() => handleViewProject(record)}
            />
          </Tooltip>
          <Tooltip title="Edit Project">
            <Button
              type="text"
              icon={<EditOutlined />}
              size="small"
              onClick={() => handleEditProject(record)}
            />
          </Tooltip>
          <Tooltip title="Delete Project">
            <Button
              type="text"
              danger
              icon={<DeleteOutlined />}
              size="small"
              onClick={() => handleDeleteProject(record.id, record.name)}
              loading={loading.deleteProject}
            />
          </Tooltip>
        </Space>
      ),
    },
  ];

  // Render header with search and country selector
  const renderHeader = () => {
    const hasActiveFilters = searchValue || selectedCountry !== "ALL";
    const filteredCount = filteredProjects.length;
    const totalCount = projectsWithStats.length;

    return (
      <div
        style={{
          padding: "16px 24px",
          background: "white",
          borderBottom: "1px solid #f0f0f0",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "16px",
            flex: 1,
          }}
        >
          <Search
            placeholder="Search by name, domain, or country..."
            style={{ width: 400 }}
            size="large"
            value={searchValue}
            onChange={(e) => handleSearch(e.target.value)}
            onSearch={handleAdvancedSearch}
            loading={loading.fetchProjects}
            allowClear
            enterButton={<SearchOutlined />}
          />
          <Select
            value={selectedCountry}
            onChange={handleCountryChange}
            style={{ width: 180 }}
            size="large"
            suffixIcon={<DownOutlined />}
            showSearch
            placeholder="Filter by country"
            filterOption={(input, option) => {
              const label = option?.label;
              if (typeof label === "string") {
                return label.toLowerCase().includes(input.toLowerCase());
              }
              return false;
            }}
          >
            <Select.Option key="ALL" value="ALL" label="🌍 All Countries">
              <Space>
                <span>🌍</span>
                All Countries
              </Space>
            </Select.Option>
            <Select.OptGroup label="Popular Countries">
              {popularCountries.map((country) => (
                <Select.Option
                  key={country.code}
                  value={country.code}
                  label={`${country.flag} ${country.name}`}
                >
                  <Space>
                    <span>{country.flag}</span>
                    {country.name}
                  </Space>
                </Select.Option>
              ))}
            </Select.OptGroup>
            <Select.OptGroup label="All Countries">
              {getSortedCountries()
                .filter(
                  (country) =>
                    !popularCountries.find((p) => p.code === country.code)
                )
                .map((country) => (
                  <Select.Option
                    key={country.code}
                    value={country.code}
                    label={`${country.flag} ${country.name}`}
                  >
                    <Space>
                      <span>{country.flag}</span>
                      {country.name}
                    </Space>
                  </Select.Option>
                ))}
            </Select.OptGroup>
          </Select>

          {hasActiveFilters && (
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <Text type="secondary" style={{ fontSize: "14px" }}>
                Showing {filteredCount} of {totalCount} projects
              </Text>
              <Button
                type="link"
                size="small"
                onClick={handleClearSearch}
                style={{ padding: "0 4px" }}
              >
                Clear filters
              </Button>
            </div>
          )}
        </div>

        <div style={{ display: "flex", gap: "8px" }}>
          {hasActiveFilters && (
            <Button
              size="large"
              icon={<SearchOutlined />}
              onClick={handleAdvancedSearch}
              loading={loading.fetchProjects}
            >
              Search Server
            </Button>
          )}
          <Button
            type="primary"
            size="large"
            icon={<ReloadOutlined />}
            onClick={handleRefresh}
            loading={loading.fetchProjectsWithStats}
          >
            Refresh
          </Button>
        </div>
      </div>
    );
  };

  // Render stats cards
  const renderStatsCards = () => {
    // Use filtered projects for stats
    const currentProjects =
      debouncedSearchValue || selectedCountry !== "ALL"
        ? filteredProjects
        : projectsWithStats;

    const totalProjects = currentProjects.length;
    const totalKeywords = currentProjects.reduce(
      (sum, p) => sum + (p._count.keywords || 0),
      0
    );
    const totalAudits = currentProjects.reduce(
      (sum, p) => sum + (p._count.audits || 0),
      0
    );
    const totalBacklinks = currentProjects.reduce(
      (sum, p) => sum + (p._count.backlinks || 0),
      0
    );

    // Get most used countries from current view
    const countryStats = currentProjects.reduce((acc, project) => {
      const country = project.settings?.country || "Unknown";
      acc[country] = (acc[country] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    const topCountry = Object.entries(countryStats).sort(
      ([, a], [, b]) => (b as number) - (a as number)
    )[0];

    const topCountryInfo = topCountry
      ? getSortedCountries().find((c) => c.code === topCountry[0])
      : null;

    return (
      <Row gutter={16} style={{ marginBottom: 24 }}>
        <Col span={6}>
          <Card hoverable>
            <Statistic
              title={`Projects ${
                debouncedSearchValue || selectedCountry !== "ALL"
                  ? "(Filtered)"
                  : ""
              }`}
              value={totalProjects}
              valueStyle={{ color: "#1890ff" }}
              prefix={
                debouncedSearchValue || selectedCountry !== "ALL" ? (
                  <SearchOutlined />
                ) : undefined
              }
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card hoverable>
            <Statistic
              title="Total Keywords"
              value={totalKeywords}
              valueStyle={{ color: "#52c41a" }}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card hoverable>
            <Statistic
              title="SEO Audits"
              value={totalAudits}
              valueStyle={{ color: "#faad14" }}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card hoverable>
            <Statistic
              title="Backlinks"
              value={totalBacklinks}
              valueStyle={{ color: "#722ed1" }}
            />
          </Card>
        </Col>
      </Row>
    );
  };

  // Render hero section
  const renderHeroSection = () => (
    <div
      style={{
        height: "200px",
        background:
          "linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Diamond pattern overlay */}
      <div
        style={{
          position: "absolute",
          right: 0,
          top: 0,
          bottom: 0,
          width: "50%",
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='white' fill-opacity='0.1'%3E%3Cpath d='M20 20L0 0h40L20 20zM20 20L40 40H0L20 20z'/%3E%3C/g%3E%3C/svg%3E")`,
          backgroundSize: "40px 40px",
        }}
      />
    </div>
  );

  // Render projects section
  const renderProjectsSection = () => (
    <div style={{ padding: "24px" }}>
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
              All (
              {debouncedSearchValue || selectedCountry !== "ALL"
                ? `${filteredProjects.length}/${projectsWithStats.length}`
                : projectsWithStats.length}
              )
            </Text>
            <Text style={{ color: "#999" }}>
              Active (
              {
                (debouncedSearchValue || selectedCountry !== "ALL"
                  ? filteredProjects
                  : projectsWithStats
                ).filter((p) => p.isActive).length
              }
              )
            </Text>
            <Text style={{ color: "#999" }}>Shared (0)</Text>
          </div>
        </div>
        <div style={{ display: "flex", gap: "12px" }}>
          <Button
            icon={<ReloadOutlined />}
            style={{ borderRadius: "6px" }}
            onClick={handleRefresh}
            loading={loading.fetchProjectsWithStats}
          >
            Refresh
          </Button>
          <Button
            type="primary"
            icon={<PlusOutlined />}
            style={{ borderRadius: "6px" }}
            onClick={() => setIsCreateModalVisible(true)}
            loading={loading.createProject}
          >
            Create Project
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      {renderStatsCards()}

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
          <Text strong>Projects Overview</Text>
        </div>

        <Spin spinning={loading.fetchProjectsWithStats}>
          <Table
            dataSource={
              debouncedSearchValue || selectedCountry !== "ALL"
                ? filteredProjects
                : projectsWithStats
            }
            columns={columns}
            pagination={{
              current: 1,
              pageSize: 10,
              total:
                debouncedSearchValue || selectedCountry !== "ALL"
                  ? filteredProjects.length
                  : projectsWithStats.length,
              showSizeChanger: true,
              showQuickJumper: true,
              showTotal: (total, range) =>
                `${range[0]}-${range[1]} of ${total} projects`,
              pageSizeOptions: ["10", "20", "50", "100"],
            }}
            size="middle"
            scroll={{ x: 1500 }}
            rowKey="id"
          />
        </Spin>
      </div>
    </div>
  );

  // Main dashboard content when projects tab is active
  const renderMainDashboard = () => (
    <div style={{ background: "#f5f5f5", minHeight: "100vh" }}>
      {renderHeader()}
      {renderHeroSection()}
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

        {/* Create Project Modal */}
        <Modal
          title="Create New Project"
          open={isCreateModalVisible}
          onCancel={() => {
            setIsCreateModalVisible(false);
            form.resetFields();
          }}
          footer={null}
          width={600}
        >
          <Form form={form} layout="vertical" onFinish={handleCreateProject}>
            <Form.Item
              name="name"
              label="Project Name"
              rules={[{ required: true, message: "Please enter project name" }]}
            >
              <Input placeholder="Enter project name" />
            </Form.Item>

            <Form.Item
              name="domain"
              label="Domain"
              rules={[
                { required: true, message: "Please enter domain" },
                {
                  pattern:
                    /^[a-zA-Z0-9]([a-zA-Z0-9\-]{0,61}[a-zA-Z0-9])?(\.[a-zA-Z]{2,})+$/,
                  message: "Please enter a valid domain",
                },
              ]}
            >
              <Input placeholder="example.com" />
            </Form.Item>

            <Row gutter={16}>
              <Col span={12}>
                <Form.Item
                  name="country"
                  label="Country"
                  initialValue={selectedCountry}
                >
                  <Select
                    showSearch
                    placeholder="Select country"
                    filterOption={(input, option) => {
                      const label = option?.label;
                      if (typeof label === "string") {
                        return label
                          .toLowerCase()
                          .includes(input.toLowerCase());
                      }
                      return false;
                    }}
                  >
                    <Select.OptGroup label="Popular Countries">
                      {popularCountries.map((country) => (
                        <Select.Option
                          key={country.code}
                          value={country.code}
                          label={`${country.flag} ${country.name}`}
                        >
                          <Space>
                            <span>{country.flag}</span>
                            {country.name}
                          </Space>
                        </Select.Option>
                      ))}
                    </Select.OptGroup>
                    <Select.OptGroup label="All Countries">
                      {getSortedCountries()
                        .filter(
                          (country) =>
                            !popularCountries.find(
                              (p) => p.code === country.code
                            )
                        )
                        .map((country) => (
                          <Select.Option
                            key={country.code}
                            value={country.code}
                            label={`${country.flag} ${country.name}`}
                          >
                            <Space>
                              <span>{country.flag}</span>
                              {country.name}
                            </Space>
                          </Select.Option>
                        ))}
                    </Select.OptGroup>
                  </Select>
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item name="language" label="Language" initialValue="en">
                  <Select
                    showSearch
                    placeholder="Select language"
                    filterOption={(input, option) => {
                      const label = option?.label;
                      if (typeof label === "string") {
                        return label
                          .toLowerCase()
                          .includes(input.toLowerCase());
                      }
                      return false;
                    }}
                  >
                    <Select.OptGroup label="Popular Languages">
                      {popularLanguages.map((language) => (
                        <Select.Option
                          key={language.code}
                          value={language.code}
                          label={`${language.name} (${language.nativeName})`}
                        >
                          {language.name} ({language.nativeName})
                        </Select.Option>
                      ))}
                    </Select.OptGroup>
                    <Select.OptGroup label="All Languages">
                      {getSortedLanguages()
                        .filter(
                          (language) =>
                            !popularLanguages.find(
                              (p) => p.code === language.code
                            )
                        )
                        .map((language) => (
                          <Select.Option
                            key={language.code}
                            value={language.code}
                            label={`${language.name} (${language.nativeName})`}
                          >
                            {language.name} ({language.nativeName})
                          </Select.Option>
                        ))}
                    </Select.OptGroup>
                  </Select>
                </Form.Item>
              </Col>
            </Row>

            <Form.Item style={{ marginBottom: 0, textAlign: "right" }}>
              <Space>
                <Button
                  onClick={() => {
                    setIsCreateModalVisible(false);
                    form.resetFields();
                  }}
                >
                  Cancel
                </Button>
                <Button
                  type="primary"
                  htmlType="submit"
                  loading={loading.createProject}
                >
                  Create Project
                </Button>
              </Space>
            </Form.Item>
          </Form>
        </Modal>

        {/* View Project Modal */}
        <Modal
          title="Project Details"
          open={isViewModalVisible}
          onCancel={() => {
            setIsViewModalVisible(false);
            setSelectedProject(null);
          }}
          footer={[
            <Button
              key="close"
              onClick={() => {
                setIsViewModalVisible(false);
                setSelectedProject(null);
              }}
            >
              Close
            </Button>,
            <Button
              key="edit"
              type="primary"
              onClick={() => {
                setIsViewModalVisible(false);
                handleEditProject(selectedProject);
              }}
              disabled={!selectedProject}
            >
              Edit Project
            </Button>,
          ]}
          width={800}
        >
          <Spin spinning={loading.fetchProjectDetails}>
            {selectedProject && (
              <div>
                <Row gutter={16}>
                  <Col span={12}>
                    <Card
                      title="Basic Information"
                      size="small"
                      style={{ marginBottom: 16 }}
                    >
                      <div style={{ marginBottom: 8 }}>
                        <Text strong>Project Name: </Text>
                        <Text>{selectedProject.name}</Text>
                      </div>
                      <div style={{ marginBottom: 8 }}>
                        <Text strong>Domain: </Text>
                        <Text>
                          <a
                            href={`https://${selectedProject.domain}`}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            {selectedProject.domain}
                          </a>
                        </Text>
                      </div>
                      <div style={{ marginBottom: 8 }}>
                        <Text strong>Created: </Text>
                        <Text>
                          {new Date(
                            selectedProject.createdAt
                          ).toLocaleDateString()}
                        </Text>
                      </div>
                      <div style={{ marginBottom: 8 }}>
                        <Text strong>Status: </Text>
                        {getStatusTag(selectedProject)}
                      </div>
                      <div>
                        <Text strong>Active: </Text>
                        <Tag color={selectedProject.isActive ? "green" : "red"}>
                          {selectedProject.isActive ? "Yes" : "No"}
                        </Tag>
                      </div>
                    </Card>
                  </Col>
                  <Col span={12}>
                    <Card
                      title="Settings"
                      size="small"
                      style={{ marginBottom: 16 }}
                    >
                      {(() => {
                        const countryInfo = getSortedCountries().find(
                          (c) => c.code === selectedProject.settings?.country
                        );
                        const languageInfo = getSortedLanguages().find(
                          (l) => l.code === selectedProject.settings?.language
                        );
                        return (
                          <>
                            <div style={{ marginBottom: 8 }}>
                              <Text strong>Country: </Text>
                              {countryInfo ? (
                                <Space>
                                  <span>{countryInfo.flag}</span>
                                  <Text>{countryInfo.name}</Text>
                                </Space>
                              ) : (
                                <Text>Not set</Text>
                              )}
                            </div>
                            <div style={{ marginBottom: 8 }}>
                              <Text strong>Language: </Text>
                              {languageInfo ? (
                                <Text>
                                  {languageInfo.name} ({languageInfo.nativeName}
                                  )
                                </Text>
                              ) : (
                                <Text>Not set</Text>
                              )}
                            </div>
                            <div style={{ marginBottom: 8 }}>
                              <Text strong>Tracking: </Text>
                              <Tag
                                color={
                                  selectedProject.settings?.trackingEnabled
                                    ? "green"
                                    : "red"
                                }
                              >
                                {selectedProject.settings?.trackingEnabled
                                  ? "Enabled"
                                  : "Disabled"}
                              </Tag>
                            </div>
                            <div>
                              <Text strong>Last Update: </Text>
                              <Text>
                                {selectedProject.stats?.lastUpdate
                                  ? new Date(
                                      selectedProject.stats.lastUpdate
                                    ).toLocaleString()
                                  : "Never"}
                              </Text>
                            </div>
                          </>
                        );
                      })()}
                    </Card>
                  </Col>
                </Row>

                <Row gutter={16}>
                  <Col span={6}>
                    <Card size="small">
                      <Statistic
                        title="Keywords"
                        value={selectedProject._count?.keywords || 0}
                        valueStyle={{ color: "#1890ff" }}
                      />
                    </Card>
                  </Col>
                  <Col span={6}>
                    <Card size="small">
                      <Statistic
                        title="Competitors"
                        value={selectedProject._count?.competitors || 0}
                        valueStyle={{ color: "#52c41a" }}
                      />
                    </Card>
                  </Col>
                  <Col span={6}>
                    <Card size="small">
                      <Statistic
                        title="Audits"
                        value={selectedProject._count?.audits || 0}
                        valueStyle={{ color: "#faad14" }}
                      />
                    </Card>
                  </Col>
                  <Col span={6}>
                    <Card size="small">
                      <Statistic
                        title="Backlinks"
                        value={selectedProject._count?.backlinks || 0}
                        valueStyle={{ color: "#722ed1" }}
                      />
                    </Card>
                  </Col>
                </Row>

                {selectedProject.stats && (
                  <Card
                    title="Performance Statistics"
                    size="small"
                    style={{ marginTop: 16 }}
                  >
                    <Row gutter={16}>
                      <Col span={8}>
                        <Statistic
                          title="Average Ranking"
                          value={
                            selectedProject.stats.averageRanking?.toFixed(1) ||
                            "N/A"
                          }
                          valueStyle={{ color: "#1890ff" }}
                        />
                      </Col>
                      <Col span={8}>
                        <Statistic
                          title="Improved Keywords"
                          value={selectedProject.stats.improvedKeywords || 0}
                          valueStyle={{ color: "#52c41a" }}
                          prefix={<RiseOutlined />}
                        />
                      </Col>
                      <Col span={8}>
                        <Statistic
                          title="Declined Keywords"
                          value={selectedProject.stats.declinedKeywords || 0}
                          valueStyle={{ color: "#f5222d" }}
                          prefix={<FallOutlined />}
                        />
                      </Col>
                    </Row>

                    {selectedProject.stats.rankingDistribution && (
                      <div style={{ marginTop: 16 }}>
                        <Text strong>Ranking Distribution:</Text>
                        <div
                          style={{
                            marginTop: 8,
                            display: "flex",
                            gap: "8px",
                            flexWrap: "wrap",
                          }}
                        >
                          <Tag color="green">
                            Top 3:{" "}
                            {selectedProject.stats.rankingDistribution?.top3}
                          </Tag>
                          <Tag color="blue">
                            4-10:{" "}
                            {selectedProject.stats.rankingDistribution?.top10}
                          </Tag>
                          <Tag color="orange">
                            11-50:{" "}
                            {selectedProject.stats.rankingDistribution?.top50}
                          </Tag>
                          <Tag color="red">
                            50+:{" "}
                            {
                              selectedProject.stats.rankingDistribution
                                ?.beyond50
                            }
                          </Tag>
                        </div>
                      </div>
                    )}

                    {selectedProject.stats.auditSummary && (
                      <div style={{ marginTop: 16 }}>
                        <Text strong>SEO Audit Summary:</Text>
                        <div style={{ marginTop: 8 }}>
                          <Space size="large">
                            <Statistic
                              title="Average Score"
                              value={
                                selectedProject.stats.auditSummary
                                  .averageScore || "N/A"
                              }
                              valueStyle={{
                                color:
                                  selectedProject.stats.auditSummary
                                    .averageScore > 80
                                    ? "#52c41a"
                                    : selectedProject.stats.auditSummary
                                        .averageScore > 60
                                    ? "#faad14"
                                    : "#f5222d",
                              }}
                              suffix="/100"
                            />
                            <Statistic
                              title="Critical Issues"
                              value={
                                selectedProject.stats.auditSummary
                                  .criticalIssues || 0
                              }
                              valueStyle={{ color: "#f5222d" }}
                            />
                          </Space>
                        </div>
                      </div>
                    )}
                  </Card>
                )}

                {selectedProject.stats?.topKeywords &&
                  selectedProject.stats.topKeywords.length > 0 && (
                    <Card
                      title="Top Performing Keywords"
                      size="small"
                      style={{ marginTop: 16 }}
                    >
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          gap: "8px",
                        }}
                      >
                        {selectedProject.stats.topKeywords
                          .slice(0, 5)
                          .map((keyword: any, index: number) => (
                            <div
                              key={keyword.id}
                              style={{
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "center",
                                padding: "8px 12px",
                                backgroundColor: "#fafafa",
                                borderRadius: "4px",
                              }}
                            >
                              <Space>
                                <Text strong>#{index + 1}</Text>
                                <Text>{keyword.keyword}</Text>
                              </Space>
                              <Tag
                                color={
                                  keyword.currentRanking <= 3
                                    ? "green"
                                    : keyword.currentRanking <= 10
                                    ? "blue"
                                    : keyword.currentRanking <= 50
                                    ? "orange"
                                    : "red"
                                }
                              >
                                Position {keyword.currentRanking}
                              </Tag>
                            </div>
                          ))}
                      </div>
                    </Card>
                  )}
              </div>
            )}
          </Spin>
        </Modal>

        {/* Edit Project Modal */}
        <Modal
          title="Edit Project"
          open={isEditModalVisible}
          onCancel={() => {
            setIsEditModalVisible(false);
            setSelectedProject(null);
            editForm.resetFields();
          }}
          footer={null}
          width={600}
        >
          <Form
            form={editForm}
            layout="vertical"
            onFinish={handleUpdateProject}
          >
            <Form.Item
              name="name"
              label="Project Name"
              rules={[{ required: true, message: "Please enter project name" }]}
            >
              <Input placeholder="Enter project name" />
            </Form.Item>

            <Form.Item label="Domain">
              <Input value={selectedProject?.domain} disabled />
            </Form.Item>

            <Row gutter={16}>
              <Col span={12}>
                <Form.Item name="country" label="Country">
                  <Select
                    showSearch
                    placeholder="Select country"
                    filterOption={(input, option) => {
                      const label = option?.label;
                      if (typeof label === "string") {
                        return label
                          .toLowerCase()
                          .includes(input.toLowerCase());
                      }
                      return false;
                    }}
                  >
                    <Select.OptGroup label="Popular Countries">
                      {popularCountries.map((country) => (
                        <Select.Option
                          key={country.code}
                          value={country.code}
                          label={`${country.flag} ${country.name}`}
                        >
                          <Space>
                            <span>{country.flag}</span>
                            {country.name}
                          </Space>
                        </Select.Option>
                      ))}
                    </Select.OptGroup>
                    <Select.OptGroup label="All Countries">
                      {getSortedCountries()
                        .filter(
                          (country) =>
                            !popularCountries.find(
                              (p) => p.code === country.code
                            )
                        )
                        .map((country) => (
                          <Select.Option
                            key={country.code}
                            value={country.code}
                            label={`${country.flag} ${country.name}`}
                          >
                            <Space>
                              <span>{country.flag}</span>
                              {country.name}
                            </Space>
                          </Select.Option>
                        ))}
                    </Select.OptGroup>
                  </Select>
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item name="language" label="Language">
                  <Select
                    showSearch
                    placeholder="Select language"
                    filterOption={(input, option) => {
                      const label = option?.label;
                      if (typeof label === "string") {
                        return label
                          .toLowerCase()
                          .includes(input.toLowerCase());
                      }
                      return false;
                    }}
                  >
                    <Select.OptGroup label="Popular Languages">
                      {popularLanguages.map((language) => (
                        <Select.Option
                          key={language.code}
                          value={language.code}
                          label={`${language.name} (${language.nativeName})`}
                        >
                          {language.name} ({language.nativeName})
                        </Select.Option>
                      ))}
                    </Select.OptGroup>
                    <Select.OptGroup label="All Languages">
                      {getSortedLanguages()
                        .filter(
                          (language) =>
                            !popularLanguages.find(
                              (p) => p.code === language.code
                            )
                        )
                        .map((language) => (
                          <Select.Option
                            key={language.code}
                            value={language.code}
                            label={`${language.name} (${language.nativeName})`}
                          >
                            {language.name} ({language.nativeName})
                          </Select.Option>
                        ))}
                    </Select.OptGroup>
                  </Select>
                </Form.Item>
              </Col>
            </Row>

            <Form.Item name="trackingEnabled" valuePropName="checked">
              <Checkbox>Enable position tracking</Checkbox>
            </Form.Item>

            <Form.Item style={{ marginBottom: 0, textAlign: "right" }}>
              <Space>
                <Button
                  onClick={() => {
                    setIsEditModalVisible(false);
                    setSelectedProject(null);
                    editForm.resetFields();
                  }}
                >
                  Cancel
                </Button>
                <Button
                  type="primary"
                  htmlType="submit"
                  loading={loading.updateProject}
                >
                  Update Project
                </Button>
              </Space>
            </Form.Item>
          </Form>
        </Modal>
      </div>
    </App>
  );
};

export default Page;
