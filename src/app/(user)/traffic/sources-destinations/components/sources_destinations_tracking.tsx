"use client";

import React from "react";
import { Card, Row, Col } from "antd";
import {
  FunnelPlotOutlined,
  BarChartOutlined,
  SwapOutlined,
  GlobalOutlined,
  DesktopOutlined,
  RiseOutlined,
} from "@ant-design/icons";
import styles from "./sources_destinations_tracking.module.scss";

interface Feature {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const SourcesDestinationsTracking: React.FC = () => {
  const trackingPoints = [
    "Identify channels and websites driving traffic",
    "See where users go after leaving competitor domains",
    "Use channel data to rebalance your acquisition strategy",
  ];

  const features: Feature[] = [
    {
      icon: <FunnelPlotOutlined className={styles.featureIcon} />,
      title: "Traffic Flow Analysis",
      description:
        "Map complete user journeys from traffic sources to final destinations across competitor websites.",
    },
    {
      icon: <BarChartOutlined className={styles.featureIcon} />,
      title: "Channel Performance",
      description:
        "Compare the effectiveness of different traffic channels and identify high-performing sources.",
    },
    {
      icon: <SwapOutlined className={styles.featureIcon} />,
      title: "Acquisition Insights",
      description:
        "Understand how competitors acquire traffic and optimize your own acquisition strategy.",
    },
    {
      icon: <GlobalOutlined className={styles.featureIcon} />,
      title: "Referral Tracking",
      description:
        "Discover which websites and platforms are sending the most valuable traffic to competitors.",
    },
    {
      icon: <DesktopOutlined className={styles.featureIcon} />,
      title: "Cross-Domain Analysis",
      description:
        "Track user movement between multiple domains and identify partnership opportunities.",
    },
    {
      icon: <RiseOutlined className={styles.featureIcon} />,
      title: "Growth Opportunities",
      description:
        "Find untapped traffic sources and potential channels for expanding your reach.",
    },
  ];

  return (
    <section className={styles.trackingSection}>
      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.leftSection}>
            <h2 className={styles.title}>
              Discover top inbound and outbound traffic sources
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
                <span className={styles.dashboardTitle}>
                  Traffic Flow Analysis
                </span>
              </div>

              <div className={styles.flowSection}>
                <div className={styles.sourcesColumn}>
                  <h4 className={styles.columnTitle}>Top Sources</h4>
                  <div className={styles.sourcesList}>
                    <div className={styles.sourceItem}>
                      <span className={styles.sourceName}>Direct</span>
                      <div className={styles.progressBar}>
                        <div
                          className={styles.progress}
                          style={{ width: "45%" }}
                        ></div>
                      </div>
                      <span className={styles.percentage}>30.5%</span>
                    </div>
                    <div className={styles.sourceItem}>
                      <span className={styles.sourceName}>Google Organic</span>
                      <div className={styles.progressBar}>
                        <div
                          className={styles.progress}
                          style={{ width: "38%" }}
                        ></div>
                      </div>
                      <span className={styles.percentage}>30.1%</span>
                    </div>
                    <div className={styles.sourceItem}>
                      <span className={styles.sourceName}>Google Paid</span>
                      <div className={styles.progressBar}>
                        <div
                          className={styles.progress}
                          style={{ width: "35%" }}
                        ></div>
                      </div>
                      <span className={styles.percentage}>30.1%</span>
                    </div>
                    <div className={styles.sourceItem}>
                      <span className={styles.sourceName}>facebook.com</span>
                      <div className={styles.progressBar}>
                        <div
                          className={styles.progress}
                          style={{ width: "10%" }}
                        ></div>
                      </div>
                      <span className={styles.percentage}>0.84%</span>
                    </div>
                  </div>
                </div>

                <div className={styles.flowVisualization}>
                  <svg className={styles.flowChart} viewBox="0 0 120 200">
                    {/* Central domain circle */}
                    <circle
                      cx="60"
                      cy="100"
                      r="25"
                      fill="#1890ff"
                      fillOpacity="0.1"
                      stroke="#1890ff"
                      strokeWidth="2"
                    />
                    <text
                      x="60"
                      y="105"
                      textAnchor="middle"
                      fontSize="10"
                      fill="#1890ff"
                      fontWeight="600"
                    >
                      amazon.com
                    </text>

                    {/* Flow connections */}
                    <path
                      d="M35 100 Q20 80 20 60"
                      stroke="#40a9ff"
                      strokeWidth="2"
                      fill="none"
                      opacity="0.6"
                    />
                    <path
                      d="M35 100 Q20 90 20 80"
                      stroke="#52c41a"
                      strokeWidth="2"
                      fill="none"
                      opacity="0.6"
                    />
                    <path
                      d="M35 100 Q20 110 20 120"
                      stroke="#722ed1"
                      strokeWidth="2"
                      fill="none"
                      opacity="0.6"
                    />

                    <path
                      d="M85 100 Q100 80 100 60"
                      stroke="#f759ab"
                      strokeWidth="2"
                      fill="none"
                      opacity="0.6"
                    />
                    <path
                      d="M85 100 Q100 110 100 130"
                      stroke="#fa8c16"
                      strokeWidth="2"
                      fill="none"
                      opacity="0.6"
                    />
                    <path
                      d="M85 100 Q100 120 100 150"
                      stroke="#13c2c2"
                      strokeWidth="2"
                      fill="none"
                      opacity="0.6"
                    />

                    {/* Animated flow dots */}
                    <circle r="2" fill="#1890ff">
                      <animateMotion dur="3s" repeatCount="indefinite">
                        <path d="M20 80 Q35 90 60 100" />
                      </animateMotion>
                    </circle>
                    <circle r="2" fill="#52c41a">
                      <animateMotion dur="2.5s" repeatCount="indefinite">
                        <path d="M20 120 Q35 110 60 100" />
                      </animateMotion>
                    </circle>
                    <circle r="2" fill="#f759ab">
                      <animateMotion dur="4s" repeatCount="indefinite">
                        <path d="M60 100 Q85 90 100 80" />
                      </animateMotion>
                    </circle>
                  </svg>
                </div>

                <div className={styles.destinationsColumn}>
                  <h4 className={styles.columnTitle}>Top Destinations</h4>
                  <div className={styles.destinationsList}>
                    <div className={styles.destinationItem}>
                      <span className={styles.destinationName}>google.com</span>
                      <span className={styles.percentage}>37.5%</span>
                    </div>
                    <div className={styles.destinationItem}>
                      <span className={styles.destinationName}>ebay.com</span>
                      <span className={styles.percentage}>24.4%</span>
                    </div>
                    <div className={styles.destinationItem}>
                      <span className={styles.destinationName}>
                        facebook.com
                      </span>
                      <span className={styles.percentage}>7.86%</span>
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

export default SourcesDestinationsTracking;
