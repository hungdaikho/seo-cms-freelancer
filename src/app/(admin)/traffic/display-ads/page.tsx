"use client";

import React from "react";
import HeroDisplayAds from "./components/hero_display_ads";
import DisplayTrackingSection from "./components/display_tracking_section";
import styles from "./page.module.scss";

const DisplayAdsPage: React.FC = () => {
  return (
    <div className={styles.displayAdsPage}>
      <HeroDisplayAds />
      <DisplayTrackingSection />
    </div>
  );
};

export default DisplayAdsPage;
