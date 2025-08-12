"use client";

import React from "react";
import KeywordGapAnalyzer from "./features/keyword_gap_analyzer";
import styles from "./page.module.scss";

const KeywordGapPage: React.FC = () => {
  return (
    <div className={styles.keywordGapPage}>
      <KeywordGapAnalyzer />
    </div>
  );
};

export default KeywordGapPage;
