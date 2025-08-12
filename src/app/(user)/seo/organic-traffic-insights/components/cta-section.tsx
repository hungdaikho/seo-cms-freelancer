"use client";

import React from "react";
import { Card, Input, Button } from "antd";
import styles from "./cta-section.module.scss";

interface CTASectionProps {}

const CTASection: React.FC<CTASectionProps> = () => {
  return (
    <div className={styles.ctaSection}>
      <Card className={styles.ctaCard}>
        <div className={styles.ctaContent}>
          <h2 className={styles.ctaTitle}>Get Started!</h2>
          <p className={styles.ctaSubtitle}>
            An easy "not provided" keyword solution combining Google Analytics,
            <br />
            Search Console and Semrush data
          </p>

          <div className={styles.ctaSearchContainer}>
            <Input
              placeholder="Enter domain"
              className={styles.ctaDomainInput}
              size="large"
            />
            <Button
              type="primary"
              size="large"
              className={styles.ctaInsightsBtn}
            >
              Get Insights
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default CTASection;
