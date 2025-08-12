import React from "react";
import HeroDemographics from "./components/hero_demographics";
import DemographicsTracking from "./components/demographics_tracking";
import DemographicsFeatures from "./components/demographics_features";
import styles from "./page.module.scss";

const DemographicsPage: React.FC = () => {
  return (
    <div className={styles.demographicsPage}>
      <HeroDemographics />
      <DemographicsTracking />
      <DemographicsFeatures />
    </div>
  );
};

export default DemographicsPage;
