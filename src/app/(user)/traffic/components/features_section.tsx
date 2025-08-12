"use client";
import React from "react";
import { Card, Button } from "antd";
import {
  BarChartOutlined,
  TrophyOutlined,
  UserOutlined,
  EyeOutlined,
  ArrowRightOutlined,
} from "@ant-design/icons";
import styles from "./features_section.module.scss";

type Props = {};

const FeaturesSection = ({}: Props) => {
  const features = [
    {
      icon: <BarChartOutlined />,
      title: "Traffic Sources & Engagement",
      description:
        "See the channels bringing traffic to competitors and how visitors engage on their websites.",
      action: "Start now",
      color: "#6c5ce7",
    },
    {
      icon: <TrophyOutlined />,
      title: "Market & Industry Benchmarking",
      description:
        "Compare your market position, growth, and reach across 190+ markets to spot gaps and opportunities.",
      action: "Start now",
      color: "#a29bfe",
    },
    {
      icon: <UserOutlined />,
      title: "Audience Insights",
      description:
        "Explore audience demographics, behavior, income, and interests to refine targeting and discover new opportunities.",
      action: "Start now",
      color: "#fd79a8",
    },
    {
      icon: <EyeOutlined />,
      title: "Competitor Monitoring",
      description:
        "Get automated alerts on competitor campaigns, content, and shifts—so you can react first.",
      action: "Start now",
      color: "#00b894",
    },
  ];

  return (
    <div className={styles.featuresSection}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.title}>Explore in One Click</h2>
        </div>

        <div className={styles.featuresGrid}>
          {features.map((feature, index) => (
            <Card key={index} className={styles.featureCard} hoverable>
              <div className={styles.cardContent}>
                <div
                  className={styles.iconWrapper}
                  style={{
                    backgroundColor: `${feature.color}20`,
                    color: feature.color,
                  }}
                >
                  {feature.icon}
                </div>

                <h3 className={styles.featureTitle}>{feature.title}</h3>
                <p className={styles.featureDescription}>
                  {feature.description}
                </p>

                <Button
                  type="link"
                  className={styles.actionBtn}
                  style={{ color: feature.color }}
                >
                  {feature.action} <ArrowRightOutlined />
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FeaturesSection;
