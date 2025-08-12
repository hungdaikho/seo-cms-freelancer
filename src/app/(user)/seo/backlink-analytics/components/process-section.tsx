"use client";

import React from "react";
import { Card, Row, Col } from "antd";
import { FiSearch, FiBarChart, FiDownload, FiTrendingUp } from "react-icons/fi";
import styles from "./process-section.module.scss";

interface Step {
  number: string;
  icon: React.ReactNode;
  title: string;
  description: string;
  color: string;
}

interface ProcessSectionProps {}

const ProcessSection: React.FC<ProcessSectionProps> = () => {
  const steps: Step[] = [
    {
      number: "01",
      icon: <FiSearch size={24} />,
      title: "Enter Your Domain",
      description:
        "Simply type your website URL into the search box above. Our tool accepts any domain format - with or without www, http, or https.",
      color: "#3b82f6",
    },
    {
      number: "02",
      icon: <FiBarChart size={24} />,
      title: "Analyze Backlink Profile",
      description:
        "Our system scans our massive database of over 43 trillion backlinks to find all links pointing to your domain and provides detailed metrics.",
      color: "#10b981",
    },
    {
      number: "03",
      icon: <FiTrendingUp size={24} />,
      title: "Review Key Metrics",
      description:
        "Get instant insights including total backlinks, referring domains, Authority Score, and top linking pages to understand your link profile strength.",
      color: "#f59e0b",
    },
    {
      number: "04",
      icon: <FiDownload size={24} />,
      title: "Export & Take Action",
      description:
        "Download your backlink report and use the insights to improve your SEO strategy, find new link opportunities, or monitor competitor performance.",
      color: "#8b5cf6",
    },
  ];

  return (
    <div className={styles.processSection}>
      <div className={styles.container}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>
            How to Use Our Free Backlink Checker
          </h2>
          <p className={styles.sectionSubtitle}>
            Get comprehensive backlink insights in just 4 simple steps
          </p>
        </div>

        <Row gutter={[32, 32]} className={styles.stepsGrid}>
          {steps.map((step, index) => (
            <Col xs={24} md={12} lg={6} key={index}>
              <Card className={styles.stepCard}>
                <div className={styles.stepContent}>
                  <div
                    className={styles.stepNumber}
                    style={{ color: step.color }}
                  >
                    {step.number}
                  </div>

                  <div
                    className={styles.stepIcon}
                    style={{
                      backgroundColor: `${step.color}15`,
                      color: step.color,
                    }}
                  >
                    {step.icon}
                  </div>

                  <h3 className={styles.stepTitle}>{step.title}</h3>

                  <p className={styles.stepDescription}>{step.description}</p>
                </div>
              </Card>
            </Col>
          ))}
        </Row>

        <div className={styles.processFooter}>
          <p className={styles.footerText}>
            <strong>Pro Tip:</strong> For more detailed backlink analysis,
            competitor research, and advanced filtering options, upgrade to
            Semrush Pro to unlock the full potential of our backlink analytics
            tools.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProcessSection;
