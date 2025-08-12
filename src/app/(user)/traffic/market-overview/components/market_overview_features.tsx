"use client";

import React from "react";
import { Card, Row, Col } from "antd";
import {
  TbChartLine,
  TbTrendingUp,
  TbTarget,
  TbBuildingStore,
  TbUsers,
  TbChartPie,
} from "react-icons/tb";
import styles from "./market_overview_features.module.scss";

interface MarketOverviewFeature {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const features: MarketOverviewFeature[] = [
  {
    icon: <TbChartLine />,
    title: "Market Size & Growth Analysis",
    description:
      "Analyze overall market size, growth rates, and expansion opportunities to understand the total addressable market and identify growth potential.",
  },
  {
    icon: <TbTrendingUp />,
    title: "Competitive Dynamics Tracking",
    description:
      "Monitor competitive landscape changes, track player movements, and identify emerging competitors that could impact your market position.",
  },
  {
    icon: <TbTarget />,
    title: "Market Share Visualization",
    description:
      "Visualize market share distribution among key players, understand competitive positioning, and track share shifts over time for strategic planning.",
  },
  {
    icon: <TbBuildingStore />,
    title: "Player Performance Benchmarking",
    description:
      "Compare performance metrics across industry players, benchmark your position against competitors, and identify best practices from market leaders.",
  },
  {
    icon: <TbUsers />,
    title: "Market Opportunity Identification",
    description:
      "Discover untapped market segments, identify whitespace opportunities, and find areas where competitors are underperforming or absent.",
  },
  {
    icon: <TbChartPie />,
    title: "Strategic Market Insights",
    description:
      "Get actionable insights on market trends, competitive threats, and strategic opportunities to inform business decisions and market strategies.",
  },
];

const MarketOverviewFeatures: React.FC = () => {
  return (
    <section className={styles.featuresSection}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.title}>Market Overview Analysis Features</h2>
          <p className={styles.subtitle}>
            Comprehensive market analysis tools to understand competitive
            dynamics, track growth opportunities, and shape strategic decisions.
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

export default MarketOverviewFeatures;
