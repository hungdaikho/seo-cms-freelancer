"use client";

import React from "react";
import { Card, Row, Col } from "antd";
import {
  GlobalOutlined,
  BarChartOutlined,
  RiseOutlined,
  TeamOutlined,
  TrophyOutlined,
  EnvironmentOutlined,
} from "@ant-design/icons";
import styles from "./business_regions_tracking.module.scss";

interface Feature {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const BusinessRegionsTracking: React.FC = () => {
  const trackingPoints = [
    "Compare regional traffic shares across key players",
    "Track rising and declining business regions",
    "Tailor strategy to where engagement is strongest",
  ];

  const features: Feature[] = [
    {
      icon: <GlobalOutlined className={styles.featureIcon} />,
      title: "Regional Traffic Analysis",
      description:
        "Compare traffic performance across EMEA, APAC, LATAM, and North America business regions.",
    },
    {
      icon: <BarChartOutlined className={styles.featureIcon} />,
      title: "Market Share Comparison",
      description:
        "Benchmark your regional performance against key competitors in major business markets.",
    },
    {
      icon: <RiseOutlined className={styles.featureIcon} />,
      title: "Growth Trend Monitoring",
      description:
        "Track rising and declining business regions to identify emerging market opportunities.",
    },
    {
      icon: <TeamOutlined className={styles.featureIcon} />,
      title: "Audience Engagement",
      description:
        "Understand how user engagement varies across different global business regions.",
    },
    {
      icon: <TrophyOutlined className={styles.featureIcon} />,
      title: "Strategic Optimization",
      description:
        "Tailor your regional strategy to focus on areas where engagement is strongest.",
    },
    {
      icon: <EnvironmentOutlined className={styles.featureIcon} />,
      title: "Regional Insights",
      description:
        "Evaluate traffic and engagement patterns to fine-tune international business strategies.",
    },
  ];

  return (
    <section className={styles.trackingSection}>
      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.leftSection}>
            <h2 className={styles.title}>
              Benchmark growth and audience behavior by region
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
                <span className={styles.dashboardTitle}>Business Regions</span>
              </div>

              <div className={styles.regionSection}>
                <div className={styles.businessMap}>
                  <svg viewBox="0 0 400 250" className={styles.mapSvg}>
                    {/* Business regions map */}
                    <rect
                      x="0"
                      y="0"
                      width="400"
                      height="250"
                      fill="#f8fbff"
                      stroke="#e6f3ff"
                    />

                    {/* North America */}
                    <path
                      d="M50 60 Q100 40 150 60 Q140 100 100 110 Q70 90 50 60 Z"
                      fill="#1890ff"
                      opacity="0.8"
                      className={styles.regionArea}
                    />
                    <text
                      x="100"
                      y="80"
                      textAnchor="middle"
                      fontSize="12"
                      fill="white"
                      fontWeight="600"
                    >
                      NA
                    </text>
                    <text
                      x="100"
                      y="95"
                      textAnchor="middle"
                      fontSize="8"
                      fill="white"
                    >
                      81%
                    </text>

                    {/* EMEA */}
                    <path
                      d="M200 50 Q250 40 300 60 Q290 90 250 100 Q210 80 200 50 Z"
                      fill="#52c41a"
                      opacity="0.7"
                      className={styles.regionArea}
                    />
                    <text
                      x="250"
                      y="70"
                      textAnchor="middle"
                      fontSize="12"
                      fill="white"
                      fontWeight="600"
                    >
                      EMEA
                    </text>
                    <text
                      x="250"
                      y="85"
                      textAnchor="middle"
                      fontSize="8"
                      fill="white"
                    >
                      35%
                    </text>

                    {/* APAC */}
                    <path
                      d="M300 120 Q350 110 380 140 Q370 170 330 180 Q310 150 300 120 Z"
                      fill="#722ed1"
                      opacity="0.6"
                      className={styles.regionArea}
                    />
                    <text
                      x="340"
                      y="145"
                      textAnchor="middle"
                      fontSize="12"
                      fill="white"
                      fontWeight="600"
                    >
                      APAC
                    </text>
                    <text
                      x="340"
                      y="160"
                      textAnchor="middle"
                      fontSize="8"
                      fill="white"
                    >
                      27%
                    </text>

