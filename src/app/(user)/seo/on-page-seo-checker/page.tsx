"use client";

import React from "react";
import HeroSection from "./components/hero-section";
import AnalysisOverview from "./components/analysis-overview";
import PagesAnalysis from "./components/pages-analysis";
import DetailedReports from "./components/detailed-reports";
import IdeasTypes from "./components/ideas-types";
import BottomCTA from "./components/bottom-cta";
import styles from "./page.module.scss";

const OnPageSEOCheckerPage: React.FC = () => {
  return (
    <div className={styles.onPageSEOCheckerPage}>
      <div className={styles.container}>
        <HeroSection />
      </div>

      <div className={styles.container}>
        <AnalysisOverview />
      </div>
      <div className={styles.container}>
        <PagesAnalysis />
      </div>

      <div className={styles.container}>
        <DetailedReports />
      </div>
      <div className={styles.container}>
        <IdeasTypes />
      </div>
      <div className={styles.container}>
        <BottomCTA />
      </div>
    </div>
  );
};

export default OnPageSEOCheckerPage;
