import React from "react";
import HeroInsider from "./components/hero_insider";
import TrustedBySection from "./components/trusted_by_section";
import BusinessResultsSection from "./components/business_results_section";
import LatestNewsSection from "./components/latest_news_section";
import SuccessStoriesSection from "./components/success_stories_section";
import FaqSection from "./components/faq_section";
import styles from "./page.module.scss";

type Props = {};

const Page = ({}: Props) => {
  return (
    <div className={styles.insiderKnowledgePage}>
      <HeroInsider />
      <TrustedBySection />
      <BusinessResultsSection />
      <LatestNewsSection />
      <SuccessStoriesSection />
      <FaqSection />
    </div>
  );
};

export default Page;
