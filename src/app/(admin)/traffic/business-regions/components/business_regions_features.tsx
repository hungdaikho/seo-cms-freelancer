"use client";

import React from "react";
import { Card, Row, Col } from "antd";
import {
  TbChartAreaLine,
  TbBuildingStore,
  TbMapPin,
  TbTrendingUp,
  TbWorld,
  TbUsers,
} from "react-icons/tb";
import styles from "./business_regions_features.module.scss";

interface BusinessRegionsFeature {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const features: BusinessRegionsFeature[] = [
  {
    icon: <TbWorld />,
    title: "Regional Traffic Distribution",
    description:
      "Analyze how your business traffic is distributed across major regions including North America, EMEA, APAC, and Latin America with detailed market penetration insights.",
  },
  {
    icon: <TbBuildingStore />,
    title: "Market Share Analysis",
    description:
      "Compare your business performance against competitors in each region, identifying opportunities for market expansion and competitive positioning.",
  },
  {
    icon: <TbTrendingUp />,
    title: "Growth Opportunity Mapping",
    description:
      "Discover emerging markets and high-growth regions where your business can expand, with data-driven insights on regional market potential.",
  },
  {
    icon: <TbUsers />,
    title: "Regional User Behavior",
    description:
      "Understand how users from different business regions interact with your site, including engagement patterns and conversion preferences.",
  },
  {
    icon: <TbMapPin />,
    title: "Geographic Expansion Planning",
    description:
      "Plan your business expansion strategy with comprehensive regional analysis, helping you prioritize markets and allocate resources effectively.",
  },
  {
    icon: <TbChartAreaLine />,
    title: "Business Region ROI Tracking",
    description:
      "Track return on investment for each business region, measuring the effectiveness of regional marketing campaigns and business initiatives.",
  },
];

const BusinessRegionsFeatures: React.FC = () => {
  return (
    <section className={styles.featuresSection}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.title}>
            Business Regions Traffic Analysis Features
          </h2>
          <p className={styles.subtitle}>
            Comprehensive regional analysis tools to understand your global
            business traffic distribution and optimize market strategies.
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

export default BusinessRegionsFeatures;
