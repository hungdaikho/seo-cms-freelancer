import React from "react";
import { Card, Tag } from "antd";
import styles from "./competitor-analysis-section.module.scss";

const CompetitorAnalysisSection: React.FC = () => {
  return (
    <div className={styles.competitorAnalysisSection}>
      <div className={styles.sectionGrid}>
        <div className={styles.leftContent}>
          <h2>Identify the topics that bring them the most organic traffic</h2>
          <ul className={styles.featuresList}>
            <li>
              Get a snapshot of the key topics driving non-branded organic
              traffic to your competitors' domains.
            </li>
            <li>
              Uncover content gaps and build keyword lists for content briefs.
            </li>
            <li>
              Prepare client pitches with actionable content opportunities.
            </li>
          </ul>
        </div>

        <div className={styles.rightContent}>
          <Card className={styles.topicsCard}>
            <div className={styles.topicsContent}>
              <div className={styles.topicsHeader}>
                <h3>Women's Dresses</h3>
              </div>

              <div className={styles.topicsGrid}>
                <div className={styles.topicItem}>
                  <Tag color="blue" className={styles.topicTag}>
                    Wedding dresses
                  </Tag>
                </div>
                <div className={styles.topicItem}>
                  <Tag color="purple" className={styles.topicTag}>
                    Summer dresses
                  </Tag>
                </div>
                <div className={styles.topicItem}>
                  <Tag color="cyan" className={styles.topicTag}>
                    Winter dresses
                  </Tag>
                </div>
              </div>

              <div className={styles.keywordsTable}>
                <div className={styles.tableHeader}>
                  <span>Top keywords:</span>
                </div>
                <div className={styles.keywordRows}>
                  <div className={styles.keywordRow}>
                    <div
                      className={styles.keywordBar}
                      style={{ backgroundColor: "#3b82f6", width: "80%" }}
                    ></div>
                    <div className={styles.keywordData}>
                      <span className={styles.intent}>H</span>
                      <span className={styles.letter}>N</span>
                      <span className={styles.traffic}>276.3K</span>
                    </div>
                  </div>
                  <div className={styles.keywordRow}>
                    <div
                      className={styles.keywordBar}
                      style={{ backgroundColor: "#10b981", width: "60%" }}
                    ></div>
                    <div className={styles.keywordData}>
                      <span className={styles.intent}>I</span>
                      <span className={styles.letter}>I</span>
                      <span className={styles.traffic}>226.1K</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default CompetitorAnalysisSection;
