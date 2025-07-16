"use client";

import React from "react";
import { Card, Row, Col } from "antd";
import styles from "./features-section.module.scss";

interface Feature {
  title: string;
  description: string;
  bulletPoints: string[];
}

interface FeaturesSectionProps {}

const FeaturesSection: React.FC<FeaturesSectionProps> = () => {
  const auditFeature: Feature = {
    title: "Audit your backlink health from all sides",
    description: "Everything you need for a complete Backlink Audit",
    bulletPoints: [
      "Investigate the quality of backlinks through 50+ parameters",
      "Group referring domains by metrics like IP, category or link type",
      "Check for good distribution of anchors and Authority Score",
    ],
  };

  const manageFeature: Feature = {
    title: "Manage suspicious links that could hurt your rankings",
    description: "",
    bulletPoints: [
      "Contact site owners right from the tool",
      "Send backlinks to your Disavow list",
      "Upload the Disavow file from Semrush to Google",
    ],
  };

  return (
    <div className={styles.featuresSection}>
      <div className={styles.sectionHeader}>
        <h2 className={styles.sectionTitle}>
          Everything you need for a complete Backlink Audit
        </h2>
      </div>

      <Row gutter={[48, 48]} align="middle">
        {/* Audit Feature */}
        <Col xs={24} lg={12}>
          <div className={styles.featureContent}>
            <h3 className={styles.featureTitle}>{auditFeature.title}</h3>

            <ul className={styles.featureList}>
              {auditFeature.bulletPoints.map((point, index) => (
                <li key={index} className={styles.featureListItem}>
                  <span className={styles.bullet}>•</span>
                  {point}
                </li>
              ))}
            </ul>
          </div>
        </Col>

        <Col xs={24} lg={12}>
          <Card className={styles.demoCard}>
            <div className={styles.demoTable}>
              <div className={styles.demoHeader}>
                <div className={styles.demoColumn}>Page Title and URL</div>
                <div className={styles.demoColumn}>Anchor</div>
                <div className={styles.demoColumn}>Referral Traffic</div>
                <div className={styles.demoColumn}>Toxicity Score</div>
              </div>

              <div className={styles.demoRow}>
                <div className={styles.demoCell}>
                  <span className={styles.newBadge}>New</span>
                  <span className={styles.domain}>Branded</span>
                  <span className={styles.text}>Text</span>
                </div>
                <div className={styles.demoCell}>139</div>
                <div className={styles.demoCell}>
                  <span className={styles.score}>54</span>
                </div>
              </div>

              <div className={styles.demoRow}>
                <div className={styles.demoCell}>
                  <span className={styles.moneyBadge}>Money</span>
                  <span className={styles.text}>Text</span>
                </div>
                <div className={styles.demoCell}>1.4K</div>
                <div className={styles.demoCell}>
                  <span className={styles.score}>44</span>
                </div>
              </div>
            </div>
          </Card>
        </Col>

        {/* Manage Feature */}
        <Col xs={24} lg={12} className={styles.reverseOrder}>
          <Card className={styles.manageCard}>
            <div className={styles.manageDemo}>
              <div className={styles.manageActions}>
                <div className={styles.actionSection}>
                  <h4>Remove</h4>
                  <div className={styles.actionContent}>
                    <div className={styles.sourceInfo}>
                      <div>Source Domain</div>
                      <div>Anchor Text,</div>
                      <div>Status</div>
                    </div>
                  </div>
                </div>

                <div className={styles.actionSection}>
                  <h4>Disavow</h4>
                  <div className={styles.disavowContent}>
                    <div className={styles.disavowItem}>
                      <span>URL</span>
                      <span className={styles.status}>Disavowed</span>
                    </div>
                    <div className={styles.statusIndicators}>
                      <div className={styles.statusItem}>
                        <span className={styles.checkmark}>✓</span>
                        <span>Exported</span>
                      </div>
                      <div className={styles.statusItem}>
                        <span className={styles.readyIcon}>📁</span>
                        <span>Ready to be exported</span>
                      </div>
                      <div className={styles.statusItem}>
                        <span className={styles.errorIcon}>❌</span>
                        <span>Not upload to Google</span>
                      </div>
                    </div>

                    <div className={styles.actionButtons}>
                      <button className={styles.sendEmailBtn}>
                        Send email
                      </button>
                      <button className={styles.exportBtn}>
                        Export to file
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </Col>

        <Col xs={24} lg={12}>
          <div className={styles.featureContent}>
            <h3 className={styles.featureTitle}>{manageFeature.title}</h3>

            <ul className={styles.featureList}>
              {manageFeature.bulletPoints.map((point, index) => (
                <li key={index} className={styles.featureListItem}>
                  <span className={styles.bullet}>•</span>
                  {point}
                </li>
              ))}
            </ul>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default FeaturesSection;
