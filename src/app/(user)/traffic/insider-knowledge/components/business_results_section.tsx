"use client";
import React from "react";
import { Card, Button } from "antd";
import {
  BarChartOutlined,
  TrophyOutlined,
  FileTextOutlined,
  AreaChartOutlined,
  ArrowRightOutlined,
} from "@ant-design/icons";
import styles from "./business_results_section.module.scss";

type Props = {};

const BusinessResultsSection = ({}: Props) => {
  const features = [
    {
      icon: <BarChartOutlined />,
      title: "Use Cases",
      description:
        "Solve business challenges with expert-led, step-by-step strategies.",
      action: "Explore use cases",
      color: "#667eea",
      badge: "Traffic Trend",
    },
    {
      icon: <TrophyOutlined />,
      title: "Success Stories",
      description: "Learn from real businesses using data to drive growth.",
      action: "Explore success stories",
      color: "#764ba2",
      badge: "LaLiga",
    },
    {
      icon: <FileTextOutlined />,
      title: "Templates",
      description:
        "Streamline research with interactive tools and expert-built frameworks.",
      action: "",
      color: "#f093fb",
      badge: "Soon",
    },
    {
      icon: <AreaChartOutlined />,
      title: "Reports",
      description:
        "Gain expert insights on market trends and competitive shifts.",
      action: "",
      color: "#f093fb",
      badge: "Soon",
    },
  ];

  return (
    <div className={styles.businessSection}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.title}>
            Boost business results with Insider Knowledge from Semrush Traffic &
            Market
          </h2>
        </div>

        <div className={styles.featuresGrid}>
          {features.map((feature, index) => (
            <Card
              key={index}
              className={styles.featureCard}
              hoverable={!!feature.action}
            >
              <div className={styles.cardContent}>
                <div className={styles.cardHeader}>
                  <div className={styles.mockupArea}>
                    {feature.badge && (
                      <div
                        className={styles.badge}
                        style={{ backgroundColor: feature.color }}
                      >
                        {feature.badge}
                      </div>
                    )}

                    <div className={styles.iconWrapper}>{feature.icon}</div>

                    {index === 1 && (
                      <div className={styles.successMetric}>
                        <span className={styles.metricValue}>↗ 17M</span>
                      </div>
                    )}
                  </div>
                </div>

                <div className={styles.cardBody}>
                  <h3 className={styles.featureTitle}>{feature.title}</h3>
                  <p className={styles.featureDescription}>
                    {feature.description}
                  </p>

                  {feature.action ? (
                    <Button
                      type="link"
                      className={styles.actionBtn}
                      style={{ color: feature.color }}
                    >
                      {feature.action} <ArrowRightOutlined />
                    </Button>
                  ) : (
                    <div className={styles.comingSoon}>
                      <span className={styles.soonBadge}>Soon</span>
                    </div>
                  )}
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BusinessResultsSection;
