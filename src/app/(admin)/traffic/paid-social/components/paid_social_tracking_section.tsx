"use client";

import React from "react";
import { Card, Row, Col, Progress } from "antd";
import {
  DollarOutlined,
  ShareAltOutlined,
  MobileOutlined,
  TrophyOutlined,
  BarChartOutlined,
  TagsOutlined,
} from "@ant-design/icons";
import styles from "./paid_social_tracking_section.module.scss";

interface SocialSource {
  name: string;
  percentage: number;
  color: string;
}

interface Feature {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const PaidSocialTrackingSection: React.FC = () => {
  const trackingPoints = [
    "Spot spikes in ad-driven traffic from social platforms",
    "Compare mobile vs. desktop interactions across platforms",
    "See which paid pages perform best",
  ];

  const socialSources: SocialSource[] = [
    {
      name: "google.com",
      percentage: 30,
      color: "#9254de",
    },
    {
      name: "bing.com",
      percentage: 30,
      color: "#b37feb",
    },
    {
      name: "baidu.com",
      percentage: 30,
      color: "#d3adf7",
    },
    {
      name: "google.com",
      percentage: 0.68,
      color: "#efdbff",
    },
    {
      name: "facebook.com",
      percentage: 30,
      color: "#722ed1",
    },
  ];

  const features: Feature[] = [
    {
      icon: <DollarOutlined className={styles.featureIcon} />,
      title: "Ad Spend Analysis",
      description:
        "Track competitor advertising budgets and identify high-ROI social media campaigns across platforms.",
    },
    {
      icon: <ShareAltOutlined className={styles.featureIcon} />,
      title: "Campaign Intelligence",
      description:
        "Discover which paid social campaigns drive the most traffic and engagement for your competitors.",
    },
    {
      icon: <MobileOutlined className={styles.featureIcon} />,
      title: "Cross-Platform Insights",
      description:
        "Compare performance across Facebook, Instagram, Twitter, LinkedIn, and other social platforms.",
    },
    {
      icon: <BarChartOutlined className={styles.featureIcon} />,
      title: "ROAS Optimization",
      description:
        "Understand return on ad spend patterns and optimize your paid social strategy for better results.",
    },
    {
      icon: <TagsOutlined className={styles.featureIcon} />,
      title: "Creative Analysis",
      description:
        "Analyze competitor ad creatives, copy, and landing pages to improve your own campaigns.",
    },
    {
      icon: <TrophyOutlined className={styles.featureIcon} />,
      title: "Competitive Advantage",
      description:
        "Stay ahead by monitoring competitor paid social strategies and identifying market opportunities.",
    },
  ];

  return (
    <section className={styles.trackingSection}>
      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.leftSection}>
            <h2 className={styles.title}>
              Track paid social trends, top pages, and promos
            </h2>
            <ul className={styles.trackingList}>
              {trackingPoints.map((point, index) => (
                <li key={index} className={styles.trackingItem}>
                  <span className={styles.bullet}>•</span>
                  {point}
                </li>
              ))}
            </ul>
          </div>

          <div className={styles.rightSection}>
            <div className={styles.dashboardPreview}>
              <div className={styles.dashboardHeader}>
                <span className={styles.dashboardTitle}>Paid Social</span>
                <div className={styles.growthBadge}>+26%</div>
              </div>
              <div className={styles.chartArea}>
                <svg className={styles.chart} viewBox="0 0 200 80">
                  <polyline
                    points="10,65 30,60 50,55 70,50 90,45 110,40 130,35 150,30 170,25 190,20"
                    fill="none"
                    stroke="#722ed1"
                    strokeWidth="3"
                    strokeLinecap="round"
                  />
                  <circle cx="70" cy="50" r="2" fill="#722ed1" />
                  <circle cx="110" cy="40" r="2" fill="#722ed1" />
                  <circle cx="150" cy="30" r="2" fill="#722ed1" />
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
              <div className={styles.topSources}>
                <h4 className={styles.sourcesTitle}>Top Sources</h4>
                <div className={styles.sourcesList}>
                  {socialSources.map((source, index) => (
                    <div key={index} className={styles.sourceItem}>
                      <div className={styles.sourceInfo}>
                        <span className={styles.sourceName}>{source.name}</span>
                        <span className={styles.sourcePercentage}>
                          {source.percentage === 0.68 ? "0.68%" : "30.13%"}
                        </span>
                      </div>
                      <Progress
                        percent={
                          source.percentage === 0.68 ? 2 : source.percentage
                        }
                        strokeColor={source.color}
                        showInfo={false}
                        strokeWidth={4}
                        trailColor="#f0f0f0"
                      />
                    </div>
                  ))}
                </div>
                <div className={styles.highlightSource}>
                  <span className={styles.highlightLabel}>ebay.com</span>
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

export default PaidSocialTrackingSection;
