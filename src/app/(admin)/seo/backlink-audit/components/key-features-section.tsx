"use client";

import React from "react";
import { Card, Row, Col } from "antd";
import styles from "./key-features-section.module.scss";

interface KeyFeature {
  icon: string;
  title: string;
  description: string;
}

interface KeyFeaturesSectionProps {}

const KeyFeaturesSection: React.FC<KeyFeaturesSectionProps> = () => {
  const leftFeatures: KeyFeature[] = [
    {
      icon: "📊",
      title: "50+ evaluation parameters",
      description:
        "Comprehensive analysis with over 50 different metrics to evaluate backlink quality and potential impact on your SEO performance.",
    },
    {
      icon: "💡",
      title: "Actionable insights",
      description:
        "Get specific recommendations and actionable insights to improve your backlink profile and overall SEO strategy.",
    },
    {
      icon: "🤖",
      title: "AI-based Toxicity score",
      description:
        "Advanced AI algorithms analyze suspicious patterns and provide accurate toxicity scores for each backlink in your profile.",
    },
    {
      icon: "🔄",
      title: "Built-in disavow workflow",
      description:
        "Streamlined process to identify, review, and disavow toxic backlinks directly from the platform with Google integration.",
    },
    {
      icon: "📈",
      title: "New, lost, and broken backlink data",
      description:
        "Track changes in your backlink profile with detailed reports on newly acquired, lost, and broken links over time.",
    },
  ];

  const rightFeatures: KeyFeature[] = [
    {
      icon: "⚠️",
      title: "Error alerts for your target pages",
      description:
        "Receive instant notifications when issues are detected with your most important pages and their backlink profiles.",
    },
    {
      icon: "🎯",
      title: "New target page alerts",
      description:
        "Get notified when new pages on your site start receiving backlinks, helping you monitor your link building success.",
    },
    {
      icon: "📧",
      title: "Outreach flow with site owners' email data",
      description:
        "Built-in outreach capabilities with contact information to help you connect with site owners for link management.",
    },
    {
      icon: "🔄",
      title: "Automated updates and alerts about changes",
      description:
        "Stay informed with automated monitoring that tracks changes in your backlink profile and sends timely alerts.",
    },
  ];

  return (
    <div className={styles.keyFeaturesSection}>
      <div className={styles.container}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>
            Key features of the Backlink Audit tool
          </h2>
        </div>

        <Row gutter={[48, 48]}>
          {/* Left Column */}
          <Col xs={24} lg={12}>
            <div className={styles.featuresColumn}>
              {leftFeatures.map((feature, index) => (
                <Card key={index} className={styles.featureCard}>
                  <div className={styles.featureContent}>
                    <div className={styles.featureIcon}>{feature.icon}</div>
                    <div className={styles.featureText}>
                      <h4 className={styles.featureTitle}>{feature.title}</h4>
                      <p className={styles.featureDescription}>
                        {feature.description}
                      </p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </Col>

          {/* Center Demo */}
          <Col xs={24} lg={12} className={styles.demoColumn}>
            <div className={styles.demoContainer}>
              {/* Toxicity Score Demo */}
              <Card className={styles.demoCard}>
                <div className={styles.demoContent}>
                  <div className={styles.toxicityDemo}>
                    <div className={styles.demoHeader}>
                      <span className={styles.demoLabel}>Toxicity Score</span>
                      <div className={styles.scoreIndicators}>
                        <span className={styles.scoreTag}>New & Lost</span>
                      </div>
                    </div>

                    <div className={styles.scoreDisplay}>
                      <span className={styles.mainScore}>High</span>
                    </div>

                    <div className={styles.scoreBreakdown}>
                      <div className={styles.scoreBar}>
                        <div
                          className={styles.scoreSegment}
                          style={{ width: "32%", backgroundColor: "#ef4444" }}
                        ></div>
                        <div
                          className={styles.scoreSegment}
                          style={{ width: "28%", backgroundColor: "#f59e0b" }}
                        ></div>
                        <div
                          className={styles.scoreSegment}
                          style={{ width: "40%", backgroundColor: "#10b981" }}
                        ></div>
                      </div>
                      <div className={styles.scoreLabels}>
                        <span>32%</span>
                        <span>28%</span>
                        <span>40%</span>
                      </div>
                    </div>

                    <div className={styles.attributesList}>
                      <div className={styles.attributeItem}>
                        <span
                          className={styles.attributeBar}
                          style={{ backgroundColor: "#3b82f6" }}
                        ></span>
                        <span className={styles.attributeLabel}>
                          Link attributes
                        </span>
                      </div>
                      <div className={styles.attributeItem}>
                        <span
                          className={styles.attributeBar}
                          style={{ backgroundColor: "#10b981" }}
                        ></span>
                        <span className={styles.attributeLabel}>
                          Discovered
                        </span>
                        <span className={styles.attributeValue}>12 🔗</span>
                      </div>
                      <div className={styles.attributeItem}>
                        <span
                          className={styles.attributeBar}
                          style={{ backgroundColor: "#3b82f6" }}
                        ></span>
                        <span className={styles.attributeLabel}>Removed</span>
                        <span className={styles.attributeValue}>15 📅</span>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </Col>

          {/* Right Features Column - Mobile Only */}
          <Col xs={24} className={styles.rightFeaturesColumnMobile}>
            <div className={styles.featuresColumn}>
              {rightFeatures.map((feature, index) => (
                <Card key={index} className={styles.featureCard}>
                  <div className={styles.featureContent}>
                    <div className={styles.featureIcon}>{feature.icon}</div>
                    <div className={styles.featureText}>
                      <h4 className={styles.featureTitle}>{feature.title}</h4>
                      <p className={styles.featureDescription}>
                        {feature.description}
                      </p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </Col>
        </Row>

        {/* Right Features - Desktop Positioned Absolutely */}
        <div className={styles.rightFeaturesColumnDesktop}>
          <div className={styles.featuresColumn}>
            {rightFeatures.map((feature, index) => (
              <Card key={index} className={styles.featureCard}>
                <div className={styles.featureContent}>
                  <div className={styles.featureIcon}>{feature.icon}</div>
                  <div className={styles.featureText}>
                    <h4 className={styles.featureTitle}>{feature.title}</h4>
                    <p className={styles.featureDescription}>
                      {feature.description}
                    </p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default KeyFeaturesSection;
