"use client";

import React from "react";
import HeroSection from "./components/hero-section";
import ProcessSection from "./components/process-section";
import FeaturesSection from "./components/features-section";
import PerformanceSection from "./components/performance-section";
import MonitoringSection from "./components/monitoring-section";
import CTASection from "./components/cta-section";
import FAQSection from "./components/faq-section";
import styles from "./page.module.scss";

const SiteAuditPage: React.FC = () => {
  return (
    <div className={styles.siteAuditPage}>
      <div className={styles.container}>
        <HeroSection />
      </div>

      <div className={styles.container}>
        <ProcessSection />
      </div>

      <div className={styles.container}>
        <div className={styles.container}>
          <FeaturesSection />
        </div>

        <PerformanceSection />

        <div className={styles.container}>
          <MonitoringSection />
        </div>

        <CTASection />

        <div className={styles.container}>
          <FAQSection />
        </div>
      </div>
    </div>
  );
};

export default SiteAuditPage;
