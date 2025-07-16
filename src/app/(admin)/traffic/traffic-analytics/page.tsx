import React from "react";
import HeroAnalytics from "./components/hero_analytics";
import GrowthOpportunitiesSection from "./components/growth_opportunities_section";
import styles from "./page.module.scss";

type Props = {};

const Page = ({}: Props) => {
  return (
    <div className={styles.trafficAnalyticsPage}>
      <HeroAnalytics />
      <GrowthOpportunitiesSection />
    </div>
  );
};

export default Page;
