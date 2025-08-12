"use client";

import React, { useState, useEffect } from "react";
import {
  Card,
  Table,
  Button,
  Select,
  Statistic,
  Row,
  Col,
  Tag,
  Progress,
  Tabs,
  Input,
  Space,
  Dropdown,
  Modal,
  Alert,
  List,
  message,
} from "antd";
import {
  LinkOutlined,
  ArrowUpOutlined,
  SearchOutlined,
  ExportOutlined,
  WarningOutlined,
  CheckCircleOutlined,
  InfoCircleOutlined,
  MoreOutlined,
  GlobalOutlined,
} from "@ant-design/icons";
import { useSelector } from "react-redux";
import { RootState } from "@/stores/store";
import { useBacklink } from "@/stores/hooks";
import { Backlink } from "@/types/backlink.type";
import styles from "./backlink_analytics_manager.module.scss";

const { Option } = Select;
const { Search } = Input;

const BacklinkAnalyticsManager: React.FC = () => {
  const selectedProject = useSelector(
    (state: RootState) => state.project.currentProject
  );

  const {
    backlinkProfile,
    allBacklinksForTable,
    newBacklinks,
    lostBacklinks,
    topBacklinks,
    toxicLinks,
    backlinkSummary,
    anchorTextDistribution,
    anyLoading,
    error,
    initializeBacklinkData,
    updateFilters,
    removeBacklinks,
    getStatusColor,
    getAuthorityColor,
    filters,
  } = useBacklink();

  const [activeTab, setActiveTab] = useState("overview");
  const [showDisavowModal, setShowDisavowModal] = useState(false);
  const [selectedBacklinks, setSelectedBacklinks] = useState<string[]>([]);

  useEffect(() => {
    if (selectedProject?.id) {
      initializeBacklinkData(selectedProject.id);
    }
  }, [selectedProject?.id, initializeBacklinkData]);

  useEffect(() => {
    if (error) {
      message.error(error);
    }
  }, [error]);

  const handleSearch = (value: string) => {
    updateFilters({ searchTerm: value });
  };

  const handleFilterChange = (filterType: string, value: string) => {
    updateFilters({ [filterType]: value });
  };

  const handleDisavowSelected = async () => {
    if (!selectedProject?.id || selectedBacklinks.length === 0) return;

    try {
      await removeBacklinks(selectedProject.id, selectedBacklinks);
      message.success(
        `Successfully disavowed ${selectedBacklinks.length} backlinks`
      );
      setSelectedBacklinks([]);
      setShowDisavowModal(false);
      // Refresh data
      initializeBacklinkData(selectedProject.id);
    } catch (error) {
      message.error("Failed to disavow backlinks");
    }
  };

  const backlinkColumns = [
    {
      title: "Source Domain",
      dataIndex: "sourceDomain",
      key: "sourceDomain",
      sorter: (a: Backlink, b: Backlink) =>
        a.sourceDomain.localeCompare(b.sourceDomain),
      render: (domain: string, record: Backlink) => (
        <div className={styles.domainCell}>
          <div className={styles.domainName}>
            <GlobalOutlined style={{ marginRight: 8, color: "#1890ff" }} />
            {domain}
          </div>
          <div className={styles.sourceUrl}>
            <a
              href={record.sourceUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              {record.sourceUrl}
            </a>
          </div>
        </div>
      ),
    },
    {
      title: "Anchor Text",
      dataIndex: "anchorText",
      key: "anchorText",
      sorter: (a: Backlink, b: Backlink) =>
        (a.anchorText || "").localeCompare(b.anchorText || ""),
      render: (text: string, record: Backlink) => (
        <div className={styles.anchorCell}>
          <span className={styles.anchorText}>{text || "N/A"}</span>
          <div className={styles.linkAttributes}>
            {record.linkType === "nofollow" && (
              <Tag color="orange">nofollow</Tag>
            )}
            {record.isSponsored && <Tag color="purple">sponsored</Tag>}
            {record.isUGC && <Tag color="cyan">UGC</Tag>}
          </div>
        </div>
      ),
    },
    {
      title: "DA",
      dataIndex: "authorityScore",
      key: "authorityScore",
      sorter: (a: Backlink, b: Backlink) => a.authorityScore - b.authorityScore,
      render: (da: number) => (
        <div className={styles.metricCell}>
          <span style={{ color: getAuthorityColor(da), fontWeight: 600 }}>
            {da || 0}
          </span>
        </div>
      ),
    },
    {
      title: "PA",
      dataIndex: "pageAuthority",
      key: "pageAuthority",
      sorter: (a: Backlink, b: Backlink) =>
        (a.pageAuthority || 0) - (b.pageAuthority || 0),
      render: (pa: number) => (
        <div className={styles.metricCell}>
          <span style={{ color: getAuthorityColor(pa || 0), fontWeight: 600 }}>
            {pa || 0}
          </span>
        </div>
      ),
    },
    {
      title: "Trust Flow",
      dataIndex: "trustFlow",
      key: "trustFlow",
      sorter: (a: Backlink, b: Backlink) =>
        (a.trustFlow || 0) - (b.trustFlow || 0),
      render: (tf: number) => (
        <div className={styles.metricCell}>
          <span style={{ color: getAuthorityColor(tf || 0), fontWeight: 600 }}>
            {tf || 0}
          </span>
        </div>
      ),
    },
    {
      title: "Status",
      dataIndex: "linkStatus",
      key: "linkStatus",
      filters: [
        { text: "Active", value: "active" },
        { text: "New", value: "new" },
        { text: "Lost", value: "lost" },
      ],
      onFilter: (value: any, record: Backlink) => record.linkStatus === value,
      render: (status: string) => (
        <Tag color={getStatusColor(status)}>{status}</Tag>
      ),
    },
    {
      title: "First Seen",
      dataIndex: "discoveredAt",
      key: "discoveredAt",
      sorter: (a: Backlink, b: Backlink) =>
        new Date(a.discoveredAt).getTime() - new Date(b.discoveredAt).getTime(),
      render: (date: string) => new Date(date).toLocaleDateString(),
    },
    {
      title: "Actions",
      key: "actions",
      render: (record: Backlink) => (
        <Dropdown
          menu={{
            items: [
              { key: "1", label: "View Details", icon: <InfoCircleOutlined /> },
              { key: "2", label: "Check Link", icon: <LinkOutlined /> },
              {
                key: "3",
                label: "Add to Disavow",
                icon: <WarningOutlined />,
                danger: true,
              },
            ],
          }}
          trigger={["click"]}
        >
          <Button icon={<MoreOutlined />} />
        </Dropdown>
      ),
    },
  ];

  const overviewStats = [
    {
      title: "Total Backlinks",
      value: backlinkSummary?.totalBacklinks || 0,
      prefix: <LinkOutlined />,
      suffix: "links",
    },
    {
      title: "Referring Domains",
      value: backlinkSummary?.referringDomains || 0,
      prefix: <GlobalOutlined />,
      suffix: "domains",
    },
    {
      title: "Domain Authority",
      value: backlinkSummary?.domainAuthority || 0,
      prefix: <ArrowUpOutlined />,
      valueStyle: {
        color: getAuthorityColor(backlinkSummary?.domainAuthority || 0),
      },
    },
    {
      title: "Trust Flow",
      value: backlinkSummary?.trustFlow || 0,
      prefix: <CheckCircleOutlined />,
      valueStyle: { color: getAuthorityColor(backlinkSummary?.trustFlow || 0) },
    },
  ];

  const tabItems = [
    {
      key: "overview",
      label: "Overview",
      children: (
        <div className={styles.overviewTab}>
          <Row gutter={[16, 16]} className={styles.statsRow}>
            {overviewStats.map((stat, index) => (
              <Col xs={24} sm={12} lg={6} key={index}>
                <Card>
                  <Statistic {...stat} />
                </Card>
              </Col>
            ))}
          </Row>

          <Row gutter={16}>
            <Col xs={24} lg={12}>
              <Card
                title="Link Types Distribution"
                className={styles.distributionCard}
              >
                <div className={styles.linkTypes}>
                  <div className={styles.linkTypeStat}>
                    <span className={styles.label}>Follow Links:</span>
                    <span className={styles.value}>
                      {backlinkProfile?.linkTypes.follow.toLocaleString() || 0}
                    </span>
                    <Progress
                      percent={
                        ((backlinkProfile?.linkTypes.follow || 0) /
                          (backlinkProfile?.totalBacklinks || 1)) *
                        100
                      }
                      strokeColor="#52c41a"
                      showInfo={false}
                    />
                  </div>
                  <div className={styles.linkTypeStat}>
                    <span className={styles.label}>NoFollow Links:</span>
                    <span className={styles.value}>
                      {backlinkProfile?.linkTypes.nofollow.toLocaleString() ||
                        0}
                    </span>
                    <Progress
                      percent={
                        ((backlinkProfile?.linkTypes.nofollow || 0) /
                          (backlinkProfile?.totalBacklinks || 1)) *
                        100
                      }
                      strokeColor="#faad14"
                      showInfo={false}
                    />
                  </div>
                </div>
              </Card>
            </Col>

            <Col xs={24} lg={12}>
              <Card title="Top Anchor Texts" className={styles.anchorTextCard}>
                <List
                  dataSource={anchorTextDistribution || []}
                  renderItem={(item) => (
                    <List.Item className={styles.anchorItem}>
                      <div className={styles.anchorItemContent}>
                        <span className={styles.anchorText}>{item.text}</span>
                        <span className={styles.anchorCount}>
                          {item.count} ({item.percentage}%)
                        </span>
                      </div>
                      <Progress
                        percent={item.percentage}
                        strokeColor="#1890ff"
                        showInfo={false}
                        size="small"
                      />
                    </List.Item>
                  )}
                />
              </Card>
            </Col>
          </Row>
        </div>
      ),
    },
    {
      key: "all-backlinks",
      label: "All Backlinks",
      children: (
        <div className={styles.backlinksTab}>
          <div className={styles.filtersSection}>
            <Row gutter={16}>
              <Col xs={24} sm={12} md={8}>
                <Search
                  placeholder="Search domains or anchor text..."
                  value={filters.searchTerm}
                  onChange={(e) => handleSearch(e.target.value)}
                  style={{ width: "100%" }}
                />
              </Col>
              <Col xs={24} sm={12} md={6}>
                <Select
                  placeholder="Filter by type"
                  value={filters.linkType}
                  onChange={(value) => handleFilterChange("linkType", value)}
                  style={{ width: "100%" }}
                >
                  <Option value="all">All Links</Option>
                  <Option value="follow">Follow Only</Option>
                  <Option value="nofollow">NoFollow Only</Option>
                  <Option value="sponsored">Sponsored Only</Option>
                  <Option value="ugc">UGC Only</Option>
                </Select>
              </Col>
              <Col xs={24} sm={24} md={10}>
                <Space>
                  <Button type="primary" icon={<ExportOutlined />}>
                    Export
                  </Button>
                  <Button
                    danger
                    icon={<WarningOutlined />}
                    onClick={() => setShowDisavowModal(true)}
                    disabled={selectedBacklinks.length === 0}
                  >
                    Disavow Selected
                  </Button>
                </Space>
              </Col>
            </Row>
          </div>

          <Table
            columns={backlinkColumns}
            dataSource={allBacklinksForTable}
            rowKey="id"
            loading={anyLoading}
            rowSelection={{
              selectedRowKeys: selectedBacklinks,
              onChange: (keys) => setSelectedBacklinks(keys as string[]),
            }}
            pagination={{
              pageSize: 50,
              showSizeChanger: true,
              showQuickJumper: true,
              showTotal: (total) => `Total ${total} backlinks`,
            }}
            scroll={{ x: 1200 }}
          />
        </div>
      ),
    },
    {
      key: "new-backlinks",
      label: "New Backlinks",
      children: (
        <div className={styles.newBacklinksTab}>
          <Alert
            message="New Backlinks Detected"
            description={`${
              newBacklinks?.length || 0
            } new backlinks have been discovered in the last 30 days.`}
            type="success"
            showIcon
            style={{ marginBottom: 16 }}
          />
          <Table
            columns={backlinkColumns}
            dataSource={newBacklinks}
            rowKey="id"
            loading={anyLoading}
            pagination={false}
          />
        </div>
      ),
    },
    {
      key: "toxic-links",
      label: "Toxic Links",
      children: (
        <div className={styles.toxicLinksTab}>
          <Alert
            message="Toxic Links Detected"
            description="These links may harm your website's SEO performance. Consider disavowing them."
            type="warning"
            showIcon
            style={{ marginBottom: 16 }}
          />
          <Table
            columns={backlinkColumns}
            dataSource={toxicLinks}
            rowKey="id"
            loading={anyLoading}
            pagination={false}
          />
        </div>
      ),
    },
  ];

  if (!selectedProject) {
    return (
      <div className={styles.noProject}>
        <Card>
          <div style={{ textAlign: "center", padding: "40px" }}>
            <h3>No Project Selected</h3>
            <p>Please select a project to view backlink analytics.</p>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className={styles.backlinkAnalyticsManager}>
      <div className={styles.header}>
        <div className={styles.headerContent}>
          <h1>Backlink Analytics</h1>
          <p>Monitor and analyze your website's backlink profile</p>
        </div>
      </div>

      <Tabs
        activeKey={activeTab}
        onChange={setActiveTab}
        items={tabItems}
        size="large"
        className={styles.mainTabs}
      />

      <Modal
        title="Disavow Selected Backlinks"
        open={showDisavowModal}
        onOk={handleDisavowSelected}
        onCancel={() => setShowDisavowModal(false)}
        okText="Disavow"
        okButtonProps={{ danger: true }}
      >
        <p>
          Are you sure you want to disavow {selectedBacklinks.length} selected
          backlinks? This action cannot be undone.
        </p>
        <Alert
          message="Warning"
          description="Disavowing backlinks tells search engines to ignore these links when evaluating your site. Only disavow links you believe are harmful to your SEO."
          type="warning"
          showIcon
        />
      </Modal>
    </div>
  );
};

export default BacklinkAnalyticsManager;
