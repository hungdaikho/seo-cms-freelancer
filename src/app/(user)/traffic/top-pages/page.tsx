"use client";

import React from "react";
import HeroTopPages from "./components/hero_top_pages";
import TopPagesTracking from "./components/top_pages_tracking";
import styles from "./page.module.scss";

const TopPagesPage: React.FC = () => {
  return (
    <div className={styles.topPagesPage}>
      <HeroTopPages />
      <TopPagesTracking />
    </div>
  );
};

export default TopPagesPage;
