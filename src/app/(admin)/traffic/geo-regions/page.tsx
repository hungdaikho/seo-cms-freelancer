import React from "react";
import HeroGeoRegions from "./components/hero_geo_regions";
import GeoRegionsTracking from "./components/geo_regions_tracking";
import GeoRegionsFeatures from "./components/geo_regions_features";
import styles from "./page.module.scss";

const GeoRegionsPage: React.FC = () => {
  return (
    <div className={styles.geoRegionsPage}>
      <HeroGeoRegions />
      <GeoRegionsTracking />
      <GeoRegionsFeatures />
    </div>
  );
};

export default GeoRegionsPage;
