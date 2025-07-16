"use client";
import React from "react";
import SearchSection from "./components/search-section";
import styles from "./page.module.scss";
import {
  CompetitorComparisonSection,
  CTASection,
  InsightsSection,
  KeywordTypesSection,
} from "./components";

type Props = {};

const Page = (props: Props) => {
  const handleCompare = (domains: string[], location: string) => {
    console.log("Comparing domains:", domains, "in", location);
    // Implement comparison logic here
  };

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <SearchSection onCompare={handleCompare} />

        <CompetitorComparisonSection />

        <KeywordTypesSection />

        <InsightsSection />

        <CTASection />
      </div>
    </div>
  );
};

export default Page;
