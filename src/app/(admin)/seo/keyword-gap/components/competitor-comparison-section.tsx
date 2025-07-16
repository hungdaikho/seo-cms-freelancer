import React from "react";
import { Card, Tag, Button } from "antd";
import styles from "./competitor-comparison-section.module.scss";

const CompetitorComparisonSection: React.FC = () => {
  return (
    <div className={styles.competitorSection}>
      <div className={styles.sectionGrid}>
        <div className={styles.leftContent}>
          <h2>Enter your competitors</h2>
          <p>
            Specify up to 5 any domains, subdomains, folders or exact URLs. Get
            a list containing all common and unique keywords they rank for.
          </p>
        </div>

        <div className={styles.rightContent}>
          <Card className={styles.competitorCard}>
            <div className={styles.competitorDemo}>
              <div className={styles.demoHeader}>
                <div className={styles.domainTabs}>
                  <Tag color="blue" className={styles.activeTab}>
                    You
                  </Tag>
                  <Tag className={styles.inactiveTab}>ebay.com ✕</Tag>
                  <Tag className={styles.inactiveTab}>All competitor ✕</Tag>
                  <Tag className={styles.inactiveTab}>All competitor ✕</Tag>
                </div>
                <div className={styles.keywordTabs}>
                  <Tag color="cyan" className={styles.keywordTab}>
                    Organic keywords
                  </Tag>
                  <Tag className={styles.keywordTab}>Paid keywords</Tag>
                  <Tag className={styles.keywordTab}>PLA keywords</Tag>
                </div>
                <Button className={styles.compareBtn}>Compare</Button>
              </div>

              <div className={styles.illustrationArea}>
                <div className={styles.illustration}>
                  {/* Simplified illustration representation */}
                  <div className={styles.illustrationShape}></div>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default CompetitorComparisonSection;
