"use client";

import React, { useState } from "react";
import { Input, Button } from "antd";
import styles from "./hero-section.module.scss";

interface HeroSectionProps {}

const HeroSection: React.FC<HeroSectionProps> = () => {
  const [domain, setDomain] = useState("");

  const handleAudit = () => {
    if (domain.trim()) {
      console.log("Starting audit for:", domain);
      // Handle audit logic here
    }
  };

  return (
    <div className={styles.heroSection}>
      <div className={styles.heroContent}>
        <h1 className={styles.heroTitle}>Backlink Audit</h1>
        <p className={styles.heroSubtitle}>
          Keep your backlink profile healthy!
        </p>

        <div className={styles.searchContainer}>
          <Input
            value={domain}
            onChange={(e) => setDomain(e.target.value)}
            placeholder="Enter domain"
            className={styles.searchInput}
            size="large"
            onPressEnter={handleAudit}
          />
          <Button
            type="primary"
            size="large"
            className={styles.searchButton}
            onClick={handleAudit}
          >
            Start Backlink Audit
          </Button>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
