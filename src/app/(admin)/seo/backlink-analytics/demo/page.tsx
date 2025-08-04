"use client";

import React, { useEffect, useState } from "react";
import {
  Card,
  Button,
  Space,
  Spin,
  Alert,
  Typography,
  Divider,
  Tag,
  Table,
  message,
} from "antd";
import {
  LinkOutlined,
  ExperimentOutlined,
  ReloadOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined,
} from "@ant-design/icons";
import { useBacklink } from "@/stores/hooks";
import { useSelector } from "react-redux";
import { RootState } from "@/stores/store";

const { Title, Text, Paragraph } = Typography;

const BacklinkAPIDemo: React.FC = () => {
  const selectedProject = useSelector(
    (state: RootState) => state.project.currentProject
  );

  const {
    backlinkProfile,
    analytics,
    backlinks,
    anyLoading,
    error,
    fetchBacklinks,
    fetchAnalytics,
    fetchProfile,
    createBacklink,
    removeBacklink,
  } = useBacklink();

  const [testResults, setTestResults] = useState<{
    fetchProfile: boolean | null;
    fetchAnalytics: boolean | null;
    fetchBacklinks: boolean | null;
    createBacklink: boolean | null;
    deleteBacklink: boolean | null;
  }>({
    fetchProfile: null,
    fetchAnalytics: null,
    fetchBacklinks: null,
    createBacklink: null,
    deleteBacklink: null,
  });

  const [testBacklinkId, setTestBacklinkId] = useState<string | null>(null);

  // Test functions
  const testFetchProfile = async () => {
    if (!selectedProject?.id) {
      message.error("No project selected");
      return;
    }

    try {
      await fetchProfile(selectedProject.id);
      setTestResults((prev) => ({ ...prev, fetchProfile: true }));
      message.success("Profile fetch test successful");
    } catch (error) {
      setTestResults((prev) => ({ ...prev, fetchProfile: false }));
      message.error("Profile fetch test failed");
    }
  };

  const testFetchAnalytics = async () => {
    if (!selectedProject?.id) {
      message.error("No project selected");
      return;
    }

    try {
      await fetchAnalytics(selectedProject.id);
      setTestResults((prev) => ({ ...prev, fetchAnalytics: true }));
      message.success("Analytics fetch test successful");
    } catch (error) {
      setTestResults((prev) => ({ ...prev, fetchAnalytics: false }));
      message.error("Analytics fetch test failed");
    }
  };

  const testFetchBacklinks = async () => {
    if (!selectedProject?.id) {
      message.error("No project selected");
      return;
    }

    try {
      await fetchBacklinks(selectedProject.id, { page: 1, limit: 10 });
      setTestResults((prev) => ({ ...prev, fetchBacklinks: true }));
      message.success("Backlinks fetch test successful");
    } catch (error) {
      setTestResults((prev) => ({ ...prev, fetchBacklinks: false }));
      message.error("Backlinks fetch test failed");
    }
  };

  const testCreateBacklink = async () => {
    if (!selectedProject?.id) {
      message.error("No project selected");
      return;
    }

    try {
      const result = await createBacklink(selectedProject.id, {
        sourceDomain: "test-domain.com",
        targetUrl: "https://example.com/test-page",
        anchorText: "test anchor text",
        linkType: "follow",
        authorityScore: 50,
      });

      // Type assertion for the result
      const createdBacklink = result.payload as any;
      setTestBacklinkId(createdBacklink.id);
      setTestResults((prev) => ({ ...prev, createBacklink: true }));
      message.success("Create backlink test successful");
    } catch (error) {
      setTestResults((prev) => ({ ...prev, createBacklink: false }));
      message.error("Create backlink test failed");
    }
  };

  const testDeleteBacklink = async () => {
    if (!selectedProject?.id || !testBacklinkId) {
      message.error("No project selected or no test backlink to delete");
      return;
    }

    try {
      await removeBacklink(selectedProject.id, testBacklinkId);
      setTestResults((prev) => ({ ...prev, deleteBacklink: true }));
      setTestBacklinkId(null);
      message.success("Delete backlink test successful");
    } catch (error) {
      setTestResults((prev) => ({ ...prev, deleteBacklink: false }));
      message.error("Delete backlink test failed");
    }
  };

  const runAllTests = async () => {
    setTestResults({
      fetchProfile: null,
      fetchAnalytics: null,
      fetchBacklinks: null,
      createBacklink: null,
      deleteBacklink: null,
    });

    // Run tests sequentially
    await testFetchProfile();
    await testFetchAnalytics();
    await testFetchBacklinks();
    await testCreateBacklink();

    // Wait a bit then test delete
    setTimeout(async () => {
      await testDeleteBacklink();
    }, 1000);
  };

  const getStatusIcon = (status: boolean | null) => {
    if (status === null) return <Tag>Not tested</Tag>;
    if (status === true)
      return <CheckCircleOutlined style={{ color: "#52c41a" }} />;
    if (status === false)
      return <CloseCircleOutlined style={{ color: "#ff4d4f" }} />;
  };

  const getStatusTag = (status: boolean | null) => {
    if (status === null) return <Tag>Pending</Tag>;
    if (status === true) return <Tag color="success">Passed</Tag>;
    if (status === false) return <Tag color="error">Failed</Tag>;
  };

  const testData = [
    {
      key: "fetchProfile",
      test: "Fetch Backlink Profile",
      description: "Test fetching comprehensive backlink profile data",
      status: testResults.fetchProfile,
      action: testFetchProfile,
    },
    {
      key: "fetchAnalytics",
      test: "Fetch Backlink Analytics",
      description: "Test fetching backlink analytics and summary data",
      status: testResults.fetchAnalytics,
      action: testFetchAnalytics,
    },
    {
      key: "fetchBacklinks",
      test: "Fetch Backlinks List",
      description: "Test fetching paginated backlinks list",
      status: testResults.fetchBacklinks,
      action: testFetchBacklinks,
    },
    {
      key: "createBacklink",
      test: "Create Backlink",
      description: "Test creating a new backlink record",
      status: testResults.createBacklink,
      action: testCreateBacklink,
    },
    {
      key: "deleteBacklink",
      test: "Delete Backlink",
      description: "Test deleting a backlink record",
      status: testResults.deleteBacklink,
      action: testDeleteBacklink,
      disabled: !testBacklinkId,
    },
  ];

  const columns = [
    {
      title: "Test",
      dataIndex: "test",
      key: "test",
      render: (text: string) => <Text strong>{text}</Text>,
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status: boolean | null) => getStatusTag(status),
    },
    {
      title: "Action",
      key: "action",
      render: (record: any) => (
        <Button
          onClick={record.action}
          disabled={record.disabled || anyLoading}
          size="small"
        >
          {anyLoading ? <Spin size="small" /> : "Test"}
        </Button>
      ),
    },
  ];

  if (!selectedProject) {
    return (
      <Card>
        <Alert
          message="No Project Selected"
          description="Please select a project to test the Backlink Analytics API."
          type="warning"
          showIcon
        />
      </Card>
    );
  }

  return (
    <div style={{ maxWidth: 1200, margin: "0 auto", padding: "24px" }}>
      <Card>
        <Title level={2}>
          <ExperimentOutlined style={{ marginRight: 8 }} />
          Backlink Analytics API Testing
        </Title>

        <Paragraph>
          This demo page tests the integration between the frontend Backlink
          Analytics Manager and the backend API endpoints. Use the controls
          below to test various API functionalities.
        </Paragraph>

        <Space style={{ marginBottom: 24 }}>
          <Button
            type="primary"
            icon={<ExperimentOutlined />}
            onClick={runAllTests}
            loading={anyLoading}
            size="large"
          >
            Run All Tests
          </Button>
          <Button
            icon={<ReloadOutlined />}
            onClick={() =>
              setTestResults({
                fetchProfile: null,
                fetchAnalytics: null,
                fetchBacklinks: null,
                createBacklink: null,
                deleteBacklink: null,
              })
            }
          >
            Reset Tests
          </Button>
        </Space>

        {error && (
          <Alert
            message="API Error"
            description={error}
            type="error"
            showIcon
            style={{ marginBottom: 16 }}
          />
        )}

        <Divider />

        <Title level={3}>Test Results</Title>

        <Table
          dataSource={testData}
          columns={columns}
          pagination={false}
          size="middle"
          style={{ marginBottom: 24 }}
        />

        <Divider />

        <Title level={3}>Current Data Summary</Title>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: 16,
          }}
        >
          <Card size="small" title="Backlink Profile">
            {backlinkProfile ? (
              <Space direction="vertical" size="small">
                <Text>
                  Total Backlinks:{" "}
                  <Text strong>{backlinkProfile.totalBacklinks}</Text>
                </Text>
                <Text>
                  Referring Domains:{" "}
                  <Text strong>{backlinkProfile.referringDomains}</Text>
                </Text>
                <Text>
                  Domain Authority:{" "}
                  <Text strong>{backlinkProfile.domainAuthority}</Text>
                </Text>
                <Text>
                  Follow Links:{" "}
                  <Text strong>{backlinkProfile.linkTypes.follow}</Text>
                </Text>
                <Text>
                  NoFollow Links:{" "}
                  <Text strong>{backlinkProfile.linkTypes.nofollow}</Text>
                </Text>
              </Space>
            ) : (
              <Text type="secondary">No profile data loaded</Text>
            )}
          </Card>

          <Card size="small" title="Analytics Summary">
            {analytics ? (
              <Space direction="vertical" size="small">
                <Text>
                  Total Backlinks:{" "}
                  <Text strong>{analytics.summary.totalBacklinks}</Text>
                </Text>
                <Text>
                  Total Domains:{" "}
                  <Text strong>{analytics.summary.totalDomains}</Text>
                </Text>
                <Text>
                  Active Links:{" "}
                  <Text strong>{analytics.summary.activeLinks}</Text>
                </Text>
                <Text>
                  New Backlinks:{" "}
                  <Text strong>{analytics.summary.newBacklinksCount}</Text>
                </Text>
                <Text>
                  Avg Authority:{" "}
                  <Text strong>{analytics.summary.averageAuthorityScore}</Text>
                </Text>
              </Space>
            ) : (
              <Text type="secondary">No analytics data loaded</Text>
            )}
          </Card>

          <Card size="small" title="Backlinks List">
            {backlinks && backlinks.length > 0 ? (
              <Space direction="vertical" size="small">
                <Text>
                  Loaded Backlinks: <Text strong>{backlinks.length}</Text>
                </Text>
                <Text>
                  First Domain: <Text strong>{backlinks[0].sourceDomain}</Text>
                </Text>
                <Text>
                  Authority Range:{" "}
                  <Text strong>
                    {Math.min(...backlinks.map((b) => b.authorityScore))} -{" "}
                    {Math.max(...backlinks.map((b) => b.authorityScore))}
                  </Text>
                </Text>
              </Space>
            ) : (
              <Text type="secondary">No backlinks data loaded</Text>
            )}
          </Card>
        </div>

        <Divider />

        <Alert
          message="Testing Information"
          description={
            <div>
              <p>
                <strong>What this tests:</strong>
              </p>
              <ul>
                <li>Redux store integration with backlink slice</li>
                <li>API service calls to backlink endpoints</li>
                <li>Error handling and loading states</li>
                <li>Data transformation and normalization</li>
                <li>CRUD operations (Create, Read, Update, Delete)</li>
              </ul>
              <p>
                <strong>Expected behavior:</strong>
              </p>
              <ul>
                <li>
                  All tests should pass if the API server is running and
                  accessible
                </li>
                <li>
                  Data should be properly loaded and displayed in the summary
                  cards
                </li>
                <li>Loading states should show during API calls</li>
                <li>
                  Errors should be handled gracefully with user-friendly
                  messages
                </li>
              </ul>
            </div>
          }
          type="info"
          showIcon
        />
      </Card>
    </div>
  );
};

export default BacklinkAPIDemo;
