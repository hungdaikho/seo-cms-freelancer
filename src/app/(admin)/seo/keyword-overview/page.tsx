"use client";

import {
  SearchSection,
  AboutSection,
  MetricsSection,
  FeaturesSection,
  HowToUseSection,
  KeywordMetricsSection,
  DifficultySection,
  CTASection,
} from "./components";
import styles from "./page.module.scss";

const KeywordOverviewPage = () => {
  return (
    <div className={styles.keywordOverviewPage}>
      <div className={styles.container}>
        <SearchSection />
        <AboutSection />
        <MetricsSection />
        <FeaturesSection />
        <HowToUseSection />
        <KeywordMetricsSection />
        <DifficultySection />
      </div>
      <CTASection />
    </div>
  );
};

export default KeywordOverviewPage;
