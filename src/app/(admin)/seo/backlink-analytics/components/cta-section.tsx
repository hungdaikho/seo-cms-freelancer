"use client";

import React from "react";
import { Card, Button, Row, Col } from "antd";
import styles from "./cta-section.module.scss";

interface CTASectionProps {}

const CTASection: React.FC<CTASectionProps> = () => {
  return (
    <div className={styles.ctaSection}>
      <div className={styles.container}>
        <Row gutter={[48, 48]} align="middle">
          <Col xs={24} lg={12}>
            <div className={styles.ctaContent}>
              <h2 className={styles.ctaTitle}>
                Ready to Take Your Backlink Strategy to the Next Level?
              </h2>
              <p className={styles.ctaDescription}>
                While our free backlink checker gives you valuable insights,
                unlock the full power of professional SEO with Semrush Pro. Get
                access to advanced backlink analytics, competitor research,
                keyword tracking, and much more.
              </p>

              <div className={styles.features}>
                <div className={styles.feature}>
                  <span className={styles.checkmark}>✓</span>
                  <span>Complete backlink database with 43T+ links</span>
                </div>
                <div className={styles.feature}>
                  <span className={styles.checkmark}>✓</span>
                  <span>Advanced filtering and sorting options</span>
                </div>
                <div className={styles.feature}>
                  <span className={styles.checkmark}>✓</span>
                  <span>Competitor backlink analysis</span>
                </div>
                <div className={styles.feature}>
                  <span className={styles.checkmark}>✓</span>
                  <span>Link building opportunities finder</span>
                </div>
                <div className={styles.feature}>
                  <span className={styles.checkmark}>✓</span>
                  <span>Toxic link detection and disavow</span>
                </div>
                <div className={styles.feature}>
                  <span className={styles.checkmark}>✓</span>
                  <span>Historical backlink data and trends</span>
                </div>
              </div>

              <div className={styles.ctaButtons}>
                <Button
                  type="primary"
                  size="large"
                  className={styles.primaryButton}
                >
                  Start Free Trial
                </Button>
                <Button size="large" className={styles.secondaryButton}>
                  View Pricing Plans
                </Button>
              </div>
            </div>
          </Col>

          <Col xs={24} lg={12}>
            <Card className={styles.promoCard}>
              <div className={styles.promoContent}>
                <div className={styles.badge}>14-Day Free Trial</div>
                <h3 className={styles.promoTitle}>Semrush Pro</h3>
                <div className={styles.price}>
                  <span className={styles.priceAmount}>$119.95</span>
                  <span className={styles.pricePeriod}>/month</span>
                </div>
                <div className={styles.promoDescription}>
                  Everything you need for professional SEO, PPC, and content
                  marketing. No credit card required for trial.
                </div>

                <div className={styles.promoFeatures}>
                  <div className={styles.promoFeature}>
                    <span className={styles.promoNumber}>10,000</span>
                    <span className={styles.promoLabel}>
                      Results per report
                    </span>
                  </div>
                  <div className={styles.promoFeature}>
                    <span className={styles.promoNumber}>3,000</span>
                    <span className={styles.promoLabel}>Reports per day</span>
                  </div>
                  <div className={styles.promoFeature}>
                    <span className={styles.promoNumber}>5</span>
                    <span className={styles.promoLabel}>Projects</span>
                  </div>
                </div>

                <Button
                  type="primary"
                  block
                  size="large"
                  className={styles.promoButton}
                >
                  Try Semrush Pro Free
                </Button>
              </div>
            </Card>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default CTASection;
