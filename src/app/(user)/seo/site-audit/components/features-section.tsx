"use client";

import React from "react";
import { Row, Col } from "antd";
import styles from "./features-section.module.scss";

interface Feature {
  icon: string;
  title: string;
  description: string;
}

interface FeaturesSectionProps {}

const FeaturesSection: React.FC<FeaturesSectionProps> = () => {
  const features: Feature[] = [
    {
      icon: "🔍",
      title: "Comprehensive Checks",
      description:
        "Site Audit performs over 140 checks covering technical SEO and site health issues. It will catch broken internal and external links, missing or duplicate meta tags, orphaned pages, images with no alt text, and much more.",
    },
    {
      icon: "📋",
      title: "Prioritized Issues List",
      description:
        "The results of your website audit are organized by severity, meaning issues with the greatest impact on your site's SEO performance are prioritized. This enables you to spend your energy focusing on the most important problems first.",
    },
    {
      icon: "🛠️",
      title: "Actionable Recommendations",
      description:
        "For each issue it detects, Site Audit provides a clear explanation and detailed recommendations on how to resolve it. Think of it like a custom to-do list for your website.",
    },
    {
      icon: "👥",
      title: "No Expertise Needed",
      description:
        "You don't have to be an SEO or technical expert to interpret the results. The Site Audit report includes visuals and plain English to explain the issues with your website and why they matter.",
    },
  ];

  return (
    <div className={styles.featuresSection}>
      <div className={styles.sectionHeader}>
        <h2 className={styles.sectionTitle}>
          Identify and Fix Critical SEO Issues
        </h2>
        <p className={styles.sectionSubtitle}>
          One of the biggest benefits of this website audit tool is the ability
          to identify SEO issues across your entire website and fix them before
          they hurt your rankings.
        </p>
      </div>

      <Row gutter={[32, 32]}>
        {features.map((feature, index) => (
          <Col xs={24} md={12} key={index}>
            <div className={styles.featureItem}>
              <div className={styles.featureIcon}>{feature.icon}</div>
              <div className={styles.featureContent}>
                <h3 className={styles.featureTitle}>{feature.title}</h3>
                <p className={styles.featureDescription}>
                  {feature.description}
                </p>
              </div>
            </div>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default FeaturesSection;
