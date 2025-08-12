import React from "react";
import GbpHeroSection from "./components/gbp_hero_section";
import ElevateGbpSection from "./components/elevate_gbp_section";
import InsightsSection from "./components/insights_section";
import PostSchedulingSection from "./components/post_scheduling_section";
import ReputationSection from "./components/reputation_section";
import ControlUpdatesSection from "./components/control_updates_section";
import MapsRankingSection from "./components/maps_ranking_section";
import GbpFaqSection from "./components/gbp_faq_section";
import GbpCtaSection from "./components/gbp_cta_section";
import styles from "./page.module.scss";

type Props = {};

const Page = (props: Props) => {
  return (
    <div className={styles.container}>
      <GbpHeroSection />
      <ElevateGbpSection />
      <InsightsSection />
      <PostSchedulingSection />
      <ReputationSection />
      <ControlUpdatesSection />
      <MapsRankingSection />
      <GbpFaqSection />
      <GbpCtaSection />
    </div>
  );
};

export default Page;
