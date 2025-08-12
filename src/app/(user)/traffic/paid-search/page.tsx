import React from "react";
import HeroPaidSearch from "./components/hero_paid_search";
import PaidMonitoringSection from "./components/paid_monitoring_section";
import styles from "./page.module.scss";

const PaidSearchPage: React.FC = () => {
  return (
    <div className={styles.paidSearchPage}>
      <HeroPaidSearch />
      <PaidMonitoringSection />
    </div>
  );
};

export default PaidSearchPage;
