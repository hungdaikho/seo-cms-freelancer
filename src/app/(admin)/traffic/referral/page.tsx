import React from "react";
import HeroReferral from "./components/hero_referral";
import ReferralPatternsSection from "./components/referral_patterns_section";
import styles from "./page.module.scss";

const ReferralPage: React.FC = () => {
  return (
    <div className={styles.referralPage}>
      <HeroReferral />
      <ReferralPatternsSection />
    </div>
  );
};

export default ReferralPage;
