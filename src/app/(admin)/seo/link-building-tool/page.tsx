"use client";

import React from "react";
import HeroSection from "./components/hero-section";
import ProcessSection from "./components/process-section";
import CTASection from "./components/cta-section";
import styles from "./page.module.scss";

const LinkBuildingToolPage: React.FC = () => {
  return (
    <div className={styles.linkBuildingToolPage}>
      <div className={styles.container}>
        <HeroSection />
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

export default LinkBuildingToolPage;
