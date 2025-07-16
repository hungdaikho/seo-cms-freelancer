import React from "react";
import HeroOrganicSocial from "./components/hero_organic_social";
import SocialTrackingSection from "./components/social_tracking_section";
import styles from "./page.module.scss";

const OrganicSocialPage: React.FC = () => {
  return (
    <div className={styles.organicSocialPage}>
      <HeroOrganicSocial />
      <SocialTrackingSection />
    </div>
  );
};

export default OrganicSocialPage;
