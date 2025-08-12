"use client";

import React from "react";
import { Card, Row, Col, Progress } from "antd";
import {
  RiseOutlined,
  TeamOutlined,
  ShareAltOutlined,
  GlobalOutlined,
  StarOutlined,
  ThunderboltOutlined,
} from "@ant-design/icons";
import styles from "./referral_patterns_section.module.scss";

interface ReferralSource {
  name: string;
  percentage: number;
  visits: string;
  color: string;
  icon: React.ReactNode;
}

interface Feature {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const ReferralPatternsSection: React.FC = () => {
  const referralSources: ReferralSource[] = [
    {
      name: "Social Media",
      percentage: 45,
      visits: "2.8M",
      color: "#1890ff",
      icon: <ShareAltOutlined />,
    },
    {
      name: "Partner Sites",
      percentage: 32,
      visits: "2.1M",
      color: "#52c41a",
      icon: <TeamOutlined />,
    },
    {
      name: "News & Blogs",
      percentage: 28,
      visits: "1.7M",
      color: "#722ed1",
      icon: <GlobalOutlined />,
    },
    {
      name: "Forums",
      percentage: 18,
      visits: "1.2M",
      color: "#fa8c16",
      icon: <StarOutlined />,
    },
  ];

  const features: Feature[] = [
    {
      icon: <RiseOutlined className={styles.featureIcon} />,
      title: "Track Referral Performance",
      description:
        "Monitor which referral sources drive the most valuable traffic and conversions to optimize your strategy.",
    },
    {
      icon: <TeamOutlined className={styles.featureIcon} />,
      title: "Identify Partnership Opportunities",
      description:
        "Discover high-performing referral sites in your industry to build strategic partnerships and collaborations.",
    },
    {
      icon: <ShareAltOutlined className={styles.featureIcon} />,
      title: "Analyze Referral Quality",
      description:
        "Understand user behavior patterns from different referral sources to improve content and user experience.",
    },
    {
      icon: <ThunderboltOutlined className={styles.featureIcon} />,
      title: "Competitor Referral Intelligence",
      description:
        "See where your competitors get their referral traffic and uncover new opportunities for your business.",
    },
  ];

  return (
    <section className={styles.referralPatternsSection}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.title}>
            Turn Referral Traffic Into Revenue Growth
          </h2>
          <p className={styles.description}>
            Understand your referral landscape and discover the most valuable
            traffic sources that drive conversions for your business and
            competitors.
          </p>
        </div>

        <div className={styles.content}>
          <div className={styles.dataSection}>
            <div className={styles.chartCard}>
              <h3 className={styles.chartTitle}>Top Referral Sources</h3>
              <div className={styles.sourcesList}>
                {referralSources.map((source, index) => (
                  <div key={index} className={styles.sourceItem}>
                    <div className={styles.sourceHeader}>
                      <div className={styles.sourceInfo}>
                        <span
                          className={styles.sourceIcon}
                          style={{ color: source.color }}
                        >
                          {source.icon}
                        </span>
                        <span className={styles.sourceName}>{source.name}</span>
                      </div>
                      <div className={styles.sourceStats}>
                        <span className={styles.percentage}>
                          {source.percentage}%
                        </span>
                        <span className={styles.visits}>
                          {source.visits} visits
                        </span>
                      </div>
                    </div>
                    <Progress
                      percent={source.percentage}
                      strokeColor={source.color}
                      showInfo={false}
                      strokeWidth={8}
                      trailColor="#f0f0f0"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className={styles.featuresSection}>
            <Row gutter={[24, 24]}>
              {features.map((feature, index) => (
                <Col xs={24} md={12} key={index}>
                  <Card className={styles.featureCard} bordered={false}>
                    <div className={styles.featureContent}>
                      <div className={styles.iconWrapper}>{feature.icon}</div>
                      <div className={styles.textContent}>
                        <h4 className={styles.featureTitle}>{feature.title}</h4>
                        <p className={styles.featureDescription}>
                          {feature.description}
                        </p>
                      </div>
                    </div>
                  </Card>
                </Col>
              ))}
            </Row>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ReferralPatternsSection;
