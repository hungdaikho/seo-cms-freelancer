"use client";

import React, { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import ContentPlanningManager from "./features/content_planning_manager";
import styles from "./page.module.scss";

export default function ContentPage() {
  const searchParams = useSearchParams();

  // Tab mapping for URL parameters (for navigation features)
  const tabMapping: { [key: string]: boolean } = {
    "content-planning": true,
    "content-templates": true,
    "content-ideas": true,
    "content-calendar": true,
    "content-performance": true,
  };

  // Handle tab parameter from URL - just acknowledge it exists
  useEffect(() => {
    const tabParam = searchParams.get("tab");
    if (tabParam && tabMapping[tabParam]) {
      // Tab parameter recognized, show the content planning dashboard
      console.log(`Navigated to Content feature: ${tabParam}`);
    }
  }, [searchParams]);

  return (
    <div className={styles.contentPage}>
      <ContentPlanningManager />
    </div>
  );
}
