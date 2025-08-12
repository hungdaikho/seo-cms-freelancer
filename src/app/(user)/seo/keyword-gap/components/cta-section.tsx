import React from "react";
import { Button } from "antd";
import styles from "./cta-section.module.scss";

const CTASection: React.FC = () => {
  return (
    <div className={styles.ctaSection}>
      <div className={styles.ctaCard}>
        <h2 className={styles.title}>
          Get 7-day unlimited access to all Semrush tools and reports
        </h2>
        <Button type="primary" size="large" className={styles.ctaButton}>
          Get free trial
        </Button>
      </div>
    </div>
  );
};

export default CTASection;
