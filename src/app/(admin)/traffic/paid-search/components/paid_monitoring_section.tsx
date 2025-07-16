"use client";

import React from "react";
import { Card, Row, Col } from "antd";
import {
  DollarOutlined,
  SearchOutlined,
  FileTextOutlined,
  BarChartOutlined,
  TagsOutlined,
  TrophyOutlined,
} from "@ant-design/icons";
import styles from "./paid_monitoring_section.module.scss";

interface Feature {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const PaidMonitoringSection: React.FC = () => {
  const monitoringPoints = [
    "Track changes in paid search traffic",
    "Discover the paid terms with the most impact",
    "Find landing pages that convert paid traffic",
  ];

  const features: Feature[] = [
    {
      icon: <DollarOutlined className={styles.featureIcon} />,
      title: "PPC Budget Analysis",
      description:
        "Understand competitor advertising spend and identify high-value keyword opportunities for your campaigns.",
    },
    {
      icon: <SearchOutlined className={styles.featureIcon} />,
      title: "Keyword Intelligence",
      description:
        "Discover which paid keywords drive the most traffic and conversions for your competitors.",
    },
    {
      icon: <FileTextOutlined className={styles.featureIcon} />,
      title: "Ad Copy Insights",
      description:
        "Analyze competitor ad copy and landing pages to improve your own PPC campaign performance.",
    },
    {
      icon: <BarChartOutlined className={styles.featureIcon} />,
      title: "Traffic Trends",
      description:
        "Monitor paid search traffic patterns and seasonal trends to optimize your advertising strategy.",
    },
    {
      icon: <TagsOutlined className={styles.featureIcon} />,
      title: "Landing Page Analysis",
      description:
        "Identify high-converting landing pages and understand what makes them effective for paid traffic.",
    },
    {
      icon: <TrophyOutlined className={styles.featureIcon} />,
      title: "Competitive Edge",
      description:
        "Stay ahead by tracking competitor PPC strategies and identifying gaps in the market.",
    },
  ];

  return (
    <section className={styles.monitoringSection}>
      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.leftSection}>
            <h2 className={styles.title}>
              Monitor paid traffic, PPC keywords, and landing pages
            </h2>
            <ul className={styles.monitoringList}>
              {monitoringPoints.map((point, index) => (
                <li key={index} className={styles.monitoringItem}>
                  <span className={styles.bullet}>•</span>
                  {point}
                </li>
              ))}
            </ul>
          </div>

          <div className={styles.rightSection}>
            <div className={styles.dashboardPreview}>
              <div className={styles.dashboardHeader}>
                <span className={styles.dashboardTitle}>Paid Search</span>
                <div className={styles.keywordCloud}>
                  <span className={styles.topKeywords}>Top Keywords</span>
                  <div className={styles.keywords}>
                    <span
                      className={styles.keyword}
                      style={{ fontSize: "12px", color: "#666" }}
                    >
                      jumpsuit
                    </span>
                    <span
                      className={styles.keyword}
                      style={{ fontSize: "14px", color: "#1890ff" }}
                    >
                      clothes
                    </span>
                    <span
                      className={styles.keyword}
                      style={{ fontSize: "10px", color: "#999" }}
                    >
                      cardigan
                    </span>
                    <span
                      className={styles.keyword}
                      style={{
                        fontSize: "16px",
                        color: "#722ed1",
                        fontWeight: "bold",
                      }}
                    >
                      dresses
                    </span>
                    <span
                      className={styles.keyword}
                      style={{ fontSize: "11px", color: "#8b45c1" }}
                    >
                      clothing store
                    </span>
                    <span
                      className={styles.keyword}
                      style={{ fontSize: "9px", color: "#bbb" }}
                    >
                      sale
                    </span>
                  </div>
                </div>
              </div>
              <div className={styles.chartArea}>
                <svg className={styles.chart} viewBox="0 0 200 80">
                  <polyline
                    points="10,65 30,60 50,55 70,45 90,50 110,40 130,35 150,30 170,25 190,20"
                    fill="none"
                    stroke="#722ed1"
                    strokeWidth="3"
                    strokeLinecap="round"
                  />
                  <circle cx="190" cy="20" r="3" fill="#722ed1" />
                </svg>
                <div className={styles.dateLabels}>
                  <span>May 8</span>
                  <span>May 9</span>
                  <span>May 10</span>
                  <span>May 11</span>
                  <span>May 12</span>
                  <span>May 13</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.featuresGrid}>
          <Row gutter={[24, 24]}>
            {features.map((feature, index) => (
              <Col xs={24} sm={12} lg={8} key={index}>
                <Card className={styles.featureCard} bordered={false}>
                  <div className={styles.featureContent}>
                    <div className={styles.iconWrapper}>{feature.icon}</div>
                    <h4 className={styles.featureTitle}>{feature.title}</h4>
                    <p className={styles.featureDescription}>
                      {feature.description}
                    </p>
                  </div>
                </Card>
              </Col>
            ))}
          </Row>
        </div>
      </div>
    </section>
  );
};

export default PaidMonitoringSection;
