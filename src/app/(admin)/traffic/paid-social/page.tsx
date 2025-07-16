import React from "react";
import HeroPaidSocial from "./components/hero_paid_social";
import PaidSocialTrackingSection from "./components/paid_social_tracking_section";
import styles from "./page.module.scss";

const PaidSocialPage: React.FC = () => {
  return (
    <div className={styles.paidSocialPage}>
      <HeroPaidSocial />
      <PaidSocialTrackingSection />
    </div>
  );
};

export default PaidSocialPage;
