"use client";

import React from "react";
import ContentPlanningManager from "./features/content_planning_manager";
import styles from "./page.module.scss";

export default function ContentPage() {
  return (
    <div className={styles.contentPage}>
      <ContentPlanningManager />
    </div>
  );
}
