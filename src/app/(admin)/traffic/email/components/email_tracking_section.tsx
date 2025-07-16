"use client";

import React from "react";
import { Card, Row, Col } from "antd";
import {
  MailOutlined,
  MobileOutlined,
  DesktopOutlined,
  BarChartOutlined,
  UserOutlined,
  TrophyOutlined,
} from "@ant-design/icons";
import styles from "./email_tracking_section.module.scss";

interface Feature {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const EmailTrackingSection: React.FC = () => {
  const trackingPoints = [
    "Monitor spikes in email-driven traffic",
    "Compare desktop and mobile engagement",
    "Discover pages receiving the most email-driven traffic",
  ];

  const features: Feature[] = [
    {
      icon: <MailOutlined className={styles.featureIcon} />,
      title: "Email Campaign Analysis",
      description:
        "Track the performance of email marketing campaigns and identify which types drive the most traffic.",
    },
    {
      icon: <BarChartOutlined className={styles.featureIcon} />,
      title: "Traffic Attribution",
      description:
        "Understand how email campaigns contribute to overall website traffic and conversion goals.",
    },
    {
      icon: <MobileOutlined className={styles.featureIcon} />,
      title: "Device Engagement",
      description:
        "Compare email engagement and click-through rates across desktop, mobile, and tablet devices.",
    },
    {
      icon: <UserOutlined className={styles.featureIcon} />,
      title: "Audience Segmentation",
      description:
        "Analyze email subscriber behavior and identify the most engaged audience segments.",
    },
    {
      icon: <DesktopOutlined className={styles.featureIcon} />,
      title: "Landing Page Performance",
      description:
        "Discover which pages receive the most email traffic and optimize them for better conversions.",
    },
    {
      icon: <TrophyOutlined className={styles.featureIcon} />,
      title: "Competitive Intelligence",
      description:
        "Monitor competitor email marketing strategies and identify opportunities for your campaigns.",
    },
  ];

  return (
    <section className={styles.trackingSection}>
      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.leftSection}>
            <h2 className={styles.title}>
              Track email traffic trends and promoted pages
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
                <span className={styles.dashboardTitle}>Email</span>
              </div>
              <div className={styles.chartArea}>
                <svg className={styles.chart} viewBox="0 0 200 80">
                  <polyline
                    points="10,60 30,55 50,50 70,35 90,40 110,25 130,30 150,20 170,25 190,15"
                    fill="none"
                    stroke="#1890ff"
                    strokeWidth="3"
                    strokeLinecap="round"
                  />
                  <circle cx="70" cy="35" r="2" fill="#1890ff" />
                  <circle cx="110" cy="25" r="2" fill="#1890ff" />
                  <circle cx="150" cy="20" r="2" fill="#1890ff" />
                  <circle cx="190" cy="15" r="3" fill="#1890ff" />
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
                      stroke="#e6f7ff"
                      strokeWidth="20"
                    />
                    <circle
                      cx="60"
                      cy="60"
                      r="40"
                      fill="none"
                      stroke="#1890ff"
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
                      stroke="#40a9ff"
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
                      style={{ backgroundColor: "#1890ff" }}
                    ></div>
                    <span className={styles.legendText}>Desktop</span>
                  </div>
                  <div className={styles.legendItem}>
                    <div
                      className={styles.legendColor}
                      style={{ backgroundColor: "#40a9ff" }}
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

export default EmailTrackingSection;
