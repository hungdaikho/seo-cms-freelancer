import React, { useEffect } from "react";
import {
  Card,
  Button,
  Space,
  Row,
  Col,
  Statistic,
  Table,
  Tag,
  Tooltip,
} from "antd";
import {
  ArrowUpOutlined,
  ArrowDownOutlined,
  MinusOutlined,
} from "@ant-design/icons";
import {
  usePositionTracking,
  useKeywordRanking,
} from "@/stores/hooks/usePositionTracking";

const PositionTrackingDemo: React.FC = () => {
  const {
    projectOverview,
    loading,
    error,
    visibilityPercentage,
    rankingDistribution,
    topKeywords,
    fetchProjectOverview,
    createRanking,
    clearError,
  } = usePositionTracking();

  const { rankingHistory, fetchHistory, addRanking } = useKeywordRanking();

  // Mock project ID for demo
  const demoProjectId = "demo-project-123";

  useEffect(() => {
    // Fetch demo data on component mount
    fetchProjectOverview(demoProjectId);
  }, []);

  const handleAddRanking = async () => {
    if (topKeywords.length > 0) {
      const keyword = topKeywords[0];
      await createRanking(keyword.id, {
        position: Math.floor(Math.random() * 20) + 1,
        url: keyword.targetUrl,
        metadata: {
          search_engine: "google",
          location: "Vietnam",
          device: "desktop",
        },
      });
    }
  };

  const handleFetchHistory = () => {
    if (topKeywords.length > 0) {
      fetchHistory(topKeywords[0].id, { days: 30 });
    }
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case "up":
        return <ArrowUpOutlined style={{ color: "#52c41a" }} />;
      case "down":
        return <ArrowDownOutlined style={{ color: "#ff4d4f" }} />;
      case "stable":
        return <MinusOutlined style={{ color: "#faad14" }} />;
      default:
        return <MinusOutlined style={{ color: "#8c8c8c" }} />;
    }
  };

  const columns = [
    {
      title: "Keyword",
      dataIndex: "keyword",
      key: "keyword",
      render: (text: string) => <strong>{text}</strong>,
    },
    {
      title: "Current Position",
      dataIndex: "currentRanking",
      key: "currentRanking",
      render: (position: number) => (
        <Tag
          color={
            position <= 3
              ? "green"
              : position <= 10
              ? "blue"
              : position <= 20
              ? "orange"
              : "red"
          }
        >
          {position}
        </Tag>
      ),
    },
    {
      title: "Trend",
      dataIndex: "trend",
      key: "trend",
      render: (trend: string) => (
        <Tooltip title={`Trend: ${trend}`}>{getTrendIcon(trend)}</Tooltip>
      ),
    },
    {
      title: "Search Volume",
      dataIndex: "searchVolume",
      key: "searchVolume",
      render: (volume: number) => volume.toLocaleString(),
    },
    {
      title: "Difficulty",
      dataIndex: "difficulty",
      key: "difficulty",
      render: (difficulty: number) => `${difficulty}%`,
    },
    {
      title: "Target URL",
      dataIndex: "targetUrl",
      key: "targetUrl",
      render: (url: string) => (
        <a href={url} target="_blank" rel="noopener noreferrer">
          {url.length > 40 ? `${url.substring(0, 40)}...` : url}
        </a>
      ),
    },
  ];

  if (error) {
    return (
      <Card>
        <div style={{ textAlign: "center", padding: "20px" }}>
          <h3>Error: {error}</h3>
          <Button type="primary" onClick={clearError}>
            Try Again
          </Button>
        </div>
      </Card>
    );
  }

  return (
    <div style={{ padding: "24px" }}>
      <h1>Position Tracking Demo</h1>

      <Row gutter={[16, 16]}>
        {/* Overview Statistics */}
        <Col span={24}>
          <Card title="Overview Statistics" loading={loading}>
            <Row gutter={16}>
              <Col span={6}>
                <Statistic
                  title="Total Keywords"
                  value={projectOverview?.summary.totalKeywords || 0}
                />
              </Col>
              <Col span={6}>
                <Statistic
                  title="Ranked Keywords"
                  value={projectOverview?.summary.rankedKeywords || 0}
                />
              </Col>
              <Col span={6}>
                <Statistic
                  title="Average Position"
                  value={projectOverview?.summary.avgPosition || 0}
                  precision={1}
                />
              </Col>
              <Col span={6}>
                <Statistic
                  title="Visibility"
                  value={visibilityPercentage}
                  suffix="%"
                />
              </Col>
            </Row>
          </Card>
        </Col>

        {/* Ranking Distribution */}
        <Col span={24}>
          <Card title="Ranking Distribution" loading={loading}>
            <Row gutter={16}>
              <Col span={6}>
                <Statistic
                  title="Top 3"
                  value={rankingDistribution.top3.count}
                  suffix={`(${rankingDistribution.top3.percentage.toFixed(
                    1
                  )}%)`}
                  valueStyle={{ color: "#52c41a" }}
                />
              </Col>
              <Col span={6}>
                <Statistic
                  title="Top 10"
                  value={rankingDistribution.top10.count}
                  suffix={`(${rankingDistribution.top10.percentage.toFixed(
                    1
                  )}%)`}
                  valueStyle={{ color: "#1890ff" }}
                />
              </Col>
              <Col span={6}>
                <Statistic
                  title="Top 20"
                  value={rankingDistribution.top20.count}
                  suffix={`(${rankingDistribution.top20.percentage.toFixed(
                    1
                  )}%)`}
                  valueStyle={{ color: "#faad14" }}
                />
              </Col>
              <Col span={6}>
                <Statistic
                  title="Top 100"
                  value={rankingDistribution.top100.count}
                  suffix={`(${rankingDistribution.top100.percentage.toFixed(
                    1
                  )}%)`}
                  valueStyle={{ color: "#722ed1" }}
                />
              </Col>
            </Row>
          </Card>
        </Col>

        {/* Action Buttons */}
        <Col span={24}>
          <Card title="Demo Actions">
            <Space>
              <Button
                type="primary"
                onClick={handleAddRanking}
                loading={loading}
                disabled={!topKeywords.length}
              >
                Add Random Ranking
              </Button>
              <Button
                onClick={handleFetchHistory}
                loading={loading}
                disabled={!topKeywords.length}
              >
                Fetch Keyword History
              </Button>
              <Button onClick={() => fetchProjectOverview(demoProjectId)}>
                Refresh Data
              </Button>
            </Space>
          </Card>
        </Col>

        {/* Keywords Table */}
        <Col span={24}>
          <Card title="Keywords" loading={loading}>
            <Table
              dataSource={projectOverview?.keywords || []}
              columns={columns}
              rowKey="id"
              pagination={{ pageSize: 10 }}
              scroll={{ x: 800 }}
            />
          </Card>
        </Col>

        {/* Ranking History */}
        {rankingHistory && (
          <Col span={24}>
            <Card title={`Ranking History: ${rankingHistory.keyword.keyword}`}>
              <Row gutter={16}>
                <Col span={6}>
                  <Statistic
                    title="Current Position"
                    value={rankingHistory.keyword.currentRanking}
                  />
                </Col>
                <Col span={6}>
                  <Statistic
                    title="Best Position"
                    value={rankingHistory.summary.bestPosition}
                    valueStyle={{ color: "#52c41a" }}
                  />
                </Col>
                <Col span={6}>
                  <Statistic
                    title="Worst Position"
                    value={rankingHistory.summary.worstPosition}
                    valueStyle={{ color: "#ff4d4f" }}
                  />
                </Col>
                <Col span={6}>
                  <Statistic
                    title="Average Position"
                    value={rankingHistory.summary.averagePosition}
                    precision={1}
                  />
                </Col>
              </Row>

              <div style={{ marginTop: "16px" }}>
                <h4>Recent Rankings:</h4>
                {rankingHistory.rankings.slice(0, 5).map((ranking, index) => (
                  <div key={ranking.id} style={{ marginBottom: "8px" }}>
                    <strong>Position {ranking.position}</strong> on{" "}
                    {new Date(ranking.date).toLocaleDateString()}
                    {ranking.url && (
                      <>
                        {" "}
                        for{" "}
                        <a
                          href={ranking.url}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {ranking.url}
                        </a>
                      </>
                    )}
                  </div>
                ))}
              </div>
            </Card>
          </Col>
        )}
      </Row>
    </div>
  );
};

export default PositionTrackingDemo;
