"use client";

import React from "react";
import { Button, Row, Col, Card } from "antd";
import { FaRocket, FaChartLine, FaUsers } from "react-icons/fa";
import { AiOutlineArrowRight, AiOutlineCheckCircle } from "react-icons/ai";
import styles from "./cta-section.module.scss";

interface CTASectionProps {}

const CTASection: React.FC<CTASectionProps> = () => {
  const benefits = [
    "AI-powered keyword research",
    "Competitive analysis insights",
    "Content strategy recommendations",
    "Performance tracking & alerts",
  ];

  const features = [
    {
      icon: <FaRocket />,
      title: "Faster Results",
      description: "Get keyword strategies in minutes, not hours",
    },
    {
      icon: <FaChartLine />,
      title: "Better Rankings",
      description: "Data-driven approach to improve search visibility",
    },
    {
      icon: <FaUsers />,
      title: "Expert Support",
      description: "Access to SEO specialists and best practices",
    },
  ];

  return (
    <div className={styles.ctaSection}>
      <div className={styles.ctaContainer}>
        <Row gutter={[48, 48]} align="middle">
          <Col xs={24} lg={12}>
            <div className={styles.ctaContent}>
              <h2>Ready to build winning keyword strategies?</h2>
              <p className={styles.ctaDescription}>
                Join thousands of marketers who use our AI-powered platform to
                research keywords, build content strategies, and track their SEO
                performance.
              </p>

              <div className={styles.benefitsList}>
                {benefits.map((benefit, index) => (
                  <div key={index} className={styles.benefitItem}>
                    <AiOutlineCheckCircle className={styles.checkIcon} />
                    <span>{benefit}</span>
                  </div>
                ))}
              </div>

              <div className={styles.ctaActions}>
                <Button
                  type="primary"
                  size="large"
                  className={styles.primaryBtn}
                  icon={<AiOutlineArrowRight />}
                >
                  Start Free Trial
                </Button>
                <Button size="large" className={styles.secondaryBtn}>
                  Schedule Demo
                </Button>
              </div>

              <div className={styles.trustSignals}>
                <span className={styles.trustText}>
                  No credit card required • 7-day free trial • Cancel anytime
                </span>
              </div>
            </div>
          </Col>

          <Col xs={24} lg={12}>
            <div className={styles.featuresGrid}>
              {features.map((feature, index) => (
                <Card key={index} className={styles.featureCard}>
                  <div className={styles.featureIcon}>{feature.icon}</div>
                  <div className={styles.featureContent}>
                    <h4>{feature.title}</h4>
                    <p>{feature.description}</p>
                  </div>
                </Card>
              ))}
            </div>
          </Col>
        </Row>
      </div>

      <div className={styles.bottomBanner}>
        <div className={styles.bannerContent}>
          <div className={styles.bannerText}>
            <h3>Need help getting started?</h3>
            <p>
              Our SEO experts are here to help you build the perfect keyword
              strategy
            </p>
          </div>
          <div className={styles.bannerActions}>
            <Button type="primary" ghost size="large">
              Contact Support
            </Button>
            <Button type="link" size="large">
              View Documentation
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CTASection;
