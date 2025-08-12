"use client";
import React from "react";
import { Card } from "antd";
import styles from "./growth_opportunities_section.module.scss";

type Props = {};

const GrowthOpportunitiesSection = ({}: Props) => {
  const features = [
    "Monitor traffic changes, growth spikes, and data patterns over time",
    "Benchmark multiple domains by visit volume, bounce rate, and engagement",
    "Compare traffic channel metrics – organic, paid, email, referral, and more",
  ];

  return (
    <div className={styles.growthSection}>
      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.textContent}>
            <h2 className={styles.title}>Spot new growth opportunities</h2>

            <ul className={styles.featuresList}>
              {features.map((feature, index) => (
                <li key={index} className={styles.featureItem}>
                  <div className={styles.bullet}></div>
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className={styles.visualContent}>
            <Card className={styles.trafficCard}>
              <div className={styles.cardHeader}>
                <h3 className={styles.cardTitle}>Traffic Trend</h3>
                <div className={styles.conversionMetric}>
                  <div className={styles.metricIcon}>📊</div>
                  <div className={styles.metricContent}>
                    <span className={styles.metricLabel}>
                      Purchase Conversion
                    </span>
                    <div className={styles.metricValue}>
                      <span className={styles.percentage}>4.35%</span>
                      <span className={styles.change}>↗ +5.57</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className={styles.chartContainer}>
                <div className={styles.mainChart}>
                  <div className={styles.chartLine} data-color="blue"></div>
                  <div className={styles.chartPeak}></div>
                </div>
                <div className={styles.secondaryChart}>
                  <div className={styles.chartLine} data-color="purple"></div>
                </div>
              </div>

              <div className={styles.chartLegend}>
                <div className={styles.legendItem}>
                  <div
                    className={styles.legendDot}
                    style={{ backgroundColor: "#1890ff" }}
                  ></div>
                  <span>amazon.com</span>
                </div>
                <div className={styles.legendItem}>
                  <div
                    className={styles.legendDot}
                    style={{ backgroundColor: "#722ed1" }}
                  ></div>
                  <span>ebay.com</span>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GrowthOpportunitiesSection;
