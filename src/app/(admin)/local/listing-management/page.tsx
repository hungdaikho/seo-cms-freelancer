import React from "react";
import ListingHeroSection from "./components/listing_hero_section";
import DirectoryVisibilitySection from "./components/directory_visibility_section";
import GbpManagementSection from "./components/gbp_management_section";
import MapsRankingSection from "./components/maps_ranking_section";
import ReputationManagementSection from "./components/reputation_management_section";
import ListingFaqSection from "./components/listing_faq_section";
import ListingCtaSection from "./components/listing_cta_section";
import styles from "./page.module.scss";

const ListingManagementPage: React.FC = () => {
  return (
    <div className={styles.listing_management_page}>
      <ListingHeroSection />
      <DirectoryVisibilitySection />
      <GbpManagementSection />
      <MapsRankingSection />
      <ReputationManagementSection />
      <ListingFaqSection />
      <ListingCtaSection />
    </div>
  );
};

export default ListingManagementPage;
