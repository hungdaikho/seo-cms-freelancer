import React, { useEffect, useState } from "react";
import {
  Card,
  Row,
  Col,
  Button,
  Select,
  Progress,
  Tooltip,
  Spin,
  Alert,
} from "antd";
import {
  InfoCircleOutlined,
  ArrowUpOutlined,
  ArrowDownOutlined,
  MinusOutlined,
} from "@ant-design/icons";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { RootState } from "@/stores/store";
import { usePositionTracking } from "@/stores/hooks/usePositionTracking";
import styles from "./position-tracking.module.scss";

const { Option } = Select;

interface PositionTrackingProps {
  selectedProjectId?: string;
}

const PositionTracking: React.FC<PositionTrackingProps> = ({
  selectedProjectId,
}) => {
  const router = useRouter();
  const [period, setPeriod] = useState("7days");

  // Get projects from Redux store
  const { projects } = useSelector((state: RootState) => state.project);

  // Find the current project based on selectedProjectId
  const currentProject = selectedProjectId
    ? projects.find((p) => p.id === selectedProjectId)
    : useSelector((state: RootState) => state.project.currentProject);

  // Use our position tracking hook
  const {
    projectOverview,
    loading,
    error,
    visibilityPercentage,
    rankingDistribution,
    topKeywords,
    fetchProjectOverview,
    setFilters,
    clearError,
  } = usePositionTracking();

  // Fetch data when component mounts or project changes
  useEffect(() => {
    if (currentProject?.id) {
      fetchProjectOverview(currentProject.id);
    }
  }, [currentProject?.id]);

  // Handle period change
  const handlePeriodChange = (value: string) => {
    setPeriod(value);
    setFilters({ period: value });
  };

  // Get trend icon based on keyword trend
  const getTrendIcon = (trend: "up" | "down" | "stable" | "no-data") => {
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

  // Calculate new/lost keywords (mock data for now)
  const getKeywordChanges = (total: number) => {
    // In real implementation, this would come from trend analysis
    return {
      new: Math.floor(total * 0.1), // 10% assumed new
      lost: Math.floor(total * 0.05), // 5% assumed lost
    };
  };

  if (error) {
    return (
      <Card className={styles.positionCard}>
        <Alert
          message="Error Loading Position Tracking"
          description={error}
          type="error"
          showIcon
          action={
            <Button size="small" onClick={clearError}>
              Try Again
            </Button>
          }
        />
      </Card>
    );
  }

  return (
    <Card className={`${styles.positionCard} ${loading ? styles.loading : ""}`}>
      <div className={styles.cardHeader}>
        <div className={styles.headerLeft}>
          <h3 className={styles.cardTitle}>
            Position Tracking
            <Tooltip title="Track your keyword rankings over time">
              <InfoCircleOutlined className={styles.infoIcon} />
            </Tooltip>
          </h3>
          <div className={styles.locationSelector}>
            <span>🇻🇳 Vietnam (Google) - Vietnamese</span>
          </div>
        </div>
        <div className={styles.headerRight}>
          <span className={styles.updateTime}>
            Updated: {loading ? "Updating..." : "12 hours ago"}
          </span>
          <span className={styles.dateRange}>
            {new Date(
              Date.now() - 7 * 24 * 60 * 60 * 1000
            ).toLocaleDateString()}{" "}
            - {new Date().toLocaleDateString()}
          </span>
          <div className={styles.controls}>
            <Select
              value={period}
              size="small"
              onChange={handlePeriodChange}
              disabled={loading}
            >
              <Option value="7days">last 7 days</Option>
              <Option value="30days">last 30 days</Option>
              <Option value="90days">last 90 days</Option>
            </Select>
            <Button type="text" size="small">
              ✕
            </Button>
          </div>
        </div>
      </div>

      <Spin spinning={loading}>
        <div className={styles.visibilitySection}>
          <div className={styles.visibilityScore}>
            <span className={styles.visibilityLabel}>Visibility</span>
            <div className={styles.scoreValue}>{visibilityPercentage}%</div>
          </div>

          <div className={styles.keywordStats}>
            <Row gutter={24}>
              <Col span={6}>
                <div className={styles.statItem}>
                  <div className={styles.statLabel}>Keywords</div>
                  <div className={styles.statSection}>
                    <div className={styles.sectionTitle}>Top 3</div>
                    <div className={styles.sectionValue}>
                      {rankingDistribution.top3.count}
                    </div>
                    <div className={styles.changes}>
                      <span className={styles.new}>
                        new{" "}
                        {getKeywordChanges(rankingDistribution.top3.count).new}
                      </span>
                      <span className={styles.lost}>
                        lost{" "}
                        {getKeywordChanges(rankingDistribution.top3.count).lost}
                      </span>
                    </div>
                    <Progress
                      percent={Math.round(rankingDistribution.top3.percentage)}
                      showInfo={false}
                      strokeColor="#52c41a"
                      className={styles.progressBar}
                    />
                  </div>
                </div>
              </Col>

              <Col span={6}>
                <div className={styles.statItem}>
                  <div className={styles.statSection}>
                    <div className={styles.sectionTitle}>Top 10</div>
                    <div className={styles.sectionValue}>
                      {rankingDistribution.top10.count}
                    </div>
                    <div className={styles.changes}>
                      <span className={styles.new}>
                        new{" "}
                        {getKeywordChanges(rankingDistribution.top10.count).new}
                      </span>
                      <span className={styles.lost}>
                        lost{" "}
                        {
                          getKeywordChanges(rankingDistribution.top10.count)
                            .lost
                        }
                      </span>
                    </div>
                    <Progress
                      percent={Math.round(rankingDistribution.top10.percentage)}
                      showInfo={false}
                      strokeColor="#1890ff"
                      className={styles.progressBar}
                    />
                  </div>
                </div>
              </Col>

              <Col span={6}>
                <div className={styles.statItem}>
                  <div className={styles.statSection}>
                    <div className={styles.sectionTitle}>Top 20</div>
                    <div className={styles.sectionValue}>
                      {rankingDistribution.top20.count}
                    </div>
                    <div className={styles.changes}>
                      <span className={styles.new}>
                        new{" "}
                        {getKeywordChanges(rankingDistribution.top20.count).new}
                      </span>
                      <span className={styles.lost}>
                        lost{" "}
                        {
                          getKeywordChanges(rankingDistribution.top20.count)
                            .lost
                        }
                      </span>
                    </div>
                    <Progress
                      percent={Math.round(rankingDistribution.top20.percentage)}
                      showInfo={false}
                      strokeColor="#faad14"
                      className={styles.progressBar}
                    />
                  </div>
                </div>
              </Col>

              <Col span={6}>
                <div className={styles.statItem}>
                  <div className={styles.statSection}>
                    <div className={styles.sectionTitle}>Top 100</div>
                    <div className={styles.sectionValue}>
                      {rankingDistribution.top100.count}
                    </div>
                    <div className={styles.changes}>
                      <span className={styles.new}>
                        new{" "}
                        {
                          getKeywordChanges(rankingDistribution.top100.count)
                            .new
                        }
                      </span>
                      <span className={styles.lost}>
                        lost{" "}
                        {
                          getKeywordChanges(rankingDistribution.top100.count)
                            .lost
                        }
                      </span>
                    </div>
                    <Progress
                      percent={Math.round(
                        rankingDistribution.top100.percentage
                      )}
                      showInfo={false}
                      strokeColor="#722ed1"
                      className={styles.progressBar}
                    />
                  </div>
                </div>
              </Col>
            </Row>
          </div>

          <div className={styles.topKeywords}>
            <div className={styles.topKeywordsHeader}>Top Keywords</div>
            <div className={styles.keywordTable}>
              <div className={styles.tableHeader}>
                <span>Keywords</span>
                <span>Position</span>
                <span>Trend</span>
                <span>Visibility</span>
              </div>

              {topKeywords.length > 0 ? (
                topKeywords.map((keyword) => (
                  <div key={keyword.id} className={styles.tableRow}>
                    <span className={styles.keyword}>{keyword.keyword}</span>
                    <span className={styles.position}>
                      {keyword.currentRanking > 0
                        ? keyword.currentRanking
                        : "—"}
                    </span>
                    <span className={styles.trend}>
                      {getTrendIcon(keyword.trend)}
                    </span>
                    <span className={styles.visibility}>
                      {keyword.currentRanking > 0
                        ? Math.round(
                            ((100 - keyword.currentRanking) / 100) * 100
                          ) + "%"
                        : "0%"}
                    </span>
                  </div>
                ))
              ) : (
                <div className={styles.tableRow}>
                  <span className={styles.keyword}>
                    {projectOverview ? "No keywords found" : "thiết kế web"}
                  </span>
                  <span className={styles.position}>—</span>
                  <span className={styles.trend}>—</span>
                  <span className={styles.visibility}>0%</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </Spin>

      <div className={styles.cardFooter}>
        <Button
          type="link"
          onClick={() => router.push("/seo/position-tracking")}
        >
          View full report
        </Button>
      </div>
    </Card>
  );
};

export default PositionTracking;
