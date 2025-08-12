"use client";

import React from "react";
import HeroSection from "./components/hero-section";
import FeaturesSection from "./components/features-section";
import EditorDemo from "./components/editor-demo";
import AnalysisSection from "./components/analysis-section";
import AddonsSection from "./components/addons-section";
import TestimonialsSection from "./components/testimonials-section";
import styles from "./page.module.scss";

const SEOWritingAssistantPage: React.FC = () => {
  return (
    <div className={styles.seoWritingAssistantPage}>
      <div className={styles.container}>
        <HeroSection />
      </div>

      <div className={styles.container}>
        <FeaturesSection />
      </div>

      <div className={styles.container}>
        <EditorDemo />
      </div>

      <div className={styles.container}>
        <AnalysisSection />
      </div>

      <div className={styles.container}>
        <AddonsSection />
      </div>

      <div className={styles.container}>
        <TestimonialsSection />
      </div>
    </div>
  );
};

export default SEOWritingAssistantPage;
