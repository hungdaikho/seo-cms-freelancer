"use client";

import React from "react";
import PositionTrackingManager from "./features/position_tracking_manager";
import styles from "./page.module.scss";

export default function PositionTrackingPage() {
  return (
    <div className={styles.positionTrackingPage}>
      <PositionTrackingManager />
    </div>
  );
}
