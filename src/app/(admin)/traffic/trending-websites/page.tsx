"use client";

import React from "react";
import HeroTrendingWebsites from "./components/hero_trending_websites";
import TrackingTrendingWebsites from "./components/tracking_trending_websites";
import FeaturesTrendingWebsites from "./components/features_trending_websites";
import styles from "./page.module.scss";

const TrendingWebsitesPage: React.FC = () => {
  return (
    <div className={styles.container}>
      <div className={styles.pageWrapper}>
        <HeroTrendingWebsites />
        <TrackingTrendingWebsites />
        <FeaturesTrendingWebsites />
      </div>
    </div>
  );
};

export default TrendingWebsitesPage;
