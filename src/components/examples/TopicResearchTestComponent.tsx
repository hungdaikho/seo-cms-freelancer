import React from "react";
import { Button, Card, Typography } from "antd";
import { useTopicResearch } from "@/stores/hooks/useTopicResearch";

const { Title, Text } = Typography;

export const TopicResearchTestComponent: React.FC = () => {
  const {
    topicIdeas,
    relatedTopics,
    questions,
    isLoading,
    summaryStats,
    researchTopic,
    getAPIStatus,
    apiStatus,
  } = useTopicResearch();

  const handleTestResearch = async () => {
    try {
      await researchTopic("digital marketing", "US", "technology", "blog");
    } catch (error) {
      console.error("Test research failed:", error);
    }
  };

  const handleTestAPIStatus = async () => {
    try {
      await getAPIStatus();
    } catch (error) {
      console.error("API status test failed:", error);
    }
  };

  return (
    <Card title="Topic Research Hook Test">
      <div style={{ marginBottom: 16 }}>
        <Title level={4}>Current State:</Title>
        <Text>Topic Ideas: {summaryStats.totalTopicIdeas}</Text>
        <br />
        <Text>Related Topics: {summaryStats.totalRelatedTopics}</Text>
        <br />
        <Text>Questions: {summaryStats.totalQuestions}</Text>
        <br />
        <Text>Loading: {isLoading ? "Yes" : "No"}</Text>
        <br />
        <Text>API Status: {apiStatus ? "Loaded" : "Not loaded"}</Text>
      </div>

      <div style={{ gap: 8, display: "flex" }}>
        <Button type="primary" onClick={handleTestResearch} loading={isLoading}>
          Test Research Topic
        </Button>
        <Button onClick={handleTestAPIStatus} loading={isLoading}>
          Test API Status
        </Button>
      </div>

      {topicIdeas.length > 0 && (
        <div style={{ marginTop: 16 }}>
          <Title level={5}>Sample Topic Ideas:</Title>
          {topicIdeas.slice(0, 3).map((topic, index) => (
            <div key={index}>
              <Text strong>{topic.topic}</Text> - Volume: {topic.volume},
              Difficulty: {topic.difficulty}%
            </div>
          ))}
        </div>
      )}
    </Card>
  );
};
