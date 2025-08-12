import React from "react";
import MapTrackerHeroSection from "./components/map_tracker_hero_section";
import MapAnalyticsSection from "./components/map_analytics_section";
import VideoDemoSection from "./components/video_demo_section";
import GettingStartedSection from "./components/getting_started_section";
import MapTrackerFaqSection from "./components/map_tracker_faq_section";
import styles from "./page.module.scss";

const MapRankTrackerPage: React.FC = () => {
  return (
    <div className={styles.map_rank_tracker_page}>
      <MapTrackerHeroSection />
      <MapAnalyticsSection />
      <VideoDemoSection />
      <GettingStartedSection />
      <MapTrackerFaqSection />
    </div>
  );
};

export default MapRankTrackerPage;
