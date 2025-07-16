"use client";

import React from "react";
import { Button } from "antd";
import { FiArrowRight } from "react-icons/fi";
import styles from "./hero-section.module.scss";

interface HeroSectionProps {}

const HeroSection: React.FC<HeroSectionProps> = () => {
  const handleAnalyzeText = () => {
    console.log("Analyze text clicked");
  };

  return (
    <div className={styles.heroSection}>
      <div className={styles.heroContent}>
        <h1 className={styles.heroTitle}>SEO Writing Assistant</h1>
        <p className={styles.heroSubtitle}>
          A smart writing editor that helps you optimize your copy for
          <br />
          engagement and SEO.
        </p>

        <Button
          type="primary"
          size="large"
          onClick={handleAnalyzeText}
          className={styles.ctaButton}
          icon={<FiArrowRight />}
        >
          Analyze my text
        </Button>
      </div>
    </div>
  );
};

export default HeroSection;
