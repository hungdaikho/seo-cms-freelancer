"use client";

import React, { useState } from "react";
import { Input, Button, Card } from "antd";
import styles from "./hero-section.module.scss";

interface HeroSectionProps {}

const HeroSection: React.FC<HeroSectionProps> = () => {
  const [domain, setDomain] = useState("");

  const handleStartAudit = () => {
    if (domain.trim()) {
      console.log("Starting SEO audit for:", domain);
      // Handle audit logic here
    }
  };

  return (
    <div className={styles.heroSection}>
      <Card className={styles.auditCard}>
        <div className={styles.cardContent}>
          <div className={styles.badge}>Free SEO Audit Tool</div>

          <h1 className={styles.title}>
            Run a Powerful Website Audit and Identify Critical SEO Issues with
            Site Audit
          </h1>

          <p className={styles.subtitle}>
            Find and fix critical SEO issues on your site, identify technical
            problems, improve site performance, and boost your search rankings.
          </p>

          <div className={styles.searchContainer}>
            <Input
              value={domain}
              onChange={(e) => setDomain(e.target.value)}
              placeholder="Enter domain"
              className={styles.searchInput}
              size="large"
              onPressEnter={handleStartAudit}
            />
            <Button
              type="primary"
              size="large"
              className={styles.searchButton}
              onClick={handleStartAudit}
            >
              Start SEO Audit
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default HeroSection;
