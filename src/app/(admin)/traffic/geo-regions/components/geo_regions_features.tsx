"use client";

import React from "react";
import { Card, Row, Col } from "antd";
import {
  TbWorld,
  TbMapPin,
  TbChartAreaLine,
  TbTarget,
  TbTrendingUp,
  TbUsers,
} from "react-icons/tb";
import styles from "./geo_regions_features.module.scss";

interface GeoRegionsFeature {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const features: GeoRegionsFeature[] = [
  {
    icon: <TbWorld />,
    title: "Global Geographic Analysis",
    description:
      "Analyze traffic patterns across all major geographical regions worldwide, from continent-level down to country-specific insights for comprehensive global understanding.",
  },
  {
    icon: <TbMapPin />,
    title: "Regional Performance Mapping",
    description:
      "Visualize how different geographic regions perform for your website, identifying high-converting areas and opportunities for regional expansion.",
  },
  {
    icon: <TbChartAreaLine />,
    title: "Geographic Trend Analysis",
    description:
      "Track traffic trends and seasonal patterns specific to different geographical regions, helping you optimize timing for regional campaigns.",
  },
  {
    icon: <TbTarget />,
    title: "Regional Targeting Optimization",
    description:
      "Optimize your content and marketing strategies for specific geographic regions based on detailed traffic behavior and engagement data.",
  },
  {
    icon: <TbTrendingUp />,
    title: "Geographic Growth Tracking",
    description:
      "Monitor traffic growth across different regions, identify emerging markets, and track the success of geographic expansion efforts.",
  },
  {
    icon: <TbUsers />,
    title: "Regional Audience Insights",
    description:
      "Understand user behavior differences across geographic regions, including engagement patterns, preferences, and conversion characteristics.",
  },
];

const GeoRegionsFeatures: React.FC = () => {
  return (
    <section className={styles.featuresSection}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.title}>
            Geographic Regions Traffic Analysis Features
          </h2>
          <p className={styles.subtitle}>
            Comprehensive geographic analysis tools to understand regional
            traffic patterns and optimize your global reach strategy.
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

export default GeoRegionsFeatures;
