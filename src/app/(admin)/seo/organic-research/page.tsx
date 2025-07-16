"use client";
import React from "react";
import SearchSection from "./components/search-section";
import styles from "./page.module.scss";
import {
  CompetitorAnalysisSection,
  CTASection,
  KeywordAnalysisSection,
  PositionTrackingSection,
} from "./components";

type Props = {};

const Page = (props: Props) => {
  const handleSearch = (domain: string, location: string) => {
    console.log("Searching for:", domain, "in", location);
    // Implement search logic here
  };

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <SearchSection onSearch={handleSearch} />

        <KeywordAnalysisSection />

        <CompetitorAnalysisSection />

        <PositionTrackingSection />

        <CTASection />
      </div>
    </div>
  );
};

export default Page;
