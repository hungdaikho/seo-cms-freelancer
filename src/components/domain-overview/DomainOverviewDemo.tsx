import React, { useState } from "react";
import { Button, Card, Space, Typography, Input, Alert } from "antd";
import { useDomainOverview } from "@/stores/hooks/useDomainOverview";

const { Title, Text } = Typography;

export const DomainOverviewDemo: React.FC = () => {
  const [testDomain, setTestDomain] = useState("example.com");
  const {
    overview,
    topKeywords,
    competitors,
    topics,
    authority,
    isLoading,
    hasError,
    errors,
    analyzeDomain,
  } = useDomainOverview();

  const handleTest = async () => {
    try {
      await analyzeDomain(testDomain, {
        country: "US",
        includeSubdomains: false,
        keywordsLimit: 10,
        competitorsLimit: 5,
        topicsLimit: 5,
        includeAuthority: true,
      });
    } catch (error) {
      console.error("Test failed:", error);
    }
  };

  return (
    <Card title="Domain Overview API Test">
      <Space direction="vertical" style={{ width: "100%" }}>
        <div>
          <Text>Test Domain:</Text>
          <Space>
            <Input
              value={testDomain}
              onChange={(e) => setTestDomain(e.target.value)}
              placeholder="Enter domain to test"
              style={{ width: 200 }}
            />
            <Button type="primary" onClick={handleTest} loading={isLoading}>
              Test API
            </Button>
          </Space>
        </div>

        {hasError && (
          <Alert
            message="API Errors"
            description={
              <ul>
                {errors.map((error, index) => (
                  <li key={index}>{error}</li>
                ))}
              </ul>
            }
            type="error"
            showIcon
          />
        )}

        {overview && (
          <Card size="small" title="Domain Overview" type="inner">
            <pre>{JSON.stringify(overview, null, 2)}</pre>
          </Card>
        )}

        {topKeywords && (
          <Card size="small" title="Top Keywords" type="inner">
            <pre>{JSON.stringify(topKeywords, null, 2)}</pre>
          </Card>
        )}

        {competitors && (
          <Card size="small" title="Competitors" type="inner">
            <pre>{JSON.stringify(competitors, null, 2)}</pre>
          </Card>
        )}

        {topics && (
          <Card size="small" title="Topics" type="inner">
            <pre>{JSON.stringify(topics, null, 2)}</pre>
          </Card>
        )}

        {authority && (
          <Card size="small" title="Domain Authority" type="inner">
            <pre>{JSON.stringify(authority, null, 2)}</pre>
          </Card>
        )}
      </Space>
    </Card>
  );
};
