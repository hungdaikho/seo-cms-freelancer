"use client";

import React from "react";
import HeroSection from "./components/hero-section";
import styles from "./page.module.scss";

const BulkAnalysisPage: React.FC = () => {
  return (
    <div className={styles.bulkAnalysisPage}>
      <div className={styles.container}>
        <HeroSection />
      </div>
    </div>
  );
};

export default BulkAnalysisPage;
