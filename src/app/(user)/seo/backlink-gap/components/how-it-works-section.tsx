import React from "react";
import styles from "./how-it-works-section.module.scss";

const HowItWorksSection: React.FC = () => {
  return (
    <div className={styles.howItWorksSection}>
      <div className={styles.header}>
        <h2>How it works</h2>
      </div>

      <div className={styles.stepsContainer}>
        <div className={styles.step}>
          <div className={styles.stepNumber}>1</div>
          <div className={styles.stepContent}>
            <h3>Compare domains</h3>
            <p>Enter your and your competitor's domains.</p>
            <div className={styles.stepIllustration}>
              <div className={styles.demoForm}>
                <div className={styles.demoInput}>
                  <span className={styles.youLabel}>Your domain</span>
                  <span className={styles.competitorLabel}>Competitor</span>
                </div>
                <button className={styles.demoButton}>Find prospects</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HowItWorksSection;
