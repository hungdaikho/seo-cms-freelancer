"use client";

import React, { useState } from "react";
import { Input, Button } from "antd";
import styles from "./cta-section.module.scss";

interface CTASectionProps {}

const CTASection: React.FC<CTASectionProps> = () => {
  const [domain, setDomain] = useState("");

  const handleStartLinkBuilding = () => {
    if (domain.trim()) {
      console.log("Starting link building for:", domain);
      // Handle link building logic here
    }
  };

  return (
    <div className={styles.ctaSection}>
      <div className={styles.ctaContent}>
        <h2 className={styles.ctaTitle}>Get started!</h2>
        <p className={styles.ctaSubtitle}>
          Find new sources for backlink placements
        </p>

        <div className={styles.searchContainer}>
          <Input
            value={domain}
            onChange={(e) => setDomain(e.target.value)}
            placeholder="Enter domain"
            className={styles.searchInput}
            size="large"
            onPressEnter={handleStartLinkBuilding}
          />
          <Button
            type="primary"
            size="large"
            className={styles.searchButton}
            onClick={handleStartLinkBuilding}
          >
            Start Link Building
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CTASection;
