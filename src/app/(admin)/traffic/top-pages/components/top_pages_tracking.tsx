"use client";

import React from "react";
import { Card, Row, Col } from "antd";
import {
  FileTextOutlined,
  BarChartOutlined,
  EyeOutlined,
  ClockCircleOutlined,
  RiseOutlined,
  TrophyOutlined,
} from "@ant-design/icons";
import styles from "./top_pages_tracking.module.scss";

interface Feature {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const TopPagesTracking: React.FC = () => {
  const trackingPoints = [
    "Identify competitor pages drawing the most visitors",
    "Catch surges tied to new launches, campaigns, or events",
    "Spot pages that keep users engaged the longest",
  ];

  const features: Feature[] = [
    {
      icon: <FileTextOutlined className={styles.featureIcon} />,
      title: "Page Performance Analysis",
      description:
        "Analyze which pages drive the most traffic and understand what makes them successful.",
    },
    {
      icon: <BarChartOutlined className={styles.featureIcon} />,
      title: "Traffic Volume Tracking",
      description:
        "Monitor page-level traffic volumes and identify trending content across competitor sites.",
    },
    {
      icon: <EyeOutlined className={styles.featureIcon} />,
      title: "Engagement Metrics",
      description:
        "Discover pages with highest engagement rates and longest user session durations.",
    },
    {
      icon: <ClockCircleOutlined className={styles.featureIcon} />,
      title: "Trend Detection",
      description:
        "Spot content trends and seasonal patterns in competitor page performance over time.",
    },
    {
      icon: <RiseOutlined className={styles.featureIcon} />,
      title: "Growth Opportunities",
      description:
        "Identify high-performing page types and content strategies to replicate success.",
    },
    {
      icon: <TrophyOutlined className={styles.featureIcon} />,
      title: "Competitive Benchmarking",
      description:
        "Compare your page performance against competitor top pages and industry standards.",
    },
  ];

  return (
    <section className={styles.trackingSection}>
      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.leftSection}>
            <h2 className={styles.title}>
              Discover top pages, key launches, and what drives engagement
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
                <span className={styles.dashboardTitle}>Top Pages</span>
              </div>

              <div className={styles.pagesTable}>
                <div className={styles.tableHeader}>
                  <span className={styles.pageColumn}>Page</span>
                  <span className={styles.trafficColumn}>Traffic Share</span>
                  <span className={styles.trendColumn}>1Y Trend</span>
                  <span className={styles.visitsColumn}>Visits</span>
                </div>

                <div className={styles.pageRow}>
                  <span className={styles.pageName}>Home Page</span>
                  <div className={styles.trafficBar}>
                    <div
                      className={styles.trafficProgress}
                      style={{ width: "53%" }}
                    ></div>
                    <span className={styles.trafficPercent}>53%</span>
                  </div>
                  <div className={styles.trendChart}>
                    <svg viewBox="0 0 40 20" className={styles.miniChart}>
                      <polyline
                        points="2,15 8,12 14,8 20,10 26,6 32,4 38,3"
                        fill="none"
                        stroke="#52c41a"
                        strokeWidth="2"
                      />
                    </svg>
                  </div>
                  <span className={styles.visits}>750M</span>
                </div>

                <div className={styles.pageRow}>
                  <span className={styles.pageName}>/gp/signin</span>
                  <div className={styles.trafficBar}>
                    <div
                      className={styles.trafficProgress}
                      style={{ width: "43%" }}
                    ></div>
                    <span className={styles.trafficPercent}>43%</span>
                  </div>
                  <div className={styles.trendChart}>
                    <svg viewBox="0 0 40 20" className={styles.miniChart}>
                      <polyline
                        points="2,12 8,10 14,14 20,11 26,9 32,7 38,8"
                        fill="none"
                        stroke="#1890ff"
                        strokeWidth="2"
                      />
                    </svg>
                  </div>
                  <span className={styles.visits}>-</span>
                </div>

