"use client";

import React from "react";
import { Row, Col, Card, Progress } from "antd";
import styles from "./analysis-overview.module.scss";

interface AnalysisData {
  label: string;
  value: number;
  color: string;
  icon: string;
}

interface AnalysisOverviewProps {}

const AnalysisOverview: React.FC<AnalysisOverviewProps> = () => {
  const analysisData: AnalysisData[] = [
    { label: "Strategy Ideas", value: 9, color: "#1890ff", icon: "SI" },
    { label: "SERP Features Ideas", value: 8, color: "#f5222d", icon: "Sf" },
    { label: "Backlinks Ideas", value: 24, color: "#52c41a", icon: "BI" },
    { label: "Semantic Ideas", value: 21, color: "#13c2c2", icon: "Se" },
    { label: "Technical SEO Ideas", value: 39, color: "#fa8c16", icon: "Te" },
    { label: "Content Ideas", value: 142, color: "#52c41a", icon: "Co" },
    { label: "User Experience Ideas", value: 12, color: "#722ed1", icon: "Ux" },
  ];

  const totalIdeas = analysisData.reduce((sum, item) => sum + item.value, 0);

  return (
    <div className={styles.analysisOverview}>
      <div className={styles.overviewHeader}>
        <h2 className={styles.sectionTitle}>
          Review your report based on the analysis of your
          <br />
          competitors and get ideas to optimize your website
        </h2>
      </div>

      <Row gutter={[32, 32]} align="middle">
        <Col xs={24} lg={10}>
          <div className={styles.chartContainer}>
            <div className={styles.totalIdeas}>
              <div className={styles.totalNumber}>{totalIdeas}</div>
              <div className={styles.totalLabel}>for 24 pages</div>
            </div>
            <div className={styles.chartRing}>
              {/* SVG Donut Chart */}
              <svg
                width="300"
                height="300"
                viewBox="0 0 300 300"
                className={styles.donutChart}
              >
                <circle
                  cx="150"
                  cy="150"
                  r="120"
                  fill="none"
                  stroke="#f0f0f0"
                  strokeWidth="40"
                />
                {/* Dynamic segments would be calculated here */}
                <circle
                  cx="150"
                  cy="150"
                  r="120"
                  fill="none"
                  stroke="#52c41a"
                  strokeWidth="40"
                  strokeDasharray="300 453"
                  strokeDashoffset="0"
                  transform="rotate(-90 150 150)"
                />
              </svg>
            </div>
          </div>
        </Col>

        <Col xs={24} lg={14}>
          <div className={styles.ideasList}>
            <h3 className={styles.listTitle}>Total Ideas</h3>
            <div className={styles.ideasGrid}>
              {analysisData.map((item, index) => (
                <div key={index} className={styles.ideaItem}>
                  <div
                    className={styles.ideaIcon}
                    style={{ backgroundColor: item.color }}
                  >
                    {item.icon}
                  </div>
                  <div className={styles.ideaContent}>
                    <div className={styles.ideaLabel}>{item.label}</div>
                    <div className={styles.ideaValue}>{item.value}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Col>
      </Row>

      <div className={styles.trafficProjection}>
        <h3 className={styles.projectionTitle}>
          Our ideas may help you increase your organic traffic
        </h3>
        <div className={styles.projectionContainer}>
          <div className={styles.projectionBadge}>Over 240%</div>
          <div className={styles.trafficBars}>
            <div className={styles.trafficBar}>
              <span className={styles.barLabel}>Current</span>
              <div className={styles.barContainer}>
                <div
                  className={styles.bar}
                  style={{ width: "30%", backgroundColor: "#1890ff" }}
                ></div>
                <span className={styles.barValue}>300K</span>
              </div>
            </div>
            <div className={styles.trafficBar}>
              <span className={styles.barLabel}>Potential</span>
              <div className={styles.barContainer}>
                <div
                  className={styles.bar}
                  style={{ width: "72%", backgroundColor: "#1890ff" }}
                ></div>
                <span className={styles.barValue}>720K</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalysisOverview;
