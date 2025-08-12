"use client";

import React from "react";
import SiteAuditManager from "./features/site_audit_manager";
import styles from "./page.module.scss";

const SiteAuditPage: React.FC = () => {
  return (
    <div className={styles.siteAuditPage}>
      <SiteAuditManager />
    </div>
  );
};

export default SiteAuditPage;
