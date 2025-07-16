"use client";

import React, { useState } from "react";
import { Card, Input, Button } from "antd";
import styles from "./hero-section.module.scss";

interface HeroSectionProps {
  onGetInsights: (domain: string) => void;
}

const HeroSection: React.FC<HeroSectionProps> = ({ onGetInsights }) => {
  const [domain, setDomain] = useState("");

  const handleSubmit = () => {
    if (domain.trim()) {
      onGetInsights(domain.trim());
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSubmit();
    }
  };

  return (
    <div className={styles.heroSection}>
      <Card className={styles.heroCard}>
        <div className={styles.heroContent}>
          <h1 className={styles.title}>Organic Traffic Insights</h1>
          <p className={styles.subtitle}>
            An easy "not provided" keyword solution combining Google Analytics,
            <br />
            Search Console and Semrush data
          </p>

          <div className={styles.searchContainer}>
            <Input
              placeholder="Enter domain"
              value={domain}
              onChange={(e) => setDomain(e.target.value)}
              onKeyPress={handleKeyPress}
              className={styles.domainInput}
              size="large"
            />
            <Button
              type="primary"
              size="large"
              onClick={handleSubmit}
              className={styles.insightsBtn}
            >
              Get Insights
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default HeroSection;
