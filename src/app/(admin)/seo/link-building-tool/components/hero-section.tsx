"use client";

import React, { useState } from "react";
import { Input, Button, Row, Col, Card } from "antd";
import styles from "./hero-section.module.scss";

interface HeroSectionProps {}

const HeroSection: React.FC<HeroSectionProps> = () => {
  const [domain, setDomain] = useState("");

  const handleStartLinkBuilding = () => {
    if (domain.trim()) {
      console.log("Starting link building for:", domain);
      // Handle link building logic here
    }
  };

  const stats = [
    {
      number: "2,000",
      label: "prospects for each domain",
    },
    {
      number: "10",
      label: "outreach strategies predefined",
    },
    {
      number: "4",
      label: "parameters for tracking outreach",
    },
  ];

  return (
    <div className={styles.heroSection}>
      <div className={styles.heroContent}>
        <h1 className={styles.heroTitle}>Link Building Tool</h1>
        <p className={styles.heroSubtitle}>
          A powerful tool to quickly and easily build backlinks
        </p>

        <Row gutter={[32, 16]} className={styles.statsRow}>
          {stats.map((stat, index) => (
            <Col xs={24} md={8} key={index}>
              <div className={styles.statItem}>
                <div className={styles.statNumber}>{stat.number}</div>
                <div className={styles.statLabel}>{stat.label}</div>
              </div>
            </Col>
          ))}
        </Row>

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

        <Card className={styles.tipCard}>
          <div className={styles.tipContent}>
            <div className={styles.tipIcon}>📚</div>
            <div className={styles.tipText}>
              Check out tips and tricks on how the Link Building Tool can help
              you.{" "}
              <a href="#" className={styles.tipLink}>
                Learn more
              </a>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default HeroSection;
