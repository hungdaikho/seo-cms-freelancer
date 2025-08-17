import React from "react";
import { useBacklinkResearch } from "@/hooks/useBacklinkResearch";
import { Button, Space, Card, Typography } from "antd";

const { Title, Text } = Typography;

const BacklinkTestComponent = () => {
  const {
    // State
    domainOverview,
    domainAuthority,
    projectBacklinks,
    backlinkAnalytics,
    currentDomain,
    selectedProjectId,

    // Loading states
    isLoading,

    // Error states
    getError,

    // Actions
    initializeDomainAnalysis,
    initializeProjectAnalysis,
    updateCurrentDomain,
  } = useBacklinkResearch();

  const handleTestDomainAnalysis = async () => {
    try {
      await initializeDomainAnalysis("example.com", false);
    } catch (error) {
      console.error("Failed to analyze domain:", error);
    }
  };

  const handleTestProjectAnalysis = async () => {
    try {
      await initializeProjectAnalysis("test-project-123");
    } catch (error) {
      console.error("Failed to analyze project:", error);
    }
  };

  return (
    <div style={{ padding: "24px" }}>
      <Title level={2}>Backlink Research Test Component</Title>

      <Space direction="vertical" size="large" style={{ width: "100%" }}>
        {/* Control Panel */}
        <Card title="Test Controls">
          <Space>
            <Button
              type="primary"
              onClick={handleTestDomainAnalysis}
              loading={isLoading("domainOverview")}
            >
              Test Domain Analysis
            </Button>
            <Button
              type="primary"
              onClick={handleTestProjectAnalysis}
              loading={isLoading("projectBacklinks")}
            >
              Test Project Analysis
            </Button>
          </Space>
        </Card>

        {/* State Display */}
        <Card title="Current State">
          <Space direction="vertical">
            <Text>
              <strong>Current Domain:</strong> {currentDomain || "None"}
            </Text>
            <Text>
              <strong>Selected Project ID:</strong>{" "}
              {selectedProjectId || "None"}
            </Text>
            <Text>
              <strong>Any Loading:</strong> {isLoading() ? "Yes" : "No"}
            </Text>
            <Text>
              <strong>Any Error:</strong> {getError() || "None"}
            </Text>
          </Space>
        </Card>

        {/* Domain Overview */}
        {domainOverview && (
          <Card title="Domain Overview">
            <pre>{JSON.stringify(domainOverview, null, 2)}</pre>
          </Card>
        )}

        {/* Domain Authority */}
        {domainAuthority && (
          <Card title="Domain Authority">
            <pre>{JSON.stringify(domainAuthority, null, 2)}</pre>
          </Card>
        )}

        {/* Project Backlinks */}
        {projectBacklinks && (
          <Card title="Project Backlinks">
            <Text>Total: {projectBacklinks.pagination.total}</Text>
            <Text>Page: {projectBacklinks.pagination.page}</Text>
            <Text>Items: {projectBacklinks.data.length}</Text>
          </Card>
        )}

        {/* Backlink Analytics */}
        {backlinkAnalytics && (
          <Card title="Backlink Analytics">
            <Space direction="vertical">
              <Text>
                Total Backlinks: {backlinkAnalytics.summary.totalBacklinks}
              </Text>
              <Text>
                Total Domains: {backlinkAnalytics.summary.totalDomains}
              </Text>
              <Text>Active Links: {backlinkAnalytics.summary.activeLinks}</Text>
              <Text>Anchors Count: {backlinkAnalytics.anchors.length}</Text>
              <Text>Top Pages Count: {backlinkAnalytics.topPages.length}</Text>
            </Space>
          </Card>
        )}

        {/* Errors */}
        {getError() && (
          <Card title="Errors" style={{ borderColor: "#ff4d4f" }}>
            <Text type="danger">{getError()}</Text>
          </Card>
        )}
      </Space>
    </div>
  );
};

export default BacklinkTestComponent;
