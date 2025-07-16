"use client";
import React from "react";
import { Card, Select } from "antd";
import { RiseOutlined } from "@ant-design/icons";
import styles from "./react_fast_section.module.scss";

const { Option } = Select;

type Props = {};

const ReactFastSection = ({}: Props) => {
  const features = [
    "Spot spikes or drops in competitor traffic to adjust tactics immediately",
    "Track daily traffic by channel: search, social, direct, referral, email, and paid",
    "Understand how product launches, promos, or ads affect traffic",
  ];

  return (
    <div className={styles.reactSection}>
      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.textContent}>
            <h2 className={styles.title}>React fast to daily shifts</h2>

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
                <div className={styles.growthMetric}>
                  <div className={styles.metricContent}>
                    <span className={styles.metricLabel}>Traffic Growth</span>
                    <div className={styles.metricValue}>
                      <span className={styles.percentage}>+275%</span>
                      <RiseOutlined className={styles.trendIcon} />
                    </div>
                  </div>
                </div>
              </div>

              <div className={styles.chartContainer}>
                <div className={styles.chartArea}>
                  <div className={styles.chartLine}></div>
                  <div className={styles.chartPoints}>
                    <div className={styles.point}></div>
                    <div className={styles.point}></div>
                    <div className={styles.point}></div>
                    <div className={styles.point}></div>
                    <div className={styles.point}></div>
                  </div>
                  <div className={styles.peakPoint}></div>
                </div>

                <div className={styles.chartLabels}>
                  <span>May 8</span>
                  <span>May 9</span>
                  <span>May 10</span>
                  <span>May 11</span>
                  <span>May 12</span>
                  <span>May 13</span>
                </div>
              </div>

              <div className={styles.chartControls}>
                <Select defaultValue="Data" className={styles.dataSelect}>
                  <Option value="Data">Data</Option>
                  <Option value="Visits">Visits</Option>
                  <Option value="Revenue">Revenue</Option>
                </Select>

                <div className={styles.periodControls}>
                  <button className={styles.periodBtn}>Daily</button>
                  <button className={styles.periodBtn}>Monthly</button>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReactFastSection;
