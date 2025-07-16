"use client";
import React from "react";
import { Button, Card } from "antd";
import { BarChartOutlined } from "@ant-design/icons";
import styles from "./trends_api_section.module.scss";

type Props = {};

const TrendsApiSection = ({}: Props) => {
  return (
    <div className={styles.trendsApiSection}>
      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.textContent}>
            <h2 className={styles.title}>Trends API: Market Data at Scale</h2>
            <p className={styles.description}>
              Integrate fresh, granular website data across industries and geos
              — power your tools, dashboards, and strategy in real time
            </p>
            <Button type="primary" size="large" className={styles.accessBtn}>
              Get Access
            </Button>
          </div>

          <div className={styles.visualContent}>
            <Card className={styles.statsCard}>
              <div className={styles.statsHeader}>
                <div className={styles.iconWrapper}>
                  <BarChartOutlined />
                </div>
                <span className={styles.label}>Popular Blogs</span>
              </div>

              <div className={styles.statsBody}>
                <div className={styles.mainStat}>
                  <span className={styles.number}>+2M</span>
                  <div className={styles.chart}>
                    <div className={styles.chartLine}></div>
                    <div className={styles.chartDots}>
                      <div className={styles.dot}></div>
                      <div className={styles.dot}></div>
                      <div className={styles.dot}></div>
                    </div>
                  </div>
                </div>

                <div className={styles.trafficLabel}>Traffic</div>
              </div>

              <div className={styles.additionalStats}>
                <div className={styles.statItem}>
                  <span className={styles.statLabel}>Visitors</span>
                  <span className={styles.statValue}>1.2M</span>
                </div>
                <div className={styles.statItem}>
                  <span className={styles.statLabel}>Bounce Rate</span>
                  <span className={styles.statValue}>45%</span>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrendsApiSection;