                <div className={styles.pageRow}>
                  <span className={styles.pageName}>/gp/</span>
                  <div className={styles.trafficBar}>
                    <div
                      className={styles.trafficProgress}
                      style={{ width: "35%" }}
                    ></div>
                    <span className={styles.trafficPercent}>35%</span>
                  </div>
                  <div className={styles.trendChart}>
                    <svg viewBox="0 0 40 20" className={styles.miniChart}>
                      <polyline
                        points="2,16 8,13 14,10 20,12 26,8 32,6 38,5"
                        fill="none"
                        stroke="#722ed1"
                        strokeWidth="2"
                      />
                    </svg>
                  </div>
                  <span className={styles.visits}>-</span>
                </div>

                <div className={styles.pageRow}>
                  <span className={styles.pageName}>/cart</span>
                  <div className={styles.trafficBar}>
                    <div
                      className={styles.trafficProgress}
                      style={{ width: "27%" }}
                    ></div>
                    <span className={styles.trafficPercent}>27%</span>
                  </div>
                  <div className={styles.trendChart}>
                    <svg viewBox="0 0 40 20" className={styles.miniChart}>
                      <polyline
                        points="2,14 8,16 14,12 20,9 26,11 32,8 38,6"
                        fill="none"
                        stroke="#fa8c16"
                        strokeWidth="2"
                      />
                    </svg>
                  </div>
                  <span className={styles.visits}>-</span>
                </div>
              </div>

              <div className={styles.totalVisits}>
                <div className={styles.visitsPieChart}>
                  <svg viewBox="0 0 100 100" className={styles.pieChart}>
                    <circle
                      cx="50"
                      cy="50"
                      r="35"
                      fill="none"
                      stroke="#f0f0f0"
                      strokeWidth="15"
                    />
                    <circle
                      cx="50"
                      cy="50"
                      r="35"
                      fill="none"
                      stroke="#1890ff"
                      strokeWidth="15"
                      strokeDasharray="110 220"
                      strokeDashoffset="0"
                      transform="rotate(-90 50 50)"
                    />
                    <circle
                      cx="50"
                      cy="50"
                      r="35"
                      fill="none"
                      stroke="#52c41a"
                      strokeWidth="15"
                      strokeDasharray="75 220"
                      strokeDashoffset="-110"
                      transform="rotate(-90 50 50)"
                    />
                    <circle
                      cx="50"
                      cy="50"
                      r="35"
                      fill="none"
                      stroke="#722ed1"
                      strokeWidth="15"
                      strokeDasharray="55 220"
                      strokeDashoffset="-185"
                      transform="rotate(-90 50 50)"
                    />
                  </svg>
                  <div className={styles.centerText}>
                    <div className={styles.totalNumber}>820.4M</div>
                    <div className={styles.totalLabel}>Total Visits</div>
                  </div>
                </div>
                <div className={styles.legend}>
                  <div className={styles.legendItem}>
                    <div
                      className={styles.legendColor}
                      style={{ backgroundColor: "#1890ff" }}
                    ></div>
                    <span>Direct</span>
                  </div>
                  <div className={styles.legendItem}>
                    <div
                      className={styles.legendColor}
                      style={{ backgroundColor: "#52c41a" }}
                    ></div>
                    <span>Referral</span>
                  </div>
                  <div className={styles.legendItem}>
                    <div
                      className={styles.legendColor}
                      style={{ backgroundColor: "#722ed1" }}
                    ></div>
                    <span>Organic</span>
                  </div>
                  <div className={styles.legendItem}>
                    <div
                      className={styles.legendColor}
                      style={{ backgroundColor: "#fa8c16" }}
                    ></div>
                    <span>Paid</span>
                  </div>
                  <div className={styles.legendItem}>
                    <div
                      className={styles.legendColor}
                      style={{ backgroundColor: "#13c2c2" }}
                    ></div>
                    <span>Display Ads</span>
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

export default TopPagesTracking;
