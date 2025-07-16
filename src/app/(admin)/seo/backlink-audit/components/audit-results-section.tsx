"use client";

import React from "react";
import { Card, Row, Col, Progress, Badge, Button } from "antd";
import { FiAlertTriangle, FiEye, FiShare2 } from "react-icons/fi";
import styles from "./audit-results-section.module.scss";

interface AuditResultsSectionProps {}

const AuditResultsSection: React.FC<AuditResultsSectionProps> = () => {
  return (
    <div className={styles.auditResultsSection}>
      <Row gutter={[24, 24]}>
        {/* Left Side - Toxicity Score */}
        <Col xs={24} lg={12}>
          <Card className={styles.toxicityCard}>
            <div className={styles.cardHeader}>
              <h3 className={styles.cardTitle}>Toxicity score</h3>
              <p className={styles.cardDescription}>
                This score is based on the number of suspicious domains linking
                to your website
              </p>
            </div>

            <div className={styles.scoreContainer}>
              <div className={styles.scoreValue}>
                <span className={styles.scoreText}>High</span>
                <Progress
                  percent={75}
                  showInfo={false}
                  strokeColor={{
                    "0%": "#ef4444",
                    "50%": "#f59e0b",
                    "100%": "#10b981",
                  }}
                  className={styles.scoreProgress}
                />
              </div>
            </div>

            <div className={styles.alertsContainer}>
              <div className={styles.alert}>
                <FiAlertTriangle className={styles.alertIcon} />
                <span>New toxic backlinks</span>
              </div>
              <div className={styles.alert}>
                <FiShare2 className={styles.alertIcon} />
                <span>Potential link networks</span>
              </div>
              <div className={styles.alert}>
                <FiEye className={styles.alertIcon} />
                <span>Too many money anchors</span>
              </div>
            </div>
          </Card>
        </Col>

        {/* Right Side - Insights */}
        <Col xs={24} lg={12}>
          <Card className={styles.insightsCard}>
            <div className={styles.cardHeader}>
              <h3 className={styles.cardTitle}>Insights</h3>
              <p className={styles.cardDescription}>
                Personal recommendations to improve your backlink profile
              </p>
            </div>

            <Row gutter={[16, 16]} className={styles.metricsGrid}>
              <Col span={8}>
                <div className={styles.metricItem}>
                  <div className={styles.metricLabel}>Referring Domains</div>
                  <div className={styles.metricValue}>1,589</div>
                  <div className={styles.metricBreakdown}>
                    <Badge color="#10b981" text="New" />
                    <Badge color="#6b7280" text="Broken" />
                    <Badge color="#ef4444" text="Lost" />
                  </div>
                </div>
              </Col>
              <Col span={8}>
                <div className={styles.metricItem}>
                  <div className={styles.metricLabel}>Analyzed Backlinks</div>
                  <div className={styles.metricValue}>10,130</div>
                  <div className={styles.metricBreakdown}>
                    <Badge color="#10b981" text="New" />
                    <Badge color="#6b7280" text="Broken" />
                    <Badge color="#ef4444" text="Lost" />
                  </div>
                </div>
              </Col>
            </Row>
          </Card>
        </Col>
      </Row>

      {/* Bottom Table */}
      <Card className={styles.tableCard}>
        <div className={styles.tableHeader}>
          <Row justify="space-between" align="middle">
            <Col>
              <div className={styles.tableTitle}>Page Title and URL</div>
            </Col>
            <Col>
              <div className={styles.tableColumns}>
                <span>Anchor</span>
                <span>Referral Traffic</span>
                <span>Toxicity Score</span>
                <span>Actions</span>
              </div>
            </Col>
          </Row>
        </div>

        <div className={styles.tableRow}>
          <Row justify="space-between" align="middle">
            <Col flex={1}>
              <div className={styles.urlInfo}>
                <div className={styles.url}>
                  https://suspicious.com/remove-me/
                </div>
              </div>
            </Col>
            <Col>
              <div className={styles.rowData}>
                <Badge
                  color="#ef4444"
                  text="Money"
                  className={styles.anchorBadge}
                />
                <span className={styles.traffic}>139</span>
                <span className={styles.toxicityScore}>87</span>
                <div className={styles.actions}>
                  <Button size="small" icon="📋" />
                  <Button size="small" icon="📤" type="primary" />
                  <Button size="small" icon="🔗" type="primary" />
                </div>
              </div>
            </Col>
          </Row>
        </div>
      </Card>

      {/* Actions Section */}
      <Card className={styles.actionsCard}>
        <div className={styles.actionsContent}>
          <h4 className={styles.actionsTitle}>Actions</h4>
          <p className={styles.actionsDescription}>
            Check the quality of every link. Create a list of links to remove or
            disavow and reach out from the tool
          </p>
        </div>
      </Card>
    </div>
  );
};

export default AuditResultsSection;
