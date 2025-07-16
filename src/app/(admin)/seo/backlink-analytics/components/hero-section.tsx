"use client";

import React, { useState } from "react";
import { Card, Input, Button } from "antd";
import styles from "./hero-section.module.scss";

interface HeroSectionProps {
  onAnalyze: (domain: string) => void;
}

const HeroSection: React.FC<HeroSectionProps> = ({ onAnalyze }) => {
  const [domain, setDomain] = useState("");

  const handleSubmit = () => {
    if (domain.trim()) {
      onAnalyze(domain.trim());
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSubmit();
    }
  };

  const exampleDomains = [
    "worldwildlife.org",
    "https://www.unicef.org/stories",
    "travel.cnn.com",
  ];

  return (
    <div className={styles.heroSection}>
      <Card className={styles.heroCard}>
        <div className={styles.heroContent}>
          <div className={styles.badge}>Free Backlink Checker</div>

          <h1 className={styles.title}>
            Check Backlinks for Any Website
            <br />
            Instantly with the Backlink Analytics Tool
          </h1>

          <p className={styles.subtitle}>
            Get a complete view of any site's backlink profile. Uncover who
            links to you (or your competitors),
            <br />
            spot new opportunities, and track link-building progress—all in one
            place.
          </p>

          <div className={styles.instructionText}>
            Enter any domain or URL and click <strong>"Analyze"</strong> to get
            started.
          </div>

          <div className={styles.searchContainer}>
            <Input
              placeholder="Enter domain or URL"
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
              className={styles.analyzeBtn}
            >
              Analyze
            </Button>
          </div>

          <div className={styles.examples}>
            <span className={styles.examplesLabel}>Examples:</span>
            {exampleDomains.map((example, index) => (
              <span
                key={index}
                className={styles.exampleLink}
                onClick={() => setDomain(example)}
              >
                {example}
              </span>
            ))}
          </div>
        </div>
      </Card>
    </div>
  );
};

export default HeroSection;
