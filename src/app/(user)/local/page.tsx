import React from "react";
import HeroSection from "./components/hero_section";
import BusinessToolsSection from "./components/business_tools_section";
import ReviewManagementSection from "./components/review_management_section";
import MapRankTrackerSection from "./components/map_rank_tracker_section";
import TestimonialsSection from "./components/testimonials_section";
import FaqSection from "./components/faq_section";
import CtaSection from "./components/cta_section";
import styles from "./page.module.scss";

type Props = {};

const Page = (props: Props) => {
  return (
    <div className={styles.container}>
      <HeroSection />
      <BusinessToolsSection />
      <ReviewManagementSection />
      <MapRankTrackerSection />
      <TestimonialsSection />
      <FaqSection />
      <CtaSection />
    </div>
  );
};

export default Page;
