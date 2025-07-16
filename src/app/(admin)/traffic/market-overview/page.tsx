import React from "react";
import HeroMarketOverview from "./components/hero_market_overview";
import MarketOverviewTracking from "./components/market_overview_tracking";
import MarketOverviewFeatures from "./components/market_overview_features";
import styles from "./page.module.scss";

const MarketOverviewPage: React.FC = () => {
  return (
    <div className={styles.marketOverviewPage}>
      <HeroMarketOverview />
      <MarketOverviewTracking />
      <MarketOverviewFeatures />
    </div>
  );
};

export default MarketOverviewPage;
