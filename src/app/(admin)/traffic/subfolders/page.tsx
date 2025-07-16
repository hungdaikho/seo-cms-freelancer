"use client";

import React from "react";
import HeroSubfolders from "./components/hero_subfolders";
import SubfoldersTracking from "./components/subfolders_tracking";
import styles from "./page.module.scss";

const SubfoldersPage: React.FC = () => {
  return (
    <div className={styles.subfoldersPage}>
      <HeroSubfolders />
      <SubfoldersTracking />
    </div>
  );
};

export default SubfoldersPage;
