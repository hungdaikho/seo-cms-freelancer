import React from "react";
import HeroOrganicSearch from "./components/hero_organic_search";
import OrganicOpportunitiesSection from "./components/organic_opportunities_section";
import styles from "./page.module.scss";

const OrganicSearchPage: React.FC = () => {
  return (
    <div className={styles.organicSearchPage}>
      <HeroOrganicSearch />
      <OrganicOpportunitiesSection />
    </div>
  );
};

export default OrganicSearchPage;
