"use client";

import React from "react";
import HeroSourcesDestinations from "./components/hero_sources_destinations";
import SourcesDestinationsTracking from "./components/sources_destinations_tracking";
import styles from "./page.module.scss";

const SourcesDestinationsPage: React.FC = () => {
  return (
    <div className={styles.sourcesDestinationsPage}>
      <HeroSourcesDestinations />
      <SourcesDestinationsTracking />
    </div>
  );
};

export default SourcesDestinationsPage;
