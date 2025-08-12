"use client";

import React from "react";
import { Card, Row, Col } from "antd";
import { FiTrendingUp, FiUsers, FiSettings, FiEye } from "react-icons/fi";
import styles from "./benefits-section.module.scss";

interface Benefit {
  icon: React.ReactNode;
  title: string;
  description: string;
  color: string;
}

interface BenefitsSectionProps {}

const BenefitsSection: React.FC<BenefitsSectionProps> = () => {
  const benefits: Benefit[] = [
    {
      icon: <FiTrendingUp />,
      title: "Improve your search engine rankings",
      description: "",
      color: "#10b981",
    },
    {
      icon: <FiUsers />,
      title: "Drive referral traffic to your website",
      description: "",
      color: "#3b82f6",
    },
    {
      icon: <FiSettings />,
      title: "Increase your domain authority",
      description: "",
      color: "#f59e0b",
    },
    {
      icon: <FiEye />,
      title: "Help search engines discover and index your content faster",
      description: "",
      color: "#ef4444",
    },
  ];

  return (
    <div className={styles.benefitsSection}>
      <div className={styles.sectionHeader}>
        <h2 className={styles.sectionTitle}>Strong backlinks can:</h2>
      </div>

      <Row gutter={[32, 32]} className={styles.benefitsGrid}>
        {benefits.map((benefit, index) => (
          <Col xs={24} sm={12} lg={6} key={index}>
            <Card className={styles.benefitCard}>
              <div className={styles.benefitContent}>
                <div
                  className={styles.benefitIcon}
                  style={{ background: benefit.color }}
                >
                  {benefit.icon}
                </div>
                <h3 className={styles.benefitTitle}>{benefit.title}</h3>
              </div>
            </Card>
          </Col>
        ))}
      </Row>

      <div className={styles.disclaimer}>
        <p>
          However, not all backlinks are equal. Low-quality or spammy backlinks
          can actually harm your site. That's why you need a reliable backlink
          checker to analyze and monitor your link profile.
        </p>
      </div>
    </div>
  );
};

export default BenefitsSection;
