"use client";
import React from "react";
import SearchSection from "./components/search-section";
import HowItWorksSection from "./components/how-it-works-section";
import FindProspectsSection from "./components/find-prospects-section";
import ReceiveDomainsSection from "./components/receive-domains-section";
import CTASection from "./components/cta-section";
import styles from "./page.module.scss";

type Props = {};

const Page = (props: Props) => {
  const handleFindProspects = (domains: string[]) => {
    console.log("Finding prospects for domains:", domains);
    // Implement find prospects logic here
  };

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <SearchSection onFindProspects={handleFindProspects} />

        <HowItWorksSection />

        <FindProspectsSection />

        <ReceiveDomainsSection />

        <CTASection />
      </div>
    </div>
  );
};

export default Page;
