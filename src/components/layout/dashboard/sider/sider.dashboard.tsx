import React from "react";
import styles from "./sider.dashboard.module.scss";
import { FaQuestionCircle } from "react-icons/fa";
import { useRouter, usePathname } from "next/navigation";

const SiderDashBoard = () => {
  const router = useRouter();
  const pathname = usePathname();

  const isActive = (path: string) => {
    if (path === "/dashboard") {
      return pathname === "/dashboard";
    }
    return pathname.startsWith(path);
  };

  return (
    <div className={styles.sider}>
      {/* Dashboard Section */}
      <div className={styles.sectionTitle}>Dashboard</div>

      <div
        className={`${styles.menuItem} ${
          isActive("/dashboard") ? styles.active : ""
        }`}
        onClick={() => router.push("/dashboard")}
      >
        <span>Dashboard</span>
      </div>

      {/* SEO Submenu Items */}
      <div
        className={`${styles.menuItem} ${styles.submenuItem} ${
          isActive("/rank-tracking") ? styles.active : ""
        }`}
        onClick={() => router.push("/rank-tracking")}
      >
        <span>Rank Tracking</span>
      </div>

      <div
        className={`${styles.menuItem} ${styles.submenuItem} ${
          isActive("/competitive-research") ? styles.active : ""
        }`}
        onClick={() => router.push("/competitive-research")}
      >
        <span>Competitive Research</span>
      </div>

      <div
        className={`${styles.menuItem} ${styles.submenuItem} ${
          isActive("/keyword-research") ? styles.active : ""
        }`}
        onClick={() => router.push("/keyword-research")}
      >
        <span>Keyword Research</span>
      </div>

      <div
        className={`${styles.menuItem} ${styles.submenuItem} ${
          isActive("/backlink-research") ? styles.active : ""
        }`}
        onClick={() => router.push("/backlink-research")}
      >
        <span>Backlink Research</span>
      </div>

      <div
        className={`${styles.menuItem} ${styles.submenuItem} ${
          isActive("/on-page-tech-audit") ? styles.active : ""
        }`}
        onClick={() => router.push("/on-page-tech-audit")}
      >
        <span>On Page & Tech Audit</span>
      </div>

      {/* Support Section */}
      <div className={styles.sectionTitle}>Support</div>

      <div className={styles.helpButton}>
        <FaQuestionCircle />
        <span>Help ?</span>
      </div>
    </div>
  );
};

export default SiderDashBoard;
