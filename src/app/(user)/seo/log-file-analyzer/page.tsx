"use client";

import React from "react";
import HeroSection from "./components/hero-section";
import AdvantagesSection from "./components/advantages-section";
import HowToAnalyze from "./components/how-to-analyze";
import styles from "./page.module.scss";

const LogFileAnalyzerPage: React.FC = () => {
  return (
    <div className={styles.logFileAnalyzerPage}>
      <div className={styles.container}>
        <HeroSection />
      </div>

      <div className={styles.container}>
        <AdvantagesSection />
      </div>

      <div className={styles.container}>
        <HowToAnalyze />
      </div>
    </div>
  );
};

export default LogFileAnalyzerPage;
