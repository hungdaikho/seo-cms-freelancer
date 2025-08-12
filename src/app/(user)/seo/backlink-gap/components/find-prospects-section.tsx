import React from "react";
import { Card } from "antd";
import styles from "./find-prospects-section.module.scss";

const FindProspectsSection: React.FC = () => {
  return (
    <div className={styles.findProspectsSection}>
      <div className={styles.sectionGrid}>
        <div className={styles.leftContent}>
          <h2>Find prospects</h2>
          <p>
            We will analyze these websites' backlink profiles and discover
            untapped{" "}
            <a href="#" className={styles.backlinkLink}>
              backlink
            </a>{" "}
            opportunities.
          </p>
        </div>

        <div className={styles.rightContent}>
          <Card className={styles.prospectsCard}>
            <div className={styles.prospectsContent}>
              <div className={styles.chartArea}>
                <svg viewBox="0 0 300 100" className={styles.chartSvg}>
                  <path
                    d="M20,80 Q60,40 120,50 T240,30 T280,40"
                    stroke="#3b82f6"
                    strokeWidth="2"
                    fill="none"
                  />
                  <path
                    d="M20,60 Q60,20 120,30 T240,20 T280,25"
                    stroke="#10b981"
                    strokeWidth="2"
                    fill="none"
                  />
                </svg>
              </div>

              <div className={styles.dataRows}>
                <div className={styles.dataRow}>
                  <div className={styles.rowDots}>
                    <span className={styles.dot}></span>
                    <span className={styles.dot}></span>
                    <span className={styles.dot}></span>
                  </div>
                  <div
                    className={styles.rowBar}
                    style={{ backgroundColor: "#3b82f6", width: "70%" }}
                  ></div>
                  <span className={styles.rowText}>████████</span>
                </div>
                <div className={styles.dataRow}>
                  <div className={styles.rowDots}>
                    <span className={styles.dot}></span>
                    <span className={styles.dot}></span>
                    <span className={styles.dot}></span>
                  </div>
                  <div
                    className={styles.rowBar}
                    style={{ backgroundColor: "#10b981", width: "50%" }}
                  ></div>
                  <span className={styles.rowText}>████</span>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default FindProspectsSection;
