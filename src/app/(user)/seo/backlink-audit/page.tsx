"use client";

import React from "react";
import HeroSection from "./components/hero-section";
import AuditResultsSection from "./components/audit-results-section";
import FeaturesSection from "./components/features-section";
import IntegrationsSection from "./components/integrations-section";
import KeyFeaturesSection from "./components/key-features-section";
import CTASection from "./components/cta-section";
import FAQSection from "./components/faq-section";
import styles from "./page.module.scss";

const BacklinkAuditPage: React.FC = () => {
  return (
    <div className={styles.backlinkAuditPage}>
      <div className={styles.container}>
        <HeroSection />
      </div>

      <div className={styles.container}>
        <AuditResultsSection />
      </div>

      <div className={styles.container}>
        <FeaturesSection />
      </div>

      <IntegrationsSection />

      <KeyFeaturesSection />

      <div className={styles.container}>
        <CTASection />
      </div>

      <div className={styles.container}>
        <FAQSection />
      </div>
    </div>
  );
};

export default BacklinkAuditPage;
