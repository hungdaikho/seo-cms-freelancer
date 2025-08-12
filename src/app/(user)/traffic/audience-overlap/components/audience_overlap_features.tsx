"use client";

import React from "react";
import { Card, Row, Col } from "antd";
import {
  TbUsers,
  TbTarget,
  TbChartAreaLine,
  TbBuildingStore,
  TbTrendingUp,
  TbUserSearch,
} from "react-icons/tb";
import styles from "./audience_overlap_features.module.scss";

interface AudienceOverlapFeature {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const features: AudienceOverlapFeature[] = [
  {
    icon: <TbUsers />,
    title: "Audience Crossover Analysis",
    description:
      "Discover shared visitors between your website and competitors, identifying the overlap in your target audiences and understanding visitor behavior patterns.",
  },
  {
    icon: <TbTarget />,
    title: "Untapped Segment Identification",
    description:
      "Find audience segments that competitors are reaching but you're not, revealing new targeting opportunities and potential market expansion areas.",
  },
  {
    icon: <TbChartAreaLine />,
    title: "Overlap Trend Monitoring",
    description:
      "Track how audience overlap changes over time, monitoring the effectiveness of your targeting strategies and competitive positioning efforts.",
  },
  {
    icon: <TbBuildingStore />,
    title: "Competitor Audience Insights",
    description:
      "Analyze competitor audience profiles to understand their visitor demographics, interests, and behavior patterns for strategic planning.",
  },
  {
    icon: <TbTrendingUp />,
    title: "Expansion Opportunity Scoring",
    description:
      "Get data-driven scores for audience expansion opportunities, helping you prioritize which segments to target for maximum growth potential.",
  },
  {
    icon: <TbUserSearch />,
    title: "Visitor Journey Mapping",
    description:
      "Understand how shared visitors navigate between your site and competitors, revealing content gaps and optimization opportunities.",
  },
];

const AudienceOverlapFeatures: React.FC = () => {
  return (
    <section className={styles.featuresSection}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.title}>Audience Overlap Analysis Features</h2>
          <p className={styles.subtitle}>
            Comprehensive audience analysis tools to identify shared visitors,
            untapped segments, and expansion opportunities for strategic growth.
          </p>
        </div>

        <div className={styles.featuresGrid}>
          <Row gutter={[24, 24]}>
            {features.map((feature, index) => (
              <Col xs={24} md={12} lg={8} key={index}>
                <Card className={styles.featureCard}>
                  <div className={styles.featureContent}>
                    <div className={styles.iconWrapper}>
                      <div className={styles.featureIcon}>{feature.icon}</div>
                    </div>
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
      </div>
    </section>
  );
};

export default AudienceOverlapFeatures;
