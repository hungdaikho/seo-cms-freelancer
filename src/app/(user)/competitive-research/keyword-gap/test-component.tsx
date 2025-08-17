"use client";
import React from "react";
import { Button, Card, Space, Typography, message } from "antd";
import { useAppDispatch } from "@/stores/hooks";
import {
  compareKeywordGaps,
  getKeywordOverlap,
  setFilters,
} from "@/stores/slices/competitive.slice";

const { Title, Text } = Typography;

const KeywordGapTester = () => {
  const dispatch = useAppDispatch();

  const handleTestAPI = async () => {
    try {
      message.info("Testing keyword gap analysis...");

      // Set up test filters
      dispatch(
        setFilters({
          country: "US",
          device: "desktop",
          database: "all",
          competitors: ["competitor1.com", "competitor2.com"],
        })
      );

      // Test keyword gap analysis
      const gapResult = await dispatch(
        compareKeywordGaps({
          targetDomain: "example.com",
          competitors: ["competitor1.com", "competitor2.com"],
          country: "US",
          device: "desktop",
          filters: {
            minSearchVolume: 10,
            maxDifficulty: 100,
            keywordType: "organic",
          },
        })
      ).unwrap();

      console.log("Keyword Gap Result:", gapResult);

      // Test keyword overlap
      const overlapResult = await dispatch(
        getKeywordOverlap({
          domains: ["example.com", "competitor1.com", "competitor2.com"],
          country: "US",
        })
      ).unwrap();

      console.log("Keyword Overlap Result:", overlapResult);

      message.success("API test completed! Check console for results.");
    } catch (error: any) {
      console.error("API Test Error:", error);
      message.error(`API test failed: ${error.message}`);
    }
  };

  return (
    <Card title="Keyword Gap API Tester" style={{ margin: "24px" }}>
      <Space direction="vertical" style={{ width: "100%" }}>
        <Text>
          This component tests the keyword gap analysis API integration. Click
          the button below to run a test with sample data.
        </Text>

        <Button type="primary" onClick={handleTestAPI}>
          Test Keyword Gap Analysis API
        </Button>

        <div style={{ marginTop: "16px" }}>
          <Title level={4}>Test Parameters:</Title>
          <ul>
            <li>Target Domain: example.com</li>
            <li>Competitors: competitor1.com, competitor2.com</li>
            <li>Country: US</li>
            <li>Device: Desktop</li>
            <li>Database: All</li>
          </ul>
        </div>

        <div
          style={{
            marginTop: "16px",
            padding: "12px",
            backgroundColor: "#f6f8fa",
            borderRadius: "6px",
          }}
        >
          <Text type="secondary">
            <strong>Note:</strong> Check the browser console for detailed API
            responses. Open Developer Tools → Console to see the test results.
          </Text>
        </div>
      </Space>
    </Card>
  );
};

export default KeywordGapTester;
