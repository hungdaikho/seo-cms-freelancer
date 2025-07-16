"use client";

import React from "react";
import { Card, Row, Col, Progress } from "antd";
import {
  ShareAltOutlined,
  UserOutlined,
  EyeOutlined,
  HeartOutlined,
  MessageOutlined,
  TrophyOutlined,
} from "@ant-design/icons";
import styles from "./social_tracking_section.module.scss";

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

const SocialTrackingSection: React.FC = () => {
  const trackingPoints = [
    "Monitor traffic shifts across social platforms",
    "See how users engage across devices",
    "Find pages that get the most social traffic",
  ];

  const socialSources: SocialSource[] = [
    {
      name: "google.com",
      percentage: 30,
      color: "#1890ff",
    },
    {
      name: "bing.com",
      percentage: 30,
      color: "#52c41a",
    },
    {
      name: "baidu.com",
      percentage: 30,
      color: "#722ed1",
    },
    {
      name: "google.com",
      percentage: 30,
      color: "#fa8c16",
    },
    {
      name: "facebook.com",
      percentage: 30,
      color: "#f5222d",
    },
  ];

  const features: Feature[] = [
    {
      icon: <ShareAltOutlined className={styles.featureIcon} />,
      title: "Social Platform Analysis",
      description:
        "Track traffic from Facebook, Twitter, Instagram, LinkedIn and other social media platforms.",
    },
    {
      icon: <UserOutlined className={styles.featureIcon} />,
      title: "Audience Insights",
      description:
        "Understand how different social audiences interact with your content and competitor content.",
    },
    {
      icon: <EyeOutlined className={styles.featureIcon} />,
      title: "Content Performance",
      description:
        "Identify which content types and topics drive the most social media engagement and traffic.",
    },
    {
      icon: <HeartOutlined className={styles.featureIcon} />,
      title: "Engagement Tracking",
      description:
        "Monitor likes, shares, comments and other engagement metrics that drive organic social traffic.",
    },
    {
      icon: <MessageOutlined className={styles.featureIcon} />,
      title: "Viral Content Discovery",
      description:
        "Find content that goes viral on social media and understand what makes it shareable.",
    },
    {
      icon: <TrophyOutlined className={styles.featureIcon} />,
      title: "Competitive Social Intelligence",
      description:
        "Analyze competitor social strategies and identify opportunities for your own social growth.",
    },
  ];

  return (
    <section className={styles.trackingSection}>
      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.leftSection}>
            <h2 className={styles.title}>
              Track social traffic trends, content, and platforms
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
                <span className={styles.dashboardTitle}>Organic Social</span>
                <div className={styles.growthBadge}>+26%</div>
              </div>
              <div className={styles.chartArea}>
                <svg className={styles.chart} viewBox="0 0 200 80">
                  <polyline
                    points="10,65 30,60 50,55 70,50 90,45 110,40 130,35 150,30 170,25 190,20"
                    fill="none"
                    stroke="#ff69b4"
                    strokeWidth="3"
                    strokeLinecap="round"
                  />
                  <circle cx="70" cy="50" r="2" fill="#ff69b4" />
                  <circle cx="110" cy="40" r="2" fill="#ff69b4" />
                  <circle cx="150" cy="30" r="2" fill="#ff69b4" />
                  <circle cx="190" cy="20" r="3" fill="#ff69b4" />
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
                          {source.percentage}.13%
                        </span>
                      </div>
                      <Progress
                        percent={source.percentage}
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

export default SocialTrackingSection;