                    {/* LATAM */}
                    <path
                      d="M80 140 Q120 130 140 160 Q130 190 90 200 Q70 170 80 140 Z"
                      fill="#fa8c16"
                      opacity="0.6"
                      className={styles.regionArea}
                    />
                    <text
                      x="110"
                      y="165"
                      textAnchor="middle"
                      fontSize="11"
                      fill="white"
                      fontWeight="600"
                    >
                      LATAM
                    </text>
                    <text
                      x="110"
                      y="180"
                      textAnchor="middle"
                      fontSize="8"
                      fill="white"
                    >
                      18%
                    </text>

                    {/* Business connections */}
                    <path
                      d="M150 80 Q200 60 200 70"
                      stroke="#1890ff"
                      strokeWidth="2"
                      fill="none"
                      opacity="0.5"
                    >
                      <animate
                        attributeName="opacity"
                        values="0.5;1;0.5"
                        dur="3s"
                        repeatCount="indefinite"
                      />
                    </path>
                    <path
                      d="M290 90 Q320 100 320 120"
                      stroke="#52c41a"
                      strokeWidth="2"
                      fill="none"
                      opacity="0.6"
                    >
                      <animate
                        attributeName="opacity"
                        values="0.6;1;0.6"
                        dur="2.5s"
                        repeatCount="indefinite"
                      />
                    </path>
                    <path
                      d="M140 160 Q200 140 250 100"
                      stroke="#722ed1"
                      strokeWidth="2"
                      fill="none"
                      opacity="0.4"
                    >
                      <animate
                        attributeName="opacity"
                        values="0.4;0.9;0.4"
                        dur="4s"
                        repeatCount="indefinite"
                      />
                    </path>
                  </svg>
                </div>

                <div className={styles.regionStats}>
                  <div className={styles.statsHeader}>
                    <span className={styles.statsIcon}>🌍</span>
                    <span className={styles.statsTitle}>Traffic Share</span>
                  </div>

                  <div className={styles.businessStats}>
                    <div className={styles.statItem}>
                      <span className={styles.regionCode}>NA</span>
                      <span className={styles.regionName}>North America</span>
                      <div className={styles.progressBar}>
                        <div
                          className={styles.progress}
                          style={{ width: "81%", backgroundColor: "#1890ff" }}
                        ></div>
                      </div>
                      <span className={styles.percentage}>81%</span>
                    </div>

                    <div className={styles.statItem}>
                      <span className={styles.regionCode}>EMEA</span>
                      <span className={styles.regionName}>
                        Europe, Middle East & Africa
                      </span>
                      <div className={styles.progressBar}>
                        <div
                          className={styles.progress}
                          style={{ width: "35%", backgroundColor: "#52c41a" }}
                        ></div>
                      </div>
                      <span className={styles.percentage}>35%</span>
                    </div>

                    <div className={styles.statItem}>
                      <span className={styles.regionCode}>APAC</span>
                      <span className={styles.regionName}>Asia Pacific</span>
                      <div className={styles.progressBar}>
                        <div
                          className={styles.progress}
                          style={{ width: "27%", backgroundColor: "#722ed1" }}
                        ></div>
                      </div>
                      <span className={styles.percentage}>27%</span>
                    </div>

                    <div className={styles.statItem}>
                      <span className={styles.regionCode}>LATAM</span>
                      <span className={styles.regionName}>Latin America</span>
                      <div className={styles.progressBar}>
                        <div
                          className={styles.progress}
                          style={{ width: "18%", backgroundColor: "#fa8c16" }}
                        ></div>
                      </div>
                      <span className={styles.percentage}>18%</span>
                    </div>
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

export default BusinessRegionsTracking;
