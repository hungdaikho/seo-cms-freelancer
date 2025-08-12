"use client";

import React from "react";
import BacklinkAnalyticsManager from "./features/backlink_analytics_manager";
import styles from "./page.module.scss";

const BacklinkAnalyticsPage: React.FC = () => {
  return (
    <div className={styles.backlinkAnalyticsPage}>
      <BacklinkAnalyticsManager />
    </div>
  );
};

export default BacklinkAnalyticsPage;
