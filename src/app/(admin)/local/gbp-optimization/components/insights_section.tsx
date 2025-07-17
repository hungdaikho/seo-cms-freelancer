"use client";
import React from "react";
import { Button } from "antd";
import { BiTrendingUp, BiTrendingDown } from "react-icons/bi";
import styles from "./insights_section.module.scss";

type Props = {};

const InsightsSection = (props: Props) => {
  return (
    <div className={styles.section}>
      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.leftColumn}>
            <h3 className={styles.sectionTitle}>
              Get unique insights into your business's local search presence
            </h3>

            <ul className={styles.featureList}>
              <li className={styles.featureItem}>
                Track your profile appearances in local search results and on
                Google Maps, with data segmented by desktop and mobile
              </li>
              <li className={styles.featureItem}>
                Analyze performance by day, week, or month, and compare
                year-to-year results with over 24 months of historical data
                access (four times more than GBP's own performance report)
              </li>
              <li className={styles.featureItem}>
                Monitor key engagement metrics such as site visits, direction
                requests, phone calls, and messages
              </li>
            </ul>

            <Button type="primary" className={styles.connectBtn}>
              Connect your business
            </Button>
          </div>

          <div className={styles.rightColumn}>
            <div className={styles.insightsCard}>
              <div className={styles.cardHeader}>
                <h4>Google Business Profile Insights</h4>
              </div>

              <div className={styles.statsRow}>
                <div className={styles.statItem}>
                  <div className={styles.statLabel}>Views</div>
                  <div className={styles.statValue}>
                    55.1K <span className={styles.positive}>+28%</span>
                  </div>
                </div>
                <div className={styles.statItem}>
                  <div className={styles.statLabel}>Actions</div>
                  <div className={styles.statValue}>
                    345 <span className={styles.negative}>-2.5%</span>
                  </div>
                </div>
                <div className={styles.statItem}>
                  <div className={styles.statLabel}>Average Rating</div>
                  <div className={styles.statValue}>
                    4.8 <span className={styles.positive}>+0.3</span>
                  </div>
                </div>
              </div>

              <div className={styles.chartsRow}>
                <div className={styles.chartItem}>
                  <div className={styles.chartLabel}>Google Search Views</div>
                  <div className={styles.chartStats}>
                    <span className={styles.year}>• 2024</span>
                    <span className={styles.year}>• 2023</span>
                    <span className={styles.positive}>+26%</span>
                  </div>
                  <div className={styles.chartPlaceholder}>
                    <div className={styles.chartLine}></div>
                  </div>
                  <div className={styles.chartAxis}>
                    <span>Jan</span>
                    <span>Jul</span>
                    <span>Dec</span>
                  </div>
                </div>

                <div className={styles.chartItem}>
                  <div className={styles.chartLabel}>Google Maps Views</div>
                  <div className={styles.chartStats}>
                    <span className={styles.year}>• 2024</span>
                    <span className={styles.year}>• 2023</span>
                    <span className={styles.positive}>+40%</span>
                  </div>
                  <div className={styles.chartPlaceholder}>
                    <div className={styles.chartLine}></div>
                  </div>
                  <div className={styles.chartAxis}>
                    <span>Jan</span>
                    <span>Jul</span>
                    <span>Dec</span>
                  </div>
                </div>
              </div>

              <div className={styles.viewsDistribution}>
                <div className={styles.distributionLabel}>
                  Views Distribution
                </div>
                <div className={styles.distributionBar}></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InsightsSection;
