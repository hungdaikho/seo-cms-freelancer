"use client";

import React from "react";
import { Row, Col, Card } from "antd";
import { FiClock, FiTrendingUp, FiZap } from "react-icons/fi";
import styles from "./monitoring-section.module.scss";

interface MonitoringFeature {
  icon: React.ReactNode;
  title: string;
  description: string;
}

interface MonitoringSectionProps {}

const MonitoringSection: React.FC<MonitoringSectionProps> = () => {
  const features: MonitoringFeature[] = [
    {
      icon: <FiClock />,
      title: "Scheduled Audits",
      description:
        "Set up automatic audits to run daily, weekly, or monthly. Stay on top of any new issues that may arise on your site.",
    },
    {
      icon: <FiTrendingUp />,
      title: "Progress Tracking",
      description:
        "Monitor your SEO improvements over time with detailed progress reports and trend analysis.",
    },
    {
      icon: <FiZap />,
      title: "Instant Alerts",
      description:
        "Get notified immediately when critical SEO issues are detected on your website.",
    },
  ];

  return (
    <div className={styles.monitoringSection}>
      <div className={styles.sectionHeader}>
        <h2 className={styles.sectionTitle}>Monitor Your SEO Progress</h2>
        <p className={styles.sectionSubtitle}>
          Keep track of your SEO improvements with automated monitoring and
          detailed progress reports.
        </p>
      </div>

      <Row gutter={[32, 32]}>
        {features.map((feature, index) => (
          <Col xs={24} md={8} key={index}>
            <Card className={styles.featureCard}>
              <div className={styles.cardContent}>
                <div className={styles.iconWrapper}>{feature.icon}</div>
                <h3 className={styles.featureTitle}>{feature.title}</h3>
                <p className={styles.featureDescription}>
                  {feature.description}
                </p>
              </div>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default MonitoringSection;
