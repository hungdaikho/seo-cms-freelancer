"use client";

import React from "react";
import { Card, Row, Col } from "antd";
import styles from "./why-semrush-section.module.scss";

interface Feature {
  icon: string;
  title: string;
  subtitle: string;
  description: string;
  color: string;
}

interface WhySemrushSectionProps {}

const WhySemrushSection: React.FC<WhySemrushSectionProps> = () => {
  const features: Feature[] = [
    {
      icon: "🔍",
      title: "> Over 43 trillion",
      subtitle: "quality backlinks",
      description:
        "Access over 43 trillion backlinks from our continuously growing database. Discover nearly every link pointing to any website, significantly more than other free backlink checkers.",
      color: "#f3e8ff",
    },
    {
      icon: "⚡",
      title: "Fastest backlink",
      subtitle: "discovery tool",
      description:
        "Discover new backlinks as they appear with our continuously updating database. While some competitors update weekly or monthly, Semrush helps you spot new link opportunities and monitor competitors in near real-time.",
      color: "#dbeafe",
    },
    {
      icon: "✅",
      title: "Reliable Authority",
      subtitle: "Score",
      description:
        "Quickly assess link quality with our proprietary Authority Score metric (a domain's overall quality). Based on multiple factors including backlink data, traffic patterns, and domain trustworthiness, it helps you identify which links truly impact your SEO performance.",
      color: "#dcfce7",
    },
  ];

  return (
    <div className={styles.whySemrushSection}>
      <div className={styles.sectionHeader}>
        <h2 className={styles.sectionTitle}>
          Why Use Semrush's Backlink Checker?
        </h2>
        <p className={styles.sectionSubtitle}>
          Our free backlink checker offers advantages that make it the preferred
          choice for SEO professionals, digital marketers, and website owners:
        </p>
      </div>

      <Row gutter={[32, 32]} className={styles.featuresGrid}>
        {features.map((feature, index) => (
          <Col xs={24} lg={8} key={index}>
            <Card className={styles.featureCard}>
              <div className={styles.featureContent}>
                <div
                  className={styles.featureIcon}
                  style={{ background: feature.color }}
                >
                  <span className={styles.iconEmoji}>{feature.icon}</span>
                </div>

                <div className={styles.featureText}>
                  <h3 className={styles.featureTitle}>{feature.title}</h3>
                  <h4 className={styles.featureSubtitle}>{feature.subtitle}</h4>
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
  );
};

export default WhySemrushSection;
