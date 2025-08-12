"use client";

import React from "react";
import { Card, Row, Col } from "antd";
import {
  GlobalOutlined,
  BarChartOutlined,
  UserOutlined,
  LineChartOutlined,
  FlagOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import styles from "./countries_tracking.module.scss";

interface Feature {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const CountriesTracking: React.FC = () => {
  const trackingPoints = [
    "Track competitor traffic by country",
    "See how engagement varies regionally",
    "Identify top-performing content by country",
  ];

  const features: Feature[] = [
    {
      icon: <GlobalOutlined className={styles.featureIcon} />,
      title: "Global Traffic Analysis",
      description:
        "Analyze traffic patterns across different countries and regions to understand global reach.",
    },
    {
      icon: <BarChartOutlined className={styles.featureIcon} />,
      title: "Regional Benchmarking",
      description:
        "Compare traffic performance between countries to identify market opportunities.",
    },
    {
      icon: <UserOutlined className={styles.featureIcon} />,
      title: "Audience Behavior",
      description:
        "Understand how user engagement and behavior varies across different geographical regions.",
    },
    {
      icon: <LineChartOutlined className={styles.featureIcon} />,
      title: "International Trends",
      description:
        "Track traffic trends and seasonal patterns across multiple countries and markets.",
    },
    {
      icon: <FlagOutlined className={styles.featureIcon} />,
      title: "Market Insights",
      description:
        "Identify which countries drive the most valuable traffic and conversions for competitors.",
    },
    {
      icon: <SearchOutlined className={styles.featureIcon} />,
      title: "Content Localization",
      description:
        "Discover top-performing content by country to fine-tune international messaging strategies.",
    },
  ];

  return (
    <section className={styles.trackingSection}>
      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.leftSection}>
            <h2 className={styles.title}>
              Compare country-level traffic patterns and audience behavior
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
                <span className={styles.dashboardTitle}>Countries</span>
              </div>

              <div className={styles.mapSection}>
                <div className={styles.worldMap}>
                  <svg viewBox="0 0 400 200" className={styles.mapSvg}>
                    {/* Simplified world map outline */}
                    <rect
                      x="0"
                      y="0"
                      width="400"
                      height="200"
                      fill="#f8fbff"
                      stroke="#e6f3ff"
                    />

                    {/* North America */}
                    <path
                      d="M50 60 Q80 40 120 60 Q110 90 80 100 Q60 80 50 60 Z"
                      fill="#1890ff"
                      opacity="0.8"
                      className={styles.countryRegion}
                    />

                    {/* Europe */}
                    <path
                      d="M180 50 Q200 40 220 50 Q210 70 190 80 Q170 60 180 50 Z"
                      fill="#52c41a"
                      opacity="0.7"
                      className={styles.countryRegion}
                    />

                    {/* Asia */}
                    <path
                      d="M250 40 Q300 30 350 60 Q340 90 290 100 Q240 70 250 40 Z"
                      fill="#722ed1"
                      opacity="0.6"
                      className={styles.countryRegion}
                    />

                    {/* Traffic indicators */}
                    <circle cx="85" cy="70" r="8" fill="#1890ff">
                      <animate
                        attributeName="r"
                        values="8;12;8"
                        dur="3s"
                        repeatCount="indefinite"
                      />
                    </circle>
                    <text
                      x="85"
                      y="75"
                      textAnchor="middle"
                      fontSize="8"
                      fill="white"
                      fontWeight="600"
                    >
                      US
                    </text>

                    <circle cx="195" cy="60" r="6" fill="#52c41a">
                      <animate
                        attributeName="r"
                        values="6;9;6"
                        dur="2.5s"
                        repeatCount="indefinite"
                      />
                    </circle>
                    <text
                      x="195"
                      y="64"
                      textAnchor="middle"
                      fontSize="7"
                      fill="white"
                      fontWeight="600"
                    >
                      CA
                    </text>

                    <circle cx="300" cy="65" r="5" fill="#722ed1">
                      <animate
                        attributeName="r"
                        values="5;8;5"
                        dur="2s"
                        repeatCount="indefinite"
                      />
                    </circle>
                    <text
                      x="300"
                      y="69"
                      textAnchor="middle"
                      fontSize="6"
                      fill="white"
                      fontWeight="600"
                    >
                      NO
                    </text>
                  </svg>
                </div>

                <div className={styles.trafficStats}>
                  <div className={styles.statsHeader}>
                    <span className={styles.statsIcon}>📊</span>
                    <span className={styles.statsTitle}>Traffic Share</span>
                  </div>

                  <div className={styles.countryStats}>
                    <div className={styles.statItem}>
                      <span className={styles.flag}>🇺🇸</span>
                      <span className={styles.countryName}>US</span>
                      <div className={styles.progressBar}>
                        <div
                          className={styles.progress}
                          style={{ width: "75.3%", backgroundColor: "#1890ff" }}
                        ></div>
                      </div>
                      <span className={styles.percentage}>75.3%</span>
                    </div>

                    <div className={styles.statItem}>
                      <span className={styles.flag}>🇨🇦</span>
                      <span className={styles.countryName}>CA</span>
                      <div className={styles.progressBar}>
                        <div
                          className={styles.progress}
                          style={{ width: "27.1%", backgroundColor: "#52c41a" }}
                        ></div>
                      </div>
                      <span className={styles.percentage}>27.1%</span>
                    </div>

                    <div className={styles.statItem}>
                      <span className={styles.flag}>🇳🇴</span>
                      <span className={styles.countryName}>NO</span>
                      <div className={styles.progressBar}>
                        <div
                          className={styles.progress}
                          style={{ width: "21.5%", backgroundColor: "#722ed1" }}
                        ></div>
                      </div>
                      <span className={styles.percentage}>21.5%</span>
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

export default CountriesTracking;
