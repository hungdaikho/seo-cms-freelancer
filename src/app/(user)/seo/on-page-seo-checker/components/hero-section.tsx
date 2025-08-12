"use client";

import React, { useState } from "react";
import { Input, Button } from "antd";
import styles from "./hero-section.module.scss";

interface HeroSectionProps {}

const HeroSection: React.FC<HeroSectionProps> = () => {
  const [domain, setDomain] = useState("");

  const handleSubmit = () => {
    console.log("Get ideas for:", domain);
  };

  return (
    <div className={styles.heroSection}>
      <div className={styles.heroContent}>
        <h1 className={styles.heroTitle}>On Page SEO Checker</h1>
        <p className={styles.heroSubtitle}>
          Get an exhaustive list of ideas based on competitive analysis
          <br />
          that can improve the organic performance of your website.
        </p>

        <div className={styles.searchForm}>
          <Input
            placeholder="Enter domain"
            value={domain}
            onChange={(e) => setDomain(e.target.value)}
            className={styles.domainInput}
            size="large"
          />
          <Button
            type="primary"
            onClick={handleSubmit}
            className={styles.submitButton}
            size="large"
          >
            Get ideas
          </Button>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
