"use client";

import React, { useState } from "react";
import { Input, Button } from "antd";
import styles from "./cta-section.module.scss";

interface CTASectionProps {}

const CTASection: React.FC<CTASectionProps> = () => {
  const [domain, setDomain] = useState("");

  const handleAudit = () => {
    if (domain.trim()) {
      console.log("Starting audit for:", domain);
      // Handle audit logic here
    }
  };

  return (
    <div className={styles.ctaSection}>
      <div className={styles.ctaContent}>
        <h2 className={styles.ctaTitle}>
          Check your backlink profile's health now!
        </h2>

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

export default CTASection;
