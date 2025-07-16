"use client";

import React, { useState } from "react";
import { HeaderSection, ProjectsTable, PricingModal } from "./components";
import styles from "./page.module.scss";

export default function PositionTrackingPage() {
  const [showPricingModal, setShowPricingModal] = useState(false);

  const handleCreateProject = () => {
    setShowPricingModal(true);
  };

  const handleUpgrade = () => {
    setShowPricingModal(true);
  };

  const handleClosePricingModal = () => {
    setShowPricingModal(false);
  };

  return (
    <div className={styles.positionTrackingPage}>
      <HeaderSection onCreateProject={handleCreateProject} />
      <ProjectsTable onUpgrade={handleUpgrade} />

      <PricingModal
        visible={showPricingModal}
        onClose={handleClosePricingModal}
      />
    </div>
  );
}
