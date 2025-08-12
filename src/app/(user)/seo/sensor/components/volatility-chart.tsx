"use client";

import React from "react";
import { Card, Row, Col } from "antd";
import styles from "./volatility-chart.module.scss";

const VolatilityChart = () => {
  return (
    <Row gutter={[24, 24]}>
      <Col span={16}>
        <Card className={styles.chartCard}>
          <div className={styles.chartHeader}>
            <h3>SERP volatility for the last 30 days</h3>
            <p>All categories</p>
          </div>

          <div className={styles.scoreDisplay}>
            <div className={styles.currentScore}>
              <span className={styles.scoreValue}>9.4</span>
              <span className={styles.scoreLabel}>/10</span>
            </div>
            <div className={styles.statusBadge}>
              <span className={styles.statusText}>Very High range</span>
              <span className={styles.statusDescription}>
                It's a Googlequake!
              </span>
            </div>
          </div>

          <div className={styles.legend}>
            <div className={styles.legendItem}>
              <span className={`${styles.legendDot} ${styles.low}`}></span>
              <span>Low</span>
            </div>
            <div className={styles.legendItem}>
              <span className={`${styles.legendDot} ${styles.normal}`}></span>
              <span>Normal</span>
            </div>
            <div className={styles.legendItem}>
              <span className={`${styles.legendDot} ${styles.high}`}></span>
              <span>High</span>
            </div>
            <div className={styles.legendItem}>
              <span className={`${styles.legendDot} ${styles.veryHigh}`}></span>
              <span>Very High</span>
            </div>
          </div>

          <div className={styles.chartContainer}>
            <div className={styles.chartArea}>
              <div className={styles.yAxisLabels}>
                <span>10</span>
                <span>8</span>
                <span>5</span>
                <span>2</span>
                <span>0</span>
              </div>

              <div className={styles.chartBody}>
                {/* Simulated chart areas */}
                <div
                  className={`${styles.chartZone} ${styles.veryHighZone}`}
                ></div>
                <div className={`${styles.chartZone} ${styles.highZone}`}></div>
                <div
                  className={`${styles.chartZone} ${styles.normalZone}`}
                ></div>
                <div className={`${styles.chartZone} ${styles.lowZone}`}></div>

                {/* Simulated line chart */}
                <svg className={styles.chartLine} viewBox="0 0 500 200">
                  <polyline
                    points="0,120 30,110 60,115 90,105 120,90 150,95 180,85 210,70 240,80 270,60 300,75 330,50 360,65 390,45 420,40 450,35 480,30 500,25"
                    fill="none"
                    stroke="#ff4d4f"
                    strokeWidth="2"
                  />
                  <polyline
                    points="0,140 30,135 60,140 90,130 120,125 150,130 180,120 210,115 240,120 270,110 300,115 330,105 360,110 390,100 420,95 450,90 480,85 500,80"
                    fill="none"
                    stroke="#faad14"
                    strokeWidth="2"
                  />
                </svg>
              </div>

              <div className={styles.xAxisLabels}>
                <span>Jun 19</span>
                <span>Jun 22</span>
                <span>Jun 25</span>
                <span>Jun 28</span>
                <span>Jul 1</span>
                <span>Jul 4</span>
                <span>Jul 7</span>
                <span>Jul 10</span>
                <span>Jul 13</span>
                <span className={styles.currentDate}>Jul 16</span>
              </div>
            </div>
          </div>
        </Card>
      </Col>
    </Row>
  );
};

export default VolatilityChart;
