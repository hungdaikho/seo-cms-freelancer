"use client";

import {
  HeroSection,
  ProcessSection,
  TopicOverviewSection,
  StrategyStepsSection,
  CTASection,
} from "./components";
import styles from "./page.module.scss";

const KeywordStrategyBuilderPage: React.FC = () => {
  return (
    <div className={styles.keywordStrategyBuilderPage}>
      <div className={styles.container}>
        <HeroSection />
        <ProcessSection />
        <TopicOverviewSection />
        <StrategyStepsSection />
      </div>
      <CTASection />
    </div>
  );
};

export default KeywordStrategyBuilderPage;
