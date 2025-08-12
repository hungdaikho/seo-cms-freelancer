"use client";

import { Button } from "antd";
import { AiOutlineRight } from "react-icons/ai";
import styles from "./cta-section.module.scss";

const CTASection = () => {
  return (
    <div className={styles.ctaSection}>
      <div className={styles.ctaContainer}>
        <div className={styles.ctaContent}>
          <h2>Ready to find new link building opportunities?</h2>
          <p>
            Discover your competitors' link building strategies and find new
            prospects to boost your domain authority and organic traffic.
          </p>
          <div className={styles.ctaButtons}>
            <Button
              type="primary"
              size="large"
              className={styles.primaryButton}
            >
              Start Free Trial
              <AiOutlineRight />
            </Button>
            <Button size="large" className={styles.secondaryButton}>
              Learn More
            </Button>
          </div>
        </div>
        <div className={styles.ctaIllustration}>
          <div className={styles.illustrationContainer}>
            <div className={styles.linkNodes}>
              <div className={styles.centralNode}></div>
              <div className={styles.linkNode}></div>
              <div className={styles.linkNode}></div>
              <div className={styles.linkNode}></div>
              <div className={styles.linkNode}></div>
            </div>
            <div className={styles.connectionLines}>
              <div className={styles.line}></div>
              <div className={styles.line}></div>
              <div className={styles.line}></div>
              <div className={styles.line}></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CTASection;
