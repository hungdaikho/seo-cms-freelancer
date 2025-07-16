"use client";

import React from "react";
import HeroSection from "./components/hero-section";
import InfoSection from "./components/info-section";
import BenefitsSection from "./components/benefits-section";
import WhySemrushSection from "./components/why-semrush-section";
import ProcessSection from "./components/process-section";
import CTASection from "./components/cta-section";
import styles from "./page.module.scss";

const BacklinkAnalyticsPage: React.FC = () => {
  return (
    <div className={styles.backlinkAnalyticsPage}>
      <div className={styles.container}>
        <HeroSection
          onAnalyze={function (domain: string): void {
            throw new Error("Function not implemented.");
          }}
        />
      </div>

      <div className={styles.container}>
        <InfoSection />
      </div>
      <div className={styles.container}>
        <BenefitsSection />
      </div>
      <div className={styles.container}>
        <WhySemrushSection />
      </div>
      <div className={styles.container}>
        <ProcessSection />
      </div>
      <div className={styles.container}>
        <CTASection />
      </div>
    </div>
  );
};

export default BacklinkAnalyticsPage;
