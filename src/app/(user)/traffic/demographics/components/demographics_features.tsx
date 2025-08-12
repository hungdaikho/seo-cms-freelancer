"use client";

import React from "react";
import { Card, Row, Col } from "antd";
import {
  TbUsers,
  TbDeviceMobile,
  TbChartPie,
  TbTarget,
  TbMapPin,
  TbTrendingUp,
} from "react-icons/tb";
import styles from "./demographics_features.module.scss";

interface DemographicsFeature {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const features: DemographicsFeature[] = [
  {
    icon: <TbUsers />,
    title: "Age & Gender Analysis",
    description:
      "Analyze audience demographics by age groups and gender distribution, understanding the core demographic makeup of your target audience and competitors.",
  },
  {
    icon: <TbMapPin />,
    title: "Geographic Demographics",
    description:
      "Break down audience demographics by geographic regions, identifying location-specific demographic patterns and regional audience preferences.",
  },
  {
    icon: <TbDeviceMobile />,
    title: "Device Usage Patterns",
    description:
      "Understand how different demographic segments use various devices, optimizing your content and design for each audience segment's preferred devices.",
  },
  {
    icon: <TbChartPie />,
    title: "Demographic Segmentation",
    description:
      "Create detailed audience segments based on demographic characteristics, enabling more precise targeting and personalized marketing strategies.",
  },
  {
    icon: <TbTarget />,
    title: "Targeting Optimization",
    description:
      "Refine your targeting strategies using demographic insights, improving campaign effectiveness and audience engagement through data-driven decisions.",
  },
  {
    icon: <TbTrendingUp />,
    title: "Demographic Trends Tracking",
    description:
      "Monitor how demographic patterns change over time, identifying emerging audience segments and evolving demographic preferences in your market.",
  },
];

const DemographicsFeatures: React.FC = () => {
  return (
    <section className={styles.featuresSection}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.title}>Demographics Analysis Features</h2>
          <p className={styles.subtitle}>
            Comprehensive demographic analysis tools to understand your audience
            composition and refine targeting strategies for better campaign
            performance.
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

export default DemographicsFeatures;
