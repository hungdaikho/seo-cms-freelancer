import React, { useState } from "react";
import {
  Card,
  Button,
  Space,
  Tag,
  Typography,
  Alert,
  Divider,
  Row,
  Col,
  Statistic,
  message,
} from "antd";
import {
  ApiOutlined,
  TrophyOutlined,
  QuestionCircleOutlined,
  RiseOutlined,
  BarChartOutlined,
} from "@ant-design/icons";
import { useTopicResearch } from "@/stores/hooks/useTopicResearch";

const { Title, Text, Paragraph } = Typography;

interface TopicResearchDemoProps {
  keyword?: string;
  country?: string;
}

export const TopicResearchDemo: React.FC<TopicResearchDemoProps> = ({
  keyword = "digital marketing",
  country = "US",
}) => {
  const {
    // Data
    keywordDemo,
    trendingTopics,
    apiStatus,
    opportunityAnalysis,

    // Loading states
    keywordDemoLoading,
    trendingTopicsLoading,
    apiStatusLoading,

    // Actions
    getKeywordDemo,
    getTrendingTopics,
    getAPIStatus,
    getContentOpportunities,
  } = useTopicResearch();

  const [demoKeyword, setDemoKeyword] = useState(keyword);

  const handleRunDemo = async () => {
    try {
      message.loading("Running comprehensive demo...", 2);

      // Run multiple API calls to showcase functionality
      await Promise.all([
        getKeywordDemo(demoKeyword, country),
        getTrendingTopics({ country, limit: 10 }),
        getAPIStatus(),
        getContentOpportunities(demoKeyword, country),
      ]);

      message.success("Demo completed successfully!");
    } catch (error) {
      message.error("Demo failed. Please check API configuration.");
    }
  };

  return (
    <div style={{ padding: 24 }}>
      <Card>
        <Title level={3}>
          <ApiOutlined /> Topic Research API Demo
        </Title>
        <Paragraph>
          This demo showcases the comprehensive Topic Research API capabilities
          including keyword analysis, trending topics, content opportunities,
          and real-time data insights.
        </Paragraph>

        <Space style={{ marginBottom: 24 }}>
          <Button
            type="primary"
            size="large"
            onClick={handleRunDemo}
            loading={
              keywordDemoLoading || trendingTopicsLoading || apiStatusLoading
            }
            icon={<RiseOutlined />}
          >
            Run Comprehensive Demo
          </Button>
          <Button onClick={() => getAPIStatus()} loading={apiStatusLoading}>
            Check API Status
          </Button>
        </Space>

        <Divider />

        {/* API Status */}
        {apiStatus && (
          <Alert
            message="API Integration Status"
            description={
              <div>
                <p>{apiStatus.message}</p>
                <Row gutter={16} style={{ marginTop: 16 }}>
                  <Col span={8}>
                    <Tag color={apiStatus.apis.googleSearch ? "green" : "red"}>
                      Google Search:{" "}
                      {apiStatus.apis.googleSearch ? "Active" : "Inactive"}
                    </Tag>
                  </Col>
                  <Col span={8}>
                    <Tag color={apiStatus.apis.youtube ? "green" : "red"}>
                      YouTube: {apiStatus.apis.youtube ? "Active" : "Inactive"}
                    </Tag>
                  </Col>
                  <Col span={8}>
                    <Tag color={apiStatus.apis.googleTrends ? "green" : "red"}>
                      Google Trends:{" "}
                      {apiStatus.apis.googleTrends ? "Active" : "Inactive"}
                    </Tag>
                  </Col>
                </Row>
              </div>
            }
            type={apiStatus.hasRealData ? "success" : "warning"}
            style={{ marginBottom: 24 }}
          />
        )}

        {/* Keyword Demo Results */}
        {keywordDemo && (
          <Card
            title={`Keyword Analysis: "${keywordDemo.keyword}"`}
            style={{ marginBottom: 24 }}
          >
            <Row gutter={[16, 16]}>
              <Col xs={24} sm={12} md={6}>
                <Statistic
                  title="Search Volume"
                  value={keywordDemo.overview.searchVolume}
                  suffix="/month"
                  prefix={<BarChartOutlined />}
                />
              </Col>
              <Col xs={24} sm={12} md={6}>
                <Statistic
                  title="Competition"
                  value={keywordDemo.overview.competition}
                  suffix="/100"
                />
              </Col>
              <Col xs={24} sm={12} md={6}>
                <Statistic
                  title="Interest Level"
                  value={keywordDemo.overview.interest}
                  suffix="/100"
                />
              </Col>
              <Col xs={24} sm={12} md={6}>
                <Statistic
                  title="Video Content"
                  value={keywordDemo.overview.videoCount}
                  suffix="videos"
                />
              </Col>
            </Row>

            <Divider />

            <Row gutter={[24, 24]}>
              <Col xs={24} md={12}>
                <Title level={5}>Related Keywords</Title>
                <Space wrap>
                  {keywordDemo.relatedKeywords
                    .slice(0, 10)
                    .map((keyword, index) => (
                      <Tag key={index} color="blue">
                        {keyword}
                      </Tag>
                    ))}
                </Space>
              </Col>
              <Col xs={24} md={12}>
                <Title level={5}>Rising Topics</Title>
                <Space wrap>
                  {keywordDemo.risingTopics.map((topic, index) => (
                    <Tag key={index} color="volcano">
                      <TrophyOutlined /> {topic}
                    </Tag>
                  ))}
                </Space>
              </Col>
            </Row>

            <Divider />

            <Title level={5}>Content Opportunities</Title>
            <Row gutter={[16, 16]}>
              <Col xs={24} md={8}>
                <Card size="small" title="Blog Posts">
                  <Space direction="vertical" size="small">
                    {keywordDemo.contentOpportunities.blogPosts.map(
                      (post, index) => (
                        <Tag key={index} color="green">
                          {post}
                        </Tag>
                      )
                    )}
                  </Space>
                </Card>
              </Col>
              <Col xs={24} md={8}>
                <Card size="small" title="Video Content">
                  <Space direction="vertical" size="small">
                    {keywordDemo.contentOpportunities.videos.map(
                      (video, index) => (
                        <Tag key={index} color="purple">
                          {video}
                        </Tag>
                      )
                    )}
                  </Space>
                </Card>
              </Col>
              <Col xs={24} md={8}>
                <Card size="small" title="Social Media">
                  <Space direction="vertical" size="small">
                    {keywordDemo.contentOpportunities.socialMedia.map(
                      (social, index) => (
                        <Tag key={index} color="orange">
                          {social}
                        </Tag>
                      )
                    )}
                  </Space>
                </Card>
              </Col>
            </Row>

            <Alert
              style={{ marginTop: 16 }}
              message="Data Source"
              description={`${keywordDemo.dataSource} • Generated at ${new Date(
                keywordDemo.generatedAt
              ).toLocaleString()}`}
              type="info"
            />
          </Card>
        )}

        {/* Trending Topics */}
        {trendingTopics.length > 0 && (
          <Card title="Trending Topics" style={{ marginBottom: 24 }}>
            <Row gutter={[16, 16]}>
              {trendingTopics.slice(0, 6).map((topic, index) => (
                <Col xs={24} sm={12} md={8} key={index}>
                  <Card size="small">
                    <Statistic
                      title={topic.topic}
                      value={topic.volume}
                      suffix="searches"
                      prefix={<RiseOutlined />}
                    />
                    <Tag color="red" style={{ marginTop: 8 }}>
                      +{topic.growth}% growth
                    </Tag>
                  </Card>
                </Col>
              ))}
            </Row>
          </Card>
        )}

        {/* Opportunity Analysis */}
        {opportunityAnalysis.highOpportunityLowDifficulty.length > 0 && (
          <Card title="High Opportunity Analysis">
            <Alert
              message="Content Opportunities Identified"
              description={`Found ${opportunityAnalysis.highOpportunityLowDifficulty.length} high-opportunity, low-difficulty topics perfect for content creation.`}
              type="success"
              style={{ marginBottom: 16 }}
            />

            <Space wrap>
              {opportunityAnalysis.highOpportunityLowDifficulty
                .slice(0, 10)
                .map((topic: any, index) => (
                  <Tag key={index} color="success">
                    <TrophyOutlined /> {topic.topic}
                  </Tag>
                ))}
            </Space>
          </Card>
        )}

        {/* API Benefits */}
        {apiStatus && (
          <Card title="API Integration Benefits" style={{ marginTop: 24 }}>
            <Row gutter={[16, 16]}>
              <Col xs={24} md={12}>
                <Title level={5}>Free Options Available</Title>
                <ul>
                  {apiStatus.recommendations.freeOptions.map(
                    (option, index) => (
                      <li key={index}>{option}</li>
                    )
                  )}
                </ul>
              </Col>
              <Col xs={24} md={12}>
                <Title level={5}>Benefits</Title>
                <ul>
                  {apiStatus.recommendations.benefits.map((benefit, index) => (
                    <li key={index}>{benefit}</li>
                  ))}
                </ul>
              </Col>
            </Row>
          </Card>
        )}
      </Card>
    </div>
  );
};
