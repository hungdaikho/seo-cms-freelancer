"use client";

import React from "react";
import { Card, Button, Typography, Space, Alert } from "antd";
import {
  SearchOutlined,
  ExperimentOutlined,
  DatabaseOutlined,
} from "@ant-design/icons";
import useKeywordResearch from "@/hooks/useKeywordResearch";

const { Title, Paragraph, Text } = Typography;

const KeywordResearchTestPage: React.FC = () => {
  const {
    // State
    loading,
    error,
    keywordAnalysisData,
    keywordMagicSummary,
    contentIdeasData,
    keywordStatsSummary,

    // Actions
    getPublicKeywordSuggestions,
    checkAIConnection,
    performCompleteKeywordResearch,

    // Helpers
    clearErrorState,
  } = useKeywordResearch();

  const handleTestPublicAPI = async () => {
    try {
      await getPublicKeywordSuggestions({
        seedKeyword: "SEO tools",
        industry: "Technology",
        location: "US",
      });
    } catch (error) {
      console.error("Public API test failed:", error);
    }
  };

  const handleTestAI = async () => {
    try {
      await checkAIConnection();
    } catch (error) {
      console.error("AI test failed:", error);
    }
  };

  const handleTestComplete = async () => {
    try {
      await performCompleteKeywordResearch(
        "digital marketing",
        undefined,
        "US"
      );
    } catch (error) {
      console.error("Complete test failed:", error);
    }
  };

  return (
    <div style={{ padding: 24, maxWidth: 1200, margin: "0 auto" }}>
      <Title level={2}>🧪 Keyword Research System Test</Title>

      {error && (
        <Alert
          message="Error occurred"
          description={error}
          type="error"
          closable
          onClose={clearErrorState}
          style={{ marginBottom: 24 }}
        />
      )}

      <Space direction="vertical" size="large" style={{ width: "100%" }}>
        {/* Test Controls */}
        <Card
          title="🔧 Test Controls"
          extra={<Text type="secondary">Test different features</Text>}
        >
          <Space wrap>
            <Button
              type="primary"
              icon={<SearchOutlined />}
              onClick={handleTestPublicAPI}
              loading={loading.keywordAnalysis}
            >
              Test Public API
            </Button>

            <Button
              icon={<ExperimentOutlined />}
              onClick={handleTestAI}
              loading={loading.keywordMagic}
            >
              Test AI Connection
            </Button>

            <Button
              type="dashed"
              icon={<DatabaseOutlined />}
              onClick={handleTestComplete}
              loading={loading.keywordAnalysis || loading.keywordMagic}
            >
              Complete Test
            </Button>
          </Space>
        </Card>

        {/* System Status */}
        <Card title="📊 System Status">
          <Space direction="vertical" style={{ width: "100%" }}>
            <div>
              <Text strong>Loading States: </Text>
              <Text>
                {Object.entries(loading).filter(([_, isLoading]) => isLoading)
                  .length === 0
                  ? "✅ No active operations"
                  : `⏳ Active: ${Object.entries(loading)
                      .filter(([_, isLoading]) => isLoading)
                      .map(([key]) => key)
                      .join(", ")}`}
              </Text>
            </div>

            <div>
              <Text strong>Error Status: </Text>
              <Text type={error ? "danger" : "success"}>
                {error ? `❌ ${error}` : "✅ No errors"}
              </Text>
            </div>
          </Space>
        </Card>

        {/* Data Preview */}
        {keywordStatsSummary && (
          <Card
            title="📈 Data Summary"
            extra={<Text type="secondary">Latest results</Text>}
          >
            <Space direction="vertical" style={{ width: "100%" }}>
              <div>
                <Text strong>Total Keywords: </Text>
                <Text>{keywordStatsSummary.totalKeywords}</Text>
              </div>

              <div>
                <Text strong>Average Search Volume: </Text>
                <Text>
                  {keywordStatsSummary.avgSearchVolume?.toLocaleString()}
                </Text>
              </div>

              <div>
                <Text strong>Average Difficulty: </Text>
                <Text>{keywordStatsSummary.avgDifficulty}%</Text>
              </div>

              <div>
                <Text strong>High Volume Keywords: </Text>
                <Text>{keywordStatsSummary.highVolumeKeywords}</Text>
              </div>
            </Space>
          </Card>
        )}

        {/* Sample Data */}
        {keywordAnalysisData.length > 0 && (
          <Card
            title="🔍 Sample Keywords"
            extra={<Text type="secondary">First 5 results</Text>}
          >
            <Space direction="vertical" style={{ width: "100%" }}>
              {keywordAnalysisData.slice(0, 5).map((keyword, index) => (
                <Card
                  key={index}
                  size="small"
                  style={{ backgroundColor: "#fafafa" }}
                >
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <div>
                      <Text strong>{keyword.keyword}</Text>
                      <br />
                      <Text type="secondary">
                        Volume: {keyword.searchVolume?.toLocaleString()}
                      </Text>
                    </div>
                    <div style={{ textAlign: "right" }}>
                      <Text>Difficulty: {keyword.difficulty}%</Text>
                      <br />
                      <Text type="secondary">Intent: {keyword.intent}</Text>
                    </div>
                  </div>
                </Card>
              ))}
            </Space>
          </Card>
        )}

        {/* Magic Tool Summary */}
        {keywordMagicSummary && (
          <Card
            title="✨ Keyword Magic Summary"
            extra={<Text type="secondary">AI Analysis</Text>}
          >
            <Space direction="vertical" style={{ width: "100%" }}>
              <div>
                <Text strong>Average Search Volume: </Text>
                <Text>
                  {keywordMagicSummary.avgSearchVolume?.toLocaleString()}
                </Text>
              </div>

              <div>
                <Text strong>Average Difficulty: </Text>
                <Text>{keywordMagicSummary.avgDifficulty}%</Text>
              </div>

              <div>
                <Text strong>Total Estimated Traffic: </Text>
                <Text>
                  {keywordMagicSummary.totalEstimatedTraffic?.toLocaleString()}
                </Text>
              </div>

              <div>
                <Text strong>Top Intent: </Text>
                <Text>{keywordMagicSummary.topIntent}</Text>
              </div>

              <div>
                <Text strong>Competition Level: </Text>
                <Text>{keywordMagicSummary.competitionLevel}</Text>
              </div>
            </Space>
          </Card>
        )}

        {/* Content Ideas Preview */}
        {contentIdeasData.length > 0 && (
          <Card
            title="💡 Content Ideas"
            extra={<Text type="secondary">Top suggestions</Text>}
          >
            <Space direction="vertical" style={{ width: "100%" }}>
              {contentIdeasData.slice(0, 3).map((idea, index) => (
                <Card
                  key={index}
                  size="small"
                  style={{ backgroundColor: "#f6ffed" }}
                >
                  <div>
                    <Text strong>{idea.title}</Text>
                    <br />
                    <Space>
                      <Text type="secondary">
                        Volume: {idea.volume?.toLocaleString()}
                      </Text>
                      <Text type="secondary">
                        Difficulty: {idea.difficulty}%
                      </Text>
                      <Text type="secondary">
                        Opportunity: {idea.opportunity}%
                      </Text>
                      <Text type="secondary">Type: {idea.contentType}</Text>
                    </Space>
                  </div>
                </Card>
              ))}
            </Space>
          </Card>
        )}

        {/* Instructions */}
        <Card title="📝 Instructions" type="inner">
          <Paragraph>
            <Text strong>How to test the Keyword Research System:</Text>
          </Paragraph>

          <ol>
            <li>
              <Text strong>Test Public API:</Text> Tests the public keyword
              suggestions endpoint (no auth required)
            </li>
            <li>
              <Text strong>Test AI Connection:</Text> Verifies the AI service is
              working
            </li>
            <li>
              <Text strong>Complete Test:</Text> Runs a full keyword research
              for "digital marketing"
            </li>
          </ol>

          <Paragraph>
            <Text type="secondary">
              The system will show loading states, error handling, and display
              results when available. Check the browser console for detailed
              logs and API responses.
            </Text>
          </Paragraph>

          <Alert
            message="Development Note"
            description="This is a test page to verify the keyword research system is working. In production, you would integrate these features into your main keyword research page."
            type="info"
            showIcon
          />
        </Card>
      </Space>
    </div>
  );
};

export default KeywordResearchTestPage;
