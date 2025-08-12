import React from "react";
import HeroAudienceOverlap from "./components/hero_audience_overlap";
import AudienceOverlapTracking from "./components/audience_overlap_tracking";
import AudienceOverlapFeatures from "./components/audience_overlap_features";
import styles from "./page.module.scss";

const AudienceOverlapPage: React.FC = () => {
  return (
    <div className={styles.audienceOverlapPage}>
      <HeroAudienceOverlap />
      <AudienceOverlapTracking />
      <AudienceOverlapFeatures />
    </div>
  );
};

export default AudienceOverlapPage;
