import React, { useState, useEffect } from "react";
import {
  Card,
  Row,
  Col,
  Select,
  Button,
  Space,
  Typography,
  Divider,
  Tag,
  Tabs,
  Table,
  Statistic,
  Progress,
  Empty,
  Spin,
  Alert,
} from "antd";
import {
  SearchOutlined,
  TrophyOutlined,
  RiseOutlined,
  UserOutlined,
  FileTextOutlined,
  ReloadOutlined,
  DownloadOutlined,
} from "@ant-design/icons";
import { useSelector } from "react-redux";
import { RootState } from "@/stores/store";
import {
  useOrganicResearch,
  useDomainAnalysis,
  useOrganicKeywords,
  useCompetitors,
  useTopPages,
  useApiLimits,
} from "@/stores/hooks/useOrganicResearch";
import { organicResearchService } from "@/services/organic-research.service";
import OrganicResearchWidget from "./organic-research-widget";
import ApiLimitsWidget from "./api-limits-widget";
import styles from "./organic-research-dashboard.module.scss";

const { Option } = Select;
const { Title, Text } = Typography;
const { TabPane } = Tabs;

interface OrganicResearchDashboardProps {
  selectedProjectId?: string;
}

const OrganicResearchDashboard: React.FC<OrganicResearchDashboardProps> = ({
  selectedProjectId,
}) => {
  const [selectedDomain, setSelectedDomain] = useState<string>("");
  const [selectedCountry, setSelectedCountry] = useState<string>("US");
  const [activeTab, setActiveTab] = useState<string>("overview");

  // Get projects from Redux store
  const { projects } = useSelector((state: RootState) => state.project);

  // Find the current project
  const currentProject = selectedProjectId
    ? projects.find((p) => p.id === selectedProjectId)
    : useSelector((state: RootState) => state.project.currentProject);

  // Hooks
  const {
    domainAnalysis,
    loading: domainLoading,
    error: domainError,
  } = useDomainAnalysis();
  const {
    organicKeywords,
    loading: keywordsLoading,
    fetchKeywords,
  } = useOrganicKeywords();
  const {
    competitors,
    loading: competitorsLoading,
    fetchCompetitors,
  } = useCompetitors();
  const { topPages, loading: topPagesLoading, fetchTopPages } = useTopPages();
  const { apiLimits } = useApiLimits();

  // Auto-load data when project changes
  useEffect(() => {
    if (currentProject?.domain) {
      setSelectedDomain(currentProject.domain);
      loadAllData(currentProject.domain, selectedCountry);
    }
  }, [currentProject?.domain, selectedCountry]);

  const loadAllData = async (domain: string, country: string) => {
    try {
      // Load keywords with pagination
      await fetchKeywords(domain, {
        country,
        limit: 50,
        sortBy: "position",
        sortOrder: "asc",
      });

      // Load competitors
      await fetchCompetitors(domain, {
        country,
        limit: 20,
      });

      // Load top pages
      await fetchTopPages(domain, {
        country,
        limit: 25,
        sortBy: "traffic",
      });
    } catch (error) {
      console.error("Failed to load organic research data:", error);
    }
  };

  const handleRefresh = () => {
    if (selectedDomain) {
      loadAllData(selectedDomain, selectedCountry);
    }
  };

  const formatNumber = (num: number | undefined): string => {
    if (!num) return "0";
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
    return num.toString();
  };

  // Keywords table columns
  const keywordsColumns = [
    {
      title: "Keyword",
      dataIndex: "keyword",
      key: "keyword",
      width: 200,
      render: (text: string) => <Text strong>{text}</Text>,
    },
    {
      title: "Position",
      dataIndex: "position",
      key: "position",
      width: 80,
      render: (position: number, record: any) => (
        <Space>
          <Tag
            color={position <= 3 ? "green" : position <= 10 ? "orange" : "red"}
          >
            #{position}
          </Tag>
          {record.previousPosition && (
            <span style={{ fontSize: "11px", color: "#666" }}>
              {position < record.previousPosition ? "↗" : "↘"}
            </span>
          )}
        </Space>
      ),
    },
    {
      title: "Volume",
      dataIndex: "searchVolume",
      key: "searchVolume",
      width: 100,
      render: (volume: number) => formatNumber(volume),
    },
    {
      title: "Traffic %",
      dataIndex: "trafficShare",
      key: "trafficShare",
      width: 100,
      render: (share: number) => `${share.toFixed(1)}%`,
    },
    {
      title: "Difficulty",
      dataIndex: "difficulty",
      key: "difficulty",
      width: 100,
      render: (difficulty: number) => (
        <Progress
          percent={difficulty}
          size="small"
          strokeColor={
            difficulty >= 70
              ? "#ff4d4f"
              : difficulty >= 40
              ? "#faad14"
              : "#52c41a"
          }
          showInfo={false}
        />
      ),
    },
    {
      title: "Intent",
      dataIndex: "intent",
      key: "intent",
      width: 120,
      render: (intent: string) => (
        <Tag
          color={
            intent === "Commercial"
              ? "blue"
              : intent === "Informational"
              ? "green"
              : intent === "Navigational"
              ? "orange"
              : "purple"
          }
        >
          {intent}
        </Tag>
      ),
    },
  ];

  // Competitors table columns
  const competitorsColumns = [
    {
      title: "Domain",
      dataIndex: "domain",
      key: "domain",
      render: (domain: string) => <Text strong>{domain}</Text>,
    },
    {
      title: "Competition Level",
      dataIndex: "competitionLevel",
      key: "competitionLevel",
      render: (level: number) => (
        <Progress
          percent={level}
          size="small"
          strokeColor={
            level >= 70 ? "#ff4d4f" : level >= 40 ? "#faad14" : "#52c41a"
          }
        />
      ),
    },
    {
      title: "Common Keywords",
      dataIndex: "commonKeywords",
      key: "commonKeywords",
      render: (count: number) => formatNumber(count),
    },
    {
      title: "Total Keywords",
      dataIndex: "keywords",
      key: "keywords",
      render: (count: number) => formatNumber(count),
    },
    {
      title: "Traffic",
      dataIndex: "traffic",
      key: "traffic",
      render: (traffic: number) => formatNumber(traffic),
    },
    {
      title: "Traffic Value",
      dataIndex: "trafficValue",
      key: "trafficValue",
      render: (value: number) => `$${formatNumber(value)}`,
    },
  ];

  // Top pages table columns
  const topPagesColumns = [
    {
      title: "URL",
      dataIndex: "url",
      key: "url",
      width: 300,
      render: (url: string) => (
        <a href={url} target="_blank" rel="noopener noreferrer">
          {url.length > 50 ? `${url.substring(0, 50)}...` : url}
        </a>
      ),
    },
    {
      title: "Traffic",
      dataIndex: "traffic",
      key: "traffic",
      render: (traffic: number) => formatNumber(traffic),
    },
    {
      title: "Keywords",
      dataIndex: "keywords",
      key: "keywords",
      render: (count: number) => formatNumber(count),
    },
    {
      title: "Traffic Value",
      dataIndex: "trafficValue",
      key: "trafficValue",
      render: (value: number) => `$${formatNumber(value)}`,
    },
    {
      title: "Avg Position",
      dataIndex: "avgPosition",
      key: "avgPosition",
      render: (position: number) => `#${position.toFixed(1)}`,
    },
  ];

  if (!currentProject) {
    return (
      <Card className={styles.dashboard}>
        <Empty
          description={
            selectedProjectId
              ? "Project not found or no domain configured"
              : "Please select a project to view organic research data"
          }
          image={Empty.PRESENTED_IMAGE_SIMPLE}
        />
      </Card>
    );
  }

  return (
    <div className={styles.dashboard}>
      {/* Header Controls */}
      <Card className={styles.controls}>
        <Row gutter={16} align="middle">
          <Col flex="auto">
            <Space>
              <Text strong>Domain:</Text>
              <Select
                value={selectedDomain}
                onChange={setSelectedDomain}
                style={{ width: 200 }}
              >
                <Option value={currentProject.domain}>
                  {currentProject.domain}
                </Option>
              </Select>
              <Text strong>Country:</Text>
              <Select
                value={selectedCountry}
                onChange={setSelectedCountry}
                style={{ width: 150 }}
              >
                {organicResearchService
                  .getSupportedCountries()
                  .slice(0, 10)
                  .map((country) => (
                    <Option key={country.code} value={country.code}>
                      {country.name}
                    </Option>
                  ))}
              </Select>
            </Space>
          </Col>
          <Col>
            <Space>
              <Button
                icon={<ReloadOutlined />}
                onClick={handleRefresh}
                loading={domainLoading}
              >
                Refresh
              </Button>
              <Button icon={<DownloadOutlined />}>Export</Button>
            </Space>
          </Col>
        </Row>
      </Card>

      {/* Main Content */}
      <Row gutter={[16, 16]}>
        {/* Left Column - Overview and API Limits */}
        <Col xs={24} lg={8}>
          <Space direction="vertical" style={{ width: "100%" }} size="middle">
            <OrganicResearchWidget selectedProjectId={selectedProjectId} />
            <ApiLimitsWidget size="small" />
          </Space>
        </Col>

        {/* Right Column - Detailed Data */}
        <Col xs={24} lg={16}>
          <Card className={styles.dataCard}>
            <Tabs activeKey={activeTab} onChange={setActiveTab}>
              <TabPane
                tab={
                  <span>
                    <SearchOutlined />
                    Keywords ({organicKeywords?.total || 0})
                  </span>
                }
                key="keywords"
              >
                <Table
                  columns={keywordsColumns}
                  dataSource={organicKeywords?.data || []}
                  loading={keywordsLoading}
                  pagination={{
                    total: organicKeywords?.total || 0,
                    current: organicKeywords?.page || 1,
                    pageSize: organicKeywords?.limit || 50,
                    showSizeChanger: true,
                    showQuickJumper: true,
                    showTotal: (total, range) =>
                      `${range[0]}-${range[1]} of ${total} keywords`,
                  }}
                  scroll={{ x: 800 }}
                  size="small"
                />
              </TabPane>

              <TabPane
                tab={
                  <span>
                    <UserOutlined />
                    Competitors ({competitors?.total || 0})
                  </span>
                }
                key="competitors"
              >
                <Table
                  columns={competitorsColumns}
                  dataSource={competitors?.data || []}
                  loading={competitorsLoading}
                  pagination={{
                    total: competitors?.total || 0,
                    pageSize: 20,
                    showSizeChanger: true,
                  }}
                  scroll={{ x: 800 }}
                  size="small"
                />
              </TabPane>

              <TabPane
                tab={
                  <span>
                    <FileTextOutlined />
                    Top Pages ({topPages?.total || 0})
                  </span>
                }
                key="pages"
              >
                <Table
                  columns={topPagesColumns}
                  dataSource={topPages?.data || []}
                  loading={topPagesLoading}
                  pagination={{
                    total: topPages?.total || 0,
                    pageSize: 25,
                    showSizeChanger: true,
                  }}
                  scroll={{ x: 800 }}
                  size="small"
                />
              </TabPane>
            </Tabs>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default OrganicResearchDashboard;
