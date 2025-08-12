"use client";

import React from "react";
import { Row, Col, Card } from "antd";
import { FiZap, FiEdit3, FiRefreshCw, FiSearch } from "react-icons/fi";
import styles from "./features-section.module.scss";

interface Feature {
  icon: React.ReactNode;
  title: string;
  description: string;
}

interface FeaturesSectionProps {}

const FeaturesSection: React.FC<FeaturesSectionProps> = () => {
  const features: Feature[] = [
    {
      icon: <FiZap />,
      title: "Make your copy more SEO-friendly",
      description:
        "Get suggestions to improve your content for better search engine visibility and ranking.",
    },
    {
      icon: <FiEdit3 />,
      title: "Improve readability and engagement",
      description:
        "Enhance your writing style to make it more engaging and easier to read for your audience.",
    },
    {
      icon: <FiRefreshCw />,
      title: "Maintain a consistent tone of voice",
      description:
        "Keep your brand voice consistent across all your content with intelligent tone analysis.",
    },
    {
      icon: <FiSearch />,
      title: "Check your copy for plagiarism",
      description:
        "Ensure your content is original and avoid potential plagiarism issues before publishing.",
    },
  ];

  return (
    <div className={styles.featuresSection}>
      <div className={styles.sectionHeader}>
        <h2 className={styles.sectionTitle}>
          Create better content, faster and outrank your competitors
        </h2>
      </div>

      <Row gutter={[32, 32]}>
        {features.map((feature, index) => (
          <Col xs={24} sm={12} lg={6} key={index}>
            <Card className={styles.featureCard}>
              <div className={styles.featureIcon}>{feature.icon}</div>
              <h3 className={styles.featureTitle}>{feature.title}</h3>
              <p className={styles.featureDescription}>{feature.description}</p>
            </Card>
          </Col>
        ))}
      </Row>

      <div className={styles.pagination}>
        <div className={styles.dots}>
          <span className={`${styles.dot} ${styles.active}`}></span>
          <span className={styles.dot}></span>
          <span className={styles.dot}></span>
          <span className={styles.dot}></span>
        </div>
      </div>
    </div>
  );
};

export default FeaturesSection;
