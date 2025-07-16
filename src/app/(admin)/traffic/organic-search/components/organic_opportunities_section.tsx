"use client";

import React from "react";
import { Card, Row, Col } from "antd";
import {
  RiseOutlined,
  SearchOutlined,
  FileTextOutlined,
  TrophyOutlined,
  BarChartOutlined,
  TagsOutlined,
} from "@ant-design/icons";
import styles from "./organic_opportunities_section.module.scss";

interface Feature {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const OrganicOpportunitiesSection: React.FC = () => {
  const opportunities = [
    "Spot changes in organic traffic growth",
    "See which terms drive the most traffic",
    "Find top-ranking competitor pages",
  ];

  const features: Feature[] = [
    {
      icon: <SearchOutlined className={styles.featureIcon} />,
      title: "Keyword Discovery",
      description:
        "Uncover high-value keywords your competitors rank for but you don't, revealing untapped opportunities.",
    },
    {
      icon: <BarChartOutlined className={styles.featureIcon} />,
      title: "Traffic Analysis",
      description:
        "Monitor organic traffic trends and identify which content drives the most valuable visitors to competitor sites.",
    },
    {
      icon: <FileTextOutlined className={styles.featureIcon} />,
      title: "Content Strategy",
      description:
        "Analyze competitor content that ranks highest and discover gaps in your own content strategy.",
    },
    {
      icon: <TrophyOutlined className={styles.featureIcon} />,
      title: "Competitive Advantage",
      description:
        "Stay ahead by tracking competitor ranking changes and identifying emerging opportunities in your market.",
    },
    {
      icon: <TagsOutlined className={styles.featureIcon} />,
      title: "SERP Analysis",
      description:
        "Deep dive into search engine results pages to understand ranking factors and optimization opportunities.",
    },
    {
      icon: <RiseOutlined className={styles.featureIcon} />,
      title: "Growth Tracking",
      description:
        "Track organic search performance over time and identify seasonal trends and growth patterns.",
    },
  ];

  return (
    <section className={styles.opportunitiesSection}>
      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.leftSection}>
            <h2 className={styles.title}>
              Discover high-impact organic traffic opportunities
            </h2>
            <ul className={styles.opportunitiesList}>
              {opportunities.map((opportunity, index) => (
                <li key={index} className={styles.opportunityItem}>
                  <span className={styles.bullet}>•</span>
                  {opportunity}
                </li>
              ))}
            </ul>
          </div>

          <div className={styles.rightSection}>
            <div className={styles.dashboardPreview}>
              <div className={styles.dashboardHeader}>
                <span className={styles.dashboardTitle}>Organic Search</span>
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
                        color: "#f5222d",
                        fontWeight: "bold",
                      }}
                    >
                      dresses
                    </span>
                    <span
                      className={styles.keyword}
                      style={{ fontSize: "11px", color: "#722ed1" }}
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
                    points="10,60 30,45 50,50 70,35 90,40 110,25 130,30 150,20 170,25 190,15"
                    fill="none"
                    stroke="#f5222d"
                    strokeWidth="3"
                    strokeLinecap="round"
                  />
                  <circle cx="190" cy="15" r="3" fill="#f5222d" />
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

export default OrganicOpportunitiesSection;
