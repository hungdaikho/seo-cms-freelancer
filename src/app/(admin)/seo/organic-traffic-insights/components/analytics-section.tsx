"use client";

import React from "react";
import { Row, Col, Card } from "antd";
import styles from "./analytics-section.module.scss";

interface AnalyticsSectionProps {}

const AnalyticsSection: React.FC<AnalyticsSectionProps> = () => {
  const chartPoints = [
    { x: 10, y: 80, value: 20, date: "Nov 1" },
    { x: 30, y: 90, value: 15, date: "Nov 5" },
    { x: 50, y: 70, value: 25, date: "Nov 10" },
    { x: 70, y: 75, value: 23, date: "Nov 15" },
  ];

  const createPath = () => {
    const pathData = chartPoints
      .map((point, index) => {
        const command = index === 0 ? "M" : "L";
        return `${command} ${point.x} ${point.y}`;
      })
      .join(" ");
    return pathData;
  };

  return (
    <div className={styles.analyticsSection}>
      <Row gutter={[32, 32]}>
        <Col xs={24} lg={12}>
          <Card className={styles.chartCard}>
            <div className={styles.chartHeader}>
              <h3 className={styles.chartTitle}>Sessions</h3>
              <div className={styles.chartMeta}>
                <span className={styles.dateRange}>November 15, 2015</span>
                <div className={styles.sessionValue}>
                  <span className={styles.dot}>●</span>
                  <span className={styles.label}>Sessions</span>
                  <span className={styles.value}>23</span>
                </div>
              </div>
            </div>
            <div className={styles.chartContainer}>
              <div className={styles.customChart}>
                <svg width="100%" height="200" viewBox="0 0 100 100">
                  <defs>
                    <linearGradient
                      id="lineGradient"
                      x1="0%"
                      y1="0%"
                      x2="100%"
                      y2="0%"
                    >
                      <stop offset="0%" stopColor="#3b82f6" />
                      <stop offset="100%" stopColor="#60a5fa" />
                    </linearGradient>
                  </defs>

                  {/* Grid lines */}
                  {[20, 40, 60, 80].map((y) => (
                    <line
                      key={y}
                      x1="0"
                      y1={y}
                      x2="100"
                      y2={y}
                      stroke="#e5e7eb"
                      strokeWidth="0.5"
                      strokeDasharray="2,2"
                    />
                  ))}

                  {/* Chart line */}
                  <path
                    d={createPath()}
                    fill="none"
                    stroke="url(#lineGradient)"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />

                  {/* Data points */}
                  {chartPoints.map((point, index) => (
                    <circle
                      key={index}
                      cx={point.x}
                      cy={point.y}
                      r="3"
                      fill="#3b82f6"
                      stroke="#ffffff"
                      strokeWidth="2"
                      className={styles.chartPoint}
                    />
                  ))}
                </svg>

                {/* Y-axis labels */}
                <div className={styles.yAxisLabels}>
                  <span>40</span>
                  <span>20</span>
                  <span>0</span>
                </div>

                {/* X-axis labels */}
                <div className={styles.xAxisLabels}>
                  <span>Nov 1</span>
                  <span>Nov 5</span>
                  <span>Nov 10</span>
                  <span>Nov 15</span>
                </div>
              </div>
            </div>
          </Card>
        </Col>

        <Col xs={24} lg={12}>
          <Card className={styles.infoCard}>
            <div className={styles.infoContent}>
              <h3 className={styles.infoTitle}>
                Analyze your traffic at the keyword level
              </h3>
              <p className={styles.infoDescription}>
                Check your impressions, CTR, position and get more data for each
                keyword to assess how your optimization efforts are affecting
                your website's traffic and user behavior.
              </p>
            </div>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default AnalyticsSection;
