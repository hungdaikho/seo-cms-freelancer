"use client";

import React from "react";
import { Card, Row, Col, Button, Progress } from "antd";
import styles from "./integrations-section.module.scss";

interface IntegrationsSectionProps {}

const IntegrationsSection: React.FC<IntegrationsSectionProps> = () => {
  return (
    <div className={styles.integrationsSection}>
      <div className={styles.container}>
        <Row gutter={[48, 48]} align="middle">
          {/* Left Side - Import & Integrations */}
          <Col xs={24} lg={12}>
            <Card className={styles.integrationsCard}>
              <div className={styles.cardContent}>
                <div className={styles.importSection}>
                  <div className={styles.importHeader}>
                    <Button
                      type="primary"
                      size="small"
                      className={styles.importBtn}
                    >
                      🔗 Import backlinks
                    </Button>
                    <Button size="small" className={styles.integrationsBtn}>
                      🔌 Integrations
                    </Button>
                  </div>

                  <div className={styles.authorityScore}>
                    <span className={styles.scoreLabel}>Medium</span>
                    <div className={styles.scoreNumbers}>
                      <span className={styles.mainScore}>651</span>
                      <span className={styles.secondaryScore}>1.2K</span>
                    </div>
                    <Progress
                      percent={60}
                      showInfo={false}
                      strokeColor={{
                        "0%": "#ef4444",
                        "50%": "#f59e0b",
                        "100%": "#10b981",
                      }}
                      className={styles.scoreProgress}
                    />
                  </div>

                  <div className={styles.integrationsList}>
                    <div className={styles.integrationItem}>
                      <span className={styles.integrationIcon}>📊</span>
                      <span>Google Analytics</span>
                    </div>
                    <div className={styles.integrationItem}>
                      <span className={styles.integrationIcon}>🔍</span>
                      <span>Google Search Console</span>
                    </div>
                    <div className={styles.integrationItem}>
                      <span className={styles.integrationIcon}>🔗</span>
                      <span>Majestic</span>
                    </div>
                    <Button type="link" className={styles.connectBtn}>
                      Connect
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          </Col>

          {/* Right Side - Features List */}
          <Col xs={24} lg={12}>
            <div className={styles.featuresContent}>
              <h3 className={styles.featuresTitle}>
                Keep all your backlink data in one place
              </h3>

              <ul className={styles.featuresList}>
                <li className={styles.featureItem}>
                  <span className={styles.bullet}>•</span>
                  Audit backlinks from the Semrush database
                </li>
                <li className={styles.featureItem}>
                  <span className={styles.bullet}>•</span>
                  Connect your Google Search Console account
                </li>
                <li className={styles.featureItem}>
                  <span className={styles.bullet}>•</span>
                  Import backlinks directly from a{" "}
                  <span className={styles.highlight}>
                    Majestic account or file
                  </span>
                </li>
              </ul>
            </div>
          </Col>

          {/* Bottom Row - Monitoring */}
          <Col xs={24}>
            <Row gutter={[48, 48]} align="middle">
              <Col xs={24} lg={12}>
                <div className={styles.featuresContent}>
                  <h3 className={styles.featuresTitle}>
                    Monitor any significant changes
                  </h3>

                  <ul className={styles.featuresList}>
                    <li className={styles.featureItem}>
                      <span className={styles.bullet}>•</span>
                      Receive alerts about new, broken, and lost backlinks
                    </li>
                    <li className={styles.featureItem}>
                      <span className={styles.bullet}>•</span>
                      Keep your eye on any spikes and drops
                    </li>
                    <li className={styles.featureItem}>
                      <span className={styles.bullet}>•</span>
                      Instantly catch possible spam attacks or Google penalties
                    </li>
                  </ul>
                </div>
              </Col>

              <Col xs={24} lg={12}>
                <Card className={styles.monitoringCard}>
                  <div className={styles.monitoringContent}>
                    <div className={styles.settingsPanel}>
                      <div className={styles.settingsHeader}>
                        <span className={styles.settingsIcon}>⚙️</span>
                        <span>Settings</span>
                      </div>

                      <div className={styles.chartSection}>
                        <div className={styles.chartBars}>
                          <div
                            className={styles.bar}
                            style={{
                              height: "40%",
                              backgroundColor: "#3b82f6",
                            }}
                          ></div>
                          <div
                            className={styles.bar}
                            style={{
                              height: "60%",
                              backgroundColor: "#10b981",
                            }}
                          ></div>
                          <div
                            className={styles.bar}
                            style={{
                              height: "30%",
                              backgroundColor: "#f59e0b",
                            }}
                          ></div>
                          <div
                            className={styles.bar}
                            style={{
                              height: "80%",
                              backgroundColor: "#ef4444",
                            }}
                          ></div>
                        </div>
                      </div>

                      <div className={styles.scheduleSection}>
                        <h4>Recrawl schedule</h4>
                        <div className={styles.scheduleOption}>
                          <input type="radio" checked readOnly />
                          <span>Once a week</span>
                        </div>
                        <div className={styles.auditOption}>
                          <input type="checkbox" checked readOnly />
                          <span>
                            Send an email every time an audit is complete
                          </span>
                        </div>
                        <Button
                          type="primary"
                          size="small"
                          className={styles.updateBtn}
                        >
                          Update
                        </Button>
                      </div>
                    </div>
                  </div>
                </Card>
              </Col>
            </Row>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default IntegrationsSection;
