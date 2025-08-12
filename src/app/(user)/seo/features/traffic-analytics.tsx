import React from "react";
import { Card, Button, Tabs } from "antd";
import styles from "./traffic-analytics.module.scss";

const TrafficAnalytics: React.FC = () => {
  const tabItems = [
    {
      key: "semrush",
      label: "🔍 Semrush Data",
    },
    {
      key: "google",
      label: "📊 Google Data",
    },
  ];

  return (
    <div className={styles.analyticsContainer}>
      <div className={styles.leftSection}>
        <Card className={styles.trafficCard}>
          <div className={styles.cardHeader}>
            <h3>Traffic Analytics</h3>
            <div className={styles.tabs}>
              <Tabs defaultActiveKey="semrush" size="small" items={tabItems} />
            </div>
            <div className={styles.scope}>
              <span>Scope: Root Domain</span>
              <Button type="text" size="small">
                ✕
              </Button>
            </div>
          </div>

          <div className={styles.emptyState}>
            <div className={styles.emptyIcon}>📊</div>
            <div className={styles.emptyTitle}>Nothing found</div>
            <div className={styles.emptyText}>
              We haven't found any data for the analyzed domain
            </div>
          </div>
        </Card>

        <Card className={styles.backlinksCard}>
          <div className={styles.cardHeader}>
            <h3>Backlink Analytics</h3>
            <div className={styles.scope}>
              <span>Scope: Root Domain</span>
              <Button type="text" size="small">
                ✕
              </Button>
            </div>
          </div>

          <div className={styles.backlinksContent}>
            <div className={styles.chartSection}>
              <div className={styles.chartHeader}>
                <span>Referring Domains</span>
                <span className={styles.timeRange}>Last 12 months</span>
              </div>
              <div className={styles.chart}>
                <svg viewBox="0 0 400 120" className={styles.svgChart}>
                  <defs>
                    <linearGradient
                      id="areaGradient"
                      x1="0%"
                      y1="0%"
                      x2="0%"
                      y2="100%"
                    >
                      <stop offset="0%" stopColor="#1890ff" stopOpacity="0.3" />
                      <stop
                        offset="100%"
                        stopColor="#1890ff"
                        stopOpacity="0.1"
                      />
                    </linearGradient>
                  </defs>
                  <path
                    d="M 0,100 L 50,90 L 150,60 L 250,40 L 350,30 L 400,25 L 400,120 L 0,120 Z"
                    fill="url(#areaGradient)"
                  />
                  <path
                    d="M 0,100 L 50,90 L 150,60 L 250,40 L 350,30 L 400,25"
                    stroke="#1890ff"
                    strokeWidth="2"
                    fill="none"
                  />
                </svg>
              </div>
            </div>

            <div className={styles.domainsBreakdown}>
              <div className={styles.breakdownHeader}>
                <span>Referring Domains by Authority Score</span>
                <span>Jul 2025</span>
              </div>
              <div className={styles.breakdownList}>
                <div className={styles.breakdownItem}>
                  <span>81-100</span>
                  <span>0%</span>
                  <span className={styles.count}>0</span>
                </div>
                <div className={styles.breakdownItem}>
                  <span>61-80</span>
                  <span>0%</span>
                  <span className={styles.count}>0</span>
                </div>
                <div className={styles.breakdownItem}>
                  <span>41-60</span>
                  <span>0%</span>
                  <span className={styles.count}>0</span>
                </div>
                <div className={styles.breakdownItem}>
                  <span>21-40</span>
                  <span>0%</span>
                  <span className={styles.count}>0</span>
                </div>
                <div className={styles.breakdownItem}>
                  <span>0-20</span>
                  <div className={styles.progressBar}>
                    <div
                      className={styles.progressFill}
                      style={{ width: "100%" }}
                    ></div>
                  </div>
                  <span>100%</span>
                  <span className={styles.count}>71</span>
                </div>
              </div>
            </div>
          </div>

          <div className={styles.cardFooter}>
            <Button type="link">View full report</Button>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default TrafficAnalytics;
