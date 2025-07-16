"use client";

import React, { useState } from "react";
import {
  HeroSection,
  KeywordsSection,
  AnalyticsSection,
  ExportSection,
  StrategySection,
  CTASection,
} from "./components";
import styles from "./page.module.scss";

export default function OrganicTrafficInsightsPage() {
  const [searchDomain, setSearchDomain] = useState("");

  const handleGetInsights = (domain: string) => {
    setSearchDomain(domain);
    // Here you would typically make an API call to get insights for the domain
    console.log("Getting insights for:", domain);
  };

  return (
    <div className={styles.organicTrafficInsightsPage}>
      <div className={styles.container}>
        <HeroSection onGetInsights={handleGetInsights} />
        <KeywordsSection />
        <AnalyticsSection />
        <ExportSection />
        <StrategySection />
        <CTASection />
      </div>
    </div>
  );
}
