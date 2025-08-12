"use client";

import { Card, Progress, Tag } from "antd";
import styles from "./metrics-section.module.scss";

interface MetricData {
  country: string;
  flag: string;
  volume: string;
}

const MetricsSection = () => {
  const volumeData: MetricData[] = [
    { country: "US", flag: "🇺🇸", volume: "12K" },
    { country: "IN", flag: "🇮🇳", volume: "12K" },
    { country: "GB", flag: "🇬🇧", volume: "3.4K" },
    { country: "CA", flag: "🇨🇦", volume: "3.4K" },
    { country: "AU", flag: "🇦🇺", volume: "3.3K" },
    { country: "FR", flag: "🇫🇷", volume: "2.4K" },
  ];

  return (
    <div className={styles.metricsSection}>
      <div className={styles.metricsGrid}>
        {/* Volume Card */}
        <Card className={styles.metricCard}>
          <div className={styles.cardHeader}>
            <h3>Volume</h3>
            <div className={styles.volumeValue}>
              5.4K <span className={styles.flag}>🇺🇸</span>
            </div>
          </div>
          <div className={styles.difficultySection}>
            <span className={styles.difficultyLabel}>Keyword Difficulty</span>
            <div className={styles.difficultyValue}>60%</div>
            <Progress
              percent={60}
              strokeColor="#f97316"
              showInfo={false}
              className={styles.difficultyProgress}
            />
            <span className={styles.difficultyText}>Difficult</span>
          </div>
        </Card>

        {/* Global Volume Card */}
        <Card className={styles.metricCard}>
          <div className={styles.cardHeader}>
            <h3>Global Volume</h3>
            <div className={styles.globalValue}>144K</div>
          </div>
          <div className={styles.volumeList}>
            {volumeData.map((item, index) => (
              <div key={index} className={styles.volumeItem}>
                <span className={styles.countryInfo}>
                  <span className={styles.flag}>{item.flag}</span>
                  <span className={styles.country}>{item.country}</span>
                </span>
                <div className={styles.volumeBar}>
                  <div
                    className={styles.barFill}
                    style={{ width: `${Math.random() * 100}%` }}
                  ></div>
                </div>
                <span className={styles.volume}>{item.volume}</span>
              </div>
            ))}
          </div>
        </Card>

        {/* Intent Card */}
        <Card className={styles.metricCard}>
          <div className={styles.cardHeader}>
            <h3>Intent</h3>
            <Tag color="orange" className={styles.intentTag}>
              Commercial
            </Tag>
          </div>
          <div className={styles.trendSection}>
            <h4>Trend</h4>
            <div className={styles.trendChart}>
              {/* Simple trend visualization */}
              <div className={styles.trendBars}>
                {[40, 55, 45, 60, 80, 75, 90, 85, 70, 75, 85, 95].map(
                  (height, index) => (
                    <div
                      key={index}
                      className={styles.trendBar}
                      style={{ height: `${height}%` }}
                    ></div>
                  )
                )}
              </div>
            </div>
          </div>
        </Card>

        {/* CPC & Competition Card */}
        <Card className={styles.metricCard}>
          <div className={styles.cardHeader}>
            <h3>CPC</h3>
            <div className={styles.cpcValue}>$0.49</div>
          </div>
          <div className={styles.competitionSection}>
            <div className={styles.competitionItem}>
              <span>Competitive Density</span>
              <span className={styles.competitionValue}>0.56</span>
            </div>
          </div>
          <div className={styles.plaSection}>
            <div className={styles.plaGrid}>
              <div className={styles.plaItem}>
                <span className={styles.plaLabel}>PLA</span>
                <span className={styles.plaValue}>0</span>
              </div>
              <div className={styles.plaItem}>
                <span className={styles.plaLabel}>Ads</span>
                <span className={styles.plaValue}>7</span>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default MetricsSection;
