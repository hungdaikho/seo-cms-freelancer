"use client";

import React from "react";
import { Card, Row, Col } from "antd";
import {
  DesktopOutlined,
  MobileOutlined,
  EyeOutlined,
  BarChartOutlined,
  PlayCircleOutlined,
  TrophyOutlined,
} from "@ant-design/icons";
import styles from "./display_tracking_section.module.scss";

interface Feature {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const DisplayTrackingSection: React.FC = () => {
  const trackingPoints = [
    "Track traffic from display ads by device",
    "Find pages getting the most ad-driven traffic",
    "Spot new competitor campaigns and measure impacts",
  ];

  const features: Feature[] = [
    {
      icon: <EyeOutlined className={styles.featureIcon} />,
      title: "Ad Visibility Tracking",
      description:
        "Monitor display ad visibility and impression metrics across different websites and platforms.",
    },
    {
      icon: <BarChartOutlined className={styles.featureIcon} />,
      title: "Campaign Performance",
      description:
        "Analyze the performance of display advertising campaigns and their impact on website traffic.",
    },
    {
      icon: <DesktopOutlined className={styles.featureIcon} />,
      title: "Cross-Device Analysis",
      description:
        "Compare display ad performance across desktop, mobile, and tablet devices for optimization.",
    },
    {
      icon: <PlayCircleOutlined className={styles.featureIcon} />,
      title: "Creative Intelligence",
      description:
        "Discover which display ad creatives and formats drive the most engagement and conversions.",
    },
    {
      icon: <MobileOutlined className={styles.featureIcon} />,
      title: "Placement Optimization",
      description:
        "Identify the most effective ad placements and websites for reaching your target audience.",
    },
    {
      icon: <TrophyOutlined className={styles.featureIcon} />,
      title: "Competitive Insights",
      description:
        "Monitor competitor display advertising strategies and identify new market opportunities.",
    },
  ];

  return (
    <section className={styles.trackingSection}>
      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.leftSection}>
            <h2 className={styles.title}>
              Track display traffic over time and measure the impacts
            </h2>
            <ul className={styles.trackingList}>
              {trackingPoints.map((point, index) => (
                <li key={index} className={styles.trackingItem}>
                  <span className={styles.bullet}>•</span>
                  {point}
                </li>
              ))}
            </ul>
          </div>

          <div className={styles.rightSection}>
            <div className={styles.dashboardPreview}>
              <div className={styles.dashboardHeader}>
                <span className={styles.dashboardTitle}>Display Ads</span>
              </div>
              <div className={styles.chartArea}>
                <svg className={styles.chart} viewBox="0 0 200 80">
                  <polyline
                    points="10,55 30,50 50,45 70,30 90,35 110,20 130,25 150,15 170,20 190,10"
                    fill="none"
                    stroke="#ec4899"
                    strokeWidth="3"
                    strokeLinecap="round"
                  />
                  <circle cx="70" cy="30" r="2" fill="#ec4899" />
                  <circle cx="110" cy="20" r="2" fill="#ec4899" />
                  <circle cx="150" cy="15" r="2" fill="#ec4899" />
                  <circle cx="190" cy="10" r="3" fill="#ec4899" />
                </svg>
                <div className={styles.dateLabels}>
                  <span>May 8</span>
                  <span>May 9</span>
                  <span>May 10</span>
                  <span>May 11</span>
                  <span>May 12</span>
                  <span>May 13</span>
                </div>
              </div>
              <div className={styles.deviceStats}>
                <div className={styles.pieChart}>
                  <svg className={styles.pie} viewBox="0 0 120 120">
                    <circle
                      cx="60"
                      cy="60"
                      r="40"
                      fill="none"
                      stroke="#fdf2f8"
                      strokeWidth="20"
                    />
                    <circle
                      cx="60"
                      cy="60"
                      r="40"
                      fill="none"
                      stroke="#ec4899"
                      strokeWidth="20"
                      strokeDasharray="175 251"
                      strokeDashoffset="0"
                      transform="rotate(-90 60 60)"
                    />
                    <circle
                      cx="60"
                      cy="60"
                      r="40"
                      fill="none"
                      stroke="#f9a8d4"
                      strokeWidth="20"
                      strokeDasharray="75 251"
                      strokeDashoffset="-175"
                      transform="rotate(-90 60 60)"
                    />
                  </svg>
                  <div className={styles.centerText}>
                    <div className={styles.totalVisits}>305.7M</div>
                    <div className={styles.visitsLabel}>Visits</div>
                  </div>
                </div>
                <div className={styles.legend}>
                  <div className={styles.legendItem}>
                    <div
                      className={styles.legendColor}
                      style={{ backgroundColor: "#ec4899" }}
                    ></div>
                    <span className={styles.legendText}>Desktop</span>
                  </div>
                  <div className={styles.legendItem}>
                    <div
                      className={styles.legendColor}
                      style={{ backgroundColor: "#f9a8d4" }}
                    ></div>
                    <span className={styles.legendText}>Mobile</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.featuresGrid}>
          <Row gutter={[24, 24]}>
            {features.map((feature, index) => (
              <Col xs={24} sm={12} lg={8} key={index}>
                <Card className={styles.featureCard} bordered={false}>
                  <div className={styles.featureContent}>
                    <div className={styles.iconWrapper}>{feature.icon}</div>
                    <h4 className={styles.featureTitle}>{feature.title}</h4>
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

export default DisplayTrackingSection;
