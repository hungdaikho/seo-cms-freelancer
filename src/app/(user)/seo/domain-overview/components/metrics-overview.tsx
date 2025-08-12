import React from "react";
import { Card, Progress } from "antd";
import { FiInfo } from "react-icons/fi";
import styles from "./metrics-overview.module.scss";

interface MetricsData {
  authorityScore: number;
  organicTraffic: string;
  keyTopics: Array<{
    topic: string;
    traffic: string;
    category: string;
  }>;
}

interface MetricsOverviewProps {
  data: MetricsData;
}

const MetricsOverview: React.FC<MetricsOverviewProps> = ({ data }) => {
  return (
    <div className={styles.metricsOverview}>
      <Card className={styles.metricsCard}>
        <div className={styles.metricsGrid}>
          <div className={styles.metricItem}>
            <div className={styles.metricHeader}>
              <span>Authority Score</span>
              <FiInfo className={styles.infoIcon} />
            </div>
            <div className={styles.scoreValue}>
              <span className={styles.score}>{data.authorityScore}</span>
              <Progress
                percent={(data.authorityScore / 100) * 100}
                strokeColor="#3b82f6"
                showInfo={false}
                className={styles.scoreProgress}
              />
            </div>
          </div>

          <div className={styles.metricItem}>
            <div className={styles.metricHeader}>
              <span>Org. Search Traffic</span>
              <FiInfo className={styles.infoIcon} />
            </div>
            <div className={styles.trafficValue}>
              <span className={styles.traffic}>{data.organicTraffic}</span>
            </div>
          </div>

          <div className={styles.keyTopicsSection}>
            <div className={styles.sectionHeader}>
              <span>Key Topics</span>
            </div>
            <div className={styles.topicsList}>
              {data.keyTopics.map((topic, index) => (
                <div key={index} className={styles.topicItem}>
                  <div className={styles.topicInfo}>
                    <span className={styles.topicName}>{topic.topic}</span>
                    <span className={styles.topicCategory}>
                      {topic.category}
                    </span>
                  </div>
                  <span className={styles.topicTraffic}>{topic.traffic}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className={styles.chartArea}>
          <div className={styles.chartPlaceholder}>
            {/* Chart visualization would go here */}
            <div className={styles.chartLines}>
              <svg viewBox="0 0 300 100" className={styles.chartSvg}>
                <path
                  d="M10,80 Q50,20 100,40 T200,30 T290,50"
                  stroke="#3b82f6"
                  strokeWidth="2"
                  fill="none"
                />
                <path
                  d="M10,90 Q50,60 100,70 T200,65 T290,75"
                  stroke="#f59e0b"
                  strokeWidth="2"
                  fill="none"
                />
              </svg>
            </div>
            <div className={styles.chartLabels}>
              <span>Jan 17</span>
              <span>Jan 21</span>
              <span>J</span>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default MetricsOverview;
