"use client";

import {
  SearchSection,
  AboutSection,
  ResultsSection,
  MetricsSection,
  HowToUseSection,
  FeaturesSection,
  CTASection,
} from "./components";
import styles from "./page.module.scss";

const KeywordMagicToolPage = () => {
  return (
    <div className={styles.keywordMagicToolPage}>
      <div className={styles.container}>
        <SearchSection />
        <AboutSection />
        <ResultsSection />
        <MetricsSection />
        <HowToUseSection />
        <FeaturesSection />
      </div>
      <CTASection />
    </div>
  );
};

export default KeywordMagicToolPage;
