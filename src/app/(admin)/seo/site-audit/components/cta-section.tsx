"use client";

import React from "react";
import { Button } from "antd";
import styles from "./cta-section.module.scss";

interface CTASectionProps {}

const CTASection: React.FC<CTASectionProps> = () => {
  return (
    <div className={styles.ctaSection}>
      <div className={styles.ctaContent}>
        <h2 className={styles.ctaTitle}>Ready to Improve Your SEO?</h2>
        <p className={styles.ctaSubtitle}>
          Get your free SEO audit report and start optimizing your website
          today.
        </p>
        <div className={styles.ctaButtons}>
          <Button type="primary" size="large" className={styles.primaryButton}>
            Start Free Audit
          </Button>
          <Button size="large" className={styles.secondaryButton}>
            Learn More
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CTASection;
