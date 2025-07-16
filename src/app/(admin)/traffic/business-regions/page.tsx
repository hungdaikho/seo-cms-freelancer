import React from "react";
import HeroBusinessRegions from "./components/hero_business_regions";
import BusinessRegionsTracking from "./components/business_regions_tracking";
import BusinessRegionsFeatures from "./components/business_regions_features";
import styles from "./page.module.scss";

const BusinessRegionsPage: React.FC = () => {
  return (
    <div className={styles.businessRegionsPage}>
      <HeroBusinessRegions />
      <BusinessRegionsTracking />
      <BusinessRegionsFeatures />
    </div>
  );
};

export default BusinessRegionsPage;
