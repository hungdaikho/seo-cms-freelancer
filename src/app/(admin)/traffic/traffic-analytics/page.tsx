"use client";

import React from "react";
import TrafficAnalyticsManager from "./features/traffic_analytics_manager";
import styles from "./page.module.scss";

const TrafficAnalyticsPage: React.FC = () => {
  return (
    <div className={styles.trafficAnalyticsPage}>
      <TrafficAnalyticsManager />
    </div>
  );
};

export default TrafficAnalyticsPage;
